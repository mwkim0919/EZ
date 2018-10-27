package com.ez.ezbackend.budget.response;

import com.ez.ezbackend.budget.entity.Category;
import com.ez.ezbackend.budget.entity.Transaction;
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
public class TransactionResponse {
  private Long id;
  private Long categoryId;
  private String categoryName;
  private String description;

  @JsonSerialize(using = PriceJsonSerializer.class)
  private BigDecimal withdraw;
  @JsonSerialize(using = PriceJsonSerializer.class)
  private BigDecimal deposit;

  @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
  @JsonSerialize(using = LocalDateTimeSerializer.class)
  private LocalDateTime createDatetime;

  @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
  @JsonSerialize(using = LocalDateTimeSerializer.class)
  private LocalDateTime transactionDatetime;

  public static TransactionResponse convertFromTransaction(Transaction transaction) {
    Category category = transaction.getCategory();
    return TransactionResponse.builder()
        .id(transaction.getId())
        .categoryId(category.getId())
        .categoryName(category.getName())
        .description(transaction.getDescription())
        .withdraw(transaction.getWithdraw())
        .deposit(transaction.getDeposit())
        .createDatetime(transaction.getCreateDatetime())
        .transactionDatetime(transaction.getTransactionDatetime())
        .build();
  }
}
