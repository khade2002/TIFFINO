package com.example.orderdelivery.service;

import com.example.orderdelivery.dto.AssignRequest;
import com.example.orderdelivery.dto.OrderRequest;
import com.example.orderdelivery.entity.Order;

import java.util.List;

public interface OrderService {
    Order createOrder(OrderRequest request);
    Order getOrder(Long id);
    List<Order> listOrders();
    List<Order> listByStatus(String status);
    Order updateStatus(Long id, String status, String reason, String riderName, String riderPhone);
    Order assignDeliveryPartner(Long orderId, AssignRequest assignRequest);
}
