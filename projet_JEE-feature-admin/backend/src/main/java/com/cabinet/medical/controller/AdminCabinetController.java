package com.cabinet.medical.controller;


import com.cabinet.medical.dto.request.CabinetRequest;
import com.cabinet.medical.entity.Cabinet;
import com.cabinet.medical.service.CabinetService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/cabinets")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AdminCabinetController {

    private final CabinetService cabinetService;

    @GetMapping
    public ResponseEntity<List<Cabinet>> getAllCabinets() {
        return ResponseEntity.ok(cabinetService.getAllCabinets());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cabinet> getCabinetById(@PathVariable Long id) {
        return ResponseEntity.ok(cabinetService.getCabinetById(id));
    }

    @PostMapping
    public ResponseEntity<Cabinet> createCabinet(@RequestBody CabinetRequest request) {
        return ResponseEntity.ok(cabinetService.createCabinet(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cabinet> updateCabinet(@PathVariable Long id, @RequestBody CabinetRequest request) {
        return ResponseEntity.ok(cabinetService.updateCabinet(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCabinet(@PathVariable Long id) {
        cabinetService.deleteCabinet(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/activer")
    public ResponseEntity<Cabinet> activerCabinet(@PathVariable Long id) {
        return ResponseEntity.ok(cabinetService.activerCabinet(id));
    }

    @PatchMapping("/{id}/desactiver")
    public ResponseEntity<Cabinet> desactiverCabinet(@PathVariable Long id) {
        return ResponseEntity.ok(cabinetService.desactiverCabinet(id));
    }
}
