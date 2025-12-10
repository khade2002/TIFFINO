// // ==========================================================
// // src/superadmin/pages/SuperAdminLogin.jsx
// // FINAL — Matches updated AuthContext + api.js
// // ==========================================================

// import { useEffect, useState, useRef } from "react";
// import { motion } from "framer-motion";
// import { useNavigate, useLocation } from "react-router-dom";
// import toast from "react-hot-toast";
// import { Lock, AtSign, Eye, EyeOff, ShieldCheck } from "lucide-react";

// import { useSuperAdminAuth } from "../context/SuperAdminAuthContext";

// const SUPER_TOKEN = "super_token";

// export default function SuperAdminLogin() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const usernameRef = useRef(null);

//   const { login, isAuthenticated } = useSuperAdminAuth();

//   const [form, setForm] = useState({
//     username: "superadmin",
//     password: "SuperAdmin@123",
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [shake, setShake] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // Autofocus username
//   useEffect(() => {
//     usernameRef.current?.focus();
//   }, []);

//   // If already logged in → redirect
//   useEffect(() => {
//     const token = localStorage.getItem(SUPER_TOKEN);
//     if (token || isAuthenticated) {
//       navigate("/superadmin/dashboard", { replace: true });
//     }
//   }, [isAuthenticated]);

//   const triggerShake = () => {
//     setShake(true);
//     setTimeout(() => setShake(false), 400);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!form.username.trim() || !form.password.trim()) {
//       toast.error("Username and password required");
//       triggerShake();
//       return;
//     }

//     setLoading(true);

//     const ok = await login({
//       username: form.username.trim(),
//       password: form.password,
//     });

//     if (ok) {
//       const redirectTo =
//         location.state?.from?.pathname || "/superadmin/dashboard";

//       navigate(redirectTo, { replace: true });
//     } else {
//       triggerShake();
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="min-h-[85vh] flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 px-4 py-10">
//       <motion.div
//         initial={{ opacity: 0, y: 50, scale: 0.92 }}
//         animate={{ opacity: 1, y: 0, scale: 1 }}
//         transition={{ duration: 0.35 }}
//         className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border p-8"
//       >
//         {/* Badge */}
//         <div className="flex justify-center mb-6">
//           <div className="rounded-full bg-purple-100 px-4 py-2 text-purple-700 font-semibold text-sm border shadow-sm">
//             <ShieldCheck className="w-4 h-4 inline-block mr-1" />
//             SuperAdmin Panel
//           </div>
//         </div>

//         <h2 className="text-3xl font-extrabold text-center text-gray-800">
//           SuperAdmin Login
//         </h2>

//         <motion.form
//           onSubmit={handleSubmit}
//           animate={shake ? { x: [-8, 8, -8, 8, 0] } : {}}
//           transition={{ duration: 0.35 }}
//           className="mt-6 space-y-6"
//         >
//           {/* USERNAME */}
//           <div>
//             <label className="text-sm font-semibold text-gray-600">
//               Username
//             </label>
//             <div className="relative">
//               <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

//               <input
//                 ref={usernameRef}
//                 name="username"
//                 value={form.username}
//                 onChange={(e) =>
//                   setForm({ ...form, username: e.target.value })
//                 }
//                 className="w-full pl-10 pr-3 py-3 border rounded-xl
//                            focus:ring-2 focus:ring-purple-500 outline-none"
//               />
//             </div>
//           </div>

//           {/* PASSWORD */}
//           <div>
//             <label className="text-sm font-semibold text-gray-600">
//               Password
//             </label>
//             <div className="relative">
//               <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 value={form.password}
//                 onChange={(e) =>
//                   setForm({ ...form, password: e.target.value })
//                 }
//                 className="w-full pl-10 pr-12 py-3 border rounded-xl
//                            focus:ring-2 focus:ring-purple-500 outline-none"
//               />

//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-1/2 -translate-y-1/2"
//               >
//                 {showPassword ? (
//                   <EyeOff className="text-gray-600" />
//                 ) : (
//                   <Eye className="text-gray-600" />
//                 )}
//               </button>
//             </div>
//           </div>

