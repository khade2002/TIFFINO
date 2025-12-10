package com.cloudkitchen.admin.repository;

import com.cloudkitchen.admin.model.Kitchen;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface KitchenRepository extends JpaRepository<Kitchen, Long> {
    List<Kitchen> findByStateIgnoreCase(String state);
    List<Kitchen> findByCityIgnoreCase(String city);
    List<Kitchen> findByRatingGreaterThanEqual(Double rating);
    List<Kitchen> findByProfitable(Boolean profitable);
    List<Kitchen> findByRevenueGreaterThanEqual(Long revenue);
    List<Kitchen> findByPincodeGreaterThanEqual(Long pincode);
}
