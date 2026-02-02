'use client'

import { Loader2, Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "../(user-dash)/userboard/cart/cardcontext";
export default function FoodCard({ type, data }: { type: 'restaurant' | 'food', data: any }) {
  
  const isFood = type === 'food';
  const{addToCart}=useCart()
  const [loading, setLoading] = useState<boolean>(false)
  // Inside your FoodCard component
const placeholderImages = [
  '/images/res1.jpg',
  '/images/res2.jpg',
  '/images/res3.jpg',
  '/images/res4.jpg',
  '/images/res5.jpg'
];

// This uses the ID to consistently pick one image from your local folder
const getLocalImage = (id: string) => {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    // This "bit-shift" math scrambles the bits of the ID
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  // 2. Use the absolute value to ensure it's positive
  const index = Math.abs(hash);
  
  // 3. Return the image at that index
  return placeholderImages[index % placeholderImages.length];
};

 


  const handleAddClick = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to restaurant page if card is a link
    if (!isFood) return;

    setLoading(true);
    await addToCart(data); // Call the context function
    setLoading(false);
  }
  return (
   <div className="group relative min-w-[220px] md:min-w-[260px] aspect-[2/3] glass-card !p-0 overflow-hidden snap-start transition-all duration-500 hover:shadow-[0_0_30px_rgba(245,158,11,0.3)]">
  
  {/* Image Background */}
  <img 
    src={isFood ? data.image :  getLocalImage(data.id)} 
    alt={data.name} 
    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
  />

  {/* Glass Overlay */}
  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-4">
    <h3 className="text-white font-bold text-lg leading-tight mb-1">
      {data.name}
    </h3>
    
    {isFood ? (
      <div className="flex items-center justify-between mt-2">
        <span className="text-amber-400 font-bold text-lg">
          ₹{data.price}
        </span>
        <button
          onClick={handleAddClick}
          disabled={loading}
          className="bg-amber-500 hover:bg-amber-400 text-black p-1.5 rounded-full transition-all active:scale-90 disabled:opacity-50"
        >
          {loading ? <Loader2 size={18} className="animate-spin" /> : <Plus size={18} />}
        </button>
      </div>
    ) : (
      <div className="flex flex-col gap-1">
        <p className="text-white/60 text-xs italic">{data.address}</p>
        <Link 
          href={`/userboard/restaurant/${data.id}`}
          className="mt-2 text-center bg-white/10 backdrop-blur-md text-white text-xs py-2 rounded-md border border-white/10 hover:bg-white/20 transition-all"
        >
          View Menu
        </Link>
      </div>
    )}
  </div>
</div>

  );
}