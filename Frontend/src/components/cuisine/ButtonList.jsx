// 📂 src/components/cuisine/ButtonList.jsx
import { motion } from "framer-motion";

export default function ButtonList({ items, active, onSelect, scroll }) {
  const normalized = items.map((it) =>
    typeof it === "string" ? { key: it, label: it } : it
  );

  return (
    <div
      className={`flex flex-col gap-2 ${
        scroll ? "max-h-48 overflow-y-auto pr-1 custom-scrollbar" : ""
      }`}
    >
      {normalized.map((it, idx) => (
        <motion.button
          key={it.key}
          onClick={() => onSelect(it.key)}
          whileHover={{ scale: 1.02, x: 2 }}
          whileTap={{ scale: 0.98 }}
          className={`px-4 py-2.5 rounded-xl text-left text-sm font-semibold transition-all ${
            active === it.key
              ? "bg-[#E23744] text-white shadow-lg"
              : "bg-gray-50 border-2 border-gray-100 hover:border-[#E23744]/30 text-gray-700"
          }`}
        >
          {it.label}
        </motion.button>
      ))}
    </div>
  );
}
