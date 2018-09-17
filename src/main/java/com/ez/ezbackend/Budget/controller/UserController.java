package com.ez.ezbackend.Budget.controller;

import com.ez.ezbackend.Budget.entity.Transaction;
import com.ez.ezbackend.Budget.entity.User;
import com.ez.ezbackend.Budget.repository.UserRepository;
import com.ez.ezbackend.Budget.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @GetMapping("/users/{id}/transactions")
    public ResponseEntity<List<Transaction>> get(@PathVariable("id") Long id, @RequestBody HttpServletRequest req) {
        Optional<User> user = userRepository.findById(id);
        List<Transaction> transactions = user.get().getTransactions();
        return ResponseEntity.ok(transactions);
    }

    @PostMapping("/users/{id}/transactions")
    public ResponseEntity<Transaction> create(@PathVariable("id") Long id, @RequestBody Transaction trx) {
        Transaction created = userService.saveTransaction(id, trx);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/user/" + id + "/transactions/{id}")
                .buildAndExpand(created.getId())
                .toUri();

        return ResponseEntity.created(location).body(created);
    }
}
