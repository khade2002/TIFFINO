package com.tiffino.Tiffino_user_subscription.service;

import com.tiffino.Tiffino_user_subscription.entity.Order;
import java.util.List;

public interface OrderService {
    Order createOrderFromSubscription(Long subscriptionId);
    List<Order> getAllOrders();
    Order getOrderById(Long id);
}

