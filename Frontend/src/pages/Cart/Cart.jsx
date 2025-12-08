// import { useEffect, useState } from "react";
// import { Trash2, Plus, Minus } from "lucide-react";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// import {
//   getCartItems,
//   updateCartItem,
//   removeCartItem,
//   getCartTotal,
// } from "../../api/api";

// export default function Cart() {
//   const [items, setItems] = useState([]);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const navigate = useNavigate();

//   // ============================
//   // LOAD CART
//   // ============================
//   const loadCart = async () => {
//     try {
//       const res = await getCartItems();
//       setItems(res.data || []);

//       const totalRes = await getCartTotal();
//       setTotalPrice(totalRes.data || 0);
//     } catch (err) {
//       console.error("Cart load error:", err);
//       toast.error("Failed to load cart ❌");
//     }
//   };

//   useEffect(() => {
//     loadCart();
//   }, []);

//   // ============================
//   // QUANTITY UPDATE
//   // ============================
//   const increment = async (foodId) => {
//     try {
//       const item = items.find((i) => i.foodId === foodId);
//       if (!item) return;

//       await handleQtyUpdate(foodId, Number(item.quantity) + 1);
//     } catch {
//       toast.error("Error updating quantity ❌");
//     }
//   };

//   const decrement = async (foodId) => {
//     try {
//       const item = items.find((i) => i.foodId === foodId);
//       if (!item || item.quantity <= 1) return;

//       await handleQtyUpdate(foodId, Number(item.quantity) - 1);
//     } catch {
//       toast.error("Error updating quantity ❌");
//     }
//   };

//   const handleQtyUpdate = async (foodId, quantity) => {
//     try {
//       await updateCartItem(String(foodId), Number(quantity));
//       toast.success("Quantity Updated ✔");
//       loadCart();
//     } catch (err) {
//       console.error("Update error:", err);
//       toast.error("Failed to update quantity ❌");
//     }
//   };

//   // ============================
//   // REMOVE ITEM
//   // ============================
//   const removeItem = async (foodId) => {
//     try {
//       await removeCartItem(String(foodId));
//       toast.success("Item removed 🗑️");
//       loadCart();
//     } catch (err) {
//       console.error("Remove error:", err);
//       toast.error("Failed to remove item ❌");
//     }
//   };

//   // ============================
//   // EMPTY CART UI
//   // ============================
//   if (items.length === 0) {
//     return (
//       <div className="min-h-[70vh] flex items-center justify-center text-gray-600 text-lg">
//         Your cart is empty 🛒
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

//       {/* Cart Items */}
//       <div className="space-y-4">
//         {items.map((item) => (
//           <div
//             key={item.foodId}
//             className="flex items-center justify-between bg-white p-4 rounded-xl shadow"
//           >
//             {/* Image + Info */}
//             <div className="flex items-center gap-4">
//               <img
//                 src={item.imageUrl || "https://via.placeholder.com/80"}
//                 alt={item.foodName}
//                 className="w-16 h-16 rounded-lg object-cover"
//               />
//               <div>
//                 <h3 className="font-semibold">{item.foodName}</h3>
//                 <p className="text-gray-500">₹{item.price}</p>
//               </div>
//             </div>

//             {/* Qty Controls */}
//             <div className="flex items-center gap-3">
//               <button
//                 onClick={() => decrement(item.foodId)}
//                 className="bg-gray-200 p-1 rounded"
//               >
//                 <Minus />
//               </button>
//               <span>{item.quantity}</span>
//               <button
//                 onClick={() => increment(item.foodId)}
//                 className="bg-gray-200 p-1 rounded"
//               >
//                 <Plus />
//               </button>
//             </div>

//             {/* Price + Remove */}
//             <div className="flex items-center gap-6">
//               <span className="font-semibold">
//                 ₹{Number(item.price) * Number(item.quantity)}
//               </span>
//               <button
//                 onClick={() => removeItem(item.foodId)}
//                 className="text-red-500"
//               >
//                 <Trash2 />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Summary */}
//       <div className="mt-6 bg-white p-6 rounded-xl shadow-lg">
//         <div className="flex justify-between text-lg font-semibold">
//           <span>Total Price:</span>
//           <span>₹{totalPrice}</span>
//         </div>

