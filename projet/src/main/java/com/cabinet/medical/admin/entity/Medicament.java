package com.cabinet.medical.admin.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "medicaments")
public class Medicament {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nom;

    private String dosage;
    private String forme;

    @Column(columnDefinition = "TEXT")
    private String indication;
    
    // Getters et Setters explicites
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }
    
    public String getDosage() { return dosage; }
    public void setDosage(String dosage) { this.dosage = dosage; }
    
    public String getForme() { return forme; }
    public void setForme(String forme) { this.forme = forme; }
    
    public String getIndication() { return indication; }
    public void setIndication(String indication) { this.indication = indication; }
}