package com.cabinet.medical.controller;

import com.cabinet.medical.dto.OrdonnanceDTO;
import com.cabinet.medical.service.OrdonnanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ordonnances")
@CrossOrigin(origins = "*")
public class OrdonnanceController {

    @Autowired
    private OrdonnanceService ordonnanceService;

    @GetMapping
    public ResponseEntity<List<OrdonnanceDTO>> getAllOrdonnances() {
        return ResponseEntity.ok(ordonnanceService.getAllOrdonnances());
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrdonnanceDTO> getOrdonnanceById(@PathVariable Long id) {
        return ResponseEntity.ok(ordonnanceService.getOrdonnanceById(id));
    }

    @GetMapping("/consultation/{consultationId}")
    public ResponseEntity<List<OrdonnanceDTO>> getOrdonnancesByConsultation(@PathVariable Long consultationId) {
        return ResponseEntity.ok(ordonnanceService.getOrdonnancesByConsultation(consultationId));
    }

    @PostMapping
    public ResponseEntity<OrdonnanceDTO> createOrdonnance(@RequestBody OrdonnanceDTO ordonnanceDTO) {
        OrdonnanceDTO created = ordonnanceService.createOrdonnance(ordonnanceDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<OrdonnanceDTO> updateOrdonnance(
            @PathVariable Long id,
            @RequestBody OrdonnanceDTO ordonnanceDTO) {
        return ResponseEntity.ok(ordonnanceService.updateOrdonnance(id, ordonnanceDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrdonnance(@PathVariable Long id) {
        ordonnanceService.deleteOrdonnance(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/pdf")
    public ResponseEntity<byte[]> generatePDF(@PathVariable Long id) {
        byte[] pdfBytes = ordonnanceService.generatePDF(id);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment", "ordonnance_" + id + ".pdf");
        headers.setContentLength(pdfBytes.length);

        return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
    }
}
