package com.mehul.lmsbackend;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.mehul.lmsbackend.controller.AuthenticationController;
import com.mehul.lmsbackend.model.User;

// narrowing the test to web layer instead of instantiating the whole context without server
@RunWith(SpringRunner.class)
@WebMvcTest(AuthenticationController.class)
public class HttpRequestTest {

	@Autowired
	private MockMvc mockMvc;
	
	@Test
	public void signInTest() throws Exception {
		
		User testUser = new User();
		testUser.setEmailId("user1@gmail.com");
		testUser.setPassword("password");
		
		RequestBuilder requestBuilder = MockMvcRequestBuilders.post("/api/signin").accept(MediaType.APPLICATION_JSON);
		
		MvcResult result = mockMvc.perform(requestBuilder).andReturn();
		System.out.println(result);
		
		
	}
}
