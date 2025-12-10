// // src/api/api.js
// import axios from "axios";

// // ========================
// // AXIOS INSTANCE
// // ========================
// const API = axios.create({
//   baseURL: "http://localhost:9090",
//   withCredentials: false,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // ========================
// // REQUEST INTERCEPTOR
// // ========================
// API.interceptors.request.use(
//   (config) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (token) {
//         config.headers = config.headers || {};
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//     } catch (err) {}
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // ========================
// // RESPONSE INTERCEPTOR
// // ========================
// API.interceptors.response.use(
//   (res) => res,
//   (error) => {
//     const status = error?.response?.status;

//     if (status === 401) {
//       try {
//         localStorage.removeItem("token");
//         delete API.defaults.headers.common["Authorization"];
//       } catch (err) {}

//       try {
//         if (window.location.pathname !== "/login") {
//           window.location.replace("/login");
//         }
//       } catch (err) {}
//     }
//     return Promise.reject(error);
//   }
// );

// // =====================================================================
// // ======================== USER AUTH APIS ==============================
// // =====================================================================
// export const sendOtp = (email) => API.post("/log/auth/send-otp", { email });
// export const verifyOtp = (data) => API.post("/log/auth/verify-otp", data);

// export const registerUser = (data) =>
//   API.post("/log/auth/register", {
//     name: data.name,
//     email: data.email,
//     password: data.password,
//     mobile: data.mobile,
//   });

// // login → returns raw text token
// export const loginUser = (data) =>
//   API.post(
//     "/log/auth/login",
//     { email: data.email, password: data.password },
//     { transformResponse: [(data) => data] }
//   );

// export const logoutUser = () => API.post("/log/auth/logout");

// // USER PASSWORD
// export const forgotPassword = (email) =>
//   API.post("/log/user/forgotPassword", { email });

// export const resetPassword = (data) =>
//   API.post("/log/user/resetPassword", data);

// // USER CRUD
// export const getUserByEmail = (email) =>
//   API.get(`/log/user/email?email=${encodeURIComponent(email)}`);

// export const getUserById = (id) => API.get(`/log/user/${id}`);

// export const updateUser = (id, data) => API.put(`/log/user/${id}`, data);

// export const deleteUser = (id) => API.delete(`/log/user/${id}`);

// // =====================================================================
// // ======================== ADDRESS APIS ================================
// // =====================================================================
// export const addAddress = (data) => API.post("/log/addresses/add", data);

// export const getAllAddresses = () => API.get("/log/addresses/all");

// export const updateAddress = (id, data) =>
//   API.put(`/log/addresses/${id}`, data);

// export const deleteAddress = (id) => API.delete(`/log/addresses/${id}`);

// // =====================================================================
// // ======================== CART APIS ==================================
// // =====================================================================
// export const addItemToCart = (item) => API.post("/cart/items", item);

// export const getCartItems = () => API.get("/cart/items");

// export const updateCartItem = (foodId, quantity) =>
//   API.put("/cart/items", { foodId, quantity });

// export const removeCartItem = (foodId) =>
//   API.delete("/cart/items", { data: { foodId } });

// export const getCartTotal = () => API.get("/cart/total");

// // =====================================================================
// // ================== SUBSCRIPTION / ORDERS / CHECKOUT =================
// // =====================================================================

// // PLANS
// export const getAllPlans = () => API.get("/subscri/plans");

// export const getPlansByDuration = (duration) =>
//   API.get(`/subscri/plans/duration/${duration}`);

// export const getGroupedPlans = () => API.get("/subscri/plans/grouped");

// // SUBSCRIPTIONS
// export const createSubscription = (data) =>
//   API.post("/subscri/subscriptions", data);

// export const getSubscriptionById = (id) =>
//   API.get(`/subscri/subscriptions/${id}`);

// export const getAllSubscriptions = () =>
//   API.get("/subscri/subscriptions");

// export const deleteSubscriptionById = (id) =>
//   API.delete(`/subscri/subscriptions/${id}`);

// export const switchSubscription = (id, data) =>
//   API.put(`/subscri/subscriptions/${id}/switch`, data);

// export const renewSubscription = (id, data) =>
//   API.put(`/subscri/subscriptions/${id}/renew`, data);

// export const getSubscriptionReview = (subscriptionId) =>
//   API.get(`/subscri/subscriptions/user/${subscriptionId}/review`);

// // ORDERS
// export const createOrderFromSubscription = (subscriptionId) =>
//   API.post(`/subscri/orders/from-subscription/${subscriptionId}`);

// export const getAllSubscriptionOrders = () => API.get("/subscri/orders");

// export const getSubscriptionOrderById = (orderId) =>
//   API.get(`/subscri/orders/${orderId}`);

// // USER ORDERS
// export const checkoutOrder = (data) =>
//   API.post("/usr/orders/checkout", data);

// export const placeOrder = (data) => API.post("/usr/orders", data);

// export const createOrder = (data) =>
//   API.post("/usr/orders/direct", data);

// export const getOrderById = (id) => API.get(`/usr/orders/${id}`);

// export const getAllOrders = () => API.get("/usr/orders");

// export const getOrdersByUser = (email) =>
//   API.get(`/usr/orders/user/${encodeURIComponent(email)}`);

// export const getOrderDelivery = (orderId) =>
//   API.get(`/usr/orders/${orderId}/delivery-partner`);

// export const updateOrder = (orderId, data) =>
//   API.put(`/usr/orders/${orderId}`, data);

// export const deleteOrder = (orderId) =>
//   API.delete(`/usr/orders/${orderId}`);

// // =====================================================================
// // ==================== ADMIN AUTH API (NEW) ===========================
// // =====================================================================

// // ADMIN LOGIN (http://localhost:9090/admin/login)
// export const adminLogin = (data) =>
//   API.post("/admin/login", {
//     email: data.email,
//     password: data.password,
//   });

// // ADMIN RESET PASSWORD (Bearer token required)
// export const adminResetPassword = (data) =>
//   API.post("/admin/reset-password", data);

// // ADMIN FORGOT PASSWORD (http://localhost:9081)
// export const adminForgotPassword = (email) =>
//   API.post("http://localhost:9081/admin/forgot-password", { email });

// // ADMIN LOGOUT
// export const adminLogout = () => API.post("/admin/logout");

// export default API;





// // src/api/api.js
// import axios from "axios";

// /* =========================================================
//    BASE INSTANCE (Gateway)
// ========================================================= */
// const API = axios.create({
//   baseURL: "http://localhost:9090",
//   headers: { "Content-Type": "application/json" },
// });

// /* =========================================================
//    INTERCEPTOR (Attach Token + Handle 401)
// ========================================================= */
// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// API.interceptors.response.use(
//   (res) => res,
//   (err) => {
//     if (err?.response?.status === 401) {
//       localStorage.removeItem("token");
//       window.location.replace("/login");
//     }
//     return Promise.reject(err);
//   }
// );

// /* =========================================================
//    ======================= USER APIs ========================
//    All user routes pass through Gateway mapped as:
//    /log/** , /subscri/** , /usr/** , /menu/** , /cart/**
// ========================================================= */

// // OTP + AUTH
// export const sendOtp = (email) => API.post("/log/auth/send-otp", { email });
// export const verifyOtp = (data) => API.post("/log/auth/verify-otp", data);
// export const registerUser = (data) => API.post("/log/auth/register", data);

// export const loginUser = (data) =>
//   API.post("/log/auth/login", data, {
//     transformResponse: [(d) => d],
//   });

// export const logoutUser = () => API.post("/log/auth/logout");

// // Password
// export const forgotPassword = (email) =>
//   API.post("/log/user/forgotPassword", { email });

// export const resetPassword = (data) =>
//   API.post("/log/user/resetPassword", data);

// // USER CRUD
// export const getUserByEmail = (email) =>
//   API.get(`/log/user/email?email=${email}`);

// export const getUserById = (id) => API.get(`/log/user/${id}`);

// export const updateUser = (id, data) =>
//   API.put(`/log/user/${id}`, data);

// export const deleteUser = (id) => API.delete(`/log/user/${id}`);

// /* =========================================================
//    ADDRESS (log/addresses/**)
// ========================================================= */
// export const addAddress = (data) => API.post("/log/addresses/add", data);
// export const getAllAddresses = () => API.get("/log/addresses/all");
// export const updateAddress = (id, data) =>
//   API.put(`/log/addresses/${id}`, data);
// export const deleteAddress = (id) => API.delete(`/log/addresses/${id}`);

// /* =========================================================
//    CART (cart/**)
// ========================================================= */
// export const addItemToCart = (item) => API.post("/cart/items", item);
// export const getCartItems = () => API.get("/cart/items");
// export const updateCartItem = (foodId, quantity) =>
//   API.put("/cart/items", { foodId, quantity });
// export const removeCartItem = (foodId) =>
//   API.delete("/cart/items", { data: { foodId } });
// export const getCartTotal = () => API.get("/cart/total");

// /* =========================================================
//    SUBSCRIPTIONS (subscri/**)
// ========================================================= */

// // Plans
// export const getAllPlans = () => API.get("/subscri/plans");
// export const getPlansByDuration = (d) =>
//   API.get(`/subscri/plans/duration/${d}`);
// export const getGroupedPlans = () => API.get("/subscri/plans/grouped");

// // Subscriptions
// export const createSubscription = (data) =>
//   API.post("/subscri/subscriptions", data);

// export const getSubscriptionById = (id) =>
//   API.get(`/subscri/subscriptions/${id}`);

// export const getAllSubscriptions = () =>
//   API.get("/subscri/subscriptions");

// export const deleteSubscriptionById = (id) =>
//   API.delete(`/subscri/subscriptions/${id}`);

// export const switchSubscription = (id, data) =>
//   API.put(`/subscri/subscriptions/${id}/switch`, data);

// export const renewSubscription = (id, data) =>
//   API.put(`/subscri/subscriptions/${id}/renew`, data);

// export const getSubscriptionReview = (id) =>
//   API.get(`/subscri/subscriptions/user/${id}/review`);

// /* =========================================================
//    ORDERS (usr/orders/** → rewrite → /orders/**)
// ========================================================= */
// export const checkoutOrder = (data) =>
//   API.post("/usr/orders/checkout", data);

// export const placeOrder = (data) =>
//   API.post("/usr/orders", data);

// export const createOrder = (data) =>
//   API.post("/usr/orders/direct", data);

// export const getOrderById = (id) =>
//   API.get(`/usr/orders/${id}`);

// export const getAllOrders = () =>
//   API.get("/usr/orders");

// export const getOrdersByUser = (email) =>
//   API.get(`/usr/orders/user/${email}`);

// export const getOrderDelivery = (id) =>
//   API.get(`/usr/orders/${id}/delivery-partner`);

// export const updateOrder = (id, data) =>
//   API.put(`/usr/orders/${id}`, data);

// export const deleteOrder = (id) =>
//   API.delete(`/usr/orders/${id}`);

// /* =========================================================
//    ======================= ADMIN APIs =======================
//    Gateway Mapping:
//    admin/** → 9081 admin-login
//    ordr/**  → 9083 admin order
//    rev/**   → 9085 admin review
// ========================================================= */

// // ADMIN LOGIN (old admin)
// export const adminLogin = (data) =>
//   API.post("/admin/login", data);

// export const adminResetPassword = (data) =>
//   API.post("/admin/reset-password", data);

