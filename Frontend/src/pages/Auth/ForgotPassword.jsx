// import { useState, useRef } from "react";
// import { motion } from "framer-motion";
// import { Link, useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// import { forgotPassword, resetPassword } from "../../api/api";
// import { Mail, Key, Eye, EyeOff, Sparkles, ShieldCheck } from "lucide-react";

// export default function ForgotPassword() {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [otpSent, setOtpSent] = useState(false);

//   const [otp, setOtp] = useState("");
//   const [shake, setShake] = useState(false);

//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const [loading, setLoading] = useState(false);

//   const otpRefs = useRef([]);
//   const passwordRef = useRef(null);

//   const otpLength = 6;

//   const triggerShake = () => {
//     setShake(true);
//     setTimeout(() => setShake(false), 450);
//   };

//   // ============================
//   // OTP INPUT LOGIC
//   // ============================
//   const handleOtpChange = (value, idx) => {
//     if (!/^\d?$/.test(value)) return;

//     const arr = otp.padEnd(otpLength, " ").split("");
//     arr[idx] = value || " ";
//     const newOtp = arr.join("").trim();

//     setOtp(newOtp);

//     if (value && idx < otpLength - 1) {
//       otpRefs.current[idx + 1]?.focus();
//     }

//     if (idx === otpLength - 1 && value) {
//       setTimeout(() => passwordRef.current?.focus(), 150);
//     }
//   };

//   const handleOtpKeyDown = (e, idx) => {
//     if (e.key === "Backspace") {
//       const arr = otp.padEnd(otpLength, " ").split("");

//       if (!arr[idx] && idx > 0) {
//         otpRefs.current[idx - 1]?.focus();
//       }

//       arr[idx] = " ";
//       setOtp(arr.join("").trim());
//     }
//   };

//   // ============================
//   // STEP 1 — SEND OTP
//   // ============================
//   const handleSendOtp = async (e) => {
//     e.preventDefault();

//     if (!email.trim()) {
//       toast.error("Please enter email ❌");
//       return triggerShake();
//     }

//     try {
//       setLoading(true);

//       const res = await forgotPassword(email.trim());
//       toast.success(res?.data || "OTP sent successfully 📧");

//       setOtp("");
//       setOtpSent(true);

//       setTimeout(() => otpRefs.current[0]?.focus(), 120);
//     } catch (err) {
//       toast.error(err?.response?.data || "Failed to send OTP ❌");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ============================
//   // STEP 2 — RESET PASSWORD
//   // ============================
//   const handleReset = async (e) => {
//     e.preventDefault();

//     if (otp.trim().length < 6) {
//       toast.error("Enter full 6-digit OTP ❌");
//       return triggerShake();
//     }

//     if (!password || !confirmPassword) {
//       toast.error("Password cannot be empty ❌");
//       return triggerShake();
//     }

//     if (password !== confirmPassword) {
//       toast.error("Passwords do not match ✘");
//       return triggerShake();
//     }

//     try {
//       setLoading(true);

//       const payload = {
//         email: email.trim(),
//         otp: otp.trim(),
//         newPassword: password.trim(),
//       };

//       const res = await resetPassword(payload);
//       toast.success(res?.data || "Password reset successfully 🔐");

//       navigate("/login");
//     } catch (err) {
//       toast.error(err?.response?.data || "Failed to reset password ❌");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-[85vh] flex items-center justify-center bg-gradient-to-b from-white via-red-50/20 to-gray-100 px-4 py-10">
//       <motion.div
//         initial={{ opacity: 0, y: 50, scale: 0.96 }}
//         animate={{ opacity: 1, y: 0, scale: 1 }}
//         transition={{ duration: 0.55 }}
//         className="bg-white w-full max-w-md rounded-3xl shadow-2xl border px-8 py-10"
//       >
//         {/* Badge */}
//         <motion.div
//           initial={{ scale: 0 }}
//           animate={{ scale: 1 }}
//           transition={{ type: "spring", delay: 0.1 }}
//           className="flex justify-center mb-5"
//         >
//           <div className="rounded-full bg-[#E23744]/15 px-4 py-2 flex items-center gap-1 text-[#E23744] font-bold text-sm">
//             <ShieldCheck className="w-4 h-4" />
//             Secure Reset
//           </div>
//         </motion.div>

