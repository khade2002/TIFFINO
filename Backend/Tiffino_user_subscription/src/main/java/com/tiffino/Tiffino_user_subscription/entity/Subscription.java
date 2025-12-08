package com.tiffino.Tiffino_user_subscription.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "subscription")
public class Subscription {


    private Double discountPercentage;

    public Double getDiscountPercentage() { return discountPercentage; }
    public void setDiscountPercentage(Double discountPercentage) { this.discountPercentage = discountPercentage; }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long subscriptionid;


    private Long planId;
    private String planType;
    private String frequency;


    private LocalDate startDate;
    private LocalDate endDate;
    private int durationInDays;

    @ElementCollection
    @CollectionTable(name = "subscription_allergies", joinColumns = @JoinColumn(name = "subscription_id"))
    @Enumerated(EnumType.STRING)
    private List<Allergy> allergies;

    @Enumerated(EnumType.STRING)
    private Status status;


    private boolean freeDelivery;





    public enum Allergy { PEANUTS, DAIRY, GLUTEN, SOY, WHEAT, EGGS }
    public enum Status { ACTIVE, CANCELLED,EXPIRED }


    public Long getSubscriptionid() { return subscriptionid; }
    public void setSubscriptionid(Long subscriptionid) { this.subscriptionid = subscriptionid; }



    public Long getPlanId() { return planId; }
    public void setPlanId(Long planId) { this.planId = planId; }

    public String getPlanType() { return planType; }
    public void setPlanType(String planType) { this.planType = planType; }

    public String getFrequency() { return frequency; }
    public void setFrequency(String frequency) { this.frequency = frequency; }



    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }

    public LocalDate getEndDate() { return endDate; }
    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }

    public int getDurationInDays() { return durationInDays; }
    public void setDurationInDays(int durationInDays) { this.durationInDays = durationInDays; }

    public List<Allergy> getAllergies() { return allergies; }
    public void setAllergies(List<Allergy> allergies) { this.allergies = allergies; }

    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }

    //  FreeDelivery Getter/Setter
    public boolean isFreeDelivery() { return freeDelivery; }
    public void setFreeDelivery(boolean freeDelivery) { this.freeDelivery = freeDelivery; }
}

