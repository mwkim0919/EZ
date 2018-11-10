package com.ez.ezbackend.budget.service;

import com.ez.ezbackend.DatabaseIntegrationTest;
import com.ez.ezbackend.budget.entity.Category;
import com.ez.ezbackend.budget.entity.Transaction;
import com.ez.ezbackend.budget.repository.CategoryRepository;
import com.ez.ezbackend.budget.repository.TransactionRepository;
import com.ez.ezbackend.budget.request.CategoryRequest;
import com.ez.ezbackend.shared.exception.EzIllegalRequestException;
import com.ez.ezbackend.shared.exception.EzNotFoundException;
import com.google.common.collect.ImmutableSet;
import org.junit.Test;
import org.springframework.test.annotation.DirtiesContext;

import javax.inject.Inject;
import java.math.BigDecimal;
import java.util.Collections;
import java.util.List;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

public class CategoryServiceTest extends DatabaseIntegrationTest {
  @Inject
  private CategoryService categoryService;

  @Inject
  private CategoryRepository categoryRepository;

  @Inject
  private TransactionRepository transactionRepository;

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

  @Test
  @DirtiesContext
  public void test_deleteCategories_with_no_transaction() {
    Set<Long> ids = ImmutableSet.of(8L);
    categoryService.deleteCategories(ids, 1L);
    List<Category> categoryList = categoryService.getAllCategoriesForUser(1L);
    assertThat(categoryList).hasSize(8);
  }

  @Test
  @DirtiesContext
  public void test_deleteCategories_with_transactions() {
    Set<Long> ids = ImmutableSet.of(1L);
    categoryService.deleteCategories(ids, 1L);
    List<Category> categoryList = categoryService.getAllCategoriesForUser(1L);
    assertThat(categoryList).hasSize(8);
    List<Transaction> transactions = transactionRepository.findByUserAndCategoryId(1L, 1L);
    transactions.forEach(transaction -> assertThat(transaction.getCategory().getId()).isNotEqualTo(1L));
  }

  @Test
  @DirtiesContext
  public void test_deleteCategories_with_subcategories() {
    Set<Long> ids = ImmutableSet.of(2L);
    categoryService.deleteCategories(ids, 1L);
    List<Category> categoryList = categoryService.getAllCategoriesForUser(1L);
    assertThat(categoryList).hasSize(6);
    List<Transaction> transactions = transactionRepository.findByUserAndCategoryId(1L, 2L);
    transactions.forEach(transaction -> assertThat(transaction.getCategory().getId()).isNotEqualTo(2L));
  }

  @Test(expected = EzNotFoundException.class)
  public void test_deleteCategories_invalid_userId() {
    Set<Long> ids = ImmutableSet.of(2L, 3L);
    categoryService.deleteCategories(ids, 100L);
  }

  @Test(expected = EzIllegalRequestException.class)
  public void test_deleteCategories_no_categoryId() {
    categoryService.deleteCategories(Collections.emptySet(), 1L);
  }

  @Test(expected = EzIllegalRequestException.class)
  public void test_deleteCategories_invalid_categoryIds() {
    Set<Long> ids = ImmutableSet.of(2L, 3L, 14L);
    categoryService.deleteCategories(ids, 1L);
  }
}
