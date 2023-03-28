package com.example.shortletBackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

//general user comment dto
@Data @AllArgsConstructor
@NoArgsConstructor
public class CommentsDTO {
    private long id;
    private String comment;
    private UsersCommentDTO users;

}
