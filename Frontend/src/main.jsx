// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./App.jsx";

// // Context imports
// import { CartProvider } from "./context/CartContext";
// import { AuthProvider } from "./context/AuthContext";

// // ✅ Import Router here
// import { BrowserRouter as Router } from "react-router-dom";

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <Router>
//       <AuthProvider>
//         <CartProvider>
//           <App />
//         </CartProvider>
//       </AuthProvider>
//     </Router>
//   </StrictMode>
// );




// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./App.jsx";

// import { BrowserRouter } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";
// import { CartProvider } from "./context/CartContext";

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <BrowserRouter>
//       <AuthProvider>
//         <CartProvider>
//           <App />
//         </CartProvider>
//       </AuthProvider>
//     </BrowserRouter>
//   </StrictMode>
// );




// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./App.jsx";

// import { BrowserRouter } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext"; // User Auth
// import { SuperAdminAuthProvider } from "./superadmin/context/SuperAdminAuthContext"; // NEW
// import { CartProvider } from "./context/CartContext";

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <BrowserRouter>
//       <SuperAdminAuthProvider>       {/* ⭐ Super Admin */}
//         <AuthProvider>              {/* ⭐ User Login */}
//           <CartProvider>            {/* ⭐ User Cart */}
//             <App />
//           </CartProvider>
//         </AuthProvider>
//       </SuperAdminAuthProvider>
//     </BrowserRouter>
//   </StrictMode>
// );


// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./App.jsx";

// import { BrowserRouter } from "react-router-dom";

// // CONTEXT PROVIDERS
// import { AuthProvider } from "./context/AuthContext";       // User Auth
// import { SuperAdminAuthProvider } from "./superadmin/context/SuperAdminAuthContext";
// import { CartProvider } from "./context/CartContext";

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <BrowserRouter>
//       <SuperAdminAuthProvider>       {/* ⭐ Super Admin */}
//         <AuthProvider>               {/* ⭐ User Auth */}
//           <CartProvider>             {/* ⭐ User Cart */}
//             <App />
//           </CartProvider>
//         </AuthProvider>
//       </SuperAdminAuthProvider>
//     </BrowserRouter>
//   </StrictMode>
// );


// the update

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { BrowserRouter } from "react-router-dom";

// CONTEXT PROVIDERS
import { AuthProvider } from "./context/AuthContext";                 // User Auth
import { SuperAdminAuthProvider } from "./superadmin/context/SuperAdminAuthContext";
import { AdminAuthProvider } from "./admin/context/AdminAuthContext"; // ⭐ Admin Auth
import { CartProvider } from "./context/CartContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <SuperAdminAuthProvider>      {/* ⭐ Super Admin Auth */}
        <AdminAuthProvider>         {/* ⭐ Admin Auth */}
          <AuthProvider>            {/* ⭐ User Auth */}
            <CartProvider>          {/* ⭐ User Cart */}
              <App />
            </CartProvider>
          </AuthProvider>
        </AdminAuthProvider>
      </SuperAdminAuthProvider>
    </BrowserRouter>
  </StrictMode>
);
