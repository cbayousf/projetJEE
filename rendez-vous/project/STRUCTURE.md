# Structure Complète du Projet

## 📁 Architecture Globale

```
gestion-cabinet-medical/
├── src/
│   └── main/
│       ├── java/com/cabinet/medical/
│       │   ├── config/
│       │   │   └── SecurityConfig.java
│       │   ├── controller/
│       │   │   ├── RendezVousController.java
│       │   │   ├── ConsultationController.java
│       │   │   ├── OrdonnanceController.java
│       │   │   ├── PatientController.java
│       │   │   └── MedecinController.java
│       │   ├── dto/
│       │   │   ├── RendezVousDTO.java
│       │   │   ├── ConsultationDTO.java
│       │   │   └── OrdonnanceDTO.java
│       │   ├── entity/
│       │   │   ├── Patient.java
│       │   │   ├── Medecin.java
│       │   │   ├── RendezVous.java
│       │   │   ├── Consultation.java
│       │   │   └── Ordonnance.java
│       │   ├── enums/
│       │   │   ├── StatutRendezVous.java
│       │   │   └── TypeOrdonnance.java
│       │   ├── repository/
│       │   │   ├── PatientRepository.java
│       │   │   ├── MedecinRepository.java
│       │   │   ├── RendezVousRepository.java
│       │   │   ├── ConsultationRepository.java
│       │   │   └── OrdonnanceRepository.java
│       │   ├── service/
│       │   │   ├── PatientService.java
│       │   │   ├── MedecinService.java
│       │   │   ├── RendezVousService.java
│       │   │   ├── ConsultationService.java
│       │   │   └── OrdonnanceService.java
│       │   └── MedicalManagementApplication.java
│       └── resources/
│           └── application.properties
├── frontend/
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── components/
│       │   ├── RendezVousModal.js
│       │   └── Modal.css
│       ├── pages/
│       │   ├── CalendrierPage.js
│       │   ├── CalendrierPage.css
│       │   ├── RendezVousListPage.js
│       │   ├── ConsultationListPage.js
│       │   ├── ConsultationFormPage.js
│       │   ├── OrdonnanceFormPage.js
│       │   ├── HistoriquePatientPage.js
│       │   ├── PatientsPage.js
│       │   └── MedecinsPage.js
│       ├── services/
│       │   └── api.js
│       ├── App.js
│       ├── App.css
│       ├── index.js
│       └── index.css
├── pom.xml
├── README.md
├── GUIDE_RAPIDE.md
├── STRUCTURE.md
├── data_test.sql
└── .gitignore
```

## 🎯 Description des Composants

### Backend

#### Configuration (`config/`)
- **SecurityConfig.java**: Configuration de Spring Security (désactivé pour le développement indépendant)

#### Controllers (`controller/`)
Gère les endpoints REST:
- **RendezVousController**: CRUD rendez-vous + confirmation/annulation
- **ConsultationController**: CRUD consultations
- **OrdonnanceController**: CRUD ordonnances + génération PDF
- **PatientController**: CRUD patients + recherche
- **MedecinController**: CRUD médecins

#### DTOs (`dto/`)
Objets de transfert de données:
- **RendezVousDTO**: Données simplifiées avec noms complets
- **ConsultationDTO**: Inclut les ordonnances associées
- **OrdonnanceDTO**: Informations d'ordonnance

#### Entities (`entity/`)
Entités JPA mappées à la base de données:
- **Patient**: Informations patient (stub pour indépendance)
- **Medecin**: Informations médecin (stub pour indépendance)
- **RendezVous**: Gestion des rendez-vous
- **Consultation**: Dossier de consultation
- **Ordonnance**: Prescriptions médicales

#### Enums (`enums/`)
- **StatutRendezVous**: EN_ATTENTE, CONFIRME, ANNULE, TERMINE
- **TypeOrdonnance**: MEDICAMENTS, EXAMENS_SUPPLEMENTAIRES

#### Repositories (`repository/`)
Interfaces JPA pour l'accès aux données:
- Méthodes de requête personnalisées
- Recherche par critères multiples
- Tri et filtrage

#### Services (`service/`)
Logique métier:
- Validation des données
- Conversions DTO ↔ Entity
- Génération de PDF (iText7)
- Gestion des relations entre entités

### Frontend

#### Components (`components/`)
Composants réutilisables:
- **RendezVousModal**: Modal de création/modification de rendez-vous
- **Modal.css**: Styles pour les modaux

#### Pages (`pages/`)
Pages de l'application:
1. **CalendrierPage**: Vue calendrier avec react-big-calendar
2. **RendezVousListPage**: Liste tabulaire des rendez-vous
3. **ConsultationListPage**: Liste des consultations
4. **ConsultationFormPage**: Formulaire détaillé de consultation
5. **OrdonnanceFormPage**: Générateur d'ordonnances
6. **HistoriquePatientPage**: Historique complet d'un patient
7. **PatientsPage**: Gestion CRUD des patients
8. **MedecinsPage**: Gestion CRUD des médecins

