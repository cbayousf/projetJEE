package com.cabinet.medical.service;

import com.cabinet.medical.entity.Medicament;
import com.cabinet.medical.repository.MedicamentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MedicamentService {

    private final MedicamentRepository medicamentRepository;

    public List<Medicament> getAllMedicaments() {
        return medicamentRepository.findAll();
    }

    public Medicament getMedicamentById(Long id) {
        return medicamentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Médicament non trouvé"));
    }

    public List<Medicament> searchMedicaments(String query) {
        return medicamentRepository.findByNomContainingIgnoreCase(query);
    }

    public Medicament createMedicament(Medicament medicament) {
        return medicamentRepository.save(medicament);
    }

    public Medicament updateMedicament(Long id, Medicament medicament) {
        Medicament existing = getMedicamentById(id);
        existing.setNom(medicament.getNom());
        existing.setDosage(medicament.getDosage());
        existing.setForme(medicament.getForme());
        existing.setIndication(medicament.getIndication());
        return medicamentRepository.save(existing);
    }

    public void deleteMedicament(Long id) {
        medicamentRepository.deleteById(id);
    }
}
