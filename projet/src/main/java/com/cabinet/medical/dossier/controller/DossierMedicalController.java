package com.cabinet.medical.dossier.controller;

import com.cabinet.medical.dossier.dto.DossierMedicalDTO;
import com.cabinet.medical.dossier.service.DossierMedicalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/dossiers")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class DossierMedicalController {

    private final DossierMedicalService dossierService;

    @GetMapping
    public ResponseEntity<List<DossierMedicalDTO>> getAllDossiers() {
        List<DossierMedicalDTO> dossiers = dossierService.getAllDossiers();
        return ResponseEntity.ok(dossiers);
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<DossierMedicalDTO>> getDossiersByPatient(@PathVariable Long patientId) {
        List<DossierMedicalDTO> dossiers = dossierService.getDossiersByPatient(patientId);
        return ResponseEntity.ok(dossiers);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DossierMedicalDTO> getDossierById(@PathVariable Long id) {
        return dossierService.getDossierById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<DossierMedicalDTO> createDossier(@RequestBody DossierMedicalDTO dossierDTO) {
        try {
            DossierMedicalDTO createdDossier = dossierService.createDossier(dossierDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdDossier);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<DossierMedicalDTO> updateDossier(@PathVariable Long id,
            @RequestBody DossierMedicalDTO dossierDTO) {
        try {
            DossierMedicalDTO updatedDossier = dossierService.updateDossier(id, dossierDTO);
            return ResponseEntity.ok(updatedDossier);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDossier(@PathVariable Long id) {
        try {
            dossierService.deleteDossier(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
