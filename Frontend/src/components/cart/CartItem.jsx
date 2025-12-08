import { useCart } from "../../context/CartContext";

export default function CartItem({ item, compact = false }) {
  const { increment, decrement, remove } = useCart();

  return (
    <div className="flex items-center gap-3 py-3">
      {!compact && (
        <img
          src={item.image}
          alt={item.name}
          className="w-16 h-16 rounded object-cover border"
        />
      )}
      <div className="flex-1">
        <h4 className="font-medium">{item.name}</h4>
        <p className="text-sm text-gray-500">₹ {item.price}</p>
        <div className="flex items-center gap-3 mt-2">
          <button
            onClick={() => decrement(item.id)}
            className="px-2 rounded border hover:bg-gray-50"
            aria-label="decrease"
          >
            –
          </button>
          <span className="w-6 text-center">{item.qty}</span>
          <button
            onClick={() => increment(item.id)}
            className="px-2 rounded border hover:bg-gray-50"
            aria-label="increase"
          >
            +
          </button>

          <button
            onClick={() => remove(item.id)}
            className="ml-4 text-red-600 text-sm hover:underline"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
