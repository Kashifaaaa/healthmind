import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-blue-50 flex items-center">
      
      {/* Left Half - Content */}
      <div className="w-1/2 flex flex-col justify-center px-16">
        <h1 className="text-6xl font-bold text-blue-600 leading-tight">
          Health<span className="text-blue-400">Mind</span>
        </h1>
        <p className="text-gray-500 mt-4 text-xl leading-relaxed">
          Your personal AI-powered health companion. Track sleep, mood, symptoms and more.
        </p>
        <div className="mt-8 flex flex-col gap-4 w-72">
          <button
            onClick={() => navigate('/signup')}
            className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-md"
          >
            Get Started 
          </button>
          <button
            onClick={() => navigate('/login')}
            className="bg-white text-blue-600 font-bold rounded-xl w-full hover:bg-blue-50 border-blue-600 px-8 py-3 border-2 transition-all"
          >
            Login
          </button>
        </div>

        {/* Features list */}
        <div className="mt-10 flex flex-col gap-3">
          <p className="text-gray-500 flex items-center gap-2">
            <span className="text-green-500 font-bold">✓</span> AI Symptom Checker
          </p>
          <p className="text-gray-500 flex items-center gap-2">
            <span className="text-green-500 font-bold">✓</span> Sleep & Mood Tracking
          </p>
          <p className="text-gray-500 flex items-center gap-2">
            <span className="text-green-500 font-bold">✓</span> Personal Health Dashboard
          </p>
        </div>
      </div>

      {/* Right Half - Image */}
      <div className="w-1/2 flex items-center justify-center p-8">
        <img 
  src="https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg"
  alt="Health illustration"
  className="w-full max-w-lg rounded-2xl"
/>
      </div>

    </div>
  )
}

export default Home