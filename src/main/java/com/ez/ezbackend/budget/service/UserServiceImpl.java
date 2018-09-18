package com.ez.ezbackend.budget.service;

import com.ez.ezbackend.budget.entity.Transaction;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

  //@Autowired
  //private TransactionRepository transactionRepository;

  //@Autowired
  //private UserRepository userRepository;

  @Override
  public Transaction saveTransaction(Long userId, Transaction trx) {
    // TODO: Commenting out for now. Need to discuss how we would implement this.
    //Optional<User> user = userRepository.findById(userId);
    //user.ifPresent(trx::setUser);
    //return transactionRepository.saveAndFlush(trx);
    return null;
  }
}
