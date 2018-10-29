package com.ez.ezbackend.budget.service;

import com.ez.ezbackend.DatabaseIntegrationTest;
import com.ez.ezbackend.budget.entity.Category;
import com.ez.ezbackend.budget.repository.CategoryRepository;
import com.ez.ezbackend.budget.request.CategoryRequest;
import com.ez.ezbackend.shared.exception.EzIllegalRequestException;
import com.ez.ezbackend.shared.exception.EzNotFoundException;
import org.junit.Test;
import org.springframework.test.annotation.DirtiesContext;

import javax.inject.Inject;
import java.math.BigDecimal;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

public class CategoryServiceTest extends DatabaseIntegrationTest {
  @Inject
  private CategoryService categoryService;

  @Inject
  private CategoryRepository categoryRepository;

  @Test
  public void test_getSubcategories() {
    List<Category> subCategories = categoryService.getSubcategories(2L, 1L);
    assertThat(subCategories).hasSize(2);
  }

  @Test
  public void test_getSubcategories_empty() {
    List<Category> categoryList = categoryService.getSubcategories(2L, 1L);
    assertThat(categoryList).hasSize(2);
  }

  @Test(expected = EzNotFoundException.class)
  public void test_getSubcategories_invalid_categoryId() {
    categoryService.getSubcategories(0L, 3L);
  }

  @Test(expected = EzNotFoundException.class)
  public void test_getSubcategories_invalid_userId() {
    categoryService.getSubcategories(1L, 100L);
  }

  @Test(expected = EzIllegalRequestException.class)
  public void test_getSubcategories_invalid_ownership() {
    categoryService.getSubcategories(1L, 2L);
  }

  @Test
  public void test_getAllCategoriesForUser() {
    List<Category> categoryList = categoryService.getAllCategoriesForUser(1L);
    assertThat(categoryList).hasSize(9);
  }

  @Test(expected = EzNotFoundException.class)
  public void test_getAllCategoriesForUser_invalid_userId() {
    categoryService.getAllCategoriesForUser(100L);
  }

  @Test
  @DirtiesContext
  public void test_saveCategories() {
    CategoryRequest category = CategoryRequest.builder()
        .name("Food")
        .categoryLimit(new BigDecimal("10000"))
        .build();
    Category savedCategory = categoryService.saveCategories(Collections.singletonList(category), 2L).get(0);
    assertThat(savedCategory.getId()).isNotNull();
    assertThat(savedCategory.getParentCategory()).isNull();
    assertThat(savedCategory.getName()).isEqualTo("Food");
    assertThat(savedCategory.getCategoryLimit()).isEqualTo("10000");
  }

  @Test(expected = EzNotFoundException.class)
  public void test_saveCategories_invalid_userId() {
    categoryService.saveCategories(Collections.singletonList(new CategoryRequest()), 4L);
  }

  @Test
  @DirtiesContext
  public void test_updateCategory() {
    Category category = categoryRepository.findById(1L).get();
    CategoryRequest categoryRequest = CategoryRequest.builder()
        .name(category.getName())
        .categoryLimit(new BigDecimal("5500.00"))
        .build();
    category = categoryService.updateCategory(categoryRequest, 1L, 1L);
    assertThat(category.getCategoryLimit()).isEqualTo("5500.00");
    assertThat(category.getName()).isEqualTo("TRANSPORTATION");
  }

  @Test(expected = EzNotFoundException.class)
  public void test_updateCategory_invalid_categoryId() {
    categoryService.updateCategory(new CategoryRequest(), 100L, 3L);
  }

  @Test(expected = EzNotFoundException.class)
  public void test_updateCategory_invalid_userId() {
    categoryService.updateCategory(new CategoryRequest(), 1L, 100L);
  }

  @Test(expected = EzIllegalRequestException.class)
  public void test_updateCategory_invalid_ownership() {
    categoryService.updateCategory(new CategoryRequest(), 1L, 2L);
  }

  // TODO: Make test cases for deleting categories that are associated to transactions.
  @Test
  @DirtiesContext
  public void test_deleteCategories() {
    Set<Long> ids = new HashSet<>(Collections.singletonList(8L));
    categoryService.deleteCategories(ids, 1L);
    List<Category> categoryList = categoryService.getAllCategoriesForUser(1L);
    assertThat(categoryList).hasSize(8);
  }

  @Test(expected = EzNotFoundException.class)
  public void test_deleteCategories_invalid_userId() {
    Set<Long> ids = new HashSet<>(Arrays.asList(2L, 3L));
    categoryService.deleteCategories(ids, 100L);
  }

  @Test(expected = EzIllegalRequestException.class)
  public void test_deleteCategories_no_categoryId() {
    categoryService.deleteCategories(Collections.emptySet(), 1L);
  }

  @Test(expected = EzIllegalRequestException.class)
  public void test_deleteCategories_invalid_categoryIds() {
    Set<Long> ids = new HashSet<>(Arrays.asList(2L, 3L, 14L));
    categoryService.deleteCategories(ids, 1L);
  }
}
