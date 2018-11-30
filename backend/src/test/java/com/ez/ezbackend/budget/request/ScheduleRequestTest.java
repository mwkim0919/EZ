package com.ez.ezbackend.budget.request;

import com.ez.ezbackend.budget.entity.Category;
import com.ez.ezbackend.budget.entity.Schedule;
import com.ez.ezbackend.budget.enums.RecurringPattern;
import com.ez.ezbackend.shared.entity.User;
import com.ez.ezbackend.shared.exception.EzIllegalRequestException;
import org.junit.Test;

import java.math.BigDecimal;
import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;

public class ScheduleRequestTest {

  @Test(expected = EzIllegalRequestException.class)
  public void testConvertToSchedule_with_scheduleRequest() {
    testConvertToScheduleWith(null, null, null);
  }

  @Test(expected = EzIllegalRequestException.class)
  public void testConvertToSchedule_with_scheduleRequest_and_user() {
    testConvertToScheduleWith(new User(), null, null);
  }

  @Test
  public void testConvertToSchedule_with_scheduleRequest_and_user_and_category() {
    testConvertToScheduleWith(new User(), new Category(), null);
  }

  @Test
  public void testConvertToSchedule_with_scheduleRequest_and_user_and_category_and_updatingScheduleId() {
    testConvertToScheduleWith(new User(), new Category(), 1L);
  }

  @Test(expected = EzIllegalRequestException.class)
  public void testConvertToSchedule_with_no_description() {
    ScheduleRequest scheduleRequest = ScheduleRequest.builder()
        .withdraw(BigDecimal.ONE)
        .recurringPattern(RecurringPattern.YEARLY)
        .build();
    ScheduleRequest.convertToSchedule(scheduleRequest, new User(), new Category());
  }

  @Test(expected = EzIllegalRequestException.class)
  public void testConvertToSchedule_with_both_deposit_and_withdraw() {
    ScheduleRequest scheduleRequest = ScheduleRequest.builder()
        .description("test")
        .withdraw(BigDecimal.ONE)
        .deposit(BigDecimal.ONE)
        .recurringPattern(RecurringPattern.YEARLY)
        .build();
    ScheduleRequest.convertToSchedule(scheduleRequest, new User(), new Category());
  }

  @Test(expected = EzIllegalRequestException.class)
  public void testConvertToSchedule_with_no_deposit_and_withdraw() {
    ScheduleRequest scheduleRequest = ScheduleRequest.builder()
        .description("test")
        .recurringPattern(RecurringPattern.YEARLY)
        .build();
    ScheduleRequest.convertToSchedule(scheduleRequest, new User(), new Category());
  }

  @Test(expected = EzIllegalRequestException.class)
  public void testConvertToSchedule_with_zero_deposit() {
    ScheduleRequest scheduleRequest = ScheduleRequest.builder()
        .description("test")
        .deposit(BigDecimal.ZERO)
        .recurringPattern(RecurringPattern.YEARLY)
        .build();
    ScheduleRequest.convertToSchedule(scheduleRequest, new User(), new Category());
  }

  @Test(expected = EzIllegalRequestException.class)
  public void testConvertToSchedule_with_negative_deposit() {
    ScheduleRequest scheduleRequest = ScheduleRequest.builder()
        .description("test")
        .deposit(BigDecimal.valueOf(-1L))
        .recurringPattern(RecurringPattern.YEARLY)
        .build();
    ScheduleRequest.convertToSchedule(scheduleRequest, new User(), new Category());
  }

  @Test(expected = EzIllegalRequestException.class)
  public void testConvertToSchedule_with_zero_withdraw() {
    ScheduleRequest scheduleRequest = ScheduleRequest.builder()
        .description("test")
        .withdraw(BigDecimal.ZERO)
        .recurringPattern(RecurringPattern.YEARLY)
        .build();
    ScheduleRequest.convertToSchedule(scheduleRequest, new User(), new Category());
  }

  @Test(expected = EzIllegalRequestException.class)
  public void testConvertToSchedule_with_negative_withdraw() {
    ScheduleRequest scheduleRequest = ScheduleRequest.builder()
        .description("test")
        .withdraw(BigDecimal.valueOf(-1L))
        .recurringPattern(RecurringPattern.YEARLY)
        .build();
    ScheduleRequest.convertToSchedule(scheduleRequest, new User(), new Category());
  }

  @Test(expected = EzIllegalRequestException.class)
  public void testConvertToSchedule_with_no_recurringPattern() {
    ScheduleRequest scheduleRequest = ScheduleRequest.builder()
        .description("test")
        .withdraw(BigDecimal.ONE)
        .build();
    ScheduleRequest.convertToSchedule(scheduleRequest, new User(), new Category());
  }

  @Test(expected = EzIllegalRequestException.class)
  public void testConvertToSchedule_with_past_startDate() {
    ScheduleRequest scheduleRequest = ScheduleRequest.builder()
        .description("test")
        .startDate(LocalDate.now().minusDays(1))
        .build();
    ScheduleRequest.convertToSchedule(scheduleRequest, new User(), new Category());
  }

  private void testConvertToScheduleWith(User user, Category category, Long updatingScheduleId) {
    ScheduleRequest scheduleRequest = ScheduleRequest.builder()
        .categoryId(1L)
        .description("description")
        .deposit(new BigDecimal("1000.00"))
        .withdraw(null)
        .recurringPattern(RecurringPattern.YEARLY)
        .startDate(LocalDate.now())
        .build();

    Schedule previousSchedule = Schedule.builder()
        .id(updatingScheduleId)
        .startDate(LocalDate.of(2018, 1, 1))
        .nextRecurringDate(LocalDate.of(2018,1,15))
        .build();

    Schedule schedule = ScheduleRequest.convertToSchedule(scheduleRequest, user, category, updatingScheduleId != null ? previousSchedule : null);

    // If creating schedule, nextRecurringDate should be the same as startDate and id must be null
    if (updatingScheduleId == null) {
      assertThat(schedule.getId()).isNull();
      assertThat(schedule.getNextRecurringDate()).isEqualTo(scheduleRequest.getStartDate());
      assertThat(schedule.getStartDate()).isEqualTo(scheduleRequest.getStartDate());
    } else {
      assertThat(schedule.getId()).isEqualTo(updatingScheduleId);
      assertThat(schedule.getStartDate()).isEqualTo(previousSchedule.getStartDate());
    }
    assertThat(schedule.getDescription()).isEqualTo(scheduleRequest.getDescription());
    assertThat(schedule.getDeposit()).isEqualTo(scheduleRequest.getDeposit());
    assertThat(schedule.getWithdraw()).isEqualTo(scheduleRequest.getWithdraw());
    assertThat(schedule.getRecurringPattern()).isEqualTo(scheduleRequest.getRecurringPattern());

    if (user == null) {
      assertThat(schedule.getUser()).isNull();
    } else {
      assertThat(schedule.getUser()).isEqualTo(user);
    }
    if (category == null) {
      assertThat(schedule.getCategory()).isNull();
    } else {
      assertThat(schedule.getCategory()).isEqualTo(category);
    }
  }
}
