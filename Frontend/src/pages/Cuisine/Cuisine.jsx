
import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../../context/CartContext";
import { getUserCuisines } from "../../api/api"; // API for New Dishes
import { CUISINES } from "../../assets/data/dishes"; // Static Data

// Icons
import {
  Star,
  Filter,
  Clock,
  ShoppingCart,
  Heart,
  Sparkles,
  X,
  Leaf,
  Activity,
  AlertTriangle,
  Eye,
  MapPin,
  ChevronDown,
  ChevronUp,
  Search,
  SlidersHorizontal
} from "lucide-react";

/* =====================================================================
   🎨 GLOBAL STYLES
   ===================================================================== */
const GLOBAL_CSS = `
  .hide-scrollbar::-webkit-scrollbar { display: none; }
  .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  
  .glass-panel {
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.6);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.05);
  }

  .shine-hover { position: relative; overflow: hidden; }
  .shine-hover::after {
    content: ''; position: absolute; top: 0; left: -100%; width: 50%; height: 100%;
    background: linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent);
    transform: skewX(-25deg); pointer-events: none; transition: 0.5s;
  }
  .shine-hover:hover::after { left: 150%; transition: 0.7s ease-in-out; }
`;

/* =====================================================================
   🥣 COMPONENT: DISH CARD
   ===================================================================== */
