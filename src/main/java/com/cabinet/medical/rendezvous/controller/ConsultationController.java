package com.cabinet.medical.rendezvous.controller;

import com.cabinet.medical.rendezvous.dto.ConsultationDTO;
import com.cabinet.medical.rendezvous.service.ConsultationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/consultations")
@CrossOrigin(origins = "http://localhost:3000")
public class ConsultationController {

    private final ConsultationService consultationService;

    @Autowired
    public ConsultationController(ConsultationService consultationService) {
        this.consultationService = consultationService;
    }

    @PostMapping
    public ResponseEntity<ConsultationDTO> createConsultation(@RequestBody ConsultationDTO dto) {
        ConsultationDTO created = consultationService.createConsultation(dto);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ConsultationDTO> getConsultation(@PathVariable Long id) {
        ConsultationDTO dto = consultationService.getConsultationById(id);
        return dto != null ? ResponseEntity.ok(dto) : ResponseEntity.notFound().build();
    }

    @GetMapping
    public ResponseEntity<List<ConsultationDTO>> getAllConsultations() {
        List<ConsultationDTO> consultations = consultationService.getAllConsultations();
        return ResponseEntity.ok(consultations);
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<ConsultationDTO>> getConsultationsByPatient(@PathVariable Long patientId) {
        List<ConsultationDTO> consultations = consultationService.getConsultationsByPatient(patientId);
        return ResponseEntity.ok(consultations);
    }

    @GetMapping("/medecin/{medecinId}")
    public ResponseEntity<List<ConsultationDTO>> getConsultationsByMedecin(@PathVariable Long medecinId) {
        List<ConsultationDTO> consultations = consultationService.getConsultationsByMedecin(medecinId);
        return ResponseEntity.ok(consultations);
    }

    @GetMapping("/rendezvous/{rendezVousId}")
    public ResponseEntity<ConsultationDTO> getConsultationByRendezVous(@PathVariable Long rendezVousId) {
        ConsultationDTO dto = consultationService.getConsultationByRendezVous(rendezVousId);
        return dto != null ? ResponseEntity.ok(dto) : ResponseEntity.notFound().build();
    }

    @GetMapping("/periode")
    public ResponseEntity<List<ConsultationDTO>> getConsultationsByPeriode(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate debut,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fin) {
        List<ConsultationDTO> consultations = consultationService.getConsultationsByDateRange(debut, fin);
        return ResponseEntity.ok(consultations);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ConsultationDTO> updateConsultation(@PathVariable Long id,
                                                             @RequestBody ConsultationDTO dto) {
        ConsultationDTO updated = consultationService.updateConsultation(id, dto);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteConsultation(@PathVariable Long id) {
        consultationService.deleteConsultation(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/medecin/{medecinId}/count")
    public ResponseEntity<Long> countConsultationsByMedecinAndPeriode(
            @PathVariable Long medecinId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate debut,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fin) {
        Long count = consultationService.countConsultationsByMedecinAndPeriode(medecinId, debut, fin);
        return ResponseEntity.ok(count);
    }
}
