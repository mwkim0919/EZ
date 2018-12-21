package com.ez.ezbackend.budget.repository;

import com.ez.ezbackend.budget.entity.Category;
import com.ez.ezbackend.shared.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
  List<Category> findByParentCategory(Category category);
  List<Category> findByUser(User user);

  // "select * from category c left join category c1 on c.id = c1.parent_category_id where user_id = :id"
  @Query("SELECT c FROM Category c LEFT JOIN FETCH c.parentCategory WHERE c.user = :user")
  List<Category> findAllByUser(@Param("user") User user);

  @Query("SELECT c FROM Category c WHERE c.id IN :ids AND c.user = :user")
  List<Category> findCategoriesByIdsAndUser(@Param("ids") Set<Long> ids, @Param("user") User user);

  @Modifying
  @Query("DELETE FROM Category c WHERE c IN :categories AND c.user = :user")
  void deleteCategoriesByUser(@Param("categories") List<Category> categories, @Param("user") User user);
}