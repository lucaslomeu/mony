package com.lomeu.mony.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MonyUserDTO {
    private Long id;
    private String name;
    private String email;
    private String password;
}
