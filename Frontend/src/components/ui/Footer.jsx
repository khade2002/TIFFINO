// import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
// import { motion } from "framer-motion";

// const socialLinks = [
//   { icon: <FaFacebookF />, link: "#" },
//   { icon: <FaTwitter />, link: "#" },
//   { icon: <FaInstagram />, link: "#" },
//   { icon: <FaLinkedinIn />, link: "#" },
// ];

// const Footer = () => {
//   return (
//     <footer className="bg-gradient-to-r from-gray-50 to-gray-100 text-dark border-t border-gray-200 mt-10">
//       <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        
//         {/* Brand Info */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <h2 className="text-3xl font-bold text-primary">Tiffino</h2>
//           <p className="mt-3 text-sm text-gray-600 leading-relaxed">
//             Delicious meals from across India, delivered fresh to your door.
//           </p>
//         </motion.div>

//         {/* Quick Links */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.1 }}
//         >
//           <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
//           <ul className="space-y-2 text-sm">
//             {[
//               { name: "Home", link: "/" },
//               { name: "Cuisines", link: "/cuisine" },
//               { name: "Cart", link: "/cart" },
//               { name: "Profile", link: "/profile" },
//             ].map((item, i) => (
//               <li key={i}>
//                 <a
//                   href={item.link}
//                   className="hover:text-primary transition-colors duration-300"
//                 >
//                   {item.name}
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </motion.div>

//         {/* Newsletter */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7, delay: 0.2 }}
//         >
//           <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
//           <p className="text-sm text-gray-600 mb-3">
//             Subscribe to our newsletter for latest offers & meals.
//           </p>
//           <div className="flex items-center bg-white rounded-full shadow p-1">
//             <input
//               type="email"
//               placeholder="Enter your email"
//               className="flex-1 px-3 py-2 text-sm rounded-l-full outline-none"
//             />
//             <button className="px-4 py-2 bg-primary text-white rounded-full hover:opacity-90 transition">
//               Subscribe
//             </button>
//           </div>
//         </motion.div>

//         {/* Social Links */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.3 }}
//         >
//           <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
//           <div className="flex space-x-4">
//             {socialLinks.map((social, i) => (
//               <motion.a
//                 key={i}
//                 href={social.link}
//                 whileHover={{ scale: 1.2, rotate: 5 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="p-3 bg-primary text-white rounded-full shadow hover:shadow-lg transition-all"
//               >
//                 {social.icon}
//               </motion.a>
//             ))}
//           </div>
//         </motion.div>
//       </div>

//       {/* Bottom Bar */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         transition={{ duration: 0.5, delay: 0.4 }}
//         className="border-t border-gray-200 py-4 text-center text-sm text-gray-500"
//       >
//         © {new Date().getFullYear()} Tiffino. All rights reserved.
//       </motion.div>
//     </footer>
//   );
// };

// export default Footer;













// import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import { Utensils, Mail, Phone, MapPin, ArrowRight, Star, Heart, Zap } from "lucide-react";

// const socialLinks = [
//   { 
//     icon: <FaFacebookF />, 
//     link: "https://facebook.com/tiffino",
//     label: "Facebook",
//     color: "#1877F2"
//   },
//   { 
//     icon: <FaTwitter />, 
//     link: "https://twitter.com/tiffino",
//     label: "Twitter", 
//     color: "#1DA1F2"
//   },
//   { 
//     icon: <FaInstagram />, 
//     link: "https://instagram.com/tiffino",
//     label: "Instagram",
//     color: "#E4405F"
//   },
//   { 
//     icon: <FaLinkedinIn />, 
//     link: "https://linkedin.com/company/tiffino",
//     label: "LinkedIn",
//     color: "#0A66C2"
//   },
// ];

// const quickLinks = [
//   { name: "Home", link: "/" },
//   { name: "Cuisines", link: "/cuisine" },
//   { name: "Subscription", link: "/subscription" },
//   { name: "About Us", link: "/about" },
// ];

// const supportLinks = [
//   { name: "Cart", link: "/cart" },
//   { name: "Orders", link: "/orders" },
//   { name: "Profile", link: "/profile" },
//   { name: "Help Center", link: "/help" },
// ];

// const Footer = () => {
//   const currentYear = new Date().getFullYear();

