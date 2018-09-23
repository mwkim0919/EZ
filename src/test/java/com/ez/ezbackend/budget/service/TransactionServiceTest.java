package com.ez.ezbackend.budget.service;

import com.ez.ezbackend.EzBackendApplication;
import com.ez.ezbackend.H2JpaConfig;
import com.ez.ezbackend.budget.entity.Transaction;
import com.ez.ezbackend.budget.model.TransactionModel;
import com.ez.ezbackend.shared.exception.EzNotFoundException;
import com.ez.ezbackend.shared.exception.EzReadOnlyException;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import javax.inject.Inject;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = {EzBackendApplication.class, H2JpaConfig.class})
@ActiveProfiles("test")
public class TransactionServiceTest {
  @Inject
  private TransactionService transactionService;

  @Test
  public void test_getTransactionsForUser_success() {
    List<Transaction> transactions = transactionService.getTransactionsForUser(1L);
    assertThat(transactions.size()).isEqualTo(2);
    transactions.forEach(transaction -> assertThat(transaction.getUser().getId()).isEqualTo(1L));
  }

  @Test(expected = EzNotFoundException.class)
  public void test_getTransactionsForUser_with_invalid_userId() {
    transactionService.getTransactionsForUser(0L);
  }

  @Test
  public void test_saveTransactionForUser_success() {
    TransactionModel transactionRequest = TransactionModel.builder()
        .description("This is a test deposit")
        .deposit(new BigDecimal("1234.56"))
        .createDatetime(LocalDateTime.now())
        .transactionDatetime(LocalDateTime.now())
        .build();
    Transaction savedTransaction = transactionService.saveTransactionForUser(transactionRequest, 1L);
    assertThat(savedTransaction.getUser()).isNotNull();
    assertThat(savedTransaction.getId()).isNotNull();
  }

  @Test(expected = EzNotFoundException.class)
  public void test_saveTransactionForUser_with_invalid_userId() {
    TransactionModel transactionRequest = TransactionModel.builder()
        .description("This is a test deposit")
        .deposit(new BigDecimal("1234.56"))
        .createDatetime(LocalDateTime.now())
        .transactionDatetime(LocalDateTime.now())
        .build();
    transactionService.saveTransactionForUser(transactionRequest, 0L);
  }

  @Test
  @DirtiesContext
  public void test_updateTransactionForUser_success() {
    TransactionModel transactionRequest = TransactionModel.builder()
        .description("updated")
        .withdraw(new BigDecimal("999.99"))
        .transactionDatetime(LocalDateTime.of(2018, 1, 1, 0, 0))
        .build();
    Transaction transaction = transactionService.updateTransactionForUser(transactionRequest, 1, 1);
    assertThat(transaction.getId()).isEqualTo(1);
    assertThat(transaction.getDeposit()).isNull();
    assertThat(transaction.getWithdraw()).isEqualTo("999.99");
    assertThat(transaction.getTransactionDatetime()).isEqualTo("2018-01-01T00:00:00");
  }

  @Test(expected = EzNotFoundException.class)
  public void test_updateTransactionForUser_with_invalid_user() {
    TransactionModel transactionRequest = TransactionModel.builder()
        .description("updated")
        .withdraw(new BigDecimal("999.99"))
        .transactionDatetime(LocalDateTime.of(2018, 1, 1, 0, 0))
        .build();
    transactionService.updateTransactionForUser(transactionRequest, 1, -1);
  }

  @Test(expected = EzNotFoundException.class)
  public void test_updateTransactionForUser_with_invalid_transactionId() {
    TransactionModel transactionRequest = TransactionModel.builder()
        .description("updated")
        .withdraw(new BigDecimal("999.99"))
        .transactionDatetime(LocalDateTime.of(2018, 1, 1, 0, 0))
        .build();
    transactionService.updateTransactionForUser(transactionRequest, -1, 1);
  }

  @Test(expected = EzReadOnlyException.class)
  public void test_updateTransactionForUser_with_invalid_request() {
    TransactionModel transactionRequest = TransactionModel.builder()
        .id(100L)
        .description("updated")
        .withdraw(new BigDecimal("999.99"))
        .transactionDatetime(LocalDateTime.of(2018, 1, 1, 0, 0))
        .build();
    transactionService.updateTransactionForUser(transactionRequest, 1, 1);
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
}
