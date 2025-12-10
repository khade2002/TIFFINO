package com.tiffino.Tiffino_user_subscription.controller;
import com.tiffino.Tiffino_user_subscription.entity.Plan;
import com.tiffino.Tiffino_user_subscription.service.PlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
@CrossOrigin("*")
@RestController
@RequestMapping("/subscri/plans")
public class PlanController {

    @Autowired
    private PlanService planService;

    // Create Plan
    @PostMapping
    public Plan createPlan(@RequestBody Plan plan) {
        return planService.createPlan(plan);
    }

    //  Get All Plans
    @GetMapping
    public List<Plan> getAllPlans() {
        return planService.getAllPlans();
    }

    //  Get Plan by ID
    @GetMapping("/{id}")
    public ResponseEntity<Plan> getPlanById(@PathVariable Long id) {
        return planService.getAllPlans().stream()
                .filter(p -> p.getId().equals(id))
                .findFirst()
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Delete Plan
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlan(@PathVariable Long id) {
        try {
            planService.deletePlan(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    //  Update Plan
    @PutMapping("/{id}")
    public ResponseEntity<Plan> updatePlan(@PathVariable Long id, @RequestBody Plan updatedPlan) {
        try {
            Plan plan = planService.updatePlan(id, updatedPlan);
            return ResponseEntity.ok(plan);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    //  Get Plans by Duration
    @GetMapping("/duration/{duration}")
    public List<Plan> getPlansByDuration(@PathVariable String duration) {
        return planService.getAllPlans().stream()
                .filter(p -> duration.equalsIgnoreCase(p.getDuration()))
                .toList();
    }

    //  Get Plans Grouped by Duration
    @GetMapping("/grouped")
    public Map<String, List<Plan>> getPlansGroupedByDuration() {
        List<Plan> allPlans = planService.getAllPlans();
        Map<String, List<Plan>> groupedPlans = new LinkedHashMap<>();
        for (Plan plan : allPlans) {
            String duration = plan.getDuration() != null ? plan.getDuration() : "UNKNOWN";
            groupedPlans.computeIfAbsent(duration, k -> new ArrayList<>()).add(plan);
        }
        return groupedPlans;
    }
}
