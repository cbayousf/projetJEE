package com.cabinet.medical.admin.dto.request;

import lombok.Data;

@Data
public class RegisterRequest {
    private String nom;
    private String prenom;
    private String email;
    private String numTel;
    private String password;
    private String role;
}
