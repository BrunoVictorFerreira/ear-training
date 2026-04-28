import { useMemo, useState } from "react";
import { NOTE_NAMES } from "../constants";
import { playTone, wait } from "../services/audioService";

function getSequenceFromRoot(root, count = 4) {
  const startIndex = NOTE_NAMES.indexOf(root);
  return Array.from({ length: count }, (_, idx) => NOTE_NAMES[(startIndex + idx) % NOTE_NAMES.length]);
}

function createRound(root) {
  const sequence = getSequenceFromRoot(root, 4);
  const targetIndex = Math.floor(Math.random() * sequence.length);
  return {
    sequence,
    targetNote: sequence[targetIndex],
    guessed: false,
  };
}

export function useBeginner2Game() {
  const [rootNote, setRootNote] = useState("C");
  const [audioMode, setAudioMode] = useState("piano");
  const [round, setRound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [status, setStatus] = useState('Clique em "Nova rodada" para comecar.');
  const [score, setScore] = useState({ correct: 0, wrong: 0 });

  const canGuess = useMemo(() => !isPlaying && round && !round.guessed, [isPlaying, round]);

  const playSequence = async (notes) => {
    for (const note of notes) {
      await playTone(note, 600, 0, audioMode);
      await wait(200);
    }
  };

  const startRound = async () => {
    const newRound = createRound(rootNote);
    setRound(newRound);
    setStatus("Reproduzindo sequencia...");
    setIsPlaying(true);

    await playSequence(newRound.sequence);
    setStatus("Aguarde 1 segundo, tocando nota-alvo na oitava acima...");
    await wait(1000);
    await playTone(newRound.targetNote, 900, 1, audioMode);

    setIsPlaying(false);
    setStatus("Qual nota voce ouviu por ultimo? (nota em oitava)");
  };

  const replaySequence = async () => {
    if (!round) return;
    setStatus("Reproduzindo sequencia...");
    setIsPlaying(true);
    await playSequence(round.sequence);
    setIsPlaying(false);
    setStatus("Escute novamente e escolha a nota-alvo em oitava.");
  };

  const replayTarget = async () => {
    if (!round) return;
    setStatus("Reproduzindo nota-alvo em oitava...");
    setIsPlaying(true);
    await playTone(round.targetNote, 900, 1, audioMode);
    setIsPlaying(false);
    setStatus("Qual nota voce ouviu por ultimo? (nota em oitava)");
  };

  const makeGuess = (note) => {
    if (!round || !canGuess) return { correct: false, target: null };

    const correct = note === round.targetNote;
    setRound((prev) => ({ ...prev, guessed: true }));
    setScore((prev) => ({
      correct: prev.correct + (correct ? 1 : 0),
      wrong: prev.wrong + (correct ? 0 : 1),
    }));
    setStatus(
      correct
        ? `Correto! A nota era ${round.targetNote} (oitava acima).`
        : `Quase! Era ${round.targetNote} (oitava acima).`
    );

    return { correct, target: round.targetNote };
  };

  return {
    noteNames: NOTE_NAMES,
    rootNote,
    setRootNote,
    audioMode,
    setAudioMode,
    round,
    isPlaying,
    status,
    score,
    canGuess,
    startRound,
    replaySequence,
    replayTarget,
    makeGuess,
  };
}
