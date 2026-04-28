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
    answerSummary,
    score,
    finished,
    selectedAnswer,
    answerState,
    changeQuiz,
    answerQuestion,
    nextQuestion,
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
          onNext={nextQuestion}
          disabled={!currentQuestion}
          selectedAnswer={selectedAnswer}
          answerState={answerState}
        />
      ) : (
        <QuizResult score={score} total={totalQuestions} answerSummary={answerSummary} onRestart={restartQuiz} />
      )}
    </>
  );
}
