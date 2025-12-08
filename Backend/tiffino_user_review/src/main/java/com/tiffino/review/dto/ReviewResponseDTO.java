//package com.tiffino.review.dto;
//
//import lombok.AllArgsConstructor;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//
//import java.time.LocalDateTime;
//
//
//@Data
//@NoArgsConstructor
//@AllArgsConstructor
//public class ReviewResponseDTO {
//    private Long id;
//    private Long userId;
//    private Long mealId;
//    private Long orderId;
//    private Integer rating;
//    private String comment;
//    private LocalDateTime reviewDate;
//
//
//
//}




package com.tiffino.review.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReviewResponseDTO {
    private Long id;
    private String userId;
    private Long orderId;
    private Integer rating;
    private String comment;
    private LocalDateTime reviewDate;
}
