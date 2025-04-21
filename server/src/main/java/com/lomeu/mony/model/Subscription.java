package com.lomeu.mony.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Subscription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private double price;
    private LocalDate startDate;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private MonyUser user;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "subscription_categories", joinColumns = @JoinColumn(name = "subscription_id"), inverseJoinColumns = @JoinColumn(name = "category_id"))
    private List<Category> categories;
}
