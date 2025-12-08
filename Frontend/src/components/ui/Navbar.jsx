// // src/components/ui/Navbar.jsx
// import { useEffect, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import {
//   LogIn,
//   ShoppingCart,
//   Menu,
//   X,
//   Search,
//   ChevronRight,
//   User,          // NEW: profile icon
//   HelpCircle,    // NEW: help icon
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useCart } from "../../context/CartContext";
// import { CUISINES } from "../../assets/data/dishes";

// export default function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [query, setQuery] = useState("");
//   const [cartOpen, setCartOpen] = useState(false);

//   const location = useLocation();
//   const navigate = useNavigate();

//   // --- Cart context (matches your reducer-based API) ---
//   const cartCtx = (() => {
//     try {
//       return useCart?.();
//     } catch {
//       return null;
//     }
//   })();

//   const items = cartCtx?.items ?? [];
//   const totalItems = cartCtx?.totalItems ?? 0;
//   const totalPrice = cartCtx?.totalPrice ?? 0;
//   const remove = cartCtx?.remove ?? (() => {});

//   // hide navbar on auth pages
//   const hide =
//     location.pathname === "/login" ||
//     location.pathname === "/signup" ||
//     location.pathname === "/forgot-password";

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 6);
//     onScroll();
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   if (hide) return null;

//   // ✅ CUISINES -> allDishes (region + state attach)
//   const allDishes = CUISINES.flatMap(
//     (region) =>
//       region?.states?.flatMap((state) =>
//         state?.dishes?.map((dish) => ({
//           ...dish,
//           state: state.name,
//           region: region.region,
//         })) || []
//       ) || []
//   );

//   // ✅ Suggestions (name/state/region)
//   const suggestions =
//     query.trim() === ""
//       ? []
//       : allDishes
//           .filter(
//             (d) =>
//               d.name.toLowerCase().includes(query.toLowerCase()) ||
//               d.state.toLowerCase().includes(query.toLowerCase()) ||
//               d.region.toLowerCase().includes(query.toLowerCase())
//           )
//           .slice(0, 6);

//   // ✅ Helper: best target dish (exact -> first suggestion -> null)
//   const pickTargetDish = () => {
//     const q = query.trim().toLowerCase();
//     if (!q) return null;

//     const exact = allDishes.find(
//       (d) => d.name.toLowerCase() === q
//     );
//     if (exact) return exact;

//     if (suggestions.length > 0) return suggestions[0];

//     return null;
//   };

//   // ✅ UPDATED: on submit → try direct dish navigation first
//   const onSearchSubmit = (e) => {
//     e.preventDefault();
//     const target = pickTargetDish();

//     if (target) {
//       // Directly focus a dish on cuisine page
//       navigate(
//         `/cuisine?dishId=${encodeURIComponent(
//           target.id
//         )}&q=${encodeURIComponent(target.name)}`
//       );
//     } else if (query.trim()) {
//       // Fallback: normal search
//       navigate(`/cuisine?q=${encodeURIComponent(query.trim())}`);
//     }

//     setMenuOpen(false);
//   };

//   return (
//     <>
//       {/* NAVBAR */}
//       <nav
//         className={[
//           "sticky top-0 z-50 transition-all",
//           "backdrop-blur supports-[backdrop-filter]:bg-white/75 bg-white",
//           scrolled ? "shadow-md" : "shadow-sm",
//         ].join(" ")}
//         role="navigation"
//         aria-label="Main"
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6">
//           {/* Top row */}
//           <div className="h-16 flex items-center justify-between gap-3">
//             {/* Left: Logo */}
//             <Link
//               to="/"
//               className="inline-flex items-center gap-2 group"
//               aria-label="Tiffino Home"
//             >
//               <span className="text-2xl font-extrabold tracking-tight">
//                 <span className="text-primary">Tiffino</span>
//               </span>
//               <span className="h-2 w-2 rounded-full bg-primary group-hover:scale-110 transition-transform" />
//             </Link>

//             {/* Center: Desktop Search */}
//             <form
//               onSubmit={onSearchSubmit}
//               className="hidden md:block md:flex-1 max-w-xl mx-4"
//               role="search"
//               aria-label="Search dishes or cuisines"
//             >
//               <motion.div
//                 initial={false}
//                 animate={{
//                   boxShadow: query
//                     ? "0 0 0 3px rgba(234,88,12,0.15)"
//                     : "0 0 0 0 rgba(0,0,0,0)",
//                 }}
//                 className="relative"
//               >
//                 <Search
//                   size={18}
//                   className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//                 />
//                 <input
//                   value={query}
//                   onChange={(e) => setQuery(e.target.value)}
//                   placeholder="Search dishes, cuisines, or states…"
//                   className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition"
//                 />
//                 <button
//                   type="submit"
//                   className="absolute right-1.5 top-1/2 -translate-y-1/2 inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary text-white text-sm font-medium hover:opacity-95 active:opacity-90 transition"
//                   aria-label="Search"
//                 >
//                   Search <ChevronRight size={16} />
//                 </button>

//                 {/* Suggestions dropdown */}
//                 {query && (
//                   <div className="absolute z-50 mt-2 w-full rounded-xl bg-white shadow-lg border border-gray-200 max-h-60 overflow-auto">
//                     {suggestions.length > 0 ? (
//                       suggestions.map((d) => (
//                         <button
//                           key={`${d.id}-${d.state}-${d.region}`}
//                           type="button"
//                           onClick={() => {
//                             setQuery(d.name);
//                             // ✅ UPDATED: go directly to picked dish on Cuisine
//                             navigate(
//                               `/cuisine?dishId=${encodeURIComponent(
//                                 d.id
//                               )}&q=${encodeURIComponent(d.name)}`
//                             );
//                             setMenuOpen(false);
//                           }}
//                           className="w-full text-left px-4 py-2 hover:bg-gray-50 flex justify-between"
//                         >
//                           <span>{d.name}</span>
//                           <span className="text-xs text-gray-500">
//                             {d.state}
//                           </span>
//                         </button>
//                       ))
//                     ) : (
//                       <p className="px-4 py-2 text-sm text-gray-500">
//                         No results
//                       </p>
//                     )}
//                   </div>
//                 )}
//               </motion.div>
//             </form>

//             {/* Right: Desktop links + actions */}
//             <div className="hidden md:flex items-center gap-6">
//               <NavLink to="/" label="Home" />
//               <NavLink to="/cuisine" label="Cuisines" />
//               <NavLink to="/orders" label="Orders" />
//               <NavLink to="/subscription" label="Subscription" />

//               {/* Cart */}
//               <button
//                 onClick={() => setCartOpen(true)}
//                 className="relative p-2 rounded-xl border border-gray-200 hover:border-primary/40 hover:bg-primary/5 transition"
//                 aria-label="Open cart"
//               >
//                 <ShoppingCart size={22} className="text-gray-700" />
//                 {totalItems > 0 && (
//                   <span className="absolute -top-1 -right-1 min-w-[1.25rem] h-5 px-1.5 rounded-full bg-primary text-white text-[10px] font-bold grid place-items-center shadow">
//                     {totalItems}
//                   </span>
//                 )}
//               </button>

//               {/* NEW: Profile */}
//               <Link
//                 to="/profile"
//                 className="p-2 rounded-xl border border-gray-200 hover:border-primary/40 hover:bg-primary/5 transition"
//                 aria-label="Profile"
//                 title="Profile"
//               >
//                 <User size={22} className="text-gray-700" />
//               </Link>

//               {/* NEW: Help */}
//               <Link
//                 to="/help"
//                 className="p-2 rounded-xl border border-gray-200 hover:border-primary/40 hover:bg-primary/5 transition"
//                 aria-label="Help"
//                 title="Help"
//               >
//                 <HelpCircle size={22} className="text-gray-700" />
//               </Link>

//               {/* Login */}
//               <Link
//                 to="/login"
//                 className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white font-semibold hover:opacity-95 active:opacity-90 transition"
//               >
//                 <LogIn size={18} />
//                 <span>Login</span>
//               </Link>
//             </div>

//             {/* Mobile: right icons */}
//             <div className="md:hidden flex items-center gap-2">
//               <button
//                 onClick={() => setMenuOpen((v) => !v)}
//                 className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 active:bg-gray-100 transition"
//                 aria-label="Toggle menu"
//                 aria-expanded={menuOpen}
//               >
//                 {menuOpen ? <X size={22} /> : <Menu size={22} />}
//               </button>

//               <button
//                 onClick={() => setCartOpen(true)}
//                 className="relative p-2 rounded-lg border border-gray-200 hover:bg-gray-50 active:bg-gray-100 transition"
//                 aria-label="Open cart"
//               >
//                 <ShoppingCart size={22} />
//                 {totalItems > 0 && (
//                   <span className="absolute -top-1 -right-1 min-w-[1.15rem] h-4.5 px-1.5 rounded-full bg-primary text-white text-[10px] font-bold grid place-items-center">
//                     {totalItems}
//                   </span>
//                 )}
//               </button>
//             </div>
//           </div>

//           {/* Mobile dropdown */}
//           <AnimatePresence>
//             {menuOpen && (
//               <motion.div
//                 key="mobile-menu"
//                 initial={{ height: 0, opacity: 0 }}
//                 animate={{ height: "auto", opacity: 1 }}
//                 exit={{ height: 0, opacity: 0 }}
//                 transition={{ duration: 0.25 }}
//                 className="md:hidden overflow-hidden"
//               >
//                 {/* Mobile search */}
//                 <form onSubmit={onSearchSubmit} className="py-3" role="search">
//                   <div className="relative">
//                     <Search
//                       size={18}
//                       className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//                     />
//                     <input
//                       value={query}
//                       onChange={(e) => setQuery(e.target.value)}
//                       placeholder="Search dishes, cuisines, or states…"
//                       className="w-full pl-10 pr-24 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition"
//                     />
//                     <button
//                       type="submit"
//                       className="absolute right-1.5 top-1/2 -translate-y-1/2 inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary text-white text-sm font-medium"
//                     >
//                       Go
//                     </button>
//                   </div>
//                 </form>

//                 {/* Links */}
//                 <div className="grid gap-1 pb-4">
//                   <MobileLink
//                     to="/"
//                     label="Home"
//                     onClick={() => setMenuOpen(false)}
//                   />
//                   <MobileLink
//                     to="/cuisine"
//                     label="Cuisines"
//                     onClick={() => setMenuOpen(false)}
//                   />
//                   <MobileLink
//                     to="/orders"
//                     label="Orders"
//                     onClick={() => setMenuOpen(false)}
//                   />
//                   <MobileLink
//                     to="/subscription"
//                     label="Subscription"
//                     onClick={() => setMenuOpen(false)}
//                   />

//                   {/* NEW: Profile + Help in mobile menu */}
//                   <MobileLink
//                     to="/profile"
//                     label="Profile"
//                     onClick={() => setMenuOpen(false)}
//                   />
//                   <MobileLink
//                     to="/help"
//                     label="Help"
//                     onClick={() => setMenuOpen(false)}
//                   />

