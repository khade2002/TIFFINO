// import { useState, useRef, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import toast from "react-hot-toast";
// import { Eye, EyeOff, Mail, User, Key, MapPin, Phone } from "lucide-react";

// import { sendOtp, verifyOtp, registerUser } from "../../api/api";
// import { useAuth } from "../../context/AuthContext";

// export default function Signup() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { login } = useAuth();

//   const [step, setStep] = useState(1);
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     // otp will be stored as a **string**, but we always treat it as 6 chars using helpers
//     otp: "",
//     mobile: "",
//     address: "",
//     landmark: "",
//     state: "",
//     district: "",
//     pincode: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [timer, setTimer] = useState(0);

//   // refs for OTP inputs
//   const otpInputs = useRef([]);

//   // timer reducer
//   useEffect(() => {
//     if (timer <= 0) return;
//     const id = setInterval(() => setTimer((t) => t - 1), 1000);
//     return () => clearInterval(id);
//   }, [timer]);

//   const handleChange = (e) =>
//     setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

//   // helper: always returns array length 6
//   const otpArray = (otpString) => otpString.padEnd(6, " ").split("");

//   // controlled value helper for input i
//   const otpValueAt = (i) => {
//     const arr = otpArray(form.otp);
//     return arr[i] === " " ? "" : arr[i];
//   };

//   // handle OTP digit input
//   const handleOtpChange = (value, idx) => {
//     if (!/^\d?$/.test(value)) return; // allow only one digit or empty

//     const arr = otpArray(form.otp);
//     arr[idx] = value || " ";
//     const newOtp = arr.join("").trim(); // trim so stored is compact once filled
//     setForm((s) => ({ ...s, otp: newOtp }));

//     if (value && idx < 5) {
//       otpInputs.current[idx + 1]?.focus();
//     }
//   };

//   // backspace behavior
//   const handleOtpKeyDown = (e, idx) => {
//     if (e.key === "Backspace") {
//       const arr = otpArray(form.otp);
//       // if current input empty, move back
//       if (!arr[idx] && idx > 0) {
//         otpInputs.current[idx - 1]?.focus();
//       } else {
//         // clear current char
//         arr[idx] = " ";
//         setForm((s) => ({ ...s, otp: arr.join("").trim() }));
//       }
//     }
//   };

//   // ------------------------------
//   // STEP 1 — SEND OTP
//   // ------------------------------
//   const handleGenerateOtp = async () => {
//     if (!form.name?.trim() || !form.email?.trim()) {
//       return toast.error("Please enter name & email ❌");
//     }

//     try {
//       setLoading(true);
//       const res = await sendOtp(form.email.trim());
//       toast.success(res?.data || "OTP sent successfully 📧");
//       setStep(2);
//       setTimer(30);
//       // small delay then focus first input
//       setTimeout(() => otpInputs.current[0]?.focus(), 80);
//     } catch (err) {
//       console.error("sendOtp error:", err);
//       toast.error(err?.response?.data || "Failed to send OTP ❌");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ------------------------------
//   // STEP 2 — VERIFY OTP
//   // ------------------------------
//   const handleVerifyOtp = async () => {
//     const otp = otpArray(form.otp).join("").trim();
//     if (otp.length < 6) return toast.error("Enter 6-digit OTP ❌");

//     try {
//       setLoading(true);

//       // --- CALL verifyOtp using object payload (this matches api.js expected shape) ---
//       const res = await verifyOtp({ email: form.email.trim(), otp });

//       const resp = String(res?.data || "").toLowerCase();
//       if (resp.includes("success") || resp.includes("verified")) {
//         toast.success("OTP Verified ✅");
//         setStep(3);
//         return;
//       }

//       // handle explicit invalid response
//       if (resp.includes("invalid") || resp.includes("wrong") || resp.includes("fail")) {
//         toast.error("Invalid OTP ❌");
//         return;
//       }

