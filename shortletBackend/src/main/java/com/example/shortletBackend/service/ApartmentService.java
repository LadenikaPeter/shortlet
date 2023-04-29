package com.example.shortletBackend.service;

import com.example.shortletBackend.entities.Apartments;
import com.example.shortletBackend.repositories.ApartmentRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service @AllArgsConstructor
public class ApartmentService {

    public final ApartmentRepository apartmentRepository;

    public void save(Apartments apartments){
        apartmentRepository.save(apartments);
    }

}
