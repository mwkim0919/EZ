package com.ez.ezbackend.budget.service;

import com.ez.ezbackend.budget.entity.Transaction;
import com.ez.ezbackend.budget.repository.TransactionRepository;
import com.ez.ezbackend.shared.entity.User;
import com.ez.ezbackend.shared.exception.EzNotFoundException;
import com.ez.ezbackend.shared.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor(onConstructor = @__(@Inject))
public class TransactionServiceImpl implements TransactionService {

  private final UserRepository userRepository;
  private final TransactionRepository transactionRepository;

  @Override
  public List<Transaction> getTransactionsForUser(long userId) {
    Optional<User> userOpt = userRepository.findById(userId);
    if (!userOpt.isPresent()) {
      throw new EzNotFoundException("User with ID: " + userId + " not found.");
    }
    return transactionRepository.findByUser(userOpt.get());
  }


  @Override
  public Transaction saveTransactionForUser(Transaction transaction, long userId) {
    Optional<User> userOpt = userRepository.findById(userId);
    if (!userOpt.isPresent()) {
      throw new EzNotFoundException("test");
    }
    transaction.setUser(userOpt.get());
    return transactionRepository.saveAndFlush(transaction);
  }
}
