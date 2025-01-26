package com.xtech.printerserver.user.model;

import org.springframework.security.core.GrantedAuthority;

public enum Role implements GrantedAuthority {
    Role_admin,
    Role_user;

    @Override
    public String getAuthority() {
        return name();
    }
}