//                   <Link
//                     to="/login"
//                     onClick={() => setMenuOpen(false)}
//                     className="mt-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gray-900 text-white font-semibold"
//                   >
//                     <LogIn size={18} />
//                     Login
//                   </Link>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </nav>

//       {/* 🛒 Cart Drawer */}
//       <AnimatePresence>
//         {cartOpen && (
//           <>
//             <motion.div
//               key="overlay"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 0.4 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black z-40"
//               onClick={() => setCartOpen(false)}
//             />
//             <motion.div
//               key="drawer"
//               initial={{ x: "100%" }}
//               animate={{ x: 0 }}
//               exit={{ x: "100%" }}
//               transition={{ type: "tween" }}
//               className="fixed right-0 top-0 w-80 h-full bg-white shadow-lg z-50 flex flex-col"
//             >
//               <div className="flex items-center justify-between px-4 py-3 border-b">
//                 <h2 className="text-lg font-semibold">Your Cart</h2>
//                 <button
//                   onClick={() => setCartOpen(false)}
//                   className="p-2 hover:bg-gray-100 rounded-lg"
//                   aria-label="Close cart"
//                 >
//                   <X size={20} />
//                 </button>
//               </div>

//               <div className="flex-1 overflow-y-auto p-4 space-y-3">
//                 {items.length === 0 ? (
//                   <p className="text-gray-500 text-sm">Your cart is empty.</p>
//                 ) : (
//                   items.map((item) => (
//                     <div
//                       key={item.id}
//                       className="flex items-center justify-between gap-3 border-b pb-2"
//                     >
//                       <div className="flex items-center gap-3">
//                         {item.image ? (
//                           <img
//                             src={item.image}
//                             alt={item.name}
//                             className="w-12 h-12 rounded object-cover border"
//                           />
//                         ) : null}
//                         <div>
//                           <p className="font-medium leading-tight">{item.name}</p>
//                           <p className="text-xs text-gray-500">
//                             ₹{item.price} × {item.qty}
//                           </p>
//                         </div>
//                       </div>
//                       <button
//                         onClick={() => remove(item.id)}
//                         className="text-xs text-red-500 hover:underline"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   ))
//                 )}
//               </div>

//               {items.length > 0 && (
//                 <div className="border-t p-4">
//                   <div className="flex justify-between font-semibold mb-3">
//                     <span>Total:</span>
//                     <span>₹{totalPrice}</span>
//                   </div>
//                   <button
//                     onClick={() => {
//                       setCartOpen(false);
//                       navigate("/cart");
//                     }}
//                     className="w-full py-2 rounded-lg bg-primary text-white font-medium hover:opacity-95 active:opacity-90 transition"
//                   >
//                     Go to Checkout
//                   </button>
//                 </div>
//               )}
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }

// /* ---------- helpers ---------- */
// function NavLink({ to, label }) {
//   return (
//     <Link
//       to={to}
//       className="relative text-gray-700 hover:text-primary transition group"
//     >
//       <span className="relative z-10">{label}</span>
//       <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-primary transition-all duration-200 group-hover:w-full md:hover:w-full" />
//     </Link>
//   );
// }

// function MobileLink({ to, label, onClick }) {
//   return (
//     <Link
//       to={to}
//       onClick={onClick}
//       className="px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-800"
//     >
//       {label}
//     </Link>
//   );
// }





// // src/components/ui/Navbar.jsx
// import { useEffect, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import {
//   LogIn,
//   LogOut,
//   ShoppingCart,
//   Menu,
//   X,
//   Search,
//   ChevronRight,
//   User,
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useCart } from "../../context/CartContext";
// import { CUISINES } from "../../assets/data/dishes";

// export default function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [query, setQuery] = useState("");
//   const [cartOpen, setCartOpen] = useState(false);

//   // ✅ dummy login state (replace with real auth later)
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const location = useLocation();
//   const navigate = useNavigate();

//   // --- Cart context
//   const cartCtx = (() => {
//     try {
//       return useCart?.();
//     } catch {
//       return null;
//     }
//   })();

//   const items = cartCtx?.items ?? [];
//   const totalItems = cartCtx?.totalItems ?? 0;
//   const totalPrice = cartCtx?.totalPrice ?? 0;
//   const remove = cartCtx?.remove ?? (() => {});

//   const hide =
//     location.pathname === "/login" ||
//     location.pathname === "/signup" ||
//     location.pathname === "/forgot-password";

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 6);
//     onScroll();
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   if (hide) return null;

//   // ✅ allDishes
//   const allDishes = CUISINES.flatMap(
//     (region) =>
//       region?.states?.flatMap((state) =>
//         state?.dishes?.map((dish) => ({
//           ...dish,
//           state: state.name,
//           region: region.region,
//         })) || []
//       ) || []
//   );

//   // ✅ Suggestions
//   const suggestions =
//     query.trim() === ""
//       ? []
//       : allDishes
//           .filter(
//             (d) =>
//               d.name.toLowerCase().includes(query.toLowerCase()) ||
//               d.state.toLowerCase().includes(query.toLowerCase()) ||
//               d.region.toLowerCase().includes(query.toLowerCase())
//           )
//           .slice(0, 6);

//   const pickTargetDish = () => {
//     const q = query.trim().toLowerCase();
//     if (!q) return null;
//     const exact = allDishes.find((d) => d.name.toLowerCase() === q);
//     if (exact) return exact;
//     if (suggestions.length > 0) return suggestions[0];
//     return null;
//   };

//   const onSearchSubmit = (e) => {
//     e.preventDefault();
//     const target = pickTargetDish();
//     if (target) {
//       navigate(
//         `/cuisine?dishId=${encodeURIComponent(
//           target.id
//         )}&q=${encodeURIComponent(target.name)}`
//       );
//     } else if (query.trim()) {
//       navigate(`/cuisine?q=${encodeURIComponent(query.trim())}`);
//     }
//     setMenuOpen(false);
//     setQuery(""); // ✅ close suggestions
//   };

//   return (
//     <>
//       {/* NAVBAR */}
//       <nav
//         className={[
//           "sticky top-0 z-50 transition-all",
//           "backdrop-blur supports-[backdrop-filter]:bg-white/75 bg-white",
//           scrolled ? "shadow-md" : "shadow-sm",
//         ].join(" ")}
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6">
//           <div className="h-16 flex items-center justify-between gap-3">
//             {/* Logo */}
//             <Link to="/" className="inline-flex items-center gap-2 group">
//               <span className="text-2xl font-extrabold tracking-tight">
//                 <span className="text-primary">Tiffino</span>
//               </span>
//               <span className="h-2 w-2 rounded-full bg-primary group-hover:scale-110 transition-transform" />
//             </Link>

//             {/* Search */}
//             <form
//               onSubmit={onSearchSubmit}
//               className="hidden md:block md:flex-1 max-w-xl mx-4"
//             >
//               <motion.div initial={false} className="relative">
//                 <Search
//                   size={18}
//                   className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//                 />
//                 <input
//                   value={query}
//                   onChange={(e) => setQuery(e.target.value)}
//                   placeholder="Search dishes, cuisines, or states…"
//                   className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-200"
//                 />
//                 <button
//                   type="submit"
//                   className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-primary text-white text-sm font-medium"
//                 >
//                   Search <ChevronRight size={16} />
//                 </button>

//                 {query && (
//                   <div className="absolute z-50 mt-2 w-full rounded-xl bg-white shadow-lg border border-gray-200 max-h-60 overflow-auto">
//                     {suggestions.length > 0 ? (
//                       suggestions.map((d) => (
//                         <button
//                           key={`${d.id}-${d.state}`}
//                           type="button"
//                           onClick={() => {
//                             navigate(
//                               `/cuisine?dishId=${encodeURIComponent(
//                                 d.id
//                               )}&q=${encodeURIComponent(d.name)}`
//                             );
//                             setMenuOpen(false);
//                             setQuery(""); // ✅ clear search
//                           }}
//                           className="w-full text-left px-4 py-2 hover:bg-gray-50 flex justify-between"
//                         >
//                           <span>{d.name}</span>
//                           <span className="text-xs text-gray-500">
//                             {d.state}
//                           </span>
//                         </button>
//                       ))
//                     ) : (
//                       <p className="px-4 py-2 text-sm text-gray-500">
//                         No results
//                       </p>
//                     )}
//                   </div>
//                 )}
//               </motion.div>
//             </form>

//             {/* Desktop links */}
//             <div className="hidden md:flex items-center gap-6">
//               <NavLink to="/" label="Home" />
//               <NavLink to="/about" label="About" />
//               <NavLink to="/cuisine" label="Cuisines" />
//               <NavLink to="/subscription" label="Subscription" />

//               {/* Orders icon */}
//               <Link
//                 to="/orders"
//                 className="p-2 rounded-xl border border-gray-200 hover:bg-primary/5 transition"
//                 aria-label="Orders"
//               >
//                 <ShoppingCart size={22} className="text-gray-700" />
//               </Link>

//               {/* Profile */}
//               <Link
//                 to="/profile"
//                 className="p-2 rounded-xl border border-gray-200 hover:bg-primary/5 transition"
//               >
//                 <User size={22} className="text-gray-700" />
//               </Link>

//               {/* Login/Logout */}
//               {isLoggedIn ? (
//                 <button
//                   onClick={() => setIsLoggedIn(false)}
//                   className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500 text-white font-semibold"
//                 >
//                   <LogOut size={18} />
//                   <span>Logout</span>
//                 </button>
//               ) : (
//                 <Link
//                   to="/login"
//                   className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white font-semibold"
//                 >
//                   <LogIn size={18} />
//                   <span>Login</span>
//                 </Link>
//               )}
//             </div>

//             {/* Mobile */}
//             <div className="md:hidden flex items-center gap-2">
//               <button
//                 onClick={() => setMenuOpen((v) => !v)}
//                 className="p-2 rounded-lg border border-gray-200"
//               >
//                 {menuOpen ? <X size={22} /> : <Menu size={22} />}
//               </button>
//             </div>
//           </div>

//           {/* Mobile dropdown */}
//           <AnimatePresence>
//             {menuOpen && (
//               <motion.div
//                 initial={{ height: 0, opacity: 0 }}
//                 animate={{ height: "auto", opacity: 1 }}
//                 exit={{ height: 0, opacity: 0 }}
//                 className="md:hidden overflow-hidden"
//               >
//                 <div className="grid gap-1 pb-4">
//                   <MobileLink to="/" label="Home" onClick={() => setMenuOpen(false)} />
//                   <MobileLink to="/about" label="About" onClick={() => setMenuOpen(false)} />
//                   <MobileLink to="/cuisine" label="Cuisines" onClick={() => setMenuOpen(false)} />
//                   <MobileLink to="/subscription" label="Subscription" onClick={() => setMenuOpen(false)} />
//                   <MobileLink to="/orders" label="Orders" onClick={() => setMenuOpen(false)} />
//                   <MobileLink to="/profile" label="Profile" onClick={() => setMenuOpen(false)} />

