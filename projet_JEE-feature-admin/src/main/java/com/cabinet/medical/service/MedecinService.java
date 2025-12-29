package com.cabinet.medical.service;

import com.cabinet.medical.entity.Medecin;
import com.cabinet.medical.repository.MedecinRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class MedecinService {

    @Autowired
    private MedecinRepository medecinRepository;

    public List<Medecin> getAllMedecins() {
        return medecinRepository.findAll();
    }

    public Medecin getMedecinById(Long id) {
        return medecinRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Médecin non trouvé avec l'id: " + id));
    }

    public Medecin createMedecin(Medecin medecin) {
        return medecinRepository.save(medecin);
    }

    public Medecin updateMedecin(Long id, Medecin medecinDetails) {
        Medecin medecin = getMedecinById(id);
        medecin.setNom(medecinDetails.getNom());
        medecin.setPrenom(medecinDetails.getPrenom());
        medecin.setSpecialite(medecinDetails.getSpecialite());
        medecin.setNumTel(medecinDetails.getNumTel());
        medecin.setEmail(medecinDetails.getEmail());
        medecin.setSignature(medecinDetails.getSignature());
        return medecinRepository.save(medecin);
    }

    public void deleteMedecin(Long id) {
        if (!medecinRepository.existsById(id)) {
            throw new RuntimeException("Médecin non trouvé");
        }
        medecinRepository.deleteById(id);
    }
}
