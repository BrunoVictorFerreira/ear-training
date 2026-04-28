import { Score, Status, StatusBox } from "./StatusPanel.styles";

export function StatusPanel({ status, score }) {
  return (
    <StatusBox>
      <Status>{status}</Status>
      <Score>
        Acertos: {score.correct} | Erros: {score.wrong}
      </Score>
    </StatusBox>
  );
}
