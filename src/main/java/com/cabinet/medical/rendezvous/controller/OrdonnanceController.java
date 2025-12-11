package com.cabinet.medical.rendezvous.controller;

import com.cabinet.medical.rendezvous.dto.OrdonnanceDTO;
import com.cabinet.medical.rendezvous.entity.TypeOrdonnanceEnum;
import com.cabinet.medical.rendezvous.service.OrdonnanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/ordonnances")
@CrossOrigin(origins = "http://localhost:3000")
public class OrdonnanceController {

    private final OrdonnanceService ordonnanceService;

    @Autowired
    public OrdonnanceController(OrdonnanceService ordonnanceService) {
        this.ordonnanceService = ordonnanceService;
    }

    @PostMapping
    public ResponseEntity<OrdonnanceDTO> createOrdonnance(@RequestBody OrdonnanceDTO dto) {
        OrdonnanceDTO created = ordonnanceService.createOrdonnance(dto);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrdonnanceDTO> getOrdonnance(@PathVariable Long id) {
        OrdonnanceDTO dto = ordonnanceService.getOrdonnanceById(id);
        return dto != null ? ResponseEntity.ok(dto) : ResponseEntity.notFound().build();
    }

    @GetMapping
    public ResponseEntity<List<OrdonnanceDTO>> getAllOrdonnances() {
        List<OrdonnanceDTO> ordonnances = ordonnanceService.getAllOrdonnances();
        return ResponseEntity.ok(ordonnances);
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<OrdonnanceDTO>> getOrdonnancesByPatient(@PathVariable Long patientId) {
        List<OrdonnanceDTO> ordonnances = ordonnanceService.getOrdonnancesByPatient(patientId);
        return ResponseEntity.ok(ordonnances);
    }

    @GetMapping("/medecin/{medecinId}")
    public ResponseEntity<List<OrdonnanceDTO>> getOrdonnancesByMedecin(@PathVariable Long medecinId) {
        List<OrdonnanceDTO> ordonnances = ordonnanceService.getOrdonnancesByMedecin(medecinId);
        return ResponseEntity.ok(ordonnances);
    }

    @GetMapping("/consultation/{consultationId}")
    public ResponseEntity<OrdonnanceDTO> getOrdonnanceByConsultation(@PathVariable Long consultationId) {
        OrdonnanceDTO dto = ordonnanceService.getOrdonnanceByConsultation(consultationId);
        return dto != null ? ResponseEntity.ok(dto) : ResponseEntity.notFound().build();
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<List<OrdonnanceDTO>> getOrdonnancesByType(@PathVariable TypeOrdonnanceEnum type) {
        List<OrdonnanceDTO> ordonnances = ordonnanceService.getOrdonnancesByType(type);
        return ResponseEntity.ok(ordonnances);
    }

    @GetMapping("/periode")
    public ResponseEntity<List<OrdonnanceDTO>> getOrdonnancesByPeriode(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate debut,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fin) {
        List<OrdonnanceDTO> ordonnances = ordonnanceService.getOrdonnancesByDateRange(debut, fin);
        return ResponseEntity.ok(ordonnances);
    }

    @PutMapping("/{id}")
    public ResponseEntity<OrdonnanceDTO> updateOrdonnance(@PathVariable Long id,
                                                         @RequestBody OrdonnanceDTO dto) {
        OrdonnanceDTO updated = ordonnanceService.updateOrdonnance(id, dto);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrdonnance(@PathVariable Long id) {
        ordonnanceService.deleteOrdonnance(id);
        return ResponseEntity.noContent().build();
    }
}
