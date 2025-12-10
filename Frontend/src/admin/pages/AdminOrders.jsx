// // src/admin/pages/AdminOrders.jsx 

// import React, { useEffect, useMemo, useState } from "react";
// import {
//   adminGetAllOrders,
//   adminUpdateOrderStatus,
//   adminAssignDeliveryPartner,
//   adminGetOrderTimeline,
//   getAllDeliveryPartners,
//   adminGetRejectionDetails,
//   createDeliveryPartner,
//   updateDeliveryPartner,
//   deleteDeliveryPartner,
// } from "../../api/api";

// import { motion, AnimatePresence } from "framer-motion";
// import {
//   FaClock,
//   FaMotorcycle,
//   FaSearch,
//   FaPhoneAlt,
//   FaUserAlt,
//   FaRupeeSign,
//   FaEnvelope,
//   FaMapMarkerAlt,
//   FaPlus,
//   FaTrash,
// } from "react-icons/fa";
// import { MdClose, MdCheckCircle, MdTimeline, MdError } from "react-icons/md";
// import toast from "react-hot-toast";

// /* ==========================================================
//    STATUS COLORS ACCORDING TO BACKEND ENUM
//    ========================================================== */
// const statusColors = {
//   PLACED: "bg-blue-50 text-blue-700 border-blue-200",
//   CONFIRMED: "bg-amber-50 text-amber-700 border-amber-200",
//   PREPARING: "bg-purple-50 text-purple-700 border-purple-200",
//   PICKED_UP: "bg-indigo-50 text-indigo-700 border-indigo-200",
//   DELIVERED: "bg-emerald-50 text-emerald-700 border-emerald-200",
//   REJECTED: "bg-red-50 text-red-700 border-red-200",
// };

// const ORDER_STEPS = [
//   "PLACED",
//   "CONFIRMED",
//   "PREPARING",
//   "PICKED_UP",
//   "DELIVERED",
//   "REJECTED",
// ];

// const PARTNER_FILTERS = [
//   { key: "ALL", label: "All" },
//   { key: "AVAILABLE", label: "Available" },
//   { key: "BUSY", label: "Busy" },
// ];

// /* Motion Animations */
// const fadeUp = {
//   hidden: { opacity: 0, y: 8 },
//   visible: { opacity: 1, y: 0 },
// };

// export default function AdminOrders() {
//   const [activeTab, setActiveTab] = useState("ORDERS"); // ORDERS | PARTNERS

//   /* ===================== ORDER STATE ===================== */
//   const [orders, setOrders] = useState([]);
//   const [filterStatus, setFilterStatus] = useState("");
//   const [filterDate, setFilterDate] = useState("");
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(false);

//   /* MODAL STATES (ORDERS) */
//   const [openStatusModal, setOpenStatusModal] = useState(false);
//   const [openAssignModal, setOpenAssignModal] = useState(false);
//   const [openTimelineModal, setOpenTimelineModal] = useState(false);
//   const [openRejectModal, setOpenRejectModal] = useState(false);

//   const [currentOrder, setCurrentOrder] = useState(null);
//   const [timeline, setTimeline] = useState([]);
//   const [assignPartners, setAssignPartners] = useState([]);
//   const [rejectionDetails, setRejectionDetails] = useState(null);

//   const [statusForm, setStatusForm] = useState({
//     status: "",
//     reason: "",
//     riderName: "",
//     riderPhone: "",
//   });

//   const [statusSaving, setStatusSaving] = useState(false);
//   const [assignLoading, setAssignLoading] = useState(false);

//   /* ===================== DELIVERY PARTNER STATE ===================== */
//   const [partners, setPartners] = useState([]);
//   const [partnersLoading, setPartnersLoading] = useState(false);
//   const [partnerSearch, setPartnerSearch] = useState("");
//   const [partnerFilter, setPartnerFilter] = useState("ALL");

//   const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
//   const [editingPartner, setEditingPartner] = useState(null);
//   const [savingPartner, setSavingPartner] = useState(false);

//   const [deleteModalOpen, setDeleteModalOpen] = useState(false);
//   const [partnerToDelete, setPartnerToDelete] = useState(null);
//   const [deleting, setDeleting] = useState(false);

//   const [partnerForm, setPartnerForm] = useState({
//     name: "",
//     phone: "",
//     email: "",
//     assignedArea: "",
//     vehicleDetails: "",
//     adharCard: "",
//     panCard: "",
//     driverLicence: "",
//     available: true,
//   });

//   /* ==========================================================
//       LOAD ALL ORDERS (FILTERS INCLUDED)
//   ========================================================== */
//   const loadOrders = async () => {
//     try {
//       setLoading(true);
//       const res = await adminGetAllOrders({
//         status: filterStatus || undefined,
//         date: filterDate || undefined,
//       });
//       setOrders(res?.data || []);
//     } catch (err) {
//       console.error("Order fetch error:", err);
//       toast.error("Failed to load orders");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadOrders();
//   }, [filterStatus, filterDate]);

//   /* ==========================================================
//       LOAD DELIVERY PARTNERS
//   ========================================================== */
//   const loadPartners = async () => {
//     try {
//       setPartnersLoading(true);
//       const res = await getAllDeliveryPartners();
//       const raw = res?.data;

//       const finalList = Array.isArray(raw)
//         ? raw
//         : Array.isArray(raw?.data)
//         ? raw.data
//         : Array.isArray(raw?.content)
//         ? raw.content
//         : [];

//       setPartners(finalList);
//     } catch (err) {
//       console.error("Partner fetch error:", err);
//       toast.error("Failed to load delivery partners");
//     } finally {
//       setPartnersLoading(false);
//     }
//   };

//   // Load partners on first visit to PARTNERS tab
//   useEffect(() => {
//     if (activeTab === "PARTNERS" && (!Array.isArray(partners) || partners.length === 0)) {
//       loadPartners();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [activeTab]);

//   /* ==========================================================
//       ORDER SEARCH
//   ========================================================== */
//   const filteredOrders = useMemo(() => {
//     if (!search.trim()) return orders;
//     const term = search.trim().toLowerCase();
//     return orders.filter((o) => {
//       return (
//         String(o.id).includes(term) ||
//         (o.customerName || "").toLowerCase().includes(term) ||
//         (o.customerPhone || "").toLowerCase().includes(term)
//       );
//     });
//   }, [orders, search]);

//   /* ==========================================================
//       ORDER STATS
//   ========================================================== */
//   const orderStats = useMemo(() => {
//     const total = Array.isArray(orders) ? orders.length : 0;
//     const delivered = orders.filter((o) => o.status === "DELIVERED").length;
//     const rejected = orders.filter((o) => o.status === "REJECTED").length;
//     const todayStr = new Date().toISOString().slice(0, 10);
//     const today = orders.filter(
//       (o) => o.createdAt?.slice(0, 10) === todayStr
//     ).length;
//     return { total, delivered, rejected, today };
//   }, [orders]);

//   /* ==========================================================
//       PARTNER FILTER + SEARCH
//   ========================================================== */
//   const filteredPartners = useMemo(() => {
//     let list = Array.isArray(partners) ? [...partners] : [];

//     if (partnerFilter === "AVAILABLE") {
//       list = list.filter((p) => p.available === true);
//     } else if (partnerFilter === "BUSY") {
//       list = list.filter((p) => p.available === false);
//     }

//     if (partnerSearch.trim()) {
//       const term = partnerSearch.trim().toLowerCase();
//       list = list.filter((p) => {
//         return (
//           (p.name || "").toLowerCase().includes(term) ||
//           (p.phone || "").toLowerCase().includes(term) ||
//           (p.assignedArea || "").toLowerCase().includes(term)
//         );
//       });
//     }

//     return list;
//   }, [partners, partnerFilter, partnerSearch]);

//   /* ==========================================================
//       PARTNER STATS
//   ========================================================== */
//   const partnerStats = useMemo(() => {
//     const list = Array.isArray(partners) ? partners : [];
//     const total = list.length;
//     const available = list.filter((p) => p.available).length;
//     const busy = total - available;
//     return { total, available, busy };
//   }, [partners]);

//   /* ==========================================================
//       OPEN STATUS MODAL
//   ========================================================== */
//   const openStatus = (order) => {
//     setCurrentOrder(order);
//     setStatusForm({
//       status: order.status || "PLACED",
//       reason: "",
//       riderName: "",
//       riderPhone: "",
//     });
//     setOpenStatusModal(true);
//   };

//   /* ==========================================================
//       UPDATE STATUS
//   ========================================================== */
//   const updateStatus = async () => {
//     if (!currentOrder) return;

//     if (statusForm.status === "REJECTED" && !statusForm.reason.trim()) {
//       toast.error("Rejection reason is required");
//       return;
//     }

//     if (statusForm.status === "PICKED_UP") {
//       if (!statusForm.riderName.trim() || !statusForm.riderPhone.trim()) {
//         toast.error("Rider name & phone required for PICKED_UP");
//         return;
//       }
//     }

//     try {
//       setStatusSaving(true);
//       await adminUpdateOrderStatus(currentOrder.id, statusForm);

//       toast.success("Order status updated");
//       setOpenStatusModal(false);
//       loadOrders();
//     } catch (err) {
//       toast.error("Failed to update order");
//     } finally {
//       setStatusSaving(false);
//     }
//   };

//   /* ==========================================================
//       OPEN ASSIGN PARTNER MODAL
//   ========================================================== */
//   const openAssign = async (order) => {
//     setCurrentOrder(order);
//     try {
//       setAssignLoading(true);
//       const res = await getAllDeliveryPartners();
//       const raw = res?.data;

//       const finalList = Array.isArray(raw)
//         ? raw
//         : Array.isArray(raw?.data)
//         ? raw.data
//         : Array.isArray(raw?.content)
//         ? raw.content
//         : [];

