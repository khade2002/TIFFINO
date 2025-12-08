// 📂 src/components/cuisine/ButtonRow.jsx
import { motion } from "framer-motion";

export default function ButtonRow({ items, active, onSelect }) {
  return (
    <div className="flex gap-2">
      {items.map((type) => (
        <motion.button
          key={type}
          onClick={() => onSelect(type)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex-1 text-center ${
            active === type
              ? "bg-[#E23744] text-white shadow-lg"
              : "bg-gray-50 border-2 border-gray-100 hover:border-[#E23744]/30 text-gray-700"
          }`}
        >
          {type}
        </motion.button>
      ))}
    </div>
  );
}
