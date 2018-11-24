package com.ez.ezbackend.budget.service;

import com.ez.ezbackend.DatabaseIntegrationTest;
import com.ez.ezbackend.budget.entity.Schedule;
import com.ez.ezbackend.budget.enums.RecurringPattern;
import com.ez.ezbackend.budget.repository.ScheduleRepository;
import com.ez.ezbackend.budget.request.ScheduleRequest;
import com.ez.ezbackend.shared.exception.EzIllegalRequestException;
import com.ez.ezbackend.shared.exception.EzNotFoundException;
import org.junit.Test;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

public class ScheduleServiceTest extends DatabaseIntegrationTest {
  @Inject
  private ScheduleService scheduleService;

  @Inject
  private ScheduleRepository scheduleRepository;

  @Test
  public void test_getAllUserSchedules() {
    List<Schedule> schedules = scheduleService.getAllUserSchedules(1L);
    assertThat(schedules).hasSize(6);
  }

  @Test(expected = EzNotFoundException.class)
  public void test_getAllCategoriesForUser_invalid_userId() {
    scheduleService.getAllUserSchedules(100L);
  }

  @Test
  @Transactional
  @DirtiesContext
  public void test_saveSchedulesForUser() {
    List<ScheduleRequest> scheduleRequests = Arrays.asList(
        ScheduleRequest.builder()
            .categoryId(1L)
            .description("Monthly pass")
            .withdraw(new BigDecimal("189.00"))
            .startDate(LocalDate.now())
            .recurringPattern(RecurringPattern.MONTHLY)
            .build(),
        ScheduleRequest.builder()
            .categoryId(4L)
            .description("Starbucks monthly expense")
            .withdraw(new BigDecimal("70.00"))
            .startDate(LocalDate.now())
            .recurringPattern(RecurringPattern.MONTHLY)
            .build());

    List<Schedule> savedSchedules = scheduleService.saveSchedulesForUser(scheduleRequests, 1L);
    assertThat(savedSchedules).hasSize(2);
    assertThat(scheduleService.getAllUserSchedules(1L)).hasSize(8);
  }

  @Test(expected = EzNotFoundException.class)
  public void test_saveSchedulesForUser_invalid_userId() {
    scheduleService.saveSchedulesForUser(null, 100L);
  }

  @Test
  @DirtiesContext
  public void test_updateScheduleForUser() {
    LocalDate startDate = LocalDate.of(2018, 2, 1);
    ScheduleRequest scheduleRequest = ScheduleRequest.builder()
        .categoryId(6L)
        .description("EZ Month pay stub")
        .deposit(new BigDecimal("5000.00"))
        .startDate(startDate)
        .recurringPattern(RecurringPattern.MONTHLY)
        .build();
    Schedule updated = scheduleService.updateScheduleForUser(scheduleRequest, 1L, 1L);
    assertThat(updated.getCategory().getId()).isEqualTo(6L);
    assertThat(updated.getDescription()).isEqualTo("EZ Month pay stub");
    assertThat(updated.getDeposit()).isEqualTo(new BigDecimal("5000.00"));
    assertThat(updated.getWithdraw()).isNull();
    assertThat(updated.getStartDate()).isEqualTo(startDate);
    assertThat(updated.getNextRecurringDate()).isEqualTo(startDate);
  }

  @Test(expected = EzNotFoundException.class)
  public void test_updateScheduleForUser_invalid_userId() {
    scheduleService.updateScheduleForUser(new ScheduleRequest(), 1L, 100L);
  }

  @Test(expected = EzNotFoundException.class)
  public void test_updateScheduleForUser_invalid_category() {
    ScheduleRequest scheduleRequest = ScheduleRequest.builder()
        .categoryId(100L)
        .build();
    scheduleService.updateScheduleForUser(scheduleRequest, 1L, 1L);
  }

  @Test(expected = EzIllegalRequestException.class)
  public void test_deleteSchedulesForUser_empty_scheduleIds() {
    Set<Long> scheduleIds = new HashSet<>();
    scheduleService.deleteSchedulesForUser(scheduleIds, 1L);
  }

  @Test
  @DirtiesContext
  public void test_deleteSchedulesForUser() {
    Set<Long> scheduleIds = new HashSet<>(Arrays.asList(1L, 2L, 3L));
    scheduleService.deleteSchedulesForUser(scheduleIds, 1L);
    List<Schedule> schedules = scheduleService.getAllUserSchedules(1L);
    assertThat(schedules).hasSize(3);
  }

  @Test
  @Transactional
  @DirtiesContext
  public void testExecute() {
    LocalDate date = LocalDate.of(2018, 11, 6);
    List<Schedule> schedules = scheduleRepository.findSchedulesBeforeNextRecurringDate(date);
    assertThat(schedules).hasSize(4);
    scheduleService.execute(date);
    List<Schedule> postSchedules = scheduleRepository.findSchedulesBeforeNextRecurringDate(date);
    assertThat(schedules.size()).isNotEqualTo(postSchedules.size());
    assertThat(postSchedules).hasSize(1);
  }
}
