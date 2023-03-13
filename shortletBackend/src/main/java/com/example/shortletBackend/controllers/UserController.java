package com.example.shortletBackend.controllers;

import com.example.shortletBackend.repositories.UserRepo;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@AllArgsConstructor
public class UserController {
    private final UserRepo userRepo;
}
