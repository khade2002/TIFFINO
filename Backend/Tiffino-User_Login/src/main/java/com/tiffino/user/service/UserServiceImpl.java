package com.tiffino.user.service;

import com.tiffino.user.dto.*;
import com.tiffino.user.entity.Role;
import com.tiffino.user.entity.User;
import com.tiffino.user.jwt.JwtUtil;
import com.tiffino.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;



import java.time.LocalDateTime;
import java.util.*;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private JavaMailSender mailSender;


    // For temporarily storing OTPs (email → otp)
    private Map<String, String> otpStore = new HashMap<>();


    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    private final int EXPIRY_MINUTES = 15;

    @Override
    public String sendOtp(UserOTPRequest request) {
        String otp = generateOtp();

        Optional<User> existing = userRepository.findByEmail(request.getEmail());
        User user = existing.orElseGet(User::new);
        user.setEmail(request.getEmail());
        user.setOtp(otp);
        user.setOtpExpiry(LocalDateTime.now().plusMinutes(EXPIRY_MINUTES));
        user.setStatus("PENDING"); // Mark as pending until registration is complete
        userRepository.save(user);

        emailService.sendOtpEmail(request.getEmail(), otp);
        return "OTP sent to email: " + request.getEmail();
    }

    @Override
    @Transactional
    public String verifyOtp(OTPVerificationRequest request) {
        Optional<User> optionalUser = userRepository.findByEmail(request.getEmail());
        if (optionalUser.isEmpty()) {
            return "Invalid email address.";
        }

        User user = optionalUser.get();

        if (user.getOtp() == null || !user.getOtp().equals(request.getOtp())) {
            return "Invalid OTP.";
        }

        if (user.getOtpExpiry() == null || user.getOtpExpiry().isBefore(LocalDateTime.now())) {
            return "OTP expired.";
        }

        // OTP verified successfully
        user.setOtp(null);
        user.setOtpExpiry(null);
        userRepository.save(user);
        return "OTP verified successfully.";
    }

    @Override
    public String registerUser(UserDTO userDto) {
        Optional<User> optionalUser = userRepository.findByEmail(userDto.getEmail());
        if (optionalUser.isEmpty()) {
            return "Please verify OTP first.";
        }

        User user = optionalUser.get();

        if (!"PENDING".equals(user.getStatus())) {
            return "User already registered.";
        }

        user.setName(userDto.getName());
        user.setPhone(userDto.getMobile());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        user.setRole(Role.USER);
        user.setStatus("ACTIVE");

        userRepository.save(user);
        return "User registered successfully.";
    }
    @Override
    public void forgotPassword(ForgotPasswordRequest request) {
        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());
        if (userOpt.isEmpty()) {
            throw new RuntimeException("User not found with this email");
        }

        String otp = String.valueOf((int) (Math.random() * 900000) + 100000); // 6-digit OTP
        otpStore.put(request.getEmail(), otp); // Assuming you already use a Map<String, String> for OTPs

        // send OTP mail
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(request.getEmail());
        message.setSubject("Tiffino Password Reset OTP");
        message.setText("Your OTP for resetting your password is: " + otp);
        mailSender.send(message);
    }

    @Override
    public boolean resetPassword(ResetPasswordRequest request) {
        String storedOtp = otpStore.get(request.getEmail());
        if (storedOtp == null || !storedOtp.equals(request.getOtp())) {
            throw new RuntimeException("Invalid or expired OTP");
        }

        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());
        if (userOpt.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        User user = userOpt.get();
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);

        otpStore.remove(request.getEmail());
        return true;
    }


    @Override
    public User getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
    }

    @Override
    public User getUserByPhone(String phone) {
        return userRepository.findByPhone(phone)
                .orElseThrow(() -> new RuntimeException("User not found with phone: " + phone));
    }

    @Override
    public List<User> getUsersByName(String name) {
        return userRepository.findByName(name);
    }

    @Override
    public void deleteUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        user.setStatus("DELETED"); // Soft delete instead of removing from DB
        userRepository.save(user);
    }



    @Override
    public Map<String, Long> getUserStatistics() {
        long active = userRepository.countByStatus("ACTIVE");
        long pending = userRepository.countByStatus("PENDING");
        long deleted = userRepository.countByStatus("DELETED");
        long total = userRepository.count();

        Map<String, Long> stats = new HashMap<>();
        stats.put("activeUsers", active);
        stats.put("pendingUsers", pending);
        stats.put("deletedUsers", deleted);
        stats.put("totalUsers", total);

        return stats;
    }



    @Override
    public User updateUser(Long id, UserDTO userDto) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + id));

        if (userDto.getName() != null) {
            existingUser.setName(userDto.getName());
        }
        if (userDto.getMobile() != null) {
            existingUser.setPhone(userDto.getMobile());
        }
        if (userDto.getPassword() != null) {
            existingUser.setPassword(passwordEncoder.encode(userDto.getPassword()));
        }

        return userRepository.save(existingUser);
    }

    @Override
    public String loginUser(UserDTO userDto) {
        Optional<User> optionalUser = userRepository.findByEmail(userDto.getEmail());
        if (optionalUser.isEmpty()) {
            return "Invalid credentials.";
        }

        User user = optionalUser.get();
        if (!passwordEncoder.matches(userDto.getPassword(), user.getPassword())) {
            return "Invalid credentials.";
        }

        // Return JWT Token
        return jwtUtil.generateToken(user.getEmail());
    }





    private String generateOtp() {
        return String.valueOf(new Random().nextInt(900000) + 100000);
    }
}


