package com.tiffino.Tiffino_user_subscription.service.impl;

import com.tiffino.Tiffino_user_subscription.dto.SubscriptionDTO;
import com.tiffino.Tiffino_user_subscription.entity.Plan;
import com.tiffino.Tiffino_user_subscription.entity.Subscription;
import com.tiffino.Tiffino_user_subscription.repository.PlanRepository;
import com.tiffino.Tiffino_user_subscription.repository.SubscriptionRepository;
import com.tiffino.Tiffino_user_subscription.service.SubscriptionService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SubscriptionServiceImpl implements SubscriptionService {

    private final SubscriptionRepository subscriptionRepository;
    private final PlanRepository planRepository;

    public SubscriptionServiceImpl(SubscriptionRepository subscriptionRepository,
                                   PlanRepository planRepository) {
        this.subscriptionRepository = subscriptionRepository;
        this.planRepository = planRepository;
    }

    //  Create Subscription
    @Override
    public Subscription createSubscription(Subscription subscription) {

        //  Validate plan type
        List<String> allowedPlanTypes = List.of("DAILY", "WEEKLY", "MONTHLY", "QUARTERLY");
        String planType = subscription.getPlanType().toUpperCase();

        if (!allowedPlanTypes.contains(planType)) {
            throw new RuntimeException("Invalid plan type. Allowed types: DAILY, WEEKLY, MONTHLY, QUARTERLY");
        }

        //  Fetch plan
        Plan plan = planRepository.findById(subscription.getPlanId())
                .orElseThrow(() -> new RuntimeException("Plan not found"));


        subscription.setStartDate(LocalDate.now());

        //  Set duration based on planType
        int durationDays = switch (planType) {
            case "DAILY" -> 1;
            case "WEEKLY" -> 7;
            case "MONTHLY" -> 28;
            case "QUARTERLY" -> 90;
            default -> 0;
        };
        subscription.setDurationInDays(durationDays);
        subscription.setEndDate(LocalDate.now().plusDays(durationDays));



        //  Set discount based on planType
        double discount = switch (planType) {
            case "DAILY" -> 5;
            case "WEEKLY" -> 10;
            case "MONTHLY" -> 15;
            case "QUARTERLY" -> 20;
            default -> 0;
        };
        subscription.setDiscountPercentage(discount);

        //  Free delivery
        subscription.setFreeDelivery(true);

        //  Set status
        subscription.setStatus(Subscription.Status.ACTIVE);

        return subscriptionRepository.save(subscription);
    }


    //  Get Subscription by ID
    @Override
    public Subscription getSubscription(Long subscriptionid) {
        return subscriptionRepository.findById(subscriptionid)
                .orElseThrow(() -> new RuntimeException("Subscription not found"));
    }

    //  Get All Subscriptions
    @Override
    public List<Subscription> getAllSubscriptions() {
        return subscriptionRepository.findAll();
    }

    //  Delete Subscription
    @Override
    public void deleteSubscription(Long subscriptionid) {
        if (!subscriptionRepository.existsById(subscriptionid)) {
            throw new RuntimeException("Subscription not found with id " + subscriptionid);
        }
        subscriptionRepository.deleteById(subscriptionid);
    }

    //  Switch Subscription
    @Override
    public void switchSubscription(Long id, String newPlanType, int ignoredDuration, String frequency) {
        Subscription subscription = getSubscription(id);
        subscription.setPlanType(newPlanType);

        // Update duration automatically based on new planType
        int newDuration = switch (newPlanType.toUpperCase()) {
            case "DAILY" -> 1;
            case "WEEKLY" -> 7;
            case "MONTHLY" -> 28;
            case "QUARTERLY" -> 90;
            default -> subscription.getDurationInDays(); // fallback
        };
        subscription.setDurationInDays(newDuration);

        subscription.setFrequency(frequency);
        subscription.setStartDate(LocalDate.now());
        subscription.setEndDate(LocalDate.now().plusDays(subscription.getDurationInDays()));

        subscriptionRepository.save(subscription);
    }

    //  Renew Subscription
    @Override
    public void renewSubscription(Long subscriptionid, int durationInDays) {
        Subscription subscription = getSubscription(subscriptionid);
        subscription.setDurationInDays(durationInDays);
        subscription.setStartDate(LocalDate.now());
        subscription.setEndDate(LocalDate.now().plusDays(durationInDays));
        subscriptionRepository.save(subscription);
    }

    //  Get All Subscriptions with Allergies
    @Override
    public List<SubscriptionDTO> getAllSubscriptionsWithAllergies() {
        return subscriptionRepository.findAll().stream()
                .map(sub -> new SubscriptionDTO(

                        sub.getSubscriptionid(),
                        sub.getPlanId(),
                        sub.getPlanType(),
                        sub.getFrequency(),
                        sub.getStartDate(),
                        sub.getEndDate(),
                        sub.getAllergies(),
                        sub.getStatus(),
                        sub.getDiscountPercentage(),  //  discount
                        sub.isFreeDelivery()          //  free delivery
                )).collect(Collectors.toList());
    }



    //  Get Subscription for Review
    @Override
    public SubscriptionDTO getSubscriptionForReview(Long subscriptionid) {
        List<Subscription> subscriptions = subscriptionRepository.findBysubscriptionid(subscriptionid);
        if (subscriptions.isEmpty()) {
            throw new RuntimeException("No subscription found for user " + subscriptionid);
        }

        Subscription subscription = subscriptions.get(subscriptions.size() - 1);

        return new SubscriptionDTO(
                subscription.getSubscriptionid(),

                subscription.getPlanId(),
                subscription.getPlanType(),
                subscription.getFrequency(),
                subscription.getStartDate(),
                subscription.getEndDate(),
                subscription.getAllergies(),
                subscription.getStatus(),
                subscription.getDiscountPercentage(),
                subscription.isFreeDelivery()
        );
    }
    @Override
    public SubscriptionDTO getSubscriptionForReviewById(Long subscriptionid) {
        Subscription subscription = getSubscription(subscriptionid); // already existing method
        return new SubscriptionDTO(
                subscription.getSubscriptionid(),
                subscription.getPlanId(),
                subscription.getPlanType(),
                subscription.getFrequency(),
                subscription.getStartDate(),
                subscription.getEndDate(),
                subscription.getAllergies(),
                subscription.getStatus(),
                subscription.getDiscountPercentage(),
                subscription.isFreeDelivery()
        );
    }
    @Scheduled(cron = "0 0 0 * * ?")  //  Runs daily at midnight
    public void markExpiredSubscriptions() {
        List<Subscription> subscriptions = subscriptionRepository.findAll();
        for (Subscription sub : subscriptions) {
            if (sub.getEndDate().isBefore(LocalDate.now()) && sub.getStatus() == Subscription.Status.ACTIVE) {
                sub.setStatus(Subscription.Status.EXPIRED);
                subscriptionRepository.save(sub);
            }
        }
    }

}