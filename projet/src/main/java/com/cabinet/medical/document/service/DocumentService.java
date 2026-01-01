package com.cabinet.medical.document.service;

import com.cabinet.medical.document.dto.DocumentDTO;
import com.cabinet.medical.document.entity.Document;
import com.cabinet.medical.document.repository.DocumentRepository;
import com.cabinet.medical.patient.repository.PatientRepository;
import com.cabinet.medical.dossier.repository.DossierMedicalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class DocumentService {

    private final DocumentRepository documentRepository;
    private final PatientRepository patientRepository;
    private final DossierMedicalRepository dossierMedicalRepository;
    
    private static final String UPLOAD_DIR = "uploads/documents/";

    public DocumentDTO uploadDocument(Long patientId, MultipartFile file, 
                                     String description, String uploadePar) {
        try {
            // Créer le répertoire si nécessaire
            Path uploadPath = Paths.get(UPLOAD_DIR);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // Générer nom de fichier unique
            String originalFilename = file.getOriginalFilename();
            String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            String uniqueFilename = UUID.randomUUID().toString() + extension;
            
            // Sauvegarder le fichier
            Path filePath = uploadPath.resolve(uniqueFilename);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            // Créer l'entité Document
            Document document = Document.builder()
                    .nomFichier(originalFilename)
                    .typeFichier(file.getContentType())
                    .cheminFichier(filePath.toString())
                    .tailleFichier(file.getSize())
                    .description(description)
                    .patientId(patientId)
                    .uploadePar(uploadePar)
                    .dateUpload(LocalDateTime.now())
                    .build();

            Document saved = documentRepository.save(document);
            return convertToDTO(saved);

        } catch (IOException e) {
            throw new RuntimeException("Erreur lors de l'upload du document: " + e.getMessage());
        }
    }

    public List<DocumentDTO> getDocumentsByPatient(Long patientId) {
        return documentRepository.findByPatientId(patientId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public byte[] downloadDocument(Long documentId) {
        Document document = documentRepository.findById(documentId)
                .orElseThrow(() -> new RuntimeException("Document non trouvé"));
        
        try {
            Path filePath = Paths.get(document.getCheminFichier());
            return Files.readAllBytes(filePath);
        } catch (IOException e) {
            throw new RuntimeException("Erreur lors du téléchargement: " + e.getMessage());
        }
    }

    public void deleteDocument(Long documentId) {
        Document document = documentRepository.findById(documentId)
                .orElseThrow(() -> new RuntimeException("Document non trouvé"));
        
        try {
            Path filePath = Paths.get(document.getCheminFichier());
            Files.deleteIfExists(filePath);
            documentRepository.deleteById(documentId);
        } catch (IOException e) {
            throw new RuntimeException("Erreur lors de la suppression: " + e.getMessage());
        }
    }

    private DocumentDTO convertToDTO(Document document) {
        return DocumentDTO.builder()
                .id(document.getId())
                .nomFichier(document.getNomFichier())
                .typeFichier(document.getTypeFichier())
                .tailleFichier(document.getTailleFichier())
                .description(document.getDescription())
                .patientId(document.getPatientId())
                .uploadePar(document.getUploadePar())
                .dateUpload(document.getDateUpload())
                .build();
    }
}