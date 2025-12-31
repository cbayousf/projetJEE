package com.cabinet.medical.service;

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

        // Log pour le développement - IMPORTANT: Copiez ce token !
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

        // TODO: En production, remplacer par un vrai envoi d'email
        // Exemple avec JavaMail:
        // SimpleMailMessage message = new SimpleMailMessage();
        // message.setTo(utilisateur.getEmail());
        // message.setSubject("Réinitialisation de votre mot de passe");
        // message.setText("Cliquez sur ce lien: " + resetUrl);
        // mailSender.send(message);
    }
}