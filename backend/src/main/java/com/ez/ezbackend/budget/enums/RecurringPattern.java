package com.ez.ezbackend.budget.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum RecurringPattern {
  YEARLY("yearly"),
  BI_MONTHLY("bi-monthly"),
  MONTHLY("monthly"),
  BI_WEEKLY("bi-weekly"),
  WEEKLY("weekly");

  private String value;
}
