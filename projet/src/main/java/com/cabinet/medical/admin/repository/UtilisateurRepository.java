package com.cabinet.medical.admin.repository;

import com.cabinet.medical.admin.entity.Utilisateur;
import com.cabinet.medical.admin.enums.RoleEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {
    Optional<Utilisateur> findByLogin(String login);

    Optional<Utilisateur> findByLoginAndPwd(String login, String pwd);

    List<Utilisateur> findByRole(RoleEnum role);

    boolean existsByLogin(String login);
}
