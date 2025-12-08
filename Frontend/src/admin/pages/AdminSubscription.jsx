// // src/admin/pages/AdminSubscriptions.jsx
// // Swiggy/Zomato style — Glassmorphic Big Cards + Filters + Details Drawer

// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Activity,
//   AlertTriangle,
//   CheckCircle2,
//   PauseCircle,
//   Hash,
//   Calendar,
//   Filter,
//   Search,
//   X,
//   ChevronRight,
//   Loader2,
//   Trash2,
//   Info,
// } from "lucide-react";
// import toast from "react-hot-toast";

// import {
//   adminGetAllSubscriptions,
//   adminDeleteSubscription,
//   adminCountSubscriptions,
//   adminExpiringSoonSubscriptions,
// } from "../../api/api";

// const statusTabs = ["ALL", "ACTIVE", "PAUSED", "EXPIRED"];

// // Status badge classes
// const getStatusClasses = (status) => {
//   const base =
//     "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold";
//   switch (status?.toUpperCase()) {
//     case "ACTIVE":
//       return `${base} bg-emerald-50 text-emerald-600`;
//     case "EXPIRED":
//       return `${base} bg-rose-50 text-rose-600`;
//     case "PAUSED":
//       return `${base} bg-amber-50 text-amber-600`;
//     default:
//       return `${base} bg-gray-100 text-gray-600`;
//   }
// };

// const getStatusIcon = (status) => {
//   switch (status?.toUpperCase()) {
//     case "ACTIVE":
//       return <CheckCircle2 className="h-3.5 w-3.5" />;
//     case "EXPIRED":
//       return <AlertTriangle className="h-3.5 w-3.5" />;
//     case "PAUSED":
//       return <PauseCircle className="h-3.5 w-3.5" />;
//     default:
//       return <Activity className="h-3.5 w-3.5" />;
//   }
// };

// // Main component
// export default function AdminSubscriptions() {
//   const [stats, setStats] = useState({
//     totalCount: 0,
//     activeCount: 0,
//     expiredCount: 0,
//     pausedCount: 0,
//   });

//   const [subs, setSubs] = useState([]);
//   const [expiringSoon, setExpiringSoon] = useState([]);

//   const [statusFilter, setStatusFilter] = useState("ALL");
//   const [searchId, setSearchId] = useState("");
//   const [loadingList, setLoadingList] = useState(false);
//   const [loadingStats, setLoadingStats] = useState(false);
//   const [loadingExpiring, setLoadingExpiring] = useState(false);
//   const [error, setError] = useState("");

//   const [selectedSub, setSelectedSub] = useState(null);
//   const [drawerOpen, setDrawerOpen] = useState(false);

//   // Initial load
//   useEffect(() => {
//     loadStats();
//     loadExpiring();
//     loadList("ALL", "");
//   }, []);

//   // Reload list when status filter changes (if search empty)
//   useEffect(() => {
//     if (!searchId.trim()) {
//       loadList(statusFilter, "");
//     }
//   }, [statusFilter]);

//   // Load stats from /count
//   const loadStats = async () => {
//     setLoadingStats(true);
//     setError("");
//     try {
//       const res = await adminCountSubscriptions();
//       setStats(res.data || {});
//     } catch (err) {
//       console.error(err);
//       setError("Unable to load subscription summary.");
//     } finally {
//       setLoadingStats(false);
//     }
//   };

//   // Load expiring soon cards
//   const loadExpiring = async () => {
//     setLoadingExpiring(true);
//     setError("");
//     try {
//       const res = await adminExpiringSoonSubscriptions(7);
//       setExpiringSoon(res.data || []);
//     } catch (err) {
//       console.error(err);
//       setError("Unable to load expiring subscriptions.");
//     } finally {
//       setLoadingExpiring(false);
//     }
//   };

//   // Load subscription list (status + optional subscriptionid)
//   const loadList = async (status = "ALL", subId = "") => {
//     setLoadingList(true);
//     setError("");
//     try {
//       const paramsStatus = status === "ALL" ? undefined : status;
//       const paramsId = subId ? Number(subId) : undefined;

