package com.ez.ezbackend.budget.service;

import com.ez.ezbackend.DatabaseIntegrationTest;
import com.ez.ezbackend.budget.entity.Transaction;
import com.ez.ezbackend.budget.request.TransactionRequest;
import com.ez.ezbackend.shared.exception.EzNotAuthorizedException;
import com.ez.ezbackend.shared.exception.EzNotFoundException;
import com.ez.ezbackend.shared.exception.EzReadOnlyException;
import org.junit.Test;
import org.springframework.test.annotation.DirtiesContext;

import javax.inject.Inject;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

public class TransactionServiceTest extends DatabaseIntegrationTest {
  @Inject
  private TransactionService transactionService;

  @Test
  public void test_getTransactionsForUser_success() {
    List<Transaction> transactions = transactionService.getTransactionsForUser(1L);
    assertThat(transactions).hasSize(2);
    transactions.forEach(transaction -> assertThat(transaction.getUser().getId()).isEqualTo(1L));
  }

  @Test(expected = EzNotFoundException.class)
  public void test_getTransactionsForUser_with_invalid_userId() {
    transactionService.getTransactionsForUser(0L);
  }

  @Test
  public void test_saveTransactionForUser_success() {
    TransactionRequest transactionRequest = TransactionRequest.builder()
        .description("This is a test deposit")
        .deposit(new BigDecimal("1234.56"))
        .createDatetime(LocalDateTime.now())
        .transactionDatetime(LocalDateTime.now())
        .categoryId(5L)
        .build();

    Transaction savedTransaction = transactionService.saveTransactionForUser(transactionRequest, 1L);
    assertThat(savedTransaction.getUser()).isNotNull();
    assertThat(savedTransaction.getId()).isNotNull();
    assertThat(savedTransaction.getCategory().getName()).isEqualTo("Pizza");
  }

  @Test(expected = EzNotFoundException.class)
  public void test_saveTransactionForUser_with_invalid_userId() {
    TransactionRequest transactionRequest = TransactionRequest.builder()
        .description("This is a test deposit")
        .deposit(new BigDecimal("1234.56"))
        .createDatetime(LocalDateTime.now())
        .transactionDatetime(LocalDateTime.now())
        .categoryId(5L)
        .build();
    transactionService.saveTransactionForUser(transactionRequest, 0L);
  }

  @Test
  @DirtiesContext
  public void test_updateTransactionForUser_success() {
    TransactionRequest transactionRequest = TransactionRequest.builder()
        .description("updated")
        .withdraw(new BigDecimal("999.99"))
        .transactionDatetime(LocalDateTime.of(2018, 1, 1, 0, 0))
        .categoryId(5L)
        .build();
    Transaction transaction = transactionService.updateTransactionForUser(transactionRequest, 1, 1);
    assertThat(transaction.getId()).isEqualTo(1);
    assertThat(transaction.getDeposit()).isNull();
    assertThat(transaction.getWithdraw()).isEqualTo("999.99");
    assertThat(transaction.getTransactionDatetime()).isEqualTo("2018-01-01T00:00:00");
    assertThat(transaction.getCategory()).isNotNull();
    assertThat(transaction.getCategory().getName()).isEqualTo("Pizza");
  }

  @Test(expected = EzNotFoundException.class)
  public void test_updateTransactionForUser_with_invalid_user() {
    TransactionRequest transactionRequest = TransactionRequest.builder()
        .description("updated")
        .withdraw(new BigDecimal("999.99"))
        .transactionDatetime(LocalDateTime.of(2018, 1, 1, 0, 0))
        .categoryId(1L)
        .build();
    transactionService.updateTransactionForUser(transactionRequest, 1, -1);
  }

  @Test(expected = EzNotFoundException.class)
  public void test_updateTransactionForUser_with_invalid_transactionId() {
    TransactionRequest transactionRequest = TransactionRequest.builder()
        .description("updated")
        .withdraw(new BigDecimal("999.99"))
        .transactionDatetime(LocalDateTime.of(2018, 1, 1, 0, 0))
        .categoryId(1L)
        .build();
    transactionService.updateTransactionForUser(transactionRequest, -1, 1);
  }

  @Test(expected = EzNotAuthorizedException.class)
  public void test_updateTransactionForUser_with_nonMatching_user() {
    TransactionRequest transactionRequest = TransactionRequest.builder()
        .description("updated")
        .withdraw(new BigDecimal("999.99"))
        .transactionDatetime(LocalDateTime.of(2018, 1, 1, 0, 0))
        .categoryId(1L)
        .build();
    transactionService.updateTransactionForUser(transactionRequest, 1, 2);
  }

  @Test
  @DirtiesContext
  public void test_deleteTransactionForUser_success() {
    transactionService.deleteTransactionForUser(1, 1);
    List<Transaction> transactions = transactionService.getTransactionsForUser(1);
    transactions.forEach(transaction -> assertThat(transaction.getId()).isNotEqualTo(1));
  }

  @Test(expected = EzNotFoundException.class)
  public void test_deleteTransactionForUser_with_invalid_userId() {
    transactionService.deleteTransactionForUser(1, -1);
  }

  @Test(expected = EzNotFoundException.class)
  public void test_deleteTransactionForUser_with_invalid_transactionId() {
    transactionService.deleteTransactionForUser(-1, 1);
  }

  @Test(expected = EzNotAuthorizedException.class)
  public void test_deleteTransactionForUser_with_nonMatching_user() {
    transactionService.deleteTransactionForUser(1, 2);
  }
}