#### Services (`services/`)
- **api.js**: Configuration Axios + fonctions API pour tous les endpoints

## 📊 Modèle de Données

### Relations

```
Patient (1) ----< (*) RendezVous (*) >---- (1) Medecin
                           |
                           | (1)
                           |
                          (0..1)
                           |
                      Consultation
                           |
                           | (1)
                           |
                          (*)
                           |
                      Ordonnance
```

### Schéma Détaillé

#### patients
- **id**: BIGSERIAL PRIMARY KEY
- cin: VARCHAR(255) UNIQUE NOT NULL
- nom: VARCHAR(255) NOT NULL
- prenom: VARCHAR(255) NOT NULL
- date_naissance: DATE
- sexe: VARCHAR(1)
- num_tel: VARCHAR(20)
- email: VARCHAR(255)
- adresse: TEXT
- type_mutuelle: VARCHAR(100)

#### medecins
- **id**: BIGSERIAL PRIMARY KEY
- nom: VARCHAR(255) NOT NULL
- prenom: VARCHAR(255) NOT NULL
- specialite: VARCHAR(255)
- num_tel: VARCHAR(20)
- email: VARCHAR(255)
- signature: TEXT

#### rendez_vous
- **id**: BIGSERIAL PRIMARY KEY
- patient_id: BIGINT FK → patients(id) NOT NULL
- medecin_id: BIGINT FK → medecins(id) NOT NULL
- date_rdv: DATE NOT NULL
- heure_rdv: TIME NOT NULL
- motif: TEXT
- statut: VARCHAR(20) NOT NULL
- notes: TEXT
- date_creation: DATE

#### consultations
- **id**: BIGSERIAL PRIMARY KEY
- rendez_vous_id: BIGINT FK → rendez_vous(id)
- patient_id: BIGINT FK → patients(id) NOT NULL
- medecin_id: BIGINT FK → medecins(id) NOT NULL
- date_consultation: DATE NOT NULL
- examen_clinique: TEXT
- examen_supplementaire: TEXT
- diagnostic: TEXT
- traitement: TEXT
- observations: TEXT

#### ordonnances
- **id**: BIGSERIAL PRIMARY KEY
- consultation_id: BIGINT FK → consultations(id) NOT NULL
- date_ordonnance: DATE NOT NULL
- type: VARCHAR(50) NOT NULL
- contenu: TEXT
- signature: TEXT

## 🔄 Flux de Données

### Création d'un Rendez-vous
```
1. Frontend: RendezVousModal → formulaire
2. Validation: Patient + Médecin sélectionnés
3. POST /api/rendezvous
4. Backend: RendezVousController → RendezVousService
5. Création: RendezVousRepository.save()
6. Retour: RendezVousDTO
7. Frontend: Mise à jour du calendrier
```

### Création d'une Consultation avec Ordonnance
```
1. Frontend: ConsultationFormPage → saisie données
2. POST /api/consultations
3. Backend: ConsultationService.create()
4. Si rendez-vous lié: mise à jour statut → TERMINE
5. Retour: ConsultationDTO
6. Frontend: Redirection vers édition
7. Clic "Créer Ordonnance"
8. POST /api/ordonnances
9. Backend: OrdonnanceService.create() + generatePDF()
10. Retour: PDF en téléchargement automatique
```

## 🛠️ Technologies et Dépendances

### Backend Dependencies
```xml
<dependencies>
    <!-- Spring Boot Core -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-webmvc</artifactId>
    </dependency>

    <!-- Database -->
    <dependency>
        <groupId>org.postgresql</groupId>
        <artifactId>postgresql</artifactId>
    </dependency>

    <!-- PDF Generation -->
    <dependency>
        <groupId>com.itextpdf</groupId>
        <artifactId>itext7-core</artifactId>
        <version>7.2.5</version>
    </dependency>

    <!-- Utilities -->
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
    </dependency>
</dependencies>
```

### Frontend Dependencies
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-router-dom": "^6.20.1",
    "axios": "^1.6.2",
    "react-big-calendar": "^1.8.5",
    "moment": "^2.29.4",
    "react-toastify": "^9.1.3"
  }
}
```

## 📈 Évolutivité

### Extensions Possibles
1. **Authentification JWT**: Intégration avec module CHAYMAE
2. **Upload de documents**: Ajout de pièces jointes aux consultations
3. **Statistiques**: Graphiques et rapports
4. **Notifications**: Rappels de rendez-vous par email/SMS
5. **Téléconsultation**: Intégration vidéo
6. **Gestion des paiements**: Lien avec module KHADIJA

### Points d'Intégration
- **Module Admin (CHAYMAE)**: Auth, Cabinets, Spécialités
- **Module Patients (HASNAE)**: Dossiers médicaux complets
- **Module Facturation (KHADIJA)**: Génération factures depuis consultations
