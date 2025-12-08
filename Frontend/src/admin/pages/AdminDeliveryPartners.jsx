// // // src/pages/Admin/AdminDeliveryPartners.jsx
// // import React, { useEffect, useMemo, useState } from "react";
// // import { motion, AnimatePresence } from "framer-motion";
// // import {
// //   getAllDeliveryPartners,
// //   createDeliveryPartner,
// //   updateDeliveryPartner,
// //   deleteDeliveryPartnerApi,
// // } from "../../api/api";

// // import {
// //   FaPlus,
// //   FaMotorcycle,
// //   FaSearch,
// //   FaPhoneAlt,
// //   FaMapMarkerAlt,
// // } from "react-icons/fa";

// // import {
// //   MdClose,
// //   MdEmail,
// //   MdPerson,
// //   MdVerified,
// //   MdEdit,
// //   MdDelete,
// // } from "react-icons/md";

// // import toast from "react-hot-toast";

// // /* ==========================================================
// //       VALIDATION LOGIC
// // ========================================================== */
// // const validatePartner = (values) => {
// //   const errors = {};

// //   if (!values.name.trim()) errors.name = "Name is required";

// //   if (!values.phone.trim()) {
// //     errors.phone = "Phone number is required";
// //   } else if (!/^[6-9]\d{9}$/.test(values.phone.trim())) {
// //     errors.phone = "Enter valid 10-digit Indian mobile number";
// //   }

// //   if (values.email && values.email.trim()) {
// //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// //     if (!emailRegex.test(values.email.trim()))
// //       errors.email = "Enter valid email address";
// //   }

// //   if (!values.assignedArea.trim())
// //     errors.assignedArea = "Assigned area is required";

// //   if (values.adharCard && !/^\d{12}$/.test(values.adharCard.trim()))
// //     errors.adharCard = "Aadhaar must be 12 digits";

// //   if (
// //     values.panCard &&
// //     !/^[A-Z]{5}\d{4}[A-Z]{1}$/.test(values.panCard.trim())
// //   )
// //     errors.panCard = "Enter valid PAN (ABCDE9999F)";

// //   return errors;
// // };

// // /* Safe extraction */
// // const normalizeList = (raw) => {
// //   if (Array.isArray(raw)) return raw;
// //   if (raw && Array.isArray(raw.data)) return raw.data;
// //   return [];
// // };

// // /* Entry Animation */
// // const fadeUp = {
// //   hidden: { opacity: 0, y: 8 },
// //   visible: { opacity: 1, y: 0 },
// // };

// // export default function AdminDeliveryPartners() {
// //   const [partners, setPartners] = useState([]);
// //   const [loading, setLoading] = useState(false);

// //   const [search, setSearch] = useState("");
// //   const [availabilityFilter, setAvailabilityFilter] = useState("ALL"); // ALL | AVAILABLE | BUSY

// //   const [openModal, setOpenModal] = useState(false);
// //   const [modalMode, setModalMode] = useState("CREATE");
// //   const [editingId, setEditingId] = useState(null);

// //   const [saving, setSaving] = useState(false);

// //   const [form, setForm] = useState({
// //     name: "",
// //     phone: "",
// //     email: "",
// //     adharCard: "",
// //     panCard: "",
// //     assignedArea: "",
// //     driverLicence: "",
// //     vehicleDetails: "",
// //     available: true,
// //   });

// //   const [errors, setErrors] = useState({});

// //   /* ==========================================================
// //         LOAD PARTNERS
// //   ========================================================== */
// //   const loadPartners = async () => {
// //     try {
// //       setLoading(true);
// //       const res = await getAllDeliveryPartners();
// //       const finalList = normalizeList(res?.data);
// //       setPartners(finalList);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     loadPartners();
// //   }, []);

// //   /* ==========================================================
// //         FILTERED LIST
// //   ========================================================== */
// //   const filteredPartners = useMemo(() => {
// //     let list = Array.isArray(partners) ? partners : [];

// //     if (availabilityFilter !== "ALL") {
// //       list = list.filter(
// //         (p) =>
// //           Boolean(p.available) === (availabilityFilter === "AVAILABLE")
// //       );
// //     }

// //     if (search.trim()) {
// //       const term = search.trim().toLowerCase();
// //       list = list.filter(
// //         (p) =>
// //           p.name?.toLowerCase().includes(term) ||
// //           p.phone?.toLowerCase().includes(term) ||
// //           p.assignedArea?.toLowerCase().includes(term)
// //       );
// //     }

// //     return list;
// //   }, [partners, search, availabilityFilter]);

// //   /* ==========================================================
// //         OPEN MODALS
// //   ========================================================== */
// //   const openCreateModal = () => {
// //     resetForm();
// //     setModalMode("CREATE");
// //     setOpenModal(true);
// //   };

