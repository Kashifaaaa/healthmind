import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import axios from "axios"

function Dashboard() {
  const navigate = useNavigate()
  const [sleepData, setSleepData] = useState([])
  const [moodData, setMoodData] = useState([])
  
  const user = JSON.parse(localStorage.getItem('user'))

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }

  const fetchData = async () => {
    try {
      const userId = localStorage.getItem('userId') || 'test-user'
      const sleepResponse = await axios.get(
        `https://healthmind-backend.onrender.com/api/sleep/${userId}`
      )
      setSleepData(sleepResponse.data)
      const moodResponse = await axios.get(
        `https://healthmind-backend.onrender.com/api/mood/${userId}`
      )
      setMoodData(moodResponse.data)
    } catch (error) {
      console.log('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <div className="bg-white shadow-sm p-4 flex justify-between items-center border-b">
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
          className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 cursor-pointer hover:shadow-md hover:border-blue-200 transition-all">
          <h2 className="text-4xl">🤒</h2>
          <h3 className="text-xl font-bold mt-2 text-gray-800">Symptom Checker</h3>
          <p className="text-gray-400 mt-1 text-sm">Describe your symptoms and get AI analysis</p>
        </div>
        <div
          onClick={() => navigate('/sleep-logger')}
          className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 cursor-pointer hover:shadow-md hover:border-blue-200 transition-all">
          <h2 className="text-4xl">😴</h2>
          <h3 className="text-xl font-bold mt-2 text-gray-800">Sleep Logger</h3>
          <p className="text-gray-400 mt-1 text-sm">Track your sleep patterns daily</p>
        </div>
        <div
          onClick={() => navigate('/mood-tracker')}
          className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 cursor-pointer hover:shadow-md hover:border-purple-200 transition-all">
          <h2 className="text-4xl">🧠</h2>
          <h3 className="text-xl font-bold mt-2 text-gray-800">Mood Tracker</h3>
          <p className="text-gray-400 mt-1 text-sm">Log your daily mood and energy levels</p>
        </div>
        <div
          onClick={() => navigate('/medication-reminder')}
          className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 cursor-pointer hover:shadow-md hover:border-green-200 transition-all">
          <h2 className="text-4xl">💊</h2>
          <h3 className="text-xl font-bold mt-2 text-gray-800">Medication Reminder</h3>
          <p className="text-gray-400 mt-1 text-sm">Never miss your medicines again</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="px-8 pb-8 grid grid-cols-2 gap-6">

        {/* Sleep Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Sleep History</h2>
              <p className="text-gray-400 text-sm">Hours slept per night</p>
            </div>
            <span className="text-3xl">😴</span>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={sleepData.map(log => ({
              date: new Date(log.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
              hours: Number(log.hours)
            }))}>
              <defs>
                <linearGradient id="sleepGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} domain={[0, 12]} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
              <Line type="monotone" dataKey="hours" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', r: 5 }} activeDot={{ r: 7 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Mood Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Energy Levels</h2>
              <p className="text-gray-400 text-sm">Daily energy tracking</p>
            </div>
            <span className="text-3xl">⚡</span>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={moodData.map(log => ({
              date: new Date(log.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
              energy: Number(log.energy),
              mood: log.mood
            }))}>
              <defs>
                <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.9} />
                  <stop offset="95%" stopColor="#c4b5fd" stopOpacity={0.6} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} domain={[0, 10]} />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                formatter={(value, name, props) => [value, `Energy (Mood: ${props.payload.mood})`]}
              />
              <Bar dataKey="energy" fill="url(#moodGradient)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  )
}

export default Dashboard
