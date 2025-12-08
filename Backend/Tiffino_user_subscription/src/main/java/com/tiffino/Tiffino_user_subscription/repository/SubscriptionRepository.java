package com.tiffino.Tiffino_user_subscription.repository;

import com.tiffino.Tiffino_user_subscription.entity.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {
    List<Subscription> findBysubscriptionid(long subscriptionid); // <-- String type
}
