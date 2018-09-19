package com.ez.ezbackend.shared.service;

import com.ez.ezbackend.budget.entity.Transaction;

public interface UserService {
  Transaction saveTransaction(Long userId, Transaction trx);
}
