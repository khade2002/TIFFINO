package com.example.admin_log.service;

import com.example.admin_log.entity.Admin;
import com.example.admin_log.repository.AdminRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    @Override
    public boolean login(String email, String rawPassword) {
        Admin admin = adminRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Admin not found"));
        return passwordEncoder.matches(rawPassword, admin.getPassword());
    }

    @Override
    public void resetPassword(String email, String oldPassword, String newPassword, String confirmPassword) {
        Admin admin = adminRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Admin not found"));

        if (!passwordEncoder.matches(oldPassword, admin.getPassword())) {
            throw new RuntimeException("Old password is incorrect");
        }

        if (!newPassword.equals(confirmPassword)) {
            throw new RuntimeException("New password & confirm password do not match");
        }

        admin.setPassword(passwordEncoder.encode(newPassword));
        adminRepository.save(admin);
    }

    @Override
    public void sendTemporaryPassword(String email) {
        Admin admin = adminRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Admin not found"));

        String tempPassword = UUID.randomUUID().toString().substring(0, 8);

        admin.setPassword(passwordEncoder.encode(tempPassword));
        adminRepository.save(admin);

        String subject = "Temporary Password - Admin Login";
        String content = "Hi " + email + ",\n\n"
                + "Your temporary password is: " + tempPassword + "\n"
                + "Please login using this password and change it immediately.\n\n"
                + "Regards,\nAdmin Team";

        emailService.sendEmail(email, subject, content);

        System.out.println("TEMP PASSWORD SENT: " + tempPassword);
    }

    @Override
    public String forgotPassword(String email) {
        Admin admin = adminRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Admin not found"));

        // generate temporary password
        String tempPassword = UUID.randomUUID().toString().substring(0, 8);

        // encode and save to DB
        admin.setPassword(passwordEncoder.encode(tempPassword));
        adminRepository.save(admin);

        // email content
        String subject = "Temporary Password - Admin Login";
        String content = "Hello,\n\n" +
                "Your temporary password is: " + tempPassword + "\n" +
                "Please use this to login and change your password immediately.\n\n" +
                "Thanks,\nAdmin Team";

        // send email
        emailService.sendEmail(email, subject, content);

        System.out.println("TEMP PASSWORD SENT: " + tempPassword);

        return "Temporary password sent to your email!";
    }

}
