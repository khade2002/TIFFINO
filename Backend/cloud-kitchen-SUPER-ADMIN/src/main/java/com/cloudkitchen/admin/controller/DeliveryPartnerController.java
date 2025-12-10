package com.cloudkitchen.admin.controller;

import com.cloudkitchen.admin.model.DeliveryPartner;
import com.cloudkitchen.admin.repository.DeliveryPartnerRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@CrossOrigin("*")
@RestController
@RequestMapping("/api/admin/delivery-partners")
public class DeliveryPartnerController {
    private final DeliveryPartnerRepository repo;
    public DeliveryPartnerController(DeliveryPartnerRepository repo){ this.repo = repo; }
    @PostMapping
    public DeliveryPartner create
            (@RequestBody DeliveryPartner d)
    { return repo.save(d); }

    @GetMapping
    public List<DeliveryPartner> all()
    { return repo.findAll(); }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id)
    { repo.deleteById(id); }
}
