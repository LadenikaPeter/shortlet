package com.example.shortletBackend.entities;

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

    private Date checkInDate;
    private Date checkOutDate;
    private int price;

    private boolean checkedIn ;
    private boolean checkedOut ;

    @ManyToOne
    private Users users;

    @ManyToOne
    private Apartments apartment;

    public Reservation() {
        this.checkedIn=false;
        this.checkedOut=false;
    }


}
