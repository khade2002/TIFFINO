// // src/context/CartContext.jsx
// import { createContext, useContext, useEffect, useState } from "react";
// import {
//   addItemToCart,
//   getCartItems,
//   updateCartItem,
//   removeCartItem,
//   getCartTotal,
// } from "../api/api";
// import toast from "react-hot-toast";

// const CartContext = createContext(null);

// export function CartProvider({ children }) {
//   const [items, setItems] = useState([]);
//   const [totalItems, setTotalItems] = useState(0);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [isCartOpen, setIsCartOpen] = useState(false);

//   // ===========================
//   // LOAD CART (1 function used globally)
//   // ===========================
//   const loadCart = async () => {
//     try {
//       // GET all items
//       const res = await getCartItems();
//       const list = res.data || [];
//       setItems(list);

//       // TOTAL PRICE
//       const totalRes = await getCartTotal();
//       setTotalPrice(totalRes.data || 0);

//       // TOTAL ITEM COUNT
//       const count = list.reduce((sum, item) => sum + item.quantity, 0);
//       setTotalItems(count);

//     } catch (err) {
//       console.error("Cart load error:", err);
//       toast.error("Failed to load cart ❌");
//     }
//   };

//   useEffect(() => {
//     loadCart();
//   }, []);

//   // ===========================
//   // ADD TO CART
//   // ===========================
//   const addItem = async (dish) => {
//     try {
//       const payload = {
//         foodId: dish.id,
//         foodName: dish.name,
//         price: dish.price,
//         quantity: 1,
//         subtotal: dish.price,
//         imageUrl: dish.image, // 🔥 Added image URL
//       };

//       await addItemToCart(payload);
//       toast.success("Added to cart 🛒");

//       setIsCartOpen(true);
//       loadCart();
//     } catch (err) {
//       console.error("Add error:", err);
//       toast.error("Failed to add item ❌");
//     }
//   };

//   // ===========================
//   // INCREMENT / DECREMENT
//   // ===========================
//   const increment = async (foodId) => {
//     const item = items.find((i) => i.foodId === foodId);
//     if (!item) return;

//     try {
//       await updateCartItem(foodId, item.quantity + 1);
//       loadCart();
//     } catch {
//       toast.error("Error updating quantity ❌");
//     }
//   };

//   const decrement = async (foodId) => {
//     const item = items.find((i) => i.foodId === foodId);
//     if (!item || item.quantity <= 1) return;

//     try {
//       await updateCartItem(foodId, item.quantity - 1);
//       loadCart();
//     } catch {
//       toast.error("Error updating quantity ❌");
//     }
//   };

//   // ===========================
//   // REMOVE ITEM
//   // ===========================
//   const remove = async (foodId) => {
//     try {
//       await removeCartItem(foodId);
//       toast.success("Item removed 🗑️");
//       loadCart();
//     } catch {
//       toast.error("Failed to remove item ❌");
//     }
//   };

//   // ===========================
//   // CLEAR CART
//   // ===========================
//   const clear = () => {
//     setItems([]);
//     setTotalItems(0);
//     setTotalPrice(0);
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         items,
//         totalItems,
//         totalPrice,
//         addItem,
//         increment,
//         decrement,
//         remove,
//         clear,
//         loadCart,
//         isCartOpen,
//         setIsCartOpen,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }

// export const useCart = () => useContext(CartContext);




// // src/context/CartContext.jsx
// import { createContext, useContext, useEffect, useState } from "react";
// import {
//   addItemToCart,
//   getCartItems,
//   updateCartItem,
//   removeCartItem,
//   getCartTotal,
// } from "../api/api";
// import toast from "react-hot-toast";
// import { useAuth } from "./AuthContext";

// const CartContext = createContext(null);

// export function CartProvider({ children }) {
//   const { user } = useAuth();

//   const [items, setItems] = useState([]);
//   const [totalItems, setTotalItems] = useState(0);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [isCartOpen, setIsCartOpen] = useState(false);

//   const loadCart = async () => {
//     try {
//       // If not logged in -> empty cart
//       if (!user) {
//         setItems([]);
//         setTotalItems(0);
//         setTotalPrice(0);
//         return;
//       }

//       const res = await getCartItems();
//       const list = res.data || [];
//       setItems(list);

//       const totalRes = await getCartTotal();
//       setTotalPrice(totalRes.data || 0);

//       const count = list.reduce((sum, item) => sum + item.quantity, 0);
//       setTotalItems(count);
//     } catch (err) {
//       console.error("Cart load error:", err);
//       toast.error("Failed to load cart ❌");
//       // keep previous state instead of clearing, but if auth missing, clear
//       if (!user) {
//         setItems([]);
//         setTotalItems(0);
//         setTotalPrice(0);
//       }
//     }
//   };

//   // reload cart on mount and whenever user changes
//   useEffect(() => {
//     loadCart();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [user]);