//         {/* Title */}
//         <h2 className="text-3xl font-extrabold bg-gradient-to-r from-[#E23744] to-pink-600 bg-clip-text text-transparent text-center mb-8">
//           Forgot Password 🔐
//         </h2>

//         {/* ======================
//              STEP 1 — EMAIL INPUT
//            ====================== */}
//         {!otpSent && (
//           <motion.form
//             onSubmit={handleSendOtp}
//             animate={shake ? { x: [-6, 6, -6, 6, 0] } : {}}
//             className="space-y-6"
//           >
//             <div className="relative">
//               <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5" />
//               <input
//                 type="email"
//                 placeholder="Registered Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full pl-11 pr-3 py-3 rounded-xl border border-gray-300 focus:border-[#E23744] focus:ring-2 focus:ring-[#E23744]/30 outline-none shadow-sm"
//               />
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className={`w-full py-3 rounded-xl font-semibold text-white shadow-lg transition-all ${
//                 loading
//                   ? "bg-[#E23744]/60 cursor-not-allowed"
//                   : "bg-gradient-to-r from-[#E23744] to-pink-600 hover:from-pink-600 hover:to-[#E23744]"
//               }`}
//             >
//               {loading ? "Sending OTP..." : "Send OTP"}
//             </button>
//           </motion.form>
//         )}

//         {/* ======================
//              STEP 2 — OTP + RESET
//            ====================== */}
//         {otpSent && (
//           <motion.form
//             onSubmit={handleReset}
//             animate={shake ? { x: [-6, 6, -6, 6, 0] } : {}}
//             className="space-y-6"
//           >
//             <p className="text-center text-gray-700">
//               OTP sent to <b>{email}</b>
//             </p>

//             {/* OTP ROW */}
//             <div className="flex justify-center gap-2 mb-4">
//               {Array.from({ length: otpLength }).map((_, idx) => (
//                 <input
//                   key={idx}
//                   maxLength={1}
//                   value={otp[idx] || ""}
//                   ref={(el) => (otpRefs.current[idx] = el)}
//                   onChange={(e) => handleOtpChange(e.target.value, idx)}
//                   onKeyDown={(e) => handleOtpKeyDown(e, idx)}
//                   inputMode="numeric"
//                   className="w-12 h-14 rounded-xl border text-center text-2xl font-bold shadow-sm focus:ring-2 focus:ring-[#E23744]/30 outline-none"
//                 />
//               ))}
//             </div>

//             {/* NEW PASSWORD */}
//             <PasswordField
//               label="New Password"
//               value={password}
//               setValue={setPassword}
//               inputRef={passwordRef}
//             />

//             {/* CONFIRM PASSWORD */}
//             <PasswordField
//               label="Confirm Password"
//               value={confirmPassword}
//               setValue={setConfirmPassword}
//             />

//             <button
//               type="submit"
//               disabled={loading}
//               className={`w-full py-3 rounded-xl font-semibold text-white shadow-lg transition-all ${
//                 loading
//                   ? "bg-[#E23744]/60 cursor-not-allowed"
//                   : "bg-gradient-to-r from-[#E23744] to-pink-600 hover:from-pink-600 hover:to-[#E23744]"
//               }`}
//             >
//               {loading ? "Resetting..." : "Reset Password"}
//             </button>

//             <button
//               type="button"
//               onClick={() => {
//                 setOtpSent(false);
//                 setOtp("");
//                 setPassword("");
//                 setConfirmPassword("");
//               }}
//               className="text-xs block mx-auto text-gray-500 underline mt-3"
//             >
//               Change Email
//             </button>
//           </motion.form>
//         )}

//         {/* Footer Text */}
//         <p className="text-sm text-center text-gray-600 mt-8">
//           Remember your password?{" "}
//           <Link
//             to="/login"
//             className="text-[#E23744] font-semibold hover:underline"
//           >
//             Login
//           </Link>
//         </p>
//       </motion.div>
//     </div>
//   );
// }

// /* Reusable Password Field */
// function PasswordField({ label, value, setValue, inputRef }) {
//   const [visible, setVisible] = useState(false);

//   return (
//     <div className="relative">
//       <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5" />

