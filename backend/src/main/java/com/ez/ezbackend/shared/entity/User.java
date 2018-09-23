package com.ez.ezbackend.shared.entity;

import com.ez.ezbackend.shared.enums.UserRole;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String email;

  @Column(nullable = false)
  @JsonIgnore
  private String password;

  @Enumerated(EnumType.STRING)
  private UserRole role;

  @CreationTimestamp
  @Column(name = "create_datetime")
  private LocalDateTime createDatetime;

  @Column(name = "last_login_datetime")
  private LocalDateTime lastLoginDatetime;
}
