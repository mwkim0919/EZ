package com.ez.ezbackend.shared.util;

import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

public class ControllerUtil {

  public static URI createUri(long id, String uriFormat) {
    return ServletUriComponentsBuilder.fromCurrentRequest()
        .path(uriFormat)
        .buildAndExpand(id)
        .toUri();
  }
}
