package com.cabinet.medical.repository;


import com.cabinet.medical.entity.Cabinet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CabinetRepository extends JpaRepository<Cabinet, Long> {
    List<Cabinet> findByServiceActif(Boolean serviceActif);
}
