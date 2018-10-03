package com.ez.ezbackend.budget.model;

import com.ez.ezbackend.budget.entity.Transaction;
import com.ez.ezbackend.shared.entity.User;
import com.ez.ezbackend.shared.exception.EzIllegalRequestException;
import com.ez.ezbackend.shared.exception.EzReadOnlyException;
import com.ez.ezbackend.shared.serializer.PriceJsonSerializer;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TransactionModel {
  private Long id;
  private String description;
  @JsonSerialize(using = PriceJsonSerializer.class)
  private BigDecimal withdraw;
  @JsonSerialize(using = PriceJsonSerializer.class)
  private BigDecimal deposit;
  private LocalDateTime createDatetime;
  @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
  @JsonSerialize(using = LocalDateTimeSerializer.class)
  private LocalDateTime transactionDatetime;

  public static TransactionModel convertFromTransaction(Transaction transaction) {
    return TransactionModel.builder()
        .id(transaction.getId())
        .description(transaction.getDescription())
        .withdraw(transaction.getWithdraw())
        .deposit(transaction.getDeposit())
        .createDatetime(transaction.getCreateDatetime())
        .transactionDatetime(transaction.getTransactionDatetime())
        .build();
  }

  public static Transaction convertToTransaction(TransactionModel transactionModel) {
    return convertToTransaction(transactionModel, null);
  }

  public static Transaction convertToTransaction(TransactionModel transactionModel, User user) {
    return convertToTransaction(transactionModel, user, null);
  }

  public static Transaction convertToTransaction(TransactionModel transactionModel, User user, Long transactionId) {
    if (transactionModel.getId() != null) {
      throw new EzReadOnlyException("Id is read-only.");
    }
    if (transactionModel.getDeposit() == null && transactionModel.getWithdraw() == null) {
      throw new EzIllegalRequestException("There should be either deposit or withdraw.");
    }
    if (transactionModel.getDeposit() != null && transactionModel.getWithdraw() != null) {
      throw new EzIllegalRequestException("There can't be both deposit and withdraw. Please choose one.");
    }
    if (transactionModel.getDeposit() != null && transactionModel.getDeposit().compareTo(BigDecimal.ZERO) < 0) {
      throw new EzIllegalRequestException("Deposit should be greater than 0.");
    }
    if (transactionModel.getWithdraw() != null && transactionModel.getWithdraw().compareTo(BigDecimal.ZERO) < 0) {
      throw new EzIllegalRequestException("Deposit should be greater than 0.");
    }
    return Transaction.builder()
        .id(transactionId)
        .description(transactionModel.getDescription())
        .withdraw(transactionModel.getWithdraw())
        .deposit(transactionModel.getDeposit())
        .transactionDatetime(transactionModel.getTransactionDatetime())
        .user(user)
        .build();
  }
}
