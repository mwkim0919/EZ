package com.ez.ezbackend.budget.model;
import com.ez.ezbackend.shared.entity.User;
import com.ez.ezbackend.shared.exception.EzReadOnlyException;
import org.junit.Test;

import java.math.BigDecimal;

public class CategoryModelTest {

  @Test(expected = EzReadOnlyException.class)
  public void test_convertToCategory_failure() {
    CategoryModel categoryModel = CategoryModel.builder()
        .id(1L)
        .name("description")
        .categoryLimit(new BigDecimal("100.00"))
        .build();
    CategoryModel.convertToCategory(categoryModel, User.builder().build());
  }
}

