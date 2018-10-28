package com.ez.ezbackend.budget.service;

import com.ez.ezbackend.DatabaseIntegrationTest;
import com.ez.ezbackend.budget.entity.Category;
import com.ez.ezbackend.budget.request.CategoryRequest;
import com.ez.ezbackend.budget.repository.CategoryRepository;
import com.ez.ezbackend.shared.exception.EzIllegalRequestException;
import com.ez.ezbackend.shared.exception.EzNotFoundException;
import org.junit.Test;
import org.springframework.test.annotation.DirtiesContext;

import javax.inject.Inject;
import java.math.BigDecimal;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

public class CategoryServiceTest extends DatabaseIntegrationTest {
  @Inject
  private CategoryService categoryService;

  @Inject
  private CategoryRepository categoryRepository;

  @Test
  public void test_getSubcategories() {
    List<Category> subCategories = categoryService.getSubcategories(1L, 3L);
    assertThat(subCategories).hasSize(2);
  }

  @Test
  public void test_getSubcategories_empty() {
    List<Category> categoryList = categoryService.getSubcategories(2L, 3L);
    assertThat(categoryList).hasSize(0);
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
    categoryService.getSubcategories(1L, 1L);
  }

  @Test
  public void test_getAllCategoriesForUser() {
    List<Category> categoryList = categoryService.getAllCategoriesForUser(3L);
    assertThat(categoryList).hasSize(3);
  }

  @Test(expected = EzNotFoundException.class)
  public void test_getAllCategoriesForUser_invalid_userId() {
    categoryService.getAllCategoriesForUser(100L);
  }

  @Test
  @DirtiesContext
  public void test_saveCategory() {
    CategoryRequest category = CategoryRequest.builder()
        .name("Food")
        .categoryLimit(new BigDecimal("10000"))
        .build();
    Category saved = categoryService.saveCategory(category, 3L);
    assertThat(saved.getId()).isEqualTo(7L);
    assertThat(saved.getParentCategory()).isNull();
    assertThat(saved.getCategoryLimit()).isEqualTo("10000");
  }

  @Test(expected = EzNotFoundException.class)
  public void test_saveCategory_invalid_userId() {
    categoryService.saveCategory(new CategoryRequest(), 4L);
  }

  @Test
  @DirtiesContext
  public void test_updateCategory() {
    Category category = categoryRepository.findById(1L).get();
    CategoryRequest categoryRequest = CategoryRequest.builder()
        .name(category.getName())
        .categoryLimit(new BigDecimal("5500.00"))
        .build();
    category = categoryService.updateCategory(categoryRequest, 1L, 3L);
    assertThat(category.getCategoryLimit()).isEqualTo("5500.00");
    assertThat(category.getName()).isEqualTo("Transportation");
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
    categoryService.updateCategory(new CategoryRequest(), 1L, 1L);
  }

  @Test
  @DirtiesContext
  public void test_deleteCategory() {
    categoryService.deleteCategory(3L, 3L);
    List<Category> categoryList = categoryService.getAllCategoriesForUser(3L);
    assertThat(categoryList).hasSize(2);
  }

  @Test(expected = EzNotFoundException.class)
  public void test_deleteCategory_invalid_categoryId() {
    categoryService.deleteCategory(100L, 3L);
  }

  @Test(expected = EzNotFoundException.class)
  public void test_deleteCategory_invalid_userId() {
    categoryService.deleteCategory(1L, 100L);
  }

  @Test(expected = EzIllegalRequestException.class)
  public void test_deleteCategory_invalid_ownership() {
    categoryService.deleteCategory(1L, 1L);
  }
}
