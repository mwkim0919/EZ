package com.ez.ezbackend.budget.repository;

import com.ez.ezbackend.budget.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;

@Repository
public interface  TransactionRepository extends JpaRepository<Transaction, Long> {
    Collection<Transaction> findByUserId(String email);
}
