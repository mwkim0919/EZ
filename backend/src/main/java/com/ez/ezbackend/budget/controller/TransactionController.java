package com.ez.ezbackend.budget.controller;

import com.ez.ezbackend.budget.entity.Transaction;
import com.ez.ezbackend.budget.request.TransactionRequest;
import com.ez.ezbackend.budget.response.TransactionResponse;
import com.ez.ezbackend.budget.service.TransactionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.inject.Inject;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequiredArgsConstructor(onConstructor = @__(@Inject))
@RequestMapping("/api")
@PreAuthorize("#userId == principal.id")
public class TransactionController {

  private static final String GET_TRANSACTIONS_URI = "/users/{userId}/transactions";
  private static final String CREATE_TRANSACTION_URI = "/users/{userId}/transactions";
  private static final String UPDATE_DELETE_TRANSACTION_URI = "/users/{userId}/transactions/{transactionId}";

  private final TransactionService transactionService;

  @GetMapping(GET_TRANSACTIONS_URI)
  public ResponseEntity<List<TransactionResponse>> getTransactionsForUser(
      @PathVariable("userId") long userId) {
    List<Transaction> transactions = transactionService.getTransactionsForUser(userId);
    List<TransactionResponse> transactionResponse = transactions.stream()
        .map(TransactionResponse::convertFromTransaction)
        .collect(Collectors.toList());
    return ResponseEntity.ok(transactionResponse);
  }

  @PostMapping(CREATE_TRANSACTION_URI)
  public ResponseEntity<List<TransactionResponse>> saveTransactionForUser(
      @PathVariable("userId") long userId,
      @RequestBody List<TransactionRequest> transactionRequests) {
    List<Transaction> createdTransactions =
        transactionService.saveTransactionsForUser(transactionRequests, userId);
    List<TransactionResponse> transactionResponses = createdTransactions.stream()
        .map(TransactionResponse::convertFromTransaction)
        .collect(Collectors.toList());
    return ResponseEntity.ok(transactionResponses);
  }

  @PutMapping(UPDATE_DELETE_TRANSACTION_URI)
  public ResponseEntity<TransactionResponse> updateTransactionForUser(
      @PathVariable("userId") long userId,
      @PathVariable("transactionId") long transactionId,
      @RequestBody TransactionRequest transactionRequest) {
    Transaction updatedTransaction = transactionService.updateTransactionForUser(transactionRequest, transactionId, userId);
    TransactionResponse transactionResponse = TransactionResponse.convertFromTransaction(updatedTransaction);
    return ResponseEntity.ok(transactionResponse);
  }

  @DeleteMapping(UPDATE_DELETE_TRANSACTION_URI)
  public ResponseEntity deleteTransactionForUser(
      @PathVariable("userId") long userId,
      @PathVariable("transactionId") Set<Long> transactionIds) {
    transactionService.deleteTransactionsForUser(transactionIds, userId);
    return ResponseEntity.accepted().build();
  }
}