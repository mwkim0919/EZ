package com.ez.ezbackend.budget.controller;

import com.ez.ezbackend.budget.entity.Transaction;
import com.ez.ezbackend.budget.model.TransactionModel;
import com.ez.ezbackend.budget.service.TransactionService;
import com.ez.ezbackend.shared.util.ControllerUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.inject.Inject;
import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequiredArgsConstructor(onConstructor = @__(@Inject))
public class TransactionController {

  private static final String GET_TRANSACTIONS_URI = "/users/{userId}/transactions";
  private static final String CREATE_TRANSACTION_URI = "/users/{userId}/transactions";
  private static final String UPDATE_DELETE_TRANSACTION_URI = "/users/{userId}/transactions/{transactionId}";

  private final TransactionService transactionService;

  @GetMapping(GET_TRANSACTIONS_URI)
  public ResponseEntity<List<TransactionModel>> getTransactionsForUser(@PathVariable("userId") long userId) {
    List<Transaction> transactions = transactionService.getTransactionsForUser(userId);
    List<TransactionModel> transactionResponse = transactions.stream()
        .map(TransactionModel::convertFromTransaction)
        .collect(Collectors.toList());
    return ResponseEntity.ok(transactionResponse);
  }

  @PostMapping(CREATE_TRANSACTION_URI)
  public ResponseEntity<TransactionModel> saveTransactionForUser(
      @PathVariable("userId") long userId,
      @RequestBody TransactionModel transactionRequest) {
    Transaction createdTransaction = transactionService.saveTransactionForUser(transactionRequest, userId);
    TransactionModel transactionResponse = TransactionModel.convertFromTransaction(createdTransaction);
    URI location = ControllerUtil.createUri(transactionResponse.getId(), "users/" + userId + "/transactions/{id}");
    return ResponseEntity.created(location).body(transactionResponse);
  }

  @PutMapping(UPDATE_DELETE_TRANSACTION_URI)
  public ResponseEntity<TransactionModel> updateTransactionForUser(
      @PathVariable("userId") long userId,
      @PathVariable("transactionId") long transactionId,
      @RequestBody TransactionModel transactionRequest) {
    Transaction updatedTransaction = transactionService.updateTransactionForUser(transactionRequest, transactionId, userId);
    TransactionModel transactionResponse = TransactionModel.convertFromTransaction(updatedTransaction);
    return ResponseEntity.ok(transactionResponse);
  }

  @DeleteMapping(UPDATE_DELETE_TRANSACTION_URI)
  public ResponseEntity deleteTransactionForUser(
      @PathVariable("userId") long userId,
      @PathVariable("transactionId") long transactionId) {
    transactionService.deleteTransactionForUser(transactionId, userId);
    return ResponseEntity.accepted().build();
  }

}