# Guide Complet - Module RENDEZ-VOUS & CONSULTATIONS

## Table des Matieres

1. [Vue d'ensemble](#vue-densemble)
2. [Architecture Backend](#architecture-backend)
3. [Architecture Frontend](#architecture-frontend)
4. [Installation et Configuration](#installation-et-configuration)
5. [Guide d'utilisation des API](#guide-dutilisation-des-api)
6. [Guide Frontend](#guide-frontend)
7. [Base de donnees](#base-de-donnees)
8. [Tests](#tests)

---

## Vue d'ensemble

Le Module RENDEZ-VOUS & CONSULTATIONS permet de gerer:
- La planification des rendez-vous medicaux
- Les consultations medicales completes
- La generation d'ordonnances (medicaments et examens)
- L'historique complet des consultations par patient

### Fonctionnalites principales

1. Gestion des Rendez-vous
   - Creation, modification, suppression
   - Gestion des statuts (EN_ATTENTE, CONFIRME, ANNULE, TERMINE)
   - Filtrage par date, medecin, patient, statut
   - Calendrier interactif

2. Gestion des Consultations
   - Creation de consultations detaillees
   - Examen clinique et supplementaire
   - Diagnostic et traitement
   - Observations medicales
   - Lien avec le dossier medical

3. Gestion des Ordonnances
   - 2 types: MEDICAMENTS et EXAMENS_SUPPLEMENTAIRES
   - Liste de medicaments avec posologie
   - Liste d'examens a effectuer
   - Signature automatique du medecin
   - Generation PDF (a implementer)

---

## Architecture Backend

### Structure des packages

```
com.cabinet.medical.rendezvous/
├── controller/
│   ├── RendezVousController.java
│   ├── ConsultationController.java
│   └── OrdonnanceController.java
├── dto/
│   ├── RendezVousDTO.java
│   ├── ConsultationDTO.java
│   └── OrdonnanceDTO.java
├── entity/
│   ├── RendezVous.java
│   ├── Consultation.java
│   ├── Ordonnance.java
│   ├── StatutEnum.java
│   └── TypeOrdonnanceEnum.java
├── repository/
│   ├── RendezVousRepository.java
│   ├── ConsultationRepository.java
│   └── OrdonnanceRepository.java
└── service/
    ├── RendezVousService.java
    ├── ConsultationService.java
    └── OrdonnanceService.java
```

### Entites principales

#### 1. RendezVous

```java
Attributs:
- idRendezVous: Long (PK)
- dateRdv: LocalDate
- heureRdv: LocalTime
- motif: String
- statut: StatutEnum (EN_ATTENTE, CONFIRME, ANNULE, TERMINE)
- notes: String
- patientId: Long (FK)
- medecinId: Long (FK)
- cabinetId: Long (FK)
- dateCreation: LocalDate

Relations:
- Patient (Many-to-One)
- Medecin (Many-to-One)
- Cabinet (Many-to-One)
- Consultation (One-to-One)
```

#### 2. Consultation

```java
Attributs:
- idConsultation: Long (PK)
- type: String
- dateConsultation: LocalDate
- examenClinique: String (2000 chars)
- examenSupplementaire: String (2000 chars)
- diagnostic: String (2000 chars)
- traitement: String (2000 chars)
- observations: String (2000 chars)
- rendezVousId: Long (FK)
- patientId: Long (FK)
- medecinId: Long (FK)
- dossierMedicalId: Long (FK)

Relations:
- RendezVous (Many-to-One)
- Patient (Many-to-One)
- Medecin (Many-to-One)
- DossierMedical (Many-to-One)
- Ordonnance (One-to-One)
```

#### 3. Ordonnance

```java
Attributs:
- idOrdonnance: Long (PK)
- dateOrdonnance: LocalDate
- type: TypeOrdonnanceEnum (MEDICAMENTS, EXAMENS_SUPPLEMENTAIRES)
- medicaments: List<String>
- examens: List<String>
- signature: String
- consultationId: Long (FK)
- patientId: Long (FK)
- medecinId: Long (FK)
- nomMedecin: String
- specialiteMedecin: String

Relations:
- Consultation (Many-to-One)
- Patient (Many-to-One)
- Medecin (Many-to-One)
```

---

## Architecture Frontend

### Structure des composants

```
src/
├── components/
│   ├── rendezvous/
│   │   ├── RendezVousList.jsx
│   │   ├── RendezVousList.css
│   │   ├── RendezVousForm.jsx
│   │   └── RendezVousForm.css
│   └── consultations/
│       ├── ConsultationForm.jsx
│       └── ConsultationForm.css
└── services/
    ├── rendezVousService.js
    ├── consultationService.js
    └── ordonnanceService.js
```

### Composants React

1. **RendezVousList** - Liste des rendez-vous avec filtres et recherche
2. **RendezVousForm** - Formulaire de creation de rendez-vous
3. **ConsultationForm** - Formulaire de consultation avec ordonnance integree

---

## Installation et Configuration

### Prerequisites

- Java 21+
- Node.js 18+
- PostgreSQL 14+
- Maven 3.9+
- npm ou yarn

### Etape 1: Configuration Backend

1. Verifier la configuration PostgreSQL dans `application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/cabinet_medical
spring.datasource.username=postgres
spring.datasource.password=medical123
spring.jpa.hibernate.ddl-auto=none
```

2. Creer les tables dans PostgreSQL:

```sql
-- Table rendez_vous
CREATE TABLE rendez_vous (
    id_rendezvous SERIAL PRIMARY KEY,
    date_rdv DATE NOT NULL,
    heure_rdv TIME NOT NULL,
    motif VARCHAR(500) NOT NULL,
    statut VARCHAR(50) NOT NULL,
    notes VARCHAR(1000),
    patient_id BIGINT NOT NULL,
    medecin_id BIGINT NOT NULL,
    cabinet_id BIGINT,
    date_creation DATE NOT NULL
);

-- Table consultations
CREATE TABLE consultations (
    id_consultation SERIAL PRIMARY KEY,
    type VARCHAR(100),
    date_consultation DATE NOT NULL,
    examen_clinique VARCHAR(2000),
    examen_supplementaire VARCHAR(2000),
    diagnostic VARCHAR(2000),
    traitement VARCHAR(2000),
    observations VARCHAR(2000),
    rendezvous_id BIGINT,
    patient_id BIGINT NOT NULL,
    medecin_id BIGINT NOT NULL,
    dossier_medical_id BIGINT,
    FOREIGN KEY (rendezvous_id) REFERENCES rendez_vous(id_rendezvous)
);

-- Table ordonnances
CREATE TABLE ordonnances (
    id_ordonnance SERIAL PRIMARY KEY,
    date_ordonnance DATE NOT NULL,
    type VARCHAR(50) NOT NULL,
    signature VARCHAR(1000),
    consultation_id BIGINT NOT NULL,
    patient_id BIGINT NOT NULL,
    medecin_id BIGINT NOT NULL,
    nom_medecin VARCHAR(200),
    specialite_medecin VARCHAR(100),
    FOREIGN KEY (consultation_id) REFERENCES consultations(id_consultation)
);

-- Table ordonnance_medicaments
CREATE TABLE ordonnance_medicaments (
    ordonnance_id BIGINT NOT NULL,
    medicament VARCHAR(500),
    FOREIGN KEY (ordonnance_id) REFERENCES ordonnances(id_ordonnance)
);

-- Table ordonnance_examens
CREATE TABLE ordonnance_examens (
    ordonnance_id BIGINT NOT NULL,
    examen VARCHAR(500),
    FOREIGN KEY (ordonnance_id) REFERENCES ordonnances(id_ordonnance)
);
```

3. Compiler le projet:

```bash
cd /tmp/cc-agent/61367007/project
./mvnw clean install
```

4. Lancer le backend:

```bash
./mvnw spring-boot:run
```

Le serveur demarre sur `http://localhost:8080`

### Etape 2: Configuration Frontend

1. Installer les dependances:

```bash
cd frontend-facturation
npm install
```

2. Lancer le frontend:

```bash
npm start
```

L'application demarre sur `http://localhost:3000`

---

## Guide d'utilisation des API

### Endpoints Rendez-vous

#### 1. Creer un rendez-vous

```http
POST /api/rendezvous
Content-Type: application/json

{
  "dateRdv": "2025-01-15",
  "heureRdv": "10:30",
  "motif": "Consultation generale",
  "notes": "Premier rendez-vous",
  "patientId": 1,
  "medecinId": 1,
  "cabinetId": 1
}
```

#### 2. Lister tous les rendez-vous

```http
GET /api/rendezvous
```

#### 3. Obtenir les RDV par statut

```http
GET /api/rendezvous/statut/EN_ATTENTE
GET /api/rendezvous/statut/CONFIRME
GET /api/rendezvous/statut/TERMINE
GET /api/rendezvous/statut/ANNULE
```

#### 4. Obtenir les RDV par medecin et date

```http
GET /api/rendezvous/medecin/1/date/2025-01-15
```

#### 5. Mettre a jour le statut

```http
PATCH /api/rendezvous/1/statut?statut=CONFIRME
```

#### 6. Supprimer un rendez-vous

```http
DELETE /api/rendezvous/1
```

### Endpoints Consultations

#### 1. Creer une consultation

```http
POST /api/consultations
Content-Type: application/json

{
  "type": "Consultation generale",
  "examenClinique": "Tension arterielle normale, auscultation pulmonaire claire",
  "examenSupplementaire": "Prise de sang a prevoir",
  "diagnostic": "Grippe saisonniere",
  "traitement": "Repos et hydratation",
  "observations": "Revoir dans 7 jours",
  "rendezVousId": 1,
  "patientId": 1,
  "medecinId": 1
}
```

#### 2. Obtenir les consultations par patient

```http
GET /api/consultations/patient/1
```

#### 3. Obtenir la consultation liee a un RDV

```http
GET /api/consultations/rendezvous/1
```

### Endpoints Ordonnances

#### 1. Creer une ordonnance de medicaments

```http
POST /api/ordonnances
Content-Type: application/json

{
  "type": "MEDICAMENTS",
  "medicaments": [
    "Paracetamol 500mg - 3x par jour pendant 5 jours",
    "Ibuprofene 400mg - 2x par jour si douleur"
  ],
  "examens": [],
  "consultationId": 1,
  "patientId": 1,
  "medecinId": 1,
  "nomMedecin": "Dr. Dupont",
  "specialiteMedecin": "Medecine generale"
}
```

#### 2. Creer une ordonnance d'examens

```http
POST /api/ordonnances
Content-Type: application/json

{
  "type": "EXAMENS_SUPPLEMENTAIRES",
  "medicaments": [],
  "examens": [
    "Prise de sang complete",
    "Radiographie thoracique",
    "ECG"
  ],
  "consultationId": 1,
  "patientId": 1,
  "medecinId": 1,
  "nomMedecin": "Dr. Dupont",
  "specialiteMedecin": "Cardiologie"
}
```

#### 3. Obtenir les ordonnances par patient

```http
GET /api/ordonnances/patient/1
```

---

## Guide Frontend

### Navigation

L'application comprend les pages suivantes:

1. **/rendezvous** - Liste des rendez-vous
2. **/rendezvous/nouveau** - Creer un rendez-vous
3. **/consultations/nouveau** - Creer une consultation
4. **/factures** - Gestion des factures
5. **/statistiques** - Statistiques globales
6. **/notifications** - Centre de notifications

### Utilisation

#### Creer un rendez-vous

1. Cliquer sur "Nouveau RDV"
2. Remplir les informations:
   - Date et heure
   - ID du patient
   - ID du medecin
   - Motif de la visite
   - Notes (optionnel)
3. Cliquer sur "Creer Rendez-vous"

#### Gerer les rendez-vous

- **Filtrer** par statut (Tous, En attente, Confirmes, Termines)
- **Rechercher** par ID de rendez-vous ou patient
- **Confirmer** un rendez-vous en attente
- **Terminer** un rendez-vous confirme
- **Supprimer** un rendez-vous

#### Creer une consultation

1. Depuis la page "/consultations/nouveau"
2. Remplir les informations de base:
   - ID patient et medecin
   - Type de consultation
   - Lien avec un rendez-vous (optionnel)
3. Completer les details:
   - Examen clinique
   - Examen supplementaire
   - Diagnostic
   - Traitement
   - Observations
4. Option: Cocher "Creer une ordonnance"
   - Choisir le type (Medicaments ou Examens)
   - Ajouter les elements necessaires
5. Cliquer sur "Creer Consultation"

---

## Base de donnees

### Schema complet

```sql
-- Enums PostgreSQL
CREATE TYPE statut_rdv AS ENUM ('EN_ATTENTE', 'CONFIRME', 'ANNULE', 'TERMINE');
CREATE TYPE type_ordonnance AS ENUM ('MEDICAMENTS', 'EXAMENS_SUPPLEMENTAIRES');

-- Index pour performances
CREATE INDEX idx_rdv_patient ON rendez_vous(patient_id);
CREATE INDEX idx_rdv_medecin ON rendez_vous(medecin_id);
CREATE INDEX idx_rdv_date ON rendez_vous(date_rdv);
CREATE INDEX idx_rdv_statut ON rendez_vous(statut);

CREATE INDEX idx_consultation_patient ON consultations(patient_id);
CREATE INDEX idx_consultation_medecin ON consultations(medecin_id);
CREATE INDEX idx_consultation_date ON consultations(date_consultation);

CREATE INDEX idx_ordonnance_consultation ON ordonnances(consultation_id);
CREATE INDEX idx_ordonnance_patient ON ordonnances(patient_id);
```

### Relations entre tables

```
rendez_vous
    └─> consultations (1:1)
            └─> ordonnances (1:1)
```

---

## Tests

### Tests Backend (JUnit)

Exemple de test pour RendezVousService:

```java
@SpringBootTest
public class RendezVousServiceTest {

    @Autowired
    private RendezVousService rendezVousService;

    @Test
    public void testCreateRendezVous() {
        RendezVousDTO dto = new RendezVousDTO();
        dto.setDateRdv(LocalDate.now().plusDays(1));
        dto.setHeureRdv(LocalTime.of(10, 30));
        dto.setMotif("Test");
        dto.setPatientId(1L);
        dto.setMedecinId(1L);

        RendezVousDTO created = rendezVousService.createRendezVous(dto);

        assertNotNull(created.getIdRendezVous());
        assertEquals(StatutEnum.EN_ATTENTE, created.getStatut());
    }
}
```

### Tests des API (Postman)

Importer la collection Postman fournie dans `/postman/rendezvous-consultations.json`

### Tests Frontend (React Testing Library)

```javascript
import { render, screen } from '@testing-library/react';
import RendezVousList from './RendezVousList';

test('renders rendez-vous list', () => {
  render(<RendezVousList />);
  const titleElement = screen.getByText(/Gestion des Rendez-vous/i);
  expect(titleElement).toBeInTheDocument();
});
```

---

## Ameliorations futures

1. Generation PDF des ordonnances
2. Envoi par email des ordonnances
3. Signature electronique
4. Calendrier interactif (FullCalendar)
5. Rappels automatiques par SMS/Email
6. Disponibilites des medecins
7. Gestion des salles de consultation
8. Statistiques avancees par medecin
9. Export des consultations en PDF
10. Integration avec le dossier medical

---

## Support et Contact

Pour toute question ou probleme:
- Email: support@cabinet-medical.com
- Documentation: http://docs.cabinet-medical.com
- Issues GitHub: http://github.com/cabinet-medical/issues

---

## Licence

Copyright 2025 Cabinet Medical Management System
All rights reserved.
