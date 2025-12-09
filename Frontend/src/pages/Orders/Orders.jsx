
import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Clock,
  Utensils,
  Repeat2,
  ReceiptText,
  Package,
  PhoneCall,
  Bike,
  Star,
  X,
  ChevronRight,
  MapPin,
  ShoppingBag
} from "lucide-react";

import toast from "react-hot-toast";
import confetti from "canvas-confetti";

import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { getOrderById, getOrdersByUserId } from "../../api/api";
import WriteReview from "../Review/WriteReview";

/* ==========================================================
   CONSTANTS & HELPERS
   ========================================================== */
const ORDER_STEPS = ["PLACED", "ACCEPTED", "PREPARING", "PICKED_UP", "DELIVERED"];

const normalizeStatus = (s) => (s ? s.toUpperCase().trim() : "");

const STATUS_COLORS = {
  PLACED: "bg-blue-100 text-blue-700",
  ACCEPTED: "bg-indigo-100 text-indigo-700",
  PREPARING: "bg-amber-100 text-amber-700",
  PICKED_UP: "bg-orange-100 text-orange-700",
  DELIVERED: "bg-emerald-100 text-emerald-700",
  REJECTED: "bg-red-100 text-red-700",
};

export default function Orders() {
  const { user } = useAuth();
  const { addItem } = useCart();

  const [activeOrder, setActiveOrder] = useState(null);
  const [history, setHistory] = useState([]);
  const [tab, setTab] = useState("ongoing"); // "ongoing" | "history"
  const [progressStep, setProgressStep] = useState(0);

  const [showModal, setShowModal] = useState(null);
  const [openReview, setOpenReview] = useState(false);
  const [reviewOrder, setReviewOrder] = useState(null);

  const userId = user?.email;

  // --- 1. LOAD ORDERS ---
  useEffect(() => {
    if (!userId) return;
    const loadOrders = async () => {
      try {
        const res = await getOrdersByUserId(userId);
        const raw = res?.data || [];
        const orders = Array.isArray(raw) ? raw : raw?.data || [];

        const ongoing = orders.filter(o => !["DELIVERED", "REJECTED"].includes(normalizeStatus(o.status)));
        const past = orders.filter(o => ["DELIVERED", "REJECTED"].includes(normalizeStatus(o.status)));

        setActiveOrder(ongoing[0] || null);
        setHistory(past);
        setTab(ongoing.length ? "ongoing" : "history");

        if (ongoing[0]) {
           const idx = ORDER_STEPS.indexOf(normalizeStatus(ongoing[0].status));
           setProgressStep(idx >= 0 ? idx : 0);
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load orders");
      }
    };
    loadOrders();
  }, [userId]);

  // --- 2. POLL ACTIVE ORDER ---
  useEffect(() => {
    if (!activeOrder?.orderId) return;
    const interval = setInterval(async () => {
      try {
        const res = await getOrderById(activeOrder.orderId);
        const updated = res?.data;
        if (!updated) return;

        const status = normalizeStatus(updated.status);
        const idx = ORDER_STEPS.indexOf(status);
        setProgressStep(idx >= 0 ? idx : 0);
        setActiveOrder(updated);

        if (["DELIVERED", "REJECTED"].includes(status)) {
          confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
          setHistory(prev => [updated, ...prev.filter(o => o.orderId !== updated.orderId)]);
          setActiveOrder(null);
          setTab("history");
        }
      } catch (e) { console.error("Polling error", e); }
    }, 4000);
    return () => clearInterval(interval);
  }, [activeOrder?.orderId]);

  // --- 3. ACTIONS ---
  const reorder = (order) => {
    if (!order?.items?.length) return;
    order.items.forEach(it => addItem({
       id: it.foodId || it.mealId,
       name: it.mealName,
       price: it.pricePerItem,
       image: it.imageUrl
    }));
    toast.success("Items added to cart! 🛒");
  };

  // --- 4. RENDER HELPERS ---
  const progressPercent = useMemo(() => (progressStep / (ORDER_STEPS.length - 1 || 1)) * 100, [progressStep]);
  
  // Delivery Info Logic
  const partnerName = activeOrder?.deliveryPartnerName || activeOrder?.delivery?.deliveryPartnerName || "Assigning...";
  const partnerPhone = activeOrder?.deliveryPartnerPhone || activeOrder?.delivery?.deliveryPartnerPhone || "";
  const isAssigned = ORDER_STEPS.indexOf(normalizeStatus(activeOrder?.status)) >= 3; // Picked Up onwards

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans text-gray-800 pb-20">
      
      {/* --- HEADER --- */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
         <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
               <h1 className="text-2xl font-extrabold text-gray-900">Your Orders</h1>
               <p className="text-sm text-gray-500">Track current orders or reorder from history</p>
            </div>

            {/* Custom Tabs */}
            <div className="flex bg-gray-100 p-1 rounded-xl">
               {["ongoing", "history"].map((t) => (
                  <button
                     key={t}
                     onClick={() => setTab(t)}
                     className={`relative px-6 py-2 rounded-lg text-sm font-bold capitalize transition-all z-10 ${tab === t ? "text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                  >
                     {tab === t && (
                        <motion.div layoutId="tab-bg" className="absolute inset-0 bg-white rounded-lg shadow-sm -z-10" />
                     )}
                     {t}
                  </button>
               ))}
            </div>
         </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 md:px-8 py-8">
         
         {/* ===================== ONGOING TAB ===================== */}
         <AnimatePresence mode="wait">
            {tab === "ongoing" && (
               <motion.div
                  key="ongoing"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
               >
                  {activeOrder ? (
                     <div className="grid lg:grid-cols-[1.8fr_1fr] gap-8">
                        
                        {/* LEFT: STATUS CARD */}
                        <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-xl border border-gray-100 relative overflow-hidden">
                           <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-500 to-orange-500" />
                           
                           <div className="flex justify-between items-start mb-8">
                              <div>
                                 <div className="flex items-center gap-2 mb-1">
                                    <h2 className="text-xl font-extrabold text-gray-900">Tiffino Kitchen</h2>
                                    <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                                       <span className="w-1.5 h-1.5 bg-green-600 rounded-full animate-pulse"/> LIVE
                                    </span>
                                 </div>
                                 <p className="text-sm text-gray-500">Order ID: #{activeOrder.orderId}</p>
                              </div>
                              <div className="text-right">
                                 <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">Est. Delivery</p>
                                 <p className="text-2xl font-extrabold text-gray-900">25-35 <span className="text-sm font-medium text-gray-500">min</span></p>
                              </div>
                           </div>

                           {/* PROGRESS BAR */}
                           <div className="relative mb-10 mx-2">
                              <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 rounded-full -translate-y-1/2" />
                              <motion.div 
                                 className="absolute top-1/2 left-0 h-1 bg-red-500 rounded-full -translate-y-1/2 transition-all duration-700" 
                                 style={{ width: `${progressPercent}%` }}
                              />
                              <div className="relative flex justify-between">
                                 {ORDER_STEPS.map((step, i) => {
                                    const active = i <= progressStep;
                                    const current = i === progressStep;
                                    return (
                                       <div key={step} className="flex flex-col items-center gap-2">
                                          <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 z-10 bg-white transition-all ${active ? "border-red-500 text-red-500" : "border-gray-200 text-gray-300"} ${current ? "ring-4 ring-red-100 scale-110" : ""}`}>
                                             {active ? <CheckCircle2 size={16} fill={current ? "none" : "#ef4444"} className={current ? "" : "text-white"} /> : <span className="text-xs font-bold">{i+1}</span>}
                                          </div>
                                          <span className={`text-[10px] font-bold uppercase tracking-wider ${active ? "text-gray-900" : "text-gray-300"}`}>
                                             {step.replace("_", " ")}
                                          </span>
                                       </div>
                                    )
                                 })}
                              </div>
                           </div>

                           {/* ITEMS LIST */}
                           <div className="bg-gray-50 rounded-2xl p-4">
                              {activeOrder.items?.map((item, i) => (
                                 <div key={i} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-0">
                                    <div className="flex items-center gap-3">
                                       <span className="text-xs font-bold text-gray-400">x{item.quantity}</span>
                                       <span className="text-sm font-semibold text-gray-700">{item.mealName}</span>
                                    </div>
                                    <span className="text-sm font-bold text-gray-900">₹{item.pricePerItem * item.quantity}</span>
                                 </div>
                              ))}
                              <div className="flex justify-between items-center pt-3 mt-1">
                                 <span className="text-sm font-bold text-gray-500">Total Paid</span>
                                 <span className="text-lg font-extrabold text-gray-900">₹{activeOrder.totalAmount}</span>
                              </div>
                           </div>
                        </div>

                        {/* RIGHT: DELIVERY PARTNER */}
                        <div className="flex flex-col gap-6">
                           <div className="bg-white rounded-[2rem] p-6 shadow-lg border border-gray-100 flex flex-col items-center text-center">
                              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-4 text-blue-600 shadow-inner">
                                 <Bike size={32} />
                              </div>
                              <h3 className="text-lg font-bold text-gray-900">{isAssigned ? partnerName : "Searching for Rider..."}</h3>
                              <p className="text-sm text-gray-500 mb-4">{isAssigned ? "Your delivery partner is on the way" : "Assigning a partner nearby"}</p>
                              
                              {isAssigned && partnerPhone && (
                                 <a href={`tel:${partnerPhone}`} className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg hover:bg-black transition-all">
                                    <PhoneCall size={16}/> Call Partner
                                 </a>
                              )}
                           </div>

                           <div className="bg-indigo-50 rounded-3xl p-6 border border-indigo-100">
                              <h4 className="font-bold text-indigo-900 mb-2 flex items-center gap-2"><MapPin size={18}/> Delivery Address</h4>
                              <p className="text-sm text-indigo-700/80 leading-relaxed">{activeOrder.address}</p>
                           </div>
                        </div>

                     </div>
                  ) : (
                     <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4"><Clock size={40} className="text-gray-300"/></div>
                        <h3 className="text-xl font-bold text-gray-800">No active orders</h3>
                        <p className="text-gray-500 mb-6">Looks like you haven't ordered anything yet.</p>
                     </div>
                  )}
               </motion.div>
            )}

            {/* ===================== HISTORY TAB ===================== */}
            {tab === "history" && (
               <motion.div
                  key="history"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
               >
                  {history.length > 0 ? history.map(order => {
                     const status = normalizeStatus(order.status);
                     return (
                        <div key={order.orderId} className="group bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                           
                           {/* Card Header */}
                           <div className="flex justify-between items-start mb-4">
                              <div className="flex items-center gap-3">
                                 <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
                                    <ReceiptText size={20}/>
                                 </div>
                                 <div>
                                    <h3 className="font-bold text-gray-900">Tiffino Meal</h3>
                                    <p className="text-xs text-gray-500">{new Date(order.orderDate || order.createdAt).toLocaleDateString()}</p>
                                 </div>
                              </div>
                              <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider ${STATUS_COLORS[status] || "bg-gray-100 text-gray-600"}`}>
                                 {status}
                              </span>
                           </div>

                           {/* Items Summary */}
                           <div className="bg-gray-50 rounded-xl p-3 mb-4 text-sm text-gray-600 space-y-1">
                              {order.items?.slice(0, 2).map((it, i) => (
                                 <div key={i} className="flex justify-between">
                                    <span>{it.mealName} <span className="text-xs text-gray-400">x{it.quantity}</span></span>
                                 </div>
                              ))}
                              {order.items?.length > 2 && <p className="text-xs text-gray-400 font-medium">+{order.items.length - 2} more items</p>}
                           </div>

                           {/* Total & Actions */}
                           <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                              <div className="flex flex-col">
                                 <span className="text-xs font-bold text-gray-400 uppercase">Total</span>
                                 <span className="text-lg font-extrabold text-gray-900">₹{order.totalAmount}</span>
                              </div>
                              <div className="flex gap-2">
                                 <button onClick={() => reorder(order)} className="p-2 rounded-full bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors" title="Reorder">
                                    <Repeat2 size={18}/>
                                 </button>
                                 <button onClick={() => setShowModal(order)} className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-900 hover:text-white transition-colors" title="View Details">
                                    <ChevronRight size={18}/>
                                 </button>
                                 {status === "DELIVERED" && (
                                    <button onClick={() => { setReviewOrder(order); setOpenReview(true); }} className="p-2 rounded-full bg-yellow-50 text-yellow-600 hover:bg-yellow-400 hover:text-white transition-colors" title="Rate">
                                       <Star size={18}/>
                                    </button>
                                 )}
                              </div>
                           </div>
                        </div>
                     )
                  }) : (
                     <div className="col-span-full flex flex-col items-center justify-center min-h-[40vh] text-center">
                        <ShoppingBag className="text-gray-300 w-16 h-16 mb-4"/>
                        <h3 className="text-xl font-bold text-gray-700">No past orders</h3>
                        <p className="text-gray-500">Your order history will appear here.</p>
                     </div>
                  )}
               </motion.div>
            )}
         </AnimatePresence>

         {/* ===================== ORDER DETAILS MODAL ===================== */}
         <AnimatePresence>
            {showModal && (
               <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                  onClick={() => setShowModal(null)}
               >
                  <motion.div 
                     initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                     className="bg-white w-full max-w-md rounded-[2rem] shadow-2xl overflow-hidden"
                     onClick={(e) => e.stopPropagation()}
                  >
                     <div className="bg-gray-900 p-6 text-white flex justify-between items-start">
                        <div>
                           <h2 className="text-2xl font-bold">Order Details</h2>
                           <p className="text-white/60 text-sm">#{showModal.orderId}</p>
                        </div>
                        <button onClick={() => setShowModal(null)} className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition"><X size={20}/></button>
                     </div>
                     
                     <div className="p-6 max-h-[60vh] overflow-y-auto">
                        <div className="space-y-4">
                           {showModal.items?.map((it, i) => (
                              <div key={i} className="flex justify-between items-center border-b border-gray-100 pb-3 last:border-0">
                                 <div>
                                    <p className="font-bold text-gray-800">{it.mealName}</p>
                                    <p className="text-xs text-gray-500">Qty: {it.quantity} &times; ₹{it.pricePerItem}</p>
                                 </div>
                                 <p className="font-bold text-gray-900">₹{it.quantity * it.pricePerItem}</p>
                              </div>
                           ))}
                        </div>
                        
                        <div className="mt-6 bg-gray-50 rounded-xl p-4 space-y-2">
                           {normalizeStatus(showModal.status) === "REJECTED" && (
                              <div className="flex justify-between text-red-600 font-bold text-sm mb-2 border-b border-red-100 pb-2">
                                 <span>Status: Rejected</span>
                                 <span>{showModal.rejectionReason}</span>
                              </div>
                           )}
                           <div className="flex justify-between text-sm">
                              <span className="text-gray-500">Subtotal</span>
                              <span className="font-bold">₹{showModal.totalAmount}</span>
                           </div>
                           <div className="flex justify-between text-lg font-extrabold text-gray-900 pt-2 border-t border-gray-200">
                              <span>Grand Total</span>
                              <span>₹{showModal.totalAmount}</span>
                           </div>
                        </div>
                     </div>
                  </motion.div>
               </motion.div>
            )}
         </AnimatePresence>

         {/* Review Modal */}
         <WriteReview 
            open={openReview} 
            onClose={() => { setOpenReview(false); setReviewOrder(null); }}
            order={reviewOrder}
            user={user}
         />

      </main>
    </div>
  );
}