package com.example.tiffino_admin_review.controller;

import com.example.tiffino_admin_review.Entity.Review;
import com.example.tiffino_admin_review.Entity.ReviewComment;
import com.example.tiffino_admin_review.Service.ReviewCommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
@CrossOrigin("*")
@RestController
@RequestMapping("/rev")
public class ReviewCommentController {

    @Autowired
    private ReviewCommentService revComService;

    @GetMapping("/reviews")
    public List<Review> getAllRevs(){
        return revComService.getAllRevs();
    }

    @PostMapping("/{adminId}/replies/{reviewId}")
    public ReviewComment addReply(@PathVariable Long reviewId, @PathVariable Long adminId, @RequestBody Map<String, String> body) {
        return revComService.addReply(reviewId, adminId, body.get("reply"));
    }

    @GetMapping("/replies/{reviewId}")
    public List<ReviewComment> getReplies(@PathVariable Long reviewId){
        return revComService.getRepliesByReviewId(reviewId);
    }

    @GetMapping("/replies")
    public List<ReviewComment> getAllReviews(){
        return revComService.getAllReviews();
    }

    @PutMapping("/replies/{reviewId}")
    public ResponseEntity<ReviewComment> updateReply(@PathVariable Long reviewId, @RequestBody Map<String, String> body){
        ReviewComment response=revComService.updateReply(reviewId, body.get("reply"));
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/replies/{reviewId}")
    public ResponseEntity<String> deleteReply(@PathVariable Long reviewId){
        revComService.deleteReply(reviewId);
        return ResponseEntity.ok("reply is deleted");
    }

}



