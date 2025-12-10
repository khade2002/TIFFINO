// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import toast from "react-hot-toast";
// import { useAuth } from "../../context/AuthContext";

// import {
//   getUserByEmail,
//   getAllAddresses,
//   addAddress,
//   updateAddress,
//   deleteAddress,
//   updateUser,
//   deleteUser,
//   getSubscriptionReview,      // GET /subscri/subscriptions/user/{subscriptionid}/review
//   renewSubscription,          // PUT /subscri/subscriptions/{subscriptionid}/renew
//   deleteSubscriptionById,     // DELETE /subscri/subscriptions/{subscriptionid}
// } from "../../api/api";

// import {
//   User,
//   Mail,
//   Phone,
//   MapPin,
//   Plus,
//   Edit2,
//   Trash2,
//   Home,
//   ShieldCheck,
//   Clock,
//   Sparkles,
//   ArrowRightCircle,
//   X,
//   RefreshCcw,
// } from "lucide-react";

// import "@fontsource/playfair-display";
// import "@fontsource/inter";

// // ===========================
// // Address Modal
// // ===========================
// const AddressModal = ({ show, onClose, onSubmit, initialData }) => {
//   const [form, setForm] = useState(
//     initialData || {
//       flatNoOrBuildingName: "",
//       street: "",
//       landmark: "",
//       city: "",
//       state: "",
//       pincode: "",
//       type: "Home",
//     }
//   );

//   useEffect(() => {
//     setForm(
//       initialData || {
//         flatNoOrBuildingName: "",
//         street: "",
//         landmark: "",
//         city: "",
//         state: "",
//         pincode: "",
//         type: "Home",
//       }
//     );
//   }, [initialData]);

//   if (!show) return null;

//   const handleChange = (e) => {
//     setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
//     >
//       <motion.div
//         initial={{ scale: 0.92, y: 20 }}
//         animate={{ scale: 1, y: 0 }}
//         transition={{ type: "spring", stiffness: 280 }}
//         className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl relative"
//       >
//         <button
//           onClick={onClose}
//           className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
//         >
//           <X className="w-5 h-5" />
//         </button>

//         <h3 className="text-lg font-semibold mb-4">
//           {initialData ? "Edit Address" : "Add New Address"}
//         </h3>

//         <div className="space-y-3 text-sm">
//           <input
//             name="flatNoOrBuildingName"
//             value={form.flatNoOrBuildingName}
//             onChange={handleChange}
//             placeholder="Flat / Building"
//             className="w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E23744]/40"
//           />
//           <input
//             name="street"
//             value={form.street}
//             onChange={handleChange}
//             placeholder="Street"
//             className="w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E23744]/40"
//           />
//           <input
//             name="landmark"
//             value={form.landmark}
//             onChange={handleChange}
//             placeholder="Landmark (optional)"
//             className="w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E23744]/40"
//           />
//           <div className="grid grid-cols-2 gap-3">
//             <input
//               name="city"
//               value={form.city}
//               onChange={handleChange}
//               placeholder="City"
//               className="rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E23744]/40"
//             />
//             <input
//               name="state"
//               value={form.state}
//               onChange={handleChange}
//               placeholder="State"
//               className="rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E23744]/40"
//             />
//           </div>
//           <div className="flex items-center gap-3">
//             <input
//               name="pincode"
//               value={form.pincode}
//               onChange={handleChange}
//               placeholder="Pincode"
//               className="rounded-xl border px-3 py-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-[#E23744]/40"
//             />
//             <select
//               name="type"
//               value={form.type}
//               onChange={handleChange}
//               className="rounded-xl border px-3 py-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-[#E23744]/40"
//             >
//               <option>Home</option>
//               <option>Work</option>
//               <option>Other</option>
//             </select>
//           </div>
//         </div>

//         <div className="mt-5 flex justify-end gap-3">
//           <button
//             onClick={onClose}
//             className="rounded-xl bg-gray-100 px-4 py-2 text-sm hover:bg-gray-200"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={() => onSubmit(form)}
//             className="rounded-xl bg-[#E23744] px-4 py-2 text-sm text-white hover:bg-[#c62d38]"
//           >
//             Save
//           </button>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// };

// // ===========================
// // Confirm Modal
// // ===========================
// const ConfirmModal = ({ show, onClose, onConfirm, title, description }) => {
//   if (!show) return null;
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
//       <motion.div
//         initial={{ scale: 0.95, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
//       >
//         <h3 className="text-lg font-semibold mb-2">{title}</h3>
//         <p className="text-sm text-gray-600 mb-4">{description}</p>

//         <div className="flex justify-end gap-3">
//           <button
//             onClick={onClose}
//             className="rounded-xl bg-gray-100 px-4 py-2 text-sm"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={onConfirm}
//             className="rounded-xl bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
//           >
//             Confirm
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// // ===========================
// // MAIN PROFILE COMPONENT
// // ===========================
// export default function Profile() {
//   const { user: authUser, logout } = useAuth();

//   const [user, setUser] = useState(null);
//   const [addresses, setAddresses] = useState([]);
//   const [subscription, setSubscription] = useState(null);

//   const [loadingProfile, setLoadingProfile] = useState(true);
//   const [loadingSub, setLoadingSub] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);

//   const [showAddressModal, setShowAddressModal] = useState(false);
//   const [editingAddress, setEditingAddress] = useState(null);
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

//   const [profilePic, setProfilePic] = useState(null);

//   // ===========================
//   // LOAD SUBSCRIPTION
//   // ===========================
//   const loadSubscription = async (subscriptionId) => {
//     if (!subscriptionId) {
//       setSubscription(null);
//       return;
//     }
//     try {
//       setLoadingSub(true);
//       const res = await getSubscriptionReview(subscriptionId);
//       setSubscription(res.data);
//     } catch (err) {
//       console.error("loadSubscription error:", err);
//       setSubscription(null);
//     } finally {
//       setLoadingSub(false);
//     }
//   };

