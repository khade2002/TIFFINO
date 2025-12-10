// src/admin/pages/AdminDashboard.jsx
// PREMIUM UPDATED — Swiggy/Zomato Style + Real Admin APIs

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Lock,
  ArrowRight,
  ShoppingBag,
  UserCheck,
  Truck,
  ChevronRight,
  Activity,
  CalendarClock,
  Star,
} from "lucide-react";

import {
  adminCountSubscriptions,
  adminExpiringSoonSubscriptions,
  adminGetAllSubscriptions,
  adminGetAllOrders,
  adminGetOrdersCount,
  getAllDeliveryPartners,
  getAllAdminReviews,
} from "../../api/api";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";

// ----------------------------------------------------
// ANIMATION PRESETS
// ----------------------------------------------------
const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

// Small helper for date display
const formatDate = (value) => {
  if (!value) return "-";
  if (typeof value === "string" && value.includes("T")) {
    return value.split("T")[0];
  }
  return value;
};

// ----------------------------------------------------
export default function AdminDashboard() {
  const { admin } = useAdminAuth();
  const nav = useNavigate();

  // ------------------------------
  // 🔥 Real API state
  // ------------------------------
  const [subStats, setSubStats] = useState({
    activeCount: 0,
    expiredCount: 0,
    pausedCount: 0,
    totalCount: 0,
  });

  const [orderCount, setOrderCount] = useState(0);
  const [deliveryPartnerCount, setDeliveryPartnerCount] = useState(0);
  const [reviewStats, setReviewStats] = useState({
    avgRating: 0,
    totalReviews: 0,
  });

  const [expiringSoon, setExpiringSoon] = useState([]);
  const [recentSubscriptions, setRecentSubscriptions] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  // ----------------------------------------------------
  // FETCH DASHBOARD DATA
  // ----------------------------------------------------
  async function loadDashboard() {
    try {
      setLoading(true);

      const [
        statsRes,
        expRes,
        subsRes,
        ordersCountRes,
        ordersRes,
        partnersRes,
        reviewsRes,
      ] = await Promise.all([
        adminCountSubscriptions(),
        adminExpiringSoonSubscriptions(7),
        adminGetAllSubscriptions(),
        adminGetOrdersCount(),
        adminGetAllOrders(),
        getAllDeliveryPartners(),
        getAllAdminReviews(),
      ]);

      // Subscriptions stats
      setSubStats(statsRes?.data || {});

      // Expiring soon
      setExpiringSoon(expRes?.data || []);

      // Recent 5 subscriptions
      const subsList = subsRes?.data || [];
      setRecentSubscriptions(subsList.slice(0, 5));

      // Total orders count (handle plain number or wrapped object)
      const ocData = ordersCountRes?.data;
      const oc =
        typeof ocData === "number"
          ? ocData
          : ocData?.totalCount ?? ocData?.count ?? 0;
      setOrderCount(oc);

      // Recent 5 orders
      const ordersList = ordersRes?.data || [];
      setRecentOrders(ordersList.slice(0, 5));

      // Delivery partners count
      const partnersList = partnersRes?.data || [];
      setDeliveryPartnerCount(partnersList.length);

      // Review stats (avg rating + total)
      const allReviews = reviewsRes?.data || [];
      const totalReviews = allReviews.length;
      const avgRating = totalReviews
        ? allReviews.reduce((sum, r) => sum + (r.rating || 0), 0) /
          totalReviews
        : 0;
      setReviewStats({
        avgRating: Number.isFinite(avgRating)
          ? avgRating.toFixed(1)
          : 0,
        totalReviews,
      });
    } catch (err) {
      console.error("Dashboard Load Error:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  // MOCK CHART until backend monthly API comes
  const subscriptionTrend = [
    { month: "Jan", subs: 20 },
    { month: "Feb", subs: 28 },
    { month: "Mar", subs: 33 },
    { month: "Apr", subs: 45 },
    { month: "May", subs: 52 },
    { month: "Jun", subs: subStats.activeCount || 0 },
  ];

  return (
    <div className="space-y-8">
      {/* ----------------------------------------- */}
      {/* HEADER */}
      {/* ----------------------------------------- */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-[#E23744]">
            <LayoutDashboard className="h-4 w-4" />
            Admin Overview
          </div>

          <h1 className="mt-3 text-3xl font-extrabold">Dashboard</h1>

          <p className="text-sm text-gray-500">
            Logged in as{" "}
            <span className="font-medium text-gray-700">
              {admin?.email || "admin@tiffino.com"}
            </span>
          </p>

          {/* Quality snapshot using reviews */}
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
            {reviewStats.totalReviews > 0 && (
              <span className="inline-flex items-center gap-1 rounded-full bg-yellow-50 px-3 py-1 font-medium text-yellow-700">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                {reviewStats.avgRating} / 5 from{" "}
                {reviewStats.totalReviews} reviews
              </span>
            )}

            {subStats.totalCount > 0 && (
              <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 font-medium text-green-700">
                <Activity className="h-3 w-3" />
                {subStats.totalCount} total subscriptions
              </span>
            )}
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => nav("/admin/reset-password")}
          className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white/70 px-4 py-2.5 text-sm font-semibold text-gray-700 backdrop-blur shadow-sm"
        >
          <Lock className="h-4 w-4 text-[#E23744]" />
          Reset Password
        </motion.button>
      </motion.div>

      {/* ----------------------------------------- */}
      {/* TOP STAT CARDS (REAL DATA) */}
      {/* ----------------------------------------- */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.05 }}
        className="grid gap-5 md:grid-cols-2 xl:grid-cols-4"
      >
        {/* Total Orders */}
        <StatCard
          label="Total Orders"
          value={orderCount}
          chip="All time"
          loading={loading}
          icon={<ShoppingBag className="h-5 w-5 text-[#E23744]" />}
          onClick={() => nav("/admin/orders")}
        />

        {/* Active Subscriptions + small breakdown */}
        <StatCard
          label="Active Subscriptions"
          value={subStats.activeCount || 0}
          loading={loading}
          chip={`Expired: ${subStats.expiredCount || 0} • Paused: ${
            subStats.pausedCount || 0
          }`}
          icon={<UserCheck className="h-5 w-5 text-[#E23744]" />}
          onClick={() => nav("/admin/subscriptions")}
        />

        {/* Expiring soon in 7 days */}
        <StatCard
          label="Expiring in 7 days"
          value={expiringSoon.length}
          loading={loading}
          chip="Subscriptions nearing end"
          icon={<CalendarClock className="h-5 w-5 text-[#E23744]" />}
          onClick={() => nav("/admin/subscriptions")}
        />

        {/* Delivery partners */}
        <StatCard
          label="Delivery Partners"
          value={deliveryPartnerCount}
          loading={loading}
          chip="Available riders"
          icon={<Truck className="h-5 w-5 text-[#E23744]" />}
          onClick={() => nav("/admin/orders")}
        />
      </motion.div>

      {/* ----------------------------------------- */}
      {/* CHARTS + EXPIRING SOON LIST + RATING PILL */}
      {/* ----------------------------------------- */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.1 }}
        className="grid gap-6 lg:grid-cols-2"
      >
        {/* Subscription growth chart */}
        <div className="rounded-3xl bg-white/80 border shadow-md p-5 backdrop-blur">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h3 className="font-semibold">Subscription Growth</h3>
              <div className="text-xs text-gray-500">Monthly trend</div>
            </div>

            <div className="flex flex-col items-end gap-1">
              <span className="rounded-full bg-red-50 px-3 py-1 text-[11px] font-medium text-[#E23744]">
                Active: {subStats.activeCount || 0}
              </span>
              <span className="text-[11px] text-gray-400">
                Total: {subStats.totalCount || 0}
              </span>
            </div>
          </div>

          <div className="h-56 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subscriptionTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="subs" fill="#fecaca" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Expiring Soon + Rating summary */}
        <div className="rounded-3xl bg-white/80 border shadow-md p-5 backdrop-blur flex flex-col">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-semibold">Expiring Soon (7 Days)</h3>
              <div className="text-xs text-gray-500">
                Real backend data
              </div>
            </div>

            {/* Rating pill */}
            {reviewStats.totalReviews > 0 && (
              <div className="flex flex-col items-end gap-1 text-xs">
                <span className="inline-flex items-center gap-1 rounded-full bg-yellow-50 px-3 py-1 font-medium text-yellow-700">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  {reviewStats.avgRating} / 5
                </span>
                <span className="text-[11px] text-gray-500">
                  {reviewStats.totalReviews} reviews
                </span>
              </div>
            )}
          </div>

          <div className="mt-4 space-y-2 max-h-56 overflow-auto pr-1">
            {loading ? (
              <div className="space-y-2">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="h-12 rounded-lg bg-gray-100 animate-pulse"
                  />
                ))}
              </div>
            ) : expiringSoon.length === 0 ? (
              <div className="text-sm text-gray-500">
                No subscriptions expiring soon
              </div>
            ) : (
              expiringSoon.map((sub) => (
                <div
                  key={sub.subscriptionid}
                  className="p-3 border rounded-lg bg-gray-50 flex justify-between items-center"
                >
                  <div>
                    <div className="font-medium text-sm">
                      Subscription #{sub.subscriptionid}
                    </div>
                    <div className="text-xs text-gray-600">
                      Ends on: {formatDate(sub.endDate)}
                    </div>
                  </div>

                  <span className="rounded-full bg-red-50 px-2 py-1 text-[11px] font-medium text-[#E23744]">
                    {sub.status || "ACTIVE"}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </motion.div>

      {/* ----------------------------------------- */}
      {/* RECENT SUBSCRIPTIONS + RECENT ORDERS */}
      {/* ----------------------------------------- */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.15 }}
        className="grid gap-6 xl:grid-cols-2"
      >
        {/* Recent Subscriptions */}
        <div className="rounded-3xl bg-white/80 border shadow-md p-5 backdrop-blur">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold">Recent Subscriptions</h3>
              <p className="text-xs text-gray-500">Latest activity</p>
            </div>

            <button
              onClick={() => nav("/admin/subscriptions")}
              className="text-xs font-semibold text-[#E23744] flex items-center gap-1"
            >
              View All <ChevronRight className="h-3 w-3" />
            </button>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-gray-400 text-xs uppercase">
                  <th className="pb-2 text-left">ID</th>
                  <th className="pb-2 text-left">Plan</th>
                  <th className="pb-2 text-left">Status</th>
                  <th className="pb-2 text-left">End Date</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="4" className="py-4 text-center text-xs">
                      Loading subscriptions...
                    </td>
                  </tr>
                ) : recentSubscriptions.length === 0 ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="py-4 text-center text-xs text-gray-500"
                    >
                      No subscriptions found
                    </td>
                  </tr>
                ) : (
                  recentSubscriptions.map((s) => (
                    <tr
                      key={s.subscriptionid}
                      className="border-t text-gray-700 hover:bg-gray-50"
                    >
                      <td className="py-2">{s.subscriptionid}</td>
                      <td>{s.planId}</td>
                      <td className="capitalize text-xs">
                        <span className="inline-flex rounded-full bg-green-50 px-2 py-0.5 text-[11px] font-medium text-green-700">
                          {s.status || "ACTIVE"}
                        </span>
                      </td>
                      <td className="text-xs">{formatDate(s.endDate)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="rounded-3xl bg-white/80 border shadow-md p-5 backdrop-blur">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold">Recent Orders</h3>
              <p className="text-xs text-gray-500">
                Latest orders placed by users
              </p>
            </div>

            <button
              onClick={() => nav("/admin/orders")}
              className="text-xs font-semibold text-[#E23744] flex items-center gap-1"
            >
              View All <ChevronRight className="h-3 w-3" />
            </button>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-gray-400 text-xs uppercase">
                  <th className="pb-2 text-left">ID</th>
                  <th className="pb-2 text-left">User</th>
                  <th className="pb-2 text-left">Type</th>
                  <th className="pb-2 text-left">Amount</th>
                  <th className="pb-2 text-left">Status</th>
                  <th className="pb-2 text-left">Placed On</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="py-4 text-center text-xs">
                      Loading orders...
                    </td>
                  </tr>
                ) : recentOrders.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="py-4 text-center text-xs text-gray-500"
                    >
                      No orders found
                    </td>
                  </tr>
                ) : (
                  recentOrders.map((o) => (
                    <tr
                      key={o.orderId}
                      className="border-t text-gray-700 hover:bg-gray-50"
                    >
                      <td className="py-2">{o.orderId}</td>
                      <td className="truncate max-w-[140px]">
                        <span
                          title={o.userId}
                          className="text-xs text-gray-700"
                        >
                          {o.userId}
                        </span>
                      </td>
                      <td className="text-xs">
                        {o.orderType || o.type || "-"}
                      </td>
                      <td className="text-xs font-semibold">
                        {o.totalAmount != null ? `₹${o.totalAmount}` : "-"}
                      </td>
                      <td className="text-xs">
                        <OrderStatusPill status={o.status} />
                      </td>
                      <td className="text-xs">
                        {formatDate(o.orderDate)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {/* ----------------------------------------- */}
      {/* QUICK ACTIONS */}
      {/* ----------------------------------------- */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.2 }}
        className="grid md:grid-cols-3 gap-5"
      >
        <QuickActionButton
          label="Manage Menu"
          description="Add / edit cuisines & meals"
          onClick={() => nav("/admin/menu")}
        />
        <QuickActionButton
          label="Subscriptions"
          description="View & manage subscriptions"
          onClick={() => nav("/admin/subscriptions")}
        />
        <QuickActionButton
          label="Orders"
          description="Track user orders"
          onClick={() => nav("/admin/orders")}
        />
      </motion.div>
    </div>
  );
}

// ----------------------------------------------------
// SMALL COMPONENTS
// ----------------------------------------------------
function StatCard({ label, value, icon, chip, loading, onClick }) {
  const isClickable = Boolean(onClick);

  return (
    <motion.button
      whileHover={{ y: -4, scale: isClickable ? 1.01 : 1 }}
      whileTap={isClickable ? { scale: 0.98 } : {}}
      onClick={onClick}
      type="button"
      className={`rounded-3xl bg-white/80 border shadow-md p-4 backdrop-blur text-left w-full ${
        isClickable ? "cursor-pointer" : "cursor-default"
      }`}
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="text-xs text-gray-500">{label}</p>
          {loading ? (
            <div className="mt-1 h-6 w-16 rounded bg-gray-200 animate-pulse" />
          ) : (
            <p className="text-2xl font-bold">{value}</p>
          )}
        </div>
        <div className="bg-red-50 text-[#E23744] h-10 w-10 rounded-2xl flex items-center justify-center">
          {icon}
        </div>
      </div>
      {chip && (
        <p className="text-[11px] mt-2 text-gray-500 truncate">{chip}</p>
      )}
    </motion.button>
  );
}

function QuickActionButton({ label, description, onClick }) {
  return (
    <motion.button
      whileHover={{ y: -2 }}
      onClick={onClick}
      className="text-left w-full bg-red-50/70 p-4 rounded-2xl shadow-sm hover:bg-red-50"
    >
      <div className="font-semibold text-gray-900 flex items-center gap-2 text-sm">
        {label}
        <ArrowRight className="h-3 w-3 text-[#E23744]" />
      </div>
      <p className="text-[11px] text-gray-500 mt-1">{description}</p>
    </motion.button>
  );
}

function OrderStatusPill({ status }) {
  if (!status) {
    return (
      <span className="inline-flex rounded-full bg-gray-100 px-2 py-0.5 text-[11px] text-gray-600">
        -
      </span>
    );
  }

  const normalized = String(status).toUpperCase();

  let bg = "bg-gray-100";
  let text = "text-gray-700";

  if (normalized.includes("DELIVERED") || normalized.includes("COMPLETED")) {
    bg = "bg-green-50";
    text = "text-green-700";
  } else if (normalized.includes("CANCEL") || normalized.includes("REJECT")) {
    bg = "bg-red-50";
    text = "text-red-700";
  } else if (normalized.includes("PENDING") || normalized.includes("NEW")) {
    bg = "bg-yellow-50";
    text = "text-yellow-700";
  } else if (normalized.includes("IN_PROGRESS") || normalized.includes("ACCEPTED")) {
    bg = "bg-blue-50";
    text = "text-blue-700";
  }

  return (
    <span
      className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium ${bg} ${text}`}
    >
      {normalized}
    </span>
  );
}









// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import {
//   LayoutDashboard,
//   ShoppingBag,
//   UserCheck,
//   Truck,
//   ChevronRight,
//   Activity,
//   CalendarClock,
//   CheckCircle2,
//   Star,
//   TrendingUp,
//   DollarSign,
//   PlusCircle,
//   Users
// } from "lucide-react";
// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   BarChart,
//   Bar
// } from "recharts";

// import {
//   adminCountSubscriptions,
//   adminExpiringSoonSubscriptions,
//   adminGetAllSubscriptions,
//   adminGetAllOrders,
//   adminGetOrdersCount,
//   getAllDeliveryPartners,
//   getAllAdminReviews,
// } from "../../api/api";

// import { useNavigate } from "react-router-dom";
// import { useAdminAuth } from "../context/AdminAuthContext";

// /* =====================================================================
//    🎨 ANIMATION HELPERS
//    ===================================================================== */
// const fadeUp = {
//   hidden: { opacity: 0, y: 20 },
//   show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
// };

// const formatDate = (value) => {
//   if (!value) return "-";
//   return new Date(value).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
// };

// /* =====================================================================
//    🚀 MAIN DASHBOARD
//    ===================================================================== */
// export default function AdminDashboard() {
//   const { admin } = useAdminAuth();
//   const navigate = useNavigate();

//   // -- State --
//   const [stats, setStats] = useState({
//     activeSubs: 0,
//     totalSubs: 0,
//     totalOrders: 0,
//     totalPartners: 0,
//     avgRating: 0,
//     totalReviews: 0,
//     revenue: 0 // Mock revenue for demo
//   });

//   const [expiringSoon, setExpiringSoon] = useState([]);
//   const [recentOrders, setRecentOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // -- Mock Chart Data (Replace with real API later) --
//   const chartData = [
//     { name: 'Mon', orders: 40, revenue: 2400 },
//     { name: 'Tue', orders: 30, revenue: 1398 },
//     { name: 'Wed', orders: 20, revenue: 9800 },
//     { name: 'Thu', orders: 27, revenue: 3908 },
//     { name: 'Fri', orders: 18, revenue: 4800 },
//     { name: 'Sat', orders: 23, revenue: 3800 },
//     { name: 'Sun', orders: 34, revenue: 4300 },
//   ];

//   // -- Load Data --
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const [subStatsRes, expRes, ordersRes, partnersRes, reviewsRes] = await Promise.all([
//            adminCountSubscriptions(),
//            adminExpiringSoonSubscriptions(7),
//            adminGetAllOrders(),
//            getAllDeliveryPartners(),
//            getAllAdminReviews()
//         ]);

//         const orders = ordersRes?.data || [];
//         const reviews = reviewsRes?.data || [];
//         const totalRevenue = orders.reduce((acc, curr) => acc + (Number(curr.totalAmount) || 0), 0);
        
//         setStats({
//            activeSubs: subStatsRes?.data?.activeCount || 0,
//            totalSubs: subStatsRes?.data?.totalCount || 0,
//            totalOrders: orders.length,
//            totalPartners: (partnersRes?.data || []).length,
//            avgRating: reviews.length ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1) : 0,
//            totalReviews: reviews.length,
//            revenue: totalRevenue
//         });

//         setExpiringSoon(expRes?.data || []);
//         setRecentOrders(orders.slice(0, 5));

//       } catch (error) {
//         console.error("Dashboard Error:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   return (
//     <div className="space-y-8 font-sans">
      
//       {/* HEADER */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//          <div>
//             <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Dashboard Overview</h1>
//             <p className="text-gray-500 text-sm mt-1">Welcome back, <span className="font-bold text-gray-800">{admin?.email}</span></p>
//          </div>
//          <div className="flex gap-3">
//             <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-xl text-xs font-bold shadow-sm hover:bg-gray-50 flex items-center gap-2">
//                <CalendarClock size={16}/> Last 7 Days
//             </button>
//             <button className="bg-gray-900 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg hover:bg-black flex items-center gap-2">
//                <TrendingUp size={16}/> Export Report
//             </button>
//          </div>
//       </div>

//       {/* STATS GRID */}
//       <motion.div 
//          variants={fadeUp} initial="hidden" animate="show"
//          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
//       >
//          <StatCard 
//             label="Total Revenue" 
//             value={`₹${stats.revenue.toLocaleString()}`} 
//             trend="+12.5%" 
//             icon={<DollarSign className="text-green-600"/>} 
//             color="bg-green-50 text-green-700"
//          />
//          <StatCard 
//             label="Total Orders" 
//             value={stats.totalOrders} 
//             trend="+5.2%" 
//             icon={<ShoppingBag className="text-blue-600"/>} 
//             color="bg-blue-50 text-blue-700"
//             onClick={() => navigate("/admin/orders")}
//          />
//          <StatCard 
//             label="Active Subscriptions" 
//             value={stats.activeSubs} 
//             trend="Stable" 
//             icon={<UserCheck className="text-purple-600"/>} 
//             color="bg-purple-50 text-purple-700"
//             onClick={() => navigate("/admin/subscriptions")}
//          />
//          <StatCard 
//             label="Delivery Partners" 
//             value={stats.totalPartners} 
//             icon={<Truck className="text-orange-600"/>} 
//             color="bg-orange-50 text-orange-700"
//             onClick={() => navigate("/admin/orders")} // Or partners page
//          />
//       </motion.div>

//       {/* CHARTS & ACTIVITY */}
//       <div className="grid lg:grid-cols-3 gap-8">
         
//          {/* LEFT: REVENUE CHART */}
//          <div className="lg:col-span-2 bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100">
//             <div className="flex justify-between items-center mb-6">
//                <h3 className="font-bold text-gray-800 text-lg">Revenue Analytics</h3>
//                <div className="flex gap-2">
//                   <span className="w-3 h-3 rounded-full bg-red-500"/>
//                   <span className="text-xs text-gray-400 font-bold uppercase">Income</span>
//                </div>
//             </div>
//             <div className="h-[300px] w-full">
//                <ResponsiveContainer width="100%" height="100%">
//                   <AreaChart data={chartData}>
//                      <defs>
//                         <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
//                            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1}/>
//                            <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
//                         </linearGradient>
//                      </defs>
//                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6"/>
//                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} dy={10}/>
//                      <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} dx={-10}/>
//                      <Tooltip 
//                         contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'}}
//                      />
//                      <Area type="monotone" dataKey="revenue" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
//                   </AreaChart>
//                </ResponsiveContainer>
//             </div>
//          </div>

//          {/* RIGHT: EXPIRING SOON */}
//          <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 flex flex-col">
//             <div className="flex justify-between items-center mb-6">
//                <h3 className="font-bold text-gray-800 text-lg">Expiring Soon</h3>
//                <span className="bg-red-50 text-red-600 text-xs font-bold px-2 py-1 rounded-lg">7 Days</span>
//             </div>
            
//             <div className="flex-1 overflow-y-auto pr-2 space-y-4 max-h-[300px] hide-scrollbar">
//                {loading ? (
//                   <p className="text-sm text-gray-400 text-center py-10">Loading...</p>
//                ) : expiringSoon.length === 0 ? (
//                   <div className="text-center py-10">
//                      <CheckCircle2 className="w-10 h-10 text-green-200 mx-auto mb-2"/>
//                      <p className="text-sm text-gray-400">All subscriptions healthy</p>
//                   </div>
//                ) : (
//                   expiringSoon.map(sub => (
//                      <div key={sub.subscriptionid} className="flex justify-between items-center p-3 bg-gray-50 rounded-2xl hover:bg-red-50 transition-colors cursor-pointer group">
//                         <div>
//                            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-0.5">#{sub.subscriptionid}</p>
//                            <p className="text-sm font-bold text-gray-800">{formatDate(sub.endDate)}</p>
//                         </div>
//                         <div className="text-right">
//                            <span className="text-xs font-bold text-red-500 bg-white px-2 py-1 rounded-lg shadow-sm group-hover:bg-red-500 group-hover:text-white transition-colors">{sub.status}</span>
//                         </div>
//                      </div>
//                   ))
//                )}
//             </div>
//             <button onClick={() => navigate("/admin/subscriptions")} className="mt-4 w-full py-3 bg-gray-900 text-white rounded-xl text-xs font-bold hover:bg-black transition">View All</button>
//          </div>

//       </div>

//       {/* RECENT ORDERS TABLE */}
//       <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100">
//          <div className="flex justify-between items-center mb-6">
//             <h3 className="font-bold text-gray-800 text-lg">Recent Orders</h3>
//             <button onClick={() => navigate("/admin/orders")} className="text-xs font-bold text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg transition flex items-center gap-1">
//                View All <ChevronRight size={14}/>
//             </button>
//          </div>
         
//          <div className="overflow-x-auto">
//             <table className="w-full text-sm text-left">
//                <thead className="text-xs text-gray-400 uppercase bg-gray-50/50">
//                   <tr>
//                      <th className="px-4 py-3 rounded-l-xl">Order ID</th>
//                      <th className="px-4 py-3">Customer</th>
//                      <th className="px-4 py-3">Amount</th>
//                      <th className="px-4 py-3">Status</th>
//                      <th className="px-4 py-3 rounded-r-xl">Date</th>
//                   </tr>
//                </thead>
//                <tbody className="divide-y divide-gray-100">
//                   {recentOrders.map(order => (
//                      <tr key={order.orderId} className="hover:bg-gray-50 transition-colors">
//                         <td className="px-4 py-4 font-mono text-xs text-gray-500">#{order.orderId}</td>
//                         <td className="px-4 py-4 font-bold text-gray-800">{order.userId}</td>
//                         <td className="px-4 py-4 font-bold text-gray-900">₹{order.totalAmount}</td>
//                         <td className="px-4 py-4"><StatusPill status={order.status} /></td>
//                         <td className="px-4 py-4 text-gray-500">{formatDate(order.orderDate)}</td>
//                      </tr>
//                   ))}
//                </tbody>
//             </table>
//          </div>
//       </div>

//     </div>
//   );
// }

// /* --- SUB COMPONENTS --- */

// const StatCard = ({ label, value, trend, icon, color, onClick }) => (
//    <motion.div 
//       whileHover={{ y: -4 }}
//       onClick={onClick}
//       className={`bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm cursor-pointer hover:shadow-xl transition-all relative overflow-hidden group`}
//    >
//       <div className="flex justify-between items-start mb-4">
//          <div>
//             <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{label}</p>
//             <h3 className="text-3xl font-extrabold text-gray-900 mt-1">{value}</h3>
//          </div>
//          <div className={`p-3 rounded-2xl ${color}`}>{icon}</div>
//       </div>
//       {trend && (
//          <div className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 w-fit px-2 py-1 rounded-lg">
//             <TrendingUp size={12}/> {trend}
//          </div>
//       )}
//    </motion.div>
// );

// const StatusPill = ({ status }) => {
//    const st = String(status).toUpperCase();
//    let color = "bg-gray-100 text-gray-600";
//    if(st === "DELIVERED") color = "bg-green-100 text-green-700";
//    if(st === "PENDING") color = "bg-yellow-100 text-yellow-700";
//    if(st === "CANCELLED") color = "bg-red-100 text-red-700";
   
//    return (
//       <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${color}`}>
//          {status}
//       </span>
//    );
// };