//       // fallback: if server returned something unexpected, show message
//       toast.error(res?.data || "OTP verification failed ❌");
//     } catch (err) {
//       console.error("verifyOtp error:", err);
//       // show server message if present
//       const serverMsg = err?.response?.data;
//       if (serverMsg) {
//         toast.error(serverMsg);
//       } else {
//         toast.error("OTP verification failed ❌");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ------------------------------
//   // STEP 3 — REGISTER USER
//   // ------------------------------
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const required = [
//       "mobile",
//       "address",
//       "state",
//       "district",
//       "pincode",
//       "password",
//       "confirmPassword",
//     ];

//     for (const field of required) {
//       if (!form[field]?.trim()) {
//         return toast.error(`Please enter ${field} ❌`);
//       }
//     }

//     if (form.password !== form.confirmPassword)
//       return toast.error("Passwords do not match ❌");

//     try {
//       setLoading(true);

//       const payload = {
//         name: form.name.trim(),
//         email: form.email.trim(),
//         mobile: form.mobile.trim(),
//         address: form.address.trim(),
//         landmark: form.landmark?.trim(),
//         state: form.state.trim(),
//         district: form.district.trim(),
//         pincode: form.pincode.trim(),
//         password: form.password,
//       };

//       const res = await registerUser(payload);

//       // Duplicate detection: server may return 409 or message contains 'already'
//       if (res?.status === 409 || String(res?.data || "").toLowerCase().includes("already")) {
//         toast.error("User already registered with this email ❌");
//         return;
//       }

//       // Success check
//       const msg = String(res?.data || "").toLowerCase();
//       if (msg.includes("success") || msg.includes("registered")) {
//         toast.success("Account created 🎉");

//         // try auto-login (optional)
//         const logged = await login({ email: payload.email, password: payload.password });
//         if (logged) {
//           const redirectTo = location.state?.from?.pathname || "/profile";
//           navigate(redirectTo, { replace: true });
//         } else {
//           navigate("/login");
//         }
//         return;
//       }

//       // Unknown response
//       toast.error(res?.data || "Registration failed ❌");
//     } catch (err) {
//       console.error("registerUser error:", err);
//       const serverMsg = err?.response?.data;
//       if (serverMsg) toast.error(serverMsg);
//       else toast.error("Signup failed ❌");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // short UI helpers
//   const otpInputsRender = Array.from({ length: 6 }).map((_, i) => (
//     <input
//       key={i}
//       maxLength={1}
//       inputMode="numeric"
//       ref={(el) => (otpInputs.current[i] = el)}
//       value={otpValueAt(i)}
//       onChange={(e) => handleOtpChange(e.target.value, i)}
//       onKeyDown={(e) => handleOtpKeyDown(e, i)}
//       className="w-12 h-14 text-center text-2xl font-bold border rounded-xl"
//       aria-label={`otp-${i}`}
//     />
//   ));

//   return (
//     <div className="min-h-[88vh] flex items-center justify-center bg-gradient-to-b from-white via-red-50/30 to-gray-50 px-4 py-8">
//       <motion.div
//         initial={{ opacity: 0, y: 50, scale: 0.98 }}
//         animate={{ opacity: 1, y: 0, scale: 1 }}
//         transition={{ duration: 0.6 }}
//         className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border px-8 py-10 sm:p-12"
//       >
//         <motion.h2 className="text-3xl font-extrabold bg-gradient-to-r from-[#E23744] to-pink-600 bg-clip-text text-transparent text-center mb-8">
//           Create an Account ✨
//         </motion.h2>

//         {/* STEP 1 */}
//         <AnimatePresence>
//           {step === 1 && (
//             <motion.div key="step1" initial={{ y: 15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="space-y-6">
//               <div className="relative">
//                 <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
//                 <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} className="w-full pl-10 pr-3 py-3 rounded-xl border" />
//               </div>

//               <div className="relative">
//                 <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
//                 <input name="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full pl-10 pr-3 py-3 rounded-xl border" />
//               </div>

//               <button onClick={handleGenerateOtp} disabled={loading} className="w-full py-3 rounded-xl bg-gradient-to-r from-[#E23744] to-pink-600 text-white font-bold">
//                 {loading ? "Sending OTP..." : "Generate OTP"}
//               </button>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* STEP 2 */}
//         <AnimatePresence>
//           {step === 2 && (
//             <motion.div key="step2" initial={{ y: 15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="space-y-6">
//               <p className="text-center text-gray-700">Enter OTP sent to <b>{form.email}</b></p>

//               <div className="flex justify-center gap-3">{otpInputsRender}</div>

//               <button onClick={handleVerifyOtp} disabled={loading} className="w-full py-3 rounded-xl bg-gradient-to-r from-[#E23744] to-pink-600 text-white font-bold">
//                 {loading ? "Verifying..." : "Verify OTP"}
//               </button>

//               {timer > 0 ? <p className="text-center text-gray-500">Resend OTP in <b>{timer}</b>s</p> : <button onClick={handleGenerateOtp} className="block w-full text-center text-[#E23744] underline">Resend OTP</button>}
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* STEP 3 */}
//         <AnimatePresence>
//           {step === 3 && (
//             <motion.form key="step3" onSubmit={handleSubmit} initial={{ y: 15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="space-y-6">
//               <div className="relative">
//                 <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
//                 <input name="mobile" placeholder="Mobile" value={form.mobile} onChange={handleChange} className="w-full pl-10 pr-3 py-3 rounded-xl border" />
//               </div>

//               <div className="relative">
//                 <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
//                 <input name="address" placeholder="Address" value={form.address} onChange={handleChange} className="w-full pl-10 pr-3 py-3 rounded-xl border" />
//               </div>

//               <input name="landmark" placeholder="Landmark (optional)" value={form.landmark} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border" />
//               <input name="state" placeholder="State" value={form.state} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border" />
//               <input name="district" placeholder="District" value={form.district} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border" />
//               <input name="pincode" placeholder="Pincode" value={form.pincode} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border" />

//               <div className="relative">
//                 <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
//                 <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full pl-10 pr-12 py-3 rounded-xl border" />
//                 <span onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">{showPassword ? <EyeOff /> : <Eye />}</span>
//               </div>

//               <div className="relative">
//                 <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
//                 <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} className="w-full pl-10 pr-12 py-3 rounded-xl border" />
//                 <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">{showConfirmPassword ? <EyeOff /> : <Eye />}</span>
//               </div>

