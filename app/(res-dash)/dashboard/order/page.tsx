import { prisma } from "@/lib/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function RestaurantOrdersPage() {
  // 1. Get Restaurant ID from Cookie
  const cookieStore = await cookies();
  const resId = cookieStore.get("restaurant_id")?.value;

  if (!resId) redirect("/restaurant");

  // 2. Fetch Live Orders (Not Delivered or Cancelled)
  const orders = await prisma.order.findMany({
    where: {
      restaurantId: resId,
      status: {
        in: ["PENDING", "PREPARING", "OUT_FOR_DELIVERY"],
      },
    },
    include: {
      user: {
        select: { name: true, phoneNumber: true, address: true },
      },
      items: {
        include: { food: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-white text-2xl font-bold flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          Live Orders
        </h1>
        <span className="text-white/50 text-sm bg-white/5 px-3 py-1 rounded-full border border-white/10">
          {orders.length} Active Orders
        </span>
      </div>

      {orders.length === 0 ? (
        <div className="glass-card flex flex-col items-center justify-center p-20 text-center">
          <p className="text-white/40 text-lg italic">No active orders right now.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {orders.map((order) => (
            <div key={order.id} className="glass-card flex flex-col gap-4 border-l-4 border-amber-500">
              {/* Header: Order ID & Status */}
              <div className="flex justify-between items-start border-b border-white/10 pb-3">
                <div>
                  <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Order ID</p>
                  <p className="text-white text-sm font-mono">{order.id.slice(-8).toUpperCase()}</p>
                </div>
                <span className="bg-amber-500/20 text-amber-400 text-[10px] px-2 py-1 rounded-md font-bold uppercase">
                  {order.status}
                </span>
              </div>

              {/* Body: Items List */}
              <div className="space-y-3 py-2">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="bg-white/10 text-white w-6 h-6 flex items-center justify-center rounded text-xs font-bold">
                        {item.quantity}x
                      </span>
                      <p className="text-white/80">{item.food.name}</p>
                    </div>
                    <p className="text-white/40">₹{item.food.price * item.quantity}</p>
                  </div>
                ))}
              </div>

              {/* Footer: User Details & Total */}
              <div className="mt-auto pt-4 border-t border-white/10 flex justify-between items-end">
                <div className="text-xs">
                  <p className="text-white font-bold">{order.user.name}</p>
                  <p className="text-white/50 truncate max-w-[150px]">{order.user.address}</p>
                  <p className="text-amber-500 mt-1">{order.user.phoneNumber}</p>
                </div>
                <div className="text-right">
                  <p className="text-white/40 text-[10px] uppercase font-bold">Total Amount</p>
                  <p className="text-white text-xl font-bold">₹{order.totalAmount}</p>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 mt-2">
                 <button className="bg-white/5 hover:bg-white/10 text-white text-xs py-2 rounded-md transition-all">
                    Reject
                 </button>
                 <button className="bg-amber-500 hover:bg-amber-600 text-black text-xs font-bold py-2 rounded-md transition-all">
                    Update Status
                 </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}