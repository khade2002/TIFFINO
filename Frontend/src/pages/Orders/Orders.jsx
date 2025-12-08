// import { useEffect, useMemo, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Bike,
//   Clock,
//   CheckCircle2,
//   Package,
//   Utensils,
//   Repeat2,
//   HelpCircle,
//   ReceiptText,
//   PhoneCall,
//   Star,
//   X,
// } from "lucide-react";
// import { useCart } from "../../context/CartContext";
// import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";
// import confetti from "canvas-confetti";

// // --- Order step labels
// const ORDER_STEPS = ["Ordered", "Assigned", "Arrived", "Picked Up", "Delivered"];
// const MAP_CONTAINER_STYLE = { width: "100%", height: "250px", borderRadius: "12px" };
// const CENTER = { lat: 18.5204, lng: 73.8567 }; // Pune default

// export default function Orders() {
//   const { items, totalPrice, clear, addItem } = useCart();

//   const [activeOrder, setActiveOrder] = useState(null);
//   const [progressStep, setProgressStep] = useState(0);
//   const [history, setHistory] = useState([]);
//   const [tab, setTab] = useState("ongoing");
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [showModal, setShowModal] = useState(null);

//   // Place order
//   const handlePlaceOrder = () => {
//     if (!items.length) return;

//     // 🚀 Future: Replace with API call to backend
//     const newOrder = {
//       id: Date.now(),
//       restaurant: "Tiffino Kitchen · Pune",
//       address: "Near Magarpatta, Pune",
//       items: items.map((it) => ({ ...it })),
//       total: totalPrice,
//       placedAt: new Date().toISOString(),
//       etaMin: 28,
//       rider: {
//         name: "Amit Sharma",
//         phone: "+91 98765 43210",
//         rating: 4.8,
//       },
//     };

//     setActiveOrder(newOrder);
//     setProgressStep(0);
//     clear();
//     setTab("ongoing");
//   };

//   // Auto progress simulation
//   useEffect(() => {
//     if (!activeOrder) return;
//     if (progressStep >= ORDER_STEPS.length - 1) return;
//     const t = setTimeout(() => setProgressStep((s) => s + 1), 3500);
//     return () => clearTimeout(t);
//   }, [activeOrder, progressStep]);

//   // Delivered → Move to history + Success popup
//   useEffect(() => {
//     if (!activeOrder) return;
//     if (progressStep === ORDER_STEPS.length - 1) {
//       const done = { ...activeOrder, deliveredAt: new Date().toISOString() };
//       setHistory((h) => [done, ...h]);

//       // Confetti + Thank You
//       confetti({ particleCount: 180, spread: 100 });
//       setShowSuccess(true);

//       const t = setTimeout(() => {
//         setShowSuccess(false);
//         setActiveOrder(null);
//       }, 3000);

//       return () => clearTimeout(t);
//     }
//   }, [progressStep]); // eslint-disable-line

//   const progressPercent = useMemo(
//     () => (progressStep / (ORDER_STEPS.length - 1)) * 100,
//     [progressStep]
//   );

//   const reorder = (order) => {
//     order.items.forEach((it) => addItem(it));
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 px-4 md:px-10 py-6 relative">
//       {/* ✅ Success Toast */}
//       <AnimatePresence>
//         {showSuccess && (
//           <motion.div
//             initial={{ opacity: 0, y: -30 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             className="fixed top-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl shadow-2xl z-50"
//           >
//             🎉 Thank you! Your order was delivered successfully.
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
//         <div>
//           <h1 className="text-2xl md:text-3xl font-bold">Your Orders</h1>
//           <p className="text-gray-600">Track ongoing deliveries & reorder favorites</p>
//         </div>
//         <div className="flex gap-2">
//           <button
//             onClick={() => setTab("ongoing")}
//             className={`px-4 py-2 rounded-xl border transition ${
//               tab === "ongoing" ? "bg-black text-white" : "bg-white hover:bg-gray-100"
//             }`}
//           >
//             Ongoing
//           </button>
//           <button
//             onClick={() => setTab("history")}
//             className={`px-4 py-2 rounded-xl border transition ${
//               tab === "history" ? "bg-black text-white" : "bg-white hover:bg-gray-100"
//             }`}
//           >
//             Past Orders
//           </button>
//         </div>
//       </div>

//       {/* If cart has items and no active order, show place-order card */}
//       {!activeOrder && tab === "ongoing" && (
//         <motion.div
//           initial={{ opacity: 0, y: 16 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="mb-6"
//         >
//           <div className="bg-white rounded-2xl border shadow-md hover:shadow-lg transition p-4 md:p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//             <div className="flex items-center gap-3">
//               <Package />
//               <div>
//                 <p className="font-semibold">Ready to place your order?</p>
//                 <p className="text-sm text-gray-600">
//                   Add items to cart and confirm to start live tracking.
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-center gap-3">
//               <div className="text-sm text-gray-600">
//                 Items in Cart: <span className="font-semibold">{items.length}</span>
//                 <span className="mx-2 text-gray-300">•</span>
//                 Total: <span className="font-semibold">₹{totalPrice}</span>
//               </div>
//               <button
//                 onClick={handlePlaceOrder}
//                 disabled={!items.length}
//                 className={`px-4 py-2 rounded-xl font-semibold transition ${
//                   items.length
//                     ? "bg-primary text-white hover:opacity-90"
//                     : "bg-gray-200 text-gray-500 cursor-not-allowed"
//                 }`}
//               >
//                 Place Order
//               </button>
//             </div>
//           </div>
//         </motion.div>
//       )}

//       {/* Ongoing Order */}
//       {tab === "ongoing" && activeOrder && (
//         <div className="grid lg:grid-cols-3 gap-6">
//           {/* Left: Tracking Card */}
//           <motion.div
//             initial={{ opacity: 0, y: 16 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="lg:col-span-2 bg-white rounded-2xl border shadow-md hover:shadow-lg transition p-5"
//           >
//             <div className="flex items-center justify-between mb-4">
//               <div className="flex items-center gap-3">
//                 <Utensils />
//                 <div>
//                   <p className="font-semibold">{activeOrder.restaurant}</p>
//                   <p className="text-sm text-gray-600">{activeOrder.address}</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-2 text-sm">
//                 <Clock className="w-4 h-4" />
//                 <span>ETA ~ {activeOrder.etaMin} mins</span>
//               </div>
//             </div>

//             {/* Progress line */}
//             <div className="relative mt-6 mb-8">
//               <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-gray-200 rounded" />
//               <motion.div
//                 className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-green-500 rounded"
//                 initial={{ width: 0 }}
//                 animate={{ width: `${progressPercent}%` }}
//                 transition={{ duration: 0.5 }}
//               />
//               <div className="relative z-10 grid grid-cols-5">
//                 {ORDER_STEPS.map((label, idx) => (
//                   <div key={label} className="flex flex-col items-center">
//                     <div
//                       className={`w-9 h-9 rounded-full border-2 flex items-center justify-center transition ${
//                         idx <= progressStep
//                           ? "bg-green-500 border-green-500 text-white"
//                           : "bg-white border-gray-300 text-gray-400"
//                       }`}
//                     >
//                       {idx <= progressStep ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
//                     </div>
//                     <p className="mt-2 text-xs font-medium text-center">{label}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Items summary */}
//             <div className="space-y-3">
//               {activeOrder.items.map((it) => (
//                 <div
//                   key={it.id}
//                   className="flex items-center justify-between border rounded-xl px-3 py-2 hover:bg-gray-50 transition"
//                 >
//                   <div className="flex items-center gap-3">
//                     <div className={`w-2 h-2 rounded-full ${it.veg ? "bg-green-600" : "bg-red-600"}`} />
//                     <p className="font-medium">{it.name}</p>
//                   </div>
//                   <p className="font-semibold">
//                     ₹{it.price} × {it.qty ?? 1}
//                   </p>
//                 </div>
//               ))}
//               <div className="flex items-center justify-between pt-2">
//                 <p className="text-gray-600">Total</p>
//                 <p className="text-lg font-bold">₹{activeOrder.total}</p>
//               </div>
//             </div>

