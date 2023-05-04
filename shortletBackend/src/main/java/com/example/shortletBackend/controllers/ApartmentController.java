package com.example.shortletBackend.controllers;

import com.example.shortletBackend.dto.ApartmentsDTO;
import com.example.shortletBackend.dto.PlainApartmentDTO;
import com.example.shortletBackend.dto.TextResponse;
import com.example.shortletBackend.entities.Apartments;
import com.example.shortletBackend.entities.Pictures;
import com.example.shortletBackend.entities.Users;
import com.example.shortletBackend.enums.HomeState;
import com.example.shortletBackend.enums.HouseType;
import com.example.shortletBackend.enums.PropertyType;
import com.example.shortletBackend.enums.Role;
import com.example.shortletBackend.repositories.AmenitiesRepository;
import com.example.shortletBackend.repositories.ApartmentRepository;
import com.example.shortletBackend.repositories.PicturesRepository;
import com.example.shortletBackend.repositories.UserRepository;
import com.example.shortletBackend.service.ApartmentService;
import com.example.shortletBackend.service.MailService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.util.ArrayList;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin
@AllArgsConstructor
public class ApartmentController {
    private final ApartmentService apartmentService;
    private final ApartmentRepository apartmentRepo;
    private final PicturesRepository picRepo;
    private final UserRepository userRepository;
    private final AmenitiesRepository amenitiesRepo;
    private final ModelMapper mapper;
    private final TextResponse customResponse;
    private final MailService mailService;

    //get all homes
    @GetMapping("/homes")
    public ResponseEntity getAllHomes(){
        return ResponseEntity.ok(apartmentRepo.findAll());
    }

    @GetMapping("/homes/PENDING")
    public ResponseEntity getAllPendingHomes(){
        ArrayList<PlainApartmentDTO> hotelList = new ArrayList<>();
        for (Apartments hotel:apartmentRepo.findAllByHomeStateIs(HomeState.PENDING)
        ) {
            hotelList.add(mapper.map(hotel, PlainApartmentDTO.class));
        }
        return ResponseEntity.ok(hotelList);
    }
    //get all property files
    @GetMapping("/property_type")
    public ResponseEntity returnAllPropertyTypes(){
        PropertyType[] propertyTypes = PropertyType.values();
        return ResponseEntity.ok(propertyTypes);
    }
    @GetMapping("/house_type")
    public ResponseEntity returnAllHouseTypes(){    
        HouseType[] propertyTypes = HouseType.values();
        return ResponseEntity.ok(propertyTypes);
    }

    //make a house verified
    @PutMapping("/home/update/verify")
    public ResponseEntity updatePendingHouse(@RequestHeader("user_email")String email
            , @RequestParam("apartment_id") long id) throws MessagingException {
        if (userRepository.findUsersByEmail(email).get().getRole() == Role.ADMIN){
            Optional<Apartments> updatedApartment = apartmentRepo.findById(id);
            updatedApartment.get().setHomeState(HomeState.VERIFIED);
            apartmentRepo.save(updatedApartment.get());

            mailService.sendHtmlMessage(updatedApartment.get().getUsers().getEmail()
                    ,"Listing has been verified"
                    ,"Your listing with the title "+updatedApartment.get().getName()
                            +" has been verified and user are now able to be reserved.",updatedApartment.get().getUsers().getName()
            ,"/index.html");

            return getAllPendingHomes();

        }else {
            customResponse.setMessage("You don't have clearance ");
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(customResponse);
        }

    }
    @PutMapping("/home/update/unverify")
    public ResponseEntity updateHouse(@RequestHeader("user_email")String email
            , @RequestParam("apartment_id") long id) throws MessagingException {
        if (userRepository.findUsersByEmail(email).get().getRole() == Role.ADMIN){
            Optional<Apartments> updatedApartment = apartmentRepo.findById(id);
            updatedApartment.get().setHomeState(HomeState.UNVERIFIED);
            apartmentRepo.save(updatedApartment.get());

            mailService.sendHtmlMessage(updatedApartment.get().getUsers().getEmail()
                    ,"Listing is not verified"
                    ,"Your listing with the title "+updatedApartment.get().getName()
                            +" has been listed unverified please contact support for additional aid.",updatedApartment.get().getUsers().getName()
                    ,"/index.html");

            return getAllPendingHomes();

        }else {
            customResponse.setMessage("You don't have clearance ");
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(customResponse);
        }

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
            users.get().getApartmentsSet().add(apartments);
            apartmentService.addHome(apartments,users.get());
            userRepository.save(users.get());

            return ResponseEntity.ok(apartments);
        }else {
            customResponse.setMessage("You should really signup or login else you won't" +
                    " be able to do this ");
            return new ResponseEntity<>(customResponse,HttpStatus.FORBIDDEN);
        }

    }




    @DeleteMapping("/home/picture/delete")
    public ResponseEntity deleteHousePictures(@RequestParam("picture_id")long picture_id){
        picRepo.deleteById(picture_id);
        customResponse.setMessage("Successfully deleted image");
        return ResponseEntity.ok(customResponse);


    }


}
