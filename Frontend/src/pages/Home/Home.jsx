
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Search,
  Sparkles,
  Star,
  Clock,
  Heart,
  ArrowRight,
  Flame,
  CheckCircle2,
  Utensils,
  ChevronRight,
  MapPin,
  ChefHat,
  TrendingUp
} from "lucide-react";
import { getUserMeals } from "../../api/api"; 

/* =====================================================================
   🎨 GLOBAL STYLES & ANIMATIONS
   ===================================================================== */
const INJECTED_CSS = `
.hide-scrollbar::-webkit-scrollbar { display: none; }
.hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

/* 3D Tilt Effect Container */
.tilt-card {
  perspective: 1000px;
  transform-style: preserve-3d;
}
.tilt-content {
  transition: transform 0.1s;
}

/* Shimmer Overlay */
.shimmer {
  position: relative;
  overflow: hidden;
}
.shimmer::before {
  content: '';
  position: absolute;
  top: 0; left: -100%; width: 50%; height: 100%;
  background: linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent);
  transform: skewX(-25deg);
  animation: shine 3s infinite;
}

@keyframes shine {
  0% { left: -100%; }
  20% { left: 200%; }
  100% { left: 200%; }
}

/* Masonry Grid */
.masonry-grid { column-count: 2; column-gap: 1.5rem; }
@media (min-width: 768px) { .masonry-grid { column-count: 3; } }
@media (min-width: 1280px) { .masonry-grid { column-count: 4; } }
.break-inside-avoid { break-inside: avoid; }
`;

