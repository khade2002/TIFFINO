package com.tiffino.Tiffino_user_subscription.service;

import com.tiffino.Tiffino_user_subscription.dto.SubscriptionDTO;
import com.tiffino.Tiffino_user_subscription.entity.Subscription;
import java.util.List;

public interface SubscriptionService {

    Subscription createSubscription(Subscription subscription);
    Subscription getSubscription(Long subscriptionid);
    List<Subscription> getAllSubscriptions();
    void deleteSubscription(Long subscriptionid);

    void switchSubscription(Long subscriptionid, String newPlanType, int durationInDays, String frequency);

    void renewSubscription(Long subscriptionid, int durationInDays);

    List<SubscriptionDTO> getAllSubscriptionsWithAllergies();

    //  Get Subscription for Review
    SubscriptionDTO getSubscriptionForReview(Long subscriptionid);

    SubscriptionDTO getSubscriptionForReviewById(Long subscriptionid); // by subscriptionId
}
