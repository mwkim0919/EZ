package com.ez.ezbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class EzBackendApplication {
  public static void main(String[] args) {
    SpringApplication.run(EzBackendApplication.class, args);
  }
}
