package com.tiffino.tiffino_user_meal.Repository;

import com.tiffino.tiffino_user_meal.Entity.Cuisine;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CuisineRepository extends JpaRepository<Cuisine, Long> {

    // Find
    List<Cuisine> findByRegion(String region);
    List<Cuisine> findByState(String state);

    // Get partial match (contains) ignoring case
    List<Cuisine> findByCuisineNameContainingIgnoreCase(String cuisineName);

    // Delete
    @Transactional
    void deleteByRegionIgnoreCase(String region);

    @Transactional
    void deleteByStateIgnoreCase(String state);

}
