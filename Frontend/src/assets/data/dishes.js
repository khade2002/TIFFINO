// 📂 src/assets/data/dishes.js
import { NORTH_INDIA } from "./northIndia";
import { SOUTH_INDIA } from "./southIndia";
import { EAST_INDIA } from "./eastIndia";
import { WEST_INDIA } from "./westIndia";
import { CENTRAL_INDIA } from "./centralIndia";
import { NORTH_EAST_INDIA } from "./northEastern";
import { UNION_TERRITORIES } from "./unionTerritories";

// 🔥 yeh line add karo
export {
  NORTH_INDIA,
  SOUTH_INDIA,
  EAST_INDIA,
  WEST_INDIA,
  CENTRAL_INDIA,
  NORTH_EAST_INDIA,
  UNION_TERRITORIES,
};

// Regions array export bhi kar sakte ho
export const REGIONS = [
  "North India",
  "South India",
  "East India",
  "West India",
  "Central India",
  "North East India",
  "Union Territories",
];

// Combine all into one array
export const CUISINES = [
  NORTH_INDIA,
  SOUTH_INDIA,
  EAST_INDIA,
  WEST_INDIA,
  CENTRAL_INDIA,
  NORTH_EAST_INDIA,
  UNION_TERRITORIES,
];

// ✅ Safe flattening
export const DISHES = CUISINES.flatMap(
  (cuisine) =>
    cuisine?.states?.flatMap((state) => state?.dishes || []) || []
);


