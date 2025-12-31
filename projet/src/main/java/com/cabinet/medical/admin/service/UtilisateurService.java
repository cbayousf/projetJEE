package com.cabinet.medical.admin.service;

import com.cabinet.medical.admin.dto.request.UserRequest;
import com.cabinet.medical.admin.entity.Administrateur;
import com.cabinet.medical.admin.entity.Medecin;
import com.cabinet.medical.admin.entity.Secretaire;
import com.cabinet.medical.admin.entity.Utilisateur;
import com.cabinet.medical.admin.enums.RoleEnum;
import com.cabinet.medical.admin.repository.UtilisateurRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UtilisateurService {

    private final UtilisateurRepository utilisateurRepository;

    public List<Utilisateur> getAllUsers() {
        return utilisateurRepository.findAll();
    }

    public Utilisateur getUserById(Long id) {
        return utilisateurRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
    }

    public Utilisateur createUser(UserRequest request) {
        if (utilisateurRepository.existsByLogin(request.getLogin())) {
            throw new RuntimeException("Ce login existe déjà");
        }

        Utilisateur user;

        switch (request.getRole()) {
            case MEDECIN:
                user = new Medecin(
                        request.getLogin(),
                        request.getPwd(),
                        request.getNom(),
                        request.getPrenom(),
                        request.getNumTel(),
                        request.getSignature());
                break;
            case SECRETAIRE:
                user = new Secretaire(
                        request.getLogin(),
                        request.getPwd(),
                        request.getNom(),
                        request.getPrenom(),
                        request.getNumTel());
                break;
            case ADMINISTRATEUR:
                user = new Administrateur(
                        request.getLogin(),
                        request.getPwd(),
                        request.getNom(),
                        request.getPrenom(),
                        request.getNumTel());
                break;
            default:
                throw new RuntimeException("Rôle invalide");
        }

        return utilisateurRepository.save(user);
    }

    public Utilisateur updateUser(Long id, UserRequest request) {
        Utilisateur user = getUserById(id);
        user.setNom(request.getNom());
        user.setPrenom(request.getPrenom());
        user.setNumTel(request.getNumTel());

        if (user instanceof Medecin && request.getSignature() != null) {
            ((Medecin) user).setSignature(request.getSignature());
        }

        return utilisateurRepository.save(user);
    }

    public void deleteUser(Long id) {
        utilisateurRepository.deleteById(id);
    }

    public List<Utilisateur> getMedecins() {
        return utilisateurRepository.findByRole(RoleEnum.MEDECIN);
    }

    public List<Utilisateur> getSecretaires() {
        return utilisateurRepository.findByRole(RoleEnum.SECRETAIRE);
    }
}
