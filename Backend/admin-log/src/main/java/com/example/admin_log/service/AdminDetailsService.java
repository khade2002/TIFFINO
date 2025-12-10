package com.example.admin_log.service;

import com.example.admin_log.entity.Admin;
import com.example.admin_log.repository.AdminRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminDetailsService implements UserDetailsService {

    private final AdminRepository adminRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Admin admin = adminRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Admin not found with email: " + email));

        List<GrantedAuthority> authorities =
                List.of(new SimpleGrantedAuthority("ROLE_ADMIN"));

        return new org.springframework.security.core.userdetails.User(
                admin.getEmail(),
                admin.getPassword(),
                authorities
        );
    }
}
