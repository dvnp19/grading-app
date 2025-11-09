import React, { useState } from "react";
import { motion } from "framer-motion";

function App() {
  const subjects = ["English LIT", "Gen Eng", "Math", "EVS", "Gujarati", "Hindi"];
  const [marks, setMarks] = useState(Array(subjects.length).fill(0));

  const handleChange = (index, value) => {
    const newMarks = [...marks];
    newMarks[index] = Math.min(100, Math.max(0, Number(value) || 0));
    setMarks(newMarks);
  };

  const handleReset = () => {
    setMarks(Array(subjects.length).fill(0));
  };

  const total = marks.reduce((sum, mark) => sum + mark, 0);
  const percentage = (total / (subjects.length * 100)) * 100;

  const getGrade = (percent) => {
    if (percent >= 90) return "A+";
    if (percent >= 80) return "A";
    if (percent >= 70) return "B";
    if (percent >= 60) return "C";
    if (percent >= 50) return "D";
    return "F";
  };

  const grade = getGrade(percentage);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md transition-all duration-300 hover:shadow-2xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-indigo-700">
          🎓 Marks Calculator
        </h1>

        <div className="space-y-4">
          {subjects.map((subject, index) => (
            <div key={index} className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">
                {subject}
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={marks[index]}
                onChange={(e) => handleChange(index, e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                placeholder="Enter marks out of 100"
              />
            </div>
          ))}
        </div>

        <div className="mt-8 border-t pt-5 text-center space-y-3">
          <p className="text-lg font-semibold text-gray-700">
            Total: <span className="text-indigo-600">{total}</span> / {subjects.length * 100}
          </p>
          <p className="text-lg font-semibold text-gray-700">
            Percentage: <span className="text-green-600">{percentage.toFixed(2)}%</span>
          </p>
          <p className="text-lg font-semibold text-gray-700">
            Grade:{" "}
            <span
              className={`${
                grade === "F"
                  ? "text-red-600"
                  : grade === "A+" || grade === "A"
                  ? "text-green-600"
                  : "text-yellow-600"
              }`}
            >
              {grade}
            </span>
          </p>

          {/* Animated Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-4 mt-4 overflow-hidden">
            <motion.div
              className="h-4 bg-gradient-to-r from-indigo-500 to-green-400"
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>

          {/* Reset Button */}
          <button
            onClick={handleReset}
            className="mt-6 bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg shadow transition-all duration-200"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
