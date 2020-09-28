package com.mehul.lmsbackend.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.mehul.lmsbackend.model.User;
import com.mehul.lmsbackend.repository.UserRepository;

@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class AuthenticationController {
	
	@Autowired
	private UserRepository userRepository;
	
    @PostMapping(path = "/signin")
    public ResponseEntity<String> verifyUser(@RequestBody User user) {
    	
    	List<User> list = userRepository.findByEmailId(user.getEmailId());
    	
    	if(list.size() == 0 || !list.get(0).getPassword().equals(user.getPassword()))
    		return ResponseEntity.ok("Invalid user credentials");
    	
    	return ResponseEntity.ok(list.get(0).getRole());
    }
}