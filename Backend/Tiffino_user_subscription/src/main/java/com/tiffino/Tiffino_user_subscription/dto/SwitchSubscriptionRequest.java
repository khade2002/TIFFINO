package com.tiffino.Tiffino_user_subscription.dto;

public class SwitchSubscriptionRequest {
    private String newPlanType;
    private int durationInDays;
    private String frequency;

    // getters & setters
    public String getNewPlanType() { return newPlanType; }
    public void setNewPlanType(String newPlanType) { this.newPlanType = newPlanType; }

    public int getDurationInDays() { return durationInDays; }
    public void setDurationInDays(int durationInDays) { this.durationInDays = durationInDays; }

    public String getFrequency() { return frequency; }
    public void setFrequency(String frequency) { this.frequency = frequency; }
}

