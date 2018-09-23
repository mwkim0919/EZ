package com.ez.ezbackend.shared.exception;

public class EzIllegalRequestException extends RuntimeException {
  public EzIllegalRequestException(String msg) {
    super(msg);
  }
}
