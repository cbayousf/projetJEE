package com.cabinet.medical.facturation.dto;

import com.cabinet.medical.facturation.entity.ModePaiementEnum;
import com.cabinet.medical.facturation.entity.StatutPaiementEnum;
import java.time.LocalDate;

public class FactureDTO {
    private Long idFacture;
    private Double montant;
    private ModePaiementEnum modePaiement;
    private StatutPaiementEnum statut;
    private LocalDate dateFacture;
    private Long rendezVousId;
    private Long patientId;
    private String notes;
    
    // Constructeurs
    public FactureDTO() {}
    
    public FactureDTO(Long idFacture, Double montant, ModePaiementEnum modePaiement,
                     StatutPaiementEnum statut, LocalDate dateFacture,
                     Long rendezVousId, Long patientId, String notes) {
        this.idFacture = idFacture;
        this.montant = montant;
        this.modePaiement = modePaiement;
        this.statut = statut;
        this.dateFacture = dateFacture;
        this.rendezVousId = rendezVousId;
        this.patientId = patientId;
        this.notes = notes;
    }
    
    // Getters et Setters
    public Long getIdFacture() { return idFacture; }
    public void setIdFacture(Long idFacture) { this.idFacture = idFacture; }
    
    public Double getMontant() { return montant; }
    public void setMontant(Double montant) { this.montant = montant; }
    
    public ModePaiementEnum getModePaiement() { return modePaiement; }
    public void setModePaiement(ModePaiementEnum modePaiement) { this.modePaiement = modePaiement; }
    
    public StatutPaiementEnum getStatut() { return statut; }
    public void setStatut(StatutPaiementEnum statut) { this.statut = statut; }
    
    public LocalDate getDateFacture() { return dateFacture; }
    public void setDateFacture(LocalDate dateFacture) { this.dateFacture = dateFacture; }
    
    public Long getRendezVousId() { return rendezVousId; }
    public void setRendezVousId(Long rendezVousId) { this.rendezVousId = rendezVousId; }
    
    public Long getPatientId() { return patientId; }
    public void setPatientId(Long patientId) { this.patientId = patientId; }
    
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}