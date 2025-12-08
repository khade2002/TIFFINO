package com.example.tiffino_admin_review.Service;


import com.example.tiffino_admin_review.Entity.Review;
import com.example.tiffino_admin_review.Entity.ReviewComment;

import java.util.List;

public interface ReviewCommentService {
    ReviewComment addReply(Long reviewId, Long adminId, String reply);
    List<ReviewComment> getRepliesByReviewId(Long reviewId);
    List<ReviewComment> getAllReviews();
    ReviewComment updateReply(Long reviewId,String newReply);
    void deleteReply(Long reviewId);
    List<Review> getAllRevs();
}
