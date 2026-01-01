package com.cabinet.medical.document.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "documents")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Document {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nomFichier;

    private String typeFichier;

    @Column(nullable = false)
    private String cheminFichier;

    private Long tailleFichier;

    @Column(length = 500)
    private String description;

    @Column(nullable = false)
    private Long patientId;

    private Long dossierId;

    private String uploadePar;

    @Column(nullable = false)
    private LocalDateTime dateUpload;
}