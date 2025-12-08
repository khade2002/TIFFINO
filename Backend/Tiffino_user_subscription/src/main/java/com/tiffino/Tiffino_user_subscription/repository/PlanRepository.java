package com.tiffino.Tiffino_user_subscription.repository;

import com.tiffino.Tiffino_user_subscription.entity.Plan;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PlanRepository extends JpaRepository<Plan, Long> {
    List<Plan> findByDuration(String duration);
    //List<Plan> findByMealTypeAndDuration(Plan.MealType mealType, String duration);
}
