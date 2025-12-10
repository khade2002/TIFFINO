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





// import React, { useEffect, useState, useMemo } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   Legend,
//   AreaChart,
//   Area,
//   CartesianGrid
// } from "recharts";
// import toast from "react-hot-toast";
// import {
//   getReports,
//   getKitchens,
//   createKitchen,
//   deleteKitchen,
//   getManagers,
//   createManager,
//   deleteManager,
//   exportAll,
// } from "../../api/api";
// import { useSuperAdminAuth } from "../context/SuperAdminAuthContext";
// import {
//   Trash2,
//   Plus,
//   DownloadCloud,
//   LogOut,
//   Search,
//   Filter,
//   Mail,
//   Menu,
//   X,
//   LayoutDashboard,
//   UtensilsCrossed,
//   Users,
//   TrendingUp,
//   MapPin,
//   ShieldCheck,
//   ChevronRight,
//   User,
//   Phone,
//   CreditCard,
//   FileText
// } from "lucide-react";

// /* =====================================================================
//    🎨 ANIMATION VARIANTS
//    ===================================================================== */
// const fadeUp = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
// };

// const slideInRight = {
//   hidden: { x: "100%", opacity: 0 },
//   visible: { x: 0, opacity: 1, transition: { type: "spring", damping: 25, stiffness: 200 } },
//   exit: { x: "100%", opacity: 0 }
// };

// const COLORS = ["#8b5cf6", "#10b981", "#f59e0b", "#ef4444", "#3b82f6"];

// /* =====================================================================
//    📝 REUSABLE STAT CARD
//    ===================================================================== */
// const StatCard = ({ label, value, icon: Icon, color, subtext }) => (
//    <motion.div 
//       variants={fadeUp}
//       className="bg-white p-5 rounded-[1.5rem] border border-gray-100 shadow-sm flex items-center justify-between hover:shadow-md transition-all group"
//    >
//       <div>
//          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{label}</p>
//          <h3 className="text-2xl font-extrabold text-gray-900 mt-1">{value}</h3>
//          {subtext && <p className="text-[10px] text-gray-400 mt-1">{subtext}</p>}
//       </div>
//       <div className={`p-3.5 rounded-2xl ${color} group-hover:scale-110 transition-transform`}>
//          <Icon size={22} className="opacity-90"/>
//       </div>
//    </motion.div>
// );

// /* =====================================================================
//    🚀 MAIN COMPONENT
//    ===================================================================== */
// export default function SuperAdminDashboard() {
//   const { superAdmin, logout } = useSuperAdminAuth();
  
//   // -- Tabs & UI State --
//   const [activeTab, setActiveTab] = useState("overview"); 
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [loading, setLoading] = useState(true);
//   const [panelOpen, setPanelOpen] = useState(false);
//   const [panelMode, setPanelMode] = useState(null); // 'kitchen' | 'manager'
  
//   // -- Data State --
//   const [stats, setStats] = useState({});
//   const [kitchens, setKitchens] = useState([]);
//   const [managers, setManagers] = useState([]);
  
//   // -- Filters --
//   const [search, setSearch] = useState("");
//   const [filterState, setFilterState] = useState("All");

//   // -- Forms State --
//   const [kForm, setKForm] = useState({ name: "", address: "", state: "", city: "", pincode: "", rating: "", profitable: false, revenue: "" });
//   const [mForm, setMForm] = useState({ name: "", email: "", phone: "", adharCard: "", panCard: "", kitchenId: "", address: "", username: "" });
  
//   // -- Validation Errors --
//   const [errors, setErrors] = useState({});
//   const [submitting, setSubmitting] = useState(false);

//   // --- 1. LOAD DATA ---
//   const loadData = async () => {
//      setLoading(true);
//      try {
//         const [repRes, kitRes, manRes] = await Promise.all([
//            getReports(),
//            getKitchens(),
//            getManagers()
//         ]);
//         setStats(repRes?.data || {});
//         setKitchens(kitRes?.data || []);
//         setManagers(manRes?.data || []);
//      } catch (e) {
//         toast.error("Failed to load dashboard data");
//      } finally {
//         setLoading(false);
//      }
//   };

//   useEffect(() => { loadData(); }, []);

