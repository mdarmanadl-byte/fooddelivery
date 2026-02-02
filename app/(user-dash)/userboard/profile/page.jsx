
import { logout } from "@/app/action/logout";
import { prisma } from "@/lib/db";
import { Calendar, LogOut, Mail, MapPin } from "lucide-react"; // Added LogOut icon
import { cookies } from "next/headers";
import ProfileForm from "./ProfileForm";
export default async function ProfilePage() {
  const userId = (await cookies()).get("user_id")?.value;

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) return <div className="text-white p-10 text-center">Please login to view profile.</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex flex-col gap-8">
        
        {/* Header Section */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-black text-3xl font-black shadow-lg shadow-amber-500/20">
              {user.name[0].toUpperCase()}
            </div>
            <div>
              <h1 className="text-white text-3xl font-bold">{user.name}</h1>
              <p className="text-white/50 flex items-center gap-2 mt-1">
                <Mail size={14} /> {user.email}
              </p>
            </div>
          </div>

          {/* LOGOUT BUTTON */}
          <form action={logout}>
            <button 
              type="submit"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/50 transition-all text-sm font-bold"
            >
              <LogOut size={16} />
              Logout
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ... existing Quick Info Cards ... */}
          <div className="space-y-4">
             {/* Member Since Card */}
             <div className="glass-card p-5 border-l-2 border-amber-500">
               <h3 className="text-white/40 text-xs uppercase font-bold tracking-widest mb-3 flex items-center gap-2">
                 <Calendar size={14} /> Member Since
               </h3>
               <p className="text-white font-medium">
                 {new Date(user.createdAt).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
               </p>
             </div>

             {/* Current City Card */}
             <div className="glass-card p-5">
               <h3 className="text-white/40 text-xs uppercase font-bold tracking-widest mb-3 flex items-center gap-2">
                 <MapPin size={14} /> Current City
               </h3>
               <p className="text-white font-medium">{user.city || "Not set"}</p>
             </div>
              
          </div>

          {/* Right: Editable Form Section */}
          <div className="lg:col-span-2">
            <div className="glass-card p-8">
              <h2 className="text-white text-xl font-bold mb-6">Personal & Delivery Details</h2>
              <ProfileForm user={user} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}