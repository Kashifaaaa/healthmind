import axios from "axios"
import { useState } from "react"
import { useNavigate } from 'react-router-dom'

function Signup() {
    const[name, setName] = useState('')
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const navigate = useNavigate();
    const handleSignup= async() => {
      try{
        if(password !== confirmPassword) {
        alert('Passwords do not match!')
        return
}
        const response= await axios.post('https://healthmind-backend.onrender.com/api/auth/signup',{
          name,
          email, 
          password, 
          confirmPassword
        })
        alert('Account created!')
        navigate('/login')
      }
      catch(error) {
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

       <div className="bg-white rounded border border-gray-300 flex flex-col px-11 py-4">

            <h1 className="text-3xl font-bold text-blue-600 my-3 mx-auto block">Create Account</h1>
            <p className="text-gray-600 text-sm font-medium mt-2">Name</p>
            <input 
                autoComplete="off"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="rounded w-64 border "
                />
                <p className="text-gray-600 text-sm font-medium mt-2">Email</p>
                <input 
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="rounded w-64 border  "
                />
                <p className="text-gray-600 text-sm font-medium mt-2">Password</p>
                <input 
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="rounded w-64 border "
                />
                <p className="text-gray-600 text-sm font-medium mt-2"> Confirm password </p>
                <input
                autoComplete="new-password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                className="rounded w-64 border "
                />
                <button onClick={handleSignup} className="bg-blue-700 rounded w-32 text-white font-bold mx-auto block mt-4 cursor-pointer">Sign up</button>
                <p className="text-gray-500 mx-auto block m-2"> Already have an account?
                    <span onClick={() => navigate('/login')}
                     className="text-blue-700 font-bold cursor-pointer"> Login 
                     </span>    
                 </p>

      </div>
    </div>
  )
}

export default Signup