package com.mehul.lmsbackend.controller;

import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mehul.lmsbackend.exception.ResourceNotFoundException;
import com.mehul.lmsbackend.model.Book;
import com.mehul.lmsbackend.model.ReserveBook;
import com.mehul.lmsbackend.model.User;
import com.mehul.lmsbackend.repository.BookRepository;
import com.mehul.lmsbackend.repository.UserRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/user/")
public class UserController {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private BookRepository bookRepository;
	
	// reserve a book
	@PostMapping("/reserve/{id}")
	public User reserveBook(@PathVariable Long id, @RequestBody User user) {
		
		List<User> list = userRepository.findByEmailId(user.getEmailId());
		
		if(list.size() == 0)
			throw new ResourceNotFoundException("User not exist with emailId :" + user.getEmailId());
		
		User updatedUser = list.get(0);
		updatedUser.getBooks().add(new ReserveBook(id, new Date()));
		
		Book book = bookRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Book not exist with id :" + id));
		book.setQuantity(book.getQuantity()-1);
		bookRepository.save(book);
		
		userRepository.save(updatedUser);
		return updatedUser;
	}
	
	// get user by emailId
	@PostMapping("/mybooks")
	public User getUserById(@RequestBody User user) {
			
		List<User> list = userRepository.findByEmailId(user.getEmailId());
			
		if(list.size() == 0)
			throw new ResourceNotFoundException("User not exist with emailId :" + user.getEmailId());
		
		return list.get(0);
	}
	
	// return a book
	@PostMapping("/return/{id}")
	public User returnBook(@PathVariable Long id, @RequestBody User user) {
			
		List<User> list = userRepository.findByEmailId(user.getEmailId());
		
		if(list.size() == 0)
			throw new ResourceNotFoundException("User not exist with emailId :" + user.getEmailId());
			
		User updatedUser = list.get(0);
		updatedUser.getBooks().remove(updatedUser.getBooks().stream().filter(book -> book.getId() == id).findAny().orElse(null));
			
		Book book = bookRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Book not exist with id :" + id));
		book.setQuantity(book.getQuantity()+1);
		bookRepository.save(book);
			
		userRepository.save(updatedUser);
		return updatedUser;
	}
}