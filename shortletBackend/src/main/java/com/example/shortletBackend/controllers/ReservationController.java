package com.example.shortletBackend.controllers;

import com.example.shortletBackend.repositories.ReservationRepo;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@AllArgsConstructor
public class ReservationController {
    private final ReservationRepo reservationRepo;

    @GetMapping("/reservation")
    public ResponseEntity getAllReservation(){
        return ResponseEntity.ok(reservationRepo.findAll());
    }


}
