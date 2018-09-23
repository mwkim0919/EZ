package com.ez.ezbackend.budget.model;

import com.ez.ezbackend.budget.entity.Transaction;
import com.ez.ezbackend.shared.exception.EzIllegalRequestException;
import org.junit.Test;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThat;

public class TransactionModelTest {

  @Test
  public void test_convertToTransaction_success() {
    Transaction transaction = Transaction.builder()
        .description("description")
        .deposit(new BigDecimal("100.00"))
        .transactionDatetime(LocalDateTime.of(2018, 1, 1, 0, 0, 0))
        .build();
    TransactionModel transactionModel = TransactionModel.convertFromTransaction(transaction);
    assertThat(transactionModel.getId()).isNull();
    assertThat(transactionModel.getDescription()).isEqualTo("description");
    assertThat(transactionModel.getDeposit()).isEqualTo("100.00");
    assertThat(transactionModel.getWithdraw()).isNull();
    assertThat(transactionModel.getTransactionDatetime()).isEqualTo("2018-01-01T00:00:00");
  }

  @Test(expected = EzIllegalRequestException.class)
  public void test_convertToTransaction_with_no_deposit_and_withdraw() {
    TransactionModel transactionRequest = TransactionModel.builder()
        .description("description")
        .transactionDatetime(LocalDateTime.of(2018, 1, 1, 0, 0, 0))
        .build();
    TransactionModel.convertToTransaction(transactionRequest);
  }

  @Test(expected = EzIllegalRequestException.class)
  public void test_convertToTransaction_with_both_deposit_and_withdraw() {
    TransactionModel transactionRequest = TransactionModel.builder()
        .description("description")
        .deposit(new BigDecimal("123.00"))
        .withdraw(new BigDecimal("111.11"))
        .transactionDatetime(LocalDateTime.of(2018, 1, 1, 0, 0, 0))
        .build();
    TransactionModel.convertToTransaction(transactionRequest);
  }
}
