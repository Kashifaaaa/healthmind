import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      <div className="text-center flex flex-col items-center">
        <h1 className="text-5xl font-bold text-blue-600">HealthMind 🏥</h1>
        <p className="text-gray-500 mt-3 text-xl">Your personal health companion</p>
        <button
          onClick={() => navigate('/signup')}
          className="mt-6 bg-blue-600 text-white px-8 py-3 w-72 rounded-lg font-bold text-lg hover:bg-blue-700"
        >  
          Get Started
        </button>
        <button
            onClick={() => navigate('/login')}
            className=' bg-white text-blue-600 font-bold rounded-lg w-72 hover:bg-blue-50 border-blue-600 px-9 py-3 mt-4 border-2'
        >
            Login
        </button>
      </div>
    </div>
  )
}

export default Home