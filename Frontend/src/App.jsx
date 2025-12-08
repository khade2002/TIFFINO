

// import { Routes, Route } from "react-router-dom";
// import { Toaster } from "react-hot-toast";

// // Components
// import Navbar from "./components/ui/Navbar";
// import Footer from "./components/ui/Footer";
// import ProtectedRoute from "./components/ProtectedRoute";

// // Floating Cart Button (single correct import)
// import FloatingCartButton from "./components/cart/FloatingCartButton";

// // Pages
// import Home from "./pages/Home/Home";
// import Cuisine from "./pages/Cuisine/Cuisine";
// import Cart from "./pages/Cart/Cart";
// import Profile from "./pages/Profile/Profile";
// import Orders from "./pages/Orders/Orders";
// import Subscription from "./pages/Subscription/Subscription";
// import SubscriptionReview from "./pages/Subscription/SubscriptionReview"; // ⭐ NEW
// import About from "./pages/About/About";
// // import OrderDetails from "./pages/Orders/OrderDetails";


// // Auth Pages
// import Login from "./pages/Auth/Login";
// import Signup from "./pages/Auth/Signup";
// import ForgotPassword from "./pages/Auth/ForgotPassword";

// // Payment Pages
// import Checkout from "./pages/Payment/Checkout";
// import Success from "./pages/Payment/Success";

// function App() {
//   return (
//     <>
//       <Navbar />

//       <main className="min-h-[80vh] bg-gray-50 relative">
        
//         {/* ⭐ GLOBAL FLOATING CART BUTTON ⭐ */}
//         <FloatingCartButton />

//         <Routes>
//           {/* PUBLIC ROUTES */}
//           <Route path="/" element={<Home />} />
//           <Route path="/cuisine" element={<Cuisine />} />
//           <Route path="/about" element={<About />} />

//           {/* AUTH */}
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />

//           {/* PROTECTED */}
//           <Route
//             path="/profile"
//             element={
//               <ProtectedRoute>
//                 <Profile />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/cart"
//             element={
//               <ProtectedRoute>
//                 <Cart />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/orders"
//             element={
//               <ProtectedRoute>
//                 <Orders />
//               </ProtectedRoute>
//             }
//           />

//           {/* <Route path="/orders/:id" element={<ProtectedRoute><OrderDetails/></ProtectedRoute>} /> */}


//           <Route
//             path="/subscription"
//             element={
//               <ProtectedRoute>
//                 <Subscription />
//               </ProtectedRoute>
//             }
//           />

//           {/* ⭐ NEW: SUBSCRIPTION REVIEW PAGE ⭐ */}
//           <Route
//             path="/subscription/review/:subscriptionId"
//             element={
//               <ProtectedRoute>
//                 <SubscriptionReview />
//               </ProtectedRoute>
//             }
//           />

//           {/* PAYMENT */}
//           <Route
//             path="/checkout"
//             element={
//               <ProtectedRoute>
//                 <Checkout />
//               </ProtectedRoute>
//             }
//           />

//           <Route path="/success" element={<Success />} />

//           {/* 404 */}
//           <Route
//             path="*"
//             element={
//               <h1 className="text-center text-2xl mt-20 text-red-500">
//                 404 - Page Not Found
//               </h1>
//             }
//           />
//         </Routes>
//       </main>

//       <Footer />

//       {/* GLOBAL TOASTER */}
//       <Toaster
//         position="top-center"
//         toastOptions={{
//           duration: 2500,
//           style: {
//             background: "#333",
//             color: "#fff",
//             borderRadius: "10px",
//             padding: "12px 16px",
//             fontSize: "14px",
//           },
//           success: { style: { background: "#22c55e", color: "#fff" } },
//           error: { style: { background: "#ef4444", color: "#fff" } },
//         }}
//       />
//     </>
//   );
// }

// export default App;




// import { Routes, Route, useLocation } from "react-router-dom";
// import { Toaster } from "react-hot-toast";

// // USER Components
// import Navbar from "./components/ui/Navbar";
// import Footer from "./components/ui/Footer";
// import ProtectedRoute from "./components/ProtectedRoute";
// import FloatingCartButton from "./components/cart/FloatingCartButton";

