package com.cabinet.medical.service;

import com.cabinet.medical.dto.RendezVousDTO;
import com.cabinet.medical.entity.Medecin;
import com.cabinet.medical.entity.Patient;
import com.cabinet.medical.entity.RendezVous;
import com.cabinet.medical.enums.StatutRendezVous;
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
public class RendezVousService {

    @Autowired
    private RendezVousRepository rendezVousRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private MedecinRepository medecinRepository;

    public List<RendezVousDTO> getAllRendezVous() {
        return rendezVousRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public RendezVousDTO getRendezVousById(Long id) {
        RendezVous rdv = rendezVousRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Rendez-vous non trouvé avec l'id: " + id));
        return convertToDTO(rdv);
    }

    public List<RendezVousDTO> getRendezVousByPatient(Long patientId) {
        return rendezVousRepository.findByPatientId(patientId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<RendezVousDTO> getRendezVousByMedecin(Long medecinId) {
        return rendezVousRepository.findByMedecinId(medecinId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<RendezVousDTO> getRendezVousByDate(LocalDate date) {
        return rendezVousRepository.findByDateRdv(date).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<RendezVousDTO> getRendezVousByDateRange(LocalDate startDate, LocalDate endDate) {
        return rendezVousRepository.findByDateRdvBetween(startDate, endDate).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public RendezVousDTO createRendezVous(RendezVousDTO dto) {
        Patient patient = patientRepository.findById(dto.getPatientId())
                .orElseThrow(() -> new RuntimeException("Patient non trouvé"));
        Medecin medecin = medecinRepository.findById(dto.getMedecinId())
                .orElseThrow(() -> new RuntimeException("Médecin non trouvé"));

        RendezVous rdv = new RendezVous();
        rdv.setPatient(patient);
        rdv.setMedecin(medecin);
        rdv.setDateRdv(dto.getDateRdv());
        rdv.setHeureRdv(dto.getHeureRdv());
        rdv.setMotif(dto.getMotif());
        rdv.setStatut(StatutRendezVous.EN_ATTENTE);
        rdv.setNotes(dto.getNotes());
        rdv.setDateCreation(LocalDate.now());

        RendezVous saved = rendezVousRepository.save(rdv);
        return convertToDTO(saved);
    }

    public RendezVousDTO updateRendezVous(Long id, RendezVousDTO dto) {
        RendezVous rdv = rendezVousRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Rendez-vous non trouvé"));

        if (dto.getPatientId() != null) {
            Patient patient = patientRepository.findById(dto.getPatientId())
                    .orElseThrow(() -> new RuntimeException("Patient non trouvé"));
            rdv.setPatient(patient);
        }

        if (dto.getMedecinId() != null) {
            Medecin medecin = medecinRepository.findById(dto.getMedecinId())
                    .orElseThrow(() -> new RuntimeException("Médecin non trouvé"));
            rdv.setMedecin(medecin);
        }

        if (dto.getDateRdv() != null) rdv.setDateRdv(dto.getDateRdv());
        if (dto.getHeureRdv() != null) rdv.setHeureRdv(dto.getHeureRdv());
        if (dto.getMotif() != null) rdv.setMotif(dto.getMotif());
        if (dto.getStatut() != null) rdv.setStatut(dto.getStatut());
        if (dto.getNotes() != null) rdv.setNotes(dto.getNotes());

        RendezVous updated = rendezVousRepository.save(rdv);
        return convertToDTO(updated);
    }

    public void deleteRendezVous(Long id) {
        if (!rendezVousRepository.existsById(id)) {
            throw new RuntimeException("Rendez-vous non trouvé");
        }
        rendezVousRepository.deleteById(id);
    }

    public RendezVousDTO confirmerRendezVous(Long id) {
        RendezVous rdv = rendezVousRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Rendez-vous non trouvé"));
        rdv.setStatut(StatutRendezVous.CONFIRME);
        RendezVous updated = rendezVousRepository.save(rdv);
        return convertToDTO(updated);
    }

    public RendezVousDTO annulerRendezVous(Long id) {
        RendezVous rdv = rendezVousRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Rendez-vous non trouvé"));
        rdv.setStatut(StatutRendezVous.ANNULE);
        RendezVous updated = rendezVousRepository.save(rdv);
        return convertToDTO(updated);
    }

    private RendezVousDTO convertToDTO(RendezVous rdv) {
        RendezVousDTO dto = new RendezVousDTO();
        dto.setId(rdv.getId());
        dto.setPatientId(rdv.getPatient().getId());
        dto.setPatientNom(rdv.getPatient().getNom());
        dto.setPatientPrenom(rdv.getPatient().getPrenom());
        dto.setMedecinId(rdv.getMedecin().getId());
        dto.setMedecinNom(rdv.getMedecin().getNom());
        dto.setMedecinPrenom(rdv.getMedecin().getPrenom());
        dto.setDateRdv(rdv.getDateRdv());
        dto.setHeureRdv(rdv.getHeureRdv());
        dto.setMotif(rdv.getMotif());
        dto.setStatut(rdv.getStatut());
        dto.setNotes(rdv.getNotes());
        return dto;
    }
}
