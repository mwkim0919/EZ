package com.ez.ezbackend.budget.service;

import com.ez.ezbackend.budget.entity.Category;
import com.ez.ezbackend.budget.repository.CategoryRepository;
import com.ez.ezbackend.budget.request.CategoryRequest;
import com.ez.ezbackend.shared.entity.User;
import com.ez.ezbackend.shared.exception.EzIllegalRequestException;
import com.ez.ezbackend.shared.exception.EzNotFoundException;
import com.ez.ezbackend.shared.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

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
    Category category = categoryRepository.findById(categoryId)
        .orElseThrow(() -> new EzNotFoundException("Category with ID: " + categoryId + " not found."));
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
  public List<Category> saveCategories(List<CategoryRequest> categoryRequests, long userId) {
    User user = userRepository.findById(userId)
        .orElseThrow(() -> new EzNotFoundException("User with ID: " + userId + " not found."));

    Map<Long, Category> categoryMap = categoryRepository.findAllByUser(user).stream()
        .collect(Collectors.toMap(Category::getId, Function.identity()));

    List<Category> categories = categoryRequests.stream()
        .map(categoryRequest -> {
          Long parentCategoryId = categoryRequest.getParentCategoryId();
          Category parentCategory = categoryMap.get(parentCategoryId);
          if (parentCategoryId != null && parentCategory == null) {
            throw new EzNotFoundException("Category with ID: " + categoryRequest.getParentCategoryId() + " not found.");
          }
          return CategoryRequest.convertToCategory(categoryRequest, user, parentCategory);
        })
        .collect(Collectors.toList());
    return categoryRepository.saveAll(categories);
  }

  @Override
  public Category updateCategory(CategoryRequest categoryRequest, long categoryId, long userId) {
    User user = userRepository.findById(userId)
        .orElseThrow(() -> new EzNotFoundException("User with ID: " + userId + " not found."));
    Category category = categoryRepository.findById(categoryId)
        .orElseThrow(() -> new EzNotFoundException("Category with ID: " + categoryId + " not found."));
    if (category.getUser().getId() != userId) {
      throw new EzIllegalRequestException("User " + userId + " does not own category with ID:" + categoryId);
    }
    return categoryRepository.saveAndFlush(
        CategoryRequest.convertToCategory(categoryRequest, user, category.getParentCategory(), categoryId));
  }

  @Override
  public void deleteCategories(Set<Long> categoryIds, long userId) {
    if (categoryIds.isEmpty()) {
      throw new EzIllegalRequestException("There is no category to be delete.");
    }
    User user = userRepository.findById(userId)
        .orElseThrow(() -> new EzNotFoundException("User with ID: " + userId + " not found."));
    List<Category> categories = categoryRepository.findCategoriesByIdsAndUser(categoryIds, user);
    if (categoryIds.size() != categories.size()) {
      throw new EzIllegalRequestException("Some categories are not found or cannot be deleted.");
    }
    categoryRepository.deleteCategoriesByUser(categories, user);
  }
}
