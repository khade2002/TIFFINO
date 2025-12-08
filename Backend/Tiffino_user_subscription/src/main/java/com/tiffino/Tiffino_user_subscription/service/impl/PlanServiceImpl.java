package com.tiffino.Tiffino_user_subscription.service.impl;

import com.tiffino.Tiffino_user_subscription.entity.Plan;
import com.tiffino.Tiffino_user_subscription.repository.PlanRepository;
import com.tiffino.Tiffino_user_subscription.service.PlanService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlanServiceImpl implements PlanService {

    private final PlanRepository planRepository;

    public PlanServiceImpl(PlanRepository planRepository) {
        this.planRepository = planRepository;
    }

    @Override
    public Plan createPlan(Plan plan) {
        return planRepository.save(plan);
    }

    @Override
    public List<Plan> getAllPlans() {
        return planRepository.findAll();
    }

    @Override
    public Plan updatePlan(Long id, Plan updatedPlan) {
        return planRepository.findById(id).map(plan -> {
            plan.setDuration(updatedPlan.getDuration());
            // plan.setMealType(updatedPlan.getMealType());
            plan.setDescription(updatedPlan.getDescription());
            plan.setPrice(updatedPlan.getPrice());
            plan.setDiscountPercentage(updatedPlan.getDiscountPercentage()); // ✅ important
            return planRepository.save(plan);
        }).orElseThrow(() -> new RuntimeException("Plan not found with id " + id));
    }


    @Override
    public void deletePlan(Long id) {
        if (!planRepository.existsById(id))
            throw new RuntimeException("Plan not found with id " + id);
        planRepository.deleteById(id);
    }
}