//   return (
//     <footer className="relative bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-800 border-t border-gray-200 mt-16 overflow-hidden">
//       {/* Background Pattern */}
//       <div className="absolute inset-0 opacity-5">
//         <div className="absolute top-10 left-10 w-32 h-32 bg-[#E23744] rounded-full blur-3xl" />
//         <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#E23744] rounded-full blur-3xl" />
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-[#E23744] rounded-full blur-3xl" />
//       </div>

//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
//           {/* Brand Info */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             viewport={{ once: true }}
//             className="lg:col-span-1"
//           >
//             {/* Logo */}
//             <div className="flex items-center gap-3 mb-6">
//               <motion.div
//                 whileHover={{ rotate: 360, scale: 1.1 }}
//                 transition={{ duration: 0.6 }}
//                 className="w-12 h-12 rounded-xl bg-[#E23744] flex items-center justify-center shadow-lg"
//               >
//                 <Utensils className="w-6 h-6 text-white" />
//               </motion.div>
//               <div>
//                 <h2 className="text-3xl font-extrabold text-[#E23744] tracking-tight">
//                   Tiffino
//                 </h2>
//                 <motion.span
//                   animate={{
//                     opacity: [1, 0.5, 1],
//                   }}
//                   transition={{
//                     duration: 2,
//                     repeat: Infinity,
//                     ease: "easeInOut",
//                   }}
//                   className="inline-block w-2 h-2 rounded-full bg-[#E23744] ml-1"
//                 />
//               </div>
//             </div>

//             <p className="text-gray-600 leading-relaxed mb-6 text-sm">
//               Delicious meals from across India, delivered fresh to your door. 
//               Experience authentic flavors with every bite.
//             </p>

//             {/* Contact Info */}
//             <div className="space-y-3">
//               <motion.div 
//                 whileHover={{ x: 5 }}
//                 className="flex items-center gap-3 text-sm text-gray-600"
//               >
//                 <div className="w-8 h-8 rounded-lg bg-[#E23744]/10 flex items-center justify-center">
//                   <Phone size={14} className="text-[#E23744]" />
//                 </div>
//                 <span>+91 98765 43210</span>
//               </motion.div>
//               <motion.div 
//                 whileHover={{ x: 5 }}
//                 className="flex items-center gap-3 text-sm text-gray-600"
//               >
//                 <div className="w-8 h-8 rounded-lg bg-[#E23744]/10 flex items-center justify-center">
//                   <Mail size={14} className="text-[#E23744]" />
//                 </div>
//                 <span>hello@tiffino.com</span>
//               </motion.div>
//               <motion.div 
//                 whileHover={{ x: 5 }}
//                 className="flex items-center gap-3 text-sm text-gray-600"
//               >
//                 <div className="w-8 h-8 rounded-lg bg-[#E23744]/10 flex items-center justify-center">
//                   <MapPin size={14} className="text-[#E23744]" />
//                 </div>
//                 <span>Mumbai, Maharashtra</span>
//               </motion.div>
//             </div>
//           </motion.div>

//           {/* Quick Links */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.1 }}
//             viewport={{ once: true }}
//           >
//             <h3 className="text-lg font-bold mb-6 text-gray-800 flex items-center gap-2">
//               <Zap size={18} className="text-[#E23744]" />
//               Quick Links
//             </h3>
//             <ul className="space-y-3">
//               {quickLinks.map((item, i) => (
//                 <motion.li
//                   key={i}
//                   initial={{ opacity: 0, x: -20 }}
//                   whileInView={{ opacity: 1, x: 0 }}
//                   transition={{ delay: i * 0.1 }}
//                   viewport={{ once: true }}
//                 >
//                   <Link
//                     to={item.link}
//                     className="group flex items-center gap-2 text-sm text-gray-600 hover:text-[#E23744] transition-all duration-300"
//                   >
//                     <ArrowRight size={12} className="text-[#E23744] opacity-0 group-hover:opacity-100 transition-opacity" />
//                     <span className="group-hover:translate-x-1 transition-transform">
//                       {item.name}
//                     </span>
//                   </Link>
//                 </motion.li>
//               ))}
//             </ul>
//           </motion.div>

//           {/* Support Links */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             viewport={{ once: true }}
//           >
//             <h3 className="text-lg font-bold mb-6 text-gray-800 flex items-center gap-2">
//               <Heart size={18} className="text-[#E23744]" />
//               Support
//             </h3>
//             <ul className="space-y-3">
//               {supportLinks.map((item, i) => (
//                 <motion.li
//                   key={i}
//                   initial={{ opacity: 0, x: -20 }}
//                   whileInView={{ opacity: 1, x: 0 }}
//                   transition={{ delay: i * 0.1 }}
//                   viewport={{ once: true }}
//                 >
//                   <Link
//                     to={item.link}
//                     className="group flex items-center gap-2 text-sm text-gray-600 hover:text-[#E23744] transition-all duration-300"
//                   >
//                     <ArrowRight size={12} className="text-[#E23744] opacity-0 group-hover:opacity-100 transition-opacity" />
//                     <span className="group-hover:translate-x-1 transition-transform">
//                       {item.name}
//                     </span>
//                   </Link>
//                 </motion.li>
//               ))}
//             </ul>
//           </motion.div>

//           {/* Newsletter & Social */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.3 }}
//             viewport={{ once: true }}
//           >
//             <h3 className="text-lg font-bold mb-6 text-gray-800 flex items-center gap-2">
//               <Star size={18} className="text-[#E23744]" />
//               Stay Updated
//             </h3>
            
//             <p className="text-sm text-gray-600 mb-4 leading-relaxed">
//               Subscribe to our newsletter for latest offers & exclusive meals.
//             </p>

//             {/* Newsletter Form */}
//             <motion.div 
//               className="mb-8"
//               whileHover={{ scale: 1.02 }}
//               transition={{ type: "spring", stiffness: 300 }}
//             >
//               <div className="flex items-center bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-1.5 hover:border-[#E23744]/30 transition-colors">
//                 <input
//                   type="email"
//                   placeholder="Enter your email"
//                   className="flex-1 px-4 py-2.5 text-sm rounded-xl outline-none placeholder:text-gray-400"
//                 />
//                 <motion.button 
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="px-5 py-2.5 bg-[#E23744] text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all flex items-center gap-1.5"
//                 >
//                   Subscribe
//                   <ArrowRight size={14} />
//                 </motion.button>
//               </div>
//             </motion.div>

//             {/* Social Links */}
//             <div>
//               <h4 className="text-sm font-semibold mb-4 text-gray-700">Follow Us</h4>
//               <div className="flex gap-3">
//                 {socialLinks.map((social, i) => (
//                   <motion.a
//                     key={i}
//                     href={social.link}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     initial={{ opacity: 0, scale: 0 }}
//                     whileInView={{ opacity: 1, scale: 1 }}
//                     transition={{ delay: i * 0.1, type: "spring", stiffness: 300 }}
//                     whileHover={{ 
//                       scale: 1.2, 
//                       rotate: 5,
//                       backgroundColor: social.color,
//                     }}
//                     whileTap={{ scale: 0.95 }}
//                     className="w-11 h-11 bg-[#E23744] text-white rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center group"
//                     viewport={{ once: true }}
//                   >
//                     <span className="text-sm group-hover:scale-110 transition-transform">
//                       {social.icon}
//                     </span>
//                   </motion.a>
//                 ))}
//               </div>
//             </div>
//           </motion.div>
//         </div>

//         {/* Stats Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.4 }}
//           viewport={{ once: true }}
//           className="mt-16 pt-8 border-t border-gray-200"
//         >
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
//             {[
//               { label: "Happy Customers", value: "50K+", icon: <Heart size={20} /> },
//               { label: "Daily Orders", value: "10K+", icon: <Zap size={20} /> },
//               { label: "Restaurants", value: "500+", icon: <Utensils size={20} /> },
//               { label: "Cities", value: "25+", icon: <MapPin size={20} /> },
//             ].map((stat, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 whileInView={{ opacity: 1, scale: 1 }}
//                 transition={{ delay: i * 0.1, type: "spring", stiffness: 300 }}
//                 whileHover={{ y: -5 }}
//                 className="p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all"
//                 viewport={{ once: true }}
//               >
//                 <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-[#E23744]/10 flex items-center justify-center">
//                   <span className="text-[#E23744]">{stat.icon}</span>
//                 </div>
//                 <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
//                 <p className="text-xs text-gray-600 mt-1">{stat.label}</p>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>
//       </div>

//       {/* Bottom Bar */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         transition={{ duration: 0.5, delay: 0.5 }}
//         viewport={{ once: true }}
//         className="relative border-t border-gray-200 bg-gradient-to-r from-gray-50 to-white py-6"
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex flex-col md:flex-row justify-between items-center gap-4">
//             <div className="flex items-center gap-2 text-sm text-gray-600">
//               <span>© {currentYear} Tiffino. All rights reserved.</span>
//               <motion.span
//                 animate={{ opacity: [1, 0.5, 1] }}
//                 transition={{ duration: 2, repeat: Infinity }}
//                 className="text-[#E23744]"
//               >
//                 ❤️
//               </motion.span>
//             </div>
//             <div className="flex items-center gap-6 text-xs text-gray-500">
//               <Link to="/privacy" className="hover:text-[#E23744] transition-colors">
//                 Privacy Policy
//               </Link>
//               <Link to="/terms" className="hover:text-[#E23744] transition-colors">
//                 Terms of Service
//               </Link>
//               <Link to="/cookies" className="hover:text-[#E23744] transition-colors">
//                 Cookie Policy
//               </Link>
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     </footer>
//   );
// };

// export default Footer;



// import React from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import {
//   Utensils,
//   Mail,
//   Phone,
//   MapPin,
//   ArrowRight,
//   Heart,
//   Star,
//   Zap
// } from "lucide-react";
// import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

// /**
//  * Footer.jsx
//  * Theme: Red (#E23744) + White — Clean, mobile-first, production-ready.
//  * Notes:
//  * - No dark mode
//  * - All brand accents use #E23744
//  * - Accessible (aria where suitable), keyboard-friendly
//  * - Small animated reveals using framer-motion (respects reduced-motion)
//  */

// /* ---------------- Config ---------------- */
// const BRAND = {
//   color: "#E23744",
//   lightTint: "rgba(226, 55, 68, 0.08)",
//   softTint: "rgba(226, 55, 68, 0.12)"
// };

// const socialLinks = [
//   { icon: <FaFacebookF />, label: "Facebook", link: "https://facebook.com/tiffino" },
//   { icon: <FaTwitter />, label: "Twitter", link: "https://twitter.com/tiffino" },
//   { icon: <FaInstagram />, label: "Instagram", link: "https://instagram.com/tiffino" },
//   { icon: <FaLinkedinIn />, label: "LinkedIn", link: "https://linkedin.com/company/tiffino" },
// ];

// const quickLinks = [
//   { name: "Home", link: "/" },
//   { name: "Cuisines", link: "/cuisine" },
//   { name: "Subscription", link: "/subscription" },
//   { name: "About Us", link: "/about" },
// ];

// const supportLinks = [
//   { name: "Cart", link: "/cart" },
//   { name: "Orders", link: "/orders" },
//   { name: "Profile", link: "/profile" },
//   { name: "Help Center", link: "/help" },
// ];

// const reducedMotion = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// const reveal = {
//   initial: reducedMotion ? {} : { opacity: 0, y: 18 },
//   whileInView: reducedMotion ? {} : { opacity: 1, y: 0 },
//   transition: { duration: 0.55, ease: "easeOut" },
//   viewport: { once: true, margin: "-20px" }
// };

// /* ---------------- Footer ---------------- */
// export default function Footer() {
//   const currentYear = new Date().getFullYear();

//   return (
//     <footer className="bg-white text-gray-800 border-t border-gray-100 mt-16 overflow-hidden">
//       {/* Decorative soft glows (non-intrusive) */}
//       <div className="absolute inset-0 pointer-events-none -z-10">
//         <div style={{ background: BRAND.lightTint }} className="absolute -top-10 -left-8 w-56 h-56 rounded-full blur-3xl" />
//         <div style={{ background: BRAND.softTint }} className="absolute bottom-6 right-6 w-72 h-72 rounded-full blur-3xl" />
//       </div>

//       <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-14">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

//           {/* Brand */}
//           <motion.div {...reveal}>
//             <div className="flex items-center gap-3 mb-4">
//               <div
//                 className="w-12 h-12 rounded-xl flex items-center justify-center shadow"
//                 style={{ background: `linear-gradient(180deg, ${BRAND.color}, ${BRAND.color})` }}
//                 aria-hidden
//               >
//                 <Utensils className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h3 className="text-2xl font-extrabold" style={{ color: BRAND.color }}>
//                   Tiffino
//                 </h3>
//                 <div className="inline-flex items-center gap-2 mt-1">
//                   <span className="w-2 h-2 rounded-full" style={{ background: BRAND.color }} />
//                   <small className="text-xs text-gray-500">Fresh meals, every day</small>
//                 </div>
//               </div>
//             </div>

//             <p className="text-sm text-gray-600 mb-6 leading-relaxed">
//               Delicious meals from local kitchens delivered fast. Honest food & friendly service.
//             </p>

//             <div className="space-y-3">
//               <ContactRow icon={<Phone size={14} />} label="+91 98765 43210" />
//               <ContactRow icon={<Mail size={14} />} label="hello@tiffino.com" />
//               <ContactRow icon={<MapPin size={14} />} label="Mumbai, Maharashtra" />
//             </div>
//           </motion.div>

//           {/* Quick Links */}
//           <motion.div {...reveal} transition={{ delay: 0.08 }}>
//             <SectionTitle icon={<Zap size={16} />} title="Quick Links" />
//             <ul className="space-y-2 mt-2">
//               {quickLinks.map((q, idx) => (
//                 <li key={q.name}>
//                   <Link to={q.link} className="flex items-center gap-3 text-sm text-gray-600 hover:text-[#E23744] transition-colors">
//                     <ArrowRight size={14} className="text-[#E23744] opacity-0 group-hover:opacity-100 transition-opacity" />
//                     <span>{q.name}</span>
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </motion.div>

//           {/* Support */}
//           <motion.div {...reveal} transition={{ delay: 0.16 }}>
//             <SectionTitle icon={<Heart size={16} />} title="Support" />
//             <ul className="space-y-2 mt-2">
//               {supportLinks.map((s) => (
//                 <li key={s.name}>
//                   <Link to={s.link} className="flex items-center gap-3 text-sm text-gray-600 hover:text-[#E23744] transition-colors">
//                     <ArrowRight size={14} className="text-[#E23744] opacity-0 group-hover:opacity-100 transition-opacity" />
//                     <span>{s.name}</span>
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </motion.div>

//           {/* Newsletter + Social */}
//           <motion.div {...reveal} transition={{ delay: 0.24 }}>
//             <SectionTitle icon={<Star size={16} />} title="Stay Updated" />
//             <p className="text-sm text-gray-600 mt-2 mb-4">Subscribe for offers, new menus & exclusive meals.</p>

//             <NewsletterInput />

//             <h4 className="mt-6 mb-3 font-semibold text-gray-700">Follow Us</h4>
//             <div className="flex items-center gap-3">
//               {socialLinks.map((s, i) => (
//                 <SocialButton key={i} item={s} />
//               ))}
//             </div>
//           </motion.div>
//         </div>

//         {/* Stats grid */}
//         <motion.div {...reveal} className="mt-12 pt-8 border-t border-gray-100">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             {[
//               { label: "Happy Customers", value: "50K+", icon: <Heart size={18} /> },
//               { label: "Daily Orders", value: "10K+", icon: <Zap size={18} /> },
//               { label: "Partner Restaurants", value: "500+", icon: <Utensils size={18} /> },
//               { label: "Cities Covered", value: "25+", icon: <MapPin size={18} /> },
//             ].map((s, idx) => (
//               <motion.div key={idx} {...(reducedMotion ? {} : { initial: { opacity: 0, y: 8 }, whileInView: { opacity: 1, y: 0 } })} transition={{ delay: idx * 0.06 }} className="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md">
//                 <div className="w-10 h-10 mx-auto mb-2 rounded-lg flex items-center justify-center" style={{ background: BRAND.lightTint }}>
//                   <span style={{ color: BRAND.color }}>{s.icon}</span>
//                 </div>
//                 <div className="text-lg font-bold">{s.value}</div>
//                 <div className="text-xs text-gray-500 mt-1">{s.label}</div>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>
//       </div>

//       {/* Bottom bar */}
//       <div className="bg-white border-t border-gray-100">
//         <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-3">
//           <div className="text-sm text-gray-600">
//             © {currentYear} Tiffino. Made with <span style={{ color: BRAND.color }}>❤</span>
//           </div>

//           <div className="flex items-center gap-6 text-sm text-gray-500">
//             <Link to="/privacy" className="hover:text-[#E23744] transition-colors">Privacy</Link>
//             <Link to="/terms" className="hover:text-[#E23744] transition-colors">Terms</Link>
//             <Link to="/cookies" className="hover:text-[#E23744] transition-colors">Cookies</Link>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

// /* ---------------- Small Reusable Parts ---------------- */

// function ContactRow({ icon, label }) {
//   return (
//     <div className="flex items-center gap-3 text-sm text-gray-600">
//       <div style={{ background: BRAND.lightTint }} className="w-8 h-8 rounded-lg flex items-center justify-center">
//         <span style={{ color: BRAND.color }}>{icon}</span>
//       </div>
//       <span>{label}</span>
//     </div>
//   );
// }

// function SectionTitle({ title, icon }) {
//   return (
//     <h4 className="text-lg font-semibold flex items-center gap-2">
//       <span style={{ color: BRAND.color }}>{icon}</span>
//       <span className="text-gray-800">{title}</span>
//     </h4>
//   );
// }

// function NewsletterInput() {
//   return (
//     <form
//       onSubmit={(e) => { e.preventDefault(); /* integrate with API */ }}
//       className="mt-2"
//       aria-label="Subscribe to newsletter"
//     >
//       <div className="flex items-center gap-2 bg-white border rounded-full p-1 shadow-sm max-w-md">
//         <input
//           name="email"
//           type="email"
//           placeholder="Enter your email"
//           className="flex-1 px-4 py-2 text-sm outline-none placeholder-gray-400"
//           aria-label="Email address"
//         />
//         <button
//           type="submit"
//           className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white font-semibold"
//           style={{ background: BRAND.color }}
//         >
//           Subscribe
//           <ArrowRight size={14} />
//         </button>
//       </div>
//     </form>
//   );
// }

// function SocialButton({ item }) {
//   return (
//     <a
//       href={item.link}
//       target="_blank"
//       rel="noopener noreferrer"
//       aria-label={item.label}
//       className="w-10 h-10 rounded-lg flex items-center justify-center text-white shadow"
//       style={{ background: BRAND.color }}
//     >
//       <span className="text-sm">{item.icon}</span>
//     </a>
//   );
// }
// imp prev one .......











import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  UtensilsCrossed,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Send,
  Smartphone,
  CreditCard
} from "lucide-react";

