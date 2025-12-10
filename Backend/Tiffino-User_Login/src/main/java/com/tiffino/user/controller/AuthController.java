package com.tiffino.user.controller;

import com.tiffino.user.dto.OTPVerificationRequest;
import com.tiffino.user.dto.UserDTO;
import com.tiffino.user.dto.UserOTPRequest;
import com.tiffino.user.service.TokenBlacklistService;
import com.tiffino.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@CrossOrigin("*")
@RestController
//@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/log/auth")
public class AuthController {

    private final UserService userService;

    @Autowired
    private TokenBlacklistService tokenBlacklistService;


    @Autowired
    public AuthController(UserService userService) {
        this.userService = userService;
    }

    //  Send OTP to email
    @Operation(summary = "Send OTP to email")
    @PostMapping("/send-otp")
    public ResponseEntity<String> sendOtp(@RequestBody UserOTPRequest request) {
        String result = userService.sendOtp(request);
        return ResponseEntity.ok(result);
    }

    // Verify OTP only (without registration)
    @Operation(summary = "Verify OTP")
    @PostMapping("/verify-otp")
    public ResponseEntity<String> verifyOtp(@RequestBody OTPVerificationRequest request) {
        String result = userService.verifyOtp(request);
        return ResponseEntity.ok(result);
    }

    // Register after OTP verification
    @Operation(summary = "Register a new user")
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody UserDTO userDto) {
        String result = userService.registerUser(userDto);
        return ResponseEntity.ok(result);
    }

    //  Login user
    @Operation(summary = "Login user")
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserDTO userDto) {
        return ResponseEntity.ok(userService.loginUser(userDto));
    }



    @PostMapping("/logout")
    public ResponseEntity<String> logout(@RequestHeader("Authorization") String authHeader) {
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            tokenBlacklistService.blacklistToken(token);
            return ResponseEntity.ok("Logged out successfully. Token is now invalid.");
        }
        return ResponseEntity.badRequest().body("No token found in request header.");
    }


}



































































































