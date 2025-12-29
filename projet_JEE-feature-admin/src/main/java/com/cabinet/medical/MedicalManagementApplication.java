package com.cabinet.medical;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import javax.sql.DataSource;
import java.sql.Connection;

@SpringBootApplication
public class MedicalManagementApplication {

    public static void main(String[] args) {
        SpringApplication.run(MedicalManagementApplication.class, args);
    }

    @Bean
    CommandLineRunner testConnection(DataSource dataSource) {
        return args -> {
            try (Connection connection = dataSource.getConnection()) {
                System.out.println("✅ Connexion à PostgreSQL réussie!");
                System.out.println("Database: " + connection.getCatalog());
            } catch (Exception e) {
                System.err.println("❌ Erreur de connexion: " + e.getMessage());
            }
        };
    }
}