import React, { useState } from 'react';

// Array of questions
const questions = [
  { country: 'France', capital: 'Paris' },
  { country: 'Germany', capital: 'Berlin' },
  { country: 'Italy', capital: 'Rome' },
  { country: 'Spain', capital: 'Madrid' },
  { country: 'Canada', capital: 'Ottawa' },
];

const QuestionCard = ({ country, onSubmit, answered, correct, capital }) => (
  <div className="text-center mb-6">
    <h2 className="text-2xl font-bold mb-4">{country}</h2>
    <p className="text-lg">What is the capital of {country}?</p>
    {answered && (
      <div className="mt-4 text-lg font-semibold">
        {correct ? (
          <span className="text-green-600">Correct!</span>
        ) : (
          <span className="text-red-600">Incorrect! The correct answer is {capital}.</span>
        )}
      </div>
    )}
    {onSubmit}
  </div>
);

const AnswerForm = ({ answer, setAnswer, onSubmit }) => (
  <form onSubmit={onSubmit}>
    <input
      type="text"
      value={answer}
      onChange={(e) => setAnswer(e.target.value)}
      placeholder="Enter Capital"
      className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button
      type="submit"
      className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg transition-colors duration-300 hover:bg-blue-600"
    >
      Submit Answer
    </button>
  </form>
);

const App = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState('');
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState(null);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSubmit = (e) => {
    e.preventDefault();
    setAnswered(true);
    const isCorrect = answer.toLowerCase() === currentQuestion.capital.toLowerCase();
    setCorrect(isCorrect);

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    // Reset answer field
    setAnswer('');

    // Move to the next question after 2 seconds
    setTimeout(() => {
      setAnswered(false);
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        alert(`Quiz Completed! Your final score is: ${score}`);
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md px-6 py-8 bg-white rounded-lg shadow-lg">
        
        {/* Scoreboard */}
        <div className="mb-6 text-right">
          <p className="text-lg font-bold">Score: {score} / {questions.length}</p>
        </div>

        {/* Question Card */}
        <QuestionCard
          country={currentQuestion.country}
          capital={currentQuestion.capital}
          onSubmit={<AnswerForm answer={answer} setAnswer={setAnswer} onSubmit={handleAnswerSubmit} />}
          answered={answered}
          correct={correct}
        />
      </div>
    </div>
  );
};

export default App;
