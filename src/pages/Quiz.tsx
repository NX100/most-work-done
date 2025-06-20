import React, { useState, useEffect } from "react";
import {
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ChartBarIcon,
  PlayIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import {
  quizQuestions,
  quizCategories,
  mockQuizStats,
  generateQuiz,
  calculateScore,
  getDifficultyColor,
  formatTime,
  type QuizQuestion,
  type QuizAttempt,
  type QuizResult,
} from "../lib/quiz-data";

type QuizState = "start" | "playing" | "completed" | "review";

export default function Quiz() {
  const [quizState, setQuizState] = useState<QuizState>("start");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [questionCount, setQuestionCount] = useState(5);
  const [currentQuestions, setCurrentQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [totalTimeSpent, setTotalTimeSpent] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (quizState === "playing" && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [quizState, timeLeft]);

  // Total time tracking
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (quizState === "playing") {
      interval = setInterval(() => {
        setTotalTimeSpent((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [quizState]);

  const startQuiz = () => {
    const questions = generateQuiz(selectedCategory, questionCount);
    setCurrentQuestions(questions);
    setCurrentQuestionIndex(0);
    setAttempts([]);
    setTotalTimeSpent(0);
    setQuizState("playing");
    setTimeLeft(questions[0]?.timeLimit || 30);
  };

  const handleTimeUp = () => {
    if (selectedAnswer === null) {
      handleAnswerSubmit(-1); // -1 indicates no answer selected
    }
  };

  const handleAnswerSubmit = (answerIndex: number) => {
    const currentQuestion = currentQuestions[currentQuestionIndex];
    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    const timeSpent = (currentQuestion.timeLimit || 30) - timeLeft;

    const attempt: QuizAttempt = {
      questionId: currentQuestion.id,
      selectedAnswer: answerIndex,
      isCorrect,
      timeSpent,
    };

    setAttempts((prev) => [...prev, attempt]);
    setShowExplanation(true);

    // Auto advance after showing explanation
    setTimeout(() => {
      if (currentQuestionIndex < currentQuestions.length - 1) {
        nextQuestion();
      } else {
        completeQuiz([...attempts, attempt]);
      }
    }, 3000);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setTimeLeft(currentQuestions[nextIndex]?.timeLimit || 30);
    }
  };

  const completeQuiz = (finalAttempts: QuizAttempt[]) => {
    const result: QuizResult = {
      id: Date.now().toString(),
      totalQuestions: currentQuestions.length,
      correctAnswers: finalAttempts.filter((a) => a.isCorrect).length,
      incorrectAnswers: finalAttempts.filter((a) => !a.isCorrect).length,
      score: calculateScore(finalAttempts),
      timeSpent: totalTimeSpent,
      attempts: finalAttempts,
      completedAt: new Date(),
    };

    setQuizResult(result);
    setQuizState("completed");
  };

  const resetQuiz = () => {
    setQuizState("start");
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setAttempts([]);
    setTimeLeft(30);
    setTotalTimeSpent(0);
    setShowExplanation(false);
    setQuizResult(null);
  };

  const reviewQuiz = () => {
    setQuizState("review");
    setCurrentQuestionIndex(0);
    setShowExplanation(true);
  };

  if (quizState === "start") {
    return (
      <div className="min-h-screen bg-dark-100 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-brand-purple rounded-xl flex items-center justify-center">
              <ChartBarIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Knowledge Quiz</h1>
              <p className="text-white/60">
                Test your knowledge across various subjects
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quiz Statistics */}
            <div className="lg:col-span-2">
              <div className="card-dark p-6 mb-6">
                <h2 className="text-xl font-semibold text-white mb-6">
                  Your Statistics
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-brand-purple mb-1">
                      {mockQuizStats.totalQuizzes}
                    </div>
                    <div className="text-white/60 text-sm">Total Quizzes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-brand-green mb-1">
                      {mockQuizStats.averageScore}%
                    </div>
                    <div className="text-white/60 text-sm">Average Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-brand-yellow mb-1">
                      {mockQuizStats.bestScore}%
                    </div>
                    <div className="text-white/60 text-sm">Best Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-brand-cyan mb-1">
                      {Math.floor(mockQuizStats.totalTimeSpent / 60)}m
                    </div>
                    <div className="text-white/60 text-sm">Time Spent</div>
                  </div>
                </div>
              </div>

              {/* Quiz Setup */}
              <div className="card-dark p-6">
                <h2 className="text-xl font-semibold text-white mb-6">
                  Start New Quiz
                </h2>

                {/* Category Selection */}
                <div className="mb-6">
                  <label className="block text-white font-medium mb-3">
                    Select Category
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {quizCategories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`
                          p-3 rounded-lg border transition-all
                          ${
                            selectedCategory === category.id
                              ? "border-brand-purple bg-brand-purple/20 text-brand-purple"
                              : "border-white/10 bg-white/5 text-white/70 hover:border-white/20"
                          }
                        `}
                      >
                        <div
                          className="w-3 h-3 rounded-full mx-auto mb-2"
                          style={{ backgroundColor: category.color }}
                        ></div>
                        <div className="text-sm font-medium">
                          {category.name}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Question Count */}
                <div className="mb-6">
                  <label className="block text-white font-medium mb-3">
                    Number of Questions
                  </label>
                  <div className="flex gap-3">
                    {[5, 10, 15, 20].map((count) => (
                      <button
                        key={count}
                        onClick={() => setQuestionCount(count)}
                        className={`
                          px-4 py-2 rounded-lg border transition-all
                          ${
                            questionCount === count
                              ? "border-brand-purple bg-brand-purple/20 text-brand-purple"
                              : "border-white/10 bg-white/5 text-white/70 hover:border-white/20"
                          }
                        `}
                      >
                        {count}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={startQuiz}
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  <PlayIcon className="w-5 h-5" />
                  Start Quiz
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="lg:col-span-1">
              <div className="card-dark p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Strong Categories
                </h3>
                <div className="space-y-3 mb-6">
                  {mockQuizStats.strongCategories.map((category, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-brand-green" />
                      <span className="text-white/70">{category}</span>
                    </div>
                  ))}
                </div>

                <h3 className="text-lg font-semibold text-white mb-4">
                  Needs Improvement
                </h3>
                <div className="space-y-3">
                  {mockQuizStats.weakCategories.map((category, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <XCircleIcon className="w-5 h-5 text-brand-red" />
                      <span className="text-white/70">{category}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (quizState === "playing" || quizState === "review") {
    const currentQuestion = currentQuestions[currentQuestionIndex];
    const currentAttempt = attempts[currentQuestionIndex];
    const isReview = quizState === "review";

    return (
      <div className="min-h-screen bg-dark-100 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Quiz Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <button
                onClick={resetQuiz}
                className="p-2 text-white/60 hover:text-white transition-colors"
              >
                <HomeIcon className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Question {currentQuestionIndex + 1} of{" "}
                  {currentQuestions.length}
                </h1>
                <div className="flex items-center gap-4 mt-1">
                  <span
                    className="px-2 py-1 rounded text-xs font-medium"
                    style={{
                      backgroundColor: `${getDifficultyColor(currentQuestion.difficulty)}20`,
                      color: getDifficultyColor(currentQuestion.difficulty),
                    }}
                  >
                    {currentQuestion.difficulty}
                  </span>
                  <span className="text-white/60 text-sm">
                    {currentQuestion.category}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {!isReview && (
                <div className="flex items-center gap-2 px-3 py-2 bg-dark-200 rounded-lg">
                  <ClockIcon className="w-5 h-5 text-brand-orange" />
                  <span
                    className={`font-mono font-semibold ${timeLeft <= 10 ? "text-brand-red" : "text-white"}`}
                  >
                    {formatTime(timeLeft)}
                  </span>
                </div>
              )}

              <div className="w-32 bg-dark-200 rounded-full h-2">
                <div
                  className="bg-brand-purple h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${((currentQuestionIndex + 1) / currentQuestions.length) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* Question Card */}
          <div className="card-dark p-8 mb-6">
            <h2 className="text-xl font-medium text-white mb-6">
              {currentQuestion.question}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentQuestion.options.map((option, index) => {
                let buttonClass =
                  "p-4 rounded-lg border transition-all text-left";

                if (isReview) {
                  if (index === currentQuestion.correctAnswer) {
                    buttonClass +=
                      " border-brand-green bg-brand-green/20 text-brand-green";
                  } else if (
                    index === currentAttempt?.selectedAnswer &&
                    !currentAttempt.isCorrect
                  ) {
                    buttonClass +=
                      " border-brand-red bg-brand-red/20 text-brand-red";
                  } else {
                    buttonClass += " border-white/10 bg-white/5 text-white/70";
                  }
                } else if (showExplanation) {
                  if (index === currentQuestion.correctAnswer) {
                    buttonClass +=
                      " border-brand-green bg-brand-green/20 text-brand-green";
                  } else if (
                    index === selectedAnswer &&
                    selectedAnswer !== currentQuestion.correctAnswer
                  ) {
                    buttonClass +=
                      " border-brand-red bg-brand-red/20 text-brand-red";
                  } else {
                    buttonClass += " border-white/10 bg-white/5 text-white/70";
                  }
                } else {
                  if (selectedAnswer === index) {
                    buttonClass +=
                      " border-brand-purple bg-brand-purple/20 text-brand-purple";
                  } else {
                    buttonClass +=
                      " border-white/10 bg-white/5 text-white/70 hover:border-white/20 hover:bg-white/10";
                  }
                }

                return (
                  <button
                    key={index}
                    onClick={() =>
                      !showExplanation && !isReview && setSelectedAnswer(index)
                    }
                    disabled={showExplanation || isReview}
                    className={buttonClass}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-semibold">
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span>{option}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            {showExplanation && currentQuestion.explanation && (
              <div className="mt-6 p-4 bg-dark-100 rounded-lg border border-white/10">
                <h3 className="text-white font-medium mb-2">Explanation</h3>
                <p className="text-white/70">{currentQuestion.explanation}</p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {isReview && currentQuestionIndex > 0 && (
                <button
                  onClick={() =>
                    setCurrentQuestionIndex(currentQuestionIndex - 1)
                  }
                  className="btn-secondary flex items-center gap-2"
                >
                  <ArrowLeftIcon className="w-4 h-4" />
                  Previous
                </button>
              )}
            </div>

            <div className="flex items-center gap-4">
              {!isReview && selectedAnswer !== null && !showExplanation && (
                <button
                  onClick={() => handleAnswerSubmit(selectedAnswer)}
                  className="btn-primary flex items-center gap-2"
                >
                  Submit Answer
                  <ArrowRightIcon className="w-4 h-4" />
                </button>
              )}

              {isReview &&
                currentQuestionIndex < currentQuestions.length - 1 && (
                  <button
                    onClick={() =>
                      setCurrentQuestionIndex(currentQuestionIndex + 1)
                    }
                    className="btn-primary flex items-center gap-2"
                  >
                    Next
                    <ArrowRightIcon className="w-4 h-4" />
                  </button>
                )}

              {isReview &&
                currentQuestionIndex === currentQuestions.length - 1 && (
                  <button onClick={resetQuiz} className="btn-primary">
                    Start New Quiz
                  </button>
                )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (quizState === "completed" && quizResult) {
    return (
      <div className="min-h-screen bg-dark-100 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Results Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-brand-purple rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircleIcon className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Quiz Completed!
            </h1>
            <p className="text-white/60">Here are your results</p>
          </div>

          {/* Score Card */}
          <div className="card-dark p-8 mb-6">
            <div className="text-center">
              <div className="text-6xl font-bold text-brand-purple mb-2">
                {quizResult.score}%
              </div>
              <div className="text-xl text-white mb-6">
                {quizResult.correctAnswers} out of {quizResult.totalQuestions}{" "}
                correct
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-brand-green mb-1">
                    {quizResult.correctAnswers}
                  </div>
                  <div className="text-white/60">Correct</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-brand-red mb-1">
                    {quizResult.incorrectAnswers}
                  </div>
                  <div className="text-white/60">Incorrect</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-brand-cyan mb-1">
                    {formatTime(quizResult.timeSpent)}
                  </div>
                  <div className="text-white/60">Time Spent</div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={reviewQuiz}
              className="btn-secondary flex items-center justify-center gap-2"
            >
              Review Answers
            </button>
            <button
              onClick={resetQuiz}
              className="btn-primary flex items-center justify-center gap-2"
            >
              Take Another Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
