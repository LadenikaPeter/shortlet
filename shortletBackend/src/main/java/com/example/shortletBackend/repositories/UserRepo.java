package com.example.shortletBackend.repositories;

import com.example.shortletBackend.entities.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepo extends JpaRepository<Users,Long> {
    Optional<Users> findUsersByEmail(String email);
}
