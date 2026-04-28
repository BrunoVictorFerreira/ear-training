import { useState } from "react";
import { RoundControls } from "./components/controls/RoundControls/RoundControls";
import { SequenceDisplay } from "./components/display/SequenceDisplay/SequenceDisplay";
import { GuessGrid } from "./components/guess/GuessGrid/GuessGrid";
import { StatusPanel } from "./components/status/StatusPanel/StatusPanel";
import { useBeginner1Game } from "./hooks/useBeginner1Game";

export function Beginner1Module() {
  const {
    noteNames,
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
  } = useBeginner1Game();
  const [highlights, setHighlights] = useState({});

  const handleStartRound = async () => {
    setHighlights({});
    await startRound();
  };

  const handleGuess = (note) => {
    const result = makeGuess(note);
    if (!result.target) return;

    if (result.correct) {
      setHighlights({ [note]: "correct" });
      return;
    }

    setHighlights({
      [note]: "wrong",
      [result.target]: "correct",
    });
  };

  return (
    <>
      <RoundControls
        roots={noteNames}
        rootNote={rootNote}
        onRootChange={setRootNote}
        audioMode={audioMode}
        onAudioModeChange={setAudioMode}
        onStartRound={handleStartRound}
        onReplaySequence={replaySequence}
        onReplayTarget={replayTarget}
        hasRound={Boolean(round)}
        disabled={isPlaying}
      />

      <SequenceDisplay sequence={round?.sequence} />

      <GuessGrid notes={round?.sequence || []} canGuess={canGuess} highlights={highlights} onGuess={handleGuess} />

      <StatusPanel status={status} score={score} />
    </>
  );
}
