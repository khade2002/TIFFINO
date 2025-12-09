

import { useState } from "react";
import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  UtensilsCrossed,
  ShoppingBag,
  CreditCard,
  Star,
  Menu,
  X,
  LogOut,
  ShieldCheck,
  ChevronRight,
  User
} from "lucide-react";
import { useAdminAuth } from "../context/AdminAuthContext";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, admin } = useAdminAuth();

  // Route Config
  const links = [
    { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/admin/menu", label: "Menu Management", icon: UtensilsCrossed },
    { to: "/admin/orders", label: "Live Orders", icon: ShoppingBag },
    { to: "/admin/subscriptions", label: "Subscriptions", icon: CreditCard },
    { to: "/admin/reviews", label: "Customer Reviews", icon: Star },
  ];

  const logoutHandler = () => {
    logout();
    navigate("/admin/login");
  };

  // Helper for Active Link Styles
  const getLinkClass = (isActive) =>
    `relative flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 group overflow-hidden ${
      isActive
        ? "bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg shadow-red-500/30"
        : "text-slate-500 hover:bg-red-50 hover:text-red-600"
    }`;

  return (
    <div className="flex min-h-screen bg-[#F8F9FA] font-sans overflow-hidden">
      
      {/* ==============================================
          DESKTOP SIDEBAR (Collapsible)
         ============================================== */}
      <motion.aside
        initial={{ width: 280 }}
        animate={{ width: sidebarOpen ? 280 : 80 }}
        transition={{ duration: 0.4, type: "spring", stiffness: 120, damping: 20 }}
        className="hidden md:flex flex-col bg-white border-r border-gray-100 shadow-xl z-20 h-screen sticky top-0"
      >
        {/* Header */}
        <div className={`h-20 flex items-center ${sidebarOpen ? "px-6 justify-between" : "justify-center"}`}>
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="min-w-[40px] h-10 bg-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-200">
               <ShieldCheck className="text-white w-5 h-5" />
            </div>
            {sidebarOpen && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                 <h1 className="font-bold text-lg text-slate-900 tracking-tight">Tiffino</h1>
                 <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Admin</p>
              </motion.div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto hide-scrollbar">
           {links.map((link) => (
              <NavLink to={link.to} key={link.to} end>
                 {({ isActive }) => (
                    <div className={getLinkClass(isActive)}>
                       <link.icon className={`w-5 h-5 min-w-[20px] transition-transform ${!sidebarOpen && "mx-auto"} ${isActive ? "scale-110" : "group-hover:scale-110"}`} />
                       
                       {sidebarOpen && (
                          <motion.span 
                            initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} 
                            className="text-sm font-medium whitespace-nowrap"
                          >
                             {link.label}
                          </motion.span>
                       )}
                       
                       {/* Active Indicator Dot (Collapsed Mode) */}
                       {!sidebarOpen && isActive && (
                          <div className="absolute right-2 w-1.5 h-1.5 bg-white rounded-full shadow-sm" />
                       )}
                    </div>
                 )}
              </NavLink>
           ))}
        </nav>

        {/* Footer / User Profile */}
        <div className="p-3 border-t border-gray-100">
           <div className={`flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100 ${!sidebarOpen && "justify-center"}`}>
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-slate-600 border border-gray-100">
                 <User size={18} />
              </div>
              {sidebarOpen && (
                 <div className="overflow-hidden">
                    <p className="text-xs font-bold text-slate-800 truncate">{admin?.email?.split('@')[0]}</p>
                    <p className="text-[10px] text-slate-400">Administrator</p>
                 </div>
              )}
              {sidebarOpen && (
                <button onClick={logoutHandler} className="ml-auto p-1.5 hover:bg-white rounded-lg text-slate-400 hover:text-red-500 transition shadow-sm">
                   <LogOut size={16} />
                </button>
              )}
           </div>
           
           {!sidebarOpen && (
             <button onClick={logoutHandler} className="mt-3 w-full p-3 flex justify-center text-red-500 hover:bg-red-50 rounded-xl transition">
                <LogOut size={20} />
             </button>
           )}
        </div>
      </motion.aside>

      {/* ==============================================
          MOBILE SIDEBAR (Slide Over)
         ============================================== */}
      <AnimatePresence>
        {mobileOpen && (
           <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 md:hidden"
              onClick={() => setMobileOpen(false)}
           >
              <motion.aside 
                 initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
                 transition={{ type: "spring", damping: 25, stiffness: 200 }}
                 className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-2xl p-6 flex flex-col"
                 onClick={(e) => e.stopPropagation()}
              >
                 <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                          <ShieldCheck size={20}/>
                       </div>
                       <h2 className="text-xl font-bold text-slate-900">Tiffino</h2>
                    </div>
                    <button onClick={() => setMobileOpen(false)} className="p-2 bg-slate-50 rounded-full text-slate-500 hover:text-slate-800"><X size={20}/></button>
                 </div>

                 <nav className="flex-1 space-y-2">
                    {links.map((link) => (
                       <NavLink to={link.to} key={link.to} onClick={() => setMobileOpen(false)}>
                          {({ isActive }) => (
                             <div className={getLinkClass(isActive)}>
                                <link.icon size={20} />
                                <span className="font-medium">{link.label}</span>
                                {isActive && <ChevronRight size={16} className="ml-auto opacity-60"/>}
                             </div>
                          )}
                       </NavLink>
                    ))}
                 </nav>

                 <button onClick={logoutHandler} className="mt-6 flex items-center justify-center gap-2 w-full py-3.5 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-100 transition">
                    <LogOut size={18}/> Sign Out
                 </button>
              </motion.aside>
           </motion.div>
        )}
      </AnimatePresence>

      {/* ==============================================
          MAIN CONTENT AREA
         ============================================== */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
         
         {/* Top Header */}
         <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-6 md:px-10 z-10 sticky top-0">
            <div className="flex items-center gap-4">
               <button onClick={() => setMobileOpen(true)} className="md:hidden p-2 rounded-xl bg-slate-50 text-slate-600"><Menu size={24}/></button>
               <button onClick={() => setSidebarOpen(!sidebarOpen)} className="hidden md:flex p-2 rounded-xl hover:bg-slate-50 text-slate-400 hover:text-slate-600 transition"><Menu size={24}/></button>
               
               {/* Breadcrumb / Title */}
               <div>
                  <h2 className="text-xl font-bold text-slate-800 capitalize tracking-tight">
                     {location.pathname.split("/").pop().replace("-", " ") || "Dashboard"}
                  </h2>
               </div>
            </div>

            <div className="flex items-center gap-4">
               <div className="hidden md:block text-right">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Logged in as</p>
                  <p className="text-sm font-semibold text-slate-900">{admin?.email}</p>
               </div>
               <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-full shadow-lg shadow-red-200 border-2 border-white flex items-center justify-center text-white font-bold text-sm">
                  {admin?.email?.[0].toUpperCase()}
               </div>
            </div>
         </header>

         {/* Content Scroll Area */}
         <main className="flex-1 overflow-y-auto bg-[#F8F9FA] p-6 md:p-10 scroll-smooth">
            <div className="max-w-7xl mx-auto">
               <Outlet />
            </div>
         </main>

      </div>

    </div>
  );
}
