package com.lomeu.mony.repository;

import com.lomeu.mony.model.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {
    // Custom query to find subscriptions by user ID
    List<Subscription> findByUserId(Long userId);
}
