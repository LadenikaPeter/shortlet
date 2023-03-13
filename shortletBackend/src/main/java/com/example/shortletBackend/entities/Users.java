package com.example.shortletBackend.entities;

import com.example.shortletBackend.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    private String name;
    private String phoneNo;
    private String email;

    private Role role;

    @OneToMany(mappedBy = "users")
    private Set<Apartments> apartmentsSet = new HashSet<>();

    @OneToMany(mappedBy = "users")
    private Set<Reservation> reservationSet=new HashSet<>();
}
