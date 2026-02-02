'use client'
import { useRouter } from "next/navigation";
import React, { useState } from "react";
function userSignup() {
    const [error ,setError]=useState<string>("")
    
   const [formData, setFormData] = useState({
    name:"",
    email:"",
    password:"",
    confirmPassword:""

  }); // ✅ added
  const router=useRouter()
  const HandleSinup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // ✅ validation
    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields are required")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Password and Confirm Password do not match")
      return
    }

    setError("") // clear error if valid

    const response = await fetch("/api/user/signup", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })

    const data = await response.json()
    alert(data.message)
    if (data.success){
      router.push("/userboard")
    }
    
    // console.log(data)
  }

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="glass-card w-full max-w-xs">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Create Account
        </h2>

        <form onSubmit={HandleSinup} className="flex flex-col gap-4">
          <input
            className="glass-input"
            type="text"
            placeholder=" Name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name:e.target.value})}
          />

          <input
            className="glass-input"
            type="email"
            placeholder="Email"
            value={formData.email}
             onChange={(e) => setFormData({...formData, email:e.target.value})}
          />

          <input
            className="glass-input"
            type="password"
            placeholder="Password"
            value={formData.password}
             onChange={(e) => setFormData({...formData, password:e.target.value})}
          />

          <input
            className="glass-input"
            type="password"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
             onChange={(e) => setFormData({...formData, confirmPassword:e.target.value})}
          />

        

          {/* ✅ Error text */}
          {error && (
            <p className="text-red-400 text-sm text-center">
              {error}
            </p>
          )}

          <button className="glass-button">Sign Up</button>
        </form>
      </div>
    </div>
  )
}

export default userSignup
