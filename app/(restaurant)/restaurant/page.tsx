'use client'
// 1. Rename your imports to start with a Capital Letter
import RestaurantLogin from '@/app/_components/restaurantLogin'
import RestaurantSignUp from '@/app/_components/restaurantSignUp'
import { useState } from 'react'

function Page() { // 2. Capitalize the page function name too
    const [login, setLogin] = useState(true)

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-4">
        {/* 3. Use the Capitalized names here */}
        {login ? <RestaurantLogin /> : <RestaurantSignUp />}
        
        <button 
          onClick={() => setLogin(!login)}
          className="mt-4 text-sm hover:text-amber-400 text-amber-500 underline w-full text-center"
        >
          {login ? "Don't have an account? SignUp" : "Already have an account? Login"}
        </button>
      </div>
    </div>
  )
}

export default Page