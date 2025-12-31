package com.cabinet.medical.rendezvous.dto;

import com.cabinet.medical.rendezvous.entity.StatutEnum;
import java.time.LocalDate;
import java.time.LocalTime;

public class RendezVousDTO {
    private Long idRendezVous;
    private LocalDate dateRdv;
    private LocalTime heureRdv;
    private String motif;
    private StatutEnum statut;
    private String notes;
    private Long patientId;
    private Long medecinId;
    private Long cabinetId;
    private LocalDate dateCreation;

    public RendezVousDTO() {}

    public RendezVousDTO(Long idRendezVous, LocalDate dateRdv, LocalTime heureRdv,
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
}
