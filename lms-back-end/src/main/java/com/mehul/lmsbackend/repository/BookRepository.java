package com.mehul.lmsbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.mehul.lmsbackend.model.Book;

@Repository
public interface BookRepository extends JpaRepository<Book, Long>{

}
