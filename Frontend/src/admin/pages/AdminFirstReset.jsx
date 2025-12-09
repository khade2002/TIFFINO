// src/admin/pages/AdminFirstReset.jsx

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Lock, ShieldCheck, ArrowLeft, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { adminResetPassword } from "../../api/api";
import { useAdminAuth, ADMIN_LAST_PWD_KEY } from "../context/AdminAuthContext";

export default function AdminFirstReset() {
  const { admin, markFirstResetDone } = useAdminAuth();
  const nav = useNavigate();

  const [form, setForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [showPwd1, setShowPwd1] = useState(false);
  const [showPwd2, setShowPwd2] = useState(false);

  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!admin?.email) nav("/admin/login");
  }, [admin]);

  const submit = async (e) => {
    e.preventDefault();

    if (!form.newPassword || !form.confirmPassword)
      return toast.error("Please fill both fields");

    if (form.newPassword !== form.confirmPassword)
      return toast.error("Passwords do not match");

    const oldPassword = sessionStorage.getItem(ADMIN_LAST_PWD_KEY);
    if (!oldPassword) {
      toast.error("Session expired — please login again");
      return nav("/admin/login");
    }

    setBusy(true);
    try {
      await adminResetPassword({
        oldPassword,
        newPassword: form.newPassword,
        confirmPassword: form.confirmPassword,
      });

      toast.success("Password reset successful");
      markFirstResetDone();
      nav("/admin/dashboard", { replace: true });
    } catch (err) {
      toast.error(err?.response?.data || "Reset failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-red-50/40 to-gray-50/60 px-4">

      {/* Floating Red Blobs */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-[#E23744]/20 rounded-full blur-3xl"
        animate={{ y: [0, -30, 0], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-16 right-10 w-72 h-72 bg-[#E23744]/25 rounded-full blur-3xl"
        animate={{ y: [0, 40, 0], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      {/* FORM CONTAINER */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="
          w-full max-w-md 
          bg-white/70 backdrop-blur-2xl 
          border border-white/40 shadow-2xl 
          rounded-3xl p-8 relative z-10
        "
      >
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <div className="rounded-full px-4 py-2 text-white bg-[#E23744] font-medium shadow-lg flex items-center gap-2 text-sm">
            <ShieldCheck className="w-4 h-4" />
            Admin Security
          </div>
        </div>

        <h2 className="text-2xl font-extrabold text-center text-gray-900">
          Create a New Password
        </h2>

        <p className="text-center text-gray-600 text-sm mt-1 mb-6">
          You logged in using a temporary password.
          <br />
          For security, please create a new one.
        </p>

        <form onSubmit={submit} className="space-y-5">

          {/* New Password */}
          <div>
            <label className="text-sm font-semibold text-gray-700">
              New Password
            </label>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type={showPwd1 ? "text" : "password"}
                value={form.newPassword}
                placeholder="Enter new password"
                onChange={(e) =>
                  setForm({ ...form, newPassword: e.target.value })
                }
                className="
                  w-full pl-10 pr-12 py-3 
                  bg-white/60 backdrop-blur-xl 
                  border border-gray-300 
                  rounded-xl 
                  focus:ring-2 focus:ring-[#E23744]
                  outline-none
                  transition
                "
              />

              <button
                type="button"
                onClick={() => setShowPwd1(!showPwd1)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showPwd1 ? (
                  <EyeOff className="text-gray-600" />
                ) : (
                  <Eye className="text-gray-600" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Confirm Password
            </label>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type={showPwd2 ? "text" : "password"}
                value={form.confirmPassword}
                placeholder="Confirm new password"
                onChange={(e) =>
                  setForm({ ...form, confirmPassword: e.target.value })
                }
                className="
                  w-full pl-10 pr-12 py-3 
                  bg-white/60 backdrop-blur-xl 
                  border border-gray-300 
                  rounded-xl 
                  focus:ring-2 focus:ring-[#E23744]
                  outline-none
                  transition
                "
              />

              <button
                type="button"
                onClick={() => setShowPwd2(!showPwd2)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showPwd2 ? (
                  <EyeOff className="text-gray-600" />
                ) : (
                  <Eye className="text-gray-600" />
                )}
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            {/* Save */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              disabled={busy}
              className="
                flex-1 py-3 rounded-xl font-semibold text-white 
                bg-[#E23744] shadow-lg hover:shadow-[#E23744]/40 transition
              "
            >
              {busy ? "Saving..." : "Save & Continue"}
            </motion.button>

            {/* Cancel */}
            <motion.button
              type="button"
              whileTap={{ scale: 0.96 }}
              onClick={() => nav("/admin/login")}
              className="
                px-4 py-3 rounded-xl 
                border bg-white font-medium 
                flex items-center gap-2 text-gray-700 
                shadow-sm hover:bg-gray-50 transition
              "
            >
              <ArrowLeft className="w-4 h-4" />
              Cancel
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}


