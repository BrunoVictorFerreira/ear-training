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

export async function playTone(note, durationMs = 700) {
  ensureAudioContext();

  const frequency = NOTE_FREQUENCIES[note];
  if (!frequency) return;

  const now = audioContext.currentTime;
  const durationSec = durationMs / 1000;

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
