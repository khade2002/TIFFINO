package com.example.report.controller;

import com.example.report.entity.Report;
import com.example.report.repository.AnalyticsLogRepository;
import com.example.report.services.AnalyticsService;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.report.entity.AnalyticsLog;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.io.File;
import java.time.LocalDateTime;
import java.util.List;
@CrossOrigin("*")
@RestController
@RequestMapping("/analytics")
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    private AnalyticsLogRepository repo;

    public void AnalyticsLogController(AnalyticsLogRepository repo) {
        this.repo = repo;
    }

    public AnalyticsController(AnalyticsService analyticsService, AnalyticsLogRepository repo) {
        this.analyticsService = analyticsService;
        this.repo = repo;
    }



    //  Fetch all logs (for checking data)
    @GetMapping("/summary")
    public Map<String, Object> getSummary() {
        List<AnalyticsLog> logs = repo.findAll();

        // Compute stats
        double totalSales = logs.stream()
                .mapToDouble(l -> l.getAmount() == null ? 0.0 : l.getAmount())
                .sum();

        long totalOrders = logs.stream()
                .filter(l -> "ORDER".equalsIgnoreCase(l.getEventType()))
                .count();

        long subscriptions = logs.stream()
                .filter(l -> "SUBSCRIPTION".equalsIgnoreCase(l.getEventType()))
                .count();

        int peakHour = logs.stream()
                .map(l -> l.getTimestamp().getHour())
                .collect(java.util.stream.Collectors.groupingBy(h -> h, java.util.stream.Collectors.counting()))
                .entrySet().stream()
                .max(java.util.Map.Entry.comparingByValue())
                .map(java.util.Map.Entry::getKey)
                .orElse(-1);

        // Format ₹ and time
        String formattedSales = "₹" + String.format("%,.0f", totalSales);
        String formattedPeakHour = formatHour(peakHour);

        return Map.of(
                "Total Sales", formattedSales,
                "Total Orders", totalOrders,
                "Subscriptions", subscriptions,
                "Peak Hour", formattedPeakHour
        );
    }

    private String formatHour(int hour) {
        if (hour == -1) return "N/A";
        if (hour == 0) return "12AM";
        else if (hour < 12) return hour + "AM";
        else if (hour == 12) return "12PM";
        else return (hour - 12) + "PM";
    }



    @GetMapping("/download")
    public ResponseEntity<Resource> downloadReport(@RequestParam String name) {
        // Report generate karo
        Report report = analyticsService.generateReport(name);
        File file = new File(report.getFilePath());

        if (!file.exists()) {
            return ResponseEntity.notFound().build();
        }

        Resource resource = new FileSystemResource(file);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + file.getName())
                .contentType(MediaType.parseMediaType(
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .body(resource);
    }
}


