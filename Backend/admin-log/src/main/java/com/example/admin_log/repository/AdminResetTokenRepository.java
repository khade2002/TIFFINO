package com.example.admin_log.repository;

import com.example.admin_log.entity.AdminResetToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminResetTokenRepository extends JpaRepository<AdminResetToken, Long> {

    Optional<AdminResetToken> findByToken(String token);
}