//       const res = await adminGetAllSubscriptions(paramsStatus, paramsId);
//       setSubs(res.data || []);
//     } catch (err) {
//       console.error(err);
//       setError("Unable to load subscriptions list.");
//     } finally {
//       setLoadingList(false);
//     }
//   };

//   const handleSearch = () => {
//     if (!searchId.trim()) {
//       toast.error("Enter a Subscription ID to search");
//       return;
//     }
//     if (Number.isNaN(Number(searchId))) {
//       toast.error("Subscription ID must be a number");
//       return;
//     }
//     loadList("ALL", searchId.trim());
//   };

//   const handleClearSearch = () => {
//     setSearchId("");
//     loadList(statusFilter, "");
//   };

//   const handleDelete = async (id) => {
//     const ok = window.confirm(
//       `Are you sure you want to delete subscription #${id}?`
//     );
//     if (!ok) return;

//     try {
//       await adminDeleteSubscription(id);
//       toast.success(`Subscription #${id} deleted`);
//       // Refresh everything
//       loadStats();
//       loadExpiring();
//       loadList(statusFilter, searchId.trim() || "");
//       if (selectedSub?.subscriptionid === id) {
//         setDrawerOpen(false);
//         setSelectedSub(null);
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to delete subscription");
//     }
//   };

//   const openDrawer = (sub) => {
//     setSelectedSub(sub);
//     setDrawerOpen(true);
//   };

//   const closeDrawer = () => {
//     setDrawerOpen(false);
//     setSelectedSub(null);
//   };

//   // Animation variants
//   const cardVariants = {
//     hidden: { opacity: 0, y: 16 },
//     visible: (i = 1) => ({
//       opacity: 1,
//       y: 0,
//       transition: { delay: i * 0.04, duration: 0.25 },
//     }),
//   };

//   return (
//     <div className="space-y-8">
//       {/* HEADER */}
//       <motion.div
//         initial={{ opacity: 0, y: -8 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.3 }}
//         className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
//       >
//         <div>
//           <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-[#E23744]">
//             <Activity className="h-4 w-4" />
//             Admin Subscriptions
//           </div>
//           <h1 className="mt-3 text-2xl font-extrabold text-gray-900 md:text-3xl">
//             Subscription Management
//           </h1>
//           <p className="mt-1 text-sm text-gray-500">
//             Monitor active plans, expiring subscriptions and overall health of
//             Tiffino subscriptions.
//           </p>
//         </div>

//         <div className="text-xs text-gray-400 md:text-right">
//           <p>Data fetched from Subscription Service via Admin API</p>
//         </div>
//       </motion.div>

//       {/* ERROR BANNER */}
//       {error && (
//         <div className="rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm text-rose-700">
//           {error}
//         </div>
//       )}

//       {/* SECTION 1 — TOP STATS CARDS */}
//       <motion.div
//         initial={{ opacity: 0, y: 8 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.3, delay: 0.05 }}
//         className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
//       >
//         <StatCard
//           label="Active"
//           value={stats.activeCount || 0}
//           chip="Currently running"
//           icon={<CheckCircle2 className="h-5 w-5 text-emerald-500" />}
//           accent="emerald"
//           loading={loadingStats}
//         />
//         <StatCard
//           label="Paused"
//           value={stats.pausedCount || 0}
//           chip="Temporarily stopped"
//           icon={<PauseCircle className="h-5 w-5 text-amber-500" />}
//           accent="amber"
//           loading={loadingStats}
//         />
//         <StatCard
//           label="Expired"
//           value={stats.expiredCount || 0}
//           chip="No longer active"
//           icon={<AlertTriangle className="h-5 w-5 text-rose-500" />}
//           accent="rose"
//           loading={loadingStats}
//         />
//         <StatCard
//           label="Total"
//           value={stats.totalCount || 0}
//           chip="All-time subscriptions"
//           icon={<Activity className="h-5 w-5 text-[#E23744]" />}
//           accent="red"
//           loading={loadingStats}
//         />
//       </motion.div>

