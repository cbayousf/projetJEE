package com.cabinet.medical.service;

import com.cabinet.medical.entity.Patient;
import com.cabinet.medical.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    public Patient getPatientById(Long id) {
        return patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient non trouvé avec l'id: " + id));
    }

    public Patient createPatient(Patient patient) {
        return patientRepository.save(patient);
    }

    public Patient updatePatient(Long id, Patient patientDetails) {
        Patient patient = getPatientById(id);
        patient.setCin(patientDetails.getCin());
        patient.setNom(patientDetails.getNom());
        patient.setPrenom(patientDetails.getPrenom());
        patient.setDateNaissance(patientDetails.getDateNaissance());
        patient.setSexe(patientDetails.getSexe());
        patient.setNumTel(patientDetails.getNumTel());
        patient.setEmail(patientDetails.getEmail());
        patient.setAdresse(patientDetails.getAdresse());
        patient.setTypeMutuelle(patientDetails.getTypeMutuelle());
        return patientRepository.save(patient);
    }

    public void deletePatient(Long id) {
        if (!patientRepository.existsById(id)) {
            throw new RuntimeException("Patient non trouvé");
        }
        patientRepository.deleteById(id);
    }

    public List<Patient> searchPatients(String searchTerm) {
        return patientRepository.findByNomContainingIgnoreCaseOrPrenomContainingIgnoreCase(searchTerm, searchTerm);
    }
}
