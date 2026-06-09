import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import SymptomChecker from './pages/SymptomChecker'
import SleepLogger from './pages/SleepLogger'
import MoodTracker from './pages/MoodTracker'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/symptom-checker" element={<SymptomChecker/>}/>
        <Route path="/sleep-logger" element={<SleepLogger/>}/>
        <Route path="/mood-tracker" element={<MoodTracker/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App