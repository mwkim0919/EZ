package com.ez.ezbackend.shared.service;

import com.ez.ezbackend.shared.entity.User;
import com.ez.ezbackend.shared.model.UserModel;

public interface UserService {
  User createUser(UserModel userRequest);
}
