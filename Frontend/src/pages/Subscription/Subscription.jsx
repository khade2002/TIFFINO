// import React, { useEffect, useState } from "react";
// import {
//   motion,
//   useScroll,
//   useTransform,
// } from "framer-motion";
// import {
//   Sparkles,
//   ArrowRight,
//   BadgePercent,
//   ShieldCheck,
//   Truck,
//   WalletCards,
//   CalendarClock,
//   CheckCircle2,
// } from "lucide-react";
// import "@fontsource/playfair-display";
// import "@fontsource/inter";

// import { getGroupedPlans, createSubscription } from "../../api/api";
// import { useNavigate } from "react-router-dom";

// // ==============================
// // HERO CAROUSEL
// // ==============================
// function SubscriptionHeroCarousel({ onCTAClick }) {
//   const images = [
//     "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1170&auto=format&fit=crop",
//     "https://images.unsplash.com/photo-1525755662778-989d0524087e?q=80&w=1170&auto=format&fit=crop",
//     "https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83?q=80&w=1170&auto=format&fit=crop",
//     "https://images.unsplash.com/photo-1517244683847-7456b63c5969?q=80&w=1170&auto=format&fit=crop",
//   ];

//   const [current, setCurrent] = useState(0);

//   useEffect(() => {
//     const id = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % images.length);
//     }, 4000);
//     return () => clearInterval(id);
//   }, []);

//   return (
//     <div className="relative w-full h-[420px] md:h-[560px] rounded-3xl overflow-hidden shadow-2xl">
//       {images.map((src, i) => (
//         <motion.div
//           key={i}
//           className="absolute inset-0"
//           initial={{ opacity: 0, scale: 1.1 }}
//           animate={{
//             opacity: i === current ? 1 : 0,
//             scale: i === current ? 1 : 1.1,
//           }}
//           transition={{ duration: 1 }}
//         >
//           <img
//             src={src}
//             alt="subscription slide"
//             className="w-full h-full object-cover"
//           />
//         </motion.div>
//       ))}

//       {/* Gradient */}
//       <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent" />

//       {/* Content */}
//       <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.4, duration: 0.8 }}
//           className="mb-4"
//         >
//           <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#E23744]/90 backdrop-blur-sm rounded-full text-sm font-semibold">
//             <Sparkles className="w-4 h-4" />
//             Tiffino Premium Subscription
//           </div>
//         </motion.div>

//         <motion.h1
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.6, duration: 0.8 }}
//           className="text-4xl md:text-6xl lg:text-7xl font-bold font-['Playfair_Display'] drop-shadow-2xl mb-4"
//         >
//           Subscribe Once,  
//           <br />
//           <span className="text-[#E23744]">Save Everyday</span>
//         </motion.h1>

//         <motion.p
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.8, duration: 0.8 }}
//           className="text-lg md:text-xl text-gray-200 max-w-2xl"
//         >
//           Daily tiffin tension khatam – flat discounts + free delivery on every
//           meal with Tiffino Subscription.
//         </motion.p>

//         <motion.button
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ delay: 1.0, type: "spring", stiffness: 200 }}
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={onCTAClick}
//           className="mt-8 px-8 py-4 bg-[#E23744] text-white font-bold rounded-full shadow-2xl hover:shadow-[#E23744]/50 transition-all flex items-center gap-2"
//         >
//           View Plans
//           <ArrowRight className="w-5 h-5" />
//         </motion.button>
//       </div>

//       {/* Indicators */}
//       <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
//         {images.map((_, i) => (
//           <motion.button
//             key={i}
//             onClick={() => setCurrent(i)}
//             whileHover={{ scale: 1.2 }}
//             className={`h-2 rounded-full transition-all ${
//               i === current ? "bg-[#E23744] w-8" : "bg-white/60 w-2"
//             }`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// // ==============================
// // META DATA
// // ==============================
// const DURATION_META = {
//   DAILY: {
//     label: "Daily Saver",
//     days: "1 day",
//     badge: "Perfect for trials",
//     tagline: "Test Tiffino easily.",
//   },
//   WEEKLY: {
//     label: "Weekly Essentials",
//     days: "7 days",
//     badge: "Most Popular",
//     tagline: "Office-goers & students ke liye best.",
//   },
//   MONTHLY: {
//     label: "Monthly Pro",
//     days: "28 days",
//     badge: "Smart Choice",
//     tagline: "Full month tiffin tension-free.",
//   },
//   QUARTERLY: {
//     label: "Quarterly Max",
//     days: "90 days",
//     badge: "Best Value",
//     tagline: "Maximum savings, long comfort.",
//   },
// };