// //   const openEditModal = (partner) => {
// //     setForm({
// //       name: partner.name || "",
// //       phone: partner.phone || "",
// //       email: partner.email || "",
// //       adharCard: partner.adharCard || "",
// //       panCard: partner.panCard || "",
// //       assignedArea: partner.assignedArea || "",
// //       driverLicence: partner.driverLicence || "",
// //       vehicleDetails: partner.vehicleDetails || "",
// //       available: Boolean(partner.available),
// //     });
// //     setEditingId(partner.id);
// //     setErrors({});
// //     setModalMode("EDIT");
// //     setOpenModal(true);
// //   };

// //   /* ==========================================================
// //         FORM HANDLING
// //   ========================================================== */
// //   const handleChange = (field, value) => {
// //     setForm((prev) => ({ ...prev, [field]: value }));
// //     setErrors((prev) => ({ ...prev, [field]: "" }));
// //   };

// //   const resetForm = () => {
// //     setForm({
// //       name: "",
// //       phone: "",
// //       email: "",
// //       adharCard: "",
// //       panCard: "",
// //       assignedArea: "",
// //       driverLicence: "",
// //       vehicleDetails: "",
// //       available: true,
// //     });
// //     setErrors({});
// //     setEditingId(null);
// //   };

// //   /* ==========================================================
// //         CREATE / UPDATE SUBMIT
// //   ========================================================== */
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     const validationErrors = validatePartner(form);
// //     if (Object.keys(validationErrors).length) {
// //       setErrors(validationErrors);
// //       toast.error("Fix highlighted errors");
// //       return;
// //     }

// //     const payload = {
// //       ...form,
// //       name: form.name.trim(),
// //       phone: form.phone.trim(),
// //       email: form.email.trim() || null,
// //       assignedArea: form.assignedArea.trim(),
// //       adharCard: form.adharCard.trim() || null,
// //       panCard: form.panCard.trim() || null,
// //       driverLicence: form.driverLicence.trim() || null,
// //       vehicleDetails: form.vehicleDetails.trim() || null,
// //     };

// //     try {
// //       setSaving(true);

// //       if (modalMode === "CREATE") {
// //         await createDeliveryPartner(payload);
// //         toast.success("Delivery partner created successfully");
// //       } else {
// //         await updateDeliveryPartner(editingId, payload);
// //         toast.success("Delivery partner updated successfully");
// //       }

// //       setOpenModal(false);
// //       resetForm();
// //       await loadPartners();
// //     } catch (err) {
// //       toast.error(
// //         err?.response?.data?.message || "Failed to save delivery partner"
// //       );
// //     } finally {
// //       setSaving(false);
// //     }
// //   };

// //   /* ==========================================================
// //         DELETE PARTNER
// //   ========================================================== */
// //   const handleDelete = async (id) => {
// //     if (!window.confirm("Delete this delivery partner?")) return;

// //     try {
// //       await deleteDeliveryPartnerApi(id);
// //       toast.success("Delivery partner deleted");
// //       setPartners((prev) => prev.filter((p) => p.id !== id));
// //     } catch (err) {
// //       toast.error("Failed to delete partner");
// //     }
// //   };

// //   /* ==========================================================
// //         UI
// //   ========================================================== */
// //   return (
// //     <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 p-4 md:p-6 lg:p-8">

// //       {/* BG GRADIENT ACCENTS */}
// //       <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
// //         <div className="absolute -right-20 top-16 h-60 w-60 rounded-full bg-rose-300/25 blur-3xl" />
// //         <div className="absolute -left-20 bottom-12 h-60 w-60 rounded-full bg-indigo-300/25 blur-3xl" />
// //       </div>

// //       {/* HEADER */}
// //       <motion.div
// //         variants={fadeUp}
// //         initial="hidden"
// //         animate="visible"
// //         className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
// //       >
// //         <div>
// //           <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
// //             Delivery Partners
// //           </h1>
// //           <p className="mt-1 text-sm text-slate-600">
// //             Manage riders, documents, availability & assigned areas
// //           </p>
// //         </div>

// //         <button
// //           onClick={openCreateModal}
// //           className="inline-flex items-center gap-2 rounded-full bg-rose-600 px-4 py-2 text-sm font-semibold text-white shadow-lg hover:bg-rose-700 transition"
// //         >
// //           <FaPlus className="text-xs" />
// //           Add Partner
// //         </button>
// //       </motion.div>

// //       {/* FILTERS */}
// //       <motion.div
// //         variants={fadeUp}
// //         initial="hidden"
// //         animate="visible"
// //         transition={{ delay: 0.05 }}
// //         className="mb-5 flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white/90 p-3.5 shadow-sm md:flex-row md:items-center md:justify-between"
// //       >
// //         {/* Search */}
// //         <div className="relative flex-1">
// //           <FaSearch className="pointer-events-none absolute left-3 top-2.5 text-xs text-slate-400" />
// //           <input
// //             type="text"
// //             placeholder="Search by name, phone or area..."
// //             value={search}
// //             onChange={(e) => setSearch(e.target.value)}
// //             className="w-full rounded-xl border border-slate-200 bg-white px-8 py-2 text-sm outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
// //           />
// //         </div>

