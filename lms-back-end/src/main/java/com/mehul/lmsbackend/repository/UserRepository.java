package com.mehul.lmsbackend.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.mehul.lmsbackend.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{

	List<User> findByEmailId(String emailId);
}
