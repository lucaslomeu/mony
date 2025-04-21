package com.lomeu.mony.service;

import com.lomeu.mony.dto.SubscriptionDTO;
import com.lomeu.mony.mapper.SubscriptionMapper;
import com.lomeu.mony.model.Category;
import com.lomeu.mony.model.MonyUser;
import com.lomeu.mony.model.Subscription;
import com.lomeu.mony.repository.SubscriptionRepository;
import com.lomeu.mony.repository.CategoryRepository;
import com.lomeu.mony.repository.MonyUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SubscriptionService {
    private final SubscriptionRepository subscriptionRepository;
    private final MonyUserRepository monyUserRepository;
    private final CategoryRepository categoryRepository;

    public SubscriptionDTO save(SubscriptionDTO subscriptionDTO) {
        MonyUser user = monyUserRepository.findById(subscriptionDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Subscription subscription = SubscriptionMapper.toEntity(subscriptionDTO);

        subscription.setUser(user);

        if (subscriptionDTO.getCategories() != null) {
            List<Category> categories = subscriptionDTO.getCategories().stream()
                    .map(categoryName -> categoryRepository.findByNameAndUserId(categoryName, user.getId())
                            .orElseGet(() -> {
                                Category newCategory = new Category();
                                newCategory.setName(categoryName);
                                newCategory.setUser(user);
                                return categoryRepository.save(newCategory);
                            }))
                    .collect(Collectors.toList());

            subscription.setCategories(categories);
        }

        subscriptionRepository.save(subscription);
        return SubscriptionMapper.toDTO(subscription);
    }

    public SubscriptionDTO findById(Long id) {
        Subscription subscription = subscriptionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Subscription not found"));
        return SubscriptionMapper.toDTO(subscription);
    }

    public List<SubscriptionDTO> findByUserId(Long userId) {
        List<Subscription> subscriptions = subscriptionRepository.findByUserId(userId);
        return SubscriptionMapper.toDTOList(subscriptions);
    }

    public void update(Long id, SubscriptionDTO subscriptionDTO) {
        Subscription subscription = subscriptionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Subscription not found"));

        MonyUser user = monyUserRepository.findById(subscriptionDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        subscription.setName(subscriptionDTO.getName());
        subscription.setDescription(subscriptionDTO.getDescription());
        subscription.setPrice(subscriptionDTO.getPrice());
        subscription.setStartDate(subscriptionDTO.getStartDate());
        subscription.setUser(user);

        if (subscriptionDTO.getCategories() != null) {
            List<Category> categories = subscriptionDTO.getCategories().stream()
                    .map(name -> categoryRepository.findByNameAndUserId(name, user.getId())
                            .orElseGet(() -> {
                                Category category = new Category();
                                category.setName(name);
                                category.setUser(user);
                                return categoryRepository.save(category);
                            }))
                    .collect(Collectors.toList());

            subscription.setCategories(categories);
        }

        subscriptionRepository.save(subscription);
    }

    public void delete(Long id) {
        Subscription subscription = subscriptionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Subscription not found"));
        subscriptionRepository.delete(subscription);
    }

}
