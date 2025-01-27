package com.xtech.printerserver.user.service;

import com.xtech.printerserver.user.dto.UserDto;

public interface AuthService {
    String login(String email, String password);
    String register(UserDto userDto);

}