//   // --- 2. VALIDATION LOGIC ---
//   const validateManager = () => {
//      const newErrors = {};
//      if (!mForm.name.trim()) newErrors.name = "Name is required";
//      if (!mForm.username.trim()) newErrors.username = "Username is required";
//      if (!mForm.email.trim()) newErrors.email = "Email is required";
//      if (!/^\d{10}$/.test(mForm.phone)) newErrors.phone = "Phone must be 10 digits";
//      if (!/^\d{12}$/.test(mForm.adharCard)) newErrors.adharCard = "Aadhar must be 12 digits";
//      if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(mForm.panCard)) newErrors.panCard = "Invalid PAN format (ABCDE1234F)";
//      if (!mForm.kitchenId) newErrors.kitchenId = "Please assign a kitchen";
//      if (!mForm.address.trim()) newErrors.address = "Address is required";
     
//      setErrors(newErrors);
//      return Object.keys(newErrors).length === 0;
//   };

//   const validateKitchen = () => {
//      const newErrors = {};
//      if (!kForm.name.trim()) newErrors.name = "Kitchen name is required";
//      if (!kForm.city.trim()) newErrors.city = "City is required";
//      if (!kForm.state.trim()) newErrors.state = "State is required";
//      if (!/^\d{6}$/.test(kForm.pincode)) newErrors.pincode = "Pincode must be 6 digits";
     
//      setErrors(newErrors);
//      return Object.keys(newErrors).length === 0;
//   };

//   // --- 3. SUBMIT HANDLERS ---
//   const handleCreateKitchen = async () => {
//      if(!validateKitchen()) return;
//      setSubmitting(true);
//      try {
//         await createKitchen({ ...kForm, rating: Number(kForm.rating) || 0, revenue: Number(kForm.revenue) || 0 });
//         toast.success("Kitchen added successfully 🎉");
//         setPanelOpen(false);
//         setKForm({ name: "", address: "", state: "", city: "", pincode: "", rating: "", profitable: false, revenue: "" });
//         loadData();
//      } catch (e) { toast.error("Failed to add kitchen"); }
//      finally { setSubmitting(false); }
//   };

//   const handleCreateManager = async () => {
//      if(!validateManager()) return;
//      setSubmitting(true);
//      try {
//         await createManager({ ...mForm, kitchenId: Number(mForm.kitchenId) });
//         toast.success("Manager assigned successfully 👨‍🍳");
//         setPanelOpen(false);
//         setMForm({ name: "", email: "", phone: "", adharCard: "", panCard: "", kitchenId: "", address: "", username: "" });
//         loadData();
//      } catch (e) { toast.error(e.response?.data?.message || "Failed to add manager"); }
//      finally { setSubmitting(false); }
//   };

//   const handleDelete = async (type, id) => {
//      if(!window.confirm(`Are you sure you want to delete this ${type}?`)) return;
//      try {
//         if(type === 'kitchen') await deleteKitchen(id);
//         else await deleteManager(id);
//         toast.success("Deleted successfully 🗑️");
//         loadData();
//      } catch { toast.error("Delete failed"); }
//   };

//   // --- 4. FILTERS ---
//   const filteredKitchens = useMemo(() => kitchens.filter(k => 
//      (filterState === "All" || k.state === filterState) &&
//      k.name.toLowerCase().includes(search.toLowerCase())
//   ), [kitchens, filterState, search]);

//   const filteredManagers = useMemo(() => managers.filter(m => 
//      m.name.toLowerCase().includes(search.toLowerCase()) || 
//      m.email.toLowerCase().includes(search.toLowerCase())
//   ), [managers, search]);

//   // Chart Data
//   const chartData = kitchens.map(k => ({ name: k.name, revenue: k.revenue || 0 })).sort((a,b) => b.revenue - a.revenue).slice(0, 5);

//   return (
//     <div className="flex min-h-screen bg-[#F8F9FA] font-sans text-slate-800">
      
