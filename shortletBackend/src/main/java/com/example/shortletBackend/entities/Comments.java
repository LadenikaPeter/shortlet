package com.example.shortletBackend.entities;

import lombok.*;

import javax.persistence.*;

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

    @ManyToOne
    private Users users;

    @ManyToOne
    private Apartments apartments;
}
