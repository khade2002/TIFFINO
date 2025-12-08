import { motion } from "framer-motion";
import { Filter, MapPin, Utensils, TrendingUp, Award } from "lucide-react";
import FilterSection from "./FilterSection";
import ButtonList from "./ButtonList";
import ButtonRow from "./ButtonRow";

export default function FilterPanel({
  regions,
  states,
  selectedRegion,
  setSelectedRegion,
  selectedState,
  setSelectedState,
  vegFilter,
  setVegFilter,
  priceMin,
  priceMax,
  maxPrice,
  setMaxPrice,
  sortOption,
  setSortOption,
  clearAll,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-24"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Filter className="w-5 h-5 text-[#E23744]" />
          Filters
        </h2>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={clearAll}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg border-2 border-[#E23744] text-[#E23744] hover:bg-[#E23744] hover:text-white transition-all"
        >
          Clear All
        </motion.button>
      </div>

      {/* Region */}
      <FilterSection title="By Region" icon={<MapPin size={16} />}>
        <ButtonList
          items={regions}
          active={selectedRegion}
          onSelect={(val) => {
            setSelectedRegion(val);
            setSelectedState("All");
          }}
          scroll
        />
      </FilterSection>

      {/* State */}
      <FilterSection title="By State" icon={<MapPin size={16} />}>
        <ButtonList
          items={states}
          active={selectedState}
          onSelect={setSelectedState}
          scroll
        />
      </FilterSection>

      {/* Veg / Non-Veg */}
      <FilterSection title="Food Type" icon={<Utensils size={16} />}>
        <ButtonRow
          items={["All", "Veg", "Non-Veg"]}
          active={vegFilter}
          onSelect={setVegFilter}
        />
      </FilterSection>

      {/* Price Slider */}
      <FilterSection title="Price Range" icon={<TrendingUp size={16} />}>
        <div className="mb-3 flex justify-between items-center">
          <span className="text-sm font-semibold text-gray-700">Up to</span>
          <span className="text-lg font-bold text-[#E23744]">₹{maxPrice}</span>
        </div>

        <input
          type="range"
          min={priceMin}
          max={priceMax}
          step="10"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#E23744]"
          style={{
            background: `linear-gradient(to right,
              #E23744 0%,
              #E23744 ${(maxPrice / priceMax) * 100}%,
              #e5e7eb ${(maxPrice / priceMax) * 100}%,
              #e5e7eb 100%)`,
          }}
        />

        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>₹{priceMin}</span>
          <span>₹{priceMax}</span>
        </div>
      </FilterSection>

      {/* Sort */}
      <FilterSection title="Sort By" icon={<Award size={16} />}>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm font-medium focus:border-[#E23744] focus:ring-2 focus:ring-[#E23744]/20 outline-none transition-all"
        >
          <option value="default">Default</option>
          <option value="priceLowHigh">Price: Low to High</option>
          <option value="priceHighLow">Price: High to Low</option>
          <option value="ratingHighLow">Rating: High to Low</option>
        </select>
      </FilterSection>
    </motion.div>
  );
}
