package com.tiffino.tiffino_user_meal.Service;

import com.tiffino.tiffino_user_meal.Entity.Cuisine;
import com.tiffino.tiffino_user_meal.Entity.Meal;
import com.tiffino.tiffino_user_meal.Exception.ResourceNotFoundException;
import com.tiffino.tiffino_user_meal.Repository.CuisineRepository;
import com.tiffino.tiffino_user_meal.Repository.MealRepository;
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





}
