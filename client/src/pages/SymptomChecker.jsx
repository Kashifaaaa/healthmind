import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
function Symptomchecker(){
const navigate= useNavigate()
const [symptoms, setSymptoms] = useState('')
const [result, setResult] = useState('')
const handleAnalyze = async () => {
  console.log('button clicked!', symptoms)  // add this line
    try {
      const response = await axios.post('https://healthmind-backend.onrender.com/api/ai/symptom-checker', {
        symptoms
      })
      setResult(response.data.result)
    } catch (error) {
      alert('Something went wrong!')
    }
  }
return (
    
    <div className="min-h-screen bg-blue-50 p-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Symptom Checker 🤒</h1>
      
      <div className="bg-white p-6 rounded-xl shadow-md">
        <textarea
          placeholder="Describe your symptoms..."
          className="w-full border p-3 rounded-lg h-32"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
        />
        <button onClick= {handleAnalyze} className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
          Analyze Symptoms
        </button>
        {result && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p>{result}</p>
          </div>
        )}
      </div>
    </div>
  )
}
export default Symptomchecker