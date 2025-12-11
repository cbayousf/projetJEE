package com.cabinet.medical.rendezvous.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "rendez_vous")
public class RendezVous {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_rendezvous")
    private Long idRendezVous;

    @Column(name = "date_rdv", nullable = false)
    private LocalDate dateRdv;

    @Column(name = "heure_rdv", nullable = false)
    private LocalTime heureRdv;

    @Column(nullable = false, length = 500)
    private String motif;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private StatutEnum statut;

    @Column(length = 1000)
    private String notes;

    @Column(name = "patient_id", nullable = false)
    private Long patientId;

    @Column(name = "medecin_id", nullable = false)
    private Long medecinId;

    @Column(name = "cabinet_id")
    private Long cabinetId;

    @Column(name = "date_creation")
    private LocalDate dateCreation;

    public RendezVous() {}

    public RendezVous(Long idRendezVous, LocalDate dateRdv, LocalTime heureRdv,
                     String motif, StatutEnum statut, String notes,
                     Long patientId, Long medecinId, Long cabinetId, LocalDate dateCreation) {
        this.idRendezVous = idRendezVous;
        this.dateRdv = dateRdv;
        this.heureRdv = heureRdv;
        this.motif = motif;
        this.statut = statut;
        this.notes = notes;
        this.patientId = patientId;
        this.medecinId = medecinId;
        this.cabinetId = cabinetId;
        this.dateCreation = dateCreation;
    }

    public Long getIdRendezVous() { return idRendezVous; }
    public void setIdRendezVous(Long idRendezVous) { this.idRendezVous = idRendezVous; }

    public LocalDate getDateRdv() { return dateRdv; }
    public void setDateRdv(LocalDate dateRdv) { this.dateRdv = dateRdv; }

    public LocalTime getHeureRdv() { return heureRdv; }
    public void setHeureRdv(LocalTime heureRdv) { this.heureRdv = heureRdv; }

    public String getMotif() { return motif; }
    public void setMotif(String motif) { this.motif = motif; }

    public StatutEnum getStatut() { return statut; }
    public void setStatut(StatutEnum statut) { this.statut = statut; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public Long getPatientId() { return patientId; }
    public void setPatientId(Long patientId) { this.patientId = patientId; }

    public Long getMedecinId() { return medecinId; }
    public void setMedecinId(Long medecinId) { this.medecinId = medecinId; }

    public Long getCabinetId() { return cabinetId; }
    public void setCabinetId(Long cabinetId) { this.cabinetId = cabinetId; }

    public LocalDate getDateCreation() { return dateCreation; }
    public void setDateCreation(LocalDate dateCreation) { this.dateCreation = dateCreation; }

    @PrePersist
    protected void onCreate() {
        if (dateCreation == null) {
            dateCreation = LocalDate.now();
        }
        if (statut == null) {
            statut = StatutEnum.EN_ATTENTE;
        }
    }
}
