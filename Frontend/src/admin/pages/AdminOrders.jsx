
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