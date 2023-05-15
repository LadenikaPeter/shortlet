package com.example.shortletBackend.service;

import com.example.shortletBackend.dto.TextResponse;
import com.example.shortletBackend.entities.Apartments;
import com.example.shortletBackend.entities.Users;
import com.example.shortletBackend.enums.HomeState;
import com.example.shortletBackend.enums.Status;
import com.example.shortletBackend.repositories.AmenitiesRepository;
import com.example.shortletBackend.repositories.ApartmentRepository;
import com.example.shortletBackend.repositories.PicturesRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ApartmentService {
    private final ApartmentRepository apartmentRepository;
    private final AmenitiesRepository amenitiesRepo;
    private final PicturesRepository picRepo;
    private final TextResponse customResponse;
    private final UserService userService;
    private final MailService mailService;
    private final ModelMapper mapper;

    public void save(Apartments apartments){
        apartmentRepository.save(apartments);
    }
    public Optional<Apartments> findById(long id){
        return apartmentRepository.findById(id);
    }
    public List<Apartments> findByUser(Users users){
        return apartmentRepository.findAllByUsers(users);
    }

    public List<Apartments> findAllApartments(){
        return apartmentRepository.findAll();
    }
    public List findAllApartmentByHomeState(HomeState state, Class dto){
        ArrayList hotelList = new ArrayList<>();
        for (Apartments hotel:apartmentRepository.findAllByHomeStateIs(state)
        ) {
            hotelList.add(mapper.map(hotel, dto));
        }
        return hotelList;
    }

    public ResponseEntity updateApartment(Apartments updatedApartments, String email , long id){
        Optional<Users> owner = userService.findUserByEmail(email);
        Optional<Apartments> oldHouse = findById(id);
        if (owner.isPresent()) {
            if (oldHouse.get().getUsers() == owner.get()) {
                updatedApartments.setId(id);
                if (updatedApartments.getPictures() != null) {

                    picRepo.saveAll(updatedApartments.getPictures());
                }
                if (updatedApartments.getAmenities() != null) {
                    amenitiesRepo.save(updatedApartments.getAmenities());
                }
                updatedApartments.setHomeState(HomeState.PENDING);

                save(updatedApartments);
                return ResponseEntity.ok(updatedApartments);
            } else {
                customResponse.setMessage("This isn't your apartment ");
                return new ResponseEntity<>(customResponse, HttpStatus.FORBIDDEN);
            }
        }else {
            customResponse.setMessage("You should really signup or login else you won't" +
                    " be able to do this ");
            return new ResponseEntity<>(customResponse, HttpStatus.FORBIDDEN);

        }
    }



    public Apartments addHome(Apartments apartments, Users users) throws MessagingException {
        apartments.setHomeState(HomeState.PENDING);
        apartments.setHouseRefCode(apartments.getCountry().substring(0,2),apartmentRepository.findAll().size());
        apartments.setUsers(users);
        changeStatus(apartments,Status.UNOCCUPIED);
        mailService.sendHtmlMessage(users.getEmail(), "Pending Apartment Request","Your listing with the title "+apartments.getName()
                        +" has been listed unverified please contact support for additional aid.",apartments.getUsers().getName()
                ,"/index.html");
        return apartments;
    }

    public void changeStatus(Apartments apartments,Status status){
        apartments.setStatus(status);
        save(apartments);
    }

    public String deleteApartment(long id,String email) {
        if (apartmentRepository.findById(id).get().getUsers() == userService.findUserByEmail(email).get()) {
            apartmentRepository.deleteById(id);
            return "The apartment has been deleted";
        } else {
            return "You don't have access to do it";
        }
    }
}
