// // // ================================================
// // AdminMenu.jsx
// // Cuisine + Meal Management (Glassmorphic Premium UI)
// // ================================================

// import React, { useEffect, useState } from "react";
// import API from "../../api/api";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Plus,
//   Edit,
//   Trash2,
//   UtensilsCrossed,
//   MapPin,
//   IndianRupee,
//   Leaf,
//   Flame,
//   X,
// } from "lucide-react";

// // FIELD VALIDATION HELPERS
// const isValidImage = (url) =>
//   /^https?:\/\/.*\.(png|jpg|jpeg|gif|webp|svg)$/i.test(url.trim());

// const isPositiveNumber = (v) => /^\d+(\.\d+)?$/.test(v);

// // ======================================================================
// // MAIN COMPONENT
// // ======================================================================
// export default function AdminMenu() {
//   const [cuisines, setCuisines] = useState([]);
//   const [meals, setMeals] = useState([]);

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // ---------- CUISINE FORM ----------
//   const emptyCuisine = { id: null, cuisineName: "", region: "", state: "" };
//   const [cForm, setCForm] = useState(emptyCuisine);
//   const [cError, setCError] = useState({});
//   const [showCuisineForm, setShowCuisineForm] = useState(false);

//   // ---------- MEAL FORM ----------
//   const emptyMeal = {
//     id: null,
//     cuisineId: "",
//     mealName: "",
//     mealCategory: "Veg",
//     mealType: "Lunch",
//     description: "",
//     imageUrl: "",
//     nutritionInfo: "",
//     mealPrice: "",
//     ingredients: "",
//     allergens: "",
//   };
//   const [mForm, setMForm] = useState(emptyMeal);
//   const [mError, setMError] = useState({});
//   const [showMealForm, setShowMealForm] = useState(false);
//   const [isEditingMeal, setIsEditingMeal] = useState(false);

//   // ======================================================================
//   // FETCH ALL DATA
//   // ======================================================================
//   useEffect(() => {
//     loadAll();
//   }, []);

//   const loadAll = async () => {
//     setError("");
//     setLoading(true);
//     try {
//       await Promise.all([loadCuisines(), loadMeals()]);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to load data. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadCuisines = async () => {
//     const res = await API.get("/adminn/cuisines");
//     setCuisines(res.data || []);
//   };

//   const loadMeals = async () => {
//     const res = await API.get("/adminn/meals");
//     setMeals(res.data || []);
//   };

//   // ======================================================================
//   // CUISINE VALIDATION
//   // ======================================================================
//   const validateCuisine = (v) => {
//     const e = {};
//     if (!v.cuisineName.trim()) e.cuisineName = "Cuisine name is required.";
//     if (!v.region.trim()) e.region = "Region is required.";
//     if (!v.state.trim()) e.state = "State is required.";
//     return e;
//   };

//   // ======================================================================
//   // MEAL VALIDATION
//   // ======================================================================
//   const validateMeal = (v) => {
//     const e = {};
//     if (!v.cuisineId) e.cuisineId = "Cuisine must be selected.";
//     if (!v.mealName.trim()) e.mealName = "Meal name cannot be empty.";
//     if (!isPositiveNumber(v.mealPrice))
//       e.mealPrice = "Price must be a positive number.";
//     if (!isValidImage(v.imageUrl))
//       e.imageUrl = "Image URL must be a valid HTTP image link.";
//     return e;
//   };

//   // ======================================================================
//   // CUISINE FORM SUBMIT
//   // ======================================================================
//   const handleCuisineSubmit = async (e) => {
//     e.preventDefault();
//     const errs = validateCuisine(cForm);
//     setCError(errs);
//     if (Object.keys(errs).length) return;

//     try {
//       if (cForm.id) {
//         await API.put(`/adminn/cuisines/id/${cForm.id}`, cForm);
//       } else {
//         await API.post(`/adminn/cuisines`, cForm);
//       }
//       setShowCuisineForm(false);
//       setCForm(emptyCuisine);
//       loadCuisines();
//     } catch (err) {
//       alert("Error saving cuisine");
//     }
//   };

//   // ======================================================================
//   // MEAL FORM SUBMIT
//   // ======================================================================
//   const handleMealSubmit = async (e) => {
//     e.preventDefault();
//     const errs = validateMeal(mForm);
//     setMError(errs);
//     if (Object.keys(errs).length) return;

//     const payload = {
//       mealName: mForm.mealName,
//       mealCategory: mForm.mealCategory,
//       mealType: mForm.mealType,
//       description: mForm.description,
//       imageUrl: mForm.imageUrl,
//       mealPrice: Number(mForm.mealPrice),
//       nutritionInfo: mForm.nutritionInfo,
//       ingredients: mForm.ingredients
//         .split(",")
//         .map((x) => x.trim())
//         .filter(Boolean),
//       allergens: mForm.allergens
//         .split(",")
//         .map((x) => x.trim())
//         .filter(Boolean),
//       cuisine: { id: Number(mForm.cuisineId) },
//     };

//     try {
//       if (isEditingMeal) {
//         const res = await API.put(`/adminn/meals/${mForm.id}`, payload);
//         setMeals((prev) =>
//           prev.map((m) => (m.id === mForm.id ? res.data : m))
//         );
//       } else {
//         const res = await API.post(`/adminn/meals`, payload);
//         setMeals((prev) => [res.data, ...prev]);
//       }
//       setShowMealForm(false);
//       setMForm(emptyMeal);
//       setIsEditingMeal(false);
//     } catch (err) {
//       console.error(err);
//       alert("Error saving meal.");
//     }
//   };

//   // ======================================================================
//   // DELETE MEAL
//   // ======================================================================
//   const deleteMeal = async (id) => {
//     if (!window.confirm("Delete this meal?")) return;
//     try {
//       await API.delete(`/adminn/meals/${id}`);
//       setMeals((prev) => prev.filter((m) => m.id !== id));
//     } catch (err) {
//       alert("Error deleting meal.");
//     }
//   };

//   // Glass container & card animations
//   const cardVariants = {
//     hidden: { opacity: 0, y: 16 },
//     visible: (i = 1) => ({
//       opacity: 1,
//       y: 0,
//       transition: {
//         delay: i * 0.04,
//         duration: 0.3,
//       },
//     }),
//   };

//   // ======================================================================
//   // UI STARTS HERE
//   // ======================================================================
//   return (
//     <div className="space-y-8">
//       {/* PAGE HEADER */}
//       <motion.div
//         initial={{ opacity: 0, y: -10 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.35 }}
//         className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
//       >
//         <div>
//           <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-[#E23744]">
//             <UtensilsCrossed className="h-4 w-4" />
//             Menu & Cuisines
//           </div>
//           <h1 className="mt-3 text-2xl font-extrabold text-gray-900 md:text-3xl">
//             Admin Menu Management
//           </h1>
//           <p className="mt-1 text-sm text-gray-500">
//             Manage cuisines & meals shown to users in the Tiffino app.
//           </p>
//         </div>

//         <div className="flex flex-wrap gap-3">
//           <motion.button
//             whileHover={{ scale: 1.03, y: -1 }}
//             whileTap={{ scale: 0.97 }}
//             onClick={() => {
//               setCForm(emptyCuisine);
//               setCError({});
//               setShowCuisineForm(true);
//             }}
//             className="
//               inline-flex items-center gap-2 rounded-2xl 
//               bg-white/80 px-4 py-2.5 text-sm font-semibold 
//               text-gray-800 shadow-sm backdrop-blur 
//               border border-gray-200 hover:shadow-md
//             "
//           >
//             <Plus className="h-4 w-4 text-[#E23744]" />
//             Add Cuisine
//           </motion.button>

//           <motion.button
//             whileHover={{ scale: 1.03, y: -1 }}
//             whileTap={{ scale: 0.97 }}
//             onClick={() => {
//               setMForm(emptyMeal);
//               setMError({});
//               setIsEditingMeal(false);
//               setShowMealForm(true);
//             }}
//             className="
//               inline-flex items-center gap-2 rounded-2xl 
//               bg-[#E23744] px-4 py-2.5 text-sm font-semibold text-white 
//               shadow-lg shadow-[#E23744]/30 hover:shadow-xl
//             "
//           >
//             <Plus className="h-4 w-4" />
//             Add Meal
//           </motion.button>
//         </div>
//       </motion.div>

