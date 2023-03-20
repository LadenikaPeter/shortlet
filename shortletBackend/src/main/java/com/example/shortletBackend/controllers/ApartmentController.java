package com.example.shortletBackend.controllers;

import com.example.shortletBackend.dto.ApartmentsDTO;
import com.example.shortletBackend.entities.Apartments;
import com.example.shortletBackend.entities.Pictures;
import com.example.shortletBackend.entities.Users;
import com.example.shortletBackend.enums.HomeState;
import com.example.shortletBackend.enums.Status;
import com.example.shortletBackend.repositories.ApartmentRepo;
import com.example.shortletBackend.repositories.PicturesRepository;
import com.example.shortletBackend.repositories.UserRepo;
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
public class ApartmentController {
    private final ApartmentRepo apartmentRepo;
    private final PicturesRepository picRepo;
    private final UserRepo userRepo;
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
        for (Apartments hotel:apartmentRepo.findAllByHomeStateIs(HomeState.VERIFIED)
        ) {
            hotelList.add(mapper.map(hotel, ApartmentsDTO.class));
        }
        return ResponseEntity.ok(hotelList);
    }

    @GetMapping("/home/")
    public ResponseEntity getHotel(@RequestParam("house_id") long id ){
        Optional<Apartments> apartments = apartmentRepo.findById(id);
        if (apartments.isPresent()){
            return ResponseEntity.ok(apartments.get());
        }else {
            return (ResponseEntity) ResponseEntity.noContent();
        }

    }

    //user creating a new home
    @PostMapping("/addHome/")
    public ResponseEntity addHome(@RequestParam("user_email") String email, @RequestBody Apartments apartments){
        Optional<Users> users= userRepo.findUsersByEmail(email);
        if (users.isPresent()) {
            if (apartments.getPictures() != null) {
                for (Pictures picture: apartments.getPictures()
                ) {
                    picRepo.save(picture);
                }

            }

            apartments.setStatus(Status.UNOCCUPIED);
            apartments.setHomeState(HomeState.UNVERIFIED);
            apartments.setHouseRefCode(apartments.getAddress().substring(0,2),apartmentRepo.findAll().size());
            users.get().getApartmentsSet().add(apartments);
            apartments.setUsers(users.get());
            userRepo.save(users.get());
            apartmentRepo.save(apartments);
            return ResponseEntity.ok(apartments+" this is added");
        }else {
            return new ResponseEntity<>("You should really signup or login else you won't" +
            " be able to do this ",HttpStatus.FORBIDDEN);
        }

    }

    @PutMapping("/home/picture/delete")
    public ResponseEntity deleteHousePictures(@RequestParam("picture_id")long picture_id){
        picRepo.deleteById(picture_id);
        return ResponseEntity.ok("Successfully deleted image");


    }


}
