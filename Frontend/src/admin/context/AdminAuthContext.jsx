// src/admin/context/AdminAuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { adminLogin, adminLogout } from "../../api/api";

const AdminAuthContext = createContext();

export const ADMIN_TOKEN_KEY = "admin_token";
export const ADMIN_FIRST_RESET_KEY = "admin_first_reset_done";
export const ADMIN_LAST_PWD_KEY = "admin_last_password";
export const ADMIN_EMAIL_KEY = "admin_email";

export function AdminAuthProvider({ children }) {
  const [admin, setAdmin] = useState(null); // { email }
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem(ADMIN_TOKEN_KEY);
    const email = localStorage.getItem(ADMIN_EMAIL_KEY);
    if (token && email) setAdmin({ email });
    setLoading(false);
  }, []);

  // login(email,password) -> calls API -> stores token & session pwd
  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await adminLogin({ email, password });

      // adminLogin may have saved token already in api.js.
      // verify token present (try multiple shapes)
      let token = localStorage.getItem(ADMIN_TOKEN_KEY);
      // if not stored by api.js, try parse from res
      if (!token) {
        try {
          const maybeStr = res?.data;
          if (typeof maybeStr === "string") {
            const parsed = JSON.parse(maybeStr);
            token = parsed?.token;
            if (token) localStorage.setItem(ADMIN_TOKEN_KEY, token);
          } else if (maybeStr?.token) {
            token = maybeStr.token;
            localStorage.setItem(ADMIN_TOKEN_KEY, token);
          }
        } catch (err) {
          // ignore
        }
      }

      if (!token) {
        toast.error("Login failed: token missing");
        setLoading(false);
        return { ok: false };
      }

      // Persist email and save last password in sessionStorage
      localStorage.setItem(ADMIN_EMAIL_KEY, email);
      try {
        sessionStorage.setItem(ADMIN_LAST_PWD_KEY, password);
      } catch (e) {}

      setAdmin({ email });

      // Determine if first-reset done
      const firstResetDone = localStorage.getItem(ADMIN_FIRST_RESET_KEY) === "true";
      setLoading(false);
      return { ok: true, firstResetDone };
    } catch (err) {
      const msg = err?.response?.data || err?.message || "Login failed";
      toast.error(msg);
      setLoading(false);
      return { ok: false, error: msg };
    }
  };

  const logout = async () => {
    try {
      await adminLogout();
    } catch {}
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    localStorage.removeItem(ADMIN_EMAIL_KEY);
    sessionStorage.removeItem(ADMIN_LAST_PWD_KEY);
    setAdmin(null);
    toast.success("Logged out");
    navigate("/admin/login", { replace: true });
  };

  const markFirstResetDone = () => {
    localStorage.setItem(ADMIN_FIRST_RESET_KEY, "true");
    try {
      sessionStorage.removeItem(ADMIN_LAST_PWD_KEY);
    } catch {}
  };

  return (
    <AdminAuthContext.Provider
      value={{
        admin,
        loading,
        login,
        logout,
        markFirstResetDone,
        isAuthenticated: !!admin,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  return useContext(AdminAuthContext);
}
