package com.ez.ezbackend.shared.model;

import com.ez.ezbackend.shared.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserModel {
  private Long id;
  private String email;
  private String password;

  public static UserModel convertFromUser(User user) {
    return UserModel.builder()
        .id(user.getId())
        .email(user.getEmail())
        .build();
  }
}
