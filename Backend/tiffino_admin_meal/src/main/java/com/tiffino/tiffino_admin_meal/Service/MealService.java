package com.tiffino.tiffino_admin_meal.Service;

import com.tiffino.tiffino_admin_meal.Entity.Meal;
import java.util.List;

public interface MealService {

    // CREATE
    Meal addMeal(Meal meal);

    // READ
    List<Meal> getAll();
    Meal getById(Long id);
    List<Meal> getByMealName(String mealName);
    List<Meal> getByType(String type);
    List<Meal> getByRegion(String region);
    List<Meal> getByState(String state);

    // UPDATE
    Meal update(Long id, Meal meal);
    Meal updateByMealName(String mealName, Meal updatedMeal);

    // DELETE
    void delete(Long id);
    void deleteByMealName(String mealName);
}
