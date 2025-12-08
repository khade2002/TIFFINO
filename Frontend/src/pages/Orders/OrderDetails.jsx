// src/pages/Orders/OrderDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getOrderById, getOrderDelivery } from "../../api/api";
import { ArrowLeft, Truck, User, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";

export default function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [deliveryInfo, setDeliveryInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await getOrderById(id);
        setOrder(res.data);

        // fetch delivery partner (optional)
        try {
          const dres = await getOrderDelivery(id);
          setDeliveryInfo(dres.data);
        } catch (e) {
          // not critical
          console.debug("no delivery info yet", e);
        }
      } catch (err) {
        console.error("order fetch:", err);
        toast.error("Failed to fetch order details");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="h-8 w-8 border-2 border-[#E23744] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-600">
        Order not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-red-50/20 to-white py-10 px-4 md:px-8 lg:px-16">
      <div className="max-w-4xl mx-auto">
        <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-sm text-gray-700 mb-6">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold mb-1">Order #{order.orderId ?? order.id}</h2>
              <div className="text-sm text-gray-500 mb-2">{order.orderDate ? new Date(order.orderDate).toLocaleString() : ""}</div>

              <div className="text-sm">
                <div className="flex items-center gap-2 mb-1">
                  <User className="w-4 h-4 text-gray-500" />
                  <div>{order.userId || "—"}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-gray-500" />
                  <div>{order.address}</div>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-sm text-gray-500">Status</div>
              <div className={`mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full font-semibold ${order.status?.toLowerCase().includes("conf") ? "bg-emerald-100 text-emerald-700" : "bg-yellow-50 text-yellow-700"}`}>
                <CheckCircle2 className="w-4 h-4" />
                {order.status}
              </div>
              <div className="mt-4 text-lg font-bold">₹{Number(order.totalAmount ?? 0).toFixed(2)}</div>
            </div>
          </div>

          <hr className="my-4" />

          <div>
            <h3 className="font-semibold mb-2">Items</h3>
            <div className="space-y-3">
              {(order.items || []).map((it, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{it.mealName}</div>
                    <div className="text-xs text-gray-500">Qty: {it.quantity} • ₹{Number(it.pricePerItem ?? 0).toFixed(2)}</div>
                  </div>
                  <div className="font-semibold">₹{(Number(it.pricePerItem ?? 0) * Number(it.quantity ?? 0)).toFixed(2)}</div>
                </div>
              ))}
            </div>
          </div>

          <hr className="my-4" />

          <div className="flex items-center justify-between text-sm text-gray-700">
            <div>Applied discount</div>
            <div>₹{Number(order.appliedDiscount ?? 0).toFixed(2)}</div>
          </div>
          <div className="flex items-center justify-between text-sm font-semibold mt-2">
            <div>Grand total</div>
            <div>₹{Number(order.totalAmount ?? 0).toFixed(2)}</div>
          </div>

          <hr className="my-4" />

          <div>
            <h4 className="font-semibold mb-2">Delivery</h4>
            {deliveryInfo ? (
              <div className="text-sm text-gray-700">
                <div>Partner: {deliveryInfo.deliveryPartnerName}</div>
                <div>Phone: {deliveryInfo.deliveryPartnerPhone}</div>
              </div>
            ) : (
              <div className="text-sm text-gray-500">Delivery partner not yet assigned.</div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
