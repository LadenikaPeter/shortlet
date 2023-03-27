package com.example.shortletBackend.entities;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@ToString
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double review;

    @ManyToOne
    private Users users;
    @ManyToOne
    private Apartments apartments;

}
