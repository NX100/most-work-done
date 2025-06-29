export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: "easy" | "medium" | "hard";
  category: string;
  explanation: string;
}

export interface QuizStats {
  totalQuizzes: number;
  averageScore: number;
  bestScore: number;
  timeSpent: string;
  streak: number;
}

export interface QuizCategory {
  id: string;
  name: string;
  color: string;
  questionCount: number;
}

export const quizCategories: QuizCategory[] = [
  { id: "all", name: "All", color: "bg-gray-500", questionCount: 50 },
  {
    id: "mathematics",
    name: "Mathematics",
    color: "bg-blue-500",
    questionCount: 15,
  },
  { id: "algebra", name: "Algebra", color: "bg-green-500", questionCount: 8 },
  {
    id: "geometry",
    name: "Geometry",
    color: "bg-purple-500",
    questionCount: 7,
  },
  {
    id: "geography",
    name: "Geography",
    color: "bg-orange-500",
    questionCount: 10,
  },
  { id: "history", name: "History", color: "bg-red-500", questionCount: 6 },
  { id: "science", name: "Science", color: "bg-teal-500", questionCount: 4 },
];

export const mockQuestions: Question[] = [
  {
    id: "q1",
    question: "What is the result of 15 + 27?",
    options: ["40", "42", "45", "48"],
    correctAnswer: 1,
    difficulty: "easy",
    category: "mathematics",
    explanation: "15 + 27 = 42. This is basic addition.",
  },
  {
    id: "q2",
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: 2,
    difficulty: "easy",
    category: "geography",
    explanation: "Paris is the capital and largest city of France.",
  },
  {
    id: "q3",
    question: "Solve for x: 2x + 5 = 15",
    options: ["3", "5", "7", "10"],
    correctAnswer: 1,
    difficulty: "medium",
    category: "algebra",
    explanation: "2x + 5 = 15, so 2x = 10, therefore x = 5.",
  },
  {
    id: "q4",
    question: "What is the area of a circle with radius 4?",
    options: ["12π", "16π", "8π", "4π"],
    correctAnswer: 1,
    difficulty: "medium",
    category: "geometry",
    explanation: "Area = πr² = π × 4² = 16π",
  },
  {
    id: "q5",
    question: "Who wrote '1984'?",
    options: [
      "Aldous Huxley",
      "George Orwell",
      "Ray Bradbury",
      "Ernest Hemingway",
    ],
    correctAnswer: 1,
    difficulty: "medium",
    category: "history",
    explanation:
      "George Orwell wrote the dystopian novel '1984', published in 1949.",
  },
  {
    id: "q6",
    question: "What is the chemical symbol for gold?",
    options: ["Go", "Gd", "Au", "Ag"],
    correctAnswer: 2,
    difficulty: "easy",
    category: "science",
    explanation:
      "Au is the chemical symbol for gold, from the Latin word 'aurum'.",
  },
  {
    id: "q7",
    question: "Which river is the longest in the world?",
    options: ["Amazon", "Nile", "Mississippi", "Yangtze"],
    correctAnswer: 1,
    difficulty: "medium",
    category: "geography",
    explanation:
      "The Nile River is generally considered the longest river in the world at about 6,650 km.",
  },
  {
    id: "q8",
    question: "What is the derivative of x³?",
    options: ["x²", "3x²", "3x", "x³/3"],
    correctAnswer: 1,
    difficulty: "hard",
    category: "mathematics",
    explanation: "Using the power rule: d/dx(x³) = 3x²",
  },
  {
    id: "q9",
    question: "In which year did World War II end?",
    options: ["1944", "1945", "1946", "1947"],
    correctAnswer: 1,
    difficulty: "easy",
    category: "history",
    explanation:
      "World War II ended in 1945 with the surrender of Japan on September 2, 1945.",
  },
  {
    id: "q10",
    question: "What is the speed of light in vacuum?",
    options: [
      "299,792,458 m/s",
      "300,000,000 m/s",
      "299,000,000 m/s",
      "301,000,000 m/s",
    ],
    correctAnswer: 0,
    difficulty: "hard",
    category: "science",
    explanation:
      "The speed of light in vacuum is exactly 299,792,458 meters per second.",
  },
];

export const mockQuizStats: QuizStats = {
  totalQuizzes: 47,
  averageScore: 78.5,
  bestScore: 95,
  timeSpent: "23h 45m",
  streak: 12,
};

export function generateQuiz(
  category: string,
  questionCount: number,
): Question[] {
  let availableQuestions = mockQuestions;

  if (category !== "all") {
    availableQuestions = mockQuestions.filter((q) => q.category === category);
  }

  // Shuffle and return requested number of questions
  const shuffled = [...availableQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(questionCount, shuffled.length));
}

export function calculateScore(
  questions: Question[],
  userAnswers: (number | null)[],
): {
  score: number;
  correct: number;
  total: number;
  percentage: number;
} {
  const correct = questions.reduce((count, question, index) => {
    return userAnswers[index] === question.correctAnswer ? count + 1 : count;
  }, 0);

  const total = questions.length;
  const percentage = Math.round((correct / total) * 100);
  const score = percentage;

  return { score, correct, total, percentage };
}

export function getDifficultyColor(
  difficulty: "easy" | "medium" | "hard",
): string {
  switch (difficulty) {
    case "easy":
      return "text-green-500";
    case "medium":
      return "text-yellow-500";
    case "hard":
      return "text-red-500";
    default:
      return "text-gray-500";
  }
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}
