package com.ez.ezbackend.shared.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum DefaultCategory {
  INCOME("INCOME"),
  ENTERTAINMENT("ENTERTAINMENT"),
  EDUCATION("EDUCATION"),
  SHOPPING("SHOPPING"),
  HOUSING("HOUSING"),
  INVESTMENT("INVESTMENT"),
  HEALTH_CARE("Health & Fitness"),
  PERSONAL_CARE("PERSONAL_CARE"),
  FOOD("Food & Dining"),
  TRANSPORTATION("Auto & Transport"),
  SAVING("Savings"),
  UTILITY("Bills & Utilities"),
  TRAVEL("Travel"),
  EMERGENCY_FUND("Emergency Fund");

  private final String text;
}