// export const adminForgotPassword = (email) =>
//   API.post("/admin/forgot-password", { email });

// export const adminLogout = () =>
//   API.post("/admin/logout");

// /* =========================================================
//    =============== SUPER ADMIN (CLOUD KITCHEN) ===============
//    Gateway mapping:
//    /sa/** → http://localhost:9080/ (should map to super admin)
// ========================================================= */
// // ---------------- SUPER ADMIN APIs ----------------
// // =======================
// // SUPER ADMIN AUTH
// // =======================

// // LOGIN (gateway → backend)
// export const superLogin = async (data) => {
//   const res = await API.post("/sa/login", data, {
//     transformResponse: [
//       function (raw) {
//         try {
//           return JSON.parse(raw); // always return JSON
//         } catch {
//           return raw;
//         }
//       },
//     ],
//   });
//   return res;
// };

// // =======================
// // SUPER ADMIN REPORTS
// // =======================
// export const getReports = () => API.get("/sa/reports");

// // =======================
// // SUPER ADMIN KITCHENS
// // =======================
// export const getKitchens = () => API.get("/sa/kitchens");

// export const createKitchen = (data) => API.post("/sa/kitchens", data);

// export const deleteKitchen = (id) => API.delete(`/sa/kitchens/${id}`);

// // =======================
// // SUPER ADMIN MANAGERS
// // =======================
// export const getManagers = () => API.get("/sa/managers");

// export const createManager = (data) => API.post("/sa/managers", data);

// export const deleteManager = (id) => API.delete(`/sa/managers/${id}`);

// // =======================
// // SUPER ADMIN DELIVERY PARTNERS
// // =======================
// export const getDeliveryPartners = () => API.get("/sa/delivery-partners");

// export const createDeliveryPartner = (data) =>
//   API.post("/sa/delivery-partners", data);

// export const deleteDeliveryPartner = (id) =>
//   API.delete(`/sa/delivery-partners/${id}`);

// // =======================
// // SUPER ADMIN EXPORTS
// // =======================
// export const exportAll = () =>
//   API.get("/sa/export/all", { responseType: "blob" });

// export const exportKitchenById = (id) =>
//   API.get(`/sa/export/kitchen/${id}`, { responseType: "blob" });


// export default API;


// // ==========================================================
// // src/api/api.js  (FINAL 100% FIXED & DASHBOARD SAFE)
// // ==========================================================

// import axios from "axios";

// // ==========================================================
// // BASE AXIOS INSTANCE (Gateway → 9090)
// // ==========================================================
// const API = axios.create({
//   baseURL: "http://localhost:9090",
//   headers: { "Content-Type": "application/json" },
//   withCredentials: false,
// });

// // ==========================================================
// // INTERCEPTOR → Attach JWT Token
// // ==========================================================
// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// // ==========================================================
// // INTERCEPTOR → Handle 401 & Auto Logout
// // ==========================================================
// API.interceptors.response.use(
//   (res) => res,
//   (err) => {
//     if (err?.response?.status === 401) {
//       localStorage.removeItem("token");
//       window.location.replace("/login");
//     }
//     return Promise.reject(err);
//   }
// );

// // ##########################################################
// // ###################### USER AUTH #########################
// // ##########################################################

// export const sendOtp = (email) => API.post("/log/auth/send-otp", { email });
// export const verifyOtp = (data) => API.post("/log/auth/verify-otp", data);
// export const registerUser = (data) => API.post("/log/auth/register", data);

// export const loginUser = (data) =>
//   API.post("/log/auth/login", data, {
//     transformResponse: [(d) => d],
//   });

// export const logoutUser = () => API.post("/log/auth/logout");

// export const forgotPassword = (email) =>
//   API.post("/log/user/forgotPassword", { email });
// export const resetPassword = (data) => API.post("/log/user/resetPassword", data);

// // ##########################################################
// // ###################### USER CRUD #########################
// // ##########################################################

// export const getUserByEmail = (email) =>
//   API.get(`/log/user/email?email=${encodeURIComponent(email)}`);

// export const getUserById = (id) => API.get(`/log/user/${id}`);
// export const updateUser = (id, data) => API.put(`/log/user/${id}`, data);
// export const deleteUser = (id) => API.delete(`/log/user/${id}`);

// // ##########################################################
// // ###################### ADDRESS ###########################
// // ##########################################################

// export const addAddress = (data) => API.post("/log/addresses/add", data);
// export const getAllAddresses = () => API.get("/log/addresses/all");
// export const updateAddress = (id, data) =>
//   API.put(`/log/addresses/${id}`, data);
// export const deleteAddress = (id) => API.delete(`/log/addresses/${id}`);

// // ##########################################################
// // ######################## CART ############################
// // ##########################################################

// export const addItemToCart = (item) => API.post("/cart/items", item);
// export const getCartItems = () => API.get("/cart/items");
// export const updateCartItem = (foodId, quantity) =>
//   API.put("/cart/items", { foodId, quantity });
// export const removeCartItem = (foodId) =>
//   API.delete("/cart/items", { data: { foodId } });
// export const getCartTotal = () => API.get("/cart/total");

// // ##########################################################
// // ##################### SUBSCRIPTIONS ######################
// // ##########################################################

// export const getAllPlans = () => API.get("/subscri/plans");
// export const getPlansByDuration = (d) =>
//   API.get(`/subscri/plans/duration/${d}`);
// export const getGroupedPlans = () => API.get("/subscri/plans/grouped");

// export const createSubscription = (data) =>
//   API.post("/subscri/subscriptions", data);

// export const getSubscriptionById = (id) =>
//   API.get(`/subscri/subscriptions/${id}`);

// export const getAllSubscriptions = () =>
//   API.get("/subscri/subscriptions");

// export const deleteSubscriptionById = (id) =>
//   API.delete(`/subscri/subscriptions/${id}`);

// export const switchSubscription = (id, data) =>
//   API.put(`/subscri/subscriptions/${id}/switch`, data);

// export const renewSubscription = (id, data) =>
//   API.put(`/subscri/subscriptions/${id}/renew`, data);

// export const getSubscriptionReview = (id) =>
//   API.get(`/subscri/subscriptions/user/${id}/review`);

// // ##########################################################
// // ######################## ORDERS ##########################
// // ##########################################################

// export const checkoutOrder = (data) =>
//   API.post("/usr/orders/checkout", data);

// export const placeOrder = (data) => API.post("/usr/orders", data);

// export const createOrder = (data) => API.post("/usr/orders/direct", data);

// export const getOrderById = (id) => API.get(`/usr/orders/${id}`);

// export const getAllOrders = () => API.get("/usr/orders");

// export const getOrdersByUser = (email) =>
//   API.get(`/usr/orders/user/${email}`);

// export const getOrderDelivery = (id) =>
//   API.get(`/usr/orders/${id}/delivery-partner`);

// export const updateOrder = (id, data) =>
//   API.put(`/usr/orders/${id}`, data);

// export const deleteOrder = (id) =>
//   API.delete(`/usr/orders/${id}`);

// // ##########################################################
// // ###################### ADMIN AUTH ########################
// // ##########################################################

// export const adminLogin = (data) => API.post("/admin/login", data);
// export const adminForgotPassword = (email) =>
//   API.post("/admin/forgot-password", { email });
// export const adminResetPassword = (data) =>
//   API.post("/admin/reset-password", data);
// export const adminLogout = () => API.post("/admin/logout");

// // ##########################################################
// // ==========================================================
// // SUPER ADMIN CLOUD KITCHEN APIs  (FINAL 100% WORKING)
// // ==========================================================
// export const superLogin = (data) =>
//   API.post("/sa/api/admin/login", data, {
//     transformResponse: [(raw) => raw],
//   });

// export const getReports = () => API.get("/sa/api/admin/reports");
// export const getKitchens = () => API.get("/sa/api/admin/kitchens");
// export const createKitchen = (data) => API.post("/sa/api/admin/kitchens", data);
// export const deleteKitchen = (id) => API.delete(`/sa/api/admin/kitchens/${id}`);

// export const getManagers = () => API.get("/sa/api/admin/managers");
// export const createManager = (data) => API.post("/sa/api/admin/managers", data);
// export const deleteManager = (id) => API.delete(`/sa/api/admin/managers/${id}`);

// export const getDeliveryPartners = () =>
//   API.get("/sa/api/admin/delivery-partners");
// export const createDeliveryPartner = (data) =>
//   API.post("/sa/api/admin/delivery-partners", data);
// export const deleteDeliveryPartner = (id) =>
//   API.delete(`/sa/api/admin/delivery-partners/${id}`);

// export const exportAll = () =>
//   API.get("/sa/api/admin/export/all", { responseType: "blob" });

// export const exportKitchenById = (id) =>
//   API.get(`/sa/api/admin/export/kitchen/${id}`, { responseType: "blob" });




// export default API;





// /* ==========================================================
//    src/api/api.js  
//    (FINAL — USER + ADMIN + SUPERADMIN)
//    ========================================================== */

// import axios from "axios";

// /* ==========================================================
//    BASE AXIOS INSTANCE (Gateway → 9090)
//    ========================================================== */
// const API = axios.create({
//   baseURL: "http://localhost:9090",
//   headers: { "Content-Type": "application/json" },
// });

// /* ==========================================================
//    TOKEN HELPERS — ROLE BASED STORAGE
//    ========================================================== */
// const tokenKeys = {
//   user: "user_token",
//   admin: "admin_token",
//   super: "super_token",
// };

// const getToken = () => {
//   return (
//     localStorage.getItem(tokenKeys.super) ||
//     localStorage.getItem(tokenKeys.admin) ||
//     localStorage.getItem(tokenKeys.user)
//   );
// };

// const clearAllTokens = () => {
//   Object.values(tokenKeys).forEach((key) => localStorage.removeItem(key));
// };

// /* ==========================================================
//    REQUEST INTERCEPTOR — Attach JWT
//    ========================================================== */
// API.interceptors.request.use((config) => {
//   const token = getToken();
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// /* ==========================================================
//    RESPONSE INTERCEPTOR — Handle 401 with Role Redirect
//    ========================================================== */
// API.interceptors.response.use(
//   (res) => res,
//   (err) => {
//     if (err?.response?.status === 401) {
//       // Previous token is invalid — remove role token
//       clearAllTokens();

//       // AUTO REDIRECT BASED ON ENDPOINT
//       const url = err.config?.url || "";

//       if (url.includes("/api/admin")) {
//         // SUPERADMIN
//         window.location.replace("/superadmin/login");
//       } else if (url.includes("/admin")) {
//         // NORMAL ADMIN
//         window.location.replace("/admin/login");
//       } else {
//         // NORMAL USER
//         window.location.replace("/login");
//       }
//     }
//     return Promise.reject(err);
//   }
// );

// /* ##########################################################
//    ######################## USER AUTH ########################
//    ########################################################## */

// export const sendOtp = (email) =>
//   API.post("/log/auth/send-otp", { email });

// export const verifyOtp = (data) => API.post("/log/auth/verify-otp", data);

// export const registerUser = (data) => API.post("/log/auth/register", data);

// export const loginUser = async (data) => {
//   const res = await API.post("/log/auth/login", data, {
//     transformResponse: [(d) => d],
//   });
//   localStorage.setItem(tokenKeys.user, res.data);
//   return res;
// };

