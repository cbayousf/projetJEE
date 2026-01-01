package com.cabinet.medical.admin.dto.request;

import lombok.Data;

@Data
public class ForgotPasswordRequest {
    private String login;
    
    public ForgotPasswordRequest() {}
    
    public ForgotPasswordRequest(String login) {
        this.login = login;
    }
    
    public String getLogin() {
        return login;
    }
    
    public void setLogin(String login) {
        this.login = login;
    }
}