
import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { 
  MapPin, 
  CreditCard, 
  ShoppingBag, 
  ChevronRight, 
  CheckCircle2, 
  Truck, 
  Utensils, 
  Wallet,
  Receipt,
  AlertCircle
} from "lucide-react";

import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { getAllAddresses, getSubscriptionById, checkoutOrder, clearUserCart } from "../../api/api";

/* =====================================================================
   🎨 GLOBAL STYLES & HELPERS
   ===================================================================== */
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=400&auto=format&fit=crop";

const getDishImage = (item) => {
  if (item.image) return item.image;
  if (item.imageUrl) return item.imageUrl;
  return FALLBACK_IMAGE;
};

export default function Checkout() {
  const navigate = useNavigate();
  const { items, totalPrice, clear, loadCart } = useCart();
  const { user: authUser } = useAuth();

  // -- State --
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);

  // -- Calculated Values --
  const deliveryFee = totalPrice > 499 ? 0 : 40;
  const taxes = Math.round((totalPrice - discountAmount) * 0.05); // 5% GST
  const platformFee = 5;
  const finalAmount = Math.max(0, totalPrice - discountAmount + deliveryFee + taxes + platformFee);

  // -- Initial Load --
  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        await loadCart();
        
        // 1. Fetch Addresses
        const res = await getAllAddresses();
        const list = res.data || [];
        setAddresses(list);
        if (list.length > 0) setSelectedAddressId(list[0].id);

        // 2. Fetch Subscription
        if (authUser?.subscriptionId) {
          try {
            const subRes = await getSubscriptionById(authUser.subscriptionId);
            setSubscription(subRes.data);
            if (subRes.data?.discountPercent) {
              const disc = (totalPrice * subRes.data.discountPercent) / 100;
              setDiscountAmount(Math.round(disc));
            }
          } catch (e) {
            console.warn("Subscription fetch failed", e);
          }
        }
      } catch (err) {
        console.error(err);
        toast.error("Could not load checkout details");
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [authUser]); // Added dependency to re-run if auth changes

  // -- Handlers --
  const formatAddress = (a) => {
    if (!a) return "";
    return [a.flatNoOrBuildingName, a.street, a.landmark, `${a.city}, ${a.state} - ${a.pincode}`].filter(Boolean).join(", ");
  };

  const handlePlaceOrder = async () => {
    if (!items.length) return navigate("/cuisine");
    if (!selectedAddressId) return toast.error("Please select a delivery address 📍");

    const selectedAddress = addresses.find((a) => a.id === selectedAddressId);
    
    setPlacingOrder(true);
    try {
      const payload = {
        userId: authUser?.email || "UNKNOWN_USER",
        customerName: authUser?.fullName || authUser?.name || "User",
        customerPhoneNumber: authUser?.phone || "0000000000",
        address: formatAddress(selectedAddress),
        orderType: subscription ? "SUBSCRIPTION" : "ONE_TIME",
        subscriptionId: subscription?.id || null,
        appliedDiscount: discountAmount,
        notes: notes || "",
        items: items.map((it) => ({
          mealName: it.name || it.foodName,
          quantity: Number(it.quantity),
          pricePerItem: Number(it.price),
          customizations: "",
        })),
      };

      const res = await checkoutOrder(payload);
      
      // Cleanup
      try { await clearUserCart(); } catch (e) {} 
      clear();
      
      const orderId = res.data?.orderId || res.data?.order?.id || Date.now();
      navigate(`/success?orderId=${orderId}`);
      toast.success("Order Placed Successfully! 🎉");

    } catch (err) {
      console.error(err);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setPlacingOrder(false);
    }
  };

  // -- Empty State --
  if (!loading && items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6">
           <ShoppingBag size={40} className="text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Your Cart is Empty</h2>
        <button onClick={() => navigate("/cuisine")} className="mt-6 px-8 py-3 bg-red-600 text-white rounded-xl font-bold shadow-lg hover:bg-red-700 transition">
           Browse Menu
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20 font-sans selection:bg-red-100 selection:text-red-700">
      
      {/* --- PROGRESS HEADER --- */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
         <div className="max-w-6xl mx-auto px-4 md:px-8 py-4">
            <div className="flex items-center justify-between md:justify-start md:gap-12">
               <Step number={1} label="Cart" active completed />
               <div className="flex-1 h-0.5 bg-gray-200 md:max-w-[100px]"><div className="h-full bg-green-500 w-full"/></div>
               <Step number={2} label="Checkout" active />
               <div className="flex-1 h-0.5 bg-gray-200 md:max-w-[100px]"/>
               <Step number={3} label="Done" />
            </div>
         </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
         <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Confirm Order</h1>

         <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8 items-start">
            
            {/* ================= LEFT COLUMN ================= */}
            <div className="space-y-8">
               
               {/* 1. DELIVERY ADDRESS */}
               <section className="bg-white rounded-[2rem] p-6 md:p-8 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3 mb-6">
                     <div className="p-2 bg-red-50 text-red-600 rounded-lg"><MapPin size={24}/></div>
                     <h2 className="text-xl font-bold text-gray-800">Delivery Address</h2>
                  </div>

                  {addresses.length === 0 ? (
                     <div className="text-center py-8 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                        <p className="text-gray-500 mb-4">No saved addresses found.</p>
                        <button onClick={() => navigate("/profile")} className="text-red-600 font-bold hover:underline">
                           + Add New Address
                        </button>
                     </div>
                  ) : (
                     <div className="grid md:grid-cols-2 gap-4">
                        {addresses.map((addr) => (
                           <motion.div 
                              key={addr.id}
                              onClick={() => setSelectedAddressId(addr.id)}
                              whileTap={{ scale: 0.98 }}
                              className={`
                                 relative cursor-pointer p-5 rounded-2xl border-2 transition-all duration-200
                                 ${selectedAddressId === addr.id 
                                    ? "border-red-500 bg-red-50/30 shadow-md" 
                                    : "border-gray-200 hover:border-red-200 bg-white"
                                 }
                              `}
                           >
                              {selectedAddressId === addr.id && (
                                 <div className="absolute top-4 right-4 text-red-600">
                                    <CheckCircle2 size={20} fill="currentColor" className="text-white"/>
                                 </div>
                              )}
                              <h3 className="font-bold text-gray-900 mb-1">{addr.flatNoOrBuildingName}</h3>
                              <p className="text-sm text-gray-500 leading-relaxed">{formatAddress(addr)}</p>
                           </motion.div>
                        ))}
                     </div>
                  )}
               </section>

               {/* 2. PAYMENT METHOD */}
               <section className="bg-white rounded-[2rem] p-6 md:p-8 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3 mb-6">
                     <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Wallet size={24}/></div>
                     <h2 className="text-xl font-bold text-gray-800">Payment Method</h2>
                  </div>
                  
                  <div className="space-y-3">
                     <PaymentOption 
                        icon={<Truck size={20}/>} 
                        title="Cash on Delivery" 
                        desc="Pay securely when your food arrives." 
                        selected={true} 
                     />
                     <PaymentOption 
                        icon={<CreditCard size={20}/>} 
                        title="Online Payment (UPI / Cards)" 
                        desc="Coming soon to Tiffino." 
                        disabled 
                     />
                  </div>
               </section>

               {/* 3. ORDER ITEMS REVIEW */}
               <section className="bg-white rounded-[2rem] p-6 md:p-8 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3 mb-6">
                     <div className="p-2 bg-yellow-50 text-yellow-600 rounded-lg"><Utensils size={24}/></div>
                     <h2 className="text-xl font-bold text-gray-800">Review Items</h2>
                  </div>

                  <div className="space-y-4">
                     {items.map((item) => (
                        <div key={item.foodId} className="flex items-center gap-4 py-2">
                           <img 
                              src={getDishImage(item)} 
                              alt={item.foodName} 
                              className="w-16 h-16 rounded-xl object-cover bg-gray-100"
                           />
                           <div className="flex-1">
                              <h4 className="font-bold text-gray-900">{item.name || item.foodName}</h4>
                              <p className="text-sm text-gray-500">₹{item.price} x {item.quantity}</p>
                           </div>
                           <div className="font-bold text-gray-900">₹{item.price * item.quantity}</div>
                        </div>
                     ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-100">
                     <label className="block text-sm font-bold text-gray-700 mb-2">Cooking Instructions (Optional)</label>
                     <textarea 
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="e.g. Less spicy, extra tissues, ring doorbell..." 
                        className="w-full p-4 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-red-100 text-sm resize-none"
                        rows={2}
                     />
                  </div>
               </section>
            </div>

            {/* ================= RIGHT COLUMN (STICKY) ================= */}
            <div className="lg:sticky lg:top-24 space-y-6">
               
               {/* BILL CARD */}
               <div className="bg-white rounded-[2.5rem] p-6 shadow-xl border border-gray-100 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-500 to-orange-500" />
                  
                  <h3 className="text-xl font-extrabold text-gray-900 flex items-center gap-2 mb-6">
                     <Receipt size={20} className="text-red-500" /> Order Summary
                  </h3>

                  <div className="space-y-3 text-sm mb-6">
                     <BillRow label="Item Total" value={`₹${totalPrice}`} />
                     
                     {deliveryFee === 0 ? (
                        <BillRow label="Delivery Fee" value="FREE" highlight />
                     ) : (
                        <BillRow label="Delivery Fee" value={`₹${deliveryFee}`} />
                     )}

                     <BillRow label="Taxes & Charges (5%)" value={`₹${taxes}`} />
                     <BillRow label="Platform Fee" value={`₹${platformFee}`} />

                     {discountAmount > 0 && (
                        <BillRow label="Subscription Savings" value={`- ₹${discountAmount}`} color="text-green-600" />
                     )}
                  </div>

                  <div className="border-t border-dashed border-gray-300 my-4" />

                  <div className="flex justify-between items-center mb-8">
                     <span className="text-lg font-bold text-gray-800">To Pay</span>
                     <span className="text-3xl font-extrabold text-red-600">₹{finalAmount}</span>
                  </div>

                  <button 
                     onClick={handlePlaceOrder}
                     disabled={placingOrder}
                     className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold text-lg shadow-xl shadow-gray-300 hover:bg-black hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                     {placingOrder ? (
                        <span className="animate-pulse">Processing...</span>
                     ) : (
                        <>Place Order <ChevronRight size={20} strokeWidth={3}/></>
                     )}
                  </button>

                  <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                     <AlertCircle size={12} /> 100% Safe & Secure
                  </div>
               </div>

               {/* SUBSCRIPTION PROMO (If not subscribed) */}
               {!subscription && (
                  <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
                     <h4 className="font-bold text-lg mb-2">Save more with Pro!</h4>
                     <p className="text-white/80 text-sm mb-4">Get 20% off on all orders + Free Delivery.</p>
                     <button onClick={() => navigate("/subscription")} className="px-4 py-2 bg-white text-indigo-700 rounded-lg text-xs font-bold shadow hover:bg-indigo-50 transition">
                        View Plans
                     </button>
                  </div>
               )}
            </div>

         </div>
      </main>
    </div>
  );
}

/* --- SUB COMPONENTS --- */

const Step = ({ number, label, active, completed }) => (
   <div className={`flex items-center gap-2 ${active || completed ? 'opacity-100' : 'opacity-40'}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${completed ? 'bg-green-500 text-white' : active ? 'bg-red-600 text-white shadow-md shadow-red-200' : 'bg-gray-200 text-gray-500'}`}>
         {completed ? <CheckCircle2 size={16}/> : number}
      </div>
      <span className={`text-sm font-bold ${active ? 'text-gray-900' : 'text-gray-500'}`}>{label}</span>
   </div>
);

const PaymentOption = ({ icon, title, desc, selected, disabled }) => (
   <div className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${disabled ? 'opacity-50 bg-gray-50 border-gray-100 cursor-not-allowed' : selected ? 'border-red-500 bg-red-50/50' : 'border-gray-100 hover:border-gray-200'}`}>
      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selected ? 'border-red-600' : 'border-gray-300'}`}>
         {selected && <div className="w-2.5 h-2.5 rounded-full bg-red-600" />}
      </div>
      <div>
         <h4 className="font-bold text-gray-800 text-sm flex items-center gap-2">{icon} {title}</h4>
         <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
      </div>
   </div>
);

const BillRow = ({ label, value, highlight, color = "text-gray-900" }) => (
   <div className="flex justify-between items-center">
      <span className="text-gray-500">{label}</span>
      <span className={`font-bold ${highlight ? 'text-green-600' : color}`}>{value}</span>
   </div>
);