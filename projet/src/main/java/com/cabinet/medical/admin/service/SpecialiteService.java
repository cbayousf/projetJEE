package com.cabinet.medical.admin.service;


import com.cabinet.medical.admin.entity.Specialite;
import com.cabinet.medical.admin.repository.SpecialiteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SpecialiteService {

    private final SpecialiteRepository specialiteRepository;

    public List<Specialite> getAllSpecialites() {
        return specialiteRepository.findAll();
    }

    public Specialite getSpecialiteById(Long id) {
        return specialiteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Spécialité non trouvée"));
    }

    public Specialite createSpecialite(Specialite specialite) {
        return specialiteRepository.save(specialite);
    }

    public Specialite updateSpecialite(Long id, Specialite specialite) {
        Specialite existing = getSpecialiteById(id);
        existing.setNom(specialite.getNom());
        existing.setDescription(specialite.getDescription());
        return specialiteRepository.save(existing);
    }

    public void deleteSpecialite(Long id) {
        specialiteRepository.deleteById(id);
    }
}