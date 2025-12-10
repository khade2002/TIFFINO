package com.tiffino.tiffino_user_meal.Service;

import com.tiffino.tiffino_user_meal.Entity.Cuisine;
import com.tiffino.tiffino_user_meal.DTO.CuisineDTO;
import com.tiffino.tiffino_user_meal.Repository.CuisineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CuisineServiceImpl implements CuisineService {

    @Autowired
    private CuisineRepository cuisineRepository;

    // READ
    @Override
    public List<Cuisine> getAllCuisines() {
        return cuisineRepository.findAll();
    }

    @Override
    public Optional<Cuisine> getCuisineById(Long id) {
        return cuisineRepository.findById(id);
    }

    @Override
    public List<Cuisine> getCuisinesByRegion(String region) {
        return cuisineRepository.findByRegion(region);
    }

    @Override
    public List<Cuisine> getCuisinesByState(String state) {
        return cuisineRepository.findByState(state);
    }

    @Override
    public List<Cuisine> searchByCuisineName(String name) {
        return cuisineRepository.findByCuisineNameContainingIgnoreCase(name);
    }

}
