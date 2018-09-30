package com.ez.ezbackend.shared.controller;

import com.ez.ezbackend.shared.entity.User;
import com.ez.ezbackend.shared.model.JwtAuthenticationResponse;
import com.ez.ezbackend.shared.model.SignUpResponse;
import com.ez.ezbackend.shared.model.UserModel;
import com.ez.ezbackend.shared.security.JwtTokenProvider;
import com.ez.ezbackend.shared.service.UserService;
import com.ez.ezbackend.shared.util.ControllerUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.inject.Inject;
import java.net.URI;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor(onConstructor = @__(@Inject))
public class AuthenticationController {

  private final AuthenticationManager authenticationManager;
  private final JwtTokenProvider tokenProvider;
  private final UserService userService;

  @PostMapping("/signin")
  public ResponseEntity<JwtAuthenticationResponse> signinUser(@RequestBody UserModel userRequest) {
    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(
            userRequest.getEmail(),
            userRequest.getPassword()
        )
    );
    SecurityContextHolder.getContext().setAuthentication(authentication);
    JwtAuthenticationResponse jwtResponse = tokenProvider.generateToken(authentication);
    return ResponseEntity.ok(jwtResponse);
  }

  @PostMapping("/signup")
  public ResponseEntity<SignUpResponse> signupUser(@RequestBody UserModel userRequest) {
    User user = userService.createUser(userRequest);
    URI location = ControllerUtil.createUri(user.getId(), "users/{userId}");
    SignUpResponse response = SignUpResponse.builder()
        .success(true)
        .message("User is successfully registered.")
        .email(user.getEmail())
        .build();
    return ResponseEntity.created(location).body(response);
  }
}
