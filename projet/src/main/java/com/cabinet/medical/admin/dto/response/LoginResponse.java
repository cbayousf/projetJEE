package com.cabinet.medical.admin.dto.response;

import lombok.Data;

@Data
public class LoginResponse {
    private Long id;
    private String login;
    private String nom;
    private String prenom;
    private String role;
    private String token;

    public LoginResponse(Long id, String login, String nom, String prenom, String role, String token) {
        this.id = id;
        this.login = login;
        this.nom = nom;
        this.prenom = prenom;
        this.role = role;
        this.token = token;
    }
}
