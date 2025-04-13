package com.lomeu.mony.mapper;

import com.lomeu.mony.dto.AddressDTO;
import com.lomeu.mony.dto.MonyUserDTO;
import com.lomeu.mony.model.Address;
import com.lomeu.mony.model.MonyUser;

public class UserMapper {
    public static MonyUser toEntity(MonyUserDTO monyUserDTO) {
        AddressDTO addressDTO = monyUserDTO.getAddress();

        if (addressDTO == null) {
            throw new IllegalArgumentException("AddressDTO cannot be null");
        }

        Address address = AddressMapper.toEntity(addressDTO);

        MonyUser user = new MonyUser(monyUserDTO.getId(), monyUserDTO.getName(), monyUserDTO.getEmail(),
                monyUserDTO.getPassword(), address);

        address.setUser(user);

        return user;
    }

    public static MonyUserDTO toDTO(MonyUser user) {
        AddressDTO addressDTO = null;

        if (user.getAddress() != null) {
            addressDTO = AddressMapper.toDTO(user.getAddress());
        }

        return new MonyUserDTO(user.getId(), user.getName(), user.getEmail(), null, addressDTO);
    }
}
