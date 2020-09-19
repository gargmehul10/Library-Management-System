package com.mehul.lmsbackend.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@Entity
@Table(name="users", uniqueConstraints=@UniqueConstraint(columnNames={"email_id"}))
public class User {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="email_id")
	private String emailId;
	
	@Column(name="password")
	private String password;
	
	@Column(name="role")
	private String role;
	
	@ElementCollection
	@CollectionTable(name="reserve_books", joinColumns=@JoinColumn(name="id"))
	@Column(name="book_id")
	private List<Long> books=new ArrayList<Long>();
	
	public User() {
		
	}

	public User(Long id, String emailId, String password, String role, List<Long> books) {
		super();
		this.id = id;
		this.emailId = emailId;
		this.password = password;
		this.role = role;
		this.books = books;
	}



	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public List<Long> getBooks() {
		return books;
	}

	public void setBooks(List<Long> books) {
		this.books = books;
	}
}