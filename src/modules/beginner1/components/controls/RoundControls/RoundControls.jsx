import {
  ControlButton,
  ControlPanel,
  ControlsRow,
  Label,
  RootSelect,
  SectionTitle,
} from "./RoundControls.styles";

export function RoundControls({
  roots,
  rootNote,
  onRootChange,
  onStartRound,
  onReplaySequence,
  onReplayTarget,
  hasRound,
  disabled,
}) {
  return (
    <ControlPanel>
      <SectionTitle>Controles</SectionTitle>
      <ControlsRow>
        <ControlButton $primary onClick={onStartRound} disabled={disabled}>
          Nova rodada
        </ControlButton>
        <ControlButton onClick={onReplaySequence} disabled={disabled}>
          Ouvir sequencia
        </ControlButton>
        <ControlButton onClick={onReplayTarget} disabled={disabled || !hasRound}>
          Ouvir nota-alvo
        </ControlButton>
      </ControlsRow>

      <ControlsRow>
        <Label htmlFor="root-note">Tonalidade base</Label>
        <RootSelect id="root-note" value={rootNote} onChange={(event) => onRootChange(event.target.value)}>
          {roots.map((note) => (
            <option key={note} value={note}>
              {note}
            </option>
          ))}
        </RootSelect>
      </ControlsRow>
    </ControlPanel>
  );
}
