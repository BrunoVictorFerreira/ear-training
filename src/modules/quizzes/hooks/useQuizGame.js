import { useMemo, useState } from "react";
import { quizzes } from "../quizzesData";

function shuffleArray(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[randomIndex]] = [copy[randomIndex], copy[i]];
  }
  return copy;
}

export function useQuizGame() {
  const [selectedQuizId, setSelectedQuizId] = useState(quizzes[0]?.id ?? "");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);
  const [attemptVersion, setAttemptVersion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answerState, setAnswerState] = useState(null);

  const selectedQuiz = useMemo(
    () => quizzes.find((quiz) => quiz.id === selectedQuizId) ?? null,
    [selectedQuizId]
  );
  const sessionQuestions = useMemo(() => {
    if (!selectedQuiz) return [];
    return shuffleArray(selectedQuiz.questions).map((question) => ({
      ...question,
      options: shuffleArray(question.options),
    }));
  }, [selectedQuiz, attemptVersion]);
  const totalQuestions = sessionQuestions.length;
  const currentQuestion = sessionQuestions[currentQuestionIndex] ?? null;

  const score = useMemo(() => {
    if (!sessionQuestions.length) return 0;
    return answers.reduce((acc, answer) => {
      const question = sessionQuestions.find((item) => item.id === answer.questionId);
      return acc + (question && question.correctAnswer === answer.selectedAnswer ? 1 : 0);
    }, 0);
  }, [answers, sessionQuestions]);

  const answerSummary = useMemo(() => {
    return answers
      .map((answer, index) => {
        const question = sessionQuestions.find((item) => item.id === answer.questionId);
        if (!question) return null;
        return {
          order: index + 1,
          prompt: question.prompt,
          selectedAnswer: answer.selectedAnswer,
          correctAnswer: question.correctAnswer,
          isCorrect: question.correctAnswer === answer.selectedAnswer,
        };
      })
      .filter(Boolean);
  }, [answers, sessionQuestions]);

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setFinished(false);
    setSelectedAnswer(null);
    setAnswerState(null);
    setAttemptVersion((prev) => prev + 1);
  };

  const changeQuiz = (quizId) => {
    setSelectedQuizId(quizId);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setFinished(false);
    setSelectedAnswer(null);
    setAnswerState(null);
    setAttemptVersion((prev) => prev + 1);
  };

  const answerQuestion = (selectedAnswer) => {
    if (!currentQuestion || finished || answerState) return;

    const isCorrect = currentQuestion.correctAnswer === selectedAnswer;
    setSelectedAnswer(selectedAnswer);
    setAnswerState(isCorrect ? "correct" : "wrong");

    setAnswers((prev) => [
      ...prev,
      {
        questionId: currentQuestion.id,
        selectedAnswer,
      },
    ]);
  };

  const nextQuestion = () => {
    if (!answerState) return;
    const isLast = currentQuestionIndex >= totalQuestions - 1;
    if (isLast) {
      setFinished(true);
      return;
    }

    setCurrentQuestionIndex((prev) => prev + 1);
    setSelectedAnswer(null);
    setAnswerState(null);
  };

  return {
    quizzes,
    selectedQuiz,
    selectedQuizId,
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    answers,
    answerSummary,
    score,
    finished,
    selectedAnswer,
    answerState,
    changeQuiz,
    answerQuestion,
    nextQuestion,
    restartQuiz,
  };
}
