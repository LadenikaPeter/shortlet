package com.example.shortletBackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Lob;
import java.util.HashSet;
import java.util.Set;

@AllArgsConstructor @NoArgsConstructor
@Data
public class UserDTO {

    private long id;
    private String name;
    private String phoneNo;
    private String email;
    @Lob
    private String picture;

//    private Set<ReservationDTO> reservation = new HashSet<>();
//    private Set<HomeDTO> apartments=new HashSet<>();

}
