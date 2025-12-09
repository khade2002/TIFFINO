// src/superadmin/pages/SuperAdminDashboard.jsx
// CLEAN VERSION — Delivery Partner module removed

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import toast from "react-hot-toast";

import {
  getReports,
  getKitchens,
  createKitchen,
  deleteKitchen,
  getManagers,
  createManager,
  deleteManager,
  exportAll,
  exportKitchenById,
} from "../../api/api";

import { useSuperAdminAuth } from "../context/SuperAdminAuthContext";
import {
  Trash2,
  Plus,
  DownloadCloud,
  LogOut,
  Search,
  Filter,
  Menu,
  X,
} from "lucide-react";

// ----------------------------
// Small utilities
// ----------------------------
const COLORS = ["#7c3aed", "#fb7185", "#34d399", "#f59e0b", "#60a5fa"];

const useDebounced = (value, ms = 300) => {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), ms);
    return () => clearTimeout(t);
  }, [value, ms]);
  return v;
};

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  show: (i) => ({ opacity: 1, y: 0, transition: { delay: 0.04 * i } }),
};

const slideIn = { hidden: { x: 24, opacity: 0 }, show: { x: 0, opacity: 1 } };

// ----------------------------
// Reusable Field Component
// ----------------------------
function Field({
  id,
  label,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  required,
}) {
  return (
    <label className="block text-sm">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </span>
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
      <input
        id={id}
        aria-invalid={!!error}
        className={`mt-1 w-full px-3 py-2 rounded-md border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 transition ${
          error ? "border-red-300" : "border-gray-200"
        }`}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </label>
  );
}

