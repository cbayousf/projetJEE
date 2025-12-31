package com.cabinet.medical.rendezvous.dto;

import java.time.LocalDate;

public class ConsultationDTO {
    private Long idConsultation;
    private String type;
    private LocalDate dateConsultation;
    private String examenClinique;
    private String examenSupplementaire;
    private String diagnostic;
    private String traitement;
    private String observations;
    private Long rendezVousId;
    private Long patientId;
    private Long medecinId;
    private Long dossierMedicalId;

    public ConsultationDTO() {}

    public ConsultationDTO(Long idConsultation, String type, LocalDate dateConsultation,
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
}
