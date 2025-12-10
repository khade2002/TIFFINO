//package com.tiffino.review.dto;
//
//import lombok.Data;
//
//@Data
//public class ReviewRequestDTO {  //while creating a review
//    private Long userId;
//    private Long mealId;
//    private Long orderId;
//    private Integer rating;
//    private String comment;
//
//
//    public String getComment() {
//        return comment;
//    }
//
//    public Integer getRating() {
//        return rating;
//    }
//
//}



package com.tiffino.review.dto;

import lombok.Data;

@Data
public class ReviewRequestDTO {
    private String userId;   // email -> String now
    private Long orderId;
    private Integer rating;
    private String comment;
}
