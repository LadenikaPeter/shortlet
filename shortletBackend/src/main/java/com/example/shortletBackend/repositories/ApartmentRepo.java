package com.example.shortletBackend.repositories;

import com.example.shortletBackend.entities.Apartments;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApartmentRepo extends JpaRepository<Apartments, Long> {
}
