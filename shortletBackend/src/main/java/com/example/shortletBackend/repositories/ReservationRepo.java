package com.example.shortletBackend.repositories;

import com.example.shortletBackend.entities.Apartments;
import com.example.shortletBackend.entities.Reservation;
import com.example.shortletBackend.entities.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.ArrayList;
import java.util.Date;


public interface ReservationRepo extends JpaRepository<Reservation,Long> {
    ArrayList<Reservation> findAllByUsers(Users users);//find reservation by the user who created them
    ArrayList<Reservation> findAllByApartment(Apartments apartments);//find reservation by the apartment

    boolean existsByCheckInDateIsBetween(Date checkIn, Date checkOut);
    boolean existsByCheckOutDateIsBetween(Date checkIn,Date checkOut);
    boolean existsByCheckInDateIsBetweenAndApartment_Id(Date checkIn,Date checkOut,long id);
    boolean existsByCheckOutDateLessThanAndApartment_Id(Date checkOut,long id);

    @Query("SELECT COUNT(e) FROM Reservation e " +
            "WHERE e.checkInDate > :checkOut " +
            "AND e.checkOutDate < :checkIn " +
            "AND (e.checkInDate < :checkIn AND e.checkOutDate > :checkOut ) " +
            "AND e.apartment.id = :id")
    Long gggggggg(@Param("checkIn") Date checkIn, @Param("checkOut") Date checkOut, long id);

//    Optional<Reservation> findByCheckInDateBetweenOrCheckOutDateBetween(Date checkInDateStart, Date checkInDateEnd, Date checkOutDateStart, Date checkOutDateEnd);

//    boolean existsByCheckInDateBetweenOrCheckOutDateBetween(Date checkInDateStart, Date checkInDateEnd, Date checkOutDateStart, Date checkOutDateEnd);
}
