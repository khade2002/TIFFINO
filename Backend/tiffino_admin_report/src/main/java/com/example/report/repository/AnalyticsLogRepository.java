package com.example.report.repository;


import com.example.report.entity.AnalyticsLog;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;

public interface AnalyticsLogRepository extends JpaRepository<AnalyticsLog, Long> {
    List<AnalyticsLog> findByTimestampBetween(LocalDateTime start, LocalDateTime end);
}

