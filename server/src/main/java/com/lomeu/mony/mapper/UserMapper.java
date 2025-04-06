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

        Address address = new Address(addressDTO.getId(), addressDTO.getCep(), addressDTO.getStreet(),
                addressDTO.getNumber(), addressDTO.getComplement(), addressDTO.getNeighborhood(),
                addressDTO.getCity(), addressDTO.getState(), null);

        MonyUser user = new MonyUser(monyUserDTO.getId(), monyUserDTO.getName(), monyUserDTO.getEmail(),
                monyUserDTO.getPassword(), address);

        address.setUser(user);

        return user;
    }

    public static MonyUserDTO toDTO(MonyUser user) {
        Address address = user.getAddress();

        AddressDTO addressDTO = new AddressDTO(address.getId(), address.getCep(), address.getStreet(),
                address.getNumber(), address.getComplement(), address.getNeighborhood(),
                address.getCity(), address.getState(), null);

        return new MonyUserDTO(user.getId(), user.getName(), user.getEmail(), null, addressDTO);
    }
}
