
// import { useMemo, useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { CUISINES } from "../../assets/data/dishes";
// import { useCart } from "../../context/CartContext";
// import { 
//   Star, 
//   Utensils, 
//   X, 
//   Filter, 
//   ChevronRight, 
//   Clock, 
//   Flame,
//   MapPin,
//   ShoppingCart,
//   Info,
//   Heart,
//   TrendingUp,
//   Award,
//   Sparkles
// } from "lucide-react";

// export default function Cuisine() {
//   // ---------------- State ----------------
//   const [selectedRegion, setSelectedRegion] = useState("All");
//   const [selectedState, setSelectedState] = useState("All");
//   const [vegFilter, setVegFilter] = useState("All");
//   const [sortOption, setSortOption] = useState("default");

//   // price slider dynamic bounds
//   const [maxPrice, setMaxPrice] = useState(1000);
//   const [priceMin, setPriceMin] = useState(0);
//   const [priceMax, setPriceMax] = useState(1000);

//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [hoveredDish, setHoveredDish] = useState(null);

//   const { addItem } = useCart();

//   // ---------------- Flatten data ----------------
//   const allDishes = useMemo(
//     () =>
//       CUISINES.flatMap((region) =>
//         region?.states?.flatMap((state) =>
//           state?.dishes?.map((dish) => ({
//             ...dish,
//             region: region?.region || "Unknown",
//             state: state?.name || "Unknown",
//           })) || []
//         ) || []
//       ),
//     []
//   );

//   // Unique region list
//   const regions = useMemo(() => {
//     const set = new Set(CUISINES.map((r) => r?.region || "Unknown"));
//     return ["All", ...Array.from(set)];
//   }, []);

//   // Unique states based on region
//   const states = useMemo(() => {
//     if (selectedRegion === "All") {
//       const allStates = CUISINES.flatMap((r) =>
//         r?.states?.map((s) => s?.name) || []
//       );
//       return ["All", ...new Set(allStates)];
//     } else {
//       const regionObj = CUISINES.find((r) => r?.region === selectedRegion);
//       const regionStates = regionObj?.states?.map((s) => s?.name) || [];
//       return ["All", ...new Set(regionStates)];
//     }
//   }, [selectedRegion]);

//   // ---------------- Price bounds ----------------
//   useEffect(() => {
//     if (allDishes.length) {
//       const prices = allDishes.map((d) => Number(d.price) || 0);
//       const dMin = Math.min(...prices);
//       const dMax = Math.max(...prices);
//       setPriceMin(dMin);
//       setPriceMax(dMax);
//       setMaxPrice(dMax);
//     }
//   }, [allDishes]);

//   // ---------------- Filtering + Sorting ----------------
//   const filteredDishes = useMemo(() => {
//     let list = [...allDishes];

//     if (selectedRegion !== "All") list = list.filter((d) => d.region === selectedRegion);
//     if (selectedState !== "All") list = list.filter((d) => d.state === selectedState);
//     if (vegFilter !== "All") list = list.filter((d) => (vegFilter === "Veg" ? d.veg : !d.veg));

//     list = list.filter((d) => Number(d.price) <= Number(maxPrice));

//     switch (sortOption) {
//       case "priceLowHigh":
//         list.sort((a, b) => a.price - b.price);
//         break;
//       case "priceHighLow":
//         list.sort((a, b) => b.price - a.price);
//         break;
//       case "ratingHighLow":
//         list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
//         break;
//       default:
//         break;
//     }

//     return list;
//   }, [allDishes, selectedRegion, selectedState, vegFilter, maxPrice, sortOption]);

//   // Clear all filters
//   const clearAll = () => {
//     setSelectedRegion("All");
//     setSelectedState("All");
//     setVegFilter("All");
//     setSortOption("default");
//     setMaxPrice(priceMax);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-white via-red-50/20 to-gray-50 px-4 md:px-10 lg:px-14 py-8">
//       {/* Decorative Background */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <motion.div
//           animate={{
//             scale: [1, 1.2, 1],
//             opacity: [0.03, 0.05, 0.03],
//           }}
//           transition={{
//             duration: 8,
//             repeat: Infinity,
//             ease: "easeInOut"
//           }}
//           className="absolute top-20 right-20 w-96 h-96 bg-[#E23744] rounded-full blur-3xl"
//         />
//         <motion.div
//           animate={{
//             scale: [1, 1.3, 1],
//             opacity: [0.02, 0.04, 0.02],
//           }}
//           transition={{
//             duration: 10,
//             repeat: Infinity,
//             ease: "easeInOut",
//             delay: 1
//           }}
//           className="absolute bottom-40 left-20 w-80 h-80 bg-[#E23744] rounded-full blur-3xl"
//         />
//       </div>

//       {/* Header */}
//       <motion.div 
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="relative text-center mb-8"
//       >
//         <motion.div
//           initial={{ scale: 0 }}
//           animate={{ scale: 1 }}
//           transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
//           className="inline-flex items-center gap-2 px-4 py-2 bg-[#E23744]/10 rounded-full mb-4"
//         >
//           <Sparkles className="w-4 h-4 text-[#E23744]" />
//           <span className="text-sm font-semibold text-[#E23744]">Discover India's Flavors</span>
//         </motion.div>

//         <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
//           Explore <span className="bg-gradient-to-r from-[#E23744] to-[#E23744]/70 bg-clip-text text-transparent">Indian Cuisines</span>
//         </h1>
//         <p className="text-gray-600 mt-3 max-w-2xl mx-auto text-sm md:text-base">
//           From Kashmir to Kanyakumari – taste the diversity of India, one dish at a time.
//         </p>

//         {/* Stats */}
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.4 }}
//           className="flex justify-center gap-6 mt-6 flex-wrap"
//         >
//           {[
//             { icon: <Utensils size={16} />, label: `${filteredDishes.length} Dishes` },
//             { icon: <MapPin size={16} />, label: `${regions.length - 1} Regions` },
//             { icon: <Award size={16} />, label: "Premium Quality" },
//           ].map((stat, i) => (
//             <motion.div
//               key={i}
//               whileHover={{ scale: 1.05 }}
//               className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm border border-gray-100"
//             >
//               <span className="text-[#E23744]">{stat.icon}</span>
//               <span className="text-sm font-medium text-gray-700">{stat.label}</span>
//             </motion.div>
//           ))}
//         </motion.div>
//       </motion.div>

//       {/* Mobile filter button */}
//       <div className="lg:hidden flex justify-end mb-4">
//         <motion.button
//           whileTap={{ scale: 0.95 }}
//           onClick={() => setMobileOpen(true)}
//           className="flex items-center gap-2 bg-[#E23744] text-white px-5 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all"
//         >
//           <Filter className="w-4 h-4" /> Filters & Sort
//         </motion.button>
//       </div>

//       <div className="relative grid lg:grid-cols-12 gap-6 mt-6">
//         {/* Sidebar Filters (Desktop) */}
//         <aside className="hidden lg:block lg:col-span-3">
//           <FilterPanel
//             {...{ 
//               regions, 
//               states, 
//               selectedRegion, 
//               setSelectedRegion, 
//               selectedState, 
//               setSelectedState, 
//               vegFilter, 
//               setVegFilter, 
//               priceMin, 
//               priceMax, 
//               maxPrice, 
//               setMaxPrice, 
//               sortOption, 
//               setSortOption, 
//               clearAll 
//             }}
//           />
//         </aside>

//         {/* Dishes Grid */}
//         <section className="lg:col-span-9">
//           {filteredDishes.length === 0 ? (
//             <motion.div
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               className="text-center py-20"
//             >
//               <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
//                 <Utensils className="w-10 h-10 text-gray-400" />
//               </div>
//               <p className="text-xl font-semibold text-gray-600 mb-2">No dishes found</p>
//               <p className="text-sm text-gray-500">Try adjusting your filters</p>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={clearAll}
//                 className="mt-6 px-6 py-2.5 bg-[#E23744] text-white rounded-xl font-semibold shadow-lg"
//               >
//                 Clear All Filters
//               </motion.button>
//             </motion.div>
//           ) : (
//             <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {filteredDishes.map((dish, i) => (
//                 <DishCard 
//                   key={dish.id} 
//                   dish={dish} 
//                   index={i}
//                   onAddToCart={() => addItem(dish)}
//                   isHovered={hoveredDish === dish.id}
//                   onHover={() => setHoveredDish(dish.id)}
//                   onLeave={() => setHoveredDish(null)}
//                 />
//               ))}
//             </div>
//           )}
//         </section>
//       </div>

//       {/* Mobile Filter Drawer */}
//       <AnimatePresence>
//         {mobileOpen && (
//           <>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setMobileOpen(false)}
//               className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
//             />
//             <motion.div
//               initial={{ x: "100%" }}
//               animate={{ x: 0 }}
//               exit={{ x: "100%" }}
//               transition={{ type: "spring", damping: 25, stiffness: 300 }}
//               className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white z-50 shadow-2xl overflow-y-auto"
//             >
//               <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center z-10">
//                 <h2 className="text-xl font-bold text-gray-800">Filters & Sort</h2>
//                 <motion.button 
//                   whileTap={{ scale: 0.9 }}
//                   onClick={() => setMobileOpen(false)}
//                   className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
//                 >
//                   <X className="w-5 h-5" />
//                 </motion.button>
//               </div>

//               <div className="p-6">
//                 <FilterPanel
//                   {...{ 
//                     regions, 
//                     states, 
//                     selectedRegion, 
//                     setSelectedRegion, 
//                     selectedState, 
//                     setSelectedState, 
//                     vegFilter, 
//                     setVegFilter, 
//                     priceMin, 
//                     priceMax, 
//                     maxPrice, 
//                     setMaxPrice, 
//                     sortOption, 
//                     setSortOption, 
//                     clearAll 
//                   }}
//                 />
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// /* ---------------- Dish Card with Hover Info ---------------- */
// function DishCard({ dish, index, onAddToCart, isHovered, onHover, onLeave }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 30 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.4, delay: index * 0.05 }}
//       whileHover={{ y: -8 }}
//       onHoverStart={onHover}
//       onHoverEnd={onLeave}
//       className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300"
//     >
//       {/* Image Section */}
//       <div className="relative overflow-hidden h-48">
//         <motion.img
//           src={dish.image}
//           alt={dish.name}
//           className="w-full h-full object-cover"
//           loading="lazy"
//           whileHover={{ scale: 1.1 }}
//           transition={{ duration: 0.4 }}
//         />
        
//         {/* Gradient Overlay */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

//         {/* Veg/Non-Veg Badge */}
//         <motion.span
//           initial={{ scale: 0 }}
//           animate={{ scale: 1 }}
//           transition={{ delay: index * 0.05 + 0.2, type: "spring" }}
//           className={`absolute top-3 left-3 text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-md shadow-lg ${
//             dish.veg 
//               ? "bg-green-500/90 text-white" 
//               : "bg-red-500/90 text-white"
//           }`}
//         >
//           {dish.veg ? "🌱 Veg" : "🍖 Non-Veg"}
//         </motion.span>

//         {/* Favorite Button */}
//         <motion.button
//           whileHover={{ scale: 1.15 }}
//           whileTap={{ scale: 0.9 }}
//           className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-[#E23744] hover:text-white transition-colors group/heart"
//         >
//           <Heart className="w-4 h-4 group-hover/heart:fill-current" />
//         </motion.button>

//         {/* Trending Badge */}
//         {dish.rating >= 4.5 && (
//           <motion.div
//             initial={{ x: -100 }}
//             animate={{ x: 0 }}
//             transition={{ delay: index * 0.05 + 0.3 }}
//             className="absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-1.5 bg-[#E23744] text-white text-xs font-bold rounded-full shadow-lg"
//           >
//             <TrendingUp className="w-3 h-3" />
//             Trending
//           </motion.div>
//         )}
//       </div>

//       {/* Content Section */}
//       <div className="p-4">
//         {/* Title */}
//         <h2 className="text-lg font-bold text-gray-800 line-clamp-1 group-hover:text-[#E23744] transition-colors">
//           {dish.name}
//         </h2>

//         {/* Location */}
//         <div className="flex items-center gap-1.5 mt-1.5 text-sm text-gray-600">
//           <MapPin className="w-3.5 h-3.5 text-[#E23744]" />
//           <span className="line-clamp-1">{dish.state} • {dish.region}</span>
//         </div>

//         {/* Rating & Price */}
//         <div className="flex items-center justify-between mt-3">
//           <div className="flex items-center gap-1.5">
//             <div className="flex items-center gap-1 px-2 py-1 bg-yellow-50 rounded-lg">
//               <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
//               <span className="text-sm font-bold text-gray-800">{dish.rating || "4.5"}</span>
//             </div>
//             <span className="text-xs text-gray-500">(200+)</span>
//           </div>
//           <span className="text-xl font-extrabold text-[#E23744]">₹{dish.price}</span>
//         </div>

//         {/* Delivery Time - Hover Info */}
//         <AnimatePresence>
//           {isHovered && (
//             <motion.div
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: "auto" }}
//               exit={{ opacity: 0, height: 0 }}
//               transition={{ duration: 0.3 }}
//               className="mt-3 pt-3 border-t border-gray-100 space-y-2"
//             >
//               <div className="flex items-center justify-between text-sm">
//                 <div className="flex items-center gap-2 text-gray-600">
//                   <Clock className="w-4 h-4 text-[#E23744]" />
//                   <span>Delivery</span>
//                 </div>
//                 <span className="font-semibold text-gray-800">25-30 min</span>
//               </div>
//               <div className="flex items-center justify-between text-sm">
//                 <div className="flex items-center gap-2 text-gray-600">
//                   <Flame className="w-4 h-4 text-[#E23744]" />
//                   <span>Spice Level</span>
//                 </div>
//                 <span className="font-semibold text-gray-800">Medium</span>
//               </div>
//               <div className="flex items-center justify-between text-sm">
//                 <div className="flex items-center gap-2 text-gray-600">
//                   <Info className="w-4 h-4 text-[#E23744]" />
//                   <span>Serves</span>
//                 </div>
//                 <span className="font-semibold text-gray-800">1-2 people</span>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Add to Cart Button */}
//         <motion.button
//           whileHover={{ scale: 1.03 }}
//           whileTap={{ scale: 0.97 }}
//           className="mt-4 w-full flex items-center justify-center gap-2 bg-[#E23744] text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
//           onClick={onAddToCart}
//         >
//           <ShoppingCart className="w-4 h-4" />
//           Add to Cart
//         </motion.button>
//       </div>
//     </motion.div>
//   );
// }

// /* ---------------- Filter Panel ---------------- */
// function FilterPanel({
//   regions,
//   states,
//   selectedRegion,
//   setSelectedRegion,
//   selectedState,
//   setSelectedState,
//   vegFilter,
//   setVegFilter,
//   priceMin,
//   priceMax,
//   maxPrice,
//   setMaxPrice,
//   sortOption,
//   setSortOption,
//   clearAll,
// }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, x: -20 }}
//       animate={{ opacity: 1, x: 0 }}
//       transition={{ duration: 0.5 }}
//       className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-24"
//     >
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
//           <Filter className="w-5 h-5 text-[#E23744]" />
//           Filters
//         </h2>
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={clearAll}
//           className="text-xs font-semibold px-3 py-1.5 rounded-lg border-2 border-[#E23744] text-[#E23744] hover:bg-[#E23744] hover:text-white transition-all"
//         >
//           Clear All
//         </motion.button>
//       </div>

//       <FilterSection title="By Region" icon={<MapPin size={16} />}>
//         <ButtonList
//           items={regions}
//           active={selectedRegion}
//           onSelect={(val) => {
//             setSelectedRegion(val);
//             setSelectedState("All");
//           }}
//           scroll
//         />
//       </FilterSection>

//       <FilterSection title="By State" icon={<MapPin size={16} />}>
//         <ButtonList items={states} active={selectedState} onSelect={setSelectedState} scroll />
//       </FilterSection>

//       <FilterSection title="Food Type" icon={<Utensils size={16} />}>
//         <ButtonRow items={["All", "Veg", "Non-Veg"]} active={vegFilter} onSelect={setVegFilter} />
//       </FilterSection>

//       <FilterSection title="Price Range" icon={<TrendingUp size={16} />}>
//         <div className="mb-3 flex justify-between items-center">
//           <span className="text-sm font-semibold text-gray-700">Up to</span>
//           <span className="text-lg font-bold text-[#E23744]">₹{maxPrice}</span>
//         </div>
//         <input
//           type="range"
//           min={priceMin}
//           max={priceMax}
//           step="10"
//           value={maxPrice}
//           onChange={(e) => setMaxPrice(Number(e.target.value))}
//           className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#E23744]"
//           style={{
//             background: `linear-gradient(to right, #E23744 0%, #E23744 ${((maxPrice - priceMin) / (priceMax - priceMin)) * 100}%, #e5e7eb ${((maxPrice - priceMin) / (priceMax - priceMin)) * 100}%, #e5e7eb 100%)`
//           }}
//         />
//         <div className="flex justify-between text-xs text-gray-500 mt-2">
//           <span>₹{priceMin}</span>
//           <span>₹{priceMax}</span>
//         </div>
//       </FilterSection>

//       <FilterSection title="Sort By" icon={<Award size={16} />}>
//         <select
//           value={sortOption}
//           onChange={(e) => setSortOption(e.target.value)}
//           className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm font-medium focus:border-[#E23744] focus:ring-2 focus:ring-[#E23744]/20 outline-none transition-all"
//         >
//           <option value="default">Default</option>
//           <option value="priceLowHigh">Price: Low to High</option>
//           <option value="priceHighLow">Price: High to Low</option>
//           <option value="ratingHighLow">Rating: High to Low</option>
//         </select>
//       </FilterSection>
//     </motion.div>
//   );
// }

// function FilterSection({ title, icon, children }) {
//   return (
//     <div className="mb-6 last:mb-0">
//       <h3 className="text-sm font-bold mb-3 text-gray-800 flex items-center gap-2">
//         <span className="text-[#E23744]">{icon}</span>
//         {title}
//       </h3>
//       {children}
//     </div>
//   );
// }

// function ButtonList({ items, active, onSelect, scroll }) {
//   const normalized = items.map((it) =>
//     typeof it === "string" ? { key: it, label: it } : it
//   );
//   return (
//     <div className={`flex flex-col gap-2 ${scroll ? "max-h-48 overflow-y-auto pr-1 custom-scrollbar" : ""}`}>
//       {normalized.map((it) => (
//         <motion.button
//           key={it.key}
//           onClick={() => onSelect(it.key)}
//           whileHover={{ scale: 1.02, x: 2 }}
//           whileTap={{ scale: 0.98 }}
//           className={`px-4 py-2.5 rounded-xl text-left text-sm font-semibold transition-all ${
//             active === it.key 
//               ? "bg-[#E23744] text-white shadow-lg" 
//               : "bg-gray-50 border-2 border-gray-100 hover:border-[#E23744]/30 text-gray-700"
//           }`}
//         >
//           {it.label}
//         </motion.button>
//       ))}
//     </div>
//   );
// }

