package com.example.shortletBackend.repositories;

import com.example.shortletBackend.entities.Apartments;
import com.example.shortletBackend.entities.Users;
import com.example.shortletBackend.enums.HomeState;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;

public interface ApartmentRepo extends JpaRepository<Apartments, Long> {
    ArrayList<Apartments> findAllByHomeStateIs(HomeState homeState);
    ArrayList<Apartments> findAllByUsers(Users users);
}
