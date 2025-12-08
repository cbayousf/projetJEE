package com.cabinet.medical.dto;

import com.cabinet.medical.enums.StatutRendezVous;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RendezVousDTO {
    private Long id;
    private Long patientId;
    private String patientNom;
    private String patientPrenom;
    private Long medecinId;
    private String medecinNom;
    private String medecinPrenom;
    private LocalDate dateRdv;
    private LocalTime heureRdv;
    private String motif;
    private StatutRendezVous statut;
    private String notes;
}
