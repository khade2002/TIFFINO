// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import toast from "react-hot-toast";
// import { Lock, AtSign, Eye, EyeOff, Sparkles } from "lucide-react";

// // Auth Context
// import { useAuth } from "../../context/AuthContext";

// export default function Login() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { login, loading } = useAuth();

//   const [form, setForm] = useState({ email: "", password: "" });
//   const [showPassword, setShowPassword] = useState(false);

//   // ONLY redirect if token exists AND user landed intentionally on login page
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) navigate("/profile", { replace: true });
//   }, []);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // ================================
//   // 🔥 FINAL LOGIN HANDLER (UPDATED)
//   // ================================
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!form.email.trim() || !form.password.trim()) {
//       toast.error("Please fill all fields ❌");
//       return;
//     }

//     const isLoggedIn = await login({
//       email: form.email.trim(),
//       password: form.password,
//     });

//     if (!isLoggedIn) {
//       toast.error("Invalid email or password ❌");
//       return;
//     }

//     // Redirect after login
//     const redirectTo = location.state?.from?.pathname || "/profile";
//     navigate(redirectTo, { replace: true });
//   };

//   return (
//     <div className="min-h-[85vh] flex items-center justify-center bg-gradient-to-b from-white via-red-50/30 to-gray-50 px-4 py-10">
//       <motion.div
//         initial={{ opacity: 0, y: 64, scale: 0.95 }}
//         animate={{ opacity: 1, y: 0, scale: 1 }}
//         transition={{ duration: 0.6, ease: "easeOut" }}
//         className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-gray-100 px-6 py-10 sm:p-10"
//       >
//         {/* Header */}
//         <motion.div
//           initial={{ scale: 0 }}
//           animate={{ scale: 1 }}
//           transition={{ delay: 0.15, type: "spring" }}
//           className="flex justify-center mb-7"
//         >
//           <div className="rounded-full bg-[#E23744]/15 px-4 py-2 inline-flex items-center gap-1 text-[#E23744] font-bold text-sm">
//             <Sparkles className="w-4 h-4" />
//             Premium Login
//           </div>
//         </motion.div>

//         <motion.h2
//           initial={{ opacity: 0, y: 12 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.05 }}
//           className="text-3xl sm:text-2xl font-extrabold text-center bg-gradient-to-r from-[#E23744] to-pink-600 bg-clip-text text-transparent mb-8"
//         >
//           Welcome Back 👋
//         </motion.h2>

//         {/* Login Form */}
//         <form onSubmit={handleSubmit} className="space-y-6" autoComplete="on">
//           {/* Email */}
//           <div>
//             <label className="block text-sm font-bold text-gray-700 mb-1">
//               Email
//             </label>
//             <div className="relative">
//               <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5" />
//               <input
//                 type="email"
//                 name="email"
//                 value={form.email}
//                 onChange={handleChange}
//                 required
//                 placeholder="Enter your email"
//                 className="w-full pl-10 pr-3 py-3 rounded-xl border border-gray-200 focus:border-[#E23744] focus:ring-2 focus:ring-[#E23744]/30 outline-none shadow-sm"
//               />
//             </div>
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block text-sm font-bold text-gray-700 mb-1">
//               Password
//             </label>
//             <div className="relative">
//               <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5" />

//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 value={form.password}
//                 onChange={handleChange}
//                 required
//                 placeholder="Enter your password"
//                 className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-200 focus:border-[#E23744] focus:ring-2 focus:ring-[#E23744]/30 outline-none shadow-sm"
//               />

//               <button
//                 type="button"
//                 onClick={() => setShowPassword((v) => !v)}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#E23744]"
//               >
//                 {showPassword ? <EyeOff /> : <Eye />}
//               </button>
//             </div>

//             <div className="flex justify-end text-xs mt-2">
//               <Link
//                 to="/forgot-password"
//                 className="text-[#E23744] font-bold hover:underline"
//               >
//                 Forgot Password?
//               </Link>
//             </div>
//           </div>

//           {/* Submit */}
//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full py-3 rounded-xl font-bold text-base shadow-lg transition-all flex items-center justify-center gap-2 ${
//               loading
//                 ? "bg-[#E23744]/70 cursor-not-allowed text-white"
//                 : "bg-gradient-to-r from-[#E23744] to-pink-600 hover:from-pink-600 hover:to-[#E23744] text-white"
//             }`}
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>

//         <p className="text-sm text-center text-gray-600 mt-8">
//           Don’t have an account?{" "}
//           <Link
//             to="/signup"
//             className="text-[#E23744] font-semibold hover:underline"
//           >
//             Sign up
//           </Link>
//         </p>
//       </motion.div>
//     </div>
//   );
// }




// // src/pages/Auth/Login.jsx
// import { useEffect, useState, useRef } from "react";
// import { motion } from "framer-motion";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import toast from "react-hot-toast";
// import { Lock, AtSign, Eye, EyeOff, Sparkles } from "lucide-react";
// import { useAuth } from "../../context/AuthContext";

// export default function Login() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { login, loading } = useAuth();
//   const emailRef = useRef(null);

//   const [form, setForm] = useState({ email: "", password: "" });
//   const [showPassword, setShowPassword] = useState(false);
//   const [shake, setShake] = useState(false);

//   // Auto focus email field
//   useEffect(() => {
//     emailRef.current?.focus();
//   }, []);

//   // Redirect if already logged in
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) navigate("/profile", { replace: true });
//   }, []);

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const validateForm = () => {
//     if (!form.email.trim()) return "Email is required";
//     if (!/\S+@\S+\.\S+/.test(form.email)) return "Enter valid email";
//     if (!form.password.trim()) return "Password is required";
//     return null;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const errorMsg = validateForm();
//     if (errorMsg) {
//       toast.error(errorMsg);
//       triggerShake();
//       return;
//     }

//     const success = await login({
//       email: form.email.trim(),
//       password: form.password,
//     });

//     if (!success) {
//       toast.error("Invalid email or password ❌");
//       triggerShake();
//       return;
//     }

//     const redirectTo = location.state?.from?.pathname || "/profile";
//     navigate(redirectTo, { replace: true });
//   };

//   const triggerShake = () => {
//     setShake(true);
//     setTimeout(() => setShake(false), 400);
//   };

//   return (
//     <div className="min-h-[85vh] flex items-center justify-center bg-gradient-to-b from-white via-red-50/20 to-gray-100 px-4 py-10">
//       <motion.div
//         initial={{ opacity: 0, y: 60, scale: 0.95 }}
//         animate={{ opacity: 1, y: 0, scale: 1 }}
//         transition={{ duration: 0.55, ease: "easeOut" }}
//         className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-gray-100 px-7 py-10 sm:p-10"
//       >
//         {/* Badge */}
//         <motion.div
//           initial={{ scale: 0 }}
//           animate={{ scale: 1 }}
//           transition={{ type: "spring", delay: 0.1 }}
//           className="flex justify-center mb-6"
//         >
//           <div className="rounded-full bg-[#E23744]/15 px-4 py-2 flex items-center gap-2 text-[#E23744] font-bold text-sm">
//             <Sparkles className="w-4 h-4" />
//             Tiffino Login
//           </div>
//         </motion.div>

//         {/* Title */}
//         <motion.h2
//           initial={{ opacity: 0, y: 8 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-3xl sm:text-2xl font-extrabold text-center bg-gradient-to-r from-[#E23744] to-pink-600 bg-clip-text text-transparent mb-7"
//         >
//           Welcome Back 👋
//         </motion.h2>

//         {/* Form */}
//         <motion.form
//           onSubmit={handleSubmit}
//           className="space-y-6"
//           animate={shake ? { x: [-6, 6, -6, 6, 0] } : {}}
//         >
//           {/* Email Field */}
//           <div>
//             <label className="block text-sm font-bold text-gray-700 mb-1">
//               Email
//             </label>
//             <div className="relative">
//               <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5" />
//               <input
//                 ref={emailRef}
//                 type="email"
//                 name="email"
//                 value={form.email}
//                 onChange={handleChange}
//                 placeholder="Enter your email"
//                 className="w-full pl-11 pr-3 py-3 rounded-xl border border-gray-200 focus:border-[#E23744] focus:ring-2 focus:ring-[#E23744]/30 outline-none transition-all shadow-sm"
//               />
//             </div>
//           </div>

//           {/* Password Field */}
//           <div>
//             <label className="block text-sm font-bold text-gray-700 mb-1">
//               Password
//             </label>
//             <div className="relative">
//               <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5" />

//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 value={form.password}
//                 onChange={handleChange}
//                 placeholder="Enter your password"
//                 className="w-full pl-11 pr-12 py-3 rounded-xl border border-gray-200 focus:border-[#E23744] focus:ring-2 focus:ring-[#E23744]/30 outline-none transition-all shadow-sm"
//               />

//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#E23744]"
//               >
//                 {showPassword ? <EyeOff /> : <Eye />}
//               </button>
//             </div>

//             <div className="flex justify-end text-xs mt-2">
//               <Link
//                 to="/forgot-password"
//                 className="text-[#E23744] font-bold hover:underline"
//               >
//                 Forgot Password?
//               </Link>
//             </div>
//           </div>

//           {/* Submit Button */}
//           <motion.button
//             type="submit"
//             disabled={loading}
//             whileTap={{ scale: 0.95 }}
//             className={`w-full py-3 rounded-xl font-bold text-base shadow-lg transition-all flex items-center justify-center gap-2 ${
//               loading
//                 ? "bg-[#E23744]/70 cursor-not-allowed text-white"
//                 : "bg-gradient-to-r from-[#E23744] to-pink-600 hover:from-pink-600 hover:to-[#E23744] text-white"
//             }`}
//           >
//             {loading ? "Logging in..." : "Login"}
//           </motion.button>
//         </motion.form>

//         {/* Footer */}
//         <p className="text-sm text-center text-gray-600 mt-8">
//           Don’t have an account?{" "}
//           <Link
//             to="/signup"
//             className="text-[#E23744] font-semibold hover:underline"
//           >
//             Sign up
//           </Link>
//         </p>
//       </motion.div>
//     </div>
//   );
// }


// // src/pages/Auth/Login.jsx
// import { useEffect, useState, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import toast from "react-hot-toast";
// import {
//   Lock,
//   AtSign,
//   Eye,
//   EyeOff,
//   Sparkles,
//   ChevronDown,
//   Shield,
//   UserCog,
// } from "lucide-react";
// import { useAuth } from "../../context/AuthContext";

// export default function Login() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { login, loading } = useAuth();
//   const emailRef = useRef(null);

//   const [form, setForm] = useState({ email: "", password: "" });
//   const [showPassword, setShowPassword] = useState(false);
//   const [shake, setShake] = useState(false);
//   const [openDropdown, setOpenDropdown] = useState(false);

//   useEffect(() => {
//     emailRef.current?.focus();
//   }, []);

//   // If user already logged in → redirect to profile
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) navigate("/profile", { replace: true });
//   }, [navigate]);

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const validateForm = () => {
//     if (!form.email.trim()) return "Email is required";
//     if (!/\S+@\S+\.\S+/.test(form.email)) return "Enter valid email";
//     if (!form.password.trim()) return "Password is required";
//     return null;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const errorMsg = validateForm();
//     if (errorMsg) {
//       toast.error(errorMsg);
//       triggerShake();
//       return;
//     }

//     const success = await login({
//       email: form.email.trim(),
//       password: form.password,
//     });

//     if (!success) {
//       toast.error("Invalid email or password ❌");
//       triggerShake();
//       return;
//     }

//     const redirectTo = location.state?.from?.pathname || "/profile";
//     navigate(redirectTo, { replace: true });
//   };

//   const triggerShake = () => {
//     setShake(true);
//     setTimeout(() => setShake(false), 400);
//   };

//   return (
//     <div className="min-h-[85vh] flex items-center justify-center bg-gradient-to-b from-white via-red-50/20 to-gray-100 px-4 py-10">
//       <motion.div
//         initial={{ opacity: 0, y: 60, scale: 0.95 }}
//         animate={{ opacity: 1, y: 0, scale: 1 }}
//         transition={{ duration: 0.55, ease: "easeOut" }}
//         className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-gray-100 px-7 py-10 sm:p-10 relative"
//       >
//         {/* ---------- LOGIN TYPE DROPDOWN ---------- */}
//         <div className="absolute top-4 right-4">
//           <div
//             onClick={() => setOpenDropdown(!openDropdown)}
//             className="cursor-pointer flex items-center gap-1 bg-[#E23744]/10 hover:bg-[#E23744]/20 transition px-3 py-1.5 rounded-xl shadow-sm font-semibold text-[#E23744] text-sm"
//           >
//             Login Options
//             <ChevronDown
//               className={`w-4 h-4 transition ${
//                 openDropdown ? "rotate-180" : ""
//               }`}
//             />
//           </div>

//           <AnimatePresence>
//             {openDropdown && (
//               <motion.div
//                 initial={{ opacity: 0, y: -10, scale: 0.95 }}
//                 animate={{ opacity: 1, y: 0, scale: 1 }}
//                 exit={{ opacity: 0, y: -10, scale: 0.95 }}
//                 transition={{ duration: 0.2 }}
//                 className="absolute right-0 mt-2 w-44 bg-white shadow-xl border border-gray-200 rounded-xl overflow-hidden z-30"
//               >
//                 {/* SUPER ADMIN */}
//                 <div
//                   onClick={() => window.open("/superadmin/login", "_blank")}
//                   className="flex items-center gap-2 px-4 py-3 hover:bg-red-50 cursor-pointer text-sm font-semibold text-gray-700"
//                 >
//                   <Shield className="w-4 h-4 text-[#E23744]" />
//                   Super Admin
//                 </div>

//                 {/* ADMIN */}
//                 <div
//                   onClick={() => window.open("/admin/login", "_blank")}
//                   className="flex items-center gap-2 px-4 py-3 hover:bg-red-50 cursor-pointer text-sm font-semibold text-gray-700"
//                 >
//                   <UserCog className="w-4 h-4 text-[#E23744]" />
//                   Admin
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>

//         {/* Badge */}
//         <motion.div
//           initial={{ scale: 0 }}
//           animate={{ scale: 1 }}
//           transition={{ type: "spring", delay: 0.1 }}
//           className="flex justify-center mb-6"
//         >
//           <div className="rounded-full bg-[#E23744]/15 px-4 py-2 flex items-center gap-2 text-[#E23744] font-bold text-sm">
//             <Sparkles className="w-4 h-4" />
//             Tiffino Login
//           </div>
//         </motion.div>

//         {/* Title */}
//         <motion.h2
//           initial={{ opacity: 0, y: 8 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-3xl sm:text-2xl font-extrabold text-center bg-gradient-to-r from-[#E23744] to-pink-600 bg-clip-text text-transparent mb-7"
//         >
//           Welcome Back 👋
//         </motion.h2>

//         {/* Form */}
//         <motion.form
//           onSubmit={handleSubmit}
//           className="space-y-6"
//           animate={shake ? { x: [-6, 6, -6, 6, 0] } : {}}
//         >
//           {/* Email Field */}
//           <div>
//             <label className="block text-sm font-bold text-gray-700 mb-1">
//               Email
//             </label>
//             <div className="relative">
//               <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5" />
//               <input
//                 ref={emailRef}
//                 type="email"
//                 name="email"
//                 value={form.email}
//                 onChange={handleChange}
//                 placeholder="Enter your email"
//                 className="w-full pl-11 pr-3 py-3 rounded-xl border border-gray-200 focus:border-[#E23744] focus:ring-2 focus:ring-[#E23744]/30 outline-none transition-all shadow-sm"
//               />
//             </div>
//           </div>

//           {/* Password Field */}
//           <div>
//             <label className="block text-sm font-bold text-gray-700 mb-1">
//               Password
//             </label>
//             <div className="relative">
//               <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5" />

//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 value={form.password}
//                 onChange={handleChange}
//                 placeholder="Enter your password"
//                 className="w-full pl-11 pr-12 py-3 rounded-xl border border-gray-200 focus:border-[#E23744] focus:ring-2 focus:ring-[#E23744]/30 outline-none transition-all shadow-sm"
//               />

//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#E23744]"
//               >
//                 {showPassword ? <EyeOff /> : <Eye />}
//               </button>
//             </div>

//             <div className="flex justify-end text-xs mt-2">
//               <Link
//                 to="/forgot-password"
//                 className="text-[#E23744] font-bold hover:underline"
//               >
//                 Forgot Password?
//               </Link>
//             </div>
//           </div>

//           {/* Submit Button */}
//           <motion.button
//             type="submit"
//             disabled={loading}
//             whileTap={{ scale: 0.95 }}
//             className={`w-full py-3 rounded-xl font-bold text-base shadow-lg transition-all flex items-center justify-center gap-2 ${
//               loading
//                 ? "bg-[#E23744]/70 cursor-not-allowed text-white"
//                 : "bg-gradient-to-r from-[#E23744] to-pink-600 hover:from-pink-600 hover:to-[#E23744] text-white"
//             }`}
//           >
//             {loading ? "Logging in..." : "Login"}
//           </motion.button>
//         </motion.form>

//         {/* Footer */}
//         <p className="text-sm text-center text-gray-600 mt-8">
//           Don’t have an account?{" "}
//           <Link
//             to="/signup"
//             className="text-[#E23744] font-semibold hover:underline"
//           >
//             Sign up
//           </Link>
//         </p>
//       </motion.div>
//     </div>
//   );
// }




import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ChevronDown,
  Shield,
  UserCog,
  ArrowRight
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

// --- ANIMATION VARIANTS ---
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loading } = useAuth();
  const emailRef = useRef(null);

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isShake, setIsShake] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  // Focus email on mount
  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  // Redirect if already logged in
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/profile", { replace: true });
    }
  }, [navigate]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validateForm = () => {
    if (!form.email.trim()) return "Email address is required";
    if (!/\S+@\S+\.\S+/.test(form.email)) return "Please enter a valid email";
    if (!form.password.trim()) return "Password is required";
    return null;
  };

  const triggerShake = () => {
    setIsShake(true);
    setTimeout(() => setIsShake(false), 400);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorMsg = validateForm();
    if (errorMsg) {
      toast.error(errorMsg);
      triggerShake();
      return;
    }

    const success = await login({
      email: form.email.trim(),
      password: form.password,
    });

    if (!success) {
      toast.error("Invalid email or password");
      triggerShake();
      return;
    }

    const redirectTo = location.state?.from?.pathname || "/profile";
    navigate(redirectTo, { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFDFD] font-sans overflow-hidden relative">
      
      {/* BACKGROUND DECOR */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute -top-[10%] -right-[10%] w-[600px] h-[600px] bg-red-50/60 rounded-full blur-[120px]"/>
         <div className="absolute -bottom-[10%] -left-[10%] w-[500px] h-[500px] bg-orange-50/60 rounded-full blur-[120px]"/>
      </div>

      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-0 bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100 relative z-10 m-4 min-h-[600px]">
        
        {/* --- LEFT SIDE: IMAGE / BRANDING --- */}
        <div className="relative hidden md:block bg-gray-900">
           <img 
              src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=1000&auto=format&fit=crop" 
              alt="Login visual" 
              className="absolute inset-0 w-full h-full object-cover opacity-60"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"/>
           
           <div className="absolute bottom-12 left-10 right-10 text-white">
              <h2 className="text-4xl font-extrabold font-['Playfair_Display'] mb-4 leading-tight">
                 Welcome back to <br/><span className="text-red-500">Flavor Haven.</span>
              </h2>
              <p className="text-gray-300 text-lg font-light">
                 Your favorite meals are just a click away. Sign in to continue your delicious journey.
              </p>
           </div>
        </div>

        {/* --- RIGHT SIDE: FORM --- */}
        <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center relative">
           
           {/* Admin Dropdown (Top Right) */}
           <div className="absolute top-6 right-6">
              <div className="relative">
                 <button 
                    onClick={() => setOpenDropdown(!openDropdown)}
                    className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-red-600 transition-colors uppercase tracking-wider"
                 >
                    Admin Access <ChevronDown size={14}/>
                 </button>
                 <AnimatePresence>
                    {openDropdown && (
                       <motion.div 
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-xl z-20 overflow-hidden"
                       >
                          <a href="/superadmin/login" target="_blank" className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-sm text-gray-600 hover:text-red-600 transition-colors">
                             <Shield size={16}/> Super Admin
                          </a>
                          <a href="/admin/login" target="_blank" className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-sm text-gray-600 hover:text-red-600 transition-colors border-t border-gray-50">
                             <UserCog size={16}/> Restaurant Admin
                          </a>
                       </motion.div>
                    )}
                 </AnimatePresence>
              </div>
           </div>

           <motion.div 
              initial="hidden" animate="visible" variants={fadeIn}
              className="w-full max-w-sm mx-auto"
           >
              <div className="mb-10">
                 <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Hello Again!</h1>
                 <p className="text-gray-500">Enter your details to sign in.</p>
              </div>

              <motion.form 
                 onSubmit={handleSubmit} 
                 className="space-y-5"
                 animate={isShake ? { x: [-10, 10, -10, 10, 0] } : {}}
              >
                 {/* Email Input */}
                 <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-900 uppercase tracking-wide ml-1">Email Address</label>
                    <div className="relative group">
                       <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors" size={20}/>
                       <input 
                          ref={emailRef}
                          type="email" 
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-50 transition-all font-medium text-gray-700"
                       />
                    </div>
                 </div>

                 {/* Password Input */}
                 <div className="space-y-1">
                    <div className="flex justify-between ml-1">
                       <label className="text-xs font-bold text-gray-900 uppercase tracking-wide">Password</label>
                       <Link to="/forgot-password" className="text-xs font-bold text-red-500 hover:underline">Forgot Password?</Link>
                    </div>
                    <div className="relative group">
                       <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors" size={20}/>
                       <input 
                          type={showPassword ? "text" : "password"} 
                          name="password"
                          value={form.password}
                          onChange={handleChange}
                          placeholder="••••••••"
                          className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-50 transition-all font-medium text-gray-700"
                       />
                       <button 
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                       >
                          {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                       </button>
                    </div>
                 </div>

                 <motion.button 
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    disabled={loading}
                    className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold text-lg shadow-xl shadow-gray-200 hover:bg-black transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
                 >
                    {loading ? "Signing in..." : (
                       <>Sign In <ArrowRight size={20}/></>
                    )}
                 </motion.button>

              </motion.form>

              <div className="mt-10 text-center">
                 <p className="text-gray-500">Don't have an account?</p>
                 <Link to="/signup" className="text-red-600 font-bold hover:underline text-lg">Create free account</Link>
              </div>

           </motion.div>
        </div>

      </div>
    </div>
  );
}