//               <button type="submit" disabled={loading} className="w-full py-3 rounded-xl bg-gradient-to-r from-[#E23744] to-pink-600 text-white font-bold">
//                 {loading ? "Signing up..." : "Sign Up"}
//               </button>
//             </motion.form>
//           )}
//         </AnimatePresence>

//         <p className="text-sm text-center text-gray-600 mt-6">
//           Already have an account? <Link to="/login" className="text-[#E23744] font-semibold hover:underline">Login</Link>
//         </p>
//       </motion.div>
//     </div>
//   );
// }



// import { useState, useRef, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import toast from "react-hot-toast";
// import { Eye, EyeOff, Mail, User, Key, Phone } from "lucide-react";

// import { sendOtp, verifyOtp, registerUser } from "../../api/api";
// import { useAuth } from "../../context/AuthContext";

// export default function Signup() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { login } = useAuth();

//   const [step, setStep] = useState(1);
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     otp: "",
//     mobile: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [timer, setTimer] = useState(0);

//   const otpInputs = useRef([]);

//   useEffect(() => {
//     if (timer <= 0) return;
//     const id = setInterval(() => setTimer((t) => t - 1), 1000);
//     return () => clearInterval(id);
//   }, [timer]);

//   const handleChange = (e) =>
//     setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

//   const otpArray = (otpString) => otpString.padEnd(6, " ").split("");

//   const otpValueAt = (i) => {
//     const arr = otpArray(form.otp);
//     return arr[i] === " " ? "" : arr[i];
//   };

//   const handleOtpChange = (value, idx) => {
//     if (!/^\d?$/.test(value)) return;

//     const arr = otpArray(form.otp);
//     arr[idx] = value || " ";
//     const newOtp = arr.join("").trim();
//     setForm((s) => ({ ...s, otp: newOtp }));

//     if (value && idx < 5) {
//       otpInputs.current[idx + 1]?.focus();
//     }
//   };

//   const handleOtpKeyDown = (e, idx) => {
//     if (e.key === "Backspace") {
//       const arr = otpArray(form.otp);

//       if (!arr[idx] && idx > 0) otpInputs.current[idx - 1]?.focus();
//       else {
//         arr[idx] = " ";
//         setForm((s) => ({ ...s, otp: arr.join("").trim() }));
//       }
//     }
//   };

//   // STEP 1 — SEND OTP
//   const handleGenerateOtp = async () => {
//     if (!form.name?.trim() || !form.email?.trim()) {
//       return toast.error("Please enter name & email ❌");
//     }

//     try {
//       setLoading(true);
//       const res = await sendOtp(form.email.trim());
//       toast.success(res?.data || "OTP sent successfully 📧");

//       setStep(2);
//       setTimer(30);

//       setTimeout(() => otpInputs.current[0]?.focus(), 80);
//     } catch (err) {
//       toast.error(err?.response?.data || "Failed to send OTP ❌");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // STEP 2 — VERIFY OTP
//   const handleVerifyOtp = async () => {
//     const otp = otpArray(form.otp).join("").trim();
//     if (otp.length < 6) return toast.error("Enter 6-digit OTP ❌");

//     try {
//       setLoading(true);
//       const res = await verifyOtp({ email: form.email.trim(), otp });

//       const msg = String(res?.data || "").toLowerCase();

//       if (msg.includes("success")) {
//         toast.success("OTP Verified ✅");
//         setStep(3);
//         return;
//       }

//       toast.error(res?.data || "Invalid OTP ❌");
//     } catch {
//       toast.error("OTP verification failed ❌");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // STEP 3 — REGISTER USER
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!form.mobile.trim()) return toast.error("Please enter mobile number ❌");
//     if (!form.password.trim() || !form.confirmPassword.trim())
//       return toast.error("Please enter password ❌");

//     if (form.password !== form.confirmPassword)
//       return toast.error("Passwords do not match ❌");

//     try {
//       setLoading(true);

//       const payload = {
//         name: form.name.trim(),
//         email: form.email.trim(),
//         mobile: form.mobile.trim(),
//         password: form.password.trim(),
//       };

//       const res = await registerUser(payload);
//       const msg = String(res?.data || "").toLowerCase();

//       if (msg.includes("registered")) {
//         toast.success("Account created 🎉");

//         const logged = await login({
//           email: payload.email,
//           password: payload.password,
//         });

//         if (logged) {
//           const redirectTo = location.state?.from?.pathname || "/profile";
//           navigate(redirectTo, { replace: true });
//         } else {
//           navigate("/login");
//         }
//         return;
//       }

//       toast.error(res?.data || "Registration failed ❌");
//     } catch (err) {
//       toast.error(err?.response?.data || "Signup failed ❌");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Render OTP boxes
//   const otpInputsRender = Array.from({ length: 6 }).map((_, i) => (
//     <input
//       key={i}
//       maxLength={1}
//       inputMode="numeric"
//       ref={(el) => (otpInputs.current[i] = el)}
//       value={otpValueAt(i)}
//       onChange={(e) => handleOtpChange(e.target.value, i)}
//       onKeyDown={(e) => handleOtpKeyDown(e, i)}
//       className="w-12 h-14 text-center text-2xl font-bold border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E23744]"
//     />
//   ));

