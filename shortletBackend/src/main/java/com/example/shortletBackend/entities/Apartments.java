package com.example.shortletBackend.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import com.example.shortletBackend.enums.State;

import java.util.HashSet;
import java.util.Set;

@Entity@Data
@NoArgsConstructor @AllArgsConstructor
public class Apartments {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long homeId;
    private String name;
    private String address;
    private String houseRefCode;
    private State state;
    private int price;
    private double rating;

    @ManyToOne
    private Users users;

    @OneToMany(mappedBy = "reservation")
    private Set<Reservation> reservations = new HashSet<>();
    @OneToMany
    private Set<Pictures> pictures= new HashSet<>();


    public void setHouseRefCode(String name,int id) {
//        String name1= name.substring(0,5);

        this.houseRefCode = name + id;
    }


}