// //         <div className="flex items-center gap-2">
// //           <select
// //             value={availabilityFilter}
// //             onChange={(e) => setAvailabilityFilter(e.target.value)}
// //             className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs sm:text-sm outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
// //           >
// //             <option value="ALL">All</option>
// //             <option value="AVAILABLE">Available</option>
// //             <option value="BUSY">Busy</option>
// //           </select>

// //           <button
// //             onClick={() => {
// //               setSearch("");
// //               setAvailabilityFilter("ALL");
// //             }}
// //             className="rounded-full border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 transition"
// //           >
// //             Reset
// //           </button>
// //         </div>
// //       </motion.div>

// //       {/* LISTING GRID */}
// //       {loading ? (
// //         <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
// //           {Array.from({ length: 6 }).map((_, i) => (
// //             <div key={i} className="h-40 animate-pulse rounded-2xl bg-slate-100" />
// //           ))}
// //         </div>
// //       ) : filteredPartners.length === 0 ? (
// //         <div className="flex min-h-[40vh] items-center justify-center text-slate-500 flex-col">
// //           <FaMotorcycle className="text-slate-300 text-4xl mb-2" />
// //           <p>No delivery partners found.</p>
// //         </div>
// //       ) : (
// //         <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
// //           {filteredPartners.map((p) => (
// //             <motion.div
// //               key={p.id}
// //               variants={fadeUp}
// //               initial="hidden"
// //               animate="visible"
// //               whileHover={{
// //                 y: -3,
// //                 boxShadow: "0 18px 40px rgba(15,23,42,0.13)",
// //               }}
// //               className="rounded-2xl border border-slate-100 bg-white/95 p-4 shadow-md transition"
// //             >
// //               {/* Header */}
// //               <div className="flex justify-between items-start mb-2">
// //                 <div>
// //                   <p className="flex gap-1 items-center font-semibold text-slate-900">
// //                     <MdPerson className="text-slate-400" />
// //                     {p.name}
// //                   </p>
// //                   <p className="flex gap-1 items-center text-xs text-slate-500 mt-1">
// //                     <FaPhoneAlt className="text-slate-400" /> {p.phone}
// //                   </p>
// //                   {p.email && (
// //                     <p className="flex gap-1 items-center text-xs text-slate-500 mt-1">
// //                       <MdEmail /> {p.email}
// //                     </p>
// //                   )}
// //                 </div>

// //                 <span
// //                   className={`px-3 py-1 rounded-full text-[11px] font-semibold uppercase border ${
// //                     p.available
// //                       ? "bg-emerald-50 text-emerald-700 border-emerald-200"
// //                       : "bg-amber-50 text-amber-700 border-amber-200"
// //                   }`}
// //                 >
// //                   {p.available ? "Available" : "Busy"}
// //                 </span>
// //               </div>

// //               {/* Area */}
// //               <p className="flex items-center gap-1 text-xs text-slate-600 mt-1">
// //                 <FaMapMarkerAlt className="text-slate-400" />
// //                 {p.assignedArea}
// //               </p>

// //               {/* Document Details */}
// //               <div className="grid gap-2 mt-3 text-[11px] text-slate-500">
// //                 {p.adharCard && (
// //                   <div className="flex justify-between">
// //                     <span className="text-slate-400 font-medium">Aadhaar:</span>
// //                     <span>{p.adharCard}</span>
// //                   </div>
// //                 )}
// //                 {p.panCard && (
// //                   <div className="flex justify-between">
// //                     <span className="text-slate-400 font-medium">PAN:</span>
// //                     <span>{p.panCard}</span>
// //                   </div>
// //                 )}
// //                 {p.driverLicence && (
// //                   <div className="flex justify-between">
// //                     <span className="text-slate-400 font-medium">Licence:</span>
// //                     <span className="truncate max-w-[140px] text-right">
// //                       {p.driverLicence}
// //                     </span>
// //                   </div>
// //                 )}
// //               </div>

// //               {p.vehicleDetails && (
// //                 <div className="mt-3 rounded-xl bg-slate-50/80 px-3 py-2 text-xs text-slate-700">
// //                   <p className="flex gap-1 font-semibold text-slate-800 mb-1">
// //                     <FaMotorcycle className="text-slate-500" /> Vehicle Details
// //                   </p>
// //                   <p className="line-clamp-2">{p.vehicleDetails}</p>
// //                 </div>
// //               )}

// //               {/* Actions */}
// //               <div className="flex justify-end gap-2 mt-4">
// //                 <button
// //                   onClick={() => openEditModal(p)}
// //                   className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 flex gap-1 items-center"
// //                 >
// //                   <MdEdit />
// //                   Edit
// //                 </button>
// //                 <button
// //                   onClick={() => handleDelete(p.id)}
// //                   className="rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-100 flex gap-1 items-center"
// //                 >
// //                   <MdDelete />
// //                   Delete
// //                 </button>
// //               </div>
// //             </motion.div>
// //           ))}
// //         </div>
// //       )}

