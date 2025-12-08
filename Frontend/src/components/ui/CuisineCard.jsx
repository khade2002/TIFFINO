// src/components/CuisineCard.jsx
import { useCart } from "../context/CartContext";  // 👈 import kiya
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CuisineCard({ dish }) {
  const { addItem } = useCart();  // 👈 hook se context access

  return (
    <Card className="w-full max-w-xs shadow-md rounded-xl overflow-hidden hover:shadow-lg transition">
      <img
        src={dish.image}
        alt={dish.name}
        className="w-full h-40 object-cover"
      />
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold">{dish.name}</h3>
        <p className="text-gray-600 text-sm mt-1">{dish.description}</p>
        <div className="flex justify-between items-center mt-3">
          <span className="text-primary font-bold">₹{dish.price}</span>
          <Button
            onClick={() => addItem(dish)}  // 👈 cart me add karega
            className="bg-primary hover:bg-green-600 text-white"
          >
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
