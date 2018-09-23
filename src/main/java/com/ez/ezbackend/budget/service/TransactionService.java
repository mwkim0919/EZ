package com.ez.ezbackend.budget.service;

import com.ez.ezbackend.budget.entity.Transaction;
import com.ez.ezbackend.budget.model.TransactionModel;

import java.util.List;

public interface TransactionService {
  List<Transaction> getTransactionsForUser(long userId);

  Transaction saveTransactionForUser(TransactionModel transactionRequest, long userId);

  Transaction updateTransactionForUser(TransactionModel transactionRequest, long transactionId, long userId);

  void deleteTransactionForUser(long transactionId, long userId);
}
