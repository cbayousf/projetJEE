package com.cabinet.medical.dossier.service;

import com.cabinet.medical.dossier.dto.DossierMedicalDTO;
import com.cabinet.medical.dossier.entity.DossierMedical;
import com.cabinet.medical.dossier.repository.DossierMedicalRepository;
import com.cabinet.medical.patient.entity.Patient;
import com.cabinet.medical.patient.repository.PatientRepository;
import com.cabinet.medical.admin.entity.Utilisateur;
import com.cabinet.medical.admin.repository.UtilisateurRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class DossierMedicalService {

    private final DossierMedicalRepository dossierRepository;
    private final PatientRepository patientRepository;
    private final UtilisateurRepository utilisateurRepository;

    public List<DossierMedicalDTO> getAllDossiers() {
        return dossierRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<DossierMedicalDTO> getDossiersByPatient(Long patientId) {
        return dossierRepository.findByPatientId(patientId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public Optional<DossierMedicalDTO> getDossierById(Long id) {
        return dossierRepository.findById(id).map(this::convertToDTO);
    }

    public DossierMedicalDTO createDossier(DossierMedicalDTO dto) {
        DossierMedical dossier = convertToEntity(dto);
        DossierMedical saved = dossierRepository.save(dossier);
        return convertToDTO(saved);
    }

    public DossierMedicalDTO updateDossier(Long id, DossierMedicalDTO dto) {
        Optional<DossierMedical> existing = dossierRepository.findById(id);
        if (existing.isPresent()) {
            DossierMedical dossier = existing.get();
            updateEntityFromDTO(dossier, dto);
            DossierMedical saved = dossierRepository.save(dossier);
            return convertToDTO(saved);
        }
        throw new RuntimeException("Dossier médical non trouvé");
    }

    public void deleteDossier(Long id) {
        dossierRepository.deleteById(id);
    }

    private DossierMedicalDTO convertToDTO(DossierMedical entity) {
        return DossierMedicalDTO.builder()
                .id(entity.getId())
                .patientId(entity.getPatient().getId())
                .patientNom(entity.getPatient().getNom())
                .patientPrenom(entity.getPatient().getPrenom())
                .medecinId(entity.getMedecin() != null ? entity.getMedecin().getId() : null)
                .medecinNom(entity.getMedecin() != null ? entity.getMedecin().getNom() : null)
                .medecinPrenom(entity.getMedecin() != null ? entity.getMedecin().getPrenom() : null)
                .diagnostic(entity.getDiagnostic())
                .traitement(entity.getTraitement())
                .observations(entity.getObservations())
                .dateCreation(entity.getDateCreation())
                .dateModification(entity.getDateModification())
                .build();
    }

    private DossierMedical convertToEntity(DossierMedicalDTO dto) {
        Patient patient = patientRepository.findById(dto.getPatientId())
                .orElseThrow(() -> new RuntimeException("Patient non trouvé"));

        Utilisateur medecin = null;
        if (dto.getMedecinId() != null) {
            medecin = utilisateurRepository.findById(dto.getMedecinId())
                    .orElseThrow(() -> new RuntimeException("Médecin non trouvé"));
        }

        return DossierMedical.builder()
                .patient(patient)
                .medecin(medecin)
                .diagnostic(dto.getDiagnostic())
                .traitement(dto.getTraitement())
                .observations(dto.getObservations())
                .build();
    }

    private void updateEntityFromDTO(DossierMedical entity, DossierMedicalDTO dto) {
        if (dto.getDiagnostic() != null)
            entity.setDiagnostic(dto.getDiagnostic());
        if (dto.getTraitement() != null)
            entity.setTraitement(dto.getTraitement());
        if (dto.getObservations() != null)
            entity.setObservations(dto.getObservations());
    }
}
