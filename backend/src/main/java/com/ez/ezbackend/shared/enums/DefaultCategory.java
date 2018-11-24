package com.ez.ezbackend.shared.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum DefaultCategory {
  INCOME("Income"),
  ENTERTAINMENT("Entertainment"),
  EDUCATION("Education"),
  SHOPPING("Shopping"),
  HOUSING("Housing"),
  INVESTMENT("Investment"),
  HEALTH_CARE("Health & Fitness"),
  PERSONAL_CARE("Personal Care"),
  FOOD("Food & Dining"),
  TRANSPORTATION("Auto & Transport"),
  SAVING("Savings"),
  UTILITY("Bills & Utilities"),
  TRAVEL("Travel"),
  EMERGENCY_FUND("Emergency Fund");

  private final String value;
}
