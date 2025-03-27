package com.lomeu.mony.mapper;

import com.lomeu.mony.dto.AddressDTO;
import com.lomeu.mony.model.Address;

public class AddressMapper {
    public static Address toEntity(AddressDTO addressDTO) {
        Address address = new Address();
        address.setId(addressDTO.getId());
        address.setCep(addressDTO.getCep());
        address.setStreet(addressDTO.getStreet());
        address.setNumber(addressDTO.getNumber());
        address.setComplement(addressDTO.getComplement());
        address.setNeighborhood(addressDTO.getNeighborhood());
        address.setCity(addressDTO.getCity());
        address.setState(addressDTO.getState());
        return address;
    }

    public static AddressDTO toDTO(Address address) {
        return new AddressDTO(
                address.getId(),
                address.getCep(),
                address.getStreet(),
                address.getNumber(),
                address.getComplement(),
                address.getNeighborhood(),
                address.getCity(),
                address.getState(),
                address.getUser().getId());
    }
}