// //       {/* ============================ FORM MODAL ============================ */}
// //       <AnimatePresence>
// //         {openModal && (
// //           <motion.div
// //             className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center items-center"
// //             initial={{ opacity: 0 }}
// //             animate={{ opacity: 1 }}
// //             exit={{ opacity: 0 }}
// //           >
// //             <motion.div
// //               initial={{ scale: 0.9, y: 10, opacity: 0 }}
// //               animate={{ scale: 1, y: 0, opacity: 1 }}
// //               exit={{ scale: 0.9, opacity: 0 }}
// //               className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl"
// //             >
// //               {/* MODAL HEADER */}
// //               <div className="flex justify-between items-center mb-4">
// //                 <div>
// //                   <h2 className="text-lg font-semibold text-slate-900">
// //                     {modalMode === "CREATE"
// //                       ? "Add Delivery Partner"
// //                       : "Edit Delivery Partner"}
// //                   </h2>
// //                   <p className="text-xs text-slate-500">
// //                     Fill the rider’s full details
// //                   </p>
// //                 </div>

// //                 <button
// //                   onClick={() => setOpenModal(false)}
// //                   className="p-1 hover:bg-slate-100 rounded-full text-slate-500"
// //                 >
// //                   <MdClose size={18} />
// //                 </button>
// //               </div>

// //               {/* FORM */}
// //               <form onSubmit={handleSubmit} className="space-y-3 text-sm">

// //                 {/* Name & Phone */}
// //                 <div className="grid sm:grid-cols-2 gap-3">
// //                   <div>
// //                     <label className="text-xs font-medium text-slate-600">
// //                       Name *
// //                     </label>
// //                     <input
// //                       type="text"
// //                       className={`border mt-1 w-full rounded-xl px-3 py-2 outline-none ${
// //                         errors.name
// //                           ? "border-red-300"
// //                           : "border-slate-200"
// //                       } focus:border-rose-400 focus:ring-2 focus:ring-rose-100`}
// //                       value={form.name}
// //                       onChange={(e) => handleChange("name", e.target.value)}
// //                     />
// //                     {errors.name && (
// //                       <p className="text-[11px] text-red-500 mt-1">
// //                         {errors.name}
// //                       </p>
// //                     )}
// //                   </div>

// //                   <div>
// //                     <label className="text-xs font-medium text-slate-600">
// //                       Phone *
// //                     </label>
// //                     <input
// //                       type="tel"
// //                       className={`border mt-1 w-full rounded-xl px-3 py-2 outline-none ${
// //                         errors.phone
// //                           ? "border-red-300"
// //                           : "border-slate-200"
// //                       } focus:border-rose-400 focus:ring-2 focus:ring-rose-100`}
// //                       value={form.phone}
// //                       onChange={(e) => handleChange("phone", e.target.value)}
// //                     />
// //                     {errors.phone && (
// //                       <p className="text-[11px] text-red-500 mt-1">
// //                         {errors.phone}
// //                       </p>
// //                     )}
// //                   </div>
// //                 </div>

// //                 {/* Email + Area */}
// //                 <div className="grid sm:grid-cols-2 gap-3">
// //                   <div>
// //                     <label className="text-xs font-medium text-slate-600">
// //                       Email
// //                     </label>
// //                     <input
// //                       type="email"
// //                       className={`border mt-1 w-full rounded-xl px-3 py-2 outline-none ${
// //                         errors.email
// //                           ? "border-red-300"
// //                           : "border-slate-200"
// //                       } focus:border-rose-400 focus:ring-2 focus:ring-rose-100`}
// //                       value={form.email}
// //                       onChange={(e) => handleChange("email", e.target.value)}
// //                     />
// //                     {errors.email && (
// //                       <p className="text-[11px] text-red-500 mt-1">
// //                         {errors.email}
// //                       </p>
// //                     )}
// //                   </div>

// //                   <div>
// //                     <label className="text-xs font-medium text-slate-600">
// //                       Assigned Area *
// //                     </label>
// //                     <input
// //                       type="text"
// //                       className={`border mt-1 w-full rounded-xl px-3 py-2 outline-none ${
// //                         errors.assignedArea
// //                           ? "border-red-300"
// //                           : "border-slate-200"
// //                       } focus:border-rose-400 focus:ring-2 focus:ring-rose-100`}
// //                       value={form.assignedArea}
// //                       onChange={(e) =>
// //                         handleChange("assignedArea", e.target.value)
// //                       }
// //                     />
// //                     {errors.assignedArea && (
// //                       <p className="text-[11px] text-red-500 mt-1">
// //                         {errors.assignedArea}
// //                       </p>
// //                     )}
// //                   </div>
// //                 </div>