//       {/* ERROR / LOADING STATES */}
//       {error && (
//         <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
//           {error}
//         </div>
//       )}
//       {loading && (
//         <div className="rounded-2xl border border-gray-100 bg-white/80 px-4 py-3 text-sm text-gray-500 shadow-sm">
//           Loading menu data...
//         </div>
//       )}

//       {/* CUISINES SECTION */}
//       <section className="space-y-3">
//         <div className="flex items-center justify-between">
//           <h2 className="text-lg font-semibold text-gray-900">Cuisines</h2>
//           <p className="text-xs text-gray-500">
//             Total: <span className="font-semibold">{cuisines.length}</span>
//           </p>
//         </div>

//         {cuisines.length === 0 ? (
//           <p className="text-sm text-gray-500">
//             No cuisines added yet. Start by adding a cuisine.
//           </p>
//         ) : (
//           <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
//             {cuisines.map((c, idx) => (
//               <motion.div
//                 key={c.id}
//                 custom={idx}
//                 variants={cardVariants}
//                 initial="hidden"
//                 animate="visible"
//                 className="
//                   rounded-2xl border border-white/60 bg-white/80 
//                   p-4 shadow-md backdrop-blur hover:-translate-y-1 
//                   hover:shadow-lg transition-all
//                 "
//               >
//                 <div className="flex items-start justify-between gap-3">
//                   <div>
//                     <h3 className="text-sm font-semibold text-gray-900">
//                       {c.cuisineName}
//                     </h3>
//                     <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">
//                       <MapPin className="h-3 w-3 text-[#E23744]" />
//                       <span>
//                         {c.region} • {c.state}
//                       </span>
//                     </div>
//                   </div>

//                   <button
//                     type="button"
//                     onClick={() => {
//                       setCForm({
//                         id: c.id,
//                         cuisineName: c.cuisineName ?? "",
//                         region: c.region ?? "",
//                         state: c.state ?? "",
//                       });
//                       setCError({});
//                       setShowCuisineForm(true);
//                     }}
//                     className="
//                       inline-flex items-center rounded-xl border border-gray-200 
//                       bg-white/70 p-1.5 text-xs text-gray-700 shadow-sm 
//                       hover:bg-gray-50
//                     "
//                   >
//                     <Edit className="h-3.5 w-3.5" />
//                   </button>
//                 </div>

//                 {Array.isArray(c.meals) && c.meals.length > 0 && (
//                   <p className="mt-3 text-[11px] text-gray-500">
//                     Linked Meals:{" "}
//                     <span className="font-semibold">{c.meals.length}</span>
//                   </p>
//                 )}
//               </motion.div>
//             ))}
//           </div>
//         )}
//       </section>

//       {/* MEALS SECTION */}
//       <section className="space-y-3">
//         <div className="flex items-center justify-between">
//           <h2 className="text-lg font-semibold text-gray-900">Meals</h2>
//           <p className="text-xs text-gray-500">
//             Total: <span className="font-semibold">{meals.length}</span>
//           </p>
//         </div>

//         {meals.length === 0 ? (
//           <p className="text-sm text-gray-500">
//             No meals added yet. Create a meal and attach it to a cuisine.
//           </p>
//         ) : (
//           <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
//             {meals.map((m, idx) => (
//               <motion.article
//                 key={m.id}
//                 custom={idx}
//                 variants={cardVariants}
//                 initial="hidden"
//                 animate="visible"
//                 className="
//                   group overflow-hidden rounded-3xl border border-white/60 
//                   bg-white/80 shadow-xl backdrop-blur 
//                   transition-all hover:-translate-y-1.5 hover:shadow-2xl
//                 "
//               >
//                 {/* IMAGE */}
//                 <div className="relative h-44 w-full overflow-hidden">
//                   <img
//                     src={m.imageUrl}
//                     alt={m.mealName}
//                     className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
//                   />

//                   <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

//                   {/* CATEGORY PILL */}
//                   <div className="absolute left-3 top-3 flex items-center gap-1">
//                     <span
//                       className={`
//                         inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold 
//                         ${
//                           m.mealCategory === "Veg"
//                             ? "bg-emerald-500/90 text-white"
//                             : "bg-red-500/90 text-white"
//                         }
//                       `}
//                     >
//                       {m.mealCategory === "Veg" ? (
//                         <Leaf className="h-3 w-3" />
//                       ) : (
//                         <Flame className="h-3 w-3" />
//                       )}
//                       {m.mealCategory || "Category"}
//                     </span>
//                   </div>

//                   {/* TYPE + PRICE */}
//                   <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white/90">
//                     <span className="rounded-full bg-black/40 px-2.5 py-1 backdrop-blur">
//                       {m.mealType || "Meal Type"}
//                     </span>
//                     <span className="inline-flex items-center gap-1 rounded-full bg-[#E23744]/95 px-2.5 py-1 text-[11px] font-semibold">
//                       <IndianRupee className="h-3 w-3" />
//                       {m.mealPrice}
//                     </span>
//                   </div>
//                 </div>

//                 {/* CONTENT */}
//                 <div className="space-y-3 p-4">
//                   <div className="flex items-start justify-between gap-3">
//                     <div>
//                       <h3 className="text-sm font-semibold text-gray-900">
//                         {m.mealName}
//                       </h3>
//                       <p className="mt-1 line-clamp-2 text-xs text-gray-500">
//                         {m.description || "No description added yet."}
//                       </p>
//                     </div>
//                   </div>

//                   {/* CUISINE INFO */}
//                   <div className="flex flex-wrap items-center gap-2 text-[11px] text-gray-500">
//                     {m.cuisine && (
//                       <>
//                         <MapPin className="h-3 w-3 text-[#E23744]" />
//                         <span className="font-medium text-gray-700">
//                           {m.cuisine.cuisineName}
//                         </span>
//                         {m.cuisine.region && (
//                           <span>• {m.cuisine.region}</span>
//                         )}
//                         {m.cuisine.state && <span>({m.cuisine.state})</span>}
//                       </>
//                     )}
//                   </div>

//                   {/* ACTION BUTTONS */}
//                   <div className="mt-2 flex items-center justify-between gap-3">
//                     <button
//                       type="button"
//                       onClick={() => {
//                         setMForm({
//                           id: m.id,
//                           cuisineId: m.cuisine?.id ?? "",
//                           mealName: m.mealName ?? "",
//                           mealCategory: m.mealCategory ?? "Veg",
//                           mealType: m.mealType ?? "Lunch",
//                           description: m.description ?? "",
//                           imageUrl: m.imageUrl ?? "",
//                           nutritionInfo: m.nutritionInfo ?? "",
//                           mealPrice: m.mealPrice ?? "",
//                           ingredients:
//                             Array.isArray(m.ingredients)
//                               ? m.ingredients.join(", ")
//                               : "",
//                           allergens:
//                             Array.isArray(m.allergens)
//                               ? m.allergens.join(", ")
//                               : "",
//                         });
//                         setMError({});
//                         setIsEditingMeal(true);
//                         setShowMealForm(true);
//                       }}
//                       className="
//                         inline-flex items-center gap-1 rounded-xl 
//                         border border-gray-200 bg-white/80 px-3 py-1.5 
//                         text-xs font-semibold text-gray-700 shadow-sm 
//                         hover:bg-gray-50
//                       "
//                     >
//                       <Edit className="h-3.5 w-3.5" />
//                       Edit
//                     </button>

//                     <button
//                       type="button"
//                       onClick={() => deleteMeal(m.id)}
//                       className="
//                         inline-flex items-center gap-1 rounded-xl 
//                         border border-red-100 bg-red-50 px-3 py-1.5 
//                         text-xs font-semibold text-red-600 shadow-sm 
//                         hover:bg-red-100
//                       "
//                     >
//                       <Trash2 className="h-3.5 w-3.5" />
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               </motion.article>
//             ))}
//           </div>
//         )}
//       </section>

