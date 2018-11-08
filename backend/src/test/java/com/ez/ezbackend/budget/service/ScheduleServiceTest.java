package com.ez.ezbackend.budget.service;

import com.ez.ezbackend.DatabaseIntegrationTest;
import com.ez.ezbackend.budget.entity.Schedule;
import com.ez.ezbackend.budget.repository.ScheduleRepository;
import org.junit.Test;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;
import java.time.LocalDate;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

public class ScheduleServiceTest extends DatabaseIntegrationTest {
  @Inject
  private ScheduleService scheduleService;

  @Inject
  private ScheduleRepository scheduleRepository;

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