//       setAssignPartners(finalList);
//       setOpenAssignModal(true);
//     } catch (err) {
//       toast.error("Failed to load delivery partners");
//     } finally {
//       setAssignLoading(false);
//     }
//   };

//   /* ==========================================================
//       ASSIGN PARTNER
//   ========================================================== */
//   const assignPartner = async (partnerId) => {
//     try {
//       await adminAssignDeliveryPartner(currentOrder.id, partnerId);
//       toast.success("Partner assigned");
//       setOpenAssignModal(false);
//       loadOrders();
//     } catch (err) {
//       toast.error("Failed to assign");
//     }
//   };

//   /* ==========================================================
//       OPEN TIMELINE
//   ========================================================== */
//   const openTimeline = async (order) => {
//     setCurrentOrder(order);
//     try {
//       const res = await adminGetOrderTimeline(order.id);
//       setTimeline(res.data || []);
//       setOpenTimelineModal(true);
//     } catch (err) {
//       toast.error("Failed to load timeline");
//     }
//   };

//   /* ==========================================================
//       OPEN REJECTION
//   ========================================================== */
//   const openRejectionDetails = async (order) => {
//     setCurrentOrder(order);
//     try {
//       const res = await adminGetRejectionDetails(order.id);
//       setRejectionDetails(res?.data?.data || null);
//       setOpenRejectModal(true);
//     } catch (err) {
//       toast.error("Failed to load rejection info");
//     }
//   };

//   /* ==========================================================
//       PARTNER MODAL HANDLERS
//   ========================================================== */
//   const openAddPartnerModal = () => {
//     setEditingPartner(null);
//     setPartnerForm({
//       name: "",
//       phone: "",
//       email: "",
//       assignedArea: "",
//       vehicleDetails: "",
//       adharCard: "",
//       panCard: "",
//       driverLicence: "",
//       available: true,
//     });
//     setIsPartnerModalOpen(true);
//   };

//   const openEditPartnerModal = (partner) => {
//     setEditingPartner(partner);
//     setPartnerForm({
//       name: partner.name || "",
//       phone: partner.phone || "",
//       email: partner.email || "",
//       assignedArea: partner.assignedArea || "",
//       vehicleDetails: partner.vehicleDetails || "",
//       adharCard: partner.adharCard || "",
//       panCard: partner.panCard || "",
//       driverLicence: partner.driverLicence || "",
//       available: partner.available ?? true,
//     });
//     setIsPartnerModalOpen(true);
//   };

//   const closePartnerModal = () => {
//     setIsPartnerModalOpen(false);
//     setEditingPartner(null);
//   };

//   const handlePartnerChange = (field, value) => {
//     setPartnerForm((prev) => ({ ...prev, [field]: value }));
//   };

//   /* ==========================================================
//       VALIDATION (Aadhar, PAN, phone, email)
//   ========================================================== */
//   const validatePartnerForm = () => {
//     const { name, phone, email, adharCard, panCard } = partnerForm;

//     if (!name.trim()) {
//       toast.error("Full name is required");
//       return false;
//     }

//     if (!phone.trim()) {
//       toast.error("Phone number is required");
//       return false;
//     }

//     const phoneRegex = /^\d{10}$/;
//     if (!phoneRegex.test(phone.trim())) {
//       toast.error("Phone must be 10 digits (e.g., 9876543210)");
//       return false;
//     }

//     if (email.trim()) {
//       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//       if (!emailRegex.test(email.trim())) {
//         toast.error("Please enter a valid email address");
//         return false;
//       }
//     }

//     if (adharCard.trim()) {
//       const aadharRegex = /^\d{12}$/;
//       if (!aadharRegex.test(adharCard.trim())) {
//         toast.error("Aadhar must be 12 digits");
//         return false;
//       }
//     }

//     if (panCard.trim()) {
//       const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
//       if (!panRegex.test(panCard.trim())) {
//         toast.error("PAN format should be ABCDE1234F (5 letters, 4 digits, 1 letter)");
//         return false;
//       }
//     }

//     return true;
//   };

//   const handleSavePartner = async () => {
//     if (!validatePartnerForm()) return;

//     const payload = {
//       ...partnerForm,
//     };

//     try {
//       setSavingPartner(true);

//       if (editingPartner) {
//         // UPDATE (PUT /ordr/delivery-partners/{id})
//         await updateDeliveryPartner(editingPartner.id, payload);
//         toast.success("Partner updated successfully");
//       } else {
//         // CREATE (POST /ordr/delivery-partners)
//         await createDeliveryPartner(payload);
//         toast.success("Partner created successfully");
//       }

//       closePartnerModal();
//       loadPartners();
//     } catch (err) {
//       console.error("Save partner error:", err);
//       toast.error("Failed to save partner");
//     } finally {
//       setSavingPartner(false);
//     }
//   };

//   /* ==========================================================
//       DELETE PARTNER FLOW
//   ========================================================== */
//   const openDeletePartnerModal = (partner) => {
//     setPartnerToDelete(partner);
//     setDeleteModalOpen(true);
//   };

//   const closeDeleteModal = () => {
//     setPartnerToDelete(null);
//     setDeleteModalOpen(false);
//   };

//   const handleConfirmDeletePartner = async () => {
//     if (!partnerToDelete?.id) return;
//     try {
//       setDeleting(true);
//       await deleteDeliveryPartner(partnerToDelete.id);
//       toast.success("Partner deleted successfully");
//       closeDeleteModal();
//       loadPartners();
//     } catch (err) {
//       console.error("Delete partner error:", err);
//       toast.error("Failed to delete partner");
//     } finally {
//       setDeleting(false);
//     }
//   };

//   /* ==================================================================
//       DATE FORMAT
//   ================================================================== */
//   const formatDateTime = (str) => {
//     if (!str) return "-";
//     return new Date(str).toLocaleString();
//   };

//   /* ==================================================================
//       RENDER
//   ================================================================== */
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 p-4 md:p-6 lg:p-8">
//       {/* Background Blobs */}
//       <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
//         <div className="absolute -right-24 top-16 h-64 w-64 rounded-full bg-indigo-200/30 blur-3xl" />
//         <div className="absolute -left-24 bottom-10 h-64 w-64 rounded-full bg-emerald-200/25 blur-3xl" />
//       </div>

//       {/* =================== HEADER (Changes with Tab) =================== */}
//       <motion.div
//         variants={fadeUp}
//         initial="hidden"
//         animate="visible"
//         className="mb-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
//       >
//         {activeTab === "ORDERS" ? (
//           <>
//             <div>
//               <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
//                 Orders & Delivery
//               </h1>
//               <p className="mt-1 text-sm text-slate-600">
//                 Track, manage, update and assign orders.
//               </p>
//             </div>

//             <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
//               <div className="rounded-2xl bg-white px-3 py-2 shadow border">
//                 <p className="text-[11px] uppercase text-slate-500">
//                   Total Orders
//                 </p>
//                 <p className="text-lg font-semibold">{orderStats.total}</p>
//               </div>
//               <div className="rounded-2xl bg-emerald-50 px-3 py-2 shadow border border-emerald-100">
//                 <p className="text-[11px] uppercase text-emerald-700">
//                   Delivered
//                 </p>
//                 <p className="text-lg font-semibold text-emerald-800">
//                   {orderStats.delivered}
//                 </p>
//               </div>
//               <div className="rounded-2xl bg-red-50 px-3 py-2 shadow border border-red-100">
//                 <p className="text-[11px] uppercase text-red-700">
//                   Rejected
//                 </p>
//                 <p className="text-lg font-semibold text-red-800">
//                   {orderStats.rejected}
//                 </p>
//               </div>
//               <div className="rounded-2xl bg-indigo-50 px-3 py-2 shadow border border-indigo-100">
//                 <p className="text-[11px] uppercase text-indigo-700">
//                   Today
//                 </p>
//                 <p className="text-lg font-semibold text-indigo-800">
//                   {orderStats.today}
//                 </p>
//               </div>
//             </div>
//           </>
//         ) : (
//           <>
//             <div>
//               <h1 className="text-2xl md:text-3xl font-bold text-slate-900 flex items-center gap-2">
//                 <FaMotorcycle className="text-indigo-500" />
//                 Delivery Partners
//               </h1>
//               <p className="mt-1 text-sm text-slate-600">
//                 Manage your delivery fleet — availability, areas & details.
//               </p>
//             </div>
//             <div className="grid grid-cols-3 gap-2">
//               <div className="rounded-2xl bg-white/90 px-3 py-2 shadow-sm border border-slate-100">
//                 <p className="text-[11px] uppercase tracking-wide text-slate-500">
//                   Total
//                 </p>
//                 <p className="text-lg font-semibold text-slate-900">
//                   {partnerStats.total}
//                 </p>
//               </div>
//               <div className="rounded-2xl bg-emerald-50 px-3 py-2 shadow-sm border border-emerald-100">
//                 <p className="text-[11px] uppercase tracking-wide text-emerald-700">
//                   Available
//                 </p>
//                 <p className="text-lg font-semibold text-emerald-800">
//                   {partnerStats.available}
//                 </p>
//               </div>
//               <div className="rounded-2xl bg-amber-50 px-3 py-2 shadow-sm border border-amber-100">
//                 <p className="text-[11px] uppercase tracking-wide text-amber-700">
//                   Busy
//                 </p>
//                 <p className="text-lg font-semibold text-amber-800">
//                   {partnerStats.busy}
//                 </p>
//               </div>
//             </div>
//           </>
//         )}
//       </motion.div>

