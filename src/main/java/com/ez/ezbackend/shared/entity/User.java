package com.ez.ezbackend.shared.entity;

import com.ez.ezbackend.budget.entity.Transaction;
import com.ez.ezbackend.shared.enums.UserRole;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String email;

  @Column(nullable = false)
  @JsonIgnore
  private String password;

  @Enumerated(EnumType.STRING)
  private UserRole role;

  @OneToMany(fetch = FetchType.LAZY, mappedBy = "user")
  private List<Transaction> transactions = new ArrayList<>();

  @CreationTimestamp
  @Column(name = "create_datetime")
  private LocalDateTime createDatetime;

  @Column(name = "last_login_datetime")
  private LocalDateTime lastLoginDatetime;

  public void addTransaction(Transaction transaction) {
    this.transactions.add(transaction);
  }

  public void removeTransaction(Transaction transaction) {
    this.transactions.remove(transaction);
  }
}
