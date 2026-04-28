import { SequenceBox, SequenceText, SectionTitle } from "./SequenceDisplay.styles";
import { NoteText } from "../../../../../components/NoteText";

export function SequenceDisplay({ sequence }) {
  return (
    <SequenceBox>
      <SectionTitle>Sequencia atual</SectionTitle>
      <SequenceText>{sequence?.length ? <NoteText text={sequence.join(" - ")} /> : "-"}</SequenceText>
    </SequenceBox>
  );
}
