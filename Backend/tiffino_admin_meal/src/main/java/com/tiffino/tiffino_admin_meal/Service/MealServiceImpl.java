package com.tiffino.tiffino_admin_meal.Service;

import com.tiffino.tiffino_admin_meal.Entity.Cuisine;
import com.tiffino.tiffino_admin_meal.Entity.Meal;
import com.tiffino.tiffino_admin_meal.Exception.ResourceNotFoundException;
import com.tiffino.tiffino_admin_meal.Repository.CuisineRepository;
import com.tiffino.tiffino_admin_meal.Repository.MealRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MealServiceImpl implements MealService {

    private final MealRepository mealRepository;
    private final CuisineRepository cuisineRepository;

    public MealServiceImpl(MealRepository mealRepository, CuisineRepository cuisineRepository) {
        this.mealRepository = mealRepository;
        this.cuisineRepository = cuisineRepository;
    }


    // CREATE

    @Override
    public Meal addMeal(Meal meal) {
        // Validate and fetch existing Cuisine
        if (meal.getCuisine() == null || meal.getCuisine().getId() == null) {
            throw new ResourceNotFoundException("Cuisine ID must be provided in meal JSON");
        }

        Cuisine cuisine = cuisineRepository.findById(meal.getCuisine().getId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Cuisine not found with id: " + meal.getCuisine().getId()));

        // Set the fetched Cuisine before saving
        meal.setCuisine(cuisine);
        return mealRepository.save(meal);
    }


    // READ

    @Override
    public List<Meal> getAll() {
        return mealRepository.findAll();
    }

    @Override
    public Meal getById(Long id) {
        return mealRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Meal not found with id: " + id));
    }

    @Override
    public List<Meal> getByMealName(String mealName) {
        return mealRepository.findByMealNameIgnoreCase(mealName);
    }

    @Override
    public List<Meal> getByType(String type) {
        return mealRepository.findByMealType(type);
    }

    @Override
    public List<Meal> getByRegion(String region) {
        return mealRepository.findByCuisine_Region(region);
    }

    @Override
    public List<Meal> getByState(String state) {
        return mealRepository.findByCuisine_State(state);
    }


    // UPDATE
    @Override
    public Meal update(Long id, Meal meal) {
        Meal existingMeal = getById(id);

        if (meal.getCuisine() == null || meal.getCuisine().getId() == null) {
            throw new ResourceNotFoundException("Cuisine ID must be provided for update");
        }

        Cuisine cuisine = cuisineRepository.findById(meal.getCuisine().getId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Cuisine not found with id: " + meal.getCuisine().getId()));

        existingMeal.setMealName(meal.getMealName());
        existingMeal.setMealType(meal.getMealType());
        existingMeal.setDescription(meal.getDescription());
        existingMeal.setImageUrl(meal.getImageUrl());
        existingMeal.setMealCategory(meal.getMealCategory());
        existingMeal.setNutritionInfo(meal.getNutritionInfo());
        existingMeal.setMealPrice(meal.getMealPrice());
        existingMeal.setIngredients(meal.getIngredients());
        existingMeal.setAllergens(meal.getAllergens());
        existingMeal.setCuisine(cuisine);

        return mealRepository.save(existingMeal);
    }

    @Override
    public Meal updateByMealName(String mealName, Meal updatedMeal) {
        Meal existingMeal = mealRepository.findByMealNameIgnoreCase(mealName)
                .stream()
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Meal not found with name: " + mealName));

        if (updatedMeal.getCuisine() == null || updatedMeal.getCuisine().getId() == null) {
            throw new ResourceNotFoundException("Cuisine ID must be provided for update");
        }

        Cuisine cuisine = cuisineRepository.findById(updatedMeal.getCuisine().getId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Cuisine not found with id: " + updatedMeal.getCuisine().getId()));

        existingMeal.setMealName(updatedMeal.getMealName());
        existingMeal.setMealType(updatedMeal.getMealType());
        existingMeal.setDescription(updatedMeal.getDescription());
        existingMeal.setImageUrl(updatedMeal.getImageUrl());
        existingMeal.setMealCategory(updatedMeal.getMealCategory());
        existingMeal.setNutritionInfo(updatedMeal.getNutritionInfo());
        existingMeal.setMealPrice(updatedMeal.getMealPrice());
        existingMeal.setIngredients(updatedMeal.getIngredients());
        existingMeal.setAllergens(updatedMeal.getAllergens());
        existingMeal.setCuisine(cuisine);

        return mealRepository.save(existingMeal);
    }
    // DELETE
    @Override
    public void delete(Long id) {
        Meal meal = getById(id); // ensure exists
        mealRepository.delete(meal);
    }
    @Override
    public void deleteByMealName(String mealName) {
        Meal meal = mealRepository.findByMealNameIgnoreCase(mealName)
                .stream()
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Meal not found with name: " + mealName));
        mealRepository.delete(meal);
    }
}
