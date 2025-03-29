package com.lomeu.mony.mapper;

import com.lomeu.mony.dto.MonyUserDTO;
import com.lomeu.mony.model.MonyUser;

public class UserMapper {
    public static MonyUser toEntity(MonyUserDTO monyUserDTO) {
        return new MonyUser(monyUserDTO.getId(), monyUserDTO.getName(), monyUserDTO.getEmail(), monyUserDTO.getPassword());
    }

    public static MonyUserDTO toDTO(MonyUser user) {
        return new MonyUserDTO(user.getId(), user.getName(), user.getEmail(), user.getPassword());
    }
}
