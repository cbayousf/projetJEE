package com.cabinet.medical.controller;

import com.cabinet.medical.entity.Specialite;
import com.cabinet.medical.service.SpecialiteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/specialites")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AdminSpecialiteController {

    private final SpecialiteService specialiteService;

    @GetMapping
    public ResponseEntity<List<Specialite>> getAllSpecialites() {
        return ResponseEntity.ok(specialiteService.getAllSpecialites());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Specialite> getSpecialiteById(@PathVariable Long id) {
        return ResponseEntity.ok(specialiteService.getSpecialiteById(id));
    }

    @PostMapping
    public ResponseEntity<Specialite> createSpecialite(@RequestBody Specialite specialite) {
        return ResponseEntity.ok(specialiteService.createSpecialite(specialite));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Specialite> updateSpecialite(@PathVariable Long id, @RequestBody Specialite specialite) {
        return ResponseEntity.ok(specialiteService.updateSpecialite(id, specialite));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSpecialite(@PathVariable Long id) {
        specialiteService.deleteSpecialite(id);
        return ResponseEntity.noContent().build();
    }
}
