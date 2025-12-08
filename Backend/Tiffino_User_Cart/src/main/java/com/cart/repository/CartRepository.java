package com.cart.repository;

import com.cart.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<CartItem, Long> {
    CartItem findByFoodId(String foodId);
}