//   return (
//     <div className="min-h-[88vh] flex items-center justify-center bg-gradient-to-b from-white via-red-50/30 to-gray-50 px-4 py-8">
//       <motion.div
//         initial={{ opacity: 0, y: 50, scale: 0.98 }}
//         animate={{ opacity: 1, y: 0, scale: 1 }}
//         transition={{ duration: 0.6 }}
//         className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border px-8 py-10 sm:p-12"
//       >
//         <motion.h2 className="text-3xl font-extrabold bg-gradient-to-r from-[#E23744] to-pink-600 bg-clip-text text-transparent text-center mb-8">
//           Create an Account ✨
//         </motion.h2>

//         {/* STEP 1 */}
//         <AnimatePresence>
//           {step === 1 && (
//             <motion.div
//               key="step1"
//               initial={{ y: 15, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               className="space-y-6"
//             >
//               <div className="relative">
//                 <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
//                 <input
//                   name="name"
//                   placeholder="Full Name"
//                   value={form.name}
//                   onChange={handleChange}
//                   className="w-full pl-10 pr-3 py-3 rounded-xl border"
//                 />
//               </div>

//               <div className="relative">
//                 <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
//                 <input
//                   name="email"
//                   placeholder="Email"
//                   value={form.email}
//                   onChange={handleChange}
//                   className="w-full pl-10 pr-3 py-3 rounded-xl border"
//                 />
//               </div>

//               <button
//                 onClick={handleGenerateOtp}
//                 disabled={loading}
//                 className="w-full py-3 rounded-xl bg-gradient-to-r from-[#E23744] to-pink-600 text-white font-bold"
//               >
//                 {loading ? "Sending OTP..." : "Generate OTP"}
//               </button>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* STEP 2 */}
//         <AnimatePresence>
//           {step === 2 && (
//             <motion.div
//               key="step2"
//               initial={{ y: 15, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               className="space-y-6"
//             >
//               <p className="text-center text-gray-700">
//                 Enter OTP sent to <b>{form.email}</b>
//               </p>

//               <div className="flex justify-center gap-3">{otpInputsRender}</div>

//               <button
//                 onClick={handleVerifyOtp}
//                 disabled={loading}
//                 className="w-full py-3 rounded-xl bg-gradient-to-r from-[#E23744] to-pink-600 text-white font-bold"
//               >
//                 {loading ? "Verifying..." : "Verify OTP"}
//               </button>

//               {timer > 0 ? (
//                 <p className="text-center text-gray-500">
//                   Resend OTP in <b>{timer}</b>s
//                 </p>
//               ) : (
//                 <button
//                   onClick={handleGenerateOtp}
//                   className="block w-full text-center text-[#E23744] underline"
//                 >
//                   Resend OTP
//                 </button>
//               )}
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* STEP 3 */}
//         <AnimatePresence>
//           {step === 3 && (
//             <motion.form
//               key="step3"
//               onSubmit={handleSubmit}
//               initial={{ y: 15, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               className="space-y-6"
//             >
//               <div className="relative">
//                 <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
//                 <input
//                   name="mobile"
//                   placeholder="Mobile Number"
//                   value={form.mobile}
//                   onChange={handleChange}
//                   className="w-full pl-10 pr-3 py-3 rounded-xl border"
//                 />
//               </div>

//               <div className="relative">
//                 <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   placeholder="Password"
//                   value={form.password}
//                   onChange={handleChange}
//                   className="w-full pl-10 pr-12 py-3 rounded-xl border"
//                 />
//                 <span
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
//                 >
//                   {showPassword ? <EyeOff /> : <Eye />}
//                 </span>
//               </div>

//               <div className="relative">
//                 <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
//                 <input
//                   type={showConfirmPassword ? "text" : "password"}
//                   name="confirmPassword"
//                   placeholder="Confirm Password"
//                   value={form.confirmPassword}
//                   onChange={handleChange}
//                   className="w-full pl-10 pr-12 py-3 rounded-xl border"
//                 />
//                 <span
//                   onClick={() =>
//                     setShowConfirmPassword(!showConfirmPassword)
//                   }
//                   className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
//                 >
//                   {showConfirmPassword ? <EyeOff /> : <Eye />}
//                 </span>
//               </div>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full py-3 rounded-xl bg-gradient-to-r from-[#E23744] to-pink-600 text-white font-bold"
//               >
//                 {loading ? "Creating Account..." : "Sign Up"}
//               </button>
//             </motion.form>
//           )}
//         </AnimatePresence>

//         <p className="text-sm text-center text-gray-600 mt-6">
//           Already have an account?{" "}
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




// import { useState, useRef, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import toast from "react-hot-toast";

// import {
//   Eye,
//   EyeOff,
//   Mail,
//   User,
//   Key,
//   Phone,
//   ShieldCheck,
//   Sparkles,
// } from "lucide-react";

// import { sendOtp, verifyOtp, registerUser } from "../../api/api";
// import { useAuth } from "../../context/AuthContext";

// export default function Signup() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { login } = useAuth();

//   const [step, setStep] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [timer, setTimer] = useState(0);
//   const [shake, setShake] = useState(false);

//   const otpInputs = useRef([]);

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     otp: "",
//     mobile: "",
//     password: "",
//     confirmPassword: "",
//   });

