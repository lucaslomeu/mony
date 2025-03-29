package com.lomeu.mony.service;

import com.lomeu.mony.dto.SubscriptionDTO;
import com.lomeu.mony.mapper.SubscriptionMapper;
import com.lomeu.mony.model.MonyUser;
import com.lomeu.mony.model.Subscription;
import com.lomeu.mony.repository.SubscriptionRepository;
import com.lomeu.mony.repository.MonyUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SubscriptionService {
    private final SubscriptionRepository subscriptionRepository;
    private final MonyUserRepository monyUserRepository;

    public void save(SubscriptionDTO subscriptionDTO) {
        Subscription subscription = SubscriptionMapper.toEntity(subscriptionDTO);
        MonyUser user = monyUserRepository.findById(subscriptionDTO.getUserId()).orElseThrow(() -> new RuntimeException("User not found"));
        subscription.setUser(user);
        subscriptionRepository.save(subscription);
    }

    public SubscriptionDTO findById(Long id) {
        Subscription subscription = subscriptionRepository.findById(id).orElseThrow(() -> new RuntimeException("Subscription not found"));
        return SubscriptionMapper.toDTO(subscription);
    }

    public void update(Long id, SubscriptionDTO subscriptionDTO) {
        Subscription subscription = subscriptionRepository.findById(id).orElseThrow(() -> new RuntimeException("Subscription not found"));
        Subscription updated = SubscriptionMapper.toEntity(subscriptionDTO);
        updated.setId(subscription.getId());
        MonyUser user = monyUserRepository.findById(subscriptionDTO.getUserId()).orElseThrow(() -> new RuntimeException("User not found"));
        updated.setUser(user);
        subscriptionRepository.save(subscription);
    }

    public void delete(Long id) {
        Subscription subscription = subscriptionRepository.findById(id).orElseThrow(() -> new RuntimeException("Subscription not found"));
        subscriptionRepository.delete(subscription);
    }

}
