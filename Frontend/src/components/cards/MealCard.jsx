// 📌 src/components/cards/MealCard.jsx

import React, { useState } from "react";
import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";
import { addItemToCart } from "../../api/api";

export default function MealCard({ meal }) {
  const [loading, setLoading] = useState(false);

  // 🔥 Build backend-friendly cart payload
  const cartPayload = {
    foodId: meal.id || meal.foodId,  // frontend id → backend foodId
    foodName: meal.name,
    price: meal.price,
    quantity: 1,
    imageUrl: meal.image,
  };

  const handleAddToCart = async () => {
    try {
      setLoading(true);
      await addItemToCart(cartPayload);

      toast.success(`${meal.name} added to cart! 🛒`);

      // 🔥 Notify other components like CartBadge & Cart page
      window.dispatchEvent(new CustomEvent("cartUpdated"));

    } catch (error) {
      console.log("Add to Cart Error:", error);
      toast.error("Failed to add item ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-3 flex flex-col">
      {/* Meal Image */}
      <img
        src={meal.image}
        alt={meal.name}
        className="w-full h-44 object-cover rounded-md"
      />

      {/* Details */}
      <h3 className="font-bold mt-2">{meal.name}</h3>
      <p className="text-gray-600 text-sm">₹{meal.price}</p>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={loading}
        className={`mt-3 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-white font-medium ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-red-500 hover:bg-red-600"
        }`}
      >
        <ShoppingCart size={18} />
        {loading ? "Adding..." : "Add to Cart"}
      </button>
    </div>
  );
}
