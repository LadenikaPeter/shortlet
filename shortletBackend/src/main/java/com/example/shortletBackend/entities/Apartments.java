package com.example.shortletBackend.entities;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.*;

import javax.persistence.*;

import com.example.shortletBackend.enums.State;

import java.util.HashSet;
import java.util.Set;

@Entity@Getter @Setter@ToString
@NoArgsConstructor @AllArgsConstructor
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "id")
public class Apartments {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;
    private String name;
    private String address;
    private String houseRefCode;
    private State state;
    private int price;
    private double rating;
    private int maxNoOfGuests;

    @ManyToOne
//    @ToString.Exclude
    private Users users;

    @OneToMany(mappedBy = "apartment")
    private Set<Reservation> reservations = new HashSet<>();
    @OneToMany
    private Set<Pictures> pictures= new HashSet<>();


    public void setHouseRefCode(String name,int id) {
//        String name1= name.substring(0,5);

        this.houseRefCode = name + id;
    }


}
