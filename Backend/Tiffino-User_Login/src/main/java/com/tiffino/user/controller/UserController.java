package com.tiffino.user.controller;

import com.tiffino.user.dto.ForgotPasswordRequest;
import com.tiffino.user.dto.ResetPasswordRequest;
import com.tiffino.user.dto.UserDTO;
import com.tiffino.user.entity.User;
import com.tiffino.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
@CrossOrigin("*")
@RestController
//@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/log/user")
public class UserController {

    @Autowired
    private UserService userService;
    @PostMapping("/forgotPassword")
    public ResponseEntity<String> forgotPassword(@RequestBody ForgotPasswordRequest request) {
        userService.forgotPassword(request);
        return ResponseEntity.ok("OTP sent successfully to your registered email");
    }

    @PostMapping("/resetPassword")
    public ResponseEntity<String> resetPassword(@RequestBody ResetPasswordRequest request) {
        boolean success = userService.resetPassword(request);
        return success
                ? ResponseEntity.ok("Password reset successful")
                : ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to reset password");
    }


    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/email")
    public ResponseEntity<User> getUserByEmail(@RequestParam String email) {
        User user = userService.getUserByEmail(email);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/phone")
    public ResponseEntity<User> getUserByPhone(@RequestParam String phone) {
        User user = userService.getUserByPhone(phone);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/name")
    public ResponseEntity<List<User>> getUsersByName(@RequestParam String name) {
        List<User> users = userService.getUsersByName(name);
        return ResponseEntity.ok(users);
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Long>> getUserStats() {
        return ResponseEntity.ok(userService.getUserStatistics());
    }


    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody UserDTO userDto) {
        User updatedUser = userService.updateUser(id, userDto);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        userService.deleteUserById(id);
        return ResponseEntity.ok("User deleted successfully.");
    }
}
