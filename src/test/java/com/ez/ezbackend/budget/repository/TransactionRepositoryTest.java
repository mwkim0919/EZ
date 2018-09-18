package com.ez.ezbackend.budget.repository;

import com.ez.ezbackend.EzBackendApplication;
import com.ez.ezbackend.H2JpaConfig;
import com.ez.ezbackend.budget.entity.Transaction;
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
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = {EzBackendApplication.class, H2JpaConfig.class})
@ActiveProfiles("test")
public class TransactionRepositoryTest {
  @Inject
  private TransactionRepository transactionRepository;

  @Test
  public void test_findAll() {
    List<Transaction> transactions = transactionRepository.findAll();
    assertThat(transactions.size()).isEqualTo(3);
  }

  @Test
  public void test_findById() {
    Optional<Transaction> transaction = transactionRepository.findById(2L);
    assertThat(transaction.isPresent()).isTrue();
    assertThat(transaction.get().getId()).isEqualTo(2);
    assertThat(transaction.get().getDescription()).isEqualTo("My second expense");
    assertThat(transaction.get().getWithdraw()).isEqualTo(new BigDecimal("100.00"));
  }

  @Test
  @DirtiesContext
  public void test_save() {
    Transaction transaction = Transaction.builder()
        .description("This is a test transaction")
        .deposit(new BigDecimal("123.45"))
        .transactionDatetime(LocalDateTime.now())
        .build();
    Transaction savedTransaction = transactionRepository.saveAndFlush(transaction);
    assertThat(transactionRepository.findAll().size()).isEqualTo(4);
    assertThat(savedTransaction.getId()).isNotNull();
    assertThat(savedTransaction.getCreateDatetime()).isNotNull();
  }

  @Test
  @DirtiesContext
  public void test_delete() {
    transactionRepository.deleteById(1L);
    assertThat(transactionRepository.findAll().size()).isEqualTo(2);
    Optional<Transaction> transaction = transactionRepository.findById(1L);
    assertThat(transaction.isPresent()).isFalse();
  }
}
