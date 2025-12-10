// import React, { useEffect, useState } from "react";
// import { getAllAdminReviews } from "../../api/api";
// import { motion } from "framer-motion";
// import { Star } from "lucide-react";
// import toast from "react-hot-toast";

// export default function AdminReviews() {
//   const [reviews, setReviews] = useState([]);

//   // ⭐ Load reviews from backend
//   const loadReviews = async () => {
//     try {
//       const res = await getAllAdminReviews();
//       setReviews(res.data || []);
//     } catch (err) {
//       toast.error("Failed to load reviews");
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     loadReviews();
//   }, []);

//   // ⭐ Rating stars component
//   const Stars = ({ count }) => (
//     <div className="flex gap-1">
//       {[...Array(5)].map((_, i) => (
//         <Star
//           key={i}
//           className={`w-4 h-4 ${
//             i < count
//               ? "text-yellow-400 fill-yellow-400"
//               : "text-gray-300"
//           }`}
//         />
//       ))}
//     </div>
//   );

//   return (
//     <div className="p-6 min-h-screen bg-gray-50">
//       {/* Header */}
//       <h1 className="text-2xl font-bold mb-6">User Reviews</h1>

//       {/* Reviews List */}
//       <div className="grid grid-cols-1 gap-4">
//         {reviews.map((rev, idx) => (
//           <motion.div
//             key={rev.id}
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: idx * 0.04 }}
//             className="p-5 rounded-2xl bg-white border shadow-sm hover:shadow-md transition"
//           >
//             {/* Top Row */}
//             <div className="flex justify-between items-start">
//               <div>
//                 {/* User Email */}
//                 <div className="text-sm text-gray-600 font-medium">
//                   {rev.userId}
//                 </div>

//                 {/* Order ID */}
//                 <div className="text-xs text-gray-400 mt-1">
//                   Order ID: {rev.orderId}
//                 </div>

//                 {/* Comment */}
//                 <div className="font-semibold mt-3 text-gray-900">
//                   {rev.comment}
//                 </div>

//                 {/* Rating + Date */}
//                 <div className="flex items-center gap-3 mt-3">
//                   <Stars count={rev.rating} />
//                   <span className="text-xs text-gray-400">
//                     {rev.reviewDate?.slice(0, 10)}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         ))}

//         {/* No reviews fallback */}
//         {reviews.length === 0 && (
//           <div className="text-center text-gray-500 text-sm mt-10">
//             No reviews available.
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }




import React, { useEffect, useMemo, useState } from "react";
import { getAllAdminReviews } from "../../api/api";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Star, 
  Search, 
  MessageSquare, 
  User, 
  Calendar, 
  Quote, 
  Filter, 
  Hash,
  TrendingUp,
  Award
} from "lucide-react";
import toast from "react-hot-toast";

/* ==========================================================
   CONSTANTS & HELPERS
   ========================================================== */
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const getRatingColor = (rating) => {
  if (rating >= 4.5) return "text-green-500 bg-green-50 border-green-200";
  if (rating >= 3) return "text-yellow-500 bg-yellow-50 border-yellow-200";
  return "text-red-500 bg-red-50 border-red-200";
};

/* ==========================================================
   🚀 MAIN COMPONENT
   ========================================================== */