// //                 {/* Documents: Aadhaar + PAN */}
// //                 <div className="grid sm:grid-cols-2 gap-3">
// //                   <div>
// //                     <label className="text-xs font-medium text-slate-600">
// //                       Aadhaar
// //                     </label>
// //                     <input
// //                       type="text"
// //                       className={`border mt-1 w-full rounded-xl px-3 py-2 outline-none ${
// //                         errors.adharCard
// //                           ? "border-red-300"
// //                           : "border-slate-200"
// //                       } focus:border-rose-400 focus:ring-2 focus:ring-rose-100`}
// //                       value={form.adharCard}
// //                       onChange={(e) =>
// //                         handleChange("adharCard", e.target.value)
// //                       }
// //                     />
// //                     {errors.adharCard && (
// //                       <p className="text-[11px] text-red-500 mt-1">
// //                         {errors.adharCard}
// //                       </p>
// //                     )}
// //                   </div>

// //                   <div>
// //                     <label className="text-xs font-medium text-slate-600">
// //                       PAN
// //                     </label>
// //                     <input
// //                       type="text"
// //                       className="border mt-1 w-full rounded-xl px-3 py-2 uppercase outline-none border-slate-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
// //                       value={form.panCard}
// //                       onChange={(e) =>
// //                         handleChange("panCard", e.target.value.toUpperCase())
// //                       }
// //                     />
// //                     {errors.panCard && (
// //                       <p className="text-[11px] text-red-500 mt-1">
// //                         {errors.panCard}
// //                       </p>
// //                     )}
// //                   </div>
// //                 </div>

// //                 {/* DL */}
// //                 <div>
// //                   <label className="text-xs font-medium text-slate-600">
// //                     Driving Licence
// //                   </label>
// //                   <input
// //                     type="text"
// //                     className="border mt-1 w-full rounded-xl px-3 py-2 outline-none border-slate-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
// //                     value={form.driverLicence}
// //                     onChange={(e) =>
// //                       handleChange("driverLicence", e.target.value)
// //                     }
// //                   />
// //                 </div>

// //                 {/* Vehicle */}
// //                 <div>
// //                   <label className="text-xs font-medium text-slate-600">
// //                     Vehicle Details
// //                   </label>
// //                   <textarea
// //                     rows={3}
// //                     className="border mt-1 w-full rounded-xl px-3 py-2 text-sm outline-none border-slate-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
// //                     value={form.vehicleDetails}
// //                     onChange={(e) =>
// //                       handleChange("vehicleDetails", e.target.value)
// //                     }
// //                   />
// //                 </div>

// //                 {/* Availability */}
// //                 <div className="flex items-center justify-between bg-slate-50 px-3 py-2.5 rounded-xl">
// //                   <div className="flex items-center gap-2 text-xs text-slate-600">
// //                     <MdVerified className="text-emerald-500" />
// //                     Mark as available
// //                   </div>

// //                   <button
// //                     type="button"
// //                     onClick={() => handleChange("available", !form.available)}
// //                     className={`h-5 w-10 rounded-full flex items-center px-1 transition ${
// //                       form.available ? "bg-emerald-500" : "bg-slate-300"
// //                     }`}
// //                   >
// //                     <div
// //                       className={`h-4 w-4 bg-white rounded-full shadow transform transition ${
// //                         form.available ? "translate-x-5" : "translate-x-0"
// //                       }`}
// //                     />
// //                   </button>
// //                 </div>

// //                 {/* Modal Actions */}
// //                 <div className="flex justify-end gap-2 pt-2 mt-3">
// //                   <button
// //                     type="button"
// //                     onClick={() => setOpenModal(false)}
// //                     className="rounded-full border border-slate-300 px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50"
// //                   >
// //                     Cancel
// //                   </button>

// //                   <button
// //                     type="submit"
// //                     disabled={saving}
// //                     className="rounded-full bg-rose-600 px-4 py-2 text-xs font-semibold text-white shadow-lg hover:bg-rose-700 disabled:opacity-60 flex items-center gap-2"
// //                   >
// //                     {saving ? (
// //                       <>
// //                         <div className="h-4 w-4 border-2 border-white border-t-transparent animate-spin rounded-full" />
// //                         Saving...
// //                       </>
// //                     ) : (
// //                       <>
// //                         <FaMotorcycle className="text-[12px]" />
// //                         {modalMode === "CREATE" ? "Save" : "Update"}
// //                       </>
// //                     )}
// //                   </button>
// //                 </div>
// //               </form>
// //             </motion.div>
// //           </motion.div>
// //         )}
// //       </AnimatePresence>
// //     </div>
// //   );
// // }





