package com.ez.ezbackend.budget.repository;

import com.ez.ezbackend.DatabaseIntegrationTest;
import com.ez.ezbackend.budget.entity.Category;
import com.ez.ezbackend.shared.entity.User;
import com.ez.ezbackend.shared.repository.UserRepository;
import org.junit.Test;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

public class CategoryRepositoryTest extends DatabaseIntegrationTest {

  @Inject
  private CategoryRepository categoryRepository;

  @Inject
  private UserRepository userRepository;

  @Test
  public void test_findAll() {
    List<Category> categories = categoryRepository.findAll();
    assertThat(categories.size()).isEqualTo(6);
  }

  @Test
  public void test_findById() {
    Optional<Category> category = categoryRepository.findById(1L);
    assertThat(category.isPresent()).isTrue();
    assertThat(category.get().getId()).isEqualTo(1L);
    assertThat(category.get().getCategoryLimit()).isEqualTo(new BigDecimal("500.00"));
    assertThat(category.get().getName()).isEqualTo("Transportation");
    assertThat(category.get().getCreateDatetime()).isNotNull();
  }

  @Test
  @Transactional
  public void test_findById2() {
    Optional<Category> category = categoryRepository.findById(2L);
    assertThat(category.isPresent()).isTrue();
    Category parentCategory = category.get().getParentCategory();
    assertThat(parentCategory).isNotNull();
    assertThat(parentCategory.getUser().getId()).isEqualTo(3L);
  }

  @Test
  @DirtiesContext
  public void test_save() {
    Optional<User> user = userRepository.findById(1L);
    assertThat(user.isPresent()).isTrue();
    Optional<Category> parent = categoryRepository.findById(1L);
    assertThat(parent.isPresent()).isTrue();
    Category category = Category.builder()
        .categoryLimit(new BigDecimal("10.1"))
        .name("Bicycle")
        .createDatetime(LocalDateTime.now())
        .user(user.get())
        .parentCategory(parent.get())
        .build();

    Category savedCategory = categoryRepository.saveAndFlush(category);
    assertThat(categoryRepository.findAll().size()).isEqualTo(7);
    assertThat(savedCategory.getId()).isNotNull();
    assertThat(savedCategory.getCreateDatetime()).isNotNull();
    assertThat(savedCategory.getParentCategory().getId()).isEqualTo(1L);
  }
}