//             {/* Actions */}
//             <div className="mt-5 flex flex-wrap gap-3">
//               <button className="px-4 py-2 rounded-xl border hover:bg-gray-50 flex items-center gap-2">
//                 <HelpCircle className="w-4 h-4" /> Help
//               </button>
//               <button className="px-4 py-2 rounded-xl border hover:bg-gray-50 flex items-center gap-2">
//                 <ReceiptText className="w-4 h-4" /> View Invoice
//               </button>
//             </div>
//           </motion.div>

//           {/* Right: Rider + Map */}
//           <motion.div
//             initial={{ opacity: 0, y: 16 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="bg-white/70 backdrop-blur-lg rounded-2xl border shadow-lg p-5"
//           >
//             <div className="flex items-center justify-between mb-3">
//               <p className="font-semibold">Delivery Partner</p>
//             </div>
//             <div className="flex items-center gap-3 mb-4">
//               <Bike className="w-8 h-8 text-green-600" />
//               <div>
//                 <p className="font-medium">{activeOrder.rider.name}</p>
//                 <div className="flex items-center text-sm text-gray-600 gap-2">
//                   <PhoneCall className="w-3 h-3" /> {activeOrder.rider.phone}
//                 </div>
//                 <div className="flex items-center text-sm text-yellow-600 gap-1">
//                   <Star className="w-4 h-4 fill-yellow-500" /> {activeOrder.rider.rating}
//                 </div>
//               </div>
//             </div>
//             <div className="mb-2 font-semibold">Live Location</div>
//             <div className="rounded-xl border overflow-hidden">
//               {/* 🚀 Future: Replace with API-powered live rider coordinates */}
//               <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
//                 <GoogleMap mapContainerStyle={MAP_CONTAINER_STYLE} center={CENTER} zoom={13}>
//                   <Marker position={CENTER} />
//                 </GoogleMap>
//               </LoadScript>
//             </div>
//           </motion.div>
//         </div>
//       )}

//       {/* Past Orders */}
//       {tab === "history" && (
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
//           {history.length === 0 ? (
//             <p className="text-gray-500">No past orders yet.</p>
//           ) : (
//             history.map((o) => (
//               <motion.div
//                 key={o.id}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 whileHover={{ scale: 1.02 }}
//                 className="bg-white rounded-2xl border shadow-md p-4 transition"
//               >
//                 <div className="flex items-center justify-between">
//                   <p className="font-semibold">{o.restaurant}</p>
//                   <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700">
//                     Delivered
//                   </span>
//                 </div>
//                 <p className="text-sm text-gray-600 mt-0.5">
//                   {new Date(o.placedAt).toLocaleString()}
//                 </p>
//                 <div className="mt-3 space-y-1">
//                   {o.items.slice(0, 3).map((it) => (
//                     <p key={it.id} className="text-sm text-gray-700">
//                       {it.name} {it.qty ? `× ${it.qty}` : ""}
//                     </p>
//                   ))}
//                   {o.items.length > 3 && (
//                     <p className="text-xs text-gray-500">+ {o.items.length - 3} more</p>
//                   )}
//                 </div>
//                 <div className="mt-3 flex items-center justify-between">
//                   <p className="font-semibold">₹{o.total}</p>
//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => reorder(o)}
//                       className="px-3 py-1.5 rounded-xl border hover:bg-gray-50 text-sm flex items-center gap-1"
//                     >
//                       <Repeat2 className="w-4 h-4" /> Reorder
//                     </button>
//                     <button
//                       onClick={() => setShowModal(o)}
//                       className="px-3 py-1.5 rounded-xl border hover:bg-gray-50 text-sm"
//                     >
//                       Details
//                     </button>
//                   </div>
//                 </div>
//               </motion.div>
//             ))
//           )}
//         </div>
//       )}

//       {/* 🔥 Order Details Modal */}
//       <AnimatePresence>
//         {showModal && (
//           <motion.div
//             className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl relative"
//             >
//               <button
//                 onClick={() => setShowModal(null)}
//                 className="absolute top-3 right-3 text-gray-500 hover:text-black"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//               <h2 className="text-xl font-bold mb-2">{showModal.restaurant}</h2>
//               <p className="text-sm text-gray-600 mb-4">
//                 Ordered on {new Date(showModal.placedAt).toLocaleString()}
//               </p>
//               <div className="space-y-2 max-h-60 overflow-y-auto">
//                 {showModal.items.map((it) => (
//                   <div
//                     key={it.id}
//                     className="flex justify-between border-b pb-1 text-sm"
//                   >
//                     <span>{it.name}</span>
//                     <span>
//                       ₹{it.price} × {it.qty ?? 1}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//               <div className="mt-4 flex justify-between font-semibold">
//                 <span>Total</span>
//                 <span>₹{showModal.total}</span>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }



// // src/pages/Orders/Orders.jsx
// import { useEffect, useMemo, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Clock,
//   CheckCircle2,
//   Truck,
//   Package,
//   Repeat2,
//   HelpCircle,
//   ReceiptText,
//   PhoneCall,
//   Star,
//   MapPin,
//   X,
// } from "lucide-react";
// import confetti from "canvas-confetti";
// import toast from "react-hot-toast";

// import { useCart } from "../../context/CartContext";
// import { useAuth } from "../../context/AuthContext";
// import { getOrdersByUser, getOrderDelivery } from "../../api/api";

// // Order progress steps and mapping to backend statuses
// const ORDER_STEPS = [
//   { key: "PLACED", label: "Ordered" },
//   { key: "CONFIRMED", label: "Confirmed" },
//   { key: "ASSIGNED", label: "Assigned" },
//   { key: "PICKED_UP", label: "Picked Up" },
//   { key: "DELIVERED", label: "Delivered" },
// ];

// function statusToStepIndex(status) {
//   if (!status) return 0;
//   const s = String(status).toUpperCase();
//   const idx = ORDER_STEPS.findIndex((st) => st.key === s);
//   if (idx !== -1) return idx;
//   if (s.includes("CONFIR")) return 1;
//   if (s.includes("ASSIGN")) return 2;
//   if (s.includes("PICK")) return 3;
//   if (s.includes("DELIV")) return 4;
//   return 0;
// }

// export default function Orders() {
//   const { addItem } = useCart();
//   const { user } = useAuth();

//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [tab, setTab] = useState("ongoing");
//   const [selected, setSelected] = useState(null);
//   const [deliveryInfo, setDeliveryInfo] = useState({});
//   const [fetchingDelivery, setFetchingDelivery] = useState({}); // keyed by orderId
//   const [refreshKey, setRefreshKey] = useState(0); // to refetch when needed

//   useEffect(() => {
//     const load = async () => {
//       setLoading(true);
//       setOrders([]);
//       if (!user?.email) {
//         setLoading(false);
//         return;
//       }

//       try {
//         // encode email for path param (handles @)
//         const res = await getOrdersByUser(encodeURIComponent(user.email));
//         const data = Array.isArray(res.data) ? res.data : [];
//         // partition ongoing vs past
//         const ongoing = data.filter(
//           (o) => {
//             const s = (o.status || "").toString().toUpperCase();
//             return !s.includes("DELIVERED") && !s.includes("CANCEL");
//           }
//         );
//         const past = data.filter((o) => {
//           const s = (o.status || "").toString().toUpperCase();
//           return s.includes("DELIVERED") || s.includes("CANCEL");
//         });

//         const sortByDateDesc = (arr) =>
//           arr.sort((a, b) => {
//             const da = new Date(a.orderDate || a.placedAt || 0).getTime();
//             const db = new Date(b.orderDate || b.placedAt || 0).getTime();
//             return db - da;
//           });

//         const merged = [...sortByDateDesc(ongoing), ...sortByDateDesc(past)];
//         setOrders(merged);
//       } catch (err) {
//         console.error("load orders:", err);
//         // If gateway -> 404, show helpful toast and empty list (frontend-only fallback)
//         const status = err?.response?.status;
//         if (status === 404) {
//           toast.error("No orders endpoint found (404). Backend route might be missing.");
//         } else {
//           toast.error("Failed to load orders. Please try again.");
//         }
//         setOrders([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     load();
//     // re-run on refreshKey
//   }, [user?.email, refreshKey]);

