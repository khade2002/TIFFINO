package com.tiffino.Tiffino_user_subscription.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userId;
    private Long subscriptionId;

    private LocalDate orderDate;

    @Enumerated(EnumType.STRING)
    private Plan.MealType mealType;

    private String status;
    private Double totalPrice;
    private Double discountPercentage;
    private Double deliveryCharge;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public Long getSubscriptionId() { return subscriptionId; }
    public void setSubscriptionId(Long subscriptionId) { this.subscriptionId = subscriptionId; }

    public LocalDate getOrderDate() { return orderDate; }
    public void setOrderDate(LocalDate orderDate) { this.orderDate = orderDate; }

    public Plan.MealType getMealType() { return mealType; }
    public void setMealType(Plan.MealType mealType) { this.mealType = mealType; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Double getTotalPrice() { return totalPrice; }
    public void setTotalPrice(Double totalPrice) { this.totalPrice = totalPrice; }

    public Double getDiscountPercentage() { return discountPercentage; }
    public void setDiscountPercentage(Double discountPercentage) { this.discountPercentage = discountPercentage; }

    public Double getDeliveryCharge() { return deliveryCharge; }
    public void setDeliveryCharge(Double deliveryCharge) { this.deliveryCharge = deliveryCharge; }
}
