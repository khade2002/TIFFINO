package com.example.orderservice.dto;

import java.util.List;

public class CheckoutRequest {

    private String userId;
    private String address;
    private String orderType;
    private String notes;
    private String customerName;
    private String customerPhoneNumber;
    private String rejectionReason;

    private List<CheckoutItemDto> items;

    public CheckoutRequest() {}

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getOrderType() { return orderType; }
    public void setOrderType(String orderType) { this.orderType = orderType; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public List<CheckoutItemDto> getItems() { return items; }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getCustomerPhoneNumber() {
        return customerPhoneNumber;
    }

    public void setCustomerPhoneNumber(String customerPhoneNumber) {
        this.customerPhoneNumber = customerPhoneNumber;
    }

    public String getRejectionReason() {
        return rejectionReason;
    }

    public void setRejectionReason(String rejectionReason) {
        this.rejectionReason = rejectionReason;
    }

    public void setItems(List<CheckoutItemDto> items) { this.items = items;



    }
}
