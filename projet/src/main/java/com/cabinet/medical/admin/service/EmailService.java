package com.cabinet.medical.admin.service;

import com.cabinet.medical.admin.entity.Utilisateur;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class EmailService {

    /**
     * Simuler l'envoi d'un email de réinitialisation
     * En production, intégrer avec un service d'email (SendGrid, JavaMail, etc.)
     */
    public void sendPasswordResetEmail(Utilisateur utilisateur, String token) {
        String resetUrl = "http://localhost:3000/reset-password?token=" + token;

        log.info("=========================================");
        log.info("📧 EMAIL DE RÉINITIALISATION");
        log.info("=========================================");
        log.info("Destinataire: {} {}", utilisateur.getPrenom(), utilisateur.getNom());
        log.info("Login: {}", utilisateur.getLogin());
        log.info("Token: {}", token);
        log.info("Lien: {}", resetUrl);
        log.info("=========================================");
        log.info("⚠️  COPIEZ CE TOKEN POUR TESTER: {}", token);
        log.info("=========================================");
    }
}