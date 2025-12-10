//package com.tiffino.review.model;
//
//import jakarta.persistence.*;
//import lombok.*;
//
//import java.time.LocalDateTime;
//
//@Entity
//@Data
//@NoArgsConstructor
//@AllArgsConstructor
//@Table(name="review")
//public class Review {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//    private Long userId;
//    private Long mealId;
//    private Long orderId;
//    private Integer rating; // 1 to 5
//    private String comment;
//    private LocalDateTime reviewDate;
//
//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    public Long getUserId() {
//        return userId;
//    }
//
//    public void setUserId(Long userId) {
//        this.userId = userId;
//    }
//
//    public Long getMealId() {
//        return mealId;
//    }
//
//    public void setMealId(Long mealId) {
//        this.mealId = mealId;
//    }
//
//    public Long getOrderId() {
//        return orderId;
//    }
//
//    public void setOrderId(Long orderId) {
//        this.orderId = orderId;
//    }
//
//    public Integer getRating() {
//        return rating;
//    }
//
//    public void setRating(Integer rating) {
//        this.rating = rating;
//    }
//
//    public LocalDateTime getReviewDate() {
//        return reviewDate;
//    }
//
//    public void setReviewDate(LocalDateTime reviewDate) {
//        this.reviewDate = reviewDate;
//    }
//
//    public String getComment() {
//        return comment;
//    }
//
//    public void setComment(String comment) {
//        this.comment = comment;
//    }
//
//}




package com.tiffino.review.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name="review")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userId;     // changed to String
    private Long orderId;

    private Integer rating;
    private String comment;

    private LocalDateTime reviewDate;
}
