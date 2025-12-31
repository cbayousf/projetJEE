-- Cabinet Medical - Complete Database Schema and Sample Data
-- This file creates all tables and inserts sample data for the merged application

-- ===========================================
-- TABLE CREATION
-- ===========================================

-- Users table (Administrator, Doctor, Secretary)
CREATE TABLE IF NOT EXISTS utilisateurs (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    prenom VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    mot_de_passe VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('ADMINISTRATEUR', 'MEDECIN', 'SECRETAIRE')),
    num_tel VARCHAR(20),
    actif BOOLEAN DEFAULT true,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_modification TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Cabinet table
CREATE TABLE IF NOT EXISTS cabinet (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    adresse VARCHAR(500),
    num_tel VARCHAR(20),
    email VARCHAR(255),
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Specialties table
CREATE TABLE IF NOT EXISTS specialite (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Medications table
CREATE TABLE IF NOT EXISTS medicament (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    description TEXT,
    posologie VARCHAR(500),
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Password reset tokens
CREATE TABLE IF NOT EXISTS password_reset_token (
    id SERIAL PRIMARY KEY,
    token VARCHAR(255) NOT NULL UNIQUE,
    utilisateur_id INTEGER REFERENCES utilisateurs(id) ON DELETE CASCADE,
    expiry_date TIMESTAMP NOT NULL,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Patients table
CREATE TABLE IF NOT EXISTS patient (
    id SERIAL PRIMARY KEY,
    cin VARCHAR(20) UNIQUE NOT NULL,
    nom VARCHAR(255) NOT NULL,
    prenom VARCHAR(255) NOT NULL,
    date_naissance DATE NOT NULL,
    sexe CHAR(1) CHECK (sexe IN ('M', 'F')),
    num_tel VARCHAR(20),
    email VARCHAR(255),
    adresse TEXT,
    type_mutuelle VARCHAR(100),
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_modification TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Medical records (Dossiers)
CREATE TABLE IF NOT EXISTS dossier_medical (
    id SERIAL PRIMARY KEY,
    patient_id INTEGER REFERENCES patient(id) ON DELETE CASCADE,
    medecin_id INTEGER REFERENCES utilisateurs(id) ON DELETE SET NULL,
    diagnostic TEXT,
    traitement TEXT,
    observations TEXT,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_modification TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Documents table
CREATE TABLE IF NOT EXISTS document (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    type VARCHAR(100),
    chemin VARCHAR(500),
    taille BIGINT,
    patient_id INTEGER REFERENCES patient(id) ON DELETE CASCADE,
    dossier_id INTEGER REFERENCES dossier_medical(id) ON DELETE CASCADE,
    date_upload TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Appointments (Rendez-vous)
CREATE TABLE IF NOT EXISTS rendez_vous (
    id SERIAL PRIMARY KEY,
    patient_id INTEGER REFERENCES patient(id) ON DELETE CASCADE,
    medecin_id INTEGER REFERENCES utilisateurs(id) ON DELETE SET NULL,
    date_rdv DATE NOT NULL,
    heure_rdv TIME NOT NULL,
    motif TEXT,
    statut VARCHAR(50) DEFAULT 'EN_ATTENTE' CHECK (statut IN ('EN_ATTENTE', 'CONFIRME', 'ANNULE', 'TERMINE')),
    notes TEXT,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_modification TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Consultations
CREATE TABLE IF NOT EXISTS consultation (
    id SERIAL PRIMARY KEY,
    rendez_vous_id INTEGER REFERENCES rendez_vous(id) ON DELETE SET NULL,
    patient_id INTEGER REFERENCES patient(id) ON DELETE CASCADE,
    medecin_id INTEGER REFERENCES utilisateurs(id) ON DELETE SET NULL,
    diagnostic TEXT,
    traitement TEXT,
    observations TEXT,
    date_consultation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    duree INTEGER -- in minutes
);

-- Prescriptions (Ordonnances)
CREATE TABLE IF NOT EXISTS ordonnance (
    id SERIAL PRIMARY KEY,
    consultation_id INTEGER REFERENCES consultation(id) ON DELETE SET NULL,
    patient_id INTEGER REFERENCES patient(id) ON DELETE CASCADE,
    medecin_id INTEGER REFERENCES utilisateurs(id) ON DELETE SET NULL,
    instructions TEXT,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    valide_jusqu_a DATE
);

-- Prescription details (medicaments in ordonnance)
CREATE TABLE IF NOT EXISTS ordonnance_medicament (
    id SERIAL PRIMARY KEY,
    ordonnance_id INTEGER REFERENCES ordonnance(id) ON DELETE CASCADE,
    medicament_id INTEGER REFERENCES medicament(id) ON DELETE CASCADE,
    posologie VARCHAR(500),
    duree VARCHAR(100),
    quantite INTEGER
);

-- Invoices (Factures)
CREATE TABLE IF NOT EXISTS facture (
    id SERIAL PRIMARY KEY,
    numero VARCHAR(50) UNIQUE NOT NULL,
    patient_id INTEGER REFERENCES patient(id) ON DELETE CASCADE,
    consultation_id INTEGER REFERENCES consultation(id) ON DELETE SET NULL,
    montant DECIMAL(10,2) NOT NULL,
    statut_paiement VARCHAR(50) DEFAULT 'EN_ATTENTE' CHECK (statut_paiement IN ('EN_ATTENTE', 'PAYE', 'REMBOURSE')),
    date_emission TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_paiement TIMESTAMP,
    date_echeance DATE,
    notes TEXT
);

-- Notifications
CREATE TABLE IF NOT EXISTS notification (
    id SERIAL PRIMARY KEY,
    titre VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) DEFAULT 'INFO' CHECK (type IN ('INFO', 'WARNING', 'ERROR', 'SUCCESS')),
    destinataire_id INTEGER REFERENCES utilisateurs(id) ON DELETE CASCADE,
    lu BOOLEAN DEFAULT false,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_lecture TIMESTAMP
);

-- ===========================================
-- SAMPLE DATA INSERTION
-- ===========================================

-- Insert Cabinet
INSERT INTO cabinet (nom, adresse, num_tel, email) VALUES
('Cabinet Médical Central', '123 Avenue Mohammed V, Casablanca', '0522123456', 'contact@cabinetcentral.ma');

-- Insert Specialties
INSERT INTO specialite (nom, description) VALUES
('Médecine Générale', 'Médecine générale et prévention'),
('Cardiologie', 'Spécialiste des maladies cardiovasculaires'),
('Pédiatrie', 'Médecine des enfants'),
('Dermatologie', 'Spécialiste de la peau'),
('Ophtalmologie', 'Spécialiste des yeux'),
('Gynécologie', 'Médecine de la femme');

-- Insert Medications
INSERT INTO medicament (nom, description, posologie) VALUES
('Paracétamol', 'Antalgique et antipyrétique', '500mg toutes les 6 heures'),
('Ibuprofène', 'Anti-inflammatoire non stéroïdien', '400mg toutes les 8 heures'),
('Amoxicilline', 'Antibiotique', '500mg trois fois par jour'),
('Oméprazole', 'Anti-acide', '20mg une fois par jour'),
('Loratadine', 'Antihistaminique', '10mg une fois par jour'),
('Salbutamol', 'Bronchodilatateur', '100mcg par inhalation');

-- Insert Users (Administrator, Doctors, Secretaries)

INSERT INTO utilisateurs (nom, prenom, email, mot_de_passe, role, num_tel) VALUES
-- Administrator
('Admin', 'System', 'admin@cabinet.ma', '$2a$10$YourHashedPasswordHere', 'ADMINISTRATEUR', '0522000001'),
-- Doctors
('Benjelloun', 'Karim', 'k.benjelloun@cabinet.ma', '$2a$10$YourHashedPasswordHere', 'MEDECIN', '0522000002'),
('Alami', 'Fatima', 'f.alami@cabinet.ma', '$2a$10$YourHashedPasswordHere', 'MEDECIN', '0522000003'),
('Rahmani', 'Youssef', 'y.rahmani@cabinet.ma', '$2a$10$YourHashedPasswordHere', 'MEDECIN', '0522000004'),
-- Secretaries
('Idrissi', 'Leila', 'l.idrissi@cabinet.ma', '$2a$10$YourHashedPasswordHere', 'SECRETAIRE', '0522000005'),
('Mansouri', 'Samira', 's.mansouri@cabinet.ma', '$2a$10$YourHashedPasswordHere', 'SECRETAIRE', '0522000006');

-- Insert Patients
INSERT INTO patient (cin, nom, prenom, date_naissance, sexe, num_tel, email, adresse, type_mutuelle) VALUES
('AB123456', 'El Amrani', 'Ahmed', '1985-03-15', 'M', '0612345678', 'ahmed.elamrani@gmail.com', '45 Rue Ibn Sina, Casablanca', 'CNOPS'),
('CD789012', 'Bennani', 'Samira', '1992-07-22', 'F', '0623456789', 'samira.bennani@hotmail.com', '12 Avenue Hassan II, Rabat', 'CNSS'),
('EF345678', 'Khalil', 'Mohammed', '1978-11-05', 'M', '0634567890', 'm.khalil@gmail.com', '78 Boulevard Mohammed V, Marrakech', 'RAMED'),
('GH901234', 'Zahra', 'Amina', '2005-02-28', 'F', '0645678901', 'amina.zahra@yahoo.com', '33 Rue de la Liberté, Fès', 'CNOPS'),
('IJ567890', 'Chakir', 'Yassin', '1995-09-14', 'M', '0656789012', 'y.chakir@gmail.com', '21 Avenue des FAR, Tanger', 'CNSS'),
('KL123890', 'Tazi', 'Nadia', '1982-12-10', 'F', '0667890123', 'nadia.tazi@hotmail.com', '67 Rue Palestine, Agadir', 'Privée');

-- Insert Medical Records
INSERT INTO dossier_medical (patient_id, medecin_id, diagnostic, traitement, observations) VALUES
(1, 2, 'Hypertension artérielle', 'Traitement antihypertenseur, régime sans sel', 'Surveillance tensionnelle mensuelle'),
(2, 3, 'Diabète type 2', 'Insuline, régime diabétique', 'Contrôle glycémique hebdomadaire'),
(3, 2, 'Asthme allergique', 'Corticoïdes inhalés, bronchodilatateurs', 'Éviter les allergènes connus'),
(4, 3, 'Anémie ferriprive', 'Supplémentation en fer', 'Contrôle hémogramme dans 3 mois'),
(5, 2, 'Lombalgie chronique', 'Antalgiques, kinésithérapie', 'Éviter le port de charges lourdes'),
(6, 4, 'Migraines', 'Traitement de crise et préventif', 'Tenir un agenda des crises');

-- Insert Appointments
INSERT INTO rendez_vous (patient_id, medecin_id, date_rdv, heure_rdv, motif, statut) VALUES
(1, 2, '2024-01-15', '09:00:00', 'Contrôle tension artérielle', 'CONFIRME'),
(2, 3, '2024-01-15', '10:30:00', 'Suivi diabète', 'CONFIRME'),
(3, 2, '2024-01-16', '11:00:00', 'Crise asthmatique', 'EN_ATTENTE'),
(4, 3, '2024-01-16', '14:30:00', 'Bilan annuel', 'CONFIRME'),
(5, 4, '2024-01-17', '16:00:00', 'Douleurs lombaires', 'ANNULE'),
(6, 4, '2024-01-17', '17:30:00', 'Migraine persistante', 'EN_ATTENTE');

-- Insert Consultations
INSERT INTO consultation (rendez_vous_id, patient_id, medecin_id, diagnostic, traitement, observations, duree) VALUES
(1, 1, 2, 'HTA bien contrôlée', 'Continuer traitement actuel', 'Tension: 125/80 mmHg', 20),
(2, 2, 3, 'Glycémie équilibrée', 'Ajustement dose insuline', 'HbA1c: 6.8%', 25),
(4, 4, 3, 'Anémie corrigée', 'Arrêt supplémentation fer', 'Hémoglobine normale', 15);

-- Insert Prescriptions
INSERT INTO ordonnance (consultation_id, patient_id, medecin_id, instructions, valide_jusqu_a) VALUES
(1, 1, 2, 'Prendre avant les repas', '2024-04-15'),
(2, 2, 3, 'Adapter selon glycémie', '2024-04-15'),
(3, 4, 3, 'Une fois par jour', '2024-04-16');

-- Insert Prescription Details
INSERT INTO ordonnance_medicament (ordonnance_id, medicament_id, posologie, duree, quantite) VALUES
(1, 4, '20mg le matin', '3 mois', 90),
(2, 1, '500mg si douleur', '1 mois', 30),
(2, 3, '500mg 3x/jour', '7 jours', 21),
(3, 5, '10mg le soir', '1 mois', 30);

-- Insert Invoices
INSERT INTO facture (numero, patient_id, consultation_id, montant, statut_paiement, date_emission, date_echeance) VALUES
('FAC-2024-001', 1, 1, 300.00, 'PAYE', '2024-01-15', '2024-02-15'),
('FAC-2024-002', 2, 2, 350.00, 'EN_ATTENTE', '2024-01-15', '2024-02-15'),
('FAC-2024-003', 4, 3, 250.00, 'PAYE', '2024-01-16', '2024-02-16');

-- Insert Documents
INSERT INTO document (nom, type, chemin, taille, patient_id, dossier_id) VALUES
('Analyse_sang.pdf', 'Laboratoire', '/documents/analyses/1.pdf', 1048576, 1, 1),
('Radiographie.jpg', 'Imagerie', '/documents/imagerie/3.jpg', 2097152, 3, 3),
('Echographie.pdf', 'Imagerie', '/documents/imagerie/6.pdf', 3145728, 6, 6);

-- Insert Notifications
INSERT INTO notification (titre, message, type, destinataire_id, lu) VALUES
('Nouveau rendez-vous', 'M. Ahmed El Amrani a pris rendez-vous pour demain', 'INFO', 2, false),
('Paiement reçu', 'Paiement de la facture FAC-2024-001 reçu', 'SUCCESS', 1, true),
('Rendez-vous annulé', 'M. Yassin Chakir a annulé son rendez-vous', 'WARNING', 4, false),
('Rappel consultation', 'Consultation avec Dr. Karim Benjelloun dans 2 heures', 'INFO', 2, false);

-- Insert Password Reset Tokens (example)
INSERT INTO password_reset_token (token, utilisateur_id, expiry_date) VALUES
('reset_token_12345', 1, '2024-02-01 12:00:00'),
('reset_token_67890', 2, '2024-02-01 12:00:00');

-- ===========================================
-- CREATE INDEXES FOR PERFORMANCE
-- ===========================================

CREATE INDEX idx_utilisateurs_email ON utilisateurs(email);
CREATE INDEX idx_utilisateurs_role ON utilisateurs(role);
CREATE INDEX idx_patient_cin ON patient(cin);
CREATE INDEX idx_rendez_vous_date ON rendez_vous(date_rdv);
CREATE INDEX idx_rendez_vous_statut ON rendez_vous(statut);
CREATE INDEX idx_facture_numero ON facture(numero);
CREATE INDEX idx_facture_statut ON facture(statut_paiement);
CREATE INDEX idx_dossier_patient ON dossier_medical(patient_id);
CREATE INDEX idx_consultation_date ON consultation(date_consultation);
CREATE INDEX idx_notification_destinataire ON notification(destinataire_id);
CREATE INDEX idx_notification_lu ON notification(lu);

-- ===========================================
-- CREATE VIEWS FOR REPORTING
-- ===========================================

-- View for appointment summary
CREATE OR REPLACE VIEW vue_rendez_vous_resume AS
SELECT 
    r.id,
    p.nom || ' ' || p.prenom AS patient_nom,
    u.nom || ' ' || u.prenom AS medecin_nom,
    r.date_rdv,
    r.heure_rdv,
    r.statut,
    r.motif
FROM rendez_vous r
JOIN patient p ON r.patient_id = p.id
LEFT JOIN utilisateurs u ON r.medecin_id = u.id
WHERE u.role = 'MEDECIN';

-- View for patient medical history
CREATE OR REPLACE VIEW vue_historique_medical AS
SELECT 
    p.id AS patient_id,
    p.nom || ' ' || p.prenom AS patient_nom,
    d.diagnostic,
    d.traitement,
    d.date_creation AS date_dossier,
    u.nom || ' ' || u.prenom AS medecin_nom
FROM dossier_medical d
JOIN patient p ON d.patient_id = p.id
LEFT JOIN utilisateurs u ON d.medecin_id = u.id
ORDER BY d.date_creation DESC;

-- View for financial summary
CREATE OR REPLACE VIEW vue_resume_financier AS
SELECT 
    DATE_TRUNC('month', f.date_emission) AS mois,
    COUNT(*) AS nombre_factures,
    SUM(f.montant) AS total_montant,
    SUM(CASE WHEN f.statut_paiement = 'PAYE' THEN f.montant ELSE 0 END) AS montant_paye,
    SUM(CASE WHEN f.statut_paiement = 'EN_ATTENTE' THEN f.montant ELSE 0 END) AS montant_en_attente
FROM facture f
GROUP BY DATE_TRUNC('month', f.date_emission);

-- ===========================================
-- TRIGGERS FOR AUDIT
-- ===========================================

-- Triggers removed due to syntax compatibility issues

-- ===========================================
-- GRANT PERMISSIONS TO APPLICATION USER
-- ===========================================

-- Grant all privileges to cabinet_user on all tables
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO cabinet_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO cabinet_user;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO cabinet_user;

-- ===========================================
-- VERIFICATION QUERIES
-- ===========================================

-- Count records in each table
SELECT 'utilisateurs' AS table_name, COUNT(*) AS record_count FROM utilisateurs
UNION ALL
SELECT 'patient', COUNT(*) FROM patient
UNION ALL
SELECT 'rendez_vous', COUNT(*) FROM rendez_vous
UNION ALL
SELECT 'facture', COUNT(*) FROM facture
UNION ALL
SELECT 'dossier_medical', COUNT(*) FROM dossier_medical
UNION ALL
SELECT 'consultation', COUNT(*) FROM consultation
UNION ALL
SELECT 'ordonnance', COUNT(*) FROM ordonnance
ORDER BY table_name;