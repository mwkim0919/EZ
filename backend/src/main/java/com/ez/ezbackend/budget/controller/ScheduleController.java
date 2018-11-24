package com.ez.ezbackend.budget.controller;

import com.ez.ezbackend.budget.entity.Schedule;
import com.ez.ezbackend.budget.request.ScheduleRequest;
import com.ez.ezbackend.budget.response.ScheduleResponse;
import com.ez.ezbackend.budget.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.inject.Inject;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor(onConstructor = @__(@Inject))
@PreAuthorize("#userId == principal.id")
public class ScheduleController {
  private final ScheduleService scheduleService;

  @GetMapping("/users/{userId}/schedules")
  public ResponseEntity<List<ScheduleResponse>> get(@PathVariable("userId") long userId) {
    List<Schedule> schedules = scheduleService.getAllUserSchedules(userId);
    List<ScheduleResponse> scheduleResponses = schedules.stream()
        .map(ScheduleResponse::convertFromSchedule)
        .collect(Collectors.toList());
    return ResponseEntity.ok(scheduleResponses);
  }

  @PostMapping("/users/{userId}/schedules")
  public ResponseEntity<List<ScheduleResponse>> create(@PathVariable("userId") long userId,
                                                       @RequestBody List<ScheduleRequest> scheduleRequests) {
    List<Schedule> schedules = scheduleService.saveSchedulesForUser(scheduleRequests, userId);
    List<ScheduleResponse> scheduleResponses = schedules.stream().map(ScheduleResponse::convertFromSchedule).collect(Collectors.toList());
    return ResponseEntity.ok(scheduleResponses);
  }

  @PutMapping("/users/{userId}/schedules/{scheduleId}")
  public ResponseEntity<ScheduleResponse> update(@PathVariable("userId") long userId,
                                                 @PathVariable("scheduleId") long scheduleId,
                                                 @RequestBody ScheduleRequest scheduleRequest) {
    Schedule updatedSchedule = scheduleService.updateScheduleForUser(scheduleRequest, scheduleId, userId);
    ScheduleResponse scheduleResponse = ScheduleResponse.convertFromSchedule(updatedSchedule);
    return ResponseEntity.ok(scheduleResponse);
  }

  @DeleteMapping("/users/{userId}/schedules/{scheduleIds}")
  public ResponseEntity<ScheduleResponse> delete(@PathVariable("userId") long userId,
                                                 @PathVariable("scheduleIds") Set<Long> scheduleIds) {
    scheduleService.deleteSchedulesForUser(scheduleIds, userId);
    return ResponseEntity.accepted().build();
  }
}
