package com.example.shortletBackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Lob;

@AllArgsConstructor @NoArgsConstructor
@Data
public class UsersDTO {

    private long id;
    private String name;
    private String phoneNo;
    private String email;


}
