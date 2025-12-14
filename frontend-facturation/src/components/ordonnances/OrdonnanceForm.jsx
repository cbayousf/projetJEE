import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ordonnanceService } from '../../services/ordonnanceService';
import '../../components/consultations/ConsultationForm.css';

const emptyMed = () => ({ description: '', dosage: '', quantity: 1 });

const OrdonnanceForm = () => {
    const { id } = useParams(); // si présent -> édition
    const isEdit = Boolean(id);
    const navigate = useNavigate();

    const [form, setForm] = useState({
        consultationId: '',
        patientId: '',
        medecinId: '',
        type: 'MEDICAMENTS',
        medicaments: [emptyMed()],
        examens: []
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!isEdit) return;
        setLoading(true);
        ordonnanceService.getById(id)
            .then(res => {
                const dto = res.data;
                setForm({
                    consultationId: dto.consultationId || '',
                    patientId: dto.patientId || '',
                    medecinId: dto.medecinId || '',
                    type: dto.type ? dto.type : 'MEDICAMENTS',
                    medicaments: (dto.medicaments && dto.medicaments.length) ? dto.medicaments.map(m => {
                        // si backend envoie string, map to object
                        if (typeof m === 'string') return { description: m, dosage: '', quantity: 1 };
                        return m;
                    }) : [emptyMed()],
                    examens: dto.examens || []
                });
            })
            .catch(err => {
                console.error('Erreur chargement ordonnance', err);
                setError('Impossible de charger l\'ordonnance');
            })
            .finally(() => setLoading(false));
    }, [id, isEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleMedChange = (index, key, value) => {
        const arr = [...form.medicaments];
        arr[index] = { ...arr[index], [key]: value };
        setForm(prev => ({ ...prev, medicaments: arr }));
    };

    const addMed = () => setForm(prev => ({ ...prev, medicaments: [...prev.medicaments, emptyMed()] }));
    const removeMed = (i) => setForm(prev => ({ ...prev, medicaments: prev.medicaments.filter((_, idx) => idx !== i) }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.patientId || !form.medecinId) {
            alert('Patient et médecin requis');
            return;
        }
        try {
            setLoading(true);
            setError(null);
            // Convert medicaments to desired format for backend
            const payload = {
                consultationId: form.consultationId || null,
                patientId: Number(form.patientId),
                medecinId: Number(form.medecinId),
                type: form.type,
                medicaments: form.type === 'MEDICAMENTS'
                    ? form.medicaments.map(m => {
                        // if backend expects strings, combine fields, otherwise send objects
                        if (m.description && (m.dosage || m.quantity)) {
                            // send structured object; backend must support it
                            return { description: m.description, dosage: m.dosage || '', quantity: Number(m.quantity || 1) };
                        }
                        return m.description || '';
                    })
                    : [],
                examens: form.type === 'EXAMENS_SUPPLEMENTAIRES' ? form.examens : []
            };
            if (isEdit) {
                await ordonnanceService.updateOrdonnance(id, payload);
            } else {
                await ordonnanceService.creerOrdonnance(payload);
            }
            alert('Ordonnance sauvegardée');
            navigate('/ordonnances');
        } catch (err) {
            console.error('Erreur sauvegarde ordonnance', err);
            setError('Erreur lors de la sauvegarde');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="consultation-form-container">
            <h2>{isEdit ? 'Modifier Ordonnance' : 'Nouvelle Ordonnance'}</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Consultation (ID)</label>
                    <input name="consultationId" value={form.consultationId} onChange={handleChange} />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Patient ID *</label>
                        <input name="patientId" value={form.patientId} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Médecin ID *</label>
                        <input name="medecinId" value={form.medecinId} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Type</label>
                        <select name="type" value={form.type} onChange={handleChange}>
                            <option value="MEDICAMENTS">Médicaments</option>
                            <option value="EXAMENS_SUPPLEMENTAIRES">Examens complémentaires</option>
                        </select>
                    </div>
                </div>

                {form.type === 'MEDICAMENTS' && (
                    <div className="ordonnance-form">
                        <label>Médicaments</label>
                        {form.medicaments.map((m, i) => (
                            <div key={i} style={{display:'flex', gap:8, alignItems:'center', marginBottom:8}}>
                                <input placeholder="Description" value={m.description} onChange={(e) => handleMedChange(i, 'description', e.target.value)} />
                                <input placeholder="Dosage" value={m.dosage} onChange={(e) => handleMedChange(i, 'dosage', e.target.value)} />
                                <input type="number" style={{width:80}} value={m.quantity} onChange={(e) => handleMedChange(i, 'quantity', e.target.value)} />
                                <button type="button" className="btn btn-sm btn-secondary" onClick={() => removeMed(i)}>Suppr</button>
                            </div>
                        ))}
                        <button type="button" className="btn btn-sm btn-primary" onClick={addMed}>+ Ajouter un médicament</button>
                    </div>
                )}

                {form.type === 'EXAMENS_SUPPLEMENTAIRES' && (
                    <div className="ordonnance-form">
                        <label>Examens (une par ligne)</label>
                        <textarea name="examens" value={form.examens.join('\n')} onChange={(e) => setForm(prev => ({...prev, examens: e.target.value.split('\n')}))} rows={6} />
                    </div>
                )}

                <div className="form-actions" style={{marginTop:12}}>
                    <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'En cours...' : (isEdit ? 'Mettre à jour' : 'Créer')}</button>
                    <button type="button" className="btn btn-secondary" onClick={() => navigate('/ordonnances')} disabled={loading}>Annuler</button>
                </div>
            </form>
        </div>
    );
};

export default OrdonnanceForm;