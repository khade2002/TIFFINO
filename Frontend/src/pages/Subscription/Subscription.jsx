
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Truck,
  WalletCards,
  CalendarClock,
  CheckCircle2,
  UtensilsCrossed,
  X,
  Star,
  ChevronDown
} from "lucide-react";
import "@fontsource/playfair-display";
import "@fontsource/inter";

import { getGroupedPlans, createSubscription } from "../../api/api";
import { useNavigate } from "react-router-dom";

/* =====================================================================
   🎨 CONFIGURATION CONSTANTS
   ===================================================================== */
const DURATION_META = {
  DAILY: { 
    label: "Daily Trial", 
    days: "1 Day", 
    badge: "Trial Run", 
    color: "bg-blue-50 text-blue-700",
    desc: "Perfect for testing the taste." 
  },
  WEEKLY: { 
    label: "Weekly Pack", 
    days: "7 Days", 
    badge: "Short Term", 
    color: "bg-purple-50 text-purple-700",
    desc: "Great for busy weeks." 
  },
  MONTHLY: { 
    label: "Monthly Pro", 
    days: "28 Days", 
    badge: "Most Popular", 
    color: "bg-orange-50 text-orange-700",
    desc: "Total peace of mind." 
  },
  QUARTERLY: { 
    label: "Quarterly Elite", 
    days: "90 Days", 
    badge: "Best Value", 
    color: "bg-green-50 text-green-700",
    desc: "Max savings, long comfort." 
  },
};

const FREQUENCY_OPTIONS = [
  { label: "Everyday", value: "DAILY", sub: "Mon-Sun" },
  { label: "Weekdays", value: "WEEKDAYS", sub: "Mon-Fri" },
  { label: "Alternate", value: "ALTERNATE", sub: "Mon-Wed-Fri" },
];

const ALLERGY_OPTIONS = ["Peanuts", "Dairy", "Gluten", "Soy", "Eggs", "Seafood"];

/* =====================================================================
   🎡 HERO CAROUSEL COMPONENT
   ===================================================================== */
