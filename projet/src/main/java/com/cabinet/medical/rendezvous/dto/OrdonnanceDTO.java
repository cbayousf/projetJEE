package com.cabinet.medical.rendezvous.dto;

import com.cabinet.medical.rendezvous.entity.TypeOrdonnanceEnum;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class OrdonnanceDTO {
    private Long idOrdonnance;
    private LocalDate dateOrdonnance;
    private TypeOrdonnanceEnum type;
    private List<String> medicaments = new ArrayList<>();
    private List<String> examens = new ArrayList<>();
    private String signature;
    private Long consultationId;
    private Long patientId;
    private Long medecinId;
    private String nomMedecin;
    private String specialiteMedecin;

    public OrdonnanceDTO() {}

    public OrdonnanceDTO(Long idOrdonnance, LocalDate dateOrdonnance, TypeOrdonnanceEnum type,
                        List<String> medicaments, List<String> examens, String signature,
                        Long consultationId, Long patientId, Long medecinId,
                        String nomMedecin, String specialiteMedecin) {
        this.idOrdonnance = idOrdonnance;
        this.dateOrdonnance = dateOrdonnance;
        this.type = type;
        this.medicaments = medicaments != null ? medicaments : new ArrayList<>();
        this.examens = examens != null ? examens : new ArrayList<>();
        this.signature = signature;
        this.consultationId = consultationId;
        this.patientId = patientId;
        this.medecinId = medecinId;
        this.nomMedecin = nomMedecin;
        this.specialiteMedecin = specialiteMedecin;
    }

    public Long getIdOrdonnance() { return idOrdonnance; }
    public void setIdOrdonnance(Long idOrdonnance) { this.idOrdonnance = idOrdonnance; }

    public LocalDate getDateOrdonnance() { return dateOrdonnance; }
    public void setDateOrdonnance(LocalDate dateOrdonnance) { this.dateOrdonnance = dateOrdonnance; }

    public TypeOrdonnanceEnum getType() { return type; }
    public void setType(TypeOrdonnanceEnum type) { this.type = type; }

    public List<String> getMedicaments() { return medicaments; }
    public void setMedicaments(List<String> medicaments) { this.medicaments = medicaments; }

    public List<String> getExamens() { return examens; }
    public void setExamens(List<String> examens) { this.examens = examens; }

    public String getSignature() { return signature; }
    public void setSignature(String signature) { this.signature = signature; }

    public Long getConsultationId() { return consultationId; }
    public void setConsultationId(Long consultationId) { this.consultationId = consultationId; }

    public Long getPatientId() { return patientId; }
    public void setPatientId(Long patientId) { this.patientId = patientId; }

    public Long getMedecinId() { return medecinId; }
    public void setMedecinId(Long medecinId) { this.medecinId = medecinId; }

    public String getNomMedecin() { return nomMedecin; }
    public void setNomMedecin(String nomMedecin) { this.nomMedecin = nomMedecin; }

    public String getSpecialiteMedecin() { return specialiteMedecin; }
    public void setSpecialiteMedecin(String specialiteMedecin) { this.specialiteMedecin = specialiteMedecin; }
}
