package com.cabinet.medical.repository;

import com.cabinet.medical.entity.PasswordResetToken;
import com.cabinet.medical.admin.entity.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {

    Optional<PasswordResetToken> findByToken(String token);

    List<PasswordResetToken> findByUtilisateur(Utilisateur utilisateur);

    void deleteByExpiryDateBefore(LocalDateTime now);

    void deleteByUtilisateur(Utilisateur utilisateur);
}