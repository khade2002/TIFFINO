package com.tiffino.tiffino_user_meal.Controller;

import com.tiffino.tiffino_user_meal.Entity.Cuisine;
import com.tiffino.tiffino_user_meal.DTO.CuisineDTO;
import com.tiffino.tiffino_user_meal.Service.CuisineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("*")
@RestController
@RequestMapping("/user/cuisines")
public class CuisineController {

    @Autowired
    private CuisineService cuisineService;

    //read
    @GetMapping
    public ResponseEntity<List<Cuisine>> getAllCuisines() {
        return ResponseEntity.ok(cuisineService.getAllCuisines());
    }
    

    @GetMapping("/{id}")
    public ResponseEntity<Cuisine> getCuisineById(@PathVariable Long id) {
        return cuisineService.getCuisineById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/region/{region}")
    public ResponseEntity<List<Cuisine>> getCuisinesByRegion(@PathVariable String region) {
        return ResponseEntity.ok(cuisineService.getCuisinesByRegion(region));
    }

    @GetMapping("/state/{state}")
    public ResponseEntity<List<Cuisine>> getCuisinesByState(@PathVariable String state) {
        return ResponseEntity.ok(cuisineService.getCuisinesByState(state));
    }

    @GetMapping("/name/{name}")
    public List<Cuisine> searchByCuisineName(@PathVariable String name) {
        return cuisineService.searchByCuisineName(name);
    }

}
