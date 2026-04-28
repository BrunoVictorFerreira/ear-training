import { OptionButton, Options, Progress, Prompt, QuizPanel } from "./QuizRunner.styles";

export function QuizRunner({ question, index, total, onAnswer, disabled }) {
  if (!question) return null;

  return (
    <QuizPanel>
      <Progress>
        Pergunta {index + 1} de {total}
      </Progress>
      <Prompt>{question.prompt}</Prompt>

      <Options>
        {question.options.map((option) => (
          <OptionButton key={option} onClick={() => onAnswer(option)} disabled={disabled} $disabled={disabled}>
            {option}
          </OptionButton>
        ))}
      </Options>
    </QuizPanel>
  );
}
