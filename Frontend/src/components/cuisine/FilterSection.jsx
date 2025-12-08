// 📂 src/components/cuisine/FilterSection.jsx

import React from "react";

export default function FilterSection({ title, icon, children }) {
  return (
    <div className="mb-6 last:mb-0">
      <h3 className="text-sm font-bold mb-3 text-gray-800 flex items-center gap-2">
        <span className="text-[#E23744]">{icon}</span>
        {title}
      </h3>

      {children}
    </div>
  );
}
