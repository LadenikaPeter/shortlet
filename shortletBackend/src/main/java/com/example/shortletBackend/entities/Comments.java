package com.example.shortletBackend.entities;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Getter @Setter @NoArgsConstructor
@AllArgsConstructor@Entity
@ToString
public class Comments {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    @Lob
    private String comment;

    @Temporal(TemporalType.DATE)
    private Date commentDate;

    @ManyToOne
    private Users users;

    @ManyToOne
    private Apartments apartments;
    private long replyId;

    public Comments(String comment, Date commentDate) {
        this.comment = comment;
        this.commentDate = commentDate;
    }

    public Comments(String comment, Date commentDate, Users users,Apartments apartments) {
        this.comment = comment;
        this.commentDate = commentDate;
        this.users = users;
        this.apartments=apartments;
    }

    public Comments(String comment, Date commentDate, Users users) {
        this.comment = comment;
        this.commentDate = commentDate;
        this.users = users;
    }
}
