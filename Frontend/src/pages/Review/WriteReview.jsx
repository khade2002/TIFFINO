// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { X, Star } from "lucide-react";
// import toast from "react-hot-toast";

// import {
//   createReview,
//   updateReview,
//   deleteReviewApi,
//   getReviewsByOrderId,
// } from "../../api/api";

// export default function WriteReview({ order, user, open, onClose }) {
//   const [rating, setRating] = useState(0);
//   const [hover, setHover] = useState(0);
//   const [comment, setComment] = useState("");
//   const [reviewId, setReviewId] = useState(null);

//   const userId = user?.email; // email as userId

//   /* =============================================================
//       🔥 Load existing review if already submitted (ORDER-BASED)
//      ============================================================= */
//   useEffect(() => {
//     if (!open || !order) return;

//     const loadReview = async () => {
//       try {
//         const res = await getReviewsByOrderId(order.orderId);
//         const allReviews = res?.data || [];

//         const myReview = allReviews.find(
//           (r) => r.userId === userId && r.orderId === order.orderId
//         );

//         if (myReview) {
//           setRating(myReview.rating);
//           setComment(myReview.comment);
//           setReviewId(myReview.id);
//         } else {
//           setRating(0);
//           setComment("");
//           setReviewId(null);
//         }
//       } catch (err) {
//         console.error(err);
//         setRating(0);
//         setComment("");
//         setReviewId(null);
//       }
//     };

//     loadReview();
//   }, [open, order, userId]);

//   /* =============================================================
//       🔥 Submit or Update Review
//      ============================================================= */
//   const handleSubmit = async () => {
//     if (!rating) return toast.error("Please select a rating ⭐");

//     const payload = {
//       userId,
//       orderId: order.orderId,
//       rating,
//       comment,
//     };

//     try {
//       if (reviewId) {
//         await updateReview(reviewId, payload);
//         toast.success("Review updated!");
//       } else {
//         await createReview(payload);
//         toast.success("Review submitted!");
//       }
//       onClose();
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to submit review ❌");
//     }
//   };

//   /* =============================================================
//       🔥 Delete Review
//      ============================================================= */
//   const handleDelete = async () => {
//     if (!reviewId) return;

//     try {
//       await deleteReviewApi(reviewId);
//       toast.success("Review deleted");
//       onClose();
//     } catch {
//       toast.error("Delete failed ❌");
//     }
//   };

//   /* =============================================================
//       🔥 UI
//      ============================================================= */
//   return (
//     <AnimatePresence>
//       {open && (
//         <motion.div
//           className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//         >
//           <motion.div
//             className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 relative"
//             initial={{ scale: 0.85, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             exit={{ scale: 0.8, opacity: 0 }}
//           >
//             <button
//               onClick={onClose}
//               className="absolute right-4 top-4 text-slate-500 hover:text-slate-700"
//             >
//               <X className="w-5 h-5" />
//             </button>

//             <h2 className="text-xl font-bold mb-1 text-slate-900">
//               {reviewId ? "Edit Your Review" : "Write a Review"}
//             </h2>
//             <p className="text-xs text-slate-500 mb-3">
//               Order #{order?.orderId} • {order?.items?.[0]?.mealName}
//             </p>

//             <div className="flex gap-2 mt-3 mb-4">
//               {[1, 2, 3, 4, 5].map((st) => (
//                 <Star
//                   key={st}
//                   className={`w-8 h-8 cursor-pointer transition ${
//                     (hover || rating) >= st
//                       ? "text-yellow-400 fill-yellow-400 drop-shadow"
//                       : "text-slate-300"
//                   }`}
//                   onMouseEnter={() => setHover(st)}
//                   onMouseLeave={() => setHover(0)}
//                   onClick={() => setRating(st)}
//                 />
//               ))}
//             </div>

//             <textarea
//               value={comment}
//               onChange={(e) => setComment(e.target.value)}
//               placeholder="Share your experience..."
//               rows={4}
//               className="w-full border p-3 rounded-lg text-sm focus:ring focus:ring-rose-200"
//             />

//             <div className="flex justify-between mt-6">
//               {reviewId && (
//                 <button
//                   onClick={handleDelete}
//                   className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
//                 >
//                   Delete
//                 </button>
//               )}

//               <button
//                 onClick={handleSubmit}
//                 className="px-5 py-2 rounded-lg bg-rose-500 text-white font-semibold shadow hover:bg-rose-600"
//               >
//                 {reviewId ? "Update Review" : "Submit Review"}
//               </button>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }






import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, Trash2, Send } from "lucide-react";
import toast from "react-hot-toast";

import {
  createReview,
  updateReview,
  deleteReviewApi,
  getReviewsByOrderId,
} from "../../api/api";

const REACTION_EMOJIS = ["😢", "😞", "😐", "😊", "🤩"];
const REACTION_TEXTS = ["Very Bad", "Not Good", "Average", "Good", "Excellent!"];

