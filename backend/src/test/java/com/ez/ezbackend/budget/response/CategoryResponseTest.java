package com.ez.ezbackend.budget.response;

import com.ez.ezbackend.budget.entity.Category;
import org.junit.Test;

import java.math.BigDecimal;

import static org.assertj.core.api.Assertions.assertThat;

public class CategoryResponseTest {

  @Test
  public void test_convertFromCategory() {
    Category category = Category.builder()
        .id(1L)
        .name("name")
        .categoryLimit(new BigDecimal("5.00"))
        .build();
    CategoryResponse categoryResponse = CategoryResponse.convertFromCategory(category);
    assertThat(categoryResponse.getId()).isEqualTo(1L);
    assertThat(categoryResponse.getName()).isEqualTo("name");
    assertThat(categoryResponse.getParentCategory()).isNull();
    assertThat(categoryResponse.getCategoryLimit()).isEqualTo(new BigDecimal("5.00"));
  }
}
