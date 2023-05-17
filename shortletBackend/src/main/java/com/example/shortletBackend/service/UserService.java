package com.example.shortletBackend.service;

import com.example.shortletBackend.dto.TextResponse;
import com.example.shortletBackend.dto.UsersDTO;
import com.example.shortletBackend.entities.Users;
import com.example.shortletBackend.enums.Role;
import com.example.shortletBackend.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
@AllArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final ModelMapper mapper;

    public void save(Users users){
        userRepository.save(users);
    }

    public Users addUser(Users users){
        Optional<Users> oldUser = userRepository.findUsersByEmail(users.getEmail());
        if (!oldUser.isPresent()) {//if the user does not exist it creates a new user
            users.setRole(Role.USER);

            save(users);
            return users;
        }else {// if it does exist, the user is then returned
            return oldUser.get();
        }
    }

    public ArrayList<UsersDTO> findAllUsersByRole(Role role){
        ArrayList<UsersDTO> userList = new ArrayList<>();
        for (Users user: userRepository.findAllByRole(role)
        ) {
            userList.add(mapper.map(user, UsersDTO.class));
        }
        return userList;
    }

    public Optional<Users> findUsersById(Long id){
        return userRepository.findById(id);
    }

    public Optional<Users> findUserByEmail(String email){

        return userRepository.findUsersByEmail(email);
    }

    public ResponseEntity updateUser(String email, Users users){
        Optional<Users> oldInfo= findUserByEmail(email);
        if (oldInfo.isPresent()){

            if (users.getPhoneNo() != null) {
                oldInfo.get().setPhoneNo(users.getPhoneNo());
            }
            if (users.getName() != null) {
                oldInfo.get().setName(users.getName());
            }

            save(oldInfo.get());
            return ResponseEntity.ok(mapper.map(oldInfo.get(), UsersDTO.class));
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    public TextResponse disableUser(long id, String admin_email){
        if (findUserByEmail(admin_email).get().getRole() == Role.ADMIN){
        Users users = findUsersById(id).get();
        users.setActiveUser(false);
        save(users);
        return new TextResponse( "The user "+ users.getName()+" has been disable",200);
        }else {
    return new TextResponse("You can not perform this function",403);
        }
    }

    public TextResponse enableUser(long id, String admin_email){
        if (findUserByEmail(admin_email).get().getRole() == Role.ADMIN){
            Users users = findUsersById(id).get();
            users.setActiveUser(true);
            save(users);
            return new TextResponse( "The user "+ users.getName()+" has been enabled",200);
        }else {
            return new TextResponse("You can not perform this function",403);
        }
    }

}