// const ALLERGY_OPTIONS = [
//   { label: "Peanuts", value: "PEANUTS" },
//   { label: "Dairy", value: "DAIRY" },
//   { label: "Gluten", value: "GLUTEN" },
//   { label: "Soy", value: "SOY" },
//   { label: "Wheat", value: "WHEAT" },
//   { label: "Eggs", value: "EGGS" },
// ];

// const FREQUENCY_OPTIONS = [
//   { label: "Everyday", value: "DAILY" },
//   { label: "Weekdays Only", value: "WEEKDAYS" },
//   { label: "Alternate Days", value: "ALTERNATE" },
// ];

// // ==============================
// // MAIN SUBSCRIPTION PAGE
// // ==============================
// export default function Subscription() {
//   const { scrollYProgress } = useScroll();
//   const y = useTransform(scrollYProgress, [0, 1], [0, -40]);
//   const navigate = useNavigate();

//   const [groupedPlans, setGroupedPlans] = useState({});
//   const [loadingPlans, setLoadingPlans] = useState(true);
//   const [error, setError] = useState("");

//   const [selectedDuration, setSelectedDuration] = useState(null);
//   const [selectedPlan, setSelectedPlan] = useState(null);

//   const [frequency, setFrequency] = useState("DAILY");
//   const [selectedAllergies, setSelectedAllergies] = useState([]);
//   const [creatingSub, setCreatingSub] = useState(false);

//   const plansRef = React.useRef(null);
//   const scrollToPlans = () => {
//     if (plansRef.current) {
//       plansRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   // Fetch plans
//   useEffect(() => {
//     const loadPlans = async () => {
//       try {
//         const res = await getGroupedPlans();
//         setGroupedPlans(res.data || {});
//       } catch (e) {
//         setError("Plans fetch karte time error aa gaya.");
//       } finally {
//         setLoadingPlans(false);
//       }
//     };
//     loadPlans();
//   }, []);

//   // Select plan
//   const handleSelectDuration = (key) => {
//     const plan = (groupedPlans[key] || [])[0] || null;
//     setSelectedDuration(key);
//     setSelectedPlan(plan);
//   };

//   // Allergy toggle
//   const toggleAllergy = (value) => {
//     setSelectedAllergies((prev) =>
//       prev.includes(value)
//         ? prev.filter((a) => a !== value)
//         : [...prev, value]
//     );
//   };

//   // Create subscription
//   const handleCreateSubscription = async () => {
//     if (!selectedPlan) {
//       setError("Please select a plan.");
//       return;
//     }

//     setCreatingSub(true);
//     setError("");

//     try {
//       const payload = {
//         planId: selectedPlan.id,
//         planType: selectedPlan.duration,
//         frequency,
//         allergies: selectedAllergies,
//       };

//       const res = await createSubscription(payload);
//       const newSub = res.data;

//       if (newSub.subscriptionid) {
//         localStorage.setItem("activeSubscriptionId", String(newSub.subscriptionid));
//         navigate(`/subscription/review/${newSub.subscriptionid}`);
//       }
//     } catch (err) {
//       setError("Subscription create karte time error aaya.");
//     } finally {
//       setCreatingSub(false);
//     }
//   };

//   // Render plan card
//   const renderPlanCard = (key) => {
//     const meta = DURATION_META[key];
//     const plan = (groupedPlans[key] || [])[0] || null;
//     const selected = selectedDuration === key;

//     return (
//       <motion.div
//         key={key}
//         initial={{ opacity: 0, y: 30 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         whileHover={{ scale: 1.03 }}
//         transition={{ duration: 0.4 }}
//         viewport={{ once: true }}
//         onClick={() => handleSelectDuration(key)}
//         className={`rounded-2xl p-6 cursor-pointer shadow-lg border-2 bg-white transition-all ${
//           selected ? "border-[#E23744] ring-2 ring-[#E23744]/30" : "border-gray-100"
//         }`}
//       >
//         <div className="flex items-center justify-between mb-3">
//           <span className="px-3 py-1 text-xs bg-[#E23744]/10 text-[#E23744] rounded-full flex items-center gap-1">
//             <BadgePercent className="w-3 h-3" />
//             {meta.badge}
//           </span>

//           {selected && (
//             <span className="px-3 py-1 text-[11px] rounded-full bg-green-100 text-green-700 border border-green-300">
//               Selected
//             </span>
//           )}
//         </div>

//         <h3 className="text-xl font-bold font-['Playfair_Display'] mb-1">
//           {meta.label}
//         </h3>

//         <p className="text-sm text-gray-500 mb-4">
//           {meta.days} • Auto-renew
//         </p>