//   // ===========================
//   // LOAD PROFILE (user + addresses + subscription)
//   // ===========================
//   const loadProfile = async () => {
//     try {
//       setLoadingProfile(true);

//       // 1) User by email
//       const uRes = await getUserByEmail(authUser.email);
//       const backendUser = uRes.data;

//       // Normalize phone/mobile for frontend
//       const normalizedUser = {
//         ...backendUser,
//         phone: backendUser.mobile ?? backendUser.phone ?? "",
//       };
//       setUser(normalizedUser);

//       // 2) Addresses
//       const aRes = await getAllAddresses();
//       setAddresses(aRes.data || []);

//       // 3) Profile pic per user
//       if (backendUser.id) {
//         const key = `profilePic_${backendUser.id}`;
//         const storedPic = localStorage.getItem(key);
//         if (storedPic) setProfilePic(storedPic);
//       }

//       // 4) Subscription by activeSubscriptionId
//       const activeSubId = localStorage.getItem("activeSubscriptionId");
//       if (activeSubId) {
//         await loadSubscription(activeSubId);
//       } else {
//         setSubscription(null);
//       }
//     } catch (err) {
//       console.error("loadProfile error:", err);
//       toast.error("Failed to load profile");
//     } finally {
//       setLoadingProfile(false);
//     }
//   };

//   useEffect(() => {
//     if (!authUser?.email) return;
//     loadProfile();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [authUser]);

//   // ===========================
//   // PROFILE PICTURE CHANGE
//   // ===========================
//   const handleProfilePicChange = (e) => {
//     if (!user?.id) return;
//     const file = e.target.files?.[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       const data = reader.result;
//       setProfilePic(data);
//       const key = `profilePic_${user.id}`;
//       localStorage.setItem(key, data);
//       toast.success("Profile picture updated");
//     };
//     reader.readAsDataURL(file);
//   };

//   // ===========================
//   // SAVE USER
//   // ===========================
//   const handleSaveUser = async () => {
//     if (!user) return;
//     try {
//       const payload = {
//         name: user.name,
//         email: user.email,
//         mobile: user.phone,
//       };
//       const res = await updateUser(user.id, payload);
//       const updated = res.data || { ...user, ...payload };
//       setUser({
//         ...updated,
//         phone: updated.mobile ?? updated.phone ?? "",
//       });
//       toast.success("Profile updated");
//       setIsEditing(false);
//     } catch (err) {
//       console.error("updateUser error:", err);
//       toast.error(
//         err?.response?.data || "Failed to update profile"
//       );
//     }
//   };

//   // ===========================
//   // DELETE PROFILE
//   // ===========================
//   const handleDeleteProfile = async () => {
//     if (!user) return;
//     try {
//       await deleteUser(user.id);
//       toast.success("Profile deleted. Logging out...");
//       await logout();
//     } catch (err) {
//       console.error("deleteUser error:", err);
//       toast.error(
//         err?.response?.data || "Failed to delete profile"
//       );
//     }
//   };

//   // ===========================
//   // ADDRESS SAVE
//   // ===========================
//   const handleSaveAddress = async (form) => {
//     try {
//       if (editingAddress) {
//         const res = await updateAddress(editingAddress.id, form);
//         setAddresses((prev) =>
//           prev.map((a) => (a.id === editingAddress.id ? res.data : a))
//         );
//         toast.success("Address updated");
//       } else {
//         const res = await addAddress(form);
//         setAddresses((prev) => [...prev, res.data]);
//         toast.success("Address added");
//       }
//       setShowAddressModal(false);
//       setEditingAddress(null);
//     } catch (err) {
//       console.error("address save error:", err);
//       toast.error(
//         err?.response?.data || "Failed to save address"
//       );
//     }
//   };

//   // ===========================
//   // ADDRESS DELETE
//   // ===========================
//   const handleDeleteAddress = async (id) => {
//     try {
//       await deleteAddress(id);
//       setAddresses((prev) => prev.filter((a) => a.id !== id));
//       toast.success("Address deleted");
//     } catch (err) {
//       console.error("deleteAddress error:", err);
//       toast.error("Failed to delete address");
//     }
//   };

//   // ===========================
//   // SUBSCRIPTION - RENEW
//   // ===========================
//   const handleRenewSubscription = async () => {
//     if (!subscription) return;
//     try {
//       const planType = (subscription.planType || "").toUpperCase();
//       const durationInDays =
//         planType === "DAILY"
//           ? 1
//           : planType === "WEEKLY"
//           ? 7
//           : planType === "MONTHLY"
//           ? 28
//           : planType === "QUARTERLY"
//           ? 90
//           : 7;

//       setLoadingSub(true);
//       await renewSubscription(subscription.subscriptionid, {
//         durationInDays,
//       });
//       toast.success("Subscription renewed");
//       await loadSubscription(subscription.subscriptionid);
//     } catch (err) {
//       console.error("renewSubscription error:", err);
//       toast.error("Failed to renew subscription");
//     } finally {
//       setLoadingSub(false);
//     }
//   };

//   // ===========================
//   // SUBSCRIPTION - CANCEL
//   // ===========================
//   const handleCancelSubscription = async () => {
//     if (!subscription) return;
//     try {
//       setLoadingSub(true);
//       await deleteSubscriptionById(subscription.subscriptionid);
//       localStorage.removeItem("activeSubscriptionId");
//       setSubscription(null);
//       toast.success("Subscription cancelled");
//     } catch (err) {
//       console.error("cancelSubscription error:", err);
//       toast.error("Failed to cancel subscription");
//     } finally {
//       setLoadingSub(false);
//     }
//   };

