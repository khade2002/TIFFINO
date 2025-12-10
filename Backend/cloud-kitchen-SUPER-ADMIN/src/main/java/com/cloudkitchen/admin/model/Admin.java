package com.cloudkitchen.admin.model;

import jakarta.persistence.*;

@Entity
@Table(name = "admins")
public class Admin {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true, nullable = false)
    private String username;
    @Column(nullable = false)
    private String passwordHash;
    public Long getId(){return id;}
    public String getUsername(){return username;} public void setUsername(String v){this.username=v;}
    public String getPasswordHash(){return passwordHash;} public void setPasswordHash(String v){this.passwordHash=v;}
}
