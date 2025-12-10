package com.example.report.services;

import com.example.report.entity.AnalyticsLog;
import com.example.report.entity.Report;
import com.example.report.repository.AnalyticsLogRepository;
import com.example.report.repository.ReportRepository;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileOutputStream;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

import static org.apache.tomcat.util.IntrospectionUtils.capitalize;

@Service
public class AnalyticsService {

    private final AnalyticsLogRepository analyticsRepo;
    private final ReportRepository reportRepo;

    public AnalyticsService(AnalyticsLogRepository analyticsRepo, ReportRepository reportRepo) {
        this.analyticsRepo = analyticsRepo;
        this.reportRepo = reportRepo;
    }

    private String capitalize(String input) {
        return input.charAt(0) + input.substring(1).toLowerCase();
    }


    public Report generateReport(String reportName) {
        Report report = new Report();
        LocalDateTime now = LocalDateTime.now();
        report.setReportName(reportName);
        report.setGeneratedAt(now);

        String exportDir = "exports";
        String filePath = exportDir + "/" + reportName + ".xlsx";
        report.setFilePath(filePath);

        try {
            File directory = new File(exportDir);
            if (!directory.exists()) {
                directory.mkdirs();
            }

            Workbook workbook = new XSSFWorkbook();

            // 1️⃣ Sheet 1: Export Info
            Sheet infoSheet = workbook.createSheet("Export Info");
            Row headerRow1 = infoSheet.createRow(0);
            headerRow1.createCell(0).setCellValue("Export Date");
            headerRow1.createCell(1).setCellValue("Export Time");

            Row dataRow1 = infoSheet.createRow(1);
            dataRow1.createCell(0).setCellValue(now.toLocalDate().toString());
            dataRow1.createCell(1).setCellValue(
                    now.format(DateTimeFormatter.ofPattern("HH:mm:ss 'GMT+0530 (India Standard Time)'"))
            );
            infoSheet.autoSizeColumn(0);
            infoSheet.autoSizeColumn(1);

            // 2️⃣ Sheet 2: Summary Stats
            Sheet summarySheet = workbook.createSheet("Summary");
            Row headerRow2 = summarySheet.createRow(0);
            headerRow2.createCell(0).setCellValue("metric");
            headerRow2.createCell(1).setCellValue("value");

            // Fetch logs (last 1 day for demo)
           // List<AnalyticsLog> logs = analyticsRepo.findByTimestampBetween(now.minusDays(1), now);
            // Fetch logs (ALL)
            List<AnalyticsLog> logs = analyticsRepo.findAll();


            long totalOrders = logs.stream().filter(l -> "ORDER".equals(l.getEventType())).count();
            long totalSubs = logs.stream().filter(l -> "SUBSCRIPTION".equals(l.getEventType())).count();
            double revenue = logs.stream().mapToDouble(AnalyticsLog::getAmount).sum();
            int peakHour = findPeakHour(logs);

            Object[][] summaryData = {
                    {"Total Sales", "₹" + String.format("%,.0f", revenue)}, // formatted with commas
                    {"Total Orders", totalOrders},
                    {"Subscriptions", totalSubs},
                    {"Peak Hour", peakHour == -1 ? "N/A" : formatHour(peakHour)}
            };

            int rowNum = 1;
            for (Object[] rowData : summaryData) {
                Row row = summarySheet.createRow(rowNum++);
                row.createCell(0).setCellValue(rowData[0].toString());
                row.createCell(1).setCellValue(rowData[1].toString());
            }
            summarySheet.autoSizeColumn(0);
            summarySheet.autoSizeColumn(1);

            // 3️⃣ Sheet 3: Hourly Breakdown
            Sheet hourlySheet = workbook.createSheet("Hourly Orders");
            Row headerRow3 = hourlySheet.createRow(0);
            headerRow3.createCell(0).setCellValue("hour");
            headerRow3.createCell(1).setCellValue("orders");

            Map<Integer, Long> hourlyCounts = logs.stream()
                    .collect(Collectors.groupingBy(l -> l.getTimestamp().getHour(), Collectors.counting()));

            int rowNum3 = 1;
            for (Map.Entry<Integer, Long> entry : hourlyCounts.entrySet().stream()
                    .sorted(Map.Entry.comparingByKey())
                    .toList()) {
                Row row = hourlySheet.createRow(rowNum3++);
                row.createCell(0).setCellValue(formatHour(entry.getKey()));
                row.createCell(1).setCellValue(entry.getValue());
            }
            hourlySheet.autoSizeColumn(0);
            hourlySheet.autoSizeColumn(1);

            // 4️⃣ Sheet 4: Order Trends (Day-wise Orders)
            Sheet trendsSheet = workbook.createSheet("Order Trends");
            Row headerRow4 = trendsSheet.createRow(0);
            headerRow4.createCell(0).setCellValue("day");
            headerRow4.createCell(1).setCellValue("orders");

// Group logs by DayOfWeek
            Map<java.time.DayOfWeek, Long> dayWiseOrders = logs.stream()
                    .filter(l -> "ORDER".equals(l.getEventType())) // only count orders
                    .collect(Collectors.groupingBy(l -> l.getTimestamp().getDayOfWeek(), Collectors.counting()));

// Keep days sorted Monday → Sunday
            List<java.time.DayOfWeek> weekDays = Arrays.asList(
                    java.time.DayOfWeek.MONDAY,
                    java.time.DayOfWeek.TUESDAY,
                    java.time.DayOfWeek.WEDNESDAY,
                    java.time.DayOfWeek.THURSDAY,
                    java.time.DayOfWeek.FRIDAY,
                    java.time.DayOfWeek.SATURDAY,
                    java.time.DayOfWeek.SUNDAY
            );

            int rowNum4 = 1;
            for (java.time.DayOfWeek day : weekDays) {
                Row row = trendsSheet.createRow(rowNum4++);
                row.createCell(0).setCellValue(capitalize(day.name())); // "MONDAY" → "Monday"
                row.createCell(1).setCellValue(dayWiseOrders.getOrDefault(day, 0L));
            }
            trendsSheet.autoSizeColumn(0);
            trendsSheet.autoSizeColumn(1);

            // 5️⃣ Sheet 5: Subscription (Plan-wise Subscriptions)
            Sheet subsSheet = workbook.createSheet("Subscription");
            Row headerRow5 = subsSheet.createRow(0);
            headerRow5.createCell(0).setCellValue("plan");
            headerRow5.createCell(1).setCellValue("count");

// Group logs by planType for SUBSCRIPTION
            Map<String, Long> planWiseSubs = logs.stream()
                    .filter(l -> "SUBSCRIPTION".equals(l.getEventType()))
                    .collect(Collectors.groupingBy(l -> l.getPlanType() == null ? "UNKNOWN" : l.getPlanType().toUpperCase(),
                            Collectors.counting()));

// Ensure fixed order: Daily, Weekly, Monthly, Quarterly
            List<String> plans = Arrays.asList("DAILY", "WEEKLY", "MONTHLY", "QUARTERLY");

            int rowNum5 = 1;
            for (String plan : plans) {
                Row row = subsSheet.createRow(rowNum5++);
                row.createCell(0).setCellValue(capitalize(plan));
                row.createCell(1).setCellValue(planWiseSubs.getOrDefault(plan, 0L));
            }

            subsSheet.autoSizeColumn(0);
            subsSheet.autoSizeColumn(1);

            // 6️⃣ Sheet 6: Revenue Stat (Month-wise Revenue)
            Sheet revenueSheet = workbook.createSheet("Revenue Stat");
            Row headerRow6 = revenueSheet.createRow(0);
            headerRow6.createCell(0).setCellValue("month");
            headerRow6.createCell(1).setCellValue("revenue");

// Group logs by Month (only ORDER events, sum of amount)
            Map<java.time.Month, Double> monthWiseRevenue = logs.stream()
                    .filter(l -> "ORDER".equals(l.getEventType()))
                    .collect(Collectors.groupingBy(
                            l -> l.getTimestamp().getMonth(),
                            Collectors.summingDouble(l -> l.getAmount() == null ? 0.0 : l.getAmount())
                    ));

// Keep months in Jan–Dec order
            List<java.time.Month> months = Arrays.asList(
                    java.time.Month.JANUARY,
                    java.time.Month.FEBRUARY,
                    java.time.Month.MARCH,
                    java.time.Month.APRIL,
                    java.time.Month.MAY,
                    java.time.Month.JUNE,
                    java.time.Month.JULY,
                    java.time.Month.AUGUST,
                    java.time.Month.SEPTEMBER,
                    java.time.Month.OCTOBER,
                    java.time.Month.NOVEMBER,
                    java.time.Month.DECEMBER
            );

            int rowNum6 = 1;
            for (java.time.Month month : months) {
                Row row = revenueSheet.createRow(rowNum6++);
                row.createCell(0).setCellValue(capitalize(month.name())); // "JANUARY" → "January"
                row.createCell(1).setCellValue(monthWiseRevenue.getOrDefault(month, 0.0));
            }

            revenueSheet.autoSizeColumn(0);
            revenueSheet.autoSizeColumn(1);



            // Save file
            try (FileOutputStream fos = new FileOutputStream(filePath)) {
                workbook.write(fos);
            }
            workbook.close();

        } catch (Exception e) {
            e.printStackTrace();
        }



        return reportRepo.save(report);
    }

    private int findPeakHour(List<AnalyticsLog> logs) {
        return logs.stream()
                .map(l -> l.getTimestamp().getHour())
                .collect(Collectors.groupingBy(h -> h, Collectors.counting()))
                .entrySet().stream()
                .max(Map.Entry.comparingByValue())
                .map(Map.Entry::getKey)
                .orElse(-1);
    }

    private String formatHour(int hour) {
        if (hour == 0) return "12AM";
        else if (hour < 12) return hour + "AM";
        else if (hour == 12) return "12PM";
        else return (hour - 12) + "PM";
    }

    // Run daily at midnight
    @Scheduled(cron = "0 0 0 * * ?")
    public void scheduleDailyReport() {
        generateReport("daily-report-" + LocalDateTime.now().toLocalDate());
    }

    public Map<String, Object> getDashboardStats(LocalDateTime from, LocalDateTime to) {
        return Map.of();
    }
}
