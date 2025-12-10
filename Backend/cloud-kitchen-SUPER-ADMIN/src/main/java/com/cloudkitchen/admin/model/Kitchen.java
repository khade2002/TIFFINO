package com.cloudkitchen.admin.model;

import jakarta.persistence.*;

@Entity
public class Kitchen {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String address;
    private String state;
    private String city;
    private Long pincode;
    private Double rating;
    private Long revenue;
    private Boolean profitable;




    public Long getId(){return id;}
    public String getName(){return name;} public void setName(String v){this.name=v;}
    public String getAddress(){return address;} public void setAddress(String v){this.address=v;}
    public String getState(){return state;} public void setState(String v){this.state=v;}
    public String getCity(){return city;} public void setCity(String v){this.city=v;}
    public Long getPincode(){return pincode;} public void setPincode(Long v){this.pincode=v;}
    public Double getRating(){return rating;} public void setRating(Double v){this.rating=v;}
    public Long getRevenue(){return revenue;} public void setRevenue(Long v){this.revenue=v;}
    public Boolean getProfitable(){return profitable;} public void setProfitable(Boolean v){this.profitable=v;}
}
