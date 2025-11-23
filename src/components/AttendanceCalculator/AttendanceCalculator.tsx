const AttendanceCalculator = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md transition-all duration-300 hover:shadow-2xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-indigo-700">
          🙋🏻‍♀️ Monthly Attendance Calculator
        </h1>

        <div className="space-y-4"></div>

        <div className="mt-8 border-t pt-5 text-center space-y-3">
          <p className="text-lg font-semibold text-gray-700">Total:</p>
          <p className="text-lg font-semibold text-gray-700">Percentage:</p>
          <p className="text-lg font-semibold text-gray-700">Grade:</p>

          {/* Reset Button */}
          <button
            // onClick={handleReset}
            className="mt-6 bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg shadow transition-all duration-200"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttendanceCalculator;
