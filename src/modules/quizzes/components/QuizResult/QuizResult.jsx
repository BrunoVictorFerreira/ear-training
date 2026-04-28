import { List, ListItem, RestartButton, ResultPanel, SectionTitle, Summary, Title } from "./QuizResult.styles";

export function QuizResult({ score, total, answerSummary, onRestart }) {
  const percent = total > 0 ? Math.round((score / total) * 100) : 0;
  const correctAnswers = answerSummary.filter((item) => item.isCorrect);
  const wrongAnswers = answerSummary.filter((item) => !item.isCorrect);

  return (
    <ResultPanel>
      <Title>Resultado</Title>
      <Summary>
        Voce acertou {score} de {total} perguntas ({percent}%).
      </Summary>

      <SectionTitle>Perguntas que voce acertou ({correctAnswers.length})</SectionTitle>
      <List>
        {correctAnswers.map((item) => (
          <ListItem key={`ok-${item.order}`} $correct>
            {item.order}. {item.prompt} - Sua resposta: {item.selectedAnswer}
          </ListItem>
        ))}
      </List>

      <SectionTitle>Perguntas que voce errou ({wrongAnswers.length})</SectionTitle>
      <List>
        {wrongAnswers.map((item) => (
          <ListItem key={`err-${item.order}`}>
            {item.order}. {item.prompt} - Sua resposta: {item.selectedAnswer} | Correta: {item.correctAnswer}
          </ListItem>
        ))}
      </List>

      <RestartButton onClick={onRestart}>Refazer quiz</RestartButton>
    </ResultPanel>
  );
}
