// // src/admin/pages/AdminForgotPassword.jsx
// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { Mail, ArrowLeft, Shield } from "lucide-react";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import { adminForgotPassword } from "../../api/api";

// export default function AdminForgotPassword() {
//   const [email, setEmail] = useState("");
//   const [busy, setBusy] = useState(false);
//   const nav = useNavigate();

//   const submit = async (e) => {
//     e.preventDefault();
//     if (!email.trim()) return toast.error("Enter your email");

//     setBusy(true);
//     try {
//       const res = await adminForgotPassword(email);
//       toast.success(res?.data || "Temporary password sent");

//       setTimeout(() => nav("/admin/login"), 900);
//     } catch (err) {
//       toast.error(err?.response?.data || "Failed to send temporary password");
//     } finally {
//       setBusy(false);
//     }
//   };

//   return (
//     <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-red-50/40 to-gray-50/60 px-4">

//       {/* Decorative Floating Blobs */}
//       <motion.div
//         className="absolute top-20 left-10 w-72 h-72 bg-[#E23744]/20 rounded-full blur-3xl"
//         animate={{ y: [0, -30, 0], opacity: [0.3, 0.55, 0.3] }}
//         transition={{ duration: 12, repeat: Infinity }}
//       />
//       <motion.div
//         className="absolute bottom-16 right-10 w-72 h-72 bg-[#E23744]/25 rounded-full blur-3xl"
//         animate={{ y: [0, 35, 0], opacity: [0.4, 0.7, 0.4] }}
//         transition={{ duration: 14, repeat: Infinity }}
//       />

//       {/* Card */}
//       <motion.div
//         initial={{ opacity: 0, y: 40, scale: 0.94 }}
//         animate={{ opacity: 1, y: 0, scale: 1 }}
//         transition={{ duration: 0.35 }}
//         className="w-full max-w-md bg-white/70 backdrop-blur-2xl border border-white/40 shadow-2xl rounded-3xl p-8 relative z-10"
//       >
//         {/* Badge */}
//         <div className="flex justify-center mb-6">
//           <motion.div
//             whileHover={{ scale: 1.05 }}
//             className="rounded-full px-4 py-2 bg-[#E23744] text-white font-medium text-sm shadow-lg flex items-center gap-2"
//           >
//             <Shield className="w-4 h-4" />
//             Admin Access
//           </motion.div>
//         </div>

//         {/* Title */}
//         <h2 className="text-2xl font-extrabold text-center text-gray-900">
//           Forgot Password
//         </h2>

//         <p className="text-center text-gray-600 text-sm mt-1 mb-6">
//           Enter your registered admin email to receive a temporary password.
//         </p>

//         <form onSubmit={submit} className="space-y-5">

//           {/* Email */}
//           <div>
//             <label className="text-sm font-semibold text-gray-700">
//               Email Address
//             </label>

//             <div className="relative">
//               <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

//               <input
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="admin@example.com"
//                 className="
//                   w-full pl-10 pr-3 py-3 
//                   bg-white/60 backdrop-blur-xl 
//                   border border-gray-300 rounded-xl 
//                   focus:ring-2 focus:ring-[#E23744] 
//                   outline-none transition
//                 "
//                 type="email"
//               />
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex gap-3">

//             {/* SEND BUTTON */}
//             <motion.button
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.96 }}
//               disabled={busy}
//               className="
//                 flex-1 py-3 rounded-xl font-semibold text-white 
//                 bg-[#E23744] shadow-lg hover:shadow-[#E23744]/40 
//                 transition
//               "
//             >
//               {busy ? "Sending..." : "Send"}
//             </motion.button>

//             {/* BACK */}
//             <motion.button
//               type="button"
//               whileTap={{ scale: 0.96 }}
//               onClick={() => nav("/admin/login")}
//               className="
//                 px-4 py-3 rounded-xl border bg-white 
//                 font-medium flex items-center gap-2 
//                 text-gray-700 shadow-sm hover:bg-gray-50 transition
//               "
//             >
//               <ArrowLeft className="w-4 h-4" />
//               Back
//             </motion.button>
//           </div>
//         </form>
//       </motion.div>
//     </div>
//   );
// }



import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, ShieldCheck, KeyRound } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { adminForgotPassword } from "../../api/api";

export default function AdminForgotPassword() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [isShake, setIsShake] = useState(false);
  const nav = useNavigate();
  const emailRef = useRef(null);

  useEffect(() => emailRef.current?.focus(), []);

  const triggerShake = () => {
    setIsShake(true);
    setTimeout(() => setIsShake(false), 400);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter your admin email");
      triggerShake();
      return;
    }

    setBusy(true);
    try {
      const res = await adminForgotPassword(email);
      toast.success(res?.data || "Temporary password sent to email 📧");
      setTimeout(() => nav("/admin/login"), 1500);
    } catch (err) {
      triggerShake();
      toast.error(err?.response?.data || "Failed to send password reset email");
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
              src="https://i.pinimg.com/736x/3d/52/3f/3d523f18056680d4cb1433f849bf020c.jpg" 
              className="w-full h-full object-cover"
              alt="Security Background"
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
              <KeyRound className="w-8 h-8 text-red-500" />
           </div>
           <h1 className="text-5xl font-extrabold font-['Playfair_Display'] text-white leading-tight mb-6">
              Forgot Your <br/> <span className="text-red-500">Access Key?</span>
           </h1>
           <p className="text-slate-400 text-lg leading-relaxed">
              Don't worry, it happens. We'll send a temporary password to your registered admin email address.
           </p>
        </motion.div>

        {/* Footer */}
        <div className="relative z-10 text-slate-500 text-xs">
           Secure System Recovery • Tiffino Inc.
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
            className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100 relative z-10"
         >
            {/* Header */}
            <div className="mb-10">
               <Link to="/admin/login" className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-gray-800 mb-6 transition-colors group">
                  <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform"/> Back to Login
               </Link>
               <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Reset Password</h2>
               <p className="text-gray-500 text-sm">Enter your email to receive recovery instructions.</p>
            </div>

            {/* Form */}
            <motion.form 
               onSubmit={submit} 
               className="space-y-8"
               animate={isShake ? { x: [-10, 10, -10, 10, 0] } : {}}
            >
               <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-900 uppercase tracking-wide ml-1">Email Address</label>
                  <div className="relative group">
                     <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-600 transition-colors" size={20} />
                     <input 
                        ref={emailRef}
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="admin@tiffino.com"
                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-50 transition-all font-medium text-gray-800 placeholder-gray-400"
                     />
                  </div>
               </div>

               <button 
                  type="submit" 
                  disabled={busy}
                  className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold text-lg shadow-xl hover:bg-black hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
               >
                  {busy ? "Sending..." : "Send Reset Link"}
               </button>
            </motion.form>

         </motion.div>
      </div>

    </div>
  );
}