//       {/* ================================================================
//           CUISINE FORM MODAL
//       ================================================================= */}
//       <AnimatePresence>
//         {showCuisineForm && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
//           >
//             <motion.form
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               transition={{ duration: 0.2 }}
//               onSubmit={handleCuisineSubmit}
//               className="
//                 w-full max-w-md rounded-3xl border border-white/60 
//                 bg-white/90 p-6 shadow-2xl backdrop-blur-xl space-y-4
//               "
//             >
//               <div className="flex items-center justify-between">
//                 <h3 className="text-lg font-semibold text-gray-900">
//                   {cForm.id ? "Edit Cuisine" : "Add Cuisine"}
//                 </h3>
//                 <button
//                   type="button"
//                   onClick={() => setShowCuisineForm(false)}
//                   className="rounded-full p-1 hover:bg-gray-100"
//                 >
//                   <X className="h-4 w-4 text-gray-500" />
//                 </button>
//               </div>

//               <div className="space-y-3">
//                 <div>
//                   <label className="mb-1 block text-xs font-semibold text-gray-700">
//                     Cuisine Name
//                   </label>
//                   <input
//                     value={cForm.cuisineName}
//                     onChange={(e) =>
//                       setCForm({ ...cForm, cuisineName: e.target.value })
//                     }
//                     className="
//                       w-full rounded-xl border border-gray-200 bg-white/80 
//                       px-3 py-2 text-sm outline-none 
//                       focus:border-[#E23744] focus:ring-1 focus:ring-[#E23744]
//                     "
//                   />
//                   {cError.cuisineName && (
//                     <p className="mt-1 text-xs text-red-600">
//                       {cError.cuisineName}
//                     </p>
//                   )}
//                 </div>

//                 <div>
//                   <label className="mb-1 block text-xs font-semibold text-gray-700">
//                     Region
//                   </label>
//                   <input
//                     value={cForm.region}
//                     onChange={(e) =>
//                       setCForm({ ...cForm, region: e.target.value })
//                     }
//                     className="
//                       w-full rounded-xl border border-gray-200 bg-white/80 
//                       px-3 py-2 text-sm outline-none 
//                       focus:border-[#E23744] focus:ring-1 focus:ring-[#E23744]
//                     "
//                   />
//                   {cError.region && (
//                     <p className="mt-1 text-xs text-red-600">
//                       {cError.region}
//                     </p>
//                   )}
//                 </div>

//                 <div>
//                   <label className="mb-1 block text-xs font-semibold text-gray-700">
//                     State
//                   </label>
//                   <input
//                     value={cForm.state}
//                     onChange={(e) =>
//                       setCForm({ ...cForm, state: e.target.value })
//                     }
//                     className="
//                       w-full rounded-xl border border-gray-200 bg-white/80 
//                       px-3 py-2 text-sm outline-none 
//                       focus:border-[#E23744] focus:ring-1 focus:ring-[#E23744]
//                     "
//                   />
//                   {cError.state && (
//                     <p className="mt-1 text-xs text-red-600">
//                       {cError.state}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               <div className="mt-2 flex justify-end gap-2">
//                 <button
//                   type="button"
//                   onClick={() => setShowCuisineForm(false)}
//                   className="
//                     rounded-xl border border-gray-200 bg-white px-4 py-2 
//                     text-xs font-semibold text-gray-700 hover:bg-gray-50
//                   "
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="
//                     rounded-xl bg-[#E23744] px-4 py-2 text-xs 
//                     font-semibold text-white shadow-md hover:shadow-lg
//                   "
//                 >
//                   Save
//                 </button>
//               </div>
//             </motion.form>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* ================================================================
//           MEAL FORM MODAL
//       ================================================================= */}
//       <AnimatePresence>
//         {showMealForm && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
//           >
//             <motion.form
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               transition={{ duration: 0.2 }}
//               onSubmit={handleMealSubmit}
//               className="
//                 w-full max-w-4xl rounded-3xl border border-white/60 
//                 bg-white/95 p-6 shadow-2xl backdrop-blur-xl space-y-4
//               "
//             >
//               <div className="flex items-center justify-between">
//                 <h3 className="text-lg font-semibold text-gray-900">
//                   {isEditingMeal ? "Edit Meal" : "Add Meal"}
//                 </h3>
//                 <button
//                   type="button"
//                   onClick={() => setShowMealForm(false)}
//                   className="rounded-full p-1 hover:bg-gray-100"
//                 >
//                   <X className="h-4 w-4 text-gray-500" />
//                 </button>
//               </div>

//               <div className="grid gap-4 md:grid-cols-2">
//                 <div>
//                   <label className="mb-1 block text-xs font-semibold text-gray-700">
//                     Cuisine *
//                   </label>
//                   <select
//                     value={mForm.cuisineId}
//                     onChange={(e) =>
//                       setMForm({ ...mForm, cuisineId: e.target.value })
//                     }
//                     className="
//                       w-full rounded-xl border border-gray-200 bg-white/80 
//                       px-3 py-2 text-sm outline-none 
//                       focus:border-[#E23744] focus:ring-1 focus:ring-[#E23744]
//                     "
//                   >
//                     <option value="">Select Cuisine</option>
//                     {cuisines.map((c) => (
//                       <option key={c.id} value={c.id}>
//                         {c.cuisineName} – {c.region}/{c.state}
//                       </option>
//                     ))}
//                   </select>
//                   {mError.cuisineId && (
//                     <p className="mt-1 text-xs text-red-600">
//                       {mError.cuisineId}
//                     </p>
//                   )}
//                 </div>

//                 <div>
//                   <label className="mb-1 block text-xs font-semibold text-gray-700">
//                     Meal Name *
//                   </label>
//                   <input
//                     value={mForm.mealName}
//                     onChange={(e) =>
//                       setMForm({ ...mForm, mealName: e.target.value })
//                     }
//                     className="
//                       w-full rounded-xl border border-gray-200 bg-white/80 
//                       px-3 py-2 text-sm outline-none 
//                       focus:border-[#E23744] focus:ring-1 focus:ring-[#E23744]
//                     "
//                   />
//                   {mError.mealName && (
//                     <p className="mt-1 text-xs text-red-600">
//                       {mError.mealName}
//                     </p>
//                   )}
//                 </div>

//                 <div>
//                   <label className="mb-1 block text-xs font-semibold text-gray-700">
//                     Category
//                   </label>
//                   <select
//                     value={mForm.mealCategory}
//                     onChange={(e) =>
//                       setMForm({ ...mForm, mealCategory: e.target.value })
//                     }
//                     className="
//                       w-full rounded-xl border border-gray-200 bg-white/80 
//                       px-3 py-2 text-sm outline-none 
//                       focus:border-[#E23744] focus:ring-1 focus:ring-[#E23744]
//                     "
//                   >
//                     <option value="Veg">Veg</option>
//                     <option value="NonVeg">NonVeg</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="mb-1 block text-xs font-semibold text-gray-700">
//                     Type
//                   </label>
//                   <select
//                     value={mForm.mealType}
//                     onChange={(e) =>
//                       setMForm({ ...mForm, mealType: e.target.value })
//                     }
//                     className="
//                       w-full rounded-xl border border-gray-200 bg-white/80 
//                       px-3 py-2 text-sm outline-none 
//                       focus:border-[#E23744] focus:ring-1 focus:ring-[#E23744]
//                     "
//                   >
//                     <option>Breakfast</option>
//                     <option>Lunch</option>
//                     <option>Dinner</option>
//                     <option>Snack</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="mb-1 block text-xs font-semibold text-gray-700">
//                     Price *
//                   </label>
//                   <input
//                     value={mForm.mealPrice}
//                     onChange={(e) =>
//                       setMForm({ ...mForm, mealPrice: e.target.value })
//                     }
//                     className="
//                       w-full rounded-xl border border-gray-200 bg-white/80 
//                       px-3 py-2 text-sm outline-none 
//                       focus:border-[#E23744] focus:ring-1 focus:ring-[#E23744]
//                     "
//                   />
//                   {mError.mealPrice && (
//                     <p className="mt-1 text-xs text-red-600">
//                       {mError.mealPrice}
//                     </p>
//                   )}
//                 </div>

