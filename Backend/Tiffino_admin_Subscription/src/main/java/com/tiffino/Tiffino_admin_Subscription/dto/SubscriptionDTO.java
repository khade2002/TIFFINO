package com.tiffino.Tiffino_admin_Subscription.dto;

import java.time.LocalDate;
import java.util.List;

public class SubscriptionDTO {
    public Long subscriptionid;

    private Long planId;
    private LocalDate startDate;
    private LocalDate endDate;
    private String status;

    private String frequency;
    private List<String> allergies;

    // Getters & Setters
    public Long getSubscriptionid() { return subscriptionid; }
    public void setSubscriptionid(Long subscriptionid) { this.subscriptionid = subscriptionid; }



    public Long getPlanId() { return planId; }
    public void setPlanId(Long planId) { this.planId = planId; }

    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }

    public LocalDate getEndDate() { return endDate; }
    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }



    public String getFrequency() { return frequency; }
    public void setFrequency(String frequency) { this.frequency = frequency; }

    public List<String> getAllergies() { return allergies; }
    public void setAllergies(List<String> allergies) { this.allergies = allergies; }
}