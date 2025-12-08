package com.cabinet.medical.facturation.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "factures")
public class Facture {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_facture")
    private Long idFacture;
    
    @Column(nullable = false)
    
    private Double montant;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "mode_paiement", nullable = false, length = 50)
    private ModePaiementEnum modePaiement;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private StatutPaiementEnum statut;
    
    @Column(name = "date_facture", nullable = false)
    private LocalDate dateFacture;
    
    @Column(name = "rendezvous_id")
    private Long rendezVousId;
    
    @Column(name = "patient_id")
    private Long patientId;
    
    @Column(length = 500)
    private String notes;
    
    // Constructeurs
    public Facture() {}
    
    public Facture(Long idFacture, Double montant, ModePaiementEnum modePaiement, 
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
    
    @PrePersist
    protected void onCreate() {
        if (dateFacture == null) {
            dateFacture = LocalDate.now();
        }
        if (statut == null) {
            statut = StatutPaiementEnum.EN_ATTENTE;
        }
    }
}