//       <input
//         type={visible ? "text" : "password"}
//         placeholder={label}
//         value={value}
//         ref={inputRef || null}
//         onChange={(e) => setValue(e.target.value)}
//         className="w-full pl-11 pr-12 py-3 rounded-xl border border-gray-300 focus:border-[#E23744] focus:ring-2 focus:ring-[#E23744]/30 outline-none shadow-sm"
//       />

//       <span
//         onClick={() => setVisible(!visible)}
//         className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-[#E23744]"
//       >
//         {visible ? <EyeOff /> : <Eye />}
//       </span>
//     </div>
//   );
// }






import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Mail,
  Key,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowRight,
  ChevronLeft,
  Lock
} from "lucide-react";

import { forgotPassword, resetPassword } from "../../api/api";

// Animation Variants
const slideUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.3 } }
};

export default function ForgotPassword() {
  const navigate = useNavigate();

  // --- STATE ---
  const [step, setStep] = useState(1); // 1: Email, 2: OTP & New Password
  const [loading, setLoading] = useState(false);
  const [isShake, setIsShake] = useState(false);
  
  // Data State
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Refs
  const otpInputs = useRef([]);
  const emailRef = useRef(null);

  // Focus email on mount
  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  // --- HELPERS ---
  const triggerShake = () => {
    setIsShake(true);
    setTimeout(() => setIsShake(false), 450);
  };

  const otpArray = (otpVal) => otpVal.padEnd(6, " ").split("");

  const handleOtpInput = (val, i) => {
    if (!/^\d?$/.test(val)) return;
    const arr = otpArray(otp);
    arr[i] = val || " ";
    setOtp(arr.join("").trim());
    if (val && i < 5) otpInputs.current[i + 1]?.focus();
  };

  const handleOtpBackspace = (e, i) => {
    if (e.key !== "Backspace") return;
    const arr = otpArray(otp);
    if (!arr[i] && i > 0) otpInputs.current[i - 1]?.focus();
    arr[i] = " ";
    setOtp(arr.join("").trim());
  };

  // --- HANDLERS ---

  // Step 1: Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email");
      triggerShake();
      return;
    }

    setLoading(true);
    try {
      const res = await forgotPassword(email.trim());
      toast.success(res?.data || "OTP sent to your email! 📧");
      setStep(2);
      // Slight delay to allow render before focusing OTP
      setTimeout(() => otpInputs.current[0]?.focus(), 200);
    } catch (err) {
      toast.error(err?.response?.data || "Failed to send OTP");
      triggerShake();
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Reset Password
  const handleReset = async (e) => {
    e.preventDefault();
    
    if (otp.trim().length < 6) {
      toast.error("Enter full 6-digit OTP");
      triggerShake();
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 chars");
      triggerShake();
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      triggerShake();
      return;
    }

    setLoading(true);
    try {
      const payload = {
        email: email.trim(),
        otp: otp.trim(),
        newPassword: password.trim(),
      };
      const res = await resetPassword(payload);
      toast.success(res?.data || "Password reset successful! 🔐");
      navigate("/login");
    } catch (err) {
      toast.error(err?.response?.data || "Reset failed. Check OTP.");
      triggerShake();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFDFD] font-sans overflow-hidden relative">
      
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute top-[10%] right-[10%] w-[500px] h-[500px] bg-red-50/60 rounded-full blur-[120px]"/>
         <div className="absolute bottom-[10%] left-[10%] w-[600px] h-[600px] bg-orange-50/60 rounded-full blur-[120px]"/>
      </div>

      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-0 bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100 relative z-10 m-4 min-h-[600px]">
        
        {/* --- LEFT SIDE: IMAGE --- */}
        <div className="bg-gray-900 text-white hidden md:flex flex-col justify-between relative overflow-hidden">
           <img 
              src="https://i.pinimg.com/736x/b5/96/04/b596043c735b4e56e3cd4881184cd805.jpg" 
              alt="Security"
              className="absolute inset-0 w-full h-full object-cover opacity-40"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"/>
           
           <div className="relative z-10 p-12 mt-auto">
              <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-red-900/50">
                 <ShieldCheck size={28} className="text-white"/>
              </div>
              <h2 className="text-4xl font-bold font-['Playfair_Display'] leading-tight mb-4">
                 Secure your <br/><span className="text-red-500">Digital Taste.</span>
              </h2>
              <p className="text-gray-400">Don't worry, it happens to the best of us. We'll help you get back to your food in no time.</p>
           </div>
        </div>

        {/* --- RIGHT SIDE: FORM --- */}
        <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white relative">
           
           <AnimatePresence mode="wait">
              {/* STEP 1: EMAIL */}
              {step === 1 && (
                 <motion.div key="step1" variants={slideUp} initial="hidden" animate="visible" exit="exit" className="w-full max-w-sm mx-auto">
                    <div className="mb-8">
                       <Link to="/login" className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600 mb-6 transition-colors"><ChevronLeft size={16}/> Back to Login</Link>
                       <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Forgot Password?</h2>
                       <p className="text-gray-500">Enter your email to receive a recovery code.</p>
                    </div>

                    <form onSubmit={handleSendOtp} className={`space-y-6 ${isShake ? "animate-shake" : ""}`}>
                       <div className="space-y-1">
                          <label className="text-xs font-bold text-gray-900 uppercase tracking-wide ml-1">Email Address</label>
                          <div className="relative group">
                             <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors" size={20}/>
                             <input 
                                ref={emailRef}
                                type="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="john@example.com"
                                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-50 transition-all font-medium text-gray-700"
                             />
                          </div>
                       </div>

                       <button disabled={loading} type="submit" className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold text-lg shadow-xl shadow-gray-200 hover:bg-black transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                          {loading ? "Sending Code..." : <>Send Code <ArrowRight size={20}/></>}
                       </button>
                    </form>
                 </motion.div>
              )}

              {/* STEP 2: RESET */}
              {step === 2 && (
                 <motion.div key="step2" variants={slideUp} initial="hidden" animate="visible" exit="exit" className="w-full max-w-sm mx-auto">
                    <div className="mb-8 text-center">
                       <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Reset Password</h2>
                       <p className="text-gray-500 text-sm">Code sent to <span className="font-bold text-gray-800">{email}</span></p>
                    </div>

                    <form onSubmit={handleReset} className={`space-y-6 ${isShake ? "animate-shake" : ""}`}>
                       
                       {/* OTP Grid */}
                       <div className="flex justify-center gap-2 sm:gap-3 mb-6">
                          {Array.from({ length: 6 }).map((_, i) => (
                             <input
                                key={i}
                                maxLength={1}
                                ref={(el) => (otpInputs.current[i] = el)}
                                value={otpArray(otp)[i] === " " ? "" : otpArray(otp)[i]}
                                onChange={(e) => handleOtpInput(e.target.value, i)}
                                onKeyDown={(e) => handleOtpBackspace(e, i)}
                                className="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl font-bold border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-50 outline-none transition-all bg-gray-50 focus:bg-white"
                             />
                          ))}
                       </div>

                       <div className="space-y-4">
                          <PasswordField label="New Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                          <PasswordField label="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                       </div>

                       <button disabled={loading} type="submit" className="w-full py-4 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-red-200 transition-all flex items-center justify-center gap-2 disabled:opacity-70 mt-4">
                          {loading ? "Updating..." : <>Reset Password <Lock size={18}/></>}
                       </button>

                       <button type="button" onClick={() => setStep(1)} className="w-full text-center text-sm text-gray-500 font-medium hover:text-gray-800 underline">
                          Change Email
                       </button>
                    </form>
                 </motion.div>
              )}
           </AnimatePresence>

        </div>
      </div>
    </div>
  );
}

/* Reusable Password Field */
function PasswordField({ label, value, onChange }) {
   const [visible, setVisible] = useState(false);
   return (
      <div className="space-y-1">
         <label className="text-xs font-bold text-gray-900 uppercase tracking-wide ml-1">{label}</label>
         <div className="relative group">
            <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors" size={20}/>
            <input 
               type={visible ? "text" : "password"}
               value={value}
               onChange={onChange}
               placeholder="••••••••"
               className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-50 transition-all font-medium"
            />
            <button type="button" onClick={() => setVisible(!visible)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none">
               {visible ? <EyeOff size={20}/> : <Eye size={20}/>}
            </button>
         </div>
      </div>
   );
}