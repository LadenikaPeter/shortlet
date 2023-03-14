package com.example.shortletBackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor @AllArgsConstructor
@Data
public class ReservationHomeDTO {
    private int id;
    private String name;
    private String address;
    private int price;
    private double rating;
}
