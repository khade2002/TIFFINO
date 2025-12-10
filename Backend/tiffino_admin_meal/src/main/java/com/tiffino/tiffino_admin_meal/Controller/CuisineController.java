package com.tiffino.tiffino_admin_meal.Controller;

import com.tiffino.tiffino_admin_meal.Entity.Cuisine;
import com.tiffino.tiffino_admin_meal.DTO.CuisineDTO;
import com.tiffino.tiffino_admin_meal.Entity.Meal;
import com.tiffino.tiffino_admin_meal.Service.CuisineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("*")
@RestController
@RequestMapping("/adminn/cuisines")
public class CuisineController {

    @Autowired
    private CuisineService cuisineService;

    // CREATE
    @PostMapping
    public ResponseEntity<Cuisine> createCuisine(@RequestBody CuisineDTO dto) {
        return ResponseEntity.ok(cuisineService.createCuisine(dto));
    }

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


    // UPDATE
    @PutMapping("/id/{id}")
    public ResponseEntity<Cuisine> updateById(@PathVariable Long id, @RequestBody CuisineDTO dto) {
        return ResponseEntity.ok(cuisineService.updateCuisineById(id, dto));
    }

    @PutMapping("/region/{region}")
    public ResponseEntity<List<Cuisine>> updateByRegion(@PathVariable String region, @RequestBody CuisineDTO dto) {
        return ResponseEntity.ok(cuisineService.updateCuisineByRegion(region, dto));
    }

    @PutMapping("/state/{state}")
    public ResponseEntity<List<Cuisine>> updateByState(@PathVariable String state, @RequestBody CuisineDTO dto) {
        return ResponseEntity.ok(cuisineService.updateCuisineByState(state, dto));
    }


    // DELETE
    @DeleteMapping("/id/{id}")
    public ResponseEntity<String> deleteById(@PathVariable Long id) {
        cuisineService.deleteCuisineById(id);
        return ResponseEntity.ok("Deleted successfully by ID");
    }

    @DeleteMapping("/region/{region}")
    public ResponseEntity<String> deleteByRegion(@PathVariable String region) {
        cuisineService.deleteByRegion(region);
        return ResponseEntity.ok("Deleted successfully by Region");
    }

    @DeleteMapping("/state/{state}")
    public ResponseEntity<String> deleteByState(@PathVariable String state) {
        cuisineService.deleteByState(state);
        return ResponseEntity.ok("Deleted successfully by State");
    }
}
