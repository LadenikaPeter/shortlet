package com.example.shortletBackend.dto;

import com.example.shortletBackend.entities.Pictures;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @AllArgsConstructor @NoArgsConstructor
public class ApartmentForListing {
    private int id;
    private String name;
    private String address;
    private String state;
    private String country;
    private Pictures pictures;
    private int maxNoOfGuests;
    private int noOfBedrooms;
    private int noOfBeds;
    private int noOfBathrooms;

}
