package com.example.shortletBackend.dto;

import com.example.shortletBackend.entities.Apartments;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ReservationDTO {

    private int id;
    private Date checkIn;
    private Date checkOut;

    private HomeDTO apartments;
}