export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // --- 1. LOAD REVIEWS ---
  const loadReviews = async () => {
    setLoading(true);
    try {
      const res = await getAllAdminReviews();
      setReviews(res.data || []);
    } catch (err) {
      toast.error("Failed to load reviews");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  // --- 2. STATS CALCULATION ---
  const stats = useMemo(() => {
    const total = reviews.length;
    const avg = total > 0 
      ? (reviews.reduce((acc, r) => acc + r.rating, 0) / total).toFixed(1) 
      : 0;
    const fiveStars = reviews.filter(r => r.rating === 5).length;
    return { total, avg, fiveStars };
  }, [reviews]);

  // --- 3. FILTER LOGIC ---
  const filteredReviews = useMemo(() => {
    if (!search) return reviews;
    const lowerQ = search.toLowerCase();
    return reviews.filter(
      (r) =>
        r.userId.toLowerCase().includes(lowerQ) ||
        r.orderId.toString().includes(lowerQ) ||
        r.comment.toLowerCase().includes(lowerQ)
    );
  }, [reviews, search]);

  return (
    <div className="space-y-8">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
         <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Customer Feedback</h1>
            <p className="text-gray-500 text-sm mt-1">Insights from your valuable customers.</p>
         </div>
         
         <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
               type="text" 
               placeholder="Search user, comment or Order ID..." 
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-red-100 shadow-sm transition-all"
            />
         </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
         <StatCard 
            label="Total Reviews" 
            value={stats.total} 
            icon={<MessageSquare size={20}/>} 
            color="bg-blue-50 text-blue-600" 
         />
         <StatCard 
            label="Average Rating" 
            value={stats.avg} 
            icon={<Star size={20}/>} 
            color="bg-yellow-50 text-yellow-600" 
            subtext="/ 5.0"
         />
         <StatCard 
            label="5-Star Ratings" 
            value={stats.fiveStars} 
            icon={<Award size={20}/>} 
            color="bg-green-50 text-green-600" 
         />
      </div>

      {/* REVIEWS GRID */}
      {loading ? (
         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[1,2,3,4,5,6].map(i => <div key={i} className="h-48 bg-gray-200 rounded-2xl"/>)}
         </div>
      ) : filteredReviews.length === 0 ? (
         <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-gray-100 text-gray-400">
            <MessageSquare size={48} className="mb-4 opacity-20"/>
            <p>No reviews found matching your search.</p>
         </div>
      ) : (
         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
               {filteredReviews.map((review, idx) => (
                  <ReviewCard key={review.id} review={review} index={idx} />
               ))}
            </AnimatePresence>
         </div>
      )}

    </div>
  );
}

/* ==========================================================
   📦 SUB-COMPONENTS
   ========================================================== */

function StatCard({ label, value, icon, color, subtext }) {
   return (
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
         <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{label}</p>
            <p className="text-3xl font-extrabold text-gray-900 mt-1 flex items-baseline gap-1">
               {value} <span className="text-sm font-medium text-gray-400">{subtext}</span>
            </p>
         </div>
         <div className={`p-3 rounded-xl ${color}`}>{icon}</div>
      </div>
   );
}

function ReviewCard({ review, index }) {
   return (
      <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: index * 0.05 }}
         className="group relative bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
      >
         {/* Top: Rating & Date */}
         <div className="flex justify-between items-start mb-4">
            <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border text-xs font-bold ${getRatingColor(review.rating)}`}>
               {review.rating} <Star size={12} fill="currentColor" />
            </div>
            <div className="flex items-center gap-1 text-[10px] font-medium text-gray-400">
               <Calendar size={12}/> {formatDate(review.reviewDate)}
            </div>
         </div>

         {/* Middle: Comment */}
         <div className="flex-1 relative mb-6">
            <Quote className="absolute -top-2 -left-2 text-gray-100 w-8 h-8 -z-10 transform -scale-x-100" />
            <p className="text-gray-700 text-sm leading-relaxed italic relative z-10">
               "{review.comment}"
            </p>
         </div>

         {/* Bottom: User Info & Order ID */}
         <div className="flex items-center justify-between pt-4 border-t border-gray-50">
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white text-xs font-bold shadow-md">
                  {review.userId.charAt(0).toUpperCase()}
               </div>
               <div className="flex flex-col">
                  <span className="text-xs font-bold text-gray-900 truncate max-w-[120px]" title={review.userId}>
                     {review.userId.split('@')[0]}
                  </span>
                  <span className="text-[10px] text-gray-400">Verified User</span>
               </div>
            </div>

            <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg text-[10px] font-mono text-gray-500 border border-gray-100">
               <Hash size={10}/> {review.orderId}
            </div>
         </div>
      </motion.div>
   );
}