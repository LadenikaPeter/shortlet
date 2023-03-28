package com.example.shortletBackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

// user dto for comment Bar

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UsersCommentDTO {
    private long id;
    private String name;

}
