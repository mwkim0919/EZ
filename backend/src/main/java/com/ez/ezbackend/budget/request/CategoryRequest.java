package com.ez.ezbackend.budget.request;

import com.ez.ezbackend.budget.entity.Category;
import com.ez.ezbackend.shared.entity.User;
import com.ez.ezbackend.shared.exception.EzIllegalRequestException;
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
public class CategoryRequest {
  private String name;
  @JsonSerialize(using = PriceJsonSerializer.class)
  private BigDecimal categoryLimit;
  private Long parentCategoryId;
  @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
  @JsonSerialize(using = LocalDateTimeSerializer.class)
  private LocalDateTime createDatetime;

  public static Category convertToCategory(CategoryRequest categoryRequest, User user) {
    return convertToCategory(categoryRequest, user, null);
  }

  public static Category convertToCategory(CategoryRequest categoryRequest, User user, Category parentCategory) {
    return convertToCategory(categoryRequest, user, parentCategory, null);
  }

  public static Category convertToCategory(CategoryRequest categoryRequest, User user,
                                           Category parentCategory, Long updatingCategoryId) {
    validateCategoryRequest(categoryRequest);

    return Category.builder()
        .id(updatingCategoryId)
        .name(categoryRequest.getName())
        .categoryLimit(categoryRequest.getCategoryLimit())
        .parentCategory(parentCategory)
        .createDatetime(categoryRequest.getCreateDatetime())
        .user(user)
        .build();
  }

  private static void validateCategoryRequest(CategoryRequest categoryRequest) {
    if (categoryRequest.getCategoryLimit() != null && categoryRequest.getCategoryLimit().compareTo(BigDecimal.ZERO) < 0) {
      throw new EzIllegalRequestException("Category limit should be greater than 0.");
    }
  }
}

