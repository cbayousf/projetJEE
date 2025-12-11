package com.cabinet.medical.facturation.repository;

import com.cabinet.medical.facturation.entity.Facture;
import com.cabinet.medical.facturation.entity.StatutPaiementEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface FactureRepository extends JpaRepository<Facture, Long> {

    Optional<Facture> findByRendezVousId(Long rendezVousId);

    List<Facture> findByPatientId(Long patientId);

    List<Facture> findByStatut(StatutPaiementEnum statut);

    List<Facture> findByDateFactureBetween(LocalDate debut, LocalDate fin);

    @Query("SELECT SUM(f.montant) FROM Facture f WHERE f.statut = 'PAYE' " +
           "AND f.dateFacture BETWEEN :debut AND :fin")
    Double calculerRevenusPeriode(@Param("debut") LocalDate debut,
                                  @Param("fin") LocalDate fin);

    @Query("SELECT COUNT(f) FROM Facture f WHERE f.statut = :statut")
    Long countByStatut(@Param("statut") StatutPaiementEnum statut);

    @Query("SELECT f FROM Facture f ORDER BY f.dateFacture DESC")
    List<Facture> findAllOrderByDateDesc();
}