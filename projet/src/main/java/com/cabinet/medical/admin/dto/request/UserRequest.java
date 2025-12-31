package com.cabinet.medical.admin.dto.request;

import com.cabinet.medical.admin.enums.RoleEnum;
import lombok.Data;

@Data
public class UserRequest {
    private String login;
    private String pwd;
    private String nom;
    private String prenom;
    private String numTel;
    private RoleEnum role;
    private String signature;
}