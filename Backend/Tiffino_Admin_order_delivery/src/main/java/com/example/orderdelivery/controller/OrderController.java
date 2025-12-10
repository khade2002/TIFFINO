package com.example.orderdelivery.controller;

import com.example.orderdelivery.dto.OrderRequest;
import com.example.orderdelivery.entity.Order;
import com.example.orderdelivery.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
@CrossOrigin("*")
@RestController
@RequestMapping("/ordr/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<Order> create(@RequestBody OrderRequest request) {
        return ResponseEntity.ok(orderService.createOrder(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> get(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.getOrder(id));
    }

    @GetMapping
    public ResponseEntity<List<Order>> list(@RequestParam(required = false) String status) {
        if (status == null)
            return ResponseEntity.ok(orderService.listOrders());
        return ResponseEntity.ok(orderService.listByStatus(status));
    }


    @PutMapping("/{id}/status")
    public ResponseEntity<Order> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> request) {
        String status = request.get("status");
        String reason = request.getOrDefault("reason", "N/A");
        String riderName = request.getOrDefault("riderName", "Unknown");
        String riderPhone = request.getOrDefault("riderPhone", "Unknown");

        return ResponseEntity.ok(orderService.updateStatus(id, status, reason, riderName, riderPhone));
    }
}
