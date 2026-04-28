import { Score, Status, StatusBox } from "./StatusPanel.styles";
import { NoteText } from "../../../../../components/NoteText";

export function StatusPanel({ status, score }) {
  return (
    <StatusBox>
      <Status>
        <NoteText text={status} />
      </Status>
      <Score>
        Acertos: {score.correct} | Erros: {score.wrong}
      </Score>
    </StatusBox>
  );
}
