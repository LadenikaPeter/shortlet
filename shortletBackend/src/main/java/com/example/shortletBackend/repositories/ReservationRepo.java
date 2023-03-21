package com.example.shortletBackend.repositories;

import com.example.shortletBackend.entities.Apartments;
import com.example.shortletBackend.entities.Reservation;
import com.example.shortletBackend.entities.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;


public interface ReservationRepo extends JpaRepository<Reservation,Long> {
    ArrayList<Reservation> findAllByUsers(Users users);//find reservation by the user who created them
    ArrayList<Reservation> findAllByApartment(Apartments apartments);//find reservation by the apartment

}
