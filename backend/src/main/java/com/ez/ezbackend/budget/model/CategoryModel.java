package com.ez.ezbackend.budget.model;

import com.ez.ezbackend.budget.entity.Category;
import com.ez.ezbackend.shared.entity.User;
import com.ez.ezbackend.shared.exception.EzReadOnlyException;
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
public class CategoryModel {

  private Long id;
  private String name;
  @JsonSerialize(using = PriceJsonSerializer.class)
  private BigDecimal categoryLimit;
  @JsonSerialize(using = PriceJsonSerializer.class)
  private Category parentCategory;
  @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
  @JsonSerialize(using = LocalDateTimeSerializer.class)
  private LocalDateTime createDatetime;

  public static CategoryModel convertFromCategory(Category category) {
    return CategoryModel.builder()
        .id(category.getId())
        .name(category.getName())
        .categoryLimit(category.getCategoryLimit())
        .parentCategory(category.getParentCategory())
        .createDatetime(category.getCreateDatetime())
        .build();
  }

  public static Category convertToCategory(CategoryModel categoryModel, User user) {
    return convertToCategory(categoryModel, user, null);
  }

  public static Category convertToCategory(CategoryModel categoryModel, User user, Long categoryId) {
    if (categoryModel.getId() != null) {
      throw new EzReadOnlyException("Id is read-only.");
    }

    // TODO: Shouldn't we validate category here?
    return Category.builder()
        .id(categoryId)
        .name(categoryModel.getName())
        .categoryLimit(categoryModel.getCategoryLimit())
        .parentCategory(categoryModel.getParentCategory())
        .createDatetime(categoryModel.getCreateDatetime())
        .user(user)
        .build();
  }
}
