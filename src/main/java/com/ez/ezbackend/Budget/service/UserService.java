package com.ez.ezbackend.Budget.service;

import com.ez.ezbackend.Budget.entity.Transaction;

public interface UserService {
    Transaction saveTransaction(Long userId, Transaction trx);
}
