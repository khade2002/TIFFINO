import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Star, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

import { getOrderById } from "../../api/api"; // ⭐ you must have this API

export default function Success() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const orderId = params.get("orderId");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 Fetch order detail
  useEffect(() => {
    const load = async () => {
      if (!orderId) {
        setLoading(false);
        return;
      }

      try {
        const res = await getOrderById(orderId);
        setOrder(res.data || null);
      } catch (err) {
        console.error("Order load error:", err);
        toast.error("Failed to load order details ❌");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [orderId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="h-8 w-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-10 bg-gradient-to-b from-white to-red-50">
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex flex-col items-center text-center"
      >
        <CheckCircle className="text-green-500 w-20 h-20 mb-3" />
        <h1 className="text-3xl font-bold mb-2">Order Placed Successfully 🎉</h1>
        <p className="text-gray-600 mb-6">
          Thank you for ordering from Tiffino. Your food is being prepared!
        </p>

        {orderId && (
          <p className="text-gray-700 text-sm mb-4">
            <strong>Order ID:</strong> #{orderId}
          </p>
        )}

        {/* ⭐ Review Section */}
        {order?.items && order.items.length > 0 && (
          <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-5 mt-6">
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              Rate Your Meals
            </h2>

            <div className="space-y-4">
              {order.items.map((it, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border"
                >
                  <div>
                    <p className="font-medium">{it.mealName}</p>
                    <p className="text-xs text-gray-500">Qty: {it.quantity}</p>
                  </div>

                  <button
                    onClick={() =>
                      navigate(
                        `/write-review?orderId=${orderId}&mealId=${it.mealId}`
                      )
                    }
                    className="px-3 py-1.5 text-sm bg-[#E23744] text-white rounded-full hover:bg-red-600 transition"
                  >
                    Write Review
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={() => navigate("/cuisine")}
          className="mt-8 flex items-center gap-2 px-5 py-3 bg-[#E23744] text-white font-semibold rounded-full shadow hover:shadow-lg transition"
        >
          Browse Dishes
          <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>
    </div>
  );
}
