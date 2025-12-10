package com.tiffino.tiffino_user_meal.DTO;

import com.tiffino.tiffino_user_meal.Entity.MealCategory;
import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class MealDTO {
    private Long cuisineId;
    private String mealName;
    private MealCategory mealCategory;
    private String mealType;
    private String description;
    private String imageUrl;
    private String nutritionInfo;
    private Double mealPrice;
    private String ingredients; // JSON string
    private String allergens;   // JSON string
}
