package com.cabinet.medical.patient.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PatientStatsDTO {
    private Long totalPatients;
    private Long nouveauxPatientsMois;
    private Long patientsHommes;
    private Long patientsFemmes;
}