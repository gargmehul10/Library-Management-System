package com.mehul.lmsbackend.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@Entity
@Table(name="books", uniqueConstraints=@UniqueConstraint(columnNames={"book_name"}))
public class Book {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="book_name")
	private String name;
	
	@Column(name="book_category")
	private String category;
	
	@Column(name="book_quantity")
	private int quantity;

	public Book() {
		
	}
	
	public Book(Long id, String name, String category, int quantity) {
		super();
		this.id = id;
		this.name = name;
		this.category = category;
		this.quantity = quantity;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
}
