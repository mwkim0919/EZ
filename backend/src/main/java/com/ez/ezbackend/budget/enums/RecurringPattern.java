package com.ez.ezbackend.budget.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum RecurringPattern {
  YEARLY("YEARLY"),
  BI_MONTHLY("BI_MONTHLY"),
  MONTHLY("MONTHLY"),
  BI_WEEKLY("BI_WEEKLY"),
  WEEKLY("WEEKLY");

  private String value;
}
