package com.cloudkitchen.admin.model;

import jakarta.persistence.*;

@Entity
public class DeliveryPartner {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @Column(unique = true)
    private String email;
    private String driverLicense;
    private String phone;
    private String adharCard;
    private Long kitchenId;
    private String panCard;
    private String vehicleDetails;
    private String assignedArea;
    public Long getId(){return id;}
    public String getName(){return name;}
    public void setName(String v){this.name=v;}
    public String getEmail(){return email;}
    public void setEmail(String v){this.email=v;}
    public String getDriverLicense(){return driverLicense;}
    public void setDriverLicense(String v){this.driverLicense=v;}
    public String getPhone(){return phone;}
    public void setPhone(String v){this.phone=v;}
    public Long getKitchenId(){return kitchenId;}
    public void setKitchenId(Long v){this.kitchenId=v;}
    public String getAdharCard(){return adharCard;}
    public void setAdharCard(String v){this.adharCard=v;}
    public String getPanCard(){return adharCard;}
    public void setPanCard(String v){this.panCard=v;}
    public String getVehicleDetails(){return vehicleDetails;}
    public void setVehicleDetails(String v){this.vehicleDetails=v;}
    public String getAssignedArea(){return assignedArea;}
    public void setAssignedArea(String v){this.assignedArea=v;}
}
