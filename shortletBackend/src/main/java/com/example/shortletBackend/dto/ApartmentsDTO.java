package com.example.shortletBackend.dto;

import com.example.shortletBackend.entities.Amenities;
import com.example.shortletBackend.entities.Pictures;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Lob;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

@AllArgsConstructor @NoArgsConstructor
@Data
public class ApartmentsDTO {
    private int id;
    private String name;
    private String address;
    @Lob
    private String description;
    private int price;
    private double rating;

    private String houseRefCode;
    private int maxNoOfGuests;
    private int noOfBedrooms;
    private int noOfBeds;
    private int noOfBathrooms;

    private String country;
    private String continent;
    private UsersDTO users;

    private Amenities amenities;
    private ArrayList reservedDates = new ArrayList<>();
    private Set<Pictures> pictures = new HashSet<>();
}
