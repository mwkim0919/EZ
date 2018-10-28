package com.ez.ezbackend.shared.service;

import com.ez.ezbackend.shared.entity.User;
import com.ez.ezbackend.shared.request.UserRequest;

public interface UserService {
  User createUser(UserRequest userRequest);
}
