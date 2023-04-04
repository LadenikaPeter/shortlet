package com.example.shortletBackend.repositories;

import com.example.shortletBackend.entities.Users;
import com.example.shortletBackend.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;
import java.util.Optional;

public interface UserRepository extends JpaRepository<Users,Long> {
    Optional<Users> findUsersByEmail(String email);

    ArrayList<Users> findAllByRole(Role role);
}
