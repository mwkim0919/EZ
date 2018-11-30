package com.ez.ezbackend.budget.request;

import com.ez.ezbackend.budget.entity.Category;
import com.ez.ezbackend.budget.entity.Schedule;
import com.ez.ezbackend.budget.enums.RecurringPattern;
import com.ez.ezbackend.shared.entity.User;
import com.ez.ezbackend.shared.exception.EzIllegalRequestException;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;
import com.google.common.base.Strings;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ScheduleRequest {
  private Long categoryId;
  private String description;
  private BigDecimal deposit;
  private BigDecimal withdraw;

  @JsonFormat(pattern = "yyyy-MM-dd")
  @JsonSerialize(using = LocalDateSerializer.class)
  private LocalDate startDate;

  private RecurringPattern recurringPattern;

  public static Schedule convertToSchedule(ScheduleRequest scheduleRequest, User user, Category category) {
    return convertToSchedule(scheduleRequest, user, category, null);
  }

  public static Schedule convertToSchedule(ScheduleRequest scheduleRequest, User user, Category category, Schedule previousSchedule) {
    validateSchedule(scheduleRequest, category, previousSchedule);

    return Schedule.builder()
        .id(previousSchedule != null ? previousSchedule.getId() : null)
        .user(user)
        .category(category)
        .description(scheduleRequest.getDescription())
        .deposit(scheduleRequest.getDeposit())
        .withdraw(scheduleRequest.getWithdraw())
        .startDate(previousSchedule != null ? previousSchedule.getStartDate() : scheduleRequest.getStartDate())
        .recurringPattern(scheduleRequest.getRecurringPattern())
        .lastProcessedDate(previousSchedule != null ? previousSchedule.getLastProcessedDate() : null)
        // If we're creating schedule, next recurring date will be set to startDate
        .nextRecurringDate(previousSchedule != null ? previousSchedule.getNextRecurringDate() : scheduleRequest.getStartDate())
        .build();
  }

  private static void validateSchedule(ScheduleRequest scheduleRequest, Category category, Schedule previousSchedule) {
    // Category will be null if user tries to send a ScheduleRequest with category that he shouldn't have access to
    if (category == null) {
      throw new EzIllegalRequestException("Schedule must have an associated category.");
    }
    if (Strings.isNullOrEmpty(scheduleRequest.getDescription())) {
      throw new EzIllegalRequestException("Schedule must have a description.");
    }
    if (scheduleRequest.getDeposit() == null && scheduleRequest.getWithdraw() == null) {
      throw new EzIllegalRequestException("There should be either deposit or withdraw.");
    }
    if (scheduleRequest.getDeposit() != null && scheduleRequest.getWithdraw() != null) {
      throw new EzIllegalRequestException("There can't be both deposit and withdraw. Please choose one.");
    }
    if (scheduleRequest.getDeposit() != null && scheduleRequest.getDeposit().compareTo(BigDecimal.ZERO) <= 0) {
      throw new EzIllegalRequestException("Deposit should be greater than 0.");
    }
    if (scheduleRequest.getWithdraw() != null && scheduleRequest.getWithdraw().compareTo(BigDecimal.ZERO) <= 0) {
      throw new EzIllegalRequestException("Withdraw should be greater than 0.");
    }
    if (scheduleRequest.getRecurringPattern() == null) {
      throw new EzIllegalRequestException("RecurringPattern must be one of yearly, bimonthly, monthly, biweekly, and weekly.");
    }
    // If we're creating a schedule, check startDate > now
    if (previousSchedule == null && scheduleRequest.getStartDate().isAfter(LocalDate.now())) {
      throw new EzIllegalRequestException("Start date must come after today.");
    }
  }
}
