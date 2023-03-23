package com.example.shortletBackend.entities;

import com.example.shortletBackend.enums.HouseType;
import com.example.shortletBackend.enums.PropertyType;
import com.example.shortletBackend.enums.Status;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.*;

import javax.persistence.*;

import com.example.shortletBackend.enums.HomeState;

import java.util.EnumSet;
import java.util.HashSet;
import java.util.Set;

@Entity@Getter @Setter@ToString
@AllArgsConstructor
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "id")
public class Apartments {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;
    private String name;
    @Lob
    private String description;
    private String address;
    private String country;
    private String continent;
    private String houseRefCode;
    @Enumerated(EnumType.STRING)
    private HomeState homeState;
    @Enumerated(EnumType.STRING)
    private Status status;
    private int price;
    private double rating;
    private int maxNoOfGuests;
    private int noOfBedrooms;
    private int noOfBeds;
    private int noOfBathrooms;

    @Enumerated(EnumType.STRING)
    private PropertyType propertyType;
    @Enumerated(EnumType.STRING)
    private HouseType houseType;

    @OneToOne
    private Amenities amenities;


    @ManyToOne
    private Users users;

    @OneToMany(mappedBy = "apartment")//,cascade = CascadeType.ALL)
    private Set<Reservation> reservations = new HashSet<>();
    @OneToMany//(cascade = CascadeType.ALL)
    private Set<Pictures> pictures = new HashSet<>();


    public void setHouseRefCode(String name, int id) {
        this.houseRefCode = name + id;
    }

    public Apartments() {
        this.status = Status.UNOCCUPIED;
    }

}
