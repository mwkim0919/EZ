package com.ez.ezbackend.budget.entity;

import com.ez.ezbackend.shared.entity.User;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Objects;
import java.util.StringJoiner;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Transaction {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String description;

  @Column(name = "withdraw", precision = 10, scale = 2)
  private BigDecimal withdraw;

  @Column(name = "deposit", precision = 10, scale = 2)
  private BigDecimal deposit;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id", nullable = false)
  private User user;

  @CreationTimestamp
  @Column(name = "create_datetime")
  private LocalDateTime createDatetime;

  @Column(name = "transaction_datetime", nullable = false)
  @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
  private LocalDateTime transactionDatetime;

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    Transaction that = (Transaction) o;
    return Objects.equals(id, that.id) &&
        Objects.equals(user, that.user);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, user);
  }

  @Override
  public String toString() {
    return new StringJoiner(", ", Transaction.class.getSimpleName() + "[", "]")
        .add("id=" + id)
        .add("description='" + description + "'")
        .add("withdraw=" + withdraw)
        .add("deposit=" + deposit)
        .add("createDatetime=" + createDatetime)
        .add("transactionDatetime=" + transactionDatetime)
        .toString();
  }
}
