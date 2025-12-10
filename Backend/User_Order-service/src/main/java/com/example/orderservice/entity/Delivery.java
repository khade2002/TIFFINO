package com.example.orderservice.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "delivery")   // matches your DB
public class Delivery {

    @Id
    @Column(name = "order_id")   // 💥 PK column is also FK to orders.id
    private Long id;

    @OneToOne
    @MapsId                      // 🔥 share primary key with Order
    @JoinColumn(name = "order_id")
    private Order order;

    private String deliveryPartnerName;
    private String deliveryPartnerPhone;
    private String status;
    private String currentLocation;
    private LocalDateTime lastUpdated;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public String getDeliveryPartnerName() {
        return deliveryPartnerName;
    }

    public void setDeliveryPartnerName(String deliveryPartnerName) {
        this.deliveryPartnerName = deliveryPartnerName;
    }

    public String getDeliveryPartnerPhone() {
        return deliveryPartnerPhone;
    }

    public void setDeliveryPartnerPhone(String deliveryPartnerPhone) {
        this.deliveryPartnerPhone = deliveryPartnerPhone;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getCurrentLocation() {
        return currentLocation;
    }

    public void setCurrentLocation(String currentLocation) {
        this.currentLocation = currentLocation;
    }

    public LocalDateTime getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(LocalDateTime lastUpdated) {
        this.lastUpdated = lastUpdated;
    }
}
