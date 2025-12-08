package com.cabinet.medical.dto;

import com.cabinet.medical.enums.TypeOrdonnance;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrdonnanceDTO {
    private Long id;
    private Long consultationId;
    private LocalDate dateOrdonnance;
    private TypeOrdonnance type;
    private String contenu;
    private String signature;
}
