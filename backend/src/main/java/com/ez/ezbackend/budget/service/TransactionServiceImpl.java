package com.ez.ezbackend.budget.service;

import com.ez.ezbackend.budget.entity.Category;
import com.ez.ezbackend.budget.entity.Transaction;
import com.ez.ezbackend.budget.request.TransactionRequest;
import com.ez.ezbackend.budget.repository.CategoryRepository;
import com.ez.ezbackend.budget.repository.TransactionRepository;
import com.ez.ezbackend.shared.entity.User;
import com.ez.ezbackend.shared.exception.EzNotAuthorizedException;
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
  private final CategoryRepository categoryRepository;

  @Override
  public List<Transaction> getTransactionsForUser(long userId) {
    User user = userRepository.findById(userId)
        .orElseThrow(() -> new EzNotFoundException("User with ID: " + userId + " not found."));
    return transactionRepository.findByUser(user);
  }

  @Override
  public Transaction saveTransactionForUser(TransactionRequest transactionRequest, long userId) {
    Category category = categoryRepository.findById(transactionRequest.getCategoryId())
        .orElseThrow(() -> new EzNotFoundException("Category with ID: " + transactionRequest.getCategoryId() + " not found."));
    User user = userRepository.findById(userId)
        .orElseThrow(() -> new EzNotFoundException("User with ID: " + userId + " not found."));
    Transaction transaction = TransactionRequest.convertToTransaction(transactionRequest, user, category);
    return transactionRepository.saveAndFlush(transaction);
  }

  @Override
  public Transaction updateTransactionForUser(TransactionRequest transactionRequest, long transactionId, long userId) {
    Category category = categoryRepository.findById(transactionRequest.getCategoryId())
        .orElseThrow(() -> new EzNotFoundException("Category with ID: " + transactionRequest.getCategoryId() + " not found."));
    User user = userRepository.findById(userId)
        .orElseThrow(() -> new EzNotFoundException("User with ID: " + userId + " not found."));
    Transaction transaction = transactionRepository.findById(transactionId)
        .orElseThrow(() -> new EzNotFoundException("Transaction with ID: " + transactionId + " not found."));
    if (userId != transaction.getUser().getId()) {
      throw new EzNotAuthorizedException("User with ID: " + userId + " not authorized to delete the requested transaction.");
    }
    Transaction updatedTransaction = TransactionRequest.convertToTransaction(transactionRequest, user, category, transactionId);
    return transactionRepository.saveAndFlush(updatedTransaction);
  }

  @Override
  public void deleteTransactionForUser(long transactionId, long userId) {
    userRepository.findById(userId)
        .orElseThrow(() -> new EzNotFoundException("User with ID: " + userId + " not found."));
    Transaction transaction = transactionRepository.findById(transactionId)
        .orElseThrow(() -> new EzNotFoundException("Transaction with ID: " + transactionId + " not found."));
    if (userId != transaction.getUser().getId()) {
      throw new EzNotAuthorizedException("User with ID: " + userId + " not authorized to delete the requested transaction.");
    }
    transactionRepository.delete(transaction);
  }
}
