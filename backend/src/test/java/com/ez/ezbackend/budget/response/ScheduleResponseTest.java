package com.ez.ezbackend.budget.response;

import com.ez.ezbackend.budget.entity.Category;
import com.ez.ezbackend.budget.entity.Schedule;
import com.ez.ezbackend.budget.enums.RecurringPattern;
import org.junit.Test;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThat;

public class ScheduleResponseTest {
  @Test
  public void test_convertFromSchedule() {
    Category category = Category.builder()
        .id(1L)
        .name("Transportation")
        .categoryLimit(new BigDecimal("200.00"))
        .createDatetime(LocalDateTime.now())
        .build();
    Schedule schedule = Schedule.builder()
        .id(1L)
        .description("Month pass")
        .category(category)
        .withdraw(new BigDecimal("189.00"))
        .startDate(LocalDate.now())
        .recurringPattern(RecurringPattern.MONTHLY)
        .nextRecurringDate(LocalDate.now().plusMonths(1))
        .build();

    ScheduleResponse scheduleResponse = ScheduleResponse.convertFromSchedule(schedule);
    assertThat(scheduleResponse.getId()).isEqualTo(schedule.getId());
    assertThat(scheduleResponse.getDescription()).isEqualTo(schedule.getDescription());
    assertThat(scheduleResponse.getCategoryId()).isEqualTo(category.getId());
    assertThat(scheduleResponse.getWithdraw()).isEqualTo(schedule.getWithdraw());
    assertThat(scheduleResponse.getRecurringPattern()).isEqualTo(schedule.getRecurringPattern());
    assertThat(scheduleResponse.getStartDate()).isEqualTo(schedule.getStartDate());
    assertThat(scheduleResponse.getNextRecurringDate()).isEqualTo(schedule.getNextRecurringDate());
  }
}
