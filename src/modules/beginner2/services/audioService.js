import { NOTE_FREQUENCIES } from "../constants";

let audioContext;
const guitarSampleCache = new Map();
const SAMPLE_BASE_OCTAVE = 4;
const AUDIO_BASE_URL = import.meta.env.BASE_URL;

function ensureAudioContext() {
  if (!audioContext) {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    audioContext = new Ctx();
  }
}

async function unlockAudioContext() {
  ensureAudioContext();

  if (audioContext.state === "suspended") {
    await audioContext.resume();
  }

  // iOS Safari often requires a real node start/stop after resume.
  const source = audioContext.createBufferSource();
  const buffer = audioContext.createBuffer(1, 1, 22050);
  source.buffer = buffer;
  source.connect(audioContext.destination);
  source.start(0);
  source.stop(0);
}

export function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function playNormalTone(frequency, durationSec, now) {
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.type = "sine";
  oscillator.frequency.value = frequency;

  gainNode.gain.setValueAtTime(0.0001, now);
  gainNode.gain.exponentialRampToValueAtTime(0.25, now + 0.02);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, now + durationSec);

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.start(now);
  oscillator.stop(now + durationSec);
}

function createHarmonicPart(frequency, gainLevel, type, filterFrequency = 4200, filterQ = 1) {
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  const lowpass = audioContext.createBiquadFilter();

  oscillator.type = type;
  oscillator.frequency.value = frequency;

  lowpass.type = "lowpass";
  lowpass.frequency.value = filterFrequency;
  lowpass.Q.value = filterQ;

  gainNode.gain.value = gainLevel;

  oscillator.connect(gainNode);
  gainNode.connect(lowpass);
  lowpass.connect(audioContext.destination);

  return { oscillator, gainNode };
}

function playLayeredTone(frequency, durationSec, now, profile) {
  const parts = profile.parts.map((part) =>
    createHarmonicPart(
      frequency * part.multiplier,
      part.gain,
      part.waveType,
      profile.filter.frequency,
      profile.filter.q
    )
  );

  parts.forEach(({ gainNode }) => {
    gainNode.gain.cancelScheduledValues(now);
    gainNode.gain.setValueAtTime(0.0001, now);
    gainNode.gain.linearRampToValueAtTime(gainNode.gain.value, now + profile.envelope.attack);
    gainNode.gain.exponentialRampToValueAtTime(
      Math.max(0.0001, gainNode.gain.value * profile.envelope.sustain),
      now + profile.envelope.attack + profile.envelope.decay
    );
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + durationSec + profile.envelope.release);
  });

  parts.forEach(({ oscillator }) => oscillator.start(now));
  parts.forEach(({ oscillator }) => oscillator.stop(now + durationSec + profile.envelope.release + 0.02));
}

async function loadGuitarSample(note, octaveShift = 0) {
  const key = `${note}${SAMPLE_BASE_OCTAVE + octaveShift}`;
  if (guitarSampleCache.has(key)) return guitarSampleCache.get(key);

  try {
    const response = await fetch(`${AUDIO_BASE_URL}audio/guitar/${key}.mp3`);
    if (!response.ok) return null;
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    guitarSampleCache.set(key, audioBuffer);
    return audioBuffer;
  } catch {
    return null;
  }
}

async function playGuitarSample(note, durationSec, now, octaveShift = 0) {
  const sample = await loadGuitarSample(note, octaveShift);
  if (!sample) return false;

  const source = audioContext.createBufferSource();
  source.buffer = sample;

  const toneFilter = audioContext.createBiquadFilter();
  toneFilter.type = "lowpass";
  toneFilter.frequency.value = 4300;
  toneFilter.Q.value = 0.9;

  const gainNode = audioContext.createGain();
  gainNode.gain.setValueAtTime(0.0001, now);
  gainNode.gain.linearRampToValueAtTime(0.55, now + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, now + durationSec + 0.08);

  source.connect(toneFilter);
  toneFilter.connect(gainNode);
  gainNode.connect(audioContext.destination);

  const stopAt = now + Math.min(sample.duration, durationSec + 0.12);
  source.start(now);
  source.stop(stopAt);
  await wait(Math.max(1, (stopAt - now) * 1000));
  return true;
}

export async function playTone(note, durationMs = 700, octaveShift = 0, audioMode = "piano") {
  await unlockAudioContext();

  const baseFrequency = NOTE_FREQUENCIES[note];
  if (!baseFrequency) return;

  const frequency = baseFrequency * 2 ** octaveShift;
  const now = audioContext.currentTime;
  const durationSec = durationMs / 1000;

  if (audioMode === "normal") {
    playNormalTone(frequency, durationSec, now);
    return;
  }

  if (audioMode === "violao") {
    const played = await playGuitarSample(note, durationSec, now, octaveShift);
    if (!played) {
      playNormalTone(frequency, durationSec, now);
    }
    return;
  }

  playLayeredTone(frequency, durationSec, now, {
    parts: [
      { multiplier: 1, gain: 0.24, waveType: "triangle" },
      { multiplier: 2, gain: 0.1, waveType: "sine" },
      { multiplier: 3, gain: 0.05, waveType: "sine" },
    ],
    filter: { frequency: 4200, q: 1 },
    envelope: {
      attack: 0.01,
      decay: 0.16,
      sustain: 0.14,
      release: Math.max(0.12, durationSec * 0.45),
    },
  });
}
