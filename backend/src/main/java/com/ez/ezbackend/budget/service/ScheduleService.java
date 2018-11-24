package com.ez.ezbackend.budget.service;

import com.ez.ezbackend.budget.entity.Schedule;
import com.ez.ezbackend.budget.request.ScheduleRequest;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

public interface ScheduleService {

  void execute(LocalDate currentDate);

  List<Schedule> getAllUserSchedules(long userId);

  List<Schedule> saveSchedulesForUser(List<ScheduleRequest> scheduleRequests, long userId);

  Schedule updateScheduleForUser(ScheduleRequest scheduleRequest, long scheduleId, long userId);

  void deleteSchedulesForUser(Set<Long> scheduleIds, long userId);
}
