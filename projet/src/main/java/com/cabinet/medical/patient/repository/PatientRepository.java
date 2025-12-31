package com.cabinet.medical.patient.repository;

import com.cabinet.medical.patient.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {
    Optional<Patient> findByCin(String cin);

    boolean existsByCin(String cin);
}
