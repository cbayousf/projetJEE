package com.cabinet.medical.rendezvous.repository;

import com.cabinet.medical.rendezvous.entity.Ordonnance;
import com.cabinet.medical.rendezvous.entity.TypeOrdonnanceEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface OrdonnanceRepository extends JpaRepository<Ordonnance, Long> {

    List<Ordonnance> findByPatientId(Long patientId);

    List<Ordonnance> findByMedecinId(Long medecinId);

    Optional<Ordonnance> findByConsultationId(Long consultationId);

    List<Ordonnance> findByType(TypeOrdonnanceEnum type);

    List<Ordonnance> findByDateOrdonnanceBetween(LocalDate debut, LocalDate fin);

    List<Ordonnance> findByPatientIdOrderByDateOrdonnanceDesc(Long patientId);

    @Query("SELECT o FROM Ordonnance o WHERE o.medecinId = :medecinId " +
           "ORDER BY o.dateOrdonnance DESC")
    List<Ordonnance> findOrdonnancesByMedecinOrderByDateDesc(@Param("medecinId") Long medecinId);

    @Query("SELECT COUNT(o) FROM Ordonnance o WHERE o.medecinId = :medecinId " +
           "AND o.dateOrdonnance BETWEEN :debut AND :fin")
    Long countByMedecinAndPeriode(@Param("medecinId") Long medecinId,
                                   @Param("debut") LocalDate debut,
                                   @Param("fin") LocalDate fin);

    @Query("SELECT o FROM Ordonnance o ORDER BY o.dateOrdonnance DESC")
    List<Ordonnance> findAllOrderByDateDesc();
}
