import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/home';
import GradingCalculator from './components/GradingCalculator/GradingCalculator';
import AttendanceCalculator from './components/AttendanceCalculator/AttendanceCalculator';

const App = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    {/* Navbar */}
    <nav className="bg-white shadow-md p-4 flex justify-center space-x-6 sticky top-0 z-50">
      <Link to="/" className="text-gray-700 font-semibold hover:text-indigo-600 transition-colors duration-200">
        Home
      </Link>
      <Link to="/grading-calculator" className="text-gray-700 font-semibold hover:text-indigo-600 transition-colors duration-200">
        Grade Calculator
      </Link>
      <Link to="/attendance-calculator" className="text-gray-700 font-semibold hover:text-indigo-600 transition-colors duration-200">
        Attendance Calculator
      </Link>
    </nav>

    {/* Routes */}
    <div className="p-6">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/grading-calculator" element={<GradingCalculator />} />
        <Route path="/attendance-calculator" element={<AttendanceCalculator />} />
      </Routes>
    </div>
  </div>
);

export default App;
