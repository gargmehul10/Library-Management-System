package com.mehul.lmsbackend.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="reserved_books")
public class ReservedBooks {

	private String emailId;
	
    public List<Integer> getValues() {
        return values;
    }
}
