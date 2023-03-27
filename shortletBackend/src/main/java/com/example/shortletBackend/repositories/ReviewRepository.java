package com.example.shortletBackend.repositories;

import com.example.shortletBackend.entities.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;

public interface ReviewRepository extends JpaRepository<Review,Long> {
    ArrayList<Review> findAllByApartments_Id(long id);
}
