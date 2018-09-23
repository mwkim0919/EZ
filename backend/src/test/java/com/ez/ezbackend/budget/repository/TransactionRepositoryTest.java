package com.ez.ezbackend.budget.repository;

import com.ez.ezbackend.EzBackendApplication;
import com.ez.ezbackend.H2JpaConfig;
import com.ez.ezbackend.budget.entity.Transaction;
import com.ez.ezbackend.shared.entity.User;
import com.ez.ezbackend.shared.repository.UserRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

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

  @Inject
  private UserRepository userRepository;

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
    Optional<User> user = userRepository.findById(1L);
    Transaction transaction = Transaction.builder()
        .description("This is a test transaction")
        .deposit(new BigDecimal("123.45"))
        .transactionDatetime(LocalDateTime.now())
        .user(user.get())
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

  @Test
  @Transactional
  public void test_findByUserId() {
    List<Transaction> transactions = transactionRepository.findByUserId(1);
    assertThat(transactions.size()).isEqualTo(2);
    transactions.forEach(transaction -> assertThat(transaction.getUser().getEmail()).isEqualTo("test@test.com"));
  }

  @Test
  @Transactional
  public void test_findByUser() {
    Optional<User> user = userRepository.findById(1L);
    List<Transaction> transactions = transactionRepository.findByUser(user.get());
    assertThat(transactions.size()).isEqualTo(2);
    transactions.forEach(transaction -> assertThat(transaction.getUser().getEmail()).isEqualTo("test@test.com"));
  }
}