// export const logoutUser = () => {
//   localStorage.removeItem(tokenKeys.user);
//   return API.post("/log/auth/logout");
// };

// export const forgotPassword = (email) =>
//   API.post("/log/user/forgotPassword", { email });

// export const resetPassword = (data) =>
//   API.post("/log/user/resetPassword", data);

// /* ######################## USER CRUD ######################## */

// export const getUserByEmail = (email) =>
//   API.get(`/log/user/email?email=${encodeURIComponent(email)}`);

// export const getUserById = (id) => API.get(`/log/user/${id}`);

// export const updateUser = (id, data) => API.put(`/log/user/${id}`, data);

// export const deleteUser = (id) => API.delete(`/log/user/${id}`);

// /* ######################## ADDRESS ########################## */

// export const addAddress = (data) => API.post("/log/addresses/add", data);

// export const getAllAddresses = () => API.get("/log/addresses/all");

// export const updateAddress = (id, data) =>
//   API.put(`/log/addresses/${id}`, data);

// export const deleteAddress = (id) => API.delete(`/log/addresses/${id}`);

// /* ######################## CART ############################# */

// export const addItemToCart = (item) => API.post("/cart/items", item);

// export const getCartItems = () => API.get("/cart/items");

// export const updateCartItem = (foodId, quantity) =>
//   API.put("/cart/items", { foodId, quantity });

// export const removeCartItem = (foodId) =>
//   API.delete("/cart/items", { data: { foodId } });

// export const getCartTotal = () => API.get("/cart/total");

// /* ######################## SUBSCRIPTIONS #################### */

// export const getAllPlans = () => API.get("/subscri/plans");

// export const getPlansByDuration = (d) =>
//   API.get(`/subscri/plans/duration/${d}`);

// export const getGroupedPlans = () => API.get("/subscri/plans/grouped");

// export const createSubscription = (data) =>
//   API.post("/subscri/subscriptions", data);

// export const getSubscriptionById = (id) =>
//   API.get(`/subscri/subscriptions/${id}`);

// export const getAllSubscriptions = () => API.get("/subscri/subscriptions");

// export const deleteSubscriptionById = (id) =>
//   API.delete(`/subscri/subscriptions/${id}`);

// export const switchSubscription = (id, data) =>
//   API.put(`/subscri/subscriptions/${id}/switch`, data);

// export const renewSubscription = (id, data) =>
//   API.put(`/subscri/subscriptions/${id}/renew`, data);

// export const getSubscriptionReview = (id) =>
//   API.get(`/subscri/subscriptions/user/${id}/review`);

// /* ######################## ORDERS ########################### */

// export const checkoutOrder = (data) =>
//   API.post("/usr/orders/checkout", data);

// export const placeOrder = (data) => API.post("/usr/orders", data);

// export const createOrder = (data) => API.post("/usr/orders/direct", data);

// export const getOrderById = (id) => API.get(`/usr/orders/${id}`);

// export const getAllOrders = () => API.get("/usr/orders");

// export const getOrdersByUser = (email) =>
//   API.get(`/usr/orders/user/${email}`);

// export const getOrderDelivery = (id) =>
//   API.get(`/usr/orders/${id}/delivery-partner`);

// export const updateOrder = (id, data) =>
//   API.put(`/usr/orders/${id}`, data);

// export const deleteOrder = (id) =>
//   API.delete(`/usr/orders/${id}`);

// /* ##########################################################
//    ######################## ADMIN AUTH #######################
//    ########################################################## */

// /**
//  * ADMIN LOGIN
//  * Backend returns:
//  * {
//  *   message: "Login successful",
//  *   token: "JWT_TOKEN"
//  * }
//  */
// export const adminLogin = async (data) => {
//   const res = await API.post("/admin/login", data, {
//     transformResponse: [(raw) => raw],   // ⭐ raw string from gateway
//   });

//   let token = null;

//   try {
//     const obj = JSON.parse(res.data);
//     token = obj.token;
//   } catch {
//     // direct JSON object
//     token = res?.data?.token;
//   }

//   if (!token) {
//     throw new Error("Token missing from admin login!");
//   }

//   localStorage.setItem(tokenKeys.admin, token);
//   return res;
// };

// /**
//  * ADMIN FORGOT PASSWORD
//  * Backend sends TEMPORARY PASSWORD to email
//  */
// export const adminForgotPassword = (email) =>
//   API.post("/admin/forgot-password", { email });

// /**
//  * ADMIN RESET PASSWORD
//  * Needs JWT (already auto-attached)
//  * Params:
//  * {
//  *   oldPassword,
//  *   newPassword,
//  *   confirmPassword
//  * }
//  */
// export const adminResetPassword = (data) =>
//   API.post("/admin/reset-password", data);

// /**
//  * ADMIN LOGOUT
//  */
// export const adminLogout = () => {
//   localStorage.removeItem(tokenKeys.admin);
//   return API.post("/admin/logout");
// };


// /* ##########################################################
//    ################### SUPER ADMIN APIS #####################
//    ########################################################## */

// // ✅ Your backend uses: /api/admin/*
// //   (NOT /sa/api/admin/*)

// export const superLogin = async (data) => {
//   const res = await API.post("/api/admin/login", data, {
//     transformResponse: [(raw) => raw],
//   });
//   localStorage.setItem(tokenKeys.super, res.data);
//   return res;
// };

// export const superLogout = () => {
//   localStorage.removeItem(tokenKeys.super);
//   return API.post("/api/admin/logout");
// };

// export const getReports = () => API.get("/api/admin/reports");
// export const getKitchens = () => API.get("/api/admin/kitchens");
// export const createKitchen = (data) => API.post("/api/admin/kitchens", data);
// export const deleteKitchen = (id) =>
//   API.delete(`/api/admin/kitchens/${id}`);

// export const getManagers = () => API.get("/api/admin/managers");
// export const createManager = (data) =>
//   API.post("/api/admin/managers", data);
// export const deleteManager = (id) =>
//   API.delete(`/api/admin/managers/${id}`);

// export const getDeliveryPartners = () =>
//   API.get("/api/admin/delivery-partners");
// export const createDeliveryPartner = (data) =>
//   API.post("/api/admin/delivery-partners", data);
// export const deleteDeliveryPartner = (id) =>
//   API.delete(`/api/admin/delivery-partners/${id}`);

// export const exportAll = () =>
//   API.get("/api/admin/export/all", { responseType: "blob" });

// export const exportKitchenById = (id) =>
//   API.get(`/api/admin/export/kitchen/${id}`, {
//     responseType: "blob",
//   });

// export default API;



// Updated


 

// /* ==========================================================
//    src/api/api.js  
//    FINAL — USER + ADMIN + SUPERADMIN + CUISINE + MEAL + ADMIN SUBSCRIPTION
//    ========================================================== */

// import axios from "axios";

// /* ==========================================================
//    BASE AXIOS INSTANCE
//    ========================================================== */
// const API = axios.create({
//   baseURL: "http://localhost:9090",
//   headers: { "Content-Type": "application/json" },
// });

// /* ==========================================================
//    TOKEN STORAGE
//    ========================================================== */
// const tokenKeys = {
//   user: "user_token",
//   admin: "admin_token",
//   super: "super_token",
// };

// /* ================= PRIORITY FIX (SUPERADMIN FIRST) =============== */
// const getToken = () =>
//   localStorage.getItem(tokenKeys.super) ||
//   localStorage.getItem(tokenKeys.admin) ||
//   localStorage.getItem(tokenKeys.user);

// const clearAllTokens = () =>
//   Object.values(tokenKeys).forEach((k) => localStorage.removeItem(k));

// /* ==========================================================
//    REQUEST → Attach JWT 
//    (Prevent sending JSON token)
//    ========================================================== */
// API.interceptors.request.use((config) => {
//   const token = getToken();

//   // prevent sending JSON like {"token":"xyz"}
//   if (token && typeof token === "string" && !token.includes("{")) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

// /* ==========================================================
//    RESPONSE → Auto redirect on 401
//    ========================================================== */
// API.interceptors.response.use(
//   (res) => res,
//   (err) => {
//     if (err?.response?.status === 401) {
//       clearAllTokens();
//       const url = err.config?.url || "";

//       if (url.includes("/api/admin"))
//         window.location.replace("/superadmin/login");
//       else if (url.includes("/admin"))
//         window.location.replace("/admin/login");
//       else window.location.replace("/login");
//     }
//     return Promise.reject(err);
//   }
// );

// /* ##########################################################
//    ######################## USER AUTH ########################
//    ########################################################## */

// export const sendOtp = (email) => API.post("/log/auth/send-otp", { email });
// export const verifyOtp = (data) => API.post("/log/auth/verify-otp", data);
// export const registerUser = (data) => API.post("/log/auth/register", data);

// export const loginUser = async (data) => {
//   const res = await API.post("/log/auth/login", data, {
//     transformResponse: [(d) => d],
//   });
//   localStorage.setItem(tokenKeys.user, res.data);
//   return res;
// };

// export const logoutUser = () => {
//   localStorage.removeItem(tokenKeys.user);
//   return API.post("/log/auth/logout");
// };

// export const forgotPassword = (email) =>
//   API.post("/log/user/forgotPassword", { email });

// export const resetPassword = (data) =>
//   API.post("/log/user/resetPassword", data);

// /* ######################## USER CRUD ######################## */

// export const getUserByEmail = (email) =>
//   API.get(`/log/user/email?email=${encodeURIComponent(email)}`);

// export const getUserById = (id) => API.get(`/log/user/${id}`);
// export const updateUser = (id, data) => API.put(`/log/user/${id}`, data);
// export const deleteUser = (id) => API.delete(`/log/user/${id}`);

// /* ######################## ADDRESS ########################## */

// export const addAddress = (data) => API.post("/log/addresses/add", data);
// export const getAllAddresses = () => API.get("/log/addresses/all");
// export const updateAddress = (id, data) => API.put(`/log/addresses/${id}`, data);
// export const deleteAddress = (id) => API.delete(`/log/addresses/${id}`);

// /* ######################## CART ############################# */

// export const addItemToCart = (item) => API.post("/cart/items", item);
// export const getCartItems = () => API.get("/cart/items");

// export const updateCartItem = (foodId, quantity) =>
//   API.put("/cart/items", { foodId, quantity });

// export const removeCartItem = (foodId) =>
//   API.delete("/cart/items", { data: { foodId } });

// export const getCartTotal = () => API.get("/cart/total");

// /* ######################## USER SUBSCRIPTIONS #################### */

// export const getAllPlans = () => API.get("/subscri/plans");
// export const getPlansByDuration = (d) => API.get(`/subscri/plans/duration/${d}`);
// export const getGroupedPlans = () => API.get("/subscri/plans/grouped");

// export const createSubscription = (data) =>
//   API.post("/subscri/subscriptions", data);

// export const getSubscriptionById = (id) =>
//   API.get(`/subscri/subscriptions/${id}`);

// export const getAllSubscriptions = () =>
//   API.get("/subscri/subscriptions");

// export const deleteSubscriptionById = (id) =>
//   API.delete(`/subscri/subscriptions/${id}`);

// export const switchSubscription = (id, data) =>
//   API.put(`/subscri/subscriptions/${id}/switch`, data);

// export const renewSubscription = (id, data) =>
//   API.put(`/subscri/subscriptions/${id}/renew`, data);

