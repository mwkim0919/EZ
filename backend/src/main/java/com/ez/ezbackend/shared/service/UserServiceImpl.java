package com.ez.ezbackend.shared.service;

import com.ez.ezbackend.shared.entity.User;
import com.ez.ezbackend.shared.enums.UserRole;
import com.ez.ezbackend.shared.exception.EzIllegalRequestException;
import com.ez.ezbackend.shared.request.UserRequest;
import com.ez.ezbackend.shared.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.inject.Inject;

@Service
@RequiredArgsConstructor(onConstructor = @__(@Inject))
public class UserServiceImpl implements UserService {
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  @Override
  public User createUser(UserRequest userRequest) {
    if (userRepository.findByEmail(userRequest.getEmail()).isPresent()) {
      throw new EzIllegalRequestException("Email address is already in use.");
    }
    User user = User.builder()
        .email(userRequest.getEmail())
        .password(passwordEncoder.encode(userRequest.getPassword()))
        .role(UserRole.USER)
        .build();
    return userRepository.saveAndFlush(user);
  }
}
