package com.cabinet.medical.rendezvous.repository;

import com.cabinet.medical.rendezvous.entity.Consultation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface ConsultationRepository extends JpaRepository<Consultation, Long> {

    List<Consultation> findByPatientId(Long patientId);

    List<Consultation> findByMedecinId(Long medecinId);

    Optional<Consultation> findByRendezVousId(Long rendezVousId);

    List<Consultation> findByDateConsultation(LocalDate dateConsultation);

    List<Consultation> findByDateConsultationBetween(LocalDate debut, LocalDate fin);

    List<Consultation> findByPatientIdOrderByDateConsultationDesc(Long patientId);

    @Query("SELECT c FROM Consultation c WHERE c.patientId = :patientId " +
           "AND c.dateConsultation BETWEEN :debut AND :fin " +
           "ORDER BY c.dateConsultation DESC")
    List<Consultation> findConsultationsByPatientAndPeriode(@Param("patientId") Long patientId,
                                                             @Param("debut") LocalDate debut,
                                                             @Param("fin") LocalDate fin);

    @Query("SELECT c FROM Consultation c WHERE c.medecinId = :medecinId " +
           "ORDER BY c.dateConsultation DESC")
    List<Consultation> findConsultationsByMedecinOrderByDateDesc(@Param("medecinId") Long medecinId);

    @Query("SELECT COUNT(c) FROM Consultation c WHERE c.medecinId = :medecinId " +
           "AND c.dateConsultation BETWEEN :debut AND :fin")
    Long countByMedecinAndPeriode(@Param("medecinId") Long medecinId,
                                   @Param("debut") LocalDate debut,
                                   @Param("fin") LocalDate fin);

    @Query("SELECT c FROM Consultation c ORDER BY c.dateConsultation DESC")
    List<Consultation> findAllOrderByDateDesc();
}