// export const getSubscriptionReview = (id) =>
//   API.get(`/subscri/subscriptions/user/${id}/review`);

// /* ######################## ORDERS ########################### */

// export const checkoutOrder = (data) =>
//   API.post("/usr/orders/checkout", data);

// export const placeOrder = (data) =>
//   API.post("/usr/orders", data);

// export const createOrder = (data) =>
//   API.post("/usr/orders/direct", data);

// // export const getOrderById = (id) => API.get(`/usr/orders/${id}`);
// export const getAllOrders = () => API.get("/usr/orders");
// export const getOrdersByUser = (email) =>
//   API.get(`/usr/orders/user/${email}`);

// export const getOrderDelivery = (id) =>
//   API.get(`/usr/orders/${id}/delivery-partner`);

// export const updateOrder = (id, data) =>
//   API.put(`/usr/orders/${id}`, data);

// export const deleteOrder = (id) =>
//   API.delete(`/usr/orders/${id}`);


// export const getOrdersByUserId = (userId) => API.get(`/usr/orders/user/${userId}`);
// export const getOrderById = (id) => API.get(`/usr/orders/${id}`);


// /* ##########################################################
//    ######################## ADMIN AUTH #######################
//    ########################################################## */

// export const adminLogin = async (data) => {
//   const res = await API.post("/admin/login", data, {
//     transformResponse: [(raw) => raw],
//   });

//   let token;
//   try {
//     token = JSON.parse(res.data).token;
//   } catch {
//     token = res?.data?.token;
//   }

//   localStorage.setItem(tokenKeys.admin, token);
//   return res;
// };

// export const adminForgotPassword = (email) =>
//   API.post("/admin/forgot-password", { email });

// export const adminResetPassword = (data) =>
//   API.post("/admin/reset-password", data);

// export const adminLogout = async () => {
//   const token = localStorage.getItem(tokenKeys.admin);
//   const res = await API.post(
//     "/admin/logout",
//     {},
//     { headers: { Authorization: `Bearer ${token}` } }
//   );

//   localStorage.removeItem(tokenKeys.admin);
//   return res;
// };

// /* ##########################################################
//    ###################### SUPER ADMIN ########################
//    ########################################################## */

// export const superLogin = async (data) => {
//   const res = await API.post("/api/admin/login", data, {
//     transformResponse: [(raw) => raw],
//   });

//   let token;
//   try {
//     token = JSON.parse(res.data).token;
//   } catch {
//     token = res?.data?.token;
//   }

//   localStorage.setItem(tokenKeys.super, token);
//   return res;
// };

// export const superLogout = () => {
//   localStorage.removeItem(tokenKeys.super);
//   return API.post("/api/admin/logout");
// };

// export const getReports = () => API.get("/api/admin/reports");
// export const getKitchens = () => API.get("/api/admin/kitchens");
// export const createKitchen = (data) => API.post("/api/admin/kitchens", data);
// export const deleteKitchen = (id) =>
//   API.delete(`/api/admin/kitchens/${id}`);

// export const getManagers = () => API.get("/api/admin/managers");
// export const createManager = (data) => API.post("/api/admin/managers", data);
// export const deleteManager = (id) => API.delete(`/api/admin/managers/${id}`);

// export const getDeliveryPartners = () =>
//   API.get("/api/admin/delivery-partners");

// // export const createDeliveryPartner = (data) =>
// //   API.post("/api/admin/delivery-partners", data);

// export const deleteDeliveryPartner = (id) =>
//   API.delete(`/api/admin/delivery-partners/${id}`);

// export const exportAll = () =>
//   API.get("/api/admin/export/all", { responseType: "blob" });

// export const exportKitchenById = (id) =>
//   API.get(`/api/admin/export/kitchen/${id}`, { responseType: "blob" });

// /* ##########################################################
//    ################### ADMIN CUISINES ########################
//    ########################################################## */

// export const adminCreateCuisine = (data) =>
//   API.post("/adminn/cuisines", data);

// export const adminGetCuisineById = (id) =>
//   API.get(`/adminn/cuisines/${id}`);

// export const adminGetCuisineByRegion = (region) =>
//   API.get(`/adminn/cuisines/region/${region}`);

// export const adminGetCuisineByState = (state) =>
//   API.get(`/adminn/cuisines/state/${state}`);

// export const adminUpdateCuisine = (id, data) =>
//   API.put(`/adminn/cuisines/id/${id}`, data);

// export const adminDeleteCuisine = (id) =>
//   API.delete(`/adminn/cuisines/id/${id}`);

// /* ##########################################################
//    ################### ADMIN MEAL ###########################
//    ########################################################## */

// export const adminCreateMeal = (data) => API.post("/adminn/meals", data);

// export const adminGetMealById = (id) =>
//   API.get(`/adminn/meals/${id}`);

// export const adminGetMealsByState = (state) =>
//   API.get(`/adminn/meals/state/${state}`);

// export const adminGetMealsByRegion = (region) =>
//   API.get(`/adminn/meals/region/${region}`);

// export const adminGetMealByName = (name) =>
//   API.get(`/adminn/meals/name/${name}`);

// export const adminUpdateMeal = (id, data) =>
//   API.put(`/adminn/meals/${id}`, data);

// export const adminDeleteMeal = (id) =>
//   API.delete(`/adminn/meals/${id}`);

// /* ##########################################################
//    ################### USER CUISINE APIs ####################
//    ########################################################## */

// export const getUserCuisines = () => API.get("/user/cuisines");
// export const getUserCuisineById = (id) => API.get(`/user/cuisines/${id}`);
// export const getUserCuisinesByRegion = (region) =>
//   API.get(`/user/cuisines/region/${region}`);
// export const getUserCuisinesByState = (state) =>
//   API.get(`/user/cuisines/state/${state}`);
// export const searchUserCuisineByName = (name) =>
//   API.get(`/user/cuisines/name/${name}`);

// /* ##########################################################
//    ################### USER MEAL APIs #######################
//    ########################################################## */

// export const getUserMeals = () => API.get("/user/meals");
// export const getUserMealById = (id) => API.get(`/user/meals/${id}`);
// export const getUserMealsByName = (name) =>
//   API.get(`/user/meals/mealName/${name}`);
// export const getUserMealsByType = (type) =>
//   API.get(`/user/meals/mealType/${type}`);
// export const getUserMealsByRegion = (region) =>
//   API.get(`/user/meals/region/${region}`);
// export const getUserMealsByState = (state) =>
//   API.get(`/user/meals/state/${state}`);

// /* ##########################################################
//    ################### ADMIN SUBSCRIPTION ####################
//    ########################################################## */

// export const adminGetAllSubscriptions = (status, subscriptionid) =>
//   API.get("/api/admin/subscriptions", {
//     params: { status, subscriptionid },
//   });

// export const adminGetSubscriptionById = (subscriptionid) =>
//   API.get(`/api/admin/subscriptions/${subscriptionid}`);

// export const adminDeleteSubscription = (subscriptionid) =>
//   API.delete(`/api/admin/subscriptions/${subscriptionid}`);

// export const adminCountSubscriptions = () =>
//   API.get("/api/admin/subscriptions/count");

// export const adminExpiringSoonSubscriptions = (days = 7) =>
//   API.get("/api/admin/subscriptions/expiring-soon", {
//     params: { days },
//   });
// /* ==========================================================
//    ADMIN REVIEW APIs — CLEAN VERSION
//    ========================================================== */

// // ⭐ 1) Get all reviews (MAIN LIST on UI)
// // GET /rev/reviews
// export const getAllAdminReviews = () =>
//   API.get("/rev/reviews");


// // ⭐ 2) Get replies for a specific review
// // GET /rev/replies/{reviewId}
// export const getRepliesByReviewId = (reviewId) =>
//   API.get(`/rev/replies/${reviewId}`);


// // ⭐ 3) Add reply
// // POST /rev/{adminId}/replies/{reviewId}
// export const addAdminReply = (adminId, reviewId, reply) =>
//   API.post(`/rev/${adminId}/replies/${reviewId}`, { reply });


// // ⭐ 4) Update reply
// // PUT /rev/replies/{reviewId}
// export const updateAdminReply = (reviewId, reply) =>
//   API.put(`/rev/replies/${reviewId}`, { reply });


// // ⭐ 5) Delete reply
// // DELETE /rev/replies/{reviewId}
// export const deleteAdminReply = (reviewId) =>
//   API.delete(`/rev/replies/${reviewId}`);


// /* ==========================================================
//    ADMIN ORDER APIs (Order Delivery Module)
//    BASE PATH → /api/admin/orders
//    ========================================================== */

// /* ---------------------------
//    GET ALL ORDERS
//    Optional filters → ?date=2025-01-01&status=ACCEPTED
// ---------------------------- */
// export const adminGetAllOrders = (params = {}) =>
//   API.get("/api/admin/orders", { params });

// /* ---------------------------
//    GET ORDER BY ID
// ---------------------------- */
// export const adminGetOrderById = (orderId) =>
//   API.get(`/api/admin/orders/${orderId}`);

// /* ---------------------------
//    GET ORDER TIMELINE
// ---------------------------- */
// export const adminGetOrderTimeline = (orderId) =>
//   API.get(`/api/admin/orders/${orderId}/timeline`);

// /* ---------------------------
//    UPDATE ORDER STATUS
//    Body:
//    {
//      "status": "ACCEPTED | PREPARING | PICKED_UP | DELIVERED | REJECTED",
//      "reason": "...",
//      "riderName": "...",
//      "riderPhone": "..."
//    }
// ---------------------------- */
// export const adminUpdateOrderStatus = (orderId, data) =>
//   API.put(`/api/admin/orders/${orderId}/status`, data);

// /* ---------------------------
//    GET REJECTION DETAILS
// ---------------------------- */
// export const adminGetRejectionDetails = (orderId) =>
//   API.get(`/api/admin/orders/${orderId}/rejection`);

// /* ---------------------------
//    GET TOTAL ORDERS COUNT
// ---------------------------- */
// export const adminGetOrdersCount = () =>
//   API.get("/api/admin/orders/count");

// /* ---------------------------
//    ASSIGN DELIVERY PARTNER
//    POST /api/admin/orders/{orderId}/assign
//    Body:
//    {
//      partnerId: 3
//    }
// ---------------------------- */
// export const adminAssignDeliveryPartner = (orderId, partnerId) =>
//   API.post(`/api/admin/orders/${orderId}/assign`, { partnerId });



// /* ==========================================================
//    DELIVERY PARTNER APIs — (Support for Assign)
//    BASE PATH → /api/delivery-partners
//    ========================================================== */

// /* GET all partners */
// export const getAllDeliveryPartners = () =>
//   API.get("/api/delivery-partners");

// /* CREATE new partner */
// export const createDeliveryPartner = (data) =>
//   API.post("/api/delivery-partners", data);

// export default API;




// /* ==========================================================
//    src/api/api.js  
//    FINAL — USER + ADMIN + SUPERADMIN + CUISINE + MEAL + SUBSCRIPTION
//    (ADMIN ORDER + DELIVERY PERFECT, SUPERADMIN DELIVERY REMOVED)
//    ========================================================== */

// import axios from "axios";

// /* ==========================================================
//    BASE AXIOS INSTANCE
//    ========================================================== */
// const API = axios.create({
//   baseURL: "http://localhost:9090",
//   headers: { "Content-Type": "application/json" },
// });

