
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