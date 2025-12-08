import { STATES } from "../../assets/data/dishes";

export default function Filters({ selectedState, setSelectedState, vegFilter, setVegFilter, price, setPrice }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col md:flex-row md:items-end gap-4">
      {/* State */}
      <div className="flex-1">
        <label className="block text-sm font-medium mb-1">State</label>
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">All States</option>
          {STATES.map((st) => (
            <option key={st} value={st}>{st}</option>
          ))}
        </select>
      </div>

      {/* Veg */}
      <div className="flex-1">
        <label className="block text-sm font-medium mb-1">Type</label>
        <select
          value={vegFilter}
          onChange={(e) => setVegFilter(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="all">All</option>
          <option value="veg">Veg</option>
          <option value="nonveg">Non-Veg</option>
        </select>
      </div>

      {/* Price Range */}
      <div className="flex-1">
        <label className="block text-sm font-medium mb-1">Max Price: ₹ {price}</label>
        <input
          type="range"
          min="50"
          max="300"
          step="10"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full"
        />
      </div>
    </div>
  );
}
