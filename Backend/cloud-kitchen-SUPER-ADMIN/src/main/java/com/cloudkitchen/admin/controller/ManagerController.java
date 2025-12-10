package com.cloudkitchen.admin.controller;

import com.cloudkitchen.admin.model.Manager;
import com.cloudkitchen.admin.repository.ManagerRepository;
import com.cloudkitchen.admin.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.security.SecureRandom;
import java.util.List;
@CrossOrigin("*")
@RestController
@RequestMapping("/api/admin/managers")
public class ManagerController {

    private final ManagerRepository repo;

    private final PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

    @Autowired
    public ManagerController(ManagerRepository repo, PasswordEncoder passwordEncoder) {
        this.repo = repo;
        this.passwordEncoder = passwordEncoder;
    }

    // ------------------ CREATE MANAGER WITH TEMPORARY PASSWORD ------------------
    @PostMapping
    public ResponseEntity<Manager> create(@RequestBody Manager m) {
        // Generate secure random 8-char password
        String tempPassword = generateTempPassword(8);

        // Hash password before saving
        String encodedPassword = passwordEncoder.encode(tempPassword);
        m.setPassword(encodedPassword);

        // Save manager
        Manager saved = repo.save(m);

        // Send plain temp password via email (not the hashed one)
        emailService.sendTemporaryCredentials(m.getEmail(), m.getName(), tempPassword, m.getUsername());

        return ResponseEntity.ok(saved);
    }

    // ------------------ GET ALL MANAGERS ------------------
    @GetMapping
    public List<Manager> all() {
        return repo.findAll();
    }

    // ------------------ DELETE MANAGER ------------------
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }

    // ------------------ UPDATE MANAGER ------------------
    @PutMapping("/{id}")
    public ResponseEntity<Manager> update(@PathVariable Long id, @RequestBody Manager updated) {
        return repo.findById(id).map(manager -> {
            manager.setName(updated.getName());
            manager.setEmail(updated.getEmail());
            manager.setAdharCard(updated.getAdharCard());
            manager.setPanCard(updated.getPanCard());
            manager.setPhone(updated.getPhone());
            manager.setAddress(updated.getAddress());
            manager.setAssignedKitchen(updated.getAssignedKitchen());
            manager.setUsername(updated.getUsername());
            // Optional: only update password if provided
            if (updated.getPassword() != null && !updated.getPassword().isEmpty()) {
                manager.setPassword(passwordEncoder.encode(updated.getPassword()));
            }
            return ResponseEntity.ok(repo.save(manager));
        }).orElse(ResponseEntity.notFound().build());
    }

    // -------------- TEMP PASSWORD GENERATOR ------------------
    private String generateTempPassword(int length) {
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$!";
        SecureRandom random = new SecureRandom();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < length; i++) {
            sb.append(chars.charAt(random.nextInt(chars.length())));
        }
        return sb.toString();
    }
}
