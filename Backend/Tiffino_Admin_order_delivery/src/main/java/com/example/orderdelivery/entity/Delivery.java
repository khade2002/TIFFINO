package com.example.orderdelivery.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.OffsetDateTime;

@Entity
@Table(name = "delivery")
public class Delivery {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /* ============================
       ORDER (one-to-one)
       ============================ */
    @OneToOne
    @JoinColumn(name = "order_id", referencedColumnName = "id")
    private Order order;

    /* ============================
       DELIVERY PARTNER (many-to-one)
       Prevent infinite recursion
       ============================ */
    @ManyToOne
    @JoinColumn(name = "partner_id")
    @JsonIgnore   // 🛑 FIX: Prevent circular JSON LOOP
    private DeliveryPartner partner;

    /* ============================
       ADDITIONAL RIDER DETAILS
       ============================ */
    @Column(name = "partner_name")
    private String riderName;

    @Column(name = "partner_phone")
    private String riderPhone;

    private OffsetDateTime pickupTime;
    private OffsetDateTime lastUpdated;

    // ============================
    //        GETTERS / SETTERS
    // ============================

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Order getOrder() { return order; }
    public void setOrder(Order order) { this.order = order; }

    public DeliveryPartner getPartner() { return partner; }
    public void setPartner(DeliveryPartner partner) { this.partner = partner; }

    public String getRiderName() { return riderName; }
    public void setRiderName(String riderName) { this.riderName = riderName; }

    public String getRiderPhone() { return riderPhone; }
    public void setRiderPhone(String riderPhone) { this.riderPhone = riderPhone; }

    public OffsetDateTime getPickupTime() { return pickupTime; }
    public void setPickupTime(OffsetDateTime pickupTime) { this.pickupTime = pickupTime; }

    public OffsetDateTime getLastUpdated() { return lastUpdated; }
    public void setLastUpdated(OffsetDateTime lastUpdated) { this.lastUpdated = lastUpdated; }
}