// function ButtonRow({ items, active, onSelect }) {
//   return (
//     <div className="flex gap-2">
//       {items.map((type) => (
//         <motion.button
//           key={type}
//           onClick={() => onSelect(type)}
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex-1 text-center ${
//             active === type 
//               ? "bg-[#E23744] text-white shadow-lg" 
//               : "bg-gray-50 border-2 border-gray-100 hover:border-[#E23744]/30 text-gray-700"
//           }`}
//         >
//           {type}
//         </motion.button>
//       ))}
//     </div>
//   );
// }



// import React, { useEffect, useMemo, useRef, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { CUISINES } from "../../assets/data/dishes";
// import { useCart } from "../../context/CartContext";
// import {
//   Star,
//   Utensils,
//   X,
//   Filter,
//   ChevronRight,
//   Clock,
//   Flame,
//   MapPin,
//   ShoppingCart,
//   Info,
//   Heart,
//   TrendingUp,
//   Award,
//   Sparkles,
//   Filter as FilterIcon,
// } from "lucide-react";

// /**
//  * PRO-LEVEL Cuisine.jsx
//  * - Mobile-first responsive layout
//  * - Filter panel (desktop + mobile drawer)
//  * - Price slider (dynamic min/max)
//  * - Sorting / veg filter / region & state selections
//  * - Dish cards with hover detail, add-to-cart
//  * - Favorites persisted to localStorage
//  * - Skeleton loaders for initial render
//  * - Reduced-motion support
//  *
//  * Requirements:
//  * - TailwindCSS
//  * - framer-motion
//  * - lucide-react
//  * - useCart context provides addItem(dish)
//  */

// /* ---------------- Helpers & Config ---------------- */
// const BRAND = "#E23744";
// const STORAGE_FAV_KEY = "tiffino_favs_v1";
// const prefersReducedMotion =
//   typeof window !== "undefined" &&
//   window.matchMedia &&
//   window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// /* ---------------- Flatten CUISINES into dishes once ---------------- */
// function flattenCuisines(cuisines) {
//   return cuisines.flatMap((region) =>
//     (region.states || []).flatMap((st) =>
//       (st.dishes || []).map((dish) => ({
//         ...dish,
//         region: region.region ?? "Unknown",
//         state: st.name ?? "Unknown",
//       }))
//     )
//   );
// }

// /* ---------------- Main Component ---------------- */
// export default function Cuisine() {
//   const { addItem } = useCart();

//   // UI state
//   const [selectedRegion, setSelectedRegion] = useState("All");
//   const [selectedState, setSelectedState] = useState("All");
//   const [vegFilter, setVegFilter] = useState("All"); // All | Veg | Non-Veg
//   const [sortOption, setSortOption] = useState("default");
//   const [maxPrice, setMaxPrice] = useState(1000);
//   const [priceMin, setPriceMin] = useState(0);
//   const [priceMax, setPriceMax] = useState(1000);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [hoveredDish, setHoveredDish] = useState(null);
//   const [favorites, setFavorites] = useState(() => {
//     try {
//       const raw = localStorage.getItem(STORAGE_FAV_KEY);
//       return raw ? JSON.parse(raw) : [];
//     } catch {
//       return [];
//     }
//   });
//   const [loading, setLoading] = useState(true); // show skeleton initially

//   // Derived data
//   const allDishes = useMemo(() => flattenCuisines(CUISINES), []);
//   const regions = useMemo(() => {
//     const set = new Set(CUISINES.map((r) => r.region || "Unknown"));
//     return ["All", ...Array.from(set)];
//   }, []);
//   const states = useMemo(() => {
//     if (selectedRegion === "All") {
//       const allStates = CUISINES.flatMap((r) => (r.states || []).map((s) => s.name));
//       return ["All", ...Array.from(new Set(allStates))];
//     } else {
//       const regionObj = CUISINES.find((r) => r.region === selectedRegion);
//       const regionStates = (regionObj?.states || []).map((s) => s.name);
//       return ["All", ...Array.from(new Set(regionStates))];
//     }
//   }, [selectedRegion]);

//   // Price bounds
//   useEffect(() => {
//     if (!allDishes || !allDishes.length) return;
//     const prices = allDishes.map((d) => Number(d.price) || 0);
//     const min = Math.min(...prices);
//     const max = Math.max(...prices);
//     setPriceMin(min);
//     setPriceMax(max);
//     setMaxPrice(max);
//     // short skeleton delay to simulate loading UX
//     const t = setTimeout(() => setLoading(false), 450);
//     return () => clearTimeout(t);
//   }, [allDishes]);

//   // Persist favorites
//   useEffect(() => {
//     try {
//       localStorage.setItem(STORAGE_FAV_KEY, JSON.stringify(favorites));
//     } catch {}
//   }, [favorites]);

//   // Filtering + sorting (memoized)
//   const filteredDishes = useMemo(() => {
//     let list = [...allDishes];

//     if (selectedRegion !== "All") list = list.filter((d) => d.region === selectedRegion);
//     if (selectedState !== "All") list = list.filter((d) => d.state === selectedState);
//     if (vegFilter !== "All")
//       list = list.filter((d) => (vegFilter === "Veg" ? Boolean(d.veg) : !Boolean(d.veg)));

//     list = list.filter((d) => Number(d.price) <= Number(maxPrice));

//     switch (sortOption) {
//       case "priceLowHigh":
//         list.sort((a, b) => a.price - b.price);
//         break;
//       case "priceHighLow":
//         list.sort((a, b) => b.price - a.price);
//         break;
//       case "ratingHighLow":
//         list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
//         break;
//       default:
//         // default keep original order
//         break;
//     }

//     return list;
//   }, [allDishes, selectedRegion, selectedState, vegFilter, maxPrice, sortOption]);

//   // Utilities
//   const clearAll = () => {
//     setSelectedRegion("All");
//     setSelectedState("All");
//     setVegFilter("All");
//     setSortOption("default");
//     setMaxPrice(priceMax);
//   };

//   const toggleFav = (id) => {
//     setFavorites((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-white via-red-50/10 to-gray-50 px-4 md:px-10 lg:px-14 py-8">
//       {/* Decorative floating background - subtle */}
//       <FloatingDecor />

//       {/* Header */}
//       <motion.div
//         initial={{ opacity: 0, y: -12 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.55 }}
//         className="relative text-center mb-8"
//       >
//         <motion.div
//           initial={{ scale: 0 }}
//           animate={{ scale: 1 }}
//           transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
//           className="inline-flex items-center gap-2 px-4 py-2 bg-[rgba(226,55,68,0.08)] rounded-full mb-4"
//         >
//           <Sparkles className="w-4 h-4 text-[#E23744]" />
//           <span className="text-sm font-semibold text-[#E23744]">Discover India's Flavors</span>
//         </motion.div>

//         <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
//           Explore{" "}
//           <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#E23744] to-[#E23744]/70">
//             Indian Cuisines
//           </span>
//         </h1>

//         <p className="text-gray-600 mt-3 max-w-2xl mx-auto text-sm md:text-base">
//           From Kashmir to Kanyakumari — taste the diversity of India, one dish at a time.
//         </p>

//         {/* Stats */}
//         <motion.div
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.3 }}
//           className="flex justify-center gap-4 mt-6 flex-wrap"
//         >
//           <StatPill icon={<Utensils size={16} />} label={`${filteredDishes.length} Dishes`} />
//           <StatPill icon={<MapPin size={16} />} label={`${Math.max(0, regions.length - 1)} Regions`} />
//           <StatPill icon={<Award size={16} />} label="Premium Quality" />
//         </motion.div>
//       </motion.div>

//       {/* Mobile filter button */}
//       <div className="lg:hidden flex justify-end mb-4">
//         <motion.button
//           whileTap={{ scale: 0.97 }}
//           onClick={() => setMobileOpen(true)}
//           className="flex items-center gap-2 bg-[#E23744] text-white px-4 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all"
//           aria-label="Open filters"
//         >
//           <Filter className="w-4 h-4" />
//           Filters & Sort
//         </motion.button>
//       </div>

//       {/* Main grid: sidebar + content */}
//       <div className="relative grid lg:grid-cols-12 gap-6 mt-6">
//         {/* Sidebar (desktop) */}
//         <aside className="hidden lg:block lg:col-span-3">
//           <FilterPanel
//             regions={regions}
//             states={states}
//             selectedRegion={selectedRegion}
//             setSelectedRegion={(v) => {
//               setSelectedRegion(v);
//               setSelectedState("All");
//             }}
//             selectedState={selectedState}
//             setSelectedState={setSelectedState}
//             vegFilter={vegFilter}
//             setVegFilter={setVegFilter}
//             priceMin={priceMin}
//             priceMax={priceMax}
//             maxPrice={maxPrice}
//             setMaxPrice={setMaxPrice}
//             sortOption={sortOption}
//             setSortOption={setSortOption}
//             clearAll={clearAll}
//           />
//         </aside>

//         {/* Dish grid */}
//         <section className="lg:col-span-9">
//           {loading ? (
//             <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {Array.from({ length: 6 }).map((_, i) => (
//                 <CardSkeleton key={i} />
//               ))}
//             </div>
//           ) : filteredDishes.length === 0 ? (
//             <EmptyState onClear={clearAll} />
//           ) : (
//             <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {filteredDishes.map((dish, idx) => (
//                 <DishCard
//                   key={dish.id}
//                   dish={dish}
//                   index={idx}
//                   onAddToCart={() => addItem(dish)}
//                   isHovered={hoveredDish === dish.id}
//                   onHover={() => setHoveredDish(dish.id)}
//                   onLeave={() => setHoveredDish(null)}
//                   isFavorite={favorites.includes(dish.id)}
//                   toggleFav={() => toggleFav(dish.id)}
//                 />
//               ))}
//             </div>
//           )}
//         </section>
//       </div>

//       {/* Mobile Drawer */}
//       <AnimatePresence>
//         {mobileOpen && (
//           <>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setMobileOpen(false)}
//               className="fixed inset-0 bg-black/40 z-40"
//             />
//             <motion.div
//               initial={{ x: "100%" }}
//               animate={{ x: 0 }}
//               exit={{ x: "100%" }}
//               transition={{ type: "spring", damping: 24, stiffness: 260 }}
//               className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white z-50 shadow-2xl overflow-y-auto"
//             >
//               <div className="sticky top-0 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
//                 <h3 className="text-lg font-bold">Filters & Sort</h3>
//                 <button onClick={() => setMobileOpen(false)} aria-label="Close filters" className="p-2 rounded-md hover:bg-gray-100">
//                   <X />
//                 </button>
//               </div>

//               <div className="p-4">
//                 <FilterPanel
//                   regions={regions}
//                   states={states}
//                   selectedRegion={selectedRegion}
//                   setSelectedRegion={(v) => {
//                     setSelectedRegion(v);
//                     setSelectedState("All");
//                   }}
//                   selectedState={selectedState}
//                   setSelectedState={setSelectedState}
//                   vegFilter={vegFilter}
//                   setVegFilter={setVegFilter}
//                   priceMin={priceMin}
//                   priceMax={priceMax}
//                   maxPrice={maxPrice}
//                   setMaxPrice={setMaxPrice}
//                   sortOption={sortOption}
//                   setSortOption={setSortOption}
//                   clearAll={() => {
//                     clearAll();
//                     setMobileOpen(false);
//                   }}
//                 />
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// /* ---------------- Subcomponents ---------------- */

// function FloatingDecor() {
//   if (prefersReducedMotion) return null;
//   return (
//     <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
//       <motion.div
//         animate={{ y: [0, -18, 0], x: [0, 10, 0] }}
//         transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
//         className="absolute top-20 right-20 w-96 h-96 bg-[#E23744] rounded-full blur-3xl opacity-20"
//       />
//       <motion.div
//         animate={{ y: [0, 18, 0], x: [0, -6, 0] }}
//         transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
//         className="absolute bottom-36 left-10 w-80 h-80 bg-[#E23744] rounded-full blur-3xl opacity-18"
//       />
//     </div>
//   );
// }

// function StatPill({ icon, label }) {
//   return (
//     <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm border border-gray-100">
//       <span className="text-[#E23744]">{icon}</span>
//       <span className="text-sm font-medium text-gray-700">{label}</span>
//     </div>
//   );
// }

// function EmptyState({ onClear }) {
//   return (
//     <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
//       <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
//         <Utensils className="w-10 h-10 text-gray-400" />
//       </div>
//       <p className="text-xl font-semibold text-gray-700 mb-2">No dishes found</p>
//       <p className="text-sm text-gray-500">Try adjusting your filters to find more dishes.</p>
//       <motion.button
//         whileHover={{ scale: 1.03 }}
//         whileTap={{ scale: 0.97 }}
//         onClick={onClear}
//         className="mt-6 px-6 py-2.5 bg-[#E23744] text-white rounded-xl font-semibold shadow"
//       >
//         Clear All Filters
//       </motion.button>
//     </motion.div>
//   );
// }

// /* ---------------- Card skeleton ---------------- */
// function CardSkeleton() {
//   return (
//     <div className="animate-pulse bg-white rounded-2xl shadow-sm overflow-hidden">
//       <div className="h-44 bg-gray-200" />
//       <div className="p-4 space-y-3">
//         <div className="h-5 bg-gray-200 rounded w-3/4" />
//         <div className="h-3 bg-gray-200 rounded w-1/2" />
//         <div className="flex justify-between items-center">
//           <div className="h-6 bg-gray-200 rounded w-24" />
//           <div className="h-8 bg-gray-200 rounded w-20" />
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ---------------- Dish Card ---------------- */
// function DishCard({ dish, index, onAddToCart, isHovered, onHover, onLeave, isFavorite, toggleFav }) {
//   // small accessibility: keyboard focus triggers hover details
//   const cardRef = useRef(null);

//   return (
//     <motion.article
//       ref={cardRef}
//       initial={{ opacity: 0, y: 12 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.45, delay: (index % 6) * 0.035 }}
//       whileHover={!prefersReducedMotion ? { y: -8 } : {}}
//       onMouseEnter={onHover}
//       onMouseLeave={onLeave}
//       onFocus={onHover}
//       onBlur={onLeave}
//       className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl border border-gray-100 overflow-hidden transition"
//       tabIndex={0}
//       aria-labelledby={`dish-${dish.id}-title`}
//     >
//       {/* Image area */}
//       <div className="relative h-48 overflow-hidden">
//         <motion.img
//           src={dish.image}
//           alt={dish.name}
//           className="w-full h-full object-cover"
//           loading="lazy"
//           whileHover={!prefersReducedMotion ? { scale: 1.08 } : {}}
//           transition={{ duration: 0.45 }}
//         />

//         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

//         {/* Veg/Non-Veg badge */}
//         <span
//           className={`absolute top-3 left-3 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg ${
//             dish.veg ? "bg-green-500/90 text-white" : "bg-red-500/90 text-white"
//           }`}
//         >
//           {dish.veg ? "🌱 Veg" : "🍖 Non-Veg"}
//         </span>

//         {/* Favorite */}
//         <button
//           aria-pressed={isFavorite}
//           onClick={(e) => {
//             e.stopPropagation();
//             toggleFav();
//           }}
//           className="absolute top-3 right-3 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow hover:bg-[#E23744] hover:text-white transition-colors"
//           title={isFavorite ? "Remove favorite" : "Add favorite"}
//         >
//           <Heart className={`w-4 h-4 ${isFavorite ? "text-[#E23744] fill-[#E23744]" : "text-gray-400"}`} />
//         </button>

//         {/* Trending badge */}
//         {dish.rating >= 4.5 && (
//           <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-1.5 bg-[#E23744] text-white text-xs font-bold rounded-full shadow">
//             <TrendingUp className="w-3 h-3" />
//             Trending
//           </div>
//         )}
//       </div>

//       {/* Body */}
//       <div className="p-4">
//         <h3 id={`dish-${dish.id}-title`} className="text-lg font-bold text-gray-800 line-clamp-1 group-hover:text-[#E23744] transition-colors">
//           {dish.name}
//         </h3>

//         <div className="flex items-center gap-1.5 mt-1.5 text-sm text-gray-600">
//           <MapPin className="w-3.5 h-3.5 text-[#E23744]" />
//           <span className="line-clamp-1">{dish.state} • {dish.region}</span>
//         </div>

//         <div className="flex items-center justify-between mt-3">
//           <div className="flex items-center gap-2">
//             <div className="flex items-center gap-1 px-2 py-1 bg-yellow-50 rounded-lg">
//               <Star className="w-4 h-4 text-yellow-400" />
//               <span className="text-sm font-semibold text-gray-800">{dish.rating ?? "4.5"}</span>
//             </div>
//             <span className="text-xs text-gray-500">(200+)</span>
//           </div>

//           <div className="text-xl font-extrabold text-[#E23744]">₹{dish.price}</div>
//         </div>

//         {/* Hover info */}
//         <AnimatePresence>
//           {isHovered && (
//             <motion.div
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: "auto" }}
//               exit={{ opacity: 0, height: 0 }}
//               transition={{ duration: 0.28 }}
//               className="mt-3 pt-3 border-t border-gray-100 space-y-2"
//             >
//               <SmallInfo icon={<Clock className="w-4 h-4 text-[#E23744]" />} title="Delivery" value={dish.deliveryTime ?? "25-35 min"} />
//               <SmallInfo icon={<Flame className="w-4 h-4 text-[#E23744]" />} title="Spice Level" value="Medium" />
//               <SmallInfo icon={<Info className="w-4 h-4 text-[#E23744]" />} title="Serves" value="1-2 people" />
//             </motion.div>
//           )}
//         </AnimatePresence>

//         <motion.button
//           onClick={onAddToCart}
//           whileHover={!prefersReducedMotion ? { scale: 1.03 } : {}}
//           whileTap={!prefersReducedMotion ? { scale: 0.97 } : {}}
//           className="mt-4 w-full flex items-center justify-center gap-2 bg-[#E23744] text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition"
//           aria-label={`Add ${dish.name} to cart`}
//         >
//           <ShoppingCart className="w-4 h-4" />
//           Add to Cart
//         </motion.button>
//       </div>
//     </motion.article>
//   );
// }

// /* ---------------- Small info row ---------------- */
// function SmallInfo({ icon, title, value }) {
//   return (
//     <div className="flex items-center justify-between text-sm">
//       <div className="flex items-center gap-2 text-gray-600">
//         <div className="w-6 h-6 rounded-md bg-[#E23744]/10 flex items-center justify-center">{icon}</div>
//         <span>{title}</span>
//       </div>
//       <div className="font-semibold text-gray-800">{value}</div>
//     </div>
//   );
// }

// /* ---------------- Filter panel ---------------- */
// function FilterPanel({
//   regions,
//   states,
//   selectedRegion,
//   setSelectedRegion,
//   selectedState,
//   setSelectedState,
//   vegFilter,
//   setVegFilter,
//   priceMin,
//   priceMax,
//   maxPrice,
//   setMaxPrice,
//   sortOption,
//   setSortOption,
//   clearAll,
// }) {
//   // keyboard-friendly scroll ref for long lists
//   const regionRef = useRef(null);

//   return (
//     <motion.aside initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.45 }} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-24">
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
//           <FilterIcon className="w-5 h-5 text-[#E23744]" />
//           Filters
//         </h2>

//         <button onClick={clearAll} className="text-xs font-semibold px-3 py-1.5 rounded-lg border-2 border-[#E23744] text-[#E23744] hover:bg-[#E23744] hover:text-white transition">
//           Clear All
//         </button>
//       </div>

//       <FilterSection title="By Region" icon={<MapPin size={16} />}>
//         <div ref={regionRef} className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
//           {regions.map((r) => (
//             <button
//               key={r}
//               onClick={() => {
//                 setSelectedRegion(r);
//                 setSelectedState("All");
//                 // small scroll-to-top UX could be added
//               }}
//               className={`text-sm text-left px-4 py-2 rounded-xl transition ${
//                 selectedRegion === r ? "bg-[#E23744] text-white shadow-lg" : "bg-gray-50 border border-gray-100 text-gray-700 hover:border-[#E23744]/30"
//               }`}
//             >
//               {r}
//             </button>
//           ))}
//         </div>
//       </FilterSection>

//       <FilterSection title="By State" icon={<MapPin size={16} />}>
//         <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
//           {states.map((s) => (
//             <button
//               key={s}
//               onClick={() => setSelectedState(s)}
//               className={`text-sm text-left px-4 py-2 rounded-xl transition ${
//                 selectedState === s ? "bg-[#E23744] text-white shadow-lg" : "bg-gray-50 border border-gray-100 text-gray-700 hover:border-[#E23744]/30"
//               }`}
//             >
//               {s}
//             </button>
//           ))}
//         </div>
//       </FilterSection>

//       <FilterSection title="Food Type" icon={<Utensils size={16} />}>
//         <div className="flex gap-2">
//           {["All", "Veg", "Non-Veg"].map((type) => (
//             <button
//               key={type}
//               onClick={() => setVegFilter(type)}
//               className={`px-4 py-2 rounded-xl text-sm font-semibold transition flex-1 ${vegFilter === type ? "bg-[#E23744] text-white shadow-lg" : "bg-gray-50 border border-gray-100 text-gray-700 hover:border-[#E23744]/30"}`}
//             >
//               {type}
//             </button>
//           ))}
//         </div>
//       </FilterSection>

//       <FilterSection title="Price Range" icon={<TrendingUp size={16} />}>
//         <div className="mb-3 flex justify-between items-center">
//           <span className="text-sm font-semibold text-gray-700">Up to</span>
//           <span className="text-lg font-bold text-[#E23744]">₹{maxPrice}</span>
//         </div>

//         <input
//           type="range"
//           min={priceMin}
//           max={priceMax}
//           value={maxPrice}
//           onChange={(e) => setMaxPrice(Number(e.target.value))}
//           className="w-full h-2 bg-gray-200 rounded-lg appearance-none"
//           style={{
//             background: `linear-gradient(90deg, ${BRAND} 0%, ${BRAND} ${((maxPrice - priceMin) / (priceMax - priceMin)) * 100}%, #e5e7eb ${((maxPrice - priceMin) / (priceMax - priceMin)) * 100}%, #e5e7eb 100%)`,
//           }}
//         />
//         <div className="flex justify-between text-xs text-gray-500 mt-2">
//           <span>₹{priceMin}</span>
//           <span>₹{priceMax}</span>
//         </div>
//       </FilterSection>

//       <FilterSection title="Sort By" icon={<Award size={16} />}>
//         <select
//           value={sortOption}
//           onChange={(e) => setSortOption(e.target.value)}
//           className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm font-medium focus:border-[#E23744] focus:ring-2 focus:ring-[#E23744]/20 outline-none transition"
//           aria-label="Sort dishes"
//         >
//           <option value="default">Default</option>
//           <option value="priceLowHigh">Price: Low to High</option>
//           <option value="priceHighLow">Price: High to Low</option>
//           <option value="ratingHighLow">Rating: High to Low</option>
//         </select>
//       </FilterSection>
//     </motion.aside>
//   );
// }

