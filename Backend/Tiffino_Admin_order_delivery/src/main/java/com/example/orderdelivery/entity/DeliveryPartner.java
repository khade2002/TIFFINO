package com.example.orderdelivery.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "delivery_partner")
public class DeliveryPartner {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String phone;
    private boolean available = true;

    private String adharCard;
    private String assignedArea;
    private String driverLicence;
    private String email;
    private String panCard;

    @Column(length = 500)
    private String vehicleDetails;

    @OneToMany(mappedBy = "partner")
    @JsonIgnore                 // 🚀🚀 MAIN FIX
    private List<Delivery> deliveries = new ArrayList<>();

    // getters & setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public boolean isAvailable() { return available; }
    public void setAvailable(boolean available) { this.available = available; }

    public String getAdharCard() { return adharCard; }
    public void setAdharCard(String adharCard) { this.adharCard = adharCard; }

    public String getAssignedArea() { return assignedArea; }
    public void setAssignedArea(String assignedArea) { this.assignedArea = assignedArea; }

    public String getDriverLicence() { return driverLicence; }
    public void setDriverLicence(String driverLicence) { this.driverLicence = driverLicence; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPanCard() { return panCard; }
    public void setPanCard(String panCard) { this.panCard = panCard; }

    public String getVehicleDetails() { return vehicleDetails; }
    public void setVehicleDetails(String vehicleDetails) { this.vehicleDetails = vehicleDetails; }

    public List<Delivery> getDeliveries() { return deliveries; }
    public void setDeliveries(List<Delivery> deliveries) { this.deliveries = deliveries; }
}
