// import React, { useMemo, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { Search, Sparkles, Star, ShieldCheck, Bike, Clock } from "lucide-react";

// // ---------------- Dummy Data ----------------
// const DISHES = [
//   {
//     id: 1,
//     name: "Paneer Butter Masala",
//     image:
//       "https://i.pinimg.com/1200x/a7/01/6f/a7016f43b77f29386519fec35cb6d8b7.jpg",
//     cuisine: "North Indian",
//     __city: "Delhi",
//     __dishSlug: "paneer-butter-masala",
//     price: 199,
//   },
//   {
//     id: 2,
//     name: "Chicken Biryani",
//     image:
//       "https://i.pinimg.com/1200x/7f/5a/a7/7f5aa7cc58d1fd2118a9117438ba4c1f.jpg",
//     cuisine: "Hyderabadi",
//     __city: "Hyderabad",
//     __dishSlug: "chicken-biryani",
//     price: 249,
//   },
//   {
//     id: 3,
//     name: "Masala Dosa",
//     image:
//       "https://i.pinimg.com/1200x/61/23/74/612374b37b28b6790d6fbcb2ab5e8f82.jpg",
//     cuisine: "South Indian",
//     __city: "Bangalore",
//     __dishSlug: "masala-dosa",
//     price: 99,
//   },
// ];

// // ---------------- Home ----------------
// export default function Home() {
//   const navigate = useNavigate();
//   const [query, setQuery] = useState("");
//   const [open, setOpen] = useState(false);
//   const wrapRef = useRef(null);

//   const suggestions = useMemo(() => {
//     const q = query.trim().toLowerCase();
//     if (!q) return [];
//     return DISHES.filter((d) => d.name.toLowerCase().includes(q));
//   }, [query]);

//   const handleSelectDish = (dish) => {
//     setOpen(false);
//     setQuery("");
//     navigate(`/cuisine?dish=${dish.__dishSlug}`);
//   };

//   return (
//     <div className="bg-gradient-to-b from-white to-gray-50 min-h-screen">
//       {/* Hero Section */}
//       <Hero
//         query={query}
//         setQuery={setQuery}
//         open={open}
//         setOpen={setOpen}
//         suggestions={suggestions}
//         onSelectDish={handleSelectDish}
//         wrapRef={wrapRef}
//       />

//       <div className="px-4 md:px-10 lg:px-14 py-10 space-y-16">
//         {/* Featured section */}
//         <FadeInSection>
//           <SectionHeader
//             title="Featured near you"
//             subtitle="Handpicked — top rated & trending"
//           />
//           <RestaurantGrid data={DISHES} onSelectDish={handleSelectDish} />
//         </FadeInSection>

//         <FadeInSection>
//           <BenefitsStrip />
//         </FadeInSection>

//         <FadeInSection>
//           <SeasonalSpecials />
//         </FadeInSection>

//         <FadeInSection>
//           <Testimonials />
//         </FadeInSection>
//       </div>
//     </div>
//   );
// }

// // ---------------- Lightweight Fade Wrapper ----------------
// function FadeInSection({ children }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 40 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6, ease: "easeOut" }}
//       viewport={{ once: true }}
//     >
//       {children}
//     </motion.div>
//   );
// }

// // ---------------- HERO ----------------
// function Hero({ query, setQuery, open, setOpen, suggestions, onSelectDish, wrapRef }) {
//   return (
//     <section className="relative overflow-hidden bg-gradient-to-r from-amber-50 to-yellow-50">
//       <div className="px-4 md:px-10 lg:px-14 pt-14 pb-10">
//         <div className="grid lg:grid-cols-2 gap-10 items-center">
//           {/* Left Side */}
//           <FadeInSection>
//             <p className="inline-flex items-center gap-2 text-xs md:text-sm px-3 py-1 rounded-full bg-amber-100 text-amber-700 font-semibold">
//               <Sparkles className="w-4 h-4" /> Premium • Curated • Local
//             </p>

//             <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mt-4 bg-gradient-to-r from-amber-600 via-yellow-500 to-orange-600 bg-clip-text text-transparent">
//               Crave it. <span className="text-primary">Order it.</span> Love it.
//             </h1>

//             <p className="text-gray-600 mt-3 md:mt-4 max-w-xl text-lg">
//               Discover handpicked kitchens, lightning-fast delivery and seasonal specials near you.
//             </p>

//             {/* Search bar */}
//             <div ref={wrapRef} className="relative mt-6">
//               <form
//                 onSubmit={(e) => {
//                   e.preventDefault();
//                   if (suggestions[0]) onSelectDish(suggestions[0]);
//                 }}
//                 className="bg-white rounded-2xl shadow-lg border p-2 flex items-center gap-2"
//               >
//                 <Search className="w-5 h-5 text-gray-400 ml-1" />
//                 <input
//                   placeholder="Search for dishes..."
//                   value={query}
//                   onChange={(e) => {
//                     setQuery(e.target.value);
//                     setOpen(Boolean(e.target.value.trim()));
//                   }}
//                   className="flex-1 px-3 py-3 outline-none text-gray-800"
//                 />
//                 <button
//                   type="submit"
//                   className="px-4 py-2 rounded-xl bg-primary text-white font-semibold"
//                 >
//                   Search
//                 </button>
//               </form>

//               <AnimatePresence>
//                 {open && suggestions.length > 0 && (
//                   <motion.ul
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: 10 }}
//                     className="absolute left-0 right-0 mt-2 bg-white rounded-2xl border shadow-lg z-30"
//                   >
//                     {suggestions.map((d, i) => (
//                       <li key={i}>
//                         <button
//                           onClick={() => onSelectDish(d)}
//                           className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition"
//                         >
//                           <img
//                             src={d.image}
//                             alt={d.name}
//                             className="w-12 h-12 rounded-lg object-cover"
//                           />
//                           <div className="flex-1 text-left">
//                             <p className="font-semibold">{d.name}</p>
//                             <p className="text-xs text-gray-600">{d.__city}</p>
//                           </div>
//                         </button>
//                       </li>
//                     ))}
//                   </motion.ul>
//                 )}
//               </AnimatePresence>
//             </div>
//           </FadeInSection>

//           {/* Right Side Images */}
//           <FadeInSection>
//             <HeroImages />
//           </FadeInSection>
//         </div>
//       </div>
//     </section>
//   );
// }

// // ---------------- HERO IMAGES ----------------
// function HeroImages() {
//   const imgs = [
//     "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80",
//     "https://images.unsplash.com/photo-1544025162-d76694265947?q=80",
//     "https://images.unsplash.com/photo-1561758033-d89a9ad46330?q=80",
//     "https://images.unsplash.com/photo-1528137871618-79d2761e3fd5?q=80",
//     "https://i.pinimg.com/1200x/75/e7/29/75e729e20f3f24a9b037efefef05d3dd.jpg",
//     "https://i.pinimg.com/1200x/2d/1a/48/2d1a48695c292702f3a6bd3e50c5b31a.jpg",
//   ];

//   return (
//     <motion.div
//       initial="hidden"
//       animate="visible"
//       variants={{
//         hidden: {},
//         visible: { transition: { staggerChildren: 0.1 } },
//       }}
//       className="grid grid-cols-3 gap-4"
//     >
//       {imgs.map((src, i) => (
//         <motion.div
//           key={i}
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.6 }}
//           className="rounded-2xl overflow-hidden shadow-md h-32 md:h-44 bg-white"
//         >
//           <img
//             src={src}
//             alt="food"
//             className="w-full h-full object-cover"
//             loading="lazy"
//           />
//         </motion.div>
//       ))}
//     </motion.div>
//   );
// }

// // ---------------- Reusable UI ----------------
// function SectionHeader({ title, subtitle }) {
//   return (
//     <div className="mb-4">
//       <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
//       {subtitle && <p className="text-gray-600">{subtitle}</p>}
//     </div>
//   );
// }

// function RestaurantGrid({ data = [], onSelectDish }) {
//   return (
//     <motion.div
//       initial="hidden"
//       whileInView="visible"
//       viewport={{ once: true }}
//       variants={{
//         hidden: {},
//         visible: { transition: { staggerChildren: 0.15 } },
//       }}
//       className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5"
//     >
//       {data.map((d, i) => (
//         <motion.div
//           key={i}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="bg-white rounded-2xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
//         >
//           <img src={d.image} alt={d.name} className="w-full h-52 object-cover" />
//           <div className="p-4">
//             <h3 className="font-semibold text-lg">{d.name}</h3>
//             <p className="text-sm text-gray-600">{d.cuisine}</p>
//             <div className="flex justify-between items-center mt-3">
//               <span className="font-semibold">₹{d.price}</span>
//               <button
//                 onClick={() => onSelectDish(d)}
//                 className="px-3 py-2 rounded-xl bg-primary text-white text-sm"
//               >
//                 Order Now
//               </button>
//             </div>
//           </div>
//         </motion.div>
//       ))}
//     </motion.div>
//   );
// }

// function BenefitsStrip() {
//   const items = [
//     { icon: <Clock />, title: "20–30 min avg" },
//     { icon: <ShieldCheck />, title: "Hygiene Assured" },
//     { icon: <Bike />, title: "Live Tracking" },
//     { icon: <Star />, title: "Top Rated" },
//   ];
//   return (
//     <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
//       {items.map((it, i) => (
//         <motion.div
//           key={i}
//           initial={{ opacity: 0, scale: 0.9 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5 }}
//           className="bg-white p-5 rounded-2xl shadow flex items-center gap-2"
//         >
//           <span className="text-primary">{it.icon}</span>
//           <p className="font-medium">{it.title}</p>
//         </motion.div>
//       ))}
//     </div>
//   );
// }

// function SeasonalSpecials() {
//   const specials = [
//     {
//       title: "Monsoon Chaats",
//       img: "https://i.pinimg.com/736x/dc/96/88/dc96885e702c9eab7f445993388f8a3e.jpg",
//     },
//     {
//       title: "Street Biryani",
//       img: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?q=80",
//     },
//     {
//       title: "Healthy Bowls",
//       img: "https://i.pinimg.com/1200x/90/55/2b/90552b6ce65fd777b2dd0a56856d1be6.jpg",
//     },
//   ];
//   return (
//     <section>
//       <SectionHeader title="Seasonal Specials" />
//       <div className="grid md:grid-cols-3 gap-6 mt-5">
//         {specials.map((s, i) => (
//           <motion.div
//             key={i}
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="bg-white rounded-2xl shadow overflow-hidden transition-transform duration-300 hover:scale-105"
//           >
//             <img src={s.img} alt={s.title} className="h-48 w-full object-cover" />
//             <div className="p-4">
//               <h4 className="font-semibold">{s.title}</h4>
//               <button className="mt-3 px-3 py-2 rounded-xl bg-primary text-white text-sm">
//                 Order Now
//               </button>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// }

// function Testimonials() {
//   const reviews = [
//     {
//       name: "Riya Sharma",
//       text: "Delivery was super quick and food was hot. Loved it!",
//     },
//     {
//       name: "Aditya Verma",
//       text: "Great selection, neat tracking. My go-to app!",
//     },
//     { name: "Neha Patel", text: "Smooth checkout + clean design." },
//   ];
//   return (
//     <section>
//       <SectionHeader title="What people are saying" />
//       <div className="grid md:grid-cols-3 gap-6">
//         {reviews.map((r, i) => (
//           <motion.div
//             key={i}
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="bg-white rounded-2xl shadow p-5 text-center transition-transform duration-300 hover:scale-105"
//           >
//             <p className="italic text-gray-700">“{r.text}”</p>
//             <p className="mt-3 font-semibold">{r.name}</p>
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// }




// import React, { useMemo, useRef, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { 
//   Search, 
//   Sparkles, 
//   Star, 
//   ShieldCheck, 
//   Bike, 
//   Clock,
//   TrendingUp,
//   Award,
//   Heart,
//   ChevronRight,
//   MapPin,
//   Timer,
//   Flame,
//   Zap
// } from "lucide-react";

// // ---------------- Dummy Data ----------------
// const DISHES = [
//   {
//     id: 1,
//     name: "Paneer Butter Masala",
//     image:
//       "https://i.pinimg.com/1200x/a7/01/6f/a7016f43b77f29386519fec35cb6d8b7.jpg",
//     cuisine: "North Indian",
//     __city: "Delhi",
//     __dishSlug: "paneer-butter-masala",
//     price: 199,
//     rating: 4.5,
//     deliveryTime: "25-30 min",
//     discount: "20% OFF",
//     isPopular: true
//   },
//   {
//     id: 2,
//     name: "Chicken Biryani",
//     image:
//       "https://i.pinimg.com/1200x/7f/5a/a7/7f5aa7cc58d1fd2118a9117438ba4c1f.jpg",
//     cuisine: "Hyderabadi",
//     __city: "Hyderabad",
//     __dishSlug: "chicken-biryani",
//     price: 249,
//     rating: 4.8,
//     deliveryTime: "30-35 min",
//     discount: "15% OFF",
//     isPopular: true
//   },
//   {
//     id: 3,
//     name: "Masala Dosa",
//     image:
//       "https://i.pinimg.com/1200x/61/23/74/612374b37b28b6790d6fbcb2ab5e8f82.jpg",
//     cuisine: "South Indian",
//     __city: "Bangalore",
//     __dishSlug: "masala-dosa",
//     price: 99,
//     rating: 4.6,
//     deliveryTime: "20-25 min",
//     discount: "10% OFF",
//     isPopular: false
//   },
// ];

// // ---------------- Home ----------------
// export default function Home() {
//   const navigate = useNavigate();
//   const [query, setQuery] = useState("");
//   const [open, setOpen] = useState(false);
//   const [favorites, setFavorites] = useState([]);
//   const wrapRef = useRef(null);

//   const suggestions = useMemo(() => {
//     const q = query.trim().toLowerCase();
//     if (!q) return [];
//     return DISHES.filter((d) => d.name.toLowerCase().includes(q));
//   }, [query]);

//   const handleSelectDish = (dish) => {
//     setOpen(false);
//     setQuery("");
//     navigate(`/cuisine?dish=${dish.__dishSlug}`);
//   };

//   const toggleFavorite = (dishId) => {
//     setFavorites(prev => 
//       prev.includes(dishId) 
//         ? prev.filter(id => id !== dishId)
//         : [...prev, dishId]
//     );
//   };

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (wrapRef.current && !wrapRef.current.contains(e.target)) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div className="bg-gradient-to-b from-red-50/50 via-white to-gray-50 min-h-screen">
//       {/* Floating Background Elements */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <motion.div
//           animate={{
//             y: [0, -30, 0],
//             x: [0, 20, 0],
//           }}
//           transition={{
//             duration: 10,
//             repeat: Infinity,
//             ease: "easeInOut"
//           }}
//           className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-red-200/20 to-orange-200/20 rounded-full blur-3xl"
//         />
//         <motion.div
//           animate={{
//             y: [0, 30, 0],
//             x: [0, -20, 0],
//           }}
//           transition={{
//             duration: 12,
//             repeat: Infinity,
//             ease: "easeInOut"
//           }}
//           className="absolute bottom-40 left-10 w-96 h-96 bg-gradient-to-br from-orange-200/15 to-red-200/15 rounded-full blur-3xl"
//         />
//       </div>

//       {/* Hero Section */}
//       <Hero
//         query={query}
//         setQuery={setQuery}
//         open={open}
//         setOpen={setOpen}
//         suggestions={suggestions}
//         onSelectDish={handleSelectDish}
//         wrapRef={wrapRef}
//       />

//       <div className="relative px-4 md:px-10 lg:px-14 py-12 space-y-20">
//         {/* Stats Banner */}
//         <FadeInSection>
//           <StatsBanner />
//         </FadeInSection>

//         {/* Featured section */}
//         <FadeInSection>
//           <SectionHeader
//             title="Featured near you"
//             subtitle="Handpicked — top rated & trending"
//             icon={<Flame className="w-6 h-6" />}
//           />
//           <RestaurantGrid 
//             data={DISHES} 
//             onSelectDish={handleSelectDish}
//             favorites={favorites}
//             toggleFavorite={toggleFavorite}
//           />
//         </FadeInSection>

//         <FadeInSection>
//           <BenefitsStrip />
//         </FadeInSection>

//         <FadeInSection>
//           <SeasonalSpecials />
//         </FadeInSection>

//         <FadeInSection>
//           <Testimonials />
//         </FadeInSection>

//         {/* CTA Section */}
//         <FadeInSection>
//           <CTASection />
//         </FadeInSection>
//       </div>
//     </div>
//   );
// }

// // ---------------- Lightweight Fade Wrapper ----------------
// function FadeInSection({ children, delay = 0 }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 50 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.7, ease: "easeOut", delay }}
//       viewport={{ once: true, margin: "-100px" }}
//     >
//       {children}
//     </motion.div>
//   );
// }

// // ---------------- HERO ----------------
// function Hero({ query, setQuery, open, setOpen, suggestions, onSelectDish, wrapRef }) {
//   return (
//     <section className="relative overflow-hidden">
//       {/* Animated gradient background - RED THEME */}
//       <motion.div 
//         className="absolute inset-0 bg-gradient-to-br from-red-50 via-orange-50 to-red-100"
//         animate={{
//           background: [
//             "linear-gradient(135deg, #fef2f2 0%, #ffedd5 50%, #fee2e2 100%)",
//             "linear-gradient(135deg, #ffedd5 0%, #fee2e2 50%, #fef2f2 100%)",
//             "linear-gradient(135deg, #fee2e2 0%, #fef2f2 50%, #ffedd5 100%)",
//             "linear-gradient(135deg, #fef2f2 0%, #ffedd5 50%, #fee2e2 100%)",
//           ]
//         }}
//         transition={{
//           duration: 15,
//           repeat: Infinity,
//           ease: "linear"
//         }}
//       />
      
//       <div className="relative px-4 md:px-10 lg:px-14 pt-16 pb-16 md:pb-20">
//         <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
//           {/* Left Side */}
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8, ease: "easeOut" }}
//           >
//             <motion.p 
//               className="inline-flex items-center gap-2 text-xs md:text-sm px-4 py-2 rounded-full bg-gradient-to-r from-red-100 to-orange-100 text-primary font-semibold shadow-sm border border-red-200"
//               whileHover={{ scale: 1.05 }}
//               transition={{ type: "spring", stiffness: 300 }}
//             >
//               <Sparkles className="w-4 h-4" /> Premium • Curated • Local
//             </motion.p>

//             <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mt-6">
//               <motion.span
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.2 }}
//                 className="block bg-gradient-to-r from-red-600 via-orange-500 to-red-500 bg-clip-text text-primary"
//               >
//                 Crave it.
//               </motion.span>
//               <motion.span
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.3 }}
//                 className="block bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mt-2"
//               >
//                 Order it. Love it.
//               </motion.span>
//             </h1>

//             <motion.p 
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.4 }}
//               className="text-gray-600 mt-4 md:mt-6 max-w-xl text-base md:text-lg leading-relaxed"
//             >
//               Discover handpicked kitchens, lightning-fast delivery and seasonal specials near you.
//             </motion.p>

//             {/* Enhanced Search bar - RED THEME */}
//             <motion.div 
//               ref={wrapRef} 
//               className="relative mt-8"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.5 }}
//             >
//               <form
//                 onSubmit={(e) => {
//                   e.preventDefault();
//                   if (suggestions[0]) onSelectDish(suggestions[0]);
//                 }}
//                 className="bg-white rounded-2xl shadow-xl border border-red-100 p-2 flex items-center gap-2 hover:shadow-2xl transition-shadow duration-300"
//               >
//                 <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-red-100 to-orange-100">
//                   <Search className="w-5 h-5 text-red-600" />
//                 </div>
//                 <input
//                   placeholder="Search for dishes, cuisines..."
//                   value={query}
//                   onChange={(e) => {
//                     setQuery(e.target.value);
//                     setOpen(Boolean(e.target.value.trim()));
//                   }}
//                   className="flex-1 px-3 py-3 outline-none text-gray-800 placeholder:text-gray-400"
//                 />
//                 <motion.button
//                   type="submit"
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="px-5 py-3 rounded-xl bg-primary text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
//                 >
//                   Search
//                 </motion.button>
//               </form>

