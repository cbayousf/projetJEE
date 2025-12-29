-- Script SQL pour insérer des données de test
-- Exécutez ce script après le premier démarrage de l'application

-- Insertion de médecins
INSERT INTO medecins (nom, prenom, specialite, num_tel, email, signature) VALUES
('Alami', 'Mohammed', 'Cardiologue', '0612345678', 'm.alami@example.com', 'Dr. Mohammed Alami - Cardiologue'),
('Benkirane', 'Fatima', 'Pédiatre', '0623456789', 'f.benkirane@example.com', 'Dr. Fatima Benkirane - Pédiatre'),
('El Amrani', 'Youssef', 'Généraliste', '0634567890', 'y.elamrani@example.com', 'Dr. Youssef El Amrani');

-- Insertion de patients
INSERT INTO patients (cin, nom, prenom, date_naissance, sexe, num_tel, email, adresse, type_mutuelle) VALUES
('AB123456', 'Benali', 'Fatima', '1985-05-15', 'F', '0698765432', 'f.benali@example.com', '25 Rue Hassan II, Casablanca', 'CNSS'),
('CD789012', 'El Mouden', 'Ahmed', '1990-08-22', 'M', '0687654321', 'a.elmouden@example.com', '10 Avenue Mohammed V, Rabat', 'CNOPS'),
('EF345678', 'Zahraoui', 'Samira', '1978-12-03', 'F', '0676543210', 's.zahraoui@example.com', '15 Boulevard Zerktouni, Marrakech', 'RMA'),
('GH901234', 'Lahlou', 'Karim', '1995-03-18', 'M', '0665432109', 'k.lahlou@example.com', '8 Rue Abdelmoumen, Agadir', 'Saham'),
('IJ567890', 'Idrissi', 'Nadia', '1988-07-25', 'F', '0654321098', 'n.idrissi@example.com', '32 Avenue FAR, Tanger', 'CNSS');

-- Note: Les IDs des médecins et patients seront générés automatiquement
-- Pour créer des rendez-vous et consultations, utilisez l'interface web
-- ou ajustez les IDs ci-dessous selon ceux générés

-- Exemple de rendez-vous (à adapter avec les bons IDs)
-- INSERT INTO rendez_vous (patient_id, medecin_id, date_rdv, heure_rdv, motif, statut, date_creation) VALUES
-- (1, 1, '2024-01-15', '09:00:00', 'Consultation de contrôle', 'EN_ATTENTE', CURRENT_DATE),
-- (2, 2, '2024-01-15', '10:00:00', 'Vaccination', 'CONFIRME', CURRENT_DATE),
-- (3, 3, '2024-01-16', '14:30:00', 'Douleurs abdominales', 'EN_ATTENTE', CURRENT_DATE);

-- Pour exécuter ce script:
-- psql -U postgres -d cabinet_medical_db -f data_test.sql
