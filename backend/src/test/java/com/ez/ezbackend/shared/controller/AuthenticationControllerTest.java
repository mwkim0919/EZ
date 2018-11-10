package com.ez.ezbackend.shared.controller;

import com.ez.ezbackend.shared.entity.User;
import com.ez.ezbackend.shared.enums.UserRole;
import com.ez.ezbackend.shared.request.UserRequest;
import com.ez.ezbackend.shared.response.JwtAuthenticationResponse;
import com.ez.ezbackend.shared.security.JwtTokenProvider;
import com.ez.ezbackend.shared.service.UserService;
import com.ez.ezbackend.shared.util.JsonUtil;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import javax.inject.Inject;
import java.util.Date;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(
    controllers = AuthenticationController.class,
    secure = false
)
public class AuthenticationControllerTest {
  @Inject
  private MockMvc mockMvc;

  @MockBean
  private AuthenticationManager authenticationManager;

  @MockBean
  private JwtTokenProvider tokenProvider;

  @MockBean
  private UserService userService;

  @Test
  public void test_signupUser() throws Exception {
    User user = User.builder()
        .id(1L)
        .email("test@test.com")
        .password("test")
        .role(UserRole.USER)
        .build();
    when(userService.createUser(any(UserRequest.class))).thenReturn(user);
    UserRequest userRequest = UserRequest.builder()
        .email("test@test.com")
        .password("test")
        .build();
    String requestJson = JsonUtil.convertToJson(userRequest, UserRequest.class);
    mockMvc
        .perform(post("/api/auth/signup")
            .content(requestJson)
            .contentType(MediaType.APPLICATION_JSON)
            .accept(MediaType.APPLICATION_JSON))
        .andDo(print())
        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.success").value("true"))
        .andExpect(jsonPath("$.email").value("test@test.com"))
        .andExpect(jsonPath("$.message").value("User is successfully registered."));
  }

  @Test
  public void test_signinUser() throws Exception {
    when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
        .thenReturn(new UsernamePasswordAuthenticationToken("principal", "credentials"));
    JwtAuthenticationResponse jwtResponse = JwtAuthenticationResponse.builder()
        .accessToken("thisismytoken")
        .userId(1L)
        .email("test@test.com")
        .issueDate(new Date())
        .expiryDate(new Date())
        .build();
    when(tokenProvider.generateToken(any(Authentication.class))).thenReturn(jwtResponse);
    UserRequest userRequest = UserRequest.builder()
        .email("test@test.com")
        .password("test")
        .build();
    String requestJson = JsonUtil.convertToJson(userRequest, UserRequest.class);
    mockMvc
        .perform(post("/api/auth/signin")
            .content(requestJson)
            .contentType(MediaType.APPLICATION_JSON)
            .accept(MediaType.APPLICATION_JSON))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.accessToken").value("thisismytoken"))
        .andExpect(jsonPath("$.userId").value(1L))
        .andExpect(jsonPath("$.email").value("test@test.com"))
        .andExpect(jsonPath("$.issueDate").exists())
        .andExpect(jsonPath("$.expiryDate").exists());
  }
}
