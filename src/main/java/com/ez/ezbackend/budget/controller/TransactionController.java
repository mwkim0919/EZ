package com.ez.ezbackend.budget.controller;

import com.ez.ezbackend.budget.entity.Transaction;
import com.ez.ezbackend.budget.repository.TransactionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;

@RestController
//@RequestMapping(value = "/api")
public class TransactionController {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private TransactionRepository repository;

//    @GetMapping(path = "/transactions")
//    public ResponseEntity<List<Transaction>> getAll(HttpServletRequest request) {
//        List<Transaction> transactions = repository.findAll();
//        logger.info("{} ", transactions);
//        return ResponseEntity.ok(transactions);
//    }

    @GetMapping(path = "/transactions")
    public ResponseEntity<List<Transaction>> getAll(HttpServletRequest request) {
        List<Transaction> transactions = repository.findAll();
        logger.info("{} ", transactions);
//        return transactions;
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
