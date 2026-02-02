"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddFoodPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/restaurant/food", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Food added successfully!");
        router.push("/dashboard");
        router.refresh();
      } else {
        const error = await res.json();
        alert(error.message || "Failed to add food");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-start justify-center pt-2 pb-2">
      {/* max-w-md makes the form significantly smaller */}
      <div className="glass-card w-full max-w-md p-6 shadow-2xl border border-white/20">
        <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
          <h1 className="text-white text-lg font-semibold tracking-tight">New Menu Item</h1>
          <span className="text-[10px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full uppercase font-bold">Draft</span>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Row 1: Name and Price side-by-side */}
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <label className="text-white/50 text-[11px] uppercase font-bold ml-1 mb-1 block">Item Name</label>
              <input
                type="text"
                required
                placeholder="Dish name"
                className="w-full bg-black/20 border border-white/10 rounded-md p-2 text-sm text-white focus:ring-1 focus:ring-amber-500 outline-none transition-all placeholder:text-white/20"
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label className="text-white/50 text-[11px] uppercase font-bold ml-1 mb-1 block">Price</label>
              <input
                type="number"
                required
                placeholder="₹"
                className="w-full bg-black/20 border border-white/10 rounded-md p-2 text-sm text-white focus:ring-1 focus:ring-amber-500 outline-none transition-all placeholder:text-white/20"
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>
          </div>

          {/* Image URL with smaller height */}
          <div>
            <label className="text-white/50 text-[11px] uppercase font-bold ml-1 mb-1 block">Image URL</label>
            <input
              type="url"
              required
              placeholder="Paste link here..."
              className="w-full bg-black/20 border border-white/10 rounded-md p-2 text-sm text-white focus:ring-1 focus:ring-amber-500 outline-none transition-all placeholder:text-white/20"
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-white/50 text-[11px] uppercase font-bold ml-1 mb-1 block">Description</label>
            <textarea
              placeholder="Short dish details..."
              rows={2}
              className="w-full bg-black/20 border border-white/10 rounded-md p-2 text-sm text-white focus:ring-1 focus:ring-amber-500 outline-none transition-all resize-none placeholder:text-white/20"
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          {/* Compact Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold py-2.5 rounded-md transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
          >
            {loading ? (
              <span className="animate-spin h-4 w-4 border-2 border-black/20 border-t-black rounded-full" />
            ) : (
              "Publish to Menu"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}