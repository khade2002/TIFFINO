package com.tiffino.review.controller;
import com.tiffino.review.dto.ReviewRequestDTO;
import com.tiffino.review.dto.ReviewResponseDTO;
import com.tiffino.review.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("api/userreview/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @PostMapping
    public ReviewResponseDTO createReview(@RequestBody ReviewRequestDTO dto){
        return reviewService.createReview(dto);
    }

    @GetMapping
    public List<ReviewResponseDTO> getAllRevs(){
        return reviewService.getAllReviews();
    }

    @GetMapping("/{id}")
    public ReviewResponseDTO getRevById(@PathVariable Long id){
        return reviewService.getReviewById(id);
    }

    @GetMapping("/order/{orderId}")
    public List<ReviewResponseDTO> getByOrderId(@PathVariable Long orderId){
        return reviewService.getReviewsByOrderId(orderId);
    }

    @PutMapping("/{id}")
    public ReviewResponseDTO updateRev(@PathVariable Long id , @RequestBody ReviewRequestDTO dto){
        return reviewService.updateReview(id, dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteComment(@PathVariable Long id){
        reviewService.deleteReview(id);
        return ResponseEntity.ok("deleted");
    }
}