//       {/* =================== TAB SWITCHER =================== */}
//       <div className="mb-5 flex justify-start">
//         <div className="inline-flex rounded-full bg-slate-100 p-1 shadow-sm">
//           <button
//             onClick={() => setActiveTab("ORDERS")}
//             className={`px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-full transition 
//             ${
//               activeTab === "ORDERS"
//                 ? "bg-white text-slate-900 shadow"
//                 : "text-slate-500 hover:text-slate-800"
//             }`}
//           >
//             Orders
//           </button>
//           <button
//             onClick={() => setActiveTab("PARTNERS")}
//             className={`px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-full transition 
//             ${
//               activeTab === "PARTNERS"
//                 ? "bg-white text-slate-900 shadow"
//                 : "text-slate-500 hover:text-slate-800"
//             }`}
//           >
//             Delivery Partners
//           </button>
//         </div>
//       </div>

//       {/* =================== ORDERS TAB =================== */}
//       {activeTab === "ORDERS" && (
//         <>
//           {/* FILTERS */}
//           <motion.div
//             variants={fadeUp}
//             initial="hidden"
//             animate="visible"
//             className="mb-5 flex flex-col gap-3 rounded-2xl border bg-white p-4 shadow"
//           >
//             <div className="flex flex-col lg:flex-row gap-3">
//               <div className="relative flex-1">
//                 <FaSearch className="absolute left-3 top-2.5 text-slate-400" />
//                 <input
//                   type="text"
//                   className="w-full border rounded-xl pl-8 py-2 text-sm"
//                   placeholder="Search by name, phone or order ID..."
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                 />
//               </div>

//               <div className="flex flex-wrap gap-2">
//                 <input
//                   type="date"
//                   className="border rounded-xl px-3 py-2 text-sm"
//                   value={filterDate}
//                   onChange={(e) => setFilterDate(e.target.value)}
//                 />

//                 <select
//                   className="border rounded-xl px-3 py-2 text-sm"
//                   value={filterStatus}
//                   onChange={(e) => setFilterStatus(e.target.value)}
//                 >
//                   <option value="">All Status</option>
//                   {ORDER_STEPS.map((s) => (
//                     <option key={s}>{s}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             <button
//               className="w-fit px-3 py-1.5 border text-xs rounded-full"
//               onClick={() => {
//                 setSearch("");
//                 setFilterDate("");
//                 setFilterStatus("");
//               }}
//             >
//               Reset Filters
//             </button>
//           </motion.div>

//           {/* ORDER GRID */}
//           <div className="mt-4">
//             {loading ? (
//               <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
//                 {Array.from({ length: 6 }).map((_, i) => (
//                   <div
//                     key={i}
//                     className="h-40 bg-slate-100 animate-pulse rounded-2xl"
//                   />
//                 ))}
//               </div>
//             ) : filteredOrders.length === 0 ? (
//               <div className="text-center py-20 text-slate-500">
//                 <MdError className="mx-auto mb-2 text-4xl text-slate-300" />
//                 No orders found.
//               </div>
//             ) : (
//               <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
//                 {filteredOrders.map((order, idx) => (
//                   <motion.div
//                     key={order.id}
//                     initial={{ opacity: 0, y: 8 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: idx * 0.03 }}
//                     className="rounded-2xl bg-white p-4 shadow border"
//                   >
//                     <div className="flex justify-between">
//                       <div>
//                         <p className="text-[11px] text-slate-400 font-semibold">
//                           Order #{order.id}
//                         </p>
//                         <p className="flex items-center gap-1 text-sm font-semibold">
//                           <FaUserAlt className="text-slate-400" />
//                           {order.customerName}
//                         </p>
//                         <p className="flex items-center gap-1 text-xs text-slate-500">
//                           <FaPhoneAlt className="text-slate-400" />
//                           {order.customerPhone}
//                         </p>
//                       </div>

//                       <span
//                         className={`px-3 py-1 rounded-full text-[11px] font-semibold border uppercase ${
//                           statusColors[order.status]
//                         }`}
//                       >
//                         {order.status}
//                       </span>
//                     </div>

//                     <p className="mt-2 text-xs text-slate-500">
//                       {order.address}
//                     </p>
//                     <p className="mt-1 flex items-center gap-1 text-[11px] text-slate-400">
//                       <FaClock />
//                       {formatDateTime(order.createdAt)}
//                     </p>

//                     {order.items?.length > 0 && (
//                       <div className="mt-3 bg-slate-50 rounded-xl p-3 text-xs">
//                         <p className="font-semibold text-slate-700">
//                           {order.items.length} items:
//                         </p>
//                         <p className="text-slate-600 line-clamp-2">
//                           {order.items
//                             .slice(0, 3)
//                             .map(
//                               (item) => `${item.itemName} × ${item.quantity}`
//                             )
//                             .join(" • ")}
//                           {order.items.length > 3 && " • ..."}
//                         </p>
//                       </div>
//                     )}

//                     <div className="mt-3 flex justify-between">
//                       <p className="flex text-xs gap-1 text-slate-500">
//                         <FaRupeeSign /> Total Amount
//                       </p>
//                       <p className="font-bold text-slate-900 text-base">
//                         ₹{order.totalAmount}
//                       </p>
//                     </div>

//                     <div className="mt-4 flex flex-wrap gap-2">
//                       <button
//                         onClick={() => openTimeline(order)}
//                         className="border rounded-full px-3 py-1.5 text-xs"
//                       >
//                         <MdTimeline /> Timeline
//                       </button>
//                       <button
//                         onClick={() => openStatus(order)}
//                         className="bg-rose-50 text-rose-700 px-3 py-1.5 rounded-full text-xs font-semibold"
//                       >
//                         Update Status
//                       </button>
//                       <button
//                         onClick={() => openAssign(order)}
//                         className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-xs font-semibold"
//                       >
//                         <FaMotorcycle /> Assign
//                       </button>

//                       {order.status === "REJECTED" && (
//                         <button
//                           onClick={() => openRejectionDetails(order)}
//                           className="bg-red-50 text-red-700 px-3 py-1.5 rounded-full text-xs font-semibold"
//                         >
//                           <MdError /> Rejection Info
//                         </button>
//                       )}
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </>
//       )}

//       {/* =================== DELIVERY PARTNERS TAB =================== */}
//       {activeTab === "PARTNERS" && (
//         <>
//           {/* SEARCH + FILTERS + ADD BUTTON */}
//           <motion.div
//             variants={fadeUp}
//             initial="hidden"
//             animate="visible"
//             className="mb-5 flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white/90 p-4 shadow-sm"
//           >
//             <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
//               <div className="relative w-full md:max-w-md">
//                 <FaSearch className="pointer-events-none absolute left-3 top-2.5 text-xs text-slate-400" />
//                 <input
//                   type="text"
//                   placeholder="Search by name, phone or area..."
//                   value={partnerSearch}
//                   onChange={(e) => setPartnerSearch(e.target.value)}
//                   className="w-full rounded-xl border border-slate-200 bg-white px-8 py-2 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
//                 />
//               </div>

//               <div className="flex flex-wrap gap-2">
//                 {PARTNER_FILTERS.map((f) => {
//                   const active = partnerFilter === f.key;
//                   return (
//                     <button
//                       key={f.key}
//                       onClick={() => setPartnerFilter(f.key)}
//                       className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold border transition
//                         ${
//                           active
//                             ? "bg-slate-900 text-white border-slate-900 shadow-sm"
//                             : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
//                         }`}
//                     >
//                       {f.label}
//                     </button>
//                   );
//                 })}
//               </div>

//               <button
//                 onClick={openAddPartnerModal}
//                 className="inline-flex items-center justify-center gap-2 rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-indigo-500/30 hover:bg-indigo-700 transition"
//               >
//                 <FaPlus />
//                 Add Partner
//               </button>
//             </div>

//             <button
//               className="w-fit rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 transition"
//               onClick={() => {
//                 setPartnerSearch("");
//                 setPartnerFilter("ALL");
//               }}
//             >
//               Clear Filters
//             </button>
//           </motion.div>

//           {/* PARTNERS GRID */}
//           <div className="mt-4">
//             {partnersLoading ? (
//               <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
//                 {Array.from({ length: 6 }).map((_, i) => (
//                   <div
//                     key={i}
//                     className="h-40 animate-pulse rounded-2xl bg-slate-100/80 border border-slate-100"
//                   />
//                 ))}
//               </div>
//             ) : filteredPartners.length === 0 ? (
//               <div className="flex min-h-[40vh] flex-col items-center justify-center text-center text-slate-500">
//                 <FaMotorcycle className="mb-3 h-10 w-10 text-slate-300" />
//                 <p className="text-sm md:text-base">
//                   No delivery partners found. Try changing filters or add a new one.
//                 </p>
//               </div>
//             ) : (
//               <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
//                 {filteredPartners.map((p, idx) => (
//                   <motion.div
//                     key={p.id}
//                     initial={{ opacity: 0, y: 8 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: idx * 0.02 }}
//                     whileHover={{
//                       y: -3,
//                       boxShadow: "0 18px 40px rgba(15,23,42,0.14)",
//                     }}
//                     className="flex h-full flex-col rounded-2xl border border-slate-100 bg-white/95 p-4 shadow-md transition-all duration-200"
//                   >
//                     {/* Header row */}
//                     <div className="mb-2 flex items-start justify-between gap-2">
//                       <div>
//                         <p className="flex items-center gap-1 text-sm font-semibold text-slate-900">
//                           <FaUserAlt className="text-slate-400" />
//                           {p.name || "Unnamed Partner"}
//                         </p>
//                         <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
//                           <FaPhoneAlt className="text-slate-400" />
//                           {p.phone || "N/A"}
//                         </p>
//                         {p.email && (
//                           <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
//                             <FaEnvelope className="text-slate-400" />
//                             {p.email}
//                           </p>
//                         )}
//                       </div>

//                       <div className="flex flex-col items-end gap-1">
//                         <span
//                           className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${
//                             p.available
//                               ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
//                               : "bg-amber-50 text-amber-700 border border-amber-100"
//                           }`}
//                         >
//                           <span className="h-1.5 w-1.5 rounded-full bg-current" />
//                           {p.available ? "Available" : "Busy"}
//                         </span>

