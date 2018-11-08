package com.ez.ezbackend.budget.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum TransactionType {
  DEPOSIT("deposit"),
  WITHDRAW("withdraw");

  private String value;
}
