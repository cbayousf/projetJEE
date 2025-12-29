package com.cabinet.medical.dto.response;


import com.cabinet.medical.enums.RoleEnum;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponse {
    private Long id;
    private String login;
    private String nom;
    private String prenom;
    private RoleEnum role;
    private String token; // Pour JWT plus tard
}
