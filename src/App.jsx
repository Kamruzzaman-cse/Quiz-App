import { useState } from "react";

// প্রশ্নগুলো একটা array এ রাখা — প্রতিটার সঠিক উত্তরের index দেওয়া আছে
const questions = [
  {
    question: "React কী দিয়ে লেখা হয়?",
    options: ["Python", "JavaScript", "Java", "C++"],
    correctIndex: 1,
  },
  {
    question: "useState কোন ধরনের hook?",
    options: ["Effect hook", "State hook", "Router hook", "Context hook"],
    correctIndex: 1,
  },
  {
    question: "JSX আসলে কী?",
    options: [
      "একটা আলাদা programming language",
      "HTML এর মতো দেখতে JavaScript syntax extension",
      "CSS framework",
      "Database query language",
    ],
    correctIndex: 1,
  },
  {
    question: "Component এ data পাঠানোর জন্য কী ব্যবহার হয়?",
    options: ["state", "props", "hooks", "effect"],
    correctIndex: 1,
  },
  {
    question: "npm run dev কমান্ডটা কী করে?",
    options: [
      "Project build করে",
      "Development server চালু করে",
      "Package install করে",
      "Project delete করে",
    ],
    correctIndex: 1,
  },
];

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQuestion = questions[currentIndex];

  const handleOptionClick = (index) => {
    if (showResult) return; // একবার answer দেওয়ার পর আবার ক্লিক করা যাবে না

    setSelected(index);
    setShowResult(true);

    if (index === currentQuestion.correctIndex) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setScore(0);
    setSelected(null);
    setShowResult(false);
    setQuizFinished(false);
  };

  // Quiz শেষ হয়ে গেলে result screen দেখাবে
  if (quizFinished) {
    return (
      <div className="min-h-screen w-full bg-[#0F1115] flex items-center justify-center p-6">
        <div className="w-full max-w-md rounded-2xl bg-[#171A21] border border-white/10 shadow-2xl p-10 text-center">
          <h2 className="text-white text-2xl font-bold mb-4">Quiz শেষ!</h2>
          <p className="text-white/70 text-lg mb-6">
            তোমার স্কোর: {score} / {questions.length}
          </p>
          <button
            onClick={handleRestart}
            className="px-6 py-3 rounded-xl bg-emerald-500/90 hover:bg-emerald-500 text-white font-semibold transition"
          >
            আবার শুরু করো
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#0F1115] flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl bg-[#171A21] border border-white/10 shadow-2xl p-8">
        <p className="text-white/40 text-sm mb-2">
          প্রশ্ন {currentIndex + 1} / {questions.length}
        </p>
        <h2 className="text-white text-xl font-semibold mb-6">
          {currentQuestion.question}
        </h2>

        <div className="flex flex-col gap-3 mb-6">
          {currentQuestion.options.map((option, index) => {
            let optionStyle = "bg-white/10 hover:bg-white/20 text-white";

            if (showResult) {
              if (index === currentQuestion.correctIndex) {
                optionStyle = "bg-emerald-500/90 text-white";
              } else if (index === selected) {
                optionStyle = "bg-red-500/90 text-white";
              } else {
                optionStyle = "bg-white/5 text-white/40";
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleOptionClick(index)}
                className={`text-left px-4 py-3 rounded-xl transition ${optionStyle}`}
              >
                {option}
              </button>
            );
          })}
        </div>

        {showResult && (
          <button
            onClick={handleNext}
            className="w-full px-6 py-3 rounded-xl bg-emerald-500/90 hover:bg-emerald-500 text-white font-semibold transition"
          >
            {currentIndex + 1 < questions.length ? "পরের প্রশ্ন" : "Result দেখো"}
          </button>
        )}
      </div>
    </div>
  );
}