//               {/* Enhanced Suggestions Dropdown */}
//               <AnimatePresence>
//                 {open && suggestions.length > 0 && (
//                   <motion.ul
//                     initial={{ opacity: 0, y: -10, scale: 0.95 }}
//                     animate={{ opacity: 1, y: 0, scale: 1 }}
//                     exit={{ opacity: 0, y: -10, scale: 0.95 }}
//                     transition={{ duration: 0.2 }}
//                     className="absolute left-0 right-0 mt-3 bg-white rounded-2xl border border-gray-200 shadow-2xl z-30 overflow-hidden"
//                   >
//                     {suggestions.map((d, i) => (
//                       <motion.li 
//                         key={i}
//                         initial={{ opacity: 0, x: -20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ delay: i * 0.05 }}
//                       >
//                         <button
//                           onClick={() => onSelectDish(d)}
//                           className="w-full flex items-center gap-4 px-4 py-4 hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 transition-all duration-200 group"
//                         >
//                           <div className="relative">
//                             <img
//                               src={d.image}
//                               alt={d.name}
//                               className="w-14 h-14 rounded-xl object-cover shadow-md group-hover:shadow-lg transition-shadow"
//                             />
//                             {d.isPopular && (
//                               <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
//                                 <Flame className="w-3 h-3 text-white" />
//                               </div>
//                             )}
//                           </div>
//                           <div className="flex-1 text-left">
//                             <p className="font-semibold text-gray-800 group-hover:text-red-600 transition-colors">{d.name}</p>
//                             <div className="flex items-center gap-2 mt-1">
//                               <MapPin className="w-3 h-3 text-gray-400" />
//                               <p className="text-xs text-gray-500">{d.__city}</p>
//                               <span className="text-xs text-red-600 font-semibold">₹{d.price}</span>
//                             </div>
//                           </div>
//                           <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors" />
//                         </button>
//                       </motion.li>
//                     ))}
//                   </motion.ul>
//                 )}
//               </AnimatePresence>
//             </motion.div>

//             {/* Quick Stats - RED THEME */}
//             <motion.div 
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.6 }}
//               className="flex flex-wrap items-center gap-6 mt-8"
//             >
//               <div className="flex items-center gap-2">
//                 <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-100 to-orange-100 flex items-center justify-center">
//                   <Award className="w-6 h-6 text-red-600" />
//                 </div>
//                 <div>
//                   <p className="text-2xl font-bold text-gray-800">500+</p>
//                   <p className="text-xs text-gray-500">Restaurants</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-2">
//                 <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center">
//                   <Star className="w-6 h-6 text-primary fill-primary" />
//                 </div>
//                 <div>
//                   <p className="text-2xl font-bold text-gray-800">4.8</p>
//                   <p className="text-xs text-gray-500">Avg Rating</p>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>

//           {/* Right Side Images */}
//           <motion.div
//             initial={{ opacity: 0, x: 50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8, ease: "easeOut" }}
//           >
//             <HeroImages />
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }

// // ---------------- HERO IMAGES ----------------
// function HeroImages() {
//   const imgs = [
//     "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80",
//     "https://images.unsplash.com/photo-1544025162-d76694265947?q=80",
//     "https://images.unsplash.com/photo-1561758033-d89a9ad46330?q=80",
//     "https://images.unsplash.com/photo-1528137871618-79d2761e3fd5?q=80",
//     "https://i.pinimg.com/1200x/75/e7/29/75e729e20f3f24a9b037efefef05d3dd.jpg",
//     "https://i.pinimg.com/1200x/2d/1a/48/2d1a48695c292702f3a6bd3e50c5b31a.jpg",
//   ];

//   return (
//     <motion.div
//       initial="hidden"
//       animate="visible"
//       variants={{
//         hidden: {},
//         visible: { transition: { staggerChildren: 0.1 } },
//       }}
//       className="grid grid-cols-3 gap-3 md:gap-4"
//     >
//       {imgs.map((src, i) => (
//         <motion.div
//           key={i}
//           variants={{
//             hidden: { opacity: 0, scale: 0.8, rotate: -10 },
//             visible: { opacity: 1, scale: 1, rotate: 0 },
//           }}
//           whileHover={{ 
//             scale: 1.05, 
//             rotate: 2,
//             zIndex: 10,
//             transition: { type: "spring", stiffness: 300 }
//           }}
//           className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 h-28 sm:h-36 md:h-44 bg-white cursor-pointer relative group"
//         >
//           <img
//             src={src}
//             alt="food"
//             className="w-full h-full object-cover"
//             loading="lazy"
//           />
//           {/* Red overlay on hover */}
//           <div className="absolute inset-0 bg-gradient-to-t from-red-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//         </motion.div>
//       ))}
//     </motion.div>
//   );
// }

// // ---------------- Stats Banner - RED THEME ----------------
// function StatsBanner() {
//   return (
//     <motion.div 
//       className="bg-primary rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
//       whileHover={{ scale: 1.01 }}
//       transition={{ type: "spring", stiffness: 300 }}
//     >
//       {/* Decorative elements */}
//       <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
//       <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full -ml-24 -mb-24" />
      
//       <div className="relative grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
//         {[
//           { label: "Happy Customers", value: "50K+", icon: <Heart className="w-6 h-6" /> },
//           { label: "Daily Orders", value: "10K+", icon: <TrendingUp className="w-6 h-6" /> },
//           { label: "Partner Restaurants", value: "500+", icon: <Award className="w-6 h-6" /> },
//           { label: "Cities Covered", value: "25+", icon: <MapPin className="w-6 h-6" /> },
//         ].map((stat, i) => (
//           <motion.div
//             key={i}
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ delay: i * 0.1 }}
//             whileHover={{ scale: 1.05 }}
//             className="text-center text-white"
//           >
//             <div className="flex justify-center mb-2">
//               {stat.icon}
//             </div>
//             <p className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</p>
//             <p className="text-sm md:text-base text-white/90">{stat.label}</p>
//           </motion.div>
//         ))}
//       </div>
//     </motion.div>
//   );
// }

// // ---------------- Reusable UI ----------------
// function SectionHeader({ title, subtitle, icon }) {
//   return (
//     <div className="mb-8 text-center md:text-left">
//       <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
//         {icon && <span className="text-red-500">{icon}</span>}
//         <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
//           {title}
//         </h2>
//       </div>
//       {subtitle && <p className="text-gray-600 text-lg mt-2">{subtitle}</p>}
//     </div>
//   );
// }

// function RestaurantGrid({ data = [], onSelectDish, favorites = [], toggleFavorite }) {
//   return (
//     <motion.div
//       initial="hidden"
//       whileInView="visible"
//       viewport={{ once: true, margin: "-50px" }}
//       variants={{
//         hidden: {},
//         visible: { transition: { staggerChildren: 0.12 } },
//       }}
//       className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
//     >
//       {data.map((d, i) => (
//         <motion.div
//           key={i}
//           variants={{
//             hidden: { opacity: 0, y: 30, scale: 0.95 },
//             visible: { opacity: 1, y: 0, scale: 1 },
//           }}
//           whileHover={{ y: -8 }}
//           className="group bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer relative"
//         >
//           {/* Discount Badge - RED THEME */}
//           {d.discount && (
//             <motion.div 
//               initial={{ scale: 0, rotate: -180 }}
//               animate={{ scale: 1, rotate: 0 }}
//               transition={{ delay: i * 0.1 + 0.3, type: "spring" }}
//               className="absolute top-4 left-4 z-10 bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg"
//             >
//               {d.discount}
//             </motion.div>
//           )}

//           {/* Favorite Button */}
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               toggleFavorite(d.id);
//             }}
//             className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200"
//           >
//             <Heart 
//               className={`w-5 h-5 transition-colors ${
//                 favorites.includes(d.id) 
//                   ? 'text-red-500 fill-red-500' 
//                   : 'text-gray-400'
//               }`}
//             />
//           </button>

//           {/* Popular Badge */}
//           {d.isPopular && (
//             <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full shadow-md">
//               <Flame className="w-3 h-3 text-primary" />
//               <span className="text-xs font-semibold text-gray-700">Popular</span>
//             </div>
//           )}

//           {/* Image */}
//           <div className="relative overflow-hidden h-56">
//             <motion.img 
//               src={d.image} 
//               alt={d.name} 
//               className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//           </div>

//           {/* Content */}
//           <div className="p-5">
//             <h3 className="font-bold text-xl text-gray-800 group-hover:text-primary transition-colors">
//               {d.name}
//             </h3>
//             <p className="text-sm text-gray-500 mt-1">{d.cuisine}</p>

//             {/* Rating & Time */}
//             <div className="flex items-center gap-4 mt-3">
//               <div className="flex items-center gap-1">
//                 <Star className="w-4 h-4 text-primary fill-primary" />
//                 <span className="text-sm font-semibold text-gray-700">{d.rating}</span>
//               </div>
//               <div className="h-1 w-1 rounded-full bg-gray-300" />
//               <div className="flex items-center gap-1 text-gray-500">
//                 <Timer className="w-4 h-4" />
//                 <span className="text-sm">{d.deliveryTime}</span>
//               </div>
//             </div>

//             {/* Price & CTA - RED THEME */}
//             <div className="flex justify-between items-center mt-5 pt-4 border-t border-gray-100">
//               <div>
//                 <span className="text-2xl font-bold bg-primary bg-clip-text text-transparent">₹{d.price}</span>
//               </div>
//               <motion.button
//                 onClick={() => onSelectDish(d)}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="px-5 py-2.5 rounded-xl bg-primary text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
//               >
//                 Order Now
//                 <ChevronRight className="w-4 h-4" />
//               </motion.button>
//             </div>
//           </div>
//         </motion.div>
//       ))}
//     </motion.div>
//   );
// }

// function BenefitsStrip() {
//   const items = [
//     { 
//       icon: <Clock className="w-6 h-6" />, 
//       title: "20–30 min",
//       desc: "Lightning fast",
//       color: "from-red-500 to-orange-500"
//     },
//     { 
//       icon: <ShieldCheck className="w-6 h-6" />, 
//       title: "Safe & Hygienic",
//       desc: "100% assured",
//       color: "from-green-500 to-emerald-500"
//     },
//     { 
//       icon: <Bike className="w-6 h-6" />, 
//       title: "Live Track",
//       desc: "Real-time GPS",
//       color: "from-blue-500 to-cyan-500"
//     },
//     { 
//       icon: <Star className="w-6 h-6" />, 
//       title: "Top Rated",
//       desc: "4.8+ reviews",
//       color: "from-orange-500 to-red-500"
//     },
//   ];

//   return (
//     <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
//       {items.map((it, i) => (
//         <motion.div
//           key={i}
//           initial={{ opacity: 0, scale: 0.8 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           whileHover={{ scale: 1.05, y: -5 }}
//           transition={{ duration: 0.3, delay: i * 0.1 }}
//           viewport={{ once: true }}
//           className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer border border-gray-100"
//         >
//           <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${it.color} flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
//             {it.icon}
//           </div>
//           <p className="font-bold text-gray-800 text-lg">{it.title}</p>
//           <p className="text-sm text-gray-500 mt-1">{it.desc}</p>
//         </motion.div>
//       ))}
//     </div>
//   );
// }

// function SeasonalSpecials() {
//   const specials = [
//     {
//       title: "Monsoon Chaats",
//       img: "https://i.pinimg.com/736x/dc/96/88/dc96885e702c9eab7f445993388f8a3e.jpg",
//       tag: "Trending",
//       color: "from-red-500 to-orange-500"
//     },
//     {
//       title: "Street Biryani",
//       img: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?q=80",
//       tag: "Popular",
//       color: "from-orange-500 to-red-500"
//     },
//     {
//       title: "Healthy Bowls",
//       img: "https://i.pinimg.com/1200x/90/55/2b/90552b6ce65fd777b2dd0a56856d1be6.jpg",
//       tag: "New",
//       color: "from-red-600 to-pink-500"
//     },
//   ];

//   return (
//     <section>
//       <SectionHeader 
//         title="Seasonal Specials" 
//         subtitle="Limited time offers you can't miss"
//         icon={<Sparkles className="w-6 h-6" />}
//       />
//       <div className="grid md:grid-cols-3 gap-6 md:gap-8">
//         {specials.map((s, i) => (
//           <motion.div
//             key={i}
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             whileHover={{ y: -10 }}
//             transition={{ duration: 0.4, delay: i * 0.1 }}
//             viewport={{ once: true }}
//             className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group cursor-pointer relative"
//           >
//             {/* Tag - RED THEME */}
//             <div className={`absolute top-4 right-4 z-10 px-3 py-1.5 rounded-full bg-gradient-to-r ${s.color} text-white text-xs font-bold shadow-lg`}>
//               {s.tag}
//             </div>

//             <div className="relative h-56 overflow-hidden">
//               <motion.img 
//                 src={s.img} 
//                 alt={s.title} 
//                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
//               <div className="absolute bottom-4 left-4 right-4">
//                 <h4 className="font-bold text-white text-2xl drop-shadow-lg">{s.title}</h4>
//               </div>
//             </div>

//             <div className="p-5">
//               <motion.button
//                 whileHover={{ scale: 1.03 }}
//                 whileTap={{ scale: 0.97 }}
//                 className="w-full px-4 py-3 rounded-xl bg-primary text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
//               >
//                 Order Now
//                 <ChevronRight className="w-4 h-4" />
//               </motion.button>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// }

// function Testimonials() {
//   const reviews = [
//     {
//       name: "Riya Sharma",
//       text: "Delivery was super quick and food was hot. Loved it!",
//       rating: 5,
//       image: "https://i.pravatar.cc/150?img=1",
//       location: "Mumbai"
//     },
//     {
//       name: "Aditya Verma",
//       text: "Great selection, neat tracking. My go-to app!",
//       rating: 5,
//       image: "https://i.pravatar.cc/150?img=12",
//       location: "Delhi"
//     },
//     {
//       name: "Neha Patel",
//       text: "Smooth checkout + clean design. Highly recommended!",
//       rating: 5,
//       image: "https://i.pravatar.cc/150?img=5",
//       location: "Bangalore"
//     },
//   ];

//   return (
//     <section>
//       <SectionHeader 
//         title="What people are saying" 
//         subtitle="Real reviews from real customers"
//         icon={<Star className="w-6 h-6" />}
//       />
//       <div className="grid md:grid-cols-3 gap-6 md:gap-8">
//         {reviews.map((r, i) => (
//           <motion.div
//             key={i}
//             initial={{ opacity: 0, y: 30, rotate: -3 }}
//             whileInView={{ opacity: 1, y: 0, rotate: 0 }}
//             whileHover={{ y: -5, rotate: 1 }}
//             transition={{ duration: 0.4, delay: i * 0.1 }}
//             viewport={{ once: true }}
//             className="bg-gradient-to-br from-white to-red-50/30 rounded-3xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 relative overflow-hidden group border border-red-100"
//           >
//             {/* Decorative quote mark - RED THEME */}
//             <div className="absolute top-4 right-4 text-6xl text-red-200 font-serif opacity-50 group-hover:opacity-100 transition-opacity">
//               "
//             </div>

//             {/* Stars - RED/ORANGE THEME */}
//             <div className="flex gap-1 mb-4">
//               {[...Array(5)].map((_, idx) => (
//                 <Star
//                   key={idx}
//                   className={`w-5 h-5 ${
//                     idx < r.rating 
//                       ? 'text-orange-500 fill-primary' 
//                       : 'text-gray-300'
//                   }`}
//                 />
//               ))}
//             </div>

//             {/* Review text */}
//             <p className="text-gray-700 text-lg italic leading-relaxed mb-6 relative z-10">
//               "{r.text}"
//             </p>

//             {/* Reviewer info */}
//             <div className="flex items-center gap-4">
//               <motion.img
//                 whileHover={{ scale: 1.1 }}
//                 src={r.image}
//                 alt={r.name}
//                 className="w-14 h-14 rounded-full object-cover border-2 border-red-200 shadow-md"
//               />
//               <div>
//                 <p className="font-bold text-gray-800">{r.name}</p>
//                 <p className="text-sm text-gray-500 flex items-center gap-1">
//                   <MapPin className="w-3 h-3" />
//                   {r.location}
//                 </p>
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// }

// // ---------------- CTA Section - RED THEME ----------------
// function CTASection() {
//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.95 }}
//       whileInView={{ opacity: 1, scale: 1 }}
//       viewport={{ once: true }}
//       className="bg-primary rounded-3xl p-12 md:p-16 text-center relative overflow-hidden shadow-2xl"
//     >
//       {/* Animated background circles */}
//       <motion.div
//         animate={{
//           scale: [1, 1.2, 1],
//           opacity: [0.3, 0.5, 0.3],
//         }}
//         transition={{
//           duration: 4,
//           repeat: Infinity,
//           ease: "easeInOut"
//         }}
//         className="absolute top-0 left-0 w-64 h-64 bg-white/20 rounded-full -ml-32 -mt-32"
//       />
//       <motion.div
//         animate={{
//           scale: [1, 1.3, 1],
//           opacity: [0.2, 0.4, 0.2],
//         }}
//         transition={{
//           duration: 5,
//           repeat: Infinity,
//           ease: "easeInOut",
//           delay: 0.5
//         }}
//         className="absolute bottom-0 right-0 w-96 h-96 bg-black/10 rounded-full -mr-48 -mb-48"
//       />

//       <div className="relative z-10">
//         <motion.div
//           initial={{ scale: 0 }}
//           whileInView={{ scale: 1 }}
//           transition={{ type: "spring", stiffness: 200 }}
//           className="inline-block mb-6"
//         >
//           <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto">
//             <Zap className="w-10 h-10 text-white" />
//           </div>
//         </motion.div>

//         <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
//           Ready to satisfy your cravings?
//         </h2>
//         <p className="text-white/95 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
//           Join thousands of happy customers ordering delicious food every day.
//         </p>

//         <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="px-8 py-4 bg-white text-red-600 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-2"
//           >
//             Get Started
//             <ChevronRight className="w-5 h-5" />
//           </motion.button>
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white hover:text-red-600 transition-all duration-300"
//           >
//             Learn More
//           </motion.button>
//         </div>
//       </div>
//     </motion.div>
//   );
// }











// import React, { useEffect, useMemo, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Search,
//   Sparkles,
//   Star,
//   ShieldCheck,
//   Bike,
//   Clock,
//   TrendingUp,
//   Award,
//   Heart,
//   ChevronRight,
//   MapPin,
//   Timer,
//   Flame,
//   Zap
// } from "lucide-react";

// /**
//  * Home.jsx
//  * - Mobile-first responsive UI
//  * - Debounced search with AbortController (API-ready)
//  * - Suggestion dropdown with keyboard accessibility
//  * - Touch-friendly carousel using CSS scroll-snap + pointer drag
//  * - Skeleton loaders, micro-interactions, reduced-motion respect
//  * - Favorites persisted to localStorage
//  *
//  * Requirements: TailwindCSS, framer-motion, lucide-react
//  */

// /* ---------------- Dummy Data (keeps UI working locally) ---------------- */
// const DISHES = [
//   {
//     id: 1,
//     name: "Paneer Butter Masala",
//     image:
//       "https://i.pinimg.com/1200x/a7/01/6f/a7016f43b77f29386519fec35cb6d8b7.jpg",
//     cuisine: "North Indian",
//     __city: "Delhi",
//     __dishSlug: "paneer-butter-masala",
//     price: 199,
//     rating: 4.5,
//     deliveryTime: "25-30 min",
//     discount: "20% OFF",
//     isPopular: true
//   },
//   {
//     id: 2,
//     name: "Chicken Biryani",
//     image:
//       "https://i.pinimg.com/1200x/7f/5a/a7/7f5aa7cc58d1fd2118a9117438ba4c1f.jpg",
//     cuisine: "Hyderabadi",
//     __city: "Hyderabad",
//     __dishSlug: "chicken-biryani",
//     price: 249,
//     rating: 4.8,
//     deliveryTime: "30-35 min",
//     discount: "15% OFF",
//     isPopular: true
//   },
//   {
//     id: 3,
//     name: "Masala Dosa",
//     image:
//       "https://i.pinimg.com/1200x/61/23/74/612374b37b28b6790d6fbcb2ab5e8f82.jpg",
//     cuisine: "South Indian",
//     __city: "Bangalore",
//     __dishSlug: "masala-dosa",
//     price: 99,
//     rating: 4.6,
//     deliveryTime: "20-25 min",
//     discount: "10% OFF",
//     isPopular: false
//   },
// ];

// /* ---------------- Small helpers / variants ---------------- */
// const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// const floatAnim = (dir = 1) => ({
//   y: [0, -18 * dir, 0],
//   x: [0, 8 * dir, 0],
//   transition: { duration: 10 + Math.abs(dir), repeat: Infinity, ease: "easeInOut" }
// });

