package com.ez.ezbackend.budget.response;

import com.ez.ezbackend.budget.entity.Category;
import com.ez.ezbackend.budget.entity.Transaction;
import org.junit.Test;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThat;

public class TransactionResponseTest {
  @Test
  public void test_convertFromTransaction_success() {
    Category category = Category.builder()
        .id(1L)
        .name("Transportation")
        .build();
    Transaction transaction = Transaction.builder()
        .id(1L)
        .category(category)
        .description("description")
        .deposit(new BigDecimal("100.00"))
        .transactionDatetime(LocalDateTime.of(2018, 1, 1, 0, 0, 0))
        .build();
    TransactionResponse transactionResponse = TransactionResponse.convertFromTransaction(transaction);
    assertThat(transactionResponse.getId()).isEqualTo(1L);
    assertThat(transactionResponse.getCategoryId()).isEqualTo(1L);
    assertThat(transactionResponse.getCategoryName()).isEqualTo("Transportation");
    assertThat(transactionResponse.getDescription()).isEqualTo("description");
    assertThat(transactionResponse.getDeposit()).isEqualTo("100.00");
    assertThat(transactionResponse.getWithdraw()).isNull();
    assertThat(transactionResponse.getTransactionDatetime()).isEqualTo("2018-01-01T00:00:00");
  }
}