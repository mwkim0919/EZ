package com.ez.ezbackend.budget.service;

import com.ez.ezbackend.budget.entity.Transaction;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.List;

@Service
public class TransactionServiceImpl implements TransactionService {

  @Inject
  private EntityManager entityManager;

  @Override
  public List<Transaction> getTransactionByUserId(long userId) {
    Query query = entityManager.createQuery(
        "SELECT t FROM Transaction t JOIN FETCH t.user u WHERE u.id = :userId", Transaction.class);
    query.setParameter("userId", userId);
    return (List<Transaction>) query.getResultList();
  }
}
