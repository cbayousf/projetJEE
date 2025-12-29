package com.cabinet.medical.entity;

import com.cabinet.medical.enums.TypeOrdonnance;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "ordonnances")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Ordonnance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "consultation_id", nullable = false)
    private Consultation consultation;

    @Column(name = "date_ordonnance", nullable = false)
    private LocalDate dateOrdonnance = LocalDate.now();

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TypeOrdonnance type;

    @Column(columnDefinition = "TEXT")
    private String contenu;

    @Column(columnDefinition = "TEXT")
    private String signature;
}
