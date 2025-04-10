package com.lomeu.mony.controller;

import com.lomeu.mony.dto.SubscriptionDTO;
import com.lomeu.mony.model.MonyUser;
import com.lomeu.mony.repository.MonyUserRepository;
import com.lomeu.mony.service.SubscriptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/v1/subscription")
@RequiredArgsConstructor
public class SubscriptionController {

    private final SubscriptionService subscriptionService;
    private final MonyUserRepository monyUserRepository;

    @PostMapping
    public ResponseEntity<SubscriptionDTO> save(@RequestBody SubscriptionDTO subscriptionDTO, Principal principal) {
        MonyUser user = monyUserRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        subscriptionDTO.setUserId(user.getId());

        SubscriptionDTO subscription = subscriptionService.save(subscriptionDTO);
        return ResponseEntity.ok(subscription);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SubscriptionDTO> update(@PathVariable Long id, @RequestBody SubscriptionDTO subscriptionDTO) {
        subscriptionService.update(id, subscriptionDTO);
        return ResponseEntity.ok(subscriptionDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SubscriptionDTO> getSubscriptionById(@PathVariable Long id) {
        SubscriptionDTO subscription = subscriptionService.findById(id);
        return ResponseEntity.ok(subscription);
    }

    @GetMapping("/user/subscriptions")
    public ResponseEntity<List<SubscriptionDTO>> getSubscriptionsByUserId(Principal principal) {
        MonyUser user = monyUserRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<SubscriptionDTO> subscriptions = subscriptionService.findByUserId(user.getId());
        return ResponseEntity.ok(subscriptions);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        subscriptionService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
