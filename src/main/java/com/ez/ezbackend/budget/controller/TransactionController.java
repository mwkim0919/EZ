package com.ez.ezbackend.budget.controller;

import com.ez.ezbackend.budget.entity.Transaction;
import com.ez.ezbackend.budget.service.TransactionService;
import com.ez.ezbackend.shared.util.ControllerUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.inject.Inject;
import java.net.URI;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor(onConstructor = @__(@Inject))
public class TransactionController {

  private final TransactionService transactionService;

  @GetMapping("/users/{userId}/transactions")
  public ResponseEntity<List<Transaction>> getTransactionsForUser(@PathVariable("userId") long userId) {
    List<Transaction> transactions = transactionService.getTransactionsForUser(userId);
    return ResponseEntity.ok(transactions);
  }

  @PostMapping("/users/{userId}/transactions")
  public ResponseEntity<Transaction> saveTransactionForUser(
      @PathVariable("userId") long userId,
      @RequestBody Transaction transaction) {
    Transaction createdTransaction = transactionService.saveTransactionForUser(transaction, userId);
    URI location = ControllerUtil.createUri(createdTransaction.getId(), "users/" + userId + "/transactions/{id}");
    return ResponseEntity.created(location).body(createdTransaction);
  }
}