//       {/* SECTION 2 — EXPIRING SOON */}
//       <motion.section
//         initial={{ opacity: 0, y: 8 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.3, delay: 0.08 }}
//         className="rounded-3xl border border-white/60 bg-white/80 p-5 shadow-md backdrop-blur"
//       >
//         <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
//           <div>
//             <h2 className="flex items-center gap-2 text-sm font-semibold text-gray-800">
//               <AlertTriangle className="h-4 w-4 text-amber-500" />
//               Expiring Soon (Next 7 Days)
//             </h2>
//             <p className="text-xs text-gray-500">
//               Subscriptions ending soon — keep your users retained.
//             </p>
//           </div>
//         </div>

//         {loadingExpiring ? (
//           <div className="flex items-center gap-2 text-xs text-gray-500">
//             <Loader2 className="h-4 w-4 animate-spin" />
//             Loading expiring subscriptions...
//           </div>
//         ) : expiringSoon.length === 0 ? (
//           <p className="text-xs text-gray-500">
//             No subscriptions expiring soon. 🎉
//           </p>
//         ) : (
//           <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
//             {expiringSoon.map((s, idx) => (
//               <motion.div
//                 key={s.subscriptionid}
//                 custom={idx}
//                 variants={cardVariants}
//                 initial="hidden"
//                 animate="visible"
//                 className="group flex items-center justify-between gap-3 rounded-2xl border border-white/70 bg-gradient-to-r from-amber-50/70 via-white/90 to-white/90 px-4 py-3 text-xs shadow-sm backdrop-blur hover:-translate-y-1 hover:shadow-lg"
//               >
//                 <div className="space-y-1">
//                   <div className="flex items-center gap-2">
//                     <span className="inline-flex items-center gap-1 rounded-full bg-white/80 px-2 py-0.5 font-mono text-[11px] text-gray-700">
//                       <Hash className="h-3 w-3 text-gray-400" />
//                       {s.subscriptionid}
//                     </span>
//                     <span className={getStatusClasses(s.status)}>
//                       {getStatusIcon(s.status)}
//                       {s.status || "UNKNOWN"}
//                     </span>
//                   </div>

//                   <p className="text-[11px] text-gray-600">
//                     Plan ID:{" "}
//                     <span className="font-semibold text-gray-800">
//                       {s.planId ?? "—"}
//                     </span>{" "}
//                     • Frequency:{" "}
//                     <span className="font-semibold text-gray-800">
//                       {s.frequency || "—"}
//                     </span>
//                   </p>

//                   <div className="flex flex-wrap items-center gap-2 text-[10px] text-gray-500">
//                     <span className="inline-flex items-center gap-1 rounded-full bg-white/70 px-2 py-0.5">
//                       <Calendar className="h-3 w-3 text-[#E23744]" />
//                       {s.startDate || "—"} → {s.endDate || "—"}
//                     </span>
//                     {Array.isArray(s.allergies) && s.allergies.length > 0 && (
//                       <span className="inline-flex items-center gap-1 rounded-full bg-white/70 px-2 py-0.5">
//                         <Info className="h-3 w-3 text-amber-500" />
//                         Allergies: {s.allergies.join(", ")}
//                       </span>
//                     )}
//                   </div>
//                 </div>

//                 <button
//                   onClick={() => openDrawer(s)}
//                   className="ml-auto inline-flex items-center gap-1 rounded-full bg-black/5 px-2 py-1 text-[10px] font-semibold text-gray-700 hover:bg-black/10"
//                 >
//                   View
//                   <ChevronRight className="h-3 w-3" />
//                 </button>
//               </motion.div>
//             ))}
//           </div>
//         )}
//       </motion.section>