// const reveal = { initial: { opacity: 0, y: 14 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.6 } };

// /* ---------------- Small CSS injected for scrollbar hide & ripple ---------------- */
// const INJECTED_CSS = `
// /* hide scrollbar for horizontal scrollers (mobile) */
// .no-scrollbar::-webkit-scrollbar { display: none; }
// .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

// /* tiny ripple for buttons */
// .btn-ripple { position: relative; overflow: hidden; }
// .btn-ripple > .ripple {
//   position: absolute;
//   border-radius: 50%;
//   transform: scale(0);
//   animation: ripple 600ms linear;
//   background: rgba(255,255,255,0.35);
// }
// @keyframes ripple {
//   to { transform: scale(4); opacity: 0; }
// }
// `;

// /* ---------------- Fake API (simulate) ---------------- */
// /**
//  * fetchSuggestions(query, {signal}) -> Promise< array >
//  * Replace this with real API call like:
//  * return fetch(`/api/search?q=${encodeURIComponent(q)}`, { signal }).then(res => res.json())
//  */
// function fetchSuggestionsMock(query, { signal } = {}) {
//   const q = query.trim().toLowerCase();
//   return new Promise((resolve, reject) => {
//     const t = setTimeout(() => {
//       const filtered = DISHES.filter(d => d.name.toLowerCase().includes(q) || d.cuisine.toLowerCase().includes(q));
//       resolve(filtered);
//     }, 400 + Math.random() * 300);

//     signal?.addEventListener?.("abort", () => {
//       clearTimeout(t);
//       reject(new DOMException("aborted", "AbortError"));
//     }, { once: true });
//   });
// }

// /* ---------------- Main Component ---------------- */
// export default function Home() {
//   const navigate = useNavigate();

//   // search states
//   const [query, setQuery] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [searchLoading, setSearchLoading] = useState(false);

//   // favorites
//   const [favorites, setFavorites] = useState(() => {
//     try {
//       const raw = localStorage.getItem("fav_dishes_v2");
//       return raw ? JSON.parse(raw) : [];
//     } catch { return []; }
//   });

//   // refs for debounce & abort
//   const debounceRef = useRef(null);
//   const abortRef = useRef(null);
//   const wrapRef = useRef(null);

//   // inject css once
//   useEffect(() => {
//     const style = document.createElement("style");
//     style.setAttribute("data-from", "Home.jsx");
//     style.innerHTML = INJECTED_CSS;
//     document.head.appendChild(style);
//     return () => document.head.removeChild(style);
//   }, []);

//   // persist favorites
//   useEffect(() => {
//     try { localStorage.setItem("fav_dishes_v2", JSON.stringify(favorites)); } catch {}
//   }, [favorites]);

//   // suggestions fetching with debounce & abort
//   useEffect(() => {
//     if (!query.trim()) {
//       setSuggestions([]);
//       setSearchLoading(false);
//       return;
//     }

//     setSearchLoading(true);
//     // clear previous debounce
//     if (debounceRef.current) clearTimeout(debounceRef.current);
//     // abort previous request
//     if (abortRef.current) abortRef.current.abort();

//     // debounce
//     debounceRef.current = setTimeout(() => {
//       const controller = new AbortController();
//       abortRef.current = controller;

//       // swap to real API when ready:
//       fetchSuggestionsMock(query, { signal: controller.signal })
//         .then(res => {
//           setSuggestions(res);
//           setOpen(true);
//           setSearchLoading(false);
//         })
//         .catch(err => {
//           if (err.name === "AbortError") return;
//           setSearchLoading(false);
//           setSuggestions([]);
//         });
//     }, 300);

//     return () => {
//       if (debounceRef.current) clearTimeout(debounceRef.current);
//       // do not abort on unmount -- handled above on next call
//     };
//   }, [query]);

//   // close dropdown on outside click or Escape
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
//     };
//     const handleKey = (e) => {
//       if (e.key === "Escape") setOpen(false);
//       if (e.key === "ArrowDown") {
//         const first = wrapRef.current?.querySelector("button[data-suggest='0']");
//         first?.focus?.();
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     document.addEventListener("keydown", handleKey);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//       document.removeEventListener("keydown", handleKey);
//     };
//   }, []);

//   const handleSelectDish = (dish) => {
//     setOpen(false);
//     setQuery("");
//     navigate(`/cuisine?dish=${dish.__dishSlug}`);
//   };

//   const toggleFavorite = (id) => {
//     setFavorites(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-red-50/60 to-white">
//       {/* floating decor */}
//       <div className="fixed inset-0 pointer-events-none -z-10">
//         {!prefersReducedMotion && (
//           <>
//             <motion.div className="absolute top-20 right-6 w-56 h-56 rounded-full blur-3xl bg-gradient-to-br from-red-200/30 to-orange-200/20"
//               animate={floatAnim(1)} />
//             <motion.div className="absolute bottom-36 left-6 w-80 h-80 rounded-full blur-3xl bg-gradient-to-br from-orange-200/20 to-red-200/15"
//               animate={floatAnim(-1)} />
//           </>
//         )}
//       </div>

//       <Hero
//         query={query}
//         setQuery={setQuery}
//         open={open}
//         setOpen={setOpen}
//         suggestions={suggestions}
//         onSelectDish={handleSelectDish}
//         wrapRef={wrapRef}
//         searchLoading={searchLoading}
//       />

//       <main className="relative px-4 sm:px-6 md:px-10 lg:px-14 py-10 space-y-12 max-w-6xl mx-auto">
//         <motion.section {...reveal} className="">
//           <StatsBanner />
//         </motion.section>

//         <motion.section {...reveal}>
//           <SectionHeader title="Featured near you" subtitle="Handpicked — top rated & trending" icon={<Flame className="w-5 h-5" />} />
//           <RestaurantGrid data={DISHES} onSelectDish={handleSelectDish} favorites={favorites} toggleFavorite={toggleFavorite} />
//         </motion.section>

//         <motion.section {...reveal}>
//           <BenefitsStrip />
//         </motion.section>

//         <motion.section {...reveal}>
//           <SeasonalSpecials />
//         </motion.section>

//         <motion.section {...reveal}>
//           <Testimonials />
//         </motion.section>

//         <motion.section {...reveal}>
//           <CTASection />
//         </motion.section>
//       </main>
//     </div>
//   );
// }

// /* ---------------- HERO ---------------- */
// function Hero({ query, setQuery, open, setOpen, suggestions, onSelectDish, wrapRef, searchLoading }) {
//   return (
//     <header className="relative overflow-hidden">
//       <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-orange-50 to-red-50 -z-20" />

//       <div className="relative px-4 sm:px-6 md:px-10 lg:px-14 pt-10 pb-6">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
//           <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
//             <span className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-red-50 text-red-600 font-semibold shadow-sm border border-red-100">
//               <Sparkles className="w-4 h-4" /> Premium • Curated • Local
//             </span>

//             <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
//               <span className="block text-red-700">Crave it.</span>
//               <span className="block text-orange-600 mt-1">Order it. Love it.</span>
//             </h1>

//             <p className="mt-4 text-gray-600 max-w-xl text-sm sm:text-base">Discover handpicked kitchens, lightning-fast delivery and seasonal specials near you.</p>

//             {/* Search */}
//             <div ref={wrapRef} className="relative mt-6">
//               <form
//                 onSubmit={(e) => { e.preventDefault(); if (suggestions[0]) onSelectDish(suggestions[0]); }}
//                 role="search"
//                 aria-label="Search dishes"
//                 className="flex gap-2 items-center bg-white rounded-2xl p-2 shadow-sm border border-red-50"
//               >
//                 <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-red-50">
//                   <Search className="w-5 h-5 text-red-600" aria-hidden />
//                 </div>

//                 <input
//                   aria-label="Search for dishes or cuisines"
//                   value={query}
//                   onChange={(e) => { setQuery(e.target.value); setOpen(Boolean(e.target.value.trim())); }}
//                   placeholder="Search for dishes, cuisines or restaurants..."
//                   className="flex-1 px-3 py-3 text-gray-800 placeholder:text-gray-400 outline-none"
//                 />

//                 <button
//                   type="submit"
//                   aria-label="Search"
//                   className="px-4 py-2 rounded-lg bg-red-600 text-white font-semibold shadow btn-ripple"
//                   onMouseDown={(e) => createRipple(e)}
//                 >
//                   {searchLoading ? "Searching..." : "Search"}
//                 </button>
//               </form>

//               {/* Suggestions */}
//               <AnimatePresence>
//                 {open && (suggestions.length > 0 || searchLoading) && (
//                   <motion.div
//                     initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
//                     transition={{ duration: 0.15 }}
//                     className="absolute left-0 right-0 mt-3 bg-white rounded-2xl border border-gray-100 shadow-lg z-40 overflow-hidden"
//                     role="listbox"
//                     aria-label="Search suggestions"
//                   >
//                     {searchLoading && (
//                       <div className="p-4 space-y-3">
//                         <SuggestionSkeleton />
//                         <SuggestionSkeleton />
//                       </div>
//                     )}

//                     {!searchLoading && suggestions.length === 0 && (
//                       <div className="p-4 text-sm text-gray-500">No results. Try "biryani", "dosa", or "paneer".</div>
//                     )}

//                     {!searchLoading && suggestions.map((d, i) => (
//                       <button
//                         key={d.id}
//                         data-suggest={i}
//                         onClick={() => onSelectDish(d)}
//                         className="w-full flex items-center gap-4 px-4 py-3 hover:bg-red-50 text-left transition-colors"
//                       >
//                         <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
//                           <img src={d.image} alt={d.name} className="w-full h-full object-cover" loading="lazy" />
//                           {d.isPopular && (
//                             <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
//                               <Flame className="w-3 h-3 text-white" />
//                             </div>
//                           )}
//                         </div>

//                         <div className="flex-1">
//                           <div className="flex items-center justify-between">
//                             <p className="font-semibold text-gray-800">{d.name}</p>
//                             <span className="text-sm text-red-600 font-semibold">₹{d.price}</span>
//                           </div>
//                           <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
//                             <MapPin className="w-3 h-3" />
//                             <span>{d.__city}</span>
//                           </div>
//                         </div>

//                         <ChevronRight className="w-5 h-5 text-gray-400" />
//                       </button>
//                     ))}
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>

//             {/* Quick Stats */}
//             <div className="flex flex-wrap items-center gap-5 mt-6">
//               <div className="flex items-center gap-3">
//                 <div className="w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center">
//                   <Award className="w-5 h-5 text-red-600" />
//                 </div>
//                 <div>
//                   <p className="text-xl font-bold text-gray-800">500+</p>
//                   <p className="text-xs text-gray-500">Restaurants</p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-3">
//                 <div className="w-12 h-12 rounded-lg bg-orange-50 flex items-center justify-center">
//                   <Star className="w-5 h-5 text-orange-500" />
//                 </div>
//                 <div>
//                   <p className="text-xl font-bold text-gray-800">4.8</p>
//                   <p className="text-xs text-gray-500">Avg Rating</p>
//                 </div>
//               </div>
//             </div>
//           </motion.div>

//           <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
//             <HeroImages />
//           </motion.div>
//         </div>
//       </div>
//     </header>
//   );
// }

// /* ---------------- Suggestion Skeleton ---------------- */
// function SuggestionSkeleton() {
//   return (
//     <div className="flex items-center gap-4 animate-pulse">
//       <div className="w-14 h-14 rounded-lg bg-gray-200" />
//       <div className="flex-1 space-y-2">
//         <div className="w-3/4 h-3 bg-gray-200 rounded" />
//         <div className="w-1/3 h-3 bg-gray-200 rounded" />
//       </div>
//     </div>
//   );
// }

// /* ---------------- HERO IMAGES: Carousel (mobile) + grid (desktop) ---------------- */
// function HeroImages() {
//   const imgs = [
//     "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=1400&auto=format&fit=crop",
//     "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1400&auto=format&fit=crop",
//     "https://images.unsplash.com/photo-1561758033-d89a9ad46330?q=80&w=1400&auto=format&fit=crop",
//     "https://images.unsplash.com/photo-1528137871618-79d2761e3fd5?q=80&w=1400&auto=format&fit=crop",
//     "https://i.pinimg.com/1200x/75/e7/29/75e729e20f3f24a9b037efefef05d3dd.jpg",
//     "https://i.pinimg.com/1200x/2d/1a/48/2d1a48695c292702f3a6bd3e50c5b31a.jpg",
//   ];

//   // carousel refs & drag
//   const trackRef = useRef(null);
//   const isDown = useRef(false);
//   const startX = useRef(0);
//   const scrollLeft = useRef(0);

//   useEffect(() => {
//     const track = trackRef.current;
//     if (!track) return;

//     let pointerId = null;
//     const onPointerDown = (e) => {
//       if (e.pointerType === 'mouse' && e.button !== 0) return;
//       pointerId = e.pointerId;
//       isDown.current = true;
//       startX.current = e.clientX;
//       scrollLeft.current = track.scrollLeft;
//       track.setPointerCapture(pointerId);
//       track.classList.add("dragging");
//     };
//     const onPointerMove = (e) => {
//       if (!isDown.current) return;
//       const x = e.clientX;
//       const walk = (startX.current - x);
//       track.scrollLeft = scrollLeft.current + walk;
//     };
//     const onPointerUp = (e) => {
//       if (!isDown.current) return;
//       isDown.current = false;
//       try { track.releasePointerCapture(pointerId); } catch {}
//       track.classList.remove("dragging");
//       // auto-snap to closest
//       snapToClosest(track);
//     };

//     track.addEventListener("pointerdown", onPointerDown);
//     window.addEventListener("pointermove", onPointerMove);
//     window.addEventListener("pointerup", onPointerUp);

//     // cleanup
//     return () => {
//       track.removeEventListener("pointerdown", onPointerDown);
//       window.removeEventListener("pointermove", onPointerMove);
//       window.removeEventListener("pointerup", onPointerUp);
//     };
//   }, []);

//   // snap function
//   const snapToClosest = (track) => {
//     const children = Array.from(track.children);
//     if (!children.length) return;
//     const trackCenter = track.scrollLeft + track.clientWidth / 2;
//     let closestIdx = 0;
//     let closestDist = Infinity;
//     children.forEach((child, idx) => {
//       const childCenter = child.offsetLeft + child.clientWidth / 2;
//       const dist = Math.abs(trackCenter - childCenter);
//       if (dist < closestDist) {
//         closestDist = dist;
//         closestIdx = idx;
//       }
//     });
//     const target = children[closestIdx];
//     if (target) {
//       track.scrollTo({ left: target.offsetLeft - (track.clientWidth - target.clientWidth) / 2, behavior: "smooth" });
//     }
//   };

//   return (
//     <>
//       {/* Mobile horizontal scroller */}
//       <div className="md:hidden">
//         <div
//           ref={trackRef}
//           className="flex gap-3 overflow-x-auto no-scrollbar py-2 px-1 snap-x snap-mandatory"
//           role="list"
//           aria-label="Featured dishes"
//         >
//           {imgs.slice(0, 4).map((src, i) => (
//             <div key={i} className="snap-center min-w-[72%] sm:min-w-[56%] h-44 rounded-2xl overflow-hidden shadow-md bg-white relative">
//               <img src={`${src}`} className="w-full h-full object-cover" alt={`hero-${i}`} loading="lazy" />
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Desktop grid */}
//       <div className="hidden md:grid grid-cols-3 gap-3">
//         {imgs.map((src, i) => (
//           <motion.div key={i} whileHover={{ scale: 1.03, y: -6 }} className="rounded-2xl overflow-hidden shadow-lg h-36 md:h-44">
//             <img src={`${src}`} className="w-full h-full object-cover" alt={`hero-${i}`} loading="lazy" />
//           </motion.div>
//         ))}
//       </div>
//     </>
//   );
// }

// /* ---------------- Stats Banner ---------------- */
// function StatsBanner() {
//   const stats = [
//     { label: "Happy Customers", value: "50K+", icon: <Heart className="w-5 h-5" /> },
//     { label: "Daily Orders", value: "10K+", icon: <TrendingUp className="w-5 h-5" /> },
//     { label: "Partner Restaurants", value: "500+", icon: <Award className="w-5 h-5" /> },
//     { label: "Cities Covered", value: "25+", icon: <MapPin className="w-5 h-5" /> },
//   ];

