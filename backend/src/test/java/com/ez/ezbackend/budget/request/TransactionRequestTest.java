package com.ez.ezbackend.budget.request;

import com.ez.ezbackend.budget.entity.Transaction;
import com.ez.ezbackend.shared.entity.User;
import com.ez.ezbackend.shared.exception.EzIllegalRequestException;
import org.junit.Test;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThat;

public class TransactionRequestTest {

  @Test
  public void test_convertToTransaction_success() {
    TransactionRequest transactionRequest = TransactionRequest.builder()
        .description("description")
        .deposit(new BigDecimal("100.00"))
        .transactionDatetime(LocalDateTime.of(2018, 1, 1, 0, 0, 0))
        .build();
    Transaction transaction = TransactionRequest.convertToTransaction(transactionRequest, new User());
    assertThat(transaction.getId()).isNull();
    assertThat(transaction.getDescription()).isEqualTo("description");
    assertThat(transaction.getDeposit()).isEqualTo("100.00");
    assertThat(transaction.getWithdraw()).isNull();
    assertThat(transaction.getTransactionDatetime()).isEqualTo("2018-01-01T00:00:00");
  }

  @Test(expected = EzIllegalRequestException.class)
  public void test_convertToTransaction_with_no_description() {
    TransactionRequest transactionRequest = TransactionRequest.builder()
        .deposit(BigDecimal.ONE)
        .transactionDatetime(LocalDateTime.of(2018, 1, 1, 0, 0, 0))
        .build();
    TransactionRequest.convertToTransaction(transactionRequest, new User());
  }

  @Test(expected = EzIllegalRequestException.class)
  public void test_convertToTransaction_with_no_deposit_and_withdraw() {
    TransactionRequest transactionRequest = TransactionRequest.builder()
        .description("description")
        .transactionDatetime(LocalDateTime.of(2018, 1, 1, 0, 0, 0))
        .build();
    TransactionRequest.convertToTransaction(transactionRequest, new User());
  }

  @Test(expected = EzIllegalRequestException.class)
  public void test_convertToTransaction_with_both_deposit_and_withdraw() {
    TransactionRequest transactionRequest = TransactionRequest.builder()
        .description("description")
        .deposit(new BigDecimal("123.00"))
        .withdraw(new BigDecimal("111.11"))
        .transactionDatetime(LocalDateTime.of(2018, 1, 1, 0, 0, 0))
        .build();
    TransactionRequest.convertToTransaction(transactionRequest, new User());
  }

  @Test(expected = EzIllegalRequestException.class)
  public void test_convertToTransaction_with_zero_deposit() {
    TransactionRequest transactionRequest = TransactionRequest.builder()
        .description("description")
        .deposit(BigDecimal.ZERO)
        .transactionDatetime(LocalDateTime.of(2018, 1, 1, 0, 0, 0))
        .build();
    TransactionRequest.convertToTransaction(transactionRequest, new User());
  }

  @Test(expected = EzIllegalRequestException.class)
  public void test_convertToTransaction_with_zero_withdraw() {
    TransactionRequest transactionRequest = TransactionRequest.builder()
        .description("description")
        .withdraw(BigDecimal.ZERO)
        .transactionDatetime(LocalDateTime.of(2018, 1, 1, 0, 0, 0))
        .build();
    TransactionRequest.convertToTransaction(transactionRequest, new User());
  }

  @Test(expected = EzIllegalRequestException.class)
  public void test_convertToTransaction_with_deposit_less_than_0() {
    TransactionRequest transactionRequest = TransactionRequest.builder()
        .description("description")
        .deposit(new BigDecimal("-1.00"))
        .transactionDatetime(LocalDateTime.of(2018, 1, 1, 0, 0, 0))
        .build();
    TransactionRequest.convertToTransaction(transactionRequest, new User());
  }

  @Test(expected = EzIllegalRequestException.class)
  public void test_convertToTransaction_with_withdraw_less_than_0() {
    TransactionRequest transactionRequest = TransactionRequest.builder()
        .description("description")
        .withdraw(new BigDecimal("-1.00"))
        .transactionDatetime(LocalDateTime.of(2018, 1, 1, 0, 0, 0))
        .build();
    TransactionRequest.convertToTransaction(transactionRequest, new User());
  }
}
