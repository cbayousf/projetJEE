package com.cabinet.medical.repository;

import com.cabinet.medical.entity.RendezVous;
import com.cabinet.medical.enums.StatutRendezVous;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface RendezVousRepository extends JpaRepository<RendezVous, Long> {
    List<RendezVous> findByPatientId(Long patientId);
    List<RendezVous> findByMedecinId(Long medecinId);
    List<RendezVous> findByDateRdv(LocalDate dateRdv);
    List<RendezVous> findByMedecinIdAndDateRdv(Long medecinId, LocalDate dateRdv);
    List<RendezVous> findByStatut(StatutRendezVous statut);
    List<RendezVous> findByDateRdvBetween(LocalDate startDate, LocalDate endDate);
}