//   return (
//     <div className="bg-red-600 text-white rounded-2xl p-5 sm:p-6 shadow-lg" role="region" aria-label="Statistics">
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         {stats.map((s, i) => (
//           <div key={i} className="text-center">
//             <div className="flex items-center justify-center mb-2">
//               <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
//                 {s.icon}
//               </div>
//             </div>
//             <p className="text-xl font-bold">{s.value}</p>
//             <p className="text-xs opacity-90">{s.label}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// /* ---------------- Section Header ---------------- */
// function SectionHeader({ title, subtitle, icon }) {
//   return (
//     <div className="mb-4 md:mb-6">
//       <div className="flex items-center gap-3 mb-1">
//         {icon && <span className="text-red-500">{icon}</span>}
//         <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{title}</h2>
//       </div>
//       {subtitle && <p className="text-gray-600 text-sm md:text-base">{subtitle}</p>}
//     </div>
//   );
// }

// /* ---------------- Restaurant Grid ---------------- */
// function RestaurantGrid({ data = [], onSelectDish, favorites = [], toggleFavorite }) {
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
//       {data.map((d, i) => (
//         <motion.article key={d.id} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="group bg-white rounded-2xl shadow-sm hover:shadow-md transition transform">
//           {d.discount && (
//             <div className="absolute top-3 left-3 z-20 bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow">
//               {d.discount}
//             </div>
//           )}

//           <button onClick={(e) => { e.stopPropagation(); toggleFavorite(d.id); }} aria-pressed={favorites.includes(d.id)} aria-label={favorites.includes(d.id) ? "Unfavorite" : "Favorite"} className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-white flex items-center justify-center shadow">
//             <Heart className={`w-4 h-4 ${favorites.includes(d.id) ? "text-red-500 fill-red-500" : "text-gray-400"}`} />
//           </button>

//           {d.isPopular && (
//             <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 bg-white/90 px-3 py-1 rounded-full text-xs font-semibold shadow-sm flex items-center gap-1">
//               <Flame className="w-3 h-3 text-red-500" />
//               <span className="text-gray-700">Popular</span>
//             </div>
//           )}

//           <div onClick={() => onSelectDish(d)} role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && onSelectDish(d)} className="relative h-52 md:h-56 overflow-hidden cursor-pointer">
//             <img src={d.image} alt={d.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//           </div>

//           <div className="p-4 md:p-5">
//             <h3 className="font-semibold text-lg text-gray-800 mb-1">{d.name}</h3>
//             <p className="text-xs text-gray-500">{d.cuisine}</p>

//             <div className="flex items-center gap-3 mt-3">
//               <div className="flex items-center gap-1">
//                 <Star className="w-4 h-4 text-yellow-400" />
//                 <span className="text-sm font-semibold">{d.rating}</span>
//               </div>

//               <div className="h-1 w-1 rounded-full bg-gray-300" />

//               <div className="flex items-center gap-1 text-gray-500">
//                 <Timer className="w-4 h-4" />
//                 <span className="text-sm">{d.deliveryTime}</span>
//               </div>
//             </div>

//             <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
//               <div>
//                 <span className="text-lg font-bold text-gray-800">₹{d.price}</span>
//               </div>

//               <button onClick={() => onSelectDish(d)} className="inline-flex items-center gap-2 rounded-lg bg-red-600 text-white px-4 py-2 text-sm font-semibold shadow btn-ripple" onMouseDown={(e) => createRipple(e)} aria-label={`Order ${d.name}`}>
//                 Order Now <ChevronRight className="w-4 h-4" />
//               </button>
//             </div>
//           </div>
//         </motion.article>
//       ))}
//     </div>
//   );
// }

// /* ---------------- Benefits Strip ---------------- */
// function BenefitsStrip() {
//   const items = [
//     { icon: <Clock className="w-5 h-5" />, title: "20–30 min", desc: "Lightning fast", color: "from-red-500 to-orange-500" },
//     { icon: <ShieldCheck className="w-5 h-5" />, title: "Safe & Hygienic", desc: "100% assured", color: "from-green-500 to-emerald-500" },
//     { icon: <Bike className="w-5 h-5" />, title: "Live Track", desc: "Real-time GPS", color: "from-blue-500 to-cyan-500" },
//     { icon: <Star className="w-5 h-5" />, title: "Top Rated", desc: "4.8+ reviews", color: "from-orange-500 to-red-500" },
//   ];

//   return (
//     <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//       {items.map((it, i) => (
//         <motion.div key={i} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="bg-white rounded-xl p-4 flex items-start gap-3 shadow-sm hover:shadow-md transition cursor-pointer">
//           <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br ${it.color} text-white`}>
//             {it.icon}
//           </div>
//           <div>
//             <p className="font-semibold text-gray-800">{it.title}</p>
//             <p className="text-xs text-gray-500 mt-1">{it.desc}</p>
//           </div>
//         </motion.div>
//       ))}
//     </div>
//   );
// }

// /* ---------------- Seasonal Specials ---------------- */
// function SeasonalSpecials() {
//   const specials = [
//     { title: "Monsoon Chaats", img: "https://i.pinimg.com/736x/dc/96/88/dc96885e702c9eab7f445993388f8a3e.jpg", tag: "Trending", color: "from-red-500 to-orange-500" },
//     { title: "Street Biryani", img: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?q=80&w=1200&auto=format&fit=crop", tag: "Popular", color: "from-orange-500 to-red-500" },
//     { title: "Healthy Bowls", img: "https://i.pinimg.com/1200x/90/55/2b/90552b6ce65fd777b2dd0a56856d1be6.jpg", tag: "New", color: "from-red-600 to-pink-500" },
//   ];

//   return (
//     <section>
//       <SectionHeader title="Seasonal Specials" subtitle="Limited time offers you can't miss" icon={<Sparkles className="w-5 h-5" />} />
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {specials.map((s, i) => (
//           <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md">
//             <div className="relative h-48 overflow-hidden">
//               <img src={s.img} alt={s.title} className="w-full h-full object-cover" loading="lazy" />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
//               <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs text-white font-semibold" style={{ background: "linear-gradient(90deg, #ef4444, #fb923c)" }}>
//                 {s.tag}
//               </div>
//               <div className="absolute bottom-4 left-4 right-4">
//                 <h4 className="text-xl font-bold text-white drop-shadow">{s.title}</h4>
//               </div>
//             </div>

//             <div className="p-4">
//               <button className="w-full rounded-lg bg-red-600 text-white px-4 py-2 font-semibold shadow btn-ripple" onMouseDown={(e) => createRipple(e)}>
//                 Order Now <ChevronRight className="w-4 h-4 inline-block ml-1" />
//               </button>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// }

// /* ---------------- Testimonials ---------------- */
// function Testimonials() {
//   const reviews = [
//     { name: "Riya Sharma", text: "Delivery was super quick and food was hot. Loved it!", rating: 5, image: "https://i.pravatar.cc/150?img=1", location: "Mumbai" },
//     { name: "Aditya Verma", text: "Great selection, neat tracking. My go-to app!", rating: 5, image: "https://i.pravatar.cc/150?img=12", location: "Delhi" },
//     { name: "Neha Patel", text: "Smooth checkout + clean design. Highly recommended!", rating: 5, image: "https://i.pravatar.cc/150?img=5", location: "Bangalore" },
//   ];

//   return (
//     <section>
//       <SectionHeader title="What people are saying" subtitle="Real reviews from real customers" icon={<Star className="w-5 h-5" />} />
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {reviews.map((r, i) => (
//           <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="bg-gradient-to-br from-white to-red-50 rounded-2xl p-5 shadow-sm hover:shadow-md">
//             <div className="flex gap-3 items-center mb-3">
//               <img src={r.image} alt={r.name} className="w-12 h-12 rounded-full object-cover border" />
//               <div>
//                 <p className="font-semibold">{r.name}</p>
//                 <p className="text-xs text-gray-500 flex items-center gap-1"><MapPin className="w-3 h-3" />{r.location}</p>
//               </div>
//             </div>

//             <p className="text-gray-700 italic mb-4">"{r.text}"</p>

//             <div className="flex gap-1">
//               {[...Array(5)].map((_, idx) => <Star key={idx} className={`w-4 h-4 ${idx < r.rating ? "text-orange-400" : "text-gray-200"}`} />)}
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// }

// /* ---------------- CTA ---------------- */
// function CTASection() {
//   return (
//     <motion.section initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.45 }} className="bg-red-600 rounded-2xl p-6 md:p-10 text-center text-white shadow-lg">
//       <div className="mx-auto max-w-2xl">
//         <div className="inline-block mb-4">
//           <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto">
//             <Zap className="w-8 h-8 text-white" />
//           </div>
//         </div>

//         <h2 className="text-2xl md:text-4xl font-bold">Ready to satisfy your cravings?</h2>
//         <p className="mt-3 text-sm md:text-base opacity-90">Join thousands of happy customers ordering delicious food every day.</p>

//         <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
//           <button className="px-6 py-3 rounded-lg bg-white text-red-600 font-semibold shadow btn-ripple" onMouseDown={(e) => createRipple(e)}>Get Started <ChevronRight className="w-4 h-4 inline-block ml-2" /></button>
//           <button className="px-6 py-3 rounded-lg border border-white text-white font-semibold">Learn More</button>
//         </div>
//       </div>
//     </motion.section>
//   );
// }

// /* ---------------- Utilities ---------------- */
// /* Small ripple implementation for buttons */
// function createRipple(e) {
//   const btn = e.currentTarget;
//   const rect = btn.getBoundingClientRect();
//   const ripple = document.createElement("span");
//   const size = Math.max(rect.width, rect.height) * 0.8;
//   ripple.style.width = ripple.style.height = `${size}px`;
//   ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
//   ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
//   ripple.className = "ripple";
//   btn.appendChild(ripple);
//   setTimeout(() => ripple.remove(), 650);
// }


















// Home 2.0




// import React, {
//   useEffect,
//   useMemo,
//   useRef,
//   useState,
// } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Search,
//   Sparkles,
//   Star,
//   ShieldCheck,
//   Bike,
//   Clock,
//   TrendingUp,
//   Award,
//   Heart,
//   ChevronRight,
//   MapPin,
//   Timer,
//   Flame,
//   Zap,
//   ShoppingBag,
// } from "lucide-react";
// import toast from "react-hot-toast";
// import { getUserMeals, addItemToCart } from "../../api/api";

// /* ---------------- Dummy Fallback Data ---------------- */
// const FALLBACK_DISHES = [
//   {
//     id: 1,
//     name: "Paneer Butter Masala",
//     image:
//       "https://i.pinimg.com/1200x/a7/01/6f/a7016f43b77f29386519fec35cb6d8b7.jpg",
//     cuisine: "North Indian",
//     city: "Delhi",
//     price: 199,
//     rating: 4.5,
//     deliveryTime: "25-30 min",
//     discount: "20% OFF",
//     isPopular: true,
//   },
//   {
//     id: 2,
//     name: "Chicken Biryani",
//     image:
//       "https://i.pinimg.com/1200x/7f/5a/a7/7f5aa7cc58d1fd2118a9117438ba4c1f.jpg",
//     cuisine: "Hyderabadi",
//     city: "Hyderabad",
//     price: 249,
//     rating: 4.8,
//     deliveryTime: "30-35 min",
//     discount: "15% OFF",
//     isPopular: true,
//   },
//   {
//     id: 3,
//     name: "Masala Dosa",
//     image:
//       "https://i.pinimg.com/1200x/61/23/74/612374b37b28b6790d6fbcb2ab5e8f82.jpg",
//     cuisine: "South Indian",
//     city: "Bangalore",
//     price: 99,
//     rating: 4.6,
//     deliveryTime: "20-25 min",
//     discount: "10% OFF",
//     isPopular: false,
//   },
// ];

// const prefersReducedMotion =
//   typeof window !== "undefined" &&
//   window.matchMedia &&
//   window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// const floatAnim = (dir = 1) => ({
//   y: [0, -18 * dir, 0],
//   x: [0, 8 * dir, 0],
//   transition: {
//     duration: 10 + Math.abs(dir),
//     repeat: Infinity,
//     ease: "easeInOut",
//   },
// });

// const reveal = {
//   initial: { opacity: 0, y: 14 },
//   whileInView: { opacity: 1, y: 0 },
//   viewport: { once: true, amount: 0.2 },
//   transition: { duration: 0.6 },
// };

// /* ---------------- CSS inject for scrollbar hide + glass + shine ---------------- */
// const INJECTED_CSS = `
// .no-scrollbar::-webkit-scrollbar { display: none; }
// .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

// .btn-ripple { position: relative; overflow: hidden; }
// .btn-ripple > .ripple {
//   position: absolute;
//   border-radius: 50%;
//   transform: scale(0);
//   animation: ripple 600ms linear;
//   background: rgba(255,255,255,0.35);
// }
// @keyframes ripple {
//   to { transform: scale(4); opacity: 0; }
// }

// /* Glass + shine */
// .shine-card,
// .shine-btn {
//   position: relative;
//   overflow: hidden;
// }
// .shine-card::before,
// .shine-btn::before {
//   content: "";
//   position: absolute;
//   inset: -150%;
//   background: linear-gradient(120deg, transparent, rgba(255,255,255,0.55), transparent);
//   transform: translateX(-120%);
//   opacity: 0;
//   transition: opacity 0.45s ease, transform 0.9s ease;
// }
// .shine-card:hover::before,
// .shine-btn:hover::before {
//   opacity: 1;
//   transform: translateX(60%);
// }

// /* Masonry fix */
// .break-inside-avoid {
//   break-inside: avoid;
//   page-break-inside: avoid;
//   -webkit-column-break-inside: avoid;
// }
// `;

// /* ---------------- Fake search suggestions (local) ---------------- */
// function fetchSuggestionsMock(query, { signal } = {}) {
//   const q = query.trim().toLowerCase();
//   return new Promise((resolve, reject) => {
//     const t = setTimeout(() => {
//       const filtered = FALLBACK_DISHES.filter(
//         (d) =>
//           d.name.toLowerCase().includes(q) ||
//           d.cuisine.toLowerCase().includes(q)
//       );
//       resolve(filtered);
//     }, 400 + Math.random() * 300);

//     signal?.addEventListener?.(
//       "abort",
//       () => {
//         clearTimeout(t);
//         reject(new DOMException("aborted", "AbortError"));
//       },
//       { once: true }
//     );
//   });
// }

// /* ---------------- Helper: new badge based on createdAt ---------------- */
// const isRecent = (createdAt) => {
//   if (!createdAt) return false;
//   const d = new Date(createdAt);
//   if (Number.isNaN(d.getTime())) return false;
//   const diffDays = (Date.now() - d.getTime()) / (1000 * 60 * 60 * 24);
//   return diffDays <= 7;
// };

// /* =====================================================================
//    MAIN HOME COMPONENT
//    ===================================================================== */
// export default function Home() {
//   const navigate = useNavigate();

//   // search
//   const [query, setQuery] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [searchLoading, setSearchLoading] = useState(false);

//   // favorites
//   const [favorites, setFavorites] = useState(() => {
//     try {
//       const raw = localStorage.getItem("fav_dishes_v3");
//       return raw ? JSON.parse(raw) : [];
//     } catch {
//       return [];
//     }
//   });

//   // meals from API
//   const [mealsRaw, setMealsRaw] = useState([]);
//   const [mealsLoading, setMealsLoading] = useState(true);

//   // refs
//   const debounceRef = useRef(null);
//   const abortRef = useRef(null);
//   const wrapRef = useRef(null);

//   // inject CSS once
//   useEffect(() => {
//     const style = document.createElement("style");
//     style.setAttribute("data-from", "Home.jsx");
//     style.innerHTML = INJECTED_CSS;
//     document.head.appendChild(style);
//     return () => {
//       document.head.removeChild(style);
//     };
//   }, []);

//   // persist favorites
//   useEffect(() => {
//     try {
//       localStorage.setItem(
//         "fav_dishes_v3",
//         JSON.stringify(favorites)
//       );
//     } catch {}
//   }, [favorites]);

//   // Fetch meals from API
//   useEffect(() => {
//     let mounted = true;

//     (async () => {
//       try {
//         setMealsLoading(true);
//         const res = await getUserMeals();
//         const apiMeals = Array.isArray(res?.data)
//           ? res.data
//           : [];
//         if (!mounted) return;
//         if (apiMeals.length) {
//           setMealsRaw(apiMeals);
//         } else {
//           // fallback to static list
//           setMealsRaw(FALLBACK_DISHES);
//         }
//       } catch (err) {
//         console.warn("getUserMeals failed, using fallback", err);
//         if (!mounted) return;
//         setMealsRaw(FALLBACK_DISHES);
//       } finally {
//         if (mounted) setMealsLoading(false);
//       }
//     })();

//     return () => {
//       mounted = false;
//     };
//   }, []);

//   // map API meals -> UI meals
//   const meals = useMemo(() => {
//     if (!mealsRaw?.length) return [];

//     return mealsRaw.map((m, idx) => {
//       const isFallback = m.name && m.image && m.price;
//       if (isFallback) {
//         return {
//           id: m.id ?? idx + 1,
//           name: m.name,
//           image: m.image,
//           cuisine: m.cuisine ?? "Indian",
//           city: m.city ?? "Your city",
//           price: m.price,
//           rating: m.rating ?? 4.5,
//           deliveryTime: m.deliveryTime ?? "25-30 min",
//           discount: m.discount ?? null,
//           isPopular: m.isPopular ?? false,
//           isNew: false,
//           raw: m,
//         };
//       }

//       const id = m.id ?? m.mealId ?? idx + 1;
//       const name = m.mealName ?? m.name ?? "Chef’s Special Meal";
//       const price = m.price ?? m.mealPrice ?? 199;
//       const rating = m.rating ?? m.avgRating ?? 4.5;
//       const image =
//         m.imageUrl ??
//         m.image ??
//         "https://images.unsplash.com/photo-1604908176997-1251884b08a3?q=80&w=1200&auto=format&fit=crop";
//       const cuisine =
//         m.cuisine ??
//         m.region ??
//         m.type ??
//         "Indian";
//       const city = m.city ?? m.state ?? "Near you";
//       const deliveryTime =
//         m.deliveryTime ??
//         `${20 + (idx % 4) * 5}-${25 + (idx % 4) * 5} min`;
//       const discount =
//         m.discount ??
//         ((idx + 1) % 3 === 0 ? "20% OFF" : null);
//       const isPopular =
//         m.isPopular ?? (rating ? rating >= 4.6 : false);

//       return {
//         id,
//         name,
//         image,
//         cuisine,
//         city,
//         price,
//         rating,
//         deliveryTime,
//         discount,
//         isPopular,
//         isNew: m.isNew ?? isRecent(m.createdAt),
//         raw: m,
//       };
//     });
//   }, [mealsRaw]);

//   // sections
//   const freshMeals = useMemo(() => {
//     if (!meals.length) return [];
//     return [...meals]
//       .sort((a, b) => {
//         const ca = a.raw?.createdAt
//           ? new Date(a.raw.createdAt).getTime()
//           : 0;
//         const cb = b.raw?.createdAt
//           ? new Date(b.raw.createdAt).getTime()
//           : 0;
//         return cb - ca;
//       })
//       .slice(0, 12);
//   }, [meals]);

//   const recommendedMeals = useMemo(() => {
//     if (!meals.length) return [];
//     return [...meals]
//       .sort(
//         (a, b) =>
//           (b.rating ?? 0) - (a.rating ?? 0)
//       )
//       .slice(0, 10);
//   }, [meals]);

//   /* ---------------- search suggestions logic ---------------- */
//   useEffect(() => {
//     if (!query.trim()) {
//       setSuggestions([]);
//       setSearchLoading(false);
//       return;
//     }

//     setSearchLoading(true);

//     if (debounceRef.current)
//       clearTimeout(debounceRef.current);
//     if (abortRef.current) abortRef.current.abort();

//     debounceRef.current = setTimeout(() => {
//       const controller = new AbortController();
//       abortRef.current = controller;

//       fetchSuggestionsMock(query, {
//         signal: controller.signal,
//       })
//         .then((res) => {
//           setSuggestions(res);
//           setOpen(true);
//           setSearchLoading(false);
//         })
//         .catch((err) => {
//           if (err.name === "AbortError") return;
//           setSearchLoading(false);
//           setSuggestions([]);
//         });
//     }, 300);

//     return () => {
//       if (debounceRef.current)
//         clearTimeout(debounceRef.current);
//     };
//   }, [query]);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (
//         wrapRef.current &&
//         !wrapRef.current.contains(e.target)
//       )
//         setOpen(false);
//     };
//     const handleKey = (e) => {
//       if (e.key === "Escape") setOpen(false);
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     document.addEventListener("keydown", handleKey);
//     return () => {
//       document.removeEventListener(
//         "mousedown",
//         handleClickOutside
//       );
//       document.removeEventListener("keydown", handleKey);
//     };
//   }, []);

//   const toggleFavorite = (id) => {
//     setFavorites((prev) =>
//       prev.includes(id)
//         ? prev.filter((x) => x !== id)
//         : [...prev, id]
//     );
//   };

//   const handleSelectDishSuggestion = (dish) => {
//     setOpen(false);
//     setQuery("");
//     // tum yaha apna actual route use kar sakte ho
//     // filhaal dish name ke basis par search page
//     navigate(`/cuisines?search=${encodeURIComponent(dish.name)}`);
//   };

//   const handleAddToCart = async (meal) => {
//     try {
//       await addItemToCart({
//         foodId: meal.id,
//         quantity: 1,
//       });
//       toast.success(`${meal.name} added to cart 🍱`);
//     } catch (err) {
//       const msg =
//         err?.response?.data ||
//         "Could not add to cart. Please try again.";
//       toast.error(msg);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-red-50/60 via-white to-white scroll-smooth">
//       {/* floating decor */}
//       <div className="fixed inset-0 pointer-events-none -z-10">
//         {!prefersReducedMotion && (
//           <>
//             <motion.div
//               className="absolute top-16 right-4 w-56 h-56 rounded-full blur-3xl bg-gradient-to-br from-red-200/40 to-orange-200/25"
//               animate={floatAnim(1)}
//             />
//             <motion.div
//               className="absolute bottom-24 left-6 w-80 h-80 rounded-full blur-3xl bg-gradient-to-br from-orange-200/25 to-red-200/20"
//               animate={floatAnim(-1)}
//             />
//           </>
//         )}
//       </div>

//       <Hero
//         query={query}
//         setQuery={setQuery}
//         open={open}
//         setOpen={setOpen}
//         suggestions={suggestions}
//         onSelectDish={handleSelectDishSuggestion}
//         wrapRef={wrapRef}
//         searchLoading={searchLoading}
//       />

//       <main className="relative px-4 sm:px-6 md:px-10 lg:px-14 py-10 space-y-12 max-w-6xl mx-auto">
//         <motion.section {...reveal}>
//           <StatsBanner />
//         </motion.section>

//         {/* Fresh Meals / Newly Added – Pinterest Masonry */}
//         <motion.section {...reveal}>
//           <SectionHeader
//             title="Freshly added near you"
//             subtitle="New from our partner kitchens — hot, fresh & curated just for you"
//             icon={<Flame className="w-5 h-5" />}
//           />

//           {mealsLoading ? (
//             <MasonrySkeleton />
//           ) : freshMeals.length ? (
//             <MasonryGrid
//               items={freshMeals}
//               favorites={favorites}
//               toggleFavorite={toggleFavorite}
//               onAddToCart={handleAddToCart}
//             />
//           ) : (
//             <p className="text-sm text-gray-500">
//               No meals yet. Check back soon!
//             </p>
//           )}
//         </motion.section>

//         {/* Only for You – horizontal scroll based on rating */}
//         <motion.section {...reveal}>
//           <SectionHeader
//             title="Only for you"
//             subtitle="Handpicked picks based on popularity and chef ratings"
//             icon={<Star className="w-5 h-5" />}
//           />

//           {recommendedMeals.length ? (
//             <RecommendedStrip
//               items={recommendedMeals}
//               onAddToCart={handleAddToCart}
//               favorites={favorites}
//               toggleFavorite={toggleFavorite}
//             />
//           ) : null}
//         </motion.section>

//         <motion.section {...reveal}>
//           <BenefitsStrip />
//         </motion.section>

//         <motion.section {...reveal}>
//           <Testimonials />
//         </motion.section>

//         <motion.section {...reveal}>
//           <CTASection />
//         </motion.section>
//       </main>
//     </div>
//   );
// }

// /* =====================================================================
//    HERO
//    ===================================================================== */
// function Hero({
//   query,
//   setQuery,
//   open,
//   setOpen,
//   suggestions,
//   onSelectDish,
//   wrapRef,
//   searchLoading,
// }) {
//   return (
//     <header className="relative overflow-hidden">
//       <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-orange-50 to-red-50 -z-20" />

//       <div className="relative px-4 sm:px-6 md:px-10 lg:px-14 pt-10 pb-6">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
//           <motion.div
//             initial={{ opacity: 0, x: -12 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             <span className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-red-50 text-red-600 font-semibold shadow-sm border border-red-100 shine-card">
//               <Sparkles className="w-4 h-4" />
//               Tiffino • Premium Tiffin Experience
//             </span>

//             <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
//               <span className="block text-red-700">
//                 Ghar jaisa taste,
//               </span>
//               <span className="block text-orange-600 mt-1">
//                 restaurant wali feel ✨
//               </span>
//             </h1>

//             <p className="mt-4 text-gray-600 max-w-xl text-sm sm:text-base">
//               Freshly cooked tiffins, handpicked kitchens and
//               super-fast delivery — specially curated for your
//               office, hostel and home cravings.
//             </p>

//             {/* Search box */}
//             <div ref={wrapRef} className="relative mt-6">
//               <form
//                 onSubmit={(e) => {
//                   e.preventDefault();
//                   if (suggestions[0])
//                     onSelectDish(suggestions[0]);
//                 }}
//                 role="search"
//                 aria-label="Search dishes"
//                 className="flex gap-2 items-center bg-white/90 rounded-2xl p-2 shadow-[0_18px_40px_rgba(15,23,42,0.12)] border border-red-50 shine-card backdrop-blur-md"
//               >
//                 <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-red-50">
//                   <Search
//                     className="w-5 h-5 text-red-600"
//                     aria-hidden
//                   />
//                 </div>

//                 <input
//                   aria-label="Search for dishes or cuisines"
//                   value={query}
//                   onChange={(e) => {
//                     setQuery(e.target.value);
//                     setOpen(
//                       Boolean(e.target.value.trim())
//                     );
//                   }}
//                   placeholder="Search for paneer, biryani, dosa..."
//                   className="flex-1 px-3 py-3 text-gray-800 placeholder:text-gray-400 bg-transparent outline-none"
//                 />

//                 <button
//                   type="submit"
//                   aria-label="Search"
//                   className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-pink-600 text-white font-semibold shadow-lg shine-btn btn-ripple text-sm"
//                   onMouseDown={createRipple}
//                 >
//                   {searchLoading ? "Searching..." : "Search"}
//                 </button>
//               </form>

//               {/* Suggestions */}
//               <AnimatePresence>
//                 {open &&
//                   (suggestions.length > 0 ||
//                     searchLoading) && (
//                     <motion.div
//                       initial={{ opacity: 0, y: -8 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -8 }}
//                       transition={{ duration: 0.15 }}
//                       className="absolute left-0 right-0 mt-3 bg-white rounded-2xl border border-gray-100 shadow-xl z-40 overflow-hidden"
//                       role="listbox"
//                       aria-label="Search suggestions"
//                     >
//                       {searchLoading && (
//                         <div className="p-4 space-y-3">
//                           <SuggestionSkeleton />
//                           <SuggestionSkeleton />
//                         </div>
//                       )}

//                       {!searchLoading &&
//                         suggestions.length === 0 && (
//                           <div className="p-4 text-sm text-gray-500">
//                             No results. Try "biryani",
//                             "dosa", or "paneer".
//                           </div>
//                         )}

//                       {!searchLoading &&
//                         suggestions.map((d) => (
//                           <button
//                             key={d.id}
//                             onClick={() =>
//                               onSelectDish(d)
//                             }
//                             className="w-full flex items-center gap-4 px-4 py-3 hover:bg-red-50 text-left transition-colors"
//                           >
//                             <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
//                               <img
//                                 src={d.image}
//                                 alt={d.name}
//                                 className="w-full h-full object-cover"
//                                 loading="lazy"
//                               />
//                               {d.isPopular && (
//                                 <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
//                                   <Flame className="w-3 h-3 text-white" />
//                                 </div>
//                               )}
//                             </div>

//                             <div className="flex-1">
//                               <div className="flex items-center justify-between">
//                                 <p className="font-semibold text-gray-800">
//                                   {d.name}
//                                 </p>
//                                 <span className="text-sm text-red-600 font-semibold">
//                                   ₹{d.price}
//                                 </span>
//                               </div>
//                               <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
//                                 <MapPin className="w-3 h-3" />
//                                 <span>
//                                   {d.city ??
//                                     d.__city ??
//                                     "Nearby"}
//                                 </span>
//                               </div>
//                             </div>

//                             <ChevronRight className="w-5 h-5 text-gray-400" />
//                           </button>
//                         ))}
//                     </motion.div>
//                   )}
//               </AnimatePresence>
//             </div>

//             {/* Quick Stats */}
//             <div className="flex flex-wrap items-center gap-5 mt-6">
//               <div className="flex items-center gap-3">
//                 <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
//                   <Award className="w-5 h-5 text-red-600" />
//                 </div>
//                 <div>
//                   <p className="text-xl font-bold text-gray-800">
//                     50K+
//                   </p>
//                   <p className="text-xs text-gray-500">
//                     Happy Customers
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-3">
//                 <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
//                   <Star className="w-5 h-5 text-orange-500" />
//                 </div>
//                 <div>
//                   <p className="text-xl font-bold text-gray-800">
//                     4.8
//                   </p>
//                   <p className="text-xs text-gray-500">
//                     Average Rating
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, x: 12 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             <HeroImages />
//           </motion.div>
//         </div>
//       </div>
//     </header>
//   );
// }

// /* =====================================================================
//    SMALL COMPONENTS
//    ===================================================================== */

// function SuggestionSkeleton() {
//   return (
//     <div className="flex items-center gap-4 animate-pulse">
//       <div className="w-14 h-14 rounded-lg bg-gray-200" />
//       <div className="flex-1 space-y-2">
//         <div className="w-3/4 h-3 bg-gray-200 rounded" />
//         <div className="w-1/3 h-3 bg-gray-200 rounded" />
//       </div>
//     </div>
//   );
// }

// function HeroImages() {
//   const imgs = [
//     "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1200&auto=format&fit=crop",
//     "https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?q=80&w=1200&auto=format&fit=crop",
//     "https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=1200&auto=format&fit=crop",
//     "https://images.unsplash.com/photo-1604908176997-1251884b08a3?q=80&w=1200&auto=format&fit=crop",
//     "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1200&auto=format&fit=crop",
//     "https://images.unsplash.com/photo-1525755662778-989d0524087e?q=80&w=1200&auto=format&fit=crop",
//   ];

//   const trackRef = useRef(null);
//   const isDown = useRef(false);
//   const startX = useRef(0);
//   const scrollLeft = useRef(0);

//   useEffect(() => {
//     const track = trackRef.current;
//     if (!track) return;

//     let pointerId = null;
//     const onPointerDown = (e) => {
//       if (e.pointerType === "mouse" && e.button !== 0)
//         return;
//       pointerId = e.pointerId;
//       isDown.current = true;
//       startX.current = e.clientX;
//       scrollLeft.current = track.scrollLeft;
//       track.setPointerCapture(pointerId);
//       track.classList.add("dragging");
//     };
//     const onPointerMove = (e) => {
//       if (!isDown.current) return;
//       const x = e.clientX;
//       const walk = startX.current - x;
//       track.scrollLeft = scrollLeft.current + walk;
//     };
//     const onPointerUp = () => {
//       if (!isDown.current) return;
//       isDown.current = false;
//       try {
//         track.releasePointerCapture(pointerId);
//       } catch {}
//       track.classList.remove("dragging");
//     };

//     track.addEventListener("pointerdown", onPointerDown);
//     window.addEventListener("pointermove", onPointerMove);
//     window.addEventListener("pointerup", onPointerUp);

//     return () => {
//       track.removeEventListener(
//         "pointerdown",
//         onPointerDown
//       );
//       window.removeEventListener(
//         "pointermove",
//         onPointerMove
//       );
//       window.removeEventListener(
//         "pointerup",
//         onPointerUp
//       );
//     };
//   }, []);

//   return (
//     <>
//       {/* Mobile scroll */}
//       <div className="md:hidden">
//         <div
//           ref={trackRef}
//           className="flex gap-3 overflow-x-auto no-scrollbar py-2 px-1 snap-x snap-mandatory"
//           role="list"
//           aria-label="Featured dishes"
//         >
//           {imgs.slice(0, 4).map((src, i) => (
//             <div
//               key={i}
//               className="snap-center min-w-[72%] sm:min-w-[56%] h-44 rounded-3xl overflow-hidden shadow-lg bg-white relative shine-card"
//             >
//               <img
//                 src={src}
//                 className="w-full h-full object-cover"
//                 alt={`hero-${i}`}
//                 loading="lazy"
//               />
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Desktop grid */}
//       <div className="hidden md:grid grid-cols-3 gap-3">
//         {imgs.map((src, i) => (
//           <motion.div
//             key={i}
//             whileHover={{ scale: 1.03, y: -6 }}
//             className="rounded-3xl overflow-hidden shadow-[0_18px_40px_rgba(15,23,42,0.18)] h-36 md:h-44 shine-card"
//           >
//             <img
//               src={src}
//               className="w-full h-full object-cover"
//               alt={`hero-${i}`}
//               loading="lazy"
//             />
//           </motion.div>
//         ))}
//       </div>
//     </>
//   );
// }

// /* ---------------- Stats ---------------- */
// function StatsBanner() {
//   const stats = [
//     {
//       label: "Daily Orders",
//       value: "10K+",
//       icon: <TrendingUp className="w-5 h-5" />,
//     },
//     {
//       label: "Partner Kitchens",
//       value: "500+",
//       icon: <Award className="w-5 h-5" />,
//     },
//     {
//       label: "On-time Delivery",
//       value: "95%",
//       icon: <Clock className="w-5 h-5" />,
//     },
//     {
//       label: "Cities Covered",
//       value: "25+",
//       icon: <MapPin className="w-5 h-5" />,
//     },
//   ];

//   return (
//     <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-2xl p-5 sm:p-6 shadow-xl shine-card">
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         {stats.map((s, i) => (
//           <div key={i} className="text-center">
//             <div className="flex items-center justify-center mb-2">
//               <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
//                 {s.icon}
//               </div>
//             </div>
//             <p className="text-xl font-bold">
//               {s.value}
//             </p>
//             <p className="text-xs opacity-90">
//               {s.label}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// function SectionHeader({ title, subtitle, icon }) {
//   return (
//     <div className="mb-4 md:mb-6">
//       <div className="flex items-center gap-3 mb-1">
//         {icon && (
//           <span className="text-red-500">{icon}</span>
//         )}
//         <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
//           {title}
//         </h2>
//       </div>
//       {subtitle && (
//         <p className="text-gray-600 text-sm md:text-base">
//           {subtitle}
//         </p>
//       )}
//     </div>
//   );
// }

// /* ---------------- Masonry Grid ---------------- */
// function MasonryGrid({
//   items,
//   favorites,
//   toggleFavorite,
//   onAddToCart,
// }) {
//   return (
//     <div className="columns-2 md:columns-3 xl:columns-4 gap-4">
//       {items.map((d, i) => (
//         <motion.article
//           key={d.id}
//           initial={{ opacity: 0, y: 16 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, amount: 0.2 }}
//           transition={{ delay: i * 0.04 }}
//           className="mb-4 break-inside-avoid rounded-3xl bg-white/90 backdrop-blur-md border border-white/70 shadow-[0_18px_40px_rgba(15,23,42,0.14)] overflow-hidden shine-card group"
//         >
//           <div className="relative">
//             {d.discount && (
//               <div className="absolute top-3 left-3 z-20 bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1.5 rounded-full text-[11px] font-semibold shadow">
//                 {d.discount}
//               </div>
//             )}

//             {d.isNew && (
//               <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 bg-white/90 px-3 py-1 rounded-full text-[11px] font-semibold shadow flex items-center gap-1">
//                 <Sparkles className="w-3 h-3 text-red-500" />
//                 <span>Just added</span>
//               </div>
//             )}

//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 toggleFavorite(d.id);
//               }}
//               aria-pressed={favorites.includes(d.id)}
//               className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-white/95 flex items-center justify-center shadow-md"
//             >
//               <Heart
//                 className={`w-4 h-4 ${
//                   favorites.includes(d.id)
//                     ? "text-red-500 fill-red-500"
//                     : "text-gray-400"
//                 }`}
//               />
//             </button>

//             <motion.div
//               className="relative overflow-hidden"
//               whileHover={{ scale: 1.02 }}
//               transition={{ duration: 0.38 }}
//             >
//               <img
//                 src={d.image}
//                 alt={d.name}
//                 className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-700"
//                 loading="lazy"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
//             </motion.div>
//           </div>

//           <div className="p-4 pb-4">
//             <div className="flex items-start justify-between gap-2">
//               <div>
//                 <h3 className="font-semibold text-[15px] text-gray-900">
//                   {d.name}
//                 </h3>
//                 <p className="text-[12px] text-gray-500 mt-1">
//                   {d.cuisine} • {d.city}
//                 </p>
//               </div>
//               <div className="flex flex-col items-end gap-1">
//                 <div className="flex items-center gap-1 bg-green-50 px-2 py-0.5 rounded-full">
//                   <Star className="w-3 h-3 text-green-600" />
//                   <span className="text-[11px] font-semibold text-green-700">
//                     {d.rating?.toFixed
//                       ? d.rating.toFixed(1)
//                       : d.rating}
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-1 text-[11px] text-gray-500">
//                   <Timer className="w-3 h-3" />
//                   <span>{d.deliveryTime}</span>
//                 </div>
//               </div>
//             </div>

//             <div className="flex items-center justify-between mt-3">
//               <div>
//                 <span className="text-lg font-bold text-gray-900">
//                   ₹{d.price}
//                 </span>
//               </div>
//               <button
//                 onClick={() => onAddToCart(d)}
//                 className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-red-600 to-pink-600 text-white px-3.5 py-1.5 text-[12px] font-semibold shadow-md shine-btn btn-ripple"
//                 onMouseDown={createRipple}
//               >
//                 <ShoppingBag className="w-4 h-4" />
//                 Add to cart
//               </button>
//             </div>
//           </div>
//         </motion.article>
//       ))}
//     </div>
//   );
// }

// /* ---------------- Masonry Skeleton ---------------- */
// function MasonrySkeleton() {
//   const placeholders = Array.from({ length: 8 });
//   return (
//     <div className="columns-2 md:columns-3 xl:columns-4 gap-4">
//       {placeholders.map((_, i) => (
//         <div
//           key={i}
//           className="mb-4 break-inside-avoid rounded-3xl bg-white/80 border border-white/70 shadow animate-pulse"
//         >
//           <div className="h-40 bg-gray-200 rounded-t-3xl" />
//           <div className="p-4 space-y-3">
//             <div className="h-3 bg-gray-200 rounded w-3/4" />
//             <div className="h-3 bg-gray-200 rounded w-1/2" />
//             <div className="flex justify-between mt-2">
//               <div className="h-4 bg-gray-200 rounded w-1/3" />
//               <div className="h-7 bg-gray-200 rounded w-1/3" />
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// /* ---------------- Recommended strip ---------------- */
// function RecommendedStrip({
//   items,
//   onAddToCart,
//   favorites,
//   toggleFavorite,
// }) {
//   return (
//     <div className="no-scrollbar overflow-x-auto -mx-1 px-1">
//       <div className="flex gap-4 min-w-max">
//         {items.map((d, i) => (
//           <motion.div
//             key={d.id}
//             initial={{ opacity: 0, y: 12 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, amount: 0.3 }}
//             transition={{ delay: i * 0.04 }}
//             className="w-[220px] flex-shrink-0 rounded-3xl bg-white/90 backdrop-blur-md border border-white/70 shadow-md overflow-hidden shine-card"
//           >
//             <div className="relative h-32 overflow-hidden">
//               <img
//                 src={d.image}
//                 alt={d.name}
//                 className="w-full h-full object-cover"
//                 loading="lazy"
//               />
//               <div className="absolute top-2 left-2 bg-black/55 text-[11px] text-white px-2 py-0.5 rounded-full flex items-center gap-1">
//                 <Flame className="w-3 h-3 text-orange-300" />
//                 Top pick
//               </div>

//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   toggleFavorite(d.id);
//                 }}
//                 className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center shadow"
//               >
//                 <Heart
//                   className={`w-3.5 h-3.5 ${
//                     favorites.includes(d.id)
//                       ? "text-red-500 fill-red-500"
//                       : "text-gray-400"
//                   }`}
//                 />
//               </button>
//             </div>

//             <div className="p-3">
//               <p className="text-[13px] font-semibold text-gray-900 line-clamp-1">
//                 {d.name}
//               </p>
//               <p className="text-[11px] text-gray-500 mt-1">
//                 {d.cuisine} • {d.city}
//               </p>

//               <div className="flex items-center justify-between mt-2">
//                 <span className="text-[13px] font-bold text-gray-900">
//                   ₹{d.price}
//                 </span>
//                 <button
//                   onClick={() => onAddToCart(d)}
//                   className="px-3 py-1 rounded-lg bg-red-600 text-white text-[11px] font-semibold shadow shine-btn btn-ripple"
//                   onMouseDown={createRipple}
//                 >
//                   Add
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }

// /* ---------------- Benefits ---------------- */
// function BenefitsStrip() {
//   const items = [
//     {
//       icon: <Clock className="w-5 h-5" />,
//       title: "20–30 min",
//       desc: "Lightning fast delivery",
//       color: "from-red-500 to-orange-500",
//     },
//     {
//       icon: <ShieldCheck className="w-5 h-5" />,
//       title: "Safe & Hygienic",
//       desc: "FSSAI approved kitchens",
//       color: "from-green-500 to-emerald-500",
//     },
//     {
//       icon: <Bike className="w-5 h-5" />,
//       title: "Live tracking",
//       desc: "Know exactly where your food is",
//       color: "from-blue-500 to-cyan-500",
//     },
//     {
//       icon: <Star className="w-5 h-5" />,
//       title: "Handpicked chefs",
//       desc: "Only top rated partners",
//       color: "from-orange-500 to-red-500",
//     },
//   ];

//   return (
//     <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//       {items.map((it, i) => (
//         <motion.div
//           key={i}
//           initial={{ opacity: 0, y: 8 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, amount: 0.2 }}
//           transition={{ delay: i * 0.05 }}
//           className="bg-white/95 rounded-2xl p-4 flex items-start gap-3 shadow-sm hover:shadow-md transition cursor-pointer"
//         >
//           <div
//             className={`w-11 h-11 rounded-xl flex items-center justify-center bg-gradient-to-br ${it.color} text-white`}
//           >
//             {it.icon}
//           </div>
//           <div>
//             <p className="font-semibold text-gray-900 text-sm">
//               {it.title}
//             </p>
//             <p className="text-[11px] text-gray-500 mt-1">
//               {it.desc}
//             </p>
//           </div>
//         </motion.div>
//       ))}
//     </div>
//   );
// }

// /* ---------------- Testimonials ---------------- */
// function Testimonials() {
//   const reviews = [
//     {
//       name: "Riya Sharma",
//       text: "Office se late aati hoon, Tiffino ne literally meri life easy kar di.",
//       rating: 5,
//       image: "https://i.pravatar.cc/150?img=1",
//       location: "Pune",
//     },
//     {
//       name: "Aditya Verma",
//       text: "Hostel me ghar jaisa khana milna mushkil hota hai. Yaha se milta hai.",
//       rating: 5,
//       image: "https://i.pravatar.cc/150?img=12",
//       location: "Bangalore",
//     },
//     {
//       name: "Neha Patel",
//       text: "UI smooth, delivery fast, taste solid. Daily tiffin yahi se.",
//       rating: 5,
//       image: "https://i.pravatar.cc/150?img=5",
//       location: "Mumbai",
//     },
//   ];

//   return (
//     <section>
//       <SectionHeader
//         title="What people are saying"
//         subtitle="Real stories from Tiffino regulars"
//         icon={<Star className="w-5 h-5" />}
//       />
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {reviews.map((r, i) => (
//           <motion.div
//             key={i}
//             initial={{ opacity: 0, y: 10 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, amount: 0.3 }}
//             transition={{ delay: i * 0.05 }}
//             className="bg-gradient-to-br from-white to-red-50 rounded-2xl p-5 shadow-sm hover:shadow-md"
//           >
//             <div className="flex gap-3 items-center mb-3">
//               <img
//                 src={r.image}
//                 alt={r.name}
//                 className="w-12 h-12 rounded-full object-cover border"
//               />
//               <div>
//                 <p className="font-semibold text-sm">
//                   {r.name}
//                 </p>
//                 <p className="text-[11px] text-gray-500 flex items-center gap-1">
//                   <MapPin className="w-3 h-3" />
//                   {r.location}
//                 </p>
//               </div>
//             </div>

//             <p className="text-[13px] text-gray-700 italic mb-4">
//               "{r.text}"
//             </p>

//             <div className="flex gap-1">
//               {Array.from({ length: 5 }).map((_, idx) => (
//                 <Star
//                   key={idx}
//                   className={`w-4 h-4 ${
//                     idx < r.rating
//                       ? "text-orange-400"
//                       : "text-gray-200"
//                   }`}
//                 />
//               ))}
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// }

// /* ---------------- CTA ---------------- */
// function CTASection() {
//   return (
//     <motion.section
//       initial={{ opacity: 0, scale: 0.98 }}
//       whileInView={{ opacity: 1, scale: 1 }}
//       viewport={{ once: true, amount: 0.3 }}
//       transition={{ duration: 0.45 }}
//       className="bg-gradient-to-r from-red-600 to-pink-600 rounded-3xl p-6 md:p-10 text-center text-white shadow-2xl shine-card"
//     >
//       <div className="mx-auto max-w-2xl">
//         <div className="inline-block mb-4">
//           <div className="w-16 h-16 rounded-full bg-white/15 flex items-center justify-center mx-auto">
//             <Zap className="w-8 h-8 text-white" />
//           </div>
//         </div>

//         <h2 className="text-2xl md:text-4xl font-bold">
//           Ready to lock your daily tiffin?
//         </h2>
//         <p className="mt-3 text-sm md:text-base opacity-90">
//           Pick your favourite plan and enjoy hot, homely
//           meals without the daily tension of “aaj khaana
//           kya banega?”
//         </p>

//         <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
//           <button
//             className="px-6 py-3 rounded-xl bg-white text-red-600 font-semibold shadow-lg shine-btn btn-ripple text-sm md:text-base"
//             onMouseDown={createRipple}
//           >
//             Explore subscription plans
//             <ChevronRight className="w-4 h-4 inline-block ml-2" />
//           </button>
//           <button className="px-6 py-3 rounded-xl border border-white/80 text-white font-semibold text-sm md:text-base">
//             Browse today&apos;s menu
//           </button>
//         </div>
//       </div>
//     </motion.section>
//   );
// }

// /* ---------------- Ripple util ---------------- */
// function createRipple(e) {
//   const btn = e.currentTarget;
//   const rect = btn.getBoundingClientRect();
//   const ripple = document.createElement("span");
//   const size = Math.max(rect.width, rect.height) * 0.8;
//   ripple.style.width = ripple.style.height = `${size}px`;
//   ripple.style.left = `${
//     e.clientX - rect.left - size / 2
//   }px`;
//   ripple.style.top = `${
//     e.clientY - rect.top - size / 2
//   }px`;
//   ripple.className = "ripple";
//   btn.appendChild(ripple);
//   setTimeout(() => ripple.remove(), 650);
// }






// import React, {
//   useEffect,
//   useRef,
//   useState,
// } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Search,
//   Sparkles,
//   Star,
//   Clock,
//   Heart,
//   ChevronRight,
//   MapPin,
//   Flame,
//   ShoppingBag,
//   Check,
//   Loader2,
//   UtensilsCrossed,
//   ArrowRight
// } from "lucide-react";
// import toast from "react-hot-toast";
// import { getUserMeals, addItemToCart } from "../../api/api";

// /* =====================================================================
//    🎨 SENIOR DESIGNER NOTE: 
//    Premium Styling & Animations
//    ===================================================================== */
// const INJECTED_CSS = `
// .hide-scrollbar::-webkit-scrollbar { display: none; }
// .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

// /* Smooth Fade Up Animation */
// @keyframes fadeUp {
//   from { opacity: 0; transform: translateY(20px); }
//   to { opacity: 1; transform: translateY(0); }
// }

// /* Glass Effect for Cards */
// .glass-panel {
//   background: rgba(255, 255, 255, 0.7);
//   backdrop-filter: blur(12px);
//   -webkit-backdrop-filter: blur(12px);
//   border: 1px solid rgba(255, 255, 255, 0.5);
// }

// /* Hero Image Floating Animation */
// .float-img { animation: float 6s ease-in-out infinite; }
// .float-img-delayed { animation: float 6s ease-in-out 3s infinite; }

// @keyframes float {
//   0% { transform: translateY(0px); }
//   50% { transform: translateY(-15px); }
//   100% { transform: translateY(0px); }
// }

// /* Masonry Grid */
// .masonry-grid { column-count: 2; column-gap: 1.5rem; }
// @media (min-width: 768px) { .masonry-grid { column-count: 3; } }
// @media (min-width: 1280px) { .masonry-grid { column-count: 4; } }
// .break-inside-avoid { break-inside: avoid; }
// `;

// /* ---------------- Dummy Data (Fallback) ---------------- */
// const FALLBACK_DISHES = [
//   {
//     id: 101,
//     name: "Special Thali",
//     image: "https://images.unsplash.com/photo-1546833999-b9f5816029bd?q=80&w=600&auto=format&fit=crop",
//     cuisine: "North Indian",
//     price: 150,
//     rating: 4.8,
//     deliveryTime: "30 min",
//     isPopular: true,
//   },
//   {
//     id: 102,
//     name: "Paneer Tikka Masala",
//     image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=600&auto=format&fit=crop",
//     cuisine: "Punjabi",
//     price: 240,
//     rating: 4.6,
//     deliveryTime: "25 min",
//     discount: "20% OFF",
//     isPopular: true,
//   },
//   {
//     id: 103,
//     name: "Veg Biryani",
//     image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=600&auto=format&fit=crop",
//     cuisine: "Hyderabadi",
//     price: 180,
//     rating: 4.5,
//     deliveryTime: "35 min",
//     isPopular: false,
//   },
//   {
//     id: 104,
//     name: "Masala Dosa",
//     image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=600&auto=format&fit=crop",
//     cuisine: "South Indian",
//     price: 120,
//     rating: 4.7,
//     deliveryTime: "20 min",
//     discount: "Best Seller",
//     isPopular: true,
//   }
// ];

// export default function Home() {
//   const navigate = useNavigate();

//   // State
//   const [query, setQuery] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const [searchLoading, setSearchLoading] = useState(false);
//   const [favorites, setFavorites] = useState(() => {
//     try { return JSON.parse(localStorage.getItem("fav_dishes_v3") || "[]"); } catch { return []; }
//   });
//   const [meals, setMeals] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Refs
//   const debounceRef = useRef(null);
//   const searchContainerRef = useRef(null);

//   // Inject Styles
//   useEffect(() => {
//     const style = document.createElement("style");
//     style.innerHTML = INJECTED_CSS;
//     document.head.appendChild(style);
//     return () => document.head.removeChild(style);
//   }, []);

//   // Save Favs
//   useEffect(() => {
//     localStorage.setItem("fav_dishes_v3", JSON.stringify(favorites));
//   }, [favorites]);

//   // Fetch Data
//   useEffect(() => {
//     let mounted = true;
//     (async () => {
//       try {
//         setLoading(true);
//         const res = await getUserMeals();
//         if (mounted) {
//            const data = (res?.data && res.data.length > 0) ? res.data : FALLBACK_DISHES;
//            setMeals(normalizeMeals(data));
//         }
//       } catch (err) {
//         if (mounted) setMeals(FALLBACK_DISHES);
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     })();
//     return () => { mounted = false; };
//   }, []);

//   const normalizeMeals = (data) => {
//     return data.map((m, i) => ({
//       id: m.id || m.mealId || i,
//       name: m.name || m.mealName || "Delicious Meal",
//       image: m.image || m.imageUrl || FALLBACK_DISHES[i % 4].image,
//       cuisine: m.cuisine || "Indian",
//       price: m.price || m.mealPrice || 199,
//       rating: m.rating || 4.5,
//       deliveryTime: m.deliveryTime || "30-40 min",
//       discount: m.discount || (i % 3 === 0 ? "20% OFF" : null),
//       isPopular: m.isPopular || false,
//       city: m.city || "Nearby"
//     }));
//   };

//   // Search Logic
//   useEffect(() => {
//     if (!query.trim()) {
//       setSuggestions([]);
//       setSearchLoading(false);
//       return;
//     }
//     setSearchLoading(true);
//     if (debounceRef.current) clearTimeout(debounceRef.current);

//     debounceRef.current = setTimeout(() => {
//       // Local filter for demo (Replace with API)
//       const hits = meals.filter(m => 
//         m.name.toLowerCase().includes(query.toLowerCase()) || 
//         m.cuisine.toLowerCase().includes(query.toLowerCase())
//       );
//       setSuggestions(hits.slice(0, 5));
//       setSearchLoading(false);
//       setIsSearchOpen(true);
//     }, 300);
//   }, [query, meals]);

//   // Click Outside Search Close
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
//         setIsSearchOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // --- Handlers ---
//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     if (query.trim()) {
//       navigate(`/cuisines?search=${encodeURIComponent(query)}`);
//       setIsSearchOpen(false);
//     }
//   };

//   const handleSuggestionClick = (dish) => {
//     setQuery(dish.name);
//     navigate(`/cuisines?search=${encodeURIComponent(dish.name)}`);
//     setIsSearchOpen(false);
//   };

//   const toggleFavorite = (id) => {
//     setFavorites(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
//   };

//   const handleAddToCart = async (meal) => {
//     return addItemToCart({ foodId: meal.id, quantity: 1 });
//   };

//   return (
//     <div className="min-h-screen bg-[#FDFDFD] text-gray-800 font-sans selection:bg-orange-100 selection:text-orange-600">
      
//       {/* ================= HERO SECTION ================= */}
//       <header className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
        
//         {/* Abstract Background Shapes */}
//         <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-gradient-to-br from-orange-100/40 to-red-100/40 rounded-full blur-3xl -z-10" />
//         <div className="absolute top-40 left-0 -translate-x-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-yellow-100/30 to-orange-50/30 rounded-full blur-3xl -z-10" />

//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            
//             {/* Left Content */}
//             <motion.div 
//               initial={{ opacity: 0, x: -30 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8, ease: "easeOut" }}
//               className="flex-1 text-center lg:text-left z-10"
//             >
//               <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-orange-100 shadow-sm text-orange-600 text-xs font-bold tracking-wider uppercase mb-6">
//                 <UtensilsCrossed size={14} /> Tiffino • Premium Delivery
//               </div>
              
//               <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-gray-900 tracking-tight leading-[1.15] mb-6">
//                 <span className="text-red-600">Ghar jaisa taste,</span><br />
//                 <span className="relative inline-block">
//                   restaurant wali feel
//                   <span className="absolute -bottom-2 left-0 w-full h-3 bg-orange-200/50 -z-10 -rotate-1"></span>
//                   ✨
//                 </span>
//               </h1>
              
//               <p className="text-lg text-gray-500 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
//                 Experience the warmth of home-cooked meals delivered with premium hygiene and lightning-fast speed.
//               </p>

//               {/* Enhanced Search Bar */}
//               <div ref={searchContainerRef} className="relative max-w-xl mx-auto lg:mx-0 group">
//                 <form onSubmit={handleSearchSubmit} className="relative transition-all duration-300 transform group-hover:-translate-y-1">
//                   <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
//                     <Search className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input 
//                     type="text" 
//                     className="block w-full pl-14 pr-32 py-4 bg-white border border-gray-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-orange-500 transition-all text-base"
//                     placeholder="Search 'Thali', 'Paneer'..."
//                     value={query}
//                     onChange={(e) => setQuery(e.target.value)}
//                   />
//                   <button type="submit" className="absolute right-2 top-2 bottom-2 bg-gradient-to-r from-red-600 to-orange-500 text-white px-6 rounded-xl font-bold text-sm shadow-lg hover:shadow-orange-200/50 transition-all active:scale-95">
//                     Find Food
//                   </button>
//                 </form>

//                 {/* Search Dropdown */}
//                 <AnimatePresence>
//                   {isSearchOpen && (suggestions.length > 0 || searchLoading) && (
//                     <motion.div 
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: 10 }}
//                       className="absolute left-0 right-0 mt-3 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50"
//                     >
//                       {searchLoading ? (
//                         <div className="p-6 flex justify-center text-gray-400 gap-2"><Loader2 className="animate-spin" /> Searching...</div>
//                       ) : (
//                         suggestions.map((dish) => (
//                           <div 
//                               key={dish.id} 
//                               onClick={() => handleSuggestionClick(dish)}
//                               className="flex items-center gap-4 p-4 hover:bg-orange-50 cursor-pointer transition-colors border-b border-gray-50 last:border-0"
//                           >
//                             <img src={dish.image} alt="" className="w-12 h-12 rounded-lg object-cover shadow-sm" />
//                             <div>
//                               <p className="font-bold text-gray-800 text-sm">{dish.name}</p>
//                               <p className="text-xs text-gray-500">{dish.cuisine}</p>
//                             </div>
//                             <ArrowRight className="ml-auto w-4 h-4 text-gray-300" />
//                           </div>
//                         ))
//                       )}
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>

//               {/* Trust Badges */}
//               <div className="mt-8 flex items-center justify-center lg:justify-start gap-6 text-sm font-medium text-gray-500">
//                 <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-green-500"></div> Fresh Ingredients</span>
//                 <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-500"></div> Live Tracking</span>
//               </div>
//             </motion.div>

//             {/* Right Content - VISUALS */}
//             <motion.div 
//               initial={{ opacity: 0, x: 30 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8, delay: 0.2 }}
//               className="flex-1 relative w-full max-w-lg lg:max-w-none"
//             >
//               {/* Floating Hero Grid */}
//               <div className="relative grid grid-cols-2 gap-4 md:gap-6">
//                 <div className="space-y-4 md:space-y-6 pt-12">
//                    <HeroCard 
//                       img="https://i.pinimg.com/1200x/44/42/a6/4442a6467eeb4d032a5610ea7ada9a30.jpg" 
//                       title="North Indian Thali" 
//                       rating="4.9" 
//                       className="float-img"
//                    />
//                    <div className="p-4 bg-white/80 backdrop-blur rounded-2xl shadow-lg border border-white float-img-delayed">
//                       <div className="flex items-center gap-3 mb-2">
//                          <div className="bg-green-100 p-2 rounded-full text-green-600"><Check size={16} /></div>
//                          <p className="text-sm font-bold text-gray-800">Order Delivered!</p>
//                       </div>
//                       <p className="text-xs text-gray-500">Rahul just ordered Paneer Butter Masala</p>
//                    </div>
//                 </div>
//                 <div className="space-y-4 md:space-y-6">
//                    <HeroCard 
//                       img="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=600&auto=format&fit=crop" 
//                       title="Hyderabadi Biryani" 
//                       rating="4.8" 
//                       className="float-img-delayed"
//                    />
//                    <HeroCard 
//                       img="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=600&auto=format&fit=crop" 
//                       title="Cheesy Pizza" 
//                       rating="4.7" 
//                       className="float-img"
//                    />
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </header>

//       {/* ================= MAIN CONTENT ================= */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 pb-20">
        
//         {/* Stats Section */}
//         <StatsBanner />

//         {/* Freshly Added */}
//         <SectionHeader title="Fresh Cravings" subtitle="Hot from the kitchen to your doorstep" icon={<Flame className="text-orange-500" />} />
//         {loading ? <SkeletonGrid /> : (
//           <div className="masonry-grid">
//             {meals.slice(0, 8).map(meal => (
//               <PremiumDishCard 
//                 key={meal.id} 
//                 data={meal} 
//                 isFav={favorites.includes(meal.id)}
//                 toggleFav={() => toggleFavorite(meal.id)}
//                 onAddToCart={() => handleAddToCart(meal)}
//               />
//             ))}
//           </div>
//         )}

//         {/* Recommended Strip */}
//         <SectionHeader title="Curated For You" subtitle="Top picks based on what you love" icon={<Star className="text-yellow-500" />} />
//         <div className="flex gap-6 overflow-x-auto hide-scrollbar pb-8 -mx-4 px-4 lg:mx-0 lg:px-0">
//             {meals.slice(0, 6).reverse().map(meal => (
//               <HorizontalCard 
//                 key={meal.id} 
//                 data={meal}
//                 onAddToCart={() => handleAddToCart(meal)}
//               />
//             ))}
//         </div>

//         {/* Testimonials */}
//         <Testimonials />

//         {/* CTA */}
//         <div className="relative rounded-[2.5rem] bg-gray-900 overflow-hidden px-6 py-16 md:px-16 text-center shadow-2xl">
//           <div className="absolute top-0 right-0 w-64 h-64 bg-red-600 rounded-full blur-[120px] opacity-20" />
//           <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-600 rounded-full blur-[120px] opacity-20" />
          
//           <div className="relative z-10 max-w-2xl mx-auto">
//              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Hungry yet?</h2>
//              <p className="text-gray-400 text-lg mb-8">
//                Subscribe to our daily tiffin service and forget the hassle of cooking.
//              </p>
//              <button className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-lg hover:shadow-red-900/50 transition-all transform hover:-translate-y-1">
//                Explore Tiffin Plans
//              </button>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// /* ================= COMPONENT LIBRARY ================= */

// function HeroCard({ img, title, rating, className }) {
//   return (
//     <div className={`relative group rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] bg-white ${className}`}>
//       <img src={img} alt={title} className="w-full h-48 md:h-56 object-cover transition-transform duration-700 group-hover:scale-110" />
//       <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
//       <div className="absolute bottom-4 left-4 right-4 text-white">
//         <h3 className="font-bold text-lg leading-tight">{title}</h3>
//         <div className="flex items-center gap-1 mt-1 text-sm text-yellow-400">
//            <Star size={14} fill="currentColor" /> {rating}
//         </div>
//       </div>
//     </div>
//   );
// }

// function SectionHeader({ title, subtitle, icon }) {
//   return (
//     <div className="mb-8">
//       <div className="flex items-center gap-3 mb-2">
//         <div className="p-2.5 bg-white rounded-xl shadow-sm border border-gray-100">{icon}</div>
//         <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
//       </div>
//       <p className="text-gray-500 ml-14">{subtitle}</p>
//     </div>
//   );
// }

// function PremiumDishCard({ data, isFav, toggleFav, onAddToCart }) {
//   return (
//     <motion.div 
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true, margin: "-50px" }}
//       className="group relative mb-8 break-inside-avoid rounded-[2rem] bg-white border border-gray-100 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.12)] transition-all duration-500 overflow-hidden"
//     >
//       <div className="relative h-60 overflow-hidden">
//         <img src={data.image} alt={data.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
//         <div className="absolute top-4 left-4 flex flex-col gap-2">
//            {data.discount && <span className="px-3 py-1 bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg">{data.discount}</span>}
//         </div>
//         <button onClick={(e) => { e.stopPropagation(); toggleFav(); }} className="absolute top-4 right-4 p-2.5 bg-white/80 backdrop-blur rounded-full hover:bg-white transition-all shadow-sm group/heart">
//           <Heart size={18} className={`transition-colors ${isFav ? 'fill-red-500 text-red-500' : 'text-gray-600 group-hover/heart:text-red-500'}`} />
//         </button>
//       </div>

//       <div className="p-6">
//         <div className="flex justify-between items-start mb-2">
//            <h3 className="font-bold text-xl text-gray-900 leading-tight w-3/4">{data.name}</h3>
//            <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-lg">
//              <Star size={12} className="text-green-600 fill-green-600" />
//              <span className="text-xs font-bold text-green-700">{data.rating}</span>
//            </div>
//         </div>
//         <p className="text-sm text-gray-500 mb-4 flex items-center gap-2">
//           <Clock size={14} /> {data.deliveryTime} • {data.cuisine}
//         </p>
//         <div className="flex items-center justify-between pt-4 border-t border-gray-50">
//            <p className="text-2xl font-extrabold text-gray-900">₹{data.price}</p>
//            <SmartAddButton onAdd={onAddToCart} />
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// /* 🔥 SMART ADD BUTTON (Micro-interaction) 🔥 */
// function SmartAddButton({ onAdd }) {
//   const [status, setStatus] = useState("idle"); 

//   const handleClick = async () => {
//     if (status !== "idle") return;
//     setStatus("loading");
//     try {
//       await onAdd();
//       setStatus("success");
//       setTimeout(() => setStatus("idle"), 2500);
//     } catch { setStatus("idle"); }
//   };

//   return (
//     <button
//       onClick={handleClick}
//       disabled={status === "loading"}
//       className={`relative h-11 px-6 rounded-2xl font-bold text-sm transition-all duration-300 overflow-hidden shadow-lg shadow-orange-100
//         ${status === "success" ? "bg-green-500 text-white w-32" : "bg-gray-900 text-white hover:bg-gray-800 w-28 hover:w-32 active:scale-95"}
//       `}
//     >
//       <div className="flex items-center justify-center gap-2">
//         {status === "idle" && <><ShoppingBag size={18} /> Add</>}
//         {status === "loading" && <Loader2 size={18} className="animate-spin" />}
//         {status === "success" && <><Check size={18} /> Added</>}
//       </div>
//     </button>
//   );
// }

// function HorizontalCard({ data, onAddToCart }) {
//     return (
//         <div className="min-w-[280px] h-[340px] rounded-[2rem] relative overflow-hidden group shadow-md cursor-pointer">
//             <img src={data.image} alt={data.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
//             <div className="absolute bottom-0 left-0 w-full p-6 text-white">
//                 <h3 className="text-xl font-bold mb-1">{data.name}</h3>
//                 <p className="text-white/70 text-sm mb-4">{data.cuisine}</p>
//                 <div className="flex justify-between items-center">
//                     <span className="text-xl font-bold">₹{data.price}</span>
//                     <button onClick={(e) => { e.stopPropagation(); onAddToCart(); toast.success("Added to cart!"); }} className="bg-white text-black w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors shadow-lg">
//                         <ShoppingBag size={16} />
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// function StatsBanner() {
//     return (
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white rounded-3xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-gray-100">
//             {[
//               { label: "Happy Eaters", val: "50k+", icon: <Heart /> },
//               { label: "Kitchens", val: "500+", icon: <MapPin /> },
//               { label: "Daily Orders", val: "10k+", icon: <ShoppingBag /> },
//               { label: "Top Rated", val: "4.8/5", icon: <Star /> },
//             ].map((s, i) => (
//                 <div key={i} className="text-center">
//                     <div className="mx-auto w-10 h-10 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center mb-3">{s.icon}</div>
//                     <div className="text-2xl font-bold text-gray-900">{s.val}</div>
//                     <div className="text-xs text-gray-500 font-bold uppercase tracking-wide">{s.label}</div>
//                 </div>
//             ))}
//         </div>
//     );
// }

// function Testimonials() {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-orange-50 rounded-[2.5rem] p-8 md:p-16">
//       <div>
//          <div className="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wider mb-6">Customer Love</div>
//          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">"Finally, food that doesn't feel like 'outside' food."</h2>
//          <div className="flex items-center gap-4">
//             <img src="https://i.pravatar.cc/100?img=32" alt="User" className="w-12 h-12 rounded-full border-2 border-white shadow-sm" />
//             <div>
//                <p className="font-bold text-gray-900">Priya Malhotra</p>
//                <p className="text-sm text-gray-500">Corporate Employee, Pune</p>
//             </div>
//          </div>
//       </div>
//       <div className="relative h-64 md:h-full min-h-[300px] rounded-3xl overflow-hidden shadow-2xl">
//          <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover" alt="Happy eating" />
//       </div>
//     </div>
//   );
// }

// function SkeletonGrid() {
//   return <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-pulse">{[1,2,3].map(i => <div key={i} className="h-72 bg-gray-200 rounded-3xl" />)}</div>
// }






// import React, { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Search,
//   Sparkles,
//   Star,
//   Clock,
//   Heart,
//   ArrowRight,
//   Flame,
//   CheckCircle,
//   Utensils,
//   ChevronRight,
//   MapPin
// } from "lucide-react";
// import { getUserMeals } from "../../api/api"; // Removed addItemToCart as requested

// /* =====================================================================
//    💎 SENIOR DESIGNER NOTE: 
//    Premium "Sheen" Effect & Bento Grid Layout
//    ===================================================================== */
// const INJECTED_CSS = `
// .hide-scrollbar::-webkit-scrollbar { display: none; }
// .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

// /* 🌟 THE GLASS SHINE EFFECT (SHEEN) */
// .hover-shine {
//   position: relative;
//   overflow: hidden;
// }
// .hover-shine::after {
//   content: "";
//   position: absolute;
//   top: 0;
//   left: -100%;
//   width: 50%;
//   height: 100%;
//   background: linear-gradient(
//     to right,
//     rgba(255, 255, 255, 0) 0%,
//     rgba(255, 255, 255, 0.3) 50%,
//     rgba(255, 255, 255, 0) 100%
//   );
//   transform: skewX(-25deg);
//   transition: none;
//   z-index: 10;
//   pointer-events: none;
// }
// .hover-shine:hover::after {
//   left: 150%;
//   transition: left 0.7s ease-in-out;
// }

// /* Smooth Image Zoom on Hover */
// .hover-zoom img {
//   transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
// }
// .hover-zoom:hover img {
//   transform: scale(1.05);
// }

// /* Masonry Grid */
// .masonry-grid { column-count: 2; column-gap: 1.5rem; }
// @media (min-width: 768px) { .masonry-grid { column-count: 3; } }
// @media (min-width: 1280px) { .masonry-grid { column-count: 4; } }
// .break-inside-avoid { break-inside: avoid; }
// `;

// /* ---------------- Dummy Data for Visuals ---------------- */
// const HERO_IMAGES = [
//   { id: 1, src: "https://i.pinimg.com/736x/de/c8/d7/dec8d7e3205a346913f86728f5f4afc8.jpg", label: "North Indian Thali", col: "col-span-2 row-span-2" }, // Main Large
//   { id: 2, src: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=600&auto=format&fit=crop", label: "Biryani Special", col: "col-span-1 row-span-1" },
//   { id: 3, src: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=600&auto=format&fit=crop", label: "Italian Pizza", col: "col-span-1 row-span-1" },
//   { id: 4, src: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600&auto=format&fit=crop", label: "Healthy Salad", col: "col-span-1 row-span-1" },
//   { id: 5, src: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=600&auto=format&fit=crop", label: "South Indian", col: "col-span-1 row-span-1" },
// ];

// const FALLBACK_DISHES = [
//   { id: 101, name: "Special Thali", image: "https://images.unsplash.com/photo-1546833999-b9f5816029bd?q=80&w=600&auto=format&fit=crop", cuisine: "North Indian", price: 150, rating: 4.8, deliveryTime: "30 min" },
//   { id: 102, name: "Paneer Tikka", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=600&auto=format&fit=crop", cuisine: "Punjabi", price: 240, rating: 4.6, deliveryTime: "25 min", discount: "20% OFF" },
//   { id: 103, name: "Veg Biryani", image: "https://images.unsplash.com/photo-1642821373181-696a54913e93?q=80&w=600&auto=format&fit=crop", cuisine: "Hyderabadi", price: 180, rating: 4.5, deliveryTime: "35 min" },
//   { id: 104, name: "Masala Dosa", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=600&auto=format&fit=crop", cuisine: "South Indian", price: 120, rating: 4.7, deliveryTime: "20 min", discount: "Best Seller" },
//   { id: 105, name: "Burger Combo", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&auto=format&fit=crop", cuisine: "Fast Food", price: 199, rating: 4.4, deliveryTime: "25 min" },
//   { id: 106, name: "Chole Bhature", image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=600&auto=format&fit=crop", cuisine: "Punjabi", price: 140, rating: 4.9, deliveryTime: "30 min" },
// ];

// /* =====================================================================
//    MAIN COMPONENT
//    ===================================================================== */
// export default function Home() {
//   const navigate = useNavigate();

//   // State
//   const [query, setQuery] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const [meals, setMeals] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Refs
//   const debounceRef = useRef(null);
//   const searchContainerRef = useRef(null);

//   // Inject Styles
//   useEffect(() => {
//     const style = document.createElement("style");
//     style.innerHTML = INJECTED_CSS;
//     document.head.appendChild(style);
//     return () => document.head.removeChild(style);
//   }, []);

//   // Fetch Data (Only for display now)
//   useEffect(() => {
//     let mounted = true;
//     (async () => {
//       try {
//         setLoading(true);
//         const res = await getUserMeals();
//         if (mounted) {
//            const data = (res?.data && res.data.length > 0) ? res.data : FALLBACK_DISHES;
//            setMeals(normalizeMeals(data));
//         }
//       } catch (err) {
//         if (mounted) setMeals(FALLBACK_DISHES);
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     })();
//     return () => { mounted = false; };
//   }, []);

//   const normalizeMeals = (data) => {
//     return data.map((m, i) => ({
//       id: m.id || m.mealId || i,
//       name: m.name || m.mealName || "Delicious Meal",
//       image: m.image || m.imageUrl || FALLBACK_DISHES[i % 6].image,
//       cuisine: m.cuisine || "Indian",
//       price: m.price || m.mealPrice || 199,
//       rating: m.rating || 4.5,
//       deliveryTime: m.deliveryTime || "30-40 min",
//       discount: m.discount || (i % 3 === 0 ? "20% OFF" : null),
//       city: m.city || "Nearby"
//     }));
//   };

//   // Search Logic
//   useEffect(() => {
//     if (!query.trim()) {
//       setSuggestions([]);
//       return;
//     }
//     if (debounceRef.current) clearTimeout(debounceRef.current);

//     debounceRef.current = setTimeout(() => {
//       const hits = meals.filter(m => 
//         m.name.toLowerCase().includes(query.toLowerCase()) || 
//         m.cuisine.toLowerCase().includes(query.toLowerCase())
//       );
//       setSuggestions(hits.slice(0, 5));
//       setIsSearchOpen(true);
//     }, 300);
//   }, [query, meals]);

//   // Click Outside
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
//         setIsSearchOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // --- ROUTING HANDLERS ---
  
//   // 1. Search -> Cuisine Page
//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     if (query.trim()) {
//       navigate(`/cuisine?search=${encodeURIComponent(query)}`);
//       setIsSearchOpen(false);
//     }
//   };

//   // 2. Suggestion Click -> Cuisine Page
//   const handleSuggestionClick = (dish) => {
//     navigate(`/cuisine?search=${encodeURIComponent(dish.name)}`);
//   };

//   // 3. Any Dish Click -> Cuisine Page (User requested removal of direct cart add)
//   const handleDishClick = () => {
//     navigate("/cuisine");
//   };

//   // 4. Subscription Click -> Subscription Page
//   const handleSubscriptionClick = () => {
//     navigate("/subscription");
//   };

//   return (
//     <div className="min-h-screen bg-[#F9FAFB] text-gray-800 font-sans selection:bg-red-100 selection:text-red-700">
      
//       {/* ================= HERO SECTION (IMPROVED 5-GRID) ================= */}
//       <header className="relative pt-24 pb-16 lg:pt-32 lg:pb-20 overflow-hidden">
        
//         {/* Soft Ambient Background */}
//         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-gradient-to-b from-orange-50/80 via-white to-transparent rounded-[100%] blur-3xl -z-10" />

//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
            
//             {/* LEFT: Text & Search */}
//             <motion.div 
//               initial={{ opacity: 0, x: -30 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8 }}
//               className="flex-1 text-center lg:text-left z-10 w-full"
//             >
//               <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-red-50 border border-red-100 text-red-600 text-xs font-bold tracking-widest uppercase">
//                 <Sparkles size={14} /> Premium Tiffin Service
//               </div>
              
//               <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.1] mb-6">
//                 Ghar jaisa taste, <br/>
//                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 hover-shine cursor-default">
//                    Restaurant wali feel ✨
//                 </span>
//               </h1>
              
//               <p className="text-lg text-gray-500 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
//                 Why compromise? Get healthy, home-style meals delivered hot to your doorstep. Flexible plans, zero hassle.
//               </p>

//               {/* Search Bar */}
//               <div ref={searchContainerRef} className="relative max-w-md mx-auto lg:mx-0">
//                 <form onSubmit={handleSearchSubmit} className="relative group">
//                   <input 
//                     type="text" 
//                     className="block w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-500 transition-all"
//                     placeholder="Search 'Paneer', 'Thali'..."
//                     value={query}
//                     onChange={(e) => setQuery(e.target.value)}
//                   />
//                   <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
//                     <Search className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <button type="submit" className="absolute right-2 top-2 bottom-2 bg-red-600 hover:bg-red-700 text-white px-5 rounded-xl font-medium transition-colors hover-shine">
//                     Search
//                   </button>
//                 </form>

//                 {/* Suggestions */}
//                 <AnimatePresence>
//                   {isSearchOpen && suggestions.length > 0 && (
//                     <motion.div 
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: 10 }}
//                       className="absolute left-0 right-0 mt-3 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50"
//                     >
//                       {suggestions.map((dish) => (
//                           <div 
//                               key={dish.id} 
//                               onClick={() => handleSuggestionClick(dish)}
//                               className="flex items-center gap-4 p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0 transition-colors"
//                           >
//                             <img src={dish.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
//                             <div className="text-left">
//                               <p className="font-bold text-gray-800 text-sm">{dish.name}</p>
//                               <p className="text-xs text-gray-500">{dish.cuisine}</p>
//                             </div>
//                             <ChevronRight className="ml-auto w-4 h-4 text-gray-300" />
//                           </div>
//                         ))}
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>

//               <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-4">
//                  <button onClick={handleDishClick} className="px-6 py-3 bg-gray-900 text-white rounded-full font-semibold text-sm hover:bg-black transition-all hover-shine">
//                     Order Now
//                  </button>
//                  <button onClick={handleSubscriptionClick} className="px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-full font-semibold text-sm hover:bg-gray-50 transition-all">
//                     View Plans
//                  </button>
//               </div>
//             </motion.div>

//             {/* RIGHT: THE HERO 5-GRID (Bento Style) */}
//             <motion.div 
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.8, delay: 0.2 }}
//               className="flex-1 w-full max-w-xl"
//             >
//               <div className="grid grid-cols-3 grid-rows-3 gap-3 h-[450px] md:h-[500px] w-full p-3 bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100">
                 
//                  {/* 1. Large Main Image (Left) */}
//                  <div 
//                     onClick={handleDishClick}
//                     className="col-span-2 row-span-3 relative rounded-2xl overflow-hidden cursor-pointer group hover-shine hover-zoom"
//                  >
//                     <img src={HERO_IMAGES[0].src} alt={HERO_IMAGES[0].label} className="w-full h-full object-cover" />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
//                     <div className="absolute bottom-4 left-4 text-white">
//                        <p className="font-bold text-lg">{HERO_IMAGES[0].label}</p>
//                        <p className="text-xs opacity-80">Best Seller</p>
//                     </div>
//                  </div>

//                  {/* 2. Top Right */}
//                  <div 
//                     onClick={handleDishClick}
//                     className="col-span-1 row-span-1 relative rounded-2xl overflow-hidden cursor-pointer hover-shine hover-zoom"
//                  >
//                     <img src={HERO_IMAGES[1].src} alt={HERO_IMAGES[1].label} className="w-full h-full object-cover" />
//                  </div>

//                  {/* 3. Middle Right */}
//                  <div 
//                     onClick={handleDishClick}
//                     className="col-span-1 row-span-1 relative rounded-2xl overflow-hidden cursor-pointer hover-shine hover-zoom"
//                  >
//                     <img src={HERO_IMAGES[2].src} alt={HERO_IMAGES[2].label} className="w-full h-full object-cover" />
//                  </div>

//                  {/* 4. Bottom Right (Split 1) */}
//                  <div 
//                     onClick={handleDishClick}
//                     className="col-span-1 row-span-1 relative rounded-2xl overflow-hidden cursor-pointer hover-shine hover-zoom"
//                  >
//                     <img src={HERO_IMAGES[3].src} alt={HERO_IMAGES[3].label} className="w-full h-full object-cover" />
//                     <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all" />
//                     <div className="absolute inset-0 flex items-center justify-center">
//                        <span className="bg-white/90 text-xs font-bold px-2 py-1 rounded-md text-gray-800 shadow-sm">+12 More</span>
//                     </div>
//                  </div>

//               </div>
//             </motion.div>

//           </div>
//         </div>
//       </header>

//       {/* ================= MAIN CONTENT ================= */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 pb-20">
        
//         {/* STATS STRIP */}
//         <div className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-wrap justify-between items-center gap-6">
//            <StatItem number="50k+" label="Happy Tummies" />
//            <div className="h-10 w-px bg-gray-200 hidden md:block"></div>
//            <StatItem number="4.8" label="App Rating" />
//            <div className="h-10 w-px bg-gray-200 hidden md:block"></div>
//            <StatItem number="30 min" label="Avg Delivery" />
//            <div className="h-10 w-px bg-gray-200 hidden md:block"></div>
//            <StatItem number="100%" label="Hygienic" />
//         </div>

//         {/* FRESH CRAVINGS SECTION */}
//         <section>
//           <SectionHeader title="Fresh from Kitchen" subtitle="Explore the newest additions to our menu" />
          
//           {loading ? (
//              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
//                 {[1,2,3].map(i => <div key={i} className="h-64 bg-gray-200 rounded-3xl" />)}
//              </div>
//           ) : (
//             <div className="masonry-grid">
//               {meals.slice(0, 8).map(meal => (
//                 <DishCard 
//                   key={meal.id} 
//                   data={meal} 
//                   onClick={handleDishClick} // Routes to /cuisine
//                 />
//               ))}
//             </div>
//           )}
//         </section>

//         {/* SUBSCRIPTION CTA (Focus Section) */}
//         <section className="relative overflow-hidden rounded-[2.5rem] bg-[#111] text-white p-8 md:p-16 text-center shadow-2xl">
//            <div className="absolute top-0 right-0 w-96 h-96 bg-red-600 rounded-full blur-[150px] opacity-30 pointer-events-none" />
//            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600 rounded-full blur-[150px] opacity-30 pointer-events-none" />
           
//            <div className="relative z-10 max-w-3xl mx-auto">
//               <div className="inline-block px-4 py-1 rounded-full border border-gray-600 bg-gray-800/50 backdrop-blur text-xs font-bold tracking-widest uppercase mb-6">
//                 Monthly Plans
//               </div>
//               <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
//                  Tired of ordering daily? <br/>
//                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
//                     Fix your monthly tiffin.
//                  </span>
//               </h2>
//               <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
//                  Save up to 30% with our subscription plans. Customized menus, flexible pauses, and priority delivery.
//               </p>
//               <button 
//                 onClick={handleSubscriptionClick}
//                 className="px-10 py-4 bg-white text-black rounded-2xl font-bold text-lg hover:scale-105 transition-transform hover-shine shadow-xl shadow-white/10"
//               >
//                  Explore Tiffin Plans
//               </button>
//            </div>
//         </section>

//         {/* POPULAR NOW (Horizontal Scroll) */}
//         <section>
//            <SectionHeader title="Popular Cravings" subtitle="What everyone in your city is eating" />
//            <div className="flex gap-6 overflow-x-auto hide-scrollbar pb-6 -mx-4 px-4 lg:mx-0 lg:px-0">
//               {meals.slice(0, 6).reverse().map(meal => (
//                 <HorizontalCard 
//                    key={meal.id} 
//                    data={meal} 
//                    onClick={handleDishClick}
//                 />
//               ))}
//            </div>
//         </section>

//       </main>
//     </div>
//   );
// }

// /* ================= COMPONENT LIBRARY ================= */

// function StatItem({ number, label }) {
//   return (
//     <div className="text-center flex-1 min-w-[100px]">
//        <p className="text-2xl font-extrabold text-gray-900">{number}</p>
//        <p className="text-xs text-gray-500 font-bold uppercase tracking-wide mt-1">{label}</p>
//     </div>
//   );
// }

// function SectionHeader({ title, subtitle }) {
//   return (
//     <div className="mb-10 flex items-end justify-between">
//       <div>
//         <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
//         <p className="text-gray-500 mt-2">{subtitle}</p>
//       </div>
//       <div className="hidden md:flex items-center gap-2 text-red-600 font-bold text-sm cursor-pointer hover:underline">
//          View All <ArrowRight size={16} />
//       </div>
//     </div>
//   );
// }

// function DishCard({ data, onClick }) {
//   return (
//     <motion.div 
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true, margin: "-50px" }}
//       onClick={onClick}
//       className="group relative mb-8 break-inside-avoid rounded-[2rem] bg-white border border-gray-100 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.12)] transition-all duration-300 cursor-pointer overflow-hidden"
//     >
//       <div className="relative h-60 overflow-hidden hover-shine">
//         <img src={data.image} alt={data.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
//         <div className="absolute top-4 left-4">
//            {data.discount && <span className="px-3 py-1 bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg">{data.discount}</span>}
//         </div>
//       </div>

