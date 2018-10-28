package com.ez.ezbackend.budget.controller;

import com.ez.ezbackend.budget.entity.Category;
import com.ez.ezbackend.budget.request.CategoryRequest;
import com.ez.ezbackend.budget.service.CategoryService;
import com.ez.ezbackend.shared.entity.User;
import com.ez.ezbackend.shared.exception.EzNotFoundException;
import com.ez.ezbackend.shared.exception.EzReadOnlyException;
import com.ez.ezbackend.shared.util.JsonUtil;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import javax.inject.Inject;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Collections;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(
    controllers = CategoryController.class,
    secure = false
)
public class CategoryControllerTest {
  @Inject
  private MockMvc mockMvc;

  @MockBean
  private CategoryService categoryService;

  @Test
  public void test_getAllCategories_success() throws Exception {
    when(categoryService.getAllCategoriesForUser(1L)).thenReturn(Collections.emptyList());
    mockMvc.perform(get("/api/users/1/categories"))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(content().json("[]"));
  }

  @Test
  public void test_getAllCategories_failure() throws Exception {
    when(categoryService.getAllCategoriesForUser(1L)).thenThrow(new EzNotFoundException("Not found"));
    mockMvc.perform(get("/api/users/1/categories"))
        .andDo(print())
        .andExpect(status().isNotFound());
  }

  @Test
  public void test_saveCategory_success() throws Exception {
    CategoryRequest categoryRequest = CategoryRequest.builder()
        .name("Food")
        .categoryLimit(new BigDecimal("100.00"))
        .createDatetime(LocalDateTime.now())
        .build();

    Category category = CategoryRequest.convertToCategory(
        categoryRequest, new User(), null, 10L);
    String json = JsonUtil.convertToJson(categoryRequest, CategoryRequest.class);
    when(categoryService.saveCategory(any(CategoryRequest.class), any(long.class))).thenReturn(category);
    mockMvc
        .perform(post("/api/users/1/categories")
            .content(json)
            .contentType(MediaType.APPLICATION_JSON)
            .accept(MediaType.APPLICATION_JSON))
        .andDo(print())
        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.id").value("10"))
        .andExpect(jsonPath("$.name").value("Food"))
        .andExpect(jsonPath("$.categoryLimit").value("100.00"))
        .andExpect(jsonPath("$.parentCategory").doesNotExist())
        .andExpect(jsonPath("$.createDatetime").exists());
  }

  @Test
  public void test_saveCategory_failure() throws Exception {
    when(categoryService.saveCategory(any(CategoryRequest.class), any(long.class)))
        .thenThrow(new EzReadOnlyException("Id should be read-only."));
    mockMvc
        .perform(post("/api/users/1/categories"))
        .andDo(print())
        .andExpect(status().isBadRequest());
  }

  @Test
  public void test_updateCategory_success() throws Exception {
    CategoryRequest categoryRequest = CategoryRequest.builder()
        .name("Transportation Updated")
        .categoryLimit(new BigDecimal("100.00"))
        .createDatetime(LocalDateTime.now())
        .build();
    Category transaction = CategoryRequest.convertToCategory(categoryRequest, new User(), null, 1L);
    String json = JsonUtil.convertToJson(categoryRequest, CategoryRequest.class);
    when(categoryService.updateCategory(any(CategoryRequest.class), any(long.class), any(long.class)))
        .thenReturn(transaction);
    mockMvc
        .perform(put("/api/users/1/categories/1")
            .content(json)
            .contentType(MediaType.APPLICATION_JSON)
            .accept(MediaType.APPLICATION_JSON))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.id").value("1"))
        .andExpect(jsonPath("$.name").value("Transportation Updated"))
        .andExpect(jsonPath("$.categoryLimit").value("100.00"))
        .andExpect(jsonPath("$.parentCategory").doesNotExist())
        .andExpect(jsonPath("$.createDatetime").exists());
  }

  @Test
  public void test_deleteTransactionForUser_success() throws Exception {
    doNothing().when(categoryService).deleteCategory(any(long.class), any(long.class));
    mockMvc.perform(delete("/api/users/1/categories/1")).andExpect(status().isAccepted());
  }
}
