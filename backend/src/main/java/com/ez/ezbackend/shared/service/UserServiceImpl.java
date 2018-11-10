package com.ez.ezbackend.shared.service;

import com.ez.ezbackend.budget.entity.Category;
import com.ez.ezbackend.budget.repository.CategoryRepository;
import com.ez.ezbackend.shared.entity.User;
import com.ez.ezbackend.shared.enums.DefaultCategory;
import com.ez.ezbackend.shared.enums.UserRole;
import com.ez.ezbackend.shared.exception.EzIllegalRequestException;
import com.ez.ezbackend.shared.repository.UserRepository;
import com.ez.ezbackend.shared.request.UserRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor(onConstructor = @__(@Inject))
public class UserServiceImpl implements UserService {
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final CategoryRepository categoryRepository;

  @Override
  @Transactional
  public User createUser(UserRequest userRequest) {
    if (userRepository.findByEmail(userRequest.getEmail()).isPresent()) {
      throw new EzIllegalRequestException("Email address is already in use.");
    }
    User user = User.builder()
        .email(userRequest.getEmail())
        .password(passwordEncoder.encode(userRequest.getPassword()))
        .role(UserRole.USER)
        .build();
    User createdUser = userRepository.saveAndFlush(user);

    // Create predefined categories for new user
    List<Category> categories = new ArrayList<>();
    for (DefaultCategory categoryType : DefaultCategory.values()) {
      Category category = Category.builder()
          .name(categoryType.getText())
          .user(user)
          .build();
      categories.add(category);
    }
    categoryRepository.saveAll(categories);
    return createdUser;
  }
}