//                 <div>
//                   <label className="mb-1 block text-xs font-semibold text-gray-700">
//                     Image URL *
//                   </label>
//                   <input
//                     value={mForm.imageUrl}
//                     onChange={(e) =>
//                       setMForm({ ...mForm, imageUrl: e.target.value })
//                     }
//                     className="
//                       w-full rounded-xl border border-gray-200 bg-white/80 
//                       px-3 py-2 text-sm outline-none 
//                       focus:border-[#E23744] focus:ring-1 focus:ring-[#E23744]
//                     "
//                   />
//                   {mError.imageUrl && (
//                     <p className="mt-1 text-xs text-red-600">
//                       {mError.imageUrl}
//                     </p>
//                   )}

//                   {isValidImage(mForm.imageUrl) && (
//                     <img
//                       src={mForm.imageUrl}
//                       alt="Preview"
//                       className="mt-2 h-28 w-full rounded-2xl object-cover"
//                     />
//                   )}
//                 </div>

//                 <div className="md:col-span-2">
//                   <label className="mb-1 block text-xs font-semibold text-gray-700">
//                     Description
//                   </label>
//                   <textarea
//                     rows={2}
//                     value={mForm.description}
//                     onChange={(e) =>
//                       setMForm({ ...mForm, description: e.target.value })
//                     }
//                     className="
//                       w-full rounded-2xl border border-gray-200 bg-white/80 
//                       px-3 py-2 text-sm outline-none 
//                       focus:border-[#E23744] focus:ring-1 focus:ring-[#E23744]
//                     "
//                   />
//                 </div>

//                 <div>
//                   <label className="mb-1 block text-xs font-semibold text-gray-700">
//                     Ingredients (comma separated)
//                   </label>
//                   <input
//                     value={mForm.ingredients}
//                     onChange={(e) =>
//                       setMForm({ ...mForm, ingredients: e.target.value })
//                     }
//                     className="
//                       w-full rounded-xl border border-gray-200 bg-white/80 
//                       px-3 py-2 text-sm outline-none 
//                       focus:border-[#E23744] focus:ring-1 focus:ring-[#E23744]
//                     "
//                   />
//                 </div>

//                 <div>
//                   <label className="mb-1 block text-xs font-semibold text-gray-700">
//                     Allergens (comma separated)
//                   </label>
//                   <input
//                     value={mForm.allergens}
//                     onChange={(e) =>
//                       setMForm({ ...mForm, allergens: e.target.value })
//                     }
//                     className="
//                       w-full rounded-xl border border-gray-200 bg-white/80 
//                       px-3 py-2 text-sm outline-none 
//                       focus:border-[#E23744] focus:ring-1 focus:ring-[#E23744]
//                     "
//                   />
//                 </div>

//                 <div className="md:col-span-2">
//                   <label className="mb-1 block text-xs font-semibold text-gray-700">
//                     Nutrition Info
//                   </label>
//                   <input
//                     value={mForm.nutritionInfo}
//                     onChange={(e) =>
//                       setMForm({ ...mForm, nutritionInfo: e.target.value })
//                     }
//                     className="
//                       w-full rounded-xl border border-gray-200 bg-white/80 
//                       px-3 py-2 text-sm outline-none 
//                       focus:border-[#E23744] focus:ring-1 focus:ring-[#E23744]
//                     "
//                   />
//                 </div>
//               </div>

//               <div className="mt-2 flex justify-end gap-2">
//                 <button
//                   type="button"
//                   onClick={() => setShowMealForm(false)}
//                   className="
//                     rounded-xl border border-gray-200 bg-white px-4 py-2 
//                     text-xs font-semibold text-gray-700 hover:bg-gray-50
//                   "
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="
//                     rounded-xl bg-[#16a34a] px-4 py-2 text-xs 
//                     font-semibold text-white shadow-md hover:shadow-lg
//                   "
//                 >
//                   {isEditingMeal ? "Update Meal" : "Create Meal"}
//                 </button>
//               </div>
//             </motion.form>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }





// import React, { useEffect, useState } from "react";
// import API from "../../api/api";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Plus,
//   Edit,
//   Trash2,
//   UtensilsCrossed,
//   MapPin,
//   IndianRupee,
//   Leaf,
//   Flame,
//   X,
//   Search,
//   Image as ImageIcon,
//   CheckCircle,
//   AlertCircle
// } from "lucide-react";
// import toast from "react-hot-toast";

// /* =====================================================================
//    🎨 ANIMATION VARIANTS
//    ===================================================================== */
// const modalVariants = {
//   hidden: { opacity: 0, scale: 0.95 },
//   visible: { opacity: 1, scale: 1, transition: { type: "spring", bounce: 0.4 } },
//   exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
// };

// const tableRowVariants = {
//   hidden: { opacity: 0, x: -20 },
//   visible: { opacity: 1, x: 0 }
// };

// /* =====================================================================
//    🥘 COMPONENT: CUISINE MODAL
//    ===================================================================== */
// const CuisineModal = ({ show, onClose, onSubmit, initialData }) => {
//    const [form, setForm] = useState({ cuisineName: "", region: "", state: "" });

//    useEffect(() => {
//       if(initialData) setForm(initialData);
//       else setForm({ cuisineName: "", region: "", state: "" });
//    }, [initialData, show]);

//    const handleChange = (e) => setForm({...form, [e.target.name]: e.target.value});

//    return (
//       <AnimatePresence>
//          {show && (
//             <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
//                <motion.div
//                   variants={modalVariants}
//                   initial="hidden" animate="visible" exit="exit"
//                   className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
//                >
//                   <div className="bg-gray-900 px-6 py-4 flex justify-between items-center text-white">
//                      <h3 className="text-lg font-bold flex items-center gap-2">
//                         <MapPin size={18} className="text-red-500" /> {initialData ? "Edit Cuisine" : "Add Cuisine"}
//                      </h3>
//                      <button onClick={onClose}><X size={20}/></button>
//                   </div>
//                   <div className="p-6 space-y-4">
//                      <div>
//                         <label className="text-xs font-bold text-gray-500 uppercase">Cuisine Name</label>
//                         <input name="cuisineName" value={form.cuisineName} onChange={handleChange} className="w-full border-b-2 border-gray-200 py-2 focus:border-red-500 outline-none transition-colors" placeholder="e.g. Malvani" />
//                      </div>
//                      <div>
//                         <label className="text-xs font-bold text-gray-500 uppercase">Region</label>
//                         <input name="region" value={form.region} onChange={handleChange} className="w-full border-b-2 border-gray-200 py-2 focus:border-red-500 outline-none transition-colors" placeholder="e.g. West India" />
//                      </div>
//                      <div>
//                         <label className="text-xs font-bold text-gray-500 uppercase">State</label>
//                         <input name="state" value={form.state} onChange={handleChange} className="w-full border-b-2 border-gray-200 py-2 focus:border-red-500 outline-none transition-colors" placeholder="e.g. Maharashtra" />
//                      </div>
//                      <button onClick={() => onSubmit(form)} className="w-full py-3 bg-red-600 text-white font-bold rounded-xl shadow-lg hover:bg-red-700 transition mt-4">Save Cuisine</button>
//                   </div>
//                </motion.div>
//             </div>
//          )}
//       </AnimatePresence>
//    );
// };

// /* =====================================================================
//    🍱 COMPONENT: MEAL MODAL (With Live Preview)
//    ===================================================================== */
// const MealModal = ({ show, onClose, onSubmit, initialData, cuisines }) => {
//    const [form, setForm] = useState({
//       mealName: "", mealCategory: "Veg", mealType: "Lunch", description: "",
//       imageUrl: "", mealPrice: "", nutritionInfo: "", ingredients: "", allergens: "", cuisineId: ""
//    });

//    useEffect(() => {
//       if(initialData) {
//          setForm({
//             ...initialData,
//             cuisineId: initialData.cuisine?.id || "",
//             ingredients: Array.isArray(initialData.ingredients) ? initialData.ingredients.join(", ") : initialData.ingredients || "",
//             allergens: Array.isArray(initialData.allergens) ? initialData.allergens.join(", ") : initialData.allergens || ""
//          });
//       } else {
//          setForm({ mealName: "", mealCategory: "Veg", mealType: "Lunch", description: "", imageUrl: "", mealPrice: "", nutritionInfo: "", ingredients: "", allergens: "", cuisineId: "" });
//       }
//    }, [initialData, show]);