// /* ==========================================================
//    TOKEN STORAGE
//    ========================================================== */
// const tokenKeys = {
//   user: "user_token",
//   admin: "admin_token",
//   super: "super_token",
// };

// /* SUPERADMIN > ADMIN > USER priority */
// const getToken = () =>
//   localStorage.getItem(tokenKeys.super) ||
//   localStorage.getItem(tokenKeys.admin) ||
//   localStorage.getItem(tokenKeys.user);

// const clearAllTokens = () =>
//   Object.values(tokenKeys).forEach((k) => localStorage.removeItem(k));

// /* ==========================================================
//    REQUEST → Attach JWT 
//    ========================================================== */
// API.interceptors.request.use((config) => {
//   const token = getToken();
//   if (token && typeof token === "string" && !token.includes("{")) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// /* ==========================================================
//    RESPONSE → Auto redirect on 401
//    ========================================================== */
// API.interceptors.response.use(
//   (res) => res,
//   (err) => {
//     if (err?.response?.status === 401) {
//       clearAllTokens();
//       const url = err.config?.url || "";

//       if (url.includes("/api/admin"))
//         window.location.replace("/superadmin/login");
//       else if (url.includes("/admin"))
//         window.location.replace("/admin/login");
//       else window.location.replace("/login");
//     }
//     return Promise.reject(err);
//   }
// );

// /* ##########################################################
//    ######################## USER AUTH ########################
//    ########################################################## */

// export const sendOtp = (email) => API.post("/log/auth/send-otp", { email });
// export const verifyOtp = (data) => API.post("/log/auth/verify-otp", data);
// export const registerUser = (data) => API.post("/log/auth/register", data);

// export const loginUser = async (data) => {
//   const res = await API.post("/log/auth/login", data, {
//     transformResponse: [(d) => d],
//   });
//   localStorage.setItem(tokenKeys.user, res.data);
//   return res;
// };

// export const logoutUser = () => {
//   localStorage.removeItem(tokenKeys.user);
//   return API.post("/log/auth/logout");
// };

// export const forgotPassword = (email) =>
//   API.post("/log/user/forgotPassword", { email });

// export const resetPassword = (data) =>
//   API.post("/log/user/resetPassword", data);

// /* ######################## USER CRUD ######################## */

// export const getUserByEmail = (email) =>
//   API.get(`/log/user/email?email=${encodeURIComponent(email)}`);

// export const getUserById = (id) => API.get(`/log/user/${id}`);
// export const updateUser = (id, data) => API.put(`/log/user/${id}`, data);
// export const deleteUser = (id) => API.delete(`/log/user/${id}`);

// /* ######################## ADDRESS ########################## */

// export const addAddress = (data) => API.post("/log/addresses/add", data);
// export const getAllAddresses = () => API.get("/log/addresses/all");
// export const updateAddress = (id, data) => API.put(`/log/addresses/${id}`, data);
// export const deleteAddress = (id) => API.delete(`/log/addresses/${id}`);
// /* ######################## CART ############################# */

// export const addItemToCart = (item) => API.post("/cart/items", item);
// export const getCartItems = () => API.get("/cart/items");

// export const updateCartItem = (foodId, quantity) =>
//   API.put("/cart/items", { foodId, quantity });

// export const removeCartItem = (foodId) =>
//   API.delete("/cart/items", { data: { foodId } });

// export const getCartTotal = () => API.get("/cart/total");

// /* NEW — FULL CART CLEAR AFTER SUCCESS */
// export const clearUserCart = () => API.delete("/cart/clear");


// /* ######################## USER SUBSCRIPTIONS #################### */

// export const getAllPlans = () => API.get("/subscri/plans");
// export const getPlansByDuration = (d) =>
//   API.get(`/subscri/plans/duration/${d}`);
// export const getGroupedPlans = () => API.get("/subscri/plans/grouped");

// export const createSubscription = (data) =>
//   API.post("/subscri/subscriptions", data);

// export const getSubscriptionById = (id) =>
//   API.get(`/subscri/subscriptions/${id}`);

// export const getAllSubscriptions = () => API.get("/subscri/subscriptions");

// export const deleteSubscriptionById = (id) =>
//   API.delete(`/subscri/subscriptions/${id}`);

// export const switchSubscription = (id, data) =>
//   API.put(`/subscri/subscriptions/${id}/switch`, data);

// export const renewSubscription = (id, data) =>
//   API.put(`/subscri/subscriptions/${id}/renew`, data);

// export const getSubscriptionReview = (id) =>
//   API.get(`/subscri/subscriptions/user/${id}/review`);

// /* ##########################################################
//    ######################## USER ORDERS ###################### 
//    ########################################################## */

// export const checkoutOrder = (data) =>
//   API.post("/usr/orders/checkout", data);

// export const placeOrder = (data) => API.post("/usr/orders", data);

// export const userCreateOrder = (data) => API.post("/ordr/orders", data);
// export const userGetAllOrders = () => API.get("/ordr/orders");
// export const userGetOrderById = (id) => API.get(`/ordr/orders/${id}`);

// export const userGetOrdersByStatus = (status) =>
//   API.get(`/ordr/orders`, { params: { status } });

// export const userUpdateOrderStatus = (id, data) =>
//   API.put(`/ordr/orders/${id}/status`, data);

// /* Legacy */
// export const getOrdersByUserId = (userId) =>
//   API.get(`/usr/orders/user/${userId}`);
// export const getOrderById = (id) => API.get(`/usr/orders/${id}`);

// /* ##########################################################
//    ######################## ADMIN AUTH ####################### 
//    ########################################################## */

// export const adminLogin = async (data) => {
//   const res = await API.post("/admin/login", data, {
//     transformResponse: [(raw) => raw],
//   });

//   let token;
//   try {
//     token = JSON.parse(res.data).token;
//   } catch {
//     token = res?.data?.token;
//   }

//   localStorage.setItem(tokenKeys.admin, token);
//   return res;
// };

// export const adminForgotPassword = (email) =>
//   API.post("/admin/forgot-password", { email });

// export const adminResetPassword = (data) =>
//   API.post("/admin/reset-password", data);


// export const adminLogout = async () => {
//   const token = localStorage.getItem(tokenKeys.admin);
//   const res = await API.post(
//     "/admin/logout",
//     {},
//     { headers: { Authorization: `Bearer ${token}` } }
//   );

//   localStorage.removeItem(tokenKeys.admin);
//   return res;
// };

// /* ##########################################################
//    ###################### SUPER ADMIN ######################## 
//    ########################################################## */

// export const superLogin = async (data) => {
//   const res = await API.post("/api/admin/login", data, {
//     transformResponse: [(raw) => raw],
//   });

//   let token;
//   try {
//     token = JSON.parse(res.data).token;
//   } catch {
//     token = res?.data?.token;
//   }

//   localStorage.setItem(tokenKeys.super, token);
//   return res;
// };

// export const superLogout = () => {
//   localStorage.removeItem(tokenKeys.super);
//   return API.post("/api/admin/logout");
// };

// export const getReports = () => API.get("/api/admin/reports");

// export const getKitchens = () => API.get("/api/admin/kitchens");
// export const createKitchen = (data) => API.post("/api/admin/kitchens", data);
// export const deleteKitchen = (id) =>
//   API.delete(`/api/admin/kitchens/${id}`);

// export const getManagers = () => API.get("/api/admin/managers");
// export const createManager = (data) => API.post("/api/admin/managers", data);
// export const deleteManager = (id) =>
//   API.delete(`/api/admin/managers/${id}`);

// export const exportAll = () =>
//   API.get("/api/admin/export/all", { responseType: "blob" });

// export const exportKitchenById = (id) =>
//   API.get(`/api/admin/export/kitchen/${id}`, { responseType: "blob" });

// /* ##########################################################
//    ################### ADMIN CUISINES ########################
//    ########################################################## */

// export const adminCreateCuisine = (data) =>
//   API.post("/adminn/cuisines", data);

// export const adminGetCuisineById = (id) =>
//   API.get(`/adminn/cuisines/${id}`);

// export const adminGetCuisineByRegion = (region) =>
//   API.get(`/adminn/cuisines/region/${region}`);

// export const adminGetCuisineByState = (state) =>
//   API.get(`/adminn/cuisines/state/${state}`);

// export const adminUpdateCuisine = (id, data) =>
//   API.put(`/adminn/cuisines/id/${id}`, data);

// export const adminDeleteCuisine = (id) =>
//   API.delete(`/adminn/cuisines/id/${id}`);

// /* ##########################################################
//    ################### ADMIN MEAL ###########################
//    ########################################################## */

// export const adminCreateMeal = (data) => API.post("/adminn/meals", data);

// export const adminGetMealById = (id) =>
//   API.get(`/adminn/meals/${id}`);

// export const adminGetMealsByState = (state) =>
//   API.get(`/adminn/meals/state/${state}`);

// export const adminGetMealsByRegion = (region) =>
//   API.get(`/adminn/meals/region/${region}`);

// export const adminGetMealByName = (name) =>
//   API.get(`/adminn/meals/name/${name}`);

// export const adminUpdateMeal = (id, data) =>
//   API.put(`/adminn/meals/${id}`, data);

// export const adminDeleteMeal = (id) =>
//   API.delete(`/adminn/meals/${id}`);

// /* ##########################################################
//    ################### USER CUISINE ##########################
//    ########################################################## */

// export const getUserCuisines = () => API.get("/user/cuisines");
// export const getUserCuisineById = (id) => API.get(`/user/cuisines/${id}`);
// export const getUserCuisinesByRegion = (region) =>
//   API.get(`/user/cuisines/region/${region}`);
// export const getUserCuisinesByState = (state) =>
//   API.get(`/user/cuisines/state/${state}`);
// export const searchUserCuisineByName = (name) =>
//   API.get(`/user/cuisines/name/${name}`);

// /* ##########################################################
//    ################### USER MEAL #############################
//    ########################################################## */

// export const getUserMeals = () => API.get("/user/meals");
// export const getUserMealById = (id) => API.get(`/user/meals/${id}`);
// export const getUserMealsByName = (name) =>
//   API.get(`/user/meals/mealName/${name}`);
// export const getUserMealsByType = (type) =>
//   API.get(`/user/meals/mealType/${type}`);
// export const getUserMealsByRegion = (region) =>
//   API.get(`/user/meals/region/${region}`);
// export const getUserMealsByState = (state) =>
//   API.get(`/user/meals/state/${state}`);

// /* ##########################################################
//    ################### ADMIN SUBSCRIPTIONS ####################
//    ########################################################## */

// export const adminGetAllSubscriptions = (status, subscriptionid) =>
//   API.get("/api/admin/subscriptions", {
//     params: { status, subscriptionid },
//   });

// export const adminGetSubscriptionById = (subscriptionid) =>
//   API.get(`/api/admin/subscriptions/${subscriptionid}`);

// export const adminDeleteSubscription = (subscriptionid) =>
//   API.delete(`/api/admin/subscriptions/${subscriptionid}`);

// export const adminCountSubscriptions = () =>
//   API.get("/api/admin/subscriptions/count");

// export const adminExpiringSoonSubscriptions = (days = 7) =>
//   API.get("/api/admin/subscriptions/expiring-soon", {
//     params: { days },
//   });

// /* ##########################################################
//    ################### ADMIN REVIEWS #########################
//    ########################################################## */

