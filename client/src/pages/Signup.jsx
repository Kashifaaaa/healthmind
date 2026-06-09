import axios from "axios"
import { useState } from "react"
import { useNavigate } from 'react-router-dom'

function Signup() {
    const[name, setName] = useState('')
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const navigate = useNavigate();
    const handleSignup= async() => {
      try{
        const response= await axios.post('http://localhost:5000/api/auth/signup',{
          name,
          email, 
          password
        })
        alert('Account created!')
        navigate('/login')
      }
      catch(error) {
        alert(error.response.data.message)
      }
    }
    
  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <div className="bg-white rounded flex flex-col px-11 py-4">
            <h1 className="text-3xl font-bold text-blue-600 my-3 mx-auto block">Create Account</h1>
            <input 
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Enter your name"
                className="rounded w-64 border my-2"
                />
                <input 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter your email"
                className="rounded w-64 border my-2 "
                />
                <input 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter password"
                className="rounded w-64 border my-2"
                />
                <input 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Confirm password"
                className="rounded w-64 border my-3"
                />
                <button onClick={handleSignup} className="bg-blue-700 rounded w-32 text-white font-bold mx-auto block">Sign up</button>
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