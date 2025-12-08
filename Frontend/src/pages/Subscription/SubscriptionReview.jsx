// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";

// import {
//   CheckCircle2,
//   CalendarDays,
//   BadgePercent,
//   Truck,
//   ArrowRight,
// } from "lucide-react";

// import "@fontsource/playfair-display";
// import "@fontsource/inter";

// import { getSubscriptionReview } from "../../api/api";

// export default function SubscriptionReview() {
//   const { subscriptionId } = useParams();
//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(true);
//   const [sub, setSub] = useState(null);
//   const [error, setError] = useState("");

//   // Fetch review
//   useEffect(() => {
//     const fetchReview = async () => {
//       try {
//         const res = await getSubscriptionReview(subscriptionId);
//         setSub(res.data);
//       } catch (err) {
//         setError(
//           err?.response?.data?.message ||
//             "Subscription details load karte time error aa gaya."
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (subscriptionId) fetchReview();
//   }, [subscriptionId]);

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-white via-red-50/20 to-white font-inter flex items-center justify-center px-4">
//       <div className="max-w-xl w-full">
//         {/* LOADING */}
//         {loading && (
//           <div className="flex justify-center py-10">
//             <div className="h-10 w-10 border-2 border-[#E23744] border-t-transparent rounded-full animate-spin" />
//           </div>
//         )}

//         {/* ERROR */}
//         {!loading && error && (
//           <div className="bg-white border border-red-200 text-red-600 rounded-2xl p-6 shadow-lg">
//             {error}
//           </div>
//         )}

//         {/* NOT FOUND */}
//         {!loading && !error && !sub && (
//           <div className="bg-white border border-gray-200 text-gray-700 rounded-2xl p-6 shadow-lg">
//             Subscription not found.
//           </div>
//         )}

//         {/* SUCCESS UI */}
//         {!loading && sub && (
//           <motion.div
//             initial={{ opacity: 0, y: 25 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="bg-white border-2 border-gray-100 rounded-3xl p-8 shadow-2xl text-center relative overflow-hidden"
//           >
//             {/* Background accent circles */}
//             <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#E23744]/10 rounded-full blur-2xl" />
//             <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#E23744]/10 rounded-full blur-2xl" />

//             <div className="relative z-10">
//               {/* Success icon */}
//               <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto mb-3" />

//               <h1 className="text-2xl md:text-3xl font-bold font-['Playfair_Display'] mb-2">
//                 Subscription Activated 🎉
//               </h1>

//               <p className="text-sm text-gray-600 mb-6">
//                 Your Tiffino subscription is now active.  
//                 Discounts & free delivery will apply automatically on your orders.
//               </p>

//               {/* DETAILS CARD */}
//               <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 text-left mb-6">
//                 {/* TOP DETAILS */}
//                 <div className="flex items-center justify-between mb-3">
//                   <div>
//                     <p className="text-xs text-gray-500">Subscription ID</p>
//                     <p className="text-sm font-semibold text-gray-800">
//                       {sub.subscriptionid}
//                     </p>
//                   </div>

//                   <span className="px-3 py-1 text-xs font-semibold bg-emerald-100 text-emerald-700 rounded-full flex items-center gap-1">
//                     <CheckCircle2 className="w-3 h-3" />
//                     {sub.status}
//                   </span>
//                 </div>

//                 {/* DATES */}
//                 <div className="flex items-center gap-2 mb-2 text-sm text-gray-700">
//                   <CalendarDays className="w-4 h-4 text-[#E23744]" />
//                   <span>
//                     {sub.startDate} – {sub.endDate}
//                   </span>
//                 </div>

//                 {/* DISCOUNT */}
//                 <div className="flex items-center gap-2 mb-2 text-sm text-gray-700">
//                   <BadgePercent className="w-4 h-4 text-emerald-600" />
//                   <span>{sub.discountPercentage}% subscription discount</span>
//                 </div>

