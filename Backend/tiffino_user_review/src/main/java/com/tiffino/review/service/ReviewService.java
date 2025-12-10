//package com.tiffino.review.service;
//
//import com.tiffino.review.dto.ReviewRequestDTO;
//import com.tiffino.review.dto.ReviewResponseDTO;
//
//import java.util.List;
//
//public interface ReviewService {
//    ReviewResponseDTO createReview(ReviewRequestDTO dto);//add new review to db
//
//    List<ReviewResponseDTO> getAllReviews();
//
//    ReviewResponseDTO getReviewById(Long id);  //reviewid
//
//    List<ReviewResponseDTO> getReviewByMealId(Long mealId);
//
//    ReviewResponseDTO updateReview(Long Id, ReviewRequestDTO review);
//
//    void deleteReview(Long id);
//
//    Double getAvgRatingForMeal(Long mealId);
//
//
//
//
//}



package com.tiffino.review.service;

import com.tiffino.review.dto.ReviewRequestDTO;
import com.tiffino.review.dto.ReviewResponseDTO;

import java.util.List;

public interface ReviewService {

    ReviewResponseDTO createReview(ReviewRequestDTO dto);

    List<ReviewResponseDTO> getAllReviews();

    ReviewResponseDTO getReviewById(Long id);

    List<ReviewResponseDTO> getReviewsByOrderId(Long orderId);

    ReviewResponseDTO updateReview(Long id, ReviewRequestDTO review);

    void deleteReview(Long id);
}
