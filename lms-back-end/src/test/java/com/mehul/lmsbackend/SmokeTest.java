package com.mehul.lmsbackend;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import com.mehul.lmsbackend.controller.AdminController;
import com.mehul.lmsbackend.controller.AuthenticationController;
import com.mehul.lmsbackend.controller.UserController;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = LmsBackEndApplication.class)
public class SmokeTest {

	@Autowired
	private AuthenticationController authenticationController;
	
	@Autowired
	private AdminController adminController;
	
	@Autowired
	private UserController userController;
	
	@Test
	void contextLoads() {
		
		assertNotNull(authenticationController, "AuthenticationController is not loaded");
		assertNotNull(adminController, "AdminController is not loaded");
		assertNotNull(userController, "UserController is not loaded");
	}
}
