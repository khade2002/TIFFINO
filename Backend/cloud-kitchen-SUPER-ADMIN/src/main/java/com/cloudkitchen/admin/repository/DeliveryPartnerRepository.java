package com.cloudkitchen.admin.repository;

import com.cloudkitchen.admin.model.DeliveryPartner;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DeliveryPartnerRepository extends JpaRepository<DeliveryPartner, Long> {
    List<DeliveryPartner> findByAssignedArea(String city);

    List<DeliveryPartner> findByKitchenId(Long id);
}