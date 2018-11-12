package com.ez.ezbackend.budget.service;

import com.ez.ezbackend.budget.entity.Category;
import com.ez.ezbackend.budget.entity.Schedule;
import com.ez.ezbackend.budget.entity.Transaction;
import com.ez.ezbackend.budget.repository.CategoryRepository;
import com.ez.ezbackend.budget.repository.ScheduleRepository;
import com.ez.ezbackend.budget.repository.TransactionRepository;
import com.ez.ezbackend.budget.request.ScheduleRequest;
import com.ez.ezbackend.shared.entity.User;
import com.ez.ezbackend.shared.exception.EzIllegalRequestException;
import com.ez.ezbackend.shared.exception.EzNotFoundException;
import com.ez.ezbackend.shared.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor(onConstructor = @__(@Inject))
public class ScheduleServiceImpl implements ScheduleService {
  private final ScheduleRepository scheduleRepository;
  private final TransactionRepository transactionRepository;
  private final UserRepository userRepository;
  private final CategoryRepository categoryRepository;

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
  public List<Schedule> getAllUserSchedules(long userId) {
    User user = userRepository.findById(userId)
        .orElseThrow(() -> new EzNotFoundException("User with ID: " + userId + " not found."));
    return scheduleRepository.findByUser(user);
  }

  @Override
  public List<Schedule> saveSchedulesForUser(List<ScheduleRequest> scheduleRequests, long userId) {
    User user = userRepository.findById(userId)
        .orElseThrow(() -> new EzNotFoundException("User with ID: " + userId + " not found."));

    // Retrieve all categories for this user
    List<Category> categories = categoryRepository.findByUser(user);
    Map<Long, Category> categoriesMap = categories.stream().collect(Collectors.toMap(Category::getId, Function.identity()));

    List<Schedule> schedules = scheduleRequests.stream()
        .map(scheduleRequest ->
            ScheduleRequest.convertToSchedule(scheduleRequest, user, categoriesMap.get(scheduleRequest.getCategoryId())))
        .collect(Collectors.toList());
    return scheduleRepository.saveAll(schedules);
  }

  @Override
  public Schedule updateScheduleForUser(ScheduleRequest scheduleRequest, long scheduleId, long userId) {
    User user = userRepository.findById(userId)
        .orElseThrow(() -> new EzNotFoundException("User with ID: " + userId + " not found."));
    Category category = categoryRepository.findById(scheduleRequest.getCategoryId())
        .orElseThrow(() -> new EzNotFoundException("Category with ID: " + scheduleRequest.getCategoryId() + " not found."));
    Schedule schedule = ScheduleRequest.convertToSchedule(scheduleRequest, user, category, scheduleId);
    return scheduleRepository.saveAndFlush(schedule);
  }

  @Override
  public void deleteSchedulesForUser(Set<Long> scheduleIds, long userId) {
    if (scheduleIds.isEmpty()) {
      throw new EzIllegalRequestException("You must provide at least one schedule id to delete");
    }
    User user = userRepository.findById(userId)
        .orElseThrow(() -> new EzNotFoundException("User with ID: " + userId + " not found."));
    List<Schedule> schedules = scheduleRepository.findScheduleByIdsAndUser(scheduleIds, user);

    // Check ownership of the schedules
    if (scheduleIds.size() != schedules.size()) {
      throw new EzIllegalRequestException("Some schedules are not found or cannot be deleted.");
    }
    scheduleRepository.deleteAll(schedules);
  }

  @Scheduled(cron = "0 0 0 * * ?", zone = "UTC")
  void runSchedule() {
    LocalDate currentDate = LocalDate.now();
    execute(currentDate);
  }
}
