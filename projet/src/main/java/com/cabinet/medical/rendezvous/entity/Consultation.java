package com.cabinet.medical.rendezvous.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "consultations")
public class Consultation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_consultation")
    private Long idConsultation;

    @Column(length = 100)
    private String type;

    @Column(name = "date_consultation", nullable = false)
    private LocalDate dateConsultation;

    @Column(name = "examen_clinique", length = 2000)
    private String examenClinique;

    @Column(name = "examen_supplementaire", length = 2000)
    private String examenSupplementaire;

    @Column(length = 2000)
    private String diagnostic;

    @Column(length = 2000)
    private String traitement;

    @Column(length = 2000)
    private String observations;

    @Column(name = "rendezvous_id")
    private Long rendezVousId;

    @Column(name = "patient_id", nullable = false)
    private Long patientId;

    @Column(name = "medecin_id", nullable = false)
    private Long medecinId;

    @Column(name = "dossier_medical_id")
    private Long dossierMedicalId;

    public Consultation() {}

    public Consultation(Long idConsultation, String type, LocalDate dateConsultation,
                       String examenClinique, String examenSupplementaire, String diagnostic,
                       String traitement, String observations, Long rendezVousId,
                       Long patientId, Long medecinId, Long dossierMedicalId) {
        this.idConsultation = idConsultation;
        this.type = type;
        this.dateConsultation = dateConsultation;
        this.examenClinique = examenClinique;
        this.examenSupplementaire = examenSupplementaire;
        this.diagnostic = diagnostic;
        this.traitement = traitement;
        this.observations = observations;
        this.rendezVousId = rendezVousId;
        this.patientId = patientId;
        this.medecinId = medecinId;
        this.dossierMedicalId = dossierMedicalId;
    }

    public Long getIdConsultation() { return idConsultation; }
    public void setIdConsultation(Long idConsultation) { this.idConsultation = idConsultation; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public LocalDate getDateConsultation() { return dateConsultation; }
    public void setDateConsultation(LocalDate dateConsultation) { this.dateConsultation = dateConsultation; }

    public String getExamenClinique() { return examenClinique; }
    public void setExamenClinique(String examenClinique) { this.examenClinique = examenClinique; }

    public String getExamenSupplementaire() { return examenSupplementaire; }
    public void setExamenSupplementaire(String examenSupplementaire) { this.examenSupplementaire = examenSupplementaire; }

    public String getDiagnostic() { return diagnostic; }
    public void setDiagnostic(String diagnostic) { this.diagnostic = diagnostic; }

    public String getTraitement() { return traitement; }
    public void setTraitement(String traitement) { this.traitement = traitement; }

    public String getObservations() { return observations; }
    public void setObservations(String observations) { this.observations = observations; }

    public Long getRendezVousId() { return rendezVousId; }
    public void setRendezVousId(Long rendezVousId) { this.rendezVousId = rendezVousId; }

    public Long getPatientId() { return patientId; }
    public void setPatientId(Long patientId) { this.patientId = patientId; }

    public Long getMedecinId() { return medecinId; }
    public void setMedecinId(Long medecinId) { this.medecinId = medecinId; }

    public Long getDossierMedicalId() { return dossierMedicalId; }
    public void setDossierMedicalId(Long dossierMedicalId) { this.dossierMedicalId = dossierMedicalId; }

    @PrePersist
    protected void onCreate() {
        if (dateConsultation == null) {
            dateConsultation = LocalDate.now();
        }
    }
}