//       <div className="p-6">
//         <div className="flex justify-between items-start mb-2">
//            <h3 className="font-bold text-lg text-gray-900 leading-tight w-3/4 group-hover:text-red-600 transition-colors">{data.name}</h3>
//            <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-lg">
//              <Star size={12} className="text-green-600 fill-green-600" />
//              <span className="text-xs font-bold text-green-700">{data.rating}</span>
//            </div>
//         </div>
//         <p className="text-sm text-gray-500 mb-4 flex items-center gap-2">
//           <Clock size={14} /> {data.deliveryTime} • {data.cuisine}
//         </p>
//         <div className="flex items-center justify-between pt-4 border-t border-gray-50">
//            <p className="text-xl font-extrabold text-gray-900">₹{data.price}</p>
//            <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-900 group-hover:bg-red-600 group-hover:text-white transition-all">
//              <ChevronRight size={20} />
//            </button>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// function HorizontalCard({ data, onClick }) {
//     return (
//         <div 
//           onClick={onClick}
//           className="min-w-[280px] h-[340px] rounded-[2rem] relative overflow-hidden group shadow-md cursor-pointer hover-shine"
//         >
//             <img src={data.image} alt={data.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
//             <div className="absolute bottom-0 left-0 w-full p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform">
//                 <h3 className="text-xl font-bold mb-1">{data.name}</h3>
//                 <p className="text-white/70 text-sm mb-4">{data.cuisine}</p>
//                 <div className="flex justify-between items-center">
//                     <span className="text-xl font-bold">₹{data.price}</span>
//                     <span className="text-sm font-semibold text-orange-300">Order Now &rarr;</span>
//                 </div>
//             </div>
//         </div>
//     );
// }






