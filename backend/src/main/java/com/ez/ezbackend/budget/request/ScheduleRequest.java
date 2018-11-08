package com.ez.ezbackend.budget.request;

import com.ez.ezbackend.budget.entity.Category;
import com.ez.ezbackend.budget.entity.Schedule;
import com.ez.ezbackend.budget.enums.RecurringPattern;
import com.ez.ezbackend.shared.entity.User;
import com.ez.ezbackend.shared.exception.EzIllegalRequestException;
import com.google.common.base.Strings;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.HashSet;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ScheduleRequest {
  private Long categoryId;
  private String description;
  private BigDecimal deposit;
  private BigDecimal withdraw;
  private LocalDate startDate;
  private RecurringPattern recurringPattern;

  public static Schedule convertToSchedule(ScheduleRequest scheduleRequest) {
    return convertToSchedule(scheduleRequest, null, null, null);
  }

  public static Schedule convertToSchedule(ScheduleRequest scheduleRequest, User user) {
    return convertToSchedule(scheduleRequest, user, null, null);
  }

  public static Schedule convertToSchedule(ScheduleRequest scheduleRequest, User user, Category category) {
    return convertToSchedule(scheduleRequest, user, category, null);
  }

  public static Schedule convertToSchedule(ScheduleRequest scheduleRequest, User user, Category category, Long updatingScheduleId) {
    validateSchedule(scheduleRequest);

    return Schedule.builder()
        .id(updatingScheduleId)
        .user(user)
        .category(category)
        .description(scheduleRequest.getDescription())
        .deposit(scheduleRequest.getDeposit())
        .withdraw(scheduleRequest.getWithdraw())
        .startDate(scheduleRequest.getStartDate())
        .recurringPattern(scheduleRequest.getRecurringPattern())
        .build();
  }

  private static void validateSchedule(ScheduleRequest scheduleRequest) {
    if (Strings.isNullOrEmpty(scheduleRequest.description)) {
      throw new EzIllegalRequestException("Schedule must have a description.");
    }
    if (scheduleRequest.getDeposit() == null && scheduleRequest.getWithdraw() == null) {
      throw new EzIllegalRequestException("There should be either deposit or withdraw.");
    }
    if (scheduleRequest.getDeposit() != null && scheduleRequest.getWithdraw() != null) {
      throw new EzIllegalRequestException("There can't be both deposit and withdraw. Please choose one.");
    }
    if (scheduleRequest.getDeposit() != null && scheduleRequest.getDeposit().compareTo(BigDecimal.ZERO) < 0) {
      throw new EzIllegalRequestException("Deposit should be greater than 0.");
    }
    if (scheduleRequest.getWithdraw() != null && scheduleRequest.getWithdraw().compareTo(BigDecimal.ZERO) < 0) {
      throw new EzIllegalRequestException("Deposit should be greater than 0.");
    }
    if (scheduleRequest.getRecurringPattern() != null &&
        !new HashSet<>(Arrays.asList(RecurringPattern.values())).contains(scheduleRequest.getRecurringPattern())) {
      throw new EzIllegalRequestException("RecurringPattern must be one of yearly, bimonthly, monthly, biweekly, and weekly.");
    }
  }
}
