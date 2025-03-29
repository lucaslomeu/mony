package com.lomeu.mony.service;

import com.lomeu.mony.dto.MonyUserDTO;
import com.lomeu.mony.mapper.UserMapper;
import com.lomeu.mony.model.MonyUser;
import com.lomeu.mony.repository.MonyUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MonyUserService {

    private final MonyUserRepository monyUserRepository;

    public MonyUserDTO save(MonyUserDTO monyUserDTO) {
        MonyUser user = UserMapper.toEntity(monyUserDTO);
        monyUserRepository.save(user);
        return UserMapper.toDTO(user);
    }

    public MonyUserDTO findById(Long id) {
        MonyUser user = monyUserRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        return UserMapper.toDTO(user);
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
