import { useState, useEffect} from "react";
import axios from "axios";

function MoodTracker(){
 const[mood, setMood]= useState('')
 const[energy, setEnergy]= useState('')
 const[date, setDate]= useState('')
 const[note, setNote]= useState('')
 const[logs, setLogs]= useState([])

 const handleSave = async () => {
  try {
    const userId = localStorage.getItem('userId') || 'test-user'
    await axios.post('http://localhost:5000/api/mood', {
      userId, energy, mood, date, note
    })
    alert('Mood got saved!😴')
    fetchLogs()
  } catch (error) {
    alert('Something went wrong!')
  }
}

const fetchLogs = async () => {
  // get userId from localStorage
  try{
    const userId= localStorage.getItem('userId') || 'test-user'
    const response= await axios.get( `http://localhost:5000/api/mood/${userId}`)
    setLogs(response.data)
  }
  
  catch (error) {
    console.log('Error fetching logs')
  }
}
 useEffect(() => {
  fetchLogs()
}, [])

 return (
    <div className="min-h-screen bg-purple-50 p-8">
        <h1 className="text-3xl font-bold text-purple-600 mb-6">
            Mood Tracker 🧠
        </h1>
        
        <div className="bg-white p-6 rounded-xl shadow-md">
            {/* inputs will go here */}
            {/* Mood Buttons */}
<p className="font-bold mb-2">How are you feeling?</p>
<div className="flex gap-2 mb-4">
  {['Happy', 'Sad', 'Anxious', 'Calm', 'Angry'].map((m) => (
    <button
      key={m}
      onClick={() => setMood(m)}
      className={`px-4 py-2 rounded-lg border ${
        mood === m 
          ? 'bg-purple-600 text-white' 
          : 'bg-white text-gray-600'
      }`}
    >
      {m}
    </button>
  ))}
</div>
{/* Energy Level */}
<p className="font-bold mb-2">Energy Level: {energy}/10</p>
<input
  type="range"
  min="1"
  max="10"
  value={energy}
  onChange={(e) => setEnergy(e.target.value)}
  className="w-full mb-4"
/>

{/* Note */}
<textarea
  placeholder="How was your day? (optional)"
  className="w-full border p-3 rounded-lg h-24 mb-4"
  value={note}
  onChange={(e) => setNote(e.target.value)}
/>

{/* Date */}
<input
  type="date"
  className="w-full border p-3 rounded-lg mb-4"
  value={date}
  onChange={(e) => setDate(e.target.value)}
/>

{/* Save Button */}
<button onClick={handleSave}
className="bg-purple-600 text-white px-6 py-2 rounded-lg">
  Save Mood
</button>
{/* Mood History */}
{logs.length > 0 && (
  <div className="mt-6">
    <h2 className="text-xl font-bold mb-3">Mood History</h2>
    {logs.map((log, index) => (
      <div key={index} className="p-3 bg-purple-50 rounded-lg mb-2">
        <p>🧠 {log.mood} — Energy: {log.energy}/10</p>
        <p className="text-gray-500 text-sm">{log.note}</p>
        <p className="text-gray-400 text-xs">{new Date(log.date).toLocaleDateString()}</p>
      </div>
    ))}
  </div>
)}
        </div>
    </div>
)
}

export default MoodTracker