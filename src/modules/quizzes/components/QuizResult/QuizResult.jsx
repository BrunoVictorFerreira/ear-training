import { RestartButton, ResultPanel, Summary, Title } from "./QuizResult.styles";

export function QuizResult({ score, total, onRestart }) {
  const percent = total > 0 ? Math.round((score / total) * 100) : 0;

  return (
    <ResultPanel>
      <Title>Resultado</Title>
      <Summary>
        Voce acertou {score} de {total} perguntas ({percent}%).
      </Summary>
      <RestartButton onClick={onRestart}>Refazer quiz</RestartButton>
    </ResultPanel>
  );
}
