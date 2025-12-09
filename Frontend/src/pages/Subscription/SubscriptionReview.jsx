
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