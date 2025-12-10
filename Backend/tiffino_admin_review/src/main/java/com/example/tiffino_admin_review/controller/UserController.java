package com.example.tiffino_admin_review.controller;

import com.example.tiffino_admin_review.DTO.User;
import com.example.tiffino_admin_review.Service.UserServiceImpl;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("*")
@RestController
@RequestMapping("/users")
public class UserController{
    private final UserServiceImpl userService;

    public UserController(UserServiceImpl userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }

}