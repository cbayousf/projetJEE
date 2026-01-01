package com.cabinet.medical.admin.controller;


import com.cabinet.medical.admin.entity.Medicament;
import com.cabinet.medical.admin.service.MedicamentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/medicaments")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AdminMedicamentController {

    private final MedicamentService medicamentService;

    @GetMapping
    public ResponseEntity<List<Medicament>> getAllMedicaments() {
        return ResponseEntity.ok(medicamentService.getAllMedicaments());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Medicament> getMedicamentById(@PathVariable Long id) {
        return ResponseEntity.ok(medicamentService.getMedicamentById(id));
    }

    @GetMapping("/search")
    public ResponseEntity<List<Medicament>> searchMedicaments(@RequestParam String q) {
        return ResponseEntity.ok(medicamentService.searchMedicaments(q));
    }

    @PostMapping
    public ResponseEntity<Medicament> createMedicament(@RequestBody Medicament medicament) {
        return ResponseEntity.ok(medicamentService.createMedicament(medicament));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Medicament> updateMedicament(@PathVariable Long id, @RequestBody Medicament medicament) {
        return ResponseEntity.ok(medicamentService.updateMedicament(id, medicament));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMedicament(@PathVariable Long id) {
        medicamentService.deleteMedicament(id);
        return ResponseEntity.noContent().build();
    }
}