// // USER Pages
// import Home from "./pages/Home/Home";
// import Cuisine from "./pages/Cuisine/Cuisine";
// import Cart from "./pages/Cart/Cart";
// import Profile from "./pages/Profile/Profile";
// import Orders from "./pages/Orders/Orders";
// import Subscription from "./pages/Subscription/Subscription";
// import SubscriptionReview from "./pages/Subscription/SubscriptionReview";
// import About from "./pages/About/About";

// import Login from "./pages/Auth/Login";
// import Signup from "./pages/Auth/Signup";
// import ForgotPassword from "./pages/Auth/ForgotPassword";

// import Checkout from "./pages/Payment/Checkout";
// import Success from "./pages/Payment/Success";

// // SUPERADMIN PAGES
// import SuperAdminLogin from "./superadmin/pages/SuperAdminLogin";
// import SuperAdminDashboard from "./superadmin/pages/SuperAdminDashboard";

// // SUPERADMIN PRIVATE ROUTE
// import SuperAdminPrivateRoute from "./superadmin/context/SuperAdminPrivateRoute";

// export default function App() {
//   const location = useLocation();

//   // HIDE USER NAVBAR/FOOTER FOR ADMIN + SUPERADMIN
//   const hideLayout =
//     location.pathname.startsWith("/superadmin") ||
//     location.pathname.startsWith("/admin");

//   return (
//     <>
//       {!hideLayout && <Navbar />}

//       <main
//         className={`${
//           hideLayout ? "" : "min-h-[80vh] bg-gray-50 relative"
//         }`}
//       >
//         {!hideLayout && <FloatingCartButton />}

//         <Routes>
//           {/* ----------------- SUPERADMIN ROUTES ----------------- */}
//           <Route path="/superadmin/login" element={<SuperAdminLogin />} />

//           <Route
//             path="/superadmin/dashboard"
//             element={
//               <SuperAdminPrivateRoute>
//                 <SuperAdminDashboard />
//               </SuperAdminPrivateRoute>
//             }
//           />

//           {/* ----------------- USER PUBLIC ROUTES ----------------- */}
//           <Route path="/" element={<Home />} />
//           <Route path="/cuisine" element={<Cuisine />} />
//           <Route path="/about" element={<About />} />

//           {/* USER AUTH */}
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />

//           {/* ----------------- USER PROTECTED ROUTES ----------------- */}
//           <Route
//             path="/profile"
//             element={
//               <ProtectedRoute>
//                 <Profile />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/cart"
//             element={
//               <ProtectedRoute>
//                 <Cart />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/orders"
//             element={
//               <ProtectedRoute>
//                 <Orders />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/subscription"
//             element={
//               <ProtectedRoute>
//                 <Subscription />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/subscription/review/:subscriptionId"
//             element={
//               <ProtectedRoute>
//                 <SubscriptionReview />
//               </ProtectedRoute>
//             }
//           />

//           {/* PAYMENT */}
//           <Route
//             path="/checkout"
//             element={
//               <ProtectedRoute>
//                 <Checkout />
//               </ProtectedRoute>
//             }
//           />

//           <Route path="/success" element={<Success />} />

//           {/* 404 */}
//           <Route
//             path="*"
//             element={
//               <h1 className="text-center text-2xl mt-20 text-red-500">
//                 404 - Page Not Found
//               </h1>
//             }
//           />
//         </Routes>
//       </main>

//       {!hideLayout && <Footer />}

//       {/* TOASTER */}
//       <Toaster
//         position="top-center"
//         toastOptions={{
//           duration: 2500,
//           style: {
//             background: "#333",
//             color: "#fff",
//             borderRadius: "10px",
//             padding: "12px 16px",
//             fontSize: "14px",
//           },
//           success: { style: { background: "#22c55e", color: "#fff" } },
//           error: { style: { background: "#ef4444", color: "#fff" } },
//         }}
//       />
//     </>
//   );
// }


// import { Routes, Route, useLocation } from "react-router-dom";
// import { Toaster } from "react-hot-toast";

// // USER Components
// import Navbar from "./components/ui/Navbar";
// import Footer from "./components/ui/Footer";
// import ProtectedRoute from "./components/ProtectedRoute";
// import FloatingCartButton from "./components/cart/FloatingCartButton";

