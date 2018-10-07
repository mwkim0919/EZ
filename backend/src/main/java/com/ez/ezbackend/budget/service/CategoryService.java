package com.ez.ezbackend.budget.service;

import com.ez.ezbackend.budget.entity.Category;
import com.ez.ezbackend.budget.model.CategoryModel;

import java.util.List;

public interface CategoryService {
  List<Category> getSubcategories(long categoryId, long userId);

  List<Category> getAllCategoriesForUser(long userId);

  Category saveCategory(CategoryModel categoryModel, long userId);

  Category updateCategory(CategoryModel categoryModel, long categoryId, long userId);

  void deleteCategory(long categoryId, long userId);
}
