package com.cabinet.medical.admin.dto.request;

import lombok.Data;

@Data
public class LoginRequest {
    private String login;
    private String password;
    public String getLogin() { return login; }
    public String getPassword() { return password; }
}