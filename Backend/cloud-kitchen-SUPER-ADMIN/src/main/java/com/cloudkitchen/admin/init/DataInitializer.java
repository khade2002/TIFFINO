package com.cloudkitchen.admin.init;

import com.cloudkitchen.admin.model.Admin;
import com.cloudkitchen.admin.repository.AdminRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {
    private final AdminRepository repo;
    private final PasswordEncoder encoder;

    public DataInitializer(AdminRepository repo, PasswordEncoder encoder) {
        this.repo = repo;
        this.encoder = encoder;
    }

    @Override
    public void run(String... args) throws Exception {
        if (repo.findByUsername("superadmin").isEmpty()) {
            Admin a = new Admin();
            a.setUsername("superadmin");
            a.setPasswordHash(encoder.encode("SuperAdmin@123"));
            repo.save(a);
            System.out.println("Seeded default superadmin / SuperAdmin@123");
        }
    }
}
