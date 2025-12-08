package com.tiffino.tiffino_admin_meal.Service;

import com.tiffino.tiffino_admin_meal.Entity.Cuisine;
import com.tiffino.tiffino_admin_meal.DTO.CuisineDTO;
import com.tiffino.tiffino_admin_meal.Repository.CuisineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CuisineServiceImpl implements CuisineService {

    @Autowired
    private CuisineRepository cuisineRepository;
    // CREATE
    @Override
    public Cuisine createCuisine(CuisineDTO dto) {
        Cuisine cuisine = new Cuisine();
        cuisine.setRegion(dto.getRegion());
        cuisine.setState(dto.getState());
        cuisine.setCuisineName(dto.getCuisineName());
        return cuisineRepository.save(cuisine);
    }


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


    // UPDATE
    @Override
    public Cuisine updateCuisineById(Long id, CuisineDTO dto) {
        Optional<Cuisine> optional = cuisineRepository.findById(id);
        if(optional.isPresent()){
            Cuisine cuisine = optional.get();
            cuisine.setRegion(dto.getRegion());
            cuisine.setState(dto.getState());
            cuisine.setCuisineName(dto.getCuisineName());
            return cuisineRepository.save(cuisine);
        } else {
            throw new RuntimeException("Cuisine not found with ID: " + id);
        }
    }

    @Override
    public List<Cuisine> updateCuisineByRegion(String region, CuisineDTO dto) {
        List<Cuisine> cuisines = cuisineRepository.findByRegion(region);
        for (Cuisine c : cuisines) {
            c.setState(dto.getState());
            c.setCuisineName(dto.getCuisineName());
            c.setRegion(dto.getRegion()); // optional
        }
        return cuisineRepository.saveAll(cuisines);
    }

    @Override
    public List<Cuisine> updateCuisineByState(String state, CuisineDTO dto) {
        List<Cuisine> cuisines = cuisineRepository.findByState(state);
        for (Cuisine c : cuisines) {
            c.setRegion(dto.getRegion());
            c.setCuisineName(dto.getCuisineName());
            c.setState(dto.getState()); // optional
        }
        return cuisineRepository.saveAll(cuisines);
    }

    // DELETE

    @Override
    public void deleteCuisineById(Long id) {
        cuisineRepository.deleteById(id);
    }

    @Override
    public void deleteByRegion(String region) {
        cuisineRepository.deleteByRegionIgnoreCase(region);
    }

    @Override
    public void deleteByState(String state) {
        cuisineRepository.deleteByStateIgnoreCase(state);
    }
}
