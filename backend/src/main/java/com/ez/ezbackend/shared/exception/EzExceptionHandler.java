package com.ez.ezbackend.shared.exception;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang.exception.ExceptionUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.servlet.http.HttpServletRequest;
import java.security.AccessControlException;
import java.time.LocalDateTime;
import java.util.Arrays;

@Slf4j
@ControllerAdvice
public class EzExceptionHandler extends ResponseEntityExceptionHandler {

  @ExceptionHandler(Exception.class)
  public final ResponseEntity<ExceptionResponse> handleGeneralException(
      Exception ex, HttpServletRequest request) {
    log.error("General exception", ex);
    ExceptionResponse response = createExceptionResponse(ex, request);
    return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  @ExceptionHandler(AuthenticationException.class)
  public final ResponseEntity<ExceptionResponse> handleAuthenticationException(
      AuthenticationException ex, HttpServletRequest request) {
    log.error("UnAuthorized", ex);
    ExceptionResponse response = createExceptionResponse(ex, request);
    return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
  }

  @ExceptionHandler(AccessControlException.class)
  public final ResponseEntity<ExceptionResponse> handleAccessControlException(
      AccessControlException ex, HttpServletRequest request) {
    log.error("UnAuthorized", ex);
    ExceptionResponse response = createExceptionResponse(ex, request);
    return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
  }

  @ExceptionHandler(AccessDeniedException.class)
  public final ResponseEntity<ExceptionResponse> handleAccessDeniedException(
      AccessDeniedException ex, HttpServletRequest request) {
    log.error("UnAuthorized", ex);
    ExceptionResponse response = createExceptionResponse(ex, request);
    return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
  }

  @ExceptionHandler(EzReadOnlyException.class)
  public final ResponseEntity<ExceptionResponse> handleReadOnlyException(
      EzReadOnlyException ex, HttpServletRequest request) {
    log.error("Read only", ex);
    ExceptionResponse response = createExceptionResponse(ex, request);
    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler(EzNotFoundException.class)
  public final ResponseEntity<ExceptionResponse> handleNotFoundException(
      EzNotFoundException ex, HttpServletRequest request) {
    log.error("Not found", ex);
    ExceptionResponse response = createExceptionResponse(ex, request);
    return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
  }

  @ExceptionHandler(EzIllegalRequestException.class)
  public final ResponseEntity<ExceptionResponse> handleIllegalRequestException(
      EzIllegalRequestException ex, HttpServletRequest request) {
    log.error("Illegal request.", ex);
    ExceptionResponse response = createExceptionResponse(ex, request);
    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
  }

  private ExceptionResponse createExceptionResponse(Exception ex, HttpServletRequest request) {
    return ExceptionResponse.builder()
        .message(ex.getMessage())
        .detail(request.getRequestURI())
        .stacktraces(Arrays.asList(ExceptionUtils.getStackFrames(ex)))
        .timestamp(LocalDateTime.now())
        .build();
  }
}