//   const ongoingOrders = orders.filter((o) => {
//     const st = (o.status || "").toUpperCase();
//     return !st.includes("DELIVERED") && !st.includes("CANCEL");
//   });
//   const pastOrders = orders.filter((o) => {
//     const st = (o.status || "").toUpperCase();
//     return st.includes("DELIVERED") || st.includes("CANCEL");
//   });

//   // fetch delivery partner details lazily
//   const loadDelivery = async (orderId) => {
//     if (!orderId) return;
//     if (deliveryInfo[orderId]) return; // already loaded
//     try {
//       setFetchingDelivery((s) => ({ ...s, [orderId]: true }));
//       const res = await getOrderDelivery(orderId);
//       setDeliveryInfo((d) => ({ ...d, [orderId]: res.data || {} }));
//     } catch (err) {
//       console.error("delivery info load:", err);
//       setDeliveryInfo((d) => ({
//         ...d,
//         [orderId]: { deliveryPartnerName: "Not Assigned", deliveryPartnerPhone: "N/A" },
//       }));
//       toast.error("Failed to fetch delivery details");
//     } finally {
//       setFetchingDelivery((s) => ({ ...s, [orderId]: false }));
//     }
//   };

//   const handleReorder = (order) => {
//     if (!order?.items || order.items.length === 0) {
//       toast.error("Nothing to reorder");
//       return;
//     }
//     order.items.forEach((it) => {
//       const dishLike = {
//         id: `${it.mealName}-${Math.random().toString(36).slice(2, 7)}`,
//         name: it.mealName || it.productName || it.name,
//         price: Number(it.pricePerItem || it.price || 0),
//         image: "", // optional
//       };
//       // Add as many times as quantity
//       const qty = it.quantity || it.qty || 1;
//       for (let i = 0; i < qty; i++) addItem(dishLike);
//     });
//     toast.success("Items added to cart");
//   };

//   const celebrate = () => {
//     confetti({ particleCount: 120, spread: 100 });
//   };

//   // UI states
//   if (loading) {
//     return (
//       <div className="min-h-[70vh] flex items-center justify-center">
//         <div className="animate-pulse text-gray-500">Loading your orders...</div>
//       </div>
//     );
//   }

//   if (!orders || orders.length === 0) {
//     return (
//       <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 px-4">
//         <div className="text-3xl font-bold">No orders yet</div>
//         <p className="text-gray-600 max-w-lg text-center">
//           Jab aap order karenge tab yaha dikhega. Abhi ke liye khaana explore karo aur order place karo 🍛
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen px-4 md:px-10 py-6 bg-gradient-to-b from-white to-gray-50">
//       <div className="max-w-6xl mx-auto">
//         <div className="flex items-center justify-between mb-6">
//           <div>
//             <h1 className="text-2xl md:text-3xl font-bold">Your Orders</h1>
//             <p className="text-gray-600">Track deliveries, view details & reorder favourites</p>
//           </div>

//           <div className="flex gap-2">
//             <button
//               onClick={() => setTab("ongoing")}
//               className={`px-4 py-2 rounded-xl transition font-semibold ${tab === "ongoing" ? "bg-black text-white shadow-lg" : "bg-white border"}`}
//             >
//               Ongoing ({ongoingOrders.length})
//             </button>
//             <button
//               onClick={() => setTab("past")}
//               className={`px-4 py-2 rounded-xl transition font-semibold ${tab === "past" ? "bg-black text-white shadow-lg" : "bg-white border"}`}
//             >
//               Past ({pastOrders.length})
//             </button>
//             <button
//               onClick={() => setRefreshKey((k) => k + 1)}
//               className="px-3 py-2 rounded-xl border ml-2 text-sm"
//             >
//               Refresh
//             </button>
//           </div>
//         </div>

//         <div className="space-y-4">
//           {(tab === "ongoing" ? ongoingOrders : pastOrders).map((order) => {
//             const stepIdx = statusToStepIndex(order.status);
//             const progressPct = Math.round((stepIdx / (ORDER_STEPS.length - 1)) * 100);

//             return (
//               <motion.div
//                 key={order.orderId ?? order.id}
//                 initial={{ opacity: 0, y: 6 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="bg-white rounded-2xl border p-4 md:p-5 shadow-sm hover:shadow-md transition flex flex-col md:flex-row gap-4"
//               >
//                 <div className="flex-1">
//                   <div className="flex items-start justify-between gap-3">
//                     <div>
//                       <p className="font-semibold text-lg">{order.restaurantName || "Tiffino Kitchen"}</p>
//                       <p className="text-sm text-gray-600">{order.address || order.notes || "Delivery address"}</p>
//                       <p className="text-xs text-gray-500 mt-1">Order ID: <span className="font-mono text-xs">{order.orderId}</span></p>
//                     </div>

//                     <div className="text-right">
//                       <p className="font-semibold">₹{order.totalAmount ?? order.total ?? 0}</p>
//                       <p className="text-xs text-gray-500">{new Date(order.orderDate || order.placedAt || 0).toLocaleString()}</p>
//                     </div>
//                   </div>

//                   {/* progress bar */}
//                   <div className="mt-4">
//                     <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
//                       <motion.div
//                         initial={{ width: 0 }}
//                         animate={{ width: `${progressPct}%` }}
//                         transition={{ duration: 0.6 }}
//                         className="h-2 bg-emerald-600"
//                       />
//                     </div>

//                     <div className="mt-3 grid grid-cols-5 gap-2 text-xs">
//                       {ORDER_STEPS.map((s, idx) => {
//                         const done = idx <= stepIdx;
//                         return (
//                           <div key={s.key} className="flex flex-col items-center">
//                             <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${done ? "bg-emerald-600 text-white border-emerald-600" : "bg-white text-gray-400 border-gray-200"}`}>
//                               {done ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
//                             </div>
//                             <div className="mt-1 text-[11px] text-center text-gray-600">{s.label}</div>
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>

//                   {/* items preview */}
//                   <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
//                     <div className="space-y-1">
//                       {(order.items || []).slice(0, 3).map((it, i) => (
//                         <div key={i} className="flex items-center justify-between text-sm">
//                           <div className="flex items-center gap-2">
//                             <div className={`w-2 h-2 rounded-full ${it.veg ? "bg-green-600" : "bg-red-600"}`} />
//                             <div>{it.mealName || it.productName || it.name}</div>
//                           </div>
//                           <div className="text-sm text-gray-700">₹{(it.pricePerItem || it.price || 0) * (it.quantity || it.qty || 1)}</div>
//                         </div>
//                       ))}
//                       {order.items && order.items.length > 3 && <div className="text-xs text-gray-500">+{order.items.length - 3} more</div>}
//                     </div>

//                     <div className="text-right">
//                       <div className="text-xs text-gray-500">Delivery ETA</div>
//                       <div className="font-semibold">{order.etaMin ? `${order.etaMin} mins` : `—`}</div>

//                       <div className="mt-3 flex gap-2 justify-end">
//                         <button
//                           onClick={async () => {
//                             setSelected(order);
//                             await loadDelivery(order.orderId ?? order.id);
//                           }}
//                           className="px-3 py-1 rounded-lg border text-sm flex items-center gap-2"
//                         >
//                           <Truck className="w-4 h-4" /> Track
//                         </button>

//                         <button
//                           onClick={() => handleReorder(order)}
//                           className="px-3 py-1 rounded-lg border text-sm flex items-center gap-2"
//                         >
//                           <Repeat2 className="w-4 h-4" /> Reorder
//                         </button>

//                         <button
//                           onClick={() => toast(`Order status: ${order.status || "—"}`, { icon: "📦" })}
//                           className="px-3 py-1 rounded-lg border text-sm flex items-center gap-2"
//                         >
//                           <ReceiptText className="w-4 h-4" /> Invoice
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* right column: static map + delivery partner */}
//                 <div className="w-full md:w-64 flex-shrink-0">
//                   <div className="bg-gray-50 rounded-lg p-3 border h-full flex flex-col justify-between">
//                     <div className="rounded-md overflow-hidden border">
//                       <div className="w-full h-36 bg-gradient-to-br from-gray-100 to-white flex items-center justify-center text-sm text-gray-400">
//                         <svg width="120" height="80" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
//                           <rect x="0" y="0" width="120" height="80" rx="6" fill="#f8fafc"/>
//                           <g fill="#eab9b9">
//                             <circle cx="55" cy="32" r="6"/>
//                             <rect x="8" y="14" width="26" height="6" rx="2"/>
//                             <rect x="82" y="40" width="28" height="6" rx="2"/>
//                           </g>
//                           <text x="60" y="70" fontSize="8" textAnchor="middle" fill="#9CA3AF">Static map preview</text>
//                         </svg>
//                       </div>
//                     </div>

