package com.ez.ezbackend.shared.security;

import com.ez.ezbackend.shared.response.JwtAuthenticationResponse;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;

@Slf4j
@Component
@NoArgsConstructor
@AllArgsConstructor
public class JwtTokenProvider {

  @Value("${app.jwtSecret}")
  private String jwtSecret;

  @Value("${app.jwtExpirationInMs}")
  private int jwtExpirationInMs;

  public JwtAuthenticationResponse generateToken(Authentication authentication) {
    UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
    Date issueDate = new Date();
    Date expiryDate = new Date(issueDate.getTime() + jwtExpirationInMs);
    String accessToken = Jwts.builder()
        .setSubject(Long.toString(userPrincipal.getId()))
        .setIssuedAt(new Date())
        .setExpiration(expiryDate)
        .signWith(SignatureAlgorithm.HS512, jwtSecret)
        .compact();
    return JwtAuthenticationResponse.builder()
        .accessToken(accessToken)
        .issueDate(issueDate)
        .expiryDate(expiryDate)
        .build();
  }

  public Long getUserIdFromJWT(String token) {
    Claims claims = Jwts.parser()
        .setSigningKey(jwtSecret)
        .parseClaimsJws(token)
        .getBody();
    return Long.parseLong(claims.getSubject());
  }

  public boolean validateToken(String authToken) {
    try {
      Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
      return true;
    } catch (SignatureException ex) {
      log.error("Invalid JWT signature", ex);
    } catch (MalformedJwtException ex) {
      log.error("Invalid JWT token", ex);
    } catch (ExpiredJwtException ex) {
      log.error("Expired JWT token", ex);
    } catch (UnsupportedJwtException ex) {
      log.error("Unsupported JWT token", ex);
    } catch (IllegalArgumentException ex) {
      log.error("JWT claims string is empty.", ex);
    }
    return false;
  }
}