import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Search,
  Sparkles,
  Star,
  Clock,
  Heart,
  ArrowRight,
  Flame,
  CheckCircle2,
  Utensils,
  ChevronRight,
  MapPin,
  ChefHat,
  TrendingUp
} from "lucide-react";
import { getUserMeals } from "../../api/api"; 

/* =====================================================================
   🎨 GLOBAL STYLES & ANIMATIONS
   ===================================================================== */
const INJECTED_CSS = `
.hide-scrollbar::-webkit-scrollbar { display: none; }
.hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

/* 3D Tilt Effect Container */
.tilt-card {
  perspective: 1000px;
  transform-style: preserve-3d;
}
.tilt-content {
  transition: transform 0.1s;
}

/* Shimmer Overlay */
.shimmer {
  position: relative;
  overflow: hidden;
}
.shimmer::before {
  content: '';
  position: absolute;
  top: 0; left: -100%; width: 50%; height: 100%;
  background: linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent);
  transform: skewX(-25deg);
  animation: shine 3s infinite;
}

@keyframes shine {
  0% { left: -100%; }
  20% { left: 200%; }
  100% { left: 200%; }
}

/* Masonry Grid */
.masonry-grid { column-count: 2; column-gap: 1.5rem; }
@media (min-width: 768px) { .masonry-grid { column-count: 3; } }
@media (min-width: 1280px) { .masonry-grid { column-count: 4; } }
.break-inside-avoid { break-inside: avoid; }
`;

