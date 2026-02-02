import UserNavbar from "@/app/_usercomponent/usernav";
import { CartProvider } from "./userboard/cart/cardcontext";
export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
    <CartProvider>
      <UserNavbar />
      <main className="pt-24 min-h-screen">
       
        {/* Everything inside here can now use addtocart */}
        {children}
   
      </main>
       </CartProvider>
    </>
  );
}