// export const getAllAdminReviews = () => API.get("/rev/reviews");
// export const getRepliesByReviewId = (reviewId) =>
//   API.get(`/rev/replies/${reviewId}`);
// export const addAdminReply = (adminId, reviewId, reply) =>
//   API.post(`/rev/${adminId}/replies/${reviewId}`, { reply });
// export const updateAdminReply = (reviewId, reply) =>
//   API.put(`/rev/replies/${reviewId}`, { reply });
// export const deleteAdminReply = (reviewId) =>
//   API.delete(`/rev/replies/${reviewId}`);

// /* ##########################################################
//    ################### ADMIN ORDERS (BACKEND MATCH) ##########
//    ########################################################## */

// // export const adminGetAllOrders = (params = {}) =>
// //   API.get("/ordr/admin/orders", { params });

// export const adminGetAllOrders = (params = {}) =>
//   API.get("/ordr/admin/orders", { params });


// export const adminGetOrderById = (orderId) =>
//   API.get(`/ordr/admin/orders/${orderId}`);

// export const adminGetOrderTimeline = (orderId) =>
//   API.get(`/ordr/admin/orders/${orderId}/timeline`);

// export const adminUpdateOrderStatus = (orderId, data) =>
//   API.put(`/ordr/admin/orders/${orderId}/status`, data);

// export const adminGetRejectionDetails = (orderId) =>
//   API.get(`/ordr/admin/orders/${orderId}/rejection`);

// export const adminGetOrdersCount = () =>
//   API.get("/ordr/admin/orders/count");

// export const adminAssignDeliveryPartner = (orderId, partnerId) =>
//   API.post(`/ordr/admin/orders/${orderId}/assign`, { partnerId });

// /* ##########################################################
//    ################### DELIVERY PARTNERS (ADMIN CRUD) ########
//    ########################################################## */

// /* ##########################################################
//    ################### DELIVERY PARTNERS (ADMIN) #############
//    ########################################################## */

// export const getAllDeliveryPartners = () =>
//   API.get("/ordr/delivery-partners");

// export const getDeliveryPartnerById = (id) =>
//   API.get(`/ordr/delivery-partners/${id}`);

// export const createDeliveryPartner = (data) =>
//   API.post("/ordr/delivery-partners", data);

// export const updateDeliveryPartner = (id, data) =>
//   API.put(`/ordr/delivery-partners/${id}`, data);

// export const deleteDeliveryPartner = (id) =>
//   API.delete(`/ordr/delivery-partners/${id}`);

// /* ##########################################################
//    ################### USER REVIEWS (FINAL) ##################
//    ########################################################## */

// // Create new review
// export const createReview = (data) =>
//   API.post("/reviews", data);

// // Get all reviews (admin panel)
// export const getAllReviews = () =>
//   API.get("/reviews");

// // Get single review by ID
// export const getReviewById = (id) =>
//   API.get(`/reviews/${id}`);

// // Get reviews by ORDER ID  <-- NEW & CORRECT
// export const getReviewsByOrderId = (orderId) =>
//   API.get(`/reviews/order/${orderId}`);

// // Update review
// export const updateReview = (id, data) =>
//   API.put(`/reviews/${id}`, data);

// // Delete review
// export const deleteReviewApi = (id) =>
//   API.delete(`/reviews/${id}`);



// imp............


// export default API;









// /* ==========================================================
//    src/api/api.js  
//    FINAL — USER + ADMIN + SUPERADMIN + CUISINE + MEAL + SUBSCRIPTION
//    (ADMIN ORDER + DELIVERY PERFECT, SUPERADMIN DELIVERY REMOVED)
//    ========================================================== */

// import axios from "axios";

// /* ==========================================================
//    BASE AXIOS INSTANCE
//    ========================================================== */
// const API = axios.create({
//   baseURL: "http://localhost:9090",
//   headers: { "Content-Type": "application/json" },
// });

// /* ==========================================================
//    TOKEN STORAGE (SEPARATE PER ROLE)
//    ========================================================== */
// const tokenKeys = {
//   user: "user_token",
//   admin: "admin_token",
//   super: "super_token",
// };

// // Clear ALL possible tokens (user, admin, super + generic)
// const clearAllTokens = () => {
//   const keys = ["token", ...Object.values(tokenKeys)];
//   keys.forEach((k) => localStorage.removeItem(k));
// };

// /* ==========================================================
//    REQUEST → Attach JWT (ROLE AWARE)
//    ========================================================== */
// API.interceptors.request.use((config) => {
//   const url = config.url || "";
//   let token = null;

//   // Prefer token based on route
//   if (url.startsWith("/api/admin")) {
//     // SUPER ADMIN APIs
//     token = localStorage.getItem(tokenKeys.super);
//   } else if (url.startsWith("/admin")) {
//     // ADMIN APIs
//     token = localStorage.getItem(tokenKeys.admin);
//   } else {
//     // USER APIs (normal app)
//     token =
//       localStorage.getItem("token") || // used by AuthContext for user
//       localStorage.getItem(tokenKeys.user);
//   }

//   // Fallback priority (super > admin > user)
//   if (!token) {
//     token =
//       localStorage.getItem(tokenKeys.super) ||
//       localStorage.getItem(tokenKeys.admin) ||
//       localStorage.getItem("token") ||
//       localStorage.getItem(tokenKeys.user);
//   }

//   if (token && typeof token === "string" && !token.includes("{")) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

// /* ==========================================================
//    RESPONSE → Auto redirect on 401
//    ========================================================== */
// API.interceptors.response.use(
//   (res) => res,
//   (err) => {
//     if (err?.response?.status === 401) {
//       clearAllTokens();
//       const url = err.config?.url || "";

//       if (url.includes("/api/admin")) {
//         window.location.replace("/superadmin/login");
//       } else if (url.includes("/admin")) {
//         window.location.replace("/admin/login");
//       } else {
//         window.location.replace("/login");
//       }
//     }
//     return Promise.reject(err);
//   }
// );

// /* ##########################################################
//    ######################## USER AUTH ########################
//    ########################################################## */

// export const sendOtp = (email) => API.post("/log/auth/send-otp", { email });
// export const verifyOtp = (data) => API.post("/log/auth/verify-otp", data);
// export const registerUser = (data) => API.post("/log/auth/register", data);

// // USER LOGIN (returns raw token string)
// export const loginUser = async (data) => {
//   const res = await API.post("/log/auth/login", data, {
//     transformResponse: [(d) => d], // keep raw string
//   });

//   // Optional: legacy storage (for old code)
//   localStorage.setItem(tokenKeys.user, res.data);

//   // NOTE: AuthContext login() "token" key handle karega
//   return res;
// };

// export const logoutUser = () => {
//   // Clear user related tokens (both keys)
//   localStorage.removeItem(tokenKeys.user);
//   localStorage.removeItem("token");
//   return API.post("/log/auth/logout");
// };

// export const forgotPassword = (email) =>
//   API.post("/log/user/forgotPassword", { email });

// export const resetPassword = (data) =>
//   API.post("/log/user/resetPassword", data);

// /* ######################## USER CRUD ######################## */

// export const getUserByEmail = (email) =>
//   API.get(`/log/user/email?email=${encodeURIComponent(email)}`);

// export const getUserById = (id) => API.get(`/log/user/${id}`);
// export const updateUser = (id, data) => API.put(`/log/user/${id}`, data);
// export const deleteUser = (id) => API.delete(`/log/user/${id}`);

// /* ######################## ADDRESS ########################## */

// export const addAddress = (data) => API.post("/log/addresses/add", data);
// export const getAllAddresses = () => API.get("/log/addresses/all");
// export const updateAddress = (id, data) =>
//   API.put(`/log/addresses/${id}`, data);
// export const deleteAddress = (id) => API.delete(`/log/addresses/${id}`);

// /* ######################## CART ############################# */

// export const addItemToCart = (item) => API.post("/cart/items", item);
// export const getCartItems = () => API.get("/cart/items");

// export const updateCartItem = (foodId, quantity) =>
//   API.put("/cart/items", { foodId, quantity });

// export const removeCartItem = (foodId) =>
//   API.delete("/cart/items", { data: { foodId } });

// export const getCartTotal = () => API.get("/cart/total");

// // NEW — FULL CART CLEAR AFTER SUCCESS
// export const clearUserCart = () => API.delete("/cart/clear");

// /* ######################## USER SUBSCRIPTIONS #################### */

// export const getAllPlans = () => API.get("/subscri/plans");
// export const getPlansByDuration = (d) =>
//   API.get(`/subscri/plans/duration/${d}`);
// export const getGroupedPlans = () => API.get("/subscri/plans/grouped");

// export const createSubscription = (data) =>
//   API.post("/subscri/subscriptions", data);

// export const getSubscriptionById = (id) =>
//   API.get(`/subscri/subscriptions/${id}`);

// export const getAllSubscriptions = () => API.get("/subscri/subscriptions");

// export const deleteSubscriptionById = (id) =>
//   API.delete(`/subscri/subscriptions/${id}`);

// export const switchSubscription = (id, data) =>
//   API.put(`/subscri/subscriptions/${id}/switch`, data);

// export const renewSubscription = (id, data) =>
//   API.put(`/subscri/subscriptions/${id}/renew`, data);

// export const getSubscriptionReview = (id) =>
//   API.get(`/subscri/subscriptions/user/${id}/review`);

// /* ##########################################################
//    ######################## USER ORDERS ###################### 
//    ########################################################## */

// export const checkoutOrder = (data) =>
//   API.post("/usr/orders/checkout", data);

// export const placeOrder = (data) => API.post("/usr/orders", data);

// export const userCreateOrder = (data) => API.post("/ordr/orders", data);
// export const userGetAllOrders = () => API.get("/ordr/orders");
// export const userGetOrderById = (id) => API.get(`/ordr/orders/${id}`);

// export const userGetOrdersByStatus = (status) =>
//   API.get(`/ordr/orders`, { params: { status } });

// export const userUpdateOrderStatus = (id, data) =>
//   API.put(`/ordr/orders/${id}/status`, data);

// // Legacy
// export const getOrdersByUserId = (userId) =>
//   API.get(`/usr/orders/user/${userId}`);
// export const getOrderById = (id) => API.get(`/usr/orders/${id}`);

// /* ##########################################################
//    ######################## ADMIN AUTH ####################### 
//    ########################################################## */

// export const adminLogin = async (data) => {
//   const res = await API.post("/admin/login", data, {
//     transformResponse: [(raw) => raw],
//   });

//   let token;
//   try {
//     token = JSON.parse(res.data).token;
//   } catch {
//     token = res?.data?.token;
//   }

//   localStorage.setItem(tokenKeys.admin, token);
//   return res;
// };

// export const adminForgotPassword = (email) =>
//   API.post("/admin/forgot-password", { email });

// export const adminResetPassword = (data) =>
//   API.post("/admin/reset-password", data);

// export const adminLogout = async () => {
//   const token = localStorage.getItem(tokenKeys.admin);
//   const res = await API.post(
//     "/admin/logout",
//     {},
//     { headers: { Authorization: `Bearer ${token}` } }
//   );

//   localStorage.removeItem(tokenKeys.admin);
//   return res;
// };

// /* ##########################################################
//    ###################### SUPER ADMIN ######################## 
//    ########################################################## */

// export const superLogin = async (data) => {
//   const res = await API.post("/api/admin/login", data, {
//     transformResponse: [(raw) => raw],
//   });

