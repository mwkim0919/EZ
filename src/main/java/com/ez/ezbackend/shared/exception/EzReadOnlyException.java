package com.ez.ezbackend.shared.exception;

public class EzReadOnlyException extends RuntimeException {
  public EzReadOnlyException(String msg) {
    super(msg);
  }
}
