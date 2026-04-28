import { List, ListItem, RestartButton, ResultPanel, SectionTitle, Summary, TimeStatus, Title } from "./QuizResult.styles";

export function QuizResult({ score, total, answerSummary, totalTimeMs, onRestart }) {
  const percent = total > 0 ? Math.round((score / total) * 100) : 0;
  const totalTimeSec = (totalTimeMs / 1000).toFixed(2);
  const correctAnswers = answerSummary.filter((item) => item.isCorrect);
  const wrongAnswers = answerSummary.filter((item) => !item.isCorrect);

  return (
    <ResultPanel>
      <Title>Resultado</Title>
      <Summary>
        Voce acertou {score} de {total} perguntas ({percent}%).
      </Summary>
      <Summary>Tempo total: {totalTimeSec}s</Summary>

      <SectionTitle>Perguntas que voce acertou ({correctAnswers.length})</SectionTitle>
      <List>
        {correctAnswers.map((item) => (
          <ListItem key={`ok-${item.order}`}>
            {item.order}. {item.prompt} - Sua resposta: {item.selectedAnswer} | Tempo: {item.responseTimeSec}s (
            <TimeStatus $rating={item.timeRating}>{item.timeRating}</TimeStatus>)
          </ListItem>
        ))}
      </List>

      <SectionTitle>Perguntas que voce errou ({wrongAnswers.length})</SectionTitle>
      <List>
        {wrongAnswers.map((item) => (
          <ListItem key={`err-${item.order}`}>
            {item.order}. {item.prompt} - Sua resposta: {item.selectedAnswer} | Correta: {item.correctAnswer} |
            Tempo: {item.responseTimeSec}s (<TimeStatus $rating={item.timeRating}>{item.timeRating}</TimeStatus>)
          </ListItem>
        ))}
      </List>

      <RestartButton onClick={onRestart}>Refazer quiz</RestartButton>
    </ResultPanel>
  );
}
