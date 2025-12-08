# Documentation des API Endpoints

## Base URL
```
http://localhost:8080/api
```

## 🔍 Rendez-vous API

### 1. Lister tous les rendez-vous
```http
GET /rendezvous
```

**Réponse (200 OK):**
```json
[
  {
    "id": 1,
    "patientId": 1,
    "patientNom": "Benali",
    "patientPrenom": "Fatima",
    "medecinId": 1,
    "medecinNom": "Alami",
    "medecinPrenom": "Mohammed",
    "dateRdv": "2024-01-15",
    "heureRdv": "09:00:00",
    "motif": "Consultation de contrôle",
    "statut": "EN_ATTENTE",
    "notes": null
  }
]
```

### 2. Obtenir un rendez-vous par ID
```http
GET /rendezvous/{id}
```

### 3. Rendez-vous d'un patient
```http
GET /rendezvous/patient/{patientId}
```

### 4. Rendez-vous d'un médecin
```http
GET /rendezvous/medecin/{medecinId}
```

### 5. Rendez-vous par date
```http
GET /rendezvous/date/2024-01-15
```

### 6. Rendez-vous par plage de dates
```http
GET /rendezvous/range?startDate=2024-01-01&endDate=2024-01-31
```

### 7. Créer un rendez-vous
```http
POST /rendezvous
Content-Type: application/json

{
  "patientId": 1,
  "medecinId": 1,
  "dateRdv": "2024-01-15",
  "heureRdv": "09:00:00",
  "motif": "Consultation de contrôle",
  "notes": "Patient anxieux"
}
```

### 8. Modifier un rendez-vous
```http
PUT /rendezvous/{id}
Content-Type: application/json

{
  "dateRdv": "2024-01-16",
  "heureRdv": "10:00:00",
  "motif": "Consultation urgent",
  "statut": "CONFIRME"
}
```

### 9. Confirmer un rendez-vous
```http
PUT /rendezvous/{id}/confirmer
```

### 10. Annuler un rendez-vous
```http
PUT /rendezvous/{id}/annuler
```

### 11. Supprimer un rendez-vous
```http
DELETE /rendezvous/{id}
```

## 💊 Consultations API

### 1. Lister toutes les consultations
```http
GET /consultations
```

**Réponse (200 OK):**
```json
[
  {
    "id": 1,
    "rendezVousId": 1,
    "patientId": 1,
    "patientNom": "Benali",
    "patientPrenom": "Fatima",
    "medecinId": 1,
    "medecinNom": "Alami",
    "medecinPrenom": "Mohammed",
    "dateConsultation": "2024-01-15",
    "examenClinique": "Tension artérielle: 120/80",
    "examenSupplementaire": "Électrocardiogramme",
    "diagnostic": "Hypertension légère",
    "traitement": "Régime sans sel, activité physique",
    "observations": "Revoir dans 3 mois",
    "ordonnances": []
  }
]
```

### 2. Obtenir une consultation par ID
```http
GET /consultations/{id}
```

### 3. Consultations d'un patient
```http
GET /consultations/patient/{patientId}
```

### 4. Consultations d'un médecin
```http
GET /consultations/medecin/{medecinId}
```

### 5. Créer une consultation
```http
POST /consultations
Content-Type: application/json

{
  "patientId": 1,
  "medecinId": 1,
  "rendezVousId": 1,
  "dateConsultation": "2024-01-15",
  "examenClinique": "Tension artérielle: 120/80\nPouls: 72 bpm\nTempérature: 36.8°C",
  "examenSupplementaire": "ECG normal",
  "diagnostic": "Hypertension artérielle grade 1",
  "traitement": "Régime hyposodé\nActivité physique modérée 30min/jour",
  "observations": "Revoir dans 3 mois pour contrôle"
}
```

### 6. Modifier une consultation
```http
PUT /consultations/{id}
Content-Type: application/json

{
  "diagnostic": "Hypertension artérielle bien contrôlée",
  "traitement": "Poursuite du traitement actuel",
  "observations": "Excellent progrès"
}
```