//   // Auto-focus for Step 1
//   const nameRef = useRef(null);

//   useEffect(() => {
//     nameRef.current?.focus();
//   }, []);

//   // Handle countdown for resend OTP
//   useEffect(() => {
//     if (!timer) return;
//     const id = setInterval(() => setTimer((t) => t - 1), 1000);
//     return () => clearInterval(id);
//   }, [timer]);

//   const handleChange = (e) =>
//     setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

//   const triggerShake = () => {
//     setShake(true);
//     setTimeout(() => setShake(false), 450);
//   };

//   // Clean OTP into fixed length array
//   const otpArray = (otp) => otp.padEnd(6, " ").split("");

//   const otpValueAt = (i) => {
//     const arr = otpArray(form.otp);
//     return arr[i] === " " ? "" : arr[i];
//   };

//   const handleOtpInput = (val, i) => {
//     if (!/^\d?$/.test(val)) return;

//     const arr = otpArray(form.otp);
//     arr[i] = val || " ";
//     setForm((p) => ({ ...p, otp: arr.join("").trim() }));

//     if (val && i < 5) otpInputs.current[i + 1]?.focus();
//   };

//   const handleOtpBackspace = (e, i) => {
//     if (e.key !== "Backspace") return;

//     const arr = otpArray(form.otp);

//     if (!arr[i] && i > 0) otpInputs.current[i - 1]?.focus();
//     arr[i] = " ";

//     setForm((p) => ({ ...p, otp: arr.join("").trim() }));
//   };

//   // ============================
//   // STEP 1 — GENERATE OTP
//   // ============================
//   const handleGenerateOtp = async () => {
//     if (!form.name.trim() || !form.email.trim()) {
//       toast.error("Please fill all fields ❌");
//       triggerShake();
//       return;
//     }

//     try {
//       setLoading(true);
//       const res = await sendOtp(form.email.trim());
//       toast.success(res?.data || "OTP sent successfully 🎉");

//       setStep(2);
//       setTimer(30);

//       setTimeout(() => otpInputs.current[0]?.focus(), 100);
//     } catch (err) {
//       toast.error(err?.response?.data || "Failed to send OTP ❌");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ============================
//   // STEP 2 — VERIFY OTP
//   // ============================
//   const handleVerifyOtp = async () => {
//     const otp = otpArray(form.otp).join("").trim();

//     if (otp.length < 6) {
//       toast.error("Enter full 6-digit OTP ❌");
//       triggerShake();
//       return;
//     }

//     try {
//       setLoading(true);
//       const res = await verifyOtp({ email: form.email.trim(), otp });

//       const msg = String(res?.data || "").toLowerCase();

//       if (msg.includes("success")) {
//         toast.success("OTP Verified ✅");
//         setStep(3);
//         return;
//       }

