package com.ez.ezbackend.shared.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SignUpResponse {
  private boolean success;
  private String email;
  private String message;
}