//       {/* SECTION 3 — FILTERS + SEARCH */}
//       <motion.section
//         initial={{ opacity: 0, y: 8 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.3, delay: 0.1 }}
//         className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between"
//       >
//         {/* Status tabs */}
//         <div className="flex flex-wrap items-center gap-2">
//           {statusTabs.map((tab) => {
//             const active = statusFilter === tab;
//             return (
//               <button
//                 key={tab}
//                 onClick={() => setStatusFilter(tab)}
//                 className={`
//                   inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold 
//                   border transition-all
//                   ${
//                     active
//                       ? "border-[#E23744] bg-[#E23744]/10 text-[#E23744] shadow-sm"
//                       : "border-transparent bg-white/70 text-gray-600 hover:bg-gray-50"
//                   }
//                 `}
//               >
//                 <Filter className="h-3 w-3" />
//                 {tab === "ALL" ? "All" : tab.charAt(0) + tab.slice(1).toLowerCase()}
//               </button>
//             );
//           })}
//         </div>

//         {/* Search by subscription ID */}
//         <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
//           <div className="relative w-full sm:w-64">
//             <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
//             <input
//               value={searchId}
//               onChange={(e) => setSearchId(e.target.value)}
//               className="w-full rounded-xl border border-gray-200 bg-white/80 px-9 py-2 text-xs text-gray-700 outline-none focus:border-[#E23744] focus:ring-1 focus:ring-[#E23744]"
//               placeholder="Search by Subscription ID"
//             />
//           </div>
//           <div className="flex gap-2">
//             <button
//               onClick={handleSearch}
//               className="inline-flex items-center gap-1 rounded-xl bg-[#E23744] px-3 py-2 text-xs font-semibold text-white shadow-sm hover:shadow-md"
//             >
//               <Search className="h-3.5 w-3.5" />
//               Search
//             </button>
//             <button
//               onClick={handleClearSearch}
//               className="inline-flex items-center gap-1 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-50"
//             >
//               <X className="h-3.5 w-3.5" />
//               Clear
//             </button>
//           </div>
//         </div>
//       </motion.section>

//       {/* SECTION 4 — SUBSCRIPTION CARDS LIST */}
//       <motion.section
//         initial={{ opacity: 0, y: 8 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.3, delay: 0.12 }}
//         className="space-y-3"
//       >
//         <div className="flex items-center justify-between">
//           <h2 className="text-sm font-semibold text-gray-800">
//             All Subscriptions
//           </h2>
//           <p className="text-xs text-gray-500">
//             Showing{" "}
//             <span className="font-semibold text-gray-700">{subs.length}</span>{" "}
//             records
//           </p>
//         </div>

//         {loadingList ? (
//           <div className="flex items-center gap-2 rounded-2xl border border-gray-100 bg-white/80 px-4 py-3 text-xs text-gray-500 shadow-sm">
//             <Loader2 className="h-4 w-4 animate-spin" />
//             Loading subscriptions...
//           </div>
//         ) : subs.length === 0 ? (
//           <div className="rounded-2xl border border-dashed border-gray-200 bg-white/70 px-4 py-10 text-center text-xs text-gray-500">
//             No subscriptions found for the selected filter/search.
//           </div>
//         ) : (
//           <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
//             {subs.map((s, idx) => (
//               <motion.article
//                 key={s.subscriptionid}
//                 custom={idx}
//                 variants={cardVariants}
//                 initial="hidden"
//                 animate="visible"
//                 className="group flex flex-col justify-between rounded-3xl border border-white/70 bg-white/85 p-4 shadow-md backdrop-blur hover:-translate-y-1.5 hover:shadow-2xl"
//               >
//                 {/* Top row: ID + status + delete */}
//                 <div className="flex items-start justify-between gap-2">
//                   <div className="space-y-1">
//                     <div className="inline-flex items-center gap-1 rounded-full bg-gray-50 px-2.5 py-1 font-mono text-[11px] text-gray-700">
//                       <Hash className="h-3 w-3 text-gray-400" />
//                       {s.subscriptionid}
//                     </div>
//                     <p className="text-[11px] text-gray-500">
//                       Plan ID:{" "}
//                       <span className="font-semibold text-gray-800">
//                         {s.planId ?? "—"}
//                       </span>
//                     </p>
//                   </div>

//                   <div className="flex flex-col items-end gap-2">
//                     <span className={getStatusClasses(s.status)}>
//                       {getStatusIcon(s.status)}
//                       {s.status || "UNKNOWN"}
//                     </span>

