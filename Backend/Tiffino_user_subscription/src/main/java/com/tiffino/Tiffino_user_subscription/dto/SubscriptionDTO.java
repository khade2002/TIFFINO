package com.tiffino.Tiffino_user_subscription.dto;

import com.tiffino.Tiffino_user_subscription.entity.Subscription;
import java.time.LocalDate;
import java.util.List;

public class SubscriptionDTO {

    private Long subscriptionid;

    private Long planId;
    private String planType;
    private String frequency;
    private LocalDate startDate;
    private LocalDate endDate;
    private List<Subscription.Allergy> allergies;
    private Subscription.Status status;

    private Double discountPercentage; // discount based on planType
    private boolean freeDelivery;      // free delivery flag

    public SubscriptionDTO() {}

    // Constructor with discount and freeDelivery
    public SubscriptionDTO(Long subscriptionid, Long planId, String planType, String frequency,
                           LocalDate startDate, LocalDate endDate, List<Subscription.Allergy> allergies,
                           Subscription.Status status, Double discountPercentage, boolean freeDelivery) {
        this.subscriptionid = subscriptionid;

        this.planId = planId;
        this.planType = planType;
        this.frequency = frequency;
        this.startDate = startDate;
        this.endDate = endDate;
        this.allergies = allergies;
        this.status = status;
        this.discountPercentage = discountPercentage;
        this.freeDelivery = freeDelivery;
    }

    //  Getters & Setters
    public Long getSubscriptionid() { return subscriptionid; }
    public void setSubscriptionid(Long id) { this.subscriptionid = id; }




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

    public List<Subscription.Allergy> getAllergies() { return allergies; }
    public void setAllergies(List<Subscription.Allergy> allergies) { this.allergies = allergies; }

    public Subscription.Status getStatus() { return status; }
    public void setStatus(Subscription.Status status) { this.status = status; }

    public Double getDiscountPercentage() { return discountPercentage; }
    public void setDiscountPercentage(Double discountPercentage) { this.discountPercentage = discountPercentage; }

    public boolean isFreeDelivery() { return freeDelivery; }
    public void setFreeDelivery(boolean freeDelivery) { this.freeDelivery = freeDelivery; }
}