//                     <div className="mt-3 text-sm">
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-2">
//                           <PhoneCall className="w-4 h-4 text-gray-600" />
//                           <div>
//                             <div className="text-xs text-gray-500">Delivery Partner</div>
//                             <div className="font-semibold text-sm">
//                               {deliveryInfo[order.orderId]?.deliveryPartnerName || "Not Assigned"}
//                             </div>
//                             <div className="text-xs text-gray-600">
//                               {deliveryInfo[order.orderId]?.deliveryPartnerPhone || "—"}
//                             </div>
//                           </div>
//                         </div>

//                         <div>
//                           <div className="text-xs text-gray-500">Status</div>
//                           <div className="text-xs font-semibold">{order.status || "—"}</div>
//                         </div>
//                       </div>

//                       <div className="mt-3 flex gap-2">
//                         <button
//                           onClick={() => {
//                             // show modal + ensure delivery info loaded
//                             setSelected(order);
//                             if (!deliveryInfo[order.orderId]) loadDelivery(order.orderId);
//                           }}
//                           className="flex-1 px-3 py-2 rounded-lg bg-white border text-sm"
//                         >
//                           Details
//                         </button>
//                         <button
//                           onClick={() => {
//                             celebrate();
//                           }}
//                           className="px-3 py-2 rounded-lg bg-emerald-600 text-white text-sm"
//                         >
//                           Done
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             );
//           })}
//         </div>

//         {/* DETAILS MODAL */}
//         <AnimatePresence>
//           {selected && (
//             <motion.div
//               key="order-modal"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
//             >
//               <motion.div initial={{ y: 20 }} animate={{ y: 0 }} exit={{ y: 20 }} className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative">
//                 <button onClick={() => setSelected(null)} className="absolute top-4 right-4 text-gray-500">
//                   <X className="w-5 h-5" />
//                 </button>

//                 <div className="flex items-start gap-4">
//                   <div className="flex-1">
//                     <h3 className="text-xl font-bold mb-1">Order #{selected.orderId}</h3>
//                     <p className="text-sm text-gray-600 mb-3">{selected.address}</p>

//                     <div className="space-y-2">
//                       {(selected.items || []).map((it, idx) => (
//                         <div key={idx} className="flex items-center justify-between">
//                           <div>
//                             <div className="font-medium">{it.mealName || it.productName || it.name}</div>
//                             <div className="text-xs text-gray-500">Qty: {it.quantity || it.qty || 1}</div>
//                           </div>
//                           <div className="font-semibold">₹{(it.pricePerItem || it.price || 0) * (it.quantity || it.qty || 1)}</div>
//                         </div>
//                       ))}
//                     </div>

//                     <div className="mt-4 flex items-center justify-between">
//                       <div className="text-sm text-gray-600">Payment</div>
//                       <div className="font-semibold">COD</div>
//                     </div>

//                     <div className="mt-3 flex items-center justify-between">
//                       <div className="text-sm text-gray-600">Total</div>
//                       <div className="text-lg font-bold">₹{selected.totalAmount ?? selected.total ?? 0}</div>
//                     </div>
//                   </div>

//                   <div className="w-56">
//                     <div className="bg-gray-50 rounded-lg p-3 text-sm">
//                       <div className="font-semibold mb-2">Delivery Partner</div>
//                       <div className="text-sm text-gray-700">{deliveryInfo[selected.orderId]?.deliveryPartnerName || "Not Assigned"}</div>
//                       <div className="text-xs text-gray-500">{deliveryInfo[selected.orderId]?.deliveryPartnerPhone || "—"}</div>

//                       <div className="mt-4">
//                         <button
//                           className="w-full px-3 py-2 rounded-lg bg-black text-white"
//                           onClick={() => {
//                             loadDelivery(selected.orderId);
//                             toast.success("Refreshing delivery details...");
//                           }}
//                         >
//                           Refresh
//                         </button>

//                         <button
//                           className="w-full mt-2 px-3 py-2 rounded-lg border"
//                           onClick={() => {
//                             handleReorder(selected);
//                             setSelected(null);
//                           }}
//                         >
//                           Reorder
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }



// // src/pages/Orders/Orders.jsx
// import { useEffect, useMemo, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Bike,
//   Clock,
//   CheckCircle2,
//   Package,
//   Utensils,
//   Repeat2,
//   HelpCircle,
//   ReceiptText,
//   PhoneCall,
//   Star,
//   X,
// } from "lucide-react";
// import { useCart } from "../../context/CartContext";
// import { useAuth } from "../../context/AuthContext";
// import WriteReview from "../Review/WriteReview";
// import API from "../../api/api";
// import toast from "react-hot-toast";
// import confetti from "canvas-confetti";

// /**
//  * Final Orders page
//  * - Uses gateway path: /usr/orders/checkout
//  * - Maps cart items -> backend payload correctly
//  * - Builds activeOrder for UI using cart's foodId/foodName
//  * - Saves localStorage deliveredOrder for review popup
//  */

// const ORDER_STEPS = ["PLACED", "CONFIRMED", "ASSIGNED", "PICKED_UP", "DELIVERED"];

// export default function Orders() {
//   const { items, totalPrice, clear, addItem } = useCart();
//   const { user } = useAuth();

//   const [activeOrder, setActiveOrder] = useState(null);
//   const [progressStep, setProgressStep] = useState(0);
//   const [history, setHistory] = useState([]);
//   const [tab, setTab] = useState("ongoing");
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [showModal, setShowModal] = useState(null);
//   const [openReview, setOpenReview] = useState(false);
//   const [placing, setPlacing] = useState(false);

//   // Helper: build backend payload items
//   const mapItemsForBackend = (cartItems) =>
//     cartItems.map((it) => ({
//       mealName: it.foodName,
//       quantity: it.quantity,
//       pricePerItem: it.price,
//       customizations: "none",
//     }));

//   // Helper: build UI-friendly order items from cart
//   const mapItemsForUI = (cartItems) =>
//     cartItems.map((it) => ({
//       id: it.id,
//       foodId: it.foodId,
//       foodName: it.foodName,
//       price: it.price,
//       quantity: it.quantity,
//       veg: it.veg ?? false,
//     }));

//   // Place order -> call gateway /usr/orders/checkout
//   const handlePlaceOrder = async () => {
//     if (!items.length) {
//       toast.error("Cart is empty.");
//       return;
//     }

//     setPlacing(true);

//     const payload = {
//       userId: user?.id,
//       address: user?.address || "Pune",
//       orderType: "ONE_TIME",
//       totalAmount: totalPrice,
//       status: "PLACED",
//       items: mapItemsForBackend(items),
//     };

//     try {
//       const res = await API.post("/usr/orders/checkout", payload);
//       const data = res.data;

//       // Build activeOrder for UI (we rely on cart to show item details)
//       setActiveOrder({
//         id: data.orderId,
//         restaurant: "Tiffino Kitchen",
//         address: payload.address,
//         items: mapItemsForUI(items),
//         total: totalPrice,
//         etaMin: 28,
//         rider: {
//           name: "Delivery Partner",
//           phone: "+919876543210",
//           rating: 4.7,
//         },
//         placedAt: new Date().toISOString(),
//       });

//       setProgressStep(0);
//       clear();
//       setTab("ongoing");
//       toast.success("Order placed successfully!");
//     } catch (err) {
//       console.error("Place order error:", err);
//       const msg =
//         err?.response?.data?.message || err?.response?.data || err.message || "Failed to place order";
//       toast.error(msg);
//     } finally {
//       setPlacing(false);
//     }
//   };

//   // Simulate progress on client side
//   useEffect(() => {
//     if (!activeOrder) return;
//     if (progressStep >= ORDER_STEPS.length - 1) return;

//     const timer = setTimeout(() => setProgressStep((s) => s + 1), 3500);
//     return () => clearTimeout(timer);
//   }, [activeOrder, progressStep]);

//   // When reached DELIVERED
//   useEffect(() => {
//     if (!activeOrder) return;

