import { useState, useEffect} from "react";
import axios from "axios";

function SleepLogger(){
    const[hours, setHours] =useState('')
    const[date, setDate] =useState('')
    const[logs, setLogs] =useState([])

   const handleSave = async () => {
  try {
    const userId = localStorage.getItem('userId') || 'test-user'
    await axios.post('https://healthmind-backend.onrender.com/api/sleep', {
      userId,
      hours,
      date
    })
    alert('Sleep log saved! 😴')
    fetchLogs()  // ← ADD THIS LINE
  } catch (error) {
    alert('Something went wrong!')
  }
}
    const fetchLogs = async () => {
  try {
    const userId = localStorage.getItem('userId') || 'test-user'
    const response = await axios.get(
      `https://healthmind-backend.onrender.com/api/sleep/${userId}`
    )
    setLogs(response.data)
  } catch (error) {
    console.log('Error fetching logs')
  }
}

useEffect(() => {
  fetchLogs()
}, [])
    return (
       <div className="min-h-screen bg-blue-50 p-8">
    <h1 className="text-3xl font-bold text-blue-600 mb-6">
      Sleep Logger 😴
    </h1>
    <div className="bg-white p-6 rounded-xl shadow-md">
      
      {/* Hours input */}
      <input
        type="number"
        placeholder="Hours slept"
        className="w-full border p-3 rounded-lg mb-4"
        value={hours}
         onChange={(e) => setHours(e.target.value)}
        />
        <input
        type="date"
        className="w-full border p-3 rounded-lg mb-4"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      {/* Save button */}
      <button onClick={handleSave} className="bg-blue-600 text-white px-6 py-2 rounded-lg">
        Save Sleep Log
      </button>
      {/* Sleep History */}
{logs.length > 0 && (
  <div className="mt-6">
    <h2 className="text-xl font-bold mb-3">Sleep History</h2>
    {logs.map((log, index) => (
      <div key={index} className="p-3 bg-blue-50 rounded-lg mb-2">
        <p>🌙 {log.hours} hours — {new Date(log.date).toLocaleDateString()}</p>
      </div>
    ))}
  </div>
)}

    </div>
        </div>
    )
}
export default SleepLogger