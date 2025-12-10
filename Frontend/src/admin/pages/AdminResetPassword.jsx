// // src/admin/pages/AdminResetPassword.jsx
// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import {
//   Lock,
//   ArrowLeft,
//   KeyRound,
//   ShieldCheck,
//   Eye,
//   EyeOff,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import { adminResetPassword } from "../../api/api";

// export default function AdminResetPassword() {
//   const [form, setForm] = useState({
//     oldPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   });

//   const [show, setShow] = useState({
//     old: false,
//     new: false,
//     confirm: false,
//   });

//   const [busy, setBusy] = useState(false);
//   const nav = useNavigate();

//   const submit = async (e) => {
//     e.preventDefault();

//     if (!form.oldPassword || !form.newPassword || !form.confirmPassword)
//       return toast.error("All fields required");

//     if (form.newPassword !== form.confirmPassword)
//       return toast.error("New & confirm must match");

//     setBusy(true);
//     try {
//       await adminResetPassword(form);
//       toast.success("Password updated successfully");
//       nav("/admin/dashboard");
//     } catch (err) {
//       toast.error(err?.response?.data || "Reset failed");
//     } finally {
//       setBusy(false);
//     }
//   };

//   return (
//     <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-red-50/40 to-gray-50/60 px-4">

//       {/* Floating animated blobs */}
//       <motion.div
//         className="absolute top-20 left-10 w-72 h-72 bg-[#E23744]/20 rounded-full blur-3xl"
//         animate={{ y: [0, -32, 0], opacity: [0.3, 0.55, 0.3] }}
//         transition={{ duration: 12, repeat: Infinity }}
//       />
//       <motion.div
//         className="absolute bottom-20 right-10 w-72 h-72 bg-[#E23744]/25 rounded-full blur-3xl"
//         animate={{ y: [0, 30, 0], opacity: [0.4, 0.7, 0.4] }}
//         transition={{ duration: 14, repeat: Infinity }}
//       />

//       {/* Card */}
//       <motion.div
//         initial={{ opacity: 0, y: 50, scale: 0.92 }}
//         animate={{ opacity: 1, y: 0, scale: 1 }}
//         transition={{ duration: 0.35 }}
//         className="w-full max-w-md bg-white/70 backdrop-blur-2xl border border-white/40 shadow-2xl rounded-3xl p-8 relative z-10"
//       >
//         {/* HEADER BADGE */}
//         <div className="flex justify-center mb-6">
//           <motion.div
//             whileHover={{ scale: 1.05 }}
//             className="rounded-full px-4 py-2 bg-[#E23744] text-white font-medium text-sm shadow-lg flex items-center gap-2"
//           >
//             <ShieldCheck className="w-4 h-4" />
//             Admin Security
//           </motion.div>
//         </div>

//         {/* TITLE */}
//         <h2 className="text-2xl font-extrabold text-center text-gray-900">
//           Change Password
//         </h2>

//         <p className="text-center text-gray-600 text-sm mt-1 mb-7">
//           Update your password regularly to keep your account secure.
//         </p>

//         {/* FORM */}
//         <form onSubmit={submit} className="space-y-5">

//           {/* OLD PASSWORD */}
//           <div>
//             <label className="text-sm font-semibold text-gray-700">
//               Old Password
//             </label>

//             <div className="relative">
//               <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

//               <input
//                 type={show.old ? "text" : "password"}
//                 placeholder="Enter old password"
//                 value={form.oldPassword}
//                 onChange={(e) =>
//                   setForm({ ...form, oldPassword: e.target.value })
//                 }
//                 className="
//                   w-full pl-10 pr-12 py-3 
//                   bg-white/60 backdrop-blur-xl 
//                   border border-gray-300 rounded-xl 
//                   focus:ring-2 focus:ring-[#E23744] 
//                   outline-none transition
//                 "
//               />

//               {/* Show/Hide */}
//               <button
//                 type="button"
//                 onClick={() => setShow({ ...show, old: !show.old })}
//                 className="absolute right-3 top-1/2 -translate-y-1/2"
//               >
//                 {show.old ? (
//                   <EyeOff className="text-gray-600" />
//                 ) : (
//                   <Eye className="text-gray-600" />
//                 )}
//               </button>
//             </div>
//           </div>

//           {/* NEW PASSWORD */}
//           <div>
//             <label className="text-sm font-semibold text-gray-700">
//               New Password
//             </label>

//             <div className="relative">
//               <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

