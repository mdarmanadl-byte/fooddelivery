import { prisma } from "@/lib/db";
import { cookies } from "next/headers";

export default async function OrdersPage() {
  const userId = (await cookies()).get("user_id")?.value;

  const orders = await prisma.order.findMany({
    where: { userId },
    include: {
      items: { include: { food: true } },
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-white text-2xl font-bold">Your Orders</h1>
      
      {orders.map((order) => (
        <div key={order.id} className="glass-card p-6 border-l-4 border-amber-500">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-white/40 text-xs uppercase tracking-widest">Order ID</p>
              <p className="text-white font-mono text-sm">#{order.id.slice(-8)}</p>
            </div>
            
            {/* Status Badge */}
            <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
              order.status === 'PREPARING' ? 'bg-blue-500/20 text-blue-400' :
              order.status === 'OUT_FOR_DELIVERY' ? 'bg-amber-500/20 text-amber-400' :
              'bg-green-500/20 text-green-400'
            }`}>
              {order.status}
            </div>
          </div>

          <div className="space-y-2 border-y border-white/5 py-4 my-4">
            {order.items.map((item: any) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-white/70">{item.quantity}x {item.food.name}</span>
                <span className="text-white">₹{item.food.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center">
             <p className="text-white/40 text-xs">{new Date(order.createdAt).toLocaleString()}</p>
             <p className="text-white font-bold text-lg">Total: ₹{order.totalAmount}</p>
          </div>
        </div>
      ))}
    </div>
  );
}