package com.ez.ezbackend.budget.controller;

import com.ez.ezbackend.budget.entity.Category;
import com.ez.ezbackend.budget.entity.Schedule;
import com.ez.ezbackend.budget.enums.RecurringPattern;
import com.ez.ezbackend.budget.request.ScheduleRequest;
import com.ez.ezbackend.budget.service.ScheduleService;
import com.ez.ezbackend.shared.entity.User;
import com.ez.ezbackend.shared.exception.EzNotFoundException;
import com.ez.ezbackend.shared.util.JsonUtil;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import javax.inject.Inject;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Collections;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(
    controllers = ScheduleController.class,
    secure = false
)
public class ScheduleControllerTest {
  @Inject
  private MockMvc mockMvc;

  @MockBean
  private ScheduleService scheduleService;

  @Test
  public void test_get_success() throws Exception {
    when(scheduleService.getAllUserSchedules(1)).thenReturn(Collections.emptyList());
    mockMvc.perform(get("/api/users/1/schedules"))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(content().json("[]"));
  }

  @Test
  public void test_get_failure() throws Exception {
    when(scheduleService.getAllUserSchedules(1)).thenThrow(new EzNotFoundException("Not found"));
    mockMvc.perform(get("/api/users/1/schedules"))
        .andDo(print())
        .andExpect(status().isNotFound());
  }

  @Test
  public void test_save_success() throws Exception {
    ScheduleRequest scheduleRequest = ScheduleRequest.builder()
        .description("test")
        .withdraw(new BigDecimal("100.00"))
        .startDate(LocalDate.now())
        .recurringPattern(RecurringPattern.MONTHLY)
        .build();
    List<ScheduleRequest> scheduleRequests = Collections.singletonList(scheduleRequest);
    Schedule schedule = ScheduleRequest.convertToSchedule(scheduleRequest, new User(), new Category());
    List<Schedule> schedules = Collections.singletonList(schedule);
    String json = JsonUtil.convertToJson(scheduleRequests, List.class);
    when(scheduleService.saveSchedulesForUser(any(), any(long.class))).thenReturn(schedules);
    mockMvc
        .perform(post("/api/users/1/schedules")
            .content(json)
            .contentType(MediaType.APPLICATION_JSON)
            .accept(MediaType.APPLICATION_JSON))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(jsonPath("[0].description").value("test"))
        .andExpect(jsonPath("[0].withdraw").value("100.00"))
        .andExpect(jsonPath("[0].deposit").doesNotExist())
        .andExpect(jsonPath("[0].recurringPattern").value("MONTHLY"))
        .andExpect(jsonPath("[0].startDate").exists());
  }

  @Test
  public void test_update_success() throws Exception {
    ScheduleRequest scheduleRequest = ScheduleRequest.builder()
        .description("test")
        .withdraw(new BigDecimal("100.00"))
        .recurringPattern(RecurringPattern.MONTHLY)
        .build();
    Schedule schedule = ScheduleRequest.convertToSchedule(scheduleRequest, new User(), new Category(), Schedule.builder().id(1L).build());
    String json = JsonUtil.convertToJson(scheduleRequest, ScheduleRequest.class);
    when(scheduleService.updateScheduleForUser(any(ScheduleRequest.class), any(long.class), any(long.class)))
        .thenReturn(schedule);
    mockMvc
        .perform(put("/api/users/1/schedules/1")
            .content(json)
            .contentType(MediaType.APPLICATION_JSON)
            .accept(MediaType.APPLICATION_JSON))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.id").value("1"))
        .andExpect(jsonPath("$.description").value("test"))
        .andExpect(jsonPath("$.withdraw").value("100.00"))
        .andExpect(jsonPath("$.deposit").doesNotExist())
        .andExpect(jsonPath("$.recurringPattern").value("MONTHLY"));
  }

  @Test
  public void test_delete_success() throws Exception {
    doNothing().when(scheduleService).deleteSchedulesForUser(any(), any(long.class));
    mockMvc.perform(delete("/api/users/1/schedules/1,2,3")).andExpect(status().isAccepted());
  }
}