//                         <div className="flex gap-1">
//                           <button
//                             onClick={() => openEditPartnerModal(p)}
//                             className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-2.5 py-1 text-[11px] font-medium text-slate-600 hover:bg-slate-50 transition"
//                           >
//                             Edit
//                           </button>
//                           <button
//                             onClick={() => openDeletePartnerModal(p)}
//                             className="inline-flex items-center gap-1 rounded-full border border-red-200 px-2.5 py-1 text-[11px] font-medium text-red-600 hover:bg-red-50 transition"
//                           >
//                             <FaTrash className="text-[10px]" />
//                             Delete
//                           </button>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Area + Vehicle */}
//                     <div className="mt-2 space-y-1.5 text-xs text-slate-600">
//                       {p.assignedArea && (
//                         <p className="flex items-start gap-1.5">
//                           <FaMapMarkerAlt className="mt-[2px] text-slate-400" />
//                           <span className="line-clamp-2">
//                             {p.assignedArea}
//                           </span>
//                         </p>
//                       )}

//                       {p.vehicleDetails && (
//                         <p className="flex items-start gap-1.5">
//                           <FaMotorcycle className="mt-[2px] text-slate-400" />
//                           <span className="line-clamp-2">
//                             {p.vehicleDetails}
//                           </span>
//                         </p>
//                       )}
//                     </div>

//                     {/* IDs section */}
//                     {(p.adharCard || p.panCard || p.driverLicence) && (
//                       <div className="mt-3 rounded-xl bg-slate-50/80 px-3 py-2 text-[11px] text-slate-600 space-y-0.5">
//                         {p.adharCard && (
//                           <p>
//                             <span className="font-semibold">Aadhar:</span>{" "}
//                             {p.adharCard}
//                           </p>
//                         )}
//                         {p.panCard && (
//                           <p>
//                             <span className="font-semibold">PAN:</span>{" "}
//                             {p.panCard}
//                           </p>
//                         )}
//                         {p.driverLicence && (
//                           <p>
//                             <span className="font-semibold">License:</span>{" "}
//                             {p.driverLicence}
//                           </p>
//                         )}
//                       </div>
//                     )}
//                   </motion.div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </>
//       )}

//       {/* =================== ORDER MODALS =================== */}

//       {/* STATUS MODAL */}
//       <AnimatePresence>
//         {openStatusModal && currentOrder && (
//           <motion.div
//             className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               className="bg-white w-full max-w-md rounded-2xl p-5 shadow-xl"
//             >
//               <div className="flex justify-between mb-3">
//                 <div>
//                   <h2 className="text-lg font-semibold">Update Status</h2>
//                   <p className="text-xs text-slate-500">
//                     Order #{currentOrder.id}
//                   </p>
//                 </div>
//                 <button
//                   className="p-1 rounded-full hover:bg-slate-100"
//                   onClick={() => setOpenStatusModal(false)}
//                 >
//                   <MdClose size={20} />
//                 </button>
//               </div>

//               {/* PREMIUM STATUS CHIP SELECTOR */}
//               <div className="mb-4">
//                 <label className="text-xs font-semibold text-slate-600">
//                   Select Status
//                 </label>

//                 <div className="flex flex-wrap gap-2 mt-2">
//                   {ORDER_STEPS.map((st) => {
//                     const active = statusForm.status === st;
//                     return (
//                       <motion.button
//                         key={st}
//                         whileTap={{ scale: 0.92 }}
//                         whileHover={{ scale: 1.06 }}
//                         onClick={() =>
//                           setStatusForm((f) => ({ ...f, status: st }))
//                         }
//                         className={`px-3 py-1.5 rounded-full text-xs font-semibold border shadow-sm transition
//                         ${
//                           active
//                             ? "bg-rose-600 text-white border-rose-600 shadow"
//                             : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"
//                         }`}
//                       >
//                         {st}
//                       </motion.button>
//                     );
//                   })}
//                 </div>
//               </div>

//               {statusForm.status === "REJECTED" && (
//                 <div className="mb-4">
//                   <label className="text-xs font-medium">
//                     Rejection Reason <span className="text-red-500">*</span>
//                   </label>
//                   <textarea
//                     rows={3}
//                     className="w-full border rounded-xl px-3 py-2 mt-1 text-sm"
//                     value={statusForm.reason}
//                     onChange={(e) =>
//                       setStatusForm((f) => ({
//                         ...f,
//                         reason: e.target.value,
//                       }))
//                     }
//                   />
//                 </div>
//               )}

//               {statusForm.status === "PICKED_UP" && (
//                 <div className="grid grid-cols-2 gap-3 mb-4">
//                   <div>
//                     <label className="text-xs font-medium">
//                       Rider Name <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       className="w-full border rounded-xl px-3 py-2 mt-1 text-sm"
//                       value={statusForm.riderName}
//                       onChange={(e) =>
//                         setStatusForm((f) => ({
//                           ...f,
//                           riderName: e.target.value,
//                         }))
//                       }
//                     />
//                   </div>
//                   <div>
//                     <label className="text-xs font-medium">
//                       Rider Phone <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       className="w-full border rounded-xl px-3 py-2 mt-1 text-sm"
//                       value={statusForm.riderPhone}
//                       onChange={(e) =>
//                         setStatusForm((f) => ({
//                           ...f,
//                           riderPhone: e.target.value,
//                         }))
//                       }
//                     />
//                   </div>
//                 </div>
//               )}

//               <button
//                 className="w-full bg-rose-600 hover:bg-rose-700 text-white rounded-full py-2 font-semibold flex items-center justify-center gap-2"
//                 onClick={updateStatus}
//                 disabled={statusSaving}
//               >
//                 {statusSaving ? (
//                   <>
//                     <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                     Saving...
//                   </>
//                 ) : (
//                   <>
//                     <MdCheckCircle />
//                     Save Changes
//                   </>
//                 )}
//               </button>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* ASSIGN PARTNER MODAL */}
//       <AnimatePresence>
//         {openAssignModal && (
//           <motion.div
//             className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               className="bg-white w-full max-w-md rounded-2xl p-5 shadow-xl"
//             >
//               <div className="flex justify-between mb-3">
//                 <h2 className="text-lg font-semibold">Assign Delivery Partner</h2>
//                 <button
//                   className="p-1 rounded-full hover:bg-slate-100"
//                   onClick={() => setOpenAssignModal(false)}
//                 >
//                   <MdClose size={20} />
//                 </button>
//               </div>

//               {assignLoading ? (
//                 <p className="text-center py-4 text-slate-500">
//                   Loading partners...
//                 </p>
//               ) : assignPartners.length === 0 ? (
//                 <p className="text-center py-6 border rounded-xl bg-slate-50 text-slate-500">
//                   No delivery partners available.
//                 </p>
//               ) : (
//                 <div className="max-h-72 overflow-y-auto space-y-2 pr-1">
//                   {assignPartners.map((p) => (
//                     <div
//                       key={p.id}
//                       className="flex justify-between items-center border p-3 rounded-xl bg-slate-50"
//                     >
//                       <div>
//                         <p className="font-semibold">{p.name}</p>
//                         <p className="text-xs text-slate-500">{p.phone}</p>
//                       </div>
//                       <button
//                         className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-full text-xs"
//                         onClick={() => assignPartner(p.id)}
//                       >
//                         Assign
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* TIMELINE MODAL */}
//       <AnimatePresence>
//         {openTimelineModal && (
//           <motion.div
//             className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               className="bg-white w-full max-w-md rounded-2xl p-5 shadow-xl"
//             >
//               <div className="flex justify-between mb-3">
//                 <h2 className="text-lg font-semibold">Order Timeline</h2>
//                 <button
//                   className="p-1 rounded-full hover:bg-slate-100"
//                   onClick={() => setOpenTimelineModal(false)}
//                 >
//                   <MdClose size={20} />
//                 </button>
//               </div>

//               <div className="space-y-3 mt-2">
//                 {ORDER_STEPS.map((step, index) => {
//                   const completed = timeline.includes(step);
//                   return (
//                     <div key={step} className="flex items-center gap-3">
//                       <div
//                         className={`h-7 w-7 rounded-full flex items-center justify-center border 
//                           ${
//                             completed
//                               ? "bg-emerald-600 border-emerald-600 text-white"
//                               : "bg-slate-200 border-slate-300 text-slate-500"
//                           }
//                         `}
//                       >
//                         {completed ? (
//                           <MdCheckCircle size={18} />
//                         ) : (
//                           index + 1
//                         )}
//                       </div>
//                       <span
//                         className={`text-sm ${
//                           completed ? "font-semibold text-slate-900" : "text-slate-400"
//                         }`}
//                       >
//                         {step}
//                       </span>
//                     </div>
//                   );
//                 })}
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* REJECTION DETAILS MODAL */}
//       <AnimatePresence>
//         {openRejectModal && (
//           <motion.div
//             className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               className="bg-white w-full max-w-md rounded-2xl p-5 shadow-xl"
//             >
//               <div className="flex justify-between mb-3">
//                 <h2 className="text-lg font-semibold">Rejection Details</h2>
//                 <button
//                   className="p-1 rounded-full hover:bg-slate-100"
//                   onClick={() => setOpenRejectModal(false)}
//                 >
//                   <MdClose size={20} />
//                 </button>
//               </div>

//               {!rejectionDetails ? (
//                 <p className="py-4 text-sm text-slate-500">
//                   No rejection details available.
//                 </p>
//               ) : (
//                 <div className="space-y-3 text-sm">
//                   <div>
//                     <p className="text-xs font-semibold text-slate-500 uppercase">
//                       User
//                     </p>
//                     <p>{rejectionDetails.username}</p>
//                   </div>

