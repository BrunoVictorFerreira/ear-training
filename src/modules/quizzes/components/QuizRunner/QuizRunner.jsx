import { Feedback, NextButton, OptionButton, Options, Progress, Prompt, QuizPanel } from "./QuizRunner.styles";

export function QuizRunner({ question, index, total, onAnswer, onNext, disabled, selectedAnswer, answerState }) {
  if (!question) return null;
  const hasAnswered = Boolean(answerState);

  return (
    <QuizPanel>
      <Progress>
        Pergunta {index + 1} de {total}
      </Progress>
      <Prompt>{question.prompt}</Prompt>

      <Options>
        {question.options.map((option) => (
          <OptionButton
            key={option}
            onClick={() => onAnswer(option)}
            disabled={disabled || hasAnswered}
            $disabled={disabled || hasAnswered}
            $correct={hasAnswered && option === question.correctAnswer}
            $wrong={hasAnswered && option === selectedAnswer && selectedAnswer !== question.correctAnswer}
          >
            {option}
          </OptionButton>
        ))}
      </Options>

      {hasAnswered && (
        <>
          <Feedback $correct={answerState === "correct"}>
            {answerState === "correct"
              ? "Correto! Boa."
              : `Errou! A resposta certa e ${question.correctAnswer}.`}
          </Feedback>
          <NextButton onClick={onNext}>{index + 1 === total ? "Ver resultado" : "Proxima pergunta"}</NextButton>
        </>
      )}
    </QuizPanel>
  );
}
