package com.cabinet.medical.notification.service;

import com.cabinet.medical.notification.dto.NotificationDTO;
import com.cabinet.medical.notification.entity.Notification;
import com.cabinet.medical.notification.entity.TypeNotificationEnum;
import com.cabinet.medical.notification.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class NotificationService {

    private final NotificationRepository notificationRepository;

    @Autowired
    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    public NotificationDTO createNotification(NotificationDTO dto) {
        Notification notification = new Notification();
        notification.setMessage(dto.getMessage());
        notification.setDateEnvoi(LocalDateTime.now());
        notification.setLu(false);
        notification.setType(dto.getType());
        notification.setUtilisateurId(dto.getUtilisateurId());
        notification.setPatientId(dto.getPatientId());
        notification.setRendezVousId(dto.getRendezVousId());

        Notification saved = notificationRepository.save(notification);
        return convertToDTO(saved);
    }

    public NotificationDTO getNotificationById(Long id) {
        Optional<Notification> notification = notificationRepository.findById(id);
        return notification.map(this::convertToDTO).orElse(null);
    }

    public List<NotificationDTO> getNotificationsByUser(Long utilisateurId) {
        List<Notification> notifications = notificationRepository.findByUtilisateurIdOrderByDateEnvoiDesc(utilisateurId);
        return notifications.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public List<NotificationDTO> getUnreadNotifications(Long utilisateurId) {
        List<Notification> notifications = notificationRepository.findByUtilisateurIdAndLuOrderByDateEnvoiDesc(utilisateurId, false);
        return notifications.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public Long countUnreadNotifications(Long utilisateurId) {
        return notificationRepository.countByUtilisateurIdAndLu(utilisateurId, false);
    }

    public NotificationDTO markAsRead(Long id) {
        Optional<Notification> notificationOpt = notificationRepository.findById(id);
        if (notificationOpt.isPresent()) {
            Notification notification = notificationOpt.get();
            notification.setLu(true);
            Notification updated = notificationRepository.save(notification);
            return convertToDTO(updated);
        }
        return null;
    }

    public int markAllAsRead(Long utilisateurId) {
        return notificationRepository.marquerToutesCommeLues(utilisateurId);
    }

    public void deleteNotification(Long id) {
        notificationRepository.deleteById(id);
    }

    public NotificationDTO updateNotification(Long id, NotificationDTO dto) {
        Optional<Notification> notificationOpt = notificationRepository.findById(id);
        if (notificationOpt.isPresent()) {
            Notification notification = notificationOpt.get();
            notification.setMessage(dto.getMessage());
            notification.setType(dto.getType());
            notification.setUtilisateurId(dto.getUtilisateurId());
            notification.setPatientId(dto.getPatientId());
            notification.setRendezVousId(dto.getRendezVousId());

            Notification updated = notificationRepository.save(notification);
            return convertToDTO(updated);
        }
        return null;
    }

    private NotificationDTO convertToDTO(Notification notification) {
        NotificationDTO dto = new NotificationDTO();
        dto.setId(notification.getId());
        dto.setMessage(notification.getMessage());
        dto.setDateEnvoi(notification.getDateEnvoi());
        dto.setLu(notification.getLu());
        dto.setType(notification.getType());
        dto.setUtilisateurId(notification.getUtilisateurId());
        dto.setPatientId(notification.getPatientId());
        dto.setRendezVousId(notification.getRendezVousId());
        return dto;
    }
}