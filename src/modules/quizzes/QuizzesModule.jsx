import { QuizResult } from "./components/QuizResult/QuizResult";
import { QuizRunner } from "./components/QuizRunner/QuizRunner";
import { QuizSelector } from "./components/QuizSelector/QuizSelector";
import { useQuizGame } from "./hooks/useQuizGame";
import { useNavigate, useParams } from "react-router-dom";

export function QuizzesModule() {
  const navigate = useNavigate();
  const { quizId } = useParams();
  const {
    quizzes,
    selectedQuiz,
    selectedQuizId,
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    answerSummary,
    totalTimeMs,
    score,
    finished,
    selectedAnswer,
    answerState,
    answerQuestion,
    nextQuestion,
    restartQuiz,
  } = useQuizGame(quizId);

  const handleChangeQuiz = (nextQuizId) => {
    navigate(`/quiz/${nextQuizId}`);
  };

  return (
    <>
      <QuizSelector
        quizzes={quizzes}
        selectedQuizId={selectedQuizId}
        selectedQuiz={selectedQuiz}
        onChangeQuiz={handleChangeQuiz}
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
        <QuizResult
          score={score}
          total={totalQuestions}
          answerSummary={answerSummary}
          totalTimeMs={totalTimeMs}
          onRestart={restartQuiz}
        />
      )}
    </>
  );
}