/* ---------------- Dummy Data ---------------- */
const HERO_IMAGES = [
  { id: 1, src: "https://i.pinimg.com/736x/e1/bc/40/e1bc40d857eebef23656276205422b9f.jpg", label: "Hyderabadi Biryani", col: "col-span-2 row-span-2", badge: "Legendary" }, 
  { id: 2, src: "https://i.pinimg.com/736x/7f/f1/5c/7ff15cda15ab978c1b38b9aaf366bbae.jpg", label: "Butter Chicken", col: "col-span-1 row-span-1", badge: "Creamy" },
  { id: 3, src: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=600&auto=format&fit=crop", label: "Cheesy Pizza", col: "col-span-1 row-span-1", badge: "Hot" },
  { id: 4, src: "https://i.pinimg.com/1200x/7a/1c/b1/7a1cb1f87c95f83f9291a7b97f312da2.jpg", label: "Samosa", col: "col-span-1 row-span-1", badge: "Crispy" },
  { id: 5, src: "https://i.pinimg.com/736x/d0/f9/5e/d0f95e2e50b977162f8a7f45dbd06052.jpg", label: "Masala Dosa", col: "col-span-1 row-span-1", badge: "Classic" },
   { id: 6, src: "https://i.pinimg.com/1200x/56/00/76/5600766d79ec9a73782be89ab0e46f29.jpg", label: "Puran Poli", col: "col-span-1 row-span-1", badge: "Classic" },
  
];

const CATEGORIES = [
  { name: "Healthy", icon: "🥗", color: "bg-green-100 text-green-700" },
  { name: "Spicy", icon: "🌶️", color: "bg-red-100 text-red-700" },
  { name: "Sweet", icon: "🍩", color: "bg-pink-100 text-pink-700" },
  { name: "Fast Food", icon: "🍔", color: "bg-orange-100 text-orange-700" },
];

/* =====================================================================
   🏠 MAIN COMPONENT
   ===================================================================== */
export default function Home() {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);

  // State
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Fake Live Orders Ticker
  const [liveOrder, setLiveOrder] = useState("Rahul just ordered Butter Chicken 🍗");

  // Refs
  const debounceRef = useRef(null);
  const searchContainerRef = useRef(null);

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = INJECTED_CSS;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // Fetch Data
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const res = await getUserMeals();
        if (mounted) {
           const data = (res?.data && res.data.length > 0) ? res.data : []; 
           // If API empty, we can fallback or show empty state. Using empty [] here for realism
           setMeals(normalizeMeals(data));
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  // Live Ticker Animation
  useEffect(() => {
     const orders = ["Priya ordered Masala Dosa 🥞", "Amit ordered Paneer Tikka 🧀", "Sana ordered Biryani 🥘", "Vikram ordered Pizza 🍕"];
     let i = 0;
     const interval = setInterval(() => {
        setLiveOrder(orders[i]);
        i = (i + 1) % orders.length;
     }, 4000);
     return () => clearInterval(interval);
  }, []);

  const normalizeMeals = (data) => {
    return data.map((m, i) => ({
      id: m.id || m.mealId || i,
      name: m.name || m.mealName || "Delicious Meal",
      image: m.image || m.imageUrl || "https://i.pinimg.com/1200x/e8/c3/f2/e8c3f2eb0b35f9fb1c059917fbb74650.jpg",
      cuisine: m.cuisine || "Indian",
      price: m.price || m.mealPrice || 199,
      rating: m.rating || 4.5,
      deliveryTime: m.deliveryTime || "30-40 min",
      discount: m.discount || (i % 3 === 0 ? "20% OFF" : null),
      city: m.city || "Nearby"
    }));
  };

  // Search Logic
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      const hits = meals.filter(m => 
        m.name.toLowerCase().includes(query.toLowerCase()) || 
        m.cuisine.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(hits.slice(0, 5));
      setIsSearchOpen(true);
    }, 300);
  }, [query, meals]);

  // Click Outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/cuisine?search=${encodeURIComponent(query)}`);
      setIsSearchOpen(false);
    }
  };

  const handleSuggestionClick = (dish) => navigate(`/cuisine?search=${encodeURIComponent(dish.name)}`);
  const handleDishClick = () => navigate("/cuisine");
  const handleSubscriptionClick = () => navigate("/subscription");

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-gray-800 font-sans selection:bg-red-100 selection:text-red-700 overflow-x-hidden">
      
      {/* ================= HERO SECTION ================= */}
      <header className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        
        {/* Animated Blobs */}
        <motion.div animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }} transition={{ duration: 10, repeat: Infinity }} className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-red-100/40 to-orange-100/40 rounded-full blur-[100px] -z-10" />
        <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, -5, 0] }} transition={{ duration: 12, repeat: Infinity, delay: 1 }} className="absolute top-40 left-0 -translate-x-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-yellow-100/30 to-red-50/30 rounded-full blur-[100px] -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
            
            {/* LEFT: TEXT CONTENT */}
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex-1 text-center lg:text-left z-10 w-full"
            >
              {/* Live Ticker */}
              <motion.div 
                key={liveOrder}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gray-100 shadow-sm text-gray-500 text-xs font-medium mb-6"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                {liveOrder}
              </motion.div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-[1.1] mb-6">
                Taste the <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 cursor-default">
                   Extraordinary ✨
                </span>
              </h1>
              
              <p className="text-lg text-gray-500 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
                From local street food to gourmet delicacies, get the best meals delivered to your doorstep in minutes.
              </p>

              {/* Enhanced Search Bar */}
              <div ref={searchContainerRef} className="relative max-w-lg mx-auto lg:mx-0 group z-50">
                <form onSubmit={handleSearchSubmit} className="relative transition-transform duration-300 transform group-hover:-translate-y-1">
                  <input 
                    type="text" 
                    className="block w-full pl-14 pr-4 py-4 bg-white border border-gray-200 rounded-2xl shadow-xl shadow-gray-100 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-red-50 focus:border-red-500 transition-all text-base"
                    placeholder="Search 'Biryani', 'Cake'..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  <Search className="absolute inset-y-0 left-5 top-4 h-6 w-6 text-gray-400" />
                  <button type="submit" className="absolute right-2 top-2 bottom-2 bg-red-600 hover:bg-red-700 text-white px-6 rounded-xl font-bold text-sm shadow-lg hover:shadow-red-200 transition-all active:scale-95">
                    Find Food
                  </button>
                </form>

                {/* Suggestions Dropdown */}
                <AnimatePresence>
                  {isSearchOpen && suggestions.length > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.98 }}
                      className="absolute left-0 right-0 mt-3 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50"
                    >
                      {suggestions.map((dish) => (
                          <div 
                              key={dish.id} 
                              onClick={() => handleSuggestionClick(dish)}
                              className="flex items-center gap-4 p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0 transition-colors group"
                          >
                            <img src={dish.image} alt="" className="w-12 h-12 rounded-xl object-cover shadow-sm group-hover:scale-105 transition-transform" />
                            <div className="text-left flex-1">
                              <p className="font-bold text-gray-800 text-sm">{dish.name}</p>
                              <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                                 <Star size={10} className="text-yellow-500 fill-yellow-500"/> {dish.rating} • {dish.cuisine}
                              </div>
                            </div>
                            <ChevronRight className="ml-auto w-4 h-4 text-gray-300 group-hover:text-red-500 transition-colors" />
                          </div>
                        ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Floating Categories */}
              <div className="mt-10 flex flex-wrap justify-center lg:justify-start gap-4">
                 {CATEGORIES.map((cat, i) => (
                    <motion.button
                       key={i}
                       whileHover={{ y: -5 }}
                       onClick={handleDishClick}
                       className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs shadow-sm hover:shadow-md transition-all ${cat.color} bg-opacity-50 backdrop-blur-sm border border-white/40`}
                    >
                       <span>{cat.icon}</span> {cat.name}
                    </motion.button>
                 ))}
              </div>
            </motion.div>

            {/* RIGHT: HERO GRID (3D TILT) */}
            <motion.div 
              style={{ y: heroY }}
              initial={{ opacity: 0, rotate: 5 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="flex-1 w-full max-w-xl tilt-card"
            >
              <div className="grid grid-cols-3 grid-rows-3 gap-4 h-[500px] w-full p-4 bg-white/40 backdrop-blur-xl rounded-[2.5rem] border border-white/60 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] tilt-content">
                 
                 {HERO_IMAGES.map((img) => (
                    <div 
                       key={img.id}
                       onClick={handleDishClick}
                       className={`${img.col} relative rounded-3xl overflow-hidden cursor-pointer group shadow-md hover:shadow-xl transition-all duration-500`}
                    >
                       <img src={img.src} alt={img.label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                       
                       {/* Floating Badge */}
                       <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-bold px-2 py-1 rounded-lg">
                          {img.badge}
                       </div>

                       <div className="absolute bottom-4 left-4 text-white translate-y-2 group-hover:translate-y-0 transition-transform">
                          <p className="font-bold text-sm leading-tight">{img.label}</p>
                       </div>
                    </div>
                 ))}

              </div>
            </motion.div>

          </div>
        </div>
      </header>

      {/* ================= MAIN CONTENT ================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 pb-20">
        
        {/* 1. STATS BANNER */}
        <motion.div 
           initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
           className="bg-white rounded-[2rem] p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-wrap justify-around items-center gap-8"
        >
           <StatItem number="50k+" label="Happy Tummies" icon={<Heart className="text-red-500"/>} />
           <div className="h-12 w-px bg-gray-100 hidden md:block"></div>
           <StatItem number="4.9" label="Top Rated" icon={<Star className="text-yellow-500 fill-yellow-500"/>} />
           <div className="h-12 w-px bg-gray-100 hidden md:block"></div>
           <StatItem number="30m" label="Fast Delivery" icon={<Clock className="text-blue-500"/>} />
           <div className="h-12 w-px bg-gray-100 hidden md:block"></div>
           <StatItem number="100%" label="Hygienic" icon={<CheckCircle2 className="text-green-500"/>} />
        </motion.div>

        {/* 2. CHEF'S SPECIAL (Spotlight) */}
        <section>
           <SectionHeader title="Chef's Special" subtitle="Handpicked for the connoisseur in you" />
           <div className="relative rounded-[2.5rem] overflow-hidden h-[400px] md:h-[500px] group shadow-2xl">
              <img src="https://i.pinimg.com/1200x/84/bb/cd/84bbcdcd924f474d92e47dc9f7df9a31.jpg" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-110" alt="Special"/>
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 md:p-16 text-white max-w-2xl">
                 <div className="flex items-center gap-2 mb-4">
                    <ChefHat className="text-yellow-400"/>
                    <span className="text-yellow-400 font-bold tracking-widest uppercase text-sm">Today's Pick</span>
                 </div>
                 <h2 className="text-4xl md:text-6xl font-bold font-['Playfair_Display'] mb-6 leading-tight">Royal Rajasthani Thali</h2>
                 <p className="text-gray-300 text-lg mb-8 line-clamp-2">Experience the grandeur of Rajasthan with Dal Baati Churma, Gatte ki Sabzi, and more.</p>
                 <button onClick={handleDishClick} className="px-8 py-4 bg-red-600 text-white rounded-full font-bold text-lg shadow-lg hover:bg-red-700 transition-all flex items-center gap-2">
                    Order This Feast <ArrowRight size={20}/>
                 </button>
              </div>
           </div>
        </section>

        {/* 3. FRESH CRAVINGS (Masonry Grid) */}
        <section>
          <SectionHeader title="Fresh from Kitchen" subtitle="Explore the newest additions to our menu" />
          {loading ? (
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
                {[1,2,3].map(i => <div key={i} className="h-72 bg-gray-200 rounded-[2rem]" />)}
             </div>
          ) : (
            <div className="masonry-grid">
              {meals.slice(0, 8).map(meal => (
                <DishCard 
                  key={meal.id} 
                  data={meal} 
                  onClick={handleDishClick} 
                />
              ))}
            </div>
          )}
        </section>

        {/* 4. SUBSCRIPTION CTA (Dark Mode Card) */}
        <section className="relative overflow-hidden rounded-[3rem] bg-gray-900 text-white p-10 md:p-20 text-center shadow-2xl border border-gray-800">
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/20 rounded-full blur-[120px] pointer-events-none" />
           <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
           
           <div className="relative z-10 max-w-4xl mx-auto">
              <span className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-4 block">Membership</span>
              <h2 className="text-4xl md:text-6xl font-bold mb-6 font-['Playfair_Display']">
                 Eat Better. <span className="text-red-500">Pay Less.</span>
              </h2>
              <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
                 Unlock flat 30% OFF + Free Delivery on every order with Tiffino Pro. No hidden charges.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                 <button 
                   onClick={handleSubscriptionClick}
                   className="px-10 py-4 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-transform hover-shine shadow-xl flex items-center justify-center gap-2"
                 >
                    Get Pro <Sparkles size={18} className="text-yellow-500 fill-yellow-500"/>
                 </button>
                 <button onClick={handleDishClick} className="px-10 py-4 border border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all">
                    Explore Menu
                 </button>
              </div>
           </div>
        </section>

        {/* 5. POPULAR (Horizontal Scroll) */}
        <section>
           <SectionHeader title="Popular Cravings" subtitle="What everyone in your city is eating" />
           <div className="flex gap-6 overflow-x-auto hide-scrollbar pb-10 -mx-4 px-4 lg:mx-0 lg:px-0">
              {meals.slice(0, 6).reverse().map(meal => (
                <HorizontalCard 
                   key={meal.id} 
                   data={meal} 
                   onClick={handleDishClick}
                />
              ))}
           </div>
        </section>

      </main>
    </div>
  );
}

/* ================= HELPERS ================= */

function StatItem({ number, label, icon }) {
  return (
    <div className="flex flex-col items-center text-center">
       <div className="mb-2 p-2 bg-gray-50 rounded-full">{icon}</div>
       <p className="text-2xl font-extrabold text-gray-900">{number}</p>
       <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">{label}</p>
    </div>
  );
}

function SectionHeader({ title, subtitle }) {
  return (
    <div className="mb-10 flex items-end justify-between">
      <div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">{title}</h2>
        <p className="text-gray-500 mt-2 font-medium">{subtitle}</p>
      </div>
      <button className="hidden md:flex items-center gap-2 text-red-600 font-bold text-sm bg-red-50 px-4 py-2 rounded-full hover:bg-red-100 transition">
         View All <ArrowRight size={16} />
      </button>
    </div>
  );
}

function DishCard({ data, onClick }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      onClick={onClick}
      className="group relative mb-8 break-inside-avoid rounded-[2.5rem] bg-white border border-gray-100 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_25px_50px_-10px_rgba(0,0,0,0.1)] transition-all duration-500 cursor-pointer overflow-hidden"
    >
      <div className="relative h-64 overflow-hidden shimmer">
        <img src={data.image} alt={data.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute top-4 left-4 flex gap-2">
           {data.discount && <span className="px-3 py-1 bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg">{data.discount}</span>}
           <span className="px-3 py-1 bg-white/90 backdrop-blur text-gray-800 text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg flex items-center gap-1"><Clock size={10}/> {data.deliveryTime}</span>
        </div>
        <button className="absolute bottom-4 right-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:scale-110 transition"><Heart size={20}/></button>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
           <h3 className="font-bold text-xl text-gray-900 leading-tight w-3/4 group-hover:text-red-600 transition-colors">{data.name}</h3>
           <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-lg border border-green-100">
             <Star size={12} className="text-green-600 fill-green-600" />
             <span className="text-xs font-bold text-green-700">{data.rating}</span>
           </div>
        </div>
        <p className="text-sm text-gray-500 mb-6 line-clamp-1">{data.cuisine} • {data.city}</p>
        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
           <p className="text-2xl font-extrabold text-gray-900">₹{data.price}</p>
           <button className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-900 group-hover:bg-gray-900 group-hover:text-white transition-all shadow-sm">
             <ChevronRight size={24} />
           </button>
        </div>
      </div>
    </motion.div>
  );
}

function HorizontalCard({ data, onClick }) {
    return (
        <div 
          onClick={onClick}
          className="min-w-[300px] h-[380px] rounded-[2.5rem] relative overflow-hidden group shadow-lg cursor-pointer shimmer"
        >
            <img src={data.image} alt={data.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            
            <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold border border-white/20">
               Trending
            </div>

            <div className="absolute bottom-0 left-0 w-full p-8 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-2xl font-bold mb-2 leading-tight">{data.name}</h3>
                <p className="text-white/70 text-sm mb-6 line-clamp-1">{data.cuisine} • Chef's Special</p>
                <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-yellow-400">₹{data.price}</span>
                    <button className="bg-white text-black w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition shadow-lg">
                        <ArrowRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}