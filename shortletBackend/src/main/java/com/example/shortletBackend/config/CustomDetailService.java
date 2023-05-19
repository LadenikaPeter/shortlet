package com.example.shortletBackend.config;

import com.example.shortletBackend.entities.Users;
import com.example.shortletBackend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomDetailService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<Users> user = userRepository.findUsersByEmail(email);
        AuthenticatedUser userDetail = null;
        if (user.isPresent()) {
            userDetail = new AuthenticatedUser();
            userDetail.setUsers(user.get());
        } else {
            throw new UsernameNotFoundException("user not exist with email: " + email);
        }
        return userDetail;
    }

}
