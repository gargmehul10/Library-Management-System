package com.mehul.lmsbackend.model;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Embeddable
public class ReserveBook {

	@Column(name="book_id")
	private Long id;
	
	@Column(name="reserve_date")
	@Temporal(TemporalType.DATE)
	private Date reserveDate;

	public ReserveBook() {
		
	}
	
	public ReserveBook(Long id, Date reserveDate) {
		super();
		this.id = id;
		this.reserveDate = reserveDate;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getReserveDate() {
		return reserveDate;
	}

	public void setReserveDate(Date reserveDate) {
		this.reserveDate = reserveDate;
	}
}