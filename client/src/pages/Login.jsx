import axios from 'axios'
import  { useNavigate } from 'react-router-dom'
import { useState } from 'react'
function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const handleLogin = async () => {
  try {
    const response = await axios.post('https://healthmind-backend.onrender.com/api/auth/login', {
      email,
      password
    })
    console.log(response.data)
    localStorage.setItem('token', response.data.token)
    localStorage.setItem('user', JSON.stringify(response.data.user))
    localStorage.setItem('userId', response.data.user._id)
    alert('Login successful!')
    navigate('/dashboard')
  } catch (error) {
    alert(error.response.data.message)
  }
}
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 flex items-center justify-center relative overflow-hidden">
 {/* Decorative circles */}
  <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 rounded-full -translate-x-32 -translate-y-32 opacity-50"></div>
  <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300 rounded-full translate-x-48 translate-y-48 opacity-30"></div>
  <div className="absolute top-1/2 right-10 w-32 h-32 bg-blue-400 rounded-full opacity-20"></div>
  <div className="absolute top-20 right-20 w-20 h-20 bg-blue-200 rounded-full opacity-40"></div>

        <div className="bg-white p-8 rounded-xl shadow-md w-96 flex flex-col gap-4 border border-gray-300">
            <h1 className="text-3xl font-bold text-blue-600 ">Welcome</h1>
            <input 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter your email"
            className="border p-2 rounded w-full "
            />
            <input 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter the password"
            className="border p-2 rounded w-full"
            />
            <button onClick={handleLogin} className="rounded w-32 bg-blue-800 p-2 px-4 py-2 mx-auto block font-bold text-white ">Login </button>
            <p className="text-gray-500 text-center">Don't have an account?
                <span className="text-blue-700 font-bold cursor-pointer"
                onClick={() => navigate('/signup')} 
                > Sign up</span>
            </p>
      </div>
    </div>
  )
}

export default Login