//                     <button
//                       onClick={() => handleDelete(s.subscriptionid)}
//                       className="inline-flex items-center gap-1 rounded-full border border-rose-100 bg-rose-50 px-2 py-1 text-[10px] font-semibold text-rose-600 opacity-0 shadow-sm transition group-hover:opacity-100"
//                     >
//                       <Trash2 className="h-3 w-3" />
//                       Delete
//                     </button>
//                   </div>
//                 </div>

//                 {/* Dates & frequency */}
//                 <div className="mt-3 space-y-2 text-[11px] text-gray-600">
//                   <p className="inline-flex items-center gap-1 rounded-xl bg-gray-50 px-2.5 py-1">
//                     <Calendar className="h-3.5 w-3.5 text-[#E23744]" />
//                     <span>
//                       {s.startDate || "—"} → {s.endDate || "—"}
//                     </span>
//                   </p>
//                   <p>
//                     Frequency:{" "}
//                     <span className="font-semibold text-gray-800">
//                       {s.frequency || "—"}
//                     </span>
//                   </p>

//                   {Array.isArray(s.allergies) && s.allergies.length > 0 && (
//                     <p className="line-clamp-2 text-[11px] text-gray-500">
//                       Allergies:{" "}
//                       <span className="font-medium text-gray-700">
//                         {s.allergies.join(", ")}
//                       </span>
//                     </p>
//                   )}
//                 </div>

//                 {/* Actions */}
//                 <div className="mt-3 flex items-center justify-between text-[11px]">
//                   <button
//                     onClick={() => openDrawer(s)}
//                     className="inline-flex items-center gap-1 rounded-xl bg-[#E23744]/10 px-3 py-1.5 text-[11px] font-semibold text-[#E23744] hover:bg-[#E23744]/15"
//                   >
//                     <Info className="h-3.5 w-3.5" />
//                     View Details
//                   </button>

//                   <span className="text-[10px] text-gray-400">
//                     Admin subscription snapshot
//                   </span>
//                 </div>
//               </motion.article>
//             ))}
//           </div>
//         )}
//       </motion.section>

//       {/* SECTION 5 — DETAILS DRAWER */}
//       <AnimatePresence>
//         {drawerOpen && selectedSub && (
//           <>
//             {/* Backdrop */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 0.4 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 z-40 bg-black"
//               onClick={closeDrawer}
//             />

//             {/* Drawer */}
//             <motion.div
//               initial={{ x: "100%" }}
//               animate={{ x: 0 }}
//               exit={{ x: "100%" }}
//               transition={{ type: "spring", stiffness: 260, damping: 24 }}
//               className="fixed right-0 top-0 z-50 h-full w-full max-w-md border-l border-white/60 bg-white/95 p-5 shadow-2xl backdrop-blur-xl"
//             >
//               <div className="mb-4 flex items-center justify-between">
//                 <div>
//                   <div className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-1 text-[11px] font-semibold text-[#E23744]">
//                     <Activity className="h-3.5 w-3.5" />
//                     Subscription Details
//                   </div>
//                   <h3 className="mt-2 text-base font-semibold text-gray-900">
//                     Subscription #{selectedSub.subscriptionid}
//                   </h3>
//                   <p className="text-[11px] text-gray-500">
//                     Plan ID:{" "}
//                     <span className="font-semibold text-gray-800">
//                       {selectedSub.planId ?? "—"}
//                     </span>
//                   </p>
//                 </div>

//                 <button
//                   onClick={closeDrawer}
//                   className="rounded-full p-1.5 hover:bg-gray-100"
//                 >
//                   <X className="h-4 w-4 text-gray-500" />
//                 </button>
//               </div>

//               <div className="space-y-3 text-xs text-gray-700">
//                 <div className="flex items-center gap-2">
//                   <span className={getStatusClasses(selectedSub.status)}>
//                     {getStatusIcon(selectedSub.status)}
//                     {selectedSub.status || "UNKNOWN"}
//                   </span>
//                 </div>

