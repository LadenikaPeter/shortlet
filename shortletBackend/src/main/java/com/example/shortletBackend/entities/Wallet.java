package com.example.shortletBackend.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.OneToOne;

@AllArgsConstructor @Getter @Setter
@ToString
public class Wallet {

    private long id;
    private int balance;
    @OneToOne
    private Users user;

}
