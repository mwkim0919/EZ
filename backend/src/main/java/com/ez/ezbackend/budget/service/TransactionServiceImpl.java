package com.ez.ezbackend.budget.service;

import com.ez.ezbackend.budget.entity.Category;
import com.ez.ezbackend.budget.entity.Transaction;
import com.ez.ezbackend.budget.request.TransactionRequest;
import com.ez.ezbackend.budget.repository.CategoryRepository;
import com.ez.ezbackend.budget.repository.TransactionRepository;
import com.ez.ezbackend.shared.entity.User;
import com.ez.ezbackend.shared.exception.EzIllegalRequestException;
import com.ez.ezbackend.shared.exception.EzNotAuthorizedException;
import com.ez.ezbackend.shared.exception.EzNotFoundException;
import com.ez.ezbackend.shared.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

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
  public List<Transaction> saveTransactionsForUser(List<TransactionRequest> transactionRequests, long userId) {
    User user = userRepository.findById(userId)
        .orElseThrow(() -> new EzNotFoundException("User with ID: " + userId + " not found."));
    Set<Long> uniqueCategoryIds = transactionRequests.stream()
        .map(TransactionRequest::getCategoryId)
        .collect(Collectors.toSet());

    List<Category> categories = categoryRepository.findCategoriesByIdsAndUser(uniqueCategoryIds, user);
    Map<Long, Category> categoryMap = categories.stream().collect(Collectors.toMap(Category::getId, Function.identity()));

    List<Transaction> transactions = transactionRequests.stream()
        .map(transactionRequest -> {
          Category transactionCategory = categoryMap.get(transactionRequest.getCategoryId());
          return TransactionRequest.convertToTransaction(transactionRequest, user, transactionCategory);
        })
        .collect(Collectors.toList());
    return transactionRepository.saveAll(transactions);
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
  public void deleteTransactionsForUser(Set<Long> transactionIds, long userId) {
    if (transactionIds.isEmpty()) {
      throw new EzIllegalRequestException("There is no transaction to be deleted.");
    }
    User user = userRepository.findById(userId)
        .orElseThrow(() -> new EzNotFoundException("User with ID: " + userId + " not found."));
    List<Transaction> transactions = transactionRepository.findTransactionsByIdsAndUser(transactionIds, user);
    if (transactions.size() != transactionIds.size()) {
      throw new EzIllegalRequestException("Some transactions are not found or cannot be deleted.");
    }
    transactionRepository.deleteTransactionsByUser(transactions, user);
  }
}
