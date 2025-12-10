package com.tiffino.tiffino_admin_meal.Entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;

import java.util.List;

@Getter
@Entity
@Table(name = "cuisine")
public class Cuisine {

    // Getters and Setters
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String cuisineName;

    private String region;

    private String state;

    // One cuisine can have many meals
    @OneToMany(mappedBy = "cuisine", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<Meal> meals;


    // Constructors
    public Cuisine() {}

    public Cuisine(String cuisineName, String region, String state) {
        this.cuisineName = cuisineName;
        this.region = region;
        this.state = state;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setCuisineName(String cuisineName) {
        this.cuisineName = cuisineName;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public void setState(String state) {
        this.state = state;
    }

    public void setMeals(List<Meal> meals) {
        this.meals = meals;
    }
}