//   // ===========================
//   // LOADING STATE
//   // ===========================
//   if (loadingProfile) {
//     return (
//       <div className="min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-white via-red-50/30 to-white">
//         <div className="flex flex-col items-center gap-3">
//           <div className="h-10 w-10 border-2 border-[#E23744] border-t-transparent rounded-full animate-spin" />
//           <p className="text-sm text-gray-600">Loading your profile...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!user) {
//     return (
//       <div className="min-h-[70vh] flex items-center justify-center">
//         <p className="text-gray-600">Unable to load profile.</p>
//       </div>
//     );
//   }

//   // ===========================
//   // MAIN UI
//   // ===========================
//   return (
//     <>
//       <div className="min-h-screen bg-gradient-to-br from-white via-red-50/30 to-white px-4 py-6 md:px-8 md:py-10 flex justify-center">
//         <motion.div
//           initial={{ opacity: 0, y: 16 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.45 }}
//           className="w-full max-w-6xl rounded-3xl bg-white/90 backdrop-blur-md p-5 md:p-8 shadow-2xl border border-red-100/60"
//         >
//           {/* HEADER */}
//           <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 mb-8">
//             {/* Avatar + buttons */}
//             <div className="flex flex-col items-center lg:items-start gap-4 lg:w-1/3">
//               <motion.div
//                 initial={{ scale: 0.9 }}
//                 animate={{ scale: 1 }}
//                 className="relative"
//               >
//                 <img
//                   className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border-4 border-[#E23744]/80 shadow-xl"
//                   src={
//                     profilePic ||
//                     "https://cdn-icons-png.flaticon.com/512/149/149071.png"
//                   }
//                   alt="profile"
//                 />
//                 {isEditing && (
//                   <label className="absolute bottom-0 right-0 rounded-full bg-white shadow px-2 py-1 text-[11px] cursor-pointer flex items-center gap-1">
//                     <Edit2 className="w-3 h-3" />
//                     Edit
//                     <input
//                       type="file"
//                       accept="image/*"
//                       className="hidden"
//                       onChange={handleProfilePicChange}
//                     />
//                   </label>
//                 )}
//               </motion.div>

//               <div className="flex flex-wrap justify-center lg:justify-start gap-3">
//                 <button
//                   onClick={() => setIsEditing((v) => !v)}
//                   className="inline-flex items-center gap-2 rounded-full bg-[#E23744] px-4 py-2 text-xs md:text-sm text-white font-medium shadow hover:bg-[#c62d38]"
//                 >
//                   <Edit2 className="w-3 h-3" />
//                   {isEditing ? "Cancel Edit" : "Edit Profile"}
//                 </button>

//                 <button
//                   onClick={() => setShowDeleteConfirm(true)}
//                   className="inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-xs md:text-sm text-white font-medium shadow hover:bg-red-700"
//                 >
//                   <Trash2 className="w-3 h-3" />
//                   Delete Profile
//                 </button>
//               </div>
//             </div>

//             {/* Basic info */}
//             <div className="flex-1">
//               <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E23744]/10 text-[#E23744] text-xs font-semibold mb-3">
//                 <Sparkles className="w-4 h-4" />
//                 Tiffino Account
//               </div>

//               <h2 className="text-2xl md:text-3xl font-bold font-['Playfair_Display'] mb-1">
//                 {user.name || "Guest User"}
//               </h2>
//               <p className="text-sm text-gray-600 mb-4">
//                 Manage your personal details, addresses and active subscription.
//               </p>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
//                 <div className="flex items-center gap-2">
//                   <Mail className="w-4 h-4 text-[#E23744]" />
//                   <span>{user.email}</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Phone className="w-4 h-4 text-[#E23744]" />
//                   <input
//                     value={user.phone}
//                     disabled={!isEditing}
//                     onChange={(e) =>
//                       setUser((s) => ({ ...s, phone: e.target.value }))
//                     }
//                     className={`border rounded-full px-3 py-1.5 w-full ${
//                       isEditing
//                         ? "bg-white border-gray-300"
//                         : "bg-gray-100 border-gray-200"
//                     }`}
//                   />
//                 </div>
//               </div>

//               {isEditing && (
//                 <div className="mt-4 flex justify-end">
//                   <button
//                     onClick={handleSaveUser}
//                     className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2 text-sm text-white font-semibold shadow hover:bg-emerald-700"
//                   >
//                     <ShieldCheck className="w-4 h-4" />
//                     Save Changes
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* CONTENT GRID: Addresses + Subscription */}
//           <div className="grid lg:grid-cols-2 gap-6 lg:gap-7">
//             {/* ADDRESSES CARD */}
//             <motion.div
//               initial={{ opacity: 0, y: 16 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.05, duration: 0.4 }}
//               className="rounded-2xl bg-white border border-gray-100 shadow-sm p-5"
//             >
//               <div className="flex items-center justify-between mb-4">
//                 <div className="flex items-center gap-2">
//                   <MapPin className="w-5 h-5 text-[#E23744]" />
//                   <h4 className="text-base md:text-lg font-semibold">
//                     Saved Addresses
//                   </h4>
//                 </div>

//                 <button
//                   onClick={() => {
//                     setEditingAddress(null);
//                     setShowAddressModal(true);
//                   }}
//                   className="inline-flex items-center gap-1 rounded-full bg-[#E23744] px-3 py-1.5 text-xs md:text-sm text-white hover:bg-[#c62d38]"
//                 >
//                   <Plus className="w-3 h-3" />
//                   Add
//                 </button>
//               </div>

//               {addresses.length === 0 && (
//                 <p className="text-sm text-gray-600">
//                   No saved addresses. Add one to make checkout faster.
//                 </p>
//               )}

