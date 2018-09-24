package com.ez.ezbackend.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class TestUtil {

  public static <T> String convertToJson(T obj, Class<T> tClass) {
    try {
      ObjectMapper objectMapper = new ObjectMapper();
      objectMapper.writerFor(tClass);
      return objectMapper.writeValueAsString(obj);
    } catch (JsonProcessingException e) {
      log.error("Error converting object into json", e);
      return null;
    }
  }
}
