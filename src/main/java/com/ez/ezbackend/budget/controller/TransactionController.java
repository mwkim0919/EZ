package com.ez.ezbackend.budget.controller;

import com.ez.ezbackend.budget.entity.Transaction;
import com.ez.ezbackend.budget.repository.TransactionRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;

@Slf4j
@RestController
public class TransactionController {
  @Autowired
  private TransactionRepository repository;

  //@GetMapping(path = "/transactions")
  //public ResponseEntity<List<Transaction>> getAll(HttpServletRequest request) {
  //    List<Transaction> transactions = repository.findAll();
  //    logger.info("{} ", transactions);
  //    return ResponseEntity.ok(transactions);
  //}

  @GetMapping(path = "/transactions")
  public ResponseEntity<List<Transaction>> getAll(HttpServletRequest request) {
    List<Transaction> transactions = repository.findAll();
    log.info("{} ", transactions);
    //return transactions;
    return ResponseEntity.ok(transactions);
  }

  @GetMapping("/transactions/{id}")
  public Optional<Transaction> getById(@PathVariable Long id) {
    return repository.findById(id);
  }

  @PostMapping("/transactions")
  public ResponseEntity<Transaction> create(@RequestBody Transaction trx) {
    repository.save(trx);
    return ResponseEntity.ok(trx);
  }
}