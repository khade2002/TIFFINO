package com.tiffino.tiffino_admin_meal.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "meals")
public class Meal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String mealName;

    @Column(nullable = false)
    private String mealType;

    @Column(length = 1000)
    private String description;

    private String imageUrl;

    private String mealCategory;

    private String nutritionInfo;

    private Double mealPrice;

    //Correct way to store lists
    @ElementCollection
    @CollectionTable(
            name = "meal_ingredients",
            joinColumns = @JoinColumn(name = "meal_id", referencedColumnName = "id", foreignKey = @ForeignKey(name = "FK_MEAL_INGREDIENT"))
    )
    @Column(name = "ingredient")
    private List<String> ingredients;

    @ElementCollection
    @CollectionTable(
            name = "meal_allergens",
            joinColumns = @JoinColumn(name = "meal_id", referencedColumnName = "id", foreignKey = @ForeignKey(name = "FK_MEAL_ALLERGEN"))
    )
    @Column(name = "allergen")
    private List<String> allergens;

    // Many-to-One mapping with Cuisine
    @ManyToOne(fetch = FetchType.LAZY)

    @JoinColumn(name = "cuisine_id", nullable = false)
    @JsonBackReference
    private Cuisine cuisine;
}
