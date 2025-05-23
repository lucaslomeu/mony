package com.lomeu.mony.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubscriptionDTO {
    private Long id;
    private String name;
    private String description;
    private double price;
    private LocalDate startDate;
    private Long userId;
    private List<String> categories;
}
