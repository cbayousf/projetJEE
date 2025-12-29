package com.cabinet.medical.service;

import com.cabinet.medical.dto.ConsultationDTO;
import com.cabinet.medical.dto.OrdonnanceDTO;
import com.cabinet.medical.entity.Consultation;
import com.cabinet.medical.entity.Medecin;
import com.cabinet.medical.entity.Ordonnance;
import com.cabinet.medical.entity.Patient;
import com.cabinet.medical.entity.RendezVous;
import com.cabinet.medical.enums.StatutRendezVous;
import com.cabinet.medical.repository.ConsultationRepository;
import com.cabinet.medical.repository.MedecinRepository;
import com.cabinet.medical.repository.PatientRepository;
import com.cabinet.medical.repository.RendezVousRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ConsultationService {

    @Autowired
    private ConsultationRepository consultationRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private MedecinRepository medecinRepository;

    @Autowired
    private RendezVousRepository rendezVousRepository;

    public List<ConsultationDTO> getAllConsultations() {
        return consultationRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public ConsultationDTO getConsultationById(Long id) {
        Consultation consultation = consultationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Consultation non trouvée avec l'id: " + id));
        return convertToDTO(consultation);
    }

    public List<ConsultationDTO> getConsultationsByPatient(Long patientId) {
        return consultationRepository.findByPatientIdOrderByDateConsultationDesc(patientId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<ConsultationDTO> getConsultationsByMedecin(Long medecinId) {
        return consultationRepository.findByMedecinId(medecinId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public ConsultationDTO createConsultation(ConsultationDTO dto) {
        Patient patient = patientRepository.findById(dto.getPatientId())
                .orElseThrow(() -> new RuntimeException("Patient non trouvé"));
        Medecin medecin = medecinRepository.findById(dto.getMedecinId())
                .orElseThrow(() -> new RuntimeException("Médecin non trouvé"));

        Consultation consultation = new Consultation();
        consultation.setPatient(patient);
        consultation.setMedecin(medecin);

        if (dto.getRendezVousId() != null) {
            RendezVous rdv = rendezVousRepository.findById(dto.getRendezVousId())
                    .orElseThrow(() -> new RuntimeException("Rendez-vous non trouvé"));
            consultation.setRendezVous(rdv);
            rdv.setStatut(StatutRendezVous.TERMINE);
            rendezVousRepository.save(rdv);
        }

        consultation.setDateConsultation(dto.getDateConsultation() != null ? dto.getDateConsultation() : LocalDate.now());
        consultation.setExamenClinique(dto.getExamenClinique());
        consultation.setExamenSupplementaire(dto.getExamenSupplementaire());
        consultation.setDiagnostic(dto.getDiagnostic());
        consultation.setTraitement(dto.getTraitement());
        consultation.setObservations(dto.getObservations());

        Consultation saved = consultationRepository.save(consultation);
        return convertToDTO(saved);
    }

    public ConsultationDTO updateConsultation(Long id, ConsultationDTO dto) {
        Consultation consultation = consultationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Consultation non trouvée"));

        if (dto.getExamenClinique() != null) consultation.setExamenClinique(dto.getExamenClinique());
        if (dto.getExamenSupplementaire() != null) consultation.setExamenSupplementaire(dto.getExamenSupplementaire());
        if (dto.getDiagnostic() != null) consultation.setDiagnostic(dto.getDiagnostic());
        if (dto.getTraitement() != null) consultation.setTraitement(dto.getTraitement());
        if (dto.getObservations() != null) consultation.setObservations(dto.getObservations());

        Consultation updated = consultationRepository.save(consultation);
        return convertToDTO(updated);
    }

    public void deleteConsultation(Long id) {
        if (!consultationRepository.existsById(id)) {
            throw new RuntimeException("Consultation non trouvée");
        }
        consultationRepository.deleteById(id);
    }

    private ConsultationDTO convertToDTO(Consultation consultation) {
        ConsultationDTO dto = new ConsultationDTO();
        dto.setId(consultation.getId());
        if (consultation.getRendezVous() != null) {
            dto.setRendezVousId(consultation.getRendezVous().getId());
        }
        dto.setPatientId(consultation.getPatient().getId());
        dto.setPatientNom(consultation.getPatient().getNom());
        dto.setPatientPrenom(consultation.getPatient().getPrenom());
        dto.setMedecinId(consultation.getMedecin().getId());
        dto.setMedecinNom(consultation.getMedecin().getNom());
        dto.setMedecinPrenom(consultation.getMedecin().getPrenom());
        dto.setDateConsultation(consultation.getDateConsultation());
        dto.setExamenClinique(consultation.getExamenClinique());
        dto.setExamenSupplementaire(consultation.getExamenSupplementaire());
        dto.setDiagnostic(consultation.getDiagnostic());
        dto.setTraitement(consultation.getTraitement());
        dto.setObservations(consultation.getObservations());

        dto.setOrdonnances(consultation.getOrdonnances().stream()
                .map(this::convertOrdonnanceToDTO)
                .collect(Collectors.toList()));

        return dto;
    }

    private OrdonnanceDTO convertOrdonnanceToDTO(Ordonnance ordonnance) {
        OrdonnanceDTO dto = new OrdonnanceDTO();
        dto.setId(ordonnance.getId());
        dto.setConsultationId(ordonnance.getConsultation().getId());
        dto.setDateOrdonnance(ordonnance.getDateOrdonnance());
        dto.setType(ordonnance.getType());
        dto.setContenu(ordonnance.getContenu());
        dto.setSignature(ordonnance.getSignature());
        return dto;
    }
}
