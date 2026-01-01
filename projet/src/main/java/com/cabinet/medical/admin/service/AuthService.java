package com.cabinet.medical.admin.service;

import com.cabinet.medical.admin.dto.request.LoginRequest;
import com.cabinet.medical.admin.dto.request.RegisterRequest;
import com.cabinet.medical.admin.dto.response.LoginResponse;
import com.cabinet.medical.admin.entity.Administrateur;
import com.cabinet.medical.admin.entity.Medecin;
import com.cabinet.medical.admin.entity.Secretaire;
import com.cabinet.medical.admin.entity.Utilisateur;
import com.cabinet.medical.admin.enums.RoleEnum;
import com.cabinet.medical.admin.repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AuthService {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public LoginResponse login(LoginRequest request) {
        Utilisateur user = utilisateurRepository
                .findByLogin(request.getLogin())
                .orElseThrow(() -> new RuntimeException("Login ou mot de passe incorrect"));

        // Vérifier le mot de passe avec BCrypt
        if (!passwordEncoder.matches(request.getPassword(), user.getPwd())) {
            throw new RuntimeException("Login ou mot de passe incorrect");
        }

        return new LoginResponse(
                user.getId(),
                user.getLogin(),
                user.getNom(),
                user.getPrenom(),
                user.getRole().name(),
                "token-" + user.getId() // Token simple pour démo
        );
    }

    public LoginResponse register(RegisterRequest request) {
        // Vérifier si l'utilisateur existe déjà
        if (utilisateurRepository.findByLogin(request.getEmail()).isPresent()) {
            throw new RuntimeException("Un utilisateur avec cet email existe déjà");
        }

        Utilisateur user;
        RoleEnum role = RoleEnum.valueOf(request.getRole());

        // Hash the password
        String hashedPassword = passwordEncoder.encode(request.getPassword());

        switch (role) {
            case MEDECIN:
                user = new Medecin(
                        request.getEmail(),
                        hashedPassword,
                        request.getNom(),
                        request.getPrenom(),
                        request.getNumTel(),
                        null // signature
                );
                break;
            case SECRETAIRE:
                user = new Secretaire(
                        request.getEmail(),
                        hashedPassword,
                        request.getNom(),
                        request.getPrenom(),
                        request.getNumTel());
                break;
            case ADMINISTRATEUR:
                user = new Administrateur(
                        request.getEmail(),
                        hashedPassword,
                        request.getNom(),
                        request.getPrenom(),
                        request.getNumTel());
                break;
            default:
                throw new RuntimeException("Rôle invalide");
        }

        Utilisateur savedUser = utilisateurRepository.save(user);

        return new LoginResponse(
                savedUser.getId(),
                savedUser.getLogin(),
                savedUser.getNom(),
                savedUser.getPrenom(),
                savedUser.getRole().name(),
                "token-" + savedUser.getId());
    }
}