package com.cabinet.medical.dto.request;


import com.cabinet.medical.enums.RoleEnum;
import lombok.Data;

@Data
public class UserRequest {
    private String login;
    private String pwd;
    private String nom;
    private String prenom;
    private String numTel;
    private RoleEnum role;
    private String signature; // Pour médecins seulement
}
