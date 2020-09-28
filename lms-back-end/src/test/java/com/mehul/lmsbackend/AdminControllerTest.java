package com.mehul.lmsbackend;

import static org.junit.jupiter.api.Assertions.assertEquals;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.skyscreamer.jsonassert.JSONAssert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import com.mehul.lmsbackend.controller.AdminController;
import com.mehul.lmsbackend.model.Book;
import com.mehul.lmsbackend.model.User;
import com.mehul.lmsbackend.repository.BookRepository;
import com.mehul.lmsbackend.repository.UserRepository;

@RunWith(SpringRunner.class)
@WebMvcTest(AdminController.class)
public class AdminControllerTest {
	
	@Autowired
	private MockMvc mockMvc;
	
	@MockBean
	private UserRepository userRepository;
	
	@MockBean
	private BookRepository bookRepository;
	
	@Test
	public void getAllUsersTest() throws Exception {
		
		User user = new User((long) 100, "user100@gmail.com", "password", "ROLE_USER", null);
		List<User> allUsers = Arrays.asList(user);
		Mockito.when(userRepository.findAll()).thenReturn(allUsers);
		
		RequestBuilder requestBuilder = MockMvcRequestBuilders.get("/api/admin/users")
											.accept(MediaType.APPLICATION_JSON);
		
		MvcResult result = mockMvc.perform(requestBuilder).andReturn();
		
		String expected = "[{id:100,emailId:user100@gmail.com,password:password,role:ROLE_USER,books:null}]";
		
		assertEquals(HttpStatus.OK.value(), result.getResponse().getStatus());
		JSONAssert.assertEquals(expected, result.getResponse().getContentAsString(), false);
	}
	
	@Test
	public void createUserTest() throws Exception {
		
		User user = new User((long) 100, "user100@gmail.com", "password", "ROLE_USER", null);
		Mockito.when(userRepository.save(Mockito.any(User.class))).thenReturn(user);
		
		String exampleUserJson = "{\"emailId\":\"user100@gmail.com\",\"password\":\"password\"}";
		
		RequestBuilder requestBuilder = MockMvcRequestBuilders.post("/api/admin/users")
											.accept(MediaType.APPLICATION_JSON)
											.content(exampleUserJson)
											.contentType(MediaType.APPLICATION_JSON);
		
		MvcResult result = mockMvc.perform(requestBuilder).andReturn();
		MockHttpServletResponse response = result.getResponse();
		
		String expected = "{\"id\":100,\"emailId\":\"user100@gmail.com\",\"password\":\"password\",\"role\":\"ROLE_USER\",\"books\":null}";
		
		assertEquals(HttpStatus.OK.value(), response.getStatus());
		JSONAssert.assertEquals(expected, response.getContentAsString(), false);
	}
	
	@Test
	public void getUserByIdTest() throws Exception {
		
		Optional<User> user = Optional.of(new User((long) 100, "user100@gmail.com", "password", "ROLE_USER", null));
		Mockito.when(userRepository.findById(Mockito.anyLong())).thenReturn(user);
		
		RequestBuilder requestBuilder = MockMvcRequestBuilders.get("/api/admin/users/" + Mockito.anyLong())
											.accept(MediaType.APPLICATION_JSON);

		MvcResult result = mockMvc.perform(requestBuilder).andReturn();
		
		String expected = "{\"id\":100,\"emailId\":\"user100@gmail.com\",\"password\":\"password\",\"role\":\"ROLE_USER\",\"books\":null}";
		
		assertEquals(HttpStatus.OK.value(), result.getResponse().getStatus());
		JSONAssert.assertEquals(expected, result.getResponse().getContentAsString(), false);
	}
	
	@Test
	public void getAllBooksTest() throws Exception {
		
		Book book = new Book((long) 100, "Learn JUnit Testing", "Testing", 10);
		List<Book> allBooks = Arrays.asList(book);
		Mockito.when(bookRepository.findAll()).thenReturn(allBooks);
		
		RequestBuilder requestBuilder = MockMvcRequestBuilders.get("/api/admin/books")
											.accept(MediaType.APPLICATION_JSON);
		
		MvcResult result = mockMvc.perform(requestBuilder).andReturn();
		
		String expected = "[{\"id\":100,\"name\":\"Learn JUnit Testing\",\"category\":\"Testing\",\"quantity\":10}]";
		
		assertEquals(HttpStatus.OK.value(), result.getResponse().getStatus());
		JSONAssert.assertEquals(expected, result.getResponse().getContentAsString(), false);
	}
	
	@Test
	public void createBookTest() throws Exception {
		
		Book book = new Book((long) 100, "Learn JUnit Testing", "Testing", 10);
		Mockito.when(bookRepository.save(Mockito.any(Book.class))).thenReturn(book);
		
		String exampleBookJson = "{\"name\":\"Learn JUnit Testing\",\"category\":\"Testing\",\"quantity\":10}";
		
		RequestBuilder requestBuilder = MockMvcRequestBuilders.post("/api/admin/books")
											.accept(MediaType.APPLICATION_JSON)
											.content(exampleBookJson)
											.contentType(MediaType.APPLICATION_JSON);
		
		MvcResult result = mockMvc.perform(requestBuilder).andReturn();
		
		String expected = "{\"id\":100,\"name\":\"Learn JUnit Testing\",\"category\":\"Testing\",\"quantity\":10}";
		
		assertEquals(HttpStatus.OK.value(), result.getResponse().getStatus());
		JSONAssert.assertEquals(expected, result.getResponse().getContentAsString(), false);
	}
}