//               <div className="space-y-3">
//                 {addresses.map((a) => (
//                   <motion.div
//                     key={a.id}
//                     initial={{ opacity: 0, y: 8 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className="rounded-xl border border-gray-200 bg-gray-50/80 p-4 flex justify-between gap-3"
//                   >
//                     <div className="text-sm">
//                       <div className="flex items-center gap-1 mb-1">
//                         <Home className="w-3 h-3 text-gray-500" />
//                         <span className="font-semibold">{a.type} Address</span>
//                       </div>
//                       <p>{a.flatNoOrBuildingName}</p>
//                       <p>{a.street}</p>
//                       {a.landmark && <p>{a.landmark}</p>}
//                       <p>
//                         {a.city}, {a.state} - {a.pincode}
//                       </p>
//                     </div>

//                     <div className="flex flex-col items-end gap-2 text-xs">
//                       <button
//                         onClick={() => {
//                           setEditingAddress(a);
//                           setShowAddressModal(true);
//                         }}
//                         className="inline-flex items-center gap-1 rounded-full bg-yellow-500 px-3 py-1 text-white hover:bg-yellow-600"
//                       >
//                         <Edit2 className="w-3 h-3" />
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDeleteAddress(a.id)}
//                         className="inline-flex items-center gap-1 rounded-full bg-red-600 px-3 py-1 text-white hover:bg-red-700"
//                       >
//                         <Trash2 className="w-3 h-3" />
//                         Delete
//                       </button>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             </motion.div>

//             {/* SUBSCRIPTION CARD */}
//             <motion.div
//               initial={{ opacity: 0, y: 16 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.1, duration: 0.4 }}
//               className="rounded-2xl bg-gradient-to-br from-[#E23744]/5 via-white to-amber-50 border border-red-100 shadow-sm p-5"
//             >
//               <div className="flex items-center justify-between mb-4">
//                 <div className="flex items-center gap-2">
//                   <ShieldCheck className="w-5 h-5 text-[#E23744]" />
//                   <h4 className="text-base md:text-lg font-semibold">
//                     Your Subscription
//                   </h4>
//                 </div>

//                 <button
//                   onClick={() => {
//                     const activeSubId =
//                       localStorage.getItem("activeSubscriptionId");
//                     if (!activeSubId) {
//                       toast("No active subscription found.", {
//                         icon: "ℹ️",
//                       });
//                       return;
//                     }
//                     loadSubscription(activeSubId);
//                   }}
//                   className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs md:text-sm text-gray-700 border border-gray-200 hover:bg-gray-50"
//                 >
//                   <RefreshCcw className="w-3 h-3" />
//                   Refresh
//                 </button>
//               </div>

//               {loadingSub ? (
//                 <div className="py-6 flex flex-col items-center gap-2">
//                   <div className="h-6 w-6 border-2 border-[#E23744] border-t-transparent rounded-full animate-spin" />
//                   <p className="text-xs text-gray-500">Loading subscription...</p>
//                 </div>
//               ) : !localStorage.getItem("activeSubscriptionId") ? (
//                 <div className="text-sm text-gray-600">
//                   You don&apos;t have any active subscription.{" "}
//                   <span className="font-semibold text-[#E23744]">
//                     Go to Subscription page to activate one.
//                   </span>
//                 </div>
//               ) : !subscription ? (
//                 <div className="text-sm text-gray-600">
//                   No subscription details found. It may have expired or been
//                   removed.
//                 </div>
//               ) : (
//                 <motion.div
//                   initial={{ opacity: 0, y: 6 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className="rounded-2xl bg-white/90 p-4 border border-red-100 shadow-sm"
//                 >
//                   {/* Header */}
//                   <div className="flex items-start justify-between mb-3">
//                     <div>
//                       <p className="text-xs text-gray-500 mb-1">
//                         Plan Type
//                       </p>
//                       <p className="text-lg font-bold text-[#E23744]">
//                         {subscription.planType || "Subscription"}
//                       </p>
//                       <p className="text-xs text-gray-500 mt-1">
//                         Subscription ID:{" "}
//                         <span className="font-mono text-[11px]">
//                           {subscription.subscriptionid}
//                         </span>
//                       </p>
//                     </div>

//                     <div className="text-right text-xs text-gray-600">
//                       <p className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 mb-1">
//                         <ShieldCheck className="w-3 h-3" />
//                         {subscription.status}
//                       </p>
//                       <p className="flex items-center gap-1 justify-end">
//                         <Clock className="w-3 h-3 text-[#E23744]" />
//                         {subscription.startDate} – {subscription.endDate}
//                       </p>
//                     </div>
//                   </div>

//                   {/* Stats */}
//                   <div className="grid grid-cols-2 gap-3 text-sm mb-3">
//                     <div className="rounded-xl bg-gray-50 p-3 border border-gray-100">
//                       <p className="text-xs text-gray-500">Discount</p>
//                       <p className="font-semibold text-emerald-600">
//                         {subscription.discountPercentage}% OFF
//                       </p>
//                     </div>
//                     <div className="rounded-xl bg-gray-50 p-3 border border-gray-100">
//                       <p className="text-xs text-gray-500">Delivery</p>
//                       <p className="font-semibold text-[#E23744]">
//                         {subscription.freeDelivery
//                           ? "Free Delivery"
//                           : "Normal Charges"}
//                       </p>
//                     </div>
//                     <div className="rounded-xl bg-gray-50 p-3 border border-gray-100">
//                       <p className="text-xs text-gray-500">Frequency</p>
//                       <p className="font-semibold">
//                         {subscription.frequency || "-"}
//                       </p>
//                     </div>
//                     <div className="rounded-xl bg-gray-50 p-3 border border-gray-100">
//                       <p className="text-xs text-gray-500">Plan ID</p>
//                       <p className="font-semibold">
//                         {subscription.planId || "-"}
//                       </p>
//                     </div>
//                   </div>

