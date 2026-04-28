import { NOTE_FREQUENCIES } from "../constants";

let audioContext;

function ensureAudioContext() {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
}

export function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function createPianoPart(frequency, gainLevel, type) {
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  const lowpass = audioContext.createBiquadFilter();

  oscillator.type = type;
  oscillator.frequency.value = frequency;

  lowpass.type = "lowpass";
  lowpass.frequency.value = 4200;
  lowpass.Q.value = 1;

  gainNode.gain.value = gainLevel;

  oscillator.connect(gainNode);
  gainNode.connect(lowpass);
  lowpass.connect(audioContext.destination);

  return { oscillator, gainNode };
}

export async function playTone(note, durationMs = 700) {
  ensureAudioContext();

  const frequency = NOTE_FREQUENCIES[note];
  if (!frequency) return;

  const now = audioContext.currentTime;
  const durationSec = durationMs / 1000;
  const attack = 0.01;
  const decay = 0.16;
  const sustain = 0.14;
  const release = Math.max(0.12, durationSec * 0.45);

  const parts = [
    createPianoPart(frequency, 0.24, "triangle"),
    createPianoPart(frequency * 2, 0.1, "sine"),
    createPianoPart(frequency * 3, 0.05, "sine"),
  ];

  parts.forEach(({ gainNode }) => {
    gainNode.gain.cancelScheduledValues(now);
    gainNode.gain.setValueAtTime(0.0001, now);
    gainNode.gain.linearRampToValueAtTime(gainNode.gain.value, now + attack);
    gainNode.gain.exponentialRampToValueAtTime(Math.max(0.0001, gainNode.gain.value * sustain), now + attack + decay);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + durationSec + release);
  });

  parts.forEach(({ oscillator }) => oscillator.start(now));
  parts.forEach(({ oscillator }) => oscillator.stop(now + durationSec + release + 0.02));
}
