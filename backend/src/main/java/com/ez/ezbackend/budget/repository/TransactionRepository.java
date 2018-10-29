package com.ez.ezbackend.budget.repository;

import com.ez.ezbackend.budget.entity.Transaction;
import com.ez.ezbackend.shared.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
  @Query("SELECT t FROM Transaction t JOIN t.user u WHERE u.id = :userId")
  List<Transaction> findByUserId(@Param("userId") long userId);

  // Retrieve all transactions and associated categories for a user
  @Query("SELECT t FROM Transaction t JOIN FETCH t.category c WHERE t.user = :user ORDER BY t.transactionDatetime DESC")
  List<Transaction> findByUser(@Param("user") User user);

  @Query("SELECT t FROM Transaction t WHERE t.id IN :transactionIds AND t.user = :user")
  List<Transaction> findTransactionsByIdsAndUser(
      @Param("transactionIds") Set<Long> transactionIds, @Param("user") User user);

  @Modifying
  @Query("DELETE FROM Transaction t WHERE t IN :transactions AND t.user = :user")
  void deleteTransactionsByUser(@Param("transactions") List<Transaction> transactions, @Param("user") User user);
}