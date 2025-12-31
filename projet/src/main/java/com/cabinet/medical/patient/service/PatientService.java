package com.cabinet.medical.patient.service;

import com.cabinet.medical.patient.dto.PatientDTO;
import com.cabinet.medical.patient.entity.Patient;
import com.cabinet.medical.patient.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class PatientService {

    private final PatientRepository patientRepository;

    public List<PatientDTO> getAllPatients() {
        return patientRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public Optional<PatientDTO> getPatientById(Long id) {
        return patientRepository.findById(id).map(this::convertToDTO);
    }

    public Optional<PatientDTO> getPatientByCin(String cin) {
        return patientRepository.findByCin(cin).map(this::convertToDTO);
    }

    public PatientDTO createPatient(PatientDTO dto) {
        if (patientRepository.existsByCin(dto.getCin())) {
            throw new RuntimeException("Patient avec ce CIN existe déjà");
        }
        Patient patient = convertToEntity(dto);
        Patient saved = patientRepository.save(patient);
        return convertToDTO(saved);
    }

    public PatientDTO updatePatient(Long id, PatientDTO dto) {
        Optional<Patient> existing = patientRepository.findById(id);
        if (existing.isPresent()) {
            Patient patient = existing.get();
            updateEntityFromDTO(patient, dto);
            Patient saved = patientRepository.save(patient);
            return convertToDTO(saved);
        }
        throw new RuntimeException("Patient non trouvé");
    }

    public void deletePatient(Long id) {
        patientRepository.deleteById(id);
    }

    private PatientDTO convertToDTO(Patient entity) {
        return PatientDTO.builder()
                .id(entity.getId())
                .cin(entity.getCin())
                .nom(entity.getNom())
                .prenom(entity.getPrenom())
                .dateNaissance(entity.getDateNaissance())
                .sexe(entity.getSexe())
                .numTel(entity.getNumTel())
                .email(entity.getEmail())
                .adresse(entity.getAdresse())
                .typeMutuelle(entity.getTypeMutuelle())
                .dateCreation(entity.getDateCreation())
                .dateModification(entity.getDateModification())
                .build();
    }

    private Patient convertToEntity(PatientDTO dto) {
        return Patient.builder()
                .cin(dto.getCin())
                .nom(dto.getNom())
                .prenom(dto.getPrenom())
                .dateNaissance(dto.getDateNaissance())
                .sexe(dto.getSexe())
                .numTel(dto.getNumTel())
                .email(dto.getEmail())
                .adresse(dto.getAdresse())
                .typeMutuelle(dto.getTypeMutuelle())
                .build();
    }

    private void updateEntityFromDTO(Patient entity, PatientDTO dto) {
        if (dto.getNom() != null)
            entity.setNom(dto.getNom());
        if (dto.getPrenom() != null)
            entity.setPrenom(dto.getPrenom());
        if (dto.getDateNaissance() != null)
            entity.setDateNaissance(dto.getDateNaissance());
        if (dto.getSexe() != null)
            entity.setSexe(dto.getSexe());
        if (dto.getNumTel() != null)
            entity.setNumTel(dto.getNumTel());
        if (dto.getEmail() != null)
            entity.setEmail(dto.getEmail());
        if (dto.getAdresse() != null)
            entity.setAdresse(dto.getAdresse());
        if (dto.getTypeMutuelle() != null)
            entity.setTypeMutuelle(dto.getTypeMutuelle());
    }
}