//         {plan ? (
//           <>
//             <p className="text-xs text-gray-500">Starting at</p>
//             <p className="text-2xl font-bold text-gray-900 mb-2">
//               ₹{plan.price}
//             </p>

//             <p className="text-sm font-semibold text-green-600">
//               {plan.discountPercentage}% Off
//             </p>
//           </>
//         ) : (
//           <p className="text-sm text-gray-500">Plan not configured</p>
//         )}

//         <ul className="text-sm text-gray-700 space-y-1 mt-4">
//           <li className="flex items-center gap-2">
//             <ShieldCheck className="w-4 h-4 text-green-600" />
//             {meta.tagline}
//           </li>
//           <li className="flex items-center gap-2">
//             <Truck className="w-4 h-4 text-[#E23744]" />
//             Free delivery on all meals
//           </li>
//         </ul>

//         <button className="w-full mt-4 py-2.5 rounded-full border border-[#E23744] text-[#E23744] font-semibold text-sm">
//           {selected ? "Selected" : "Choose Plan"}
//         </button>
//       </motion.div>
//     );
//   };

//   // MAIN UI RENDER
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-white via-red-50/20 to-white font-inter overflow-hidden">
//       {/* BG Decoration */}
//       <div className="fixed inset-0 pointer-events-none overflow-hidden">
//         <motion.div
//           style={{ y }}
//           animate={{
//             scale: [1, 1.15, 1],
//             opacity: [0.03, 0.06, 0.03],
//           }}
//           transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
//           className="absolute top-40 right-10 w-80 h-80 bg-[#E23744] rounded-full blur-3xl"
//         />
//         <motion.div
//           style={{ y }}
//           animate={{
//             scale: [1, 1.25, 1],
//             opacity: [0.02, 0.05, 0.02],
//           }}
//           transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
//           className="absolute bottom-60 left-10 w-72 h-72 bg-[#E23744] rounded-full blur-3xl"
//         />
//       </div>

//       {/* HERO */}
//       <section className="relative px-4 md:px-10 lg:px-14 py-8">
//         <SubscriptionHeroCarousel onCTAClick={scrollToPlans} />
//       </section>

//       {/* HOW IT WORKS */}
//       <section className="relative px-4 md:px-10 lg:px-14 py-10 max-w-5xl mx-auto">
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//           className="text-center mb-10"
//         >
//           <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#E23744]/10 rounded-full mb-4">
//             <Sparkles className="w-4 h-4 text-[#E23744]" />
//             <span className="text-sm font-semibold text-[#E23744]">
//               How Subscription Works
//             </span>
//           </div>

//           <h2 className="text-3xl md:text-4xl font-bold font-['Playfair_Display']">
//             Just 3 steps to <span className="text-[#E23744]">lock your savings</span>
//           </h2>
//         </motion.div>

//         <div className="grid md:grid-cols-3 gap-6">
//           {/* Step 1 */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.4 }}
//             className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100"
//           >
//             <div className="w-10 h-10 rounded-full bg-[#E23744]/10 text-[#E23744] flex items-center justify-center mb-3">
//               <CalendarClock className="w-5 h-5" />
//             </div>
//             <h3 className="font-semibold mb-1">1. Choose a plan</h3>
//             <p className="text-sm text-gray-600">
//               Daily, Weekly, Monthly ya Quarterly jo suit kare.
//             </p>
//           </motion.div>

//           {/* Step 2 */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.4, delay: 0.1 }}
//             className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100"
//           >
//             <div className="w-10 h-10 rounded-full bg-[#E23744]/10 text-[#E23744] flex items-center justify-center mb-3">
//               <WalletCards className="w-5 h-5" />
//             </div>
//             <h3 className="font-semibold mb-1">2. Activate once</h3>
//             <p className="text-sm text-gray-600">
//               Backend start/end dates, discounts, free delivery handle karta hai.
//             </p>
//           </motion.div>

//           {/* Step 3 */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.4, delay: 0.2 }}
//             className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100"
//           >
//             <div className="w-10 h-10 rounded-full bg-[#E23744]/10 text-[#E23744] flex items-center justify-center mb-3">
//               <CheckCircle2 className="w-5 h-5" />
//             </div>
//             <h3 className="font-semibold mb-1">3. Enjoy auto discounts</h3>
//             <p className="text-sm text-gray-600">
//               Order karte waqt bas subscriptionId use karo.
//             </p>
//           </motion.div>
//         </div>
//       </section>

