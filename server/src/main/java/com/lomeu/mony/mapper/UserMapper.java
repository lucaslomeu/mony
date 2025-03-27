package com.lomeu.mony.mapper;

import com.lomeu.mony.dto.UserDTO;
import com.lomeu.mony.model.User;

public class UserMapper {
    public static User toEntity(UserDTO userDTO) {
        return new User(userDTO.getId(), userDTO.getName(), userDTO.getEmail(), userDTO.getPassword());
    }

    public static UserDTO toDTO(User user) {
        return new UserDTO(user.getId(), user.getName(), user.getEmail(), user.getPassword());
    }
}
