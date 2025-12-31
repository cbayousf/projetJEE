package com.cabinet.medical.rendezvous.controller;

import com.cabinet.medical.rendezvous.dto.RendezVousDTO;
import com.cabinet.medical.rendezvous.entity.StatutEnum;
import com.cabinet.medical.rendezvous.service.RendezVousService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/rendezvous")
@CrossOrigin(origins = "http://localhost:3000")
public class RendezVousController {

    private final RendezVousService rendezVousService;

    @Autowired
    public RendezVousController(RendezVousService rendezVousService) {
        this.rendezVousService = rendezVousService;
    }

    @PostMapping
    public ResponseEntity<RendezVousDTO> createRendezVous(@RequestBody RendezVousDTO dto) {
        RendezVousDTO created = rendezVousService.createRendezVous(dto);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RendezVousDTO> getRendezVous(@PathVariable Long id) {
        RendezVousDTO dto = rendezVousService.getRendezVousById(id);
        return dto != null ? ResponseEntity.ok(dto) : ResponseEntity.notFound().build();
    }

    @GetMapping
    public ResponseEntity<List<RendezVousDTO>> getAllRendezVous() {
        List<RendezVousDTO> rendezVousList = rendezVousService.getAllRendezVous();
        return ResponseEntity.ok(rendezVousList);
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<RendezVousDTO>> getRendezVousByPatient(@PathVariable Long patientId) {
        List<RendezVousDTO> rendezVousList = rendezVousService.getRendezVousByPatient(patientId);
        return ResponseEntity.ok(rendezVousList);
    }

    @GetMapping("/medecin/{medecinId}")
    public ResponseEntity<List<RendezVousDTO>> getRendezVousByMedecin(@PathVariable Long medecinId) {
        List<RendezVousDTO> rendezVousList = rendezVousService.getRendezVousByMedecin(medecinId);
        return ResponseEntity.ok(rendezVousList);
    }

    @GetMapping("/statut/{statut}")
    public ResponseEntity<List<RendezVousDTO>> getRendezVousByStatut(@PathVariable StatutEnum statut) {
        List<RendezVousDTO> rendezVousList = rendezVousService.getRendezVousByStatut(statut);
        return ResponseEntity.ok(rendezVousList);
    }

    @GetMapping("/date/{date}")
    public ResponseEntity<List<RendezVousDTO>> getRendezVousByDate(
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        List<RendezVousDTO> rendezVousList = rendezVousService.getRendezVousByDate(date);
        return ResponseEntity.ok(rendezVousList);
    }

    @GetMapping("/periode")
    public ResponseEntity<List<RendezVousDTO>> getRendezVousByPeriode(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate debut,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fin) {
        List<RendezVousDTO> rendezVousList = rendezVousService.getRendezVousByDateRange(debut, fin);
        return ResponseEntity.ok(rendezVousList);
    }

    @GetMapping("/medecin/{medecinId}/date/{date}")
    public ResponseEntity<List<RendezVousDTO>> getRendezVousByMedecinAndDate(
            @PathVariable Long medecinId,
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        List<RendezVousDTO> rendezVousList = rendezVousService.getRendezVousByMedecinAndDate(medecinId, date);
        return ResponseEntity.ok(rendezVousList);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RendezVousDTO> updateRendezVous(@PathVariable Long id,
                                                          @RequestBody RendezVousDTO dto) {
        RendezVousDTO updated = rendezVousService.updateRendezVous(id, dto);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @PatchMapping("/{id}/statut")
    public ResponseEntity<RendezVousDTO> updateStatut(@PathVariable Long id,
                                                      @RequestParam StatutEnum statut) {
        RendezVousDTO updated = rendezVousService.updateStatut(id, statut);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRendezVous(@PathVariable Long id) {
        rendezVousService.deleteRendezVous(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/medecin/{medecinId}/count")
    public ResponseEntity<Long> countRendezVousByMedecinAndPeriode(
            @PathVariable Long medecinId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate debut,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fin) {
        Long count = rendezVousService.countRendezVousByMedecinAndPeriode(medecinId, debut, fin);
        return ResponseEntity.ok(count);
    }
}
