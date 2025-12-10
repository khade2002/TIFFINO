package com.cloudkitchen.admin.controller;

import com.cloudkitchen.admin.repository.DeliveryPartnerRepository;
import com.cloudkitchen.admin.repository.KitchenRepository;
import com.cloudkitchen.admin.repository.ManagerRepository;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
@CrossOrigin("*")
@RestController
@RequestMapping("/api/admin/reports")
public class ReportsController {
    private final KitchenRepository kitchens;
    private final ManagerRepository managers;
    private final DeliveryPartnerRepository delivery;
    public ReportsController(KitchenRepository kitchens, ManagerRepository managers, DeliveryPartnerRepository delivery){
        this.kitchens=kitchens; this.managers=managers; this.delivery=delivery;
    }
    @GetMapping
    public Map<String,Object> summary(){
        double avgRating = kitchens.findAll().stream()
            .map(k -> k.getRating()==null?0.0:k.getRating())
            .mapToDouble(Double::doubleValue).average().orElse(0.0);
        return Map.of("kitchens", kitchens.count(),
                      "managers", managers.count(),
                      "deliveryPartners", delivery.count(),
                      "averageKitchenRating", avgRating);
    }
}
