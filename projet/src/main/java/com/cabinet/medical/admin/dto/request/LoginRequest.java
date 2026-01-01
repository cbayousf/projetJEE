package com.cabinet.medical.admin.dto.request;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String password;

    public String getLogin() {
        return email;
    }

    public String getPassword() {
        return password;
    }
}
