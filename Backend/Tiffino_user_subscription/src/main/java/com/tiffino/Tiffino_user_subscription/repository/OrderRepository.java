package com.tiffino.Tiffino_user_subscription.repository;

import com.tiffino.Tiffino_user_subscription.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {}
