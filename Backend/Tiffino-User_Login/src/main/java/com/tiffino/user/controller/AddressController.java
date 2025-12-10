package com.tiffino.user.controller;

import com.tiffino.user.entity.Address;
import com.tiffino.user.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("*")
@RestController
//@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/log/addresses")
public class AddressController {

    @Autowired
    private AddressService addressService;

    // Add new address for logged-in user
    @PostMapping("/add")
    public Address addAddress(@RequestBody Address address) {
        return addressService.addAddress(address);
    }

    // Get all addresses for logged-in user
    @GetMapping("/all")
    public List<Address> getAllAddresses() {
        return addressService.getAllAddresses();
    }
    // Update address by ID for logged-in user
    @PutMapping("/{id}")
    public Address updateAddress(@PathVariable Long id, @RequestBody Address updatedAddress) {
        return addressService.updateAddress(id, updatedAddress);
    }


    // Delete address by ID for logged-in user
    @DeleteMapping("/{id}")
    public void deleteAddress(@PathVariable Long id) {
        addressService.deleteAddress(id);
    }
}