package com.ez.ezbackend.budget.service;

import com.ez.ezbackend.EzBackendApplication;
import com.ez.ezbackend.H2JpaConfig;
import com.ez.ezbackend.budget.entity.Transaction;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import javax.inject.Inject;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = {EzBackendApplication.class, H2JpaConfig.class})
@ActiveProfiles("test")
public class TransactionServiceTest {
  @Inject
  private TransactionService transactionService;

  @Test
  public void test() {
    List<Transaction> transactions = transactionService.getTransactionByUserId(1);
    assertThat(transactions.size()).isEqualTo(2);
    transactions.forEach(transaction -> assertThat(transaction.getUser().getEmail()).isEqualTo("test@test.com"));
  }
}
