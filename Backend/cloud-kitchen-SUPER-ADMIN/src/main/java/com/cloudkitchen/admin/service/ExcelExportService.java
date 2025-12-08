package com.cloudkitchen.admin.service;
import org.springframework.stereotype.Service;
import com.cloudkitchen.admin.model.DeliveryPartner;
import com.cloudkitchen.admin.model.Kitchen;
import com.cloudkitchen.admin.model.Manager;
import com.cloudkitchen.admin.repository.DeliveryPartnerRepository;
import com.cloudkitchen.admin.repository.KitchenRepository;
import com.cloudkitchen.admin.repository.ManagerRepository;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import java.io.IOException;
import java.io.OutputStream;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ExcelExportService {

    private final KitchenRepository kitchenRepo;
    private final ManagerRepository managerRepo;
    private final DeliveryPartnerRepository deliveryRepo;

    public ExcelExportService(KitchenRepository kitchenRepo,
                              ManagerRepository managerRepo,
                              DeliveryPartnerRepository deliveryRepo) {
        this.kitchenRepo = kitchenRepo;
        this.managerRepo = managerRepo;
        this.deliveryRepo = deliveryRepo;
    }

    // ✅ Export all kitchens
    public void exportAllData(OutputStream out) throws IOException {
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("All Kitchens");

        // Header row
        Row header = sheet.createRow(0);
        header.createCell(0).setCellValue("Kitchen ID");
        header.createCell(1).setCellValue("Kitchen Name");
        header.createCell(2).setCellValue("City");
        header.createCell(3).setCellValue("Pincode");
        header.createCell(4).setCellValue("State");
        header.createCell(5).setCellValue("Manager");
        header.createCell(6).setCellValue("Delivery Partner(s)");
        header.createCell(7).setCellValue("Rating");
        header.createCell(8).setCellValue("Revenue");

        int rowIdx = 1;
        for (Kitchen kitchen : kitchenRepo.findAll()) {
            Row row = sheet.createRow(rowIdx++);
            row.createCell(0).setCellValue(kitchen.getId());
            row.createCell(1).setCellValue(kitchen.getName());
            row.createCell(2).setCellValue(kitchen.getCity() != null ? kitchen.getCity() : "N/A");
            row.createCell(3).setCellValue(kitchen.getPincode() != null ? String.valueOf(kitchen.getPincode()) : "N/A");
            row.createCell(4).setCellValue(kitchen.getState() != null ? kitchen.getState() : "N/A");

            // Manager
            Manager manager = managerRepo.findByKitchenId(kitchen.getId());
            row.createCell(5).setCellValue(manager != null ? manager.getName() : "N/A");

            // Delivery partners
            List<DeliveryPartner> partners = deliveryRepo.findByKitchenId(kitchen.getId());
            String partnerNames = partners.isEmpty()
                    ? "N/A"
                    : partners.stream().map(DeliveryPartner::getName)
                    .collect(Collectors.joining(", "));
            row.createCell(6).setCellValue(partnerNames);

            // Rating
            row.createCell(7).setCellValue(kitchen.getRating() != null ? kitchen.getRating() : 0);

            // Revenue
            row.createCell(8).setCellValue(kitchen.getRevenue() != null ? kitchen.getRevenue() : 0);
        }

        workbook.write(out);
        workbook.close();
    }

    // ✅ Export one kitchen
    public void exportKitchenData(Long kitchenId, OutputStream out) throws IOException {
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Kitchen");

        // Header row
        Row header = sheet.createRow(0);
        header.createCell(0).setCellValue("Kitchen ID");
        header.createCell(1).setCellValue("Kitchen Name");
        header.createCell(2).setCellValue("City");
        header.createCell(3).setCellValue("Pincode");
        header.createCell(4).setCellValue("State");
        header.createCell(5).setCellValue("Manager");
        header.createCell(6).setCellValue("Delivery Partner(s)");
        header.createCell(7).setCellValue("Rating");
        header.createCell(8).setCellValue("Revenue");

        // Data row
        Kitchen kitchen = kitchenRepo.findById(kitchenId).orElse(null);
        if (kitchen != null) {
            Row row = sheet.createRow(1);
            row.createCell(0).setCellValue(kitchen.getId());
            row.createCell(1).setCellValue(kitchen.getName());
            row.createCell(2).setCellValue(kitchen.getCity() != null ? kitchen.getCity() : "N/A");
            row.createCell(3).setCellValue(kitchen.getPincode() != null ? String.valueOf(kitchen.getPincode()) : "N/A");
            row.createCell(4).setCellValue(kitchen.getState() != null ? kitchen.getState() : "N/A");

            Manager manager = managerRepo.findByKitchenId(kitchenId);
            row.createCell(5).setCellValue(manager != null ? manager.getName() : "N/A");

            List<DeliveryPartner> partners = deliveryRepo.findByKitchenId(kitchenId);
            String partnerNames = partners.isEmpty()
                    ? "N/A"
                    : partners.stream().map(DeliveryPartner::getName)
                    .collect(Collectors.joining(", "));
            row.createCell(6).setCellValue(partnerNames);

            row.createCell(7).setCellValue(kitchen.getRating() != null ? kitchen.getRating() : 0);
            row.createCell(8).setCellValue(kitchen.getRevenue() != null ? kitchen.getRevenue() : 0);
        }

        workbook.write(out);
        workbook.close();
    }
}
