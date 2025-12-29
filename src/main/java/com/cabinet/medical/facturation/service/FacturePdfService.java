package com.cabinet.medical.facturation.service;

import com.cabinet.medical.facturation.entity.Facture;
import com.cabinet.medical.facturation.repository.FactureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

@Service
public class FacturePdfService {

    private final FactureRepository factureRepository;

    @Autowired
    public FacturePdfService(FactureRepository factureRepository) {
        this.factureRepository = factureRepository;
    }

    public byte[] generatePdf(Long factureId) throws Exception {
        Optional<Facture> factureOpt = factureRepository.findById(factureId);
        
        if (factureOpt.isEmpty()) {
            throw new RuntimeException("Facture non trouvée avec l'ID: " + factureId);
        }

        Facture facture = factureOpt.get();
        
        // Générer un PDF simple en HTML puis convertir
        // Pour simplifier, on retourne un contenu HTML formaté
        String htmlContent = generateHtmlContent(facture);
        
        return htmlContent.getBytes();
    }

    private String generateHtmlContent(Facture facture) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        
        return "<!DOCTYPE html>" +
                "<html>" +
                "<head>" +
                "<meta charset='UTF-8'>" +
                "<style>" +
                "body { font-family: Arial, sans-serif; margin: 40px; }" +
                ".header { text-align: center; margin-bottom: 30px; }" +
                ".title { font-size: 24px; font-weight: bold; color: #667eea; }" +
                ".info { margin: 20px 0; }" +
                ".info-row { margin: 10px 0; }" +
                ".label { font-weight: bold; display: inline-block; width: 200px; }" +
                ".total { font-size: 20px; font-weight: bold; margin-top: 30px; padding: 15px; background: #f0f0f0; }" +
                "</style>" +
                "</head>" +
                "<body>" +
                "<div class='header'>" +
                "<div class='title'>🏥 FACTURE MÉDICALE</div>" +
                "<div>Cabinet Médical</div>" +
                "</div>" +
                "<div class='info'>" +
                "<div class='info-row'><span class='label'>Numéro de facture:</span> #" + facture.getIdFacture() + "</div>" +
                "<div class='info-row'><span class='label'>Date:</span> " + facture.getDateFacture().format(formatter) + "</div>" +
                "<div class='info-row'><span class='label'>Patient ID:</span> " + facture.getPatientId() + "</div>" +
                (facture.getRendezVousId() != null ? 
                    "<div class='info-row'><span class='label'>Rendez-vous ID:</span> " + facture.getRendezVousId() + "</div>" : "") +
                "<div class='info-row'><span class='label'>Mode de paiement:</span> " + facture.getModePaiement() + "</div>" +
                "<div class='info-row'><span class='label'>Statut:</span> " + facture.getStatut() + "</div>" +
                (facture.getNotes() != null ? 
                    "<div class='info-row'><span class='label'>Notes:</span> " + facture.getNotes() + "</div>" : "") +
                "</div>" +
                "<div class='total'>" +
                "Montant Total: " + String.format("%.2f", facture.getMontant()) + " DH" +
                "</div>" +
                "</body>" +
                "</html>";
    }
}