//                   {/* Allergies */}
//                   {subscription.allergies &&
//                     subscription.allergies.length > 0 && (
//                       <div className="mb-3">
//                         <p className="text-xs font-semibold text-gray-600 mb-1">
//                           Allergies:
//                         </p>
//                         <div className="flex flex-wrap gap-2">
//                           {subscription.allergies.map((al, idx) => (
//                             <span
//                               key={idx}
//                               className="px-2 py-1 text-[11px] rounded-full bg-red-50 text-[#E23744] border border-red-100"
//                             >
//                               {al}
//                             </span>
//                           ))}
//                         </div>
//                       </div>
//                     )}

//                   {/* Info note */}
//                   <p className="text-[11px] text-gray-500 mb-3 leading-relaxed">
//                     While placing orders, your active{" "}
//                     <span className="font-semibold">subscriptionId</span> is{" "}
//                     <span className="font-semibold">
//                       {subscription.subscriptionid}
//                     </span>
//                     . Backend automatically applies{" "}
//                     <span className="font-semibold">
//                       discount + free delivery
//                     </span>{" "}
//                     using:
//                     <code className="ml-1 bg-gray-100 px-2 py-0.5 rounded text-[10px]">
//                       POST /subscri/orders/from-subscription/
//                       {"{subscriptionId}"}
//                     </code>
//                     .
//                   </p>

//                   {/* Actions */}
//                   <div className="flex flex-col sm:flex-row gap-3">
//                     <button
//                       disabled={loadingSub}
//                       onClick={handleRenewSubscription}
//                       className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#E23744] px-4 py-2 text-xs md:text-sm text-white font-semibold hover:bg-[#c62d38] disabled:opacity-60"
//                     >
//                       <RefreshCcw className="w-4 h-4" />
//                       {loadingSub ? "Processing..." : "Renew Subscription"}
//                     </button>
//                     <button
//                       disabled={loadingSub}
//                       onClick={handleCancelSubscription}
//                       className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-red-600 px-4 py-2 text-xs md:text-sm text-white font-semibold hover:bg-red-700 disabled:opacity-60"
//                     >
//                       <X className="w-4 h-4" />
//                       Cancel Subscription
//                     </button>
//                   </div>
//                 </motion.div>
//               )}
//             </motion.div>
//           </div>

//           {/* FOOTNOTE */}
//           <div className="mt-6 text-[11px] text-gray-500 flex items-center gap-1">
//             <ArrowRightCircle className="w-3 h-3" />
//             All changes are saved securely. Need help? Contact Tiffino support.
//           </div>
//         </motion.div>
//       </div>

//       {/* ADDRESS MODAL */}
//       <AddressModal
//         show={showAddressModal}
//         onClose={() => {
//           setShowAddressModal(false);
//           setEditingAddress(null);
//         }}
//         initialData={editingAddress}
//         onSubmit={handleSaveAddress}
//       />

//       {/* DELETE PROFILE CONFIRM */}
//       <ConfirmModal
//         show={showDeleteConfirm}
//         onClose={() => setShowDeleteConfirm(false)}
//         title="Delete Profile"
//         description="This will permanently delete your account and all related data. You will be logged out. Are you sure?"
//         onConfirm={() => {
//           setShowDeleteConfirm(false);
//           handleDeleteProfile();
//         }}
//       />
//     </>
//   );
// }






// import { useEffect, useState, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import toast from "react-hot-toast";
// import { useAuth } from "../../context/AuthContext";

// import {
//   getUserByEmail,
//   getAllAddresses,
//   addAddress,
//   updateAddress,
//   deleteAddress,
//   updateUser,
//   deleteUser,
//   getSubscriptionReview,
//   renewSubscription,
//   deleteSubscriptionById,
// } from "../../api/api";

// import {
//   User,
//   Mail,
//   Phone,
//   MapPin,
//   Plus,
//   Edit2,
//   Trash2,
//   Home,
//   Briefcase,
//   ShieldCheck,
//   Clock,
//   Sparkles,
//   Camera,
//   LogOut,
//   CreditCard,
//   X,
//   Check,
//   AlertTriangle
// } from "lucide-react";

// /* =====================================================================
//    🎨 ANIMATION VARIANTS
//    ===================================================================== */
// const modalVariants = {
//   hidden: { opacity: 0, scale: 0.95 },
//   visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 25 } },
//   exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
// };

// /* =====================================================================
//    🏙️ COMPONENT: ADDRESS MODAL
//    ===================================================================== */
// const AddressModal = ({ show, onClose, onSubmit, initialData }) => {
//   const [form, setForm] = useState({
//     flatNoOrBuildingName: "", street: "", landmark: "", city: "", state: "", pincode: "", type: "Home",
//   });

