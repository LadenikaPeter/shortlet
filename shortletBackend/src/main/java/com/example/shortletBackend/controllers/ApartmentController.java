package com.example.shortletBackend.controllers;

import com.example.shortletBackend.dto.ApartmentsDTO;
import com.example.shortletBackend.entities.*;
import com.example.shortletBackend.enums.HomeState;
import com.example.shortletBackend.enums.PropertyType;
import com.example.shortletBackend.enums.Status;
import com.example.shortletBackend.repositories.AmenitiesRepository;
import com.example.shortletBackend.repositories.ApartmentRepository;
import com.example.shortletBackend.repositories.PicturesRepository;
import com.example.shortletBackend.repositories.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin
@AllArgsConstructor
public class ApartmentController {
    private final ApartmentRepository apartmentRepo;
    private final PicturesRepository picRepo;
    private final UserRepository userRepository;
    private final AmenitiesRepository amenitiesRepo;
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

    //get all verified homes of a specified property type
    @GetMapping("/verified_homes/search/")
    public ResponseEntity getAllVerifiedHomesWithPropertyType(@RequestParam("property_type")PropertyType propertyType){
        ArrayList<ApartmentsDTO> hotelList = new ArrayList<>();
        for (Apartments hotel:apartmentRepo.findAllByPropertyTypeIsAndHomeState(propertyType,HomeState.VERIFIED)
        ) {
            hotelList.add(mapper.map(hotel, ApartmentsDTO.class));
        }
        return ResponseEntity.ok(hotelList);
    }

    @GetMapping("/verified_homes/search")
    public ResponseEntity getAllVerifiedHomesWithNumberOfGuest(@RequestParam("number_of_guests")int number){
        ArrayList<ApartmentsDTO> hotelList = new ArrayList<>();
        for (Apartments hotel:apartmentRepo.findAllByMaxNoOfGuestsGreaterThanEqualAndHomeState(number,HomeState.VERIFIED)
        ) {
            hotelList.add(mapper.map(hotel, ApartmentsDTO.class));
        }
        return ResponseEntity.ok(hotelList);
    }
    @GetMapping("/home/")
    public ResponseEntity getHotel(@RequestParam("house_id") long id ) throws IllegalAccessException, NoSuchFieldException{
        Optional<Apartments> apartments = apartmentRepo.findById(id);
        if (apartments.isPresent()){
            // return only amenities that have true as a reply
            ApartmentsDTO apartmentsDTO = mapper.map(apartments.get(),ApartmentsDTO.class);

            Map<String, Object> map= new ObjectMapper().convertValue(apartments.get().getAmenities(),Map.class);
            for (String key:map.keySet()) {
                if (map.get(key) == (Object) true) {
                    String amenityName= key.replaceAll("_"," ");
                    apartmentsDTO.getAmenities().add(amenityName.substring(0,1).toUpperCase()+amenityName.substring(1,amenityName.length()));
                }
            }

            return ResponseEntity.ok().body(apartmentsDTO);
        }else {
            return (ResponseEntity) ResponseEntity.noContent();
        }

    }

    //user creating a new home
    @PostMapping("/addHome/")
    public ResponseEntity addHome(@RequestHeader("user_email") String email, @RequestBody Apartments apartments){
        Optional<Users> users= userRepository.findUsersByEmail(email);
        if (users.isPresent()) {
            if (apartments.getPictures() != null) {
                for (Pictures picture: apartments.getPictures()
                ) {
                    picRepo.save(picture);
                }

            }
            if (apartments.getAmenities() != null) {
                amenitiesRepo.save(apartments.getAmenities());
            }
            apartments.setStatus(Status.UNOCCUPIED);
            apartments.setHomeState(HomeState.UNVERIFIED);
            apartments.setHouseRefCode(apartments.getAddress().substring(0,2),apartmentRepo.findAll().size());
            users.get().getApartmentsSet().add(apartments);
            apartments.setUsers(users.get());
            userRepository.save(users.get());
            apartmentRepo.save(apartments);
            return ResponseEntity.ok(apartments);
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
