package com.ez.ezbackend.shared.security;

import com.ez.ezbackend.shared.model.JwtAuthenticationResponse;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import lombok.extern.slf4j.Slf4j;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collections;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class JwtTokenProviderTest {

  private JwtTokenProvider jwtTokenProvider;

  @Mock
  private Authentication authentication;

  private static final String EXPIRED_TOKEN = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNTM4MjcyMTU5LCJleHAiOjE1MzgyNzIxNjl9.CGsIxizp6k1MPNuSvSV2f21bjA9_rFdia7nPsluLlKAS9GvkEEHznkIwxyNP8ShO-XjjM_mGZA-PvFz3yZr67A";

  @Before
  public void setup() {
    UserPrincipal userPrincipal = UserPrincipal.builder()
        .id(1L)
        .email("test@test.com")
        .password("test")
        .authorities(Collections.singletonList(new SimpleGrantedAuthority("USER")))
        .build();
    when(authentication.getPrincipal()).thenReturn(userPrincipal);
    jwtTokenProvider = new JwtTokenProvider("secret", 5000);
  }

  @Test
  public void test_generateToken_and_getUserIdFromJWT_success() {
    JwtAuthenticationResponse jwtResponse = jwtTokenProvider.generateToken(authentication);
    assertThat(jwtResponse.getAccessToken()).isNotNull();
    assertThat(jwtResponse.getExpiryDate()).isNotNull();
    assertThat(jwtResponse.getIssueDate()).isNotNull();

    String accessToken = jwtResponse.getAccessToken();

    boolean tokenValid = jwtTokenProvider.validateToken(accessToken);
    assertThat(tokenValid).isTrue();

    long id = jwtTokenProvider.getUserIdFromJWT(accessToken);
    assertThat(id).isEqualTo(1L);
  }

  @Test(expected = MalformedJwtException.class)
  public void test_getUserIdFromJWT_malformedJwt_failure() {
    jwtTokenProvider.getUserIdFromJWT("somerandomtoken");
  }

  @Test(expected = ExpiredJwtException.class)
  public void test_getUserIdFromJWT_expiredJwt_failure() {
    jwtTokenProvider.getUserIdFromJWT(EXPIRED_TOKEN);
  }

  @Test(expected = IllegalArgumentException.class)
  public void test_getUserIdFromJWT_randomJwt_failure() {
    jwtTokenProvider.getUserIdFromJWT("");
  }

  @Test
  public void test_validateToken_failure() {
    boolean tokenValid = jwtTokenProvider.validateToken("somerandomtoken");
    assertThat(tokenValid).isFalse();
  }
}