// /* ---------------- Small helper components ---------------- */
// function FilterSection({ title, icon, children }) {
//   return (
//     <div className="mb-5 last:mb-0">
//       <h4 className="text-sm font-bold mb-3 text-gray-800 flex items-center gap-2">
//         <span className="text-[#E23744]">{icon}</span> {title}
//       </h4>
//       {children}
//     </div>
//   );
// }

// /* ---------------- Export end ---------------- */

// import { useMemo, useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { CUISINES } from "../../assets/data/dishes";
// import { useCart } from "../../context/CartContext";
// import {
//   Star,
//   Utensils,
//   X,
//   Filter,
//   Clock,
//   Flame,
//   MapPin,
//   ShoppingCart,
//   Info,
//   Heart,
//   TrendingUp,
//   Award,
//   Sparkles,
// } from "lucide-react";

// /* -------------------------------------------------------------------------- */
// /*                             SMALL COMPONENTS                                */
// /* -------------------------------------------------------------------------- */

// function StatPill({ icon, label }) {
//   return (
//     <div className="flex items-center gap-2 px-4 py-2 bg-white/60 border border-white/40 backdrop-blur-xl rounded-xl shadow">
//       <span className="text-[#E23744]">{icon}</span>
//       <span className="text-sm font-medium text-gray-800">{label}</span>
//     </div>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /*                           DETAIL ROW (GLASS UI)                             */
// /* -------------------------------------------------------------------------- */

// function DetailRow({ icon, title, value }) {
//   return (
//     <div className="flex items-center justify-between text-sm">
//       <div className="flex items-center gap-2 text-gray-700">
//         <div className="w-7 h-7 rounded-lg bg-white/40 border border-white/30 backdrop-blur-xl flex items-center justify-center">
//           {icon}
//         </div>
//         {title}
//       </div>

//       <span className="font-semibold text-gray-900">{value}</span>
//     </div>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /*                            DISH CARD (GLASS UI)                             */
// /* -------------------------------------------------------------------------- */

// function DishCard({
//   dish,
//   index,
//   hovered,
//   onHover,
//   onLeave,
//   isFavorite,
//   toggleFav,
//   addItem,
//   increment,
//   decrement,
//   cartQty,
// }) {
//   const hasQty = cartQty > 0;

//   return (
//     <motion.article
//       initial={{ opacity: 0, y: 18 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.45, delay: index * 0.04 }}
//       onMouseEnter={onHover}
//       onMouseLeave={onLeave}
//       className="
//         group relative 
//         rounded-3xl 
//         shadow-xl 
//         border border-white/20 
//         bg-white/20 
//         backdrop-blur-2xl 
//         overflow-hidden 
//         transition-all 
//         hover:shadow-2xl hover:-translate-y-1
//       "
//     >
//       {/* IMAGE */}
//       <div className="relative h-48 overflow-hidden">
//         <motion.img
//           src={dish.image}
//           alt={dish.name}
//           loading="lazy"
//           className="w-full h-full object-cover"
//           whileHover={{ scale: 1.1 }}
//           transition={{ duration: 0.5 }}
//         />

//         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition" />

//         {/* Veg / Non Veg */}
//         <span
//           className={`absolute top-3 left-3 px-3 py-1.5 text-xs font-bold rounded-full shadow-lg ${
//             dish.veg ? "bg-green-500/90 text-white" : "bg-red-500/90 text-white"
//           }`}
//         >
//           {dish.veg ? "🌱 Veg" : "🍖 Non-Veg"}
//         </span>

//         {/* Favorite */}
//         <button
//           onClick={(e) => {
//             e.stopPropagation();
//             toggleFav?.();
//           }}
//           className="
//             absolute top-3 right-3 
//             w-10 h-10 rounded-full 
//             bg-white/60 backdrop-blur-md
//             flex items-center justify-center shadow 
//             hover:bg-[#E23744] hover:text-white transition
//           "
//         >
//           <Heart
//             className={`w-4 h-4 ${
//               isFavorite ? "text-[#E23744] fill-[#E23744]" : "text-gray-500"
//             }`}
//           />
//         </button>

//         {/* Trending */}
//         {dish.rating >= 4.5 && (
//           <div
//             className="
//             absolute bottom-3 left-3 flex items-center gap-1.5 
//             px-3 py-1 bg-[#E23744]/95 text-white text-xs font-bold 
//             rounded-full shadow-lg
//             "
//           >
//             <TrendingUp className="w-3 h-3" />
//             Trending
//           </div>
//         )}
//       </div>

//       {/* CONTENT */}
//       <div className="p-4 relative z-10">
//         <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#E23744] transition">
//           {dish.name}
//         </h3>

//         <div className="flex items-center gap-1.5 mt-1.5 text-sm text-gray-700">
//           <MapPin className="w-3.5 h-3.5 text-[#E23744]" />
//           {dish.state} • {dish.region}
//         </div>

//         <div className="flex items-center justify-between mt-3">
//           <div className="flex items-center gap-2">
//             <div className="flex items-center gap-1 px-2 py-1 bg-yellow-50/70 border border-yellow-200 rounded-lg">
//               <Star className="w-4 h-4 text-yellow-500" />
//               <span className="text-sm font-semibold text-gray-800">
//                 {dish.rating ?? "4.5"}
//               </span>
//             </div>
//             <span className="text-xs text-gray-500">(200+)</span>
//           </div>

//           <span className="text-xl font-extrabold text-[#E23744]">₹{dish.price}</span>
//         </div>

//         {/* HOVER DETAILS */}
//         <AnimatePresence>
//           {hovered && (
//             <motion.div
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: "auto" }}
//               exit={{ opacity: 0, height: 0 }}
//               className="mt-3 pt-3 border-t border-white/40 space-y-2"
//             >
//               <DetailRow
//                 icon={<Clock className="w-4 h-4 text-[#E23744]" />}
//                 title="Delivery"
//                 value={dish.deliveryTime ?? "25-35 min"}
//               />
//               <DetailRow
//                 icon={<Flame className="w-4 h-4 text-[#E23744]" />}
//                 title="Spice Level"
//                 value="Medium"
//               />
//               <DetailRow
//                 icon={<Info className="w-4 h-4 text-[#E23744]" />}
//                 title="Serves"
//                 value="1-2 people"
//               />
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* ADD / QTY BUTTON */}
//         <div className="mt-4">
//           {!hasQty ? (
//             <motion.button
//               whileHover={{ scale: 1.04 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => addItem(dish)}
//               className="
//                 w-full py-3 rounded-xl 
//                 bg-[#E23744] text-white font-semibold 
//                 shadow-lg hover:shadow-[#E23744]/40 
//                 transition-all backdrop-blur-xl
//               "
//             >
//               Add to Cart
//             </motion.button>
//           ) : (
//             <motion.div
//               initial={{ opacity: 0, scale: 0.94 }}
//               animate={{ opacity: 1, scale: 1 }}
//               className="
//                 flex items-center justify-between
//                 bg-white/40 backdrop-blur-xl 
//                 border border-white/40 rounded-xl p-2
//               "
//             >
//               <motion.button
//                 whileTap={{ scale: 0.9 }}
//                 onClick={() => decrement(dish.id)}
//                 className="w-10 h-10 rounded-xl bg-white shadow text-[#E23744] text-xl font-bold"
//               >
//                 −
//               </motion.button>

//               <span className="text-lg font-bold text-gray-900">{cartQty}</span>

//               <motion.button
//                 whileTap={{ scale: 0.9 }}
//                 onClick={() => increment(dish.id)}
//                 className="w-10 h-10 rounded-xl bg-[#E23744] text-white shadow-xl text-xl font-bold"
//               >
//                 +
//               </motion.button>
//             </motion.div>
//           )}
//         </div>
//       </div>
//     </motion.article>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /*                                FILTER PANEL                                */
// /* -------------------------------------------------------------------------- */

// function FilterGroup({ icon, title, children }) {
//   return (
//     <div className="mb-6">
//       <h3 className="text-sm font-bold mb-3 flex items-center gap-2 text-gray-800">
//         <span className="text-[#E23744]">{icon}</span>
//         {title}
//       </h3>
//       {children}
//     </div>
//   );
// }

// function VerticalButtons({ items, active, onSelect }) {
//   return (
//     <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
//       {items.map((it) => (
//         <button
//           key={it}
//           onClick={() => onSelect(it)}
//           className={`px-4 py-2 rounded-xl text-left text-sm transition
//             ${
//               active === it
//                 ? "bg-[#E23744] text-white shadow"
//                 : "bg-white/40 backdrop-blur-xl border border-white/30 hover:border-[#E23744]/40"
//             }`}
//         >
//           {it}
//         </button>
//       ))}
//     </div>
//   );
// }

// function RowButtons({ items, active, onSelect }) {
//   return (
//     <div className="flex gap-2">
//       {items.map((t) => (
//         <button
//           key={t}
//           onClick={() => onSelect(t)}
//           className={`px-4 py-2 rounded-xl text-sm font-semibold flex-1 transition
//             ${
//               active === t
//                 ? "bg-[#E23744] text-white shadow"
//                 : "bg-white/40 backdrop-blur-xl border border-white/30 hover:border-[#E23744]/40"
//             }`}
//         >
//           {t}
//         </button>
//       ))}
//     </div>
//   );
// }

// function FilterPanel({
//   regions,
//   states,
//   selectedRegion,
//   setSelectedRegion,
//   selectedState,
//   setSelectedState,
//   vegFilter,
//   setVegFilter,
//   priceMin,
//   priceMax,
//   maxPrice,
//   setMaxPrice,
//   sortOption,
//   setSortOption,
//   clearAll,
// }) {
//   return (
//     <motion.aside
//       initial={{ opacity: 0, x: -6 }}
//       animate={{ opacity: 1, x: 0 }}
//       className="bg-white/50 backdrop-blur-2xl border border-white/30 rounded-3xl p-6 shadow-xl sticky top-24"
//     >
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-xl font-bold flex items-center gap-2 text-gray-800">
//           <Filter className="w-5 h-5 text-[#E23744]" />
//           Filters
//         </h2>

//         <button
//           onClick={clearAll}
//           className="px-3 py-1.5 rounded-lg border border-[#E23744] text-[#E23744] text-xs font-semibold hover:bg-[#E23744] hover:text-white transition"
//         >
//           Clear All
//         </button>
//       </div>

//       <FilterGroup icon={<MapPin size={16} />} title="By Region">
//         <VerticalButtons
//           items={regions}
//           active={selectedRegion}
//           onSelect={(v) => {
//             setSelectedRegion(v);
//             setSelectedState("All");
//           }}
//         />
//       </FilterGroup>

//       <FilterGroup icon={<MapPin size={16} />} title="By State">
//         <VerticalButtons items={states} active={selectedState} onSelect={setSelectedState} />
//       </FilterGroup>

//       <FilterGroup icon={<Utensils size={16} />} title="Food Type">
//         <RowButtons items={["All", "Veg", "Non-Veg"]} active={vegFilter} onSelect={setVegFilter} />
//       </FilterGroup>

//       <FilterGroup icon={<TrendingUp size={16} />} title="Price Range">
//         <div className="flex justify-between text-sm font-semibold text-gray-700 mb-2">
//           <span>Up to</span>
//           <span className="text-[#E23744]">₹{maxPrice}</span>
//         </div>

//         <input
//           type="range"
//           min={priceMin}
//           max={priceMax}
//           value={maxPrice}
//           onChange={(e) => setMaxPrice(Number(e.target.value))}
//           className="w-full"
//         />

//         <div className="flex justify-between text-xs text-gray-500 mt-1">
//           <span>₹{priceMin}</span>
//           <span>₹{priceMax}</span>
//         </div>
//       </FilterGroup>

//       <FilterGroup icon={<Award size={16} />} title="Sort By">
//         <select
//           value={sortOption}
//           onChange={(e) => setSortOption(e.target.value)}
//           className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/30 backdrop-blur-xl text-sm"
//         >
//           <option value="default">Default</option>
//           <option value="priceLowHigh">Price: Low to High</option>
//           <option value="priceHighLow">Price: High to Low</option>
//           <option value="ratingHighLow">Rating: High to Low</option>
//         </select>
//       </FilterGroup>
//     </motion.aside>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /*                                HEADER SECTION                              */
// /* -------------------------------------------------------------------------- */

// function HeaderSection({ filteredCount, regionCount }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: -8 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="text-center mb-10"
//     >
//       <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#E23744]/10 rounded-full backdrop-blur-xl border border-[#E23744]/20 mb-3">
//         <Sparkles className="w-4 h-4 text-[#E23744]" />
//         <span className="text-sm font-semibold text-[#E23744]">
//           Discover India’s Flavors
//         </span>
//       </div>

//       <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
//         Explore{" "}
//         <span className="bg-gradient-to-r from-[#E23744] to-[#E23744]/70 bg-clip-text text-transparent">
//           Indian Cuisines
//         </span>
//       </h1>

//       <p className="text-gray-600 mt-3 max-w-2xl mx-auto text-sm md:text-base">
//         From Kashmir to Kanyakumari — taste the diversity of India one dish at a time.
//       </p>

//       <div className="flex justify-center gap-4 mt-6 flex-wrap">
//         <StatPill icon={<Utensils size={16} />} label={`${filteredCount} Dishes`} />
//         <StatPill icon={<MapPin size={16} />} label={`${regionCount} Regions`} />
//         <StatPill icon={<Award size={16} />} label="Premium Quality" />
//       </div>
//     </motion.div>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /*                                EMPTY STATE                                 */
// /* -------------------------------------------------------------------------- */

// function EmptyState({ clearAll }) {
//   return (
//     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
//       <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/40 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-xl">
//         <Utensils className="w-10 h-10 text-gray-400" />
//       </div>

//       <h2 className="text-xl font-semibold text-gray-700">No dishes found</h2>
//       <p className="text-sm text-gray-500">Try adjusting your filters</p>

//       <button
//         onClick={clearAll}
//         className="
//           mt-4 px-6 py-2 
//           bg-[#E23744] text-white 
//           rounded-xl shadow-lg 
//           hover:shadow-[#E23744]/40 
//           transition
//         "
//       >
//         Reset Filters
//       </button>
//     </motion.div>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /*                             FLOATING DECOR (GLASS)                         */
// /* -------------------------------------------------------------------------- */

// function FloatingDecor() {
//   return (
//     <div className="fixed inset-0 pointer-events-none -z-10">
//       <motion.div
//         animate={{ y: [0, -15, 0], opacity: [0.5, 0.9, 0.5] }}
//         transition={{ duration: 10, repeat: Infinity }}
//         className="absolute top-24 right-24 w-96 h-96 bg-[#E23744]/15 rounded-full blur-3xl"
//       />
//       <motion.div
//         animate={{ y: [0, 20, 0], opacity: [0.5, 0.9, 0.5] }}
//         transition={{ duration: 12, repeat: Infinity }}
//         className="absolute bottom-36 left-10 w-80 h-80 bg-[#E23744]/15 rounded-full blur-3xl"
//       />
//     </div>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /*                                MOBILE FILTERS                              */
// /* -------------------------------------------------------------------------- */

// function MobileFilters({
//   open,
//   onClose,
//   regions,
//   states,
//   selectedRegion,
//   setSelectedRegion,
//   selectedState,
//   setSelectedState,
//   vegFilter,
//   setVegFilter,
//   priceMin,
//   priceMax,
//   maxPrice,
//   setMaxPrice,
//   sortOption,
//   setSortOption,
//   clearAll,
// }) {
//   return (
//     <AnimatePresence>
//       {open && (
//         <>
//           <motion.div
//             className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
//             onClick={onClose}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           />

//           <motion.div
//             initial={{ x: "100%" }}
//             animate={{ x: 0 }}
//             exit={{ x: "100%" }}
//             transition={{ type: "spring", damping: 22, stiffness: 260 }}
//             className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white/70 backdrop-blur-2xl border-l border-white/30 z-50 shadow-2xl overflow-y-auto"
//           >
//             <div className="sticky top-0 bg-white/70 backdrop-blur-xl border-b border-white/20 px-4 py-3 flex items-center justify-between">
//               <h3 className="text-lg font-bold text-gray-800">Filters & Sort</h3>
//               <button onClick={onClose} className="p-2 rounded hover:bg-white/40">
//                 <X />
//               </button>
//             </div>

//             <div className="p-4">
//               <FilterPanel
//                 regions={regions}
//                 states={states}
//                 selectedRegion={selectedRegion}
//                 setSelectedRegion={(v) => {
//                   setSelectedRegion(v);
//                   setSelectedState("All");
//                 }}
//                 selectedState={selectedState}
//                 setSelectedState={setSelectedState}
//                 vegFilter={vegFilter}
//                 setVegFilter={setVegFilter}
//                 priceMin={priceMin}
//                 priceMax={priceMax}
//                 maxPrice={maxPrice}
//                 setMaxPrice={setMaxPrice}
//                 sortOption={sortOption}
//                 setSortOption={setSortOption}
//                 clearAll={() => {
//                   clearAll();
//                   onClose();
//                 }}
//               />
//             </div>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /*                                MAIN EXPORT                                   */
// /* -------------------------------------------------------------------------- */

// export default function Cuisine() {
//   /* ------------------- STATE ------------------- */
//   const [selectedRegion, setSelectedRegion] = useState("All");
//   const [selectedState, setSelectedState] = useState("All");
//   const [vegFilter, setVegFilter] = useState("All");
//   const [sortOption, setSortOption] = useState("default");

//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [hoveredDish, setHoveredDish] = useState(null);

//   const [priceMin, setPriceMin] = useState(0);
//   const [priceMax, setPriceMax] = useState(1000);
//   const [maxPrice, setMaxPrice] = useState(1000);

//   const { items, addItem, increment, decrement } = useCart();

//   /* ------------------ Flatten Dishes ------------------ */
//   const allDishes = useMemo(
//     () =>
//       CUISINES.flatMap((region) =>
//         region.states.flatMap((state) =>
//           state.dishes.map((dish) => ({
//             ...dish,
//             region: region.region,
//             state: state.name,
//           }))
//         )
//       ),
//     []
//   );

//   /* ------------------ Regions ------------------ */
//   const regions = useMemo(() => {
//     return ["All", ...new Set(CUISINES.map((r) => r.region))];
//   }, []);

//   /* ------------------ States ------------------ */
//   const states = useMemo(() => {
//     if (selectedRegion === "All") {
//       const all = CUISINES.flatMap((r) => r.states.map((s) => s.name));
//       return ["All", ...new Set(all)];
//     }
//     return ["All", ...CUISINES.find((r) => r.region === selectedRegion).states.map((s) => s.name)];
//   }, [selectedRegion]);

//   /* ------------------ Price Setup ------------------ */
//   useEffect(() => {
//     const p = allDishes.map((d) => Number(d.price));
//     const min = Math.min(...p);
//     const max = Math.max(...p);
//     setPriceMin(min);
//     setPriceMax(max);
//     setMaxPrice(max);
//   }, [allDishes]);

//   /* ------------------ Filtering Logic ------------------ */
//   const filteredDishes = useMemo(() => {
//     let data = [...allDishes];

//     if (selectedRegion !== "All") data = data.filter((d) => d.region === selectedRegion);
//     if (selectedState !== "All") data = data.filter((d) => d.state === selectedState);
//     if (vegFilter !== "All") data = data.filter((d) => (vegFilter === "Veg" ? d.veg : !d.veg));
//     data = data.filter((d) => d.price <= maxPrice);

//     switch (sortOption) {
//       case "priceLowHigh":
//         data.sort((a, b) => a.price - b.price);
//         break;
//       case "priceHighLow":
//         data.sort((a, b) => b.price - a.price);
//         break;
//       case "ratingHighLow":
//         data.sort((a, b) => b.rating - a.rating);
//         break;
//     }

//     return data;
//   }, [allDishes, selectedRegion, selectedState, vegFilter, maxPrice, sortOption]);

//   /* ------------------ Clear Filters ------------------ */
//   const clearAll = () => {
//     setSelectedRegion("All");
//     setSelectedState("All");
//     setVegFilter("All");
//     setSortOption("default");
//     setMaxPrice(priceMax);
//   };

//   /* ------------------ UI ------------------ */
//   return (
//     <>
//       <FloatingDecor />

//       <div className="min-h-screen px-4 md:px-10 lg:px-14 py-8 bg-gradient-to-b from-white/90 via-red-50/20 to-gray-50/60">

//         <HeaderSection filteredCount={filteredDishes.length} regionCount={regions.length - 1} />

//         {/* MOBILE FILTER BUTTON */}
//         <div className="lg:hidden flex justify-end mb-5">
//           <button
//             onClick={() => setMobileOpen(true)}
//             className="bg-[#E23744] text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-2"
//           >
//             <Filter className="w-4 h-4" /> Filters & Sort
//           </button>
//         </div>

//         {/* MAIN GRID */}
//         <div className="grid lg:grid-cols-12 gap-6">

