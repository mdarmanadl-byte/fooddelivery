
import { useRouter } from "next/navigation";
import { useState } from "react";
function restaurantLogin() {
    const [email , setemail]=useState<string>("")
    const [password , setpassword]=useState<string>("")
    const route=useRouter()
    const handlelogin=async(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const response =await fetch("/api/restaurant/login",{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                email,
                password
            })
        })
        const data=await response.json()
        if (data.success===true){
          route.push("/dashboard")
        }else{
            alert(data.message)
        }
    }
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="glass-card w-full max-w-xs">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Restaurant Login</h2>
        <form onSubmit={handlelogin} className="flex flex-col gap-4">
          <input 
            className="glass-input" 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e)=>setemail(e.target.value)} 
            required
          />
          <input 
            className="glass-input" 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e)=>setpassword(e.target.value)} 
            required
          />
          <button className="glass-button">Login</button>
        </form>
      </div>
    </div>
  )
}

export default restaurantLogin