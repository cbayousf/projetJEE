package com.cabinet.medical.facturation.controller;

import com.cabinet.medical.facturation.dto.FactureDTO;
import com.cabinet.medical.facturation.dto.StatistiquesDTO;
import com.cabinet.medical.facturation.entity.StatutPaiementEnum;
import com.cabinet.medical.facturation.service.FactureService;
import com.cabinet.medical.facturation.service.FacturePdfService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/factures")
@CrossOrigin(origins = "http://localhost:3000")
public class FactureController {

    private final FactureService factureService;
    private final FacturePdfService pdfService;

    @Autowired
    public FactureController(FactureService factureService, FacturePdfService pdfService) {
        this.factureService = factureService;
        this.pdfService = pdfService;
    }

    @PostMapping
    public ResponseEntity<FactureDTO> createFacture(@RequestBody FactureDTO dto) {
        FactureDTO created = factureService.createFacture(dto);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FactureDTO> getFacture(@PathVariable Long id) {
        FactureDTO dto = factureService.getFactureById(id);
        return dto != null ? ResponseEntity.ok(dto) : ResponseEntity.notFound().build();
    }

    @GetMapping
    public ResponseEntity<List<FactureDTO>> getAllFactures() {
        List<FactureDTO> factures = factureService.getAllFactures();
        return ResponseEntity.ok(factures);
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<FactureDTO>> getFacturesByPatient(@PathVariable Long patientId) {
        List<FactureDTO> factures = factureService.getFacturesByPatient(patientId);
        return ResponseEntity.ok(factures);
    }

    @GetMapping("/statut/{statut}")
    public ResponseEntity<List<FactureDTO>> getFacturesByStatut(@PathVariable StatutPaiementEnum statut) {
        List<FactureDTO> factures = factureService.getFacturesByStatut(statut);
        return ResponseEntity.ok(factures);
    }

    @GetMapping("/periode")
    public ResponseEntity<List<FactureDTO>> getFacturesByPeriode(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate debut,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fin) {
        List<FactureDTO> factures = factureService.getFacturesByDateRange(debut, fin);
        return ResponseEntity.ok(factures);
    }

    // ✅ CORRECTION: Endpoint pour valider paiement (PATCH au lieu de PUT)
    @PatchMapping("/{id}/valider")
    public ResponseEntity<FactureDTO> validerPaiement(@PathVariable Long id) {
        FactureDTO updated = factureService.updateFactureStatut(id, StatutPaiementEnum.PAYE);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}/statut")
    public ResponseEntity<FactureDTO> updateStatut(@PathVariable Long id, 
                                                  @RequestParam StatutPaiementEnum statut) {
        FactureDTO updated = factureService.updateFactureStatut(id, statut);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<FactureDTO> updateFacture(@PathVariable Long id, 
                                                   @RequestBody FactureDTO dto) {
        FactureDTO updated = factureService.updateFacture(id, dto);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFacture(@PathVariable Long id) {
        factureService.deleteFacture(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/statistiques")
    public ResponseEntity<StatistiquesDTO> getStatistiques() {
        StatistiquesDTO statistiques = factureService.getStatistiques();
        return ResponseEntity.ok(statistiques);
    }

    // ✅ NOUVEAU: Endpoint pour générer le PDF
    @GetMapping("/{id}/pdf")
    public ResponseEntity<byte[]> generatePdf(@PathVariable Long id) {
        try {
            byte[] pdfBytes = pdfService.generatePdf(id);
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.TEXT_HTML);
            headers.setContentDispositionFormData("filename", "facture_" + id + ".html");
            
            return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}