//                   {isLoggedIn ? (
//                     <button
//                       onClick={() => {
//                         setIsLoggedIn(false);
//                         setMenuOpen(false);
//                       }}
//                       className="mt-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-red-500 text-white font-semibold"
//                     >
//                       <LogOut size={18} /> Logout
//                     </button>
//                   ) : (
//                     <Link
//                       to="/login"
//                       onClick={() => setMenuOpen(false)}
//                       className="mt-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gray-900 text-white font-semibold"
//                     >
//                       <LogIn size={18} /> Login
//                     </Link>
//                   )}
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </nav>
//     </>
//   );
// }

// /* ---------- helpers ---------- */
// function NavLink({ to, label }) {
//   return (
//     <Link
//       to={to}
//       className="relative text-gray-700 hover:text-primary transition group"
//     >
//       <span className="relative z-10">{label}</span>
//       <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-primary transition-all group-hover:w-full" />
//     </Link>
//   );
// }

// function MobileLink({ to, label, onClick }) {
//   return (
//     <Link
//       to={to}
//       onClick={onClick}
//       className="px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-800"
//     >
//       {label}
//     </Link>
//   );
// }



// // src/components/ui/Navbar.jsx
// import { useEffect, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import {
//   LogIn,
//   LogOut,
//   ShoppingCart,
//   Menu,
//   X,
//   Search,
//   ChevronRight,
//   User,
//   ClipboardList,
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useCart } from "../../context/CartContext";
// import { CUISINES } from "../../assets/data/dishes";

// export default function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [query, setQuery] = useState("");

//   const [isLoggedIn, setIsLoggedIn] = useState(false); // ✅ dummy login state

//   const location = useLocation();
//   const navigate = useNavigate();

//   // --- Cart context
//   const cartCtx = (() => {
//     try {
//       return useCart?.();
//     } catch {
//       return null;
//     }
//   })();

//   const items = cartCtx?.items ?? [];
//   const totalItems = cartCtx?.totalItems ?? 0;

//   const hide =
//     location.pathname === "/login" ||
//     location.pathname === "/signup" ||
//     location.pathname === "/forgot-password";

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 6);
//     onScroll();
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   if (hide) return null;

//   // ✅ allDishes
//   const allDishes = CUISINES.flatMap(
//     (region) =>
//       region?.states?.flatMap((state) =>
//         state?.dishes?.map((dish) => ({
//           ...dish,
//           state: state.name,
//           region: region.region,
//         })) || []
//       ) || []
//   );

//   // ✅ Suggestions
//   const suggestions =
//     query.trim() === ""
//       ? []
//       : allDishes
//           .filter(
//             (d) =>
//               d.name.toLowerCase().includes(query.toLowerCase()) ||
//               d.state.toLowerCase().includes(query.toLowerCase()) ||
//               d.region.toLowerCase().includes(query.toLowerCase())
//           )
//           .slice(0, 6);

//   const pickTargetDish = () => {
//     const q = query.trim().toLowerCase();
//     if (!q) return null;
//     const exact = allDishes.find((d) => d.name.toLowerCase() === q);
//     if (exact) return exact;
//     if (suggestions.length > 0) return suggestions[0];
//     return null;
//   };

//   const onSearchSubmit = (e) => {
//     e.preventDefault();
//     const target = pickTargetDish();
//     if (target) {
//       navigate(
//         `/cuisine?dishId=${encodeURIComponent(
//           target.id
//         )}&q=${encodeURIComponent(target.name)}`
//       );
//     } else if (query.trim()) {
//       navigate(`/cuisine?q=${encodeURIComponent(query.trim())}`);
//     }
//     setMenuOpen(false);
//     setQuery(""); // ✅ close suggestions
//   };

//   return (
//     <nav
//       className={[
//         "sticky top-0 z-50 transition-all",
//         "backdrop-blur supports-[backdrop-filter]:bg-white/75 bg-white",
//         scrolled ? "shadow-md" : "shadow-sm",
//       ].join(" ")}
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6">
//         <div className="h-16 flex items-center justify-between gap-3">
//           {/* Logo */}
//           <Link to="/" className="inline-flex items-center gap-2 group">
//             <span className="text-2xl font-extrabold tracking-tight">
//               <span className="text-primary">Tiffino</span>
//             </span>
//             <span className="h-2 w-2 rounded-full bg-primary group-hover:scale-110 transition-transform" />
//           </Link>

//           {/* Search (Desktop) */}
//           <form
//             onSubmit={onSearchSubmit}
//             className="hidden md:block md:flex-1 max-w-xl mx-4"
//           >
//             <motion.div initial={false} className="relative">
//               <Search
//                 size={18}
//                 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//               />
//               <input
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//                 placeholder="Search dishes, cuisines, or states…"
//                 className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-200"
//               />
//               <button
//                 type="submit"
//                 className="absolute right-1.5 top-1/2 -translate-y-1/2 px-5 py-1 rounded-lg bg-primary text-white text-sm font-medium"
//               >
//                 Search <ChevronRight size={14} />
//               </button>

//               {query && (
//                 <div className="absolute z-50 mt-2 w-full rounded-xl bg-white shadow-lg border border-gray-200 max-h-60 overflow-auto">
//                   {suggestions.length > 0 ? (
//                     suggestions.map((d) => (
//                       <button
//                         key={`${d.id}-${d.state}`}
//                         type="button"
//                         onClick={() => {
//                           navigate(
//                             `/cuisine?dishId=${encodeURIComponent(
//                               d.id
//                             )}&q=${encodeURIComponent(d.name)}`
//                           );
//                           setMenuOpen(false);
//                           setQuery(""); // ✅ clear search
//                         }}
//                         className="w-full text-left px-4 py-2 hover:bg-gray-50 flex justify-between"
//                       >
//                         <span>{d.name}</span>
//                         <span className="text-xs text-gray-500">
//                           {d.state}
//                         </span>
//                       </button>
//                     ))
//                   ) : (
//                     <p className="px-4 py-2 text-sm text-gray-500">
//                       No results
//                     </p>
//                   )}
//                 </div>
//               )}
//             </motion.div>
//           </form>

//           {/* Desktop links */}
//           <div className="hidden md:flex items-center gap-6">
//             <NavLink to="/" label="Home" />
//             <NavLink to="/about" label="About" />
//             <NavLink to="/cuisine" label="Cuisines" />
//             <NavLink to="/subscription" label="Subscription" />

//             {/* Icons: Profile → Orders → Cart */}
//             <Link
//               to="/profile"
//               className="p-2 rounded-xl border border-gray-200 hover:bg-primary/5 transition relative"
//             >
//               <User size={22} className="text-gray-700" />
//             </Link>

//             <Link
//               to="/orders"
//               className="p-2 rounded-xl border border-gray-200 hover:bg-primary/5 transition relative"
//             >
//               <ClipboardList size={22} className="text-gray-700" />
//             </Link>

//             <Link
//               to="/cart"
//               className="p-2 rounded-xl border border-gray-200 hover:bg-primary/5 transition relative"
//             >
//               <ShoppingCart size={22} className="text-gray-700" />
//               {totalItems > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 rounded-full">
//                   {totalItems}
//                 </span>
//               )}
//             </Link>

//             {/* Login/Logout */}
//             {isLoggedIn ? (
//               <button
//                 onClick={() => setIsLoggedIn(false)}
//                 className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500 text-white font-semibold"
//               >
//                 <LogOut size={18} />
//                 <span>Logout</span>
//               </button>
//             ) : (
//               <Link
//                 to="/login"
//                 className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white font-semibold"
//               >
//                 <LogIn size={18} />
//                 <span>Login</span>
//               </Link>
//             )}
//           </div>

//           {/* Mobile */}
//           <div className="md:hidden flex items-center gap-2">
//             <button
//               onClick={() => setMenuOpen((v) => !v)}
//               className="p-2 rounded-lg border border-gray-200"
//             >
//               {menuOpen ? <X size={22} /> : <Menu size={22} />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile dropdown */}
//         <AnimatePresence>
//           {menuOpen && (
//             <motion.div
//               initial={{ height: 0, opacity: 0 }}
//               animate={{ height: "auto", opacity: 1 }}
//               exit={{ height: 0, opacity: 0 }}
//               className="md:hidden overflow-hidden"
//             >
//               {/* Mobile Search */}
//               <form onSubmit={onSearchSubmit} className="mt-3 relative px-1">
//                 <Search
//                   size={18}
//                   className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//                 />
//                 <input
//                   value={query}
//                   onChange={(e) => setQuery(e.target.value)}
//                   placeholder="Search dishes..."
//                   className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-200"
//                 />
//               </form>

//               <div className="grid gap-1 pb-4 mt-3">
//                 <MobileLink to="/" label="Home" onClick={() => setMenuOpen(false)} />
//                 <MobileLink to="/about" label="About" onClick={() => setMenuOpen(false)} />
//                 <MobileLink to="/cuisine" label="Cuisines" onClick={() => setMenuOpen(false)} />
//                 <MobileLink to="/subscription" label="Subscription" onClick={() => setMenuOpen(false)} />
//                 <MobileLink to="/profile" label="Profile" onClick={() => setMenuOpen(false)} />
//                 <MobileLink to="/orders" label="Orders" onClick={() => setMenuOpen(false)} />
//                 <MobileLink to="/cart" label="Cart" onClick={() => setMenuOpen(false)} />

//                 {isLoggedIn ? (
//                   <button
//                     onClick={() => {
//                       setIsLoggedIn(false);
//                       setMenuOpen(false);
//                     }}
//                     className="mt-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-red-500 text-white font-semibold"
//                   >
//                     <LogOut size={18} /> Logout
//                   </button>
//                 ) : (
//                   <Link
//                     to="/login"
//                     onClick={() => setMenuOpen(false)}
//                     className="mt-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gray-900 text-white font-semibold"
//                   >
//                     <LogIn size={18} /> Login
//                   </Link>
//                 )}
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </nav>
//   );
// }

// /* ---------- helpers ---------- */
// function NavLink({ to, label }) {
//   return (
//     <Link
//       to={to}
//       className="relative text-gray-700 hover:text-primary transition group"
//     >
//       <span className="relative z-10">{label}</span>
//       <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-primary transition-all group-hover:w-full" />
//     </Link>
//   );
// }

// function MobileLink({ to, label, onClick }) {
//   return (
//     <Link
//       to={to}
//       onClick={onClick}
//       className="px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-800"
//     >
//       {label}
//     </Link>
//   );
// }







// // src/components/ui/Navbar.jsx
// import { useEffect, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import {
//   LogIn,
//   LogOut,
//   ShoppingCart,
//   Menu,
//   X,
//   Search,
//   ChevronRight,
//   User,
//   Package,
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useCart } from "../../context/CartContext";
// import { CUISINES } from "../../assets/data/dishes";

// export default function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [query, setQuery] = useState("");
//   const [mobileSearch, setMobileSearch] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const location = useLocation();
//   const navigate = useNavigate();

//   // Cart context
//   const cartCtx = (() => {
//     try {
//       return useCart?.();
//     } catch {
//       return null;
//     }
//   })();
//   const totalItems = cartCtx?.totalItems ?? 0;

//   const hide =
//     location.pathname === "/login" ||
//     location.pathname === "/signup" ||
//     location.pathname === "/forgot-password";

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 6);
//     onScroll();
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   if (hide) return null;

