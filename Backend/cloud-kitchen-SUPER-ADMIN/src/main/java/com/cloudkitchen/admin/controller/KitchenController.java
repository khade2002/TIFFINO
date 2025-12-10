package com.cloudkitchen.admin.controller;

import com.cloudkitchen.admin.model.Kitchen;
import com.cloudkitchen.admin.repository.KitchenRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@CrossOrigin("*")
@RestController
@RequestMapping("/api/admin/kitchens")
public class KitchenController {
    private final KitchenRepository repo;
    public KitchenController(KitchenRepository repo){ this.repo = repo; }
    @PostMapping public Kitchen create(@RequestBody Kitchen k){ return repo.save(k); }
    @GetMapping
    public List<Kitchen> search(@RequestParam(required=false) String state,
                                @RequestParam(required=false) String city,
                                @RequestParam(required = false) Long pincode,
                                @RequestParam(required=false) Double rating,
                                @RequestParam(required = false) Long revenue,
                                @RequestParam(required=false) Boolean profitable){
        if(state!=null) return repo.findByStateIgnoreCase(state);
        if(city!=null) return repo.findByCityIgnoreCase(city);
        if (pincode != null) return repo.findByRevenueGreaterThanEqual(pincode);
        if(rating!=null) return repo.findByRatingGreaterThanEqual(rating);
        if(profitable!=null) return repo.findByProfitable(profitable);
        if (revenue != null) return repo.findByRevenueGreaterThanEqual(revenue);
        return repo.findAll();
    }
    @DeleteMapping("/{id}") public void delete(@PathVariable Long id){ repo.deleteById(id); }
}
