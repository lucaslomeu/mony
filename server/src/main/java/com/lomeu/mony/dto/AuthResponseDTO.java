package com.lomeu.mony.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponseDTO {
    private Long id;
    private String token;
    private String name;
    private String email;
}
