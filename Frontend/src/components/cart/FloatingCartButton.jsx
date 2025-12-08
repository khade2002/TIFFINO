// src/components/cart/FloatingCartButton.jsx

import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, ChevronRight } from "lucide-react";
import { useCart } from "../../context/CartContext";

export default function FloatingCartButton() {
  const { totalItems, totalPrice } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  // Hide button if already on Cart or Checkout page
  const hide = ["/cart", "/checkout", "/login", "/signup"].includes(location.pathname);

  // Logic: Show only if items exist AND not on hidden pages
  const isVisible = totalItems > 0 && !hide;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="fixed bottom-6 left-0 right-0 z-40 px-4 md:px-0 pointer-events-none"
        >
          <div 
            onClick={() => navigate("/cart")}
            className="
              pointer-events-auto cursor-pointer
              max-w-2xl mx-auto 
              bg-gray-900 text-white 
              rounded-2xl p-4 
              shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] 
              flex items-center justify-between
              border border-gray-700
              hover:scale-[1.02] transition-transform active:scale-95
            "
          >
            {/* Left Info */}
            <div className="flex flex-col">
               <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                 {totalItems} items in cart
               </span>
               <span className="text-lg font-extrabold text-white">
                 ₹{totalPrice} <span className="text-xs font-normal text-gray-400">+ taxes</span>
               </span>
            </div>

            {/* Right Action */}
            <div className="flex items-center gap-2 font-bold text-sm bg-white/10 px-4 py-2 rounded-xl backdrop-blur-md">
               View Cart <ShoppingBag size={16} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}