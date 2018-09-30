package com.ez.ezbackend.shared.exception;

public class EzNotAuthorizedException extends RuntimeException {
  public EzNotAuthorizedException(String msg) {
    super(msg);
  }
}