//           {/* DESKTOP FILTERS */}
//           <div className="hidden lg:block lg:col-span-3">
//             <FilterPanel
//               regions={regions}
//               states={states}
//               selectedRegion={selectedRegion}
//               setSelectedRegion={setSelectedRegion}
//               selectedState={selectedState}
//               setSelectedState={setSelectedState}
//               vegFilter={vegFilter}
//               setVegFilter={setVegFilter}
//               priceMin={priceMin}
//               priceMax={priceMax}
//               maxPrice={maxPrice}
//               setMaxPrice={setMaxPrice}
//               sortOption={sortOption}
//               setSortOption={setSortOption}
//               clearAll={clearAll}
//             />
//           </div>

//           {/* DISHES GRID */}
//           <div className="lg:col-span-9">
//             {filteredDishes.length === 0 ? (
//               <EmptyState clearAll={clearAll} />
//             ) : (
//               <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {filteredDishes.map((dish, i) => {
//                   const cartQty = items.find((it) => it.foodId === dish.id)?.quantity || 0;

//                   return (
//                     <DishCard
//                       key={dish.id}
//                       dish={dish}
//                       index={i}
//                       hovered={hoveredDish === dish.id}
//                       onHover={() => setHoveredDish(dish.id)}
//                       onLeave={() => setHoveredDish(null)}
//                       isFavorite={false}
//                       toggleFav={() => {}}
//                       addItem={addItem}
//                       increment={increment}
//                       decrement={decrement}
//                       cartQty={cartQty}
//                     />
//                   );
//                 })}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* MOBILE FILTER DRAWER */}
//       <MobileFilters
//         open={mobileOpen}
//         onClose={() => setMobileOpen(false)}
//         regions={regions}
//         states={states}
//         selectedRegion={selectedRegion}
//         setSelectedRegion={setSelectedRegion}
//         selectedState={selectedState}
//         setSelectedState={setSelectedState}
//         vegFilter={vegFilter}
//         setVegFilter={setVegFilter}
//         priceMin={priceMin}
//         priceMax={priceMax}
//         maxPrice={maxPrice}
//         setMaxPrice={setMaxPrice}
//         sortOption={sortOption}
//         setSortOption={setSortOption}
//         clearAll={clearAll}
//       />
//     </>
//   );
// }










// import { useMemo, useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { CUISINES } from "../../assets/data/dishes";
// import { useCart } from "../../context/CartContext";
// import { getUserCuisines } from "../../api/api";
// import {
//   Star,
//   Utensils,
//   X,
//   Filter,
//   Clock,
//   Flame,
//   MapPin,
//   ShoppingCart,
//   Info,
//   Heart,
//   TrendingUp,
//   Award,
//   Sparkles,
// } from "lucide-react";

// /* -------------------------------------------------------------------------- */
// /*                             SMALL COMPONENTS                                */
// /* -------------------------------------------------------------------------- */

// function StatPill({ icon, label }) {
//   return (
//     <div className="flex items-center gap-2 px-4 py-2 bg-white/60 border border-white/40 backdrop-blur-xl rounded-xl shadow">
//       <span className="text-[#E23744]">{icon}</span>
//       <span className="text-sm font-medium text-gray-800">{label}</span>
//     </div>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /*                           DETAIL ROW (GLASS UI)                             */
// /* -------------------------------------------------------------------------- */

// function DetailRow({ icon, title, value }) {
//   return (
//     <div className="flex items-center justify-between text-sm">
//       <div className="flex items-center gap-2 text-gray-700">
//         <div className="w-7 h-7 rounded-lg bg-white/40 border border-white/30 backdrop-blur-xl flex items-center justify-center">
//           {icon}
//         </div>
//         {title}
//       </div>

//       <span className="font-semibold text-gray-900">{value}</span>
//     </div>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /*                            DISH CARD (GLASS UI)                             */
// /* -------------------------------------------------------------------------- */

// function DishCard({
//   dish,
//   index,
//   hovered,
//   onHover,
//   onLeave,
//   isFavorite,
//   toggleFav,
//   addItem,
//   increment,
//   decrement,
//   cartQty,
//   badgeLabel,
// }) {
//   const hasQty = cartQty > 0;

//   return (
//     <motion.article
//       initial={{ opacity: 0, y: 18 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.45, delay: index * 0.04 }}
//       onMouseEnter={onHover}
//       onMouseLeave={onLeave}
//       className="
//         group relative 
//         rounded-3xl 
//         shadow-xl 
//         border border-white/20 
//         bg-white/20 
//         backdrop-blur-2xl 
//         overflow-hidden 
//         transition-all 
//         hover:shadow-2xl hover:-translate-y-1
//       "
//     >
//       {/* IMAGE */}
//       <div className="relative h-48 overflow-hidden">
//         <motion.img
//           src={dish.image}
//           alt={dish.name}
//           loading="lazy"
//           className="w-full h-full object-cover"
//           whileHover={{ scale: 1.1 }}
//           transition={{ duration: 0.5 }}
//         />

//         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition" />

//         {/* Veg / Non Veg */}
//         <span
//           className={`absolute top-3 left-3 px-3 py-1.5 text-xs font-bold rounded-full shadow-lg ${
//             dish.veg ? "bg-green-500/90 text-white" : "bg-red-500/90 text-white"
//           }`}
//         >
//           {dish.veg ? "🌱 Veg" : "🍖 Non-Veg"}
//         </span>

//         {/* Favorite */}
//         <button
//           onClick={(e) => {
//             e.stopPropagation();
//             toggleFav?.();
//           }}
//           className="
//             absolute top-3 right-3 
//             w-10 h-10 rounded-full 
//             bg-white/60 backdrop-blur-md
//             flex items-center justify-center shadow 
//             hover:bg-[#E23744] hover:text-white transition
//           "
//         >
//           <Heart
//             className={`w-4 h-4 ${
//               isFavorite ? "text-[#E23744] fill-[#E23744]" : "text-gray-500"
//             }`}
//           />
//         </button>

//         {/* Trending */}
//         {dish.rating >= 4.5 && (
//           <div
//             className="
//             absolute bottom-3 left-3 flex items-center gap-1.5 
//             px-3 py-1 bg-[#E23744]/95 text-white text-xs font-bold 
//             rounded-full shadow-lg
//             "
//           >
//             <TrendingUp className="w-3 h-3" />
//             Trending
//           </div>
//         )}

//         {/* Badge for "Something New" section */}
//         {badgeLabel && (
//           <div className="absolute bottom-3 right-3 px-3 py-1 bg-white/80 text-xs font-bold rounded-full text-[#E23744] shadow">
//             {badgeLabel}
//           </div>
//         )}
//       </div>

//       {/* CONTENT */}
//       <div className="p-4 relative z-10">
//         <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#E23744] transition">
//           {dish.name}
//         </h3>

//         <div className="flex items-center gap-1.5 mt-1.5 text-sm text-gray-700">
//           <MapPin className="w-3.5 h-3.5 text-[#E23744]" />
//           {dish.state} • {dish.region}
//         </div>

//         <div className="flex items-center justify-between mt-3">
//           <div className="flex items-center gap-2">
//             <div className="flex items-center gap-1 px-2 py-1 bg-yellow-50/70 border border-yellow-200 rounded-lg">
//               <Star className="w-4 h-4 text-yellow-500" />
//               <span className="text-sm font-semibold text-gray-800">
//                 {dish.rating ?? "4.5"}
//               </span>
//             </div>
//             <span className="text-xs text-gray-500">(200+)</span>
//           </div>

//           <span className="text-xl font-extrabold text-[#E23744]">
//             ₹{dish.price}
//           </span>
//         </div>

//         {/* HOVER DETAILS (FIXED HEIGHT, NO LAYOUT SHIFT) */}
//         <div className="mt-3 pt-3 border-t border-white/40 min-h-[88px]">
//           <AnimatePresence>
//             {hovered && (
//               <motion.div
//                 initial={{ opacity: 0, y: 8 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: 8 }}
//                 className="space-y-2"
//               >
//                 <DetailRow
//                   icon={<Clock className="w-4 h-4 text-[#E23744]" />}
//                   title="Delivery"
//                   value={dish.deliveryTime ?? "25-35 min"}
//                 />
//                 <DetailRow
//                   icon={<Flame className="w-4 h-4 text-[#E23744]" />}
//                   title="Spice Level"
//                   value="Medium"
//                 />
//                 <DetailRow
//                   icon={<Info className="w-4 h-4 text-[#E23744]" />}
//                   title="Serves"
//                   value="1-2 people"
//                 />
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>

//         {/* ADD / QTY BUTTON */}
//         <div className="mt-4">
//           {!hasQty ? (
//             <motion.button
//               whileHover={{ scale: 1.04 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => addItem(dish)}
//               className="
//                 w-full py-3 rounded-xl 
//                 bg-[#E23744] text-white font-semibold 
//                 shadow-lg hover:shadow-[#E23744]/40 
//                 transition-all backdrop-blur-xl
//               "
//             >
//               Add to Cart
//             </motion.button>
//           ) : (
//             <motion.div
//               initial={{ opacity: 0, scale: 0.94 }}
//               animate={{ opacity: 1, scale: 1 }}
//               className="
//                 flex items-center justify-between
//                 bg-white/40 backdrop-blur-xl 
//                 border border-white/40 rounded-xl p-2
//               "
//             >
//               <motion.button
//                 whileTap={{ scale: 0.9 }}
//                 onClick={() => decrement(dish.id)}
//                 className="w-10 h-10 rounded-xl bg-white shadow text-[#E23744] text-xl font-bold"
//               >
//                 −
//               </motion.button>

//               <span className="text-lg font-bold text-gray-900">{cartQty}</span>

//               <motion.button
//                 whileTap={{ scale: 0.9 }}
//                 onClick={() => increment(dish.id)}
//                 className="w-10 h-10 rounded-xl bg-[#E23744] text-white shadow-xl text-xl font-bold"
//               >
//                 +
//               </motion.button>
//             </motion.div>
//           )}
//         </div>
//       </div>
//     </motion.article>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /*                                FILTER PANEL                                */
// /* -------------------------------------------------------------------------- */

// function FilterGroup({ icon, title, children }) {
//   return (
//     <div className="mb-6">
//       <h3 className="text-sm font-bold mb-3 flex items-center gap-2 text-gray-800">
//         <span className="text-[#E23744]">{icon}</span>
//         {title}
//       </h3>
//       {children}
//     </div>
//   );
// }

// function VerticalButtons({ items, active, onSelect }) {
//   return (
//     <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
//       {items.map((it) => (
//         <button
//           key={it}
//           onClick={() => onSelect(it)}
//           className={`px-4 py-2 rounded-xl text-left text-sm transition
//             ${
//               active === it
//                 ? "bg-[#E23744] text-white shadow"
//                 : "bg-white/40 backdrop-blur-xl border border-white/30 hover:border-[#E23744]/40"
//             }`}
//         >
//           {it}
//         </button>
//       ))}
//     </div>
//   );
// }

// function RowButtons({ items, active, onSelect }) {
//   return (
//     <div className="flex gap-2">
//       {items.map((t) => (
//         <button
//           key={t}
//           onClick={() => onSelect(t)}
//           className={`px-4 py-2 rounded-xl text-sm font-semibold flex-1 transition
//             ${
//               active === t
//                 ? "bg-[#E23744] text-white shadow"
//                 : "bg-white/40 backdrop-blur-xl border border-white/30 hover:border-[#E23744]/40"
//             }`}
//         >
//           {t}
//         </button>
//       ))}
//     </div>
//   );
// }

// function FilterPanel({
//   regions,
//   states,
//   selectedRegion,
//   setSelectedRegion,
//   selectedState,
//   setSelectedState,
//   vegFilter,
//   setVegFilter,
//   priceMin,
//   priceMax,
//   maxPrice,
//   setMaxPrice,
//   sortOption,
//   setSortOption,
//   clearAll,
// }) {
//   return (
//     <motion.aside
//       initial={{ opacity: 0, x: -6 }}
//       animate={{ opacity: 1, x: 0 }}
//       className="bg-white/50 backdrop-blur-2xl border border-white/30 rounded-3xl p-6 shadow-xl sticky top-24"
//     >
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-xl font-bold flex items-center gap-2 text-gray-800">
//           <Filter className="w-5 h-5 text-[#E23744]" />
//           Filters
//         </h2>

//         <button
//           onClick={clearAll}
//           className="px-3 py-1.5 rounded-lg border border-[#E23744] text-[#E23744] text-xs font-semibold hover:bg-[#E23744] hover:text-white transition"
//         >
//           Clear All
//         </button>
//       </div>

//       <FilterGroup icon={<MapPin size={16} />} title="By Region">
//         <VerticalButtons
//           items={regions}
//           active={selectedRegion}
//           onSelect={(v) => {
//             setSelectedRegion(v);
//             setSelectedState("All");
//           }}
//         />
//       </FilterGroup>

//       <FilterGroup icon={<MapPin size={16} />} title="By State">
//         <VerticalButtons items={states} active={selectedState} onSelect={setSelectedState} />
//       </FilterGroup>

//       <FilterGroup icon={<Utensils size={16} />} title="Food Type">
//         <RowButtons items={["All", "Veg", "Non-Veg"]} active={vegFilter} onSelect={setVegFilter} />
//       </FilterGroup>

//       <FilterGroup icon={<TrendingUp size={16} />} title="Price Range">
//         <div className="flex justify-between text-sm font-semibold text-gray-700 mb-2">
//           <span>Up to</span>
//           <span className="text-[#E23744]">₹{maxPrice}</span>
//         </div>

//         <input
//           type="range"
//           min={priceMin}
//           max={priceMax}
//           value={maxPrice}
//           onChange={(e) => setMaxPrice(Number(e.target.value))}
//           className="w-full"
//         />

//         <div className="flex justify-between text-xs text-gray-500 mt-1">
//           <span>₹{priceMin}</span>
//           <span>₹{priceMax}</span>
//         </div>
//       </FilterGroup>

//       <FilterGroup icon={<Award size={16} />} title="Sort By">
//         <select
//           value={sortOption}
//           onChange={(e) => setSortOption(e.target.value)}
//           className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/30 backdrop-blur-xl text-sm"
//         >
//           <option value="default">Default</option>
//           <option value="priceLowHigh">Price: Low to High</option>
//           <option value="priceHighLow">Price: High to Low</option>
//           <option value="ratingHighLow">Rating: High to Low</option>
//         </select>
//       </FilterGroup>
//     </motion.aside>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /*                                HEADER SECTION                              */
// /* -------------------------------------------------------------------------- */

// function HeaderSection({ filteredCount, regionCount }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: -8 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="text-center mb-10"
//     >
//       <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#E23744]/10 rounded-full backdrop-blur-xl border border-[#E23744]/20 mb-3">
//         <Sparkles className="w-4 h-4 text-[#E23744]" />
//         <span className="text-sm font-semibold text-[#E23744]">
//           Discover India’s Flavors
//         </span>
//       </div>

//       <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
//         Explore{" "}
//         <span className="bg-gradient-to-r from-[#E23744] to-[#E23744]/70 bg-clip-text text-transparent">
//           Indian Cuisines
//         </span>
//       </h1>

//       <p className="text-gray-600 mt-3 max-w-2xl mx-auto text-sm md:text-base">
//         From Kashmir to Kanyakumari — taste the diversity of India one dish at a time.
//       </p>

//       <div className="flex justify-center gap-4 mt-6 flex-wrap">
//         <StatPill icon={<Utensils size={16} />} label={`${filteredCount} Dishes`} />
//         <StatPill icon={<MapPin size={16} />} label={`${regionCount} Regions`} />
//         <StatPill icon={<Award size={16} />} label="Premium Quality" />
//       </div>
//     </motion.div>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /*                                EMPTY STATE                                 */
// /* -------------------------------------------------------------------------- */

// function EmptyState({ clearAll }) {
//   return (
//     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
//       <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/40 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-xl">
//         <Utensils className="w-10 h-10 text-gray-400" />
//       </div>

//       <h2 className="text-xl font-semibold text-gray-700">No dishes found</h2>
//       <p className="text-sm text-gray-500">Try adjusting your filters</p>

//       <button
//         onClick={clearAll}
//         className="
//           mt-4 px-6 py-2 
//           bg-[#E23744] text-white 
//           rounded-xl shadow-lg 
//           hover:shadow-[#E23744]/40 
//           transition
//         "
//       >
//         Reset Filters
//       </button>
//     </motion.div>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /*                             FLOATING DECOR (GLASS)                         */
// /* -------------------------------------------------------------------------- */

// function FloatingDecor() {
//   return (
//     <div className="fixed inset-0 pointer-events-none -z-10">
//       <motion.div
//         animate={{ y: [0, -15, 0], opacity: [0.5, 0.9, 0.5] }}
//         transition={{ duration: 10, repeat: Infinity }}
//         className="absolute top-24 right-24 w-96 h-96 bg-[#E23744]/15 rounded-full blur-3xl"
//       />
//       <motion.div
//         animate={{ y: [0, 20, 0], opacity: [0.5, 0.9, 0.5] }}
//         transition={{ duration: 12, repeat: Infinity }}
//         className="absolute bottom-36 left-10 w-80 h-80 bg-[#E23744]/15 rounded-full blur-3xl"
//       />
//     </div>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /*                                MOBILE FILTERS                              */
// /* -------------------------------------------------------------------------- */

// function MobileFilters({
//   open,
//   onClose,
//   regions,
//   states,
//   selectedRegion,
//   setSelectedRegion,
//   selectedState,
//   setSelectedState,
//   vegFilter,
//   setVegFilter,
//   priceMin,
//   priceMax,
//   maxPrice,
//   setMaxPrice,
//   sortOption,
//   setSortOption,
//   clearAll,
// }) {
//   return (
//     <AnimatePresence>
//       {open && (
//         <>
//           <motion.div
//             className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
//             onClick={onClose}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           />

//           <motion.div
//             initial={{ x: "100%" }}
//             animate={{ x: 0 }}
//             exit={{ x: "100%" }}
//             transition={{ type: "spring", damping: 22, stiffness: 260 }}
//             className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white/70 backdrop-blur-2xl border-l border-white/30 z-50 shadow-2xl overflow-y-auto"
//           >
//             <div className="sticky top-0 bg-white/70 backdrop-blur-xl border-b border-white/20 px-4 py-3 flex items-center justify-between">
//               <h3 className="text-lg font-bold text-gray-800">Filters & Sort</h3>
//               <button onClick={onClose} className="p-2 rounded hover:bg-white/40">
//                 <X />
//               </button>
//             </div>

//             <div className="p-4">
//               <FilterPanel
//                 regions={regions}
//                 states={states}
//                 selectedRegion={selectedRegion}
//                 setSelectedRegion={(v) => {
//                   setSelectedRegion(v);
//                   setSelectedState("All");
//                 }}
//                 selectedState={selectedState}
//                 setSelectedState={setSelectedState}
//                 vegFilter={vegFilter}
//                 setVegFilter={setVegFilter}
//                 priceMin={priceMin}
//                 priceMax={priceMax}
//                 maxPrice={maxPrice}
//                 setMaxPrice={setMaxPrice}
//                 sortOption={sortOption}
//                 setSortOption={setSortOption}
//                 clearAll={() => {
//                   clearAll();
//                   onClose();
//                 }}
//               />
//             </div>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /*                                MAIN EXPORT                                 */
// /* -------------------------------------------------------------------------- */

// export default function Cuisine() {
//   /* ------------------- STATE ------------------- */
//   const [selectedRegion, setSelectedRegion] = useState("All");
//   const [selectedState, setSelectedState] = useState("All");
//   const [vegFilter, setVegFilter] = useState("All");
//   const [sortOption, setSortOption] = useState("default");

//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [hoveredDish, setHoveredDish] = useState(null);

//   const [priceMin, setPriceMin] = useState(0);
//   const [priceMax, setPriceMax] = useState(1000);
//   const [maxPrice, setMaxPrice] = useState(1000);

//   const { items, addItem, increment, decrement } = useCart();

//   /* ------------------- SOMETHING NEW (BACKEND) ------------------- */
//   const [newDishes, setNewDishes] = useState([]);
//   const [loadingNew, setLoadingNew] = useState(false);
//   const [showNew, setShowNew] = useState(false);
//   const [newError, setNewError] = useState(null);

//   useEffect(() => {
//     // Fetch only once when component mounts
//     const fetchNewDishes = async () => {
//       setLoadingNew(true);
//       setNewError(null);
//       try {
//         const res = await getUserCuisines();
//         const data = res.data || res; // safety

//         const flattened = [];

//         (data || []).forEach((cuisine) => {
//           (cuisine.meals || []).forEach((meal) => {
//             flattened.push({
//               id: meal.id,
//               name: meal.mealName,
//               price: meal.mealPrice,
//               image: meal.imageUrl,
//               veg: meal.mealCategory === "Veg",
//               region: cuisine.region,
//               state: cuisine.state,
//               rating: 4.6,
//               deliveryTime: "25-35 min",
//             });
//           });
//         });

