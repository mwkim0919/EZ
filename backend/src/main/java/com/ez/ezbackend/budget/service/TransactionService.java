package com.ez.ezbackend.budget.service;

import com.ez.ezbackend.budget.entity.Transaction;
import com.ez.ezbackend.budget.request.TransactionRequest;

import java.util.List;
import java.util.Set;

public interface TransactionService {
  List<Transaction> getTransactionsForUser(long userId);

  List<Transaction> saveTransactionsForUser(List<TransactionRequest> transactionRequests, long userId);

  Transaction updateTransactionForUser(TransactionRequest transactionRequest, long transactionId, long userId);

  void deleteTransactionsForUser(Set<Long> transactionIds, long userId);
}
