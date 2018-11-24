package com.ez.ezbackend.budget.repository;

import com.ez.ezbackend.budget.entity.Schedule;
import com.ez.ezbackend.shared.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
  @Query("SELECT s FROM Schedule s JOIN FETCH s.user LEFT JOIN FETCH s.category WHERE s.user = :user")
  List<Schedule> findByUser(@Param("user") User user);

  @Query("SELECT s FROM Schedule s WHERE s.id IN :ids AND s.user = :user")
  List<Schedule> findByIdsAndUser(@Param("ids") Set<Long> ids, @Param("user") User user);

  @Query("SELECT s FROM Schedule s LEFT JOIN FETCH s.category WHERE s.nextRecurringDate <= :date")
  List<Schedule> findSchedulesBeforeNextRecurringDate(@Param("date") LocalDate date);
}
