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