//       {/* ============================= */}
//       {/* PLANS */}
//       {/* ============================= */}
//       <section
//         ref={plansRef}
//         className="relative px-4 md:px-10 lg:px-14 py-12"
//       >
//         <div className="max-w-6xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="text-center mb-10"
//           >
//             <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#E23744]/10 rounded-full mb-4">
//               <BadgePercent className="w-4 h-4 text-[#E23744]" />
//               <span className="text-sm font-semibold text-[#E23744]">
//                 Subscription Plans
//               </span>
//             </div>

//             <h2 className="text-3xl md:text-4xl font-bold font-['Playfair_Display']">
//               Pick the <span className="text-[#E23744]">plan that fits you</span>
//             </h2>

//             <p className="text-sm text-gray-600 max-w-2xl mx-auto">
//               Every plan includes flat discount + free delivery.
//             </p>
//           </motion.div>

//           {loadingPlans ? (
//             <div className="flex justify-center py-10">
//               <div className="h-8 w-8 border-2 border-[#E23744] border-t-transparent rounded-full animate-spin" />
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
//               {["DAILY", "WEEKLY", "MONTHLY", "QUARTERLY"].map((key) =>
//                 renderPlanCard(key)
//               )}
//             </div>
//           )}

//           {error && (
//             <p className="mt-4 text-center text-sm text-red-500">{error}</p>
//           )}
//         </div>
//       </section>

//       {/* ============================= */}
//       {/* SELECTED PLAN PANEL */}
//       {/* ============================= */}
//       {selectedPlan && (
//         <section className="relative px-4 md:px-10 lg:px-14 pb-20">
//           <div className="max-w-6xl mx-auto">
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//               className="bg-white border-2 border-gray-100 rounded-3xl p-8 shadow-xl"
//             >
//               <div className="flex flex-col lg:flex-row gap-6">
//                 {/* LEFT */}
//                 <div className="flex-1">
//                   <span className="px-3 py-1 text-xs bg-[#E23744]/10 text-[#E23744] rounded-full font-semibold">
//                     Step 2 · Review & customise
//                   </span>

//                   <h3 className="text-2xl font-bold font-['Playfair_Display'] mt-2">
//                     {DURATION_META[selectedDuration]?.label} Plan
//                   </h3>

//                   <p className="text-sm text-gray-600 mb-4">
//                     Duration: <b>{DURATION_META[selectedDuration]?.days}</b>
//                   </p>

//                   {/* Stats */}
//                   <div className="grid grid-cols-2 gap-4 text-sm mb-4">
//                     <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
//                       <p className="text-xs text-gray-500">Base Price</p>
//                       <p className="text-xl font-bold">₹{selectedPlan.price}</p>
//                     </div>

//                     <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
//                       <p className="text-xs text-gray-500">Subscription Discount</p>
//                       <p className="text-xl font-bold text-green-600">
//                         {selectedPlan.discountPercentage}%
//                       </p>
//                     </div>

//                     <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
//                       <p className="text-xs text-gray-500">Delivery</p>
//                       <p className="text-sm font-semibold text-green-600">
//                         Free delivery
//                       </p>
//                     </div>

//                     <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
//                       <p className="text-xs text-gray-500">After Activation</p>
//                       <p className="text-sm font-semibold text-[#E23744]">
//                         ACTIVE Subscription
//                       </p>
//                     </div>
//                   </div>

//                   <p className="text-xs text-gray-500">
//                     Order karte waqt sirf subscriptionId use karna hai. Backend
//                     automatically discount + free delivery apply karta hai using:
//                     <code className="bg-gray-100 px-2 py-0.5 ml-1 rounded text-[11px]">
//                       /subscri/orders/from-subscription/{`{subscriptionId}`}
//                     </code>
//                   </p>
//                 </div>

//                 {/* RIGHT */}
//                 <div className="w-full lg:w-80 rounded-3xl border border-gray-100 bg-gray-50 p-5">
//                   {/* Frequency */}
//                   <p className="text-xs text-gray-600 mb-2">Meal Frequency</p>
//                   <div className="flex flex-wrap gap-2 mb-4">
//                     {FREQUENCY_OPTIONS.map((opt) => (
//                       <button
//                         key={opt.value}
//                         onClick={() => setFrequency(opt.value)}
//                         className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
//                           frequency === opt.value
//                             ? "bg-[#E23744] text-white border-[#E23744]"
//                             : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
//                         }`}
//                       >
//                         {opt.label}
//                       </button>
//                     ))}
//                   </div>

