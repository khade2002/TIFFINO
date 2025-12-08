package com.tiffino.Tiffino_admin_Subscription.service;

import com.tiffino.Tiffino_admin_Subscription.dto.SubscriptionDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AdminSubscriptionService {
    private final RestTemplate restTemplate;

    @Value("${subscription.service.url}")
    private String subscriptionServiceUrl; // Example: http://localhost:8081/api/subscriptions

    public AdminSubscriptionService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    // Fetch all subscriptions from Subscription Service
    public List<SubscriptionDTO> getAll()
    {
        SubscriptionDTO[] response = restTemplate.getForObject(
                subscriptionServiceUrl, SubscriptionDTO[].class);
        return response != null ? Arrays.asList(response) : new ArrayList<>();
    }

    //  Get subscription by subscriptionid
    public SubscriptionDTO getBySubscriptionid(Long subscriptionid) {
        return restTemplate.getForObject(
                subscriptionServiceUrl + "/" + subscriptionid, SubscriptionDTO.class);
    }

    //  Delete subscription by ID
    public void deleteById(Long subscriptionid) {
        restTemplate.delete(subscriptionServiceUrl + "/" + subscriptionid);
    }

    //  Filter subscriptions by status
    public List<SubscriptionDTO> filterByStatus(String status) {
        return getAll().stream()
                .filter(s -> status.equalsIgnoreCase(s.getStatus()))
                .collect(Collectors.toList());
    }



    //  Count subscriptions by status (Active, Expired, Paused, Total)
    public Map<String, Long> countByStatus() {
        List<SubscriptionDTO> all = getAll();

        long totalCount = all.size();
        long activeCount = all.stream()
                .filter(s -> "ACTIVE".equalsIgnoreCase(s.getStatus()))
                .count();
        long expiredCount = all.stream()
                .filter(s -> "EXPIRED".equalsIgnoreCase(s.getStatus()))
                .count();
        long pausedCount = all.stream()
                .filter(s -> "PAUSED".equalsIgnoreCase(s.getStatus()))
                .count();

        Map<String, Long> result = new HashMap<>();
        result.put("totalCount", totalCount);
        result.put("activeCount", activeCount);
        result.put("expiredCount", expiredCount);
        result.put("pausedCount", pausedCount);

        return result;
    }

    //  Find subscriptions expiring within N days
    public List<SubscriptionDTO> expiringSoon(int days) {
        LocalDate now = LocalDate.now();
        LocalDate threshold = now.plusDays(days);

        return getAll().stream()
                .filter(s -> s.getEndDate() != null &&
                        (s.getEndDate().isAfter(now.minusDays(1)) && s.getEndDate().isBefore(threshold.plusDays(1))))
                .collect(Collectors.toList());
    }


}

