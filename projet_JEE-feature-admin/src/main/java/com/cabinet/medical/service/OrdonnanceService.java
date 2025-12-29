package com.cabinet.medical.service;

import com.cabinet.medical.dto.OrdonnanceDTO;
import com.cabinet.medical.entity.Consultation;
import com.cabinet.medical.entity.Ordonnance;
import com.cabinet.medical.repository.ConsultationRepository;
import com.cabinet.medical.repository.OrdonnanceRepository;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.ByteArrayOutputStream;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class OrdonnanceService {

    @Autowired
    private OrdonnanceRepository ordonnanceRepository;

    @Autowired
    private ConsultationRepository consultationRepository;

    public List<OrdonnanceDTO> getAllOrdonnances() {
        return ordonnanceRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public OrdonnanceDTO getOrdonnanceById(Long id) {
        Ordonnance ordonnance = ordonnanceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ordonnance non trouvée avec l'id: " + id));
        return convertToDTO(ordonnance);
    }

    public List<OrdonnanceDTO> getOrdonnancesByConsultation(Long consultationId) {
        return ordonnanceRepository.findByConsultationId(consultationId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public OrdonnanceDTO createOrdonnance(OrdonnanceDTO dto) {
        Consultation consultation = consultationRepository.findById(dto.getConsultationId())
                .orElseThrow(() -> new RuntimeException("Consultation non trouvée"));

        Ordonnance ordonnance = new Ordonnance();
        ordonnance.setConsultation(consultation);
        ordonnance.setDateOrdonnance(dto.getDateOrdonnance() != null ? dto.getDateOrdonnance() : LocalDate.now());
        ordonnance.setType(dto.getType());
        ordonnance.setContenu(dto.getContenu());
        ordonnance.setSignature(consultation.getMedecin().getSignature());

        Ordonnance saved = ordonnanceRepository.save(ordonnance);
        return convertToDTO(saved);
    }

    public OrdonnanceDTO updateOrdonnance(Long id, OrdonnanceDTO dto) {
        Ordonnance ordonnance = ordonnanceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ordonnance non trouvée"));

        if (dto.getType() != null) ordonnance.setType(dto.getType());
        if (dto.getContenu() != null) ordonnance.setContenu(dto.getContenu());
        if (dto.getSignature() != null) ordonnance.setSignature(dto.getSignature());

        Ordonnance updated = ordonnanceRepository.save(ordonnance);
        return convertToDTO(updated);
    }

    public void deleteOrdonnance(Long id) {
        if (!ordonnanceRepository.existsById(id)) {
            throw new RuntimeException("Ordonnance non trouvée");
        }
        ordonnanceRepository.deleteById(id);
    }

    public byte[] generatePDF(Long ordonnanceId) {
        Ordonnance ordonnance = ordonnanceRepository.findById(ordonnanceId)
                .orElseThrow(() -> new RuntimeException("Ordonnance non trouvée"));

        try {
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            PdfWriter writer = new PdfWriter(baos);
            PdfDocument pdfDoc = new PdfDocument(writer);
            Document document = new Document(pdfDoc);

            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");

            document.add(new Paragraph("ORDONNANCE MÉDICALE").setBold().setFontSize(18));
            document.add(new Paragraph(" "));

            Consultation consultation = ordonnance.getConsultation();

            document.add(new Paragraph("Dr. " + consultation.getMedecin().getNom() + " " + consultation.getMedecin().getPrenom()));
            document.add(new Paragraph("Spécialité: " + (consultation.getMedecin().getSpecialite() != null ? consultation.getMedecin().getSpecialite() : "Généraliste")));
            document.add(new Paragraph(" "));

            document.add(new Paragraph("Date: " + ordonnance.getDateOrdonnance().format(formatter)));
            document.add(new Paragraph(" "));

            document.add(new Paragraph("Patient: " + consultation.getPatient().getNom() + " " + consultation.getPatient().getPrenom()));
            document.add(new Paragraph("CIN: " + consultation.getPatient().getCin()));
            document.add(new Paragraph(" "));

            document.add(new Paragraph("Type: " + ordonnance.getType().toString()).setBold());
            document.add(new Paragraph(" "));

            document.add(new Paragraph("Prescription:"));
            document.add(new Paragraph(ordonnance.getContenu()));
            document.add(new Paragraph(" "));

            if (ordonnance.getSignature() != null) {
                document.add(new Paragraph("Signature: "));
                document.add(new Paragraph(ordonnance.getSignature()));
            }

            document.close();
            return baos.toByteArray();

        } catch (Exception e) {
            throw new RuntimeException("Erreur lors de la génération du PDF: " + e.getMessage(), e);
        }
    }

    private OrdonnanceDTO convertToDTO(Ordonnance ordonnance) {
        OrdonnanceDTO dto = new OrdonnanceDTO();
        dto.setId(ordonnance.getId());
        dto.setConsultationId(ordonnance.getConsultation().getId());
        dto.setDateOrdonnance(ordonnance.getDateOrdonnance());
        dto.setType(ordonnance.getType());
        dto.setContenu(ordonnance.getContenu());
        dto.setSignature(ordonnance.getSignature());
        return dto;
    }
}
