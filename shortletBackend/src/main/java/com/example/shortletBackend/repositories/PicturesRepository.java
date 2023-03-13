package com.example.shortletBackend.repositories;

import com.example.shortletBackend.entities.Pictures;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PicturesRepository extends JpaRepository<Pictures, Long> {
}