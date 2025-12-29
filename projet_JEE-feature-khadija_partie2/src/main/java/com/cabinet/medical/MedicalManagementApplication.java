package com.cabinet.medical;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class GestionCabinetMedicalApplication {

    public static void main(String[] args) {
        SpringApplication.run(GestionCabinetMedicalApplication.class, args);
        System.out.println("🏥 Application Gestion Cabinet Médical démarrée avec succès !");
    }
}