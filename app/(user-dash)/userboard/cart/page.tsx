import { Suspense } from "react";
import CartClient from "./CardClient";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-amber-500"></div>
        </div>
      }
    >
      <CartClient />
    </Suspense>
  );
}
