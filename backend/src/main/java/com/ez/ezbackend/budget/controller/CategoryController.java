package com.ez.ezbackend.budget.controller;

import com.ez.ezbackend.budget.entity.Category;
import com.ez.ezbackend.budget.request.CategoryRequest;
import com.ez.ezbackend.budget.response.CategoryResponse;
import com.ez.ezbackend.budget.service.CategoryService;
import com.ez.ezbackend.shared.util.ControllerUtil;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.inject.Inject;
import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor(onConstructor = @__(@Inject))
@PreAuthorize("#userId == principal.id")
public class CategoryController {

  private static final String GET_OR_CREATE_CATEGORY_URI = "/users/{userId}/categories";
  private static final String UPDATE_OR_DELETE_CATEGORY_URI = "/users/{userId}/categories/{categoryId}";

  private final CategoryService categoryService;

  @GetMapping(GET_OR_CREATE_CATEGORY_URI)
  public ResponseEntity<List<CategoryResponse>> get(@PathVariable("userId") long userId) {
    List<Category> categories = categoryService.getAllCategoriesForUser(userId);
    List<CategoryResponse> categoryResponses = categories.stream().map(CategoryResponse::convertFromCategory).collect(Collectors.toList());
    return ResponseEntity.ok(categoryResponses);
  }

  @PostMapping(GET_OR_CREATE_CATEGORY_URI)
  public ResponseEntity<CategoryResponse> create(@PathVariable("userId") long userId, @RequestBody CategoryRequest categoryRequest) {
    Category created = categoryService.saveCategory(categoryRequest, userId);
    CategoryResponse categoryResponse = CategoryResponse.convertFromCategory(created);
    URI location = ControllerUtil.createUri(categoryResponse.getId(), "users/" + userId + "/categories/{id}");
    return ResponseEntity.created(location).body(categoryResponse);
  }

  @PutMapping(UPDATE_OR_DELETE_CATEGORY_URI)
  public ResponseEntity<CategoryResponse> update(@PathVariable("userId") long userId, @PathVariable("categoryId") long categoryId, @RequestBody CategoryRequest category) {
    Category updated = categoryService.updateCategory(category, categoryId, userId);
    CategoryResponse categoryResponse = CategoryResponse.convertFromCategory(updated);
    return ResponseEntity.ok(categoryResponse);
  }

  @DeleteMapping(UPDATE_OR_DELETE_CATEGORY_URI)
  public ResponseEntity delete(@PathVariable("userId") long userId, @PathVariable("categoryId") long categoryId) {
    categoryService.deleteCategory(categoryId, userId);
    return ResponseEntity.accepted().build();
  }
}