//         // Latest first (optional)
//         setNewDishes(flattened.reverse());
//       } catch (err) {
//         console.error(err);
//         setNewError("Unable to load new dishes right now.");
//       } finally {
//         setLoadingNew(false);
//       }
//     };

//     fetchNewDishes();
//   }, []);

//   /* ------------------ Flatten Dishes (STATIC) ------------------ */
//   const allDishes = useMemo(
//     () =>
//       CUISINES.flatMap((region) =>
//         region.states.flatMap((state) =>
//           state.dishes.map((dish) => ({
//             ...dish,
//             region: region.region,
//             state: state.name,
//           }))
//         )
//       ),
//     []
//   );

//   /* ------------------ Regions ------------------ */
//   const regions = useMemo(() => {
//     return ["All", ...new Set(CUISINES.map((r) => r.region))];
//   }, []);

//   /* ------------------ States ------------------ */
//   const states = useMemo(() => {
//     if (selectedRegion === "All") {
//       const all = CUISINES.flatMap((r) => r.states.map((s) => s.name));
//       return ["All", ...new Set(all)];
//     }
//     return ["All", ...CUISINES.find((r) => r.region === selectedRegion).states.map((s) => s.name)];
//   }, [selectedRegion]);

//   /* ------------------ Price Setup ------------------ */
//   useEffect(() => {
//     const p = allDishes.map((d) => Number(d.price));
//     const min = Math.min(...p);
//     const max = Math.max(...p);
//     setPriceMin(min);
//     setPriceMax(max);
//     setMaxPrice(max);
//   }, [allDishes]);

//   /* ------------------ Filtering Logic ------------------ */
//   const filteredDishes = useMemo(() => {
//     let data = [...allDishes];

//     if (selectedRegion !== "All") data = data.filter((d) => d.region === selectedRegion);
//     if (selectedState !== "All") data = data.filter((d) => d.state === selectedState);
//     if (vegFilter !== "All") data = data.filter((d) => (vegFilter === "Veg" ? d.veg : !d.veg));
//     data = data.filter((d) => d.price <= maxPrice);

//     switch (sortOption) {
//       case "priceLowHigh":
//         data.sort((a, b) => a.price - b.price);
//         break;
//       case "priceHighLow":
//         data.sort((a, b) => b.price - a.price);
//         break;
//       case "ratingHighLow":
//         data.sort((a, b) => (b.rating || 0) - (a.rating || 0));
//         break;
//     }

//     return data;
//   }, [allDishes, selectedRegion, selectedState, vegFilter, maxPrice, sortOption]);

//   /* ------------------ Clear Filters ------------------ */
//   const clearAll = () => {
//     setSelectedRegion("All");
//     setSelectedState("All");
//     setVegFilter("All");
//     setSortOption("default");
//     setMaxPrice(priceMax);
//   };

//   /* ------------------ UI ------------------ */
//   return (
//     <>
//       <FloatingDecor />

//       <div className="min-h-screen px-4 md:px-10 lg:px-14 py-8 bg-gradient-to-b from-white/90 via-red-50/20 to-gray-50/60">
//         {/* SOMETHING NEW FOR YOU SECTION (BACKEND) */}
//         <section className="max-w-5xl mx-auto mb-10">
//           <motion.div
//             initial={{ opacity: 0, y: -6 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="bg-white/60 border border-white/40 backdrop-blur-2xl rounded-3xl px-4 py-4 md:px-6 md:py-5 shadow-xl flex flex-col md:flex-row md:items-center md:justify-between gap-4"
//           >
//             <div>
//               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E23744]/10 border border-[#E23744]/20 mb-2">
//                 <Sparkles className="w-4 h-4 text-[#E23744]" />
//                 <span className="text-xs font-semibold text-[#E23744]">
//                   Something New For You
//                 </span>
//               </div>
//               <h2 className="text-lg md:text-2xl font-extrabold text-gray-900">
//                 Freshly added dishes by{" "}
//                 <span className="text-[#E23744]">top kitchens</span>
//               </h2>
//               <p className="text-xs md:text-sm text-gray-600 mt-1">
//                 Handpicked new meals created by admins — perfect for when you want to try something different.
//               </p>
//             </div>

//             <div className="flex flex-col items-start md:items-end gap-2">
//               <button
//                 onClick={() => setShowNew((prev) => !prev)}
//                 className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#E23744] text-white text-sm font-semibold shadow-lg hover:shadow-[#E23744]/50 transition"
//               >
//                 <ShoppingCart className="w-4 h-4" />
//                 {showNew ? "Hide Suggestions" : "Show New Dishes"}
//               </button>
//               {newDishes.length > 0 && (
//                 <span className="text-[11px] text-gray-500">
//                   Showing {Math.min(newDishes.length, 10)} latest additions
//                 </span>
//               )}
//             </div>
//           </motion.div>

//           <AnimatePresence initial={false}>
//             {showNew && (
//               <motion.div
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: 10 }}
//                 className="mt-4"
//               >
//                 {loadingNew ? (
//                   <div className="flex justify-center py-8 text-sm text-gray-600">
//                     Loading new dishes...
//                   </div>
//                 ) : newError ? (
//                   <div className="flex justify-center py-8 text-sm text-red-500">
//                     {newError}
//                   </div>
//                 ) : newDishes.length === 0 ? (
//                   <div className="flex justify-center py-8 text-sm text-gray-500">
//                     No new dishes have been added yet.
//                   </div>
//                 ) : (
//                   <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
//                     {newDishes.slice(0, 10).map((dish, i) => {
//                       const cartQty =
//                         items.find((it) => it.foodId === dish.id)?.quantity || 0;

//                       return (
//                         <div className="min-w-[260px] max-w-[280px]" key={dish.id}>
//                           <DishCard
//                             dish={dish}
//                             index={i}
//                             hovered={false}
//                             onHover={() => {}}
//                             onLeave={() => {}}
//                             isFavorite={false}
//                             toggleFav={() => {}}
//                             addItem={addItem}
//                             increment={increment}
//                             decrement={decrement}
//                             cartQty={cartQty}
//                             badgeLabel="New"
//                           />
//                         </div>
//                       );
//                     })}
//                   </div>
//                 )}
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </section>

//         {/* ORIGINAL HEADER SECTION */}
//         <HeaderSection filteredCount={filteredDishes.length} regionCount={regions.length - 1} />

//         {/* MOBILE FILTER BUTTON */}
//         <div className="lg:hidden flex justify-end mb-5">
//           <button
//             onClick={() => setMobileOpen(true)}
//             className="bg-[#E23744] text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-2"
//           >
//             <Filter className="w-4 h-4" /> Filters & Sort
//           </button>
//         </div>

//         {/* MAIN GRID */}
//         <div className="grid lg:grid-cols-12 gap-6">
//           {/* DESKTOP FILTERS */}
//           <div className="hidden lg:block lg:col-span-3">
//             <FilterPanel
//               regions={regions}
//               states={states}
//               selectedRegion={selectedRegion}
//               setSelectedRegion={setSelectedRegion}
//               selectedState={selectedState}
//               setSelectedState={setSelectedState}
//               vegFilter={vegFilter}
//               setVegFilter={setVegFilter}
//               priceMin={priceMin}
//               priceMax={priceMax}
//               maxPrice={maxPrice}
//               setMaxPrice={setMaxPrice}
//               sortOption={sortOption}
//               setSortOption={setSortOption}
//               clearAll={clearAll}
//             />
//           </div>

//           {/* DISHES GRID (STATIC CUISINES) */}
//           <div className="lg:col-span-9">
//             {filteredDishes.length === 0 ? (
//               <EmptyState clearAll={clearAll} />
//             ) : (
//               <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {filteredDishes.map((dish, i) => {
//                   const cartQty =
//                     items.find((it) => it.foodId === dish.id)?.quantity || 0;

//                   return (
//                     <DishCard
//                       key={dish.id}
//                       dish={dish}
//                       index={i}
//                       hovered={hoveredDish === dish.id}
//                       onHover={() => setHoveredDish(dish.id)}
//                       onLeave={() => setHoveredDish(null)}
//                       isFavorite={false}
//                       toggleFav={() => {}}
//                       addItem={addItem}
//                       increment={increment}
//                       decrement={decrement}
//                       cartQty={cartQty}
//                     />
//                   );
//                 })}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* MOBILE FILTER DRAWER */}
//       <MobileFilters
//         open={mobileOpen}
//         onClose={() => setMobileOpen(false)}
//         regions={regions}
//         states={states}
//         selectedRegion={selectedRegion}
//         setSelectedRegion={setSelectedRegion}
//         selectedState={selectedState}
//         setSelectedState={setSelectedState}
//         vegFilter={vegFilter}
//         setVegFilter={setVegFilter}
//         priceMin={priceMin}
//         priceMax={priceMax}
//         maxPrice={maxPrice}
//         setMaxPrice={setMaxPrice}
//         sortOption={sortOption}
//         setSortOption={setSortOption}
//         clearAll={clearAll}
//       />
//     </>
//   );
// }
// IMP one ............













// import React, { useMemo, useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { CUISINES } from "../../assets/data/dishes";
// import { useCart } from "../../context/CartContext";
// import { getUserCuisines } from "../../api/api";
// import {
//   Star,
//   Utensils,
//   X,
//   Filter,
//   Clock,
//   Flame,
//   MapPin,
//   ShoppingCart,
//   Info,
//   Heart,
//   TrendingUp,
//   Award,
//   Sparkles,
//   ChevronRight,
//   Leaf,
//   AlertTriangle,
//   Activity,
//   Eye
// } from "lucide-react";

// /* =====================================================================
//    🎨 GLOBAL STYLES & ANIMATIONS (Injected)
//    ===================================================================== */
// const GLOBAL_CSS = `
//   .hide-scrollbar::-webkit-scrollbar { display: none; }
//   .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  
//   /* Premium Shine Effect */
//   .shine-effect {
//     position: relative;
//     overflow: hidden;
//   }
//   .shine-effect::after {
//     content: '';
//     position: absolute;
//     top: 0;
//     left: -100%;
//     width: 50%;
//     height: 100%;
//     background: linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent);
//     transform: skewX(-25deg);
//     transition: 0.5s;
//     pointer-events: none;
//   }
//   .shine-effect:hover::after {
//     left: 150%;
//     transition: 0.7s ease-in-out;
//   }
// `;

// /* =====================================================================
//    🧩 SUB-COMPONENTS
//    ===================================================================== */

// const StatBadge = ({ icon, text }) => (
//   <div className="flex items-center gap-1.5 px-3 py-1 bg-white/40 border border-white/40 rounded-lg backdrop-blur-md shadow-sm">
//     <span className="text-red-600">{icon}</span>
//     <span className="text-xs font-semibold text-gray-800">{text}</span>
//   </div>
// );

// /* --- DISH CARD (Standard) --- */
// function DishCard({
//   dish,
//   onAdd,
//   onInc,
//   onDec,
//   qty,
//   isNew = false,
//   onQuickView // New prop for showing details
// }) {
//   return (
//     <motion.div
//       layout
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true, margin: "-50px" }}
//       className="group relative bg-white/30 backdrop-blur-xl border border-white/50 rounded-[2rem] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.05)] hover:shadow-[0_15px_40px_rgba(226,55,68,0.15)] transition-all duration-500 hover:-translate-y-2 shine-effect"
//     >
//       {/* Image Area */}
//       <div className="relative h-56 overflow-hidden">
//         <img
//           src={dish.image}
//           alt={dish.name}
//           className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-300" />
        
//         {/* Badges */}
//         <div className="absolute top-4 left-4 flex gap-2">
//            <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg text-white ${dish.veg ? "bg-green-500" : "bg-red-500"}`}>
//              {dish.veg ? "Veg" : "Non-Veg"}
//            </span>
//            {isNew && (
//              <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg bg-blue-500 text-white flex items-center gap-1">
//                 <Sparkles size={10} /> New
//              </span>
//            )}
//         </div>

//         {/* Quick View Button (Only for New Dishes usually, or all) */}
//         {isNew && (
//           <button 
//             onClick={() => onQuickView(dish)}
//             className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-gray-900 transition-all shadow-lg"
//             title="View Details"
//           >
//             <Eye size={16} />
//           </button>
//         )}

//         {/* Price & Rating Overlay */}
//         <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end text-white">
//           <div>
//             <h3 className="text-lg font-bold leading-tight mb-1 group-hover:text-red-300 transition-colors">{dish.name}</h3>
//             <div className="flex items-center gap-2 text-xs text-gray-300">
//                <Clock size={12} /> {dish.deliveryTime}
//             </div>
//           </div>
//           <div className="flex flex-col items-end">
//              <div className="flex items-center gap-1 bg-yellow-400 text-black px-1.5 py-0.5 rounded text-[10px] font-bold mb-1">
//                 {dish.rating} <Star size={8} fill="black" />
//              </div>
//              <span className="text-xl font-bold">₹{dish.price}</span>
//           </div>
//         </div>
//       </div>

//       {/* Action Area */}
//       <div className="p-4 bg-white/40 backdrop-blur-md">
//         {qty === 0 ? (
//           <button
//             onClick={() => onAdd(dish)}
//             className="w-full py-3 rounded-xl bg-gray-900 text-white font-bold text-sm shadow-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2 group/btn"
//           >
//             <ShoppingCart size={16} className="group-hover/btn:animate-bounce" /> Add to Cart
//           </button>
//         ) : (
//           <div className="flex items-center justify-between bg-white rounded-xl p-1 shadow-inner border border-gray-100">
//             <button onClick={() => onDec(dish.id)} className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600 font-bold transition">-</button>
//             <span className="font-bold text-gray-900">{qty}</span>
//             <button onClick={() => onInc(dish.id)} className="w-10 h-10 flex items-center justify-center rounded-lg bg-red-600 text-white hover:bg-red-700 font-bold transition">+</button>
//           </div>
//         )}
//       </div>
//     </motion.div>
//   );
// }

// /* --- DISH DETAIL MODAL (Premium Glass) --- */
// function DishDetailModal({ dish, onClose, onAdd, qty, onInc, onDec }) {
//   if (!dish) return null;

//   return (
//     <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
//       {/* Backdrop */}
//       <motion.div 
//         initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//         onClick={onClose}
//         className="absolute inset-0 bg-black/60 backdrop-blur-sm"
//       />
      
//       {/* Modal Content */}
//       <motion.div 
//         initial={{ opacity: 0, scale: 0.9, y: 20 }}
//         animate={{ opacity: 1, scale: 1, y: 0 }}
//         exit={{ opacity: 0, scale: 0.9, y: 20 }}
//         className="relative w-full max-w-2xl bg-white/90 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/50 flex flex-col max-h-[90vh]"
//       >
//         {/* Header Image */}
//         <div className="relative h-64 shrink-0">
//           <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" />
//           <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
//           <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/30 backdrop-blur text-white flex items-center justify-center hover:bg-red-600 transition">
//             <X size={20} />
//           </button>
//           <div className="absolute bottom-6 left-6 text-white">
//              <div className="flex gap-2 mb-2">
//                 <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${dish.veg ? "bg-green-500" : "bg-red-500"}`}>{dish.veg ? "Veg" : "Non-Veg"}</span>
//                 <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-yellow-400 text-black flex items-center gap-1"><Star size={10} fill="black"/> {dish.rating}</span>
//              </div>
//              <h2 className="text-3xl font-extrabold">{dish.name}</h2>
//              <p className="text-gray-300 text-sm mt-1">{dish.region} • {dish.state}</p>
//           </div>
//         </div>

//         {/* Scrollable Content */}
//         <div className="p-6 overflow-y-auto hide-scrollbar space-y-6">
           
//            {/* Description */}
//            <div className="space-y-2">
//               <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2"><Info size={16} className="text-red-500"/> Description</h3>
//               <p className="text-gray-600 text-sm leading-relaxed">
//                  {dish.description || "A signature dish prepared with authentic spices and traditional methods. Perfect for a wholesome meal."}
//               </p>
//            </div>

//            {/* Grid: Nutrition & Ingredients */}
//            <div className="grid md:grid-cols-2 gap-6">
              
//               {/* Ingredients */}
//               <div className="bg-orange-50/50 p-4 rounded-2xl border border-orange-100">
//                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2 mb-3"><Leaf size={16} className="text-green-600"/> Ingredients</h3>
//                  <div className="flex flex-wrap gap-2">
//                     {(dish.ingredients || ["Spices", "Herbs", "Oil", "Fresh Veggies"]).map((ing, i) => (
//                        <span key={i} className="text-xs font-medium px-2 py-1 bg-white rounded-md text-gray-600 shadow-sm border border-gray-100">{ing}</span>
//                     ))}
//                  </div>
//               </div>

//               {/* Nutrition */}
//               <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
//                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2 mb-3"><Activity size={16} className="text-blue-600"/> Nutrition</h3>
//                  <div className="grid grid-cols-2 gap-3">
//                     <div className="bg-white p-2 rounded-lg text-center shadow-sm">
//                        <p className="text-[10px] text-gray-400 uppercase">Calories</p>
//                        <p className="text-sm font-bold text-gray-800">{dish.nutrition?.calories || "350"} kcal</p>
//                     </div>
//                     <div className="bg-white p-2 rounded-lg text-center shadow-sm">
//                        <p className="text-[10px] text-gray-400 uppercase">Protein</p>
//                        <p className="text-sm font-bold text-gray-800">{dish.nutrition?.protein || "12"}g</p>
//                     </div>
//                  </div>
//               </div>
//            </div>

//            {/* Allergies */}
//            {dish.allergies && dish.allergies.length > 0 && (
//               <div className="bg-red-50/50 p-3 rounded-xl border border-red-100 flex items-start gap-3">
//                  <AlertTriangle size={18} className="text-red-500 shrink-0 mt-0.5" />
//                  <div>
//                     <span className="text-xs font-bold text-red-700 uppercase block mb-1">Allergen Info</span>
//                     <p className="text-xs text-gray-600">Contains: {dish.allergies.join(", ")}</p>
//                  </div>
//               </div>
//            )}
//         </div>

//         {/* Footer Action */}
//         <div className="p-4 border-t border-gray-100 bg-white/80 backdrop-blur flex justify-between items-center">
//             <div className="text-2xl font-extrabold text-gray-900">₹{dish.price}</div>
            
//             <div className="w-1/2">
//                 {qty === 0 ? (
//                    <button onClick={() => onAdd(dish)} className="w-full py-3 bg-red-600 text-white rounded-xl font-bold shadow-lg hover:bg-red-700 transition">Add to Order</button>
//                 ) : (
//                    <div className="flex items-center justify-between bg-gray-100 rounded-xl p-1">
//                       <button onClick={() => onDec(dish.id)} className="w-12 h-10 rounded-lg bg-white shadow font-bold text-gray-700 hover:text-red-600">-</button>
//                       <span className="font-bold">{qty}</span>
//                       <button onClick={() => onInc(dish.id)} className="w-12 h-10 rounded-lg bg-red-600 text-white shadow font-bold hover:bg-red-700">+</button>
//                    </div>
//                 )}
//             </div>
//         </div>

//       </motion.div>
//     </div>
//   );
// }

// /* --- FILTER COMPONENT (Sidebar) --- */
// function FilterSidebar({ 
//     filters, setFilters, options, clearAll 
// }) {
//    return (
//       <aside className="bg-white/60 backdrop-blur-2xl border border-white/50 rounded-[2rem] p-6 shadow-xl sticky top-24 h-fit">
//          <div className="flex justify-between items-center mb-6">
//             <h3 className="font-bold text-lg flex items-center gap-2"><Filter size={18} className="text-red-600"/> Filters</h3>
//             <button onClick={clearAll} className="text-xs font-bold text-red-500 hover:underline">Reset</button>
//          </div>

//          <div className="space-y-6">
//             {/* Region */}
//             <div>
//                <label className="text-xs font-bold text-gray-400 uppercase mb-3 block">Region</label>
//                <div className="flex flex-wrap gap-2">
//                   {options.regions.map(r => (
//                      <button 
//                         key={r} 
//                         onClick={() => setFilters(prev => ({ ...prev, region: r, state: "All" }))}
//                         className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filters.region === r ? "bg-red-600 text-white shadow-md" : "bg-white border border-gray-200 text-gray-600 hover:border-red-300"}`}
//                      >
//                         {r}
//                      </button>
//                   ))}
//                </div>
//             </div>

//             {/* Price Range */}
//             <div>
//                <label className="text-xs font-bold text-gray-400 uppercase mb-3 block">Price Range</label>
//                <input 
//                   type="range" 
//                   min={options.minPrice} max={options.maxPrice} 
//                   value={filters.price} 
//                   onChange={(e) => setFilters(prev => ({ ...prev, price: Number(e.target.value) }))}
//                   className="w-full accent-red-600 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
//                />
//                <div className="flex justify-between text-xs font-bold text-gray-600 mt-2">
//                   <span>₹{options.minPrice}</span>
//                   <span className="text-red-600">₹{filters.price}</span>
//                   <span>₹{options.maxPrice}</span>
//                </div>
//             </div>

