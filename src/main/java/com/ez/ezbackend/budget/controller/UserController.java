package com.ez.ezbackend.budget.controller;

import com.ez.ezbackend.budget.entity.Transaction;
import com.ez.ezbackend.budget.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import java.net.URI;
import java.util.List;

@RestController
public class UserController {

  //@Autowired
  //private UserRepository userRepository;

  @Inject
  private UserService userService;

  @GetMapping("/users/{id}/transactions")
  public ResponseEntity<List<Transaction>> get(@PathVariable("id") Long id, @RequestBody HttpServletRequest req) {
    // TODO: commenting out this for now. Will get back to it.
    //Optional<User> user = userRepository.findById(id);
    //List<Transaction> transactions = user.get().getTransactions();
    //return ResponseEntity.ok(transactions);
    return null;
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
