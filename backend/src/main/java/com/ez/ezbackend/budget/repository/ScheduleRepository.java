package com.ez.ezbackend.budget.repository;

import com.ez.ezbackend.budget.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
  @Query("SELECT s FROM Schedule s JOIN FETCH s.user JOIN FETCH s.category WHERE s.nextRecurringDate <= :date")
  List<Schedule> findSchedulesBeforeNextRecurringDate(@Param("date") LocalDate date);
}
