package com.ez.ezbackend.shared.service;

import com.ez.ezbackend.EzBackendApplication;
import com.ez.ezbackend.H2JpaConfig;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import javax.inject.Inject;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = {EzBackendApplication.class, H2JpaConfig.class})
@ActiveProfiles("test")
public class UserServiceTest {
  @Inject
  private UserService userService;

  @Test
  public void test() {
  }
}
