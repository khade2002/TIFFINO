package com.example.orderdelivery.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name = "order_items")
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;

    @Column(name = "meal_name")
    private String itemName;


    private Integer quantity;
    @Column(name = "price_per_item")
    private Double price;

    @ManyToOne
    @JoinColumn(name = "order_id")
    @JsonBackReference
    private Order order;

    // --- Getters and Setters ---

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getItemName() { return itemName; }
    public void setItemName(String itemName) { this.itemName = itemName; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public Order getOrder() { return order; }
    public void setOrder(Order order) { this.order = order; }

}
