package com.example.shortletBackend.controllers;

import com.example.shortletBackend.dto.ApartmentsDTO;
import com.example.shortletBackend.entities.Apartments;
import com.example.shortletBackend.enums.HomeState;
import com.example.shortletBackend.repositories.ApartmentRepo;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Optional;

@RestController
@CrossOrigin
@AllArgsConstructor
public class ApartmentController {
    private final ApartmentRepo apartmentRepo;
    private final ModelMapper mapper;

    //get all homes
    @GetMapping("/homes")
    public ResponseEntity getAllHomes(){
        return ResponseEntity.ok(apartmentRepo.findAll());
    }

    //get all verified homes
    @GetMapping("/verified_homes")
    public ResponseEntity<ArrayList> getAllVerifiedHomes(){
        ArrayList<ApartmentsDTO> hotelList = new ArrayList<>();
        for (Apartments hotel:apartmentRepo.findAllByStateIs(HomeState.VERIFIED)
        ) {
            hotelList.add(mapper.map(hotel, ApartmentsDTO.class));
        }
        return ResponseEntity.ok(hotelList);
    }

    @GetMapping("/home/")
    public ResponseEntity getHotel(@RequestParam("house_id") long id ){
        Optional<Apartments> apartments = apartmentRepo.findById(id);
        if (apartments.isPresent()){
            return ResponseEntity.ok(mapper.map(apartments.get(), ApartmentsDTO.class) );
        }else {
            return (ResponseEntity) ResponseEntity.noContent();
        }

    }


}
