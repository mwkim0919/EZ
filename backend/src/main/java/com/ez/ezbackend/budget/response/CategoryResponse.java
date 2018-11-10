package com.ez.ezbackend.budget.response;

import com.ez.ezbackend.budget.entity.Category;
import com.ez.ezbackend.shared.serializer.PriceJsonSerializer;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CategoryResponse {
  private Long id;
  private String name;
  @JsonSerialize(using = PriceJsonSerializer.class)
  private BigDecimal categoryLimit;
  private CategoryResponse parentCategory;
  @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
  @JsonSerialize(using = LocalDateTimeSerializer.class)
  private LocalDateTime createDatetime;

  public static CategoryResponse convertFromCategory(Category category) {
    if (category != null) {
      return CategoryResponse.builder()
          .id(category.getId())
          .name(category.getName())
          .categoryLimit(category.getCategoryLimit())
          .parentCategory(convertFromCategory(category.getParentCategory()))
          .createDatetime(category.getCreateDatetime())
          .build();
    } else {
      return null;
    }
  }
}
