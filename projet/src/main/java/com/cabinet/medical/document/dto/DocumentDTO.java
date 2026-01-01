package com.cabinet.medical.document.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DocumentDTO {
    private Long id;
    private String nomFichier;
    private String typeFichier;
    private Long tailleFichier;
    private String description;
    private Long patientId;
    private Long dossierId;
    private String uploadePar;
    private LocalDateTime dateUpload;
}