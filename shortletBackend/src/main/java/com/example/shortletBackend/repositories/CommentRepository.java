package com.example.shortletBackend.repositories;

import com.example.shortletBackend.entities.Comments;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comments,Long> {
}
