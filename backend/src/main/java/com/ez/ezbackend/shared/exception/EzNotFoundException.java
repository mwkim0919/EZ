package com.ez.ezbackend.shared.exception;


public class EzNotFoundException extends RuntimeException {
  public EzNotFoundException(String msg) {
    super(msg);
  }
}
