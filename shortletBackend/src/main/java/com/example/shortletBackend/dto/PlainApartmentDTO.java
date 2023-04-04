package com.example.shortletBackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Lob;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PlainApartmentDTO {
    private int id;
    private String name;
    private String address;
    private String state;
    private String country;

}
