import { useState } from 'react';
import attendanceService from './AttendanceCalculatorService';

const AttendanceCalculator = () => {
  const [totalBoys, setTotalBoys] = useState<number>();
  const [totalGirls, setTotalGirls] = useState<number>();
  const [totalAbsentBoys, setTotalAbsentBoys] = useState<number>();
  const [totalAbsentGirls, setTotalAbsentGirls] = useState<number>();
  const [daysInMnoth, setDaysInMnoth] = useState(0);

  const [totalBoysPresent, setTotalBoysPresent] = useState(0);
  const [totalGirlsPresent, setTotalGirlsPresent] = useState(0);
  const [avgBoysPresent, setAvgBoysPresent] = useState(0);
  const [avgGirlsPresent, setAvgGirlsPresent] = useState(0);
  const [totalAvg, setTotalAvg] = useState(0);

  const handleChange = (entity: any, value: any) => {
    if (entity === 'boys') {
      const newTotalBoys = Math.max(0, Number(value) || 0);
      setTotalBoys(newTotalBoys);
    }
    if (entity === 'girls') {
      const newTotalGirls = Math.max(0, Number(value) || 0);
      setTotalGirls(newTotalGirls);
    }
    if (entity === 'absentBoys') {
      const newTotalAbsentBoys = Math.max(0, Number(value) || 0);
      setTotalAbsentBoys(newTotalAbsentBoys);
    }
    if (entity === 'absentGirls') {
      const newTotalAbsentGirls = Math.max(0, Number(value) || 0);
      setTotalAbsentGirls(newTotalAbsentGirls);
    }
    if (entity === 'daysInMnoth') {
      const newDaysInMnoth = Math.min(31, Math.max(0, Number(value) || 0));
      setDaysInMnoth(newDaysInMnoth);
    }
  };

  const handleReset = () => {
    setTotalBoys(0);
    setTotalGirls(0);
    setTotalAbsentBoys(0);
    setTotalAbsentGirls(0);
    setDaysInMnoth(0);
    setTotalBoysPresent(0);
    setTotalGirlsPresent(0);
    setAvgBoysPresent(0);
    setAvgGirlsPresent(0);
    setTotalAvg(0);
  };

  const hadnleCalculateToal = () => {
    const boys = calculateTotalBoysPresent();
    const girls = calculateTotalGirlsPresent();
    const avgBoys = calculateAverageBoysPresent(boys);
    const avgGirls = calculateAverageGirlsPresent(girls);
    const totalAvg = Number((Number(avgBoys) + Number(avgGirls)).toFixed(1));
    setTotalAvg(totalAvg);
  };

  const calculateTotalBoysPresent = () => {
    const res = attendanceService.calculateTotalPresenceInAMonth(totalBoys || 0, daysInMnoth || 0);
    setTotalBoysPresent(res - (totalAbsentBoys || 0));
    return res - (totalAbsentBoys || 0);
  };

  const calculateTotalGirlsPresent = () => {
    const res = attendanceService.calculateTotalPresenceInAMonth(totalGirls || 0, daysInMnoth || 0);
    setTotalGirlsPresent(res - (totalAbsentGirls || 0));
    return res - (totalAbsentGirls || 0);
  };

  const calculateAverageBoysPresent = (total: number) => {
    const avg = Number((total / daysInMnoth).toFixed(1));
    setAvgBoysPresent(avg);
    return avg;
  };
  const calculateAverageGirlsPresent = (total: number) => {
    const avg = Number((total / daysInMnoth).toFixed(1));
    setAvgGirlsPresent(avg);
    return avg;
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md transition-all duration-300 hover:shadow-2xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-indigo-700">
          🙋🏻‍♀️ Monthly Attendance Calculator
        </h1>

        {/* Enter Total */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4">
          {/* Boys */}
          <div className="flex flex-col flex-1">
            <label className="text-blue-700 font-medium mb-1">Total Boys:</label>
            <input
              type="number"
              min="0"
              max="100"
              value={totalBoys}
              onChange={(e) => handleChange('boys', e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              placeholder="Enter Total Number Of Boys"
            />
          </div>

          {/* Girls */}
          <div className="flex flex-col flex-1">
            <label className="text-blue-700 font-medium mb-1">Total Girls:</label>
            <input
              type="number"
              min="0"
              max="100"
              value={totalGirls}
              onChange={(e) => handleChange('girls', e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              placeholder="Enter Total Number Of Girls"
            />
          </div>
        </div>

        {/* Enter Absents */}
        <div className="flex  border-t pt-2 flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4">
          {/* Absent Boys */}
          <div className="flex flex-col flex-1">
            <label className="text-red-600 font-medium mb-1 ">Total Boys Absent:</label>
            <input
              type="number"
              min="0"
              max="100"
              value={totalAbsentBoys}
              onChange={(e) => handleChange('absentBoys', e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              placeholder="Enter number of absent boys"
            />
          </div>

          {/* Absent Girls */}
          <div className="flex flex-col flex-1">
            <label className="text-red-600 font-medium mb-1">Total Girls Absent:</label>
            <input
              type="number"
              min="0"
              max="100"
              value={totalAbsentGirls}
              onChange={(e) => handleChange('absentGirls', e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              placeholder="Enter number of absent girls"
            />
          </div>
        </div>
        <div className="mt-8 border-t pt-5 text-center space-y-3">
          {/* Days in a month */}
          <div className="flex flex-col flex-1">
            <label className="text-orange-600 font-medium mb-1">Total Days In A Month</label>
            <input
              type="number"
              min="0"
              max="100"
              value={daysInMnoth}
              onChange={(e) => handleChange('daysInMnoth', e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              placeholder="Enter total days in a month"
            />
          </div>
          {/* Action Button */}
          <div>
            <button
              onClick={hadnleCalculateToal}
              className="mt-6 bg-blue-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-lg shadow transition-all duration-200"
            >
              Calculate Total
            </button>
          </div>
        </div>
        <div className="mt-8 border-t pt-5 text-center space-y-3">
          <p className="text-lg font text-gray-700">Total Boys Present: {totalBoysPresent}</p>
          <p className="text-lg font text-gray-700">Total Girls Present: {totalGirlsPresent}</p>
          <p className="text-lg font-bold text-gray-700">
            Total Presence: {totalBoysPresent + totalGirlsPresent}
          </p>
          <p className="text-lg font text-gray-700">Boys Average: {avgBoysPresent}</p>
          <p className="text-lg font text-gray-700">Girls Average: {avgGirlsPresent}</p>
          <p className="text-lg font-bold text-gray-700">Total Average: {totalAvg}</p>

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
};

export default AttendanceCalculator;
