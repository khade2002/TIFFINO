


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
  if (url.startsWith("/api/admin")) {      //for update......
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

export const sendOtp = (email) => API.post("/userlog/auth/send-otp", { email });
export const verifyOtp = (data) => API.post("/userlog/auth/verify-otp", data);
export const registerUser = (data) => API.post("/userlog/auth/register", data);

// USER LOGIN (returns raw token string)
export const loginUser = async (data) => {
  const res = await API.post("/userlog/auth/login", data, {
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
  return API.post("/userlog/auth/logout");
};

export const forgotPassword = (email) =>
  API.post("/userlog/user/forgotPassword", { email });

export const resetPassword = (data) =>
  API.post("/userlog/user/resetPassword", data);

/* ######################## USER CRUD ######################## */

export const getUserByEmail = (email) =>
  API.get(`/userlog/user/email?email=${encodeURIComponent(email)}`);

export const getUserById = (id) => API.get(`/userlog/user/${id}`);
export const updateUser = (id, data) => API.put(`/userlog/user/${id}`, data);
export const deleteUser = (id) => API.delete(`/userlog/user/${id}`);

/* ######################## ADDRESS ########################## */

export const addAddress = (data) => API.post("/userlog/addresses/add", data);
export const getAllAddresses = () => API.get("/userlog/addresses/all");
export const updateAddress = (id, data) =>
  API.put(`/userlog/addresses/${id}`, data);
export const deleteAddress = (id) => API.delete(`/userlog/addresses/${id}`);

/* ######################## CART ############################# */

export const addItemToCart = (item) => API.post("/usercart/items", item);
export const getCartItems = () => API.get("/usercart/items");

export const updateCartItem = (foodId, quantity) =>
  API.put("/usercart/items", { foodId, quantity });

export const removeCartItem = (foodId) =>
  API.delete("/usercart/items", { data: { foodId } });

export const getCartTotal = () => API.get("/usercart/total");

// NEW — FULL CART CLEAR AFTER SUCCESS
export const clearUserCart = () => API.delete("/usercart/clear");

/* ######################## USER SUBSCRIPTIONS #################### */

export const getAllPlans = () => API.get("/usersubscription/plans");
export const getPlansByDuration = (d) =>
  API.get(`/usersubscription/plans/duration/${d}`);
export const getGroupedPlans = () => API.get("/usersubscription/plans/grouped");

export const createSubscription = (data) =>
  API.post("/usersubscription/subscriptions", data);

export const getSubscriptionById = (id) =>
  API.get(`/usersubscription/subscriptions/${id}`);

export const getAllSubscriptions = () => API.get("/usersubscription/subscriptions");

export const deleteSubscriptionById = (id) =>
  API.delete(`/usersubscription/subscriptions/${id}`);

export const switchSubscription = (id, data) =>
  API.put(`/usersubscription/subscriptions/${id}/switch`, data);

export const renewSubscription = (id, data) =>
  API.put(`/usersubscription/subscriptions/${id}/renew`, data);

export const getSubscriptionReview = (id) =>
  API.get(`/usersubscription/subscriptions/user/${id}/review`);

/* ##########################################################
   ######################## USER ORDERS ###################### 
   ########################################################## */

export const checkoutOrder = (data) =>
  API.post("/userorder/orders/checkout", data);

export const placeOrder = (data) => API.post("/userorder/orders", data);

export const userCreateOrder = (data) => API.post("/userorder/orders", data);
export const userGetAllOrders = () => API.get("/userorder/orders");
export const userGetOrderById = (id) => API.get(`/userorder/orders/${id}`);

export const userGetOrdersByStatus = (status) =>
  API.get(`/userorder/orders`, { params: { status } });

export const userUpdateOrderStatus = (id, data) =>
  API.put(`/userorder/orders/${id}/status`, data);

// Legacy
export const getOrdersByUserId = (userId) =>
  API.get(`/userorder/orders/user/${userId}`);
export const getOrderById = (id) => API.get(`/userorder/orders/${id}`);

/* ##########################################################
   ######################## ADMIN AUTH ####################### 
   ########################################################## */

export const adminLogin = async (data) => {
  const res = await API.post("/adminlog/login", data, {
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
  API.post("/adminlog/forgot-password", { email });

export const adminResetPassword = (data) =>
  API.post("/adminlog/reset-password", data);

export const adminLogout = async () => {
  const token = localStorage.getItem(tokenKeys.admin);
  const res = await API.post(
    "/adminlog/logout",
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
  const res = await API.post("/super/admin/login", data, {
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
  return API.post("/super/admin/logout");
};

export const getReports = () => API.get("/super/admin/reports");

export const getKitchens = () => API.get("/super/admin/kitchens");
export const createKitchen = (data) => API.post("/super/admin/kitchens", data);
export const deleteKitchen = (id) =>
  API.delete(`/super/admin/kitchens/${id}`);

export const getManagers = () => API.get("/super/admin/managers");
export const createManager = (data) => API.post("/super/admin/managers", data);
export const deleteManager = (id) =>
  API.delete(`/super/admin/managers/${id}`);

export const exportAll = () =>
  API.get("/super/admin/export/all", { responseType: "blob" });

export const exportKitchenById = (id) =>
  API.get(`/super/admin/export/kitchen/${id}`, { responseType: "blob" });

/* ##########################################################
   ################### ADMIN CUISINES ########################
   ########################################################## */

export const adminCreateCuisine = (data) =>
  API.post("/adminmeal/cuisines", data);

export const adminGetCuisineById = (id) =>
  API.get(`/adminmeal/cuisines/${id}`);

export const adminGetCuisineByRegion = (region) =>
  API.get(`/adminmeal/cuisines/region/${region}`);

export const adminGetCuisineByState = (state) =>
  API.get(`/adminmeal/cuisines/state/${state}`);

export const adminUpdateCuisine = (id, data) =>
  API.put(`/adminmeal/cuisines/id/${id}`, data);

export const adminDeleteCuisine = (id) =>
  API.delete(`/adminmeal/cuisines/id/${id}`);

/* ##########################################################
   ################### ADMIN MEAL ###########################


   ########################################################## */

export const adminCreateMeal = (data) => API.post("/adminmeal/meals", data);

export const adminGetMealById = (id) =>
  API.get(`/adminmeal/meals/${id}`);

export const adminGetMealsByState = (state) =>
  API.get(`/adminmeal/meals/state/${state}`);

export const adminGetMealsByRegion = (region) =>
  API.get(`/adminmeal/meals/region/${region}`);

export const adminGetMealByName = (name) =>
  API.get(`/adminmeal/meals/name/${name}`);

export const adminUpdateMeal = (id, data) =>
  API.put(`/adminmeal/meals/${id}`, data);

export const adminDeleteMeal = (id) =>
  API.delete(`/adminmeal/meals/${id}`);

/* ##########################################################
   ################### USER CUISINE ##########################


   ########################################################## */

export const getUserCuisines = () => API.get("/usermeal/cuisines");
export const getUserCuisineById = (id) => API.get(`/usermeal/cuisines/${id}`);
export const getUserCuisinesByRegion = (region) =>
  API.get(`/usermeal/cuisines/region/${region}`);
export const getUserCuisinesByState = (state) =>
  API.get(`/usermeal/cuisines/state/${state}`);
export const searchUserCuisineByName = (name) =>
  API.get(`/usermeal/cuisines/name/${name}`);

/* ##########################################################
   ################### USER MEAL #############################
   ########################################################## */

export const getUserMeals = () => API.get("/usermeal/meals");
export const getUserMealById = (id) => API.get(`/usermeal/meals/${id}`);
export const getUserMealsByName = (name) =>
  API.get(`/usermeal/meals/mealName/${name}`);
export const getUserMealsByType = (type) =>
  API.get(`/usermeal/meals/mealType/${type}`);
export const getUserMealsByRegion = (region) =>
  API.get(`/usermeal/meals/region/${region}`);
export const getUserMealsByState = (state) =>
  API.get(`/usermeal/meals/state/${state}`);

/* ##########################################################
   ################### ADMIN SUBSCRIPTIONS ####################
   ########################################################## */

export const adminGetAllSubscriptions = (status, subscriptionid) =>
  API.get("/adminsubscribtion/subscriptions", {
    params: { status, subscriptionid },
  });

export const adminGetSubscriptionById = (subscriptionid) =>
  API.get(`/adminsubscribtion/subscriptions/${subscriptionid}`);

export const adminDeleteSubscription = (subscriptionid) =>
  API.delete(`/adminsubscribtion/subscriptions/${subscriptionid}`);

export const adminCountSubscriptions = () =>
  API.get("/adminsubscribtion/subscriptions/count");

export const adminExpiringSoonSubscriptions = (days = 7) =>
  API.get("/adminsubscribtion/subscriptions/expiring-soon", {
    params: { days },
  });

/* ##########################################################
   ################### ADMIN REVIEWS #########################
   ########################################################## */

export const getAllAdminReviews = () => API.get("/adminreview/reviews");
export const getRepliesByReviewId = (reviewId) =>
  API.get(`/adminreview/replies/${reviewId}`);
export const addAdminReply = (adminId, reviewId, reply) =>
  API.post(`/adminreview/${adminId}/replies/${reviewId}`, { reply });
export const updateAdminReply = (reviewId, reply) =>
  API.put(`/adminreview/replies/${reviewId}`, { reply });
export const deleteAdminReply = (reviewId) =>
  API.delete(`/adminreview/replies/${reviewId}`);

/* ##########################################################
   ################### ADMIN ORDERS ##########################


   ########################################################## */

export const adminGetAllOrders = (params = {}) =>
  API.get("/adminorder/admin/orders", { params });

export const adminGetOrderById = (orderId) =>
  API.get(`/adminorder/admin/orders/${orderId}`);

export const adminGetOrderTimeline = (orderId) =>
  API.get(`/adminorder/admin/orders/${orderId}/timeline`);

export const adminUpdateOrderStatus = (orderId, data) =>
  API.put(`/adminorder/admin/orders/${orderId}/status`, data);

export const adminGetRejectionDetails = (orderId) =>
  API.get(`/adminorder/admin/orders/${orderId}/rejection`);

export const adminGetOrdersCount = () =>
  API.get("/adminorder/admin/orders/count");

export const adminAssignDeliveryPartner = (orderId, partnerId) =>
  API.post(`/adminorder/admin/orders/${orderId}/assign`, { partnerId });

/* ##########################################################
   ################### DELIVERY PARTNERS (ADMIN) #############
   ########################################################## */

export const getAllDeliveryPartners = () =>
  API.get("/adminorder/delivery-partners");

export const getDeliveryPartnerById = (id) =>
  API.get(`/adminorder/delivery-partners/${id}`);

export const createDeliveryPartner = (data) =>
  API.post("/adminorder/delivery-partners", data);

export const updateDeliveryPartner = (id, data) =>
  API.put(`/adminorder/delivery-partners/${id}`, data);

export const deleteDeliveryPartner = (id) =>
  API.delete(`/adminorder/delivery-partners/${id}`);

/* ##########################################################
   ################### USER REVIEWS (FINAL) ##################
   ########################################################## */

// Create new review
export const createReview = (data) => API.post("/userreview", data);

// Get all reviews (user/admin UI)
export const getAllReviews = () => API.get("/userreview");

// Get single review by ID
export const getReviewById = (id) => API.get(`/userreview/${id}`);

// Get reviews by ORDER ID
export const getReviewsByOrderId = (orderId) =>
  API.get(`/userreview/order/${orderId}`);

// Update review
export const updateReview = (id, data) =>
  API.put(`/userreview/${id}`, data);

// Delete review
export const deleteReviewApi = (id) =>
  API.delete(`/userreview/${id}`);

export default API;
