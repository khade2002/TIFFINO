package com.tiffino.tiffino_user_meal.Service;

import com.tiffino.tiffino_user_meal.Entity.Meal;
import java.util.List;

public interface MealService {

    // READ
    List<Meal> getAll();
    Meal getById(Long id);
    List<Meal> getByMealName(String mealName);
    List<Meal> getByType(String type);
    List<Meal> getByRegion(String region);
    List<Meal> getByState(String state);


}
