package com.cabinet.medical.facturation.service;

import com.cabinet.medical.facturation.dto.FactureDTO;
import com.cabinet.medical.facturation.dto.StatistiquesDTO;
import com.cabinet.medical.facturation.entity.Facture;
import com.cabinet.medical.facturation.entity.ModePaiementEnum;
import com.cabinet.medical.facturation.entity.StatutPaiementEnum;
import com.cabinet.medical.facturation.repository.FactureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class FactureService {

    private final FactureRepository factureRepository;

    @Autowired
    public FactureService(FactureRepository factureRepository) {
        this.factureRepository = factureRepository;
    }

    public FactureDTO createFacture(FactureDTO dto) {
        Facture facture = new Facture();
        facture.setMontant(dto.getMontant());
        facture.setModePaiement(dto.getModePaiement());
        facture.setStatut(StatutPaiementEnum.EN_ATTENTE);
        facture.setDateFacture(LocalDate.now());
        facture.setRendezVousId(dto.getRendezVousId());
        facture.setPatientId(dto.getPatientId());
        facture.setNotes(dto.getNotes());

        Facture saved = factureRepository.save(facture);
        return convertToDTO(saved);
    }

    public FactureDTO getFactureById(Long id) {
        Optional<Facture> facture = factureRepository.findById(id);
        return facture.map(this::convertToDTO).orElse(null);
    }

    public List<FactureDTO> getAllFactures() {
        List<Facture> factures = factureRepository.findAllOrderByDateDesc();
        return factures.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public List<FactureDTO> getFacturesByPatient(Long patientId) {
        List<Facture> factures = factureRepository.findByPatientId(patientId);
        return factures.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public List<FactureDTO> getFacturesByStatut(StatutPaiementEnum statut) {
        List<Facture> factures = factureRepository.findByStatut(statut);
        return factures.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public List<FactureDTO> getFacturesByDateRange(LocalDate debut, LocalDate fin) {
        List<Facture> factures = factureRepository.findByDateFactureBetween(debut, fin);
        return factures.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public FactureDTO updateFactureStatut(Long id, StatutPaiementEnum nouveauStatut) {
        Optional<Facture> factureOpt = factureRepository.findById(id);
        if (factureOpt.isPresent()) {
            Facture facture = factureOpt.get();
            facture.setStatut(nouveauStatut);
            Facture updated = factureRepository.save(facture);
            return convertToDTO(updated);
        }
        return null;
    }

    public FactureDTO updateFacture(Long id, FactureDTO dto) {
        Optional<Facture> factureOpt = factureRepository.findById(id);
        if (factureOpt.isPresent()) {
            Facture facture = factureOpt.get();
            facture.setMontant(dto.getMontant());
            facture.setModePaiement(dto.getModePaiement());
            facture.setNotes(dto.getNotes());

            Facture updated = factureRepository.save(facture);
            return convertToDTO(updated);
        }
        return null;
    }

    public void deleteFacture(Long id) {
        factureRepository.deleteById(id);
    }

    public StatistiquesDTO getStatistiques() {
        Long totalFactures = factureRepository.count();
        Long facturesPayees = factureRepository.countByStatut(StatutPaiementEnum.PAYE);
        Long facturesEnAttente = factureRepository.countByStatut(StatutPaiementEnum.EN_ATTENTE);
        
        List<Facture> allFactures = factureRepository.findAll();
        Double revenusTotal = allFactures.stream()
            .filter(f -> f.getStatut() == StatutPaiementEnum.PAYE)
            .mapToDouble(Facture::getMontant)
            .sum();
            
        Double revenusMoyens = facturesPayees > 0 ? revenusTotal / facturesPayees : 0.0;
        
        Double montantMax = allFactures.stream()
            .mapToDouble(Facture::getMontant)
            .max()
            .orElse(0.0);

        return new StatistiquesDTO(revenusTotal, revenusMoyens, facturesPayees, 
                                  facturesEnAttente, montantMax, totalFactures);
    }

    private FactureDTO convertToDTO(Facture facture) {
        FactureDTO dto = new FactureDTO();
        dto.setIdFacture(facture.getIdFacture());
        dto.setMontant(facture.getMontant());
        dto.setModePaiement(facture.getModePaiement());
        dto.setStatut(facture.getStatut());
        dto.setDateFacture(facture.getDateFacture());
        dto.setRendezVousId(facture.getRendezVousId());
        dto.setPatientId(facture.getPatientId());
        dto.setNotes(facture.getNotes());
        return dto;
    }
}