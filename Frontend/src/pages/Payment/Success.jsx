// // src/pages/Success/Success.jsx
// import { Link } from "react-router-dom";

// export default function Success() {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-6">
//       <h1 className="text-3xl font-bold text-green-600 mb-4">
//         🎉 Order Successful!
//       </h1>
//       <p className="text-gray-600 mb-6">
//         Thank you for your order. Your food is on the way 🚀
//       </p>
//       <Link
//         to="/orders"
//         className="px-6 py-3 rounded-lg bg-primary text-white hover:opacity-90"
//       >
//         View Orders
//       </Link>
//     </div>
//   );
// }




// src/pages/Payment/Success.jsx

import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { CheckCircle2, Package, ArrowRight, Home, Receipt } from "lucide-react";

export default function Success() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const orderId = searchParams.get("orderId") || "N/A";
  const [countdown, setCountdown] = useState(10);

  // --- 1. Trigger Confetti on Load ---
  useEffect(() => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center p-4 font-sans relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />
         <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-400/10 rounded-full blur-[120px]" 
         />
      </div>

      <motion.div 
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl p-8 md:p-12 text-center border border-white/50"
      >
        {/* Animated Check Icon */}
        <div className="flex justify-center mb-8">
           <motion.div 
             initial={{ scale: 0, rotate: -180 }}
             animate={{ scale: 1, rotate: 0 }}
             transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
             className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center shadow-inner"
           >
              <CheckCircle2 size={48} className="text-green-500 drop-shadow-sm" />
           </motion.div>
        </div>

        {/* Text Content */}
        <motion.h1 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2"
        >
          Order Confirmed!
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="text-gray-500 text-lg mb-8"
        >
          Tasty food is on its way to your doorstep.
        </motion.p>

        {/* Order Details Ticket */}
        <motion.div 
           initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
           className="bg-gray-50 rounded-2xl p-4 mb-8 border border-gray-100 flex items-center justify-between"
        >
           <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-lg shadow-sm">
                 <Receipt size={20} className="text-gray-400"/>
              </div>
              <div className="text-left">
                 <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Order ID</p>
                 <p className="font-bold text-gray-900">#{orderId}</p>
              </div>
           </div>
           <div className="text-right">
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Est. Time</p>
              <p className="font-bold text-gray-900">30-40 min</p>
           </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
           initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
           className="flex flex-col gap-3"
        >
           <button 
             onClick={() => navigate("/orders")}
             className="w-full py-4 bg-green-600 text-white rounded-2xl font-bold text-lg shadow-lg shadow-green-200 hover:bg-green-700 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 group"
           >
             <Package size={20} className="group-hover:animate-bounce" /> Track Order
           </button>
           
           <Link 
             to="/"
             className="w-full py-4 bg-white text-gray-700 border border-gray-200 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
           >
             <Home size={20} /> Back to Home
           </Link>
        </motion.div>

      </motion.div>
    </div>
  );
}