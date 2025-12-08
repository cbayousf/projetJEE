# Module Rendez-vous & Consultations - Cabinet Médical

Module complet de gestion des rendez-vous, consultations et ordonnances pour un système de gestion de cabinet médical.

## 📋 Table des Matières

1. [Fonctionnalités](#fonctionnalités)
2. [Architecture](#architecture)
3. [Prérequis](#prérequis)
4. [Installation](#installation)
5. [Configuration](#configuration)
6. [Exécution](#exécution)
7. [Utilisation](#utilisation)
8. [API Endpoints](#api-endpoints)
9. [Technologies Utilisées](#technologies-utilisées)

## 🎯 Fonctionnalités

### Backend (Spring Boot)
- ✅ Gestion complète des rendez-vous (CRUD)
- ✅ Calendrier interactif des rendez-vous
- ✅ Gestion des consultations médicales
- ✅ Génération d'ordonnances (2 types: médicaments et examens)
- ✅ Export PDF des ordonnances avec signature
- ✅ Historique des consultations par patient
- ✅ Gestion des patients (module stub pour indépendance)
- ✅ Gestion des médecins (module stub pour indépendance)
- ✅ API REST complète avec ~25 endpoints

### Frontend (React)
- ✅ Calendrier interactif pour visualiser les rendez-vous
- ✅ Création et modification de rendez-vous
- ✅ Gestion du statut des rendez-vous (En attente, Confirmé, Annulé, Terminé)
- ✅ Formulaires de consultation détaillés
- ✅ Générateur d'ordonnances avec export PDF
- ✅ Historique complet des consultations par patient
- ✅ Interface moderne et responsive
- ✅ 8 pages principales

## 🏗️ Architecture

### Backend
```
src/main/java/com/cabinet/medical/
├── config/          # Configuration Spring Security
├── controller/      # Controllers REST
├── dto/             # Data Transfer Objects
├── entity/          # Entités JPA
├── enums/           # Énumérations
├── repository/      # Repositories JPA
└── service/         # Services métier
```

### Frontend
```
frontend/src/
├── components/      # Composants réutilisables
├── pages/           # Pages de l'application
├── services/        # Services API
└── utils/           # Utilitaires
```

## 📦 Prérequis

Avant de commencer, assurez-vous d'avoir installé:

- **Java 17** ou supérieur
- **Maven 3.6+**
- **PostgreSQL 12+**
- **Node.js 16+** et **npm 8+**
- Un IDE (IntelliJ IDEA, Eclipse, VS Code)

## 🚀 Installation

### 1. Installation de PostgreSQL

#### Sur Windows:
1. Téléchargez PostgreSQL depuis https://www.postgresql.org/download/windows/
2. Exécutez l'installateur
3. Pendant l'installation, notez le mot de passe pour l'utilisateur `postgres`
4. Le port par défaut est 5432

#### Sur macOS:
```bash
brew install postgresql
brew services start postgresql
```

#### Sur Linux (Ubuntu/Debian):
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

### 2. Création de la Base de Données

Ouvrez un terminal et connectez-vous à PostgreSQL:

```bash
# Sur Windows (via le terminal PostgreSQL)
psql -U postgres

# Sur macOS/Linux
sudo -u postgres psql
```

Créez la base de données:

```sql
CREATE DATABASE cabinet_medical_db;

-- Vérifiez que la base est créée
\l

-- Quittez psql
\q
```

### 3. Configuration du Backend

1. Clonez ou téléchargez le projet
2. Ouvrez le fichier `src/main/resources/application.properties`
3. Modifiez les paramètres de connexion si nécessaire:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/cabinet_medical_db
spring.datasource.username=postgres
spring.datasource.password=VOTRE_MOT_DE_PASSE
```

### 4. Installation des Dépendances

#### Backend:
```bash
# Dans le répertoire racine du projet
./mvnw clean install

# Ou sur Windows
mvnw.cmd clean install
```

#### Frontend:
```bash
# Dans le répertoire frontend
cd frontend
npm install
```

## ⚙️ Configuration

### Configuration du Backend

Le fichier `application.properties` contient toutes les configurations:

```properties
# Application
spring.application.name=medical-management

# Database
spring.datasource.url=jdbc:postgresql://localhost:5432/cabinet_medical_db
spring.datasource.username=postgres
spring.datasource.password=postgres
spring.datasource.driver-class-name=org.postgresql.Driver

# JPA/Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

# Server
server.port=8080

# File Upload
spring.servlet.multipart.max-file-size=10MB
spring.servlet.multipart.max-request-size=10MB
```

### Configuration du Frontend

Le fichier `package.json` contient la configuration du proxy:

```json
"proxy": "http://localhost:8080"
```

## ▶️ Exécution

### 1. Démarrer le Backend

#### Option A: Via Maven
```bash
# Dans le répertoire racine
./mvnw spring-boot:run

# Ou sur Windows
mvnw.cmd spring-boot:run
```

#### Option B: Via IDE
1. Ouvrez le projet dans votre IDE
2. Localisez la classe `MedicalManagementApplication.java`
3. Cliquez droit → Run

Le backend démarre sur http://localhost:8080

Vous devriez voir dans la console:
```
✅ Connexion à PostgreSQL réussie!
Database: cabinet_medical_db
```

### 2. Démarrer le Frontend

```bash
# Dans le répertoire frontend
cd frontend
npm start
```

Le frontend démarre sur http://localhost:3000

L'application s'ouvrira automatiquement dans votre navigateur.

## 📖 Utilisation

### 1. Données de Test

Pour commencer, vous devez d'abord créer des données de test:

1. **Créer des Médecins:**
   - Allez sur "Médecins" dans le menu
   - Cliquez sur "Nouveau Médecin"
   - Remplissez le formulaire (nom, prénom, spécialité, etc.)

2. **Créer des Patients:**
   - Allez sur "Patients" dans le menu
   - Cliquez sur "Nouveau Patient"
   - Remplissez le formulaire (CIN, nom, prénom, etc.)

### 2. Gestion des Rendez-vous

#### Via le Calendrier:
1. Allez sur la page "Calendrier"
2. Cliquez sur une date/heure pour créer un rendez-vous
3. Sélectionnez un patient et un médecin
4. Remplissez le motif et les notes
5. Enregistrez

#### Actions disponibles:
- **Confirmer**: Change le statut en "Confirmé"
- **Annuler RDV**: Change le statut en "Annulé"
- **Modifier**: Modifie les détails du rendez-vous
- **Supprimer**: Supprime le rendez-vous

### 3. Gestion des Consultations

1. Allez sur "Consultations"
2. Cliquez sur "Nouvelle Consultation"
3. Sélectionnez un patient et un médecin
4. Remplissez les champs:
   - Examen clinique
   - Examens supplémentaires
   - Diagnostic
   - Traitement prescrit
   - Observations
5. Enregistrez

### 4. Génération d'Ordonnances

1. Ouvrez une consultation existante
2. Cliquez sur "Créer une Ordonnance"
3. Choisissez le type:
   - **Médicaments**: Pour prescrire des médicaments
   - **Examens supplémentaires**: Pour prescrire des examens
4. Remplissez le contenu
5. Cliquez sur "Créer et Télécharger PDF"

Le PDF est généré automatiquement avec:
- En-tête du médecin
- Informations du patient
- Type d'ordonnance
- Prescription détaillée
- Signature du médecin

### 5. Historique des Consultations

Pour voir l'historique complet d'un patient:
1. Allez sur "Patients"
2. Cliquez sur "Historique" pour un patient
3. Consultez toutes ses consultations passées

## 🔌 API Endpoints

### Rendez-vous

```
GET    /api/rendezvous                    # Liste tous les rendez-vous
GET    /api/rendezvous/{id}               # Détails d'un rendez-vous
GET    /api/rendezvous/patient/{id}       # Rendez-vous d'un patient
GET    /api/rendezvous/medecin/{id}       # Rendez-vous d'un médecin
GET    /api/rendezvous/date/{date}        # Rendez-vous par date
GET    /api/rendezvous/range?startDate=&endDate=  # Plage de dates
POST   /api/rendezvous                    # Créer un rendez-vous
PUT    /api/rendezvous/{id}               # Modifier un rendez-vous
PUT    /api/rendezvous/{id}/confirmer     # Confirmer un rendez-vous
PUT    /api/rendezvous/{id}/annuler       # Annuler un rendez-vous
DELETE /api/rendezvous/{id}               # Supprimer un rendez-vous
```

### Consultations

```
GET    /api/consultations                 # Liste toutes les consultations
GET    /api/consultations/{id}            # Détails d'une consultation
GET    /api/consultations/patient/{id}    # Consultations d'un patient
GET    /api/consultations/medecin/{id}    # Consultations d'un médecin
POST   /api/consultations                 # Créer une consultation
PUT    /api/consultations/{id}            # Modifier une consultation
DELETE /api/consultations/{id}            # Supprimer une consultation
```

### Ordonnances

```
GET    /api/ordonnances                   # Liste toutes les ordonnances
GET    /api/ordonnances/{id}              # Détails d'une ordonnance
GET    /api/ordonnances/consultation/{id} # Ordonnances d'une consultation
GET    /api/ordonnances/{id}/pdf          # Télécharger le PDF
POST   /api/ordonnances                   # Créer une ordonnance
PUT    /api/ordonnances/{id}              # Modifier une ordonnance
DELETE /api/ordonnances/{id}              # Supprimer une ordonnance
```

### Patients

```
GET    /api/patients                      # Liste tous les patients
GET    /api/patients/{id}                 # Détails d'un patient
GET    /api/patients/search?q=            # Rechercher des patients
POST   /api/patients                      # Créer un patient
PUT    /api/patients/{id}                 # Modifier un patient
DELETE /api/patients/{id}                 # Supprimer un patient
```

### Médecins

```
GET    /api/medecins                      # Liste tous les médecins
GET    /api/medecins/{id}                 # Détails d'un médecin
POST   /api/medecins                      # Créer un médecin
PUT    /api/medecins/{id}                 # Modifier un médecin
DELETE /api/medecins/{id}                 # Supprimer un médecin
```

## 🛠️ Technologies Utilisées

### Backend
- **Spring Boot 4.0.0**
- **Spring Data JPA** - Persistence des données
- **PostgreSQL** - Base de données
- **iText 7** - Génération de PDF
- **Lombok** - Réduction du code boilerplate
- **Maven** - Gestion des dépendances

### Frontend
- **React 18** - Framework UI
- **React Router DOM** - Navigation
- **React Big Calendar** - Calendrier interactif
- **Axios** - Requêtes HTTP
- **React Toastify** - Notifications
- **Moment.js** - Gestion des dates

## 🔧 Résolution des Problèmes

### Backend ne démarre pas

**Erreur de connexion PostgreSQL:**
```
org.postgresql.util.PSQLException: Connection refused
```

Solution:
1. Vérifiez que PostgreSQL est démarré
2. Vérifiez les paramètres de connexion dans `application.properties`
3. Vérifiez que la base `cabinet_medical_db` existe

**Port 8080 déjà utilisé:**
```
Port 8080 is already in use
```

Solution: Changez le port dans `application.properties`:
```properties
server.port=8081
```

### Frontend ne démarre pas

**Erreur de dépendances:**
```
npm ERR! Cannot find module
```

Solution:
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

**Erreur CORS:**

Solution: Vérifiez que le backend est démarré et que le proxy est configuré dans `package.json`

### Problèmes de Base de Données

**Tables non créées:**

Solution: Vérifiez que `spring.jpa.hibernate.ddl-auto=update` est dans `application.properties`

**Données non enregistrées:**

Solution: Vérifiez les logs du backend pour voir les erreurs SQL

## 📝 Structure de la Base de Données

### Tables principales:

**patients**
- id, cin, nom, prenom, date_naissance, sexe, num_tel, email, adresse, type_mutuelle

**medecins**
- id, nom, prenom, specialite, num_tel, email, signature

**rendez_vous**
- id, patient_id, medecin_id, date_rdv, heure_rdv, motif, statut, notes, date_creation

**consultations**
- id, rendez_vous_id, patient_id, medecin_id, date_consultation, examen_clinique, examen_supplementaire, diagnostic, traitement, observations

**ordonnances**
- id, consultation_id, date_ordonnance, type, contenu, signature

## 👥 Auteur

**DOUAE** - Module Rendez-vous & Consultations

## 📄 Licence

Ce projet est développé dans le cadre d'un projet académique.

## 🤝 Intégration avec d'autres Modules

Ce module est conçu pour être **indépendant** mais s'intègre facilement avec les autres modules du projet:

- **Module CHAYMAE (Admin)**: Pour l'authentification et la gestion des utilisateurs
- **Module HASNAE (Patients)**: Pour une gestion complète des dossiers médicaux
- **Module KHADIJA (Facturation)**: Pour la génération de factures basées sur les consultations

Pour l'intégration complète, remplacez les entités `Patient` et `Medecin` par celles des modules correspondants.
