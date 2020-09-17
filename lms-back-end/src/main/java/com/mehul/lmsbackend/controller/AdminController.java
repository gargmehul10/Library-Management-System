package com.mehul.lmsbackend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.mehul.lmsbackend.exception.ResourceNotFoundException;
import com.mehul.lmsbackend.model.Book;
import com.mehul.lmsbackend.model.User;
import com.mehul.lmsbackend.repository.BookRepository;
import com.mehul.lmsbackend.repository.UserRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/admin/")
public class AdminController {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private BookRepository bookRepository;
	
	// get all users
	@GetMapping("/users")
	public List<User> getAllUsers() {
		return userRepository.findAll();
	}
	
	// add new user
	@PostMapping("/users")
	public User createUser(@RequestBody User user) {
		user.setRole("ROLE_USER");
		return userRepository.save(user);
	}
	
	// delete user
	@DeleteMapping("/users/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteUser(@PathVariable Long id) {
		
		User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not exist with id :" + id));
		
		userRepository.delete(user);
		
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		
		return ResponseEntity.ok(response);
	}
	
	// get user by id
	@GetMapping("/users/{id}")
	public ResponseEntity<User> getUserById(@PathVariable Long id) {
		
		User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not exist with id :" + id));
		
		return ResponseEntity.ok(user);
	}
	
	// update user by id
	@PutMapping("/users/{id}")
	public ResponseEntity<User> updateEmployee(@PathVariable Long id, @RequestBody User newUser) {
		
		User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not exist with id :" + id));
		
		user.setEmailId(newUser.getEmailId());
		user.setPassword(newUser.getPassword());
		
		User updatedUser = userRepository.save(user);
		return ResponseEntity.ok(updatedUser);
	}
	
	// add new book 
	@PostMapping("/books")
	public Book createBook(@RequestBody Book book) {
		return bookRepository.save(book);
	}
	
	// get all the books 
	@GetMapping("/books")
	public List<Book> getAllBooks() {
		return bookRepository.findAll();
	}
}