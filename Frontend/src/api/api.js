


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
