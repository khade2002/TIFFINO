
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

import {
  getUserByEmail,
  getAllAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  updateUser,
  deleteUser,
  getSubscriptionReview,
  renewSubscription,
  deleteSubscriptionById,
} from "../../api/api";

import {
  User, Mail, Phone, MapPin, Plus, Edit3, Trash2, Home, Briefcase, 
  ShieldCheck, Clock, Sparkles, Camera, LogOut, CreditCard, X, Check, 
  AlertTriangle, Calendar, Save, LayoutDashboard
} from "lucide-react";

/* =====================================================================
   🎨 ANIMATION VARIANTS
   ===================================================================== */
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring", bounce: 0.4 } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
};

/* =====================================================================
   🏙️ COMPONENT: ADDRESS MODAL (Glass Style)
   ===================================================================== */
const AddressModal = ({ show, onClose, onSubmit, initialData }) => {
  const [form, setForm] = useState({
    flatNoOrBuildingName: "", street: "", landmark: "", city: "", state: "", pincode: "", type: "Home",
  });

  useEffect(() => {
    if (initialData) setForm(initialData);
    else setForm({ flatNoOrBuildingName: "", street: "", landmark: "", city: "", state: "", pincode: "", type: "Home" });
  }, [initialData, show]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <motion.div
            variants={modalVariants}
            initial="hidden" animate="visible" exit="exit"
            className="w-full max-w-lg bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-white/50"
          >
            <div className="bg-gray-900 px-8 py-5 flex justify-between items-center">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <MapPin className="text-red-500" /> {initialData ? "Update Address" : "New Address"}
              </h3>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full text-white/70 hover:text-white transition"><X size={20}/></button>
            </div>
            
            <div className="p-8 space-y-5 bg-[#FAFAFA]">
              <div className="grid grid-cols-2 gap-5">
                 <div className="col-span-2 group">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1 block">Flat / Building</label>
                    <input name="flatNoOrBuildingName" value={form.flatNoOrBuildingName} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:border-red-500 focus:ring-4 focus:ring-red-50 outline-none transition-all" placeholder="e.g. A-402, Green Valley" />
                 </div>
                 <div className="col-span-2">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1 block">Street / Area</label>
                    <input name="street" value={form.street} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:border-red-500 focus:ring-4 focus:ring-red-50 outline-none transition-all" placeholder="e.g. MG Road, Indiranagar" />
                 </div>
                 <div>
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1 block">City</label>
                    <input name="city" value={form.city} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:border-red-500 focus:ring-4 focus:ring-red-50 outline-none transition-all" placeholder="Bangalore" />
                 </div>
                 <div>
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1 block">Pincode</label>
                    <input name="pincode" value={form.pincode} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:border-red-500 focus:ring-4 focus:ring-red-50 outline-none transition-all" placeholder="560038" />
                 </div>
                 <div>
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1 block">State</label>
                    <input name="state" value={form.state} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:border-red-500 focus:ring-4 focus:ring-red-50 outline-none transition-all" placeholder="Karnataka" />
                 </div>
                 <div>
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1 block">Type</label>
                    <div className="relative">
                      <select name="type" value={form.type} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:border-red-500 focus:ring-4 focus:ring-red-50 outline-none transition-all appearance-none cursor-pointer">
                         <option>Home</option>
                         <option>Work</option>
                         <option>Other</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">▼</div>
                    </div>
                 </div>
              </div>
              <button onClick={() => onSubmit(form)} className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold text-sm shadow-lg hover:bg-black hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                 <Check size={18} /> Save Address
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

/* =====================================================================
   ⚠️ COMPONENT: CONFIRM MODAL
   ===================================================================== */
const ConfirmModal = ({ show, onClose, onConfirm, title, description }) => {
  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <motion.div
            variants={modalVariants}
            initial="hidden" animate="visible" exit="exit"
            className="w-full max-w-sm bg-white rounded-[2rem] p-8 text-center shadow-2xl relative overflow-hidden"
          >
            <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
               <AlertTriangle size={36} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-500 mb-8 leading-relaxed text-sm">{description}</p>
            <div className="flex gap-4">
              <button onClick={onClose} className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition">Cancel</button>
              <button onClick={onConfirm} className="flex-1 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition shadow-lg shadow-red-200">Confirm</button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

/* =====================================================================
   🚀 MAIN PAGE: PROFILE DASHBOARD
   ===================================================================== */
export default function Profile() {
  const { user: authUser, logout } = useAuth();
  
  // State
  const [user, setUser] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [subscription, setSubscription] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [subLoading, setSubLoading] = useState(false);
  
  // Modals
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const fileInputRef = useRef(null);

  // --- 1. DATA LOADING ---
  const loadProfile = async () => {
    try {
      setLoading(true);
      const uRes = await getUserByEmail(authUser.email);
      const userData = uRes.data;
      setUser({ ...userData, phone: userData.mobile || userData.phone || "" });
      
      const aRes = await getAllAddresses();
      setAddresses(aRes.data || []);

      if (userData.id) {
         const storedPic = localStorage.getItem(`profilePic_${userData.id}`);
         if (storedPic) setProfilePic(storedPic);
      }

      const subId = localStorage.getItem("activeSubscriptionId");
      if (subId) await loadSubscription(subId);
      
    } catch (err) {
      toast.error("Could not load profile data");
    } finally {
      setLoading(false);
    }
  };

  const loadSubscription = async (id) => {
     try {
        setSubLoading(true);
        const res = await getSubscriptionReview(id);
        setSubscription(res.data);
     } catch {
        setSubscription(null);
     } finally {
        setSubLoading(false);
     }
  };

  useEffect(() => {
    if (authUser?.email) loadProfile();
  }, [authUser]);

  // --- 2. ACTIONS ---
  const handleImageUpload = (e) => {
     const file = e.target.files[0];
     if(file) {
        const reader = new FileReader();
        reader.onloadend = () => {
           setProfilePic(reader.result);
           localStorage.setItem(`profilePic_${user.id}`, reader.result);
           toast.success("Avatar updated! 😎");
        };
        reader.readAsDataURL(file);
     }
  };

  const handleUpdateProfile = async () => {
     try {
        const payload = { name: user.name, email: user.email, mobile: user.phone };
        await updateUser(user.id, payload);
        setIsEditing(false);
        toast.success("Profile saved successfully ✅");
     } catch (e) { toast.error("Update failed"); }
  };

  const handleAddressSubmit = async (formData) => {
     try {
        if(editingAddress) {
           await updateAddress(editingAddress.id, formData);
           toast.success("Address updated");
        } else {
           await addAddress(formData);
           toast.success("New address added");
        }
        const res = await getAllAddresses();
        setAddresses(res.data);
        setShowAddressModal(false);
     } catch { toast.error("Failed to save address"); }
  };

  const handleDeleteAddress = async (id) => {
     try {
        await deleteAddress(id);
        setAddresses(prev => prev.filter(a => a.id !== id));
        toast.success("Address removed");
     } catch { toast.error("Delete failed"); }
  };

  const handleSubAction = async (action) => {
     if(!subscription) return;
     setSubLoading(true);
     try {
        if(action === 'renew') {
           const duration = subscription.planType === "MONTHLY" ? 28 : 7;
           await renewSubscription(subscription.subscriptionid, { durationInDays: duration });
           toast.success("Subscription Renewed! 🎉");
           await loadSubscription(subscription.subscriptionid);
        } else {
           await deleteSubscriptionById(subscription.subscriptionid);
           localStorage.removeItem("activeSubscriptionId");
           setSubscription(null);
           toast.success("Subscription Cancelled");
        }
     } catch { toast.error("Action failed"); }
     finally { setSubLoading(false); }
  };

  if (loading) return (
     <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
        <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin"/>
     </div>
  );

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans pb-20 overflow-x-hidden">
      
      {/* --- HERO HEADER (Gradient) --- */}
      <div className="h-72 bg-gradient-to-r from-gray-900 via-slate-800 to-gray-900 relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"/>
         <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#F8F9FA] to-transparent"/>
         <div className="absolute top-10 right-20 w-80 h-80 bg-red-600/20 rounded-full blur-[120px] animate-pulse"/>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-40 relative z-10">
         
         {/* --- PROFILE SUMMARY CARD --- */}
         <motion.div 
            initial="hidden" animate="visible" variants={fadeInUp}
            className="bg-white rounded-[2.5rem] shadow-xl p-8 border border-white/50 backdrop-blur-xl flex flex-col md:flex-row items-center md:items-end gap-8 relative overflow-hidden"
         >
            {/* Avatar */}
            <div className="relative group shrink-0">
               <div className="w-40 h-40 rounded-full p-1.5 bg-gradient-to-tr from-red-500 via-orange-500 to-yellow-500 shadow-2xl">
                  <div className="w-full h-full rounded-full border-4 border-white bg-white overflow-hidden">
                     <img src={profilePic || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"} alt="Profile" className="w-full h-full object-cover"/>
                  </div>
               </div>
               <button onClick={() => fileInputRef.current.click()} className="absolute bottom-2 right-2 bg-gray-900 text-white p-2.5 rounded-full shadow-lg hover:scale-110 transition-transform cursor-pointer border-2 border-white">
                  <Camera size={18}/>
               </button>
               <input type="file" ref={fileInputRef} className="hidden" onChange={handleImageUpload} accept="image/*"/>
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left w-full pb-2">
               <div className="flex flex-col md:flex-row justify-between items-center mb-2">
                  <div>
                     <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-1">{user.name}</h1>
                     <p className="text-gray-500 font-medium flex items-center justify-center md:justify-start gap-2">
                        <Mail size={16} className="text-red-500"/> {user.email}
                     </p>
                  </div>
                  <div className="flex gap-3 mt-6 md:mt-0">
                     {isEditing ? (
                        <button onClick={handleUpdateProfile} className="px-6 py-2.5 bg-green-600 text-white rounded-full font-bold shadow-lg hover:bg-green-700 transition flex items-center gap-2">
                           <Save size={18}/> Save Changes
                        </button>
                     ) : (
                        <button onClick={() => setIsEditing(true)} className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-full font-bold hover:bg-gray-200 transition flex items-center gap-2">
                           <Edit3 size={18}/> Edit Profile
                        </button>
                     )}
                     <button onClick={logout} className="px-4 py-2.5 bg-red-50 text-red-600 rounded-full font-bold hover:bg-red-100 transition" title="Logout">
                        <LogOut size={18}/>
                     </button>
                  </div>
               </div>

               {/* Stats Row */}
               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                  {/* Phone Field */}
                  <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex items-center gap-4">
                     <div className="p-2 bg-white rounded-full shadow-sm text-blue-500"><Phone size={20}/></div>
                     <div className="flex-1">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Mobile</p>
                        {isEditing ? (
                           <input 
                              value={user.phone} 
                              onChange={e => setUser({...user, phone: e.target.value})}
                              className="bg-white border border-gray-300 rounded px-2 py-0.5 text-sm font-bold w-full focus:ring-2 focus:ring-red-100 outline-none"
                           />
                        ) : (
                           <p className="text-sm font-bold text-gray-900">{user.phone || "Add Number"}</p>
                        )}
                     </div>
                  </div>

                  {/* Joined */}
                  <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex items-center gap-4">
                     <div className="p-2 bg-white rounded-full shadow-sm text-purple-500"><Calendar size={20}/></div>
                     <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Member Since</p>
                        <p className="text-sm font-bold text-gray-900">January 2024</p>
                     </div>
                  </div>

                  {/* Status */}
                  <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex items-center gap-4">
                     <div className="p-2 bg-white rounded-full shadow-sm text-yellow-500"><Sparkles size={20}/></div>
                     <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</p>
                        <p className="text-sm font-bold text-gray-900 flex items-center gap-1">
                           {subscription ? "Premium Member" : "Free User"}
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </motion.div>

         {/* --- CONTENT GRID --- */}
         <div className="grid lg:grid-cols-[1.1fr_1.9fr] gap-8 mt-10">
            
            {/* LEFT COLUMN: SUBSCRIPTION (Card Style) */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
               <h3 className="text-xl font-extrabold text-gray-800 flex items-center gap-2 mb-6 ml-1">
                  <LayoutDashboard className="text-red-500"/> Membership Status
               </h3>

               {subscription ? (
                  <div className="relative h-[420px] w-full rounded-[2rem] bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8 text-white shadow-2xl flex flex-col justify-between overflow-hidden group">
                     {/* Holographic Shine */}
                     <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"/>
                     <div className="absolute -top-24 -right-24 w-64 h-64 bg-red-500/20 rounded-full blur-[80px]"/>

                     {/* Top */}
                     <div className="flex justify-between items-start z-10">
                        <div>
                           <p className="text-xs text-white/50 font-bold uppercase tracking-widest mb-1">Current Plan</p>
                           <h2 className="text-3xl font-bold flex items-center gap-2 text-yellow-400">
                              {subscription.planType} <Sparkles size={20} fill="currentColor"/>
                           </h2>
                        </div>
                        <CreditCard className="text-white/20 w-12 h-12"/>
                     </div>

                     {/* Middle Details */}
                     <div className="space-y-4 z-10">
                        <div className="flex justify-between items-center border-b border-white/10 pb-3">
                           <span className="text-sm text-white/70">Discount</span>
                           <span className="text-xl font-bold text-green-400">{subscription.discountPercentage}% OFF</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-white/10 pb-3">
                           <span className="text-sm text-white/70">Delivery</span>
                           <span className="text-lg font-bold text-white">Free Priority</span>
                        </div>
                        <div className="flex justify-between items-center">
                           <span className="text-sm text-white/70">Expires On</span>
                           <span className="text-sm font-bold text-white">{subscription.endDate}</span>
                        </div>
                     </div>

                     {/* Bottom Actions */}
                     <div className="flex gap-3 mt-6 z-10">
                        <button onClick={() => handleSubAction('renew')} disabled={subLoading} className="flex-1 py-3 bg-white text-black rounded-xl font-bold text-sm hover:bg-gray-200 transition shadow-lg">
                           {subLoading ? "..." : "Renew"}
                        </button>
                        <button onClick={() => handleSubAction('cancel')} disabled={subLoading} className="flex-1 py-3 bg-white/10 text-white border border-white/20 rounded-xl font-bold text-sm hover:bg-white/20 transition">
                           Cancel
                        </button>
                     </div>
                  </div>
               ) : (
                  <div className="h-[350px] bg-white rounded-[2rem] border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-center p-8 hover:border-red-200 transition-colors">
                     <div className="w-20 h-20 bg-yellow-50 rounded-full flex items-center justify-center mb-6">
                        <Sparkles className="text-yellow-500 w-10 h-10"/>
                     </div>
                     <h3 className="text-2xl font-bold text-gray-900 mb-2">Join Tiffino Pro</h3>
                     <p className="text-gray-500 text-sm mb-8 max-w-xs">Unlock exclusive discounts and free delivery on every order.</p>
                     <a href="/subscription" className="px-8 py-3 bg-gray-900 text-white rounded-xl font-bold shadow-lg hover:scale-105 transition-transform flex items-center gap-2">
                        View Plans <CreditCard size={18}/>
                     </a>
                  </div>
               )}
            </motion.div>

            {/* RIGHT COLUMN: ADDRESSES */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="flex flex-col gap-6">
               <div className="flex justify-between items-center ml-1">
                  <h3 className="text-xl font-extrabold text-gray-800 flex items-center gap-2">
                     <MapPin className="text-red-500"/> Saved Locations
                  </h3>
                  <button onClick={() => { setEditingAddress(null); setShowAddressModal(true); }} className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-red-100 transition">
                     <Plus size={16}/> Add New
                  </button>
               </div>

               <div className="grid gap-4">
                  {addresses.length === 0 ? (
                     <div className="bg-white rounded-3xl p-10 text-center border border-gray-100">
                        <p className="text-gray-400 font-medium">No saved addresses yet.</p>
                     </div>
                  ) : (
                     addresses.map(addr => (
                        <motion.div key={addr.id} whileHover={{ y: -2 }} className="group bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg transition-all flex justify-between items-start">
                           <div className="flex gap-4">
                              <div className={`mt-1 p-3 rounded-2xl ${addr.type === 'Work' ? "bg-blue-50 text-blue-600" : "bg-orange-50 text-orange-600"}`}>
                                 {addr.type === 'Work' ? <Briefcase size={22}/> : <Home size={22}/>}
                              </div>
                              <div>
                                 <div className="flex items-center gap-2 mb-1">
                                    <span className="font-bold text-gray-900 text-lg">{addr.type}</span>
                                    <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-[10px] font-bold uppercase rounded-md tracking-wider">Default</span>
                                 </div>
                                 <p className="text-gray-600 text-sm font-medium">{addr.flatNoOrBuildingName}, {addr.street}</p>
                                 <p className="text-gray-400 text-xs mt-1">{addr.city} - {addr.pincode}</p>
                              </div>
                           </div>
                           
                           <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button onClick={() => { setEditingAddress(addr); setShowAddressModal(true); }} className="p-2.5 bg-gray-50 text-gray-600 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition"><Edit3 size={18}/></button>
                              <button onClick={() => handleDeleteAddress(addr.id)} className="p-2.5 bg-gray-50 text-gray-600 rounded-xl hover:bg-red-50 hover:text-red-600 transition"><Trash2 size={18}/></button>
                           </div>
                        </motion.div>
                     ))
                  )}
               </div>

               {/* Danger Zone */}
               <div className="mt-8 pt-6 border-t border-gray-200">
                  <button onClick={() => setShowDeleteConfirm(true)} className="text-xs font-bold text-red-500 hover:text-red-700 flex items-center gap-2 uppercase tracking-widest opacity-60 hover:opacity-100 transition">
                     <AlertTriangle size={14}/> Delete My Account
                  </button>
               </div>
            </motion.div>

         </div>
      </div>

      {/* --- MODALS --- */}
      <AddressModal show={showAddressModal} onClose={() => setShowAddressModal(false)} initialData={editingAddress} onSubmit={handleAddressSubmit} />
      <ConfirmModal show={showDeleteConfirm} onClose={() => setShowDeleteConfirm(false)} title="Delete Account?" description="This action is permanent and cannot be undone." onConfirm={async () => { await deleteUser(user.id); logout(); }} />
    
    </div>
  );
}