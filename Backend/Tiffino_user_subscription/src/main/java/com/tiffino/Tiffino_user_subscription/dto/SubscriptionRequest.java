package com.tiffino.Tiffino_user_subscription.dto;
import java.util.List;

public class SubscriptionRequest {
    private Long userId;
    private Long planId;
    private String mealType;
    private String planType;
    private String frequency;
    private String foodType;
    private List<String> allergies;

    // Getters & Setters
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public Long getPlanId() { return planId; }
    public void setPlanId(Long planId) { this.planId = planId; }
    public String getMealType() { return mealType; }
    public void setMealType(String mealType) { this.mealType = mealType; }
    public String getPlanType() { return planType; }
    public void setPlanType(String planType) { this.planType = planType; }
    public String getFrequency() { return frequency; }
    public void setFrequency(String frequency) { this.frequency = frequency; }
    public String getFoodType() { return foodType; }
    public void setFoodType(String foodType) { this.foodType = foodType; }
    public List<String> getAllergies() { return allergies; }
    public void setAllergies(List<String> allergies) { this.allergies = allergies; }
}