//       toast.error(res?.data || "Invalid OTP ❌");
//       triggerShake();
//     } catch {
//       toast.error("OTP verification failed ❌");
//       triggerShake();
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ============================
//   // STEP 3 — REGISTER USER
//   // ============================
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!form.mobile.trim()) {
//       toast.error("Enter mobile number ❌");
//       return triggerShake();
//     }

//     if (form.password.length < 6) {
//       toast.error("Password must be 6+ chars ❌");
//       return triggerShake();
//     }

//     if (form.password !== form.confirmPassword) {
//       toast.error("Passwords do not match ❌");
//       return triggerShake();
//     }

//     const payload = {
//       name: form.name.trim(),
//       email: form.email.trim(),
//       mobile: form.mobile.trim(),
//       password: form.password.trim(),
//     };

//     try {
//       setLoading(true);

//       const res = await registerUser(payload);
//       const msg = String(res?.data || "").toLowerCase();

//       if (msg.includes("registered")) {
//         toast.success("Account created 🎉");

//         const logged = await login({
//           email: payload.email,
//           password: payload.password,
//         });

//         if (logged) {
//           const redirectTo = location.state?.from?.pathname || "/profile";
//           navigate(redirectTo, { replace: true });
//         } else {
//           navigate("/login");
//         }

//         return;
//       }

//       toast.error(res?.data || "Registration failed ❌");
//     } catch (err) {
//       toast.error(err?.response?.data || "Signup failed ❌");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // OTP UI renderer
//   const renderOtpInputs = Array.from({ length: 6 }).map((_, i) => (
//     <input
//       key={i}
//       maxLength={1}
//       inputMode="numeric"
//       ref={(el) => (otpInputs.current[i] = el)}
//       value={otpValueAt(i)}
//       onChange={(e) => handleOtpInput(e.target.value, i)}
//       onKeyDown={(e) => handleOtpBackspace(e, i)}
//       className="w-12 h-14 text-center text-2xl font-bold border rounded-xl focus:ring-2 focus:ring-[#E23744] outline-none tracking-wider"
//     />
//   ));

//   return (
//     <div className="min-h-[88vh] flex items-center justify-center bg-gradient-to-b from-white via-red-50/20 to-gray-100 px-4 py-10">
//       <motion.div
//         initial={{ opacity: 0, y: 50, scale: 0.96 }}
//         animate={{ opacity: 1, y: 0, scale: 1 }}
//         transition={{ duration: 0.55 }}
//         className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border px-8 py-10 sm:p-12"
//       >
//         {/* Badge */}
//         <motion.div
//           initial={{ scale: 0 }}
//           animate={{ scale: 1 }}
//           transition={{ type: "spring", delay: 0.15 }}
//           className="flex justify-center mb-4"
//         >
//           <div className="rounded-full bg-[#E23744]/15 px-4 py-2 flex items-center gap-1 text-[#E23744] font-bold text-sm">
//             <Sparkles className="w-4 h-4" />
//             Join Tiffino
//           </div>
//         </motion.div>

//         {/* Heading */}
//         <motion.h2
//           className="text-3xl font-extrabold bg-gradient-to-r from-[#E23744] to-pink-600 bg-clip-text text-transparent text-center mb-8"
//           initial={{ opacity: 0, y: 8 }}
//           animate={{ opacity: 1, y: 0 }}
//         >
//           Create an Account ✨
//         </motion.h2>

//         {/* Steps */}
//         <AnimatePresence mode="wait">
//           {/* STEP 1 */}
//           {step === 1 && (
//             <motion.div
//               key="step1"
//               initial={{ y: 20, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className={`space-y-6 ${shake ? "animate-shake" : ""}`}
//             >
//               <div className="relative">
//                 <User className="icon-left" />
//                 <input
//                   ref={nameRef}
//                   name="name"
//                   placeholder="Full Name"
//                   value={form.name}
//                   onChange={handleChange}
//                   className="input-box"
//                 />
//               </div>

//               <div className="relative">
//                 <Mail className="icon-left" />
//                 <input
//                   name="email"
//                   placeholder="Email"
//                   value={form.email}
//                   onChange={handleChange}
//                   className="input-box"
//                 />
//               </div>

//               <button
//                 onClick={handleGenerateOtp}
//                 disabled={loading}
//                 className="primary-btn"
//               >
//                 {loading ? "Sending OTP..." : "Generate OTP"}
//               </button>
//             </motion.div>
//           )}

//           {/* STEP 2 */}
//           {step === 2 && (
//             <motion.div
//               key="step2"
//               initial={{ y: 20, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className={`${shake ? "animate-shake" : ""}`}
//             >
//               <p className="text-center text-gray-700 mb-4">
//                 Enter OTP sent to <b>{form.email}</b>
//               </p>

//               <div className="flex justify-center gap-3 mb-6">
//                 {renderOtpInputs}
//               </div>

//               <button
//                 onClick={handleVerifyOtp}
//                 disabled={loading}
//                 className="primary-btn mb-4"
//               >
//                 {loading ? "Verifying..." : "Verify OTP"}
//               </button>

//               {timer > 0 ? (
//                 <p className="text-center text-gray-600 text-sm">
//                   Resend OTP in <b>{timer}</b>s
//                 </p>
//               ) : (
//                 <button
//                   onClick={handleGenerateOtp}
//                   className="w-full text-center text-[#E23744] font-semibold underline"
//                 >
//                   Resend OTP
//                 </button>
//               )}
//             </motion.div>
//           )}

//           {/* STEP 3 */}
//           {step === 3 && (
//             <motion.form
//               key="step3"
//               onSubmit={handleSubmit}
//               initial={{ y: 20, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className={`space-y-6 ${shake ? "animate-shake" : ""}`}
//             >
//               <div className="relative">
//                 <Phone className="icon-left" />
//                 <input
//                   name="mobile"
//                   placeholder="Mobile Number"
//                   value={form.mobile}
//                   onChange={handleChange}
//                   className="input-box"
//                 />
//               </div>

//               <PasswordField
//                 label="Password"
//                 name="password"
//                 value={form.password}
//                 onChange={handleChange}
//               />

//               <PasswordField
//                 label="Confirm Password"
//                 name="confirmPassword"
//                 value={form.confirmPassword}
//                 onChange={handleChange}
//               />

//               <button type="submit" disabled={loading} className="primary-btn">
//                 {loading ? "Creating Account..." : "Sign Up"}
//               </button>
//             </motion.form>
//           )}
//         </AnimatePresence>

//         <p className="text-sm text-center text-gray-600 mt-6">
//           Already have an account?{" "}
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

// /* Reusable password input field */
// function PasswordField({ label, name, value, onChange }) {
//   const [visible, setVisible] = useState(false);
//   return (
//     <div className="relative">
//       <Key className="icon-left" />
//       <input
//         type={visible ? "text" : "password"}
//         name={name}
//         placeholder={label}
//         value={value}
//         onChange={onChange}
//         className="input-box pr-12"
//       />
//       <span
//         className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-[#E23744]"
//         onClick={() => setVisible(!visible)}
//       >
//         {visible ? <EyeOff /> : <Eye />}
//       </span>
//     </div>
//   );
// }
// imp one ......






import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Eye,
  EyeOff,
  Mail,
  User,
  Key,
  Phone,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ChevronRight
} from "lucide-react";

import { sendOtp, verifyOtp, registerUser } from "../../api/api";
import { useAuth } from "../../context/AuthContext";

// --- ANIMATION VARIANTS ---
const slideUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.3 } }
};