//             {/* Type */}
//             <div>
//                <label className="text-xs font-bold text-gray-400 uppercase mb-3 block">Preference</label>
//                <div className="flex gap-2 p-1 bg-white/50 rounded-xl border border-gray-200">
//                   {["All", "Veg", "Non-Veg"].map(type => (
//                      <button 
//                         key={type}
//                         onClick={() => setFilters(prev => ({ ...prev, type }))}
//                         className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${filters.type === type ? "bg-white text-red-600 shadow-sm" : "text-gray-500 hover:text-gray-800"}`}
//                      >
//                         {type}
//                      </button>
//                   ))}
//                </div>
//             </div>
//          </div>
//       </aside>
//    );
// }


// /* =====================================================================
//    🚀 MAIN COMPONENT
//    ===================================================================== */
// export default function Cuisine() {
//   const { items, addItem, increment, decrement } = useCart();
  
//   // States
//   const [selectedDishForModal, setSelectedDishForModal] = useState(null);
//   const [showNewSection, setShowNewSection] = useState(true);
//   const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

//   // Filters State
//   const [filters, setFilters] = useState({
//      region: "All",
//      state: "All",
//      type: "All",
//      price: 1000,
//      sort: "default"
//   });

//   // Data States
//   const [newDishes, setNewDishes] = useState([]);
//   const [loadingNew, setLoadingNew] = useState(false);
//   const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });

//   // 1. Inject Styles
//   useEffect(() => {
//     const style = document.createElement("style");
//     style.innerHTML = GLOBAL_CSS;
//     document.head.appendChild(style);
//     return () => document.head.removeChild(style);
//   }, []);

//   // 2. Fetch New Dishes (Mocking extra details since backend might just send basics)
//   useEffect(() => {
//     const loadNewDishes = async () => {
//        setLoadingNew(true);
//        try {
//           const res = await getUserCuisines();
//           const rawData = res.data || [];
          
//           const processed = [];
//           rawData.forEach(c => {
//              c.meals.forEach(m => {
//                 processed.push({
//                    id: m.id,
//                    name: m.mealName,
//                    price: m.mealPrice,
//                    image: m.imageUrl,
//                    veg: m.mealCategory === "Veg",
//                    region: c.region,
//                    state: c.state,
//                    rating: 4.8,
//                    deliveryTime: "30-40 min",
//                    // Mocking details if missing
//                    description: m.description || "A chef's special creation using locally sourced ingredients. Bursting with flavors.",
//                    ingredients: m.ingredients || ["Secret Spices", "Fresh Cream", "Organic Veggies"],
//                    nutrition: m.nutrition || { calories: 420, protein: 14 },
//                    allergies: m.allergies || (m.mealCategory === "Veg" ? ["Dairy"] : ["Dairy", "Nuts"])
//                 });
//              });
//           });
//           setNewDishes(processed.reverse());
//        } catch (e) {
//           console.error("Failed to load new dishes");
//        } finally {
//           setLoadingNew(false);
//        }
//     };
//     loadNewDishes();
//   }, []);

//   // 3. Static Data Flattening
//   const allDishes = useMemo(() => 
//     CUISINES.flatMap(r => r.states.flatMap(s => s.dishes.map(d => ({ ...d, region: r.region, state: s.name }))))
//   , []);

//   // 4. Calculate Price Range
//   useEffect(() => {
//      const prices = allDishes.map(d => d.price);
//      setPriceRange({ min: Math.min(...prices), max: Math.max(...prices) });
//      setFilters(prev => ({ ...prev, price: Math.max(...prices) }));
//   }, [allDishes]);

//   // 5. Filter Logic
//   const filteredDishes = useMemo(() => {
//      let data = allDishes.filter(d => d.price <= filters.price);
//      if (filters.region !== "All") data = data.filter(d => d.region === filters.region);
//      if (filters.type !== "All") data = data.filter(d => filters.type === "Veg" ? d.veg : !d.veg);
     
//      if (filters.sort === "priceLow") data.sort((a,b) => a.price - b.price);
//      if (filters.sort === "priceHigh") data.sort((a,b) => b.price - a.price);
     
//      return data;
//   }, [allDishes, filters]);

//   // Options for sidebar
//   const filterOptions = {
//      regions: ["All", ...new Set(CUISINES.map(c => c.region))],
//      minPrice: priceRange.min,
//      maxPrice: priceRange.max
//   };

//   return (
//     <div className="min-h-screen bg-[#FDFDFD] relative overflow-x-hidden">
      
//       {/* --- BACKGROUND BLOBS --- */}
//       <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
//          <motion.div animate={{ y: [0, -40, 0], scale: [1, 1.1, 1] }} transition={{ duration: 10, repeat: Infinity }} className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-100/50 rounded-full blur-[120px]" />
//          <motion.div animate={{ y: [0, 40, 0], scale: [1, 1.2, 1] }} transition={{ duration: 15, repeat: Infinity }} className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-100/40 rounded-full blur-[100px]" />
//       </div>

//       <main className="max-w-[1400px] mx-auto px-4 md:px-8 py-10">
         
//          {/* --- HEADER --- */}
//          <div className="text-center mb-12">
//             <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4 tracking-tight">
//                Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">Local Flavors</span>
//             </h1>
//             <p className="text-gray-500 max-w-2xl mx-auto text-lg">From the spicy streets of Mumbai to the royal kitchens of Jaipur, explore India's culinary heritage.</p>
//          </div>

//          {/* --- NEW DISHES SECTION (Collapsible) --- */}
//          <section className="mb-16">
//             <div className="flex items-center justify-between mb-6 px-2">
//                <div className="flex items-center gap-3">
//                   <div className="p-2 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg text-white shadow-lg shadow-red-200"><Sparkles size={20}/></div>
//                   <div>
//                      <h2 className="text-2xl font-bold text-gray-900">New Arrivals</h2>
//                      <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Fresh from the kitchen</p>
//                   </div>
//                </div>
//                <button onClick={() => setShowNewSection(!showNewSection)} className="text-sm font-bold text-red-600 hover:bg-red-50 px-4 py-2 rounded-full transition-colors">
//                   {showNewSection ? "Hide" : "Show All"}
//                </button>
//             </div>

//             <AnimatePresence>
//                {showNewSection && (
//                   <motion.div 
//                      initial={{ height: 0, opacity: 0 }} 
//                      animate={{ height: "auto", opacity: 1 }} 
//                      exit={{ height: 0, opacity: 0 }}
//                      className="overflow-hidden"
//                   >
//                      {loadingNew ? (
//                         <div className="flex gap-4 overflow-hidden py-4">{[1,2,3,4].map(i => <div key={i} className="min-w-[280px] h-64 bg-gray-100 rounded-[2rem] animate-pulse"/>)}</div>
//                      ) : (
//                         <div className="flex gap-6 overflow-x-auto pb-8 pt-2 px-2 hide-scrollbar snap-x">
//                            {newDishes.map((dish, i) => {
//                               const qty = items.find(it => it.foodId === dish.id)?.quantity || 0;
//                               return (
//                                  <div key={dish.id} className="min-w-[300px] snap-center">
//                                     <DishCard 
//                                        dish={dish} 
//                                        isNew={true}
//                                        qty={qty}
//                                        onAdd={addItem} 
//                                        onInc={increment} 
//                                        onDec={decrement}
//                                        onQuickView={setSelectedDishForModal}
//                                     />
//                                  </div>
//                               );
//                            })}
//                         </div>
//                      )}
//                   </motion.div>
//                )}
//             </AnimatePresence>
//          </section>

//          {/* --- MAIN GRID LAYOUT --- */}
//          <div className="grid lg:grid-cols-12 gap-8 items-start relative">
            
//             {/* Sidebar (Desktop) */}
//             <div className="hidden lg:block lg:col-span-3">
//                <FilterSidebar 
//                   filters={filters} 
//                   setFilters={setFilters} 
//                   options={filterOptions} 
//                   clearAll={() => setFilters({ region: "All", state: "All", type: "All", price: priceRange.max, sort: "default" })}
//                />
//             </div>

//             {/* Mobile Filter Toggle */}
//             <div className="lg:hidden col-span-12 sticky top-24 z-30 flex justify-end">
//                <button 
//                   onClick={() => setMobileFilterOpen(true)}
//                   className="bg-gray-900 text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-2 font-bold"
//                >
//                   <Filter size={16}/> Filter Menu
//                </button>
//             </div>

//             {/* Grid Content */}
//             <div className="col-span-12 lg:col-span-9">
//                <div className="flex justify-between items-center mb-6">
//                   <h3 className="font-bold text-gray-800">{filteredDishes.length} Dishes Found</h3>
//                   <select 
//                      value={filters.sort} 
//                      onChange={(e) => setFilters(prev => ({...prev, sort: e.target.value}))}
//                      className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-red-100"
//                   >
//                      <option value="default">Recommended</option>
//                      <option value="priceLow">Price: Low to High</option>
//                      <option value="priceHigh">Price: High to Low</option>
//                   </select>
//                </div>

//                {filteredDishes.length > 0 ? (
//                   <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//                      {filteredDishes.map((dish, i) => {
//                         const qty = items.find(it => it.foodId === dish.id)?.quantity || 0;
//                         return (
//                            <DishCard 
//                               key={dish.id}
//                               dish={dish}
//                               qty={qty}
//                               onAdd={addItem}
//                               onInc={increment}
//                               onDec={decrement}
//                               // We don't enable quick view for standard dishes to keep it cleaner, 
//                               // or you can enable it if you map description for them too.
//                            />
//                         );
//                      })}
//                   </div>
//                ) : (
//                   <div className="text-center py-20 bg-white/50 rounded-[3rem]">
//                      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
//                         <Utensils size={32}/>
//                      </div>
//                      <h3 className="text-xl font-bold text-gray-900">No dishes match your taste</h3>
//                      <p className="text-gray-500">Try changing the filters or price range.</p>
//                   </div>
//                )}
//             </div>

//          </div>

//       </main>

//       {/* --- MODALS --- */}
//       <AnimatePresence>
//          {selectedDishForModal && (
//             <DishDetailModal 
//                dish={selectedDishForModal} 
//                onClose={() => setSelectedDishForModal(null)}
//                onAdd={addItem}
//                onInc={increment}
//                onDec={decrement}
//                qty={items.find(it => it.foodId === selectedDishForModal.id)?.quantity || 0}
//             />
//          )}
//          {mobileFilterOpen && (
//              <motion.div 
//                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//                className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end"
//              >
//                 <motion.div 
//                   initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
//                   className="w-full max-w-sm bg-white h-full overflow-y-auto p-6"
//                 >
//                    <div className="flex justify-between items-center mb-6">
//                       <h2 className="text-xl font-bold">Filters</h2>
//                       <button onClick={() => setMobileFilterOpen(false)}><X size={24}/></button>
//                    </div>
//                    <FilterSidebar 
//                       filters={filters} setFilters={setFilters} options={filterOptions} 
//                       clearAll={() => setFilters({ region: "All", state: "All", type: "All", price: priceRange.max, sort: "default" })}
//                    />
//                    <button onClick={() => setMobileFilterOpen(false)} className="w-full mt-8 py-3 bg-red-600 text-white rounded-xl font-bold">
//                       Apply Filters
//                    </button>
//                 </motion.div>
//              </motion.div>
//          )}
//       </AnimatePresence>

//     </div>
//   );
// }








// import React, { useMemo, useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useCart } from "../../context/CartContext";
// import { CUISINES } from "../../assets/data/dishes"; // ✅ Centralized Data Import

// // Icons
// import {
//   Star,
//   Filter,
//   Clock,
//   ShoppingCart,
//   Heart,
//   Sparkles,
//   X,
//   Leaf,
//   Activity,
//   AlertTriangle,
//   Eye,
//   MapPin,
//   ChevronDown,
//   Search,
//   SlidersHorizontal
// } from "lucide-react";

// /* =====================================================================
//    🎨 GLOBAL STYLES (Glass & Scroll)
//    ===================================================================== */
// const GLOBAL_CSS = `
//   .hide-scrollbar::-webkit-scrollbar { display: none; }
//   .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  
//   /* Premium Glass Panel */
//   .glass-panel {
//     background: rgba(255, 255, 255, 0.75);
//     backdrop-filter: blur(20px);
//     -webkit-backdrop-filter: blur(20px);
//     border: 1px solid rgba(255, 255, 255, 0.6);
//     box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.07);
//   }

//   /* Shimmer Effect on Hover */
//   .shine-hover { position: relative; overflow: hidden; }
//   .shine-hover::after {
//     content: ''; position: absolute; top: 0; left: -100%; width: 50%; height: 100%;
//     background: linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent);
//     transform: skewX(-25deg); pointer-events: none; transition: 0.5s;
//   }
//   .shine-hover:hover::after { left: 150%; transition: 0.7s ease-in-out; }
// `;

// /* =====================================================================
//    🥣 COMPONENT: DISH CARD
//    ===================================================================== */
// function DishCard({ dish, onAdd, onInc, onDec, qty, onQuickView, isFavorite, toggleFav }) {
//   return (
//     <motion.div
//       layout
//       initial={{ opacity: 0, scale: 0.95 }}
//       whileInView={{ opacity: 1, scale: 1 }}
//       viewport={{ once: true, margin: "-50px" }}
//       className="group relative glass-panel rounded-[2rem] overflow-hidden hover:shadow-[0_20px_50px_rgba(226,55,68,0.15)] transition-all duration-500 hover:-translate-y-2"
//     >
//       {/* --- IMAGE AREA --- */}
//       <div className="relative h-60 overflow-hidden cursor-pointer" onClick={() => onQuickView(dish)}>
//         <img
//           src={dish.image}
//           alt={dish.name}
//           className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//           loading="lazy"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-70 transition-opacity" />

//         {/* Top Badges */}
//         <div className="absolute top-4 left-4 flex gap-2">
//           <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg text-white ${dish.veg ? "bg-green-600" : "bg-red-600"}`}>
//             {dish.veg ? "Veg" : "Non-Veg"}
//           </span>
//           {dish.rating >= 4.8 && (
//             <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg bg-yellow-500 text-white flex items-center gap-1">
//               <Star size={10} fill="white" /> Best Seller
//             </span>
//           )}
//         </div>

//         {/* Action Buttons */}
//         <div className="absolute top-4 right-4 flex flex-col gap-3">
//            <button 
//              onClick={(e) => { e.stopPropagation(); toggleFav(dish.id); }}
//              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center hover:bg-white transition-all shadow-lg group/icon"
//            >
//              <Heart size={18} className={`transition-colors ${isFavorite ? 'fill-red-500 text-red-500' : 'text-white group-hover/icon:text-red-500'}`} />
//            </button>
//            <button 
//              onClick={(e) => { e.stopPropagation(); onQuickView(dish); }}
//              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-gray-900 transition-all shadow-lg"
//              title="Quick View"
//            >
//              <Eye size={18} />
//            </button>
//         </div>

//         {/* Bottom Info (Overlay) */}
//         <div className="absolute bottom-0 left-0 w-full p-5 text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
//            <h3 className="text-xl font-bold leading-tight mb-1">{dish.name}</h3>
//            <div className="flex justify-between items-end">
//               <p className="text-xs text-gray-200 flex items-center gap-1 opacity-90">
//                  <MapPin size={12} /> {dish.state}
//               </p>
//               <span className="text-2xl font-bold">₹{dish.price}</span>
//            </div>
//         </div>
//       </div>

//       {/* --- CART ACTIONS --- */}
//       <div className="p-5">
//          <div className="flex items-center gap-4 text-xs font-bold text-gray-400 mb-5 uppercase tracking-wide">
//             <span className="flex items-center gap-1"><Clock size={14}/> 30 min</span>
//             <span className="flex items-center gap-1"><Star size={14} className="text-yellow-500 fill-yellow-500"/> {dish.rating}</span>
//          </div>

//          {qty === 0 ? (
//             <button
//               onClick={() => onAdd(dish)}
//               className="w-full py-3.5 rounded-2xl bg-gray-900 text-white font-bold text-sm shadow-xl hover:bg-red-600 hover:shadow-red-200 transition-all shine-hover flex items-center justify-center gap-2"
//             >
//               <ShoppingCart size={18} /> Add to Cart
//             </button>
//          ) : (
//             <div className="flex items-center justify-between bg-gray-50 rounded-2xl p-1.5 border border-gray-200">
//               <button onClick={() => onDec(dish.id)} className="w-10 h-10 flex items-center justify-center rounded-xl bg-white shadow-sm text-gray-600 hover:text-red-600 font-bold text-lg transition">-</button>
//               <span className="font-bold text-gray-900 text-lg">{qty}</span>
//               <button onClick={() => onInc(dish.id)} className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-600 text-white shadow-md shadow-red-200 font-bold text-lg transition">+</button>
//             </div>
//          )}
//       </div>
//     </motion.div>
//   );
// }

// /* =====================================================================
//    🥘 COMPONENT: DISH DETAIL MODAL
//    ===================================================================== */
// function DishDetailModal({ dish, onClose, onAdd, qty, onInc, onDec }) {
//   if (!dish) return null;

//   return (
//     <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
//       <motion.div 
//         initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//         onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-md"
//       />
//       <motion.div 
//         initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
//         className="relative w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[85vh]"
//       >
//         {/* Left Hero Image */}
//         <div className="relative w-full md:w-5/12 h-64 md:h-auto">
//            <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" />
//            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
//            <button onClick={onClose} className="md:hidden absolute top-4 right-4 w-9 h-9 bg-white/20 backdrop-blur rounded-full text-white flex items-center justify-center"><X size={18}/></button>
//            <div className="absolute bottom-6 left-6 text-white md:hidden">
//               <h2 className="text-2xl font-bold">{dish.name}</h2>
//               <p className="text-sm opacity-90">{dish.region}</p>
//            </div>
//         </div>

//         {/* Right Details */}
//         <div className="flex-1 flex flex-col p-6 md:p-8 overflow-y-auto hide-scrollbar relative">
//            <button onClick={onClose} className="hidden md:flex absolute top-6 right-6 w-9 h-9 rounded-full bg-gray-100 hover:bg-red-100 text-gray-500 hover:text-red-600 items-center justify-center transition"><X size={20}/></button>

//            <div className="hidden md:block mb-6">
//               <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white ${dish.veg ? "bg-green-600" : "bg-red-600"}`}>
//                  {dish.veg ? "Vegetarian" : "Non-Veg"}
//               </span>
//               <h2 className="text-3xl font-extrabold text-gray-900 mt-3 mb-1">{dish.name}</h2>
//               <p className="text-gray-500 font-medium flex items-center gap-1 text-sm"><MapPin size={14}/> {dish.state}, {dish.region}</p>
//            </div>

//            <p className="text-gray-600 leading-relaxed text-sm mb-6 bg-gray-50 p-4 rounded-2xl border border-gray-100">
//               {dish.description || "An authentic regional delicacy prepared with traditional spices and locally sourced ingredients. Bursting with flavors."}
//            </p>

//            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
//               <div>
//                  <h4 className="text-xs font-bold text-gray-400 uppercase mb-2 flex items-center gap-2"><Leaf size={14}/> Ingredients</h4>
//                  <div className="flex flex-wrap gap-2">
//                     {(dish.ingredients || ["Chef's Special Spices", "Fresh Herbs"]).map((ing, i) => (
//                        <span key={i} className="px-2.5 py-1 rounded-lg bg-white border border-gray-200 text-gray-600 text-xs font-semibold shadow-sm">{ing}</span>
//                     ))}
//                  </div>
//               </div>
//               {dish.allergies?.length > 0 && (
//                  <div>
//                     <h4 className="text-xs font-bold text-red-400 uppercase mb-2 flex items-center gap-2"><AlertTriangle size={14}/> Allergens</h4>
//                     <div className="flex flex-wrap gap-2">
//                        {dish.allergies.map((alg, i) => <span key={i} className="px-2.5 py-1 rounded-lg bg-red-50 border border-red-100 text-red-600 text-xs font-bold">{alg}</span>)}
//                     </div>
//                  </div>
//               )}
//            </div>

//            {/* Nutrition */}
//            <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 mb-6">
//               <h4 className="text-xs font-bold text-blue-500 uppercase mb-3 flex items-center gap-2"><Activity size={14}/> Nutrition (Per Serving)</h4>
//               <div className="grid grid-cols-4 gap-2 text-center">
//                  {["Calories", "Protein", "Carbs", "Fats"].map((label, i) => (
//                     <div key={i} className="bg-white p-2 rounded-xl shadow-sm">
//                        <div className="text-[10px] text-gray-400 font-bold uppercase">{label}</div>
//                        <div className="text-sm font-extrabold text-gray-800">
//                           {label === "Calories" ? (dish.nutrition?.calories || 350) : (dish.nutrition?.[label.toLowerCase()] || "10g")}
//                        </div>
//                     </div>
//                  ))}
//               </div>
//            </div>

