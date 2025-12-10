package com.tiffino.Tiffino_user_subscription.controller;
import com.tiffino.Tiffino_user_subscription.entity.Order;
import com.tiffino.Tiffino_user_subscription.service.OrderService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("*")
@RestController
@RequestMapping("/subscri/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    //  Create Order from Subscription
    @PostMapping("/from-subscription/{subscriptionId}")
    public Order fromSubscription(@PathVariable Long subscriptionId) {
        return orderService.createOrderFromSubscription(subscriptionId);
    }

    //  Get All Orders
    @GetMapping
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }

    //Get Order by ID
    @GetMapping("/{id}")
    public Order getOrderById(@PathVariable Long id) {
        return orderService.getOrderById(id);
    }
}