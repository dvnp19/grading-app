import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate(); // hook for navigation

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="flex flex-col gap-4 w-64">
        {/* container with fixed width */}
        <button
          onClick={() => navigate('/grading-calculator')}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg shadow transition-all duration-200 w-full"
        >
          Calculate Grade
        </button>

        <button
          onClick={() => navigate('/attendance-calculator')}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg shadow transition-all duration-200 w-full"
        >
          Calculate Attendance
        </button>
      </div>
    </div>
  );
};

export default Home;