function DishCard({ dish, onAdd, onInc, onDec, qty, onQuickView, isFavorite, toggleFav }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      className="group relative glass-panel rounded-[2rem] overflow-hidden hover:shadow-[0_20px_50px_rgba(226,55,68,0.15)] transition-all duration-500 hover:-translate-y-2 h-full flex flex-col"
    >
      {/* Image Area */}
      <div className="relative h-56 overflow-hidden cursor-pointer shrink-0" onClick={() => onQuickView(dish)}>
        <img
          src={dish.image || dish.imageUrl}
          alt={dish.name || dish.mealName}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-70 transition-opacity" />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg text-white ${dish.veg || dish.mealCategory === "Veg" ? "bg-green-600" : "bg-red-600"}`}>
            {dish.veg || dish.mealCategory === "Veg" ? "Veg" : "Non-Veg"}
          </span>
          {dish.rating >= 4.8 && (
            <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg bg-yellow-500 text-white flex items-center gap-1">
              <Star size={10} fill="white" /> Top Rated
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="absolute top-4 right-4 flex flex-col gap-3">
           <button 
             onClick={(e) => { e.stopPropagation(); toggleFav(dish.id || dish.mealId); }}
             className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center hover:bg-white transition-all shadow-lg group/icon"
           >
             <Heart size={16} className={`transition-colors ${isFavorite ? 'fill-red-500 text-red-500' : 'text-white group-hover/icon:text-red-500'}`} />
           </button>
           <button 
             onClick={(e) => { e.stopPropagation(); onQuickView(dish); }}
             className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-gray-900 transition-all shadow-lg"
           >
             <Eye size={16} />
           </button>
        </div>

        {/* Overlay Info */}
        <div className="absolute bottom-0 left-0 w-full p-4 text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
           <h3 className="text-lg font-bold leading-tight mb-1 truncate">{dish.name || dish.mealName}</h3>
           <div className="flex justify-between items-end">
              <p className="text-xs text-gray-200 flex items-center gap-1 opacity-90">
                 <MapPin size={12} /> {dish.state || "India"}
              </p>
              <span className="text-xl font-bold">₹{dish.price || dish.mealPrice}</span>
           </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
         <div className="flex items-center gap-4 text-xs font-bold text-gray-400 mb-4 uppercase tracking-wide">
            <span className="flex items-center gap-1"><Clock size={14}/> 30 min</span>
            <span className="flex items-center gap-1"><Star size={14} className="text-yellow-500 fill-yellow-500"/> {dish.rating || 4.5}</span>
         </div>

         <div className="mt-auto">
            {qty === 0 ? (
                <button
                  onClick={() => onAdd(dish)}
                  className="w-full py-3 rounded-xl bg-gray-900 text-white font-bold text-sm shadow-lg hover:bg-red-600 hover:shadow-red-200 transition-all shine-hover flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={16} /> Add
                </button>
            ) : (
                <div className="flex items-center justify-between bg-gray-50 rounded-xl p-1 border border-gray-200">
                  <button onClick={() => onDec(dish.id || dish.mealId)} className="w-9 h-9 flex items-center justify-center rounded-lg bg-white shadow-sm text-gray-600 hover:text-red-600 font-bold text-lg transition">-</button>
                  <span className="font-bold text-gray-900 text-base">{qty}</span>
                  <button onClick={() => onInc(dish.id || dish.mealId)} className="w-9 h-9 flex items-center justify-center rounded-lg bg-red-600 text-white shadow-md font-bold text-lg transition">+</button>
                </div>
            )}
         </div>
      </div>
    </motion.div>
  );
}

/* =====================================================================
   🥘 COMPONENT: DISH DETAIL MODAL
   ===================================================================== */
function DishDetailModal({ dish, onClose, onAdd, qty, onInc, onDec }) {
  if (!dish) return null;

  const id = dish.id || dish.mealId;
  const name = dish.name || dish.mealName;
  const price = dish.price || dish.mealPrice;
  const image = dish.image || dish.imageUrl;
  const veg = dish.veg || dish.mealCategory === "Veg";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-md"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[85vh]"
      >
        <div className="relative w-full md:w-5/12 h-64 md:h-auto">
           <img src={image} alt={name} className="w-full h-full object-cover" />
           <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
           <button onClick={onClose} className="md:hidden absolute top-4 right-4 w-9 h-9 bg-white/20 backdrop-blur rounded-full text-white flex items-center justify-center"><X size={18}/></button>
           <div className="absolute bottom-6 left-6 text-white md:hidden">
              <h2 className="text-2xl font-bold">{name}</h2>
              <p className="text-sm opacity-90">{dish.region}</p>
           </div>
        </div>

        <div className="flex-1 flex flex-col p-6 md:p-8 overflow-y-auto hide-scrollbar relative">
           <button onClick={onClose} className="hidden md:flex absolute top-6 right-6 w-9 h-9 rounded-full bg-gray-100 hover:bg-red-100 text-gray-500 hover:text-red-600 items-center justify-center transition"><X size={20}/></button>

           <div className="hidden md:block mb-6">
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white ${veg ? "bg-green-600" : "bg-red-600"}`}>
                 {veg ? "Vegetarian" : "Non-Veg"}
              </span>
              <h2 className="text-3xl font-extrabold text-gray-900 mt-3 mb-1">{name}</h2>
              <p className="text-gray-500 font-medium flex items-center gap-1 text-sm"><MapPin size={14}/> {dish.state}, {dish.region}</p>
           </div>

           <p className="text-gray-600 leading-relaxed text-sm mb-6 bg-gray-50 p-4 rounded-2xl border border-gray-100">
              {dish.description || "An authentic delicacy prepared with traditional spices and locally sourced ingredients. Bursting with flavors."}
           </p>

           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                 <h4 className="text-xs font-bold text-gray-400 uppercase mb-2 flex items-center gap-2"><Leaf size={14}/> Ingredients</h4>
                 <div className="flex flex-wrap gap-2">
                    {(dish.ingredients || ["Secret Spices", "Fresh Herbs"]).map((ing, i) => (
                       <span key={i} className="px-2.5 py-1 rounded-lg bg-white border border-gray-200 text-gray-600 text-xs font-semibold shadow-sm">{ing}</span>
                    ))}
                 </div>
              </div>
              {dish.allergies?.length > 0 && (
                 <div>
                    <h4 className="text-xs font-bold text-red-400 uppercase mb-2 flex items-center gap-2"><AlertTriangle size={14}/> Allergens</h4>
                    <div className="flex flex-wrap gap-2">
                       {dish.allergies.map((alg, i) => <span key={i} className="px-2.5 py-1 rounded-lg bg-red-50 border border-red-100 text-red-600 text-xs font-bold">{alg}</span>)}
                    </div>
                 </div>
              )}
           </div>

           <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 mb-6">
              <h4 className="text-xs font-bold text-blue-500 uppercase mb-3 flex items-center gap-2"><Activity size={14}/> Nutrition</h4>
              <div className="grid grid-cols-4 gap-2 text-center">
                 {["Calories", "Protein", "Carbs", "Fats"].map((label, i) => (
                    <div key={i} className="bg-white p-2 rounded-xl shadow-sm">
                       <div className="text-[10px] text-gray-400 font-bold uppercase">{label}</div>
                       <div className="text-sm font-extrabold text-gray-800">
                          {label === "Calories" ? (dish.nutrition?.calories || 350) : (dish.nutrition?.[label.toLowerCase()] || "10g")}
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between gap-4">
              <div><span className="block text-xs text-gray-400 font-bold uppercase">Price</span><span className="text-3xl font-extrabold text-gray-900">₹{price}</span></div>
              <div className="flex-1 max-w-xs">
                 {qty === 0 ? (
                    <button onClick={() => onAdd(dish)} className="w-full py-3.5 bg-red-600 text-white rounded-2xl font-bold shadow-xl hover:bg-red-700 transition shine-hover">Add to Order</button>
                 ) : (
                    <div className="flex items-center justify-between bg-gray-100 rounded-2xl p-2">
                       <button onClick={() => onDec(id)} className="w-10 h-10 bg-white rounded-xl shadow-sm font-bold text-gray-600">-</button>
                       <span className="text-xl font-bold">{qty}</span>
                       <button onClick={() => onInc(id)} className="w-10 h-10 bg-red-600 rounded-xl shadow font-bold text-white">+</button>
                    </div>
                 )}
              </div>
           </div>
        </div>
      </motion.div>
    </div>
  );
}

/* =====================================================================
   📊 COMPONENT: FILTER SIDEBAR (Collapsible Sections)
   ===================================================================== */
function FilterSidebar({ filters, setFilters, options, clearAll }) {
   // Collapsible state for sections
   const [openSections, setOpenSections] = useState({ region: true, state: true, price: true, type: true });

   const toggleSection = (key) => setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));

   return (
      <aside className="glass-panel rounded-[2rem] p-6 shadow-lg h-full overflow-y-auto hide-scrollbar">
         <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg flex items-center gap-2 text-gray-800"><Filter size={18} className="text-red-600"/> Filters</h3>
            <button onClick={clearAll} className="text-xs font-bold text-red-500 bg-red-50 px-3 py-1.5 rounded-lg hover:bg-red-100 transition">Reset</button>
         </div>

         <div className="mb-6 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
               type="text" 
               placeholder="Search dishes..."
               value={filters.search}
               onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
               className="w-full pl-9 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-red-100 focus:border-red-400 outline-none transition-all"
            />
         </div>

         <div className="space-y-6">
            {/* Region Filter */}
            <div className="border-b border-gray-100 pb-4">
               <button onClick={() => toggleSection('region')} className="w-full flex justify-between items-center text-xs font-bold text-gray-400 uppercase mb-3 tracking-widest hover:text-gray-600">
                  Region {openSections.region ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}
               </button>
               {openSections.region && (
                  <div className="flex flex-col gap-2 animate-in slide-in-from-top-2 duration-300">
                     <button onClick={() => setFilters(prev => ({ ...prev, region: "All", state: "All" }))} className={`text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${filters.region === "All" ? "bg-gray-900 text-white shadow-md" : "bg-white text-gray-600 hover:bg-gray-100"}`}>All Regions</button>
                     {options.regions.map(r => (
                        <button key={r} onClick={() => setFilters(prev => ({ ...prev, region: r, state: "All" }))} className={`text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${filters.region === r ? "bg-red-600 text-white shadow-md" : "bg-white border border-gray-100 text-gray-600 hover:border-red-200 hover:text-red-600"}`}>{r}</button>
                     ))}
                  </div>
               )}
            </div>

            {/* State Filter (Dynamic) */}
            {filters.region !== "All" && (
                <div className="border-b border-gray-100 pb-4">
                   <button onClick={() => toggleSection('state')} className="w-full flex justify-between items-center text-xs font-bold text-gray-400 uppercase mb-3 tracking-widest hover:text-gray-600">
                      State {openSections.state ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}
                   </button>
                   {openSections.state && (
                      <div className="flex flex-wrap gap-2 animate-in slide-in-from-top-2">
                         <button onClick={() => setFilters(prev => ({...prev, state: "All"}))} className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${filters.state === "All" ? "bg-gray-800 text-white" : "bg-white text-gray-500"}`}>All</button>
                         {options.states.map(s => (
                            <button key={s} onClick={() => setFilters(prev => ({...prev, state: s}))} className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${filters.state === s ? "bg-red-500 text-white border-red-500" : "bg-white text-gray-500 border-gray-200 hover:border-red-300"}`}>{s}</button>
                         ))}
                      </div>
                   )}
                </div>
            )}

            {/* Price Filter */}
            <div className="border-b border-gray-100 pb-4">
               <button onClick={() => toggleSection('price')} className="w-full flex justify-between items-center text-xs font-bold text-gray-400 uppercase mb-3 tracking-widest hover:text-gray-600">
                  Price Range {openSections.price ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}
               </button>
               {openSections.price && (
                  <div className="animate-in slide-in-from-top-2">
                     <div className="flex justify-between text-sm font-bold text-gray-800 mb-2">
                        <span>₹{options.minPrice}</span>
                        <span className="text-red-600">₹{filters.price}</span>
                     </div>
                     <input type="range" min={options.minPrice} max={options.maxPrice} value={filters.price} onChange={(e) => setFilters(prev => ({ ...prev, price: Number(e.target.value) }))} className="w-full accent-red-600 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"/>
                  </div>
               )}
            </div>

            {/* Type Filter */}
            <div>
               <label className="text-xs font-bold text-gray-400 uppercase mb-3 block tracking-widest">Type</label>
               <div className="flex p-1.5 bg-white rounded-xl border border-gray-200 shadow-inner">
                  {["All", "Veg", "Non-Veg"].map(type => (
                     <button key={type} onClick={() => setFilters(prev => ({ ...prev, type }))} className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all ${filters.type === type ? "bg-gray-900 text-white shadow-md" : "text-gray-500 hover:text-gray-900"}`}>{type}</button>
                  ))}
               </div>
            </div>
         </div>
      </aside>
   );
}