//   useEffect(() => {
//     if (initialData) setForm(initialData);
//     else setForm({ flatNoOrBuildingName: "", street: "", landmark: "", city: "", state: "", pincode: "", type: "Home" });
//   }, [initialData, show]);

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   return (
//     <AnimatePresence>
//       {show && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
//           <motion.div
//             variants={modalVariants}
//             initial="hidden" animate="visible" exit="exit"
//             className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
//           >
//             <div className="bg-gray-900 px-6 py-4 flex justify-between items-center text-white">
//               <h3 className="text-lg font-bold flex items-center gap-2">
//                 <MapPin size={18} className="text-red-500" /> {initialData ? "Edit Address" : "Add New Address"}
//               </h3>
//               <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition"><X size={20}/></button>
//             </div>
            
//             <div className="p-6 space-y-4">
//               <div className="grid grid-cols-2 gap-4">
//                  <div className="col-span-2">
//                     <label className="text-xs font-bold text-gray-500 uppercase">Flat / Building</label>
//                     <input name="flatNoOrBuildingName" value={form.flatNoOrBuildingName} onChange={handleChange} className="w-full border-b-2 border-gray-200 py-2 focus:border-red-500 outline-none transition-colors bg-transparent" placeholder="e.g. A-402, Green Valley" />
//                  </div>
//                  <div className="col-span-2">
//                     <label className="text-xs font-bold text-gray-500 uppercase">Street / Area</label>
//                     <input name="street" value={form.street} onChange={handleChange} className="w-full border-b-2 border-gray-200 py-2 focus:border-red-500 outline-none transition-colors bg-transparent" placeholder="e.g. MG Road, Indiranagar" />
//                  </div>
//                  <div>
//                     <label className="text-xs font-bold text-gray-500 uppercase">City</label>
//                     <input name="city" value={form.city} onChange={handleChange} className="w-full border-b-2 border-gray-200 py-2 focus:border-red-500 outline-none transition-colors bg-transparent" placeholder="e.g. Bangalore" />
//                  </div>
//                  <div>
//                     <label className="text-xs font-bold text-gray-500 uppercase">Pincode</label>
//                     <input name="pincode" value={form.pincode} onChange={handleChange} className="w-full border-b-2 border-gray-200 py-2 focus:border-red-500 outline-none transition-colors bg-transparent" placeholder="e.g. 560038" />
//                  </div>
//                  <div>
//                     <label className="text-xs font-bold text-gray-500 uppercase">State</label>
//                     <input name="state" value={form.state} onChange={handleChange} className="w-full border-b-2 border-gray-200 py-2 focus:border-red-500 outline-none transition-colors bg-transparent" placeholder="e.g. Karnataka" />
//                  </div>
//                  <div>
//                     <label className="text-xs font-bold text-gray-500 uppercase">Type</label>
//                     <select name="type" value={form.type} onChange={handleChange} className="w-full border-b-2 border-gray-200 py-2 focus:border-red-500 outline-none bg-transparent cursor-pointer">
//                        <option>Home</option>
//                        <option>Work</option>
//                        <option>Other</option>
//                     </select>
//                  </div>
//               </div>
//               <button onClick={() => onSubmit(form)} className="w-full py-3.5 bg-red-600 text-white font-bold rounded-xl shadow-lg hover:bg-red-700 transition-all mt-4">
//                  Save Address
//               </button>
//             </div>
//           </motion.div>
//         </div>
//       )}
//     </AnimatePresence>
//   );
// };

// /* =====================================================================
//    ⚠️ COMPONENT: CONFIRM MODAL
//    ===================================================================== */
// const ConfirmModal = ({ show, onClose, onConfirm, title, description }) => {
//   return (
//     <AnimatePresence>
//       {show && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
//           <motion.div
//             variants={modalVariants}
//             initial="hidden" animate="visible" exit="exit"
//             className="w-full max-w-sm bg-white rounded-3xl p-6 text-center shadow-2xl"
//           >
//             <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
//                <AlertTriangle size={32} />
//             </div>
//             <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
//             <p className="text-sm text-gray-500 mb-6 leading-relaxed">{description}</p>
//             <div className="flex gap-3">
//               <button onClick={onClose} className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition">Cancel</button>
//               <button onClick={onConfirm} className="flex-1 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition shadow-lg shadow-red-200">Confirm</button>
//             </div>
//           </motion.div>
//         </div>
//       )}
//     </AnimatePresence>
//   );
// };

// /* =====================================================================
//    🚀 MAIN PAGE: PROFILE DASHBOARD
//    ===================================================================== */
// export default function Profile() {
//   const { user: authUser, logout } = useAuth();
  
//   // -- State --
//   const [user, setUser] = useState(null);
//   const [addresses, setAddresses] = useState([]);
//   const [subscription, setSubscription] = useState(null);
//   const [profilePic, setProfilePic] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
  
//   // -- Modals & Loaders --
//   const [loading, setLoading] = useState(true);
//   const [subLoading, setSubLoading] = useState(false);
//   const [showAddressModal, setShowAddressModal] = useState(false);
//   const [editingAddress, setEditingAddress] = useState(null);
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//   const fileInputRef = useRef(null);

//   // --- 1. DATA LOADING ---
//   const loadProfile = async () => {
//     try {
//       setLoading(true);
//       // User
//       const uRes = await getUserByEmail(authUser.email);
//       const userData = uRes.data;
//       setUser({ ...userData, phone: userData.mobile || userData.phone || "" });
      
//       // Addresses
//       const aRes = await getAllAddresses();
//       setAddresses(aRes.data || []);

//       // Pic
//       if (userData.id) {
//          const storedPic = localStorage.getItem(`profilePic_${userData.id}`);
//          if (storedPic) setProfilePic(storedPic);
//       }

//       // Subscription
//       const subId = localStorage.getItem("activeSubscriptionId");
//       if (subId) await loadSubscription(subId);
      
//     } catch (err) {
//       toast.error("Could not load profile data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadSubscription = async (id) => {
//      try {
//         setSubLoading(true);
//         const res = await getSubscriptionReview(id);
//         setSubscription(res.data);
//      } catch {
//         setSubscription(null);
//      } finally {
//         setSubLoading(false);
//      }
//   };

//   useEffect(() => {
//     if (authUser?.email) loadProfile();
//   }, [authUser]);

//   // --- 2. HANDLERS ---
//   const handleImageUpload = (e) => {
//      const file = e.target.files[0];
//      if(file) {
//         const reader = new FileReader();
//         reader.onloadend = () => {
//            setProfilePic(reader.result);
//            localStorage.setItem(`profilePic_${user.id}`, reader.result);
//            toast.success("Profile photo updated! 📸");
//         };
//         reader.readAsDataURL(file);
//      }
//   };

//   const handleUpdateProfile = async () => {
//      try {
//         const payload = { name: user.name, email: user.email, mobile: user.phone };
//         await updateUser(user.id, payload);
//         setIsEditing(false);
//         toast.success("Profile updated successfully ✅");
//      } catch (e) { toast.error("Update failed"); }
//   };

//   const handleAddressSubmit = async (formData) => {
//      try {
//         if(editingAddress) {
//            await updateAddress(editingAddress.id, formData);
//            toast.success("Address updated");
//         } else {
//            await addAddress(formData);
//            toast.success("New address added");
//         }
//         const res = await getAllAddresses();
//         setAddresses(res.data);
//         setShowAddressModal(false);
//      } catch { toast.error("Failed to save address"); }
//   };

//   const handleDeleteAddress = async (id) => {
//      try {
//         await deleteAddress(id);
//         setAddresses(prev => prev.filter(a => a.id !== id));
//         toast.success("Address deleted 🗑️");
//      } catch { toast.error("Delete failed"); }
//   };

//   const handleSubAction = async (action) => {
//      if(!subscription) return;
//      setSubLoading(true);
//      try {
//         if(action === 'renew') {
//            const duration = subscription.planType === "MONTHLY" ? 28 : 7; // simplified logic
//            await renewSubscription(subscription.subscriptionid, { durationInDays: duration });
//            toast.success("Subscription Renewed! 🎉");
//            await loadSubscription(subscription.subscriptionid);
//         } else {
//            await deleteSubscriptionById(subscription.subscriptionid);
//            localStorage.removeItem("activeSubscriptionId");
//            setSubscription(null);
//            toast.success("Subscription Cancelled");
//         }
//      } catch { toast.error("Action failed"); }
//      finally { setSubLoading(false); }
//   };

//   if (loading) return (
//      <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="flex flex-col items-center">
//            <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"/>
//            <p className="mt-4 text-gray-500 font-medium">Loading Profile...</p>
//         </div>
//      </div>
//   );

//   return (
//     <div className="min-h-screen bg-[#F3F4F6] font-sans pb-20">
      
//       {/* --- HERO BANNER --- */}
//       <div className="h-64 bg-gradient-to-r from-gray-900 to-gray-800 relative overflow-hidden">
//          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"/>
//          <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-[100px]"/>
//       </div>

//       <div className="max-w-6xl mx-auto px-4 sm:px-8 -mt-32 relative z-10">
         
//          {/* --- PROFILE CARD --- */}
//          <motion.div 
//             initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
//             className="bg-white rounded-[2rem] shadow-xl p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-8"
//          >
//             {/* Avatar Section */}
//             <div className="relative group">
//                <div className="w-36 h-36 rounded-full p-1 bg-gradient-to-tr from-red-500 to-orange-500 shadow-lg">
//                   <img 
//                      src={profilePic || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} 
//                      alt="Profile" 
//                      className="w-full h-full rounded-full object-cover border-4 border-white bg-gray-100"
//                   />
//                </div>
//                <button 
//                   onClick={() => fileInputRef.current.click()}
//                   className="absolute bottom-2 right-2 bg-gray-900 text-white p-2 rounded-full shadow-md hover:scale-110 transition-transform"
//                >
//                   <Camera size={18}/>
//                </button>
//                <input type="file" ref={fileInputRef} className="hidden" onChange={handleImageUpload} accept="image/*"/>
//             </div>

//             {/* User Info */}
//             <div className="flex-1 text-center md:text-left w-full">
//                <div className="flex flex-col md:flex-row justify-between items-center mb-4">
//                   <div>
//                      <h1 className="text-3xl font-extrabold text-gray-900">{user.name}</h1>
//                      <p className="text-gray-500 font-medium flex items-center justify-center md:justify-start gap-1 mt-1">
//                         <Mail size={14}/> {user.email}
//                      </p>
//                   </div>
//                   <div className="flex gap-3 mt-4 md:mt-0">
//                      {isEditing ? (
//                         <button onClick={handleUpdateProfile} className="px-6 py-2 bg-green-600 text-white rounded-full font-bold shadow-lg hover:bg-green-700 transition flex items-center gap-2">
//                            <Check size={16}/> Save
//                         </button>
//                      ) : (
//                         <button onClick={() => setIsEditing(true)} className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full font-bold hover:bg-gray-200 transition flex items-center gap-2">
//                            <Edit2 size={16}/> Edit Profile
//                         </button>
//                      )}
//                   </div>
//                </div>

//                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
//                   <div className="flex flex-col">
//                      <span className="text-xs font-bold text-gray-400 uppercase">Phone Number</span>
//                      {isEditing ? (
//                         <input 
//                            value={user.phone} 
//                            onChange={e => setUser({...user, phone: e.target.value})}
//                            className="bg-white border border-gray-300 rounded px-2 py-1 text-sm outline-none focus:border-red-500"
//                         />
//                      ) : (
//                         <span className="font-semibold text-gray-800">{user.phone || "Not Added"}</span>
//                      )}
//                   </div>
//                   <div className="flex flex-col">
//                      <span className="text-xs font-bold text-gray-400 uppercase">Member Since</span>
//                      <span className="font-semibold text-gray-800">January 2024</span>
//                   </div>
//                </div>
//             </div>
//          </motion.div>

//          {/* --- GRID: SUBSCRIPTION & ADDRESSES --- */}
//          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-8 mt-8">
            
//             {/* 1. SUBSCRIPTION CARD */}
//             <motion.div 
//                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
//                className="flex flex-col gap-6"
//             >
//                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2"><Sparkles className="text-yellow-500"/> Membership</h3>
               
//                {subscription ? (
//                   <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-8 shadow-2xl">
//                      {/* Decor */}
//                      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16"/>
                     
//                      <div className="relative z-10">
//                         <div className="flex justify-between items-start mb-8">
//                            <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-widest border border-white/10">
//                               {subscription.planType} Plan
//                            </div>
//                            <CreditCard className="text-white/50 w-8 h-8"/>
//                         </div>

//                         <div className="space-y-1 mb-8">
//                            <p className="text-sm text-white/60 uppercase tracking-wider">Status</p>
//                            <div className="flex items-center gap-2">
//                               <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse"/>
//                               <span className="text-2xl font-bold tracking-tight">{subscription.status}</span>
//                            </div>
//                         </div>

//                         <div className="grid grid-cols-2 gap-4 mb-8">
//                            <div>
//                               <p className="text-xs text-white/50">Expires On</p>
//                               <p className="font-medium">{subscription.endDate}</p>
//                            </div>
//                            <div>
//                               <p className="text-xs text-white/50">Discount</p>
//                               <p className="font-medium text-yellow-400">{subscription.discountPercentage}% OFF</p>
//                            </div>
//                         </div>

//                         <div className="flex gap-3">
//                            <button onClick={() => handleSubAction('renew')} disabled={subLoading} className="flex-1 py-3 bg-white text-black rounded-xl font-bold hover:bg-gray-200 transition">
//                               {subLoading ? "..." : "Renew"}
//                            </button>
//                            <button onClick={() => handleSubAction('cancel')} disabled={subLoading} className="flex-1 py-3 bg-white/10 text-white border border-white/20 rounded-xl font-bold hover:bg-white/20 transition">
//                               Cancel
//                            </button>
//                         </div>
//                      </div>
//                   </div>
//                ) : (
//                   <div className="bg-white rounded-[2rem] p-8 text-center border-2 border-dashed border-gray-200 flex flex-col items-center justify-center h-full min-h-[300px]">
//                      <div className="w-16 h-16 bg-yellow-50 rounded-full flex items-center justify-center mb-4">
//                         <Sparkles className="text-yellow-500 w-8 h-8"/>
//                      </div>
//                      <h4 className="text-lg font-bold text-gray-900">No Active Membership</h4>
//                      <p className="text-gray-500 text-sm mb-6 max-w-xs">Get free delivery and exclusive discounts with Tiffino Pro.</p>
//                      <a href="/subscription" className="px-8 py-3 bg-gray-900 text-white rounded-xl font-bold shadow-lg hover:scale-105 transition-transform">
//                         View Plans
//                      </a>
//                   </div>
//                )}
//             </motion.div>

//             {/* 2. ADDRESSES CARD */}
//             <motion.div 
//                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
//                className="flex flex-col gap-6"
//             >
//                <div className="flex justify-between items-center">
//                   <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2"><MapPin className="text-red-500"/> Saved Addresses</h3>
//                   <button 
//                      onClick={() => { setEditingAddress(null); setShowAddressModal(true); }}
//                      className="flex items-center gap-1 text-sm font-bold text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg transition"
//                   >
//                      <Plus size={16}/> Add New
//                   </button>
//                </div>

//                <div className="grid gap-4">
//                   {addresses.length === 0 ? (
//                      <div className="text-center py-10 bg-white rounded-3xl border border-gray-100">
//                         <p className="text-gray-400">No addresses saved yet.</p>
//                      </div>
//                   ) : (
//                      addresses.map(addr => (
//                         <div key={addr.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-start hover:shadow-md transition-shadow group">
//                            <div className="flex gap-4">
//                               <div className="mt-1 p-2 bg-gray-50 rounded-lg text-gray-600">
//                                  {addr.type === 'Work' ? <Briefcase size={20}/> : <Home size={20}/>}
//                               </div>
//                               <div>
//                                  <div className="flex items-center gap-2 mb-1">
//                                     <span className="font-bold text-gray-900">{addr.type}</span>
//                                     <span className="px-2 py-0.5 rounded bg-gray-100 text-[10px] font-bold text-gray-500 uppercase tracking-wide">Default</span>
//                                  </div>
//                                  <p className="text-sm text-gray-600 font-medium">{addr.flatNoOrBuildingName}, {addr.street}</p>
//                                  <p className="text-xs text-gray-400 mt-0.5">{addr.city}, {addr.state} - {addr.pincode}</p>
//                               </div>
//                            </div>
                           
//                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
//                               <button onClick={() => { setEditingAddress(addr); setShowAddressModal(true); }} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"><Edit2 size={16}/></button>
//                               <button onClick={() => handleDeleteAddress(addr.id)} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"><Trash2 size={16}/></button>
//                            </div>
//                         </div>
//                      ))
//                   )}
//                </div>

//                {/* Danger Zone */}
//                <div className="mt-8 border-t border-gray-200 pt-6">
//                   <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Danger Zone</h4>
//                   <button 
//                      onClick={() => setShowDeleteConfirm(true)}
//                      className="flex items-center gap-2 text-red-600 text-sm font-bold hover:bg-red-50 px-4 py-2 rounded-xl transition w-fit"
//                   >
//                      <LogOut size={16}/> Delete Account
//                   </button>
//                </div>
//             </motion.div>

//          </div>
//       </div>

//       {/* --- MODALS --- */}
//       <AddressModal 
//          show={showAddressModal} onClose={() => setShowAddressModal(false)}
//          initialData={editingAddress} onSubmit={handleAddressSubmit}
//       />
//       <ConfirmModal 
//          show={showDeleteConfirm} onClose={() => setShowDeleteConfirm(false)}
//          title="Delete Account?" description="This action cannot be undone. All your data including order history will be lost."
//          onConfirm={async () => {
//             await deleteUser(user.id);
//             logout();
//          }}
//       />
//     </div>
//   );
// }






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