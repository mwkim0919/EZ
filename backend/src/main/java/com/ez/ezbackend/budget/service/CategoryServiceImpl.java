package com.ez.ezbackend.budget.service;

import com.ez.ezbackend.budget.entity.Category;
import com.ez.ezbackend.budget.model.CategoryModel;
import com.ez.ezbackend.budget.repository.CategoryRepository;
import com.ez.ezbackend.shared.entity.User;
import com.ez.ezbackend.shared.exception.EzIllegalRequestException;
import com.ez.ezbackend.shared.exception.EzNotFoundException;
import com.ez.ezbackend.shared.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor(onConstructor = @__(@Inject))
public class CategoryServiceImpl implements CategoryService {

  private final CategoryRepository categoryRepository;
  private final UserRepository userRepository;

  @Override
  public List<Category> getSubcategories(long categoryId, long userId) {
    userRepository.findById(userId)
        .orElseThrow(() -> new EzNotFoundException("User with ID: " + userId + " not found."));
    Category category = categoryRepository.findById(categoryId).
        orElseThrow(() -> new EzNotFoundException("Category with ID: " + categoryId + " not found."));
    if (category.getUser().getId() != userId) {
      throw new EzIllegalRequestException("User " + userId + " does not own category with ID: " + categoryId);
    }
    return categoryRepository.findByParentCategory(category);
  }

  @Override
  public List<Category> getAllCategoriesForUser(long userId) {
    User user = userRepository.findById(userId)
        .orElseThrow(() -> new EzNotFoundException("User with ID: " + userId + " not found."));
    return categoryRepository.findByUser(user);
  }

  @Override
  public Category saveCategory(CategoryModel categoryModel, long userId) {
    User user = userRepository.findById(userId)
        .orElseThrow(() -> new EzNotFoundException("User with ID: " + userId + " not found."));
    return categoryRepository.saveAndFlush(CategoryModel.convertToCategory(categoryModel, user));
  }

  @Override
  public Category updateCategory(CategoryModel categoryModel, long categoryId, long userId) {
    User user = userRepository.findById(userId)
        .orElseThrow(() -> new EzNotFoundException("User with ID: " + userId + " not found."));
    Category category = categoryRepository.findById(categoryId)
        .orElseThrow(() -> new EzNotFoundException("Category with ID: " + categoryId + " not found."));
    if (category.getUser().getId() != userId) {
      throw new EzIllegalRequestException("User " + userId + " does not own category with ID:" + categoryId);
    }
    return categoryRepository.saveAndFlush(CategoryModel.convertToCategory(categoryModel, user));
  }

  @Override
  public void deleteCategory(long categoryId, long userId) {
    userRepository.findById(userId)
        .orElseThrow(() -> new EzNotFoundException("User with ID: " + userId + " not found."));
    Category category = categoryRepository.findById(categoryId).orElseThrow(() -> new EzNotFoundException("Category with ID: " + categoryId + " not found."));
    if (category.getUser().getId() != userId) {
      throw new EzIllegalRequestException("User " + userId + " does not own category with ID:" + categoryId);
    }
    categoryRepository.delete(category);
  }
}
