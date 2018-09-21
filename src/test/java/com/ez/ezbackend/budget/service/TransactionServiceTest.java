package com.ez.ezbackend.budget.service;

import com.ez.ezbackend.EzBackendApplication;
import com.ez.ezbackend.H2JpaConfig;
import com.ez.ezbackend.budget.entity.Transaction;
import com.ez.ezbackend.shared.exception.EzNotFoundException;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
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
  public void test_getTransactionsForUser() {
    List<Transaction> transactions = transactionService.getTransactionsForUser(1L);
    assertThat(transactions.size()).isEqualTo(2);
    transactions.forEach(transaction -> assertThat(transaction.getUser().getId()).isEqualTo(1L));
  }

  @Test(expected = EzNotFoundException.class)
  public void test_getTransactionsForUser_with_invalid_userId() {
    transactionService.getTransactionsForUser(0L);
  }

  @Test
  public void test_saveTransactionForUser() {
    Transaction transaction = Transaction.builder()
        .description("This is a test deposit")
        .deposit(new BigDecimal("1234.56"))
        .createDatetime(LocalDateTime.now())
        .transactionDatetime(LocalDateTime.now())
        .build();
    Transaction savedTransaction = transactionService.saveTransactionForUser(transaction, 1L);
    assertThat(savedTransaction.getUser()).isNotNull();
    assertThat(savedTransaction.getId()).isNotNull();
  }

  @Test(expected = EzNotFoundException.class)
  public void test_saveTransactionForUser_with_invalid_userId() {
    Transaction transaction = Transaction.builder()
        .description("This is a test deposit")
        .deposit(new BigDecimal("1234.56"))
        .createDatetime(LocalDateTime.now())
        .transactionDatetime(LocalDateTime.now())
        .build();
    transactionService.saveTransactionForUser(transaction, 0L);
  }
}