//           {/* LOGIN BUTTON */}
//           <motion.button
//             type="submit"
//             whileTap={{ scale: 0.96 }}
//             disabled={loading}
//             className="w-full py-3 rounded-xl font-bold text-white 
//                        bg-gradient-to-r from-purple-600 to-orange-500
//                        shadow-lg tracking-wide"
//           >
//             {loading ? "Logging in..." : "Login"}
//           </motion.button>
//         </motion.form>
//       </motion.div>
//     </div>
//   );
// }




// src/superadmin/pages/SuperAdminLogin.jsx

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { Lock, User, Eye, EyeOff, ShieldAlert, Cpu } from "lucide-react";
import { useSuperAdminAuth } from "../context/SuperAdminAuthContext";

const SUPER_TOKEN = "super_token";

export default function SuperAdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const usernameRef = useRef(null);
  const { login, isAuthenticated } = useSuperAdminAuth();

  // ✅ UPDATED: Credentials are now pre-filled
  const [form, setForm] = useState({ 
    username: "superadmin", 
    password: "SuperAdmin@123" 
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isShake, setIsShake] = useState(false);

  useEffect(() => usernameRef.current?.focus(), []);

  useEffect(() => {
    if (localStorage.getItem(SUPER_TOKEN) || isAuthenticated) {
      navigate("/superadmin/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const triggerShake = () => {
    setIsShake(true);
    setTimeout(() => setIsShake(false), 400);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username.trim() || !form.password.trim()) {
      toast.error("Credentials Required");
      triggerShake();
      return;
    }

    setLoading(true);
    const success = await login({ username: form.username.trim(), password: form.password });
    setLoading(false);

    if (success) {
      const redirectTo = location.state?.from?.pathname || "/superadmin/dashboard";
      navigate(redirectTo, { replace: true });
      toast.success("Welcome, Commander! 🚀");
    } else {
      triggerShake();
      toast.error("Access Denied");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#050505] font-sans relative overflow-hidden text-white">
      
      {/* --- BACKGROUND FX --- */}
      <div className="absolute inset-0 z-0">
         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/40 via-[#050505] to-[#050505]" />
         <motion.div 
            animate={{ rotate: 360 }} transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"
         />
      </div>

      <div className="absolute top-10 left-10 z-10 flex items-center gap-3 opacity-80">
         <Cpu className="text-purple-500 w-8 h-8" />
         <span className="font-mono text-sm tracking-widest text-purple-500 uppercase font-bold">System Core v2.0</span>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 shadow-2xl relative z-20"
      >
        {/* Header */}
        <div className="text-center mb-10">
           <div className="w-20 h-20 bg-gradient-to-tr from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-900/50">
              <ShieldAlert size={40} className="text-white" />
           </div>
           <h2 className="text-3xl font-extrabold tracking-tight mb-2">Super Admin</h2>
           <p className="text-white/50 text-sm">Restricted Access. Authorized Personnel Only.</p>
        </div>

        {/* Form */}
        <motion.form 
           onSubmit={handleSubmit} 
           className="space-y-6"
           animate={isShake ? { x: [-10, 10, -10, 10, 0] } : {}}
        >
           
           <div className="space-y-2">
              <label className="text-xs font-bold text-white/60 uppercase tracking-widest ml-1">Username</label>
              <div className="relative group">
                 <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-purple-400 transition-colors" size={20}/>
                 <input 
                    ref={usernameRef}
                    name="username"
                    value={form.username}
                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-12 py-3.5 text-white placeholder-white/20 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all"
                    placeholder="Enter root ID"
                    autoComplete="off"
                 />
              </div>
           </div>

           <div className="space-y-2">
              <label className="text-xs font-bold text-white/60 uppercase tracking-widest ml-1">Password</label>
              <div className="relative group">
                 <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-purple-400 transition-colors" size={20}/>
                 <input 
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-12 py-3.5 text-white placeholder-white/20 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all"
                    placeholder="••••••••••••"
                 />
                 <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition"
                 >
                    {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                 </button>
              </div>
           </div>

           <motion.button 
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              disabled={loading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-lg shadow-lg hover:shadow-purple-600/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4"
           >
              {loading ? (
                 <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin"/> Authenticating...
                 </span>
              ) : "Initialize Session"}
           </motion.button>

        </motion.form>

        <div className="mt-8 text-center text-[10px] text-white/30 uppercase tracking-widest font-mono">
           Encrypted Connection • Secure Gateway
        </div>

      </motion.div>
    </div>
  );
}