package com.example.shortletBackend.controllers;

import com.example.shortletBackend.entities.Apartments;
import com.example.shortletBackend.enums.State;
import com.example.shortletBackend.repositories.ApartmentRepo;
import lombok.AllArgsConstructor;
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

    //get all hotels
    @GetMapping("/homes")
    public ResponseEntity getAllHomes(){
        return ResponseEntity.ok(apartmentRepo.findAll());
    }

    @GetMapping("/verified_homes")
    public ResponseEntity<ArrayList> getAllVerifiedHomes(){
        return ResponseEntity.ok(apartmentRepo.findAllByStateIs(State.VERIFIED));
    }

    @GetMapping("/hotel/")
    public ResponseEntity getHotel(@RequestParam("house_id") long id ){
        Optional<Apartments> apartments = apartmentRepo.findById(id);
        if (apartments.isPresent()){
            return ResponseEntity.ok(apartments.get());
        }else {
            return (ResponseEntity) ResponseEntity.noContent();
        }

    }
}
