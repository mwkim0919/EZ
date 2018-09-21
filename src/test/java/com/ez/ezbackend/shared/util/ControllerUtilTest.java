package com.ez.ezbackend.shared.util;

import org.junit.Before;
import org.junit.Test;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.net.URI;

import static org.assertj.core.api.Assertions.assertThat;

public class ControllerUtilTest {
  @Before
  public void before() {
    MockHttpServletRequest request = new MockHttpServletRequest();
    RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));
  }

  @Test
  public void test_createUri() {
    URI uri = ControllerUtil.createUri(1, "users/{id}");
    assertThat(uri.getRawPath()).isEqualTo("/users/1");
  }

  @Test
  public void test_createUri_with_invalid_format() {
    URI uri = ControllerUtil.createUri(1, "users/id");
    assertThat(uri.getRawPath()).isEqualTo("/users/id");
  }
}