// // src/pages/Admin/AdminDeliveryPartners.jsx
// import React, { useEffect, useMemo, useState } from "react";
// import {
//   getAllDeliveryPartners,
//   createDeliveryPartner,
// } from "../../api/api";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   FaSearch,
//   FaPhoneAlt,
//   FaEnvelope,
//   FaMapMarkerAlt,
//   FaMotorcycle,
//   FaUserAlt,
//   FaEdit,
//   FaPlus,
// } from "react-icons/fa";
// import { MdClose, MdCheckCircle } from "react-icons/md";
// import toast from "react-hot-toast";

// /* Small animation variants */
// const fadeUp = {
//   hidden: { opacity: 0, y: 8 },
//   visible: { opacity: 1, y: 0 },
// };

// const FILTERS = [
//   { key: "ALL", label: "All" },
//   { key: "AVAILABLE", label: "Available" },
//   { key: "BUSY", label: "Busy" },
// ];

// export default function AdminDeliveryPartners() {
//   const [partners, setPartners] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [search, setSearch] = useState("");
//   const [activeFilter, setActiveFilter] = useState("ALL");

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingPartner, setEditingPartner] = useState(null);
//   const [saving, setSaving] = useState(false);

//   const [form, setForm] = useState({
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
//       LOAD PARTNERS
//   ========================================================== */
//  const loadPartners = async () => {
//   try {
//     setLoading(true);
//     const res = await getAllDeliveryPartners();

//     const raw = res?.data;

//     const finalList = Array.isArray(raw)
//       ? raw
//       : Array.isArray(raw?.data)
//       ? raw.data
//       : Array.isArray(raw?.content)
//       ? raw.content
//       : [];

//     setPartners(finalList);
//   } catch (err) {
//     console.error("Partner fetch error:", err);
//     toast.error("Failed to load delivery partners");
//   } finally {
//     setLoading(false);
//   }
// };


//   /* ==========================================================
//       FILTER + SEARCH
//   ========================================================== */
//   const filteredPartners = useMemo(() => {
//     let list = [...partners];

//     if (activeFilter === "AVAILABLE") {
//       list = list.filter((p) => p.available === true);
//     } else if (activeFilter === "BUSY") {
//       list = list.filter((p) => p.available === false);
//     }

//     if (search.trim()) {
//       const term = search.trim().toLowerCase();
//       list = list.filter((p) => {
//         return (
//           (p.name || "").toLowerCase().includes(term) ||
//           (p.phone || "").toLowerCase().includes(term) ||
//           (p.assignedArea || "").toLowerCase().includes(term)
//         );
//       });
//     }

//     return list;
//   }, [partners, search, activeFilter]);

//   /* ==========================================================
//       STATS
//   ========================================================== */
//   const stats = useMemo(() => {
//     const total = partners.length;
//     const available = partners.filter((p) => p.available).length;
//     const busy = total - available;
//     return { total, available, busy };
//   }, [partners]);

//   /* ==========================================================
//       OPEN MODAL (ADD / EDIT)
//   ========================================================== */
//   const openAddModal = () => {
//     setEditingPartner(null);
//     setForm({
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
//     setIsModalOpen(true);
//   };

//   const openEditModal = (partner) => {
//     setEditingPartner(partner);
//     setForm({
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
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setEditingPartner(null);
//   };

//   /* ==========================================================
//       HANDLE FORM CHANGE
//   ========================================================== */
//   const handleChange = (field, value) => {
//     setForm((prev) => ({ ...prev, [field]: value }));
//   };

//   /* ==========================================================
//       SAVE PARTNER (CREATE / UPDATE)
//       Backend: POST /ordr/delivery-partners
//       JPA save() -> if id present => update
//   ========================================================== */
//   const handleSavePartner = async () => {
//     if (!form.name.trim() || !form.phone.trim()) {
//       toast.error("Name and phone are required");
//       return;
//     }

//     const payload = {
//       ...form,
//       id: editingPartner?.id, // for update
//     };

//     try {
//       setSaving(true);
//       await createDeliveryPartner(payload);

//       toast.success(
//         editingPartner ? "Partner updated successfully" : "Partner created successfully"
//       );
//       closeModal();
//       loadPartners();
//     } catch (err) {
//       console.error("Save partner error:", err);
//       toast.error("Failed to save partner");
//     } finally {
//       setSaving(false);
//     }
//   };

//   /* ==========================================================
//       RENDER
//   ========================================================== */
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 p-4 md:p-6 lg:p-8">
//       {/* Background Blobs */}
//       <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
//         <div className="absolute -right-24 top-16 h-64 w-64 rounded-full bg-indigo-200/30 blur-3xl" />
//         <div className="absolute -left-24 bottom-10 h-64 w-64 rounded-full bg-emerald-200/25 blur-3xl" />
//       </div>

//       {/* HEADER + STATS */}
//       <motion.div
//         variants={fadeUp}
//         initial="hidden"
//         animate="visible"
//         className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
//       >
//         <div>
//           <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
//             <FaMotorcycle className="text-indigo-500" />
//             Delivery Partners
//           </h1>
//           <p className="mt-1 text-sm text-slate-600">
//             Manage your delivery fleet — add, edit and track availability.
//           </p>
//         </div>

