package com.cabinet.medical.admin.service;

import com.cabinet.medical.admin.dto.request.LoginRequest;
import com.cabinet.medical.admin.dto.response.LoginResponse;
import com.cabinet.medical.admin.entity.Utilisateur;
import com.cabinet.medical.admin.repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    public LoginResponse login(LoginRequest request) {
        Utilisateur user = utilisateurRepository.findByLoginAndPwd(request.getLogin(), request.getPassword())
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

    public LoginResponse register(String nom, String prenom, String email, String numTel, String password,
            String role) {
        // Check if user already exists
        if (utilisateurRepository.findByLogin(email).isPresent()) {
            throw new RuntimeException("Un utilisateur avec cet email existe déjà");
        }

        Utilisateur user = new Utilisateur();
        user.setNom(nom);
        user.setPrenom(prenom);
        user.setLogin(email);
        user.setPwd(password);
        user.setNumTel(numTel);
        user.setRole(role);

        Utilisateur savedUser = utilisateurRepository.save(user);

        return new LoginResponse(
                savedUser.getId(),
                savedUser.getLogin(),
                savedUser.getNom(),
                savedUser.getPrenom(),
                savedUser.getRole(),
                "token-temporaire" // JWT à implémenter plus tard
        );
    }
}
