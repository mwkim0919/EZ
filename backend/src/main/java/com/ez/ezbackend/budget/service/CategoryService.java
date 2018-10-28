package com.ez.ezbackend.budget.service;

import com.ez.ezbackend.budget.entity.Category;
import com.ez.ezbackend.budget.request.CategoryRequest;

import java.util.List;

public interface CategoryService {
  List<Category> getSubcategories(long categoryId, long userId);

  List<Category> getAllCategoriesForUser(long userId);

  Category saveCategory(CategoryRequest categoryRequest, long userId);

  Category updateCategory(CategoryRequest categoryRequest, long categoryId, long userId);

  void deleteCategory(long categoryId, long userId);
}
