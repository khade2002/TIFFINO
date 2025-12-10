package com.example.orderservice.controllers;

import com.example.orderservice.dto.CheckoutRequest;
import com.example.orderservice.dto.CheckoutResponse;
import com.example.orderservice.dto.OrderRequestDto;
import com.example.orderservice.dto.OrderResponseDto;
import com.example.orderservice.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
@CrossOrigin("*")
@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<OrderResponseDto> placeOrder(@RequestBody OrderRequestDto orderRequestDto) {
        OrderResponseDto response = orderService.placeOrder(orderRequestDto);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/checkout")
    public ResponseEntity<CheckoutResponse> checkout(@RequestBody CheckoutRequest request) {
        CheckoutResponse response = orderService.checkout(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/direct")
    public ResponseEntity<OrderResponseDto> createOrder(@RequestBody OrderRequestDto orderRequestDto) {
        OrderResponseDto response = orderService.placeOrder(orderRequestDto);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderResponseDto> getOrderById(@PathVariable Long id) {
        OrderResponseDto order = orderService.getOrderById(id);
        return ResponseEntity.ok(order);
    }

    // ✅ NEW: Get orders for specific user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<OrderResponseDto>> getOrdersByUser(@PathVariable String userId) {
        return ResponseEntity.ok(orderService.getOrdersByUser(userId));
    }

    @GetMapping("/{orderId}/delivery-partner")
    public ResponseEntity<Map<String, Object>> getDeliveryPartnerDetails(@PathVariable Long orderId) {
        return ResponseEntity.ok(orderService.getDeliveryPartnerDetails(orderId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<OrderResponseDto> updateOrder(
            @PathVariable Long id,
            @RequestBody OrderRequestDto requestDto) {
        return ResponseEntity.ok(orderService.updateOrder(id, requestDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteOrder(@PathVariable Long id) {
        orderService.deleteOrder(id);
        return ResponseEntity.ok("Order with id " + id + " deleted successfully.");
    }
}
