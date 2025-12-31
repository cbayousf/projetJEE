package com.cabinet.medical.service;


import com.cabinet.medical.dto.request.CabinetRequest;
import com.cabinet.medical.entity.Cabinet;
import com.cabinet.medical.entity.Specialite;
import com.cabinet.medical.repository.CabinetRepository;
import com.cabinet.medical.repository.SpecialiteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CabinetService {

    private final CabinetRepository cabinetRepository;
    private final SpecialiteRepository specialiteRepository;

    public List<Cabinet> getAllCabinets() {
        return cabinetRepository.findAll();
    }

    public Cabinet getCabinetById(Long id) {
        return cabinetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cabinet non trouvé"));
    }

    public Cabinet createCabinet(CabinetRequest request) {
        Cabinet cabinet = new Cabinet();
        cabinet.setNom(request.getNom());
        cabinet.setAdresse(request.getAdresse());
        cabinet.setTel(request.getTel());
        cabinet.setLogo(request.getLogo());
        cabinet.setServiceActif(true);

        if (request.getSpecialiteId() != null) {
            Specialite specialite = specialiteRepository.findById(request.getSpecialiteId())
                    .orElseThrow(() -> new RuntimeException("Spécialité non trouvée"));
            cabinet.setSpecialite(specialite);
        }

        return cabinetRepository.save(cabinet);
    }

    public Cabinet updateCabinet(Long id, CabinetRequest request) {
        Cabinet cabinet = getCabinetById(id);
        cabinet.setNom(request.getNom());
        cabinet.setAdresse(request.getAdresse());
        cabinet.setTel(request.getTel());
        cabinet.setLogo(request.getLogo());

        if (request.getSpecialiteId() != null) {
            Specialite specialite = specialiteRepository.findById(request.getSpecialiteId())
                    .orElseThrow(() -> new RuntimeException("Spécialité non trouvée"));
            cabinet.setSpecialite(specialite);
        }

        return cabinetRepository.save(cabinet);
    }

    public void deleteCabinet(Long id) {
        cabinetRepository.deleteById(id);
    }

    public Cabinet activerCabinet(Long id) {
        Cabinet cabinet = getCabinetById(id);
        cabinet.setServiceActif(true);
        return cabinetRepository.save(cabinet);
    }

    public Cabinet desactiverCabinet(Long id) {
        Cabinet cabinet = getCabinetById(id);
        cabinet.setServiceActif(false);
        return cabinetRepository.save(cabinet);
    }

    public List<Cabinet> getCabinetsActifs() {
        return cabinetRepository.findByServiceActif(true);
    }
}