//                   <div>
//                     <p className="text-xs font-semibold text-slate-500 uppercase">
//                       Amount
//                     </p>
//                     <p>₹{rejectionDetails.amount}</p>
//                   </div>

//                   <div>
//                     <p className="text-xs font-semibold text-slate-500 uppercase">
//                       Reason
//                     </p>
//                     <p>{rejectionDetails.reason}</p>
//                   </div>

//                   <div>
//                     <p className="text-xs font-semibold text-slate-500 uppercase">
//                       Items
//                     </p>
//                     <ul className="mt-1 space-y-1">
//                       {rejectionDetails.orderItems?.map((it, idx) => (
//                         <li
//                           key={idx}
//                           className="flex justify-between bg-slate-50 p-2 rounded-xl text-xs"
//                         >
//                           <span>{it.name}</span>
//                           <span className="text-slate-500">× {it.quantity}</span>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 </div>
//               )}
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* =================== PARTNER MODAL (ADD / EDIT) =================== */}
//       <AnimatePresence>
//         {isPartnerModalOpen && (
//           <motion.div
//             className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <motion.div
//               initial={{ scale: 0.92, y: 10, opacity: 0 }}
//               animate={{ scale: 1, y: 0, opacity: 1 }}
//               exit={{ scale: 0.9, y: 10, opacity: 0 }}
//               className="w-full max-w-xl rounded-2xl bg-white p-5 shadow-2xl"
//             >
//               <div className="mb-3 flex items-center justify-between">
//                 <div>
//                   <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
//                     {editingPartner ? "Edit Delivery Partner" : "Add Delivery Partner"}
//                   </h2>
//                   {editingPartner && (
//                     <p className="text-xs text-slate-500">
//                       ID: {editingPartner.id}
//                     </p>
//                   )}
//                 </div>
//                 <button
//                   onClick={closePartnerModal}
//                   className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
//                 >
//                   <MdClose size={18} />
//                 </button>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                 {/* Name */}
//                 <div>
//                   <label className="text-xs font-medium text-slate-600">
//                     Full Name <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="e.g., Rohan Patil"
//                     className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
//                     value={partnerForm.name}
//                     onChange={(e) => handlePartnerChange("name", e.target.value)}
//                   />
//                 </div>

//                 {/* Phone */}
//                 <div>
//                   <label className="text-xs font-medium text-slate-600">
//                     Phone Number <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="10-digit number (e.g., 9876543210)"
//                     className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
//                     value={partnerForm.phone}
//                     onChange={(e) => handlePartnerChange("phone", e.target.value)}
//                   />
//                 </div>

//                 {/* Email */}
//                 <div>
//                   <label className="text-xs font-medium text-slate-600">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     placeholder="e.g., rider@tiffino.com"
//                     className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
//                     value={partnerForm.email}
//                     onChange={(e) => handlePartnerChange("email", e.target.value)}
//                   />
//                 </div>

//                 {/* Assigned Area */}
//                 <div>
//                   <label className="text-xs font-medium text-slate-600">
//                     Assigned Area
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="e.g., Kharadi, Viman Nagar"
//                     className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
//                     value={partnerForm.assignedArea}
//                     onChange={(e) =>
//                       handlePartnerChange("assignedArea", e.target.value)
//                     }
//                   />
//                 </div>

//                 {/* Vehicle */}
//                 <div className="md:col-span-2">
//                   <label className="text-xs font-medium text-slate-600">
//                     Vehicle Details
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="e.g., Hero Splendor • MH-12 AB 1234 • Red"
//                     className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
//                     value={partnerForm.vehicleDetails}
//                     onChange={(e) =>
//                       handlePartnerChange("vehicleDetails", e.target.value)
//                     }
//                   />
//                 </div>

//                 {/* Aadhar */}
//                 <div>
//                   <label className="text-xs font-medium text-slate-600">
//                     Aadhar Number{" "}
//                     <span className="text-[10px] text-slate-400">
//                       (12 digits, e.g., 123412341234)
//                     </span>
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="123412341234"
//                     className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
//                     value={partnerForm.adharCard}
//                     onChange={(e) =>
//                       handlePartnerChange("adharCard", e.target.value)
//                     }
//                   />
//                 </div>

//                 {/* PAN */}
//                 <div>
//                   <label className="text-xs font-medium text-slate-600">
//                     PAN Number{" "}
//                     <span className="text-[10px] text-slate-400">
//                       (ABCDE1234F format)
//                     </span>
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="ABCDE1234F"
//                     className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm uppercase outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
//                     value={partnerForm.panCard}
//                     onChange={(e) =>
//                       handlePartnerChange("panCard", e.target.value.toUpperCase())
//                     }
//                   />
//                 </div>

//                 {/* License */}
//                 <div>
//                   <label className="text-xs font-medium text-slate-600">
//                     Driving License{" "}
//                     <span className="text-[10px] text-slate-400">
//                       (e.g., MH12 202400123456)
//                     </span>
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="MH12 202400123456"
//                     className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
//                     value={partnerForm.driverLicence}
//                     onChange={(e) =>
//                       handlePartnerChange("driverLicence", e.target.value)
//                     }
//                   />
//                 </div>

//                 {/* Availability toggle */}
//                 <div className="flex items-end">
//                   <label className="flex items-center gap-2 text-xs font-medium text-slate-600">
//                     <input
//                       type="checkbox"
//                       className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
//                       checked={partnerForm.available}
//                       onChange={(e) =>
//                         handlePartnerChange("available", e.target.checked)
//                       }
//                     />
//                     Mark as Available
//                   </label>
//                 </div>
//               </div>

//               <button
//                 onClick={handleSavePartner}
//                 disabled={savingPartner}
//                 className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60 transition"
//               >
//                 {savingPartner ? (
//                   <>
//                     <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
//                     Saving...
//                   </>
//                 ) : (
//                   <>
//                     <MdCheckCircle />
//                     {editingPartner ? "Save Changes" : "Create Partner"}
//                   </>
//                 )}
//               </button>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* =================== DELETE PARTNER CONFIRM MODAL =================== */}
//       <AnimatePresence>
//         {deleteModalOpen && partnerToDelete && (
//           <motion.div
//             className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <motion.div
//               initial={{ scale: 0.92, y: 10, opacity: 0 }}
//               animate={{ scale: 1, y: 0, opacity: 1 }}
//               exit={{ scale: 0.9, y: 10, opacity: 0 }}
//               className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl"
//             >
//               <div className="mb-3 flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-50 text-red-600">
//                     <FaTrash />
//                   </div>
//                   <h2 className="text-base font-semibold text-slate-900">
//                     Delete Delivery Partner
//                   </h2>
//                 </div>
//                 <button
//                   onClick={closeDeleteModal}
//                   className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
//                 >
//                   <MdClose size={18} />
//                 </button>
//               </div>

//               <p className="text-sm text-slate-600">
//                 Are you sure you want to permanently delete{" "}
//                 <span className="font-semibold">
//                   {partnerToDelete.name || "this partner"}
//                 </span>
//                 ? This action cannot be undone.
//               </p>

//               <div className="mt-4 flex justify-end gap-2">
//                 <button
//                   onClick={closeDeleteModal}
//                   disabled={deleting}
//                   className="rounded-full border border-slate-200 px-4 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 transition disabled:opacity-60"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleConfirmDeletePartner}
//                   disabled={deleting}
//                   className="inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-1.5 text-xs font-semibold text-white shadow hover:bg-red-700 disabled:opacity-60"
//                 >
//                   {deleting ? (
//                     <>
//                       <span className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
//                       Deleting...
//                     </>
//                   ) : (
//                     <>
//                       <FaTrash className="text-[10px]" />
//                       Delete
//                     </>
//                   )}
//                 </button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }









// import React, { useEffect, useMemo, useState } from "react";
// import {
//   adminGetAllOrders,
//   adminUpdateOrderStatus,
//   adminAssignDeliveryPartner,
//   adminGetOrderTimeline,
//   getAllDeliveryPartners,
//   adminGetRejectionDetails,
//   createDeliveryPartner,
//   updateDeliveryPartner,
//   deleteDeliveryPartner,
// } from "../../api/api";

// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Clock,
//   Bike,
//   Search,
//   Phone,
//   User,
//   MapPin,
//   Plus,
//   Trash2,
//   X,
//   CheckCircle2,
//   AlertTriangle,
//   History,
//   Truck,
//   Filter,
//   MoreVertical,
//   Edit2
// } from "lucide-react";
// import toast from "react-hot-toast";

// /* ==========================================================
//    CONSTANTS
//    ========================================================== */
// const ORDER_STEPS = ["PLACED", "ACCEPTED", "PREPARING", "PICKED_UP", "DELIVERED", "REJECTED"];

// const STATUS_COLORS = {
//   PLACED: "bg-blue-100 text-blue-700",
//   ACCEPTED: "bg-purple-100 text-purple-700",
//   PREPARING: "bg-yellow-100 text-yellow-700",
//   PICKED_UP: "bg-orange-100 text-orange-700",
//   DELIVERED: "bg-green-100 text-green-700",
//   REJECTED: "bg-red-100 text-red-700",
// };

// /* ==========================================================
//    🚀 MAIN COMPONENT
//    ========================================================== */
// export default function AdminOrders() {
//   const [activeTab, setActiveTab] = useState("ORDERS"); // ORDERS | PARTNERS
//   const [loading, setLoading] = useState(false);

//   // --- ORDER STATE ---
//   const [orders, setOrders] = useState([]);
//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("ALL");
  
//   // --- PARTNER STATE ---
//   const [partners, setPartners] = useState([]);
//   const [partnerSearch, setPartnerSearch] = useState("");

//   // --- MODALS ---
//   const [showStatusModal, setShowStatusModal] = useState(false);
//   const [showAssignModal, setShowAssignModal] = useState(false);
//   const [showPartnerModal, setShowPartnerModal] = useState(false);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [editingPartner, setEditingPartner] = useState(null);