/* =====================================================================
   🎨 SENIOR DESIGNER NOTE: 
   Dark Premium Footer with Glass Accents
   ===================================================================== */

const SOCIAL_LINKS = [
  { icon: <Facebook size={18} />, href: "#", label: "Facebook" },
  { icon: <Twitter size={18} />, href: "#", label: "Twitter" },
  { icon: <Instagram size={18} />, href: "#", label: "Instagram" },
  { icon: <Linkedin size={18} />, href: "#", label: "LinkedIn" },
];

const LINKS = {
  company: [
    { name: "About Us", to: "/about" },
    { name: "Our Team", to: "/team" },
    { name: "Careers", to: "/careers" },
    { name: "Tiffino Blog", to: "/blog" },
  ],
  support: [
    { name: "Help & Support", to: "/help" },
    { name: "Partner with us", to: "/partner" },
    { name: "Ride with us", to: "/rider" },
    { name: "Terms & Conditions", to: "/terms" },
  ],
  legal: [
    { name: "Privacy Policy", to: "/privacy" },
    { name: "Cookie Policy", to: "/cookies" },
    { name: "Refund Policy", to: "/refund" },
  ]
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-20 bg-gray-900 text-white overflow-hidden rounded-t-[3rem]">
      
      {/* Background Decor (Glows) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
         <div className="absolute -top-[10%] -left-[5%] w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[100px]" />
         <div className="absolute top-[20%] right-[0%] w-[400px] h-[400px] bg-orange-600/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-10">
        
        {/* TOP SECTION: CTA & NEWSLETTER */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 border-b border-gray-800 pb-16 mb-16">
           
           {/* Mobile App CTA */}
           <motion.div 
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
           >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600 to-orange-500 flex items-center justify-center shadow-lg shadow-red-900/50">
                 <Smartphone size={32} className="text-white" />
              </div>
              <div>
                 <h3 className="text-2xl font-bold mb-2">Get the Tiffino App</h3>
                 <p className="text-gray-400 text-sm mb-4">Order faster and get exclusive discounts on the app.</p>
                 <div className="flex gap-3">
                    <button className="bg-white text-black px-4 py-2 rounded-lg text-xs font-bold hover:bg-gray-200 transition">App Store</button>
                    <button className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-gray-700 transition">Google Play</button>
                 </div>
              </div>
           </motion.div>

           {/* Newsletter */}
           <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gray-800/50 rounded-2xl p-6 sm:p-8 backdrop-blur-sm border border-gray-700"
           >
              <h3 className="text-xl font-bold mb-2">Subscribe to our newsletter</h3>
              <p className="text-gray-400 text-sm mb-6">Get daily offers and menu updates directly in your inbox.</p>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                 <input 
                   type="email" 
                   placeholder="Enter your email" 
                   className="flex-1 bg-gray-900 border border-gray-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-red-500 transition-colors text-sm"
                 />
                 <button className="bg-red-600 hover:bg-red-700 text-white px-6 rounded-xl transition-colors">
                    <Send size={18} />
                 </button>
              </form>
           </motion.div>
        </div>

        {/* MIDDLE SECTION: LINKS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
           
           {/* Brand Column */}
           <div className="lg:col-span-4 space-y-6">
              <Link to="/" className="flex items-center gap-2 group w-fit">
                 <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-red-600 group-hover:scale-110 transition-transform">
                    <UtensilsCrossed size={20} />
                 </div>
                 <span className="text-3xl font-extrabold tracking-tight">Tiffino</span>
              </Link>
              <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                 Ghar jaisa taste, restaurant wali feel. We are on a mission to serve healthy, hygienic, and delicious home-style meals to every desk and doorstep.
              </p>
              <div className="flex gap-4 pt-2">
                 {SOCIAL_LINKS.map((s, i) => (
                    <a key={i} href={s.href} className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white transition-all duration-300">
                       {s.icon}
                    </a>
                 ))}
              </div>
           </div>

           {/* Links Columns */}
           <div className="lg:col-span-2">
              <h4 className="font-bold text-lg mb-6">Company</h4>
              <ul className="space-y-4">
                 {LINKS.company.map((link, i) => <FooterLink key={i} to={link.to}>{link.name}</FooterLink>)}
              </ul>
           </div>
           
           <div className="lg:col-span-3">
              <h4 className="font-bold text-lg mb-6">Contact & Support</h4>
              <ul className="space-y-4">
                 {LINKS.support.map((link, i) => <FooterLink key={i} to={link.to}>{link.name}</FooterLink>)}
                 <li className="flex items-start gap-3 text-sm text-gray-400 pt-4">
                    <MapPin size={18} className="text-red-500 shrink-0" />
                    <span>Level 1, Tech Park, <br/> Mumbai, Maharashtra 400001</span>
                 </li>
                 <li className="flex items-center gap-3 text-sm text-gray-400">
                    <Phone size={18} className="text-red-500 shrink-0" />
                    <span>+91 98765 43210</span>
                 </li>
              </ul>
           </div>

           <div className="lg:col-span-3">
              <h4 className="font-bold text-lg mb-6">Opening Hours</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                 <li className="flex justify-between border-b border-gray-800 pb-2">
                    <span>Mon - Fri</span>
                    <span className="font-bold text-white">8am - 10pm</span>
                 </li>
                 <li className="flex justify-between border-b border-gray-800 pb-2">
                    <span>Sat - Sun</span>
                    <span className="font-bold text-white">9am - 11pm</span>
                 </li>
              </ul>
              <div className="mt-6 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
                 <div className="flex items-center gap-2 text-yellow-500 font-bold mb-1">
                    <CreditCard size={18} /> Secure Payment
                 </div>
                 <p className="text-xs text-gray-500">Encrypted transactions</p>
              </div>
           </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
           <p className="text-gray-500 text-sm">
              © {currentYear} Tiffino Foods Pvt Ltd. All rights reserved.
           </p>
           <div className="flex gap-6 text-sm font-medium text-gray-400">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
              <Link to="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
           </div>
        </div>

      </div>
    </footer>
  );
}

/* --- Helper Components --- */

function FooterLink({ to, children }) {
   return (
      <li>
         <Link to={to} className="group flex items-center gap-2 text-sm text-gray-400 hover:text-red-400 transition-colors">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-red-500 transition-colors"></span>
            <span className="group-hover:translate-x-1 transition-transform">{children}</span>
         </Link>
      </li>
   );
}