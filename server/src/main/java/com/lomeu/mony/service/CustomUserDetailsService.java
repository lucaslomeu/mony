package com.lomeu.mony.service;

import java.util.ArrayList;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.lomeu.mony.model.MonyUser;
import com.lomeu.mony.repository.MonyUserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final MonyUserRepository monyUserRepository;

    public CustomUserDetailsService(MonyUserRepository monyUserRepository) {
        this.monyUserRepository = monyUserRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        MonyUser user = monyUserRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        return new User(
                user.getEmail(),
                user.getPassword(),
                new ArrayList<>());
    }
}