//            {/* Footer Action */}
//            <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between gap-4">
//               <div><span className="block text-xs text-gray-400 font-bold uppercase">Price</span><span className="text-3xl font-extrabold text-gray-900">₹{dish.price}</span></div>
//               <div className="flex-1 max-w-xs">
//                  {qty === 0 ? (
//                     <button onClick={() => onAdd(dish)} className="w-full py-3.5 bg-red-600 text-white rounded-2xl font-bold shadow-xl hover:bg-red-700 transition shine-hover">Add to Order</button>
//                  ) : (
//                     <div className="flex items-center justify-between bg-gray-100 rounded-2xl p-2">
//                        <button onClick={() => onDec(dish.id)} className="w-10 h-10 bg-white rounded-xl shadow-sm font-bold text-gray-600">-</button>
//                        <span className="text-xl font-bold">{qty}</span>
//                        <button onClick={() => onInc(dish.id)} className="w-10 h-10 bg-red-600 rounded-xl shadow font-bold text-white">+</button>
//                     </div>
//                  )}
//               </div>
//            </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// }

// /* =====================================================================
//    📊 COMPONENT: FILTER SIDEBAR (STICKY)
//    ===================================================================== */
// function FilterSidebar({ filters, setFilters, options, clearAll }) {
//    return (
//       <aside className="glass-panel rounded-[2rem] p-6 shadow-lg h-full overflow-y-auto hide-scrollbar">
//          <div className="flex justify-between items-center mb-6">
//             <h3 className="font-bold text-lg flex items-center gap-2 text-gray-800"><Filter size={18} className="text-red-600"/> Filters</h3>
//             <button onClick={clearAll} className="text-xs font-bold text-red-500 bg-red-50 px-3 py-1.5 rounded-lg hover:bg-red-100 transition">Reset</button>
//          </div>

//          {/* Search in Sidebar */}
//          <div className="mb-6 relative">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
//             <input 
//                type="text" 
//                placeholder="Search dishes..."
//                value={filters.search}
//                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
//                className="w-full pl-9 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-red-100 focus:border-red-400 outline-none transition-all"
//             />
//          </div>

//          <div className="space-y-8">
//             {/* Region */}
//             <div>
//                <label className="text-xs font-bold text-gray-400 uppercase mb-3 block tracking-widest">Region</label>
//                <div className="flex flex-col gap-2">
//                   <button 
//                      onClick={() => setFilters(prev => ({ ...prev, region: "All", state: "All" }))}
//                      className={`text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${filters.region === "All" ? "bg-gray-900 text-white shadow-md" : "bg-white text-gray-600 hover:bg-gray-100"}`}
//                   >
//                      All Regions
//                   </button>
//                   {options.regions.map(r => (
//                      <button 
//                         key={r} 
//                         onClick={() => setFilters(prev => ({ ...prev, region: r, state: "All" }))}
//                         className={`text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${filters.region === r ? "bg-red-600 text-white shadow-md" : "bg-white border border-gray-100 text-gray-600 hover:border-red-200 hover:text-red-600"}`}
//                      >
//                         {r}
//                      </button>
//                   ))}
//                </div>
//             </div>

//             {/* States (Dynamic) */}
//             {filters.region !== "All" && (
//                 <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
//                    <label className="text-xs font-bold text-gray-400 uppercase mb-3 block tracking-widest">State</label>
//                    <div className="flex flex-wrap gap-2">
//                       <button onClick={() => setFilters(prev => ({...prev, state: "All"}))} className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${filters.state === "All" ? "bg-gray-800 text-white" : "bg-white text-gray-500"}`}>All</button>
//                       {options.states.map(s => (
//                          <button key={s} onClick={() => setFilters(prev => ({...prev, state: s}))} className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${filters.state === s ? "bg-red-500 text-white border-red-500" : "bg-white text-gray-500 border-gray-200 hover:border-red-300"}`}>
//                             {s}
//                          </button>
//                       ))}
//                    </div>
//                 </motion.div>
//             )}

//             {/* Price */}
//             <div>
//                <div className="flex justify-between text-xs font-bold text-gray-400 uppercase mb-3 tracking-widest">
//                   <label>Max Price</label>
//                   <span className="text-red-600">₹{filters.price}</span>
//                </div>
//                <input 
//                   type="range" 
//                   min={options.minPrice} max={options.maxPrice} 
//                   value={filters.price} 
//                   onChange={(e) => setFilters(prev => ({ ...prev, price: Number(e.target.value) }))}
//                   className="w-full accent-red-600 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
//                />
//             </div>

//             {/* Type */}
//             <div>
//                <label className="text-xs font-bold text-gray-400 uppercase mb-3 block tracking-widest">Type</label>
//                <div className="flex p-1.5 bg-white rounded-xl border border-gray-200 shadow-inner">
//                   {["All", "Veg", "Non-Veg"].map(type => (
//                      <button 
//                         key={type}
//                         onClick={() => setFilters(prev => ({ ...prev, type }))}
//                         className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all ${filters.type === type ? "bg-gray-900 text-white shadow-md" : "text-gray-500 hover:text-gray-900"}`}
//                      >
//                         {type}
//                      </button>
//                   ))}
//                </div>
//             </div>
//          </div>
//       </aside>
//    );
// }

// /* =====================================================================
//    🚀 MAIN PAGE
//    ===================================================================== */
// export default function Cuisine() {
//   const { items, addItem, increment, decrement } = useCart();
  
//   // -- States --
//   const [selectedDish, setSelectedDish] = useState(null);
//   const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
//   const [favorites, setFavorites] = useState([]);
  
//   const [filters, setFilters] = useState({
//      region: "All",
//      state: "All",
//      type: "All",
//      price: 2000,
//      sort: "default",
//      search: ""
//   });

//   const [newDishes, setNewDishes] = useState([]);

//   // 1. INJECT GLOBAL STYLES
//   useEffect(() => {
//     const style = document.createElement("style");
//     style.innerHTML = GLOBAL_CSS;
//     document.head.appendChild(style);
//     return () => document.head.removeChild(style);
//   }, []);

//   // 2. DATA PROCESSING (Flattening the centralized CUISINES data)
//   const allDishes = useMemo(() => {
//      return CUISINES.flatMap(regionData => 
//         regionData.states.flatMap(stateData => 
//            stateData.dishes.map(dish => ({
//               ...dish,
//               region: regionData.region,
//               state: stateData.name
//            }))
//         )
//      );
//   }, []);

//   // 3. DYNAMIC FILTER OPTIONS
//   const filterOptions = useMemo(() => {
//      const regions = ["All", ...new Set(allDishes.map(d => d.region))];
//      // Calculate states based on selected region
//      let states = [];
//      if (filters.region !== "All") {
//         states = [...new Set(allDishes.filter(d => d.region === filters.region).map(d => d.state))];
//      }
     
//      const prices = allDishes.map(d => d.price);
//      return {
//         regions,
//         states,
//         minPrice: Math.min(...prices) || 0,
//         maxPrice: Math.max(...prices) || 1000
//      };
//   }, [allDishes, filters.region]);

//   // Set initial max price
//   useEffect(() => {
//      setFilters(prev => ({ ...prev, price: filterOptions.maxPrice }));
//   }, [filterOptions.maxPrice]);

//   // 4. FETCH NEW ARRIVALS (Simulated)
//   useEffect(() => {
//      // You can replace this with your API call: await getUserCuisines()
//      // For now, grabbing random premium dishes as "New"
//      setNewDishes(allDishes.filter(d => d.rating >= 4.7).slice(0, 8));
//   }, [allDishes]);

//   // 5. MASTER FILTER LOGIC
//   const filteredDishes = useMemo(() => {
//      let data = allDishes;

//      // Search
//      if (filters.search) {
//         const q = filters.search.toLowerCase();
//         data = data.filter(d => d.name.toLowerCase().includes(q) || d.ingredients?.some(i => i.toLowerCase().includes(q)));
//      }

//      // Filters
//      if (filters.region !== "All") data = data.filter(d => d.region === filters.region);
//      if (filters.state !== "All") data = data.filter(d => d.state === filters.state);
//      if (filters.type !== "All") data = data.filter(d => filters.type === "Veg" ? d.veg : !d.veg);
//      data = data.filter(d => d.price <= filters.price);

//      // Sort
//      if (filters.sort === "priceLow") data.sort((a,b) => a.price - b.price);
//      if (filters.sort === "priceHigh") data.sort((a,b) => b.price - a.price);
     
//      return data;
//   }, [allDishes, filters]);

//   const toggleFav = (id) => setFavorites(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

//   const clearAllFilters = () => setFilters({ region: "All", state: "All", type: "All", price: filterOptions.maxPrice, sort: "default", search: "" });

//   return (
//     <div className="min-h-screen bg-[#FDFDFD] relative font-sans selection:bg-red-100 selection:text-red-700 overflow-x-hidden">
      
//       {/* Background Decor */}
//       <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
//          <motion.div animate={{ y: [0, -30, 0] }} transition={{ duration: 10, repeat: Infinity }} className="absolute top-0 right-0 w-[700px] h-[700px] bg-orange-100/40 rounded-full blur-[120px]" />
//          <motion.div animate={{ y: [0, 30, 0] }} transition={{ duration: 12, repeat: Infinity }} className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-red-100/30 rounded-full blur-[120px]" />
//       </div>

//       <main className="max-w-[1600px] mx-auto px-4 md:px-8 py-8">
         
//          {/* HEADER SECTION */}
//          <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
//             <div className="text-center md:text-left">
//                <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
//                   India on a <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">Plate</span>
//                </h1>
//                <p className="text-gray-500 mt-2 text-lg">Authentic flavors from 28 states and 8 union territories.</p>
//             </div>
//             <button onClick={() => setMobileFilterOpen(true)} className="lg:hidden flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full font-bold shadow-lg">
//                <SlidersHorizontal size={18}/> Filters
//             </button>
//          </div>

//          {/* NEW ARRIVALS */}
//          <section className="mb-12">
//             <div className="flex items-center gap-3 mb-6 px-1">
//                <div className="p-2 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl text-white shadow-lg shadow-red-200"><Sparkles size={20}/></div>
//                <div>
//                   <h2 className="text-xl font-bold text-gray-900">Trending Now</h2>
//                   <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Top rated dishes this week</p>
//                </div>
//             </div>
//             <div className="flex gap-6 overflow-x-auto pb-10 pt-2 px-2 hide-scrollbar snap-x">
//                {newDishes.map((dish) => {
//                   const qty = items.find(it => it.foodId === dish.id)?.quantity || 0;
//                   return (
//                      <div key={dish.id} className="min-w-[300px] md:min-w-[320px] snap-center">
//                         <DishCard 
//                            dish={dish} qty={qty} 
//                            onAdd={addItem} onInc={increment} onDec={decrement}
//                            onQuickView={setSelectedDish}
//                            isFavorite={favorites.includes(dish.id)} toggleFav={toggleFav}
//                         />
//                      </div>
//                   );
//                })}
//             </div>
//          </section>

//          {/* 12-COLUMN LAYOUT */}
//          <div className="grid lg:grid-cols-12 gap-8 relative items-start">
            
//             {/* --- STICKY SIDEBAR (Desktop) --- */}
//             {/* 'sticky top-24' keeps it fixed while scrolling. max-h ensures internal scroll if needed */}
//             <div className="hidden lg:block lg:col-span-3 sticky top-24 h-[calc(100vh-8rem)]">
//                <div className="h-full overflow-y-auto hide-scrollbar pb-10">
//                   <FilterSidebar 
//                      filters={filters} setFilters={setFilters} options={filterOptions} clearAll={clearAllFilters}
//                   />
//                </div>
//             </div>

//             {/* --- MAIN CONTENT --- */}
//             <div className="col-span-12 lg:col-span-9">
               
//                {/* Sort & Active Filters Bar */}
//                <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-white/60 backdrop-blur-xl p-4 rounded-2xl border border-white/50 shadow-sm">
//                   <div className="flex flex-wrap items-center gap-2">
//                      <span className="font-bold text-gray-700 mr-2">{filteredDishes.length} Dishes</span>
                     
//                      {/* Active Filter Chips */}
//                      {filters.region !== "All" && (
//                         <span className="px-3 py-1 bg-gray-900 text-white text-xs rounded-lg flex items-center gap-2">
//                            {filters.region} <X size={12} className="cursor-pointer" onClick={() => setFilters(p => ({...p, region: "All", state: "All"}))} />
//                         </span>
//                      )}
//                      {filters.type !== "All" && (
//                         <span className={`px-3 py-1 text-white text-xs rounded-lg flex items-center gap-2 ${filters.type === "Veg" ? "bg-green-600" : "bg-red-600"}`}>
//                            {filters.type} <X size={12} className="cursor-pointer" onClick={() => setFilters(p => ({...p, type: "All"}))} />
//                         </span>
//                      )}
//                      {filters.search && (
//                         <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-lg flex items-center gap-2">
//                            "{filters.search}" <X size={12} className="cursor-pointer" onClick={() => setFilters(p => ({...p, search: ""}))} />
//                         </span>
//                      )}
//                      {(filters.region !== "All" || filters.type !== "All" || filters.search) && (
//                         <button onClick={clearAllFilters} className="text-xs font-bold text-red-500 hover:underline ml-2">Clear All</button>
//                      )}
//                   </div>

//                   <div className="relative group">
//                      <select 
//                         value={filters.sort} 
//                         onChange={(e) => setFilters(prev => ({...prev, sort: e.target.value}))}
//                         className="appearance-none bg-white border border-gray-200 pl-4 pr-10 py-2.5 rounded-xl font-bold text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-100 cursor-pointer shadow-sm hover:border-red-200 transition-colors"
//                      >
//                         <option value="default">Recommended</option>
//                         <option value="priceLow">Price: Low to High</option>
//                         <option value="priceHigh">Price: High to Low</option>
//                      </select>
//                      <ChevronDown size={16} className="absolute right-3 top-3.5 text-gray-400 pointer-events-none"/>
//                   </div>
//                </div>

//                {/* Grid */}
//                {filteredDishes.length > 0 ? (
//                   <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
//                      {filteredDishes.map((dish) => {
//                         const qty = items.find(it => it.foodId === dish.id)?.quantity || 0;
//                         return (
//                            <DishCard 
//                               key={dish.id} dish={dish} qty={qty}
//                               onAdd={addItem} onInc={increment} onDec={decrement}
//                               onQuickView={setSelectedDish}
//                               isFavorite={favorites.includes(dish.id)} toggleFav={toggleFav}
//                            />
//                         );
//                      })}
//                   </div>
//                ) : (
//                   <div className="flex flex-col items-center justify-center py-24 bg-white/40 rounded-[3rem] border border-white/50">
//                      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
//                         <Search size={40} className="text-gray-300"/>
//                      </div>
//                      <h3 className="text-2xl font-bold text-gray-800">No dishes found</h3>
//                      <p className="text-gray-500 mt-2">Try adjusting your filters or search query.</p>
//                      <button onClick={clearAllFilters} className="mt-6 px-6 py-2.5 bg-red-600 text-white rounded-xl font-bold shadow-lg hover:bg-red-700 transition">Reset Filters</button>
//                   </div>
//                )}
//             </div>
//          </div>

//       </main>

//       {/* --- MODALS --- */}
//       <AnimatePresence>
//          {selectedDish && (
//             <DishDetailModal 
//                dish={selectedDish} 
//                onClose={() => setSelectedDish(null)}
//                onAdd={addItem} onInc={increment} onDec={decrement}
//                qty={items.find(it => it.foodId === selectedDish.id)?.quantity || 0}
//             />
//          )}
         
//          {/* Mobile Filter Drawer */}
//          {mobileFilterOpen && (
//              <motion.div 
//                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//                className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end lg:hidden"
//              >
//                 <motion.div 
//                   initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
//                   transition={{ type: "spring", damping: 25, stiffness: 300 }}
//                   className="w-full max-w-sm bg-white h-full overflow-y-auto p-6"
//                 >
//                    <div className="flex justify-between items-center mb-6">
//                       <h2 className="text-xl font-bold">Filters</h2>
//                       <button onClick={() => setMobileFilterOpen(false)} className="p-2 bg-gray-100 rounded-full hover:bg-red-100 hover:text-red-600 transition"><X size={20}/></button>
//                    </div>
//                    <FilterSidebar 
//                       filters={filters} setFilters={setFilters} options={filterOptions} clearAll={clearAllFilters}
//                    />
//                    <div className="sticky bottom-0 bg-white pt-4 border-t mt-4">
//                       <button onClick={() => setMobileFilterOpen(false)} className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold shadow-xl">
//                          Show {filteredDishes.length} Dishes
//                       </button>
//                    </div>
//                 </motion.div>
//              </motion.div>
//          )}
//       </AnimatePresence>

//     </div>
//   );
// }
















import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../../context/CartContext";
import { getUserCuisines } from "../../api/api"; // API for New Dishes
import { CUISINES } from "../../assets/data/dishes"; // Static Data

// Icons
import {
  Star,
  Filter,
  Clock,
  ShoppingCart,
  Heart,
  Sparkles,
  X,
  Leaf,
  Activity,
  AlertTriangle,
  Eye,
  MapPin,
  ChevronDown,
  ChevronUp,
  Search,
  SlidersHorizontal
} from "lucide-react";

/* =====================================================================
   🎨 GLOBAL STYLES
   ===================================================================== */
const GLOBAL_CSS = `
  .hide-scrollbar::-webkit-scrollbar { display: none; }
  .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  
  .glass-panel {
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.6);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.05);
  }

  .shine-hover { position: relative; overflow: hidden; }
  .shine-hover::after {
    content: ''; position: absolute; top: 0; left: -100%; width: 50%; height: 100%;
    background: linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent);
    transform: skewX(-25deg); pointer-events: none; transition: 0.5s;
  }
  .shine-hover:hover::after { left: 150%; transition: 0.7s ease-in-out; }
`;

/* =====================================================================
   🥣 COMPONENT: DISH CARD
   ===================================================================== */
