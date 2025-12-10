package com.tiffino.tiffino_user_meal.Controller;

import com.tiffino.tiffino_user_meal.Entity.Meal;
import com.tiffino.tiffino_user_meal.Service.MealService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("*")
@RestController
@RequestMapping("/user/meals")
public class MealController {

    private final MealService mealService;

    public MealController(MealService mealService) {
        this.mealService = mealService;
    }


    // READ
    @GetMapping
    public ResponseEntity<List<Meal>> getAllMeals() {
        return ResponseEntity.ok(mealService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Meal> getMealById(@PathVariable Long id) {
        return ResponseEntity.ok(mealService.getById(id));
    }

    @GetMapping("/mealName/{mealName}")
    public ResponseEntity<List<Meal>> getMealsByName(@PathVariable String mealName) {
        return ResponseEntity.ok(mealService.getByMealName(mealName));
    }

    @GetMapping("/mealType/{mealType}")
    public ResponseEntity<List<Meal>> getMealsByType(@PathVariable String mealType) {
        return ResponseEntity.ok(mealService.getByType(mealType));
    }

    @GetMapping("/region/{region}")
    public ResponseEntity<List<Meal>> getMealsByRegion(@PathVariable String region) {
        return ResponseEntity.ok(mealService.getByRegion(region));
    }

    @GetMapping("/state/{state}")
    public ResponseEntity<List<Meal>> getMealsByState(@PathVariable String state) {
        return ResponseEntity.ok(mealService.getByState(state));
    }


}