//                   {/* Allergies */}
//                   <p className="text-xs text-gray-600 mb-2">Allergies (optional)</p>
//                   <div className="flex flex-wrap gap-2 mb-4">
//                     {ALLERGY_OPTIONS.map((opt) => (
//                       <button
//                         key={opt.value}
//                         onClick={() => toggleAllergy(opt.value)}
//                         className={`px-3 py-1.5 rounded-full text-[11px] font-medium border transition-all ${
//                           selectedAllergies.includes(opt.value)
//                             ? "bg-red-100 text-[#E23744] border-[#E23744]"
//                             : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
//                         }`}
//                       >
//                         {opt.label}
//                       </button>
//                     ))}
//                   </div>

//                   {error && (
//                     <p className="text-[11px] text-red-500 mb-2">{error}</p>
//                   )}

//                   {/* CREATE BUTTON */}
//                   <button
//                     onClick={handleCreateSubscription}
//                     disabled={creatingSub}
//                     className="w-full rounded-full bg-[#E23744] text-white text-sm font-semibold py-2.5 shadow-lg hover:shadow-[#E23744]/40 hover:-translate-y-[1px] transition-all disabled:opacity-60"
//                   >
//                     {creatingSub ? "Activating..." : "Activate Subscription"}
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </section>
//       )}
//     </div>
//   );
// }








// import React, { useEffect, useState, useRef } from "react";
// import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
// import {
//   Sparkles,
//   ArrowRight,
//   BadgePercent,
//   ShieldCheck,
//   Truck,
//   WalletCards,
//   CalendarClock,
//   CheckCircle2,
//   UtensilsCrossed,
//   X,
//   Star
// } from "lucide-react";
// import "@fontsource/playfair-display";
// import "@fontsource/inter";

// import { getGroupedPlans, createSubscription } from "../../api/api";
// import { useNavigate } from "react-router-dom";

// /* =====================================================================
//    🎨 CONFIGURATION CONSTANTS
//    ===================================================================== */
// const DURATION_META = {
//   DAILY: { 
//     label: "Daily Trial", 
//     days: "1 Day", 
//     badge: "Trial Run", 
//     color: "bg-blue-50 text-blue-700",
//     desc: "Perfect for testing the taste." 
//   },
//   WEEKLY: { 
//     label: "Weekly Pack", 
//     days: "7 Days", 
//     badge: "Short Term", 
//     color: "bg-purple-50 text-purple-700",
//     desc: "Great for busy weeks." 
//   },
//   MONTHLY: { 
//     label: "Monthly Pro", 
//     days: "28 Days", 
//     badge: "Most Popular", 
//     color: "bg-orange-50 text-orange-700",
//     desc: "Total peace of mind." 
//   },
//   QUARTERLY: { 
//     label: "Quarterly Elite", 
//     days: "90 Days", 
//     badge: "Best Value", 
//     color: "bg-green-50 text-green-700",
//     desc: "Max savings, long comfort." 
//   },
// };

// const FREQUENCY_OPTIONS = [
//   { label: "Everyday", value: "DAILY", sub: "Mon-Sun" },
//   { label: "Weekdays", value: "WEEKDAYS", sub: "Mon-Fri" },
//   { label: "Alternate", value: "ALTERNATE", sub: "Mon-Wed-Fri" },
// ];

// const ALLERGY_OPTIONS = ["Peanuts", "Dairy", "Gluten", "Soy", "Eggs", "Seafood"];

// /* =====================================================================
//    🎡 HERO CAROUSEL COMPONENT
//    ===================================================================== */
// function SubscriptionHero({ onCTAClick }) {
//   const { scrollY } = useScroll();
//   const y1 = useTransform(scrollY, [0, 500], [0, 200]); // Parallax effect

//   return (
//     <div className="relative w-full h-[550px] md:h-[650px] rounded-[3rem] overflow-hidden shadow-2xl mx-auto transform transition-all">
//       <motion.div style={{ y: y1 }} className="absolute inset-0">
//         <img 
//           src="https://images.unsplash.com/photo-1543353071-87d877b6d379?q=80&w=1600&auto=format&fit=crop" 
//           className="w-full h-full object-cover"
//           alt="Food Background"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
//       </motion.div>

//       <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
//         <motion.div 
//           initial={{ y: 30, opacity: 0 }} 
//           animate={{ y: 0, opacity: 1 }} 
//           transition={{ duration: 0.8, ease: "easeOut" }}
//           className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-semibold mb-6 shadow-lg"
//         >
//           <Sparkles className="w-4 h-4 text-yellow-400 fill-yellow-400" /> Tiffino Premium Club
//         </motion.div>
        
