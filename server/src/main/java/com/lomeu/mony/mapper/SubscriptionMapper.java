package com.lomeu.mony.mapper;

import com.lomeu.mony.dto.CategoryDTO;
import com.lomeu.mony.dto.SubscriptionDTO;
import com.lomeu.mony.model.MonyUser;
import com.lomeu.mony.model.Subscription;

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

        if (subscriptionDTO.getUserId() != null) {
            MonyUser user = new MonyUser();
            user.setId(subscriptionDTO.getUserId());
            subscription.setUser(user);
        }

        if (subscriptionDTO.getCategory() != null) {
            subscription.setCategory(CategoryMapper.toEntity(subscriptionDTO.getCategory()));
        }

        return subscription;
    }

    public static SubscriptionDTO toDTO(Subscription subscription) {
        Long userId = subscription.getUser() != null ? subscription.getUser().getId() : null;
        CategoryDTO categoryDTO = null;

        if (subscription.getCategory() != null) {
            categoryDTO = CategoryMapper.toDTO(subscription.getCategory());
        }

        return new SubscriptionDTO(
                subscription.getId(),
                subscription.getName(),
                subscription.getDescription(),
                subscription.getPrice(),
                subscription.getStartDate(),
                userId,
                categoryDTO);
    }

    public static List<SubscriptionDTO> toDTOList(List<Subscription> subscriptions) {
        return subscriptions.stream()
                .map(SubscriptionMapper::toDTO)
                .collect(Collectors.toList());
    }
}
