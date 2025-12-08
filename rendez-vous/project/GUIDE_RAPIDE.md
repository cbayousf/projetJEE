# Guide Rapide de Démarrage

Ce guide vous permettra de démarrer rapidement le projet.

## 🚀 Installation en 5 Minutes

### 1. Prérequis

Vérifiez que vous avez:
- ✅ Java 17+: `java -version`
- ✅ PostgreSQL installé et démarré
- ✅ Node.js 16+: `node -v`

### 2. Base de Données

```bash
# Créez la base de données
psql -U postgres
CREATE DATABASE cabinet_medical_db;
\q
```

### 3. Configuration

Modifiez le mot de passe PostgreSQL dans:
`src/main/resources/application.properties`

```properties
spring.datasource.password=VOTRE_MOT_DE_PASSE
```

### 4. Backend

```bash
# Terminal 1 - Dans le répertoire racine
./mvnw spring-boot:run
```

Attendez de voir: `✅ Connexion à PostgreSQL réussie!`

### 5. Frontend

```bash
# Terminal 2 - Dans le répertoire frontend
cd frontend
npm install
npm start
```

### 6. Accès

Ouvrez votre navigateur:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080/api

## 📝 Premiers Pas

### Étape 1: Créer un Médecin

1. Allez sur "Médecins"
2. Cliquez "Nouveau Médecin"
3. Exemple:
   - Nom: Alami
   - Prénom: Mohammed
   - Spécialité: Cardiologue
   - Téléphone: 0612345678
   - Email: m.alami@example.com
   - Signature: Dr. Mohammed Alami

### Étape 2: Créer un Patient

1. Allez sur "Patients"
2. Cliquez "Nouveau Patient"
3. Exemple:
   - CIN: AB123456
   - Nom: Benali
   - Prénom: Fatima
   - Date de naissance: 1985-05-15
   - Sexe: F
   - Téléphone: 0698765432
   - Email: f.benali@example.com

### Étape 3: Créer un Rendez-vous

1. Allez sur "Calendrier"
2. Cliquez sur une date
3. Sélectionnez le patient et le médecin
4. Motif: "Consultation de contrôle"

### Étape 4: Créer une Consultation

1. Allez sur "Consultations"
2. Cliquez "Nouvelle Consultation"
3. Remplissez les informations médicales
4. Enregistrez

### Étape 5: Générer une Ordonnance

1. Ouvrez la consultation
2. Cliquez "Créer une Ordonnance"
3. Type: Médicaments
4. Contenu exemple:
```
1. Paracétamol 500mg - 1 comprimé 3 fois par jour - 7 jours
2. Amoxicilline 1g - 1 comprimé 2 fois par jour - 10 jours
```
5. Le PDF est téléchargé automatiquement!

## 🔧 Commandes Utiles

### Backend

```bash
# Compiler
./mvnw clean install

# Démarrer
./mvnw spring-boot:run

# Tests
./mvnw test
```

### Frontend

```bash
# Installer les dépendances
npm install

# Démarrer en mode développement
npm start

# Build pour production
npm run build
```

### PostgreSQL

```bash
# Démarrer PostgreSQL (Linux/Mac)
sudo systemctl start postgresql
# ou
brew services start postgresql

# Se connecter
psql -U postgres -d cabinet_medical_db

# Voir les tables
\dt

# Quitter
\q
```

## 🆘 Aide Rapide

### Le backend ne démarre pas?

```bash
# Vérifiez PostgreSQL
psql -U postgres -c "SELECT version();"

# Vérifiez le port 8080
netstat -ano | findstr 8080  # Windows
lsof -i :8080                # Mac/Linux
```

### Le frontend ne se connecte pas?

1. Vérifiez que le backend est démarré (http://localhost:8080/api/patients)
2. Vérifiez le proxy dans `frontend/package.json`
3. Redémarrez le frontend

### Erreur de base de données?

```sql
-- Vérifiez la connexion
psql -U postgres

-- Recréez la base si nécessaire
DROP DATABASE IF EXISTS cabinet_medical_db;
CREATE DATABASE cabinet_medical_db;
```

## 📞 Support

Pour toute question, consultez le `README.md` complet pour plus de détails.

Bon développement ! 🎉