//   let token;
//   try {
//     token = JSON.parse(res.data).token;
//   } catch {
//     token = res?.data?.token;
//   }

//   localStorage.setItem(tokenKeys.super, token);
//   return res;
// };

// export const superLogout = () => {
//   localStorage.removeItem(tokenKeys.super);
//   return API.post("/api/admin/logout");
// };

// export const getReports = () => API.get("/api/admin/reports");

// export const getKitchens = () => API.get("/api/admin/kitchens");
// export const createKitchen = (data) => API.post("/api/admin/kitchens", data);
// export const deleteKitchen = (id) =>
//   API.delete(`/api/admin/kitchens/${id}`);

// export const getManagers = () => API.get("/api/admin/managers");
// export const createManager = (data) => API.post("/api/admin/managers", data);
// export const deleteManager = (id) =>
//   API.delete(`/api/admin/managers/${id}`);

// export const exportAll = () =>
//   API.get("/api/admin/export/all", { responseType: "blob" });

// export const exportKitchenById = (id) =>
//   API.get(`/api/admin/export/kitchen/${id}`, { responseType: "blob" });

// /* ##########################################################
//    ################### ADMIN CUISINES ########################
//    ########################################################## */

// export const adminCreateCuisine = (data) =>
//   API.post("/adminn/cuisines", data);

// export const adminGetCuisineById = (id) =>
//   API.get(`/adminn/cuisines/${id}`);

// export const adminGetCuisineByRegion = (region) =>
//   API.get(`/adminn/cuisines/region/${region}`);

// export const adminGetCuisineByState = (state) =>
//   API.get(`/adminn/cuisines/state/${state}`);

// export const adminUpdateCuisine = (id, data) =>
//   API.put(`/adminn/cuisines/id/${id}`, data);

// export const adminDeleteCuisine = (id) =>
//   API.delete(`/adminn/cuisines/id/${id}`);

// /* ##########################################################
//    ################### ADMIN MEAL ###########################
//    ########################################################## */

// export const adminCreateMeal = (data) => API.post("/adminn/meals", data);

// export const adminGetMealById = (id) =>
//   API.get(`/adminn/meals/${id}`);

// export const adminGetMealsByState = (state) =>
//   API.get(`/adminn/meals/state/${state}`);

// export const adminGetMealsByRegion = (region) =>
//   API.get(`/adminn/meals/region/${region}`);

// export const adminGetMealByName = (name) =>
//   API.get(`/adminn/meals/name/${name}`);

// export const adminUpdateMeal = (id, data) =>
//   API.put(`/adminn/meals/${id}`, data);

// export const adminDeleteMeal = (id) =>
//   API.delete(`/adminn/meals/${id}`);

// /* ##########################################################
//    ################### USER CUISINE ##########################
//    ########################################################## */

// export const getUserCuisines = () => API.get("/user/cuisines");
// export const getUserCuisineById = (id) => API.get(`/user/cuisines/${id}`);
// export const getUserCuisinesByRegion = (region) =>
//   API.get(`/user/cuisines/region/${region}`);
// export const getUserCuisinesByState = (state) =>
//   API.get(`/user/cuisines/state/${state}`);
// export const searchUserCuisineByName = (name) =>
//   API.get(`/user/cuisines/name/${name}`);

// /* ##########################################################
//    ################### USER MEAL #############################
//    ########################################################## */

// export const getUserMeals = () => API.get("/user/meals");
// export const getUserMealById = (id) => API.get(`/user/meals/${id}`);
// export const getUserMealsByName = (name) =>
//   API.get(`/user/meals/mealName/${name}`);
// export const getUserMealsByType = (type) =>
//   API.get(`/user/meals/mealType/${type}`);
// export const getUserMealsByRegion = (region) =>
//   API.get(`/user/meals/region/${region}`);
// export const getUserMealsByState = (state) =>
//   API.get(`/user/meals/state/${state}`);

// /* ##########################################################
//    ################### ADMIN SUBSCRIPTIONS ####################
//    ########################################################## */

// export const adminGetAllSubscriptions = (status, subscriptionid) =>
//   API.get("/api/admin/subscriptions", {
//     params: { status, subscriptionid },
//   });

// export const adminGetSubscriptionById = (subscriptionid) =>
//   API.get(`/api/admin/subscriptions/${subscriptionid}`);

// export const adminDeleteSubscription = (subscriptionid) =>
//   API.delete(`/api/admin/subscriptions/${subscriptionid}`);

// export const adminCountSubscriptions = () =>
//   API.get("/api/admin/subscriptions/count");

// export const adminExpiringSoonSubscriptions = (days = 7) =>
//   API.get("/api/admin/subscriptions/expiring-soon", {
//     params: { days },
//   });

// /* ##########################################################
//    ################### ADMIN REVIEWS #########################
//    ########################################################## */

// export const getAllAdminReviews = () => API.get("/rev/reviews");
// export const getRepliesByReviewId = (reviewId) =>
//   API.get(`/rev/replies/${reviewId}`);
// export const addAdminReply = (adminId, reviewId, reply) =>
//   API.post(`/rev/${adminId}/replies/${reviewId}`, { reply });
// export const updateAdminReply = (reviewId, reply) =>
//   API.put(`/rev/replies/${reviewId}`, { reply });
// export const deleteAdminReply = (reviewId) =>
//   API.delete(`/rev/replies/${reviewId}`);

// /* ##########################################################
//    ################### ADMIN ORDERS ##########################
//    ########################################################## */

// export const adminGetAllOrders = (params = {}) =>
//   API.get("/ordr/admin/orders", { params });

// export const adminGetOrderById = (orderId) =>
//   API.get(`/ordr/admin/orders/${orderId}`);

// export const adminGetOrderTimeline = (orderId) =>
//   API.get(`/ordr/admin/orders/${orderId}/timeline`);

// export const adminUpdateOrderStatus = (orderId, data) =>
//   API.put(`/ordr/admin/orders/${orderId}/status`, data);

// export const adminGetRejectionDetails = (orderId) =>
//   API.get(`/ordr/admin/orders/${orderId}/rejection`);

// export const adminGetOrdersCount = () =>
//   API.get("/ordr/admin/orders/count");

// export const adminAssignDeliveryPartner = (orderId, partnerId) =>
//   API.post(`/ordr/admin/orders/${orderId}/assign`, { partnerId });

// /* ##########################################################
//    ################### DELIVERY PARTNERS (ADMIN) #############
//    ########################################################## */

// export const getAllDeliveryPartners = () =>
//   API.get("/ordr/delivery-partners");

// export const getDeliveryPartnerById = (id) =>
//   API.get(`/ordr/delivery-partners/${id}`);

// export const createDeliveryPartner = (data) =>
//   API.post("/ordr/delivery-partners", data);

// export const updateDeliveryPartner = (id, data) =>
//   API.put(`/ordr/delivery-partners/${id}`, data);

// export const deleteDeliveryPartner = (id) =>
//   API.delete(`/ordr/delivery-partners/${id}`);

// /* ##########################################################
//    ################### USER REVIEWS (FINAL) ##################
//    ########################################################## */

// // Create new review
// export const createReview = (data) => API.post("/reviews", data);

// // Get all reviews (user/admin UI)
// export const getAllReviews = () => API.get("/reviews");

// // Get single review by ID
// export const getReviewById = (id) => API.get(`/reviews/${id}`);

// // Get reviews by ORDER ID
// export const getReviewsByOrderId = (orderId) =>
//   API.get(`/reviews/order/${orderId}`);

// // Update review
// export const updateReview = (id, data) =>
//   API.put(`/reviews/${id}`, data);

// // Delete review
// export const deleteReviewApi = (id) =>
//   API.delete(`/reviews/${id}`);

// export default API;

// This is imp one all working api










/* ==========================================================
   src/api/api.js  
   FINAL — USER + ADMIN + SUPERADMIN + CUISINE + MEAL + SUBSCRIPTION
   (ADMIN ORDER + DELIVERY PERFECT, SUPERADMIN DELIVERY REMOVED)
   ========================================================== */

import axios from "axios";

/* ==========================================================
   BASE AXIOS INSTANCE (ENV BASED)
   ========================================================== */

// Prefer value from Vite env: VITE_API_BASE_URL
// .env.development / .env.production me define karo
// Example:
// VITE_API_BASE_URL=http://localhost:9090
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
 
if (!BASE_URL) {
  throw new Error("VITE_API_BASE_URL is not defined");
}
const API = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

/* ==========================================================
   TOKEN STORAGE (SEPARATE PER ROLE)
   ========================================================== */
const tokenKeys = {
  user: "user_token",
  admin: "admin_token",
  super: "super_token",
};

// Clear ALL possible tokens (user, admin, super + generic)
const clearAllTokens = () => {
  const keys = ["token", ...Object.values(tokenKeys)];
  keys.forEach((k) => localStorage.removeItem(k));
};

/* ==========================================================
   REQUEST → Attach JWT (ROLE AWARE)
   ========================================================== */
API.interceptors.request.use((config) => {
  const url = config.url || "";
  let token = null;

  // Prefer token based on route
  if (url.startsWith("/api/admin")) {
    // SUPER ADMIN APIs
    token = localStorage.getItem(tokenKeys.super);
  } else if (url.startsWith("/admin")) {
    // ADMIN APIs
    token = localStorage.getItem(tokenKeys.admin);
  } else {
    // USER APIs (normal app)
    token =
      localStorage.getItem("token") || // used by AuthContext for user
      localStorage.getItem(tokenKeys.user);
  }

  // Fallback priority (super > admin > user)
  if (!token) {
    token =
      localStorage.getItem(tokenKeys.super) ||
      localStorage.getItem(tokenKeys.admin) ||
      localStorage.getItem("token") ||
      localStorage.getItem(tokenKeys.user);
  }

  if (token && typeof token === "string" && !token.includes("{")) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

/* ==========================================================
   RESPONSE → Auto redirect on 401
   ========================================================== */
API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      clearAllTokens();
      const url = err.config?.url || "";

      if (url.includes("/api/admin")) {
        window.location.replace("/superadmin/login");
      } else if (url.includes("/admin")) {
        window.location.replace("/admin/login");
      } else {
        window.location.replace("/login");
      }
    }
    return Promise.reject(err);
  }
);

/* ##########################################################
   ######################## USER AUTH ########################
   ########################################################## */

export const sendOtp = (email) => API.post("/log/auth/send-otp", { email });
export const verifyOtp = (data) => API.post("/log/auth/verify-otp", data);
export const registerUser = (data) => API.post("/log/auth/register", data);

// USER LOGIN (returns raw token string)
export const loginUser = async (data) => {
  const res = await API.post("/log/auth/login", data, {
    transformResponse: [(d) => d], // keep raw string
  });

  // Optional: legacy storage (for old code)
  localStorage.setItem(tokenKeys.user, res.data);

  // NOTE: AuthContext login() "token" key handle karega
  return res;
};

export const logoutUser = () => {
  // Clear user related tokens (both keys)
  localStorage.removeItem(tokenKeys.user);
  localStorage.removeItem("token");
  return API.post("/log/auth/logout");
};

export const forgotPassword = (email) =>
  API.post("/log/user/forgotPassword", { email });

export const resetPassword = (data) =>
  API.post("/log/user/resetPassword", data);

/* ######################## USER CRUD ######################## */

