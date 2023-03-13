package com.example.shortletBackend.dto;

import com.example.shortletBackend.entities.Pictures;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@AllArgsConstructor @NoArgsConstructor
@Data
public class HomeDTO {
    private int id;
    private String name;
    private String address;
    private int price;
    private double rating;
    private Set<Pictures> pictures;
}