//         <button
//           onClick={() => navigate("/checkout")}
//           className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-bold"
//         >
//           Checkout
//         </button>
//       </div>
//     </div>
//   );
// }



// import { useEffect, useState } from "react";
// import { Trash2, Plus, Minus, ShoppingBag, Sparkles } from "lucide-react";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// import {
//   getCartItems,
//   updateCartItem,
//   removeCartItem,
//   getCartTotal,
// } from "../../api/api";

// export default function Cart() {
//   const [items, setItems] = useState([]);
//   const [totalPrice, setTotalPrice] = useState(0);

//   // Subscription Discount Handling (future integration ready)
//   const activeSubscriptionId = localStorage.getItem("activeSubscriptionId");
//   const [discountApplied, setDiscountApplied] = useState(false);

//   const navigate = useNavigate();

//   // ============================
//   // LOAD CART
//   // ============================
//   const loadCart = async () => {
//     try {
//       const res = await getCartItems();
//       setItems(res.data || []);

//       const totalRes = await getCartTotal();
//       setTotalPrice(totalRes.data || 0);

//       if (activeSubscriptionId) {
//         // Just UI indication, backend discount will apply during order
//         setDiscountApplied(true);
//       }
//     } catch (err) {
//       console.error("Cart load error:", err);
//       toast.error("Failed to load cart ❌");
//     }
//   };

//   useEffect(() => {
//     loadCart();
//   }, []);

//   // ============================
//   // QUANTITY UPDATE
//   // ============================
//   const handleQtyUpdate = async (foodId, quantity) => {
//     try {
//       await updateCartItem(String(foodId), Number(quantity));
//       loadCart();
//     } catch (err) {
//       console.error("Update error:", err);
//       toast.error("Failed to update quantity ❌");
//     }
//   };

//   const increment = (foodId) => {
//     const item = items.find((i) => i.foodId === foodId);
//     if (!item) return;
//     handleQtyUpdate(foodId, Number(item.quantity) + 1);
//   };

//   const decrement = (foodId) => {
//     const item = items.find((i) => i.foodId === foodId);
//     if (!item || item.quantity <= 1) return;
//     handleQtyUpdate(foodId, Number(item.quantity) - 1);
//   };

//   // ============================
//   // REMOVE ITEM
//   // ============================
//   const removeItemHandler = async (foodId) => {
//     try {
//       await removeCartItem(String(foodId));
//       toast.success("Item removed 🗑️");
//       loadCart();
//     } catch {
//       toast.error("Failed to remove item ❌");
//     }
//   };

//   // ============================
//   // EMPTY CART SCREEN (PREMIUM)
//   // ============================
//   if (items.length === 0) {
//     return (
//       <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4">
//         <ShoppingBag className="w-20 h-20 text-gray-400 mb-4" />
//         <h2 className="text-2xl font-bold text-gray-700 mb-2">
//           Your Cart is Empty
//         </h2>
//         <p className="text-gray-500 mb-6 max-w-sm">
//           Add your favourite meals and we’ll bring them hot & fresh!
//         </p>

//         <button
//           onClick={() => navigate("/")}
//           className="px-6 py-3 bg-[#E23744] text-white rounded-full shadow-lg hover:shadow-[#E23744]/40 transition-all font-bold"
//         >
//           Explore Meals
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-6 min-h-screen">
//       {/* HEADER */}
//       <div className="mb-8 flex justify-between items-center">
//         <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
//           <Sparkles className="text-[#E23744]" />
//           Your Cart
//         </h2>

//         {discountApplied && (
//           <div className="px-4 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold border border-emerald-300">
//             Subscription Discount Active
//           </div>
//         )}
//       </div>

//       {/* CART ITEMS */}
//       <div className="space-y-5">
//         {items.map((item) => (
//           <div
//             key={item.foodId}
//             className="bg-white rounded-2xl shadow-md p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-xl transition-all"
//           >
//             {/* Left — Image + Details */}
//             <div className="flex items-center gap-4">
//               <img
//                 src={
//                   item.imageUrl ||
//                   `https://source.unsplash.com/400x300/?food,${item.foodName}`
//                 }
//                 alt={item.foodName}
//                 className="w-20 h-20 rounded-xl object-cover shadow"
//               />

