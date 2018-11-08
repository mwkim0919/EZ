package com.ez.ezbackend.budget.service;

import com.ez.ezbackend.budget.entity.Schedule;
import com.ez.ezbackend.budget.request.ScheduleRequest;

import java.time.LocalDate;
import java.util.List;

public interface ScheduleService {

  void execute(LocalDate currentDate);

  List<Schedule> saveSchedulesForUser(List<ScheduleRequest> scheduleRequests, long userId);
}
