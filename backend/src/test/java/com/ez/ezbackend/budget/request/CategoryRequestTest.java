package com.ez.ezbackend.budget.request;

import com.ez.ezbackend.budget.entity.Category;
import com.ez.ezbackend.shared.entity.User;
import com.ez.ezbackend.shared.exception.EzIllegalRequestException;
import org.junit.Test;

import java.math.BigDecimal;

import static org.assertj.core.api.Assertions.assertThat;

public class CategoryRequestTest {

  @Test
  public void test_convertToCategory_success() {
    CategoryRequest categoryRequest = CategoryRequest.builder()
        .name("description")
        .categoryLimit(new BigDecimal("55.00"))
        .build();
    Category category = CategoryRequest.convertToCategory(categoryRequest, new User());
    assertThat(category.getName()).isEqualTo("description");
    assertThat(category.getCategoryLimit()).isEqualTo(new BigDecimal("55.00"));
    assertThat(category.getUser()).isNotNull();
  }

  @Test(expected = EzIllegalRequestException.class)
  public void test_convertToCategory_withNegativeLimit() {
    CategoryRequest categoryRequest = CategoryRequest.builder()
        .name("name")
        .categoryLimit(new BigDecimal("-5.00"))
        .build();
    CategoryRequest.convertToCategory(categoryRequest, new User());
  }
}

