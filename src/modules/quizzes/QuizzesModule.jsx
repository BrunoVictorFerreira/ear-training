import { QuizResult } from "./components/QuizResult/QuizResult";
import { QuizRunner } from "./components/QuizRunner/QuizRunner";
import { QuizSelector } from "./components/QuizSelector/QuizSelector";
import { useQuizGame } from "./hooks/useQuizGame";

export function QuizzesModule() {
  const {
    quizzes,
    selectedQuiz,
    selectedQuizId,
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    score,
    finished,
    changeQuiz,
    answerQuestion,
    restartQuiz,
  } = useQuizGame();

  return (
    <>
      <QuizSelector
        quizzes={quizzes}
        selectedQuizId={selectedQuizId}
        selectedQuiz={selectedQuiz}
        onChangeQuiz={changeQuiz}
      />

      {!finished ? (
        <QuizRunner
          question={currentQuestion}
          index={currentQuestionIndex}
          total={totalQuestions}
          onAnswer={answerQuestion}
          disabled={!currentQuestion}
        />
      ) : (
        <QuizResult score={score} total={totalQuestions} onRestart={restartQuiz} />
      )}
    </>
  );
}
