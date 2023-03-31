package com.example.shortletBackend.controllers;

import com.example.shortletBackend.dto.ReservationDTO;
import com.example.shortletBackend.dto.UsersDTO;
import com.example.shortletBackend.entities.Apartments;
import com.example.shortletBackend.entities.Reservation;
import com.example.shortletBackend.entities.Users;
import com.example.shortletBackend.enums.ReservationState;
import com.example.shortletBackend.enums.Role;
import com.example.shortletBackend.repositories.ApartmentRepository;
import com.example.shortletBackend.repositories.ReservationRepository;
import com.example.shortletBackend.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Optional;

@RestController
@CrossOrigin
@AllArgsConstructor
public class UserController {
    private final UserRepository userRepository;
    private final ApartmentRepository apartmentRepo;
    private final ReservationRepository reservationRepo;
    private final ModelMapper mapper;


    @GetMapping("/")
    public ResponseEntity getUser(@RequestHeader("user_email")String email){
        return ResponseEntity.of(userRepository.findUsersByEmail(email));
    }

    @PostMapping("/signup")
    public ResponseEntity signUp(@RequestBody Users users){
        Optional<Users> oldUser = userRepository.findUsersByEmail(users.getEmail());
        if (!oldUser.isPresent()) {//if the user does not exist it creates a new user
            users.setRole(Role.USER);
            userRepository.save(users);
            return ResponseEntity.ok(users);
        }else {// if it does exist, the user is then returned
            return ResponseEntity.ok(oldUser);
        }

    }

    @PutMapping("/update_user/")
    public ResponseEntity updateUser(@RequestHeader("user_email") String email,
         @RequestBody Users users){
        Optional<Users> oldInfo= userRepository.findUsersByEmail(email);
        if (oldInfo.isPresent()){

            if (users.getPhoneNo() != null) {
                oldInfo.get().setPhoneNo(users.getPhoneNo());
            }
            if (users.getName() != null) {
                oldInfo.get().setName(users.getName());
            }

            userRepository.save(oldInfo.get());
            return ResponseEntity.ok(mapper.map(oldInfo.get(), UsersDTO.class));
        }
        else {
            return (ResponseEntity) ResponseEntity.notFound();
        }

    }

    @PutMapping("/addReservation/")
    public ResponseEntity addReservation(@RequestBody Reservation reservation,
         @RequestParam("user_email")String email,@RequestParam("apartment_id") long home_id){
        Optional<Users> user = userRepository.findUsersByEmail(email);
        Optional<Apartments> apartments= apartmentRepo.findById(home_id);

        if(user.isPresent()){
            if(apartments.isPresent()){

                reservation.setUsers(user.get());
                reservation.setApartment(apartments.get());
                reservation.setReservationState(ReservationState.PENDING);
                user.get().getReservationSet().add(reservation);
                apartments.get().getReservations().add(reservation);

                apartmentRepo.save(apartments.get());
                reservationRepo.save(reservation);
                userRepository.save(user.get());
                return ResponseEntity.status(HttpStatus.ACCEPTED).body(reservation);
            }else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("The house can not be found");
            }
        }else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("The user can not be found");
        }

    }

    @GetMapping("/reservation/")
    public ResponseEntity getAllUserReservation(@RequestHeader("user_email")String email){
        ArrayList<ReservationDTO> reservationDTOS = new ArrayList<>();
        for (Reservation reservation: reservationRepo.findAllByUsers(userRepository.findUsersByEmail(email).get())){
            reservationDTOS.add(mapper.map(reservation, ReservationDTO.class));
        }
        return ResponseEntity.ok(reservationDTOS);

    }

    @GetMapping("/user/listings/")
    public ResponseEntity getAllUserHouses(@RequestHeader("user_email") String email){
        Optional<Users> users= userRepository.findUsersByEmail(email);
        if (users == null) {
            throw new RuntimeException("The user does not exist");
        }
        return ResponseEntity.ok(apartmentRepo.findAllByUsers(users.get())) ;
    }



}
