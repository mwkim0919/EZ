package com.ez.ezbackend.budget.controller;

import com.ez.ezbackend.budget.entity.Category;
import com.ez.ezbackend.budget.model.CategoryModel;
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
  public ResponseEntity<List<CategoryModel>> get(@PathVariable("userId") long userId) {
    List<Category> categories = categoryService.getAllCategoriesForUser(userId);
    List<CategoryModel> categoryModels = categories.stream().map(CategoryModel::convertFromCategory).collect(Collectors.toList());
    return ResponseEntity.ok(categoryModels);
  }

  @PostMapping(GET_OR_CREATE_CATEGORY_URI)
  public ResponseEntity<CategoryModel> create(@PathVariable("userId") long userId, @RequestBody CategoryModel categoryModel) {
    Category created = categoryService.saveCategory(categoryModel, userId);
    CategoryModel createdCategoryModel = CategoryModel.convertFromCategory(created);
    URI location = ControllerUtil.createUri(createdCategoryModel.getId(), "users/" + userId + "/categories/{id}");
    return ResponseEntity.created(location).body(createdCategoryModel);
  }

  @PutMapping(UPDATE_OR_DELETE_CATEGORY_URI)
  public ResponseEntity<CategoryModel> update(@PathVariable("userId") long userId, @PathVariable("categoryId") long categoryId, @RequestBody CategoryModel category) {
    Category updated = categoryService.updateCategory(category, categoryId, userId);
    CategoryModel updatedModel = CategoryModel.convertFromCategory(updated);
    return ResponseEntity.ok(updatedModel);
  }

  @DeleteMapping(UPDATE_OR_DELETE_CATEGORY_URI)
  public ResponseEntity delete(@PathVariable("userId") long userId, @PathVariable("categoryId") long categoryId) {
    categoryService.deleteCategory(categoryId, userId);
    return ResponseEntity.accepted().build();
  }
}
