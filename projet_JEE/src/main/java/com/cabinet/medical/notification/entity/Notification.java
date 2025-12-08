package com.cabinet.medical.notification.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "notifications")
public class Notification {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 500)
    private String message;
    
    @Column(name = "date_envoi", nullable = false)
    private LocalDateTime dateEnvoi;
    
    @Column(nullable = false)
    private Boolean lu = false;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private TypeNotificationEnum type;
    
    @Column(name = "utilisateur_id", nullable = false)
    private Long utilisateurId;
    
    @Column(name = "patient_id")
    private Long patientId;
    
    @Column(name = "rendezvous_id")
    private Long rendezVousId;
    
    // Constructeurs
    public Notification() {}
    
    public Notification(Long id, String message, LocalDateTime dateEnvoi, Boolean lu,
                       TypeNotificationEnum type, Long utilisateurId, 
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
    
    @PrePersist
    protected void onCreate() {
        if (dateEnvoi == null) {
            dateEnvoi = LocalDateTime.now();
        }
        if (lu == null) {
            lu = false;
        }
    }
}