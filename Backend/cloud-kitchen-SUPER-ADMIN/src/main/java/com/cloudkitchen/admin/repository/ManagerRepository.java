package com.cloudkitchen.admin.repository;

import com.cloudkitchen.admin.model.Manager;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ManagerRepository extends JpaRepository<Manager, Long> {
    Optional<Object> findByName(String name);
    List<Manager> findByAssignedKitchen(String kitchenName);
    Manager findByKitchenId(Long id);
}