//         <motion.h1 
//           initial={{ y: 30, opacity: 0 }} 
//           animate={{ y: 0, opacity: 1 }} 
//           transition={{ delay: 0.2, duration: 0.8 }}
//           className="text-5xl md:text-7xl font-extrabold font-['Playfair_Display'] text-white leading-tight mb-6 drop-shadow-lg"
//         >
//           Eat Smart.<br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">Save Big.</span>
//         </motion.h1>

//         <motion.p 
//           initial={{ y: 30, opacity: 0 }} 
//           animate={{ y: 0, opacity: 1 }} 
//           transition={{ delay: 0.4, duration: 0.8 }}
//           className="text-gray-200 text-lg md:text-xl max-w-2xl mb-10 font-medium"
//         >
//           Unlock flat discounts, priority delivery, and flexible meal plans tailored just for you.
//         </motion.p>

//         <motion.button
//           onClick={onCTAClick}
//           whileHover={{ scale: 1.05 }} 
//           whileTap={{ scale: 0.95 }}
//           className="group px-10 py-4 bg-red-600 text-white rounded-full font-bold text-lg shadow-xl shadow-red-900/40 flex items-center gap-3 transition-all"
//         >
//           View Plans <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform"/>
//         </motion.button>
//       </div>
//     </div>
//   );
// }

// /* =====================================================================
//    📦 PLAN CARD COMPONENT
//    ===================================================================== */
// function PlanCard({ planKey, data, isSelected, onSelect }) {
//   const meta = DURATION_META[planKey];
//   const plan = data?.[0]; // Taking the first available plan variant

//   if (!plan) return null; // Don't render if plan data is missing

//   return (
//     <motion.div
//       layout
//       onClick={() => onSelect(planKey, plan)}
//       whileHover={{ y: -8 }}
//       className={`
//         relative cursor-pointer rounded-[2rem] p-6 border-2 transition-all duration-300 bg-white flex flex-col h-full
//         ${isSelected 
//           ? "border-red-500 shadow-[0_25px_50px_-12px_rgba(239,68,68,0.25)] scale-[1.02] z-10" 
//           : "border-gray-100 shadow-sm hover:shadow-xl hover:border-red-100"
//         }
//       `}
//     >
//       {/* Best Value Tag */}
//       {(planKey === "MONTHLY" || planKey === "QUARTERLY") && (
//         <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg uppercase tracking-wider flex items-center gap-1">
//           <Star size={10} fill="white"/> Recommended
//         </div>
//       )}

//       {/* Header */}
//       <div className="flex justify-between items-start mb-4 mt-2">
//         <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${meta.color}`}>
//           {meta.badge}
//         </span>
//         {isSelected && <div className="bg-red-500 text-white p-1 rounded-full"><CheckCircle2 size={16} /></div>}
//       </div>

//       <h3 className="text-2xl font-bold text-gray-900 font-['Playfair_Display'] mb-1">{meta.label}</h3>
//       <p className="text-gray-500 text-sm mb-6">{meta.desc}</p>

//       {/* Pricing */}
//       <div className="mb-6 bg-gray-50 rounded-2xl p-4 text-center">
//         <p className="text-xs text-gray-400 font-bold uppercase tracking-wide mb-1">Effective Price</p>
//         <div className="flex items-center justify-center gap-2">
//           <span className="text-3xl font-extrabold text-gray-900">₹{plan.price}</span>
//         </div>
//         <div className="mt-2 inline-block bg-green-100 text-green-700 px-2 py-0.5 rounded-md text-xs font-bold">
//            Save {plan.discountPercentage}%
//         </div>
//       </div>

//       {/* Features List */}
//       <ul className="space-y-3 mb-6 flex-1">
//         <li className="flex items-center gap-3 text-sm text-gray-600">
//           <div className="p-1 rounded-full bg-green-100 text-green-600"><Truck size={12}/></div>
//           <span className="font-medium">Free Priority Delivery</span>
//         </li>
//         <li className="flex items-center gap-3 text-sm text-gray-600">
//           <div className="p-1 rounded-full bg-blue-100 text-blue-600"><UtensilsCrossed size={12}/></div>
//           <span className="font-medium">Smart Meal Planning</span>
//         </li>
//       </ul>

//       {/* Selector Button */}
//       <div className={`w-full py-3 rounded-xl font-bold text-sm text-center transition-colors ${isSelected ? "bg-red-600 text-white" : "bg-gray-100 text-gray-600 group-hover:bg-gray-200"}`}>
//         {isSelected ? "Selected Plan" : "Choose Plan"}
//       </div>
//     </motion.div>
//   );
// }

// /* =====================================================================
//    🚀 MAIN SUBSCRIPTION PAGE
//    ===================================================================== */
// export default function Subscription() {
//   const navigate = useNavigate();
//   const plansRef = useRef(null);
  
