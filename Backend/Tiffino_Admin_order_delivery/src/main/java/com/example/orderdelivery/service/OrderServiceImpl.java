package com.example.orderdelivery.service;

import com.example.orderdelivery.dto.AssignRequest;
import com.example.orderdelivery.dto.OrderRequest;
import com.example.orderdelivery.entity.*;
import com.example.orderdelivery.enums.OrderStatus;
import com.example.orderdelivery.exception.ResourceNotFoundException;
import com.example.orderdelivery.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.util.List;

@Service
@Transactional
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final DeliveryPartnerRepository partnerRepository;
    private final DeliveryRepository deliveryRepository;

    public OrderServiceImpl(OrderRepository orderRepository,
                            OrderItemRepository itemRepository,
                            DeliveryPartnerRepository partnerRepository,
                            DeliveryRepository deliveryRepository) {
        this.orderRepository = orderRepository;
        this.partnerRepository = partnerRepository;
        this.deliveryRepository = deliveryRepository;
    }

    @Override
    public Order createOrder(OrderRequest request) {
        Order order = new Order();
        order.setCustomerName(request.getCustomerName());
        order.setCustomerPhone(request.getCustomerPhone());
        order.setAddress(request.getAddress());
        order.setStatus(OrderStatus.CONFIRMED);
        order.setCreatedAt(OffsetDateTime.now());

        if (request.getItems() != null) {
            for (var it : request.getItems()) {
                OrderItem item = new OrderItem();
                item.setItemName(it.getName());
                item.setQuantity(it.getQuantity());
                item.setPrice(it.getPrice());
                order.addItem(item);
            }
        }
        return orderRepository.save(order);
    }

    @Override
    public Order getOrder(Long id) {
        return orderRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Order not found"));
    }

    @Override
    public List<Order> listOrders() { return orderRepository.findAll(); }

    @Override
    public List<Order> listByStatus(String status) {
        OrderStatus os = OrderStatus.valueOf(status.toUpperCase());
        return orderRepository.findByStatus(os);
    }
    @Override
    public Order updateStatus(Long id, String status, String reason, String riderName, String riderPhone) {
        Order order = getOrder(id);
        order.setStatus(OrderStatus.valueOf(status.toUpperCase()));
        order.setRejectionReason(reason);

        if (order.getStatus() == OrderStatus.PICKED_UP) {
            Delivery delivery = deliveryRepository.findByOrderId(order.getId());
            if (delivery == null) {
                delivery = new Delivery();
                delivery.setOrder(order);
            }
            delivery.setRiderName(riderName);
            delivery.setRiderPhone(riderPhone);
            delivery.setPickupTime(OffsetDateTime.now());
            delivery.setLastUpdated(OffsetDateTime.now());

            deliveryRepository.save(delivery);
        }
        return orderRepository.save(order);
    }

    @Override
    public Order assignDeliveryPartner(Long orderId, AssignRequest assignRequest) {
        Order order = getOrder(orderId);

        DeliveryPartner partner = partnerRepository.findById(assignRequest.getPartnerId())
                .orElseThrow(() -> new ResourceNotFoundException("Partner not found"));

        partner.setAvailable(false);

        Delivery delivery = deliveryRepository.findByOrderId(orderId);
        if (delivery == null) {
            delivery = new Delivery();
            delivery.setOrder(order);
        }

        delivery.setPartner(partner);
        delivery.setRiderName(partner.getName());
        delivery.setRiderPhone(partner.getPhone());
        delivery.setPickupTime(OffsetDateTime.now());
        delivery.setLastUpdated(OffsetDateTime.now());

        deliveryRepository.save(delivery);
        partnerRepository.save(partner);

        order.setStatus(OrderStatus.PICKED_UP);
        return orderRepository.save(order);
    }

}
