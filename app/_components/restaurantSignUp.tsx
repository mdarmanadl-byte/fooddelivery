'use client'
import { useRouter } from "next/navigation"
import React, { useState } from "react"
function restaurantSignUp() {
  const [restaurant, setrestaurant] = useState<string>("")
  const [password, setpassword] = useState<string>("")
  const [email, setemail] = useState<string>("")
  const [confirmPassword, setconfirmPassword] = useState<string>("")
  const [address, setadress] = useState<string>("")
  const [error, setError] = useState<string>("") // ✅ added
  const router=useRouter()
  const HandleSinup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // ✅ validation
    if (!restaurant || !email || !password || !confirmPassword || !address) {
      setError("All fields are required")
      return
    }

    if (password !== confirmPassword) {
      setError("Password and Confirm Password do not match")
      return
    }

    setError("") // clear error if valid

    const response = await fetch("/api/restaurant/signup", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        restaurant,
        email,
        password,
        address
      })
    })

    const data = await response.json()
    alert(data.message)
    router.push("/dashboard")
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
            placeholder="Restaurant Name"
            value={restaurant}
            onChange={(e) => setrestaurant(e.target.value)}
          />

          <input
            className="glass-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />

          <input
            className="glass-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />

          <input
            className="glass-input"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setconfirmPassword(e.target.value)}
          />

          <input
            className="glass-input"
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setadress(e.target.value)}
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

export default restaurantSignUp
