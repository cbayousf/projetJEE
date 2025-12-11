package com.cabinet.medical.notification.repository;

import com.cabinet.medical.notification.entity.Notification;
import com.cabinet.medical.notification.entity.TypeNotificationEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {

    List<Notification> findByUtilisateurIdOrderByDateEnvoiDesc(Long utilisateurId);

    List<Notification> findByUtilisateurIdAndLuOrderByDateEnvoiDesc(Long utilisateurId, Boolean lu);

    Long countByUtilisateurIdAndLu(Long utilisateurId, Boolean lu);

    List<Notification> findByType(TypeNotificationEnum type);

    @Modifying
    @Query("UPDATE Notification n SET n.lu = true WHERE n.utilisateurId = :utilisateurId AND n.lu = false")
    int marquerToutesCommeLues(@Param("utilisateurId") Long utilisateurId);

    @Query("SELECT n FROM Notification n WHERE n.utilisateurId = :utilisateurId " +
           "ORDER BY n.dateEnvoi DESC")
    List<Notification> findRecentByUtilisateur(@Param("utilisateurId") Long utilisateurId);
}