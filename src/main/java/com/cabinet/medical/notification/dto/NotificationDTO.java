package com.cabinet.medical.notification.dto;

import com.cabinet.medical.notification.entity.TypeNotificationEnum;
import java.time.LocalDateTime;

public class NotificationDTO {
    private Long id;
    private String message;
    private LocalDateTime dateEnvoi;
    private Boolean lu;
    private TypeNotificationEnum type;
    private Long utilisateurId;
    private Long patientId;
    private Long rendezVousId;
    
    // Constructeurs
    public NotificationDTO() {}
    
    public NotificationDTO(Long id, String message, LocalDateTime dateEnvoi,
                          Boolean lu, TypeNotificationEnum type, Long utilisateurId,
                          Long patientId, Long rendezVousId) {
        this.id = id;
        this.message = message;
        this.dateEnvoi = dateEnvoi;
        this.lu = lu;
        this.type = type;
        this.utilisateurId = utilisateurId;
        this.patientId = patientId;
        this.rendezVousId = rendezVousId;
    }
    
    // Getters et Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    
    public LocalDateTime getDateEnvoi() { return dateEnvoi; }
    public void setDateEnvoi(LocalDateTime dateEnvoi) { this.dateEnvoi = dateEnvoi; }
    
    public Boolean getLu() { return lu; }
    public void setLu(Boolean lu) { this.lu = lu; }
    
    public TypeNotificationEnum getType() { return type; }
    public void setType(TypeNotificationEnum type) { this.type = type; }
    
    public Long getUtilisateurId() { return utilisateurId; }
    public void setUtilisateurId(Long utilisateurId) { this.utilisateurId = utilisateurId; }
    
    public Long getPatientId() { return patientId; }
    public void setPatientId(Long patientId) { this.patientId = patientId; }
    
    public Long getRendezVousId() { return rendezVousId; }
    public void setRendezVousId(Long rendezVousId) { this.rendezVousId = rendezVousId; }
}