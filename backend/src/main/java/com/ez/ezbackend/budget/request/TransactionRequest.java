package com.ez.ezbackend.budget.request;

import com.ez.ezbackend.budget.entity.Category;
import com.ez.ezbackend.budget.entity.Transaction;
import com.ez.ezbackend.shared.entity.User;
import com.ez.ezbackend.shared.exception.EzIllegalRequestException;
import com.ez.ezbackend.shared.serializer.PriceJsonSerializer;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import com.google.common.base.Strings;
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
public class TransactionRequest {
  private Long categoryId;
  private String description;
  @JsonSerialize(using = PriceJsonSerializer.class)
  private BigDecimal withdraw;
  @JsonSerialize(using = PriceJsonSerializer.class)
  private BigDecimal deposit;
  private LocalDateTime createDatetime;
  @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
  @JsonSerialize(using = LocalDateTimeSerializer.class)
  private LocalDateTime transactionDatetime;

  public static Transaction convertToTransaction(TransactionRequest transactionRequest) {
    return convertToTransaction(transactionRequest, null);
  }

  public static Transaction convertToTransaction(TransactionRequest transactionRequest, User user) {
    return convertToTransaction(transactionRequest, user, null);
  }

  public static Transaction convertToTransaction(TransactionRequest transactionRequest, User user, Category category) {
    return convertToTransaction(transactionRequest, user, category, null);
  }

  public static Transaction convertToTransaction(TransactionRequest transactionRequest, User user,
                                                 Category category, Long updatingTransactionId) {
    validateTransactionRequest(transactionRequest);

    return Transaction.builder()
        .id(updatingTransactionId)
        .description(transactionRequest.getDescription())
        .withdraw(transactionRequest.getWithdraw())
        .deposit(transactionRequest.getDeposit())
        .transactionDatetime(transactionRequest.getTransactionDatetime())
        .user(user)
        .category(category)
        .build();
  }

  private static void validateTransactionRequest(TransactionRequest transactionRequest) {
    if (Strings.isNullOrEmpty(transactionRequest.getDescription())) {
      throw new EzIllegalRequestException("Transaction must have a description.");
    }
    if (transactionRequest.getDeposit() == null && transactionRequest.getWithdraw() == null) {
      throw new EzIllegalRequestException("There should be either deposit or withdraw.");
    }
    if (transactionRequest.getDeposit() != null && transactionRequest.getWithdraw() != null) {
      throw new EzIllegalRequestException("There can't be both deposit and withdraw. Please choose one.");
    }
    if (transactionRequest.getDeposit() != null && transactionRequest.getDeposit().compareTo(BigDecimal.ZERO) < 0) {
      throw new EzIllegalRequestException("Deposit should be greater than 0.");
    }
    if (transactionRequest.getWithdraw() != null && transactionRequest.getWithdraw().compareTo(BigDecimal.ZERO) < 0) {
      throw new EzIllegalRequestException("Deposit should be greater than 0.");
    }
  }
}
