package com.ez.ezbackend.budget.service;

import com.ez.ezbackend.budget.entity.Category;
import com.ez.ezbackend.budget.request.CategoryRequest;

import java.util.List;
import java.util.Set;

public interface CategoryService {
  List<Category> getSubcategories(long categoryId, long userId);

  List<Category> getAllCategoriesForUser(long userId);

  List<Category> saveCategories(List<CategoryRequest> categoryRequests, long userId);

  Category updateCategory(CategoryRequest categoryRequest, long categoryId, long userId);

  void deleteCategories(Set<Long> categoryIds, long userId);
}
