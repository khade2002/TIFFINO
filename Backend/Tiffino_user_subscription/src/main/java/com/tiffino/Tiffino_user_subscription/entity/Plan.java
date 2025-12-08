package com.tiffino.Tiffino_user_subscription.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "plan")
public class Plan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String duration; // DAILY, WEEKLY, MONTHLY, QUARTERLY


    private String description;
    private Double price;
    private Double discountPercentage;


    public enum MealType { LUNCH, DINNER, BOTH }


    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getDuration() { return duration; }
    public void setDuration(String duration) { this.duration = duration; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public Double getDiscountPercentage() { return discountPercentage; }
    public void setDiscountPercentage(Double discountPercentage) { this.discountPercentage = discountPercentage; }
}