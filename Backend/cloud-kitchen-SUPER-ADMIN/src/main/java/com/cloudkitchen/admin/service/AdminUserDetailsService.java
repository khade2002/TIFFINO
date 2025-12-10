package com.cloudkitchen.admin.service;

import com.cloudkitchen.admin.model.Admin;
import com.cloudkitchen.admin.repository.AdminRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AdminUserDetailsService implements UserDetailsService {

    private final AdminRepository repo;

    public AdminUserDetailsService(AdminRepository repo) {
        this.repo = repo;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Admin a = repo.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("Not found"));
        return User.withUsername(a.getUsername()).password(a.getPasswordHash()).authorities("ROLE_ADMIN").build();
    }
}