//     if (progressStep === ORDER_STEPS.length - 1) {
//       const done = { ...activeOrder, deliveredAt: new Date().toISOString() };
//       setHistory((h) => [done, ...h]);

//       confetti({ particleCount: 150, spread: 80 });
//       setShowSuccess(true);

//       // Save delivered order info in localStorage for review popup
//       try {
//         localStorage.setItem(
//           "deliveredOrder",
//           JSON.stringify({
//             orderId: done.id,
//             userId: user?.id,
//             mealId: done.items[0]?.foodId ?? null,
//           })
//         );
//         // open review after short delay
//         setTimeout(() => setOpenReview(true), 900);
//       } catch (e) {
//         console.warn("Could not save deliveredOrder to localStorage", e);
//       }

//       const clearTimer = setTimeout(() => {
//         setShowSuccess(false);
//         setActiveOrder(null);
//       }, 3000);

//       return () => clearTimeout(clearTimer);
//     }
//   }, [progressStep, activeOrder, user?.id]);

//   // Auto-open review if saved in localStorage (persist across reload)
//   useEffect(() => {
//     try {
//       const saved = localStorage.getItem("deliveredOrder");
//       if (saved) setOpenReview(true);
//     } catch (e) {
//       /* ignore */
//     }
//   }, []);

//   const progressPercent = useMemo(
//     () => (progressStep / (ORDER_STEPS.length - 1)) * 100,
//     [progressStep]
//   );

//   const reorder = (order) => {
//     order.items.forEach((it) =>
//       addItem({
//         id: it.id,
//         foodId: it.foodId,
//         foodName: it.foodName,
//         price: it.price,
//         quantity: it.quantity,
//       })
//     );
//     setTab("ongoing");
//     toast.success("Items added to cart");
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 px-4 md:px-10 py-6 relative">
//       {/* Success toast bar */}
//       <AnimatePresence>
//         {showSuccess && (
//           <motion.div
//             initial={{ opacity: 0, y: -30 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             className="fixed top-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl shadow-2xl z-50"
//           >
//             🎉 Thank you! Your order was delivered successfully.
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
//         <div>
//           <h1 className="text-2xl md:text-3xl font-bold">Your Orders</h1>
//           <p className="text-gray-600">Track ongoing deliveries & reorder favorites</p>
//         </div>
//         <div className="flex gap-2">
//           <button
//             onClick={() => setTab("ongoing")}
//             className={`px-4 py-2 rounded-xl border transition ${
//               tab === "ongoing" ? "bg-black text-white" : "bg-white hover:bg-gray-100"
//             }`}
//           >
//             Ongoing
//           </button>
//           <button
//             onClick={() => setTab("history")}
//             className={`px-4 py-2 rounded-xl border transition ${
//               tab === "history" ? "bg-black text-white" : "bg-white hover:bg-gray-100"
//             }`}
//           >
//             Past Orders
//           </button>
//         </div>
//       </div>

//       {/* Place Order Card */}
//       {!activeOrder && tab === "ongoing" && (
//         <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
//           <div className="bg-white rounded-2xl border shadow-md hover:shadow-lg transition p-4 md:p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//             <div className="flex items-center gap-3">
//               <Package />
//               <div>
//                 <p className="font-semibold">Ready to place your order?</p>
//                 <p className="text-sm text-gray-600">Add items to cart and confirm to start live tracking.</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-3">
//               <div className="text-sm text-gray-600">
//                 Items in Cart: <span className="font-semibold">{items.length}</span>
//                 <span className="mx-2 text-gray-300">•</span>
//                 Total: <span className="font-semibold">₹{totalPrice}</span>
//               </div>
//               <button
//                 onClick={handlePlaceOrder}
//                 disabled={!items.length || placing}
//                 className={`px-4 py-2 rounded-xl font-semibold transition ${
//                   items.length
//                     ? "bg-primary text-white hover:opacity-90"
//                     : "bg-gray-200 text-gray-500 cursor-not-allowed"
//                 }`}
//               >
//                 {placing ? "Placing..." : "Place Order"}
//               </button>
//             </div>
//           </div>
//         </motion.div>
//       )}

//       {/* Ongoing Order */}
//       {tab === "ongoing" && activeOrder && (
//         <div className="grid lg:grid-cols-3 gap-6">
//           {/* Left: Tracking Card */}
//           <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2 bg-white rounded-2xl border shadow-md hover:shadow-lg transition p-5">
//             <div className="flex items-center justify-between mb-4">
//               <div className="flex items-center gap-3">
//                 <Utensils />
//                 <div>
//                   <p className="font-semibold">{activeOrder.restaurant}</p>
//                   <p className="text-sm text-gray-600">{activeOrder.address}</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-2 text-sm">
//                 <Clock className="w-4 h-4" />
//                 <span>ETA ~ {activeOrder.etaMin} mins</span>
//               </div>
//             </div>

//             {/* Progress line */}
//             <div className="relative mt-6 mb-8">
//               <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-gray-200 rounded" />
//               <motion.div
//                 className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-green-500 rounded"
//                 initial={{ width: 0 }}
//                 animate={{ width: `${progressPercent}%` }}
//                 transition={{ duration: 0.5 }}
//               />
//               <div className="relative z-10 grid grid-cols-5">
//                 {ORDER_STEPS.map((label, idx) => (
//                   <div key={label} className="flex flex-col items-center">
//                     <div
//                       className={`w-9 h-9 rounded-full border-2 flex items-center justify-center transition ${
//                         idx <= progressStep ? "bg-green-500 border-green-500 text-white" : "bg-white border-gray-300 text-gray-400"
//                       }`}
//                     >
//                       {idx <= progressStep ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
//                     </div>
//                     <p className="mt-2 text-xs font-medium text-center">{label}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Items summary */}
//             <div className="space-y-3">
//               {activeOrder.items.map((it) => (
//                 <div key={it.id} className="flex items-center justify-between border rounded-xl px-3 py-2 hover:bg-gray-50 transition">
//                   <div className="flex items-center gap-3">
//                     <div className={`w-2 h-2 rounded-full ${it.veg ? "bg-green-600" : "bg-red-600"}`} />
//                     <p className="font-medium">{it.foodName}</p>
//                   </div>
//                   <p className="font-semibold">₹{it.price} × {it.quantity ?? 1}</p>
//                 </div>
//               ))}
//               <div className="flex items-center justify-between pt-2">
//                 <p className="text-gray-600">Total</p>
//                 <p className="text-lg font-bold">₹{activeOrder.total}</p>
//               </div>
//             </div>

//             {/* Actions */}
//             <div className="mt-5 flex flex-wrap gap-3">
//               <button className="px-4 py-2 rounded-xl border hover:bg-gray-50 flex items-center gap-2">
//                 <HelpCircle className="w-4 h-4" /> Help
//               </button>
//               <button className="px-4 py-2 rounded-xl border hover:bg-gray-50 flex items-center gap-2">
//                 <ReceiptText className="w-4 h-4" /> View Invoice
//               </button>
//             </div>
//           </motion.div>

//           {/* Right: Rider */}
//           <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="bg-white/70 backdrop-blur-lg rounded-2xl border shadow-lg p-5">
//             <div className="flex items-center justify-between mb-3">
//               <p className="font-semibold">Delivery Partner</p>
//             </div>
//             <div className="flex items-center gap-3 mb-4">
//               <Bike className="w-8 h-8 text-green-600" />
//               <div>
//                 <p className="font-medium">{activeOrder.rider.name}</p>
//                 <div className="flex items-center text-sm text-gray-600 gap-2">
//                   <PhoneCall className="w-3 h-3" /> {activeOrder.rider.phone}
//                 </div>
//                 <div className="flex items-center text-sm text-yellow-600 gap-1">
//                   <Star className="w-4 h-4 fill-yellow-500" /> {activeOrder.rider.rating}
//                 </div>
//               </div>
//             </div>
//             <div className="mb-2 font-semibold">Live Location</div>
//             <div className="rounded-xl border overflow-hidden p-4 text-center text-sm text-gray-500">
//               Live location placeholder (replace with map when ready)
//             </div>
//           </motion.div>
//         </div>
//       )}

