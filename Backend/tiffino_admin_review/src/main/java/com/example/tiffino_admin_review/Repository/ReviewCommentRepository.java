package com.example.tiffino_admin_review.Repository;

import com.example.tiffino_admin_review.Entity.ReviewComment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReviewCommentRepository extends JpaRepository<ReviewComment, Long> {
    Optional<ReviewComment> findByReviewId(Long reviewId);
    List<ReviewComment> findByReviewIdIs(Long replyId);


}