// // USER Pages
// import Home from "./pages/Home/Home";
// import Cuisine from "./pages/Cuisine/Cuisine";
// import Cart from "./pages/Cart/Cart";
// import Profile from "./pages/Profile/Profile";
// import Orders from "./pages/Orders/Orders";
// import Subscription from "./pages/Subscription/Subscription";
// import SubscriptionReview from "./pages/Subscription/SubscriptionReview";
// import About from "./pages/About/About";

// import Login from "./pages/Auth/Login";
// import Signup from "./pages/Auth/Signup";
// import ForgotPassword from "./pages/Auth/ForgotPassword";

// import Checkout from "./pages/Payment/Checkout";
// import Success from "./pages/Payment/Success";

// // SUPERADMIN
// import SuperAdminLogin from "./superadmin/pages/SuperAdminLogin";
// import SuperAdminDashboard from "./superadmin/pages/SuperAdminDashboard";
// import SuperAdminPrivateRoute from "./superadmin/context/SuperAdminPrivateRoute";

// export default function App() {
//   const location = useLocation();

//   // Hide Layout for SuperAdmin ONLY
//   const hideLayout =
//     location.pathname.startsWith("/superadmin");

//   return (
//     <>
//       {!hideLayout && <Navbar />}

//       <main className={`${hideLayout ? "" : "min-h-[80vh] bg-gray-50 relative"}`}>
//         {!hideLayout && <FloatingCartButton />}

//         <Routes>

//           {/* ================================= SUPERADMIN ================================= */}
//           <Route path="/superadmin/login" element={<SuperAdminLogin />} />

//           <Route
//             path="/superadmin/dashboard"
//             element={
//               <SuperAdminPrivateRoute>
//                 <SuperAdminDashboard />
//               </SuperAdminPrivateRoute>
//             }
//           />

//           {/* ================================= USER PUBLIC ================================= */}
//           <Route path="/" element={<Home />} />
//           <Route path="/cuisine" element={<Cuisine />} />
//           <Route path="/about" element={<About />} />

//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />

//           {/* ================================= USER PROTECTED ================================= */}
//           <Route
//             path="/profile"
//             element={
//               <ProtectedRoute>
//                 <Profile />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/cart"
//             element={
//               <ProtectedRoute>
//                 <Cart />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/orders"
//             element={
//               <ProtectedRoute>
//                 <Orders />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/subscription"
//             element={
//               <ProtectedRoute>
//                 <Subscription />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/subscription/review/:subscriptionId"
//             element={
//               <ProtectedRoute>
//                 <SubscriptionReview />
//               </ProtectedRoute>
//             }
//           />

//           {/* PAYMENT */}
//           <Route
//             path="/checkout"
//             element={
//               <ProtectedRoute>
//                 <Checkout />
//               </ProtectedRoute>
//             }
//           />

//           <Route path="/success" element={<Success />} />

//           {/* 404 */}
//           <Route
//             path="*"
//             element={
//               <h1 className="text-center text-2xl mt-20 text-red-500">
//                 404 - Page Not Found
//               </h1>
//             }
//           />
//         </Routes>
//       </main>

//       {!hideLayout && <Footer />}

//       {/* Toaster */}
//       <Toaster
//         position="top-center"
//         toastOptions={{
//           duration: 2500,
//           style: {
//             background: "#333",
//             color: "#fff",
//             borderRadius: "10px",
//             padding: "12px 16px",
//             fontSize: "14px",
//           },
//           success: { style: { background: "#22c55e", color: "#fff" } },
//           error: { style: { background: "#ef4444", color: "#fff" } },
//         }}
//       />
//     </>
//   );
// }




// The updates

import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// USER Components
import Navbar from "./components/ui/Navbar";
import Footer from "./components/ui/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import FloatingCartButton from "./components/cart/FloatingCartButton";

// USER Pages
import Home from "./pages/Home/Home";
import Cuisine from "./pages/Cuisine/Cuisine";
import Cart from "./pages/Cart/Cart";
import Profile from "./pages/Profile/Profile";
import Orders from "./pages/Orders/Orders";
import Subscription from "./pages/Subscription/Subscription";
import SubscriptionReview from "./pages/Subscription/SubscriptionReview";
import About from "./pages/About/About";

import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import ForgotPassword from "./pages/Auth/ForgotPassword";

import Checkout from "./pages/Payment/Checkout";
import Success from "./pages/Payment/Success";

