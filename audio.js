/**
 * ISHVARA TECH CONSULTING — CINEMATIC AMBIENT SOUNDSCAPE
 * Generative Web Audio API Synthesizer (Zero External Dependencies)
 * Soothing, celestial, harmonic drone with gentle filter breathing & scroll reactivity
 */

class CinematicSoundscape {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.isMuted = true;
    this.masterGain = null;
    this.filter = null;
    this.oscillators = [];
    this.lfo = null;
    this.targetVolume = 0.28; // Gentle, soothing volume level
  }

  init() {
    if (this.ctx) return;

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    this.ctx = new AudioContext();

    // Master Gain for smooth fade-in / fade-out
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    // Warm Lowpass Filter
    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = 'lowpass';
    this.filter.frequency.setValueAtTime(450, this.ctx.currentTime);
    this.filter.Q.setValueAtTime(1.8, this.ctx.currentTime);
    this.filter.connect(this.masterGain);

    // Stereo Panner or Convolver Reverb Simulation
    this.createStereoSpace();

    // Harmonic Chord Frequencies (Lush Celestial D Major 9: D2, A2, D3, F#3, A3, C#4, E4)
    const chordFrequencies = [
      { freq: 73.42, type: 'sine', detune: 0, gain: 0.35 },    // D2 Deep Sub
      { freq: 110.00, type: 'sine', detune: -4, gain: 0.22 },  // A2
      { freq: 146.83, type: 'triangle', detune: 5, gain: 0.16 }, // D3
      { freq: 185.00, type: 'sine', detune: -7, gain: 0.14 },  // F#3
      { freq: 220.00, type: 'triangle', detune: 6, gain: 0.12 }, // A3
      { freq: 277.18, type: 'sine', detune: -3, gain: 0.08 },  // C#4
      { freq: 329.63, type: 'sine', detune: 4, gain: 0.06 }   // E4
    ];

    chordFrequencies.forEach(voice => {
      const osc = this.ctx.createOscillator();
      const voiceGain = this.ctx.createGain();

      osc.type = voice.type;
      osc.frequency.setValueAtTime(voice.freq, this.ctx.currentTime);
      osc.detune.setValueAtTime(voice.detune, this.ctx.currentTime);

      voiceGain.gain.setValueAtTime(voice.gain, this.ctx.currentTime);

      osc.connect(voiceGain);
      voiceGain.connect(this.filter);
      osc.start();

      this.oscillators.push({ osc, gain: voiceGain });
    });

    // Slow LFO for gentle celestial breathing effect (0.06 Hz = ~16s period)
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    lfo.frequency.setValueAtTime(0.06, this.ctx.currentTime);
    lfoGain.gain.setValueAtTime(180, this.ctx.currentTime);

    lfo.connect(lfoGain);
    lfoGain.connect(this.filter.frequency);
    lfo.start();
    this.lfo = lfo;

    this.isPlaying = true;
  }

  createStereoSpace() {
    // Soft stereo delay feedback for lush depth
    const delayL = this.ctx.createDelay();
    const delayR = this.ctx.createDelay();
    delayL.delayTime.value = 0.38;
    delayR.delayTime.value = 0.52;

    const feedbackL = this.ctx.createGain();
    const feedbackR = this.ctx.createGain();
    feedbackL.gain.value = 0.28;
    feedbackR.gain.value = 0.28;

    this.filter.connect(delayL);
    this.filter.connect(delayR);

    delayL.connect(feedbackL);
    feedbackL.connect(delayR);

    delayR.connect(feedbackR);
    feedbackR.connect(delayL);

    delayL.connect(this.masterGain);
    delayR.connect(this.masterGain);
  }

  // Fade In Audio
  play() {
    if (!this.ctx) {
      this.init();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.masterGain) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.linearRampToValueAtTime(this.targetVolume, now + 1.2);
    }
    this.isMuted = false;
  }

  // Fade Out Audio (Smooth Mute)
  pause() {
    if (this.masterGain && this.ctx) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.linearRampToValueAtTime(0.0001, now + 0.8);
    }
    this.isMuted = true;
  }

  // Toggle Mute / Sound
  toggle() {
    if (this.isMuted) {
      this.play();
      return true;
    } else {
      this.pause();
      return false;
    }
  }

  // Dynamic filter breathing based on scroll speed / depth
  updateScrollReaction(progress) {
    if (!this.filter || !this.ctx || this.isMuted) return;
    // Map scroll progress (0 to 1) to gentle ambient filter shift (400 Hz to 750 Hz)
    const baseFreq = 420 + progress * 320;
    this.filter.frequency.setTargetAtTime(baseFreq, this.ctx.currentTime, 0.4);
  }
}

// Attach to window and wire to top-right toggle button
window.CinematicSound = new CinematicSoundscape();