### 7. Supprimer une consultation
```http
DELETE /consultations/{id}
```

## 📄 Ordonnances API

### 1. Lister toutes les ordonnances
```http
GET /ordonnances
```

**Réponse (200 OK):**
```json
[
  {
    "id": 1,
    "consultationId": 1,
    "dateOrdonnance": "2024-01-15",
    "type": "MEDICAMENTS",
    "contenu": "1. Paracétamol 500mg - 1cp x3/j - 7j\n2. Amoxicilline 1g - 1cp x2/j - 10j",
    "signature": "Dr. Mohammed Alami - Cardiologue"
  }
]
```

### 2. Obtenir une ordonnance par ID
```http
GET /ordonnances/{id}
```

### 3. Ordonnances d'une consultation
```http
GET /ordonnances/consultation/{consultationId}
```

### 4. Créer une ordonnance
```http
POST /ordonnances
Content-Type: application/json

{
  "consultationId": 1,
  "type": "MEDICAMENTS",
  "contenu": "1. Paracétamol 500mg - 1 comprimé 3 fois par jour pendant 7 jours\n2. Amoxicilline 1g - 1 comprimé 2 fois par jour pendant 10 jours\n3. Doliprane 1000mg - 1 comprimé si douleur (max 3/jour)"
}
```

**Types d'ordonnances:**
- `MEDICAMENTS`: Pour prescrire des médicaments
- `EXAMENS_SUPPLEMENTAIRES`: Pour prescrire des examens (radio, analyses, etc.)

### 5. Modifier une ordonnance
```http
PUT /ordonnances/{id}
Content-Type: application/json

{
  "contenu": "1. Paracétamol 500mg - 1cp x3/j - 10j\n2. Amoxicilline 1g - 1cp x2/j - 14j"
}
```

### 6. Télécharger le PDF d'une ordonnance
```http
GET /ordonnances/{id}/pdf
```

**Headers de réponse:**
```
Content-Type: application/pdf
Content-Disposition: attachment; filename="ordonnance_{id}.pdf"
```

### 7. Supprimer une ordonnance
```http
DELETE /ordonnances/{id}
```

## 👥 Patients API

### 1. Lister tous les patients
```http
GET /patients
```

**Réponse (200 OK):**
```json
[
  {
    "id": 1,
    "cin": "AB123456",
    "nom": "Benali",
    "prenom": "Fatima",
    "dateNaissance": "1985-05-15",
    "sexe": "F",
    "numTel": "0698765432",
    "email": "f.benali@example.com",
    "adresse": "25 Rue Hassan II, Casablanca",
    "typeMutuelle": "CNSS"
  }
]
```

### 2. Obtenir un patient par ID
```http
GET /patients/{id}
```

### 3. Rechercher des patients
```http
GET /patients/search?q=Benali
```

### 4. Créer un patient
```http
POST /patients
Content-Type: application/json

{
  "cin": "AB123456",
  "nom": "Benali",
  "prenom": "Fatima",
  "dateNaissance": "1985-05-15",
  "sexe": "F",
  "numTel": "0698765432",
  "email": "f.benali@example.com",
  "adresse": "25 Rue Hassan II, Casablanca",
  "typeMutuelle": "CNSS"
}
```

### 5. Modifier un patient
```http
PUT /patients/{id}
Content-Type: application/json

{
  "numTel": "0612345678",
  "email": "nouveau.email@example.com",
  "adresse": "Nouvelle adresse"
}
```

### 6. Supprimer un patient
```http
DELETE /patients/{id}
```

## 👨‍⚕️ Médecins API

### 1. Lister tous les médecins
```http
GET /medecins
```

**Réponse (200 OK):**
```json
[
  {
    "id": 1,
    "nom": "Alami",
    "prenom": "Mohammed",
    "specialite": "Cardiologue",
    "numTel": "0612345678",
    "email": "m.alami@example.com",
    "signature": "Dr. Mohammed Alami - Cardiologue"
  }
]
```

