

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  ArrowRight, 
  LayoutDashboard, 
  ChevronLeft 
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";
import toast from "react-hot-toast";

export default function AdminLogin() {
  const { login } = useAdminAuth();
  const navigate = useNavigate();
  const emailRef = useRef(null);

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isShake, setIsShake] = useState(false);

  // Focus email on mount
  useEffect(() => emailRef.current?.focus(), []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const triggerShake = () => {
    setIsShake(true);
    setTimeout(() => setIsShake(false), 400);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email.trim() || !form.password.trim()) {
      toast.error("Credentials required");
      triggerShake();
      return;
    }

    setLoading(true);
    // Note: Ensure your context login function returns { ok: boolean, error?: string, firstResetDone?: boolean }
    const res = await login(form.email.trim(), form.password);
    setLoading(false);

    if (!res || !res.ok) {
      triggerShake();
      toast.error(res?.error || "Invalid credentials");
      return;
    }

    // Check backend flag for first time login reset
    if (res.firstResetDone === false) {
      navigate("/admin/first-reset", { replace: true });
    } else {
      toast.success("Welcome back, Admin! 🚀");
      navigate("/admin/dashboard", { replace: true });
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-white font-sans overflow-hidden">
      
      {/* ==============================================
          LEFT SIDE: BRANDING & VISUALS (DARK THEME)
         ============================================== */}
      <div className="hidden lg:flex w-1/2 bg-[#0F172A] relative flex-col justify-between p-12 overflow-hidden">
        
        {/* Background Overlay Image */}
        <div className="absolute inset-0 z-0 opacity-40">
           <img 
              src="https://i.pinimg.com/736x/ea/a6/45/eaa64574d48667bd0a38397fcde407f9.jpg" 
              className="w-full h-full object-cover"
              alt="Admin Kitchen Background"
           />
           <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-[#0F172A]/90 to-transparent" />
        </div>

        {/* Top Logo Area */}
        <div className="relative z-10">
           <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-red-900/50">
                 <ShieldCheck size={20} />
              </div>
              <span className="text-xl font-bold text-white tracking-wide">TIFFINO ADMIN</span>
           </div>
        </div>

        {/* Main Text Content */}
        <motion.div 
           initial={{ opacity: 0, x: -30 }} 
           animate={{ opacity: 1, x: 0 }} 
           transition={{ duration: 0.8 }}
           className="relative z-10 max-w-md"
        >
           <h1 className="text-5xl font-extrabold font-['Playfair_Display'] text-white leading-tight mb-6">
              Control Your <br/> <span className="text-red-500">Kitchen Empire.</span>
           </h1>
           <p className="text-slate-400 text-lg leading-relaxed mb-8">
              Real-time order tracking, menu management, and analytics dashboard - all in one place.
           </p>

           {/* Stats Mini Bar */}
           <div className="flex gap-8 border-t border-slate-700 pt-8">
              <div>
                 <p className="text-3xl font-bold text-white">24/7</p>
                 <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">Uptime</p>
              </div>
              <div>
                 <p className="text-3xl font-bold text-white">100%</p>
                 <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">Secure</p>
              </div>
           </div>
        </motion.div>

        {/* Footer Copyright */}
        <div className="relative z-10 text-slate-500 text-xs">
           © {new Date().getFullYear()} Tiffino Foods Pvt Ltd. Internal Use Only.
        </div>
      </div>

      {/* ==============================================
          RIGHT SIDE: LOGIN FORM (LIGHT THEME)
         ============================================== */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 relative bg-[#F8F9FA]">
         
         {/* Mobile Background Decor */}
         <div className="absolute inset-0 lg:hidden pointer-events-none">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-red-100 rounded-full blur-[80px]" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gray-200 rounded-full blur-[80px]" />
         </div>

         <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.4 }}
            className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100 relative z-10"
         >
            {/* Header */}
            <div className="mb-8">
               <Link to="/" className="inline-flex items-center gap-1 text-xs font-bold text-gray-400 hover:text-gray-600 mb-6 transition-colors">
                  <ChevronLeft size={14} /> Back to Website
               </Link>
               <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Admin Portal</h2>
               <p className="text-gray-500 text-sm">Authenticate to access your dashboard.</p>
            </div>

            {/* Form */}
            <motion.form 
               onSubmit={handleSubmit} 
               className="space-y-6"
               animate={isShake ? { x: [-10, 10, -10, 10, 0] } : {}}
            >
               {/* Email */}
               <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-900 uppercase tracking-wide ml-1">Email Address</label>
                  <div className="relative group">
                     <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-600 transition-colors" size={20} />
                     <input 
                        ref={emailRef}
                        type="email" 
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="admin@tiffino.com"
                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-50 transition-all font-medium text-gray-800 placeholder-gray-400"
                     />
                  </div>
               </div>

               {/* Password */}
               <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-900 uppercase tracking-wide ml-1">Password</label>
                  <div className="relative group">
                     <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-600 transition-colors" size={20} />
                     <input 
                        type={showPwd ? "text" : "password"} 
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-50 transition-all font-medium text-gray-800 placeholder-gray-400"
                     />
                     <button 
                        type="button" 
                        onClick={() => setShowPwd(!showPwd)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition p-1"
                     >
                        {showPwd ? <EyeOff size={20}/> : <Eye size={20}/>}
                     </button>
                  </div>
               </div>

               {/* Actions Row */}
               <div className="flex items-center justify-between pt-2">
                   <div className="flex items-center gap-2 text-[11px] font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-md border border-green-100">
                      <ShieldCheck size={12} /> SSL Encrypted
                   </div>
                   <Link to="/admin/forgot-password" classNam="text-sm font-bold text-red-600 hover:underline">
                      Forgot Password?
                   </Link>
               </div>

               {/* Submit Button */}
               <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold text-lg shadow-xl hover:bg-black hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
               >
                  {loading ? (
                     <>Verifying...</>
                  ) : (
                     <>Access Dashboard <ArrowRight size={20}/></>
                  )}
               </button>
            </motion.form>
         </motion.div>
      </div>

    </div>
  );
}