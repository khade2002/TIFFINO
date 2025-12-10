package com.example.orderservice.repository;

import com.example.orderservice.entity.Delivery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeliveryRepository extends JpaRepository<Delivery, Long> {
    // This method fetches Delivery by Order ID
    Delivery findByOrderId(Long orderId);

    void deleteByOrderId(Long orderId);

}