//   // --- 1. LOAD DATA ---
//   const loadOrders = async () => {
//      setLoading(true);
//      try {
//         const res = await adminGetAllOrders();
//         setOrders(res.data || []);
//      } catch (e) { toast.error("Failed to load orders"); }
//      finally { setLoading(false); }
//   };

//   const loadPartners = async () => {
//      try {
//         const res = await getAllDeliveryPartners();
//         setPartners(res.data || []);
//      } catch (e) { console.error(e); }
//   };

//   useEffect(() => {
//      loadOrders();
//      loadPartners();
//   }, []);

//   // --- 2. FILTER LOGIC ---
//   const filteredOrders = useMemo(() => {
//      let data = orders;
//      if (statusFilter !== "ALL") data = data.filter(o => o.status === statusFilter);
//      if (search) data = data.filter(o => o.id.toString().includes(search) || o.customerName?.toLowerCase().includes(search.toLowerCase()));
//      return data;
//   }, [orders, statusFilter, search]);

//   const filteredPartners = useMemo(() => {
//      if (!partnerSearch) return partners;
//      return partners.filter(p => p.name.toLowerCase().includes(partnerSearch.toLowerCase()));
//   }, [partners, partnerSearch]);

//   // --- 3. ACTIONS ---
//   const handleUpdateStatus = async (orderId, newStatus) => {
//      try {
//         await adminUpdateOrderStatus(orderId, { status: newStatus });
//         toast.success(`Order #${orderId} marked as ${newStatus}`);
//         loadOrders();
//         setShowStatusModal(false);
//      } catch { toast.error("Update failed"); }
//   };

//   const handleAssignPartner = async (orderId, partnerId) => {
//      try {
//         await adminAssignDeliveryPartner(orderId, partnerId);
//         toast.success("Partner assigned successfully");
//         loadOrders();
//         setShowAssignModal(false);
//      } catch { toast.error("Assignment failed"); }
//   };

//   const handlePartnerSubmit = async (formData) => {
//      try {
//         if (editingPartner) {
//            await updateDeliveryPartner(editingPartner.id, formData);
//            toast.success("Partner updated");
//         } else {
//            await createDeliveryPartner(formData);
//            toast.success("Partner added");
//         }
//         loadPartners();
//         setShowPartnerModal(false);
//      } catch { toast.error("Operation failed"); }
//   };

//   const handleDeletePartner = async (id) => {
//      if(!window.confirm("Delete this partner?")) return;
//      try {
//         await deleteDeliveryPartner(id);
//         toast.success("Partner deleted");
//         loadPartners();
//      } catch { toast.error("Delete failed"); }
//   };

//   return (
//     <div className="space-y-6">
      
//       {/* HEADER & TABS */}
//       <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
//          <div className="flex bg-gray-100 p-1 rounded-xl">
//             {["ORDERS", "PARTNERS"].map(tab => (
//                <button
//                   key={tab}
//                   onClick={() => setActiveTab(tab)}
//                   className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === tab ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
//                >
//                   {tab === "ORDERS" ? "Live Orders" : "Delivery Fleet"}
//                </button>
//             ))}
//          </div>
         
//          {activeTab === "ORDERS" ? (
//              <div className="flex gap-3 w-full md:w-auto">
//                 <div className="relative flex-1 md:w-64">
//                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
//                    <input 
//                       type="text" placeholder="Search Order ID..." 
//                       value={search} onChange={e => setSearch(e.target.value)}
//                       className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border-none rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100"
//                    />
//                 </div>
//                 <select 
//                    value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
//                    className="bg-gray-50 px-4 py-2.5 rounded-xl text-sm font-bold border-none outline-none cursor-pointer hover:bg-gray-100 transition"
//                 >
//                    <option value="ALL">All Status</option>
//                    {ORDER_STEPS.map(s => <option key={s} value={s}>{s}</option>)}
//                 </select>
//              </div>
//          ) : (
//              <button onClick={() => { setEditingPartner(null); setShowPartnerModal(true); }} className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg hover:bg-black transition">
//                 <Plus size={16}/> Add Partner
//              </button>
//          )}
//       </div>

//       {/* CONTENT AREA */}
//       <AnimatePresence mode="wait">
//          {activeTab === "ORDERS" ? (
//             <motion.div 
//                key="orders" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
//                className="grid gap-4"
//             >
//                {filteredOrders.length === 0 ? (
//                   <div className="text-center py-20 text-gray-400 bg-white rounded-3xl border border-gray-100">No orders found</div>
//                ) : (
//                   filteredOrders.map(order => (
//                      <div key={order.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        
//                         {/* Info */}
//                         <div className="flex items-start gap-4">
//                            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Truck size={24}/></div>
//                            <div>
//                               <div className="flex items-center gap-3 mb-1">
//                                  <h3 className="font-bold text-gray-900">Order #{order.id}</h3>
//                                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${STATUS_COLORS[order.status]}`}>{order.status}</span>
//                               </div>
//                               <p className="text-sm text-gray-500 flex items-center gap-2">
//                                  <User size={14}/> {order.customerName} • {order.items?.length || 0} Items • ₹{order.totalAmount}
//                               </p>
//                               <p className="text-xs text-gray-400 mt-1 flex items-center gap-1"><Clock size={12}/> {new Date(order.createdAt).toLocaleString()}</p>
//                            </div>
//                         </div>

//                         {/* Actions */}
//                         <div className="flex items-center gap-3 w-full md:w-auto">
//                            <button 
//                               onClick={() => { setSelectedOrder(order); setShowStatusModal(true); }}
//                               className="flex-1 md:flex-none px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-xs font-bold hover:bg-gray-200 transition"
//                            >
//                               Update Status
//                            </button>
//                            {order.status !== "DELIVERED" && order.status !== "REJECTED" && (
//                               <button 
//                                  onClick={() => { setSelectedOrder(order); setShowAssignModal(true); }}
//                                  className="flex-1 md:flex-none px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold shadow hover:bg-blue-700 transition"
//                               >
//                                  Assign Rider
//                               </button>
//                            )}
//                         </div>
//                      </div>
//                   ))
//                )}
//             </motion.div>
//          ) : (
//             <motion.div 
//                key="partners" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
//                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
//             >
//                {partners.map(partner => (
//                   <div key={partner.id} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
//                      <div className="absolute top-0 right-0 w-24 h-24 bg-gray-50 rounded-bl-[4rem] -mr-4 -mt-4 transition-all group-hover:bg-blue-50"/>
                     
//                      <div className="flex justify-between items-start mb-4 relative z-10">
//                         <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 font-bold text-lg border-2 border-white shadow-sm">
//                            {partner.name[0]}
//                         </div>
//                         <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${partner.available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
//                            <div className={`w-1.5 h-1.5 rounded-full ${partner.available ? "bg-green-600 animate-pulse" : "bg-red-600"}`}/>
//                            {partner.available ? "Available" : "Busy"}
//                         </div>
//                      </div>

//                      <h3 className="font-bold text-lg text-gray-900 mb-1">{partner.name}</h3>
//                      <p className="text-sm text-gray-500 flex items-center gap-2 mb-4"><Phone size={14}/> {partner.phone}</p>

//                      <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 bg-gray-50 p-3 rounded-xl mb-4">
//                         <div><span className="font-bold block text-gray-800">Vehicle</span>{partner.vehicleDetails || "N/A"}</div>
//                         <div><span className="font-bold block text-gray-800">Area</span>{partner.assignedArea || "N/A"}</div>
//                      </div>

//                      <div className="flex gap-2">
//                         <button onClick={() => { setEditingPartner(partner); setShowPartnerModal(true); }} className="flex-1 py-2 rounded-lg bg-gray-100 text-gray-600 font-bold text-xs hover:bg-blue-50 hover:text-blue-600 transition flex items-center justify-center gap-1">
//                            <Edit2 size={14}/> Edit
//                         </button>
//                         <button onClick={() => handleDeletePartner(partner.id)} className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition">
//                            <Trash2 size={16}/>
//                         </button>
//                      </div>
//                   </div>
//                ))}
//             </motion.div>
//          )}
//       </AnimatePresence>

//       {/* --- MODALS --- */}
//       {showStatusModal && selectedOrder && (
//          <StatusModal 
//             show={showStatusModal} onClose={() => setShowStatusModal(false)}
//             currentStatus={selectedOrder.status}
//             onUpdate={(status) => handleUpdateStatus(selectedOrder.id, status)}
//          />
//       )}
      
//       {showAssignModal && selectedOrder && (
//          <AssignModal 
//             show={showAssignModal} onClose={() => setShowAssignModal(false)}
//             partners={partners}
//             onAssign={(partnerId) => handleAssignPartner(selectedOrder.id, partnerId)}
//          />
//       )}

//       {showPartnerModal && (
//          <PartnerModal 
//             show={showPartnerModal} onClose={() => setShowPartnerModal(false)}
//             initialData={editingPartner} onSubmit={handlePartnerSubmit}
//          />
//       )}

//     </div>
//   );
// }

// /* --- SUB COMPONENTS (MODALS) --- */

// function StatusModal({ show, onClose, currentStatus, onUpdate }) {
//    return (
//       <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
//          <div className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-2xl">
//             <div className="flex justify-between items-center mb-4">
//                <h3 className="font-bold text-lg">Update Status</h3>
//                <button onClick={onClose}><X size={20}/></button>
//             </div>
//             <div className="grid grid-cols-2 gap-2">
//                {ORDER_STEPS.map(s => (
//                   <button 
//                      key={s} 
//                      onClick={() => onUpdate(s)}
//                      className={`py-2 rounded-lg text-xs font-bold border transition-all ${s === currentStatus ? "bg-gray-900 text-white border-gray-900" : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"}`}
//                   >
//                      {s}
//                   </button>
//                ))}
//             </div>
//          </div>
//       </div>
//    );
// }

