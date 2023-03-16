package com.example.shortletBackend.controllers;

import com.example.shortletBackend.dto.ReservationDTO;
import com.example.shortletBackend.entities.Apartments;
import com.example.shortletBackend.entities.Reservation;
import com.example.shortletBackend.repositories.ApartmentRepo;
import com.example.shortletBackend.repositories.ReservationRepo;
import com.example.shortletBackend.repositories.UserRepo;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Arrays;

@RestController
@CrossOrigin
@AllArgsConstructor
public class ReservationController {
    private final ReservationRepo reservationRepo;
    private final ApartmentRepo apartmentRepo;
    private final UserRepo userRepo;
    private final ModelMapper mapper;

    @GetMapping("/reservation")
    public ResponseEntity getAllReservation(){
        return ResponseEntity.ok(reservationRepo.findAll());
    }

    @GetMapping("/home/reservation/")
    public ResponseEntity getReservationByHomes(@RequestParam("email")String email,@RequestParam("apartment_id")long id){
        ArrayList<ReservationDTO> reservationDTOS = new ArrayList<>();
        ArrayList<Reservation> reservations= new ArrayList<>(reservationRepo.findAllByApartment(apartmentRepo.findById(id).get()));
        for (Reservation reserve:reservations
             ) {

            reservationDTOS.add(mapper.map(reserve, ReservationDTO.class));
        }
        return ResponseEntity.ok(reservationDTOS);
    }

}
