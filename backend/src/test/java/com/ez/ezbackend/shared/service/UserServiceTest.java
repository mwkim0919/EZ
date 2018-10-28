package com.ez.ezbackend.shared.service;

import com.ez.ezbackend.DatabaseIntegrationTest;
import com.ez.ezbackend.shared.entity.User;
import com.ez.ezbackend.shared.enums.UserRole;
import com.ez.ezbackend.shared.exception.EzIllegalRequestException;
import com.ez.ezbackend.shared.request.UserRequest;
import org.junit.Test;
import org.springframework.test.annotation.DirtiesContext;

import javax.inject.Inject;

import static org.assertj.core.api.Assertions.assertThat;

public class UserServiceTest extends DatabaseIntegrationTest {
  @Inject
  private UserService userService;

  @Test
  @DirtiesContext
  public void test_createUser_success() {
    UserRequest userRequest = UserRequest.builder()
        .email("email@email.com")
        .password("test")
        .build();
    User user = userService.createUser(userRequest);
    assertThat(user.getEmail()).isEqualTo("email@email.com");
    assertThat(user.getPassword()).isNotEqualTo("test");
    assertThat(user.getRole()).isEqualTo(UserRole.USER);
    assertThat(user.getCreateDatetime()).isNotNull();
  }

  @Test(expected = EzIllegalRequestException.class)
  public void test_createUser_failure() {
    UserRequest userRequest = UserRequest.builder()
        .email("test@test.com")
        .password("test")
        .build();
    userService.createUser(userRequest);
  }
}