package com.cabinet.medical.rendezvous.service;

import com.cabinet.medical.rendezvous.dto.OrdonnanceDTO;
import com.cabinet.medical.rendezvous.entity.Ordonnance;
import com.cabinet.medical.rendezvous.entity.TypeOrdonnanceEnum;
import com.cabinet.medical.rendezvous.repository.OrdonnanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class OrdonnanceService {

    private final OrdonnanceRepository ordonnanceRepository;

    @Autowired
    public OrdonnanceService(OrdonnanceRepository ordonnanceRepository) {
        this.ordonnanceRepository = ordonnanceRepository;
    }

    public OrdonnanceDTO createOrdonnance(OrdonnanceDTO dto) {
        Ordonnance ordonnance = new Ordonnance();
        ordonnance.setDateOrdonnance(LocalDate.now());
        ordonnance.setType(dto.getType());
        ordonnance.setMedicaments(dto.getMedicaments());
        ordonnance.setExamens(dto.getExamens());
        ordonnance.setSignature(dto.getSignature());
        ordonnance.setConsultationId(dto.getConsultationId());
        ordonnance.setPatientId(dto.getPatientId());
        ordonnance.setMedecinId(dto.getMedecinId());
        ordonnance.setNomMedecin(dto.getNomMedecin());
        ordonnance.setSpecialiteMedecin(dto.getSpecialiteMedecin());

        Ordonnance saved = ordonnanceRepository.save(ordonnance);
        return convertToDTO(saved);
    }

    public OrdonnanceDTO getOrdonnanceById(Long id) {
        Optional<Ordonnance> ordonnance = ordonnanceRepository.findById(id);
        return ordonnance.map(this::convertToDTO).orElse(null);
    }

    public List<OrdonnanceDTO> getAllOrdonnances() {
        List<Ordonnance> ordonnances = ordonnanceRepository.findAllOrderByDateDesc();
        return ordonnances.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public List<OrdonnanceDTO> getOrdonnancesByPatient(Long patientId) {
        List<Ordonnance> ordonnances = ordonnanceRepository.findByPatientIdOrderByDateOrdonnanceDesc(patientId);
        return ordonnances.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public List<OrdonnanceDTO> getOrdonnancesByMedecin(Long medecinId) {
        List<Ordonnance> ordonnances = ordonnanceRepository.findOrdonnancesByMedecinOrderByDateDesc(medecinId);
        return ordonnances.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public OrdonnanceDTO getOrdonnanceByConsultation(Long consultationId) {
        Optional<Ordonnance> ordonnance = ordonnanceRepository.findByConsultationId(consultationId);
        return ordonnance.map(this::convertToDTO).orElse(null);
    }

    public List<OrdonnanceDTO> getOrdonnancesByType(TypeOrdonnanceEnum type) {
        List<Ordonnance> ordonnances = ordonnanceRepository.findByType(type);
        return ordonnances.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public List<OrdonnanceDTO> getOrdonnancesByDateRange(LocalDate debut, LocalDate fin) {
        List<Ordonnance> ordonnances = ordonnanceRepository.findByDateOrdonnanceBetween(debut, fin);
        return ordonnances.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public OrdonnanceDTO updateOrdonnance(Long id, OrdonnanceDTO dto) {
        Optional<Ordonnance> ordonnanceOpt = ordonnanceRepository.findById(id);
        if (ordonnanceOpt.isPresent()) {
            Ordonnance ordonnance = ordonnanceOpt.get();
            ordonnance.setType(dto.getType());
            ordonnance.setMedicaments(dto.getMedicaments());
            ordonnance.setExamens(dto.getExamens());
            ordonnance.setSignature(dto.getSignature());

            Ordonnance updated = ordonnanceRepository.save(ordonnance);
            return convertToDTO(updated);
        }
        return null;
    }

    public void deleteOrdonnance(Long id) {
        ordonnanceRepository.deleteById(id);
    }

    private OrdonnanceDTO convertToDTO(Ordonnance ordonnance) {
        OrdonnanceDTO dto = new OrdonnanceDTO();
        dto.setIdOrdonnance(ordonnance.getIdOrdonnance());
        dto.setDateOrdonnance(ordonnance.getDateOrdonnance());
        dto.setType(ordonnance.getType());
        dto.setMedicaments(ordonnance.getMedicaments());
        dto.setExamens(ordonnance.getExamens());
        dto.setSignature(ordonnance.getSignature());
        dto.setConsultationId(ordonnance.getConsultationId());
        dto.setPatientId(ordonnance.getPatientId());
        dto.setMedecinId(ordonnance.getMedecinId());
        dto.setNomMedecin(ordonnance.getNomMedecin());
        dto.setSpecialiteMedecin(ordonnance.getSpecialiteMedecin());
        return dto;
    }
}
