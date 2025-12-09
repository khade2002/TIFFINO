
import { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LogIn,
  ShoppingCart,
  Menu,
  X,
  Search,
  ChevronRight,
  User,
  Package, // Orders icon
  Home,
  Utensils,
  Crown, // Subscription icon
  Info, // About icon
  UtensilsCrossed
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { CUISINES } from "../../assets/data/dishes";

/* =====================================================================
   🎨 SENIOR DESIGNER VARIANTS
   ===================================================================== */
const MENU_VARIANTS = {
  hidden: { opacity: 0, height: 0, transition: { duration: 0.3 } },
  visible: { 
    opacity: 1, 
    height: "auto", 
    transition: { 
      duration: 0.4, 
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.04 
    } 
  },
};

const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { totalItems = 0 } = useCart();

  // Hide Navbar on Auth Pages
  const hide = ["/login", "/signup", "/forgot-password"].includes(location.pathname);

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
    setShowSuggestions(false);
  }, [location.pathname]);

  if (hide) return null;

  /* --- Search Logic --- */
  const allDishes = CUISINES.flatMap((region) =>
    region?.states?.flatMap((state) =>
      state?.dishes?.map((dish) => ({
        ...dish,
        state: state.name,
        region: region.region,
      })) || []
    )
  );

  const suggestions = query.trim() === "" ? [] : allDishes.filter(
    (d) => d.name.toLowerCase().includes(query.toLowerCase()) || d.state.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) navigate(`/cuisine?q=${encodeURIComponent(query.trim())}`);
    setQuery("");
    setMenuOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "circOut" }}
      className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-[0_4px_30px_rgba(0,0,0,0.03)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* 1. LOGO */}
          <Link to="/" className="flex items-center gap-2.5 group select-none flex-shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 to-orange-500 flex items-center justify-center shadow-lg shadow-red-200 group-hover:scale-110 transition-transform duration-300">
              <UtensilsCrossed className="text-white w-5 h-5" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-gray-900 group-hover:text-red-600 transition-colors">
              Tiffino
            </span>
          </Link>

          {/* 2. DESKTOP SEARCH (Hidden on small screens) */}
          <div ref={searchRef} className="hidden xl:block flex-1 max-w-sm mx-6 relative">
            <form onSubmit={handleSearch} className="relative group">
              <input
                type="text"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setShowSuggestions(true); }}
                onFocus={() => setShowSuggestions(true)}
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-gray-100/50 border border-transparent focus:bg-white focus:border-red-100 focus:ring-4 focus:ring-red-50 text-sm transition-all outline-none placeholder-gray-400 font-medium"
              />
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              
              {/* Suggestions */}
              <AnimatePresence>
                {showSuggestions && query && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50"
                  >
                    {suggestions.length > 0 ? (
                      suggestions.map((d, i) => (
                        <div
                          key={i}
                          onClick={() => { navigate(`/cuisine?q=${d.name}`); setQuery(""); }}
                          className="flex items-center justify-between px-4 py-2.5 hover:bg-red-50 cursor-pointer transition-colors border-b border-gray-50 last:border-0"
                        >
                          <span className="text-sm font-semibold text-gray-700">{d.name}</span>
                          <ChevronRight size={14} className="text-gray-300" />
                        </div>
                      ))
                    ) : (
                      <div className="p-3 text-xs text-gray-400 text-center">No match found</div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>

          {/* 3. DESKTOP NAVIGATION LINKS (All Links Included) */}
          <div className="hidden lg:flex items-center gap-1">
            <NavLink to="/" icon={<Home size={17} />} label="Home" />
            <NavLink to="/cuisine" icon={<Utensils size={17} />} label="Menu" />
            <NavLink to="/subscription" icon={<Crown size={17} />} label="Plans" />
            <NavLink to="/orders" icon={<Package size={17} />} label="Orders" />
            <NavLink to="/about" icon={<Info size={17} />} label="About" />

            <div className="h-6 w-px bg-gray-200 mx-3" />

            {/* Cart */}
            <Link to="/cart" className="relative p-2.5 rounded-full hover:bg-gray-100 transition-colors group">
              <ShoppingCart size={22} className="text-gray-700 group-hover:text-red-600 transition-colors" />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    key={totalItems}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute top-0 right-0 w-5 h-5 bg-red-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full shadow-sm border-2 border-white"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            {/* Auth */}
            <div className="ml-2">
              {user ? (
                <div className="flex items-center gap-2">
                  <Link to="/profile" className="p-2.5 rounded-full hover:bg-gray-100 text-gray-700 hover:text-red-600 transition-colors" title="Profile">
                    <User size={22} />
                  </Link>
                  <button onClick={handleLogout} className="text-sm font-bold text-gray-500 hover:text-red-600 px-3 py-2 transition-colors">
                    Logout
                  </button>
                </div>
              ) : (
                <Link to="/login">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-5 py-2 rounded-full bg-gray-900 text-white text-sm font-bold shadow-md hover:bg-black transition-colors"
                  >
                    Login
                  </motion.button>
                </Link>
              )}
            </div>
          </div>

          {/* 4. MOBILE HAMBURGER (Visible on Tablet/Mobile) */}
          <div className="lg:hidden flex items-center gap-3">
            <Link to="/cart" className="relative p-2">
               <ShoppingCart size={24} className="text-gray-800" />
               {totalItems > 0 && <span className="absolute top-0 right-0 w-4 h-4 bg-red-600 rounded-full border border-white" />}
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-xl bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </div>

      {/* 5. MOBILE MENU EXPANDED */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            variants={MENU_VARIANTS}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="lg:hidden overflow-hidden bg-white border-t border-gray-100 shadow-xl"
          >
            <div className="p-4 space-y-4">
              
              {/* Search (Mobile) */}
              <form onSubmit={handleSearch} className="relative">
                 <input 
                    type="text" 
                    placeholder="Search tasty food..." 
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-100 text-sm font-medium outline-none focus:ring-2 focus:ring-red-100"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                 />
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              </form>

              {/* GRID LINKS (All 6 key areas) */}
              <div className="grid grid-cols-2 gap-3">
                 <MobileNavItem to="/" icon={<Home size={20} />} label="Home" />
                 <MobileNavItem to="/cuisine" icon={<Utensils size={20} />} label="Full Menu" />
                 <MobileNavItem to="/subscription" icon={<Crown size={20} />} label="Plans" />
                 <MobileNavItem to="/orders" icon={<Package size={20} />} label="My Orders" />
                 <MobileNavItem to="/about" icon={<Info size={20} />} label="About Us" />
                 <MobileNavItem to="/profile" icon={<User size={20} />} label="Profile" />
              </div>

              {/* Auth Footer */}
              <div className="border-t border-gray-100 pt-4">
                 {user ? (
                    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-xl">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold">
                            {user.name ? user.name[0] : "U"}
                         </div>
                         <div>
                            <p className="text-sm font-bold text-gray-900">Hi, {user.name || "Foodie"}</p>
                         </div>
                      </div>
                      <button onClick={handleLogout} className="text-red-600 font-bold text-sm bg-white px-3 py-1.5 rounded-lg shadow-sm border border-gray-200">
                         Sign Out
                      </button>
                    </div>
                 ) : (
                    <Link to="/login" className="block w-full py-3 rounded-xl bg-gray-900 text-white text-center font-bold shadow-md">
                       Login / Signup
                    </Link>
                 )}
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* --- Sub Components (Clean & Reusable) --- */

function NavLink({ to, icon, label }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link to={to} className="relative px-3 py-2 rounded-full group">
      {isActive && (
        <motion.div 
          layoutId="nav-pill"
          className="absolute inset-0 bg-gray-100 rounded-full"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
      <span className={`relative z-10 flex items-center gap-1.5 text-[13px] font-semibold transition-colors ${isActive ? 'text-gray-900' : 'text-gray-500 group-hover:text-gray-900'}`}>
        {icon} {label}
      </span>
    </Link>
  );
}

function MobileNavItem({ to, icon, label }) {
   return (
      <motion.div variants={ITEM_VARIANTS} whileTap={{ scale: 0.96 }}>
         <Link to={to} className="flex flex-col items-center justify-center p-4 rounded-2xl bg-gray-50 text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors border border-transparent hover:border-red-100">
            <div className="mb-2 p-2 bg-white rounded-full shadow-sm">{icon}</div>
            <span className="text-xs font-bold">{label}</span>
         </Link>
      </motion.div>
   );
}