//         <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:gap-3">
//           <div className="grid grid-cols-3 gap-2">
//             <div className="rounded-2xl bg-white/90 px-3 py-2 shadow-sm border border-slate-100">
//               <p className="text-[11px] uppercase tracking-wide text-slate-500">
//                 Total
//               </p>
//               <p className="text-lg font-semibold text-slate-900">
//                 {stats.total}
//               </p>
//             </div>
//             <div className="rounded-2xl bg-emerald-50 px-3 py-2 shadow-sm border border-emerald-100">
//               <p className="text-[11px] uppercase tracking-wide text-emerald-700">
//                 Available
//               </p>
//               <p className="text-lg font-semibold text-emerald-800">
//                 {stats.available}
//               </p>
//             </div>
//             <div className="rounded-2xl bg-amber-50 px-3 py-2 shadow-sm border border-amber-100">
//               <p className="text-[11px] uppercase tracking-wide text-amber-700">
//                 Busy
//               </p>
//               <p className="text-lg font-semibold text-amber-800">
//                 {stats.busy}
//               </p>
//             </div>
//           </div>

//           <button
//             onClick={openAddModal}
//             className="inline-flex items-center justify-center gap-2 rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-indigo-500/30 hover:bg-indigo-700 transition"
//           >
//             <FaPlus />
//             Add Partner
//           </button>
//         </div>
//       </motion.div>

//       {/* FILTERS + SEARCH */}
//       <motion.div
//         variants={fadeUp}
//         initial="hidden"
//         animate="visible"
//         transition={{ delay: 0.05 }}
//         className="mb-5 flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white/90 p-4 shadow-sm"
//       >
//         <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
//           <div className="relative w-full md:max-w-md">
//             <FaSearch className="pointer-events-none absolute left-3 top-2.5 text-xs text-slate-400" />
//             <input
//               type="text"
//               placeholder="Search by name, phone or area..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="w-full rounded-xl border border-slate-200 bg-white px-8 py-2 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
//             />
//           </div>

//           <div className="flex flex-wrap gap-2">
//             {FILTERS.map((f) => {
//               const active = activeFilter === f.key;
//               return (
//                 <button
//                   key={f.key}
//                   onClick={() => setActiveFilter(f.key)}
//                   className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold border transition
//                     ${
//                       active
//                         ? "bg-slate-900 text-white border-slate-900 shadow-sm"
//                         : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
//                     }`}
//                 >
//                   {f.label}
//                 </button>
//               );
//             })}
//           </div>
//         </div>

//         <button
//           className="w-fit rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 transition"
//           onClick={() => {
//             setSearch("");
//             setActiveFilter("ALL");
//           }}
//         >
//           Clear Filters
//         </button>
//       </motion.div>

//       {/* PARTNERS GRID */}
//       <div className="mt-4">
//         {loading ? (
//           <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
//             {Array.from({ length: 6 }).map((_, i) => (
//               <div
//                 key={i}
//                 className="h-40 animate-pulse rounded-2xl bg-slate-100/80 border border-slate-100"
//               />
//             ))}
//           </div>
//         ) : filteredPartners.length === 0 ? (
//           <div className="flex min-h-[40vh] flex-col items-center justify-center text-center text-slate-500">
//             <FaMotorcycle className="mb-3 h-10 w-10 text-slate-300" />
//             <p className="text-sm md:text-base">
//               No delivery partners found. Try changing filters or add a new one.
//             </p>
//           </div>
//         ) : (
//           <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
//             {filteredPartners.map((p, idx) => (
//               <motion.div
//                 key={p.id}
//                 initial={{ opacity: 0, y: 8 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: idx * 0.02 }}
//                 whileHover={{
//                   y: -3,
//                   boxShadow: "0 18px 40px rgba(15,23,42,0.14)",
//                 }}
//                 className="flex h-full flex-col rounded-2xl border border-slate-100 bg-white/95 p-4 shadow-md transition-all duration-200"
//               >
//                 {/* Header row */}
//                 <div className="mb-2 flex items-start justify-between gap-2">
//                   <div>
//                     <p className="flex items-center gap-1 text-sm font-semibold text-slate-900">
//                       <FaUserAlt className="text-slate-400" />
//                       {p.name || "Unnamed Partner"}
//                     </p>
//                     <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
//                       <FaPhoneAlt className="text-slate-400" />
//                       {p.phone || "N/A"}
//                     </p>
//                     {p.email && (
//                       <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
//                         <FaEnvelope className="text-slate-400" />
//                         {p.email}
//                       </p>
//                     )}
//                   </div>

//                   <div className="flex flex-col items-end gap-1">
//                     <span
//                       className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${
//                         p.available
//                           ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
//                           : "bg-amber-50 text-amber-700 border border-amber-100"
//                       }`}
//                     >
//                       <span className="h-1.5 w-1.5 rounded-full bg-current" />
//                       {p.available ? "Available" : "Busy"}
//                     </span>

