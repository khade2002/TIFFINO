// src/components/ui/CartDrawer.jsx
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";

export default function CartDrawer({ isOpen, onClose }) {
  const { items, remove, totalItems, totalPrice } = useCart(); // ✅ use correct state and functions

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          {/* Drawer */}
          <motion.div
            className="fixed right-0 top-0 h-full w-80 bg-white shadow-2xl z-50 flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-bold">Your Cart ({totalItems})</h2>
              <button onClick={onClose}>
                <X size={22} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {items.length === 0 ? (
                <p className="text-gray-500">Your cart is empty</p>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center border rounded-lg p-3"
                  >
                    <div>
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-sm text-gray-500">
                        ₹{item.price} × {item.qty}
                      </p>
                    </div>
                    <button
                      onClick={() => remove(item.id)}
                      className="text-red-500 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t space-y-2">
              <p className="font-semibold text-gray-700">
                Total: ₹{totalPrice}
              </p>
              <Link
                to="/cart"
                className="block w-full bg-primary text-white text-center py-2 rounded-lg font-semibold hover:opacity-90"
                onClick={onClose}
              >
                View Cart
              </Link>
              <Link
                to="/checkout"
                className="block w-full bg-green-600 text-white text-center py-2 rounded-lg font-semibold hover:opacity-90"
                onClick={onClose}
              >
                Checkout
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
