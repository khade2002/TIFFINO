// ==========================================================
// src/superadmin/context/SuperAdminAuthContext.jsx
// FINAL - PERFECTLY COMPATIBLE WITH UPDATED api.js
// ==========================================================

import { createContext, useContext, useEffect, useState } from "react";
import { superLogin, superLogout } from "../../api/api";
import toast from "react-hot-toast";

const SuperAdminAuthContext = createContext();

// TOKEN KEY (matches api.js)
const SUPER_TOKEN = "super_token";

export const SuperAdminAuthProvider = ({ children }) => {
  const [superAdmin, setSuperAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  // ----------------------------------------------------------
  // CHECK LOGIN ON PAGE REFRESH (Stable)
  // ----------------------------------------------------------
  useEffect(() => {
    const token = localStorage.getItem(SUPER_TOKEN);

    if (token) {
      // Try extracting username from JWT payload
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setSuperAdmin({ username: payload.sub || "superadmin" });
      } catch {
        setSuperAdmin({ username: "superadmin" });
      }
    }

    setLoading(false);
  }, []);

  // ----------------------------------------------------------
  // LOGIN
  // ----------------------------------------------------------
  const login = async ({ username, password }) => {
    try {
      const res = await superLogin({ username, password });

      let token = null;

      // Case 1: JSON response { token: "..." }
      if (res?.data?.token) {
        token = res.data.token;
      }

      // Case 2: Raw token string
      else if (typeof res.data === "string") {
        try {
          const parsed = JSON.parse(res.data);
          token = parsed.token || res.data.trim();
        } catch {
          token = res.data.trim();
        }
      }

      if (!token) {
        toast.error("Invalid credentials");
        return false;
      }

      // Save the token for future API requests
      localStorage.setItem(SUPER_TOKEN, token);

      // Decode username
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setSuperAdmin({ username: payload.sub });
      } catch {
        setSuperAdmin({ username });
      }

      toast.success("SuperAdmin logged in 🚀");
      return true;
    } catch (error) {
      toast.error(
        error?.response?.data?.error ||
          error?.response?.data ||
          "Login failed."
      );
      return false;
    }
  };

  // ----------------------------------------------------------
  // LOGOUT
  // ----------------------------------------------------------
  const logout = async () => {
    try {
      await superLogout(); // optional backend logout
    } catch {}

    localStorage.removeItem(SUPER_TOKEN);
    setSuperAdmin(null);

    toast.success("Logged out");
    window.location.replace("/superadmin/login");
  };

  return (
    <SuperAdminAuthContext.Provider
      value={{
        superAdmin,
        loading,
        login,
        logout,
        isAuthenticated: !!superAdmin,
      }}
    >
      {children}
    </SuperAdminAuthContext.Provider>
  );
};

export const useSuperAdminAuth = () =>
  useContext(SuperAdminAuthContext);