//    const handleChange = (e) => setForm({...form, [e.target.name]: e.target.value});

//    return (
//       <AnimatePresence>
//          {show && (
//             <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
//                <motion.div
//                   variants={modalVariants}
//                   initial="hidden" animate="visible" exit="exit"
//                   className="w-full max-w-4xl bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row h-[85vh]"
//                >
//                   {/* Left: Form */}
//                   <div className="flex-1 overflow-y-auto p-8">
//                      <div className="flex justify-between items-center mb-6">
//                         <h3 className="text-2xl font-extrabold text-gray-900">{initialData ? "Edit Meal" : "New Meal"}</h3>
//                         <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-red-50 hover:text-red-500"><X size={20}/></button>
//                      </div>

//                      <div className="grid grid-cols-2 gap-5">
//                         <div className="col-span-2">
//                            <label className="text-xs font-bold text-gray-500 uppercase">Meal Name</label>
//                            <input name="mealName" value={form.mealName} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-100 outline-none" placeholder="e.g. Butter Chicken" />
//                         </div>

//                         <div>
//                            <label className="text-xs font-bold text-gray-500 uppercase">Cuisine</label>
//                            <select name="cuisineId" value={form.cuisineId} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none cursor-pointer">
//                               <option value="">Select Cuisine</option>
//                               {cuisines.map(c => <option key={c.id} value={c.id}>{c.cuisineName}</option>)}
//                            </select>
//                         </div>

//                         <div>
//                            <label className="text-xs font-bold text-gray-500 uppercase">Price (₹)</label>
//                            <input name="mealPrice" type="number" value={form.mealPrice} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none" placeholder="250" />
//                         </div>

//                         <div>
//                            <label className="text-xs font-bold text-gray-500 uppercase">Category</label>
//                            <select name="mealCategory" value={form.mealCategory} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none">
//                               <option>Veg</option><option>NonVeg</option>
//                            </select>
//                         </div>

//                         <div>
//                            <label className="text-xs font-bold text-gray-500 uppercase">Type</label>
//                            <select name="mealType" value={form.mealType} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none">
//                               <option>Breakfast</option><option>Lunch</option><option>Dinner</option><option>Snack</option>
//                            </select>
//                         </div>

//                         <div className="col-span-2">
//                            <label className="text-xs font-bold text-gray-500 uppercase">Image URL</label>
//                            <input name="imageUrl" value={form.imageUrl} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none" placeholder="https://..." />
//                         </div>

//                         <div className="col-span-2">
//                            <label className="text-xs font-bold text-gray-500 uppercase">Description</label>
//                            <textarea name="description" rows={3} value={form.description} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none resize-none" placeholder="Short description..." />
//                         </div>
//                      </div>

//                      <div className="mt-8 flex justify-end gap-3">
//                         <button onClick={onClose} className="px-6 py-3 rounded-xl bg-gray-100 text-gray-700 font-bold hover:bg-gray-200">Cancel</button>
//                         <button onClick={() => onSubmit(form)} className="px-6 py-3 rounded-xl bg-gray-900 text-white font-bold hover:bg-black shadow-lg">Save Meal</button>
//                      </div>
//                   </div>

//                   {/* Right: Live Preview */}
//                   <div className="hidden md:flex w-1/3 bg-gray-100 items-center justify-center p-6 border-l border-gray-200">
//                      <div className="w-full bg-white rounded-[2rem] shadow-xl overflow-hidden">
//                         <div className="h-48 bg-gray-200 relative">
//                            {form.imageUrl ? (
//                               <img src={form.imageUrl} className="w-full h-full object-cover" alt="Preview" onError={(e) => e.target.src="https://via.placeholder.com/400x300?text=No+Image"} />
//                            ) : (
//                               <div className="flex items-center justify-center h-full text-gray-400"><ImageIcon size={40}/></div>
//                            )}
//                            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-[10px] font-bold uppercase">{form.mealCategory}</div>
//                         </div>
//                         <div className="p-5">
//                            <h4 className="font-bold text-lg text-gray-900 truncate">{form.mealName || "Meal Name"}</h4>
//                            <p className="text-xs text-gray-500 mt-1 line-clamp-2">{form.description || "Description will appear here..."}</p>
//                            <div className="mt-4 flex justify-between items-center">
//                               <span className="text-lg font-bold text-red-600">₹{form.mealPrice || "0"}</span>
//                               <button className="bg-gray-900 text-white p-2 rounded-lg"><Plus size={16}/></button>
//                            </div>
//                         </div>
//                      </div>
//                   </div>
//                </motion.div>
//             </div>
//          )}
//       </AnimatePresence>
//    );
// };

// /* =====================================================================
//    🚀 MAIN PAGE: ADMIN MENU MANAGEMENT
//    ===================================================================== */
// export default function AdminMenu() {
//    const [cuisines, setCuisines] = useState([]);
//    const [meals, setMeals] = useState([]);
//    const [loading, setLoading] = useState(true);
//    const [search, setSearch] = useState("");

//    // Modal States
//    const [showCModal, setShowCModal] = useState(false);
//    const [editCuisine, setEditCuisine] = useState(null);
//    const [showMModal, setShowMModal] = useState(false);
//    const [editMeal, setEditMeal] = useState(null);

//    // --- LOAD DATA ---
//    const loadData = async () => {
//       setLoading(true);
//       try {
//          const [cRes, mRes] = await Promise.all([API.get("/adminn/cuisines"), API.get("/adminn/meals")]);
//          setCuisines(cRes.data || []);
//          setMeals(mRes.data || []);
//       } catch (err) { toast.error("Failed to load data"); } 
//       finally { setLoading(false); }
//    };

//    useEffect(() => { loadData(); }, []);

//    // --- HANDLERS ---
//    const handleCuisineSubmit = async (form) => {
//       try {
//          if(form.id) {
//             await API.put(`/adminn/cuisines/id/${form.id}`, form);
//             toast.success("Cuisine updated");
//          } else {
//             await API.post(`/adminn/cuisines`, form);
//             toast.success("Cuisine added");
//          }
//          loadData();
//          setShowCModal(false);
//       } catch { toast.error("Operation failed"); }
//    };

//    const handleMealSubmit = async (form) => {
//       try {
//          const payload = {
//             ...form,
//             mealPrice: Number(form.mealPrice),
//             ingredients: form.ingredients.split(",").map(i => i.trim()).filter(Boolean),
//             allergens: form.allergens.split(",").map(i => i.trim()).filter(Boolean),
//             cuisine: { id: Number(form.cuisineId) }
//          };

//          if(form.id) {
//             await API.put(`/adminn/meals/${form.id}`, payload);
//             toast.success("Meal updated");
//          } else {
//             await API.post(`/adminn/meals`, payload);
//             toast.success("Meal created");
//          }
//          loadData();
//          setShowMModal(false);
//       } catch { toast.error("Operation failed"); }
//    };

//    const deleteItem = async (type, id) => {
//       if(!window.confirm(`Delete this ${type}?`)) return;
//       try {
//          await API.delete(`/adminn/${type}s/${id}`);
//          toast.success("Deleted successfully");
//          loadData();
//       } catch { toast.error("Delete failed"); }
//    };

//    // --- FILTERING ---
//    const filteredMeals = meals.filter(m => m.mealName.toLowerCase().includes(search.toLowerCase()));

//    return (
//       <div className="space-y-8">
         
//          {/* HEADER */}
//          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//             <div>
//                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Menu Management</h1>
//                <p className="text-gray-500 text-sm mt-1">Manage cuisines, meals, and inventory.</p>
//             </div>
//             <div className="flex gap-3">
//                <button onClick={() => { setEditCuisine(null); setShowCModal(true); }} className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 shadow-sm flex items-center gap-2">
//                   <MapPin size={18}/> Add Cuisine
//                </button>
//                <button onClick={() => { setEditMeal(null); setShowMModal(true); }} className="px-5 py-2.5 bg-gray-900 text-white font-bold rounded-xl hover:bg-black shadow-lg flex items-center gap-2">
//                   <Plus size={18}/> Add Meal
//                </button>
//             </div>
//          </div>

