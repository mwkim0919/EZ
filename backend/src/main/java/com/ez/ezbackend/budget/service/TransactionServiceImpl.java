package com.ez.ezbackend.budget.service;

import com.ez.ezbackend.budget.entity.Transaction;
import com.ez.ezbackend.budget.model.TransactionModel;
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

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor(onConstructor = @__(@Inject))
public class TransactionServiceImpl implements TransactionService {

  private final UserRepository userRepository;
  private final TransactionRepository transactionRepository;

  @Override
  public List<Transaction> getTransactionsForUser(long userId) {
    User user = userRepository.findById(userId)
        .orElseThrow(() -> new EzNotFoundException("User with ID: " + userId + " not found."));
    return transactionRepository.findByUser(user);
  }

  @Override
  public Transaction saveTransactionForUser(TransactionModel transactionRequest, long userId) {
    User user = userRepository.findById(userId)
        .orElseThrow(() -> new EzNotFoundException("User with ID: " + userId + " not found."));
    Transaction transaction = TransactionModel.convertToTransaction(transactionRequest, user);
    return transactionRepository.saveAndFlush(transaction);
  }

  @Override
  public Transaction updateTransactionForUser(TransactionModel transactionRequest, long transactionId, long userId) {
    User user = userRepository.findById(userId)
        .orElseThrow(() -> new EzNotFoundException("User with ID: " + userId + " not found."));
    transactionRepository.findById(transactionId)
        .orElseThrow(() -> new EzNotFoundException("Transaction with ID: " + transactionId + " not found."));
    Transaction transaction = TransactionModel.convertToTransaction(transactionRequest, user, transactionId);
    return transactionRepository.saveAndFlush(transaction);
  }

  @Override
  public void deleteTransactionForUser(long transactionId, long userId) {
    userRepository.findById(userId)
        .orElseThrow(() -> new EzNotFoundException("User with ID: " + userId + " not found."));
    Transaction transaction = transactionRepository.findById(transactionId)
        .orElseThrow(() -> new EzNotFoundException("Transaction with ID: " + transactionId + " not found."));
    transactionRepository.delete(transaction);
  }
}
