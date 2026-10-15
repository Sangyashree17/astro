const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 4567;
const ASSETS_DIR = path.join(__dirname, '..', 'assets');
const EXTRACTED_DIR = path.join(ASSETS_DIR, 'extracted_frames');

if (!fs.existsSync(EXTRACTED_DIR)) {
  fs.mkdirSync(EXTRACTED_DIR, { recursive: true });
}

let savedCount = 0;

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);

  if (url.pathname === '/' || url.pathname === '/extract.html') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`<!DOCTYPE html>
<html>
<head>
  <title>Frame Extractor</title>
  <style>
    body { font-family: sans-serif; background: #111; color: #fff; padding: 20px; }
    #status { font-size: 20px; margin-bottom: 20px; }
    canvas { max-width: 480px; border: 1px solid #444; }
    video { display: none; }
  </style>
</head>
<body>
  <h1>Extracting 211 Frames from Original Video (1920x1080 @ 0.95 Quality)</h1>
  <div id="status">Loading video...</div>
  <canvas id="c" width="1920" height="1080"></canvas>
  <video id="v" src="/video" preload="auto" muted playsinline></video>

  <script>
    const video = document.getElementById('v');
    const canvas = document.getElementById('c');
    const ctx = canvas.getContext('2d', { alpha: false });
    const status = document.getElementById('status');

    const TOTAL_FRAMES = 211;

    video.addEventListener('loadedmetadata', async () => {
      status.innerText = 'Video loaded: ' + video.videoWidth + 'x' + video.videoHeight + ', duration: ' + video.duration.toFixed(2) + 's. Starting extraction...';
      
      const duration = video.duration;
      
      for (let i = 0; i < TOTAL_FRAMES; i++) {
        // Map frame 0 to 210 to time 0 to duration
        const targetTime = Math.min((i / (TOTAL_FRAMES - 1)) * (duration - 0.05), duration);
        await seekTo(targetTime);
        
        ctx.drawImage(video, 0, 0, 1920, 1080);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
        
        const frameNum = String(i + 1).padStart(3, '0');
        status.innerText = 'Saving frame ' + (i + 1) + ' / ' + TOTAL_FRAMES + ' (time: ' + targetTime.toFixed(3) + 's)...';
        
        await fetch('/save-frame?index=' + frameNum, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: dataUrl })
        });
      }
      
      status.innerText = 'EXTRACTION_COMPLETE: Successfully extracted all ' + TOTAL_FRAMES + ' frames at 1920x1080!';
    });

    function seekTo(time) {
      return new Promise((resolve) => {
        const onSeeked = () => {
          video.removeEventListener('seeked', onSeeked);
          // Wait one animation frame to ensure frame decoded
          requestAnimationFrame(() => resolve());
        };
        video.addEventListener('seeked', onSeeked);
        video.currentTime = time;
      });
    }
  </script>
</body>
</html>`);
    return;
  }

  if (url.pathname === '/video') {
    const videoPath = path.join(ASSETS_DIR, 'Untitled video (33).mp4');
    const stat = fs.statSync(videoPath);
    const range = req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : stat.size - 1;
      const chunksize = (end - start) + 1;
      const file = fs.createReadStream(videoPath, { start, end });
      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${stat.size}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4'
      });
      file.pipe(res);
    } else {
      res.writeHead(200, {
        'Content-Length': stat.size,
        'Content-Type': 'video/mp4'
      });
      fs.createReadStream(videoPath).pipe(res);
    }
    return;
  }

  if (url.pathname === '/save-frame' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      const frameNum = url.searchParams.get('index');
      try {
        const json = JSON.parse(body);
        const base64Data = json.image.replace(/^data:image\/jpeg;base64,/, "");
        const filePath = path.join(EXTRACTED_DIR, `frame_${frameNum}.jpg`);
        fs.writeFileSync(filePath, base64Data, 'base64');
        savedCount++;
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, count: savedCount }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  res.writeHead(404);
  res.end('Not found');
});

server.listen(PORT, () => {
  console.log(`Extraction server running at http://localhost:${PORT}`);
});
