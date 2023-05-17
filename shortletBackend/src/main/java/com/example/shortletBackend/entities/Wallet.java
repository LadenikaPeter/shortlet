package com.example.shortletBackend.entities;

import lombok.*;

import javax.persistence.*;

@AllArgsConstructor @Getter @Setter
@ToString  @NoArgsConstructor @Entity
public class Wallet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private int balance;
    @OneToOne
    private Users user;

}
