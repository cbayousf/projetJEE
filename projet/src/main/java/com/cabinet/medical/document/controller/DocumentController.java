package com.cabinet.medical.document.controller;

import com.cabinet.medical.document.dto.DocumentDTO;
import com.cabinet.medical.document.service.DocumentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/documents")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class DocumentController {

    private final DocumentService documentService;

    @PostMapping("/patients/{patientId}/upload")
    public ResponseEntity<DocumentDTO> uploadDocument(
            @PathVariable Long patientId,
            @RequestParam("file") MultipartFile file,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) String uploadePar) {

        DocumentDTO document = documentService.uploadDocument(patientId, file, description, uploadePar);
        return ResponseEntity.status(HttpStatus.CREATED).body(document);
    }

    @GetMapping("/patients/{patientId}")
    public ResponseEntity<List<DocumentDTO>> getDocumentsByPatient(@PathVariable Long patientId) {
        return ResponseEntity.ok(documentService.getDocumentsByPatient(patientId));
    }

    @GetMapping("/{id}/download")
    public ResponseEntity<byte[]> downloadDocument(@PathVariable Long id) {
        byte[] data = documentService.downloadDocument(id);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentDispositionFormData("attachment", "document_" + id);

        return new ResponseEntity<>(data, headers, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDocument(@PathVariable Long id) {
        documentService.deleteDocument(id);
        return ResponseEntity.noContent().build();
    }
}
