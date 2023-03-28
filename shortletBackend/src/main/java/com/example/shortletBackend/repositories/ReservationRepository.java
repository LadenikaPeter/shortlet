package com.example.shortletBackend.repositories;

import com.example.shortletBackend.entities.Apartments;
import com.example.shortletBackend.entities.Reservation;
import com.example.shortletBackend.entities.Users;
import com.example.shortletBackend.enums.ReservationState;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;


public interface ReservationRepository extends JpaRepository<Reservation,Long> {
    ArrayList<Reservation> findAllByUsers(Users users);//find reservation by the user who created them
    ArrayList<Reservation> findAllByApartment(Apartments apartments);//find reservation by the apartment
    ArrayList<Reservation> findAllByReservationStateIsAndApartment_IdAndUsers_Email(ReservationState reservationState, Long id, String email);

    boolean existsReservationsByReservationStateAndApartment_IdAndUsers_Email(ReservationState reservationState, Long id, String email);
    Boolean existsByUsers_EmailAndApartment_Id(String email,long apartment_id);
//    boolean existsByCheckInDateIsBetween(Date checkIn, Date checkOut);
//    boolean existsByCheckOutDateIsBetween(Date checkIn,Date checkOut);
//    boolean existsByCheckInDateIsBetweenAndApartment_Id(Date checkIn,Date checkOut,long id);
//    boolean existsByCheckOutDateIsBetweenAndApartment_Id(Date checkIn,Date checkOut,long id);
////    boolean existsByC
//
//    boolean existsByCheckOutDateLessThanAndApartment_Id(Date checkOut,long id);
//
//    @Query("SELECT COUNT(e) FROM Reservation e " +
//            "WHERE e.checkInDate > :checkOut " +
//            "AND e.checkOutDate < :checkIn " +
//            "AND (e.checkInDate < :checkIn AND e.checkOutDate > :checkOut ) " +
//            "AND e.apartment.id = :id")
//    Long gggggggg(@Param("checkIn") Date checkIn, @Param("checkOut") Date checkOut, long id);
//
//

//    Optional<Reservation> findByCheckInDateBetweenOrCheckOutDateBetween(Date checkInDateStart, Date checkInDateEnd, Date checkOutDateStart, Date checkOutDateEnd);

//    boolean existsByCheckInDateBetweenOrCheckOutDateBetween(Date checkInDateStart, Date checkInDateEnd, Date checkOutDateStart, Date checkOutDateEnd);
}
