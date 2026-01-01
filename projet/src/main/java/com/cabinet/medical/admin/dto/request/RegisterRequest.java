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
    public String getEmail() { return email; }
    public String getPassword() { return password; }
    public String getNom() { return nom; }
    public String getPrenom() { return prenom; }
    public String getNumTel() { return numTel; }
    public String getRole() { return role; }
}