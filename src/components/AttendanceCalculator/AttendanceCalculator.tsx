import { useState } from 'react';
import { motion } from 'framer-motion';
import attendanceService from './AttendanceCalculatorService';

type Field = 'totalBoys' | 'totalGirls' | 'totalAbsentBoys' | 'totalAbsentGirls' | 'daysInMonth';

const AttendanceCalculator = () => {
  const [form, setForm] = useState({
    totalBoys: '',
    totalGirls: '',
    totalAbsentBoys: '',
    totalAbsentGirls: '',
    daysInMonth: '',
  });

  const [errors, setErrors] = useState<Record<Field, string>>({
    totalBoys: '',
    totalGirls: '',
    totalAbsentBoys: '',
    totalAbsentGirls: '',
    daysInMonth: '',
  });

  const [result, setResult] = useState({
    totalBoysPresent: 0,
    totalGirlsPresent: 0,
    avgBoysPresent: 0,
    avgGirlsPresent: 0,
    totalAvg: 0,
  });

  const validate = (field: Field, value: string) => {
    const num = Number(value);

    // Required
    if (value === '') return 'This field is required';

    // Negative
    if (num < 0) return 'Value cannot be negative';

    // Days validation
    if (field === 'daysInMonth' && num <= 0) {
      return 'Days must be greater than 0';
    }
    return '';
  };

  const handleChange = (field: Field, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));

    const errorMsg = validate(field, value);
    setErrors((prev) => ({ ...prev, [field]: errorMsg }));
  };

  const hasErrors = Object.values(errors).some((e) => e !== '');
  const allFilled = Object.values(form).every((f) => f !== '');
  const canCalculate = allFilled && !hasErrors;

  const handleCalculate = () => {
    const totalBoys = Number(form.totalBoys);
    const totalGirls = Number(form.totalGirls);
    const absentBoys = Number(form.totalAbsentBoys);
    const absentGirls = Number(form.totalAbsentGirls);
    const days = Number(form.daysInMonth);

    const boys = attendanceService.calculateTotalPresenceInAMonth(totalBoys, days) - absentBoys;

    const girls = attendanceService.calculateTotalPresenceInAMonth(totalGirls, days) - absentGirls;

    const avgBoysPresent = Number((boys / days).toFixed(1));
    const avgGirlsPresent = Number((girls / days).toFixed(1));

    const totalAvg = Number((avgBoysPresent + avgGirlsPresent).toFixed(1));

    setResult({
      totalBoysPresent: boys,
      totalGirlsPresent: girls,
      avgBoysPresent,
      avgGirlsPresent,
      totalAvg,
    });
  };

  const handleReset = () => {
    setForm({
      totalBoys: '',
      totalGirls: '',
      totalAbsentBoys: '',
      totalAbsentGirls: '',
      daysInMonth: '',
    });

    setErrors({
      totalBoys: '',
      totalGirls: '',
      totalAbsentBoys: '',
      totalAbsentGirls: '',
      daysInMonth: '',
    });

    setResult({
      totalBoysPresent: 0,
      totalGirlsPresent: 0,
      avgBoysPresent: 0,
      avgGirlsPresent: 0,
      totalAvg: 0,
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      {/* Animated Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-center mb-6 text-indigo-700">
          🙋🏻‍♀️ Monthly Attendance Calculator
        </h1>

        {/* Dynamic Inputs */}
        {(
          [
            ['totalBoys', 'Total Boys'],
            ['totalGirls', 'Total Girls'],
            ['totalAbsentBoys', 'Absent Boys'],
            ['totalAbsentGirls', 'Absent Girls'],
            ['daysInMonth', 'Days In Month'],
          ] satisfies [Field, string][]
        ).map(([field, label]) => (
          <div key={field} className="mt-4">
            <label className="font-medium">{label}</label>
            <input
              type="number"
              value={form[field]}
              onChange={(e) => handleChange(field, e.target.value)}
              className={`border mt-1 w-full border-gray-300 rounded-lg px-3 py-2 focus:ring-2 
                ${errors[field] ? 'border-red-500' : 'focus:ring-indigo-400'}`}
              placeholder={`Enter ${label}`}
            />

            {/* Validation Error */}
            {errors[field] && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-600 text-sm mt-1"
              >
                {errors[field]}
              </motion.p>
            )}
          </div>
        ))}

        {/* Calculate Button */}
        <motion.button
          whileTap={{ scale: canCalculate ? 0.95 : 1 }}
          onClick={handleCalculate}
          disabled={!canCalculate}
          className={`mt-6 w-full font-semibold px-4 py-2 rounded-lg shadow transition-all duration-200
          ${
            canCalculate
              ? 'bg-blue-500 hover:bg-green-600 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Calculate Total
        </motion.button>

        {/* --- RESULTS SECTION --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-8 grid gap-4"
        >
          {/* Total Students */}
          <div className="bg-indigo-100 rounded-xl p-4 shadow flex justify-between items-center">
            <span className="font-semibold text-indigo-700">Total Students:</span>
            <span className="text-indigo-900 font-bold text-lg">
              {Number(form.totalBoys) + Number(form.totalGirls)}
            </span>
          </div>

          {/* Total Presence */}
          <div className="bg-green-100 rounded-xl p-4 shadow flex justify-between items-center">
            <span className="font-semibold text-green-700">Total Presence:</span>
            <span className="text-green-900 font-bold text-lg">
              {result.totalBoysPresent + result.totalGirlsPresent}
            </span>
          </div>

          {/* Individual Counts */}
          <div className="flex gap-4">
            {/* Boys */}
            <div className="flex-1 bg-blue-50 rounded-xl p-4 shadow text-center">
              <h3 className="font-medium text-blue-700 mb-2">Boys</h3>
              <p>
                Total Present: <span className="font-bold">{result.totalBoysPresent}</span>
              </p>
              <p>
                Average: <span className="font-bold">{result.avgBoysPresent}</span>
              </p>
              <div className="h-3 bg-blue-200 rounded-full mt-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${(result.avgBoysPresent / Number(form.daysInMonth || 1)) * 100}%`,
                  }}
                  className="h-3 bg-blue-500 rounded-full"
                  transition={{ duration: 0.8 }}
                />
              </div>
            </div>

            {/* Girls */}
            <div className="flex-1 bg-pink-50 rounded-xl p-4 shadow text-center">
              <h3 className="font-medium text-pink-700 mb-2">Girls</h3>
              <p>
                Total Present: <span className="font-bold">{result.totalGirlsPresent}</span>
              </p>
              <p>
                Average: <span className="font-bold">{result.avgGirlsPresent}</span>
              </p>
              <div className="h-3 bg-pink-200 rounded-full mt-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${(result.avgGirlsPresent / Number(form.daysInMonth || 1)) * 100}%`,
                  }}
                  className="h-3 bg-pink-500 rounded-full"
                  transition={{ duration: 0.8 }}
                />
              </div>
            </div>
          </div>

          {/* Total Average */}
          <div className="bg-yellow-100 rounded-xl p-4 shadow flex justify-between items-center">
            <span className="font-semibold text-yellow-700">Total Average:</span>
            <span className="text-yellow-900 font-bold text-lg">{result.totalAvg}</span>
          </div>
        </motion.div>

        {/* Reset Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleReset}
          className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg shadow"
        >
          Reset
        </motion.button>
      </motion.div>
    </div>
  );
};

export default AttendanceCalculator;
