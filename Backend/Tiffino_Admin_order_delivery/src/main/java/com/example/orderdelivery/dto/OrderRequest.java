package com.example.orderdelivery.dto;

import java.util.List;

public class OrderRequest {
    private String customerName;
    private String customerPhone;
    private String address;
    private List<Item> items;

    public static class Item {
        public String name;
        public Integer quantity;
        public Double price;
        public String getName(){return name;}
        public Integer getQuantity(){return quantity;}
        public Double getPrice(){return price;}
    }

    // getters & setters
    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }
    public String getCustomerPhone() { return customerPhone; }
    public void setCustomerPhone(String customerPhone) { this.customerPhone = customerPhone; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public List<Item> getItems() { return items; }
    public void setItems(List<Item> items) { this.items = items; }
}