//               <input
//                 type={show.new ? "text" : "password"}
//                 placeholder="Enter new password"
//                 value={form.newPassword}
//                 onChange={(e) =>
//                   setForm({ ...form, newPassword: e.target.value })
//                 }
//                 className="
//                   w-full pl-10 pr-12 py-3 
//                   bg-white/60 backdrop-blur-xl 
//                   border border-gray-300 rounded-xl 
//                   focus:ring-2 focus:ring-[#E23744] 
//                   outline-none transition
//                 "
//               />

//               <button
//                 type="button"
//                 onClick={() => setShow({ ...show, new: !show.new })}
//                 className="absolute right-3 top-1/2 -translate-y-1/2"
//               >
//                 {show.new ? (
//                   <EyeOff className="text-gray-600" />
//                 ) : (
//                   <Eye className="text-gray-600" />
//                 )}
//               </button>
//             </div>
//           </div>

//           {/* CONFIRM PASSWORD */}
//           <div>
//             <label className="text-sm font-semibold text-gray-700">
//               Confirm Password
//             </label>

//             <div className="relative">
//               <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

//               <input
//                 type={show.confirm ? "text" : "password"}
//                 placeholder="Confirm new password"
//                 value={form.confirmPassword}
//                 onChange={(e) =>
//                   setForm({ ...form, confirmPassword: e.target.value })
//                 }
//                 className="
//                   w-full pl-10 pr-12 py-3 
//                   bg-white/60 backdrop-blur-xl 
//                   border border-gray-300 rounded-xl 
//                   focus:ring-2 focus:ring-[#E23744] 
//                   outline-none transition
//                 "
//               />

//               <button
//                 type="button"
//                 onClick={() =>
//                   setShow({ ...show, confirm: !show.confirm })
//                 }
//                 className="absolute right-3 top-1/2 -translate-y-1/2"
//               >
//                 {show.confirm ? (
//                   <EyeOff className="text-gray-600" />
//                 ) : (
//                   <Eye className="text-gray-600" />
//                 )}
//               </button>
//             </div>
//           </div>

//           {/* BUTTONS */}
//           <div className="flex gap-3">

//             {/* SAVE */}
//             <motion.button
//               type="submit"
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.96 }}
//               disabled={busy}
//               className="
//                 flex-1 py-3 rounded-xl font-semibold text-white 
//                 bg-[#E23744] shadow-lg hover:shadow-[#E23744]/40 
//                 transition
//               "
//             >
//               {busy ? "Saving..." : "Save Password"}
//             </motion.button>

//             {/* CANCEL */}
//             <motion.button
//               type="button"
//               whileTap={{ scale: 0.96 }}
//               onClick={() => nav("/admin/dashboard")}
//               className="
//                 px-4 py-3 rounded-xl border bg-white 
//                 font-medium flex items-center gap-2 
//                 text-gray-700 shadow-sm hover:bg-gray-50 transition
//               "
//             >
//               <ArrowLeft className="w-4 h-4" />
//               Cancel
//             </motion.button>
//           </div>
//         </form>

//       </motion.div>
//     </div>
//   );
// }





import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Lock, 
  ArrowLeft, 
  ArrowRight,
  KeyRound, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  RefreshCw 
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { adminResetPassword } from "../../api/api";

