package com.ez.ezbackend.budget.entity;

import com.ez.ezbackend.budget.enums.RecurringPattern;
import com.ez.ezbackend.budget.enums.TransactionType;
import com.ez.ezbackend.shared.entity.User;
import org.junit.Test;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import static org.assertj.core.api.Assertions.assertThat;

public class ScheduleTest {

  @Test
  public void testConvertToTransaction_withDeposit() {
    testConvertToTransaction(TransactionType.DEPOSIT);
  }

  @Test
  public void testConvertToTransaction_withWithdraw() {
    testConvertToTransaction(TransactionType.WITHDRAW);
  }
  
  @Test
  public void testGetNextSchedule_yearly() {
    testGetNextSchedule(RecurringPattern.YEARLY);
  }

  @Test
  public void testGetNextSchedule_bimonthly() {
    testGetNextSchedule(RecurringPattern.BI_MONTHLY);
  }

  @Test
  public void testGetNextSchedule_monthly() {
    testGetNextSchedule(RecurringPattern.MONTHLY);
  }

  @Test
  public void testGetNextSchedule_biweekly() {
    testGetNextSchedule(RecurringPattern.BI_WEEKLY);
  }

  @Test
  public void testGetNextSchedule_weekly() {
    testGetNextSchedule(RecurringPattern.WEEKLY);
  }

  private void testConvertToTransaction(TransactionType transactionType) {
    Schedule schedule = Schedule.builder()
        .id(1L)
        .user(new User())
        .category(new Category())
        .description("this is my test schedule")
        .deposit(transactionType == TransactionType.DEPOSIT ? new BigDecimal("2000.00") : null)
        .withdraw(transactionType == TransactionType.WITHDRAW ? new BigDecimal("2000.00") : null)
        .recurringPattern(RecurringPattern.BI_WEEKLY)
        .startDate(LocalDate.now().minusYears(1L))
        .lastProcessedDate(LocalDate.now().minusWeeks(2L))
        .nextRecurringDate(LocalDate.now())
        .createDateTime(LocalDateTime.now())
        .build();
    Transaction transaction = Schedule.convertToTransaction(schedule);
    assertThat(transaction.getId()).isNull();
    assertThat(transaction.getDescription()).isEqualTo(schedule.getDescription());
    assertThat(transaction.getCategory()).isEqualTo(schedule.getCategory());
    assertThat(transaction.getUser()).isEqualTo(schedule.getUser());
    if (transactionType == TransactionType.DEPOSIT) {
      assertThat(transaction.getDeposit()).isEqualTo(schedule.getDeposit());
      assertThat(transaction.getWithdraw()).isNull();
    } else {
      assertThat(transaction.getWithdraw()).isEqualTo(schedule.getWithdraw());
      assertThat(transaction.getDeposit()).isNull();
    }
    assertThat(transaction.getTransactionDatetime())
        .isEqualTo(LocalDateTime.of(schedule.getNextRecurringDate(), LocalTime.of(0, 0)));
  }

  private void testGetNextSchedule(RecurringPattern recurringPattern) {
    Schedule schedule = Schedule.builder()
        .id(1L)
        .user(new User())
        .category(new Category())
        .description("this is my test schedule")
        .withdraw(new BigDecimal("2000.00"))
        .recurringPattern(recurringPattern)
        .startDate(LocalDate.now().minusYears(1L))
        .lastProcessedDate(LocalDate.now().minusWeeks(2L))
        .nextRecurringDate(LocalDate.now())
        .createDateTime(LocalDateTime.now())
        .build();
    Schedule nextSchedule = Schedule.getNextSchedule(schedule);
    assertThat(nextSchedule.getId()).isEqualTo(schedule.getId());
    assertThat(nextSchedule.getUser()).isEqualTo(schedule.getUser());
    assertThat(nextSchedule.getCategory()).isEqualTo(schedule.getCategory());
    assertThat(nextSchedule.getDescription()).isEqualTo(schedule.getDescription());
    assertThat(nextSchedule.getDeposit()).isEqualTo(schedule.getDeposit());
    assertThat(nextSchedule.getWithdraw()).isEqualTo(schedule.getWithdraw());
    assertThat(nextSchedule.getRecurringPattern()).isEqualTo(schedule.getRecurringPattern());
    assertThat(nextSchedule.getStartDate()).isEqualTo(schedule.getStartDate());
    assertThat(nextSchedule.getLastProcessedDate()).isEqualTo(schedule.getNextRecurringDate());
    if (recurringPattern == RecurringPattern.YEARLY) {
      assertThat(nextSchedule.getNextRecurringDate()).isEqualTo(schedule.getNextRecurringDate().plusYears(1L));
    } else if (recurringPattern == RecurringPattern.BI_MONTHLY) {
      assertThat(nextSchedule.getNextRecurringDate()).isEqualTo(schedule.getNextRecurringDate().plusMonths(2L));
    } else if (recurringPattern == RecurringPattern.MONTHLY) {
      assertThat(nextSchedule.getNextRecurringDate()).isEqualTo(schedule.getNextRecurringDate().plusMonths(1L));
    } else if (recurringPattern == RecurringPattern.BI_WEEKLY) {
      assertThat(nextSchedule.getNextRecurringDate()).isEqualTo(schedule.getNextRecurringDate().plusWeeks(2L));
    } else if (recurringPattern == RecurringPattern.WEEKLY) {
      assertThat(nextSchedule.getNextRecurringDate()).isEqualTo(schedule.getNextRecurringDate().plusWeeks(1L));
    }
    assertThat(nextSchedule.getCreateDateTime()).isEqualTo(schedule.getCreateDateTime());
  }
}