// function AssignModal({ show, onClose, partners, onAssign }) {
//    return (
//       <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
//          <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl h-[500px] flex flex-col">
//             <div className="flex justify-between items-center mb-4">
//                <h3 className="font-bold text-lg">Assign Rider</h3>
//                <button onClick={onClose}><X size={20}/></button>
//             </div>
//             <div className="flex-1 overflow-y-auto space-y-2 pr-1">
//                {partners.map(p => (
//                   <div key={p.id} className="flex justify-between items-center p-3 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition cursor-pointer group">
//                      <div>
//                         <p className="font-bold text-sm text-gray-900">{p.name}</p>
//                         <p className="text-xs text-gray-500">{p.phone} • {p.assignedArea}</p>
//                      </div>
//                      <button onClick={() => onAssign(p.id)} className="bg-white border border-gray-200 text-gray-600 px-3 py-1 rounded-lg text-xs font-bold group-hover:bg-blue-600 group-hover:text-white transition">Select</button>
//                   </div>
//                ))}
//             </div>
//          </div>
//       </div>
//    );
// }

// function PartnerModal({ show, onClose, initialData, onSubmit }) {
//    const [form, setForm] = useState(initialData || { name: "", phone: "", email: "", assignedArea: "", vehicleDetails: "", available: true });
   
//    return (
//       <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
//          <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-2xl">
//             <div className="flex justify-between items-center mb-6">
//                <h3 className="font-bold text-lg">{initialData ? "Edit Partner" : "Add Partner"}</h3>
//                <button onClick={onClose}><X size={20}/></button>
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//                <div className="col-span-2 md:col-span-1">
//                   <label className="text-xs font-bold text-gray-400 uppercase">Name</label>
//                   <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full border-b-2 border-gray-200 py-2 focus:border-blue-500 outline-none"/>
//                </div>
//                <div className="col-span-2 md:col-span-1">
//                   <label className="text-xs font-bold text-gray-400 uppercase">Phone</label>
//                   <input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full border-b-2 border-gray-200 py-2 focus:border-blue-500 outline-none"/>
//                </div>
//                <div className="col-span-2">
//                   <label className="text-xs font-bold text-gray-400 uppercase">Vehicle Details</label>
//                   <input value={form.vehicleDetails} onChange={e => setForm({...form, vehicleDetails: e.target.value})} className="w-full border-b-2 border-gray-200 py-2 focus:border-blue-500 outline-none" placeholder="e.g. Splendor (MH-12-AB-1234)"/>
//                </div>
//                <div className="col-span-2">
//                   <label className="text-xs font-bold text-gray-400 uppercase">Area</label>
//                   <input value={form.assignedArea} onChange={e => setForm({...form, assignedArea: e.target.value})} className="w-full border-b-2 border-gray-200 py-2 focus:border-blue-500 outline-none"/>
//                </div>
//             </div>
//             <button onClick={() => onSubmit(form)} className="w-full mt-6 bg-gray-900 text-white py-3 rounded-xl font-bold hover:bg-black transition">Save Partner</button>
//          </div>
//       </div>
//    );
// }







import React, { useEffect, useMemo, useState } from "react";
import {
  adminGetAllOrders,
  adminUpdateOrderStatus,
  adminAssignDeliveryPartner,
  adminGetOrderTimeline,
  getAllDeliveryPartners,
  adminGetRejectionDetails,
  createDeliveryPartner,
  updateDeliveryPartner,
  deleteDeliveryPartner,
} from "../../api/api";

import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Bike,
  Search,
  Phone,
  User,
  MapPin,
  Plus,
  Trash2,
  X,
  CheckCircle2,
  AlertTriangle,
  History,
  Truck,
  Filter,
  MoreVertical,
  Edit2,
  ToggleLeft,
  ToggleRight
} from "lucide-react";
import toast from "react-hot-toast";

/* ==========================================================
   CONSTANTS
   ========================================================== */
const ORDER_STEPS = ["PLACED", "ACCEPTED", "PREPARING", "PICKED_UP", "DELIVERED", "REJECTED"];

const STATUS_COLORS = {
  PLACED: "bg-blue-100 text-blue-700",
  ACCEPTED: "bg-purple-100 text-purple-700",
  PREPARING: "bg-yellow-100 text-yellow-700",
  PICKED_UP: "bg-orange-100 text-orange-700",
  DELIVERED: "bg-green-100 text-green-700",
  REJECTED: "bg-red-100 text-red-700",
};

/* ==========================================================
   🚀 MAIN COMPONENT
   ========================================================== */
