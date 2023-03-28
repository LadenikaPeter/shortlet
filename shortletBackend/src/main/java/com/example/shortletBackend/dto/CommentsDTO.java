package com.example.shortletBackend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

//general user comment dto
@Data @AllArgsConstructor
@NoArgsConstructor
public class CommentsDTO {
    private long id;
    private String comment;
    private UsersCommentDTO users;

    @JsonFormat(shape= JsonFormat.Shape.STRING, pattern="MM-yyyy")
    private Date commentDate;

}
