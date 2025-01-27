package com.xtech.printerserver.user.service.impl;

import com.xtech.printerserver.user.dto.UserDto;
import com.xtech.printerserver.user.exception.DatabaseException;
import com.xtech.printerserver.user.model.Role;
import com.xtech.printerserver.user.model.User;
import com.xtech.printerserver.user.repository.UserRepository;
import com.xtech.printerserver.user.service.AuthService;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    public AuthServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public String login(String email, String password) {
        return "";
    }

    @Override
    public String register(UserDto userDto) {
        User user = new User();
        user.setEmail(userDto.getEmail());
        user.setPassword(userDto.getPassword());
        user.setRole(Role.Role_user);
     try{
         userRepository.save(user);
         return "success";
     } catch (Exception e) {
      throw new DatabaseException("Error while saving user");
     }

    }


}
