package com.example.shortletBackend.controllers;

import com.example.shortletBackend.entities.Apartments;
import com.example.shortletBackend.entities.Reservation;
import com.example.shortletBackend.entities.Users;
import com.example.shortletBackend.enums.Role;
import com.example.shortletBackend.repositories.ApartmentRepo;
import com.example.shortletBackend.repositories.ReservationRepo;
import com.example.shortletBackend.repositories.UserRepo;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin
@AllArgsConstructor
public class UserController {
    private final UserRepo userRepo;
    private final ApartmentRepo apartmentRepo;
    private final ReservationRepo reservationRepo;
    private final ModelMapper mapper;


    @GetMapping("/{user_email}")
    public ResponseEntity getUser(@PathVariable("user_email")String email){
        return ResponseEntity.of(userRepo.findUsersByEmail(email));
    }

    @PostMapping("/signup")
    public ResponseEntity signUp(@RequestBody Users users){
        if (!userRepo.findUsersByEmail(users.getEmail()).isPresent()) {
            users.setRole(Role.USER);
            userRepo.save(users);
        }
        return ResponseEntity.ok(users);
    }

    @PutMapping("/update_user/")
    public ResponseEntity updateUser(@RequestParam("user_email")String email,
         @RequestBody Users users){
        Optional<Users> oldInfo= userRepo.findUsersByEmail(email);
        if (oldInfo.isPresent()){
            if (users.getPicture() != null) {
                oldInfo.get().setPicture(users.getPicture());
            }
            if (users.getPhoneNo() != null) {
                oldInfo.get().setPhoneNo(users.getPhoneNo());
            }
            if (users.getName() != null) {
                oldInfo.get().setName(users.getName());
            }

            userRepo.save(oldInfo.get());
            return ResponseEntity.ok("Successfully updated profile");
        }
        else {
            return (ResponseEntity) ResponseEntity.notFound();
        }

    }

    @PutMapping("/addReservation/")
    public ResponseEntity addReservation(@RequestBody Reservation reservation,
         @RequestParam("user_email")String email,@RequestParam("apartment_id") long home_id){
        Optional<Users> user = userRepo.findUsersByEmail(email);
        Optional<Apartments> apartments= apartmentRepo.findById(home_id);

        if(user.isPresent()){
            if(apartments.isPresent()){

                reservation.setUsers(user.get());
                reservation.setApartment(apartments.get());
                user.get().getReservationSet().add(reservation);
                apartments.get().getReservations().add(reservation);
                apartmentRepo.save(apartments.get());
                reservationRepo.save(reservation);
                userRepo.save(user.get());
                return ResponseEntity.ok("Successfully reserved");
            }else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("The house can not be found");
            }
        }else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("The user can not be found");
        }

    }

    @GetMapping("/reservation/")
    public ResponseEntity getAllUserReservation(@RequestParam("email")String email){
//        ArrayList<ReservationDTO> reservationDTOS = new ArrayList<>();
//        for (Reservation reservation: ){
//            reservationDTOS.add(mapper.map(reservation, ReservationDTO.class));
//        }
        return ResponseEntity.ok(reservationRepo.findAllByUsers(userRepo.findUsersByEmail(email).get()));
    }

}
