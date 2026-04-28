import { SequenceBox, SequenceText, SectionTitle } from "./SequenceDisplay.styles";

export function SequenceDisplay({ sequence }) {
  return (
    <SequenceBox>
      <SectionTitle>Sequencia atual</SectionTitle>
      <SequenceText>{sequence?.length ? sequence.join(" - ") : "-"}</SequenceText>
    </SequenceBox>
  );
}
