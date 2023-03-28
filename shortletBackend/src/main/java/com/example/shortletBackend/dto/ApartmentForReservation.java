package com.example.shortletBackend.dto;

import com.example.shortletBackend.entities.Pictures;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Data @AllArgsConstructor @NoArgsConstructor
public class ApartmentForReservation {
    private int id;
    private String name;
    private String address;
    private String state;
    private String country;
    private Set<Pictures> pictures = new HashSet<>();
}
