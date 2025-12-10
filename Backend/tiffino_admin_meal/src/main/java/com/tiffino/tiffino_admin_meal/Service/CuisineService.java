package com.tiffino.tiffino_admin_meal.Service;

import com.tiffino.tiffino_admin_meal.Entity.Cuisine;
import com.tiffino.tiffino_admin_meal.DTO.CuisineDTO;

import java.util.List;
import java.util.Optional;

public interface CuisineService {

    // CREATE
    Cuisine createCuisine(CuisineDTO dto);

    // READ
    List<Cuisine> getAllCuisines();
    Optional<Cuisine> getCuisineById(Long id);
    List<Cuisine> getCuisinesByRegion(String region);
    List<Cuisine> getCuisinesByState(String state);

    // Get by partial / ignore case cuisine name
    List<Cuisine> searchByCuisineName(String name);

    // UPDATE
    Cuisine updateCuisineById(Long id, CuisineDTO dto);
    List<Cuisine> updateCuisineByRegion(String region, CuisineDTO dto);
    List<Cuisine> updateCuisineByState(String state, CuisineDTO dto);

    // DELETE
    void deleteCuisineById(Long id);
    void deleteByRegion(String region);
    void deleteByState(String state);
}
