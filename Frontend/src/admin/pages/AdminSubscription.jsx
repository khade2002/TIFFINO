
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