package com.ez.ezbackend.budget.service;

import com.ez.ezbackend.budget.entity.Transaction;
import com.ez.ezbackend.budget.request.TransactionRequest;

import java.util.List;

public interface TransactionService {
  List<Transaction> getTransactionsForUser(long userId);

  Transaction saveTransactionForUser(TransactionRequest transactionRequest, long userId);

  Transaction updateTransactionForUser(TransactionRequest transactionRequest, long transactionId, long userId);

  void deleteTransactionForUser(long transactionId, long userId);
}
