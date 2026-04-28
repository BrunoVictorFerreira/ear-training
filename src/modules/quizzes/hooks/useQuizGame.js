import { useEffect, useMemo, useState } from "react";
import { quizzes } from "../quizzesData";

function shuffleArray(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[randomIndex]] = [copy[randomIndex], copy[i]];
  }
  return copy;
}

function classifyTime(seconds) {
  if (seconds <= 5) return "otimo";
  if (seconds <= 10) return "bom";
  if (seconds <= 15) return "medio";
  return "ruim";
}

function resolveQuizId(quizId) {
  const exists = quizzes.some((quiz) => quiz.id === quizId);
  return exists ? quizId : quizzes[0]?.id ?? "";
}

export function useQuizGame(initialQuizId) {
  const [selectedQuizId, setSelectedQuizId] = useState(resolveQuizId(initialQuizId));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);
  const [attemptVersion, setAttemptVersion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answerState, setAnswerState] = useState(null);
  const [questionStartAt, setQuestionStartAt] = useState(Date.now());

  useEffect(() => {
    const nextQuizId = resolveQuizId(initialQuizId);
    setSelectedQuizId(nextQuizId);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setFinished(false);
    setSelectedAnswer(null);
    setAnswerState(null);
    setQuestionStartAt(Date.now());
    setAttemptVersion((prev) => prev + 1);
  }, [initialQuizId]);

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

  useEffect(() => {
    setQuestionStartAt(Date.now());
  }, [currentQuestionIndex, selectedQuizId, attemptVersion]);

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
          responseTimeMs: answer.responseTimeMs,
          responseTimeSec: Number((answer.responseTimeMs / 1000).toFixed(2)),
          timeRating: classifyTime(answer.responseTimeMs / 1000),
        };
      })
      .filter(Boolean);
  }, [answers, sessionQuestions]);

  const totalTimeMs = useMemo(
    () => answers.reduce((acc, answer) => acc + (answer.responseTimeMs ?? 0), 0),
    [answers]
  );

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setFinished(false);
    setSelectedAnswer(null);
    setAnswerState(null);
    setQuestionStartAt(Date.now());
    setAttemptVersion((prev) => prev + 1);
  };

  const changeQuiz = (quizId) => {
    setSelectedQuizId(quizId);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setFinished(false);
    setSelectedAnswer(null);
    setAnswerState(null);
    setQuestionStartAt(Date.now());
    setAttemptVersion((prev) => prev + 1);
  };

  const answerQuestion = (selectedAnswer) => {
    if (!currentQuestion || finished || answerState) return;

    const isCorrect = currentQuestion.correctAnswer === selectedAnswer;
    setSelectedAnswer(selectedAnswer);
    setAnswerState(isCorrect ? "correct" : "wrong");
    const responseTimeMs = Math.max(0, Date.now() - questionStartAt);

    setAnswers((prev) => [
      ...prev,
      {
        questionId: currentQuestion.id,
        selectedAnswer,
        responseTimeMs,
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
    totalTimeMs,
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