//                 {/* FREE DELIVERY */}
//                 <div className="flex items-center gap-2 mb-2 text-sm text-gray-700">
//                   <Truck className="w-4 h-4 text-[#E23744]" />
//                   <span>
//                     {sub.freeDelivery
//                       ? "Free delivery on all meals in this subscription."
//                       : "Delivery charges apply normally."}
//                   </span>
//                 </div>

//                 {/* Frequency */}
//                 {sub.frequency && (
//                   <p className="text-xs text-gray-500 mt-2">
//                     Frequency: <span className="font-semibold">{sub.frequency}</span>
//                   </p>
//                 )}
//               </div>

//               {/* NOTE */}
//               <p className="text-xs text-gray-500 mb-4">
//                 While ordering, simply use{" "}
//                 <span className="font-semibold">subscriptionId = {sub.subscriptionid}</span>.  
//                 Backend automatically applies:
//                 <br />
//                 <b>discount + free delivery</b> using:  
//                 <code className="ml-1 bg-gray-100 px-2 py-0.5 rounded text-[11px]">
//                   POST /subscri/orders/from-subscription/{`{subscriptionId}`}
//                 </code>
//               </p>

//               {/* ACTION BUTTONS */}
//               <div className="flex flex-col sm:flex-row gap-3 justify-center">
//                 <button
//                   onClick={() => navigate("/profile")}
//                   className="flex-1 px-6 py-3 bg-[#E23744] text-white rounded-full text-sm font-semibold shadow-md hover:shadow-[#E23744]/40 transition-all hover:-translate-y-[1px] flex items-center justify-center gap-2"
//                 >
//                   Go to Profile
//                   <ArrowRight className="w-4 h-4" />
//                 </button>

//                 <button
//                   onClick={() => navigate("/cuisine")}
//                   className="flex-1 px-6 py-3 border border-gray-300 bg-white rounded-full text-sm font-semibold hover:bg-gray-50 transition-all"
//                 >
//                   Start Ordering
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import {
  CheckCircle2,
  CalendarDays,
  BadgePercent,
  Truck,
  ArrowRight,
  ShieldCheck,
  Utensils,
  CreditCard,
  Crown
} from "lucide-react";

import "@fontsource/playfair-display";
import "@fontsource/inter";

import { getSubscriptionReview } from "../../api/api";

