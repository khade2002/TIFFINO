package com.tiffino.review.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReviewUpdateDTO {  //updating
    private Integer rating;
    private String comment;
}
