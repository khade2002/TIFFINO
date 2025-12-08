package com.tiffino.user.service;

import com.tiffino.user.entity.Address;
import com.tiffino.user.entity.User;
import com.tiffino.user.repository.AddressRepository;
import com.tiffino.user.repository.UserRepository;
import com.tiffino.user.jwt.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.servlet.http.HttpServletRequest;
import java.util.List;

@Service
public class AddressService {

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private HttpServletRequest request;

    // Helper to get current logged-in user from JWT token
    private User getLoggedInUser() {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            String email = jwtUtil.extractUsername(token);
            return userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));
        }
        throw new RuntimeException("Unauthorized: No JWT token found");
    }

    public Address addAddress(Address address) {
        User user = getLoggedInUser();
        address.setUser(user);
        return addressRepository.save(address);
    }

    public List<Address> getAllAddresses() {
        User user = getLoggedInUser();
        return addressRepository.findByUserId(user.getId());
    }

    public Address updateAddress(Long id, Address updatedAddress) {
        User user = getLoggedInUser();
        Address address = addressRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Address not found"));

        if (!address.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized to update this address");
        }

        if (updatedAddress.getStreet() != null) address.setStreet(updatedAddress.getStreet());
        if (updatedAddress.getCity() != null) address.setCity(updatedAddress.getCity());
        if (updatedAddress.getPincode() != null) address.setPincode(updatedAddress.getPincode());
        if (updatedAddress.getType() != null) address.setType(updatedAddress.getType());
        if (updatedAddress.getFlatNoOrBuildingName() != null) address.setFlatNoOrBuildingName(updatedAddress.getFlatNoOrBuildingName());
        if (updatedAddress.getLandmark() != null) address.setLandmark(updatedAddress.getLandmark());
        if (updatedAddress.getState() != null) address.setState(updatedAddress.getState());

        return addressRepository.save(address);
    }


    public void deleteAddress(Long addressId) {
        User user = getLoggedInUser();
        Address address = addressRepository.findById(addressId)
                .orElseThrow(() -> new RuntimeException("Address not found"));

        if (!address.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized to delete this address");
        }

        addressRepository.delete(address);
    }
}