//               <div>
//                 <h3 className="text-lg font-semibold">{item.foodName}</h3>
//                 <p className="text-gray-500 text-sm">₹{item.price}</p>
//               </div>
//             </div>

//             {/* Middle — Qty */}
//             <div className="flex items-center gap-3">
//               <button
//                 onClick={() => decrement(item.foodId)}
//                 className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
//               >
//                 <Minus size={18} />
//               </button>

//               <span className="font-semibold">{item.quantity}</span>

//               <button
//                 onClick={() => increment(item.foodId)}
//                 className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
//               >
//                 <Plus size={18} />
//               </button>
//             </div>

//             {/* Right — Price + Remove */}
//             <div className="flex items-center gap-6">
//               <span className="text-xl font-bold text-gray-800">
//                 ₹{item.price * item.quantity}
//               </span>

//               <button
//                 onClick={() => removeItemHandler(item.foodId)}
//                 className="text-red-500 hover:text-red-700 transition"
//               >
//                 <Trash2 size={22} />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* SUMMARY CARD */}
//       <div className="mt-10 bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
//         <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

//         <div className="flex justify-between text-lg mb-1">
//           <span>Subtotal</span>
//           <span>₹{totalPrice}</span>
//         </div>

//         {discountApplied && (
//           <div className="flex justify-between text-green-600 font-semibold text-sm mb-1">
//             <span>Subscription Discount</span>
//             <span>Auto Applied ✓</span>
//           </div>
//         )}

//         <div className="mt-4 h-px bg-gray-200"></div>

//         <div className="flex justify-between text-xl font-bold mt-4">
//           <span>Total</span>
//           <span>₹{totalPrice}</span>
//         </div>

//         <button
//           onClick={() => navigate("/checkout")}
//           className="mt-6 w-full bg-[#E23744] text-white py-3 rounded-full text-lg font-bold shadow-lg hover:shadow-[#E23744]/40 hover:-translate-y-0.5 transition-all"
//         >
//           Proceed to Checkout →
//         </button>
//       </div>
//     </div>
//   );
// }



import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Receipt, 
  ShieldCheck, 
  Clock,
  ChevronLeft
} from "lucide-react";
import { useCart } from "../../context/CartContext";

