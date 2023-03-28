package com.example.shortletBackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

// reservation dto without apartment details
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ReservationNoApartmentDTO {
    private int id;
    private Date checkInDate;
    private Date checkOutDate;

}
