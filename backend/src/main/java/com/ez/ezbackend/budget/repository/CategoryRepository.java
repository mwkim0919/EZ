package com.ez.ezbackend.budget.repository;

import com.ez.ezbackend.budget.entity.Category;
import com.ez.ezbackend.shared.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
  List<Category> findByParentCategory(Category category);
  List<Category> findByUser(User user);
}
