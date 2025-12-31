package com.cabinet.medical.rendezvous.repository;

import com.cabinet.medical.rendezvous.entity.RendezVous;
import com.cabinet.medical.rendezvous.entity.StatutEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface RendezVousRepository extends JpaRepository<RendezVous, Long> {

    List<RendezVous> findByPatientId(Long patientId);

    List<RendezVous> findByMedecinId(Long medecinId);

    List<RendezVous> findByStatut(StatutEnum statut);

    List<RendezVous> findByDateRdv(LocalDate dateRdv);

    List<RendezVous> findByDateRdvBetween(LocalDate debut, LocalDate fin);

    List<RendezVous> findByMedecinIdAndDateRdv(Long medecinId, LocalDate dateRdv);

    List<RendezVous> findByPatientIdAndStatut(Long patientId, StatutEnum statut);

    @Query("SELECT r FROM RendezVous r WHERE r.medecinId = :medecinId " +
           "AND r.dateRdv = :date AND r.statut != 'ANNULE' " +
           "ORDER BY r.heureRdv ASC")
    List<RendezVous> findRendezVousByMedecinAndDate(@Param("medecinId") Long medecinId,
                                                     @Param("date") LocalDate date);

    @Query("SELECT r FROM RendezVous r WHERE r.statut = 'EN_ATTENTE' " +
           "AND r.dateRdv = :date ORDER BY r.heureRdv ASC")
    List<RendezVous> findRendezVousEnAttenteByDate(@Param("date") LocalDate date);

    @Query("SELECT COUNT(r) FROM RendezVous r WHERE r.medecinId = :medecinId " +
           "AND r.dateRdv BETWEEN :debut AND :fin")
    Long countByMedecinAndPeriode(@Param("medecinId") Long medecinId,
                                   @Param("debut") LocalDate debut,
                                   @Param("fin") LocalDate fin);

    @Query("SELECT r FROM RendezVous r ORDER BY r.dateRdv DESC, r.heureRdv DESC")
    List<RendezVous> findAllOrderByDateDesc();
}
