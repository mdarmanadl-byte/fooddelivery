'use client'
import { MapPin, ShieldCheck, Users, Utensils } from "lucide-react";
import { useRouter } from "next/navigation";
export default function AboutPage() {
  const router = useRouter()
  const handleClick = () => {
    router.push("/restaurant")
  }
  const values = [
    {
      icon: <Utensils className="text-amber-500" />,
      title: "Quality First",
      description: "We partner only with the most hygienic and top-rated restaurants in the city."
    },
    {
      icon: <MapPin className="text-amber-500" />,
      title: "Hyper-Local",
      description: "Born and raised in Patna, we understand the local taste better than anyone else."
    },
    {
      icon: <ShieldCheck className="text-amber-500" />,
      title: "Safe Delivery",
      description: "Our delivery partners follow strict safety protocols to ensure your food is fresh."
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] pb-20 pt-10">
      {/* 1. Hero Section */}
      <section className="max-w-7xl mx-auto px-6 text-center mb-20">
        <h1 className="text-white text-5xl md:text-7xl font-black mb-6 tracking-tight">
          Feeding the soul of <span className="text-amber-500">INDIA.</span>
        </h1>
        <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
          We started with a simple idea: Everyone deserves a great meal,
          delivered fast and fresh. Today, we bridge the gap between your
          favorite kitchens and your doorstep.
        </p>
      </section>

      {/* 2. Visual Split Section */}
      <section className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center mb-24">
        <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl group border border-white/10">
          {/* 1. The Image */}
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX59IH0j4TRc69QZLRQVm2pKfPqzNF9dWFjg&s"
            alt="Local Patna Food"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />

          {/* 2. Gradient Overlay - Makes the text readable */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

          {/* 3. The Content Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white font-black text-4xl md:text-5xl italic uppercase tracking-tighter drop-shadow-2xl">
              Local <span className="text-amber-500">Flavor</span>
            </span>
          </div>
        </div>
        <div className="space-y-6">
          <h2 className="text-white text-3xl font-bold">More than just a delivery app.</h2>
          <p className="text-white/60 leading-relaxed">
            Unlike global giants, we focus on the small details that matter to our city.
            From the narrow lanes of Boring Road to the busy streets of Kankarbagh,
            we know every shortcut to get your Biryani to you while it's still steaming.
          </p>
          <div className="flex gap-4">
            <div className="text-center">
              <p className="text-amber-500 text-3xl font-black">50+</p>
              <p className="text-white/40 text-xs">Restaurants</p>
            </div>
            <div className="w-[1px] h-10 bg-white/10" />
            <div className="text-center">
              <p className="text-amber-500 text-3xl font-black">15min</p>
              <p className="text-white/40 text-xs">Avg. Delivery</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Values */}
      <section className="bg-white/5 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-white text-3xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <div key={i} className="glass-card p-8 border border-white/5 hover:border-amber-500/30 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
                  {v.icon}
                </div>
                <h3 className="text-white font-bold text-xl mb-3">{v.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Join the Journey */}
      <section className="max-w-4xl mx-auto px-6 text-center mt-24">
        <div className="glass-card p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Users size={120} />
          </div>
          <h2 className="text-white text-3xl font-bold mb-4">Want to partner with us?</h2>
          <p className="text-white/60 mb-8">
            Whether you're a restaurant owner or a rider, we're always looking
            for passionate people to join our mission.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-amber-500 text-black px-8 py-3 rounded-xl font-bold hover:scale-105 transition-all"
              onClick={handleClick}
            >
              List your Restaurant
            </button>
            <button className="bg-white/10 text-white px-8 py-3 rounded-xl font-bold hover:bg-white/20 transition-all">
              Become a Rider
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}