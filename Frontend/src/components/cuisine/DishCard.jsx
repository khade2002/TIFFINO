import { motion, AnimatePresence } from "framer-motion";
import { Star, Clock, Flame, MapPin, ShoppingCart, Info, TrendingUp, Heart } from "lucide-react";

export default function DishCard({ dish, index, onAddToCart, isHovered, onHover, onLeave }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -8 }}
      onHoverStart={onHover}
      onHoverEnd={onLeave}
      className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300"
    >
      {/* Image */}
      <div className="relative overflow-hidden h-48">
        <motion.img
          src={dish.image}
          alt={dish.name}
          className="w-full h-full object-cover"
          loading="lazy"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
        />

        {/* Veg/Non-Veg */}
        <span
          className={`absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full shadow ${
            dish.veg ? "bg-green-600 text-white" : "bg-red-600 text-white"
          }`}
        >
          {dish.veg ? "Veg" : "Non-Veg"}
        </span>

        {/* Favorite Button */}
        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-[#E23744] hover:text-white transition-colors"
        >
          <Heart className="w-4 h-4" />
        </motion.button>

        {/* Trending */}
        {dish.rating >= 4.5 && (
          <motion.div
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            transition={{ delay: index * 0.05 + 0.3 }}
            className="absolute bottom-3 left-3 bg-[#E23744] text-white text-xs px-3 py-1 rounded-lg shadow"
          >
            Trending 🔥
          </motion.div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-800 line-clamp-1">
          {dish.name}
        </h2>

        <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
          <MapPin className="w-3 h-3 text-[#E23744]" />
          {dish.state} • {dish.region}
        </div>

        <div className="flex justify-between items-center mt-3">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-semibold">
              {dish.rating || "4.5"}
            </span>
          </div>

          <span className="text-xl font-bold text-[#E23744]">
            ₹{dish.price}
          </span>
        </div>

        {/* Hover Info */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 pt-3 border-t border-gray-100 space-y-2"
            >
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-4 h-4 text-[#E23744]" />
                  Delivery
                </div>
                <span className="font-semibold">25–30 min</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Flame className="w-4 h-4 text-[#E23744]" />
                  Spice Level
                </div>
                <span className="font-semibold">Medium</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add to Cart */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onAddToCart}
          className="mt-4 w-full bg-[#E23744] text-white py-3 rounded-xl font-semibold shadow-lg"
        >
          <ShoppingCart className="inline w-4 h-4 mr-2" />
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
}
