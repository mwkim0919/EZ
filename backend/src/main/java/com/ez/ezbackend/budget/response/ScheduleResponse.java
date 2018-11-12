package com.ez.ezbackend.budget.response;

import com.ez.ezbackend.budget.entity.Category;
import com.ez.ezbackend.budget.entity.Schedule;
import com.ez.ezbackend.shared.serializer.PriceJsonSerializer;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ScheduleResponse {
  private Long id;
  private Long categoryId;
  private String categoryName;
  private String description;

  @JsonSerialize(using = PriceJsonSerializer.class)
  private BigDecimal withdraw;

  @JsonSerialize(using = PriceJsonSerializer.class)
  private BigDecimal deposit;

  @JsonFormat(pattern = "yyyy-MM-dd")
  @JsonSerialize(using = LocalDateSerializer.class)
  private LocalDate startDate;

  @JsonFormat(pattern = "yyyy-MM-dd")
  @JsonSerialize(using = LocalDateSerializer.class)
  private LocalDate lastProcessedDate;

  @JsonFormat(pattern = "yyyy-MM-dd")
  @JsonSerialize(using = LocalDateSerializer.class)
  private LocalDate nextRecurringDate;

  @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
  @JsonSerialize(using = LocalDateTimeSerializer.class)
  private LocalDateTime createDatetime;

  private String recurringPattern;

  public static ScheduleResponse convertFromSchedule(Schedule schedule) {
    Category category = schedule.getCategory();
    return ScheduleResponse.builder()
        .id(schedule.getId())
        .categoryId(category != null ? category.getId() : null)
        .categoryName(category != null ? category.getName(): null)
        .description(schedule.getDescription())
        .withdraw(schedule.getWithdraw())
        .deposit(schedule.getDeposit())
        .startDate(LocalDate.now())
        .lastProcessedDate(schedule.getLastProcessedDate())
        .nextRecurringDate(LocalDate.now())
        .createDatetime(schedule.getCreateDateTime())
        .recurringPattern(schedule.getRecurringPattern().toString().toLowerCase())
        .build();
  }
}