//   // -- State --
//   const [groupedPlans, setGroupedPlans] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
  
//   // -- Selection State --
//   const [selectedDuration, setSelectedDuration] = useState(null); // 'MONTHLY', 'WEEKLY' etc.
//   const [selectedPlanData, setSelectedPlanData] = useState(null); // The actual plan object
  
//   // -- Customization State --
//   const [frequency, setFrequency] = useState("DAILY");
//   const [selectedAllergies, setSelectedAllergies] = useState([]);
//   const [creating, setCreating] = useState(false);

//   // 1. INITIAL LOAD & AUTO SELECT
//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await getGroupedPlans();
//         const data = res.data || {};
//         setGroupedPlans(data);

//         // 🔥 SMART AUTO-SELECTION LOGIC
//         // Priority: Monthly -> Weekly -> Daily
//         const defaultKey = data["MONTHLY"] ? "MONTHLY" : (data["WEEKLY"] ? "WEEKLY" : Object.keys(data)[0]);
        
//         if (defaultKey && data[defaultKey]) {
//            setSelectedDuration(defaultKey);
//            setSelectedPlanData(data[defaultKey][0]);
//         }

//       } catch (e) {
//         setError("Failed to load plans. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, []);

//   const scrollToPlans = () => {
//      plansRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
//   };

//   const handlePlanSelect = (key, plan) => {
//      setSelectedDuration(key);
//      setSelectedPlanData(plan);
//   };

//   const toggleAllergy = (val) => {
//     setSelectedAllergies(prev => prev.includes(val) ? prev.filter(a => a !== val) : [...prev, val]);
//   };

//   const handleActivate = async () => {
//     if (!selectedPlanData) return;

//     setCreating(true);
//     try {
//       const payload = {
//         planId: selectedPlanData.id,
//         planType: selectedPlanData.duration,
//         frequency,
//         allergies: selectedAllergies
//       };
      
//       const res = await createSubscription(payload);
//       const newSub = res.data;
      
//       if (newSub.subscriptionid) {
//         localStorage.setItem("activeSubscriptionId", String(newSub.subscriptionid));
//         navigate(`/subscription/review/${newSub.subscriptionid}`);
//       }
//     } catch (e) {
//       alert("Failed to create subscription. Please check your connection.");
//     } finally {
//       setCreating(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#FAFAFA] font-sans selection:bg-red-100 selection:text-red-900 pb-32">
      
//       {/* Background Decor */}
//       <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
//          <motion.div animate={{ y: [0, -40, 0] }} transition={{ duration: 10, repeat: Infinity }} className="absolute top-0 left-0 w-[800px] h-[800px] bg-gray-100/50 rounded-full blur-[150px]" />
//          <motion.div animate={{ y: [0, 40, 0] }} transition={{ duration: 12, repeat: Infinity }} className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-red-50/50 rounded-full blur-[150px]" />
//       </div>

//       <main className="max-w-[1440px] mx-auto px-4 md:px-8 py-8">
        
//         {/* HERO SECTION */}
//         <SubscriptionHero onCTAClick={scrollToPlans} />

//         {/* HOW IT WORKS */}
//         <section className="py-24 text-center max-w-5xl mx-auto">
//            <div className="inline-block px-4 py-1.5 rounded-full bg-red-50 text-red-600 text-xs font-bold uppercase tracking-widest mb-4">Simple Process</div>
//            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-16 font-['Playfair_Display']">
//               Why Choose <span className="text-red-600">Subscription?</span>
//            </h2>
           
//            <div className="grid md:grid-cols-3 gap-10">
//               {[
//                  { icon: <WalletCards size={32}/>, title: "1. Pick a Plan", desc: "Choose a duration that fits your lifestyle. Monthly plans save the most." },
//                  { icon: <CalendarClock size={32}/>, title: "2. Customize", desc: "Select delivery days and exclude allergens. We handle the rest." },
//                  { icon: <ShieldCheck size={32}/>, title: "3. Auto-Apply", desc: "No coupons needed. Discounts are auto-applied at checkout." }
//               ].map((step, i) => (
//                  <motion.div 
//                     key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i*0.15 }}
//                     className="flex flex-col items-center p-6"
//                  >
//                     <div className="w-20 h-20 bg-white rounded-3xl shadow-xl flex items-center justify-center mb-6 text-red-600 border border-gray-100 transform hover:scale-110 transition-transform duration-300">
//                        {step.icon}
//                     </div>
//                     <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
//                     <p className="text-gray-500 leading-relaxed max-w-xs">{step.desc}</p>
//                  </motion.div>
//               ))}
//            </div>
//         </section>

