package com.ez.ezbackend.budget.entity;

import com.ez.ezbackend.budget.enums.RecurringPattern;
import com.ez.ezbackend.shared.entity.User;
import com.ez.ezbackend.shared.exception.EzIllegalRequestException;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Schedule {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id", nullable = false)
  @OnDelete(action = OnDeleteAction.CASCADE)
  private User user;

  @ManyToOne(fetch = FetchType.LAZY)
  @OnDelete(action = OnDeleteAction.CASCADE)
  @JoinColumn(name = "category_id")
  private Category category;

  @Column(nullable = false)
  private String description;

  private BigDecimal deposit;

  private BigDecimal withdraw;

  @Column(name = "start_date", nullable = false)
  private LocalDate startDate;

  @Enumerated(EnumType.STRING)
  @Column(name = "recurring_pattern", nullable = false)
  private RecurringPattern recurringPattern;

  @Column(name = "last_processed_date")
  private LocalDate lastProcessedDate;

  @Column(name = "next_recurring_date", nullable = false)
  private LocalDate nextRecurringDate;

  @CreationTimestamp
  @Column(name = "create_datetime")
  private LocalDateTime createDateTime;

  public static Transaction convertToTransaction(Schedule schedule) {
    return Transaction.builder()
        .description(schedule.getDescription())
        .transactionDatetime(LocalDateTime.of(schedule.getNextRecurringDate(), LocalTime.of(0, 0)))
        .category(schedule.getCategory())
        .user(schedule.getUser())
        .deposit(schedule.getDeposit())
        .withdraw(schedule.getWithdraw())
        .build();
  }

  public static Schedule getNextSchedule(Schedule schedule) {
    return Schedule.builder()
        .id(schedule.getId())
        .user(schedule.getUser())
        .category(schedule.getCategory())
        .description(schedule.getDescription())
        .deposit(schedule.getDeposit())
        .withdraw(schedule.getWithdraw())
        .startDate(schedule.getStartDate())
        .recurringPattern(schedule.getRecurringPattern())
        .lastProcessedDate(schedule.getNextRecurringDate())
        .nextRecurringDate(calculateNextRecurringDate(schedule, schedule.getRecurringPattern()))
        .createDateTime(schedule.getCreateDateTime())
        .build();
  }

  private static LocalDate calculateNextRecurringDate(Schedule schedule, RecurringPattern recurringPattern) {
    LocalDate previousRecurringDate = schedule.getNextRecurringDate();
    if (recurringPattern == RecurringPattern.YEARLY) {
      return previousRecurringDate.plusYears(1L);
    } else if (recurringPattern == RecurringPattern.BI_MONTHLY) {
      return previousRecurringDate.plusMonths(2L);
    } else if (recurringPattern == RecurringPattern.MONTHLY) {
      return previousRecurringDate.plusMonths(1L);
    } else if (recurringPattern == RecurringPattern.BI_WEEKLY) {
      return previousRecurringDate.plusWeeks(2L);
    } else if (recurringPattern == RecurringPattern.WEEKLY) {
      return previousRecurringDate.plusWeeks(1L);
    } else {
      throw new EzIllegalRequestException("Cannot get next recurring date for schedule with ID: " + schedule.getId());
    }
  }

}
