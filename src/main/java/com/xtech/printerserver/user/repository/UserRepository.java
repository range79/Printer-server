package com.xtech.printerserver.user.repository;

import com.xtech.printerserver.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
