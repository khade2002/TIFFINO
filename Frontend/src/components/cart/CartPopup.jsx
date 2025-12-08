import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import CartItem from "./CartItem";

export default function CartPopup({ open, onClose }) {
  const { items, totalItems, totalPrice } = useCart();

  return (
    <div
      className={`fixed inset-0 z-50 ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/40 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
      />

      {/* Panel */}
      <aside
        className={`absolute right-0 top-0 h-full w-full sm:w-[420px] bg-white shadow-xl transition-transform duration-300
        ${open ? "translate-x-0" : "translate-x-full"}`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">Your Cart ({totalItems})</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>

        <div className="p-4 overflow-y-auto h-[calc(100%-170px)]">
          {items.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            items.map((it) => <CartItem key={it.id} item={it} compact />)
          )}
        </div>

        <div className="p-4 border-t bg-light">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-600">Subtotal</span>
            <span className="font-semibold">₹ {totalPrice}</span>
          </div>
          <div className="flex gap-3">
            <Link
              to="/cart"
              onClick={onClose}
              className="flex-1 border border-gray-300 rounded-lg py-2 text-center hover:bg-gray-50"
            >
              View Cart
            </Link>
            <Link
              to="/payment/checkout"
              onClick={onClose}
              className="flex-1 bg-primary text-white rounded-lg py-2 text-center hover:opacity-90"
            >
              Checkout
            </Link>
          </div>
        </div>
      </aside>
    </div>
  );
}