function SubscriptionHero({ onCTAClick }) {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]); 

  return (
    <div className="relative w-full h-[550px] md:h-[650px] rounded-[3rem] overflow-hidden shadow-2xl mx-auto transform transition-all group">
      <motion.div style={{ y: y1 }} className="absolute inset-0">
        <img 
          src="https://i.pinimg.com/736x/73/83/2b/73832bfc76daa8f0a9defecc0e1f1a78.jpg" 
          className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-110"
          alt="Food Background"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      </motion.div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
        <motion.div 
          initial={{ y: 30, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-semibold mb-6 shadow-lg"
        >
          <Sparkles className="w-4 h-4 text-yellow-400 fill-yellow-400" /> Tiffino Premium Club
        </motion.div>
        
        <motion.h1 
          initial={{ y: 30, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-5xl md:text-7xl font-extrabold font-['Playfair_Display'] text-white leading-tight mb-6 drop-shadow-lg"
        >
          Eat Smart.<br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">Save Big.</span>
        </motion.h1>

        <motion.p 
          initial={{ y: 30, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-gray-200 text-lg md:text-xl max-w-2xl mb-10 font-medium"
        >
          Unlock flat discounts, priority delivery, and flexible meal plans tailored just for you.
        </motion.p>

        <motion.button
          onClick={onCTAClick}
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }}
          className="group px-10 py-4 bg-red-600 text-white rounded-full font-bold text-lg shadow-xl shadow-red-900/40 flex items-center gap-3 transition-all"
        >
          View Plans <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform"/>
        </motion.button>
      </div>
    </div>
  );
}

/* =====================================================================
   📦 PLAN CARD COMPONENT
   ===================================================================== */
function PlanCard({ planKey, data, isSelected, onSelect }) {
  const meta = DURATION_META[planKey];
  const plan = data?.[0]; 

  if (!plan) return null; 

  return (
    <motion.div
      layout
      onClick={() => onSelect(planKey, plan)}
      whileHover={{ y: -8 }}
      className={`
        relative cursor-pointer rounded-[2rem] p-6 border-2 transition-all duration-300 bg-white flex flex-col h-full group
        ${isSelected 
          ? "border-red-500 shadow-[0_25px_50px_-12px_rgba(239,68,68,0.25)] scale-[1.02] z-10" 
          : "border-gray-100 shadow-sm hover:shadow-xl hover:border-red-100"
        }
      `}
    >
      {/* Recommended Tag */}
      {(planKey === "MONTHLY" || planKey === "QUARTERLY") && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg uppercase tracking-wider flex items-center gap-1 z-20">
          <Star size={10} fill="white"/> Recommended
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-start mb-4 mt-2">
        <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${meta.color}`}>
          {meta.badge}
        </span>
        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${isSelected ? "bg-red-500 border-red-500 text-white" : "border-gray-300 text-transparent group-hover:border-red-300"}`}>
           <CheckCircle2 size={16} />
        </div>
      </div>

      <h3 className="text-2xl font-bold text-gray-900 font-['Playfair_Display'] mb-1">{meta.label}</h3>
      <p className="text-gray-500 text-sm mb-6">{meta.desc}</p>

      {/* Pricing */}
      <div className={`mb-6 rounded-2xl p-4 text-center transition-colors ${isSelected ? "bg-red-50" : "bg-gray-50 group-hover:bg-red-50/50"}`}>
        <p className="text-xs text-gray-400 font-bold uppercase tracking-wide mb-1">Effective Price</p>
        <div className="flex items-center justify-center gap-2">
          <span className="text-3xl font-extrabold text-gray-900">₹{plan.price}</span>
        </div>
        <div className="mt-2 inline-block bg-green-100 text-green-700 px-2 py-0.5 rounded-md text-xs font-bold">
           Save {plan.discountPercentage}%
        </div>
      </div>

      {/* Features List */}
      <ul className="space-y-3 mb-6 flex-1">
        <li className="flex items-center gap-3 text-sm text-gray-600">
          <div className="p-1 rounded-full bg-green-100 text-green-600"><Truck size={12}/></div>
          <span className="font-medium">Free Priority Delivery</span>
        </li>
        <li className="flex items-center gap-3 text-sm text-gray-600">
          <div className="p-1 rounded-full bg-blue-100 text-blue-600"><UtensilsCrossed size={12}/></div>
          <span className="font-medium">Smart Meal Planning</span>
        </li>
      </ul>

      {/* Selector Button */}
      <div className={`w-full py-3 rounded-xl font-bold text-sm text-center transition-colors ${isSelected ? "bg-red-600 text-white shadow-lg shadow-red-200" : "bg-gray-100 text-gray-600 group-hover:bg-gray-200 group-hover:text-gray-900"}`}>
        {isSelected ? "Selected" : "Select Plan"}
      </div>
    </motion.div>
  );
}

/* =====================================================================
   🚀 MAIN SUBSCRIPTION PAGE
   ===================================================================== */
export default function Subscription() {
  const navigate = useNavigate();
  const plansRef = useRef(null);
  
  // -- State --
  const [groupedPlans, setGroupedPlans] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // -- Selection State --
  const [selectedDuration, setSelectedDuration] = useState(null); 
  const [selectedPlanData, setSelectedPlanData] = useState(null); 
  
  // -- Customization State --
  const [frequency, setFrequency] = useState("DAILY");
  const [selectedAllergies, setSelectedAllergies] = useState([]);
  const [creating, setCreating] = useState(false);

  // 1. LOAD PLANS
  useEffect(() => {
    (async () => {
      try {
        const res = await getGroupedPlans();
        const data = res.data || {};
        setGroupedPlans(data);
        // NOTE: No auto-selection here anymore. User must click.
      } catch (e) {
        setError("Failed to load plans. Please try again later.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const scrollToPlans = () => {
     plansRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handlePlanSelect = (key, plan) => {
     // If clicking same plan, deselect it
     if (selectedDuration === key) {
        setSelectedDuration(null);
        setSelectedPlanData(null);
     } else {
        setSelectedDuration(key);
        setSelectedPlanData(plan);
        // Small scroll nudge to show the dock if on mobile
        if(window.innerWidth < 768) {
           setTimeout(() => {
              window.scrollBy({ top: 100, behavior: 'smooth' });
           }, 300);
        }
     }
  };

  const toggleAllergy = (val) => {
    setSelectedAllergies(prev => prev.includes(val) ? prev.filter(a => a !== val) : [...prev, val]);
  };

  const handleActivate = async () => {
    if (!selectedPlanData) return;

    setCreating(true);
    try {
      const payload = {
        planId: selectedPlanData.id,
        planType: selectedPlanData.duration,
        frequency,
        allergies: selectedAllergies
      };
      
      const res = await createSubscription(payload);
      const newSub = res.data;
      
      if (newSub.subscriptionid) {
        localStorage.setItem("activeSubscriptionId", String(newSub.subscriptionid));
        navigate(`/subscription/review/${newSub.subscriptionid}`);
      }
    } catch (e) {
      alert("Failed to create subscription. Please check your connection.");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans selection:bg-red-100 selection:text-red-900 pb-32">
      
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
         <motion.div animate={{ y: [0, -40, 0] }} transition={{ duration: 10, repeat: Infinity }} className="absolute top-0 left-0 w-[800px] h-[800px] bg-gray-100/50 rounded-full blur-[150px]" />
         <motion.div animate={{ y: [0, 40, 0] }} transition={{ duration: 12, repeat: Infinity }} className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-red-50/50 rounded-full blur-[150px]" />
      </div>

      <main className="max-w-[1440px] mx-auto px-4 md:px-8 py-8">
        
        {/* HERO SECTION */}
        <SubscriptionHero onCTAClick={scrollToPlans} />

        {/* HOW IT WORKS */}
        <section className="py-24 text-center max-w-5xl mx-auto">
           <div className="inline-block px-4 py-1.5 rounded-full bg-red-50 text-red-600 text-xs font-bold uppercase tracking-widest mb-4">Simple Process</div>
           <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-16 font-['Playfair_Display']">
              Why Choose <span className="text-red-600">Subscription?</span>
           </h2>
           
           <div className="grid md:grid-cols-3 gap-10">
              {[
                 { icon: <WalletCards size={32}/>, title: "1. Pick a Plan", desc: "Choose a duration that fits your lifestyle. Monthly plans save the most." },
                 { icon: <CalendarClock size={32}/>, title: "2. Customize", desc: "Select delivery days and exclude allergens. We handle the rest." },
                 { icon: <ShieldCheck size={32}/>, title: "3. Auto-Apply", desc: "No coupons needed. Discounts are auto-applied at checkout." }
              ].map((step, i) => (
                 <motion.div 
                    key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i*0.15 }}
                    className="flex flex-col items-center p-6"
                 >
                    <div className="w-20 h-20 bg-white rounded-3xl shadow-xl flex items-center justify-center mb-6 text-red-600 border border-gray-100 transform hover:scale-110 transition-transform duration-300">
                       {step.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-500 leading-relaxed max-w-xs">{step.desc}</p>
                 </motion.div>
              ))}
           </div>
        </section>

        {/* PLANS GRID */}
        <section ref={plansRef} className="py-10 scroll-mt-24">
           <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 font-['Playfair_Display']">Select Your Plan</h2>
              <p className="text-gray-500 mt-3 text-lg">Flexible commitments. Cancel anytime.</p>
           </div>

           {loading ? (
              <div className="flex justify-center py-20"><div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"/></div>
           ) : error ? (
              <div className="text-center text-red-500 py-10 bg-red-50 rounded-2xl max-w-lg mx-auto">{error}</div>
           ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
                 {["DAILY", "WEEKLY", "MONTHLY", "QUARTERLY"].map(key => (
                    <PlanCard 
                       key={key} 
                       planKey={key} 
                       data={groupedPlans[key]} 
                       isSelected={selectedDuration === key} 
                       onSelect={handlePlanSelect}
                    />
                 ))}
              </div>
           )}
        </section>

      </main>

      {/* ========================================
          FLOATING CONFIGURATION DOCK (STICKY)
      ======================================== */}
      <AnimatePresence>
         {selectedPlanData && (
            <motion.div 
               initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
               transition={{ type: "spring", stiffness: 300, damping: 30 }}
               className="fixed bottom-0 left-0 right-0 z-50 px-0 md:px-6 pb-0 md:pb-6 pointer-events-none"
            >
               <div className="pointer-events-auto bg-white/95 backdrop-blur-xl border-t md:border border-gray-200 shadow-[0_-10px_40px_-5px_rgba(0,0,0,0.15)] md:rounded-[2.5rem] p-6 w-full max-w-6xl mx-auto">
                  <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center">
                     
                     {/* 1. Summary */}
                     <div className="flex-1 border-b lg:border-b-0 lg:border-r border-gray-200 pb-4 lg:pb-0 lg:pr-8 w-full lg:w-auto">
                        <div className="flex items-center justify-between mb-2">
                           <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Selected Plan</span>
                           <button onClick={() => { setSelectedDuration(null); setSelectedPlanData(null); }} className="lg:hidden text-gray-400 bg-gray-100 p-1 rounded-full"><ChevronDown size={20}/></button>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                           {DURATION_META[selectedDuration]?.label}
                           <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-md">Save {selectedPlanData.discountPercentage}%</span>
                        </h3>
                        <p className="text-gray-500 text-sm mt-1">
                           Total: <span className="font-bold text-gray-900">₹{selectedPlanData.price}</span> (Incl. taxes)
                        </p>
                     </div>

                     {/* 2. Controls */}
                     <div className="flex-1 flex flex-col md:flex-row gap-6 w-full">
                        
                        {/* Frequency */}
                        <div className="flex-1">
                           <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Meal Frequency</label>
                           <div className="flex bg-gray-100 p-1 rounded-xl">
                              {FREQUENCY_OPTIONS.map(opt => (
                                 <button 
                                    key={opt.value} onClick={() => setFrequency(opt.value)}
                                    className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${frequency === opt.value ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                                 >
                                    {opt.label}
                                 </button>
                              ))}
                           </div>
                        </div>

                        {/* Allergies */}
                        <div className="flex-1">
                           <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Exclude Allergens</label>
                           <div className="flex flex-wrap gap-2">
                              {ALLERGY_OPTIONS.slice(0, 4).map(opt => (
                                 <button 
                                    key={opt} onClick={() => toggleAllergy(opt)}
                                    className={`px-3 py-2 rounded-lg text-xs font-bold border transition-all ${selectedAllergies.includes(opt) ? "bg-red-50 border-red-200 text-red-600" : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50"}`}
                                 >
                                    {opt}
                                 </button>
                              ))}
                           </div>
                        </div>
                     </div>

                     {/* 3. CTA */}
                     <div className="w-full lg:w-auto mt-4 lg:mt-0">
                        <button 
                           onClick={handleActivate}
                           disabled={creating}
                           className="w-full lg:w-64 py-4 bg-gray-900 text-white rounded-2xl font-bold text-lg shadow-xl hover:bg-black hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                           {creating ? (
                              <>Processing...</>
                           ) : (
                              <>Activate Now <ArrowRight size={20}/></>
                           )}
                        </button>
                     </div>

                  </div>
               </div>
            </motion.div>
         )}
      </AnimatePresence>

    </div>
  );
}