//          {/* CUISINES ROW */}
//          <section>
//             <div className="flex items-center justify-between mb-4">
//                <h3 className="text-lg font-bold text-gray-800">Cuisines ({cuisines.length})</h3>
//             </div>
//             <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
//                {cuisines.map(c => (
//                   <motion.div whileHover={{y:-4}} key={c.id} className="min-w-[200px] bg-white p-4 rounded-2xl shadow-sm border border-gray-100 group relative">
//                      <div className="flex justify-between items-start">
//                         <div>
//                            <h4 className="font-bold text-gray-900">{c.cuisineName}</h4>
//                            <p className="text-xs text-gray-500">{c.state}</p>
//                         </div>
//                         <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
//                            <button onClick={() => { setEditCuisine(c); setShowCModal(true); }} className="p-1 hover:text-blue-600"><Edit size={14}/></button>
//                            <button onClick={() => deleteItem('cuisine', c.id)} className="p-1 hover:text-red-600"><Trash2 size={14}/></button>
//                         </div>
//                      </div>
//                      <div className="mt-4 flex items-center gap-1 text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-lg w-fit">
//                         <UtensilsCrossed size={12}/> {c.meals?.length || 0} Meals
//                      </div>
//                   </motion.div>
//                ))}
//             </div>
//          </section>

//          {/* MEALS TABLE */}
//          <section className="bg-white rounded-[2rem] border border-gray-200 shadow-sm overflow-hidden">
            
//             {/* Toolbar */}
//             <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
//                <h3 className="text-lg font-bold text-gray-800">All Meals</h3>
//                <div className="relative w-full sm:w-72">
//                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
//                   <input 
//                      type="text" placeholder="Search meals..." 
//                      value={search} onChange={e => setSearch(e.target.value)}
//                      className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-gray-200 outline-none"
//                   />
//                </div>
//             </div>

//             {/* Table */}
//             <div className="overflow-x-auto">
//                <table className="w-full text-left text-sm text-gray-600">
//                   <thead className="bg-gray-50/50 text-xs uppercase font-bold text-gray-400">
//                      <tr>
//                         <th className="px-6 py-4">Meal</th>
//                         <th className="px-6 py-4">Category</th>
//                         <th className="px-6 py-4">Cuisine</th>
//                         <th className="px-6 py-4">Price</th>
//                         <th className="px-6 py-4 text-right">Actions</th>
//                      </tr>
//                   </thead>
//                   <tbody className="divide-y divide-gray-100">
//                      {filteredMeals.length === 0 ? (
//                         <tr><td colSpan="5" className="p-8 text-center text-gray-400">No meals found.</td></tr>
//                      ) : (
//                         filteredMeals.map((m, i) => (
//                            <motion.tr 
//                               key={m.id} variants={tableRowVariants} initial="hidden" animate="visible" custom={i}
//                               className="hover:bg-gray-50/80 transition-colors group"
//                            >
//                               <td className="px-6 py-4">
//                                  <div className="flex items-center gap-3">
//                                     <img src={m.imageUrl} alt="" className="w-10 h-10 rounded-lg object-cover bg-gray-100"/>
//                                     <div>
//                                        <p className="font-bold text-gray-900">{m.mealName}</p>
//                                        <p className="text-xs text-gray-400">{m.mealType}</p>
//                                     </div>
//                                  </div>
//                               </td>
//                               <td className="px-6 py-4">
//                                  <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${m.mealCategory === 'Veg' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
//                                     {m.mealCategory}
//                                  </span>
//                               </td>
//                               <td className="px-6 py-4 font-medium">{m.cuisine?.cuisineName}</td>
//                               <td className="px-6 py-4 font-bold text-gray-900">₹{m.mealPrice}</td>
//                               <td className="px-6 py-4 text-right">
//                                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
//                                     <button onClick={() => { setEditMeal(m); setShowMModal(true); }} className="p-2 bg-gray-100 rounded-lg hover:bg-blue-50 hover:text-blue-600"><Edit size={16}/></button>
//                                     <button onClick={() => deleteItem('meal', m.id)} className="p-2 bg-gray-100 rounded-lg hover:bg-red-50 hover:text-red-600"><Trash2 size={16}/></button>
//                                  </div>
//                               </td>
//                            </motion.tr>
//                         ))
//                      )}
//                   </tbody>
//                </table>
//             </div>
//          </section>

//          {/* Modals */}
//          <CuisineModal show={showCModal} onClose={() => setShowCModal(false)} onSubmit={handleCuisineSubmit} initialData={editCuisine} />
//          <MealModal show={showMModal} onClose={() => setShowMModal(false)} onSubmit={handleMealSubmit} initialData={editMeal} cuisines={cuisines} />

//       </div>
//    );
// }







import React, { useEffect, useState, useMemo } from "react";
import API from "../../api/api";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Edit,
  Trash2,
  UtensilsCrossed,
  MapPin,
  IndianRupee,
  Leaf,
  Flame,
  X,
  Search,
  Image as ImageIcon,
  CheckCircle,
  AlertCircle,
  Filter
} from "lucide-react";
import toast from "react-hot-toast";

/* =====================================================================
   🎨 ANIMATION VARIANTS
   ===================================================================== */
const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", bounce: 0.3 } },
  exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05 } })
};

/* =====================================================================
   🥘 COMPONENT: CUISINE MODAL
   ===================================================================== */
const CuisineModal = ({ show, onClose, onSubmit, initialData }) => {
   const [form, setForm] = useState({ cuisineName: "", region: "", state: "" });

   useEffect(() => {
      if(initialData) setForm(initialData);
      else setForm({ cuisineName: "", region: "", state: "" });
   }, [initialData, show]);

   const handleChange = (e) => setForm({...form, [e.target.name]: e.target.value});

   return (
      <AnimatePresence>
         {show && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
               <motion.div
                  variants={modalVariants}
                  initial="hidden" animate="visible" exit="exit"
                  className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-white/50"
               >
                  <div className="bg-gray-900 px-6 py-5 flex justify-between items-center text-white">
                     <h3 className="text-lg font-bold flex items-center gap-2">
                        <MapPin size={18} className="text-red-500" /> {initialData ? "Edit Cuisine" : "Add New Cuisine"}
                     </h3>
                     <button onClick={onClose} className="hover:bg-white/20 p-1 rounded-full transition"><X size={20}/></button>
                  </div>
                  
                  <div className="p-8 space-y-5 bg-[#FAFAFA]">
                     <div>
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Cuisine Name</label>
                        <input name="cuisineName" value={form.cuisineName} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 mt-1 text-sm font-medium focus:border-red-500 focus:ring-4 focus:ring-red-50 outline-none transition-all" placeholder="e.g. Malvani" />
                     </div>
                     <div>
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Region</label>
                        <input name="region" value={form.region} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 mt-1 text-sm font-medium focus:border-red-500 focus:ring-4 focus:ring-red-50 outline-none transition-all" placeholder="e.g. West India" />
                     </div>
                     <div>
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">State</label>
                        <input name="state" value={form.state} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 mt-1 text-sm font-medium focus:border-red-500 focus:ring-4 focus:ring-red-50 outline-none transition-all" placeholder="e.g. Maharashtra" />
                     </div>
                     <button onClick={() => onSubmit(form)} className="w-full py-4 bg-red-600 text-white font-bold rounded-xl shadow-lg hover:bg-red-700 transition-all flex items-center justify-center gap-2 mt-4">
                        <CheckCircle size={18}/> Save Cuisine
                     </button>
                  </div>
               </motion.div>
            </div>
         )}
      </AnimatePresence>
   );
};

/* =====================================================================
   🍱 COMPONENT: MEAL MODAL (Split View)
   ===================================================================== */