//       {/* --- SIDEBAR --- */}
//       <motion.aside 
//          initial={{ width: sidebarOpen ? 260 : 80 }} 
//          animate={{ width: sidebarOpen ? 260 : 80 }}
//          className="bg-white border-r border-gray-200 fixed md:sticky top-0 h-screen z-30 flex flex-col shadow-xl"
//       >
//          <div className={`h-20 flex items-center ${sidebarOpen ? "px-6 justify-between" : "justify-center"}`}>
//             <div className="flex items-center gap-3">
//                <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-purple-200">
//                   <ShieldCheck size={20}/>
//                </div>
//                {sidebarOpen && <span className="font-extrabold text-lg text-gray-800 tracking-tight">SuperAdmin</span>}
//             </div>
//             <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1.5 rounded-lg hover:bg-gray-100 hidden md:block">
//                {sidebarOpen ? <X size={18}/> : <Menu size={18}/>}
//             </button>
//          </div>

//          <nav className="flex-1 px-3 py-6 space-y-2">
//             {[
//                { id: 'overview', label: 'Overview', icon: LayoutDashboard },
//                { id: 'kitchens', label: 'Kitchens', icon: UtensilsCrossed },
//                { id: 'managers', label: 'Managers', icon: Users },
//             ].map(item => (
//                <button 
//                   key={item.id}
//                   onClick={() => setActiveTab(item.id)}
//                   className={`flex items-center gap-3 px-3 py-3 rounded-xl w-full transition-all ${activeTab === item.id ? "bg-purple-50 text-purple-700 font-bold" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"}`}
//                >
//                   <item.icon size={20} />
//                   {sidebarOpen && <span>{item.label}</span>}
//                   {activeTab === item.id && sidebarOpen && <ChevronRight size={16} className="ml-auto"/>}
//                </button>
//             ))}
//          </nav>

//          <div className="p-4 border-t border-gray-100">
//             <button onClick={() => { logout(); window.location.href="/superadmin/login"; }} className="flex items-center justify-center gap-2 w-full py-3 bg-red-50 text-red-600 rounded-xl font-bold hover:bg-red-100 transition">
//                <LogOut size={18}/> {sidebarOpen && "Logout"}
//             </button>
//          </div>
//       </motion.aside>

//       {/* --- MAIN CONTENT --- */}
//       <main className="flex-1 p-6 md:p-10 overflow-y-auto h-screen">
         
//          {/* Top Bar */}
//          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
//             <div>
//                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
//                   {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
//                </h1>
//                <p className="text-gray-500 text-sm mt-1">Manage your empire, {superAdmin?.username}</p>
//             </div>
//             <div className="flex gap-3">
//                <button onClick={exportAll} className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2.5 rounded-xl font-bold text-sm shadow-sm hover:bg-gray-50 text-gray-700">
//                   <DownloadCloud size={18}/> Export Report
//                </button>
//                <button onClick={() => { setPanelOpen(true); setPanelMode('manager'); }} className="flex items-center gap-2 bg-purple-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg hover:bg-purple-700 transition">
//                   <Plus size={18}/> Add Manager
//                </button>
//             </div>
//          </div>

//          {/* --- TAB: OVERVIEW --- */}
//          {activeTab === 'overview' && (
//             <motion.div initial="hidden" animate="visible" variants={fadeUp} className="space-y-8">
               
//                {/* Stats Grid */}
//                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//                   <StatCard label="Total Revenue" value="₹2.5M" subtext="+12% this month" icon={TrendingUp} color="bg-green-100 text-green-600" />
//                   <StatCard label="Total Kitchens" value={stats.kitchens || 0} subtext="Active across regions" icon={UtensilsCrossed} color="bg-orange-100 text-orange-600" />
//                   <StatCard label="Managers" value={stats.managers || 0} subtext="Managing operations" icon={Users} color="bg-blue-100 text-blue-600" />
//                   <StatCard label="Regions" value="5" subtext="Expanding fast" icon={MapPin} color="bg-purple-100 text-purple-600" />
//                </div>

//                {/* Charts */}
//                <div className="grid lg:grid-cols-2 gap-8">
//                   <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
//                      <h3 className="font-bold text-lg mb-6">Top Performing Kitchens</h3>
//                      <div className="h-72">
//                         <ResponsiveContainer width="100%" height="100%">
//                            <BarChart data={chartData} layout="vertical">
//                               <XAxis type="number" hide />
//                               <YAxis type="category" dataKey="name" width={100} tick={{fontSize: 12}} />
//                               <Tooltip cursor={{fill: '#f3f4f6'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)'}} />
//                               <Bar dataKey="revenue" fill="#8b5cf6" radius={[0, 4, 4, 0]} barSize={20} />
//                            </BarChart>
//                         </ResponsiveContainer>
//                      </div>
//                   </div>

