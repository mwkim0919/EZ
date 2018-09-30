package com.ez.ezbackend.shared.service;

import com.ez.ezbackend.DatabaseIntegrationTest;
import com.ez.ezbackend.shared.exception.EzNotFoundException;
import org.junit.Test;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.inject.Inject;

import java.util.Arrays;
import java.util.Collections;

import static org.assertj.core.api.Assertions.assertThat;

public class UserAuthenticationTest extends DatabaseIntegrationTest {

  @Inject
  private UserAuthenticationService userAuthenticationService;

  @Test
  public void test_loadUserById_success() {
    UserDetails userDetail = userAuthenticationService.loadUserById(1L);
    assertThat(userDetail.getUsername()).isEqualTo("test@test.com");
    assertThat(userDetail.getAuthorities()).isEqualTo(Collections.singletonList(new SimpleGrantedAuthority("ADMIN")));
    assertThat(userDetail.getPassword()).isEqualTo("$2a$10$jmSLtwnLJtr16IrgIqOOge3Q7cc2pqkaYDwvfCHwOCz.oFSO6O4qy");
  }

  @Test(expected = EzNotFoundException.class)
  public void test_loadUserById_failure() {
    userAuthenticationService.loadUserById(-1L);
  }

  @Test
  public void test_loadUserByUsername_success() {
    UserDetails userDetail = userAuthenticationService.loadUserByUsername("test2@test.com");
    assertThat(userDetail.getUsername()).isEqualTo("test2@test.com");
    assertThat(userDetail.getAuthorities()).isEqualTo(Collections.singletonList(new SimpleGrantedAuthority("USER")));
    assertThat(userDetail.getPassword()).isEqualTo("$2a$10$jmSLtwnLJtr16IrgIqOOge3Q7cc2pqkaYDwvfCHwOCz.oFSO6O4qy");
  }

  @Test(expected = EzNotFoundException.class)
  public void test_loadUserByUsername_failure() {
    userAuthenticationService.loadUserByUsername("notfound@test.com");
  }
}