// SUPERADMIN
import SuperAdminLogin from "./superadmin/pages/SuperAdminLogin";
import SuperAdminDashboard from "./superadmin/pages/SuperAdminDashboard";
import SuperAdminPrivateRoute from "./superadmin/context/SuperAdminPrivateRoute";

// ADMIN
import AdminPrivateRoute from "./admin/context/AdminPrivateRoute";
import AdminLogin from "./admin/pages/AdminLogin";
import AdminForgotPassword from "./admin/pages/AdminForgotPassword";
import AdminFirstReset from "./admin/pages/AdminFirstReset";
import AdminResetPassword from "./admin/pages/AdminResetPassword";

// ⭐ NEW — Admin Layout Wrapper
import AdminLayout from "./admin/layout/AdminLayout";

// Admin Pages
import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminMenu from "./admin/pages/AdminMenu";
import AdminOrders from "./admin/pages/AdminOrders";
import  adminAssignDeliveryPartner  from "./api/api";
import AdminReviews from "./admin/pages/AdminReviews";
import AdminReports from "./admin/pages/AdminReports";
import AdminSubscription from "./admin/pages/AdminSubscription";
// import AdminDeliveryPartners from "./admin/pages/AdminDeliveryPartners";

export default function App() {
  const location = useLocation();

  // ⭐ Hide user layout (Navbar/Footer) on admin + superadmin
  const hideLayout =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/superadmin");

  return (
    <>
      {!hideLayout && <Navbar />}

      <main className={`${hideLayout ? "" : "min-h-[80vh] bg-gray-50 relative"}`}>
        {!hideLayout && <FloatingCartButton />}

        <Routes>

          {/* ================= SUPERADMIN ================= */}
          <Route path="/superadmin/login" element={<SuperAdminLogin />} />

          <Route
            path="/superadmin/dashboard"
            element={
              <SuperAdminPrivateRoute>
                <SuperAdminDashboard />
              </SuperAdminPrivateRoute>
            }
          />

          {/* ================= ADMIN (NO SIDEBAR) ================= */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/forgot-password" element={<AdminForgotPassword />} />
          <Route path="/admin/first-reset" element={<AdminFirstReset />} />

          <Route
            path="/admin/reset-password"
            element={
              <AdminPrivateRoute>
                <AdminResetPassword />
              </AdminPrivateRoute>
            }
          />

          {/* ========== ADMIN PANEL WITH SIDEBAR (AdminLayout WRAPPER) ========== */}
          <Route
            path="/admin"
            element={
              <AdminPrivateRoute>
                <AdminLayout />
              </AdminPrivateRoute>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="menu" element={<AdminMenu />} />
            <Route path="orders" element={<AdminOrders />} />
             {/* <Route path="delivery-partners" element={<AdminDeliveryPartners />} /> */}

            <Route path="subscriptions" element={<AdminSubscription />} />
            <Route path="reviews" element={<AdminReviews />} />
            <Route path="reports" element={<AdminReports />} />
          </Route>

          {/* ================= USER PUBLIC ROUTES ================= */}
          <Route path="/" element={<Home />} />
          <Route path="/cuisine" element={<Cuisine />} />
          <Route path="/about" element={<About />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* ================= USER PROTECTED ROUTES ================= */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />

          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />

          <Route
            path="/subscription"
            element={
              <ProtectedRoute>
                <Subscription />
              </ProtectedRoute>
            }
          />

          <Route
            path="/subscription/review/:subscriptionId"
            element={
              <ProtectedRoute>
                <SubscriptionReview />
              </ProtectedRoute>
            }
          />

          {/* PAYMENT */}
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route path="/success" element={<Success />} />

          {/* 404 */}
          <Route
            path="*"
            element={
              <h1 className="text-center text-2xl mt-20 text-red-500">
                404 - Page Not Found
              </h1>
            }
          />
        </Routes>
      </main>

      {!hideLayout && <Footer />}

      {/* TOAST */}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2500,
          style: {
            background: "#333",
            color: "#fff",
            borderRadius: "10px",
            padding: "12px 16px",
            fontSize: "14px",
          },
          success: { style: { background: "#22c55e", color: "#fff" } },
          error: { style: { background: "#ef4444", color: "#fff" } },
        }}
      />
    </>
  );
}
