// ==========================================================
// src/superadmin/context/SuperAdminPrivateRoute.jsx
// FINAL VERSION (Matches updated AuthContext + API)
// ==========================================================

import { Navigate } from "react-router-dom";
import { useSuperAdminAuth } from "./SuperAdminAuthContext";
import { motion } from "framer-motion";

export default function SuperAdminPrivateRoute({ children }) {
  const { isAuthenticated, loading } = useSuperAdminAuth();

  // ---------------------------------------------------------
  // SHOW LOADING SCREEN WHILE AUTH IS CHECKING
  // ---------------------------------------------------------
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35 }}
          className="text-lg font-medium text-gray-700"
        >
          Checking Authentication...
        </motion.div>
      </div>
    );
  }

  // ---------------------------------------------------------
  // NOT LOGGED IN → REDIRECT SAFELY
  // ---------------------------------------------------------
  if (!isAuthenticated) {
    return <Navigate to="/superadmin/login" replace />;
  }

  // ---------------------------------------------------------
  // AUTHENTICATED → Render original component
  // ---------------------------------------------------------
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      {children}
    </motion.div>
  );
}
