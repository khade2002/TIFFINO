package com.tiffino.tiffino_admin_meal.Repository;

import com.tiffino.tiffino_admin_meal.Entity.Meal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MealRepository extends JpaRepository<Meal, Long> {

    // Search by meal name (ignore case)
    List<Meal> findByMealNameIgnoreCase(String mealName);

    // Search by meal type (Breakfast, Lunch, Dinner, etc.)
    List<Meal> findByMealType(String mealType);

    // Search meals by cuisine region (assumes Meal has a 'cuisine' relationship)
    List<Meal> findByCuisine_Region(String region);

    // Search meals by cuisine state
    List<Meal> findByCuisine_State(String state);
}
