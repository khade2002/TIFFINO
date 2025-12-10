//package com.tiffino.review.repository;
//
//import com.tiffino.review.model.Review;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.query.Param;
//
//import java.util.List;
//
//public interface ReviewRepository extends JpaRepository<Review, Long> {
//    List<Review> findByMealId(Long mealId);
//
//    @Query("Select cast(Avg(r.rating) as double) from Review r where r.mealId= :mealId")
//    Double findAverageRatingByMealId(@Param("mealId") Long mealId);
//
//
//}




package com.tiffino.review.repository;

import com.tiffino.review.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findByOrderId(Long orderId);

    List<Review> findByUserIdAndOrderId(String userId, Long orderId);
}
