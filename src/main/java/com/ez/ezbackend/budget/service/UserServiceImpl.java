package com.ez.ezbackend.budget.service;

import com.ez.ezbackend.budget.entity.Transaction;
import com.ez.ezbackend.budget.entity.User;
import com.ez.ezbackend.budget.repository.TransactionRepository;
import com.ez.ezbackend.budget.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Transaction saveTransaction(Long userId, Transaction trx) {
        Optional<User> user = userRepository.findById(userId);
        user.ifPresent(trx::setUser);
        return transactionRepository.saveAndFlush(trx);
    }
}
