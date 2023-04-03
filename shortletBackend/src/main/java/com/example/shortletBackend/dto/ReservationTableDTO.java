package com.example.shortletBackend.dto;

import lombok.*;

import java.util.Date;
import java.util.List;

@Data @AllArgsConstructor
@NoArgsConstructor
public class ReservationTableDTO {

    private long id;
    private String apartmentName;
    private long apartmentId;
    private String apartmentPicture;
    private String apartmentState;
    private String apartmentCountry;
    private Date checkInDate;
    private Date checkOutDate;

    private int price;

}
