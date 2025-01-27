package com.xtech.printerserver.user.service.impl;

import com.xtech.printerserver.user.model.User;
import com.xtech.printerserver.user.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public class MyUserDetailsImpl implements UserDetailsService {
    private UserRepository userRepository;
    public MyUserDetailsImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        
        User user  =userRepository.findByEmail(username);
        if (user==null) {
            throw new UsernameNotFoundException("User with Email: " + username + " not found");
        }
        return user;
    }
}
