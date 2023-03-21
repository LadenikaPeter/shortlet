package com.example.shortletBackend.entities;

import com.example.shortletBackend.enums.ReservationState;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="dd-MM-yyyy")
    private Date checkInDate;

    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="dd-MM-yyyy")
    private Date checkOutDate;
    private int price;

    @Enumerated(EnumType.STRING)
    private ReservationState reservationState;

    @ManyToOne
    private Users users;

    @ManyToOne
    private Apartments apartment;



}
