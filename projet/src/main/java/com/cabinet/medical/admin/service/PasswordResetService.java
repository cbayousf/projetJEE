package com.cabinet.medical.admin.service;

import com.cabinet.medical.admin.entity.PasswordResetToken;
import com.cabinet.medical.admin.entity.Utilisateur;
import com.cabinet.medical.admin.repository.PasswordResetTokenRepository;
import com.cabinet.medical.admin.repository.UtilisateurRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class PasswordResetService {

    private final PasswordResetTokenRepository tokenRepository;
    private final UtilisateurRepository utilisateurRepository;

    // Durée de validité du token : 1 heure
    private static final int EXPIRATION_HOURS = 1;

    /**
     * Créer un token de réinitialisation pour un utilisateur
     */
    public PasswordResetToken createResetToken(String login) {
        // ✅ Rechercher l'utilisateur par login
        Utilisateur utilisateur = utilisateurRepository.findByLogin(login)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable avec le login: " + login));

        // Supprimer les anciens tokens de cet utilisateur
        tokenRepository.deleteByUtilisateur(utilisateur);

        // Générer un nouveau token
        String token = UUID.randomUUID().toString();
        LocalDateTime expiryDate = LocalDateTime.now().plusHours(EXPIRATION_HOURS);

        PasswordResetToken resetToken = new PasswordResetToken(token, utilisateur, expiryDate);
        return tokenRepository.save(resetToken);
    }

    /**
     * Valider un token de réinitialisation
     */
    public void validateResetToken(String token) {
        PasswordResetToken resetToken = tokenRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Token invalide"));

        if (resetToken.isExpired()) {
            throw new RuntimeException("Token expiré");
        }

        if (resetToken.getUsed()) {
            throw new RuntimeException("Token déjà utilisé");
        }
    }

    /**
     * Réinitialiser le mot de passe avec un token
     */
    public void resetPassword(String token, String newPassword) {
        PasswordResetToken resetToken = tokenRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Token invalide"));

        if (resetToken.isExpired()) {
            throw new RuntimeException("Token expiré");
        }

        if (resetToken.getUsed()) {
            throw new RuntimeException("Token déjà utilisé");
        }

        // Mettre à jour le mot de passe de l'utilisateur
        Utilisateur utilisateur = resetToken.getUtilisateur();
        utilisateur.setPwd(newPassword); // ⚠️ Encoder le mot de passe si vous utilisez BCrypt
        utilisateurRepository.save(utilisateur);

        // Marquer le token comme utilisé
        resetToken.setUsed(true);
        tokenRepository.save(resetToken);
    }

    /**
     * Nettoyer les tokens expirés
     */
    public void cleanExpiredTokens() {
        tokenRepository.deleteByExpiryDateBefore(LocalDateTime.now());
    }
}
