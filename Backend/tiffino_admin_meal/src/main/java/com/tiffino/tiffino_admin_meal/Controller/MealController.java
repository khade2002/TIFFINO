package com.tiffino.tiffino_admin_meal.Controller;

import com.tiffino.tiffino_admin_meal.Entity.Meal;
import com.tiffino.tiffino_admin_meal.Service.MealService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("*")
@RestController
@RequestMapping("/adminn/meals")
public class MealController {

    private final MealService mealService;

    public MealController(MealService mealService) {
        this.mealService = mealService;
    }

    // CREATE
    @PostMapping
    public ResponseEntity<Meal> addMeal(@RequestBody Meal meal) {
        Meal savedMeal = mealService.addMeal(meal);
        return ResponseEntity.ok(savedMeal);
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

    @GetMapping("/name/{mealName}")
    public ResponseEntity<List<Meal>> getMealsByName(@PathVariable String mealName) {
        return ResponseEntity.ok(mealService.getByMealName(mealName));
    }

    @GetMapping("/type/{mealType}")
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

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<Meal> updateMeal(@PathVariable Long id, @RequestBody Meal meal) {
        return ResponseEntity.ok(mealService.update(id, meal));
    }

    @PutMapping("/name/{mealName}")
    public ResponseEntity<Meal> updateMealByName(@PathVariable String mealName, @RequestBody Meal meal) {
        return ResponseEntity.ok(mealService.updateByMealName(mealName, meal));
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMeal(@PathVariable Long id) {
        mealService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/name/{mealName}")
    public ResponseEntity<Void> deleteMealByName(@PathVariable String mealName) {
        mealService.deleteByMealName(mealName);
        return ResponseEntity.noContent().build();
    }
}