export default function Signup() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isShake, setIsShake] = useState(false);

  const otpInputs = useRef([]);
  const nameRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    otp: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  // Focus name on mount
  useEffect(() => {
    if (step === 1) nameRef.current?.focus();
  }, [step]);

  // Countdown timer
  useEffect(() => {
    if (!timer) return;
    const id = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [timer]);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const triggerShake = () => {
    setIsShake(true);
    setTimeout(() => setIsShake(false), 450);
  };

  // OTP Logic
  const otpArray = (otp) => otp.padEnd(6, " ").split("");
  const handleOtpInput = (val, i) => {
    if (!/^\d?$/.test(val)) return;
    const arr = otpArray(form.otp);
    arr[i] = val || " ";
    setForm((p) => ({ ...p, otp: arr.join("").trim() }));
    if (val && i < 5) otpInputs.current[i + 1]?.focus();
  };
  const handleOtpBackspace = (e, i) => {
    if (e.key !== "Backspace") return;
    const arr = otpArray(form.otp);
    if (!arr[i] && i > 0) otpInputs.current[i - 1]?.focus();
    arr[i] = " ";
    setForm((p) => ({ ...p, otp: arr.join("").trim() }));
  };

  // --- HANDLERS ---

  const handleGenerateOtp = async () => {
    if (!form.name.trim() || !form.email.trim()) {
      toast.error("Please fill in all fields");
      triggerShake();
      return;
    }
    setLoading(true);
    try {
      const res = await sendOtp(form.email.trim());
      toast.success(res?.data || "OTP Sent!");
      setStep(2);
      setTimer(30);
    } catch (err) {
      toast.error(err?.response?.data || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    const otp = otpArray(form.otp).join("").trim();
    if (otp.length < 6) {
      toast.error("Please enter a valid 6-digit OTP");
      triggerShake();
      return;
    }
    setLoading(true);
    try {
      const res = await verifyOtp({ email: form.email.trim(), otp });
      if (String(res?.data || "").toLowerCase().includes("success")) {
        toast.success("Verified!");
        setStep(3);
      } else {
        throw new Error("Invalid OTP");
      }
    } catch (err) {
      toast.error(err?.message || "OTP Verification Failed");
      triggerShake();
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!form.mobile.trim() || form.password.length < 6 || form.password !== form.confirmPassword) {
      toast.error("Please check your details");
      triggerShake();
      return;
    }
    setLoading(true);
    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        mobile: form.mobile.trim(),
        password: form.password.trim(),
      };
      const res = await registerUser(payload);
      if (String(res?.data || "").toLowerCase().includes("registered")) {
        toast.success("Welcome to Tiffino! 🎉");
        await login({ email: payload.email, password: payload.password });
        navigate(location.state?.from?.pathname || "/profile", { replace: true });
      } else {
        throw new Error("Registration Failed");
      }
    } catch (err) {
      toast.error(err?.response?.data || "Signup Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFDFD] font-sans overflow-hidden relative">
      
      {/* BACKGROUND DECOR */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute top-[10%] left-[10%] w-[600px] h-[600px] bg-red-50/60 rounded-full blur-[120px]"/>
         <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-orange-50/60 rounded-full blur-[120px]"/>
      </div>

      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-0 bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100 relative z-10 m-4 min-h-[650px]">
        
        {/* --- LEFT SIDE: PROGRESS & INFO --- */}
        <div className="bg-gray-900 text-white p-12 hidden md:flex flex-col justify-between relative overflow-hidden">
           <div className="absolute inset-0 bg-[url('https://i.pinimg.com/736x/7b/c0/b0/7bc0b0ac773a06617464ebda6150b3d2.jpg')] opacity-10"/>
           <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/20 rounded-full blur-[80px]"/>
           
           <div className="relative z-10">
              <div className="flex items-center gap-2 mb-8">
                 <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center font-bold text-lg">T</div>
                 <span className="text-xl font-bold tracking-tight">Tiffino</span>
              </div>
              <h2 className="text-4xl font-bold font-['Playfair_Display'] leading-tight mb-4">
                 Join the <span className="text-red-500">Food Revolution.</span>
              </h2>
              <p className="text-gray-400">Create an account to start your journey with healthy, home-style meals.</p>
           </div>

           {/* Stepper */}
           <div className="relative z-10 space-y-6">
              {[
                 { id: 1, label: "Basic Info", desc: "Name & Email" },
                 { id: 2, label: "Verification", desc: "Enter OTP" },
                 { id: 3, label: "Secure", desc: "Password & Phone" }
              ].map((s) => (
                 <div key={s.id} className={`flex items-center gap-4 transition-opacity duration-300 ${step >= s.id ? "opacity-100" : "opacity-40"}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 font-bold ${step > s.id ? "bg-green-500 border-green-500 text-white" : step === s.id ? "bg-white text-gray-900 border-white" : "border-gray-600 text-gray-400"}`}>
                       {step > s.id ? <CheckCircle2 size={20}/> : s.id}
                    </div>
                    <div>
                       <p className="font-bold text-sm">{s.label}</p>
                       <p className="text-xs text-gray-400">{s.desc}</p>
                    </div>
                 </div>
              ))}
           </div>
        </div>

        {/* --- RIGHT SIDE: FORM --- */}
        <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white relative">
           
           <div className="md:hidden mb-8 text-center">
              <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
              <p className="text-gray-500 text-sm mt-1">Step {step} of 3</p>
           </div>

           <AnimatePresence mode="wait">
              
              {/* STEP 1: BASIC INFO */}
              {step === 1 && (
                 <motion.div key="step1" variants={slideUp} initial="hidden" animate="visible" exit="exit" className="w-full max-w-sm mx-auto">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 hidden md:block">Let's get started</h3>
                    
                    <div className="space-y-5">
                       <div className="space-y-1">
                          <label className="text-xs font-bold text-gray-900 uppercase tracking-wide ml-1">Full Name</label>
                          <div className="relative group">
                             <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors" size={20}/>
                             <input 
                                ref={nameRef}
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-50 transition-all font-medium"
                             />
                          </div>
                       </div>

                       <div className="space-y-1">
                          <label className="text-xs font-bold text-gray-900 uppercase tracking-wide ml-1">Email Address</label>
                          <div className="relative group">
                             <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors" size={20}/>
                             <input 
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="john@example.com"
                                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-50 transition-all font-medium"
                             />
                          </div>
                       </div>

                       <button onClick={handleGenerateOtp} disabled={loading} className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold text-lg shadow-xl hover:bg-black transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-70">
                          {loading ? "Sending OTP..." : <>Next Step <ArrowRight size={20}/></>}
                       </button>
                    </div>
                 </motion.div>
              )}

              {/* STEP 2: OTP */}
              {step === 2 && (
                 <motion.div key="step2" variants={slideUp} initial="hidden" animate="visible" exit="exit" className="w-full max-w-sm mx-auto text-center">
                    <div className="mb-8">
                       <h3 className="text-2xl font-bold text-gray-900">Verify Email</h3>
                       <p className="text-gray-500 text-sm mt-2">Enter the 6-digit code sent to <span className="font-bold text-gray-900">{form.email}</span></p>
                    </div>

                    <div className="flex justify-center gap-2 sm:gap-3 mb-8">
                       {Array.from({ length: 6 }).map((_, i) => (
                          <input
                             key={i}
                             maxLength={1}
                             ref={(el) => (otpInputs.current[i] = el)}
                             value={otpArray(form.otp)[i] === " " ? "" : otpArray(form.otp)[i]}
                             onChange={(e) => handleOtpInput(e.target.value, i)}
                             onKeyDown={(e) => handleOtpBackspace(e, i)}
                             className="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl font-bold border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-50 outline-none transition-all bg-gray-50 focus:bg-white"
                          />
                       ))}
                    </div>

                    <button onClick={handleVerifyOtp} disabled={loading} className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold text-lg shadow-xl hover:bg-black transition-all flex items-center justify-center gap-2 disabled:opacity-70">
                       {loading ? "Verifying..." : "Verify OTP"}
                    </button>

                    <div className="mt-6 text-sm">
                       {timer > 0 ? (
                          <span className="text-gray-400">Resend code in {timer}s</span>
                       ) : (
                          <button onClick={handleGenerateOtp} className="text-red-600 font-bold hover:underline">Resend OTP</button>
                       )}
                    </div>
                 </motion.div>
              )}

              {/* STEP 3: DETAILS */}
              {step === 3 && (
                 <motion.div key="step3" variants={slideUp} initial="hidden" animate="visible" exit="exit" className="w-full max-w-sm mx-auto">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 hidden md:block">Secure your account</h3>
                    
                    <div className="space-y-5">
                       <div className="space-y-1">
                          <label className="text-xs font-bold text-gray-900 uppercase tracking-wide ml-1">Mobile Number</label>
                          <div className="relative group">
                             <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors" size={20}/>
                             <input 
                                name="mobile"
                                value={form.mobile}
                                onChange={handleChange}
                                placeholder="9876543210"
                                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-50 transition-all font-medium"
                             />
                          </div>
                       </div>

                       <PasswordField label="Password" name="password" value={form.password} onChange={handleChange} />
                       <PasswordField label="Confirm Password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} />

                       <button onClick={handleRegister} disabled={loading} className="w-full py-4 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-red-200 transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-70">
                          {loading ? "Creating Account..." : <>Complete Sign Up <Sparkles size={20}/></>}
                       </button>
                    </div>
                 </motion.div>
              )}

           </AnimatePresence>

           <div className="mt-8 text-center">
              <p className="text-gray-500 text-sm">Already have an account? <Link to="/login" className="text-red-600 font-bold hover:underline">Log In</Link></p>
           </div>

        </div>
      </div>
    </div>
  );
}

// Reusable Password Input
function PasswordField({ label, name, value, onChange }) {
   const [visible, setVisible] = useState(false);
   return (
      <div className="space-y-1">
         <label className="text-xs font-bold text-gray-900 uppercase tracking-wide ml-1">{label}</label>
         <div className="relative group">
            <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors" size={20}/>
            <input 
               type={visible ? "text" : "password"}
               name={name}
               value={value}
               onChange={onChange}
               placeholder="••••••••"
               className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-50 transition-all font-medium"
            />
            <button type="button" onClick={() => setVisible(!visible)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
               {visible ? <EyeOff size={20}/> : <Eye size={20}/>}
            </button>
         </div>
      </div>
   );
}