//   // All dishes
//   const allDishes = CUISINES.flatMap(
//     (region) =>
//       region?.states?.flatMap((state) =>
//         state?.dishes?.map((dish) => ({
//           ...dish,
//           state: state.name,
//           region: region.region,
//         })) || []
//       ) || []
//   );

//   // Suggestions
//   const suggestions =
//     query.trim() === ""
//       ? []
//       : allDishes
//           .filter(
//             (d) =>
//               d.name.toLowerCase().includes(query.toLowerCase()) ||
//               d.state.toLowerCase().includes(query.toLowerCase()) ||
//               d.region.toLowerCase().includes(query.toLowerCase())
//           )
//           .slice(0, 6);

//   const pickTargetDish = () => {
//     const q = query.trim().toLowerCase();
//     if (!q) return null;
//     const exact = allDishes.find((d) => d.name.toLowerCase() === q);
//     if (exact) return exact;
//     if (suggestions.length > 0) return suggestions[0];
//     return null;
//   };

//   const onSearchSubmit = (e) => {
//     e.preventDefault();
//     const target = pickTargetDish();
//     if (target) {
//       navigate(
//         `/cuisine?dishId=${encodeURIComponent(
//           target.id
//         )}&q=${encodeURIComponent(target.name)}`
//       );
//     } else if (query.trim()) {
//       navigate(`/cuisine?q=${encodeURIComponent(query.trim())}`);
//     }
//     setMenuOpen(false);
//     setQuery(""); // clear
//     setMobileSearch(false);
//   };

//   return (
//     <nav
//       className={`sticky top-0 z-50 transition-all backdrop-blur bg-white/80 ${
//         scrolled ? "shadow-md" : "shadow-sm"
//       }`}
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6">
//         <div className="h-16 flex items-center justify-between gap-3">
//           {/* Logo */}
//           <Link to="/" className="inline-flex items-center gap-2 group">
//             <span className="text-2xl font-extrabold tracking-tight">
//               <span className="text-primary">Tiffino</span>
//             </span>
//             <span className="h-2 w-2 rounded-full bg-primary group-hover:scale-110 transition-transform" />
//           </Link>

//           {/* Desktop Search */}
//           <form
//             onSubmit={onSearchSubmit}
//             className="hidden md:block md:flex-1 max-w-xl mx-4"
//           >
//             <motion.div initial={false} className="relative">
//               <Search
//                 size={18}
//                 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//               />
//               <input
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//                 placeholder="Search dishes, cuisines, or states…"
//                 className="w-full pl-10 pr-20 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/50"
//               />
//               <button
//                 type="submit"
//                 className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-primary text-white text-sm font-medium flex items-center gap-1"
//               >
//                 Search <ChevronRight size={16} />
//               </button>

//               {query && (
//                 <div className="absolute z-50 mt-2 w-full rounded-xl bg-white shadow-lg border border-gray-200 max-h-60 overflow-auto">
//                   {suggestions.length > 0 ? (
//                     suggestions.map((d) => (
//                       <button
//                         key={`${d.id}-${d.state}`}
//                         type="button"
//                         onClick={() => {
//                           navigate(
//                             `/cuisine?dishId=${encodeURIComponent(
//                               d.id
//                             )}&q=${encodeURIComponent(d.name)}`
//                           );
//                           setMenuOpen(false);
//                           setQuery("");
//                         }}
//                         className="w-full text-left px-4 py-2 hover:bg-gray-50 flex justify-between"
//                       >
//                         <span>{d.name}</span>
//                         <span className="text-xs text-gray-500">
//                           {d.state}
//                         </span>
//                       </button>
//                     ))
//                   ) : (
//                     <p className="px-4 py-2 text-sm text-gray-500">
//                       No results
//                     </p>
//                   )}
//                 </div>
//               )}
//             </motion.div>
//           </form>

//           {/* Desktop Icons */}
//           <div className="hidden md:flex items-center gap-4">
//             <NavLink to="/" label="Home" />
//             <NavLink to="/cuisine" label="Cuisines" />
//             <NavLink to="/subscription" label="Subscription" />
//              <NavLink to="/about" label="About" />


//             {/* Cart */}
//             <Link
//               to="/cart"
//               className="relative p-2 rounded-xl border border-gray-200 hover:bg-primary/5 transition"
//             >
//               <ShoppingCart size={22} className="text-gray-700" />
//               {totalItems > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
//                   {totalItems}
//                 </span>
//               )}
//             </Link>

//             {/* Orders */}
//             <Link
//               to="/orders"
//               className="p-2 rounded-xl border border-gray-200 hover:bg-primary/5 transition"
//             >
//               <Package size={22} className="text-gray-700" />
//             </Link>

//             {/* Profile */}
//             <Link
//               to="/profile"
//               className="p-2 rounded-xl border border-gray-200 hover:bg-primary/5 transition"
//             >
//               <User size={22} className="text-gray-700" />
//             </Link>

//             {/* Login/Logout */}
//             {isLoggedIn ? (
//               <button
//                 onClick={() => setIsLoggedIn(false)}
//                 className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500 text-white font-semibold"
//               >
//                 <LogOut size={18} />
//                 <span>Logout</span>
//               </button>
//             ) : (
//               <Link
//                 to="/login"
//                 className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white font-semibold"
//               >
//                 <LogIn size={18} />
//                 <span>Login</span>
//               </Link>
//             )}
//           </div>

//           {/* Mobile */}
//           <div className="md:hidden flex items-center gap-2">
//             <button
//               onClick={() => setMobileSearch((v) => !v)}
//               className="p-2 rounded-lg border border-gray-200"
//             >
//               <Search size={22} />
//             </button>
//             <button
//               onClick={() => setMenuOpen((v) => !v)}
//               className="p-2 rounded-lg border border-gray-200"
//             >
//               {menuOpen ? <X size={22} /> : <Menu size={22} />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Search */}
//         <AnimatePresence>
//           {mobileSearch && (
//             <motion.form
//               onSubmit={onSearchSubmit}
//               initial={{ height: 0, opacity: 0 }}
//               animate={{ height: "auto", opacity: 1 }}
//               exit={{ height: 0, opacity: 0 }}
//               className="md:hidden px-2 pb-2"
//             >
//               <div className="relative">
//                 <input
//                   value={query}
//                   onChange={(e) => setQuery(e.target.value)}
//                   placeholder="Search…"
//                   className="w-full pl-10 pr-20 py-2.5 rounded-xl border border-gray-200"
//                 />
//                 <Search
//                   size={18}
//                   className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//                 />
//                 <button
//                   type="submit"
//                   className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-primary text-white text-sm"
//                 >
//                   Go
//                 </button>
//               </div>
//             </motion.form>
//           )}
//         </AnimatePresence>

//         {/* Mobile dropdown */}
//         <AnimatePresence>
//           {menuOpen && (
//             <motion.div
//               initial={{ height: 0, opacity: 0 }}
//               animate={{ height: "auto", opacity: 1 }}
//               exit={{ height: 0, opacity: 0 }}
//               className="md:hidden overflow-hidden"
//             >
//               <div className="grid gap-1 pb-4">
//                 <MobileLink to="/" label="Home" onClick={() => setMenuOpen(false)} />
//                 <MobileLink to="/cuisine" label="Cuisines" onClick={() => setMenuOpen(false)} />
//                 <MobileLink to="/subscription" label="Subscription" onClick={() => setMenuOpen(false)} />
//                 <MobileLink to="/about" label="About" onClick={() => setMenuOpen(false)} />
//                 <MobileLink to="/cart" label="Cart" onClick={() => setMenuOpen(false)} />
//                 <MobileLink to="/orders" label="Orders" onClick={() => setMenuOpen(false)} />
//                 <MobileLink to="/profile" label="Profile" onClick={() => setMenuOpen(false)} />

//                 {isLoggedIn ? (
//                   <button
//                     onClick={() => {
//                       setIsLoggedIn(false);
//                       setMenuOpen(false);
//                     }}
//                     className="mt-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-red-500 text-white font-semibold"
//                   >
//                     <LogOut size={18} /> Logout
//                   </button>
//                 ) : (
//                   <Link
//                     to="/login"
//                     onClick={() => setMenuOpen(false)}
//                     className="mt-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gray-900 text-white font-semibold"
//                   >
//                     <LogIn size={18} /> Login
//                   </Link>
//                 )}
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </nav>
//   );
// }

// /* ---------- helpers ---------- */
// function NavLink({ to, label }) {
//   return (
//     <Link
//       to={to}
//       className="relative text-gray-700 hover:text-primary transition group"
//     >
//       <span className="relative z-10">{label}</span>
//       <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-primary transition-all group-hover:w-full" />
//     </Link>
//   );
// }

// function MobileLink({ to, label, onClick }) {
//   return (
//     <Link
//       to={to}
//       onClick={onClick}
//       className="px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-800"
//     >
//       {label}
//     </Link>
//   );
// }


// // src/components/ui/Navbar.jsx
// import { useEffect, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import {
//   LogIn,
//   LogOut,
//   ShoppingCart,
//   Menu,
//   X,
//   Search,
//   ChevronRight,
//   User,
//   Package,
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useCart } from "../../context/CartContext";
// import { CUISINES } from "../../assets/data/dishes";

// export default function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [query, setQuery] = useState("");
//   const [mobileSearch, setMobileSearch] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const location = useLocation();
//   const navigate = useNavigate();

//   // Cart context
//   const cartCtx = (() => {
//     try {
//       return useCart?.();
//     } catch {
//       return null;
//     }
//   })();
//   const totalItems = cartCtx?.totalItems ?? 0;

//   const hide =
//     location.pathname === "/login" ||
//     location.pathname === "/signup" ||
//     location.pathname === "/forgot-password";

//   // Check token
//   useEffect(() => {
//     const checkToken = () => {
//       const token = localStorage.getItem("token");
//       setIsLoggedIn(!!token);
//     };
//     checkToken();

//     window.addEventListener("storageUpdate", checkToken);
//     window.addEventListener("storage", checkToken);

//     return () => {
//       window.removeEventListener("storageUpdate", checkToken);
//       window.removeEventListener("storage", checkToken);
//     };
//   }, []);

//   // Scroll effect
//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 6);
//     onScroll();
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   if (hide) return null;

//   // Flatten dishes for search
//   const allDishes = CUISINES.flatMap(
//     (region) =>
//       region?.states?.flatMap((state) =>
//         state?.dishes?.map((dish) => ({
//           ...dish,
//           state: state.name,
//           region: region.region,
//         })) || []
//       ) || []
//   );

//   const suggestions =
//     query.trim() === ""
//       ? []
//       : allDishes
//           .filter(
//             (d) =>
//               d.name.toLowerCase().includes(query.toLowerCase()) ||
//               d.state.toLowerCase().includes(query.toLowerCase()) ||
//               d.region.toLowerCase().includes(query.toLowerCase())
//           )
//           .slice(0, 6);

//   const pickTargetDish = () => {
//     const q = query.trim().toLowerCase();
//     if (!q) return null;
//     const exact = allDishes.find((d) => d.name.toLowerCase() === q);
//     if (exact) return exact;
//     if (suggestions.length > 0) return suggestions[0];
//     return null;
//   };