export default function AdminOrders() {
  const [activeTab, setActiveTab] = useState("ORDERS"); // ORDERS | PARTNERS
  const [loading, setLoading] = useState(false);

  // --- ORDER STATE ---
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  
  // --- PARTNER STATE ---
  const [partners, setPartners] = useState([]);
  const [partnerSearch, setPartnerSearch] = useState("");

  // --- MODALS ---
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showPartnerModal, setShowPartnerModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [editingPartner, setEditingPartner] = useState(null);

  // --- 1. LOAD DATA ---
  const loadOrders = async () => {
     setLoading(true);
     try {
        const res = await adminGetAllOrders();
        setOrders(res.data || []);
     } catch (e) { toast.error("Failed to load orders"); }
     finally { setLoading(false); }
  };

  const loadPartners = async () => {
     try {
        const res = await getAllDeliveryPartners();
        setPartners(res.data || []);
     } catch (e) { console.error(e); }
  };

  useEffect(() => {
     loadOrders();
     loadPartners();
  }, []);

  // --- 2. FILTER LOGIC ---
  const filteredOrders = useMemo(() => {
     let data = orders;
     if (statusFilter !== "ALL") data = data.filter(o => o.status === statusFilter);
     if (search) data = data.filter(o => o.id.toString().includes(search) || o.customerName?.toLowerCase().includes(search.toLowerCase()));
     return data;
  }, [orders, statusFilter, search]);

  const filteredPartners = useMemo(() => {
     if (!partnerSearch) return partners;
     return partners.filter(p => p.name.toLowerCase().includes(partnerSearch.toLowerCase()));
  }, [partners, partnerSearch]);

  // --- 3. ACTIONS ---
  const handleUpdateStatus = async (orderId, newStatus) => {
     try {
        await adminUpdateOrderStatus(orderId, { status: newStatus });
        toast.success(`Order #${orderId} marked as ${newStatus}`);
        loadOrders();
        setShowStatusModal(false);
     } catch { toast.error("Update failed"); }
  };

  const handleAssignPartner = async (orderId, partnerId) => {
     try {
        await adminAssignDeliveryPartner(orderId, partnerId);
        toast.success("Partner assigned successfully");
        loadOrders();
        setShowAssignModal(false);
     } catch { toast.error("Assignment failed"); }
  };

  const handlePartnerSubmit = async (formData) => {
     // Validations
     if (!/^\d{10}$/.test(formData.phone)) return toast.error("Phone must be 10 digits");
     if (!/^\d{12}$/.test(formData.adharCard)) return toast.error("Aadhar must be 12 digits");
     if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panCard)) return toast.error("Invalid PAN format");

     try {
        if (editingPartner) {
           await updateDeliveryPartner(editingPartner.id, formData);
           toast.success("Partner updated");
        } else {
           await createDeliveryPartner(formData);
           toast.success("Partner added");
        }
        loadPartners();
        setShowPartnerModal(false);
     } catch { toast.error("Operation failed"); }
  };

  const toggleAvailability = async (partner) => {
     try {
        await updateDeliveryPartner(partner.id, { ...partner, available: !partner.available });
        toast.success(`Partner is now ${!partner.available ? "Available" : "Busy"}`);
        loadPartners();
     } catch { toast.error("Update failed"); }
  };

  const handleDeletePartner = async (id) => {
     if(!window.confirm("Delete this partner?")) return;
     try {
        await deleteDeliveryPartner(id);
        toast.success("Partner deleted");
        loadPartners();
     } catch { toast.error("Delete failed"); }
  };

  return (
    <div className="space-y-6 pb-20">
      
      {/* HEADER & TABS */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-[2rem] shadow-sm border border-gray-100">
         <div className="flex bg-gray-100 p-1.5 rounded-2xl">
            {["ORDERS", "PARTNERS"].map(tab => (
               <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === tab ? "bg-white text-gray-900 shadow-md" : "text-gray-500 hover:text-gray-700"}`}
               >
                  {tab === "ORDERS" ? "Live Orders" : "Delivery Fleet"}
               </button>
            ))}
         </div>
         
         {activeTab === "ORDERS" ? (
             <div className="flex flex-wrap gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                   <input 
                      type="text" placeholder="Search Order ID, Name..." 
                      value={search} onChange={e => setSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-none rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                   />
                </div>
                <div className="relative">
                   <select 
                      value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
                      className="appearance-none bg-gray-50 px-4 py-2.5 pr-10 rounded-xl text-sm font-bold border-none outline-none cursor-pointer hover:bg-gray-100 transition"
                   >
                      <option value="ALL">All Status</option>
                      {ORDER_STEPS.map(s => <option key={s} value={s}>{s}</option>)}
                   </select>
                   <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none"/>
                </div>
             </div>
         ) : (
             <div className="flex gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                   <input 
                      type="text" placeholder="Search Riders..." 
                      value={partnerSearch} onChange={e => setPartnerSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-none rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                   />
                </div>
                <button onClick={() => { setEditingPartner(null); setShowPartnerModal(true); }} className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg hover:bg-black transition">
                   <Plus size={18}/> Add Partner
                </button>
             </div>
         )}
      </div>

      {/* CONTENT AREA */}
      <AnimatePresence mode="wait">
         {activeTab === "ORDERS" ? (
            <motion.div 
               key="orders" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
               className="grid gap-4"
            >
               {filteredOrders.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[3rem] border border-gray-100 text-gray-400">
                     <Clock size={48} className="mb-4 opacity-20"/>
                     <p>No orders found at the moment.</p>
                  </div>
               ) : (
                  filteredOrders.map(order => (
                     <div key={order.id} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 group">
                        
                        {/* Order Info */}
                        <div className="flex items-start gap-5">
                           <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl shadow-inner"><Truck size={28}/></div>
                           <div>
                              <div className="flex items-center gap-3 mb-1">
                                 <h3 className="font-bold text-gray-900 text-lg">Order #{order.id}</h3>
                                 <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${STATUS_COLORS[order.status]}`}>{order.status}</span>
                              </div>
                              <p className="text-sm text-gray-500 font-medium flex items-center gap-2">
                                 <User size={14}/> {order.customerName} • {order.items?.length || 0} Items • <span className="text-gray-900 font-bold">₹{order.totalAmount}</span>
                              </p>
                              <p className="text-xs text-gray-400 mt-1 flex items-center gap-1"><Clock size={12}/> {new Date(order.createdAt).toLocaleString()}</p>
                           </div>
                        </div>

                        {/* Progress Bar (Visual) */}
                        <div className="hidden xl:flex flex-col w-64 gap-1">
                           <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase">
                              <span>Placed</span>
                              <span>Delivered</span>
                           </div>
                           <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                              <div 
                                 className="h-full bg-green-500 transition-all duration-500" 
                                 style={{ width: `${(ORDER_STEPS.indexOf(order.status) / (ORDER_STEPS.length - 1)) * 100}%` }}
                              />
                           </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3 w-full lg:w-auto mt-2 lg:mt-0">
                           <button 
                              onClick={() => { setSelectedOrder(order); setShowStatusModal(true); }}
                              className="flex-1 lg:flex-none px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-xs font-bold hover:bg-gray-200 transition"
                           >
                              Update Status
                           </button>
                           {order.status !== "DELIVERED" && order.status !== "REJECTED" && (
                              <button 
                                 onClick={() => { setSelectedOrder(order); setShowAssignModal(true); }}
                                 className="flex-1 lg:flex-none px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold shadow hover:bg-blue-700 transition"
                              >
                                 Assign Rider
                              </button>
                           )}
                        </div>
                     </div>
                  ))
               )}
            </motion.div>
         ) : (
            <motion.div 
               key="partners" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
               className="grid md:grid-cols-2 xl:grid-cols-3 gap-6"
            >
               {filteredPartners.map(partner => (
                  <div key={partner.id} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
                     
                     <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-4">
                           <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-600 font-bold text-xl border-2 border-white shadow-sm">
                              {partner.name[0]}
                           </div>
                           <div>
                              <h3 className="font-bold text-lg text-gray-900">{partner.name}</h3>
                              <p className="text-xs text-gray-500 font-mono">ID: {partner.id}</p>
                           </div>
                        </div>
                        <button onClick={() => toggleAvailability(partner)} className="text-2xl transition-transform hover:scale-110">
                           {partner.available ? <ToggleRight className="text-green-500 w-10 h-10"/> : <ToggleLeft className="text-gray-300 w-10 h-10"/>}
                        </button>
                     </div>

                     <div className="grid grid-cols-2 gap-3 text-xs text-gray-500 bg-gray-50 p-4 rounded-2xl mb-6 border border-gray-100">
                        <div>
                           <span className="font-bold block text-gray-800 mb-1">Phone</span>
                           {partner.phone}
                        </div>
                        <div>
                           <span className="font-bold block text-gray-800 mb-1">Vehicle</span>
                           {partner.vehicleDetails || "N/A"}
                        </div>
                        <div className="col-span-2 pt-2 border-t border-gray-200 flex justify-between">
                           <span>Area: <span className="font-semibold text-gray-800">{partner.assignedArea || "Any"}</span></span>
                           <span className={partner.available ? "text-green-600 font-bold" : "text-red-500 font-bold"}>{partner.available ? "Ready" : "Busy"}</span>
                        </div>
                     </div>

                     <div className="flex gap-2">
                        <button onClick={() => { setEditingPartner(partner); setShowPartnerModal(true); }} className="flex-1 py-2.5 rounded-xl bg-blue-50 text-blue-600 font-bold text-xs hover:bg-blue-100 transition flex items-center justify-center gap-2">
                           <Edit2 size={16}/> Edit Details
                        </button>
                        <button onClick={() => handleDeletePartner(partner.id)} className="p-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition">
                           <Trash2 size={18}/>
                        </button>
                     </div>
                  </div>
               ))}
            </motion.div>
         )}
      </AnimatePresence>

      {/* --- MODALS --- */}
      {showStatusModal && selectedOrder && (
         <StatusModal 
            show={showStatusModal} onClose={() => setShowStatusModal(false)}
            currentStatus={selectedOrder.status}
            onUpdate={(status) => handleUpdateStatus(selectedOrder.id, status)}
         />
      )}
      
      {showAssignModal && selectedOrder && (
         <AssignModal 
            show={showAssignModal} onClose={() => setShowAssignModal(false)}
            partners={partners}
            onAssign={(partnerId) => handleAssignPartner(selectedOrder.id, partnerId)}
         />
      )}

      {showPartnerModal && (
         <PartnerModal 
            show={showPartnerModal} onClose={() => setShowPartnerModal(false)}
            initialData={editingPartner} onSubmit={handlePartnerSubmit}
         />
      )}

    </div>
  );
}

/* --- SUB COMPONENTS (MODALS) --- */

function StatusModal({ show, onClose, currentStatus, onUpdate }) {
   return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
         <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white w-full max-w-sm rounded-[2rem] p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
               <h3 className="font-bold text-lg">Update Status</h3>
               <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100"><X size={20}/></button>
            </div>
            <div className="grid grid-cols-2 gap-3">
               {ORDER_STEPS.map(s => (
                  <button 
                     key={s} 
                     onClick={() => onUpdate(s)}
                     className={`py-3 rounded-xl text-xs font-bold border transition-all ${s === currentStatus ? "bg-gray-900 text-white border-gray-900 shadow-lg" : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"}`}
                  >
                     {s}
                  </button>
               ))}
            </div>
         </motion.div>
      </div>
   );
}

function AssignModal({ show, onClose, partners, onAssign }) {
   const [search, setSearch] = useState("");
   const filtered = partners.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) && p.available);

   return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
         <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white w-full max-w-md rounded-[2rem] p-6 shadow-2xl h-[500px] flex flex-col">
            <div className="flex justify-between items-center mb-4">
               <h3 className="font-bold text-lg">Assign Rider</h3>
               <button onClick={onClose}><X size={20}/></button>
            </div>
            <input 
               placeholder="Search available riders..." 
               value={search} onChange={e => setSearch(e.target.value)}
               className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm mb-4 outline-none focus:ring-2 focus:ring-blue-100"
            />
            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
               {filtered.length === 0 ? <p className="text-center text-gray-400 text-sm mt-10">No available riders found.</p> : filtered.map(p => (
                  <div key={p.id} className="flex justify-between items-center p-3 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition cursor-pointer group">
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-700 font-bold border">{p.name[0]}</div>
                        <div>
                           <p className="font-bold text-sm text-gray-900">{p.name}</p>
                           <p className="text-xs text-gray-500">{p.assignedArea}</p>
                        </div>
                     </div>
                     <button onClick={() => onAssign(p.id)} className="bg-white border border-gray-200 text-gray-600 px-4 py-1.5 rounded-lg text-xs font-bold group-hover:bg-blue-600 group-hover:text-white transition shadow-sm">Assign</button>
                  </div>
               ))}
            </div>
         </motion.div>
      </div>
   );
}

function PartnerModal({ show, onClose, initialData, onSubmit }) {
   const [form, setForm] = useState(initialData || { name: "", phone: "", email: "", assignedArea: "", vehicleDetails: "", adharCard: "", panCard: "", driverLicence: "", available: true });
   
   return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
         <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white w-full max-w-lg rounded-[2rem] p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
               <h3 className="font-bold text-xl">{initialData ? "Edit Partner" : "New Partner"}</h3>
               <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100"><X size={20}/></button>
            </div>
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
               <div className="grid grid-cols-2 gap-4">
                  <InputField label="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                  <InputField label="Phone (10 digits)" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
               </div>
               <InputField label="Email" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
               <InputField label="Vehicle Details" value={form.vehicleDetails} onChange={e => setForm({...form, vehicleDetails: e.target.value})} placeholder="Bike Model - Number" />
               <div className="grid grid-cols-2 gap-4">
                  <InputField label="Area" value={form.assignedArea} onChange={e => setForm({...form, assignedArea: e.target.value})} />
                  <InputField label="License No." value={form.driverLicence} onChange={e => setForm({...form, driverLicence: e.target.value})} />
               </div>
               <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-3">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Identity Proof</h4>
                  <InputField label="Aadhar (12 Digits)" value={form.adharCard} onChange={e => setForm({...form, adharCard: e.target.value})} />
                  <InputField label="PAN (10 Chars)" value={form.panCard} onChange={e => setForm({...form, panCard: e.target.value.toUpperCase()})} />
               </div>
            </div>
            <button onClick={() => onSubmit(form)} className="w-full mt-6 bg-gray-900 text-white py-3.5 rounded-xl font-bold hover:bg-black transition shadow-lg">Save Partner Details</button>
         </motion.div>
      </div>
   );
}

const InputField = ({ label, value, onChange, placeholder, type = "text" }) => (
   <div>
      <label className="text-xs font-bold text-gray-500 uppercase ml-1 mb-1 block">{label}</label>
      <input type={type} value={value} onChange={onChange} placeholder={placeholder} className="w-full border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"/>
   </div>
);