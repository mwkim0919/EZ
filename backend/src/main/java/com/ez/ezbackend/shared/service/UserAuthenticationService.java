package com.ez.ezbackend.shared.service;

import com.ez.ezbackend.shared.entity.User;
import com.ez.ezbackend.shared.exception.EzNotFoundException;
import com.ez.ezbackend.shared.repository.UserRepository;
import com.ez.ezbackend.shared.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;
import java.util.Collections;

@Service
@Transactional
@RequiredArgsConstructor(onConstructor = @__(@Inject))
public class UserAuthenticationService implements UserDetailsService {

  private final UserRepository userRepository;

  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    User user = userRepository.findByEmail(email)
        .orElseThrow(() -> new EzNotFoundException("User with email : " + email + " not found"));
    return UserPrincipal.builder()
        .id(user.getId())
        .email(user.getEmail())
        .password(user.getPassword())
        .authorities(Collections.singletonList(new SimpleGrantedAuthority(user.getRole().getText())))
        .build();
  }

  public UserDetails loadUserById(Long id) {
    User user = userRepository.findById(id)
        .orElseThrow(() -> new EzNotFoundException("User with id: " + id + " not found"));
    return UserPrincipal.builder()
        .id(user.getId())
        .email(user.getEmail())
        .password(user.getPassword())
        .authorities(Collections.singletonList(new SimpleGrantedAuthority(user.getRole().getText())))
        .build();
  }
}