export default function SubscriptionReview() {
  const { subscriptionId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [sub, setSub] = useState(null);
  const [error, setError] = useState("");

  // Fetch subscription details
  useEffect(() => {
    const fetchReview = async () => {
      try {
        const res = await getSubscriptionReview(subscriptionId);
        setSub(res.data);
        // Trigger celebration on success
        confetti({
           particleCount: 150,
           spread: 70,
           origin: { y: 0.6 }
        });
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to load subscription details.");
      } finally {
        setLoading(false);
      }
    };

    if (subscriptionId) fetchReview();
  }, [subscriptionId]);

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center px-4 font-sans relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-400/10 rounded-full blur-[120px]"/>
         <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-500/10 rounded-full blur-[120px]"/>
      </div>

      <div className="max-w-4xl w-full relative z-10">
        
        {/* LOADING STATE */}
        {loading && (
          <div className="flex flex-col items-center justify-center">
             <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mb-4"/>
             <p className="text-gray-500 font-medium">Verifying your membership...</p>
          </div>
        )}

        {/* ERROR STATE */}
        {!loading && error && (
          <div className="bg-white border border-red-100 text-red-600 rounded-3xl p-8 text-center shadow-xl max-w-md mx-auto">
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500">!</div>
            <h3 className="font-bold text-lg mb-2">Something went wrong</h3>
            <p className="text-sm mb-6">{error}</p>
            <button onClick={() => navigate("/subscription")} className="px-6 py-2 bg-red-600 text-white rounded-full font-bold">Try Again</button>
          </div>
        )}

        {/* SUCCESS STATE */}
        {!loading && sub && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.5, type: "spring" }}
            className="flex flex-col md:flex-row gap-8 items-center"
          >
             {/* LEFT: TEXT CONTENT */}
             <div className="flex-1 text-center md:text-left">
                <motion.div 
                   initial={{ y: 20, opacity: 0 }} 
                   animate={{ y: 0, opacity: 1 }} 
                   transition={{ delay: 0.2 }}
                   className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-bold mb-6"
                >
                   <CheckCircle2 size={16}/> Activation Successful
                </motion.div>
                
                <h1 className="text-4xl md:text-5xl font-extrabold font-['Playfair_Display'] text-gray-900 mb-4 leading-tight">
                   Welcome to the <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-600">Premium Club!</span>
                </h1>
                
                <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto md:mx-0">
                   Your subscription is now active. Enjoy flat discounts, free delivery, and priority service on every order.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                   <button 
                      onClick={() => navigate("/cuisine")}
                      className="px-8 py-4 bg-gray-900 text-white rounded-full font-bold text-lg shadow-xl hover:bg-black hover:scale-105 transition-all flex items-center justify-center gap-2"
                   >
                      Start Ordering <ArrowRight size={20}/>
                   </button>
                   <button 
                      onClick={() => navigate("/profile")}
                      className="px-8 py-4 bg-white text-gray-700 border-2 border-gray-100 rounded-full font-bold text-lg hover:border-gray-300 transition-all"
                   >
                      View Profile
                   </button>
                </div>
             </div>

             {/* RIGHT: MEMBERSHIP CARD (HOLOGRAPHIC STYLE) */}
             <motion.div 
                initial={{ rotate: 5, opacity: 0 }} 
                animate={{ rotate: 0, opacity: 1 }} 
                transition={{ delay: 0.4, type: "spring" }}
                className="w-full md:w-[400px]"
             >
                <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-8 shadow-2xl border border-gray-700">
                   
                   {/* Card Decor */}
                   <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10"/>
                   <div className="absolute bottom-0 left-0 w-40 h-40 bg-yellow-500/10 rounded-full blur-3xl"/>

                   {/* Card Header */}
                   <div className="flex justify-between items-start mb-10 relative z-10">
                      <div>
                         <p className="text-xs text-white/50 uppercase tracking-widest font-bold mb-1">Tiffino Membership</p>
                         <h3 className="text-2xl font-bold flex items-center gap-2">
                            <Crown className="text-yellow-400 fill-yellow-400" size={24}/> {sub.planType} Plan
                         </h3>
                      </div>
                      <CreditCard className="text-white/20 w-10 h-10"/>
                   </div>

                   {/* Benefits Grid */}
                   <div className="grid grid-cols-2 gap-6 mb-8 relative z-10">
                      <div>
                         <p className="text-xs text-white/50 mb-1">Discount</p>
                         <p className="text-xl font-bold text-yellow-400">{sub.discountPercentage}% OFF</p>
                      </div>
                      <div>
                         <p className="text-xs text-white/50 mb-1">Delivery</p>
                         <p className="text-xl font-bold text-green-400">FREE</p>
                      </div>
                      <div>
                         <p className="text-xs text-white/50 mb-1">Valid Until</p>
                         <p className="text-sm font-medium">{sub.endDate}</p>
                      </div>
                      <div>
                         <p className="text-xs text-white/50 mb-1">Status</p>
                         <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"/>
                            <span className="text-sm font-bold">Active</span>
                         </div>
                      </div>
                   </div>

                   {/* Card Footer */}
                   <div className="pt-6 border-t border-white/10 flex justify-between items-end relative z-10">
                      <div>
                         <p className="text-[10px] text-white/40 uppercase tracking-widest">Subscription ID</p>
                         <p className="font-mono text-sm text-white/80 tracking-wide">#{sub.subscriptionid}</p>
                      </div>
                      <ShieldCheck className="text-white/30 w-6 h-6"/>
                   </div>

                </div>
             </motion.div>

          </motion.div>
        )}

      </div>
    </div>
  );
}