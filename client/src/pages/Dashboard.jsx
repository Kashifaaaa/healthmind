import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const navigate = useNavigate()
  
  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem('user'))

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }

 return (
  <div className="min-h-screen bg-blue-50">

    {/* Navbar */}
    <div className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-blue-600">HealthMind 🏥</h1>
      <p className="text-gray-600">Welcome, {user.name}! 👋</p>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-600"
      >
        Logout
      </button>
    </div>

    {/* Feature Cards */}
    <div className="p-8 grid grid-cols-2 gap-6">
        <div 
    onClick={() => navigate('/symptom-checker')}
    className="bg-white p-6 rounded-xl shadow-md cursor-pointer hover:shadow-lg">
    <h2 className="text-4xl">🤒</h2>
    <h3 className="text-xl font-bold mt-2">Symptom Checker</h3>
    <p className="text-gray-500 mt-1">Describe your symptoms and get AI analysis</p>
  </div>
      <div onClick={() => navigate('/sleep-logger')} 
      className="bg-white p-6 rounded-xl shadow-md cursor-pointer hover:shadow-lg">
        <h2 className="text-4xl">😴</h2>
        <h3 className="text-xl font-bold mt-2">Sleep Logger</h3>
        <p className="text-gray-500 mt-1">Track your sleep patterns daily</p>
      </div>
      <div onClick={() => navigate('/mood-tracker')} 
      className="bg-white p-6 rounded-xl shadow-md cursor-pointer hover:shadow-lg ">
        <h2 className="text-4xl">🧠</h2>
        <h3 className="text-xl font-bold mt-2">Mood Tracker</h3>
        <p className="text-gray-500 mt-1">Log your daily mood and energy levels</p>
      </div>
      <div onClick={() => navigate('/medication-reminder')} 
      className="bg-white p-6 rounded-xl shadow-md cursor-pointer hover:shadow-lg">
        <h2 className="text-4xl">💊</h2>
        <h3 className="text-xl font-bold mt-2">Medication Reminder</h3>
        <p className="text-gray-500 mt-1">Never miss your medicines again</p>
      </div>
    </div>
    

  </div>
)
}
export default Dashboard