const MealModal = ({ show, onClose, onSubmit, initialData, cuisines }) => {
   const [form, setForm] = useState({
      mealName: "", mealCategory: "Veg", mealType: "Lunch", description: "",
      imageUrl: "", mealPrice: "", nutritionInfo: "", ingredients: "", allergens: "", cuisineId: ""
   });

   useEffect(() => {
      if(initialData) {
         setForm({
            ...initialData,
            cuisineId: initialData.cuisine?.id || "",
            ingredients: Array.isArray(initialData.ingredients) ? initialData.ingredients.join(", ") : initialData.ingredients || "",
            allergens: Array.isArray(initialData.allergens) ? initialData.allergens.join(", ") : initialData.allergens || ""
         });
      } else {
         setForm({ mealName: "", mealCategory: "Veg", mealType: "Lunch", description: "", imageUrl: "", mealPrice: "", nutritionInfo: "", ingredients: "", allergens: "", cuisineId: "" });
      }
   }, [initialData, show]);

   const handleChange = (e) => setForm({...form, [e.target.name]: e.target.value});

   const isValidUrl = (url) => {
      try { new URL(url); return true; } catch (_) { return false; }
   }

   return (
      <AnimatePresence>
         {show && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
               <motion.div
                  variants={modalVariants}
                  initial="hidden" animate="visible" exit="exit"
                  className="w-full max-w-5xl bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row h-[90vh] md:h-auto md:max-h-[85vh]"
               >
                  {/* Left: Form Area */}
                  <div className="flex-1 overflow-y-auto p-8 bg-[#FAFAFA]">
                     <div className="flex justify-between items-center mb-8">
                        <div>
                           <h3 className="text-2xl font-extrabold text-gray-900">{initialData ? "Edit Meal" : "New Meal"}</h3>
                           <p className="text-sm text-gray-500">Fill in the details for your delicious dish.</p>
                        </div>
                        <button onClick={onClose} className="p-2 bg-white border border-gray-200 rounded-full hover:bg-red-50 hover:text-red-500 transition shadow-sm"><X size={20}/></button>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="col-span-2">
                           <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Meal Name <span className="text-red-500">*</span></label>
                           <input name="mealName" value={form.mealName} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 mt-1 outline-none focus:ring-2 focus:ring-red-100 focus:border-red-400 transition-all" placeholder="e.g. Paneer Butter Masala" />
                        </div>

                        <div>
                           <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Cuisine <span className="text-red-500">*</span></label>
                           <select name="cuisineId" value={form.cuisineId} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 mt-1 outline-none focus:ring-2 focus:ring-red-100 cursor-pointer">
                              <option value="">Select Cuisine</option>
                              {cuisines.map(c => <option key={c.id} value={c.id}>{c.cuisineName} ({c.state})</option>)}
                           </select>
                        </div>

                        <div>
                           <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Price (₹) <span className="text-red-500">*</span></label>
                           <input name="mealPrice" type="number" value={form.mealPrice} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 mt-1 outline-none focus:ring-2 focus:ring-red-100" placeholder="250" />
                        </div>

                        <div>
                           <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Category</label>
                           <select name="mealCategory" value={form.mealCategory} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 mt-1 outline-none cursor-pointer">
                              <option value="Veg">Veg</option><option value="NonVeg">Non-Veg</option>
                           </select>
                        </div>

                        <div>
                           <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Meal Type</label>
                           <select name="mealType" value={form.mealType} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 mt-1 outline-none cursor-pointer">
                              <option>Lunch</option><option>Dinner</option><option>Breakfast</option><option>Snack</option>
                           </select>
                        </div>

                        <div className="col-span-2">
                           <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Image URL</label>
                           <input name="imageUrl" value={form.imageUrl} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 mt-1 outline-none focus:ring-2 focus:ring-red-100" placeholder="https://image-link.com/photo.jpg" />
                        </div>

                        <div className="col-span-2">
                           <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Description</label>
                           <textarea name="description" rows={3} value={form.description} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 mt-1 outline-none focus:ring-2 focus:ring-red-100 resize-none" placeholder="Describe the taste and ingredients..." />
                        </div>

                        <div className="col-span-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Ingredients (comma separated)</label>
                            <input name="ingredients" value={form.ingredients} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 mt-1 outline-none focus:ring-2 focus:ring-red-100" placeholder="Rice, Spices, Ghee..." />
                        </div>
                     </div>

                     <div className="mt-8 flex justify-end gap-3 pt-6 border-t border-gray-200">
                        <button onClick={onClose} className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-bold hover:bg-gray-50 transition">Cancel</button>
                        <button onClick={() => onSubmit(form)} className="px-8 py-3 rounded-xl bg-gray-900 text-white font-bold hover:bg-black shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all">Save Meal</button>
                     </div>
                  </div>

                  {/* Right: Live Preview */}
                  <div className="hidden md:flex w-2/5 bg-gray-100 items-center justify-center p-8 border-l border-gray-200 relative overflow-hidden">
                     <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"/>
                     
                     <div className="w-full max-w-sm bg-white rounded-[2rem] shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-[1.02]">
                        <div className="h-56 bg-gray-200 relative overflow-hidden">
                           {form.imageUrl && isValidUrl(form.imageUrl) ? (
                              <img src={form.imageUrl} className="w-full h-full object-cover" alt="Preview" onError={(e) => e.target.src="https://via.placeholder.com/400x300?text=No+Image"} />
                           ) : (
                              <div className="flex flex-col items-center justify-center h-full text-gray-400 bg-gray-50">
                                 <ImageIcon size={48} className="mb-2 opacity-50"/>
                                 <p className="text-xs font-medium">Image Preview</p>
                              </div>
                           )}
                           <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-sm flex items-center gap-1">
                              {form.mealCategory === "Veg" ? <Leaf size={12} className="text-green-600"/> : <Flame size={12} className="text-red-600"/>}
                              {form.mealCategory}
                           </div>
                        </div>
                        <div className="p-6">
                           <div className="flex justify-between items-start mb-2">
                              <h4 className="font-bold text-xl text-gray-900 truncate pr-2">{form.mealName || "Meal Name"}</h4>
                              <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-1 rounded-md uppercase">{form.mealType}</span>
                           </div>
                           <p className="text-sm text-gray-500 line-clamp-2 min-h-[40px]">{form.description || "A short description of the meal will appear here."}</p>
                           
                           <div className="mt-6 flex justify-between items-center pt-4 border-t border-gray-100">
                              <div className="flex flex-col">
                                 <span className="text-[10px] text-gray-400 font-bold uppercase">Price</span>
                                 <span className="text-2xl font-extrabold text-gray-900">₹{form.mealPrice || "0"}</span>
                              </div>
                              <button className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg"><Plus size={20}/></button>
                           </div>
                        </div>
                     </div>
                     <p className="absolute bottom-6 text-gray-400 text-xs font-medium uppercase tracking-widest">Live App Preview</p>
                  </div>
               </motion.div>
            </div>
         )}
      </AnimatePresence>
   );
};

/* =====================================================================
   🚀 MAIN PAGE: MENU MANAGEMENT
   ===================================================================== */
