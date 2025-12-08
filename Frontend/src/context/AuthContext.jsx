// // src/context/AuthContext.jsx
// import { createContext, useContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// import {
//   loginUser,
//   logoutUser,
//   resetPassword,
//   getUserByEmail,
// } from "../api/api";

// import { jwtDecode } from "jwt-decode";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const navigate = useNavigate();

//   const [token, setToken] = useState(localStorage.getItem("token") || null);
//   const [loading, setLoading] = useState(false);
//   const [initialized, setInitialized] = useState(false);

//   const [user, setUser] = useState(null); // 🟢 store logged user data

//   // -----------------------------------------------------
//   // 🟢 LOGIN (returns valid JWT only)
//   // -----------------------------------------------------
//   const login = async ({ email, password }) => {
//     try {
//       setLoading(true);

//       const res = await loginUser({ email, password });
//       const raw = res.data;

//       // Accept only valid JWT token
//       const jwt = typeof raw === "string" && raw.startsWith("eyJ") ? raw : null;

//       if (!jwt) {
//         toast.error("Invalid email or password ❌");
//         return false;
//       }

//       // Save token
//       localStorage.setItem("token", jwt);
//       setToken(jwt);

//       toast.success("Login successful 🎉");

//       // Fetch user profile
//       await fetchUserFromToken(jwt);

//       return true;
//     } catch (err) {
//       toast.error(err?.response?.data || "Login failed ❌");
//       return false;
//     } finally {
//       setLoading(false);
//     }
//   };

//   // -----------------------------------------------------
//   // 🟢 LOGOUT (invalidate token + clear info)
//   // -----------------------------------------------------
//   const logout = async () => {
//     try {
//       await logoutUser();
//     } catch {
//       console.warn("Logout API failed (ignored)");
//     }

//     localStorage.removeItem("token");
//     setToken(null);
//     setUser(null);

//     toast.success("Logged out successfully");
//     navigate("/login");
//   };

//   // -----------------------------------------------------
//   // 🟢 RESET PASSWORD
//   // -----------------------------------------------------
//   const handleResetPassword = async (email, otp, newPassword) => {
//     try {
//       setLoading(true);

//       const res = await resetPassword({ email, otp, newPassword });
//       toast.success(res?.data || "Password reset successful");

//       navigate("/login");
//     } catch (err) {
//       toast.error(err?.response?.data || "Reset failed ❌");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // -----------------------------------------------------
//   // 🟢 Fetch user from JWT token (email extract)
//   // -----------------------------------------------------
//   const fetchUserFromToken = async (jwt) => {
//     try {
//       const decoded = jwtDecode(jwt);
//       const email = decoded?.sub;

//       if (!email) return;

//       const res = await getUserByEmail(email);
//       setUser(res.data);
//     } catch (err) {
//       console.warn("Failed fetching user profile");
//     }
//   };

//   // -----------------------------------------------------
//   // 🟢 AUTO LOGIN on page refresh
//   // -----------------------------------------------------
//   useEffect(() => {
//     const savedToken = localStorage.getItem("token");

//     if (savedToken && savedToken.startsWith("eyJ")) {
//       setToken(savedToken);
//       fetchUserFromToken(savedToken);
//     } else {
//       localStorage.removeItem("token");
//     }

//     setInitialized(true);
//   }, []);

//   if (!initialized) return null;

//   return (
//     <AuthContext.Provider
//       value={{
//         token,
//         user,          // 🟢 full logged user data
//         isAuthenticated: !!token,
//         loading,
//         login,
//         logout,
//         handleResetPassword,
//         fetchUserFromToken,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  loginUser,
  logoutUser,
  resetPassword,
  getUserByEmail,
} from "../api/api";

import API from "../api/api";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);

  /* ----------------------------------------------
     FETCH USER FROM TOKEN   (SAFE VERSION)
  ------------------------------------------------*/
  const fetchUserFromToken = async (jwtValue) => {
    if (!jwtValue) return false;

    try {
      const decoded = jwtDecode(jwtValue);
      const email = decoded?.sub || decoded?.email;
      if (!email) throw new Error("Invalid token payload");

      const res = await getUserByEmail(email);
      const u = res?.data;
      if (!u) throw new Error("User not found");

      setUser(u);
      return true;
    } catch (err) {
      console.warn("fetchUserFromToken failed:", err?.message || err);
      // ⚠ DO NOT REMOVE TOKEN HERE
      return false;
    }
  };

  /* ----------------------------------------------
     LOGIN USER
  ------------------------------------------------*/
  const login = async ({ email, password }) => {
    setLoading(true);
    try {
      const res = await loginUser({ email, password });

      const raw = res.data;
      const jwt =
        typeof raw === "string" && raw.startsWith("eyJ") ? raw : null;

      if (!jwt) {
        toast.error("Invalid email or password ❌");
        return false;
      }

      // Save Token
      localStorage.setItem("token", jwt);
      setToken(jwt);
      API.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

      // Background fetch user (NON-BLOCKING)
      fetchUserFromToken(jwt);

      toast.success("Login successful 🎉");
      return true;
    } catch (err) {
      toast.error(err?.response?.data || "Login failed ❌");
      return false;
    } finally {
      setLoading(false);
    }
  };

  /* ----------------------------------------------
     LOGOUT (SAFE CLEAR)
  ------------------------------------------------*/
  const logout = async () => {
    try {
      await logoutUser();
    } catch {}

    try {
      localStorage.removeItem("token");
      delete API.defaults.headers.common["Authorization"];
    } catch {}

    setToken(null);
    setUser(null);

    toast.success("Logged out successfully");
    navigate("/login", { replace: true });
  };

  /* ----------------------------------------------
     RESET PASSWORD FLOW
  ------------------------------------------------*/
  const handleResetPassword = async (email, otp, newPassword) => {
    try {
      setLoading(true);
      const res = await resetPassword({ email, otp, newPassword });
      toast.success(res?.data || "Password reset successful");
      navigate("/login");
    } catch (err) {
      toast.error(err?.response?.data || "Reset failed ❌");
    } finally {
      setLoading(false);
    }
  };

  /* ----------------------------------------------
     INITIALIZE AUTH STATE ON APP LOAD
  ------------------------------------------------*/
  useEffect(() => {
    let mounted = true;

    async function init() {
      const saved = localStorage.getItem("token");

      if (saved && saved.startsWith("eyJ")) {
        API.defaults.headers.common["Authorization"] = `Bearer ${saved}`;
        fetchUserFromToken(saved); // background
        if (mounted) setToken(saved);
      } else {
        localStorage.removeItem("token");
        try {
          delete API.defaults.headers.common["Authorization"];
        } catch {}
      }

      if (mounted) setInitialized(true);
    }

    init();
    return () => {
      mounted = false;
    };
  }, []);

  if (!initialized) return null;

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: !!token,
        loading,
        login,
        logout,
        handleResetPassword,
        fetchUserFromToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