//   const onSearchSubmit = (e) => {
//     e.preventDefault();
//     const target = pickTargetDish();
//     if (target) {
//       navigate(
//         `/cuisine?dishId=${encodeURIComponent(
//           target.id
//         )}&q=${encodeURIComponent(target.name)}`
//       );
//     } else if (query.trim()) {
//       navigate(`/cuisine?q=${encodeURIComponent(query.trim())}`);
//     }
//     setMenuOpen(false);
//     setQuery("");
//     setMobileSearch(false);
//   };

//   // ✅ Logout handler
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setIsLoggedIn(false);
//     window.dispatchEvent(new Event("storageUpdate"));
//     navigate("/login");
//   };

//   return (
//     <nav
//       className={`sticky top-0 z-50 transition-all backdrop-blur bg-white/80 ${
//         scrolled ? "shadow-md" : "shadow-sm"
//       }`}
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6">
//         <div className="h-16 flex items-center justify-between gap-3">
//           {/* Logo */}
//           <Link to="/" className="inline-flex items-center gap-2 group">
//             <span className="text-2xl font-extrabold tracking-tight">
//               <span className="text-primary">Tiffino</span>
//             </span>
//             <span className="h-2 w-2 rounded-full bg-primary group-hover:scale-110 transition-transform" />
//           </Link>

//           {/* Desktop Search */}
//           <form
//             onSubmit={onSearchSubmit}
//             className="hidden md:block md:flex-1 max-w-xl mx-4"
//           >
//             <motion.div initial={false} className="relative">
//               <Search
//                 size={18}
//                 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//               />
//               <input
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//                 placeholder="Search dishes, cuisines, or states…"
//                 className="w-full pl-10 pr-20 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/50"
//               />
//               <button
//                 type="submit"
//                 className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-primary text-white text-sm font-medium flex items-center gap-1"
//               >
//                 Search <ChevronRight size={16} />
//               </button>

//               {query && (
//                 <div className="absolute z-50 mt-2 w-full rounded-xl bg-white shadow-lg border border-gray-200 max-h-60 overflow-auto">
//                   {suggestions.length > 0 ? (
//                     suggestions.map((d) => (
//                       <button
//                         key={`${d.id}-${d.state}`}
//                         type="button"
//                         onClick={() => {
//                           navigate(
//                             `/cuisine?dishId=${encodeURIComponent(
//                               d.id
//                             )}&q=${encodeURIComponent(d.name)}`
//                           );
//                           setMenuOpen(false);
//                           setQuery("");
//                         }}
//                         className="w-full text-left px-4 py-2 hover:bg-gray-50 flex justify-between"
//                       >
//                         <span>{d.name}</span>
//                         <span className="text-xs text-gray-500">{d.state}</span>
//                       </button>
//                     ))
//                   ) : (
//                     <p className="px-4 py-2 text-sm text-gray-500">No results</p>
//                   )}
//                 </div>
//               )}
//             </motion.div>
//           </form>

//           {/* Desktop Icons */}
//           <div className="hidden md:flex items-center gap-4">
//             <NavLink to="/" label="Home" />
//             <NavLink to="/cuisine" label="Cuisines" />
//             <NavLink to="/subscription" label="Subscription" />
//             <NavLink to="/about" label="About" />

//             {/* Cart */}
//             <Link
//               to="/cart"
//               className="relative p-2 rounded-xl border border-gray-200 hover:bg-primary/5 transition"
//             >
//               <ShoppingCart size={22} className="text-gray-700" />
//               {totalItems > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
//                   {totalItems}
//                 </span>
//               )}
//             </Link>

//             {/* Orders */}
//             <Link
//               to="/orders"
//               className="p-2 rounded-xl border border-gray-200 hover:bg-primary/5 transition"
//             >
//               <Package size={22} className="text-gray-700" />
//             </Link>

//             {/* Profile */}
//             <Link
//               to="/profile"
//               className="p-2 rounded-xl border border-gray-200 hover:bg-primary/5 transition"
//             >
//               <User size={22} className="text-gray-700" />
//             </Link>

//             {/* ✅ Login / Logout toggle */}
//             {isLoggedIn ? (
//               <button
//                 onClick={handleLogout}
//                 className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500 text-white font-semibold"
//               >
//                 <LogOut size={18} />
//                 <span>Logout</span>
//               </button>
//             ) : (
//               <Link
//                 to="/login"
//                 className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white font-semibold"
//               >
//                 <LogIn size={18} />
//                 <span>Login</span>
//               </Link>
//             )}
//           </div>

//           {/* Mobile controls */}
//           <div className="md:hidden flex items-center gap-2">
//             <button
//               onClick={() => setMobileSearch((v) => !v)}
//               className="p-2 rounded-lg border border-gray-200"
//             >
//               <Search size={22} />
//             </button>
//             <button
//               onClick={() => setMenuOpen((v) => !v)}
//               className="p-2 rounded-lg border border-gray-200"
//             >
//               {menuOpen ? <X size={22} /> : <Menu size={22} />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Search */}
//         <AnimatePresence>
//           {mobileSearch && (
//             <motion.form
//               onSubmit={onSearchSubmit}
//               initial={{ height: 0, opacity: 0 }}
//               animate={{ height: "auto", opacity: 1 }}
//               exit={{ height: 0, opacity: 0 }}
//               className="md:hidden px-2 pb-2"
//             >
//               <div className="relative">
//                 <input
//                   value={query}
//                   onChange={(e) => setQuery(e.target.value)}
//                   placeholder="Search…"
//                   className="w-full pl-10 pr-20 py-2.5 rounded-xl border border-gray-200"
//                 />
//                 <Search
//                   size={18}
//                   className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//                 />
//                 <button
//                   type="submit"
//                   className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-primary text-white text-sm"
//                 >
//                   Go
//                 </button>
//               </div>
//             </motion.form>
//           )}
//         </AnimatePresence>

//         {/* Mobile Menu */}
//         <AnimatePresence>
//           {menuOpen && (
//             <motion.div
//               initial={{ height: 0, opacity: 0 }}
//               animate={{ height: "auto", opacity: 1 }}
//               exit={{ height: 0, opacity: 0 }}
//               className="md:hidden overflow-hidden"
//             >
//               <div className="grid gap-1 pb-4">
//                 <MobileLink to="/" label="Home" onClick={() => setMenuOpen(false)} />
//                 <MobileLink to="/cuisine" label="Cuisines" onClick={() => setMenuOpen(false)} />
//                 <MobileLink to="/subscription" label="Subscription" onClick={() => setMenuOpen(false)} />
//                 <MobileLink to="/about" label="About" onClick={() => setMenuOpen(false)} />
//                 <MobileLink to="/cart" label="Cart" onClick={() => setMenuOpen(false)} />
//                 <MobileLink to="/orders" label="Orders" onClick={() => setMenuOpen(false)} />
//                 <MobileLink to="/profile" label="Profile" onClick={() => setMenuOpen(false)} />

//                 {isLoggedIn ? (
//                   <button
//                     onClick={() => {
//                       handleLogout();
//                       setMenuOpen(false);
//                     }}
//                     className="mt-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-red-500 text-white font-semibold"
//                   >
//                     <LogOut size={18} /> Logout
//                   </button>
//                 ) : (
//                   <Link
//                     to="/login"
//                     onClick={() => setMenuOpen(false)}
//                     className="mt-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gray-900 text-white font-semibold"
//                   >
//                     <LogIn size={18} /> Login
//                   </Link>
//                 )}
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </nav>
//   );
// }

// /* helpers */
// function NavLink({ to, label }) {
//   return (
//     <Link
//       to={to}
//       className="relative text-gray-700 hover:text-primary transition group"
//     >
//       <span className="relative z-10">{label}</span>
//       <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-primary transition-all group-hover:w-full" />
//     </Link>
//   );
// }

// function MobileLink({ to, label, onClick }) {
//   return (
//     <Link
//       to={to}
//       onClick={onClick}
//       className="px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-800"
//     >
//       {label}
//     </Link>
//   );
// }











// // src/components/ui/Navbar.jsx
// import { useEffect, useState, useRef } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import {
//   LogIn,
//   LogOut,
//   ShoppingCart,
//   Menu,
//   X,
//   Search,
//   ChevronRight,
//   User,
//   Package,
//   Home,
//   Utensils,
//   Crown,
//   Info,
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useCart } from "../../context/CartContext";
// import { CUISINES } from "../../assets/data/dishes";

// export default function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [query, setQuery] = useState("");
//   const [mobileSearch, setMobileSearch] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const searchRef = useRef(null);

//   const location = useLocation();
//   const navigate = useNavigate();

//   // Cart context
//   const cartCtx = (() => {
//     try {
//       return useCart?.();
//     } catch {
//       return null;
//     }
//   })();
//   const totalItems = cartCtx?.totalItems ?? 0;

//   const hide =
//     location.pathname === "/login" ||
//     location.pathname === "/signup" ||
//     location.pathname === "/forgot-password";

//   // Check token and update login state
//   useEffect(() => {
//     const checkToken = () => {
//       const token = localStorage.getItem("token");
//       setIsLoggedIn(!!token);
//     };
//     checkToken();

//     window.addEventListener("storageUpdate", checkToken);
//     window.addEventListener("storage", checkToken);

//     return () => {
//       window.removeEventListener("storageUpdate", checkToken);
//       window.removeEventListener("storage", checkToken);
//     };
//   }, []);

