package com.lomeu.mony.service;

import com.lomeu.mony.dto.MonyUserDTO;
import com.lomeu.mony.mapper.UserMapper;
import com.lomeu.mony.model.MonyUser;
import com.lomeu.mony.repository.MonyUserRepository;
import lombok.RequiredArgsConstructor;

import java.security.Principal;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MonyUserService {

    private final MonyUserRepository monyUserRepository;
    private final PasswordEncoder passwordEncoder;

    public MonyUserDTO save(MonyUserDTO monyUserDTO) {
        String encodedPassword = passwordEncoder.encode(monyUserDTO.getPassword());
        monyUserDTO.setPassword(encodedPassword);

        MonyUser user = UserMapper.toEntity(monyUserDTO);

        monyUserRepository.save(user);
        user.setPassword(null);
        return UserMapper.toDTO(user);
    }

    public MonyUserDTO findById(Long id) {
        MonyUser user = monyUserRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        return UserMapper.toDTO(user);
    }

    public MonyUserDTO getCurrentUser(Principal principal) {
        MonyUser currentUser = monyUserRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        currentUser.setPassword(null);
        return UserMapper.toDTO(currentUser);
    }

    public void update(Long id, MonyUserDTO monyUserDTO) {
        MonyUser user = monyUserRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        user.setName(monyUserDTO.getName());
        user.setEmail(monyUserDTO.getEmail());
        user.setPassword(monyUserDTO.getPassword());
        monyUserRepository.save(user);
    }

    public void delete(Long id) {
        MonyUser user = monyUserRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        monyUserRepository.delete(user);
    }
}