export default function AdminMenu() {
   const [cuisines, setCuisines] = useState([]);
   const [meals, setMeals] = useState([]);
   const [loading, setLoading] = useState(true);
   const [search, setSearch] = useState("");
   const [filterCuisine, setFilterCuisine] = useState("All");

   // Modal States
   const [showCModal, setShowCModal] = useState(false);
   const [editCuisine, setEditCuisine] = useState(null);
   const [showMModal, setShowMModal] = useState(false);
   const [editMeal, setEditMeal] = useState(null);

   // --- LOAD DATA ---
   const loadData = async () => {
      setLoading(true);
      try {
         const [cRes, mRes] = await Promise.all([API.get("/adminn/cuisines"), API.get("/adminn/meals")]);
         setCuisines(cRes.data || []);
         setMeals(mRes.data || []);
      } catch (err) { toast.error("Failed to load data"); } 
      finally { setLoading(false); }
   };

   useEffect(() => { loadData(); }, []);

   // --- HANDLERS ---
   const handleCuisineSubmit = async (form) => {
      if(!form.cuisineName || !form.region || !form.state) return toast.error("All fields required");
      try {
         if(form.id) {
            await API.put(`/adminn/cuisines/id/${form.id}`, form);
            toast.success("Cuisine updated successfully");
         } else {
            await API.post(`/adminn/cuisines`, form);
            toast.success("Cuisine added successfully");
         }
         loadData();
         setShowCModal(false);
      } catch { toast.error("Operation failed"); }
   };

   const handleMealSubmit = async (form) => {
      if(!form.mealName || !form.mealPrice || !form.cuisineId) return toast.error("Name, Price & Cuisine are required");
      try {
         const payload = {
            ...form,
            mealPrice: Number(form.mealPrice),
            ingredients: form.ingredients.split(",").map(i => i.trim()).filter(Boolean),
            allergens: form.allergens.split(",").map(i => i.trim()).filter(Boolean),
            cuisine: { id: Number(form.cuisineId) }
         };

         if(form.id) {
            await API.put(`/adminn/meals/${form.id}`, payload);
            toast.success("Meal updated successfully");
         } else {
            await API.post(`/adminn/meals`, payload);
            toast.success("Meal created successfully");
         }
         loadData();
         setShowMModal(false);
      } catch { toast.error("Operation failed"); }
   };

   const deleteItem = async (type, id) => {
      if(!window.confirm(`Are you sure you want to delete this ${type}?`)) return;
      try {
         await API.delete(`/adminn/${type}s/${id}`);
         toast.success("Deleted successfully 🗑️");
         loadData();
      } catch { toast.error("Delete failed"); }
   };

   // --- FILTERING ---
   const filteredMeals = useMemo(() => {
      return meals.filter(m => {
         const matchesSearch = m.mealName.toLowerCase().includes(search.toLowerCase());
         const matchesCuisine = filterCuisine === "All" || m.cuisine?.cuisineName === filterCuisine;
         return matchesSearch && matchesCuisine;
      });
   }, [meals, search, filterCuisine]);

   if (loading) return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA]">
         <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"/>
            <p className="mt-4 text-gray-500 font-medium">Loading Menu...</p>
         </div>
      </div>
   );

   return (
      <div className="space-y-8 pb-20">
         
         {/* HEADER - No Sticky */}
         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
            <div>
               <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Menu Management</h1>
               <p className="text-gray-500 text-sm mt-1">Organize your kitchen's offerings.</p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
               <button onClick={() => { setEditCuisine(null); setShowCModal(true); }} className="flex-1 md:flex-none px-5 py-3 bg-white border-2 border-gray-100 text-gray-700 font-bold rounded-xl hover:border-red-100 hover:text-red-600 hover:bg-red-50 transition-all flex items-center justify-center gap-2">
                  <MapPin size={18}/> Add Cuisine
               </button>
               <button onClick={() => { setEditMeal(null); setShowMModal(true); }} className="flex-1 md:flex-none px-6 py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-black shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
                  <Plus size={18}/> Add Meal
               </button>
            </div>
         </div>

         {/* CUISINES HORIZONTAL SCROLL */}
         <section>
            <div className="flex items-center justify-between mb-4 px-2">
               <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2"><UtensilsCrossed size={18} className="text-red-500"/> Active Cuisines</h3>
               <span className="text-xs font-bold bg-gray-200 text-gray-600 px-2 py-1 rounded-md">{cuisines.length}</span>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-6 hide-scrollbar px-1">
               {cuisines.map((c, i) => (
                  <motion.div 
                     key={c.id} custom={i} variants={cardVariants} initial="hidden" animate="visible"
                     className="min-w-[240px] bg-white p-5 rounded-2xl shadow-sm border border-gray-100 group relative hover:-translate-y-1 transition-transform"
                  >
                     <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                        <button onClick={() => { setEditCuisine(c); setShowCModal(true); }} className="p-1.5 bg-gray-100 rounded-lg hover:text-blue-600"><Edit size={14}/></button>
                        <button onClick={() => deleteItem('cuisine', c.id)} className="p-1.5 bg-red-50 text-red-500 rounded-lg hover:bg-red-100"><Trash2 size={14}/></button>
                     </div>
                     <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-3 font-bold text-lg">
                        {c.cuisineName[0]}
                     </div>
                     <h4 className="font-bold text-gray-900 text-lg">{c.cuisineName}</h4>
                     <p className="text-xs text-gray-500 font-medium">{c.state}, {c.region}</p>
                     <div className="mt-4 pt-3 border-t border-gray-50 flex justify-between items-center text-xs">
                        <span className="text-gray-400">Meals Linked</span>
                        <span className="font-bold text-gray-800 bg-gray-100 px-2 py-0.5 rounded">{c.meals?.length || 0}</span>
                     </div>
                  </motion.div>
               ))}
               
               {/* Add New Cuisine Card */}
               <button onClick={() => { setEditCuisine(null); setShowCModal(true); }} className="min-w-[100px] flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-2xl text-gray-400 hover:border-red-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                  <Plus size={24}/>
                  <span className="text-xs font-bold mt-2">Add New</span>
               </button>
            </div>
         </section>

         {/* MEALS TABLE / LIST */}
         <section className="bg-white rounded-[2.5rem] border border-gray-200 shadow-sm overflow-hidden">
            
            {/* Toolbar */}
            <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 bg-gray-50/50">
               <h3 className="text-lg font-bold text-gray-800">All Meals ({filteredMeals.length})</h3>
               
               <div className="flex flex-1 w-full md:w-auto gap-3">
                  <div className="relative flex-1 md:max-w-xs">
                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                     <input 
                        type="text" placeholder="Search by meal name..." 
                        value={search} onChange={e => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-red-100 outline-none transition-all shadow-sm"
                     />
                  </div>
                  
                  <div className="relative group">
                     <select 
                        value={filterCuisine} onChange={e => setFilterCuisine(e.target.value)}
                        className="appearance-none pl-4 pr-10 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 outline-none cursor-pointer hover:border-gray-300 shadow-sm"
                     >
                        <option value="All">All Cuisines</option>
                        {cuisines.map(c => <option key={c.id} value={c.cuisineName}>{c.cuisineName}</option>)}
                     </select>
                     <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none"/>
                  </div>
               </div>
            </div>

            {/* List */}
            <div className="divide-y divide-gray-100">
               {filteredMeals.length === 0 ? (
                  <div className="p-12 text-center flex flex-col items-center justify-center text-gray-400">
                     <Search size={48} className="mb-4 opacity-20"/>
                     <p className="text-sm font-medium">No meals found matching your criteria.</p>
                     <button onClick={() => { setSearch(""); setFilterCuisine("All"); }} className="mt-4 text-red-600 font-bold text-xs hover:underline">Clear Filters</button>
                  </div>
               ) : (
                  filteredMeals.map((m) => (
                     <div key={m.id} className="p-4 hover:bg-blue-50/30 transition-colors flex items-center justify-between gap-4 group">
                        
                        <div className="flex items-center gap-4 flex-1">
                           <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 shrink-0">
                              <img src={m.imageUrl} alt={m.mealName} className="w-full h-full object-cover"/>
                           </div>
                           <div>
                              <div className="flex items-center gap-2 mb-1">
                                 <h4 className="font-bold text-gray-900 text-base">{m.mealName}</h4>
                                 <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${m.mealCategory === 'Veg' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                    {m.mealCategory}
                                 </span>
                              </div>
                              <p className="text-xs text-gray-500 font-medium flex items-center gap-1">
                                 <span className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">{m.mealType}</span> 
                                 • {m.cuisine?.cuisineName}
                              </p>
                           </div>
                        </div>

                        <div className="text-right mr-4 hidden sm:block">
                           <p className="text-lg font-extrabold text-gray-900">₹{m.mealPrice}</p>
                           <p className="text-[10px] text-gray-400 font-bold uppercase">Price</p>
                        </div>

                        <div className="flex items-center gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                           <button onClick={() => { setEditMeal(m); setShowMModal(true); }} className="p-2 bg-white border border-gray-200 rounded-xl text-gray-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 shadow-sm transition-all"><Edit size={16}/></button>
                           <button onClick={() => deleteItem('meal', m.id)} className="p-2 bg-white border border-gray-200 rounded-xl text-gray-600 hover:border-red-200 hover:bg-red-50 hover:text-red-600 shadow-sm transition-all"><Trash2 size={16}/></button>
                        </div>

                     </div>
                  ))
               )}
            </div>
         </section>

         {/* Modals */}
         <CuisineModal show={showCModal} onClose={() => setShowCModal(false)} onSubmit={handleCuisineSubmit} initialData={editCuisine} />
         <MealModal show={showMModal} onClose={() => setShowMModal(false)} onSubmit={handleMealSubmit} initialData={editMeal} cuisines={cuisines} />

      </div>
   );
}