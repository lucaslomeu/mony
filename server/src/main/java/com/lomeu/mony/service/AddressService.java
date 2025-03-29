package com.lomeu.mony.service;

import com.lomeu.mony.dto.AddressDTO;
import com.lomeu.mony.mapper.AddressMapper;
import com.lomeu.mony.model.Address;
import com.lomeu.mony.model.MonyUser;
import com.lomeu.mony.repository.AddressRepository;
import com.lomeu.mony.repository.MonyUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AddressService {
    private final AddressRepository addressRepository;
    private final MonyUserRepository monyUserRepository;

    public AddressDTO save(AddressDTO addressDTO) {
       Address address = AddressMapper.toEntity(addressDTO);
       MonyUser user = monyUserRepository.findById(addressDTO.getUserId()).orElseThrow(() -> new RuntimeException("User not found"));
       address.setUser(user);
       addressRepository.save(address);
       return AddressMapper.toDTO(address);
    }

    public AddressDTO findByUserId(Long id) {
      Address address = addressRepository.findByUserId(id).orElseThrow(() -> new RuntimeException("Address not found"));
      return AddressMapper.toDTO(address);
    }

    public void update(Long id, AddressDTO addressDTO) {
        Address address = addressRepository.findById(id).orElseThrow(() -> new RuntimeException("Address not found"));
        Address updated = AddressMapper.toEntity(addressDTO);
        updated.setId(address.getId());
        MonyUser user = monyUserRepository.findById(addressDTO.getUserId()).orElseThrow(() -> new RuntimeException("User not found"));
        updated.setUser(user);
        addressRepository.save(address);
    }

    public void delete(Long id) {
        Address address = addressRepository.findById(id).orElseThrow(() -> new RuntimeException("Address not found"));
        addressRepository.delete(address);
    }
}