//                     <button
//                       onClick={() => openEditModal(p)}
//                       className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-2.5 py-1 text-[11px] font-medium text-slate-600 hover:bg-slate-50 transition"
//                     >
//                       <FaEdit className="text-slate-500" />
//                       Edit
//                     </button>
//                   </div>
//                 </div>

//                 {/* Area + Vehicle */}
//                 <div className="mt-2 space-y-1.5 text-xs text-slate-600">
//                   {p.assignedArea && (
//                     <p className="flex items-start gap-1.5">
//                       <FaMapMarkerAlt className="mt-[2px] text-slate-400" />
//                       <span className="line-clamp-2">
//                         {p.assignedArea}
//                       </span>
//                     </p>
//                   )}

//                   {p.vehicleDetails && (
//                     <p className="flex items-start gap-1.5">
//                       <FaMotorcycle className="mt-[2px] text-slate-400" />
//                       <span className="line-clamp-2">
//                         {p.vehicleDetails}
//                       </span>
//                     </p>
//                   )}
//                 </div>

//                 {/* IDs section */}
//                 {(p.adharCard || p.panCard || p.driverLicence) && (
//                   <div className="mt-3 rounded-xl bg-slate-50/80 px-3 py-2 text-[11px] text-slate-600 space-y-0.5">
//                     {p.adharCard && (
//                       <p>
//                         <span className="font-semibold">Aadhar:</span>{" "}
//                         {p.adharCard}
//                       </p>
//                     )}
//                     {p.panCard && (
//                       <p>
//                         <span className="font-semibold">PAN:</span>{" "}
//                         {p.panCard}
//                       </p>
//                     )}
//                     {p.driverLicence && (
//                       <p>
//                         <span className="font-semibold">License:</span>{" "}
//                         {p.driverLicence}
//                       </p>
//                     )}
//                   </div>
//                 )}
//               </motion.div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* ==========================================================
//           ADD / EDIT PARTNER MODAL
//       ========================================================== */}
//       <AnimatePresence>
//         {isModalOpen && (
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
//                   onClick={closeModal}
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
//                     className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
//                     value={form.name}
//                     onChange={(e) => handleChange("name", e.target.value)}
//                   />
//                 </div>

//                 {/* Phone */}
//                 <div>
//                   <label className="text-xs font-medium text-slate-600">
//                     Phone Number <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
//                     value={form.phone}
//                     onChange={(e) => handleChange("phone", e.target.value)}
//                   />
//                 </div>

//                 {/* Email */}
//                 <div>
//                   <label className="text-xs font-medium text-slate-600">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
//                     value={form.email}
//                     onChange={(e) => handleChange("email", e.target.value)}
//                   />
//                 </div>

//                 {/* Assigned Area */}
//                 <div>
//                   <label className="text-xs font-medium text-slate-600">
//                     Assigned Area
//                   </label>
//                   <input
//                     type="text"
//                     className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
//                     value={form.assignedArea}
//                     onChange={(e) => handleChange("assignedArea", e.target.value)}
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
//                     value={form.vehicleDetails}
//                     onChange={(e) =>
//                       handleChange("vehicleDetails", e.target.value)
//                     }
//                   />
//                 </div>

//                 {/* Aadhar */}
//                 <div>
//                   <label className="text-xs font-medium text-slate-600">
//                     Aadhar Number
//                   </label>
//                   <input
//                     type="text"
//                     className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
//                     value={form.adharCard}
//                     onChange={(e) => handleChange("adharCard", e.target.value)}
//                   />
//                 </div>

//                 {/* PAN */}
//                 <div>
//                   <label className="text-xs font-medium text-slate-600">
//                     PAN Number
//                   </label>
//                   <input
//                     type="text"
//                     className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
//                     value={form.panCard}
//                     onChange={(e) => handleChange("panCard", e.target.value)}
//                   />
//                 </div>

//                 {/* License */}
//                 <div>
//                   <label className="text-xs font-medium text-slate-600">
//                     Driving License
//                   </label>
//                   <input
//                     type="text"
//                     className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
//                     value={form.driverLicence}
//                     onChange={(e) =>
//                       handleChange("driverLicence", e.target.value)
//                     }
//                   />
//                 </div>

//                 {/* Availability toggle */}
//                 <div className="flex items-end">
//                   <label className="flex items-center gap-2 text-xs font-medium text-slate-600">
//                     <input
//                       type="checkbox"
//                       className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
//                       checked={form.available}
//                       onChange={(e) =>
//                         handleChange("available", e.target.checked)
//                       }
//                     />
//                     Mark as Available
//                   </label>
//                 </div>
//               </div>

//               <button
//                 onClick={handleSavePartner}
//                 disabled={saving}
//                 className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60 transition"
//               >
//                 {saving ? (
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
//     </div>
//   );
// }
