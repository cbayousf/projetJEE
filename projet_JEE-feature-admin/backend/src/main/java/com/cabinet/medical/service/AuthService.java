package com.cabinet.medical.service;

import com.cabinet.medical.dto.request.LoginRequest;
import com.cabinet.medical.dto.response.LoginResponse;
import com.cabinet.medical.entity.Utilisateur;
import com.cabinet.medical.repository.UtilisateurRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UtilisateurRepository utilisateurRepository;

    public LoginResponse login(LoginRequest request) {
        Utilisateur user = utilisateurRepository
                .findByLoginAndPwd(request.getLogin(), request.getPassword())
                .orElseThrow(() -> new RuntimeException("Login ou mot de passe incorrect"));

        return new LoginResponse(
                user.getId(),
                user.getLogin(),
                user.getNom(),
                user.getPrenom(),
                user.getRole(),
                "token-temporaire" // JWT à implémenter plus tard
        );
    }
}