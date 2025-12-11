package com.cabinet.medical.rendezvous.service;

import com.cabinet.medical.rendezvous.dto.ConsultationDTO;
import com.cabinet.medical.rendezvous.entity.Consultation;
import com.cabinet.medical.rendezvous.repository.ConsultationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class ConsultationService {

    private final ConsultationRepository consultationRepository;

    @Autowired
    public ConsultationService(ConsultationRepository consultationRepository) {
        this.consultationRepository = consultationRepository;
    }

    public ConsultationDTO createConsultation(ConsultationDTO dto) {
        Consultation consultation = new Consultation();
        consultation.setType(dto.getType());
        consultation.setDateConsultation(LocalDate.now());
        consultation.setExamenClinique(dto.getExamenClinique());
        consultation.setExamenSupplementaire(dto.getExamenSupplementaire());
        consultation.setDiagnostic(dto.getDiagnostic());
        consultation.setTraitement(dto.getTraitement());
        consultation.setObservations(dto.getObservations());
        consultation.setRendezVousId(dto.getRendezVousId());
        consultation.setPatientId(dto.getPatientId());
        consultation.setMedecinId(dto.getMedecinId());
        consultation.setDossierMedicalId(dto.getDossierMedicalId());

        Consultation saved = consultationRepository.save(consultation);
        return convertToDTO(saved);
    }

    public ConsultationDTO getConsultationById(Long id) {
        Optional<Consultation> consultation = consultationRepository.findById(id);
        return consultation.map(this::convertToDTO).orElse(null);
    }

    public List<ConsultationDTO> getAllConsultations() {
        List<Consultation> consultations = consultationRepository.findAllOrderByDateDesc();
        return consultations.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public List<ConsultationDTO> getConsultationsByPatient(Long patientId) {
        List<Consultation> consultations = consultationRepository.findByPatientIdOrderByDateConsultationDesc(patientId);
        return consultations.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public List<ConsultationDTO> getConsultationsByMedecin(Long medecinId) {
        List<Consultation> consultations = consultationRepository.findConsultationsByMedecinOrderByDateDesc(medecinId);
        return consultations.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public ConsultationDTO getConsultationByRendezVous(Long rendezVousId) {
        Optional<Consultation> consultation = consultationRepository.findByRendezVousId(rendezVousId);
        return consultation.map(this::convertToDTO).orElse(null);
    }

    public List<ConsultationDTO> getConsultationsByDateRange(LocalDate debut, LocalDate fin) {
        List<Consultation> consultations = consultationRepository.findByDateConsultationBetween(debut, fin);
        return consultations.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public ConsultationDTO updateConsultation(Long id, ConsultationDTO dto) {
        Optional<Consultation> consultationOpt = consultationRepository.findById(id);
        if (consultationOpt.isPresent()) {
            Consultation consultation = consultationOpt.get();
            consultation.setType(dto.getType());
            consultation.setExamenClinique(dto.getExamenClinique());
            consultation.setExamenSupplementaire(dto.getExamenSupplementaire());
            consultation.setDiagnostic(dto.getDiagnostic());
            consultation.setTraitement(dto.getTraitement());
            consultation.setObservations(dto.getObservations());

            Consultation updated = consultationRepository.save(consultation);
            return convertToDTO(updated);
        }
        return null;
    }

    public void deleteConsultation(Long id) {
        consultationRepository.deleteById(id);
    }

    public Long countConsultationsByMedecinAndPeriode(Long medecinId, LocalDate debut, LocalDate fin) {
        return consultationRepository.countByMedecinAndPeriode(medecinId, debut, fin);
    }

    private ConsultationDTO convertToDTO(Consultation consultation) {
        ConsultationDTO dto = new ConsultationDTO();
        dto.setIdConsultation(consultation.getIdConsultation());
        dto.setType(consultation.getType());
        dto.setDateConsultation(consultation.getDateConsultation());
        dto.setExamenClinique(consultation.getExamenClinique());
        dto.setExamenSupplementaire(consultation.getExamenSupplementaire());
        dto.setDiagnostic(consultation.getDiagnostic());
        dto.setTraitement(consultation.getTraitement());
        dto.setObservations(consultation.getObservations());
        dto.setRendezVousId(consultation.getRendezVousId());
        dto.setPatientId(consultation.getPatientId());
        dto.setMedecinId(consultation.getMedecinId());
        dto.setDossierMedicalId(consultation.getDossierMedicalId());
        return dto;
    }
}
