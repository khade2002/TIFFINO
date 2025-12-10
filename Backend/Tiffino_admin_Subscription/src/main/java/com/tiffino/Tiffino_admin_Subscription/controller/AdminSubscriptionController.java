package com.tiffino.Tiffino_admin_Subscription.controller;
import  com.tiffino.Tiffino_admin_Subscription.dto.SubscriptionDTO;
import com.tiffino.Tiffino_admin_Subscription.service.AdminSubscriptionService;
import com.tiffino.Tiffino_admin_Subscription.dto.SubscriptionDTO;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
@CrossOrigin("*")
@RestController
@RequestMapping("/api/admin/subscriptions")
public class AdminSubscriptionController {

    private final AdminSubscriptionService service;

    public AdminSubscriptionController(AdminSubscriptionService service) {
        this.service = service;
    }

    //  Get all subscriptions OR filter by status/user
//    @GetMapping
//    public List<SubscriptionDTO> list(
//            @RequestParam(required = false) String status,
//            @RequestParam(required = false) Long subscriptionid
//    ) {
//        if (subscriptionid != null) return service.filterByStatus(status);
//        if (status != null && !status.isBlank()) return service.filterByStatus(status);
//        return service.getAll();
//    }
    @GetMapping
    public List<SubscriptionDTO> list(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) Long subscriptionid
    ) {
        // 1) Agar subscriptionid diya hai → same id ka record
        if (subscriptionid != null) {
            SubscriptionDTO dto = service.getBySubscriptionid(subscriptionid);
            return List.of(dto); // single result ko list me wrap kar diya
        }

        // 2) Agar status diya hai → status se filter
        if (status != null && !status.isBlank()) {
            return service.filterByStatus(status);
        }

        // 3) Nahi to sabhi
        return service.getAll();
    }


    //  Get one subscription by ID
    @GetMapping("/{subscriptionid}")
    public SubscriptionDTO getOne(@PathVariable Long subscriptionid) {
        return service.getBySubscriptionid(subscriptionid);
    }

    //  Delete subscription by ID
    @DeleteMapping("/{subscriptionid}")
    public Map<String, String> delete(@PathVariable Long subscriptionid) {
        service.deleteById(subscriptionid);
        return Map.of("message", "Subscription with id=" + subscriptionid + " deleted successfully");
    }

    //  Count subscriptions by status
    @GetMapping("/count")
    public Map<String, Long> countByStatus() {
        return service.countByStatus();
    }

    //  Subscriptions expiring soon (e.g., in next 7 days)
    @GetMapping("/expiring-soon")
    public List<SubscriptionDTO> expiringSoon(@RequestParam(defaultValue = "7") int days) {
        return service.expiringSoon(days);
    }

}

