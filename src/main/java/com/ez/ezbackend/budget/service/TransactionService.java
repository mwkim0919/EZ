package com.ez.ezbackend.budget.service;

import com.ez.ezbackend.budget.entity.Transaction;

import java.util.List;

public interface TransactionService {
  List<Transaction> getTransactionByUserId(long userId);
}