//   // Close suggestions on outside click
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (searchRef.current && !searchRef.current.contains(e.target)) {
//         setShowSuggestions(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Close mobile menu on route change
//   useEffect(() => {
//     setMenuOpen(false);
//     setMobileSearch(false);
//     setShowSuggestions(false);
//   }, [location.pathname]);

//   if (hide) return null;

//   // Flatten dishes for search
//   const allDishes = CUISINES.flatMap(
//     (region) =>
//       region?.states?.flatMap((state) =>
//         state?.dishes?.map((dish) => ({
//           ...dish,
//           state: state.name,
//           region: region.region,
//         })) || []
//       ) || []
//   );

//   const suggestions =
//     query.trim() === ""
//       ? []
//       : allDishes
//           .filter(
//             (d) =>
//               d.name.toLowerCase().includes(query.toLowerCase()) ||
//               d.state.toLowerCase().includes(query.toLowerCase()) ||
//               d.region.toLowerCase().includes(query.toLowerCase())
//           )
//           .slice(0, 6);

//   const pickTargetDish = () => {
//     const q = query.trim().toLowerCase();
//     if (!q) return null;
//     const exact = allDishes.find((d) => d.name.toLowerCase() === q);
//     if (exact) return exact;
//     if (suggestions.length > 0) return suggestions[0];
//     return null;
//   };

//   const onSearchSubmit = (e) => {
//     e.preventDefault();
//     const target = pickTargetDish();
//     if (target) {
//       navigate(
//         `/cuisine?dishId=${encodeURIComponent(
//           target.id
//         )}&q=${encodeURIComponent(target.name)}`
//       );
//     } else if (query.trim()) {
//       navigate(`/cuisine?q=${encodeURIComponent(query.trim())}`);
//     }
//     setMenuOpen(false);
//     setQuery("");
//     setMobileSearch(false);
//     setShowSuggestions(false);
//   };

//   const handleSuggestionClick = (dish) => {
//     navigate(
//       `/cuisine?dishId=${encodeURIComponent(dish.id)}&q=${encodeURIComponent(
//         dish.name
//       )}`
//     );
//     setMenuOpen(false);
//     setQuery("");
//     setShowSuggestions(false);
//   };

//   // Logout handler
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setIsLoggedIn(false);
//     window.dispatchEvent(new Event("storageUpdate"));
//     navigate("/login");
//   };

//   return (
//     <>
//       {/* Main Navbar - WHITE SOLID BACKGROUND */}
//       <motion.nav
//         initial={{ y: -100 }}
//         animate={{ y: 0 }}
//         transition={{ duration: 0.5, ease: "easeOut" }}
//         className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100"
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="h-20 flex items-center justify-between gap-4">
//             {/* Logo */}
//             <Link to="/" className="inline-flex items-center gap-2.5 group flex-shrink-0">
//               <motion.div
//                 whileHover={{ rotate: 360, scale: 1.1 }}
//                 transition={{ duration: 0.6, ease: "easeInOut" }}
//                 className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow"
//               >
//                 <Utensils className="w-6 h-6 text-white" />
//               </motion.div>
//               <div className="flex items-center gap-2">
//                 <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-red-600 via-orange-600 to-red-600 bg-clip-text text-primary">
//                   Tiffino
//                 </span>
//                 <motion.span
//                   animate={{
//                     scale: [1, 1.3, 1],
//                     opacity: [1, 0.7, 1],
//                   }}
//                   transition={{
//                     duration: 2,
//                     repeat: Infinity,
//                     ease: "easeInOut",
//                   }}
//                   className="h-2 w-2 rounded-full bg-gradient-to-r from-red-500 to-orange-500 shadow-lg"
//                 />
//               </div>
//             </Link>

//             {/* Desktop Search - PROPERLY SPACED */}
//             <div className="hidden lg:flex flex-1 max-w-xl mx-6" ref={searchRef}>
//               <form onSubmit={onSearchSubmit} className="w-full">
//                 <div className="relative">
//                   {/* Search Icon */}
//                   <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10">
//                     <Search size={20} strokeWidth={2.5} />
//                   </div>

//                   {/* Input Field */}
//                   <input
//                     value={query}
//                     onChange={(e) => {
//                       setQuery(e.target.value);
//                       setShowSuggestions(true);
//                     }}
//                     onFocus={() => setShowSuggestions(true)}
//                     placeholder="Search dishes"
//                     className="w-full pl-11 pr-24 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all duration-200 outline-none text-gray-800 placeholder:text-gray-400 text-sm"
//                   />

//                   {/* Search Button */}
//                   <motion.button
//                     type="submit"
//                     // whileHover={{ scale: 1.03 }}
//                     // whileTap={{ scale: 0.97 }}
//                     className="absolute right-1.5 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded-lg bg-primary text-white text-sm font-semibold flex items-center gap-1 shadow-sm hover:shadow-md transition-all"
//                   >
//                     Search
//                     <ChevronRight size={14} strokeWidth={3} />
//                   </motion.button>

//                   {/* Desktop Suggestions Dropdown */}
//                   <AnimatePresence>
//                     {showSuggestions && query && (
//                       <motion.div
//                         initial={{ opacity: 0, y: -10, scale: 0.95 }}
//                         animate={{ opacity: 1, y: 0, scale: 1 }}
//                         exit={{ opacity: 0, y: -10, scale: 0.95 }}
//                         transition={{ duration: 0.2 }}
//                         className="absolute z-50 mt-2 w-full rounded-xl bg-white shadow-2xl border border-gray-200 max-h-96 overflow-auto"
//                       >
//                         {suggestions.length > 0 ? (
//                           <div className="p-2">
//                             {suggestions.map((d, i) => (
//                               <motion.button
//                                 key={`${d.id}-${d.state}`}
//                                 initial={{ opacity: 0, x: -20 }}
//                                 animate={{ opacity: 1, x: 0 }}
//                                 transition={{ delay: i * 0.05 }}
//                                 type="button"
//                                 onClick={() => handleSuggestionClick(d)}
//                                 className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 transition-all flex justify-between items-center group"
//                               >
//                                 <div className="flex items-center gap-3">
//                                   <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-100 to-orange-100 flex items-center justify-center flex-shrink-0">
//                                     <Utensils className="w-4 h-4 text-red-600" />
//                                   </div>
//                                   <div>
//                                     <p className="font-semibold text-sm text-gray-800 group-hover:text-red-600 transition-colors">
//                                       {d.name}
//                                     </p>
//                                     <p className="text-xs text-gray-500">{d.state}</p>
//                                   </div>
//                                 </div>
//                                 <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-red-500 transition-colors flex-shrink-0" />
//                               </motion.button>
//                             ))}
//                           </div>
//                         ) : (
//                           <div className="px-4 py-8 text-center">
//                             <Search className="w-10 h-10 text-gray-300 mx-auto mb-2" />
//                             <p className="text-sm font-medium text-gray-500">No results found</p>
//                           </div>
//                         )}
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>
//               </form>
//             </div>

//             {/* Desktop Navigation */}
//             <div className="hidden lg:flex items-center gap-1.5 flex-shrink-0">
//               <NavLink to="/" label="Home" icon={<Home size={18} />} />
//               <NavLink to="/cuisine" label="Cuisines" icon={<Utensils size={18} />} />
//               <NavLink to="/subscription" label="Subscription" icon={<Crown size={18} />} />
//               <NavLink to="/about" label="About" icon={<Info size={18} />} />

//               {/* Cart */}
//               <Link to="/cart">
//                 <motion.div
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="relative p-2 rounded-lg hover:bg-gray-50 transition-all group ml-2"
//                 >
//                   <ShoppingCart size={22} className="text-gray-700 group-hover:text-primary transition-colors" />
//                   {totalItems > 0 && (
//                     <motion.span
//                       initial={{ scale: 0 }}
//                       animate={{ scale: 1 }}
//                       className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold"
//                     >
//                       {totalItems}
//                     </motion.span>
//                   )}
//                 </motion.div>
//               </Link>

//               {/* Orders */}
//               <Link to="/orders">
//                 <motion.div
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="p-2 rounded-lg hover:bg-gray-50 transition-all group"
//                 >
//                   <Package size={22} className="text-gray-700 group-hover:text-orange-600 transition-colors" />
//                 </motion.div>
//               </Link>

//               {/* Profile */}
//               <Link to="/profile">
//                 <motion.div
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="p-2 rounded-lg hover:bg-gray-50 transition-all group"
//                 >
//                   <User size={22} className="text-gray-700 group-hover:text-red-600 transition-colors" />
//                 </motion.div>
//               </Link>

//               {/* Login / Logout Button - DYNAMIC */}
//               {isLoggedIn ? (
//                 <motion.button
//                   onClick={handleLogout}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="ml-2 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white font-semibold shadow-md hover:shadow-lg transition-all"
//                 >
//                   <LogOut size={18} />
//                   <span>Logout</span>
//                 </motion.button>
//               ) : (
//                 <Link to="/login">
//                   <motion.div
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     className="ml-2 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white font-semibold shadow-md hover:shadow-lg transition-all"
//                   >
//                     <LogIn size={18} />
//                     <span>Login</span>
//                   </motion.div>
//                 </Link>
//               )}
//             </div>

//             {/* Mobile controls */}
//             <div className="lg:hidden flex items-center gap-2 flex-shrink-0">
//               <motion.button
//                 whileTap={{ scale: 0.9 }}
//                 onClick={() => setMobileSearch((v) => !v)}
//                 className="p-2 rounded-lg hover:bg-gray-50 transition-all"
//               >
//                 <Search size={22} className="text-gray-700" />
//               </motion.button>
//               <motion.button
//                 whileTap={{ scale: 0.9 }}
//                 onClick={() => setMenuOpen((v) => !v)}
//                 className="p-2 rounded-lg hover:bg-gray-50 transition-all"
//               >
//                 <AnimatePresence mode="wait">
//                   {menuOpen ? (
//                     <motion.div
//                       key="close"
//                       initial={{ rotate: -90, opacity: 0 }}
//                       animate={{ rotate: 0, opacity: 1 }}
//                       exit={{ rotate: 90, opacity: 0 }}
//                       transition={{ duration: 0.2 }}
//                     >
//                       <X size={22} className="text-gray-700" />
//                     </motion.div>
//                   ) : (
//                     <motion.div
//                       key="menu"
//                       initial={{ rotate: 90, opacity: 0 }}
//                       animate={{ rotate: 0, opacity: 1 }}
//                       exit={{ rotate: -90, opacity: 0 }}
//                       transition={{ duration: 0.2 }}
//                     >
//                       <Menu size={22} className="text-gray-700" />
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </motion.button>
//             </div>
//           </div>

//           {/* Mobile Search */}
//           <AnimatePresence>
//             {mobileSearch && (
//               <motion.form
//                 onSubmit={onSearchSubmit}
//                 initial={{ height: 0, opacity: 0 }}
//                 animate={{ height: "auto", opacity: 1 }}
//                 exit={{ height: 0, opacity: 0 }}
//                 transition={{ duration: 0.3 }}
//                 className="lg:hidden overflow-hidden pb-4"
//               >
//                 <div className="relative">
//                   <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10">
//                     <Search size={18} strokeWidth={2.5} />
//                   </div>
//                   <input
//                     value={query}
//                     onChange={(e) => setQuery(e.target.value)}
//                     placeholder="Search dishes…"
//                     className="w-full pl-10 pr-16 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all outline-none text-gray-800 placeholder:text-gray-400 text-sm"
//                   />
//                   <motion.button
//                     type="submit"
//                     whileTap={{ scale: 0.95 }}
//                     className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-red-500 to-orange-500 text-white text-sm font-semibold"
//                   >
//                     Go
//                   </motion.button>
//                 </div>
//               </motion.form>
//             )}
//           </AnimatePresence>

//           {/* Mobile Menu */}
//           <AnimatePresence>
//             {menuOpen && (
//               <motion.div
//                 initial={{ height: 0, opacity: 0 }}
//                 animate={{ height: "auto", opacity: 1 }}
//                 exit={{ height: 0, opacity: 0 }}
//                 transition={{ duration: 0.3 }}
//                 className="lg:hidden overflow-hidden border-t border-gray-100"
//               >
//                 <div className="py-4 space-y-1">
//                   <MobileLink
//                     to="/"
//                     label="Home"
//                     icon={<Home size={20} />}
//                     onClick={() => setMenuOpen(false)}
//                   />
//                   <MobileLink
//                     to="/cuisine"
//                     label="Cuisines"
//                     icon={<Utensils size={20} />}
//                     onClick={() => setMenuOpen(false)}
//                   />
//                   <MobileLink
//                     to="/subscription"
//                     label="Subscription"
//                     icon={<Crown size={20} />}
//                     onClick={() => setMenuOpen(false)}
//                   />
//                   <MobileLink
//                     to="/about"
//                     label="About"
//                     icon={<Info size={20} />}
//                     onClick={() => setMenuOpen(false)}
//                   />
//                   <MobileLink
//                     to="/cart"
//                     label="Cart"
//                     icon={<ShoppingCart size={20} />}
//                     badge={totalItems}
//                     onClick={() => setMenuOpen(false)}
//                   />
//                   <MobileLink
//                     to="/orders"
//                     label="Orders"
//                     icon={<Package size={20} />}
//                     onClick={() => setMenuOpen(false)}
//                   />
//                   <MobileLink
//                     to="/profile"
//                     label="Profile"
//                     icon={<User size={20} />}
//                     onClick={() => setMenuOpen(false)}
//                   />

//                   {/* Mobile Login/Logout - DYNAMIC */}
//                   {isLoggedIn ? (
//                     <motion.button
//                       whileTap={{ scale: 0.95 }}
//                       onClick={() => {
//                         handleLogout();
//                         setMenuOpen(false);
//                       }}
//                       className="w-full mt-3 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold shadow-md"
//                     >
//                       <LogOut size={18} /> Logout
//                     </motion.button>
//                   ) : (
//                     <Link
//                       to="/login"
//                       onClick={() => setMenuOpen(false)}
//                       className="w-full mt-3 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold shadow-md"
//                     >
//                       <LogIn size={18} /> Login
//                     </Link>
//                   )}
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </motion.nav>
//     </>
//   );
// }

// /* Desktop Nav Link */
// function NavLink({ to, label, icon }) {
//   const location = useLocation();
//   const isActive = location.pathname === to;

//   return (
//     <Link to={to}>
//       <motion.div
//         whileHover={{ y: -2 }}
//         className={`relative px-3 py-2 rounded-lg transition-all group ${
//           isActive
//             ? "text-red-600 font-semibold bg-red-50"
//             : "text-gray-700 hover:text-red-600 hover:bg-gray-50"
//         }`}
//       >
//         <div className="flex items-center gap-2">
//           {icon}
//           <span className="relative z-10 text-sm font-medium">{label}</span>
//         </div>
//       </motion.div>
//     </Link>
//   );
// }

// /* Mobile Link */
// function MobileLink({ to, label, icon, badge, onClick }) {
//   const location = useLocation();
//   const isActive = location.pathname === to;

//   return (
//     <Link to={to} onClick={onClick}>
//       <motion.div
//         whileTap={{ scale: 0.98 }}
//         className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
//           isActive
//             ? "bg-gradient-to-r from-red-50 to-orange-50 text-red-600 font-semibold"
//             : "hover:bg-gray-50 text-gray-800"
//         }`}
//       >
//         <div className="flex items-center gap-3">
//           {icon}
//           <span className="font-medium">{label}</span>
//         </div>
//         {badge > 0 && (
//           <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
//             {badge}
//           </span>
//         )}
//       </motion.div>
//     </Link>
//   );
// }







// // src/components/ui/Navbar.jsx
// import { useEffect, useState, useRef } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import {
//   LogIn,
//   LogOut,
//   ShoppingCart,
//   Menu,
//   X,
//   Search,
//   ChevronRight,
//   User,
//   Package,
//   Home,
//   Utensils,
//   Crown,
//   Info,
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useCart } from "../../context/CartContext";
// import { useAuth } from "../../context/AuthContext";
// import { CUISINES } from "../../assets/data/dishes";