//                   <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
//                      <h3 className="font-bold text-lg mb-6">Manager Distribution</h3>
//                      <div className="h-72 flex justify-center">
//                         <ResponsiveContainer width="100%" height="100%">
//                            <PieChart>
//                               <Pie data={[{name: 'Active', value: stats.managers}, {name: 'On Leave', value: 2}]} innerRadius={60} outerRadius={80} dataKey="value">
//                                  <Cell fill="#10b981" />
//                                  <Cell fill="#f59e0b" />
//                               </Pie>
//                               <Tooltip />
//                               <Legend verticalAlign="bottom" height={36}/>
//                            </PieChart>
//                         </ResponsiveContainer>
//                      </div>
//                   </div>
//                </div>

//             </motion.div>
//          )}

//          {/* --- TAB: KITCHENS --- */}
//          {activeTab === 'kitchens' && (
//             <motion.div initial="hidden" animate="visible" variants={fadeUp} className="bg-white rounded-[2rem] shadow-sm border border-gray-200 overflow-hidden">
//                <div className="p-5 border-b border-gray-100 flex flex-wrap gap-4 justify-between items-center bg-gray-50/50">
//                   <div className="relative w-full md:w-72">
//                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4"/>
//                      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search kitchens..." className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-100 outline-none transition-all"/>
//                   </div>
//                   <div className="flex gap-2">
//                      <button onClick={() => { setPanelMode('kitchen'); setPanelOpen(true); }} className="bg-gray-900 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-black transition flex items-center gap-2">
//                         <Plus size={14}/> Add Kitchen
//                      </button>
//                   </div>
//                </div>
               
//                <div className="overflow-x-auto">
//                   <table className="w-full text-left text-sm text-gray-600">
//                      <thead className="bg-gray-50 text-xs uppercase font-bold text-gray-400">
//                         <tr>
//                            <th className="px-6 py-4">Name</th>
//                            <th className="px-6 py-4">Location</th>
//                            <th className="px-6 py-4">Status</th>
//                            <th className="px-6 py-4">Revenue</th>
//                            <th className="px-6 py-4 text-right">Action</th>
//                         </tr>
//                      </thead>
//                      <tbody className="divide-y divide-gray-100">
//                         {filteredKitchens.map(k => (
//                            <tr key={k.id} className="hover:bg-gray-50 transition-colors group">
//                               <td className="px-6 py-4 font-bold text-gray-900">{k.name}</td>
//                               <td className="px-6 py-4">{k.city}, {k.state}</td>
//                               <td className="px-6 py-4"><span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${k.profitable ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{k.profitable ? "Profitable" : "Loss"}</span></td>
//                               <td className="px-6 py-4 font-mono font-medium">₹{k.revenue}</td>
//                               <td className="px-6 py-4 text-right">
//                                  <button onClick={() => handleDelete('kitchen', k.id)} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"><Trash2 size={16}/></button>
//                               </td>
//                            </tr>
//                         ))}
//                      </tbody>
//                   </table>
//                </div>
//             </motion.div>
//          )}