function DishCard({ dish, onAdd, onInc, onDec, qty, onQuickView, isFavorite, toggleFav }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      className="group relative glass-panel rounded-[2rem] overflow-hidden hover:shadow-[0_20px_50px_rgba(226,55,68,0.15)] transition-all duration-500 hover:-translate-y-2 h-full flex flex-col"
    >
      {/* Image Area */}
      <div className="relative h-56 overflow-hidden cursor-pointer shrink-0" onClick={() => onQuickView(dish)}>
        <img
          src={dish.image || dish.imageUrl}
          alt={dish.name || dish.mealName}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-70 transition-opacity" />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg text-white ${dish.veg || dish.mealCategory === "Veg" ? "bg-green-600" : "bg-red-600"}`}>
            {dish.veg || dish.mealCategory === "Veg" ? "Veg" : "Non-Veg"}
          </span>
          {dish.rating >= 4.8 && (
            <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg bg-yellow-500 text-white flex items-center gap-1">
              <Star size={10} fill="white" /> Top Rated
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="absolute top-4 right-4 flex flex-col gap-3">
           <button 
             onClick={(e) => { e.stopPropagation(); toggleFav(dish.id || dish.mealId); }}
             className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center hover:bg-white transition-all shadow-lg group/icon"
           >
             <Heart size={16} className={`transition-colors ${isFavorite ? 'fill-red-500 text-red-500' : 'text-white group-hover/icon:text-red-500'}`} />
           </button>
           <button 
             onClick={(e) => { e.stopPropagation(); onQuickView(dish); }}
             className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-gray-900 transition-all shadow-lg"
           >
             <Eye size={16} />
           </button>
        </div>

        {/* Overlay Info */}
        <div className="absolute bottom-0 left-0 w-full p-4 text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
           <h3 className="text-lg font-bold leading-tight mb-1 truncate">{dish.name || dish.mealName}</h3>
           <div className="flex justify-between items-end">
              <p className="text-xs text-gray-200 flex items-center gap-1 opacity-90">
                 <MapPin size={12} /> {dish.state || "India"}
              </p>
              <span className="text-xl font-bold">₹{dish.price || dish.mealPrice}</span>
           </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
         <div className="flex items-center gap-4 text-xs font-bold text-gray-400 mb-4 uppercase tracking-wide">
            <span className="flex items-center gap-1"><Clock size={14}/> 30 min</span>
            <span className="flex items-center gap-1"><Star size={14} className="text-yellow-500 fill-yellow-500"/> {dish.rating || 4.5}</span>
         </div>

         <div className="mt-auto">
            {qty === 0 ? (
                <button
                  onClick={() => onAdd(dish)}
                  className="w-full py-3 rounded-xl bg-gray-900 text-white font-bold text-sm shadow-lg hover:bg-red-600 hover:shadow-red-200 transition-all shine-hover flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={16} /> Add
                </button>
            ) : (
                <div className="flex items-center justify-between bg-gray-50 rounded-xl p-1 border border-gray-200">
                  <button onClick={() => onDec(dish.id || dish.mealId)} className="w-9 h-9 flex items-center justify-center rounded-lg bg-white shadow-sm text-gray-600 hover:text-red-600 font-bold text-lg transition">-</button>
                  <span className="font-bold text-gray-900 text-base">{qty}</span>
                  <button onClick={() => onInc(dish.id || dish.mealId)} className="w-9 h-9 flex items-center justify-center rounded-lg bg-red-600 text-white shadow-md font-bold text-lg transition">+</button>
                </div>
            )}
         </div>
      </div>
    </motion.div>
  );
}

/* =====================================================================
   🥘 COMPONENT: DISH DETAIL MODAL
   ===================================================================== */
function DishDetailModal({ dish, onClose, onAdd, qty, onInc, onDec }) {
  if (!dish) return null;

  const id = dish.id || dish.mealId;
  const name = dish.name || dish.mealName;
  const price = dish.price || dish.mealPrice;
  const image = dish.image || dish.imageUrl;
  const veg = dish.veg || dish.mealCategory === "Veg";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-md"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[85vh]"
      >
        <div className="relative w-full md:w-5/12 h-64 md:h-auto">
           <img src={image} alt={name} className="w-full h-full object-cover" />
           <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
           <button onClick={onClose} className="md:hidden absolute top-4 right-4 w-9 h-9 bg-white/20 backdrop-blur rounded-full text-white flex items-center justify-center"><X size={18}/></button>
           <div className="absolute bottom-6 left-6 text-white md:hidden">
              <h2 className="text-2xl font-bold">{name}</h2>
              <p className="text-sm opacity-90">{dish.region}</p>
           </div>
        </div>

        <div className="flex-1 flex flex-col p-6 md:p-8 overflow-y-auto hide-scrollbar relative">
           <button onClick={onClose} className="hidden md:flex absolute top-6 right-6 w-9 h-9 rounded-full bg-gray-100 hover:bg-red-100 text-gray-500 hover:text-red-600 items-center justify-center transition"><X size={20}/></button>

           <div className="hidden md:block mb-6">
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white ${veg ? "bg-green-600" : "bg-red-600"}`}>
                 {veg ? "Vegetarian" : "Non-Veg"}
              </span>
              <h2 className="text-3xl font-extrabold text-gray-900 mt-3 mb-1">{name}</h2>
              <p className="text-gray-500 font-medium flex items-center gap-1 text-sm"><MapPin size={14}/> {dish.state}, {dish.region}</p>
           </div>

           <p className="text-gray-600 leading-relaxed text-sm mb-6 bg-gray-50 p-4 rounded-2xl border border-gray-100">
              {dish.description || "An authentic delicacy prepared with traditional spices and locally sourced ingredients. Bursting with flavors."}
           </p>

           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                 <h4 className="text-xs font-bold text-gray-400 uppercase mb-2 flex items-center gap-2"><Leaf size={14}/> Ingredients</h4>
                 <div className="flex flex-wrap gap-2">
                    {(dish.ingredients || ["Secret Spices", "Fresh Herbs"]).map((ing, i) => (
                       <span key={i} className="px-2.5 py-1 rounded-lg bg-white border border-gray-200 text-gray-600 text-xs font-semibold shadow-sm">{ing}</span>
                    ))}
                 </div>
              </div>
              {dish.allergies?.length > 0 && (
                 <div>
                    <h4 className="text-xs font-bold text-red-400 uppercase mb-2 flex items-center gap-2"><AlertTriangle size={14}/> Allergens</h4>
                    <div className="flex flex-wrap gap-2">
                       {dish.allergies.map((alg, i) => <span key={i} className="px-2.5 py-1 rounded-lg bg-red-50 border border-red-100 text-red-600 text-xs font-bold">{alg}</span>)}
                    </div>
                 </div>
              )}
           </div>

           <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 mb-6">
              <h4 className="text-xs font-bold text-blue-500 uppercase mb-3 flex items-center gap-2"><Activity size={14}/> Nutrition</h4>
              <div className="grid grid-cols-4 gap-2 text-center">
                 {["Calories", "Protein", "Carbs", "Fats"].map((label, i) => (
                    <div key={i} className="bg-white p-2 rounded-xl shadow-sm">
                       <div className="text-[10px] text-gray-400 font-bold uppercase">{label}</div>
                       <div className="text-sm font-extrabold text-gray-800">
                          {label === "Calories" ? (dish.nutrition?.calories || 350) : (dish.nutrition?.[label.toLowerCase()] || "10g")}
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between gap-4">
              <div><span className="block text-xs text-gray-400 font-bold uppercase">Price</span><span className="text-3xl font-extrabold text-gray-900">₹{price}</span></div>
              <div className="flex-1 max-w-xs">
                 {qty === 0 ? (
                    <button onClick={() => onAdd(dish)} className="w-full py-3.5 bg-red-600 text-white rounded-2xl font-bold shadow-xl hover:bg-red-700 transition shine-hover">Add to Order</button>
                 ) : (
                    <div className="flex items-center justify-between bg-gray-100 rounded-2xl p-2">
                       <button onClick={() => onDec(id)} className="w-10 h-10 bg-white rounded-xl shadow-sm font-bold text-gray-600">-</button>
                       <span className="text-xl font-bold">{qty}</span>
                       <button onClick={() => onInc(id)} className="w-10 h-10 bg-red-600 rounded-xl shadow font-bold text-white">+</button>
                    </div>
                 )}
              </div>
           </div>
        </div>
      </motion.div>
    </div>
  );
}

/* =====================================================================
   📊 COMPONENT: FILTER SIDEBAR (Collapsible Sections)
   ===================================================================== */
function FilterSidebar({ filters, setFilters, options, clearAll }) {
   // Collapsible state for sections
   const [openSections, setOpenSections] = useState({ region: true, state: true, price: true, type: true });

   const toggleSection = (key) => setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));

   return (
      <aside className="glass-panel rounded-[2rem] p-6 shadow-lg h-full overflow-y-auto hide-scrollbar">
         <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg flex items-center gap-2 text-gray-800"><Filter size={18} className="text-red-600"/> Filters</h3>
            <button onClick={clearAll} className="text-xs font-bold text-red-500 bg-red-50 px-3 py-1.5 rounded-lg hover:bg-red-100 transition">Reset</button>
         </div>

         <div className="mb-6 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
               type="text" 
               placeholder="Search dishes..."
               value={filters.search}
               onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
               className="w-full pl-9 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-red-100 focus:border-red-400 outline-none transition-all"
            />
         </div>

         <div className="space-y-6">
            {/* Region Filter */}
            <div className="border-b border-gray-100 pb-4">
               <button onClick={() => toggleSection('region')} className="w-full flex justify-between items-center text-xs font-bold text-gray-400 uppercase mb-3 tracking-widest hover:text-gray-600">
                  Region {openSections.region ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}
               </button>
               {openSections.region && (
                  <div className="flex flex-col gap-2 animate-in slide-in-from-top-2 duration-300">
                     <button onClick={() => setFilters(prev => ({ ...prev, region: "All", state: "All" }))} className={`text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${filters.region === "All" ? "bg-gray-900 text-white shadow-md" : "bg-white text-gray-600 hover:bg-gray-100"}`}>All Regions</button>
                     {options.regions.map(r => (
                        <button key={r} onClick={() => setFilters(prev => ({ ...prev, region: r, state: "All" }))} className={`text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${filters.region === r ? "bg-red-600 text-white shadow-md" : "bg-white border border-gray-100 text-gray-600 hover:border-red-200 hover:text-red-600"}`}>{r}</button>
                     ))}
                  </div>
               )}
            </div>

            {/* State Filter (Dynamic) */}
            {filters.region !== "All" && (
                <div className="border-b border-gray-100 pb-4">
                   <button onClick={() => toggleSection('state')} className="w-full flex justify-between items-center text-xs font-bold text-gray-400 uppercase mb-3 tracking-widest hover:text-gray-600">
                      State {openSections.state ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}
                   </button>
                   {openSections.state && (
                      <div className="flex flex-wrap gap-2 animate-in slide-in-from-top-2">
                         <button onClick={() => setFilters(prev => ({...prev, state: "All"}))} className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${filters.state === "All" ? "bg-gray-800 text-white" : "bg-white text-gray-500"}`}>All</button>
                         {options.states.map(s => (
                            <button key={s} onClick={() => setFilters(prev => ({...prev, state: s}))} className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${filters.state === s ? "bg-red-500 text-white border-red-500" : "bg-white text-gray-500 border-gray-200 hover:border-red-300"}`}>{s}</button>
                         ))}
                      </div>
                   )}
                </div>
            )}

            {/* Price Filter */}
            <div className="border-b border-gray-100 pb-4">
               <button onClick={() => toggleSection('price')} className="w-full flex justify-between items-center text-xs font-bold text-gray-400 uppercase mb-3 tracking-widest hover:text-gray-600">
                  Price Range {openSections.price ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}
               </button>
               {openSections.price && (
                  <div className="animate-in slide-in-from-top-2">
                     <div className="flex justify-between text-sm font-bold text-gray-800 mb-2">
                        <span>₹{options.minPrice}</span>
                        <span className="text-red-600">₹{filters.price}</span>
                     </div>
                     <input type="range" min={options.minPrice} max={options.maxPrice} value={filters.price} onChange={(e) => setFilters(prev => ({ ...prev, price: Number(e.target.value) }))} className="w-full accent-red-600 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"/>
                  </div>
               )}
            </div>

            {/* Type Filter */}
            <div>
               <label className="text-xs font-bold text-gray-400 uppercase mb-3 block tracking-widest">Type</label>
               <div className="flex p-1.5 bg-white rounded-xl border border-gray-200 shadow-inner">
                  {["All", "Veg", "Non-Veg"].map(type => (
                     <button key={type} onClick={() => setFilters(prev => ({ ...prev, type }))} className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all ${filters.type === type ? "bg-gray-900 text-white shadow-md" : "text-gray-500 hover:text-gray-900"}`}>{type}</button>
                  ))}
               </div>
            </div>
         </div>
      </aside>
   );
}

/* =====================================================================
   🚀 MAIN PAGE
   ===================================================================== */
export default function Cuisine() {
  const { items, addItem, increment, decrement } = useCart();
  
  // -- States --
  const [selectedDish, setSelectedDish] = useState(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  
  const [filters, setFilters] = useState({
     region: "All",
     state: "All",
     type: "All",
     price: 2000,
     sort: "default",
     search: ""
  });

  const [newDishes, setNewDishes] = useState([]);
  const [loadingNew, setLoadingNew] = useState(true);

  // 1. INJECT STYLES
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = GLOBAL_CSS;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // 2. MERGE STATIC DATA
  const allStaticDishes = useMemo(() => {
     return CUISINES.flatMap(regionData => 
        regionData.states.flatMap(stateData => 
           stateData.dishes.map(dish => ({
              ...dish,
              region: regionData.region,
              state: stateData.name,
              isStatic: true
           }))
        )
     );
  }, []);

  // 3. FETCH NEW ARRIVALS (Admin Added)
  useEffect(() => {
    const fetchNew = async () => {
       setLoadingNew(true);
       try {
          const res = await getUserCuisines();
          const rawData = res.data || [];
          
          // Flatten Admin Data
          const adminDishes = [];
          rawData.forEach(c => {
             c.meals.forEach(m => {
                adminDishes.push({
                   id: m.id, // backend ID
                   mealId: m.id,
                   name: m.mealName,
                   mealName: m.mealName,
                   price: m.mealPrice,
                   mealPrice: m.mealPrice,
                   image: m.imageUrl,
                   imageUrl: m.imageUrl,
                   veg: m.mealCategory === "Veg",
                   region: c.region,
                   state: c.state,
                   rating: 4.8, // Default rating for new items
                   isNew: true,
                   description: m.description,
                   ingredients: m.ingredients,
                   nutrition: m.nutrition,
                   allergies: m.allergies
                });
             });
          });
          
          // Newest first
          setNewDishes(adminDishes.reverse()); 
       } catch (e) { console.error(e); } 
       finally { setLoadingNew(false); }
    };
    fetchNew();
  }, []);

  // 4. COMBINE ALL FOR GRID (Admin + Static)
  const combinedDishes = useMemo(() => {
     return [...newDishes, ...allStaticDishes];
  }, [newDishes, allStaticDishes]);

  // 5. FILTER LOGIC
  const filterOptions = useMemo(() => {
     const regions = ["All", ...new Set(combinedDishes.map(d => d.region))];
     let states = [];
     if (filters.region !== "All") {
        states = [...new Set(combinedDishes.filter(d => d.region === filters.region).map(d => d.state))];
     }
     const prices = combinedDishes.map(d => d.price || d.mealPrice);
     return {
        regions,
        states,
        minPrice: Math.min(...prices) || 0,
        maxPrice: Math.max(...prices) || 2000
     };
  }, [combinedDishes, filters.region]);

  // Initial Price Set
  useEffect(() => {
     // Only set if user hasn't changed it manually (simple check)
     if (filters.price === 2000) setFilters(prev => ({ ...prev, price: filterOptions.maxPrice }));
  }, [filterOptions.maxPrice]);

  const filteredDishes = useMemo(() => {
     let data = combinedDishes;

     if (filters.search) {
        const q = filters.search.toLowerCase();
        data = data.filter(d => (d.name || d.mealName).toLowerCase().includes(q));
     }

     if (filters.region !== "All") data = data.filter(d => d.region === filters.region);
     if (filters.state !== "All") data = data.filter(d => d.state === filters.state);
     if (filters.type !== "All") {
        const isVeg = filters.type === "Veg";
        data = data.filter(d => (d.veg === isVeg || (d.mealCategory === "Veg") === isVeg));
     }
     
     data = data.filter(d => (d.price || d.mealPrice) <= filters.price);

     if (filters.sort === "priceLow") data.sort((a,b) => (a.price||a.mealPrice) - (b.price||b.mealPrice));
     if (filters.sort === "priceHigh") data.sort((a,b) => (b.price||b.mealPrice) - (a.price||a.mealPrice));
     
     return data;
  }, [combinedDishes, filters]);

  const toggleFav = (id) => setFavorites(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const clearAllFilters = () => setFilters({ region: "All", state: "All", type: "All", price: filterOptions.maxPrice, sort: "default", search: "" });

  return (
    <div className="min-h-screen bg-[#FDFDFD] relative font-sans selection:bg-red-100 selection:text-red-700 overflow-x-hidden">
      
      {/* Decor */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
         <motion.div animate={{ y: [0, -30, 0] }} transition={{ duration: 10, repeat: Infinity }} className="absolute top-0 right-0 w-[700px] h-[700px] bg-orange-100/40 rounded-full blur-[120px]" />
         <motion.div animate={{ y: [0, 30, 0] }} transition={{ duration: 12, repeat: Infinity }} className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-red-100/30 rounded-full blur-[120px]" />
      </div>

      <main className="max-w-[1600px] mx-auto px-4 md:px-8 py-8">
         
         <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
            <div className="text-center md:text-left">
               <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
                  India on a <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">Plate</span>
               </h1>
               <p className="text-gray-500 mt-2 text-lg">Authentic flavors from 28 states and 8 union territories.</p>
            </div>
            <button onClick={() => setMobileFilterOpen(true)} className="lg:hidden flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full font-bold shadow-lg">
               <SlidersHorizontal size={18}/> Filters
            </button>
         </div>

         {/* --- NEW ARRIVALS (Admin Dishes) --- */}
         {newDishes.length > 0 && (
            <section className="mb-12">
               <div className="flex items-center gap-3 mb-6 px-1">
                  <div className="p-2 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl text-white shadow-lg shadow-red-200"><Sparkles size={20}/></div>
                  <div>
                     <h2 className="text-xl font-bold text-gray-900">New Arrivals</h2>
                     <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Freshly added from kitchen</p>
                  </div>
               </div>
               <div className="flex gap-6 overflow-x-auto pb-10 pt-2 px-2 hide-scrollbar snap-x">
                  {newDishes.map((dish) => {
                     const id = dish.id || dish.mealId;
                     const qty = items.find(it => it.foodId === id)?.quantity || 0;
                     return (
                        <div key={id} className="min-w-[300px] md:min-w-[320px] snap-center">
                           <DishCard 
                              dish={dish} qty={qty} 
                              onAdd={addItem} onInc={increment} onDec={decrement}
                              onQuickView={setSelectedDish}
                              isFavorite={favorites.includes(id)} toggleFav={toggleFav}
                           />
                        </div>
                     );
                  })}
               </div>
            </section>
         )}

         {/* --- MAIN GRID LAYOUT --- */}
         <div className="grid lg:grid-cols-12 gap-8 relative items-start">
            
            {/* Sticky Sidebar */}
            <div className="hidden lg:block lg:col-span-3 sticky top-24 h-[calc(100vh-8rem)]">
               <div className="h-full overflow-y-auto hide-scrollbar pb-10">
                  <FilterSidebar filters={filters} setFilters={setFilters} options={filterOptions} clearAll={clearAllFilters} />
               </div>
            </div>

            {/* Content */}
            <div className="col-span-12 lg:col-span-9">
               {/* Active Chips Bar */}
               <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-white/60 backdrop-blur-xl p-4 rounded-2xl border border-white/50 shadow-sm">
                  <div className="flex flex-wrap items-center gap-2">
                     <span className="font-bold text-gray-700 mr-2">{filteredDishes.length} Dishes</span>
                     {filters.region !== "All" && <span className="px-3 py-1 bg-gray-900 text-white text-xs rounded-lg flex items-center gap-2">{filters.region} <X size={12} className="cursor-pointer" onClick={() => setFilters(p => ({...p, region: "All", state: "All"}))} /></span>}
                     {filters.type !== "All" && <span className={`px-3 py-1 text-white text-xs rounded-lg flex items-center gap-2 ${filters.type === "Veg" ? "bg-green-600" : "bg-red-600"}`}>{filters.type} <X size={12} className="cursor-pointer" onClick={() => setFilters(p => ({...p, type: "All"}))} /></span>}
                     {(filters.region !== "All" || filters.type !== "All") && <button onClick={clearAllFilters} className="text-xs font-bold text-red-500 hover:underline ml-2">Clear All</button>}
                  </div>
                  <div className="relative group">
                     <select value={filters.sort} onChange={(e) => setFilters(prev => ({...prev, sort: e.target.value}))} className="appearance-none bg-white border border-gray-200 pl-4 pr-10 py-2.5 rounded-xl font-bold text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-100 cursor-pointer shadow-sm hover:border-red-200 transition-colors">
                        <option value="default">Recommended</option>
                        <option value="priceLow">Price: Low to High</option>
                        <option value="priceHigh">Price: High to Low</option>
                     </select>
                     <ChevronDown size={16} className="absolute right-3 top-3.5 text-gray-400 pointer-events-none"/>
                  </div>
               </div>

               {/* Dish Grid */}
               {filteredDishes.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                     {filteredDishes.map((dish) => {
                        const id = dish.id || dish.mealId;
                        const qty = items.find(it => it.foodId === id)?.quantity || 0;
                        return (
                           <DishCard 
                              key={id} dish={dish} qty={qty}
                              onAdd={addItem} onInc={increment} onDec={decrement}
                              onQuickView={setSelectedDish}
                              isFavorite={favorites.includes(id)} toggleFav={toggleFav}
                           />
                        );
                     })}
                  </div>
               ) : (
                  <div className="flex flex-col items-center justify-center py-24 bg-white/40 rounded-[3rem] border border-white/50">
                     <Search size={40} className="text-gray-300 mb-6"/>
                     <h3 className="text-2xl font-bold text-gray-800">No dishes found</h3>
                     <p className="text-gray-500 mt-2">Try adjusting your filters.</p>
                     <button onClick={clearAllFilters} className="mt-6 px-6 py-2.5 bg-red-600 text-white rounded-xl font-bold shadow-lg hover:bg-red-700 transition">Reset Filters</button>
                  </div>
               )}
            </div>
         </div>
      </main>

      {/* --- MODALS --- */}
      <AnimatePresence>
         {selectedDish && (
            <DishDetailModal 
               dish={selectedDish} onClose={() => setSelectedDish(null)}
               onAdd={addItem} onInc={increment} onDec={decrement}
               qty={items.find(it => it.foodId === (selectedDish.id || selectedDish.mealId))?.quantity || 0}
            />
         )}
         {mobileFilterOpen && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end lg:hidden">
                <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25 }} className="w-full max-w-sm bg-white h-full overflow-y-auto p-6">
                   <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold">Filters</h2>
                      <button onClick={() => setMobileFilterOpen(false)} className="p-2 bg-gray-100 rounded-full hover:bg-red-100 hover:text-red-600 transition"><X size={20}/></button>
                   </div>
                   <FilterSidebar filters={filters} setFilters={setFilters} options={filterOptions} clearAll={clearAllFilters} />
                   <div className="sticky bottom-0 bg-white pt-4 border-t mt-4">
                      <button onClick={() => setMobileFilterOpen(false)} className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold shadow-xl">Show {filteredDishes.length} Dishes</button>
                   </div>
                </motion.div>
             </motion.div>
         )}
      </AnimatePresence>
    </div>
  );
}