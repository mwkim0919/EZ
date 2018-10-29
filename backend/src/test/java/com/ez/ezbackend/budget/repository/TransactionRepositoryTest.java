package com.ez.ezbackend.budget.repository;

import com.ez.ezbackend.DatabaseIntegrationTest;
import com.ez.ezbackend.budget.entity.Transaction;
import com.ez.ezbackend.shared.entity.User;
import com.ez.ezbackend.shared.repository.UserRepository;
import org.junit.Test;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

public class TransactionRepositoryTest extends DatabaseIntegrationTest {
  @Inject
  private TransactionRepository transactionRepository;
  @Inject
  private UserRepository userRepository;

  @Test
  @Transactional
  public void test_findByUserId() {
    List<Transaction> transactions = transactionRepository.findByUserId(1);
    assertThat(transactions).hasSize(25);
    transactions.forEach(transaction -> assertThat(transaction.getUser().getEmail()).isEqualTo("test@test.com"));
  }

  @Test
  @Transactional
  public void test_findByUser() {
    Optional<User> user = userRepository.findById(1L);
    List<Transaction> transactions = transactionRepository.findByUser(user.get());
    assertThat(transactions).hasSize(25);
    transactions.forEach(transaction -> assertThat(transaction.getUser().getEmail()).isEqualTo("test@test.com"));
    transactions.forEach(transaction -> assertThat(transaction.getCategory()).isNotNull());
  }
}
