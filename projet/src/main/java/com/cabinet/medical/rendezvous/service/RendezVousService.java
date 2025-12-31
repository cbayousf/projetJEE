package com.cabinet.medical.rendezvous.service;

import com.cabinet.medical.rendezvous.dto.RendezVousDTO;
import com.cabinet.medical.rendezvous.entity.RendezVous;
import com.cabinet.medical.rendezvous.entity.StatutEnum;
import com.cabinet.medical.rendezvous.repository.RendezVousRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class RendezVousService {

    private final RendezVousRepository rendezVousRepository;

    @Autowired
    public RendezVousService(RendezVousRepository rendezVousRepository) {
        this.rendezVousRepository = rendezVousRepository;
    }

    public RendezVousDTO createRendezVous(RendezVousDTO dto) {
        RendezVous rendezVous = new RendezVous();
        rendezVous.setDateRdv(dto.getDateRdv());
        rendezVous.setHeureRdv(dto.getHeureRdv());
        rendezVous.setMotif(dto.getMotif());
        rendezVous.setStatut(StatutEnum.EN_ATTENTE);
        rendezVous.setNotes(dto.getNotes());
        rendezVous.setPatientId(dto.getPatientId());
        rendezVous.setMedecinId(dto.getMedecinId());
        rendezVous.setCabinetId(dto.getCabinetId());
        rendezVous.setDateCreation(LocalDate.now());

        RendezVous saved = rendezVousRepository.save(rendezVous);
        return convertToDTO(saved);
    }

    public RendezVousDTO getRendezVousById(Long id) {
        Optional<RendezVous> rendezVous = rendezVousRepository.findById(id);
        return rendezVous.map(this::convertToDTO).orElse(null);
    }

    public List<RendezVousDTO> getAllRendezVous() {
        List<RendezVous> rendezVousList = rendezVousRepository.findAllOrderByDateDesc();
        return rendezVousList.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public List<RendezVousDTO> getRendezVousByPatient(Long patientId) {
        List<RendezVous> rendezVousList = rendezVousRepository.findByPatientId(patientId);
        return rendezVousList.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public List<RendezVousDTO> getRendezVousByMedecin(Long medecinId) {
        List<RendezVous> rendezVousList = rendezVousRepository.findByMedecinId(medecinId);
        return rendezVousList.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public List<RendezVousDTO> getRendezVousByStatut(StatutEnum statut) {
        List<RendezVous> rendezVousList = rendezVousRepository.findByStatut(statut);
        return rendezVousList.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public List<RendezVousDTO> getRendezVousByDate(LocalDate date) {
        List<RendezVous> rendezVousList = rendezVousRepository.findByDateRdv(date);
        return rendezVousList.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public List<RendezVousDTO> getRendezVousByDateRange(LocalDate debut, LocalDate fin) {
        List<RendezVous> rendezVousList = rendezVousRepository.findByDateRdvBetween(debut, fin);
        return rendezVousList.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public List<RendezVousDTO> getRendezVousByMedecinAndDate(Long medecinId, LocalDate date) {
        List<RendezVous> rendezVousList = rendezVousRepository.findRendezVousByMedecinAndDate(medecinId, date);
        return rendezVousList.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public RendezVousDTO updateRendezVous(Long id, RendezVousDTO dto) {
        Optional<RendezVous> rendezVousOpt = rendezVousRepository.findById(id);
        if (rendezVousOpt.isPresent()) {
            RendezVous rendezVous = rendezVousOpt.get();
            rendezVous.setDateRdv(dto.getDateRdv());
            rendezVous.setHeureRdv(dto.getHeureRdv());
            rendezVous.setMotif(dto.getMotif());
            rendezVous.setNotes(dto.getNotes());
            rendezVous.setStatut(dto.getStatut());

            RendezVous updated = rendezVousRepository.save(rendezVous);
            return convertToDTO(updated);
        }
        return null;
    }

    public RendezVousDTO updateStatut(Long id, StatutEnum nouveauStatut) {
        Optional<RendezVous> rendezVousOpt = rendezVousRepository.findById(id);
        if (rendezVousOpt.isPresent()) {
            RendezVous rendezVous = rendezVousOpt.get();
            rendezVous.setStatut(nouveauStatut);

            RendezVous updated = rendezVousRepository.save(rendezVous);
            return convertToDTO(updated);
        }
        return null;
    }

    public void deleteRendezVous(Long id) {
        rendezVousRepository.deleteById(id);
    }

    public Long countRendezVousByMedecinAndPeriode(Long medecinId, LocalDate debut, LocalDate fin) {
        return rendezVousRepository.countByMedecinAndPeriode(medecinId, debut, fin);
    }

    private RendezVousDTO convertToDTO(RendezVous rendezVous) {
        RendezVousDTO dto = new RendezVousDTO();
        dto.setIdRendezVous(rendezVous.getIdRendezVous());
        dto.setDateRdv(rendezVous.getDateRdv());
        dto.setHeureRdv(rendezVous.getHeureRdv());
        dto.setMotif(rendezVous.getMotif());
        dto.setStatut(rendezVous.getStatut());
        dto.setNotes(rendezVous.getNotes());
        dto.setPatientId(rendezVous.getPatientId());
        dto.setMedecinId(rendezVous.getMedecinId());
        dto.setCabinetId(rendezVous.getCabinetId());
        dto.setDateCreation(rendezVous.getDateCreation());
        return dto;
    }
}