/* ---------------- Dummy Data ---------------- */
const HERO_IMAGES = [
  { id: 1, src: "https://i.pinimg.com/736x/e1/bc/40/e1bc40d857eebef23656276205422b9f.jpg", label: "Hyderabadi Biryani", col: "col-span-2 row-span-2", badge: "Legendary" }, 
  { id: 2, src: "https://i.pinimg.com/736x/7f/f1/5c/7ff15cda15ab978c1b38b9aaf366bbae.jpg", label: "Butter Chicken", col: "col-span-1 row-span-1", badge: "Creamy" },
  { id: 3, src: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=600&auto=format&fit=crop", label: "Cheesy Pizza", col: "col-span-1 row-span-1", badge: "Hot" },
  { id: 4, src: "https://i.pinimg.com/1200x/7a/1c/b1/7a1cb1f87c95f83f9291a7b97f312da2.jpg", label: "Samosa", col: "col-span-1 row-span-1", badge: "Crispy" },
  { id: 5, src: "https://i.pinimg.com/736x/d0/f9/5e/d0f95e2e50b977162f8a7f45dbd06052.jpg", label: "Masala Dosa", col: "col-span-1 row-span-1", badge: "Classic" },
   { id: 6, src: "https://i.pinimg.com/1200x/56/00/76/5600766d79ec9a73782be89ab0e46f29.jpg", label: "Puran Poli", col: "col-span-1 row-span-1", badge: "Classic" },
  
];

const CATEGORIES = [
  { name: "Healthy", icon: "🥗", color: "bg-green-100 text-green-700" },
  { name: "Spicy", icon: "🌶️", color: "bg-red-100 text-red-700" },
  { name: "Sweet", icon: "🍩", color: "bg-pink-100 text-pink-700" },
  { name: "Fast Food", icon: "🍔", color: "bg-orange-100 text-orange-700" },
];

/* =====================================================================
   🏠 MAIN COMPONENT
   ===================================================================== */
export default function Home() {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);

  // State
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Fake Live Orders Ticker
  const [liveOrder, setLiveOrder] = useState("Rahul just ordered Butter Chicken 🍗");

  // Refs
  const debounceRef = useRef(null);
  const searchContainerRef = useRef(null);

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = INJECTED_CSS;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // Fetch Data
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const res = await getUserMeals();
        if (mounted) {
           const data = (res?.data && res.data.length > 0) ? res.data : []; 
           // If API empty, we can fallback or show empty state. Using empty [] here for realism
           setMeals(normalizeMeals(data));
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  // Live Ticker Animation
  useEffect(() => {
     const orders = ["Priya ordered Masala Dosa 🥞", "Amit ordered Paneer Tikka 🧀", "Sana ordered Biryani 🥘", "Vikram ordered Pizza 🍕"];
     let i = 0;
     const interval = setInterval(() => {
        setLiveOrder(orders[i]);
        i = (i + 1) % orders.length;
     }, 4000);
     return () => clearInterval(interval);
  }, []);

  const normalizeMeals = (data) => {
    return data.map((m, i) => ({
      id: m.id || m.mealId || i,
      name: m.name || m.mealName || "Delicious Meal",
      image: m.image || m.imageUrl || "https://i.pinimg.com/1200x/e8/c3/f2/e8c3f2eb0b35f9fb1c059917fbb74650.jpg",
      cuisine: m.cuisine || "Indian",
      price: m.price || m.mealPrice || 199,
      rating: m.rating || 4.5,
      deliveryTime: m.deliveryTime || "30-40 min",
      discount: m.discount || (i % 3 === 0 ? "20% OFF" : null),
      city: m.city || "Nearby"
    }));
  };

  // Search Logic
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      const hits = meals.filter(m => 
        m.name.toLowerCase().includes(query.toLowerCase()) || 
        m.cuisine.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(hits.slice(0, 5));
      setIsSearchOpen(true);
    }, 300);
  }, [query, meals]);

  // Click Outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/cuisine?search=${encodeURIComponent(query)}`);
      setIsSearchOpen(false);
    }
  };

  const handleSuggestionClick = (dish) => navigate(`/cuisine?search=${encodeURIComponent(dish.name)}`);
  const handleDishClick = () => navigate("/cuisine");
  const handleSubscriptionClick = () => navigate("/subscription");

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-gray-800 font-sans selection:bg-red-100 selection:text-red-700 overflow-x-hidden">
      
      {/* ================= HERO SECTION ================= */}
      <header className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        
        {/* Animated Blobs */}
        <motion.div animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }} transition={{ duration: 10, repeat: Infinity }} className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-red-100/40 to-orange-100/40 rounded-full blur-[100px] -z-10" />
        <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, -5, 0] }} transition={{ duration: 12, repeat: Infinity, delay: 1 }} className="absolute top-40 left-0 -translate-x-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-yellow-100/30 to-red-50/30 rounded-full blur-[100px] -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
            
            {/* LEFT: TEXT CONTENT */}
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex-1 text-center lg:text-left z-10 w-full"
            >
              {/* Live Ticker */}
              <motion.div 
                key={liveOrder}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gray-100 shadow-sm text-gray-500 text-xs font-medium mb-6"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                {liveOrder}
              </motion.div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-[1.1] mb-6">
                Taste the <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 cursor-default">
                   Extraordinary ✨
                </span>
              </h1>
              
              <p className="text-lg text-gray-500 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
                From local street food to gourmet delicacies, get the best meals delivered to your doorstep in minutes.
              </p>

              {/* Enhanced Search Bar */}
              <div ref={searchContainerRef} className="relative max-w-lg mx-auto lg:mx-0 group z-50">
                <form onSubmit={handleSearchSubmit} className="relative transition-transform duration-300 transform group-hover:-translate-y-1">
                  <input 
                    type="text" 
                    className="block w-full pl-14 pr-4 py-4 bg-white border border-gray-200 rounded-2xl shadow-xl shadow-gray-100 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-red-50 focus:border-red-500 transition-all text-base"
                    placeholder="Search 'Biryani', 'Cake'..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  <Search className="absolute inset-y-0 left-5 top-4 h-6 w-6 text-gray-400" />
                  <button type="submit" className="absolute right-2 top-2 bottom-2 bg-red-600 hover:bg-red-700 text-white px-6 rounded-xl font-bold text-sm shadow-lg hover:shadow-red-200 transition-all active:scale-95">
                    Find Food
                  </button>
                </form>

                {/* Suggestions Dropdown */}
                <AnimatePresence>
                  {isSearchOpen && suggestions.length > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.98 }}
                      className="absolute left-0 right-0 mt-3 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50"
                    >
                      {suggestions.map((dish) => (
                          <div 
                              key={dish.id} 
                              onClick={() => handleSuggestionClick(dish)}
                              className="flex items-center gap-4 p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0 transition-colors group"
                          >
                            <img src={dish.image} alt="" className="w-12 h-12 rounded-xl object-cover shadow-sm group-hover:scale-105 transition-transform" />
                            <div className="text-left flex-1">
                              <p className="font-bold text-gray-800 text-sm">{dish.name}</p>
                              <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                                 <Star size={10} className="text-yellow-500 fill-yellow-500"/> {dish.rating} • {dish.cuisine}
                              </div>
                            </div>
                            <ChevronRight className="ml-auto w-4 h-4 text-gray-300 group-hover:text-red-500 transition-colors" />
                          </div>
                        ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Floating Categories */}
              <div className="mt-10 flex flex-wrap justify-center lg:justify-start gap-4">
                 {CATEGORIES.map((cat, i) => (
                    <motion.button
                       key={i}
                       whileHover={{ y: -5 }}
                       onClick={handleDishClick}
                       className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs shadow-sm hover:shadow-md transition-all ${cat.color} bg-opacity-50 backdrop-blur-sm border border-white/40`}
                    >
                       <span>{cat.icon}</span> {cat.name}
                    </motion.button>
                 ))}
              </div>
            </motion.div>

            {/* RIGHT: HERO GRID (3D TILT) */}
            <motion.div 
              style={{ y: heroY }}
              initial={{ opacity: 0, rotate: 5 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="flex-1 w-full max-w-xl tilt-card"
            >
              <div className="grid grid-cols-3 grid-rows-3 gap-4 h-[500px] w-full p-4 bg-white/40 backdrop-blur-xl rounded-[2.5rem] border border-white/60 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] tilt-content">
                 
                 {HERO_IMAGES.map((img) => (
                    <div 
                       key={img.id}
                       onClick={handleDishClick}
                       className={`${img.col} relative rounded-3xl overflow-hidden cursor-pointer group shadow-md hover:shadow-xl transition-all duration-500`}
                    >
                       <img src={img.src} alt={img.label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                       
                       {/* Floating Badge */}
                       <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-bold px-2 py-1 rounded-lg">
                          {img.badge}
                       </div>

                       <div className="absolute bottom-4 left-4 text-white translate-y-2 group-hover:translate-y-0 transition-transform">
                          <p className="font-bold text-sm leading-tight">{img.label}</p>
                       </div>
                    </div>
                 ))}

              </div>
            </motion.div>

          </div>
        </div>
      </header>

      {/* ================= MAIN CONTENT ================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 pb-20">
        
        {/* 1. STATS BANNER */}
        <motion.div 
           initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
           className="bg-white rounded-[2rem] p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-wrap justify-around items-center gap-8"
        >
           <StatItem number="50k+" label="Happy Tummies" icon={<Heart className="text-red-500"/>} />
           <div className="h-12 w-px bg-gray-100 hidden md:block"></div>
           <StatItem number="4.9" label="Top Rated" icon={<Star className="text-yellow-500 fill-yellow-500"/>} />
           <div className="h-12 w-px bg-gray-100 hidden md:block"></div>
           <StatItem number="30m" label="Fast Delivery" icon={<Clock className="text-blue-500"/>} />
           <div className="h-12 w-px bg-gray-100 hidden md:block"></div>
           <StatItem number="100%" label="Hygienic" icon={<CheckCircle2 className="text-green-500"/>} />
        </motion.div>

        {/* 2. CHEF'S SPECIAL (Spotlight) */}
        <section>
           <SectionHeader title="Chef's Special" subtitle="Handpicked for the connoisseur in you" />
           <div className="relative rounded-[2.5rem] overflow-hidden h-[400px] md:h-[500px] group shadow-2xl">
              <img src="https://i.pinimg.com/1200x/84/bb/cd/84bbcdcd924f474d92e47dc9f7df9a31.jpg" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-110" alt="Special"/>
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 md:p-16 text-white max-w-2xl">
                 <div className="flex items-center gap-2 mb-4">
                    <ChefHat className="text-yellow-400"/>
                    <span className="text-yellow-400 font-bold tracking-widest uppercase text-sm">Today's Pick</span>
                 </div>
                 <h2 className="text-4xl md:text-6xl font-bold font-['Playfair_Display'] mb-6 leading-tight">Royal Rajasthani Thali</h2>
                 <p className="text-gray-300 text-lg mb-8 line-clamp-2">Experience the grandeur of Rajasthan with Dal Baati Churma, Gatte ki Sabzi, and more.</p>
                 <button onClick={handleDishClick} className="px-8 py-4 bg-red-600 text-white rounded-full font-bold text-lg shadow-lg hover:bg-red-700 transition-all flex items-center gap-2">
                    Order This Feast <ArrowRight size={20}/>
                 </button>
              </div>
           </div>
        </section>

        {/* 3. FRESH CRAVINGS (Masonry Grid) */}
        <section>
          <SectionHeader title="Fresh from Kitchen" subtitle="Explore the newest additions to our menu" />
          {loading ? (
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
                {[1,2,3].map(i => <div key={i} className="h-72 bg-gray-200 rounded-[2rem]" />)}
             </div>
          ) : (
            <div className="masonry-grid">
              {meals.slice(0, 8).map(meal => (
                <DishCard 
                  key={meal.id} 
                  data={meal} 
                  onClick={handleDishClick} 
                />
              ))}
            </div>
          )}
        </section>

        {/* 4. SUBSCRIPTION CTA (Dark Mode Card) */}
        <section className="relative overflow-hidden rounded-[3rem] bg-gray-900 text-white p-10 md:p-20 text-center shadow-2xl border border-gray-800">
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/20 rounded-full blur-[120px] pointer-events-none" />
           <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
           
           <div className="relative z-10 max-w-4xl mx-auto">
              <span className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-4 block">Membership</span>
              <h2 className="text-4xl md:text-6xl font-bold mb-6 font-['Playfair_Display']">
                 Eat Better. <span className="text-red-500">Pay Less.</span>
              </h2>
              <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
                 Unlock flat 30% OFF + Free Delivery on every order with Tiffino Pro. No hidden charges.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                 <button 
                   onClick={handleSubscriptionClick}
                   className="px-10 py-4 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-transform hover-shine shadow-xl flex items-center justify-center gap-2"
                 >
                    Get Pro <Sparkles size={18} className="text-yellow-500 fill-yellow-500"/>
                 </button>
                 <button onClick={handleDishClick} className="px-10 py-4 border border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all">
                    Explore Menu
                 </button>
              </div>
           </div>
        </section>

        {/* 5. POPULAR (Horizontal Scroll) */}
        <section>
           <SectionHeader title="Popular Cravings" subtitle="What everyone in your city is eating" />
           <div className="flex gap-6 overflow-x-auto hide-scrollbar pb-10 -mx-4 px-4 lg:mx-0 lg:px-0">
              {meals.slice(0, 6).reverse().map(meal => (
                <HorizontalCard 
                   key={meal.id} 
                   data={meal} 
                   onClick={handleDishClick}
                />
              ))}
           </div>
        </section>

      </main>
    </div>
  );
}

/* ================= HELPERS ================= */

function StatItem({ number, label, icon }) {
  return (
    <div className="flex flex-col items-center text-center">
       <div className="mb-2 p-2 bg-gray-50 rounded-full">{icon}</div>
       <p className="text-2xl font-extrabold text-gray-900">{number}</p>
       <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">{label}</p>
    </div>
  );
}

function SectionHeader({ title, subtitle }) {
  return (
    <div className="mb-10 flex items-end justify-between">
      <div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">{title}</h2>
        <p className="text-gray-500 mt-2 font-medium">{subtitle}</p>
      </div>
      <button className="hidden md:flex items-center gap-2 text-red-600 font-bold text-sm bg-red-50 px-4 py-2 rounded-full hover:bg-red-100 transition">
         View All <ArrowRight size={16} />
      </button>
    </div>
  );
}

function DishCard({ data, onClick }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      onClick={onClick}
      className="group relative mb-8 break-inside-avoid rounded-[2.5rem] bg-white border border-gray-100 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_25px_50px_-10px_rgba(0,0,0,0.1)] transition-all duration-500 cursor-pointer overflow-hidden"
    >
      <div className="relative h-64 overflow-hidden shimmer">
        <img src={data.image} alt={data.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute top-4 left-4 flex gap-2">
           {data.discount && <span className="px-3 py-1 bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg">{data.discount}</span>}
           <span className="px-3 py-1 bg-white/90 backdrop-blur text-gray-800 text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg flex items-center gap-1"><Clock size={10}/> {data.deliveryTime}</span>
        </div>
        <button className="absolute bottom-4 right-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:scale-110 transition"><Heart size={20}/></button>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
           <h3 className="font-bold text-xl text-gray-900 leading-tight w-3/4 group-hover:text-red-600 transition-colors">{data.name}</h3>
           <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-lg border border-green-100">
             <Star size={12} className="text-green-600 fill-green-600" />
             <span className="text-xs font-bold text-green-700">{data.rating}</span>
           </div>
        </div>
        <p className="text-sm text-gray-500 mb-6 line-clamp-1">{data.cuisine} • {data.city}</p>
        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
           <p className="text-2xl font-extrabold text-gray-900">₹{data.price}</p>
           <button className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-900 group-hover:bg-gray-900 group-hover:text-white transition-all shadow-sm">
             <ChevronRight size={24} />
           </button>
        </div>
      </div>
    </motion.div>
  );
}

function HorizontalCard({ data, onClick }) {
    return (
        <div 
          onClick={onClick}
          className="min-w-[300px] h-[380px] rounded-[2.5rem] relative overflow-hidden group shadow-lg cursor-pointer shimmer"
        >
            <img src={data.image} alt={data.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            
            <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold border border-white/20">
               Trending
            </div>

            <div className="absolute bottom-0 left-0 w-full p-8 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-2xl font-bold mb-2 leading-tight">{data.name}</h3>
                <p className="text-white/70 text-sm mb-6 line-clamp-1">{data.cuisine} • Chef's Special</p>
                <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-yellow-400">₹{data.price}</span>
                    <button className="bg-white text-black w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition shadow-lg">
                        <ArrowRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}