//                 <DetailRow
//                   label="Start Date"
//                   value={selectedSub.startDate || "—"}
//                 />
//                 <DetailRow
//                   label="End Date"
//                   value={selectedSub.endDate || "—"}
//                 />
//                 <DetailRow
//                   label="Frequency"
//                   value={selectedSub.frequency || "—"}
//                 />

//                 {Array.isArray(selectedSub.allergies) && (
//                   <DetailRow
//                     label="Allergies"
//                     value={
//                       selectedSub.allergies.length > 0
//                         ? selectedSub.allergies.join(", ")
//                         : "None"
//                     }
//                   />
//                 )}

//                 <div className="mt-4 rounded-2xl border border-gray-100 bg-gray-50/80 px-3 py-2 text-[11px] text-gray-500">
//                   This drawer can be extended later with more linked data like
//                   user details, plan name, and payment history.
//                 </div>
//               </div>

//               <div className="mt-5 flex gap-2">
//                 <button
//                   onClick={() => handleDelete(selectedSub.subscriptionid)}
//                   className="inline-flex flex-1 items-center justify-center gap-1 rounded-xl bg-rose-500 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:bg-rose-600"
//                 >
//                   <Trash2 className="h-3.5 w-3.5" />
//                   Delete Subscription
//                 </button>

//                 <button
//                   onClick={closeDrawer}
//                   className="inline-flex flex-1 items-center justify-center gap-1 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
//                 >
//                   Close
//                 </button>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// /* ------------------------------------------- */
// /* Small reusable components                   */
// /* ------------------------------------------- */

// function StatCard({ label, value, chip, icon, accent, loading }) {
//   const accentBg =
//     accent === "emerald"
//       ? "bg-emerald-50"
//       : accent === "amber"
//       ? "bg-amber-50"
//       : accent === "rose"
//       ? "bg-rose-50"
//       : "bg-red-50";

//   return (
//     <motion.div
//       whileHover={{ y: -3 }}
//       transition={{ type: "spring", stiffness: 260, damping: 20 }}
//       className="rounded-3xl border border-white/70 bg-white/80 p-4 shadow-md backdrop-blur"
//     >
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-[11px] font-medium text-gray-500 uppercase tracking-wide">
//             {label}
//           </p>
//           {loading ? (
//             <div className="mt-2 h-6 w-16 animate-pulse rounded-md bg-gray-200/70" />
//           ) : (
//             <p className="mt-2 text-2xl font-extrabold text-gray-900">
//               {value}
//             </p>
//           )}
//         </div>
//         <div
//           className={`flex h-10 w-10 items-center justify-center rounded-2xl ${accentBg} text-gray-800 shadow-sm`}
//         >
//           {icon}
//         </div>
//       </div>
//       <p className="mt-3 text-[11px] text-gray-500">{chip}</p>
//     </motion.div>
//   );
// }

// function DetailRow({ label, value }) {
//   return (
//     <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white/80 px-3 py-2">
//       <span className="text-[11px] font-medium text-gray-500">{label}</span>
//       <span className="text-[11px] font-semibold text-gray-800 text-right">
//         {value}
//       </span>
//     </div>
//   );
// }





import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  PauseCircle,
  Hash,
  Calendar,
  Filter,
  Search,
  X,
  ChevronRight,
  ArrowRight,
  Loader2,
  Trash2,
  Info,
  CreditCard,
  User
} from "lucide-react";
import toast from "react-hot-toast";

import {
  adminGetAllSubscriptions,
  adminDeleteSubscription,
  adminCountSubscriptions,
  adminExpiringSoonSubscriptions,
} from "../../api/api";

const STATUS_CONFIG = {
  ACTIVE: { color: "bg-green-100 text-green-700", icon: CheckCircle2 },
  EXPIRED: { color: "bg-red-100 text-red-700", icon: AlertTriangle },
  PAUSED: { color: "bg-yellow-100 text-yellow-700", icon: PauseCircle },
  ALL: { color: "bg-gray-100 text-gray-700", icon: Filter }
};