// ----------------------------
// Main Component
// ----------------------------
export default function SuperAdminDashboard() {
  const { superAdmin, logout } = useSuperAdminAuth();

  // data
  const [reports, setReports] = useState({});
  const [kitchens, setKitchens] = useState([]);
  const [managers, setManagers] = useState([]);

  // UI
  const [loading, setLoading] = useState(false);
  const [busy, setBusy] = useState(false);

  // layout
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("overview"); // overview / kitchens / managers

  // global search & filters
  const [globalSearch, setGlobalSearch] = useState("");
  const debouncedSearch = useDebounced(globalSearch, 300);

  // kitchen filters + pagination
  const [kFilters, setKFilters] = useState({
    state: "",
    city: "",
    profitable: "",
  });
  const [kPage, setKPage] = useState(1);
  const [kPageSize, setKPageSize] = useState(6);

  // manager filters + pagination
  const [mFilters, setMFilters] = useState({ kitchenId: "" });
  const [mPage, setMPage] = useState(1);
  const [mPageSize, setMPageSize] = useState(6);

  // create panel
  const [panelOpen, setPanelOpen] = useState(false);
  const [panelMode, setPanelMode] = useState(null); // 'kitchen' | 'manager'

  // forms
  const initialKitchen = {
    name: "",
    address: "",
    state: "",
    city: "",
    pincode: "",
    rating: "",
    profitable: false,
    revenue: "",
  };
  const [newKitchen, setNewKitchen] = useState(initialKitchen);
  const [kitchenErrors, setKitchenErrors] = useState({});

  const initialManager = {
    name: "",
    email: "",
    phone: "",
    adharCard: "",
    panCard: "",
    kitchenId: "",
    address: "",
    username: "",
  };
  const [newManager, setNewManager] = useState(initialManager);
  const [managerErrors, setManagerErrors] = useState({});

  // validation regexes
  const aadhaarRegex = /^\d{12}$/;
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i;
  const phoneRegex = /^\d{10}$/;
  const pincodeRegex = /^\d{6}$/;
  const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

  // -----------------------------------------
  // Fetch all
  // -----------------------------------------
  useEffect(() => {
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchAll() {
    setLoading(true);
    try {
      const [rRes, kRes, mRes] = await Promise.all([
        getReports(),
        getKitchens(),
        getManagers(),
      ]);
      setReports(rRes?.data || {});
      setKitchens(Array.isArray(kRes?.data) ? kRes.data : []);
      setManagers(Array.isArray(mRes?.data) ? mRes.data : []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  }

  // -----------------------------------------
  // CRUD + Export handlers
  // -----------------------------------------
  async function handleCreateKitchen(e) {
    e.preventDefault();
    const payload = {
      name: newKitchen.name.trim(),
      address: newKitchen.address.trim(),
      state: newKitchen.state.trim(),
      city: newKitchen.city.trim(),
      pincode:
        newKitchen.pincode === "" ? null : Number(newKitchen.pincode),
      rating: newKitchen.rating === "" ? null : parseFloat(newKitchen.rating),
      profitable: !!newKitchen.profitable,
      revenue:
        newKitchen.revenue === "" ? null : Number(newKitchen.revenue),
    };

    const errs = {};
    if (!payload.name) errs.name = "Required";
    if (!payload.address) errs.address = "Required";
    if (!payload.city) errs.city = "Required";
    if (!payload.state) errs.state = "Required";
    if (!payload.pincode || !pincodeRegex.test(String(payload.pincode)))
      errs.pincode = "Pincode must be 6 digits";

    setKitchenErrors(errs);
    if (Object.keys(errs).length) return;

    try {
      setBusy(true);
      await createKitchen(payload);
      toast.success("Kitchen created");
      setNewKitchen(initialKitchen);
      setPanelOpen(false);
      fetchAll();
    } catch (err) {
      console.error(err);
      toast.error("Failed to create kitchen");
    } finally {
      setBusy(false);
    }
  }

  async function handleDeleteKitchen(id) {
    if (!window.confirm("Delete this kitchen?")) return;
    try {
      setBusy(true);
      await deleteKitchen(id);
      toast.success("Deleted");
      fetchAll();
    } catch {
      toast.error("Delete failed");
    } finally {
      setBusy(false);
    }
  }

  async function handleCreateManager(e) {
    e.preventDefault();
    const payload = {
      name: newManager.name.trim(),
      email: newManager.email.trim(),
      phone: newManager.phone.trim(),
      adharCard: newManager.adharCard.trim(),
      panCard: newManager.panCard.trim(),
      kitchenId: Number(newManager.kitchenId),
      address: newManager.address.trim(),
      username: newManager.username.trim(),
    };

    const errs = {};
    if (!payload.name) errs.name = "Required";
    if (!payload.email || !emailRegex.test(payload.email))
      errs.email = "Invalid email";
    if (!payload.phone || !phoneRegex.test(payload.phone))
      errs.phone = "Phone must be 10 digits";
    if (!payload.adharCard || !aadhaarRegex.test(payload.adharCard))
      errs.adharCard = "Aadhaar must be 12 digits";
    if (!payload.panCard || !panRegex.test(payload.panCard))
      errs.panCard = "PAN invalid";
    if (!payload.kitchenId || payload.kitchenId <= 0)
      errs.kitchenId = "Valid kitchen id required";
    if (!payload.address) errs.address = "Address required";
    if (!payload.username) errs.username = "Username required";

    setManagerErrors(errs);
    if (Object.keys(errs).length) return;

    try {
      setBusy(true);
      await createManager(payload);
      toast.success("Manager created");
      setNewManager(initialManager);
      setPanelOpen(false);
      fetchAll();
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.error || "Failed to create manager");
    } finally {
      setBusy(false);
    }
  }

  async function handleDeleteManager(id) {
    if (!window.confirm("Delete manager?")) return;
    try {
      setBusy(true);
      await deleteManager(id);
      toast.success("Deleted");
      fetchAll();
    } catch {
      toast.error("Delete failed");
    } finally {
      setBusy(false);
    }
  }

  async function handleExportAll() {
    try {
      setBusy(true);
      const resp = await exportAll();
      const url = URL.createObjectURL(new Blob([resp.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = "all-data.xlsx";
      a.click();
      toast.success("Exported");
    } catch {
      toast.error("Export failed");
    } finally {
      setBusy(false);
    }
  }

  async function handleExportKitchen(id) {
    try {
      setBusy(true);
      const resp = await exportKitchenById(id);
      const url = URL.createObjectURL(new Blob([resp.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = `kitchen-${id}.xlsx`;
      a.click();
      toast.success("Downloaded");
    } catch {
      toast.error("Export failed");
    } finally {
      setBusy(false);
    }
  }

  // -----------------------------------------
  // Filters & Derived lists (memoized)
  // -----------------------------------------
  const normalizedSearch = (s) => String(s || "").trim().toLowerCase();

  const filteredKitchens = useMemo(() => {
    const q = normalizedSearch(debouncedSearch);
    return kitchens.filter((k) => {
      const matchesSearch =
        !q ||
        [k.name, k.city, k.state, String(k.id)]
          .join(" ")
          .toLowerCase()
          .includes(q);
      const matchesState =
        !kFilters.state ||
        (k.state || "").toLowerCase() === kFilters.state.toLowerCase();
      const matchesCity =
        !kFilters.city ||
        (k.city || "").toLowerCase() === kFilters.city.toLowerCase();
      const matchesProf =
        !kFilters.profitable ||
        String(k.profitable) === String(kFilters.profitable);
      return matchesSearch && matchesState && matchesCity && matchesProf;
    });
  }, [kitchens, kFilters, debouncedSearch]);

  const filteredManagers = useMemo(() => {
    const q = normalizedSearch(debouncedSearch);
    return managers.filter((m) => {
      const matchesSearch =
        !q ||
        [m.name, m.email, m.username, String(m.id)]
          .join(" ")
          .toLowerCase()
          .includes(q);
      const matchesKitchen =
        !mFilters.kitchenId ||
        String(m.kitchenId) === String(mFilters.kitchenId);
      return matchesSearch && matchesKitchen;
    });
  }, [managers, mFilters, debouncedSearch]);

  // pagination helpers
  function paginate(list, page, pageSize) {
    const total = list.length;
    const pages = Math.max(1, Math.ceil(total / pageSize));
    const start = (page - 1) * pageSize;
    return {
      items: list.slice(start, start + pageSize),
      total,
      pages,
    };
  }

  const kPaginated = paginate(filteredKitchens, kPage, kPageSize);
  const mPaginated = paginate(filteredManagers, mPage, mPageSize);

  // helper for lists (resets page to 1 on filter change)
  useEffect(() => setKPage(1), [kFilters, debouncedSearch]);
  useEffect(() => setMPage(1), [mFilters, debouncedSearch]);

  // -----------------------------------------
  // Derived chart data
  // -----------------------------------------
  const kitchenByCity = kitchens.reduce((acc, k) => {
    const city = k.city || "Unknown";
    acc[city] = (acc[city] || 0) + 1;
    return acc;
  }, {});
  const barData = Object.entries(kitchenByCity).map(([city, count]) => ({
    city,
    count,
  }));
  const pieData = [
    { name: "Kitchens", value: reports.kitchens || 0 },
    { name: "Managers", value: reports.managers || 0 },
  ];

  // -----------------------------------------
  // Render
  // -----------------------------------------
  return (
    <div className="min-h-screen flex bg-gradient-to-b from-gray-50 to-white">
      {/* Sidebar */}
      <aside
        className={`bg-white border-r transition-all ${
          sidebarOpen ? "w-64" : "w-16"
        } p-4`}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-500 text-white flex items-center justify-center font-bold">
              CK
            </div>
            {sidebarOpen && (
              <div>
                <div className="text-sm font-bold">CloudKitchen</div>
                <div className="text-xs text-gray-500">SuperAdmin</div>
              </div>
            )}
          </div>
          <button
            className="p-1"
            onClick={() => setSidebarOpen((s) => !s)}
          >
            {sidebarOpen ? <X /> : <Menu />}
          </button>
        </div>

        <nav className="flex flex-col gap-2">
          {[
            { key: "overview", label: "Overview" },
            { key: "kitchens", label: "Kitchens" },
            { key: "managers", label: "Managers" },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`flex items-center gap-3 p-2 rounded-lg text-sm hover:bg-gray-100 transition ${
                activeTab === item.key
                  ? "bg-purple-50 border border-purple-100"
                  : ""
              }`}
            >
              <span className="w-3 h-3 rounded-full bg-purple-300" />
              {sidebarOpen ? item.label : ""}
            </button>
          ))}
        </nav>

        <div className="mt-6">
          <button
            onClick={() => {
              setPanelMode("kitchen");
              setPanelOpen(true);
            }}
            className="w-full flex items-center gap-2 justify-center bg-purple-600 text-white px-3 py-2 rounded-lg shadow"
          >
            <Plus className="w-4 h-4" /> {sidebarOpen ? "Create" : ""}
          </button>
        </div>

        <div className="mt-6">
          <button
            onClick={() => {
              logout();
              window.location.href = "/superadmin/login";
            }}
            className="w-full flex items-center gap-2 justify-center bg-red-50 text-red-600 px-3 py-2 rounded-lg shadow-sm"
          >
            <LogOut className="w-4 h-4" /> {sidebarOpen ? "Logout" : ""}
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-4 w-full max-w-3xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                placeholder="Search kitchens, managers..."
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-purple-300"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                className="flex items-center gap-2 bg-white border px-3 py-2 rounded-lg shadow-sm hover:shadow-md"
                onClick={handleExportAll}
                disabled={busy}
              >
                <DownloadCloud className="w-4 h-4 text-purple-600" />
                <span className="text-sm hidden md:inline">Export</span>
              </button>

              <button
                className="flex items-center gap-2 bg-white border px-3 py-2 rounded-lg shadow-sm hover:shadow-md"
                onClick={() => {
                  setPanelOpen(true);
                  setPanelMode("kitchen");
                }}
              >
                <Plus className="w-4 h-4 text-green-600" />
                <span className="text-sm hidden md:inline">New</span>
              </button>
            </div>
          </div>

          <div className="text-right">
            <div className="text-sm font-semibold">
              Welcome, {superAdmin?.username}
            </div>
            <div className="text-xs text-gray-500">Cloud Kitchen Admin</div>
          </div>
        </div>

        {/* Grid layout: left content + right sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left: Overview / Charts / Lists (col-span 3) */}
          <div className="lg:col-span-3 space-y-6">
            {/* Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: "Kitchens", value: reports.kitchens || 0 },
                { label: "Managers", value: reports.managers || 0 },
              ].map((card, i) => (
                <motion.div
                  key={i}
                  variants={cardVariants}
                  initial="hidden"
                  animate="show"
                  custom={i}
                  className="p-4 rounded-2xl bg-white border shadow-sm"
                >
                  <div className="text-xs text-gray-500">{card.label}</div>
                  <div className="text-2xl font-bold mt-2">{card.value}</div>
                </motion.div>
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white p-4 rounded-2xl border shadow-sm">
                <h3 className="font-semibold mb-3">Kitchens by City</h3>
                <div style={{ height: 260 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barData}>
                      <XAxis dataKey="city" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                        {barData.map((_, idx) => (
                          <Cell
                            key={idx}
                            fill={COLORS[idx % COLORS.length]}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border shadow-sm">
                <h3 className="font-semibold mb-3">System Overview</h3>
                <div style={{ height: 260 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={40}
                        outerRadius={80}
                        label
                      >
                        {pieData.map((_, idx) => (
                          <Cell
                            key={idx}
                            fill={COLORS[idx % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Main lists switcher */}
            <div className="bg-white p-4 rounded-2xl border shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setActiveTab("kitchens")}
                    className={`px-3 py-1 rounded-lg ${
                      activeTab === "kitchens" ? "bg-purple-50" : ""
                    }`}
                  >
                    Kitchens
                  </button>
                  <button
                    onClick={() => setActiveTab("managers")}
                    className={`px-3 py-1 rounded-lg ${
                      activeTab === "managers" ? "bg-purple-50" : ""
                    }`}
                  >
                    Managers
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <Filter className="text-gray-600" />
                  <span className="text-xs text-gray-500">Filters</span>
                </div>
              </div>

              {/* Tab content */}
              <div>
                {/* Kitchens Table */}
                {activeTab === "kitchens" && (
                  <div>
                    {/* Filters */}
                    <div className="flex flex-wrap gap-3 mb-3 items-center">
                      <select
                        value={kFilters.state}
                        onChange={(e) =>
                          setKFilters({
                            ...kFilters,
                            state: e.target.value,
                          })
                        }
                        className="px-3 py-2 border rounded"
                      >
                        <option value="">All states</option>
                        {[...new Set(
                          kitchens.map((k) => k.state).filter(Boolean)
                        )].map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>

                      <select
                        value={kFilters.city}
                        onChange={(e) =>
                          setKFilters({
                            ...kFilters,
                            city: e.target.value,
                          })
                        }
                        className="px-3 py-2 border rounded"
                      >
                        <option value="">All cities</option>
                        {[...new Set(
                          kitchens.map((k) => k.city).filter(Boolean)
                        )].map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>

                      <select
                        value={kFilters.profitable}
                        onChange={(e) =>
                          setKFilters({
                            ...kFilters,
                            profitable: e.target.value,
                          })
                        }
                        className="px-3 py-2 border rounded"
                      >
                        <option value="">All</option>
                        <option value="true">Profitable</option>
                        <option value="false">Not Profitable</option>
                      </select>

                      <div className="ml-auto flex items-center gap-3">
                        <div className="text-xs text-gray-500">
                          Page size
                        </div>
                        <select
                          value={kPageSize}
                          onChange={(e) =>
                            setKPageSize(Number(e.target.value))
                          }
                          className="px-2 py-1 border rounded"
                        >
                          {[6, 10, 20].map((n) => (
                            <option key={n} value={n}>
                              {n}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="space-y-2">
                      {kPaginated.items.map((k) => (
                        <motion.div
                          key={k.id}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="p-3 border rounded-lg flex items-center justify-between"
                        >
                          <div>
                            <div className="font-medium">{k.name}</div>
                            <div className="text-xs text-gray-500">
                              {k.city} · {k.state} ·{" "}
                              {k.pincode ?? "N/A"}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleExportKitchen(k.id)}
                              className="px-2 py-1 text-xs border rounded"
                            >
                              Export
                            </button>
                            <button
                              onClick={() => {
                                setPanelMode("kitchen");
                                setNewKitchen({
                                  name: k.name,
                                  address: k.address || "",
                                  state: k.state || "",
                                  city: k.city || "",
                                  pincode: k.pincode || "",
                                  rating: k.rating || "",
                                  profitable: !!k.profitable,
                                  revenue: k.revenue || "",
                                });
                                setPanelOpen(true);
                              }}
                              className="px-2 py-1 text-xs border rounded"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteKitchen(k.id)}
                              className="text-red-500 p-1 hover:bg-red-50 rounded"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Pagination */}
                    <div className="mt-3 flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        Showing {kPaginated.items.length} of{" "}
                        {kPaginated.total}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            setKPage((p) => Math.max(1, p - 1))
                          }
                          className="px-2 py-1 border rounded"
                        >
                          Prev
                        </button>
                        <div className="px-3 py-1 border rounded">
                          Page {kPage}/{kPaginated.pages}
                        </div>
                        <button
                          onClick={() =>
                            setKPage((p) =>
                              Math.min(kPaginated.pages, p + 1)
                            )
                          }
                          className="px-2 py-1 border rounded"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Managers Table */}
                {activeTab === "managers" && (
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <select
                        value={mFilters.kitchenId}
                        onChange={(e) =>
                          setMFilters({
                            ...mFilters,
                            kitchenId: e.target.value,
                          })
                        }
                        className="px-3 py-2 border rounded"
                      >
                        <option value="">All kitchens</option>
                        {kitchens.map((k) => (
                          <option key={k.id} value={k.id}>
                            {k.name} ({k.id})
                          </option>
                        ))}
                      </select>

                      <div className="ml-auto flex items-center gap-3">
                        <div className="text-xs text-gray-500">
                          Page size
                        </div>
                        <select
                          value={mPageSize}
                          onChange={(e) =>
                            setMPageSize(Number(e.target.value))
                          }
                          className="px-2 py-1 border rounded"
                        >
                          {[6, 10, 20].map((n) => (
                            <option key={n} value={n}>
                              {n}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {mPaginated.items.map((m) => (
                        <motion.div
                          key={m.id}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-3 border rounded-lg flex items-center justify-between"
                        >
                          <div>
                            <div className="font-medium">
                              {m.name}{" "}
                              <span className="text-xs text-gray-400">
                                ({m.username})
                              </span>
                            </div>
                            <div className="text-xs text-gray-500">
                              {m.email} · kitchen:{" "}
                              {m.kitchenId ?? "N/A"}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                setPanelMode("manager");
                                setNewManager({
                                  name: m.name,
                                  email: m.email,
                                  phone: m.phone || "",
                                  adharCard: m.adharCard || "",
                                  panCard: m.panCard || "",
                                  kitchenId: m.kitchenId || "",
                                  address: m.address || "",
                                  username: m.username || "",
                                });
                                setPanelOpen(true);
                              }}
                              className="px-2 py-1 text-xs border rounded"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteManager(m.id)}
                              className="text-red-500 p-1 hover:bg-red-50 rounded"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        Showing {mPaginated.items.length} of{" "}
                        {mPaginated.total}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            setMPage((p) => Math.max(1, p - 1))
                          }
                          className="px-2 py-1 border rounded"
                        >
                          Prev
                        </button>
                        <div className="px-3 py-1 border rounded">
                          Page {mPage}/{mPaginated.pages}
                        </div>
                        <button
                          onClick={() =>
                            setMPage((p) =>
                              Math.min(mPaginated.pages, p + 1)
                            )
                          }
                          className="px-2 py-1 border rounded"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right: Quick actions + Filters panel */}
          <div>
            <div className="bg-white p-4 rounded-2xl border shadow-sm mb-4">
              <h4 className="font-semibold">Quick Actions</h4>
              <div className="mt-3 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setPanelOpen(true);
                    setPanelMode("kitchen");
                  }}
                  className="w-full px-3 py-2 bg-purple-600 text-white rounded"
                >
                  New Kitchen
                </button>
                <button
                  onClick={() => {
                    setPanelOpen(true);
                    setPanelMode("manager");
                  }}
                  className="w-full px-3 py-2 bg-green-600 text-white rounded"
                >
                  New Manager
                </button>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border shadow-sm">
              <h4 className="font-semibold">Filters</h4>

              <div className="mt-3 space-y-2">
                {activeTab === "kitchens" && (
                  <>
                    <label className="text-xs text-gray-500">State</label>
                    <select
                      value={kFilters.state}
                      onChange={(e) =>
                        setKFilters({
                          ...kFilters,
                          state: e.target.value,
                        })
                      }
                      className="w-full px-2 py-2 border rounded"
                    >
                      <option value="">All</option>
                      {[...new Set(
                        kitchens.map((k) => k.state).filter(Boolean)
                      )].map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>

                    <label className="text-xs text-gray-500">City</label>
                    <select
                      value={kFilters.city}
                      onChange={(e) =>
                        setKFilters({
                          ...kFilters,
                          city: e.target.value,
                        })
                      }
                      className="w-full px-2 py-2 border rounded"
                    >
                      <option value="">All</option>
                      {[...new Set(
                        kitchens.map((k) => k.city).filter(Boolean)
                      )].map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>

                    <label className="text-xs text-gray-500">
                      Profitable
                    </label>
                    <select
                      value={kFilters.profitable}
                      onChange={(e) =>
                        setKFilters({
                          ...kFilters,
                          profitable: e.target.value,
                        })
                      }
                      className="w-full px-2 py-2 border rounded"
                    >
                      <option value="">All</option>
                      <option value="true">Profitable</option>
                      <option value="false">Not profitable</option>
                    </select>
                  </>
                )}

                {activeTab === "managers" && (
                  <>
                    <label className="text-xs text-gray-500">
                      Assigned Kitchen
                    </label>
                    <select
                      value={mFilters.kitchenId}
                      onChange={(e) =>
                        setMFilters({
                          ...mFilters,
                          kitchenId: e.target.value,
                        })
                      }
                      className="w-full px-2 py-2 border rounded"
                    >
                      <option value="">All</option>
                      {kitchens.map((k) => (
                        <option key={k.id} value={k.id}>
                          {k.name} ({k.id})
                        </option>
                      ))}
                    </select>
                  </>
                )}
              </div>
            </div>

            <div className="mt-4 text-xs text-gray-500">
              <div>
                Tip: Use search to quickly find items. Use filters to narrow
                results. Click an item to edit in the create panel.
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Sliding Create / Edit Panel */}
      <AnimatePresence>
        {panelOpen && (
          <motion.aside
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            className="w-96 fixed right-0 top-0 h-full bg-white border-l p-6 z-50 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">
                {panelMode === "kitchen"
                  ? "Create / Edit Kitchen"
                  : "Create / Edit Manager"}
              </h3>
              <button
                onClick={() => {
                  setPanelOpen(false);
                  setPanelMode(null);
                  setNewKitchen(initialKitchen);
                  setNewManager(initialManager);
                  setKitchenErrors({});
                  setManagerErrors({});
                }}
              >
                <X />
              </button>
            </div>

            <div
              className="space-y-4 overflow-auto"
              style={{ maxHeight: "calc(100vh - 160px)" }}
            >
              {/* Kitchen form */}
              {panelMode === "kitchen" && (
                <form
                  onSubmit={handleCreateKitchen}
                  className="space-y-3"
                >
                  <Field
                    id="kname"
                    label="Name"
                    required
                    value={newKitchen.name}
                    onChange={(e) =>
                      setNewKitchen({
                        ...newKitchen,
                        name: e.target.value,
                      })
                    }
                    error={kitchenErrors.name}
                  />
                  <Field
                    id="kaddress"
                    label="Address"
                    required
                    value={newKitchen.address}
                    onChange={(e) =>
                      setNewKitchen({
                        ...newKitchen,
                        address: e.target.value,
                      })
                    }
                    error={kitchenErrors.address}
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <Field
                      id="kcity"
                      label="City"
                      required
                      value={newKitchen.city}
                      onChange={(e) =>
                        setNewKitchen({
                          ...newKitchen,
                          city: e.target.value,
                        })
                      }
                      error={kitchenErrors.city}
                    />
                    <Field
                      id="kstate"
                      label="State"
                      required
                      value={newKitchen.state}
                      onChange={(e) =>
                        setNewKitchen({
                          ...newKitchen,
                          state: e.target.value,
                        })
                      }
                      error={kitchenErrors.state}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Field
                      id="kpincode"
                      label="Pincode"
                      required
                      value={newKitchen.pincode}
                      onChange={(e) =>
                        setNewKitchen({
                          ...newKitchen,
                          pincode: e.target.value,
                        })
                      }
                      error={kitchenErrors.pincode}
                    />
                    <Field
                      id="krating"
                      label="Rating"
                      value={newKitchen.rating}
                      onChange={(e) =>
                        setNewKitchen({
                          ...newKitchen,
                          rating: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2 items-center">
                    <Field
                      id="krevenue"
                      label="Revenue"
                      value={newKitchen.revenue}
                      onChange={(e) =>
                        setNewKitchen({
                          ...newKitchen,
                          revenue: e.target.value,
                        })
                      }
                    />
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={newKitchen.profitable}
                        onChange={(e) =>
                          setNewKitchen({
                            ...newKitchen,
                            profitable: e.target.checked,
                          })
                        }
                      />
                      Profitable
                    </label>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      disabled={busy}
                      type="submit"
                      className="px-4 py-2 rounded bg-purple-600 text-white"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setNewKitchen(initialKitchen);
                        setKitchenErrors({});
                      }}
                      className="px-4 py-2 rounded border"
                    >
                      Reset
                    </button>
                  </div>
                </form>
              )}

              {/* Manager form */}
              {panelMode === "manager" && (
                <form
                  onSubmit={handleCreateManager}
                  className="space-y-3"
                >
                  <Field
                    id="mname"
                    label="Name"
                    required
                    value={newManager.name}
                    onChange={(e) =>
                      setNewManager({
                        ...newManager,
                        name: e.target.value,
                      })
                    }
                    error={managerErrors.name}
                  />
                  <Field
                    id="musername"
                    label="Username"
                    required
                    value={newManager.username}
                    onChange={(e) =>
                      setNewManager({
                        ...newManager,
                        username: e.target.value,
                      })
                    }
                    error={managerErrors.username}
                  />
                  <Field
                    id="maddress"
                    label="Address"
                    required
                    value={newManager.address}
                    onChange={(e) =>
                      setNewManager({
                        ...newManager,
                        address: e.target.value,
                      })
                    }
                    error={managerErrors.address}
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <Field
                      id="memail"
                      label="Email"
                      required
                      value={newManager.email}
                      onChange={(e) =>
                        setNewManager({
                          ...newManager,
                          email: e.target.value,
                        })
                      }
                      error={managerErrors.email}
                    />
                    <Field
                      id="mphone"
                      label="Phone"
                      required
                      value={newManager.phone}
                      onChange={(e) =>
                        setNewManager({
                          ...newManager,
                          phone: e.target.value,
                        })
                      }
                      error={managerErrors.phone}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Field
                      id="madhar"
                      label="Aadhaar (12 digits)"
                      required
                      value={newManager.adharCard}
                      onChange={(e) =>
                        setNewManager({
                          ...newManager,
                          adharCard: e.target.value,
                        })
                      }
                      error={managerErrors.adharCard}
                    />
                    <Field
                      id="mpan"
                      label="PAN (ABCDE1234F)"
                      required
                      value={newManager.panCard}
                      onChange={(e) =>
                        setNewManager({
                          ...newManager,
                          panCard: e.target.value,
                        })
                      }
                      error={managerErrors.panCard}
                    />
                  </div>
                  <Field
                    id="mkitchen"
                    label="Assigned Kitchen ID"
                    required
                    value={newManager.kitchenId}
                    onChange={(e) =>
                      setNewManager({
                        ...newManager,
                        kitchenId: e.target.value,
                      })
                    }
                    error={managerErrors.kitchenId}
                  />
                  <div className="flex items-center gap-2">
                    <button
                      disabled={busy}
                      type="submit"
                      className="px-4 py-2 rounded bg-green-600 text-white"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setNewManager(initialManager);
                        setManagerErrors({});
                      }}
                      className="px-4 py-2 rounded border"
                    >
                      Reset
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}
