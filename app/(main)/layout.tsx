import Link from "next/link";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
        <div>
          <nav className="glass-nav px-2 py-2 flex justify-between items-center">
      {/* Logo Section */}
      <div className="text-white font-bold text-xl tracking-tight">
        <Link href="/">Foodie<span className="text-amber-400">Hub</span></Link>
      </div>

      {/* Navigation Links */}
      <div className="flex gap-3 items-center">
        <Link href="/about" className="text-white/80 hover:text-white transition-colors">
          About
        </Link>
        <Link href="/user" className="text-white/80 hover:text-white transition-colors">
          Login
        </Link>
        
        {/* Mordern Button Style */}
        <Link 
          href="/restaurant" 
          className="bg-amber-500/80 hover:bg-amber-500 text-white px-3 py-1 rounded-lg backdrop-blur-sm transition-all border border-white/10"
        >
          Partner with Us
        </Link>
      </div>
    </nav>
    <main>
      {children}
    </main>
        </div>
     
  );
}
