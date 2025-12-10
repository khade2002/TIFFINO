package com.example.orderservice.service;

import com.example.orderservice.dto.*;
import com.example.orderservice.entity.Delivery;
import com.example.orderservice.entity.Order;
import com.example.orderservice.entity.OrderItem;
import com.example.orderservice.repository.DeliveryRepository;
import com.example.orderservice.repository.OrderItemRepository;
import com.example.orderservice.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final DeliveryRepository deliveryRepository;

    @Override
    public OrderResponseDto placeOrder(OrderRequestDto orderRequestDto) {

        Order order = new Order();
        order.setUserId(generateUserId());
        order.setOrderType(orderRequestDto.getOrderType());
        order.setAddress(orderRequestDto.getAddress());
        order.setSubscriptionId(orderRequestDto.getSubscriptionId());
        order.setOrderDate(LocalDateTime.now());
        order.setTotalAmount(orderRequestDto.getTotalAmount());
        order.setStatus(orderRequestDto.getStatus());
        order.setPaymentId(orderRequestDto.getPaymentId());
        order.setNotes(orderRequestDto.getNotes());
        order.setAppliedDiscount(orderRequestDto.getAppliedDiscount());

        order.setCustomerName(orderRequestDto.getCustomerName());
        order.setCustomerPhoneNumber(orderRequestDto.getCustomerPhoneNumber());
        order.setRejectionReason(orderRequestDto.getRejectionReason());

        List<OrderItem> orderItems = orderRequestDto.getItems().stream().map(itemDto -> {
            OrderItem item = new OrderItem();
            item.setMealName(itemDto.getMealName());
            item.setQuantity(itemDto.getQuantity());
            item.setPricePerItem(itemDto.getPricePerItem());
            item.setCustomizations(itemDto.getCustomizations());
            item.setOrder(order);
            return item;
        }).toList();

        order.setItems(orderItems);

        Order savedOrder = orderRepository.save(order);

        Delivery savedDelivery = null;
        if (orderRequestDto.getDelivery() != null) {
            Delivery delivery = new Delivery();
            delivery.setOrder(savedOrder);
            delivery.setDeliveryPartnerName(orderRequestDto.getDelivery().getDeliveryPartnerName());
            delivery.setDeliveryPartnerPhone(orderRequestDto.getDelivery().getDeliveryPartnerPhone());
            savedDelivery = deliveryRepository.save(delivery);
        }

        return mapOrderToDto(savedOrder, savedDelivery);
    }

    @Override
    public Order createOrder(Order orderRequest) {
        if (orderRequest.getItems() != null) {
            for (OrderItem item : orderRequest.getItems()) {
                item.setOrder(orderRequest);
            }
        }
        return orderRepository.save(orderRequest);
    }

    @Override
    public OrderResponseDto getOrderById(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + orderId));

        Delivery delivery = deliveryRepository.findByOrderId(orderId);
        return mapOrderToDto(order, delivery);
    }

    @Override
    @Transactional
    public OrderResponseDto updateOrder(Long id, OrderRequestDto orderRequestDto) {

        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));

        order.setOrderType(orderRequestDto.getOrderType());
        order.setAddress(orderRequestDto.getAddress());
        order.setSubscriptionId(orderRequestDto.getSubscriptionId());
        order.setTotalAmount(orderRequestDto.getTotalAmount());
        order.setStatus(orderRequestDto.getStatus());
        order.setPaymentId(orderRequestDto.getPaymentId());
        order.setNotes(orderRequestDto.getNotes());
        order.setAppliedDiscount(orderRequestDto.getAppliedDiscount());

        order.setCustomerName(orderRequestDto.getCustomerName());
        order.setCustomerPhoneNumber(orderRequestDto.getCustomerPhoneNumber());
        order.setRejectionReason(orderRequestDto.getRejectionReason());

        List<OrderItem> updatedItems = orderRequestDto.getItems().stream().map(dto -> {
            OrderItem item = new OrderItem();
            item.setMealName(dto.getMealName());
            item.setQuantity(dto.getQuantity());
            item.setPricePerItem(dto.getPricePerItem());
            item.setCustomizations(dto.getCustomizations());
            item.setOrder(order);
            return item;
        }).toList();

        order.getItems().clear();
        order.getItems().addAll(updatedItems);

        orderRepository.save(order);

        Delivery delivery = deliveryRepository.findByOrderId(id);
        if (orderRequestDto.getDelivery() != null) {
            if (delivery == null) {
                delivery = new Delivery();
                delivery.setOrder(order);
            }
            delivery.setDeliveryPartnerName(orderRequestDto.getDelivery().getDeliveryPartnerName());
            delivery.setDeliveryPartnerPhone(orderRequestDto.getDelivery().getDeliveryPartnerPhone());
            deliveryRepository.save(delivery);
        }

        return mapOrderToDto(order, delivery);
    }

    @Override
    @Transactional
    public void deleteOrder(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        orderRepository.delete(order);
    }

    private String generateUserId() {
        char first = (char) ('A' + new Random().nextInt(26));
        char second = (char) ('A' + new Random().nextInt(26));
        int number = new Random().nextInt(10000);
        return String.format("%c%c%04d", first, second, number);
    }

    private OrderResponseDto mapOrderToDto(Order order, Delivery delivery) {
        OrderResponseDto responseDto = new OrderResponseDto();
        responseDto.setOrderId(order.getId());
        responseDto.setUserId(order.getUserId());
        responseDto.setAddress(order.getAddress());
        responseDto.setOrderType(order.getOrderType());
        responseDto.setSubscriptionId(order.getSubscriptionId());
        responseDto.setOrderDate(order.getOrderDate());
        responseDto.setTotalAmount(order.getTotalAmount());
        responseDto.setStatus(order.getStatus());
        responseDto.setPaymentId(order.getPaymentId());
        responseDto.setNotes(order.getNotes());
        responseDto.setAppliedDiscount(order.getAppliedDiscount());

        responseDto.setCustomerName(order.getCustomerName());
        responseDto.setCustomerPhoneNumber(order.getCustomerPhoneNumber());
        responseDto.setRejectionReason(order.getRejectionReason());

        List<OrderItemDto> itemsDto = order.getItems().stream().map(item -> {
            OrderItemDto dto = new OrderItemDto();
            dto.setMealName(item.getMealName());
            dto.setQuantity(item.getQuantity());
            dto.setPricePerItem(item.getPricePerItem());
            dto.setCustomizations(item.getCustomizations());
            return dto;
        }).toList();
        responseDto.setItems(itemsDto);

        if (delivery != null) {
            DeliveryDto deliveryDto = new DeliveryDto();
            deliveryDto.setDeliveryId(delivery.getId());
            deliveryDto.setDeliveryPartnerName(delivery.getDeliveryPartnerName());
            deliveryDto.setDeliveryPartnerPhone(delivery.getDeliveryPartnerPhone());
            responseDto.setDelivery(deliveryDto);
        }

        return responseDto;
    }

    @Override
    @Transactional
    public CheckoutResponse checkout(CheckoutRequest request) {

        if (request.getItems() == null || request.getItems().isEmpty()) {
            throw new IllegalArgumentException("Cart is empty. Cannot checkout.");
        }

        Order order = new Order();
        order.setUserId(request.getUserId());
        order.setAddress(request.getAddress());
        order.setOrderType(
                request.getOrderType() != null ? request.getOrderType() : "ONE_TIME"
        );
        order.setSubscriptionId(null);
        order.setOrderDate(LocalDateTime.now());
        order.setStatus("PLACED");
        order.setPaymentId(null);
        order.setNotes(request.getNotes());
        order.setCustomerName(request.getCustomerName());
        order.setCustomerPhoneNumber(request.getCustomerPhoneNumber());
        order.setRejectionReason(request.getRejectionReason());
        order.setAppliedDiscount(BigDecimal.ZERO);

        BigDecimal total = BigDecimal.ZERO;

        List<OrderItem> items = new ArrayList<>();

        for (CheckoutItemDto dto : request.getItems()) {
            OrderItem item = new OrderItem();
            item.setMealName(dto.getMealName());
            item.setQuantity(dto.getQuantity());
            item.setPricePerItem(dto.getPricePerItem());
            item.setCustomizations(dto.getCustomizations());

            BigDecimal lineTotal =
                    dto.getPricePerItem().multiply(BigDecimal.valueOf(dto.getQuantity()));

            total = total.add(lineTotal);

            item.setOrder(order);
            items.add(item);
        }

        order.setItems(items);
        order.setTotalAmount(total);

        Order saved = orderRepository.save(order);

        saved.setStatus("CONFIRMED");
        saved = orderRepository.save(saved);

        return new CheckoutResponse(
                saved.getId(),
                saved.getStatus(),
                saved.getTotalAmount(),
                "Order placed and confirmed successfully.",
                saved
        );
    }

    @Override
    public Map<String, Object> getDeliveryPartnerDetails(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + orderId));

        Delivery delivery = deliveryRepository.findByOrderId(orderId);

        Map<String, Object> response = new HashMap<>();
        response.put("orderId", order.getId());

        if (delivery != null) {
            response.put("deliveryPartnerName", delivery.getDeliveryPartnerName());
            response.put("deliveryPartnerPhone", delivery.getDeliveryPartnerPhone());
        } else {
            response.put("deliveryPartnerName", "Not Assigned");
            response.put("deliveryPartnerPhone", "N/A");
        }
        return response;
    }

    // ✅ NEW: Get orders by userId
    @Override
    public List<OrderResponseDto> getOrdersByUser(String userId) {
        List<Order> orders = orderRepository.findByUserIdOrderByOrderDateDesc(userId);

        return orders.stream().map(order -> {
            Delivery delivery = deliveryRepository.findByOrderId(order.getId());
            return mapOrderToDto(order, delivery);
        }).toList();
    }
}