//          {/* --- TAB: MANAGERS (WITH FULL DETAILS) --- */}
//          {activeTab === 'managers' && (
//             <motion.div initial="hidden" animate="visible" variants={fadeUp} className="bg-white rounded-[2rem] shadow-sm border border-gray-200 overflow-hidden">
//                <div className="p-5 border-b border-gray-100 flex flex-wrap gap-4 justify-between items-center bg-gray-50/50">
//                   <div className="relative w-full md:w-72">
//                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4"/>
//                      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search managers..." className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-100 outline-none transition-all"/>
//                   </div>
//                   <button onClick={() => { setPanelMode('manager'); setPanelOpen(true); }} className="bg-green-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-green-700 transition flex items-center gap-2">
//                      <Plus size={14}/> Add Manager
//                   </button>
//                </div>
//                <div className="overflow-x-auto">
//                   <table className="w-full text-left text-sm text-gray-600">
//                      <thead className="bg-gray-50 text-xs uppercase font-bold text-gray-400">
//                         <tr>
//                            <th className="px-6 py-4">Manager</th>
//                            <th className="px-6 py-4">Contact</th>
//                            <th className="px-6 py-4">Kitchen ID</th>
//                            <th className="px-6 py-4">Username</th>
//                            <th className="px-6 py-4 text-right">Action</th>
//                         </tr>
//                      </thead>
//                      <tbody className="divide-y divide-gray-100">
//                         {filteredManagers.map(m => (
//                            <tr key={m.id} className="hover:bg-gray-50 transition-colors">
//                               <td className="px-6 py-4">
//                                  <div className="font-bold text-gray-900">{m.name}</div>
//                                  <div className="text-[10px] text-gray-400 font-mono">PAN: {m.panCard}</div>
//                               </td>
//                               <td className="px-6 py-4">
//                                  <div className="flex items-center gap-1"><Phone size={12}/> {m.phone}</div>
//                                  <div className="flex items-center gap-1 text-xs text-gray-400"><Mail size={12}/> {m.email}</div>
//                               </td>
//                               <td className="px-6 py-4"><span className="bg-purple-50 text-purple-700 px-2 py-1 rounded-md text-xs font-bold">#{m.kitchenId}</span></td>
//                               <td className="px-6 py-4 font-mono text-xs">{m.username}</td>
//                               <td className="px-6 py-4 text-right">
//                                  <button onClick={() => handleDelete('manager', m.id)} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"><Trash2 size={16}/></button>
//                               </td>
//                            </tr>
//                         ))}
//                      </tbody>
//                   </table>
//                </div>
//             </motion.div>
//          )}

//       </main>

//       {/* --- SLIDING PANEL (Create Forms) --- */}
//       <AnimatePresence>
//          {panelOpen && (
//             <>
//                <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setPanelOpen(false)} className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"/>
//                <motion.div 
//                   variants={slideInRight} initial="hidden" animate="visible" exit="exit"
//                   className="fixed right-0 top-0 h-full w-full max-w-lg bg-white shadow-2xl z-50 p-0 flex flex-col"
//                >
//                   <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
//                      <h2 className="text-xl font-extrabold text-gray-900">{panelMode === 'kitchen' ? "Add Kitchen" : "Add Manager"}</h2>
//                      <button onClick={() => setPanelOpen(false)} className="p-2 bg-white rounded-full hover:bg-gray-200 border border-gray-200 shadow-sm transition"><X size={20}/></button>
//                   </div>

//                   <div className="p-8 overflow-y-auto flex-1">
//                      {panelMode === 'kitchen' ? (
//                         <div className="space-y-5">
//                            <InputField label="Kitchen Name" value={kForm.name} onChange={e => setKForm({...kForm, name: e.target.value})} placeholder="e.g. Cloud Kitchen Mumbai" error={errors.name} />
//                            <div className="grid grid-cols-2 gap-4">
//                               <InputField label="City" value={kForm.city} onChange={e => setKForm({...kForm, city: e.target.value})} error={errors.city} />
//                               <InputField label="State" value={kForm.state} onChange={e => setKForm({...kForm, state: e.target.value})} error={errors.state} />
//                            </div>
//                            <div className="grid grid-cols-2 gap-4">
//                               <InputField label="Pincode" value={kForm.pincode} onChange={e => setKForm({...kForm, pincode: e.target.value})} error={errors.pincode} />
//                               <InputField label="Revenue" type="number" value={kForm.revenue} onChange={e => setKForm({...kForm, revenue: e.target.value})} />
//                            </div>
//                            <InputField label="Full Address" value={kForm.address} onChange={e => setKForm({...kForm, address: e.target.value})} />
                           
//                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
//                               <input type="checkbox" checked={kForm.profitable} onChange={e => setKForm({...kForm, profitable: e.target.checked})} className="w-5 h-5 accent-purple-600"/>
//                               <label className="text-sm font-semibold text-gray-700">Mark as Profitable Kitchen</label>
//                            </div>