/* =====================================================================
   🚀 MAIN PAGE
   ===================================================================== */
export default function Cuisine() {
  const { items, addItem, increment, decrement } = useCart();
  
  // -- States --
  const [selectedDish, setSelectedDish] = useState(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  
  const [filters, setFilters] = useState({
     region: "All",
     state: "All",
     type: "All",
     price: 2000,
     sort: "default",
     search: ""
  });

  const [newDishes, setNewDishes] = useState([]);
  const [loadingNew, setLoadingNew] = useState(true);

  // 1. INJECT STYLES
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = GLOBAL_CSS;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // 2. MERGE STATIC DATA
  const allStaticDishes = useMemo(() => {
     return CUISINES.flatMap(regionData => 
        regionData.states.flatMap(stateData => 
           stateData.dishes.map(dish => ({
              ...dish,
              region: regionData.region,
              state: stateData.name,
              isStatic: true
           }))
        )
     );
  }, []);

  // 3. FETCH NEW ARRIVALS (Admin Added)
  useEffect(() => {
    const fetchNew = async () => {
       setLoadingNew(true);
       try {
          const res = await getUserCuisines();
          const rawData = res.data || [];
          
          // Flatten Admin Data
          const adminDishes = [];
          rawData.forEach(c => {
             c.meals.forEach(m => {
                adminDishes.push({
                   id: m.id, // backend ID
                   mealId: m.id,
                   name: m.mealName,
                   mealName: m.mealName,
                   price: m.mealPrice,
                   mealPrice: m.mealPrice,
                   image: m.imageUrl,
                   imageUrl: m.imageUrl,
                   veg: m.mealCategory === "Veg",
                   region: c.region,
                   state: c.state,
                   rating: 4.8, // Default rating for new items
                   isNew: true,
                   description: m.description,
                   ingredients: m.ingredients,
                   nutrition: m.nutrition,
                   allergies: m.allergies
                });
             });
          });
          
          // Newest first
          setNewDishes(adminDishes.reverse()); 
       } catch (e) { console.error(e); } 
       finally { setLoadingNew(false); }
    };
    fetchNew();
  }, []);

  // 4. COMBINE ALL FOR GRID (Admin + Static)
  const combinedDishes = useMemo(() => {
     return [...newDishes, ...allStaticDishes];
  }, [newDishes, allStaticDishes]);

  // 5. FILTER LOGIC
  const filterOptions = useMemo(() => {
     const regions = ["All", ...new Set(combinedDishes.map(d => d.region))];
     let states = [];
     if (filters.region !== "All") {
        states = [...new Set(combinedDishes.filter(d => d.region === filters.region).map(d => d.state))];
     }
     const prices = combinedDishes.map(d => d.price || d.mealPrice);
     return {
        regions,
        states,
        minPrice: Math.min(...prices) || 0,
        maxPrice: Math.max(...prices) || 2000
     };
  }, [combinedDishes, filters.region]);

  // Initial Price Set
  useEffect(() => {
     // Only set if user hasn't changed it manually (simple check)
     if (filters.price === 2000) setFilters(prev => ({ ...prev, price: filterOptions.maxPrice }));
  }, [filterOptions.maxPrice]);

  const filteredDishes = useMemo(() => {
     let data = combinedDishes;

     if (filters.search) {
        const q = filters.search.toLowerCase();
        data = data.filter(d => (d.name || d.mealName).toLowerCase().includes(q));
     }

     if (filters.region !== "All") data = data.filter(d => d.region === filters.region);
     if (filters.state !== "All") data = data.filter(d => d.state === filters.state);
     if (filters.type !== "All") {
        const isVeg = filters.type === "Veg";
        data = data.filter(d => (d.veg === isVeg || (d.mealCategory === "Veg") === isVeg));
     }
     
     data = data.filter(d => (d.price || d.mealPrice) <= filters.price);

     if (filters.sort === "priceLow") data.sort((a,b) => (a.price||a.mealPrice) - (b.price||b.mealPrice));
     if (filters.sort === "priceHigh") data.sort((a,b) => (b.price||b.mealPrice) - (a.price||a.mealPrice));
     
     return data;
  }, [combinedDishes, filters]);

  const toggleFav = (id) => setFavorites(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const clearAllFilters = () => setFilters({ region: "All", state: "All", type: "All", price: filterOptions.maxPrice, sort: "default", search: "" });

  return (
    <div className="min-h-screen bg-[#FDFDFD] relative font-sans selection:bg-red-100 selection:text-red-700 overflow-x-hidden">
      
      {/* Decor */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
         <motion.div animate={{ y: [0, -30, 0] }} transition={{ duration: 10, repeat: Infinity }} className="absolute top-0 right-0 w-[700px] h-[700px] bg-orange-100/40 rounded-full blur-[120px]" />
         <motion.div animate={{ y: [0, 30, 0] }} transition={{ duration: 12, repeat: Infinity }} className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-red-100/30 rounded-full blur-[120px]" />
      </div>

      <main className="max-w-[1600px] mx-auto px-4 md:px-8 py-8">
         
         <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
            <div className="text-center md:text-left">
               <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
                  India on a <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">Plate</span>
               </h1>
               <p className="text-gray-500 mt-2 text-lg">Authentic flavors from 28 states and 8 union territories.</p>
            </div>
            <button onClick={() => setMobileFilterOpen(true)} className="lg:hidden flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full font-bold shadow-lg">
               <SlidersHorizontal size={18}/> Filters
            </button>
         </div>

         {/* --- NEW ARRIVALS (Admin Dishes) --- */}
         {newDishes.length > 0 && (
            <section className="mb-12">
               <div className="flex items-center gap-3 mb-6 px-1">
                  <div className="p-2 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl text-white shadow-lg shadow-red-200"><Sparkles size={20}/></div>
                  <div>
                     <h2 className="text-xl font-bold text-gray-900">New Arrivals</h2>
                     <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Freshly added from kitchen</p>
                  </div>
               </div>
               <div className="flex gap-6 overflow-x-auto pb-10 pt-2 px-2 hide-scrollbar snap-x">
                  {newDishes.map((dish) => {
                     const id = dish.id || dish.mealId;
                     const qty = items.find(it => it.foodId === id)?.quantity || 0;
                     return (
                        <div key={id} className="min-w-[300px] md:min-w-[320px] snap-center">
                           <DishCard 
                              dish={dish} qty={qty} 
                              onAdd={addItem} onInc={increment} onDec={decrement}
                              onQuickView={setSelectedDish}
                              isFavorite={favorites.includes(id)} toggleFav={toggleFav}
                           />
                        </div>
                     );
                  })}
               </div>
            </section>
         )}

         {/* --- MAIN GRID LAYOUT --- */}
         <div className="grid lg:grid-cols-12 gap-8 relative items-start">
            
            {/* Sticky Sidebar */}
            <div className="hidden lg:block lg:col-span-3 sticky top-24 h-[calc(100vh-8rem)]">
               <div className="h-full overflow-y-auto hide-scrollbar pb-10">
                  <FilterSidebar filters={filters} setFilters={setFilters} options={filterOptions} clearAll={clearAllFilters} />
               </div>
            </div>

            {/* Content */}
            <div className="col-span-12 lg:col-span-9">
               {/* Active Chips Bar */}
               <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-white/60 backdrop-blur-xl p-4 rounded-2xl border border-white/50 shadow-sm">
                  <div className="flex flex-wrap items-center gap-2">
                     <span className="font-bold text-gray-700 mr-2">{filteredDishes.length} Dishes</span>
                     {filters.region !== "All" && <span className="px-3 py-1 bg-gray-900 text-white text-xs rounded-lg flex items-center gap-2">{filters.region} <X size={12} className="cursor-pointer" onClick={() => setFilters(p => ({...p, region: "All", state: "All"}))} /></span>}
                     {filters.type !== "All" && <span className={`px-3 py-1 text-white text-xs rounded-lg flex items-center gap-2 ${filters.type === "Veg" ? "bg-green-600" : "bg-red-600"}`}>{filters.type} <X size={12} className="cursor-pointer" onClick={() => setFilters(p => ({...p, type: "All"}))} /></span>}
                     {(filters.region !== "All" || filters.type !== "All") && <button onClick={clearAllFilters} className="text-xs font-bold text-red-500 hover:underline ml-2">Clear All</button>}
                  </div>
                  <div className="relative group">
                     <select value={filters.sort} onChange={(e) => setFilters(prev => ({...prev, sort: e.target.value}))} className="appearance-none bg-white border border-gray-200 pl-4 pr-10 py-2.5 rounded-xl font-bold text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-100 cursor-pointer shadow-sm hover:border-red-200 transition-colors">
                        <option value="default">Recommended</option>
                        <option value="priceLow">Price: Low to High</option>
                        <option value="priceHigh">Price: High to Low</option>
                     </select>
                     <ChevronDown size={16} className="absolute right-3 top-3.5 text-gray-400 pointer-events-none"/>
                  </div>
               </div>

               {/* Dish Grid */}
               {filteredDishes.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                     {filteredDishes.map((dish) => {
                        const id = dish.id || dish.mealId;
                        const qty = items.find(it => it.foodId === id)?.quantity || 0;
                        return (
                           <DishCard 
                              key={id} dish={dish} qty={qty}
                              onAdd={addItem} onInc={increment} onDec={decrement}
                              onQuickView={setSelectedDish}
                              isFavorite={favorites.includes(id)} toggleFav={toggleFav}
                           />
                        );
                     })}
                  </div>
               ) : (
                  <div className="flex flex-col items-center justify-center py-24 bg-white/40 rounded-[3rem] border border-white/50">
                     <Search size={40} className="text-gray-300 mb-6"/>
                     <h3 className="text-2xl font-bold text-gray-800">No dishes found</h3>
                     <p className="text-gray-500 mt-2">Try adjusting your filters.</p>
                     <button onClick={clearAllFilters} className="mt-6 px-6 py-2.5 bg-red-600 text-white rounded-xl font-bold shadow-lg hover:bg-red-700 transition">Reset Filters</button>
                  </div>
               )}
            </div>
         </div>
      </main>

      {/* --- MODALS --- */}
      <AnimatePresence>
         {selectedDish && (
            <DishDetailModal 
               dish={selectedDish} onClose={() => setSelectedDish(null)}
               onAdd={addItem} onInc={increment} onDec={decrement}
               qty={items.find(it => it.foodId === (selectedDish.id || selectedDish.mealId))?.quantity || 0}
            />
         )}
         {mobileFilterOpen && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end lg:hidden">
                <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25 }} className="w-full max-w-sm bg-white h-full overflow-y-auto p-6">
                   <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold">Filters</h2>
                      <button onClick={() => setMobileFilterOpen(false)} className="p-2 bg-gray-100 rounded-full hover:bg-red-100 hover:text-red-600 transition"><X size={20}/></button>
                   </div>
                   <FilterSidebar filters={filters} setFilters={setFilters} options={filterOptions} clearAll={clearAllFilters} />
                   <div className="sticky bottom-0 bg-white pt-4 border-t mt-4">
                      <button onClick={() => setMobileFilterOpen(false)} className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold shadow-xl">Show {filteredDishes.length} Dishes</button>
                   </div>
                </motion.div>
             </motion.div>
         )}
      </AnimatePresence>
    </div>
  );
}