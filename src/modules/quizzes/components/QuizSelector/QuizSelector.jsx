import { Description, Label, Row, Select, SelectorPanel, Title } from "./QuizSelector.styles";
import { NoteText } from "../../../../components/NoteText";

export function QuizSelector({ quizzes, selectedQuizId, selectedQuiz, onChangeQuiz }) {
  return (
    <SelectorPanel>
      <Title>Quizzes</Title>
      <Row>
        <Label htmlFor="quiz-select">Escolha um quiz:</Label>
        <Select id="quiz-select" value={selectedQuizId} onChange={(event) => onChangeQuiz(event.target.value)}>
          {quizzes.map((quiz) => (
            <option key={quiz.id} value={quiz.id}>
              {quiz.title}
            </option>
          ))}
        </Select>
      </Row>
      <Description>
        <NoteText text={selectedQuiz?.description ?? ""} />
      </Description>
    </SelectorPanel>
  );
}
