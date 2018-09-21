package com.ez.ezbackend.shared.exception;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class ExceptionResponse {
  private LocalDateTime timestamp;
  private String message;
  private String detail;
  private List<String> stacktraces = new ArrayList<>();
}
