package com.ez.ezbackend.budget.service;

import com.ez.ezbackend.budget.entity.Schedule;
import com.ez.ezbackend.budget.entity.Transaction;
import com.ez.ezbackend.budget.repository.ScheduleRepository;
import com.ez.ezbackend.budget.repository.TransactionRepository;
import com.ez.ezbackend.budget.request.ScheduleRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor(onConstructor = @__(@Inject))
public class ScheduleServiceImpl implements ScheduleService {
  private final ScheduleRepository scheduleRepository;
  private final TransactionRepository transactionRepository;

  @Override
  public void execute(LocalDate currentDate) {
    log.info("Running daily scheduled operation at {}.", LocalDateTime.now());

    List<Schedule> schedules = scheduleRepository.findSchedulesBeforeNextRecurringDate(currentDate);
    List<Transaction> transactions = schedules.stream()
        .map(Schedule::convertToTransaction)
        .collect(Collectors.toList());
    transactionRepository.saveAll(transactions);
    List<Schedule> nextSchedules = schedules.stream()
        .map(Schedule::getNextSchedule)
        .collect(Collectors.toList());
    scheduleRepository.saveAll(nextSchedules);
  }

  @Override
  public List<Schedule> saveSchedulesForUser(List<ScheduleRequest> scheduleRequests, long userId) {
    return null;
  }

  @Scheduled(cron = "0 0 0 * * ?", zone = "UTC")
  void runSchedule() {
    LocalDate currentDate = LocalDate.now();
    execute(currentDate);
  }
}