//       {/* Past Orders */}
//       {tab === "history" && (
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
//           {history.length === 0 ? (
//             <p className="text-gray-500">No past orders yet.</p>
//           ) : (
//             history.map((o) => (
//               <motion.div key={o.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} whileHover={{ scale: 1.02 }} className="bg-white rounded-2xl border shadow-md p-4 transition">
//                 <div className="flex items-center justify-between">
//                   <p className="font-semibold">{o.restaurant}</p>
//                   <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700">Delivered</span>
//                 </div>
//                 <p className="text-sm text-gray-600 mt-0.5">{new Date(o.placedAt || o.deliveredAt).toLocaleString()}</p>
//                 <div className="mt-3 space-y-1">
//                   {o.items.slice(0, 3).map((it) => (
//                     <p key={it.id} className="text-sm text-gray-700">{it.foodName} {it.quantity ? `× ${it.quantity}` : ""}</p>
//                   ))}
//                   {o.items.length > 3 && <p className="text-xs text-gray-500">+ {o.items.length - 3} more</p>}
//                 </div>
//                 <div className="mt-3 flex items-center justify-between">
//                   <p className="font-semibold">₹{o.total}</p>
//                   <div className="flex gap-2">
//                     <button onClick={() => reorder(o)} className="px-3 py-1.5 rounded-xl border hover:bg-gray-50 text-sm flex items-center gap-1"><Repeat2 className="w-4 h-4" /> Reorder</button>
//                     <button onClick={() => setShowModal(o)} className="px-3 py-1.5 rounded-xl border hover:bg-gray-50 text-sm">Details</button>
//                   </div>
//                 </div>
//               </motion.div>
//             ))
//           )}
//         </div>
//       )}

//       {/* Order Details Modal */}
//       <AnimatePresence>
//         {showModal && (
//           <motion.div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
//             <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl relative">
//               <button onClick={() => setShowModal(null)} className="absolute top-3 right-3 text-gray-500 hover:text-black"><X className="w-5 h-5" /></button>
//               <h2 className="text-xl font-bold mb-2">{showModal.restaurant}</h2>
//               <p className="text-sm text-gray-600 mb-4">Ordered on {new Date(showModal.placedAt || showModal.deliveredAt).toLocaleString()}</p>
//               <div className="space-y-2 max-h-60 overflow-y-auto">
//                 {showModal.items.map((it) => (
//                   <div key={it.id} className="flex justify-between border-b pb-1 text-sm">
//                     <span>{it.foodName}</span>
//                     <span>₹{it.price} × {it.quantity ?? 1}</span>
//                   </div>
//                 ))}
//               </div>
//               <div className="mt-4 flex justify-between font-semibold"><span>Total</span><span>₹{showModal.total}</span></div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Review Popup */}
//       <WriteReview open={openReview} onClose={() => setOpenReview(false)} />
//     </div>
//   );
// }








// // src/pages/Orders/Orders.jsx

// import { useEffect, useState, useMemo } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   CheckCircle2,
//   Clock,
//   Utensils,
//   Repeat2,
//   HelpCircle,
//   ReceiptText,
//   Package,
//   PhoneCall,
//   Bike,
//   Star,
//   X,
// } from "lucide-react";

// import toast from "react-hot-toast";
// import confetti from "canvas-confetti";

// import { useAuth } from "../../context/AuthContext";
// import { useCart } from "../../context/CartContext";

// import { getOrderById, getOrdersByUserId } from "../../api/api";
// import WriteReview from "../Review/WriteReview";

// /* ==========================================================
//    BACKEND ENUM STATUS (EXACT MATCH)
//    PLACED, ACCEPTED, PREPARING, PICKED_UP, DELIVERED, REJECTED
//    ========================================================== */
// const ORDER_STEPS = [
//   "PLACED",
//   "ACCEPTED",
//   "PREPARING",
//   "PICKED_UP",
//   "DELIVERED",
// ];

// const normalizeStatus = (s) => (s ? s.toUpperCase().trim() : "");

// export default function Orders() {
//   const { user } = useAuth();
//   const { addItem } = useCart();

//   const [activeOrder, setActiveOrder] = useState(null); // live / ongoing
//   const [history, setHistory] = useState([]); // delivered + rejected
//   const [tab, setTab] = useState("ongoing"); // "ongoing" | "history"
//   const [progressStep, setProgressStep] = useState(0);

//   const [showModal, setShowModal] = useState(null);
//   const [openReview, setOpenReview] = useState(false);
//   const [reviewOrder, setReviewOrder] = useState(null); // jis order par review likhna hai

//   const userId = user?.email;

//   /* =======================================================
//      1️⃣ LOAD USER ORDERS (ONCE & WHEN USERID CHANGES)
//   ======================================================== */
//   useEffect(() => {
//     if (!userId) return;

//     const loadOrders = async () => {
//       try {
//         const res = await getOrdersByUserId(userId);
//         const raw = res?.data || [];
//         const orders = Array.isArray(raw) ? raw : raw?.data || [];

//         // Split: ongoing vs history using backend enums
//         const ongoingOrders = orders.filter((o) => {
//           const st = normalizeStatus(o.status);
//           return st !== "DELIVERED" && st !== "REJECTED";
//         });

//         const historyOrders = orders.filter((o) => {
//           const st = normalizeStatus(o.status);
//           return st === "DELIVERED" || st === "REJECTED";
//         });

//         setActiveOrder(ongoingOrders[0] || null);
//         setHistory(historyOrders);

//         // If koi ongoing nahi → default Past Orders tab
//         setTab(ongoingOrders.length ? "ongoing" : "history");

//         if (ongoingOrders[0]) {
//           const st = normalizeStatus(ongoingOrders[0].status);
//           const stepIndex = ORDER_STEPS.indexOf(st);
//           setProgressStep(stepIndex >= 0 ? stepIndex : 0);
//         } else {
//           setProgressStep(0);
//         }
//       } catch (err) {
//         console.error(err);
//         toast.error("Orders load karte waqt error aaya ❌");
//       }
//     };

//     loadOrders();
//   }, [userId]);

//   /* =======================================================
//      2️⃣ POLL ACTIVE ORDER EVERY 4 SECONDS
//   ======================================================== */
//   useEffect(() => {
//     if (!activeOrder?.orderId) return;

//     const interval = setInterval(async () => {
//       try {
//         const res = await getOrderById(activeOrder.orderId);
//         const updated = res?.data;
//         if (!updated) return;

//         const status = normalizeStatus(updated.status);
//         const stepIndex = ORDER_STEPS.indexOf(status);
//         setProgressStep(stepIndex >= 0 ? stepIndex : 0);
//         setActiveOrder(updated);

//         // If delivered / rejected → move to history + show confetti
//         if (status === "DELIVERED" || status === "REJECTED") {
//           confetti({
//             particleCount: 120,
//             spread: 70,
//             origin: { y: 0.3 },
//           });

//           setHistory((prev) => {
//             const without = prev.filter(
//               (o) => o.orderId !== updated.orderId
//             );
//             return [...without, updated];
//           });

//           setActiveOrder(null);
//           setTab("history");
//         }
//       } catch (err) {
//         console.error("Order polling error:", err);
//       }
//     }, 4000);

//     return () => clearInterval(interval);
//   }, [activeOrder?.orderId]);

//   /* =======================================================
//      3️⃣ REORDER
//   ======================================================== */
//   const reorder = (order) => {
//     if (!order?.items?.length) return;

//     order.items.forEach((it) =>
//       addItem({
//         id: it.foodId || it.mealId, // safety
//         name: it.mealName,
//         price: it.pricePerItem,
//         image: it.imageUrl,
//       })
//     );
//     toast.success("Items added to cart 🛒");
//   };

//   /* =======================================================
//      4️⃣ DELIVERY PARTNER INFO (FROM BACKEND)
//      Tumhare JSON ke hisaab se:
//      delivery: {
//        deliveryId,
//        deliveryPartnerName,
//        deliveryPartnerPhone
//      }
//      + future-safe fallback fields
//   ======================================================== */
//   const currentStatus = normalizeStatus(activeOrder?.status);

//   const currentDelivery =
//     activeOrder?.delivery || activeOrder?.deliveryInfo || null;

