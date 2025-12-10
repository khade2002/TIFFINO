package com.cloudkitchen.admin.controller;

import com.cloudkitchen.admin.service.ExcelExportService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
@CrossOrigin("*")
@RestController
@RequestMapping("/api/admin")
public class ExportController {

    private final ExcelExportService excelExportService;

    public ExportController(ExcelExportService excelExportService) {
        this.excelExportService = excelExportService;
    }

    //  Export all data download in browser)
    @GetMapping("/export/all")
    public void downloadAll(HttpServletResponse response) throws IOException {
        response.setContentType(
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        response.setHeader(
                "Content-Disposition",
                "attachment; filename=all-data.xlsx"
        );
        excelExportService.exportAllData(response.getOutputStream());
    }

    // Export one kitchen by ID
    @GetMapping("/export/kitchen/{id}")
    public void downloadKitchen(
            @PathVariable Long id,
            HttpServletResponse response) throws IOException {
        response.setContentType(
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        response.setHeader(
                "Content-Disposition",
                "attachment; filename=kitchen-" + id + ".xlsx"

        );
        excelExportService.exportKitchenData(id, response.getOutputStream());
    }
}
