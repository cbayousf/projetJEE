package com.cabinet.medical.controller;


import com.cabinet.medical.dto.request.ForgotPasswordRequest;
import com.cabinet.medical.dto.request.ResetPasswordRequest;
import com.cabinet.medical.dto.response.MessageResponse;
import com.cabinet.medical.entity.PasswordResetToken;
import com.cabinet.medical.service.EmailService;
import com.cabinet.medical.service.PasswordResetService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class PasswordResetController {

    private final PasswordResetService passwordResetService;
    private final EmailService emailService;

    /**
     * Endpoint 1 : Demander la réinitialisation du mot de passe
     * POST /api/auth/forgot-password
     */
    @PostMapping("/forgot-password")
    public ResponseEntity<MessageResponse> forgotPassword(
            @RequestBody ForgotPasswordRequest request) {
        try {
            // ✅ Vérifier que le login n'est pas vide
            if (request.getLogin() == null || request.getLogin().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(
                        new MessageResponse("Le login est requis", false)
                );
            }
            // Créer le token de réinitialisation
            PasswordResetToken resetToken = passwordResetService.createResetToken(request.getLogin());

            // Envoyer l'email (simulation)
            emailService.sendPasswordResetEmail(
                    resetToken.getUtilisateur(),
                    resetToken.getToken()
            );

            return ResponseEntity.ok(
                    new MessageResponse(
                            "Un lien de réinitialisation a été généré. Token: " + resetToken.getToken(),
                            true
                    )
            );

        } catch (RuntimeException e) {
            // ✅ Message plus clair pour le développement
            return ResponseEntity.badRequest().body(
                    new MessageResponse(
                            "Utilisateur introuvable avec le login: " + request.getLogin(),
                            false
                    )
            );
        }
    }

    /**
     * Endpoint 2 : Vérifier la validité d'un token
     * GET /api/auth/validate-reset-token?token=xxx
     */
    @GetMapping("/validate-reset-token")
    public ResponseEntity<MessageResponse> validateToken(@RequestParam String token) {
        try {
            passwordResetService.validateResetToken(token);
            return ResponseEntity.ok(
                    new MessageResponse("Token valide", true)
            );
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(
                    new MessageResponse(e.getMessage(), false)
            );
        }
    }

    /**
     * Endpoint 3 : Réinitialiser le mot de passe avec le token
     * POST /api/auth/reset-password
     */
    @PostMapping("/reset-password")
    public ResponseEntity<MessageResponse> resetPassword(
            @RequestBody ResetPasswordRequest request) {
        try {
            // Vérifier que les mots de passe correspondent
            if (!request.getNewPassword().equals(request.getConfirmPassword())) {
                return ResponseEntity.badRequest().body(
                        new MessageResponse("Les mots de passe ne correspondent pas", false)
                );
            }

            // Vérifier la longueur minimale du mot de passe
            if (request.getNewPassword().length() < 6) {
                return ResponseEntity.badRequest().body(
                        new MessageResponse("Le mot de passe doit contenir au moins 6 caractères", false)
                );
            }

            // Réinitialiser le mot de passe
            passwordResetService.resetPassword(request.getToken(), request.getNewPassword());

            return ResponseEntity.ok(
                    new MessageResponse(
                            "Votre mot de passe a été réinitialisé avec succès. Vous pouvez maintenant vous connecter.",
                            true
                    )
            );

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(
                    new MessageResponse(e.getMessage(), false)
            );
        }
    }

    /**
     * Endpoint 4 : Nettoyer les tokens expirés (à appeler périodiquement)
     * DELETE /api/auth/clean-expired-tokens
     */
    @DeleteMapping("/clean-expired-tokens")
    public ResponseEntity<MessageResponse> cleanExpiredTokens() {
        passwordResetService.cleanExpiredTokens();
        return ResponseEntity.ok(
                new MessageResponse("Tokens expirés nettoyés", true)
        );
    }
}