//   const addItem = async (dish) => {
//     try {
//       if (!user) {
//         toast("Please login to add to cart", { icon: "🔒" });
//         return;
//       }
//       const payload = {
//         foodId: dish.id,
//         foodName: dish.name,
//         price: dish.price,
//         quantity: 1,
//         subtotal: dish.price,
//         imageUrl: dish.image,
//       };
//       await addItemToCart(payload);
//       toast.success("Added to cart 🛒");
//       setIsCartOpen(true);
//       await loadCart();
//     } catch (err) {
//       console.error("Add error:", err);
//       toast.error("Failed to add item ❌");
//     }
//   };

//   const increment = async (foodId) => {
//     const item = items.find((i) => i.foodId === foodId);
//     if (!item) return;
//     try {
//       await updateCartItem(foodId, item.quantity + 1);
//       await loadCart();
//     } catch {
//       toast.error("Error updating quantity ❌");
//     }
//   };

//   const decrement = async (foodId) => {
//     const item = items.find((i) => i.foodId === foodId);
//     if (!item || item.quantity <= 1) return;
//     try {
//       await updateCartItem(foodId, item.quantity - 1);
//       await loadCart();
//     } catch {
//       toast.error("Error updating quantity ❌");
//     }
//   };

//   const remove = async (foodId) => {
//     try {
//       await removeCartItem(foodId);
//       toast.success("Item removed 🗑️");
//       await loadCart();
//     } catch {
//       toast.error("Failed to remove item ❌");
//     }
//   };

//   const clear = () => {
//     setItems([]);
//     setTotalItems(0);
//     setTotalPrice(0);
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         items,
//         totalItems,
//         totalPrice,
//         addItem,
//         increment,
//         decrement,
//         remove,
//         clear,
//         loadCart,
//         isCartOpen,
//         setIsCartOpen,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }

// export const useCart = () => useContext(CartContext);








// src/context/CartContext.jsx

import { createContext, useContext, useEffect, useState } from "react";
import {
  addItemToCart,
  getCartItems,
  updateCartItem,
  removeCartItem,
  getCartTotal,
  clearUserCart,
} from "../api/api";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { user } = useAuth();

  const [items, setItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);

  /* -------------------------------------------------------
     LOAD CART (BACKEND)
  ------------------------------------------------------- */
  const loadCart = async () => {
    try {
      if (!user) {
        setItems([]);
        setTotalItems(0);
        setTotalPrice(0);
        return;
      }

      const res = await getCartItems();
      const cartList = res.data || [];
      setItems(cartList);

      const totalRes = await getCartTotal();
      setTotalPrice(totalRes.data || 0);

      const count = cartList.reduce((sum, item) => sum + item.quantity, 0);
      setTotalItems(count);

    } catch (err) {
      console.error("Cart load error:", err);
      toast.error("Failed to load cart ❌");

      setItems([]);
      setTotalItems(0);
      setTotalPrice(0);
    }
  };

  useEffect(() => {
    loadCart();
  }, [user]);

  /* -------------------------------------------------------
     ADD ITEM
  ------------------------------------------------------- */
  const addItem = async (dish) => {
    try {
      if (!user) {
        toast("Please login to add to cart 🔒");
        return;
      }

      const payload = {
        foodId: dish.id,
        foodName: dish.name,
        price: dish.price,
        quantity: 1,
        subtotal: dish.price,
        imageUrl: dish.image,
      };

      await addItemToCart(payload);
      toast.success("Added to cart 🛒");

      setIsCartOpen(true);
      await loadCart();

    } catch (err) {
      console.error("Add item error:", err);
      toast.error("Failed to add item ❌");
    }
  };

  /* -------------------------------------------------------
     INCREMENT
  ------------------------------------------------------- */
  const increment = async (foodId) => {
    const item = items.find((i) => i.foodId === foodId);
    if (!item) return;

    try {
      await updateCartItem(foodId, item.quantity + 1);
      await loadCart();
    } catch (err) {
      toast.error("Failed to update ❌");
    }
  };

  /* -------------------------------------------------------
     DECREMENT
  ------------------------------------------------------- */
  const decrement = async (foodId) => {
    const item = items.find((i) => i.foodId === foodId);
    if (!item || item.quantity <= 1) return;

    try {
      await updateCartItem(foodId, item.quantity - 1);
      await loadCart();
    } catch (err) {
      toast.error("Failed to update ❌");
    }
  };

  /* -------------------------------------------------------
     REMOVE ITEM
  ------------------------------------------------------- */
  const remove = async (foodId) => {
    try {
      await removeCartItem(foodId);
      toast.success("Item removed 🗑️");
      await loadCart();
    } catch (err) {
      toast.error("Failed to remove ❌");
    }
  };

  /* -------------------------------------------------------
     CLEAR LOCAL CART
  ------------------------------------------------------- */
  const clear = () => {
    setItems([]);
    setTotalItems(0);
    setTotalPrice(0);
  };

  /* -------------------------------------------------------
     CLEAR FULL BACKEND CART
  ------------------------------------------------------- */
  const clearBackend = async () => {
    try {
      await clearUserCart();
    } catch (err) {
      console.log("Backend cart clear failed (continuing):", err);
    }
    clear(); // frontend also clear
  };

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        totalPrice,
        addItem,
        increment,
        decrement,
        remove,
        clear,
        clearBackend,
        loadCart,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
