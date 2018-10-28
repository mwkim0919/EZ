package com.ez.ezbackend.shared.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.Date;

@Getter
@Builder
@AllArgsConstructor
public class JwtAuthenticationResponse {
  private String accessToken;
  @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
  private Date issueDate;
  @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
  private Date expiryDate;
}
