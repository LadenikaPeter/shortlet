package com.example.shortletBackend.entities;

import com.example.shortletBackend.enums.Role;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.*;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

//@Getter @Setter @ToString
@Entity @ToString
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "id")
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    private String name;
    private String phoneNo;
    private String email;
    @Lob
    private String picture;
    private Role role;

    @OneToMany(mappedBy = "users")
    @ToString.Exclude
    private Set<Apartments> apartmentsSet = new HashSet<>();

    @OneToMany(mappedBy = "users")
    private Set<Reservation> reservationSet=new HashSet<>();
}
