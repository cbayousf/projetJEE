import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ordonnanceService } from '../../services/ordonnanceService';

const OrdonnanceDetail = () => {
    const { id } = useParams();
    const [ord, setOrd] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        ordonnanceService.getById(id)
            .then(res => setOrd(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [id]);

    const handlePdf = async () => {
        try {
            const resp = await ordonnanceService.getPdf(id);
            const blob = new Blob([resp.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            window.open(url);
        } catch (err) {
            console.error('Erreur PDF', err);
            alert('Impossible d\'ouvrir le PDF');
        }
    };

    if (loading) return <div className="loading">Chargement...</div>;
    if (!ord) return <div className="no-data">Ordonnance introuvable</div>;

    return (
        <div className="card">
            <div className="card-header">
                <h2>Ordonnance #{ord.idOrdonnance || ord.id}</h2>
            </div>
            <div className="card-body">
                <p><strong>Patient:</strong> {ord.patientId}</p>
                <p><strong>Médecin:</strong> {ord.medecinId} {ord.nomMedecin ? `- ${ord.nomMedecin}` : ''}</p>
                <p><strong>Type:</strong> {ord.type}</p>
                <div>
                    <h4>Médicaments</h4>
                    {(ord.medicaments || []).length === 0 ? <p>-</p> : (
                        <ul>
                            {ord.medicaments.map((m, i) => {
                                if (typeof m === 'string') return <li key={i}>{m}</li>;
                                return <li key={i}>{m.description} - {m.dosage} ({m.quantity})</li>;
                            })}
                        </ul>
                    )}
                </div>
                <div style={{marginTop:12}}>
                    <button className="btn btn-primary" onClick={handlePdf}>Voir PDF</button>
                    <button className="btn btn-secondary" style={{marginLeft:8}} onClick={() => navigate(`/ordonnances/${id}/edit`)}>Modifier</button>
                </div>
            </div>
        </div>
    );
};

export default OrdonnanceDetail;