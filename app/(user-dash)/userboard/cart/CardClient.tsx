"use client";

import { CreditCard, Minus, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "./cardcontext";

interface CartItemType {
  id: string;
  quantity: number;
  food: {
    id: string;
    name: string;
    price: number;
    image: string;
    restaurantId: string;
  };
}

export default function CartClient() {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const [isOrdering, setIsOrdering] = useState(false);
  const router = useRouter();

  const subtotal = cartItems.reduce(
    (acc: number, item: CartItemType) =>
      acc + item.food.price * item.quantity,
    0
  );

  const deliveryFee = subtotal > 0 ? 40 : 0;
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = async () => {
    setIsOrdering(true);

    try {
      const restaurantId = cartItems[0]?.food?.restaurantId;

      if (!restaurantId) {
        alert("Restaurant information missing");
        return;
      }

      const res = await fetch("/api/order/created", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          restaurantId,
          totalAmount: total,
        }),
      });

      if (res.ok) {
        clearCart();
        router.push("/userboard/order");
      }
    } catch (error) {
      console.error("Order error:", error);
    } finally {
      setIsOrdering(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-white">
        <Trash2 size={48} className="mb-4 opacity-20" />
        <h2 className="text-xl font-bold">Your cart is empty</h2>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-4">
        <h1 className="text-white text-2xl font-bold mb-6">
          Review Order
        </h1>

        {cartItems.map((item: CartItemType) => (
          <div
            key={item.id}
            className="glass-card flex items-center gap-4 p-4"
          >
            <img
              src={item.food.image}
              alt={item.food.name}
              className="w-20 h-20 object-cover rounded-lg"
            />

            <div className="flex-1">
              <h3 className="text-white font-bold">
                {item.food.name}
              </h3>
              <p className="text-amber-500 text-sm">
                ₹{item.food.price}
              </p>
            </div>

            <div className="flex items-center gap-3 bg-black/40 rounded-lg p-1 border border-white/10">
              <button onClick={() => updateQuantity(item.id, -1)}>
                <Minus size={16} />
              </button>

              <span className="text-white font-bold w-4 text-center">
                {item.quantity}
              </span>

              <button onClick={() => updateQuantity(item.id, 1)}>
                <Plus size={16} />
              </button>
            </div>

            <button onClick={() => removeFromCart(item.id)}>
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="glass-card p-6 sticky top-24 border-t-4 border-amber-500">
          <h2 className="text-white font-bold text-lg mb-4">
            Order Summary
          </h2>

          <div className="space-y-3 text-sm border-b border-white/10 pb-4 mb-4">
            <div className="flex justify-between text-white/60">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="flex justify-between text-white/60">
              <span>Delivery Fee</span>
              <span>₹{deliveryFee}</span>
            </div>
          </div>

          <div className="flex justify-between text-white text-xl font-bold mb-6">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={isOrdering}
            className="w-full bg-amber-500 hover:bg-amber-400 text-black font-black py-4 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <CreditCard size={20} />
            {isOrdering ? "Processing..." : "Confirm & Pay"}
          </button>
        </div>
      </div>
    </div>
  );
}
