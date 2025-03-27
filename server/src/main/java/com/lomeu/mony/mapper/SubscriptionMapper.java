package com.lomeu.mony.mapper;

import com.lomeu.mony.dto.SubscriptionDTO;
import com.lomeu.mony.model.Subscription;

public class SubscriptionMapper {
    public static Subscription toEntity(SubscriptionDTO subscriptionDTO) {
        Subscription subscription = new Subscription();
        subscription.setId(subscriptionDTO.getId());
        subscription.setName(subscriptionDTO.getName());
        subscription.setDescription(subscriptionDTO.getDescription());
        subscription.setPrice(subscriptionDTO.getPrice());
        subscription.setStartDate(subscriptionDTO.getStartDate());
        return subscription;
    }

    public static SubscriptionDTO toDTO(Subscription subscription) {
        return new SubscriptionDTO(
                subscription.getId(),
                subscription.getName(),
                subscription.getDescription(),
                subscription.getPrice(),
                subscription.getStartDate(),
                subscription.getUser().getId());
    }
}
