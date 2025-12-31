package com.cabinet.medical.facturation.dto;

public class StatistiquesDTO {
    private Double revenusMensuel;
    private Double revenusAnnuel;
    private Long nombreFacturesPayees;
    private Long nombreFacturesEnAttente;
    private Double montantEnAttente;
    private Long totalFactures;
    
    // Constructeurs
    public StatistiquesDTO() {}
    
    public StatistiquesDTO(Double revenusMensuel, Double revenusAnnuel,
                          Long nombreFacturesPayees, Long nombreFacturesEnAttente,
                          Double montantEnAttente, Long totalFactures) {
        this.revenusMensuel = revenusMensuel;
        this.revenusAnnuel = revenusAnnuel;
        this.nombreFacturesPayees = nombreFacturesPayees;
        this.nombreFacturesEnAttente = nombreFacturesEnAttente;
        this.montantEnAttente = montantEnAttente;
        this.totalFactures = totalFactures;
    }
    
    // Getters et Setters
    public Double getRevenusMensuel() { return revenusMensuel; }
    public void setRevenusMensuel(Double revenusMensuel) { this.revenusMensuel = revenusMensuel; }
    
    public Double getRevenusAnnuel() { return revenusAnnuel; }
    public void setRevenusAnnuel(Double revenusAnnuel) { this.revenusAnnuel = revenusAnnuel; }
    
    public Long getNombreFacturesPayees() { return nombreFacturesPayees; }
    public void setNombreFacturesPayees(Long nombreFacturesPayees) { 
        this.nombreFacturesPayees = nombreFacturesPayees; 
    }
    
    public Long getNombreFacturesEnAttente() { return nombreFacturesEnAttente; }
    public void setNombreFacturesEnAttente(Long nombreFacturesEnAttente) { 
        this.nombreFacturesEnAttente = nombreFacturesEnAttente; 
    }
    
    public Double getMontantEnAttente() { return montantEnAttente; }
    public void setMontantEnAttente(Double montantEnAttente) { 
        this.montantEnAttente = montantEnAttente; 
    }
    
    public Long getTotalFactures() { return totalFactures; }
    public void setTotalFactures(Long totalFactures) { 
        this.totalFactures = totalFactures; 
    }
}