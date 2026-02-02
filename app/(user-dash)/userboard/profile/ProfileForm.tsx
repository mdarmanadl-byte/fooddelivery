'use client'

import { Camera, Loader2, Save, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
export default function ProfileForm({ user }: { user: any }) {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [preview, setPreview] = useState(user.image || "");
    const fileInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter()
    // Handle Image Preview
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);

        // We use standard fetch but let the browser set the Content-Type for FormData
        const res = await fetch("/api/user/profile/update", {
            method: "PATCH",
            body: formData, // Sending the whole form including the image file
        });

        if (res.ok) {
            setMessage("Profile updated successfully!");
            router.refresh()
            setTimeout(() => setMessage(""), 3000);

        } else {
            setMessage("Error updating profile.");
        }
        setLoading(false);
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {/* --- Profile Image Upload Section --- */}
            <div className="flex flex-col items-center gap-4 pb-4">
                <div className="relative group">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-white/10 bg-white/5">
                        {preview ? (
                            <img src={preview} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-white/20">
                                <User size={40} />
                            </div>
                        )}
                    </div>
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute -bottom-2 -right-2 bg-amber-500 p-2 rounded-lg text-black hover:bg-amber-400 transition-all shadow-lg"
                    >
                        <Camera size={16} />
                    </button>
                    <input
                        type="file"
                        name="image"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        className="hidden"
                        accept="image/*"
                    />
                </div>
                <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest">Update Photo</p>
            </div>

            {/* --- Text Inputs Section --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                    <label className="text-white/60 text-xs font-bold uppercase ml-1">Full Name</label>
                    <input name="name" defaultValue={user.name} placeholder="Your Name" className="profile-input" />
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                    <label className="text-white/60 text-xs font-bold uppercase ml-1">Phone Number</label>
                    <input name="phoneNumber" defaultValue={user.phoneNumber} placeholder="+91..." className="profile-input" />
                </div>

                {/* City */}
                <div className="space-y-2">
                    <label className="text-white/60 text-xs font-bold uppercase ml-1">City</label>
                    <input name="city" defaultValue={user.city} placeholder="Patna" className="profile-input" />
                </div>

                {/* Pincode */}
                <div className="space-y-2">
                    <label className="text-white/60 text-xs font-bold uppercase ml-1">Pincode</label>
                    <input name="pincode" defaultValue={user.pincode} placeholder="800001" className="profile-input" />
                </div>
            </div>

            {/* Address */}
            <div className="space-y-2">
                <label className="text-white/60 text-xs font-bold uppercase ml-1">Delivery Address</label>
                <textarea
                    name="address"
                    rows={3}
                    defaultValue={user.address}
                    className="profile-input resize-none"
                    placeholder="Enter detailed address..."
                />
            </div>

            {/* Footer / Submit */}
            <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="h-4">
                    {message && <span className="text-green-500 text-sm font-medium">{message}</span>}
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-amber-500 hover:bg-amber-400 text-black px-10 py-3 rounded-xl font-black flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50"
                >
                    {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                    Save Profile
                </button>
            </div>
        </form>
    );
}