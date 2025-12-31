package com.cabinet.medical.admin.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "cabinets")
public class Cabinet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String logo;

    @Column(nullable = false)
    private String nom;

    private String adresse;
    private String tel;

    @Column(name = "service_actif")
    private Boolean serviceActif = true;

    @ManyToOne
    @JoinColumn(name = "specialite_id")
    private Specialite specialite;
}
