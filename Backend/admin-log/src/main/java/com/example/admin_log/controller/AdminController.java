package com.example.admin_log.controller;

import com.example.admin_log.dto.ForgotPasswordRequest;
import com.example.admin_log.dto.LoginRequest;
import com.example.admin_log.dto.LoginResponse;
import com.example.admin_log.dto.ResetPasswordRequest;
import com.example.admin_log.service.AdminService;
import com.example.admin_log.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;
    private final JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        boolean ok = adminService.login(request.getEmail(), request.getPassword());
        if (!ok) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new LoginResponse("Invalid email or password", null));
        }

        String token = jwtUtil.generateToken(request.getEmail());
        return ResponseEntity.ok(new LoginResponse("Login successful", token));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody ForgotPasswordRequest request) {
        String message = adminService.forgotPassword(request.getEmail());
        return ResponseEntity.ok(message);
    }


    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody ResetPasswordRequest request) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Not authenticated");
        }

        String email = auth.getName();

        adminService.resetPassword(
                email,
                request.getOldPassword(),
                request.getNewPassword(),
                request.getConfirmPassword()
        );

        return ResponseEntity.ok("Password reset successfully");
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout() {
        SecurityContextHolder.clearContext();
        return ResponseEntity.ok("Logged out successfully");
    }
}
