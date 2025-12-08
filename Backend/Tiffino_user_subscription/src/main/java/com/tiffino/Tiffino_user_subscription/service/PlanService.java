package com.tiffino.Tiffino_user_subscription.service;

import com.tiffino.Tiffino_user_subscription.entity.Plan;
import java.util.List;

public interface PlanService {
    Plan createPlan(Plan plan);
    List<Plan> getAllPlans();
    Plan updatePlan(Long id, Plan updatedPlan);
    void deletePlan(Long id);
}