//   const partnerName =
//     activeOrder?.deliveryPartnerName ||
//     activeOrder?.riderName ||
//     currentDelivery?.deliveryPartnerName || // ← tumhara current DTO
//     currentDelivery?.riderName ||
//     currentDelivery?.partnerName ||
//     currentDelivery?.partner?.name ||
//     "";

//   const partnerPhone =
//     activeOrder?.deliveryPartnerPhone ||
//     activeOrder?.riderPhone ||
//     currentDelivery?.deliveryPartnerPhone || // ← tumhara current DTO
//     currentDelivery?.riderPhone ||
//     currentDelivery?.partnerPhone ||
//     currentDelivery?.partner?.phone ||
//     "";

//   // Sirf tab "assigned" dikhayenge jab status PICKED_UP / DELIVERED ke baad hai
//   const hasCrossedPickup =
//     ORDER_STEPS.indexOf(currentStatus) >= ORDER_STEPS.indexOf("PICKED_UP");

//   const isPartnerAssigned = hasCrossedPickup && !!partnerName?.trim();

//   const progressPercent = useMemo(
//     () => (progressStep / (ORDER_STEPS.length - 1 || 1)) * 100,
//     [progressStep]
//   );

//   /* =======================================================
//      RENDER
//   ======================================================== */
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 px-4 py-6 md:px-8 lg:px-16">
//       {/* Background blobs for premium feel */}
//       <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
//         <div className="absolute -left-24 top-10 h-64 w-64 rounded-full bg-rose-200/25 blur-3xl" />
//         <div className="absolute -right-24 bottom-10 h-64 w-64 rounded-full bg-amber-200/25 blur-3xl" />
//       </div>

//       {/* ===================== HEADER + TABS ===================== */}
//       <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
//         <div>
//           <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-rose-600 shadow-sm ring-1 ring-rose-100">
//             <ReceiptText className="h-3.5 w-3.5" />
//             <span>Order Centre</span>
//           </div>
//           <h1 className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl">
//             Your Orders
//           </h1>
//           <p className="mt-1 text-sm text-slate-600">
//             Track live orders in real-time & reorder your favourites.
//           </p>
//         </div>

//         <div className="inline-flex rounded-full bg-slate-100 p-1 shadow-sm">
//           <button
//             onClick={() => setTab("ongoing")}
//             className={`flex items-center gap-1 rounded-full px-4 py-1.5 text-xs font-semibold transition ${
//               tab === "ongoing"
//                 ? "bg-white text-slate-900 shadow-sm"
//                 : "text-slate-500 hover:text-slate-800"
//             }`}
//           >
//             <Clock className="h-4 w-4" />
//             Ongoing
//           </button>
//           <button
//             onClick={() => setTab("history")}
//             className={`flex items-center gap-1 rounded-full px-4 py-1.5 text-xs font-semibold transition ${
//               tab === "history"
//                 ? "bg-white text-slate-900 shadow-sm"
//                 : "text-slate-500 hover:text-slate-800"
//             }`}
//           >
//             <Package className="h-4 w-4" />
//             Past Orders
//           </button>
//         </div>
//       </div>

//       {/* ===================== ONGOING TAB ===================== */}
//       {tab === "ongoing" && (
//         <>
//           {activeOrder ? (
//             <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
//               {/* LEFT: ORDER TRACKING CARD */}
//               <motion.div
//                 initial={{ opacity: 0, x: -12 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 className="rounded-3xl border border-slate-100 bg-white/95 p-6 shadow-xl"
//               >
//                 {/* Kitchen + Address */}
//                 <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
//                   <div className="flex items-start gap-3">
//                     <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 shadow-sm">
//                       <Utensils className="h-5 w-5" />
//                     </div>
//                     <div>
//                       <p className="text-sm font-semibold text-slate-900">
//                         Tiffino Kitchen
//                       </p>
//                       <p className="mt-0.5 text-xs text-slate-500">
//                         {activeOrder.address}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
//                     <Clock className="h-3.5 w-3.5" />
//                     Live tracking enabled
//                   </div>
//                 </div>

//                 {/* TIMELINE PROGRESS */}
//                 <div className="relative mt-4 mb-8">
//                   {/* Base line */}
//                   <div className="absolute left-4 right-4 top-1/2 h-1 -translate-y-1/2 rounded-full bg-slate-200" />

//                   {/* Active line */}
//                   <motion.div
//                     className="absolute left-4 top-1/2 h-1 -translate-y-1/2 rounded-full bg-gradient-to-r from-emerald-500 to-rose-500"
//                     animate={{ width: `calc(${progressPercent}% - 1rem)` }}
//                     transition={{ duration: 0.4 }}
//                   />

//                   <div className="relative grid grid-cols-5">
//                     {ORDER_STEPS.map((step, index) => {
//                       const completed = index <= progressStep;
//                       return (
//                         <div
//                           key={step}
//                           className="flex flex-col items-center gap-1"
//                         >
//                           <div
//                             className={`flex h-9 w-9 items-center justify-center rounded-full border-2 text-xs font-semibold ${
//                               completed
//                                 ? "border-emerald-500 bg-emerald-500 text-white shadow-md shadow-emerald-500/40"
//                                 : "border-slate-200 bg-white text-slate-400"
//                             }`}
//                           >
//                             {completed ? (
//                               <CheckCircle2 className="h-4 w-4" />
//                             ) : (
//                               index + 1
//                             )}
//                           </div>
//                           <p
//                             className={`text-[10px] uppercase tracking-wide ${
//                               completed ? "text-slate-900" : "text-slate-400"
//                             }`}
//                           >
//                             {step.replace("_", " ")}
//                           </p>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>

//                 {/* ORDER ITEMS */}
//                 <div className="mt-2 rounded-2xl bg-slate-50/80 p-4">
//                   <div className="mb-3 flex items-center justify-between">
//                     <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
//                       <ReceiptText className="h-4 w-4 text-rose-500" />
//                       <span>Order #{activeOrder.orderId}</span>
//                     </div>
//                     <p className="text-xs text-slate-500">
//                       {new Date(
//                         activeOrder.orderDate || activeOrder.createdAt
//                       ).toLocaleString()}
//                     </p>
//                   </div>

//                   <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
//                     {activeOrder.items?.map((it, i) => (
//                       <div
//                         key={i}
//                         className="flex items-center justify-between rounded-xl bg-white px-3 py-2 text-xs shadow-sm"
//                       >
//                         <div>
//                           <p className="font-semibold text-slate-800">
//                             {it.mealName}
//                           </p>
//                           <p className="mt-0.5 text-[11px] text-slate-500">
//                             Qty: {it.quantity}
//                           </p>
//                         </div>
//                         <p className="text-sm font-semibold text-slate-900">
//                           ₹{Number(it.pricePerItem) * Number(it.quantity)}
//                         </p>
//                       </div>
//                     ))}
//                   </div>

//                   <div className="mt-4 flex items-center justify-between border-t pt-3">
//                     <span className="text-sm font-semibold text-slate-700">
//                       Total payable
//                     </span>
//                     <span className="text-lg font-bold text-slate-900">
//                       ₹{activeOrder.totalAmount}
//                     </span>
//                   </div>
//                 </div>

//                 {/* SMALL HELP FOOTER */}
//                 <div className="mt-4 flex items-center gap-2 text-[11px] text-slate-500">
//                   <HelpCircle className="h-3.5 w-3.5" />
//                   Having an issue with this order? Support coming soon.
//                 </div>
//               </motion.div>

//               {/* RIGHT: DELIVERY PARTNER CARD (NO MAP BOX) */}
//               <motion.div
//                 initial={{ opacity: 0, x: 12 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 className="flex flex-col gap-4"
//               >
//                 <div className="rounded-3xl border border-slate-100 bg-white/95 p-5 shadow-xl">
//                   <div className="mb-3 flex items-center justify-between">
//                     <p className="text-sm font-semibold text-slate-900">
//                       Delivery Partner
//                     </p>
//                     <span
//                       className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${
//                         isPartnerAssigned
//                           ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
//                           : "bg-slate-50 text-slate-500 border border-slate-100"
//                       }`}
//                     >
//                       <span className="h-1.5 w-1.5 rounded-full bg-current" />
//                       {isPartnerAssigned ? "Assigned" : "Not assigned yet"}
//                     </span>
//                   </div>