export default function Cart() {
  const { items, totalPrice, increment, decrement, remove, loadCart } = useCart();
  const navigate = useNavigate();

  const activeSubscriptionId = localStorage.getItem("activeSubscriptionId");
  const discountApplied = !!activeSubscriptionId;

  // Constants for Bill
  const deliveryFee = totalPrice > 500 ? 0 : 40;
  const platformFee = 5;
  const gst = Math.round(totalPrice * 0.05); // 5% GST
  const grandTotal = totalPrice + deliveryFee + platformFee + gst;

  useEffect(() => {
    loadCart();
  }, []);

  // --- EMPTY STATE ---
  if (!items || items.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-[#FAFAFA] px-4">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-32 h-32 bg-red-50 rounded-full flex items-center justify-center mb-6 shadow-inner"
        >
          <ShoppingBag size={48} className="text-red-400" />
        </motion.div>
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Your Cart is Empty</h2>
        <p className="text-gray-500 mb-8 max-w-xs text-center text-sm">
          Looks like you haven't made your choice yet. Let's find something delicious!
        </p>
        <button
          onClick={() => navigate("/cuisine")}
          className="px-8 py-3.5 bg-red-600 text-white rounded-2xl font-bold shadow-xl shadow-red-200 hover:bg-red-700 hover:scale-105 transition-all"
        >
          Browse Menu
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] py-8 px-4 md:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
           <button onClick={() => navigate(-1)} className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 transition">
              <ChevronLeft size={24} className="text-gray-700"/>
           </button>
           <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">My Food Cart</h1>
           <span className="bg-red-100 text-red-600 text-xs font-bold px-3 py-1 rounded-full">{items.length} Items</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* --- LEFT: CART ITEMS LIST --- */}
          <div className="lg:col-span-8 space-y-6">
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <motion.div
                  layout
                  key={item.foodId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="group bg-white p-4 rounded-[1.5rem] shadow-sm border border-gray-100 flex gap-4 sm:gap-6 items-center hover:shadow-md transition-shadow relative overflow-hidden"
                >
                  {/* Image */}
                  <div className="w-24 h-24 sm:w-32 sm:h-28 shrink-0 rounded-2xl overflow-hidden bg-gray-100">
                    <img
                      src={item.image || item.imageUrl || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=400"}
                      alt={item.name || item.foodName}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                       <div>
                          <h3 className="text-lg font-bold text-gray-900 truncate pr-4">{item.name || item.foodName}</h3>
                          <p className="text-gray-500 text-sm font-medium">₹{item.price}</p>
                       </div>
                       <button onClick={() => remove(item.foodId)} className="text-gray-300 hover:text-red-500 transition-colors p-1">
                          <Trash2 size={18} />
                       </button>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-between mt-4">
                       <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-1 border border-gray-200">
                          <button onClick={() => decrement(item.foodId)} className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm text-gray-600 hover:text-red-600 font-bold transition">
                             <Minus size={14} />
                          </button>
                          <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                          <button onClick={() => increment(item.foodId)} className="w-8 h-8 flex items-center justify-center bg-gray-900 text-white rounded-lg shadow-sm hover:bg-black font-bold transition">
                             <Plus size={14} />
                          </button>
                       </div>
                       <div className="text-lg font-bold text-gray-900">
                          ₹{item.price * item.quantity}
                       </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Delivery Instructions (Optional visual filler) */}
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
               <div className="p-3 bg-blue-50 rounded-full text-blue-600"><Clock size={20}/></div>
               <div>
                  <h4 className="font-bold text-gray-800">Delivery in 30-40 mins</h4>
                  <p className="text-sm text-gray-500">Items are prepared fresh. Live tracking available after order.</p>
               </div>
            </div>
          </div>

          {/* --- RIGHT: BILL SUMMARY (Sticky) --- */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="bg-white rounded-[2rem] p-6 shadow-xl border border-gray-100 relative overflow-hidden">
               
               {/* Decorative Gradient Top */}
               <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 to-orange-500" />

               <h3 className="text-xl font-bold flex items-center gap-2 mb-6">
                  <Receipt className="text-red-500" size={20}/> Bill Details
               </h3>

               {/* Discount Banner */}
               {discountApplied && (
                  <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm font-bold flex justify-between items-center">
                     <span>Subscription Active</span>
                     <ShieldCheck size={16} />
                  </div>
               )}

               {/* Bill Rows */}
               <div className="space-y-3 text-sm text-gray-600 mb-6">
                  <div className="flex justify-between">
                     <span>Item Total</span>
                     <span className="font-bold text-gray-900">₹{totalPrice}</span>
                  </div>
                  <div className="flex justify-between">
                     <span className="flex items-center gap-1">Delivery Fee {deliveryFee === 0 && <span className="text-[10px] bg-green-100 text-green-700 px-1.5 rounded">FREE</span>}</span>
                     <span className={deliveryFee === 0 ? "text-green-600 font-bold" : "font-bold text-gray-900"}>
                        {deliveryFee === 0 ? "₹0" : `₹${deliveryFee}`}
                     </span>
                  </div>
                  <div className="flex justify-between">
                     <span>Platform Fee</span>
                     <span className="font-bold text-gray-900">₹{platformFee}</span>
                  </div>
                  <div className="flex justify-between">
                     <span>GST and Restaurant Charges</span>
                     <span className="font-bold text-gray-900">₹{gst}</span>
                  </div>
               </div>

               <div className="border-t border-dashed border-gray-300 my-4" />

               {/* Total */}
               <div className="flex justify-between items-center mb-8">
                  <span className="text-lg font-bold text-gray-800">To Pay</span>
                  <span className="text-2xl font-extrabold text-red-600">₹{grandTotal}</span>
               </div>

               {/* Checkout Button */}
               <button
                  onClick={() => navigate("/checkout")}
                  className="w-full group relative py-4 bg-gray-900 text-white rounded-2xl font-bold text-lg shadow-xl hover:bg-black transition-all overflow-hidden"
               >
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="relative flex items-center justify-center gap-2">
                     Proceed to Pay <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform"/>
                  </span>
               </button>

               <div className="mt-4 flex justify-center gap-4 text-xs text-gray-400 font-medium">
                  <span className="flex items-center gap-1"><ShieldCheck size={12}/> Secure Payment</span>
                  <span className="flex items-center gap-1"><Clock size={12}/> 100% Refund on cancellation</span>
               </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}