//         {/* PLANS GRID */}
//         <section ref={plansRef} className="py-10 scroll-mt-24">
//            <div className="text-center mb-16">
//               <h2 className="text-4xl md:text-5xl font-bold text-gray-900 font-['Playfair_Display']">Select Your Plan</h2>
//               <p className="text-gray-500 mt-3 text-lg">Flexible commitments. Cancel anytime.</p>
//            </div>

//            {loading ? (
//               <div className="flex justify-center py-20"><div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"/></div>
//            ) : error ? (
//               <div className="text-center text-red-500 py-10 bg-red-50 rounded-2xl max-w-lg mx-auto">{error}</div>
//            ) : (
//               <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
//                  {["DAILY", "WEEKLY", "MONTHLY", "QUARTERLY"].map(key => (
//                     <PlanCard 
//                        key={key} 
//                        planKey={key} 
//                        data={groupedPlans[key]} 
//                        isSelected={selectedDuration === key} 
//                        onSelect={handlePlanSelect}
//                     />
//                  ))}
//               </div>
//            )}
//         </section>

//       </main>

//       {/* ========================================
//           FLOATING CONFIGURATION DOCK (STICKY)
//       ======================================== */}
//       <AnimatePresence>
//          {selectedPlanData && (
//             <motion.div 
//                initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
//                transition={{ type: "spring", stiffness: 300, damping: 30 }}
//                className="fixed bottom-0 left-0 right-0 z-50 px-0 md:px-6 pb-0 md:pb-6 pointer-events-none"
//             >
//                <div className="pointer-events-auto bg-white/95 backdrop-blur-xl border-t md:border border-gray-200 shadow-[0_-10px_40px_-5px_rgba(0,0,0,0.15)] md:rounded-[2.5rem] p-6 w-full max-w-6xl mx-auto">
//                   <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center">
                     
//                      {/* 1. Summary */}
//                      <div className="flex-1 border-b lg:border-b-0 lg:border-r border-gray-200 pb-4 lg:pb-0 lg:pr-8 w-full lg:w-auto">
//                         <div className="flex items-center justify-between mb-2">
//                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Selected Plan</span>
//                            <button onClick={() => setSelectedDuration(null)} className="lg:hidden text-gray-400"><X size={20}/></button>
//                         </div>
//                         <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
//                            {DURATION_META[selectedDuration]?.label}
//                            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-md">Save {selectedPlanData.discountPercentage}%</span>
//                         </h3>
//                         <p className="text-gray-500 text-sm mt-1">
//                            Total: <span className="font-bold text-gray-900">₹{selectedPlanData.price}</span> (Incl. taxes)
//                         </p>
//                      </div>

//                      {/* 2. Controls */}
//                      <div className="flex-1 flex flex-col md:flex-row gap-6 w-full">
                        
//                         {/* Frequency */}
//                         <div className="flex-1">
//                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Meal Frequency</label>
//                            <div className="flex bg-gray-100 p-1 rounded-xl">
//                               {FREQUENCY_OPTIONS.map(opt => (
//                                  <button 
//                                     key={opt.value} onClick={() => setFrequency(opt.value)}
//                                     className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${frequency === opt.value ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
//                                  >
//                                     {opt.label}
//                                  </button>
//                               ))}
//                            </div>
//                         </div>

//                         {/* Allergies */}
//                         <div className="flex-1">
//                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Exclude Allergens</label>
//                            <div className="flex flex-wrap gap-2">
//                               {ALLERGY_OPTIONS.slice(0, 4).map(opt => (
//                                  <button 
//                                     key={opt} onClick={() => toggleAllergy(opt)}
//                                     className={`px-3 py-2 rounded-lg text-xs font-bold border transition-all ${selectedAllergies.includes(opt) ? "bg-red-50 border-red-200 text-red-600" : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50"}`}
//                                  >
//                                     {opt}
//                                  </button>
//                               ))}
//                            </div>
//                         </div>
//                      </div>

//                      {/* 3. CTA */}
//                      <div className="w-full lg:w-auto mt-4 lg:mt-0">
//                         <button 
//                            onClick={handleActivate}
//                            disabled={creating}
//                            className="w-full lg:w-64 py-4 bg-gray-900 text-white rounded-2xl font-bold text-lg shadow-xl hover:bg-black hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
//                         >
//                            {creating ? (
//                               <>Processing...</>
//                            ) : (
//                               <>Activate Now <ArrowRight size={20}/></>
//                            )}
//                         </button>
//                      </div>

//                   </div>
//                </div>
//             </motion.div>
//          )}
//       </AnimatePresence>

//     </div>
//   );
// }




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