//                            <button onClick={handleCreateKitchen} disabled={submitting} className="w-full bg-purple-600 text-white py-3.5 rounded-xl font-bold mt-4 hover:bg-purple-700 shadow-lg shadow-purple-200 transition disabled:opacity-70">
//                               {submitting ? "Creating..." : "Create Kitchen"}
//                            </button>
//                         </div>
//                      ) : (
//                         <div className="space-y-5">
//                            <div className="grid grid-cols-2 gap-4">
//                               <InputField label="Full Name" value={mForm.name} onChange={e => setMForm({...mForm, name: e.target.value})} icon={<User size={16}/>} error={errors.name} />
//                               <InputField label="Username" value={mForm.username} onChange={e => setMForm({...mForm, username: e.target.value})} error={errors.username} />
//                            </div>

//                            <InputField label="Email Address" type="email" value={mForm.email} onChange={e => setMForm({...mForm, email: e.target.value})} error={errors.email} />
//                            <InputField label="Phone Number" value={mForm.phone} onChange={e => setMForm({...mForm, phone: e.target.value})} placeholder="10-digit number" error={errors.phone} />
                           
//                            <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100 space-y-4">
//                               <h4 className="text-xs font-bold text-blue-600 uppercase tracking-wider flex items-center gap-2"><CreditCard size={14}/> Identity Verification</h4>
//                               <InputField label="Aadhar Card (12 Digits)" value={mForm.adharCard} onChange={e => setMForm({...mForm, adharCard: e.target.value})} placeholder="XXXX XXXX XXXX" error={errors.adharCard} />
//                               <InputField label="PAN Card (10 Chars)" value={mForm.panCard} onChange={e => setMForm({...mForm, panCard: e.target.value.toUpperCase()})} placeholder="ABCDE1234F" error={errors.panCard} />
//                            </div>

//                            <div className="space-y-2">
//                               <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Assign Kitchen</label>
//                               <div className="relative">
//                                  <select 
//                                     value={mForm.kitchenId} 
//                                     onChange={e => setMForm({...mForm, kitchenId: e.target.value})}
//                                     className={`w-full appearance-none px-4 py-3 bg-white border rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-green-100 focus:border-green-500 transition-all ${errors.kitchenId ? "border-red-300" : "border-gray-200"}`}
//                                  >
//                                     <option value="">Select a Kitchen...</option>
//                                     {kitchens.map(k => <option key={k.id} value={k.id}>{k.name} (ID: {k.id})</option>)}
//                                  </select>
//                                  <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 rotate-90 pointer-events-none" size={16}/>
//                               </div>
//                               {errors.kitchenId && <p className="text-xs text-red-500 font-medium">{errors.kitchenId}</p>}
//                            </div>

//                            <InputField label="Manager Address" value={mForm.address} onChange={e => setMForm({...mForm, address: e.target.value})} error={errors.address} />

//                            <button onClick={handleCreateManager} disabled={submitting} className="w-full bg-green-600 text-white py-3.5 rounded-xl font-bold mt-4 hover:bg-green-700 shadow-lg shadow-green-200 transition disabled:opacity-70">
//                               {submitting ? "Assigning..." : "Assign Manager"}
//                            </button>
//                         </div>
//                      )}
//                   </div>
//                </motion.div>
//             </>
//          )}
//       </AnimatePresence>

//     </div>
//   );
// }

// // Helper Input Field with Error Support
// const InputField = ({ label, value, onChange, placeholder, type = "text", error, icon }) => (
//    <div className="space-y-1.5">
//       <div className="flex justify-between">
//          <label className="text-xs font-bold text-gray-500 uppercase tracking-wide flex items-center gap-1">
//             {icon} {label}
//          </label>
//       </div>
//       <input 
//          type={type} 
//          value={value} 
//          onChange={onChange} 
//          placeholder={placeholder}
//          className={`w-full px-4 py-2.5 bg-white border rounded-xl text-sm font-medium outline-none transition-all ${error ? "border-red-300 focus:ring-red-100" : "border-gray-200 focus:ring-purple-100 focus:border-purple-500"}`}
//       />
//       {error && <p className="text-xs text-red-500 font-semibold flex items-center gap-1 animate-pulse"><X size={10}/> {error}</p>}
//    </div>
// );