export default function WriteReview({ order, user, open, onClose }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [reviewId, setReviewId] = useState(null);
  const [loading, setLoading] = useState(false);

  const userId = user?.email;

  // --- Load Review Logic ---
  useEffect(() => {
    if (!open || !order) return;
    const loadReview = async () => {
      try {
        const res = await getReviewsByOrderId(order.orderId);
        const allReviews = res?.data || [];
        const myReview = allReviews.find((r) => r.userId === userId && r.orderId === order.orderId);

        if (myReview) {
          setRating(myReview.rating);
          setComment(myReview.comment);
          setReviewId(myReview.id);
        } else {
          setRating(0);
          setComment("");
          setReviewId(null);
        }
      } catch (err) {
        console.error(err);
      }
    };
    loadReview();
  }, [open, order, userId]);

  // --- Handlers ---
  const handleSubmit = async () => {
    if (!rating) return toast.error("Please select a rating ⭐");
    setLoading(true);
    const payload = { userId, orderId: order.orderId, rating, comment };

    try {
      if (reviewId) {
        await updateReview(reviewId, payload);
        toast.success("Review updated successfully!");
      } else {
        await createReview(payload);
        toast.success("Thanks for your review!");
      }
      onClose();
    } catch (err) {
      toast.error("Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!reviewId) return;
    if(!window.confirm("Are you sure you want to delete this review?")) return;
    
    try {
      await deleteReviewApi(reviewId);
      toast.success("Review deleted");
      onClose();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          
          {/* Overlay Click to Close */}
          <div className="absolute inset-0" onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="bg-white w-full max-w-md rounded-[2rem] shadow-2xl relative overflow-hidden z-10"
          >
            {/* Header */}
            <div className="bg-slate-50 px-6 py-4 flex justify-between items-center border-b border-slate-100">
               <div>
                  <h2 className="text-lg font-bold text-slate-900">{reviewId ? "Edit Review" : "Rate Experience"}</h2>
                  <p className="text-xs text-slate-500">Order #{order?.orderId}</p>
               </div>
               <button onClick={onClose} className="p-2 rounded-full bg-white text-slate-400 hover:text-slate-800 shadow-sm border border-slate-100 transition">
                  <X size={18} />
               </button>
            </div>

            <div className="p-6 text-center">
               
               {/* Animated Emoji Reaction */}
               <div className="h-16 flex items-center justify-center mb-2">
                  <motion.div 
                     key={hover || rating || 0}
                     initial={{ scale: 0.5, opacity: 0 }}
                     animate={{ scale: 1, opacity: 1 }}
                     className="text-5xl drop-shadow-md"
                  >
                     {(hover || rating) > 0 ? REACTION_EMOJIS[(hover || rating) - 1] : "🤔"}
                  </motion.div>
               </div>
               <p className="text-sm font-semibold text-slate-600 mb-6 h-5">
                  {(hover || rating) > 0 ? REACTION_TEXTS[(hover || rating) - 1] : "How was the food?"}
               </p>

               {/* Star Rating */}
               <div className="flex justify-center gap-2 mb-8">
                  {[1, 2, 3, 4, 5].map((star) => (
                     <motion.button
                        key={star}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onMouseEnter={() => setHover(star)}
                        onMouseLeave={() => setHover(0)}
                        onClick={() => setRating(star)}
                        className="focus:outline-none"
                     >
                        <Star 
                           size={36} 
                           className={`transition-all duration-300 ${
                              (hover || rating) >= star 
                                 ? "fill-amber-400 text-amber-400 drop-shadow-sm" 
                                 : "fill-slate-100 text-slate-200"
                           }`} 
                        />
                     </motion.button>
                  ))}
               </div>

               {/* Comment Box */}
               <div className="relative">
                  <textarea 
                     value={comment}
                     onChange={(e) => setComment(e.target.value)}
                     placeholder="Tell us what you loved (or didn't)..."
                     rows={4}
                     className="w-full bg-slate-50 rounded-2xl p-4 text-sm text-slate-700 placeholder-slate-400 border border-transparent focus:border-rose-200 focus:bg-white focus:ring-4 focus:ring-rose-50 outline-none transition-all resize-none"
                  />
                  <span className="absolute bottom-3 right-4 text-[10px] text-slate-400 font-bold">{comment.length}/500</span>
               </div>

               {/* Actions */}
               <div className="flex gap-3 mt-6">
                  {reviewId && (
                     <button 
                        onClick={handleDelete}
                        className="px-4 py-3 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 font-bold transition flex items-center justify-center"
                        title="Delete Review"
                     >
                        <Trash2 size={20} />
                     </button>
                  )}
                  <button 
                     onClick={handleSubmit}
                     disabled={loading || rating === 0}
                     className="flex-1 py-3 rounded-xl bg-slate-900 text-white font-bold shadow-lg shadow-slate-200 hover:bg-black hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                     {loading ? "Submitting..." : (
                        <>
                           {reviewId ? "Update Review" : "Submit Review"} <Send size={16} />
                        </>
                     )}
                  </button>
               </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}