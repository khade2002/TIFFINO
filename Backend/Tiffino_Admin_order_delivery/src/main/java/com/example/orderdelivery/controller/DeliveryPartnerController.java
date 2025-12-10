package com.example.orderdelivery.controller;

import com.example.orderdelivery.entity.DeliveryPartner;
import com.example.orderdelivery.repository.DeliveryPartnerRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("*")
@RestController
@RequestMapping("/ordr/delivery-partners")
public class DeliveryPartnerController {

    private final DeliveryPartnerRepository repository;

    public DeliveryPartnerController(DeliveryPartnerRepository repository) {
        this.repository = repository;
    }

    /* ==========================================================
       GET ALL
       ========================================================== */
    @GetMapping
    public ResponseEntity<List<DeliveryPartner>> getAllPartners() {
        return ResponseEntity.ok(repository.findAll());
    }

    /* ==========================================================
       GET BY ID
       ========================================================== */
    @GetMapping("/{id}")
    public ResponseEntity<DeliveryPartner> getPartnerById(@PathVariable Long id) {
        DeliveryPartner partner = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Partner not found"));
        return ResponseEntity.ok(partner);
    }

    /* ==========================================================
       CREATE
       ========================================================== */
    @PostMapping
    public ResponseEntity<DeliveryPartner> createPartner(@RequestBody DeliveryPartner partner) {
        partner.setId(null); // Prevent accidental update
        DeliveryPartner saved = repository.save(partner);
        return ResponseEntity.ok(saved);
    }

    /* ==========================================================
       UPDATE
       ========================================================== */
    @PutMapping("/{id}")
    public ResponseEntity<DeliveryPartner> updatePartner(
            @PathVariable Long id,
            @RequestBody DeliveryPartner data) {

        DeliveryPartner p = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Partner not found"));

        p.setName(data.getName());
        p.setPhone(data.getPhone());
        p.setEmail(data.getEmail());
        p.setAssignedArea(data.getAssignedArea());
        p.setVehicleDetails(data.getVehicleDetails());
        p.setAdharCard(data.getAdharCard());
        p.setPanCard(data.getPanCard());
        p.setDriverLicence(data.getDriverLicence());
        p.setAvailable(data.isAvailable());

        DeliveryPartner updated = repository.save(p);
        return ResponseEntity.ok(updated);
    }

    /* ==========================================================
       DELETE
       ========================================================== */
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePartner(@PathVariable Long id) {
        DeliveryPartner p = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Partner not found"));

        repository.delete(p);

        return ResponseEntity.ok("Partner deleted successfully");
    }
}
