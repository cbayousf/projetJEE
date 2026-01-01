package com.cabinet.medical.admin.controller;

import com.cabinet.medical.admin.dto.request.UserRequest;
import com.cabinet.medical.admin.entity.Utilisateur;
import com.cabinet.medical.admin.service.UtilisateurService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AdminUserController {

    private final UtilisateurService utilisateurService;

    @GetMapping
    public ResponseEntity<List<Utilisateur>> getAllUsers() {
        return ResponseEntity.ok(utilisateurService.getAllUsers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Utilisateur> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(utilisateurService.getUserById(id));
    }

    @PostMapping
    public ResponseEntity<Utilisateur> createUser(@RequestBody UserRequest request) {
        return ResponseEntity.ok(utilisateurService.createUser(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Utilisateur> updateUser(@PathVariable Long id, @RequestBody UserRequest request) {
        return ResponseEntity.ok(utilisateurService.updateUser(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        utilisateurService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/medecins")
    public ResponseEntity<List<Utilisateur>> getMedecins() {
        return ResponseEntity.ok(utilisateurService.getMedecins());
    }

    @GetMapping("/secretaires")
    public ResponseEntity<List<Utilisateur>> getSecretaires() {
        return ResponseEntity.ok(utilisateurService.getSecretaires());
    }
}
