package com.cloudkitchen.admin.controller;

import com.cloudkitchen.admin.dto.LoginRequest;
import com.cloudkitchen.admin.dto.TokenResponse;
import com.cloudkitchen.admin.model.Admin;
import com.cloudkitchen.admin.repository.AdminRepository;
import com.cloudkitchen.admin.service.TokenBlacklistService; // <--- import service
import com.cloudkitchen.admin.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
@CrossOrigin("*")
@RestController
@RequestMapping("/api/admin")
public class AuthController {

    private final AdminRepository repo;
    private final PasswordEncoder encoder;
    private final JwtUtil jwtUtil;
    private final TokenBlacklistService tokenBlacklistService;

    // Constructor injection
    public AuthController(AdminRepository repo,
                          PasswordEncoder encoder,
                          JwtUtil jwtUtil,
                          TokenBlacklistService tokenBlacklistService) {
        this.repo = repo;
        this.encoder = encoder;
        this.jwtUtil = jwtUtil;
        this.tokenBlacklistService = tokenBlacklistService; // <--- assign it
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest req) {
        var aOpt = repo.findByUsername(req.getUsername());
        if (aOpt.isEmpty()) return ResponseEntity.status(401).body(Map.of("error","Invalid credentials"));
        Admin a = aOpt.get();
        if (!encoder.matches(req.getPassword(), a.getPasswordHash()))
            return ResponseEntity.status(401).body(Map.of("error","Invalid credentials"));
        return ResponseEntity.ok(new TokenResponse(jwtUtil.generateToken(a.getUsername())));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader("Authorization") String token) {
        String jwt = token.substring(7);
        tokenBlacklistService.addToBlacklist(jwt);
        return ResponseEntity.ok("Logged out successfully");
    }
}
