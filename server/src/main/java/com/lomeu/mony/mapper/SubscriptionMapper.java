package com.lomeu.mony.mapper;

import com.lomeu.mony.dto.SubscriptionDTO;
import com.lomeu.mony.model.Category;
import com.lomeu.mony.model.MonyUser;
import com.lomeu.mony.model.Subscription;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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
        List<String> categoryNames = subscription.getCategories() != null
                ? subscription.getCategories().stream()
                        .map(Category::getName)
                        .collect(Collectors.toList())
                : new ArrayList<>();

        return new SubscriptionDTO(
                subscription.getId(),
                subscription.getName(),
                subscription.getDescription(),
                subscription.getPrice(),
                subscription.getStartDate(),
                subscription.getUser() != null ? subscription.getUser().getId() : null,
                categoryNames);
    }

    public static List<SubscriptionDTO> toDTOList(List<Subscription> subscriptions) {
        return subscriptions.stream()
                .map(SubscriptionMapper::toDTO)
                .collect(Collectors.toList());
    }
}
