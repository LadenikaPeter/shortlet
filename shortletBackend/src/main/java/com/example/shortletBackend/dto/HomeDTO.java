package com.example.shortletBackend.dto;

import com.example.shortletBackend.entities.Pictures;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@AllArgsConstructor @NoArgsConstructor
@Data
public class HomeDTO {
    private int id;
    private String name;
    private String address;
    private int price;
    private double rating;

    private String houseRefCode;
    private UserDTO users;
    private Set<Pictures> pictures = new HashSet<>();
}