export default function AdminSubscriptions() {
  const [stats, setStats] = useState({ totalCount: 0, activeCount: 0, expiredCount: 0, pausedCount: 0 });
  const [subs, setSubs] = useState([]);
  const [expiringSoon, setExpiringSoon] = useState([]);
  
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [selectedSub, setSelectedSub] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // --- LOAD DATA ---
  const loadData = async () => {
    setLoading(true);
    try {
      const [statsRes, expRes, listRes] = await Promise.all([
        adminCountSubscriptions(),
        adminExpiringSoonSubscriptions(7),
        adminGetAllSubscriptions()
      ]);
      
      setStats(statsRes.data || {});
      setExpiringSoon(expRes.data || []);
      setSubs(listRes.data || []);
    } catch (e) {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  // --- FILTER LOGIC ---
  const filteredSubs = useMemo(() => {
    let data = subs;
    if (statusFilter !== "ALL") data = data.filter(s => s.status === statusFilter);
    if (search) data = data.filter(s => s.subscriptionid.toString().includes(search) || s.planId?.toLowerCase().includes(search.toLowerCase()));
    return data;
  }, [subs, statusFilter, search]);

  const handleDelete = async (id) => {
    if(!window.confirm(`Delete Subscription #${id}?`)) return;
    try {
       await adminDeleteSubscription(id);
       toast.success("Deleted successfully");
       loadData();
       setDrawerOpen(false);
    } catch { toast.error("Delete failed"); }
  };

  return (
    <div className="space-y-8">
       
       {/* HEADER */}
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
             <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Subscriptions</h1>
             <p className="text-gray-500 text-sm mt-1">Manage user plans & renewals.</p>
          </div>
          <div className="flex gap-3">
             <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input 
                   type="text" placeholder="Search ID or Plan..." 
                   value={search} onChange={e => setSearch(e.target.value)}
                   className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100 shadow-sm"
                />
             </div>
          </div>
       </div>

       {/* STATS CARDS */}
       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Total" value={stats.totalCount} icon={Activity} color="bg-blue-50 text-blue-600" />
          <StatCard label="Active" value={stats.activeCount} icon={CheckCircle2} color="bg-green-50 text-green-600" />
          <StatCard label="Expired" value={stats.expiredCount} icon={AlertTriangle} color="bg-red-50 text-red-600" />
          <StatCard label="Paused" value={stats.pausedCount} icon={PauseCircle} color="bg-yellow-50 text-yellow-600" />
       </div>

       {/* MAIN CONTENT */}
       <div className="bg-white rounded-[2rem] border border-gray-200 shadow-sm overflow-hidden">
          
          {/* Tabs */}
          <div className="flex border-b border-gray-100 p-4 gap-2 overflow-x-auto hide-scrollbar">
             {["ALL", "ACTIVE", "EXPIRED", "PAUSED"].map(tab => (
                <button 
                   key={tab} 
                   onClick={() => setStatusFilter(tab)}
                   className={`px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${statusFilter === tab ? "bg-gray-900 text-white shadow-md" : "bg-gray-50 text-gray-600 hover:bg-gray-100"}`}
                >
                   {tab}
                </button>
             ))}
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
             <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50/50 text-xs uppercase font-bold text-gray-400">
                   <tr>
                      <th className="px-6 py-4">ID</th>
                      <th className="px-6 py-4">Plan</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Validity</th>
                      <th className="px-6 py-4 text-right">Action</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                   {loading ? (
                      <tr><td colSpan="5" className="p-8 text-center text-gray-400">Loading...</td></tr>
                   ) : filteredSubs.length === 0 ? (
                      <tr><td colSpan="5" className="p-8 text-center text-gray-400">No subscriptions found.</td></tr>
                   ) : (
                      filteredSubs.map(sub => (
                         <tr key={sub.subscriptionid} className="hover:bg-gray-50/50 transition-colors group cursor-pointer" onClick={() => { setSelectedSub(sub); setDrawerOpen(true); }}>
                            <td className="px-6 py-4 font-mono text-xs text-gray-500">#{sub.subscriptionid}</td>
                            <td className="px-6 py-4">
                               <div className="font-bold text-gray-900">{sub.planId}</div>
                               <div className="text-xs text-gray-400">{sub.frequency}</div>
                            </td>
                            <td className="px-6 py-4">
                               <StatusBadge status={sub.status} />
                            </td>
                            <td className="px-6 py-4 text-xs">
                               <div className="flex items-center gap-1"><Calendar size={12}/> {sub.startDate}</div>
                               <div className="flex items-center gap-1 text-gray-400"><ArrowRight size={10}/> {sub.endDate}</div>
                            </td>
                            <td className="px-6 py-4 text-right">
                               <button className="p-2 bg-gray-100 rounded-full hover:bg-blue-50 hover:text-blue-600 transition"><ChevronRight size={16}/></button>
                            </td>
                         </tr>
                      ))
                   )}
                </tbody>
             </table>
          </div>
       </div>

       {/* DRAWER */}
       <AnimatePresence>
          {drawerOpen && selectedSub && (
             <>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDrawerOpen(false)} className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"/>
                <motion.div 
                   initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} 
                   transition={{ type: "spring", stiffness: 300, damping: 30 }}
                   className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 p-6 overflow-y-auto"
                >
                   <div className="flex justify-between items-center mb-8">
                      <h2 className="text-2xl font-bold text-gray-900">Details</h2>
                      <button onClick={() => setDrawerOpen(false)} className="p-2 bg-gray-100 rounded-full hover:bg-red-50 hover:text-red-500"><X size={20}/></button>
                   </div>

                   <div className="space-y-6">
                      <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-center">
                         <StatusBadge status={selectedSub.status} large />
                         <h3 className="text-xl font-extrabold text-gray-900 mt-4 mb-1">{selectedSub.planType || "Pro Plan"}</h3>
                         <p className="text-sm text-gray-500 font-mono">#{selectedSub.subscriptionid}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                         <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                            <p className="text-xs font-bold text-blue-500 uppercase">Discount</p>
                            <p className="text-lg font-bold text-gray-900">{selectedSub.discountPercentage}%</p>
                         </div>
                         <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                            <p className="text-xs font-bold text-green-500 uppercase">Delivery</p>
                            <p className="text-lg font-bold text-gray-900">{selectedSub.freeDelivery ? "Free" : "Paid"}</p>
                         </div>
                      </div>

                      <div className="space-y-4 border-t border-gray-100 pt-6">
                         <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Start Date</span>
                            <span className="font-semibold">{selectedSub.startDate}</span>
                         </div>
                         <div className="flex justify-between text-sm">
                            <span className="text-gray-500">End Date</span>
                            <span className="font-semibold">{selectedSub.endDate}</span>
                         </div>
                         <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Frequency</span>
                            <span className="font-semibold">{selectedSub.frequency}</span>
                         </div>
                         <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Allergies</span>
                            <span className="font-semibold text-right max-w-[50%]">{selectedSub.allergies?.join(", ") || "None"}</span>
                         </div>
                      </div>

                      <button 
                         onClick={() => handleDelete(selectedSub.subscriptionid)} 
                         className="w-full py-4 bg-red-50 text-red-600 rounded-2xl font-bold mt-8 hover:bg-red-100 transition flex items-center justify-center gap-2"
                      >
                         <Trash2 size={18}/> Delete Subscription
                      </button>
                   </div>
                </motion.div>
             </>
          )}
       </AnimatePresence>

    </div>
  );
}

const StatCard = ({ label, value, icon: Icon, color }) => (
   <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
      <div>
         <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{label}</p>
         <p className="text-2xl font-extrabold text-gray-900 mt-1">{value}</p>
      </div>
      <div className={`p-3 rounded-xl ${color}`}><Icon size={20}/></div>
   </div>
);

const StatusBadge = ({ status, large }) => {
   const config = STATUS_CONFIG[status] || STATUS_CONFIG.ALL;
   const Icon = config.icon;
   return (
      <span className={`inline-flex items-center gap-1.5 rounded-full font-bold uppercase tracking-wide ${config.color} ${large ? "px-4 py-2 text-sm" : "px-2.5 py-1 text-[10px]"}`}>
         <Icon size={large ? 16 : 12}/> {status}
      </span>
   );
};