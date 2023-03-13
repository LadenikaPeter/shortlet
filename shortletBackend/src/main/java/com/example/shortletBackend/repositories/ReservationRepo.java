package com.example.shortletBackend.repositories;

import com.example.shortletBackend.entities.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationRepo extends JpaRepository<Reservation,Long> {
}
