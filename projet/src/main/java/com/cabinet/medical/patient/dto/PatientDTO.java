package com.cabinet.medical.patient.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PatientDTO {
    private Long id;
    private String cin;
    private String nom;
    private String prenom;
    private LocalDate dateNaissance;
    private String sexe;
    private String numTel;
    private String email;
    private String adresse;
    private String typeMutuelle;
    private LocalDateTime dateCreation;
    private LocalDateTime dateModification;
}
