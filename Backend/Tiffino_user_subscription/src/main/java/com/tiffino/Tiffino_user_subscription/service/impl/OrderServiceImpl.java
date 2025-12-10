package com.tiffino.Tiffino_user_subscription.service.impl;

import com.tiffino.Tiffino_user_subscription.entity.Order;
import com.tiffino.Tiffino_user_subscription.entity.Plan;
import com.tiffino.Tiffino_user_subscription.entity.Subscription;
import com.tiffino.Tiffino_user_subscription.repository.OrderRepository;
import com.tiffino.Tiffino_user_subscription.repository.PlanRepository;
import com.tiffino.Tiffino_user_subscription.repository.SubscriptionRepository;
import com.tiffino.Tiffino_user_subscription.service.OrderService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final SubscriptionRepository subscriptionRepository;
    private final PlanRepository planRepository;

    public OrderServiceImpl(OrderRepository orderRepository,
                            SubscriptionRepository subscriptionRepository,
                            PlanRepository planRepository) {
        this.orderRepository = orderRepository;
        this.subscriptionRepository = subscriptionRepository;
        this.planRepository = planRepository;
    }

    //  Create Order from Subscription
    @Override
    public Order createOrderFromSubscription(Long subscriptionId) {
        Subscription subscription = subscriptionRepository.findById(subscriptionId)
                .orElseThrow(() -> new RuntimeException("Subscription not found"));

        if (subscription.getStatus() != Subscription.Status.ACTIVE) {
            throw new RuntimeException("Subscription is not active. Discount & free delivery not applicable.");
        }

        Plan plan = planRepository.findById(subscription.getPlanId())
                .orElseThrow(() -> new RuntimeException("Plan not found"));

        Order order = new Order();

        order.setSubscriptionId(subscription.getSubscriptionid());
        order.setOrderDate(LocalDate.now());

        //order.setMealType(plan.getMealType());
        order.setStatus("PLACED");
        order.setDeliveryCharge(0.0);

        double discount = plan.getDiscountPercentage() != null ? plan.getDiscountPercentage() : 0.0;
        order.setDiscountPercentage(discount);
        order.setTotalPrice(plan.getPrice() * (1 - discount / 100));

        return orderRepository.save(order);
    }

    //  Get All Orders
    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    //  Get Order by ID
    @Override
    public Order getOrderById(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }
}