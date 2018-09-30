package com.ez.ezbackend.shared.security;

import com.ez.ezbackend.shared.service.UserAuthenticationService;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.inject.Inject;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

  @Inject
  private JwtTokenProvider tokenProvider;

  @Inject
  private UserAuthenticationService userAuthenticationService;

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
      throws ServletException, IOException {
    String jwt = getJwtFromRequest(request);
    if (StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt)) {
      Long userId = tokenProvider.getUserIdFromJWT(jwt);
      /*
       * Note that you could also encode the user's username and roles inside JWT claims
       * and create the UserDetails object by parsing those claims from the JWT.
       * That would avoid the following database hit. It's completely up to you.
       */
      UserDetails userDetails = userAuthenticationService.loadUserById(userId);
      UsernamePasswordAuthenticationToken authentication =
          new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
      authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

      SecurityContextHolder.getContext().setAuthentication(authentication);
    }
    filterChain.doFilter(request, response);
  }

  private String getJwtFromRequest(HttpServletRequest request) {
    String bearerToken = request.getHeader("Authorization");
    if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
      return bearerToken.substring(7);
    }
    return null;
  }
}
