package com.cabinet.medical.rendezvous.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "ordonnances")
public class Ordonnance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_ordonnance")
    private Long idOrdonnance;

    @Column(name = "date_ordonnance", nullable = false)
    private LocalDate dateOrdonnance;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private TypeOrdonnanceEnum type;

    @ElementCollection
    @CollectionTable(name = "ordonnance_medicaments",
                    joinColumns = @JoinColumn(name = "ordonnance_id"))
    @Column(name = "medicament", length = 500)
    private List<String> medicaments = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "ordonnance_examens",
                    joinColumns = @JoinColumn(name = "ordonnance_id"))
    @Column(name = "examen", length = 500)
    private List<String> examens = new ArrayList<>();

    @Column(length = 1000)
    private String signature;

    @Column(name = "consultation_id", nullable = false)
    private Long consultationId;

    @Column(name = "patient_id", nullable = false)
    private Long patientId;

    @Column(name = "medecin_id", nullable = false)
    private Long medecinId;

    @Column(name = "nom_medecin", length = 200)
    private String nomMedecin;

    @Column(name = "specialite_medecin", length = 100)
    private String specialiteMedecin;

    public Ordonnance() {}

    public Ordonnance(Long idOrdonnance, LocalDate dateOrdonnance, TypeOrdonnanceEnum type,
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

    @PrePersist
    protected void onCreate() {
        if (dateOrdonnance == null) {
            dateOrdonnance = LocalDate.now();
        }
    }
}
