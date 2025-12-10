package com.example.orderservice.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class CheckoutItemDto {

    private String mealName;
    private Integer quantity;
    private BigDecimal pricePerItem;
    private String customizations;

    public String getMealName() {
        return mealName;
    }

    public void setMealName(String mealName) {
        this.mealName = mealName;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getPricePerItem() {
        return pricePerItem;
    }

    public void setPricePerItem(BigDecimal pricePerItem) {
        this.pricePerItem = pricePerItem;
    }

    public String getCustomizations() {
        return customizations;
    }

    public void setCustomizations(String customizations) {
        this.customizations = customizations;
    }
}