export default function AdminResetPassword() {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [show, setShow] = useState({ old: false, new: false, confirm: false });
  const [busy, setBusy] = useState(false);
  const [isShake, setIsShake] = useState(false);
  const nav = useNavigate();

  const triggerShake = () => {
    setIsShake(true);
    setTimeout(() => setIsShake(false), 400);
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!form.oldPassword || !form.newPassword || !form.confirmPassword) {
      toast.error("All fields are required");
      triggerShake();
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      toast.error("New & Confirm passwords must match");
      triggerShake();
      return;
    }

    setBusy(true);
    try {
      await adminResetPassword(form);
      toast.success("Password updated successfully! 🔐");
      nav("/admin/dashboard");
    } catch (err) {
      triggerShake();
      toast.error(err?.response?.data || "Password reset failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-white font-sans overflow-hidden">
      
      {/* ==============================================
          LEFT SIDE: VISUALS (DARK THEME)
         ============================================== */}
      <div className="hidden lg:flex w-1/2 bg-[#0F172A] relative flex-col justify-between p-12 overflow-hidden">
        
        {/* Background Image */}
        <div className="absolute inset-0 z-0 opacity-30">
           <img 
              src="https://images.unsplash.com/photo-1618060932014-4deda4932554?q=80&w=1600&auto=format&fit=crop" 
              className="w-full h-full object-cover"
              alt="Security Update"
           />
           <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-[#0F172A]/90 to-transparent" />
        </div>

        {/* Brand */}
        <div className="relative z-10 flex items-center gap-3">
           <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center text-white shadow-lg">
              <ShieldCheck size={20} />
           </div>
           <span className="text-xl font-bold text-white tracking-wide">TIFFINO ADMIN</span>
        </div>

        {/* Content */}
        <motion.div 
           initial={{ opacity: 0, x: -30 }} 
           animate={{ opacity: 1, x: 0 }} 
           transition={{ duration: 0.8 }}
           className="relative z-10 max-w-md"
        >
           <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 border border-white/20">
              <RefreshCw size={32} className="text-red-500" />
           </div>
           <h1 className="text-5xl font-extrabold font-['Playfair_Display'] text-white leading-tight mb-6">
              Refresh Your <br/> <span className="text-red-500">Security.</span>
           </h1>
           <p className="text-slate-400 text-lg leading-relaxed">
              Regularly updating your password is the best way to keep your admin panel secure.
           </p>
        </motion.div>

        {/* Footer */}
        <div className="relative z-10 text-slate-500 text-xs">
           Security Check • Tiffino Inc.
        </div>
      </div>

      {/* ==============================================
          RIGHT SIDE: FORM (LIGHT THEME)
         ============================================== */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 relative bg-[#F8F9FA]">
         
         <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.4 }}
            className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100 relative z-10"
         >
            {/* Header */}
            <div className="mb-8">
               <button onClick={() => nav("/admin/dashboard")} className="inline-flex items-center gap-1 text-xs font-bold text-gray-400 hover:text-gray-600 mb-6 transition-colors">
                  <ArrowLeft size={14} /> Back to Dashboard
               </button>
               <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Change Password</h2>
               <p className="text-gray-500 text-sm">Create a new, strong password for your account.</p>
            </div>

            {/* Form */}
            <motion.form 
               onSubmit={submit} 
               className="space-y-5"
               animate={isShake ? { x: [-10, 10, -10, 10, 0] } : {}}
            >
               {/* Old Password */}
               <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-900 uppercase tracking-wide ml-1">Current Password</label>
                  <div className="relative group">
                     <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-600 transition-colors" size={20} />
                     <input 
                        type={show.old ? "text" : "password"} 
                        value={form.oldPassword}
                        onChange={(e) => setForm({ ...form, oldPassword: e.target.value })}
                        placeholder="••••••••"
                        className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-50 transition-all font-medium text-gray-800 placeholder-gray-400"
                     />
                     <button type="button" onClick={() => setShow({...show, old: !show.old})} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition p-1">
                        {show.old ? <EyeOff size={20}/> : <Eye size={20}/>}
                     </button>
                  </div>
               </div>

               {/* New Password */}
               <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-900 uppercase tracking-wide ml-1">New Password</label>
                  <div className="relative group">
                     <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-600 transition-colors" size={20} />
                     <input 
                        type={show.new ? "text" : "password"} 
                        value={form.newPassword}
                        onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
                        placeholder="Min 6 characters"
                        className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-50 transition-all font-medium text-gray-800 placeholder-gray-400"
                     />
                     <button type="button" onClick={() => setShow({...show, new: !show.new})} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition p-1">
                        {show.new ? <EyeOff size={20}/> : <Eye size={20}/>}
                     </button>
                  </div>
               </div>

               {/* Confirm Password */}
               <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-900 uppercase tracking-wide ml-1">Confirm Password</label>
                  <div className="relative group">
                     <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-600 transition-colors" size={20} />
                     <input 
                        type={show.confirm ? "text" : "password"} 
                        value={form.confirmPassword}
                        onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                        placeholder="Re-enter new password"
                        className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-50 transition-all font-medium text-gray-800 placeholder-gray-400"
                     />
                     <button type="button" onClick={() => setShow({...show, confirm: !show.confirm})} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition p-1">
                        {show.confirm ? <EyeOff size={20}/> : <Eye size={20}/>}
                     </button>
                  </div>
               </div>

               {/* Submit Button */}
               <button 
                  type="submit" 
                  disabled={busy}
                  className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold text-lg shadow-xl hover:bg-black hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
               >
                  {busy ? (
                     <>Updating...</>
                  ) : (
                     <>Update Password <ArrowRight size={20}/></>
                  )}
               </button>
            </motion.form>

         </motion.div>
      </div>

    </div>
  );
}