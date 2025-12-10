package com.cloudkitchen.admin.model;

import jakarta.persistence.*;

@Entity
@Table(name = "managers")
public class Manager {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    private String adharCard;

    private String panCard;

    private String phone;

    private Long kitchenId;

    private String address;

    private String username;

    private String assignedKitchen;

    //  New field for temporary / login password
    private String password;

    // ----- Getters & Setters -----

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String v) {
        this.name = v;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String v) {
        this.email = v;
    }

    public String getAdharCard() {
        return adharCard;
    }

    public void setAdharCard(String v) {
        this.adharCard = v;
    }

    public String getPanCard() {
        return panCard;
    }

    public void setPanCard(String v) {
        this.panCard = v;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String v) {
        this.phone = v;
    }

    public Long getKitchenId() {
        return kitchenId;
    }

    public void setKitchenId(Long v) {
        this.kitchenId = v;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String v) {
        this.address = v;
    }

    public String getAssignedKitchen() {
        return assignedKitchen;
    }

    public void setAssignedKitchen(String v) {
        this.assignedKitchen = v;
    }

    // for password
    public String getPassword() {
        return password;
    }

    public void setPassword(String v) {
        this.password = v;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String v) {
        this.username = v;
    }
}
