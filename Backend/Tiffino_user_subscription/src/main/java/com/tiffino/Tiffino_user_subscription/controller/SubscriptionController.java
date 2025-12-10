package com.tiffino.Tiffino_user_subscription.controller;

import com.tiffino.Tiffino_user_subscription.dto.RenewSubscriptionRequest;
import com.tiffino.Tiffino_user_subscription.dto.SubscriptionDTO;
import com.tiffino.Tiffino_user_subscription.dto.SwitchSubscriptionRequest;
import com.tiffino.Tiffino_user_subscription.entity.Subscription;
import com.tiffino.Tiffino_user_subscription.service.SubscriptionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("*")
@RestController
@RequestMapping("/subscri/subscriptions")
public class SubscriptionController {

    private final SubscriptionService subscriptionService;

    public SubscriptionController(SubscriptionService subscriptionService)
    {
        this.subscriptionService = subscriptionService;
    }

    //  Create Subscription
    @PostMapping
    public Subscription createSubscription(@RequestBody Subscription subscription) {
        return subscriptionService.createSubscription(subscription);
    }

    //  Get Subscription by subscriptionid
    @GetMapping("/{subscriptionid}")
    public Subscription getSubscription(@PathVariable Long subscriptionid) {
        return subscriptionService.getSubscription(subscriptionid);
    }

    //  Get All Subscriptions
    @GetMapping
    public List<Subscription> getAllSubscriptions() {
        return subscriptionService.getAllSubscriptions();
    }

    //  Delete Subscription
    @DeleteMapping("/{subscriptionid}")
    public ResponseEntity<String> deleteSubscription(@PathVariable Long subscriptionid) {
        subscriptionService.deleteSubscription(subscriptionid);
        return ResponseEntity.ok("Subscription has been deleted");
    }

    //  Switch Subscription
    @PutMapping("/{subscriptionid}/switch")
    public SubscriptionDTO switchSubscription(
            @PathVariable Long subscriptionid,
            @RequestBody SwitchSubscriptionRequest request) {
        // update subscription
        subscriptionService.switchSubscription(
                subscriptionid,
                request.getNewPlanType(),
                request.getDurationInDays(),

                request.getFrequency()
        );

        // fetch updated subscription
        return subscriptionService.getSubscriptionForReviewById(subscriptionid);

    }



    // Renew Subscription
    @PutMapping("/{subscriptionid}/renew")
    public ResponseEntity<String> renewSubscription(
            @PathVariable Long subscriptionid,
            @RequestBody RenewSubscriptionRequest request) {
        subscriptionService.renewSubscription(subscriptionid, request.getDurationInDays());
        return ResponseEntity.ok("Subscription renewed for " + request.getDurationInDays() + " days");
    }

    //  Get All Subscriptions with Allergies
    @GetMapping("/with-allergies")
    public List<SubscriptionDTO> getAllSubscriptionsWithAllergies() {
        return subscriptionService.getAllSubscriptionsWithAllergies();
    }


    //  Get Subscription Review by usersubscriptionid
    @GetMapping("/user/{subscriptionid}/review")
    public SubscriptionDTO getSubscriptionForReview(@PathVariable long subscriptionid) {
        return subscriptionService.getSubscriptionForReviewById(subscriptionid);
    }

}