//                   <div className="flex items-start gap-3">
//                     <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 shadow-sm">
//                       <Bike className="h-5 w-5" />
//                     </div>

//                     <div className="flex-1 space-y-1">
//                       <p className="text-sm font-semibold text-slate-900">
//                         {isPartnerAssigned ? partnerName : "Awaiting Rider"}
//                       </p>

//                       <p className="flex items-center gap-1 text-xs text-slate-600">
//                         <PhoneCall className="h-3.5 w-3.5 text-slate-400" />
//                         {isPartnerAssigned && partnerPhone
//                           ? partnerPhone
//                           : "Phone will appear once assigned"}
//                       </p>

//                       <p className="flex items-center gap-1 text-xs text-amber-600">
//                         <Star className="h-3.5 w-3.5 fill-amber-500" />
//                         4.7 • Verified partner
//                       </p>
//                     </div>
//                   </div>

//                   <div className="mt-4 grid grid-cols-2 gap-2 text-[11px] text-slate-600">
//                     <div className="rounded-xl bg-slate-50 px-3 py-2">
//                       <p className="font-semibold text-slate-800">
//                         Current status
//                       </p>
//                       <p className="mt-0.5 text-[11px] uppercase tracking-wide">
//                         {normalizeStatus(activeOrder.status).replace(
//                           "_",
//                           " "
//                         )}
//                       </p>
//                     </div>
//                     <div className="rounded-xl bg-slate-50 px-3 py-2">
//                       <p className="font-semibold text-slate-800">
//                         Est. delivery
//                       </p>
//                       <p className="mt-0.5 text-[11px]">
//                         {normalizeStatus(activeOrder.status) === "PICKED_UP"
//                           ? "Around 10–20 mins"
//                           : "Around 30–40 mins"}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             </div>
//           ) : (
//             <div className="flex min-h-[40vh] flex-col items-center justify-center text-center">
//               <Clock className="mb-3 h-10 w-10 text-slate-300" />
//               <p className="text-base font-semibold text-slate-800">
//                 No active orders right now
//               </p>
//               <p className="mt-1 max-w-xs text-sm text-slate-500">
//                 Place a new order and your live tracking will appear here.
//               </p>
//             </div>
//           )}
//         </>
//       )}

//       {/* ===================== HISTORY TAB ===================== */}
//       {tab === "history" && (
//         <div className="mt-2 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
//           {history.length === 0 ? (
//             <div className="col-span-full flex min-h-[40vh] flex-col items-center justify-center text-center">
//               <Package className="mb-3 h-10 w-10 text-slate-300" />
//               <p className="text-base font-semibold text-slate-800">
//                 No past orders yet
//               </p>
//               <p className="mt-1 max-w-xs text-sm text-slate-500">
//                 Once you complete an order, it will appear in this section.
//               </p>
//             </div>
//           ) : (
//             history
//               .slice()
//               .sort(
//                 (a, b) =>
//                   new Date(b.orderDate || b.createdAt) -
//                   new Date(a.orderDate || a.createdAt)
//               )
//               .map((order) => {
//                 const status = normalizeStatus(order.status);
//                 const isDelivered = status === "DELIVERED";
//                 return (
//                   <motion.div
//                     key={order.orderId}
//                     whileHover={{
//                       y: -2,
//                       boxShadow: "0 18px 40px rgba(15,23,42,0.12)",
//                     }}
//                     className="flex h-full flex-col rounded-2xl border border-slate-100 bg-white/95 p-5 shadow-sm transition-all"
//                   >
//                     <div className="mb-2 flex items-start justify-between gap-2">
//                       <div>
//                         <p className="text-sm font-semibold text-slate-900">
//                           Tiffino Kitchen
//                         </p>
//                         <p className="mt-0.5 text-xs text-slate-500">
//                           {new Date(
//                             order.orderDate || order.createdAt
//                           ).toLocaleString()}
//                         </p>
//                       </div>

//                       <span
//                         className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${
//                           isDelivered
//                             ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
//                             : "bg-red-50 text-red-700 border border-red-100"
//                         }`}
//                       >
//                         <span className="h-1.5 w-1.5 rounded-full bg-current" />
//                         {status}
//                       </span>
//                     </div>

//                     {/* Rejection reason if any */}
//                     {status === "REJECTED" && (
//                       <p className="mt-1 text-xs text-red-600">
//                         Reason:{" "}
//                         {order.rejectionReason || "No reason provided"}
//                       </p>
//                     )}

//                     {/* Items preview */}
//                     <div className="mt-3 space-y-1 text-xs text-slate-700">
//                       {order.items?.slice(0, 3).map((it, idx) => (
//                         <p key={idx}>
//                           {it.mealName}{" "}
//                           <span className="text-slate-400">
//                             × {it.quantity}
//                           </span>
//                         </p>
//                       ))}
//                       {order.items?.length > 3 && (
//                         <p className="text-[11px] text-slate-400">
//                           + {order.items.length - 3} more items
//                         </p>
//                       )}
//                     </div>

//                     <div className="mt-4 flex items-center justify-between border-t pt-3">
//                       <p className="text-sm font-semibold text-slate-800">
//                         Total paid
//                       </p>
//                       <p className="text-lg font-bold text-slate-900">
//                         ₹{order.totalAmount}
//                       </p>
//                     </div>

//                     {/* Actions */}
//                     <div className="mt-3 flex flex-wrap gap-2">
//                       {isDelivered && (
//                         <>
//                           <button
//                             onClick={() => reorder(order)}
//                             className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
//                           >
//                             <Repeat2 className="h-3.5 w-3.5" />
//                             Reorder
//                           </button>
//                           <button
//                             onClick={() => {
//                               setReviewOrder(order);
//                               setOpenReview(true);
//                             }}
//                             className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700 hover:bg-amber-100 border border-amber-100"
//                           >
//                             <Star className="h-3.5 w-3.5 fill-amber-400" />
//                             Rate Order
//                           </button>
//                         </>
//                       )}

//                       <button
//                         onClick={() => setShowModal(order)}
//                         className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
//                       >
//                         <ReceiptText className="h-3.5 w-3.5" />
//                         View Details
//                       </button>
//                     </div>
//                   </motion.div>
//                 );
//               })
//           )}
//         </div>
//       )}

//       {/* ===================== DETAILS MODAL ===================== */}
//       <AnimatePresence>
//         {showModal && (
//           <motion.div
//             className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <motion.div
//               initial={{ scale: 0.9, y: 10, opacity: 0 }}
//               animate={{ scale: 1, y: 0, opacity: 1 }}
//               exit={{ scale: 0.92, y: 10, opacity: 0 }}
//               className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
//             >
//               <button
//                 onClick={() => setShowModal(null)}
//                 className="absolute right-3 top-3 rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
//               >
//                 <X className="h-4 w-4" />
//               </button>

//               <h2 className="mb-1 text-lg font-bold text-slate-900">
//                 Order Details
//               </h2>
//               <p className="mb-3 text-xs text-slate-500">
//                 {new Date(
//                   showModal.orderDate || showModal.createdAt
//                 ).toLocaleString()}
//               </p>

//               {/* Rejection reason */}
//               {normalizeStatus(showModal.status) === "REJECTED" && (
//                 <p className="mb-3 text-xs text-red-600">
//                   Reason:{" "}
//                   {showModal.rejectionReason || "No reason provided"}
//                 </p>
//               )}

//               <div className="max-h-56 space-y-2 overflow-y-auto pr-1 text-sm">
//                 {showModal.items?.map((it, idx) => (
//                   <div
//                     key={idx}
//                     className="flex items-center justify-between border-b py-1"
//                   >
//                     <span>{it.mealName}</span>
//                     <span className="text-xs text-slate-600">
//                       ₹{it.pricePerItem} × {it.quantity}
//                     </span>
//                   </div>
//                 ))}
//               </div>

//               <div className="mt-4 flex items-center justify-between border-t pt-3 text-sm font-semibold">
//                 <span>Total</span>
//                 <span>₹{showModal.totalAmount}</span>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* ===================== GLOBAL REVIEW MODAL ===================== */}
//       <WriteReview
//         open={openReview}
//         onClose={() => {
//           setOpenReview(false);
//           setReviewOrder(null);
//         }}
//         order={reviewOrder}
//         user={user}
//       />
//     </div>
//   );
// }




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