// export default function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [query, setQuery] = useState("");
//   const [mobileSearch, setMobileSearch] = useState(false);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const searchRef = useRef(null);

//   const location = useLocation();
//   const navigate = useNavigate();

//   const { isAuthenticated, logout } = useAuth();
//   const { totalItems = 0 } = useCart();

//   const hide =
//     location.pathname === "/login" ||
//     location.pathname === "/signup" ||
//     location.pathname === "/forgot-password";

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (searchRef.current && !searchRef.current.contains(e.target)) {
//         setShowSuggestions(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   useEffect(() => {
//     setMenuOpen(false);
//     setMobileSearch(false);
//     setShowSuggestions(false);
//   }, [location.pathname]);

//   if (hide) return null;

//   // 🔍 Search logic
//   const allDishes = CUISINES.flatMap(
//     (region) =>
//       region?.states?.flatMap((state) =>
//         state?.dishes?.map((dish) => ({
//           ...dish,
//           state: state.name,
//           region: region.region,
//         })) || []
//       ) || []
//   );

//   const suggestions =
//     query.trim() === ""
//       ? []
//       : allDishes
//           .filter(
//             (d) =>
//               d.name.toLowerCase().includes(query.toLowerCase()) ||
//               d.state.toLowerCase().includes(query.toLowerCase()) ||
//               d.region.toLowerCase().includes(query.toLowerCase())
//           )
//           .slice(0, 6);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (query.trim()) navigate(`/cuisine?q=${encodeURIComponent(query.trim())}`);
//     setQuery("");
//     setMobileSearch(false);
//   };

//   const handleLogout = async () => {
//     await logout();
//   };

//   return (
//     <>
//       <motion.nav
//         initial={{ y: -100 }}
//         animate={{ y: 0 }}
//         transition={{ duration: 0.4, ease: "easeOut" }}
//         className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100"
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="h-20 flex items-center justify-between">
//             {/* Logo */}
//             <Link
//               to="/"
//               className="inline-flex items-center gap-2.5 group flex-shrink-0"
//             >
//               <motion.div
//                 whileHover={{ rotate: 360, scale: 1.1 }}
//                 transition={{ duration: 0.6, ease: "easeInOut" }}
//                 className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow"
//               >
//                 <Utensils className="w-6 h-6 text-white" />
//               </motion.div>
//               <div className="flex items-center gap-2">
//                 <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-red-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
//                   Tiffino
//                 </span>
//               </div>
//             </Link>

//             {/* Desktop Search */}
//             <div
//               className="hidden lg:flex flex-1 max-w-xl mx-6"
//               ref={searchRef}
//             >
//               <form onSubmit={handleSearch} className="w-full relative">
//                 <Search
//                   size={20}
//                   className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//                 />
//                 <input
//                   type="text"
//                   value={query}
//                   onChange={(e) => {
//                     setQuery(e.target.value);
//                     setShowSuggestions(true);
//                   }}
//                   onFocus={() => setShowSuggestions(true)}
//                   placeholder="Search dishes"
//                   className="w-full pl-10 pr-24 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none text-sm"
//                 />
//                 <motion.button
//                   type="submit"
//                   whileHover={{ scale: 1.05 }}
//                   className="absolute right-1.5 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded-lg bg-primary text-white text-sm font-semibold flex items-center gap-1"
//                 >
//                   Search
//                   <ChevronRight size={14} />
//                 </motion.button>

//                 {/* Suggestions */}
//                 <AnimatePresence>
//                   {showSuggestions && query && (
//                     <motion.div
//                       initial={{ opacity: 0, y: -10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -10 }}
//                       className="absolute z-50 mt-2 w-full rounded-xl bg-white shadow-xl border border-gray-200 max-h-96 overflow-auto"
//                     >
//                       {suggestions.length > 0 ? (
//                         suggestions.map((d, i) => (
//                           <button
//                             key={i}
//                             type="button"
//                             onClick={() => navigate(`/cuisine?q=${d.name}`)}
//                             className="w-full text-left px-4 py-2.5 hover:bg-red-50 text-sm flex items-center justify-between"
//                           >
//                             <span>{d.name}</span>
//                             <ChevronRight size={16} className="text-gray-400" />
//                           </button>
//                         ))
//                       ) : (
//                         <div className="px-4 py-3 text-sm text-gray-500">
//                           No results found
//                         </div>
//                       )}
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </form>
//             </div>

//             {/* Desktop Nav Links */}
//             <div className="hidden lg:flex items-center gap-2">
//               <NavLink to="/" label="Home" icon={<Home size={18} />} />
//               <NavLink to="/cuisine" label="Cuisines" icon={<Utensils size={18} />} />
//               <NavLink to="/subscription" label="Subscription" icon={<Crown size={18} />} />
//               <NavLink to="/about" label="About" icon={<Info size={18} />} />

//               <Link to="/cart" className="relative p-2 rounded-lg hover:bg-gray-50">
//                 <ShoppingCart size={22} className="text-gray-700" />
//                 {totalItems > 0 && (
//                   <motion.span
//                     initial={{ scale: 0 }}
//                     animate={{ scale: 1 }}
//                     className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold"
//                   >
//                     {totalItems}
//                   </motion.span>
//                 )}
//               </Link>

//               <Link to="/orders">
//                 <Package size={22} className="text-gray-700 hover:text-orange-600" />
//               </Link>

//               <Link to="/profile">
//                 <User size={22} className="text-gray-700 hover:text-red-600" />
//               </Link>

//               {isAuthenticated ? (
//                 <motion.button
//                   onClick={handleLogout}
//                   whileHover={{ scale: 1.05 }}
//                   className="ml-2 flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white font-semibold shadow-md"
//                 >
//                   <LogOut size={18} />
//                   Logout
//                 </motion.button>
//               ) : (
//                 <Link to="/login">
//                   <motion.div
//                     whileHover={{ scale: 1.05 }}
//                     className="ml-2 flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white font-semibold shadow-md"
//                   >
//                     <LogIn size={18} />
//                     Login
//                   </motion.div>
//                 </Link>
//               )}
//             </div>

//             {/* Mobile Menu Button */}
//             <button
//               className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition"
//               onClick={() => setMenuOpen(!menuOpen)}
//             >
//               {menuOpen ? <X size={26} /> : <Menu size={26} />}
//             </button>
//           </div>
//         </div>

//         {/* 🔥 Mobile Menu */}
//         <AnimatePresence>
//           {menuOpen && (
//             <motion.div
//               initial={{ opacity: 0, y: -15 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -15 }}
//               transition={{ duration: 0.2 }}
//               className="lg:hidden bg-white border-t border-gray-100 shadow-lg"
//             >
//               <div className="p-4 space-y-3">
//                 <MobileLink to="/" label="Home" icon={<Home />} />
//                 <MobileLink to="/cuisine" label="Cuisines" icon={<Utensils />} />
//                 <MobileLink to="/subscription" label="Subscription" icon={<Crown />} />
//                 <MobileLink to="/about" label="About" icon={<Info />} />
//                 <MobileLink to="/cart" label={`Cart (${totalItems})`} icon={<ShoppingCart />} />
//                 <MobileLink to="/orders" label="Orders" icon={<Package />} />
//                 <MobileLink to="/profile" label="Profile" icon={<User />} />

//                 {isAuthenticated ? (
//                   <button
//                     onClick={handleLogout}
//                     className="w-full flex items-center gap-3 px-4 py-2 rounded-lg bg-primary text-white font-semibold shadow-md"
//                   >
//                     <LogOut size={18} />
//                     Logout
//                   </button>
//                 ) : (
//                   <Link
//                     to="/login"
//                     className="w-full flex items-center gap-3 px-4 py-2 rounded-lg bg-primary text-white font-semibold shadow-md"
//                   >
//                     <LogIn size={18} />
//                     Login
//                   </Link>
//                 )}
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.nav>
//     </>
//   );
// }

// /* ✅ Desktop NavLink */
// function NavLink({ to, label, icon }) {
//   const location = useLocation();
//   const isActive = location.pathname === to;

//   return (
//     <Link to={to}>
//       <motion.div
//         whileHover={{ y: -2 }}
//         className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
//           isActive
//             ? "text-red-600 bg-red-50 font-semibold"
//             : "text-gray-700 hover:text-red-600 hover:bg-gray-50"
//         }`}
//       >
//         {icon}
//         {label}
//       </motion.div>
//     </Link>
//   );
// }

// /* ✅ Mobile NavLink */
// function MobileLink({ to, label, icon }) {
//   return (
//     <Link
//       to={to}
//       className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
//     >
//       {icon}
//       <span className="text-sm font-medium">{label}</span>
//     </Link>
//   );
// }









// // src/components/ui/Navbar.jsx
// import { useEffect, useState, useRef } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import {
//   LogIn,
//   LogOut,
//   ShoppingCart,
//   Menu,
//   X,
//   Search,
//   ChevronRight,
//   User,
//   Package,
//   Home,
//   Utensils,
//   Crown,
//   Info,
// } from "lucide-react";

// import { motion, AnimatePresence } from "framer-motion";
// import { useCart } from "../../context/CartContext";
// import { useAuth } from "../../context/AuthContext";
// import { CUISINES } from "../../assets/data/dishes";

// export default function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [query, setQuery] = useState("");
//   const [mobileSearch, setMobileSearch] = useState(false);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const searchRef = useRef(null);

//   const location = useLocation();
//   const navigate = useNavigate();

//   // VERY IMPORTANT: GET USER FROM AUTH CONTEXT
//   const { user, logout } = useAuth();
//   const { totalItems = 0 } = useCart();

//   const hide =
//     location.pathname === "/login" ||
//     location.pathname === "/signup" ||
//     location.pathname === "/forgot-password";

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (searchRef.current && !searchRef.current.contains(e.target)) {
//         setShowSuggestions(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   useEffect(() => {
//     setMenuOpen(false);
//     setMobileSearch(false);
//     setShowSuggestions(false);
//   }, [location.pathname]);

//   if (hide) return null;

//   const allDishes = CUISINES.flatMap((region) =>
//     region?.states?.flatMap((state) =>
//       state?.dishes?.map((dish) => ({
//         ...dish,
//         state: state.name,
//         region: region.region,
//       })) || []
//     )
//   );

//   const suggestions =
//     query.trim() === ""
//       ? []
//       : allDishes
//           .filter(
//             (d) =>
//               d.name.toLowerCase().includes(query.toLowerCase()) ||
//               d.state.toLowerCase().includes(query.toLowerCase()) ||
//               d.region.toLowerCase().includes(query.toLowerCase())
//           )
//           .slice(0, 6);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (query.trim())
//       navigate(`/cuisine?q=${encodeURIComponent(query.trim())}`);

//     setQuery("");
//     setMobileSearch(false);
//   };

//   const handleLogout = async () => {
//     await logout();
//   };

//   return (
//     <>
//       <motion.nav
//         initial={{ y: -110 }}
//         animate={{ y: 0 }}
//         transition={{ duration: 0.45, ease: "easeOut" }}
//         className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 shadow-md border-b border-gray-200"
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="h-20 flex items-center justify-between">

//             {/* LOGO */}
//             <Link to="/" className="flex items-center gap-3 group">
//               <motion.div
//                 whileHover={{ rotate: 360, scale: 1.15 }}
//                 transition={{ duration: 0.7 }}
//                 className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center shadow-lg group-hover:shadow-2xl text-white"
//               >
//                 <Utensils size={24} />
//               </motion.div>

//               <span className="text-3xl font-extrabold tracking-tight text-primary">
//                 Tiffino
//               </span>
//             </Link>

//             {/* DESKTOP SEARCH */}
//             <div ref={searchRef} className="hidden lg:flex flex-1 mx-8 max-w-xl">
//               <form onSubmit={handleSearch} className="w-full relative">
//                 <Search
//                   size={20}
//                   className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//                 />
//                 <input
//                   type="text"
//                   value={query}
//                   onChange={(e) => {
//                     setQuery(e.target.value);
//                     setShowSuggestions(true);
//                   }}
//                   onFocus={() => setShowSuggestions(true)}
//                   placeholder="Search tasty meals..."
//                   className="
//                     w-full pl-10 pr-28 py-2.5 rounded-xl bg-gray-50 border border-gray-200 
//                     focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20
//                     text-sm outline-none transition-all"
//                 />

//                 <motion.button
//                   whileTap={{ scale: 0.9 }}
//                   type="submit"
//                   className="
//                     absolute right-2 top-1/2 -translate-y-1/2
//                     px-4 py-1.5 rounded-lg bg-primary 
//                     text-white font-semibold text-sm shadow-md"
//                 >
//                   Search
//                 </motion.button>

//                 {/* SEARCH SUGGESTIONS */}
//                 <AnimatePresence>
//                   {showSuggestions && query && (
//                     <motion.div
//                       initial={{ opacity: 0, y: -10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -10 }}
//                       className="
//                         absolute mt-2 w-full rounded-xl bg-white shadow-xl 
//                         border border-gray-200 max-h-72 overflow-auto z-50"
//                     >
//                       {suggestions.length > 0 ? (
//                         suggestions.map((d, i) => (
//                           <button
//                             key={i}
//                             type="button"
//                             onClick={() => navigate(`/cuisine?q=${d.name}`)}
//                             className="
//                               w-full text-left px-4 py-2.5 hover:bg-primary/10 
//                               text-sm flex items-center justify-between"
//                           >
//                             <span>{d.name}</span>
//                             <ChevronRight size={16} className="text-gray-400" />
//                           </button>
//                         ))
//                       ) : (
//                         <div className="px-4 py-3 text-sm text-gray-500">
//                           No results found
//                         </div>
//                       )}
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </form>
//             </div>

//             {/* DESKTOP NAVIGATION */}
//             <div className="hidden lg:flex items-center gap-3">

//               <NavLink to="/" label="Home" icon={<Home size={18} />} />
//               <NavLink to="/cuisine" label="Cuisines" icon={<Utensils size={18} />} />
//               <NavLink to="/subscription" label="Subscription" icon={<Crown size={18} />} />
//               <NavLink to="/about" label="About" icon={<Info size={18} />} />

//               {/* CART */}
//               <Link className="relative p-2 rounded-lg group hover:bg-gray-50" to="/cart">
//                 <ShoppingCart size={24} className="text-gray-700" />

//                 {totalItems > 0 && (
//                   <motion.span
//                     initial={{ scale: 0 }}
//                     animate={{ scale: 1 }}
//                     className="
//                       absolute -top-1 -right-1 
//                       bg-primary
//                       text-white text-xs w-5 h-5 flex items-center justify-center 
//                       rounded-full font-bold shadow-md"
//                   >
//                     {totalItems}
//                   </motion.span>
//                 )}
//               </Link>

//               <Link to="/orders">
//                 <Package size={22} className="text-gray-600 hover:text-primary" />
//               </Link>

//               <Link to="/profile">
//                 <User size={22} className="text-gray-600 hover:text-primary" />
//               </Link>

//               {/* 🔥 AUTH BUTTON FIXED */}
//               {user ? (
//                 <motion.button
//                   whileHover={{ scale: 1.06 }}
//                   onClick={handleLogout}
//                   className="
//                     flex items-center gap-2 px-5 py-2 rounded-xl 
//                     bg-primary text-white 
//                     font-semibold shadow-md"
//                 >
//                   <LogOut size={18} />
//                   Logout
//                 </motion.button>
//               ) : (
//                 <Link to="/login">
//                   <motion.div
//                     whileHover={{ scale: 1.06 }}
//                     className="
//                       flex items-center gap-2 px-5 py-2 rounded-xl 
//                       bg-primary text-white 
//                       font-semibold shadow-md"
//                   >
//                     <LogIn size={18} />
//                     Login
//                   </motion.div>
//                 </Link>
//               )}
//             </div>

//             {/* MOBILE MENU TOGGLE */}
//             <button
//               className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition"
//               onClick={() => setMenuOpen(!menuOpen)}
//             >
//               {menuOpen ? <X size={28} /> : <Menu size={28} />}
//             </button>

//           </div>
//         </div>

//         {/* MOBILE MENU */}
//         <AnimatePresence>
//           {menuOpen && (
//             <motion.div
//               initial={{ opacity: 0, y: -15 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -15 }}
//               className="
//                 lg:hidden bg-white shadow-lg border-t border-gray-200 
//                 p-4 space-y-3"
//             >
//               <MobileLink to="/" label="Home" icon={<Home />} />
//               <MobileLink to="/cuisine" label="Cuisines" icon={<Utensils />} />
//               <MobileLink to="/subscription" label="Subscription" icon={<Crown />} />
//               <MobileLink to="/about" label="About" icon={<Info />} />
//               <MobileLink to="/cart" label={`Cart (${totalItems})`} icon={<ShoppingCart />} />
//               <MobileLink to="/orders" label="Orders" icon={<Package />} />
//               <MobileLink to="/profile" label="Profile" icon={<User />} />

//               {/* MOBILE AUTH FIX */}
//               {user ? (
//                 <button
//                   onClick={handleLogout}
//                   className="w-full flex items-center gap-3 px-4 py-2 rounded-lg 
//                     bg-primary text-white font-semibold shadow-md"
//                 >
//                   <LogOut size={18} />
//                   Logout
//                 </button>
//               ) : (
//                 <Link
//                   to="/login"
//                   className="
//                     w-full flex items-center gap-3 px-4 py-2 rounded-lg 
//                     bg-primary 
//                     text-white font-semibold shadow-md"
//                 >
//                   <LogIn size={18} />
//                   Login
//                 </Link>
//               )}
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.nav>
//     </>
//   );
// }

// /************** Desktop NavLink **************/
// function NavLink({ to, label, icon }) {
//   const location = useLocation();
//   const isActive = location.pathname === to;

//   return (
//     <Link to={to}>
//       <motion.div
//         whileHover={{ y: -2, scale: 1.03 }}
//         className={`
//           flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium 
//           transition-all
//           ${
//             isActive
//               ? "bg-primary/10 text-primary shadow-sm"
//               : "text-gray-700 hover:text-primary hover:bg-primary/5"
//           }
//         `}
//       >
//         {icon}
//         {label}
//       </motion.div>
//     </Link>
//   );
// }

// /************** Mobile NavLink **************/
// function MobileLink({ to, label, icon }) {
//   return (
//     <Link
//       to={to}
//       className="
//         flex items-center gap-3 px-4 py-2 rounded-lg 
//         text-gray-700 hover:bg-primary/10 hover:text-primary transition"
//     >
//       {icon}
//       <span className="text-sm font-medium">{label}</span>
//     </Link>
//   );
// }
// Imp old one navbar















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