package com.ez.ezbackend.budget.service;

import com.ez.ezbackend.budget.entity.Transaction;

public interface UserService {
    Transaction saveTransaction(Long userId, Transaction trx);
}