export const getUserByEmail = (email) =>
  API.get(`/log/user/email?email=${encodeURIComponent(email)}`);

export const getUserById = (id) => API.get(`/log/user/${id}`);
export const updateUser = (id, data) => API.put(`/log/user/${id}`, data);
export const deleteUser = (id) => API.delete(`/log/user/${id}`);

/* ######################## ADDRESS ########################## */

export const addAddress = (data) => API.post("/log/addresses/add", data);
export const getAllAddresses = () => API.get("/log/addresses/all");
export const updateAddress = (id, data) =>
  API.put(`/log/addresses/${id}`, data);
export const deleteAddress = (id) => API.delete(`/log/addresses/${id}`);

/* ######################## CART ############################# */

export const addItemToCart = (item) => API.post("/cart/items", item);
export const getCartItems = () => API.get("/cart/items");

export const updateCartItem = (foodId, quantity) =>
  API.put("/cart/items", { foodId, quantity });

export const removeCartItem = (foodId) =>
  API.delete("/cart/items", { data: { foodId } });

export const getCartTotal = () => API.get("/cart/total");

// NEW — FULL CART CLEAR AFTER SUCCESS
export const clearUserCart = () => API.delete("/cart/clear");

/* ######################## USER SUBSCRIPTIONS #################### */

export const getAllPlans = () => API.get("/subscri/plans");
export const getPlansByDuration = (d) =>
  API.get(`/subscri/plans/duration/${d}`);
export const getGroupedPlans = () => API.get("/subscri/plans/grouped");

export const createSubscription = (data) =>
  API.post("/subscri/subscriptions", data);

export const getSubscriptionById = (id) =>
  API.get(`/subscri/subscriptions/${id}`);

export const getAllSubscriptions = () => API.get("/subscri/subscriptions");

export const deleteSubscriptionById = (id) =>
  API.delete(`/subscri/subscriptions/${id}`);

export const switchSubscription = (id, data) =>
  API.put(`/subscri/subscriptions/${id}/switch`, data);

export const renewSubscription = (id, data) =>
  API.put(`/subscri/subscriptions/${id}/renew`, data);

export const getSubscriptionReview = (id) =>
  API.get(`/subscri/subscriptions/user/${id}/review`);

/* ##########################################################
   ######################## USER ORDERS ###################### 
   ########################################################## */

export const checkoutOrder = (data) =>
  API.post("/usr/orders/checkout", data);

export const placeOrder = (data) => API.post("/usr/orders", data);

export const userCreateOrder = (data) => API.post("/ordr/orders", data);
export const userGetAllOrders = () => API.get("/ordr/orders");
export const userGetOrderById = (id) => API.get(`/ordr/orders/${id}`);

export const userGetOrdersByStatus = (status) =>
  API.get(`/ordr/orders`, { params: { status } });

export const userUpdateOrderStatus = (id, data) =>
  API.put(`/ordr/orders/${id}/status`, data);

// Legacy
export const getOrdersByUserId = (userId) =>
  API.get(`/usr/orders/user/${userId}`);
export const getOrderById = (id) => API.get(`/usr/orders/${id}`);

/* ##########################################################
   ######################## ADMIN AUTH ####################### 
   ########################################################## */

export const adminLogin = async (data) => {
  const res = await API.post("/admin/login", data, {
    transformResponse: [(raw) => raw],
  });

  let token;
  try {
    token = JSON.parse(res.data).token;
  } catch {
    token = res?.data?.token;
  }

  localStorage.setItem(tokenKeys.admin, token);
  return res;
};

export const adminForgotPassword = (email) =>
  API.post("/admin/forgot-password", { email });

export const adminResetPassword = (data) =>
  API.post("/admin/reset-password", data);

export const adminLogout = async () => {
  const token = localStorage.getItem(tokenKeys.admin);
  const res = await API.post(
    "/admin/logout",
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );

  localStorage.removeItem(tokenKeys.admin);
  return res;
};

/* ##########################################################
   ###################### SUPER ADMIN ######################## 
   ########################################################## */

export const superLogin = async (data) => {
  const res = await API.post("/api/admin/login", data, {
    transformResponse: [(raw) => raw],
  });

  let token;
  try {
    token = JSON.parse(res.data).token;
  } catch {
    token = res?.data?.token;
  }

  localStorage.setItem(tokenKeys.super, token);
  return res;
};

export const superLogout = () => {
  localStorage.removeItem(tokenKeys.super);
  return API.post("/api/admin/logout");
};

export const getReports = () => API.get("/api/admin/reports");

export const getKitchens = () => API.get("/api/admin/kitchens");
export const createKitchen = (data) => API.post("/api/admin/kitchens", data);
export const deleteKitchen = (id) =>
  API.delete(`/api/admin/kitchens/${id}`);

export const getManagers = () => API.get("/api/admin/managers");
export const createManager = (data) => API.post("/api/admin/managers", data);
export const deleteManager = (id) =>
  API.delete(`/api/admin/managers/${id}`);

export const exportAll = () =>
  API.get("/api/admin/export/all", { responseType: "blob" });

export const exportKitchenById = (id) =>
  API.get(`/api/admin/export/kitchen/${id}`, { responseType: "blob" });

/* ##########################################################
   ################### ADMIN CUISINES ########################
   ########################################################## */

export const adminCreateCuisine = (data) =>
  API.post("/adminn/cuisines", data);

export const adminGetCuisineById = (id) =>
  API.get(`/adminn/cuisines/${id}`);

export const adminGetCuisineByRegion = (region) =>
  API.get(`/adminn/cuisines/region/${region}`);

export const adminGetCuisineByState = (state) =>
  API.get(`/adminn/cuisines/state/${state}`);

export const adminUpdateCuisine = (id, data) =>
  API.put(`/adminn/cuisines/id/${id}`, data);

export const adminDeleteCuisine = (id) =>
  API.delete(`/adminn/cuisines/id/${id}`);

/* ##########################################################
   ################### ADMIN MEAL ###########################


   ########################################################## */

export const adminCreateMeal = (data) => API.post("/adminn/meals", data);

export const adminGetMealById = (id) =>
  API.get(`/adminn/meals/${id}`);

export const adminGetMealsByState = (state) =>
  API.get(`/adminn/meals/state/${state}`);

export const adminGetMealsByRegion = (region) =>
  API.get(`/adminn/meals/region/${region}`);

export const adminGetMealByName = (name) =>
  API.get(`/adminn/meals/name/${name}`);

export const adminUpdateMeal = (id, data) =>
  API.put(`/adminn/meals/${id}`, data);

export const adminDeleteMeal = (id) =>
  API.delete(`/adminn/meals/${id}`);

/* ##########################################################
   ################### USER CUISINE ##########################


   ########################################################## */

export const getUserCuisines = () => API.get("/user/cuisines");
export const getUserCuisineById = (id) => API.get(`/user/cuisines/${id}`);
export const getUserCuisinesByRegion = (region) =>
  API.get(`/user/cuisines/region/${region}`);
export const getUserCuisinesByState = (state) =>
  API.get(`/user/cuisines/state/${state}`);
export const searchUserCuisineByName = (name) =>
  API.get(`/user/cuisines/name/${name}`);

/* ##########################################################
   ################### USER MEAL #############################
   ########################################################## */

export const getUserMeals = () => API.get("/user/meals");
export const getUserMealById = (id) => API.get(`/user/meals/${id}`);
export const getUserMealsByName = (name) =>
  API.get(`/user/meals/mealName/${name}`);
export const getUserMealsByType = (type) =>
  API.get(`/user/meals/mealType/${type}`);
export const getUserMealsByRegion = (region) =>
  API.get(`/user/meals/region/${region}`);
export const getUserMealsByState = (state) =>
  API.get(`/user/meals/state/${state}`);

/* ##########################################################
   ################### ADMIN SUBSCRIPTIONS ####################
   ########################################################## */

export const adminGetAllSubscriptions = (status, subscriptionid) =>
  API.get("/api/admin/subscriptions", {
    params: { status, subscriptionid },
  });

export const adminGetSubscriptionById = (subscriptionid) =>
  API.get(`/api/admin/subscriptions/${subscriptionid}`);

export const adminDeleteSubscription = (subscriptionid) =>
  API.delete(`/api/admin/subscriptions/${subscriptionid}`);

export const adminCountSubscriptions = () =>
  API.get("/api/admin/subscriptions/count");

export const adminExpiringSoonSubscriptions = (days = 7) =>
  API.get("/api/admin/subscriptions/expiring-soon", {
    params: { days },
  });

/* ##########################################################
   ################### ADMIN REVIEWS #########################
   ########################################################## */

export const getAllAdminReviews = () => API.get("/rev/reviews");
export const getRepliesByReviewId = (reviewId) =>
  API.get(`/rev/replies/${reviewId}`);
export const addAdminReply = (adminId, reviewId, reply) =>
  API.post(`/rev/${adminId}/replies/${reviewId}`, { reply });
export const updateAdminReply = (reviewId, reply) =>
  API.put(`/rev/replies/${reviewId}`, { reply });
export const deleteAdminReply = (reviewId) =>
  API.delete(`/rev/replies/${reviewId}`);

/* ##########################################################
   ################### ADMIN ORDERS ##########################


   ########################################################## */

export const adminGetAllOrders = (params = {}) =>
  API.get("/ordr/admin/orders", { params });

export const adminGetOrderById = (orderId) =>
  API.get(`/ordr/admin/orders/${orderId}`);

export const adminGetOrderTimeline = (orderId) =>
  API.get(`/ordr/admin/orders/${orderId}/timeline`);

export const adminUpdateOrderStatus = (orderId, data) =>
  API.put(`/ordr/admin/orders/${orderId}/status`, data);

export const adminGetRejectionDetails = (orderId) =>
  API.get(`/ordr/admin/orders/${orderId}/rejection`);

export const adminGetOrdersCount = () =>
  API.get("/ordr/admin/orders/count");

export const adminAssignDeliveryPartner = (orderId, partnerId) =>
  API.post(`/ordr/admin/orders/${orderId}/assign`, { partnerId });

/* ##########################################################
   ################### DELIVERY PARTNERS (ADMIN) #############
   ########################################################## */

export const getAllDeliveryPartners = () =>
  API.get("/ordr/delivery-partners");

export const getDeliveryPartnerById = (id) =>
  API.get(`/ordr/delivery-partners/${id}`);

export const createDeliveryPartner = (data) =>
  API.post("/ordr/delivery-partners", data);

export const updateDeliveryPartner = (id, data) =>
  API.put(`/ordr/delivery-partners/${id}`, data);

export const deleteDeliveryPartner = (id) =>
  API.delete(`/ordr/delivery-partners/${id}`);

/* ##########################################################
   ################### USER REVIEWS (FINAL) ##################
   ########################################################## */

// Create new review
export const createReview = (data) => API.post("/reviews", data);

// Get all reviews (user/admin UI)
export const getAllReviews = () => API.get("/reviews");

// Get single review by ID
export const getReviewById = (id) => API.get(`/reviews/${id}`);

// Get reviews by ORDER ID
export const getReviewsByOrderId = (orderId) =>
  API.get(`/reviews/order/${orderId}`);

// Update review
export const updateReview = (id, data) =>
  API.put(`/reviews/${id}`, data);

// Delete review
export const deleteReviewApi = (id) =>
  API.delete(`/reviews/${id}`);

export default API;
