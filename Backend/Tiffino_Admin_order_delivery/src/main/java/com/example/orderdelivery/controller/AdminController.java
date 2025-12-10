package com.example.orderdelivery.controller;

import com.example.orderdelivery.dto.ApiResponse;
import com.example.orderdelivery.dto.AssignRequest;
import com.example.orderdelivery.entity.Order;
import com.example.orderdelivery.enums.OrderStatus;
import com.example.orderdelivery.service.OrderService;
import com.example.orderdelivery.repository.OrderRepository;
import com.example.orderdelivery.repository.DeliveryPartnerRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
@CrossOrigin("*")
@RestController
@RequestMapping("/ordr/admin/orders")
public class AdminController {

    private final OrderService orderService;
    private final OrderRepository orderRepository;
    private final DeliveryPartnerRepository partnerRepository;

    public AdminController(OrderService orderService,
                           OrderRepository orderRepository,
                           DeliveryPartnerRepository partnerRepository) {
        this.orderService = orderService;
        this.orderRepository = orderRepository;
        this.partnerRepository = partnerRepository;
    }
    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders(
            @RequestParam(required = false) String date,
            @RequestParam(required = false) String status) {
        List<Order> orders = orderService.listOrders();

        if (date != null && !date.isEmpty()) {
            LocalDate requestedDate = LocalDate.parse(date);
            orders = orders.stream()
                    .filter(o -> o.getCreatedAt() != null &&
                            o.getCreatedAt().toLocalDate().equals(requestedDate))
                    .collect(Collectors.toList());
        }

        if (status != null && !status.isEmpty()) {
            try {
                OrderStatus filterStatus = OrderStatus.valueOf(status.toUpperCase());
                orders = orders.stream()
                        .filter(o -> o.getStatus() == filterStatus)
                        .collect(Collectors.toList());
            } catch (IllegalArgumentException e) {
                // If invalid status is passed, return empty list
                orders = List.of();
            }
        }
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.getOrder(id));
    }

    @GetMapping("/{id}/timeline")
    public ResponseEntity<List<String>> getOrderTimeline(@PathVariable Long id) {
        Order order = orderService.getOrder(id);
        List<String> timeline = List.of("PLACED", "CONFIRMED", "PREPARING", "PICKED_UP", "DELIVERED", "REJECTED");
        int idx = order.getStatus() != null ? timeline.indexOf(order.getStatus().name()) + 1 : 0;
        return ResponseEntity.ok(timeline.subList(0, Math.max(idx, 1)));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Order> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> request) {
        String status = request.get("status");
        String reason = request.get("reason");
        String riderName = request.get("riderName");
        String riderPhone = request.get("riderPhone");

        return ResponseEntity.ok(orderService.updateStatus(id, status, reason, riderName, riderPhone));
    }

    @GetMapping("/{id}/rejection")
    public ResponseEntity<ApiResponse<Object>> getRejectionDetails(@PathVariable Long id) {
        Order order = orderService.getOrder(id);

        if (order.getStatus() == null || !order.getStatus().name().equalsIgnoreCase("REJECTED")) {
            return ResponseEntity.ok(new ApiResponse<>(false, "Order is not rejected", null));
        }

        var rejectionInfo = new Object() {
            public final String username = order.getCustomerName();
            public final double amount = order.getTotalAmount();
            public final String rejectionStatus = "Order Rejected";
            public final String reason = order.getRejectionReason();
            public final List<Object> orderItems = order.getItems().stream()
                    .map(item -> (Object) new Object() {
                        public final String name = item.getItemName();
                        public final int quantity = item.getQuantity();
                    })
                    .toList();
        };
        return ResponseEntity.ok(new ApiResponse<>(true, "Rejection details fetched successfully", rejectionInfo));
    }

    @GetMapping("/count")
    public ResponseEntity<Long> getTotalOrdersCount() {
        return ResponseEntity.ok(orderRepository.count());
    }

    @PostMapping("/{orderId}/assign")
    public ResponseEntity<Order> assignPartner(@PathVariable Long orderId, @RequestBody AssignRequest request) {
        return ResponseEntity.ok(orderService.assignDeliveryPartner(orderId, request));
    }
}