### 2. Obtenir un médecin par ID
```http
GET /medecins/{id}
```

### 3. Créer un médecin
```http
POST /medecins
Content-Type: application/json

{
  "nom": "Alami",
  "prenom": "Mohammed",
  "specialite": "Cardiologue",
  "numTel": "0612345678",
  "email": "m.alami@example.com",
  "signature": "Dr. Mohammed Alami - Cardiologue"
}
```

### 4. Modifier un médecin
```http
PUT /medecins/{id}
Content-Type: application/json

{
  "specialite": "Cardiologue et Médecin du sport",
  "numTel": "0623456789"
}
```

### 5. Supprimer un médecin
```http
DELETE /medecins/{id}
```

## 🚨 Codes de Réponse HTTP

| Code | Description |
|------|-------------|
| 200 | OK - Succès |
| 201 | Created - Ressource créée |
| 204 | No Content - Suppression réussie |
| 400 | Bad Request - Données invalides |
| 404 | Not Found - Ressource non trouvée |
| 500 | Internal Server Error - Erreur serveur |

## 📝 Format des Erreurs

```json
{
  "timestamp": "2024-01-15T10:30:00",
  "status": 404,
  "error": "Not Found",
  "message": "Rendez-vous non trouvé avec l'id: 999",
  "path": "/api/rendezvous/999"
}
```

## 🧪 Tester les APIs

### Avec cURL

```bash
# Lister les rendez-vous
curl http://localhost:8080/api/rendezvous

# Créer un patient
curl -X POST http://localhost:8080/api/patients \
  -H "Content-Type: application/json" \
  -d '{
    "cin": "AB123456",
    "nom": "Test",
    "prenom": "Patient",
    "sexe": "M"
  }'

# Télécharger une ordonnance PDF
curl http://localhost:8080/api/ordonnances/1/pdf \
  --output ordonnance.pdf
```

### Avec Postman

1. Importez les exemples ci-dessus
2. Créez une collection "Cabinet Médical"
3. Ajoutez les variables:
   - `base_url`: http://localhost:8080/api
4. Testez chaque endpoint

## 🔗 Flux Complet

### Scénario: Consultation complète

```bash
# 1. Créer un patient
POST /api/patients
{
  "cin": "AB123456",
  "nom": "Test",
  "prenom": "Patient",
  ...
}
# → Retourne patientId: 1

# 2. Créer un médecin
POST /api/medecins
{
  "nom": "Test",
  "prenom": "Medecin",
  ...
}
# → Retourne medecinId: 1

# 3. Créer un rendez-vous
POST /api/rendezvous
{
  "patientId": 1,
  "medecinId": 1,
  "dateRdv": "2024-01-15",
  "heureRdv": "09:00:00",
  ...
}
# → Retourne rendezVousId: 1

# 4. Confirmer le rendez-vous
PUT /api/rendezvous/1/confirmer

# 5. Créer une consultation
POST /api/consultations
{
  "patientId": 1,
  "medecinId": 1,
  "rendezVousId": 1,
  "diagnostic": "...",
  ...
}
# → Retourne consultationId: 1
# → Le rendez-vous passe automatiquement à TERMINE

# 6. Créer une ordonnance
POST /api/ordonnances
{
  "consultationId": 1,
  "type": "MEDICAMENTS",
  "contenu": "..."
}
# → Retourne ordonnanceId: 1

# 7. Télécharger le PDF
GET /api/ordonnances/1/pdf
```

## 💡 Conseils

1. **CORS**: Les endpoints sont configurés avec `@CrossOrigin(origins = "*")` pour le développement
2. **Format des dates**: Utilisez le format ISO 8601: `YYYY-MM-DD`
3. **Format des heures**: Utilisez le format `HH:mm:ss`
4. **Encodage**: Utilisez UTF-8 pour supporter les caractères arabes et français
5. **Tests**: Testez toujours les endpoints dans l'ordre du flux complet
