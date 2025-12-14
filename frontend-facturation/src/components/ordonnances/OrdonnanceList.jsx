import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ordonnanceService } from '../../services/ordonnanceService';

const OrdonnanceList = () => {
    const [ordonnances, setOrdonnances] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let mounted = true;
        setLoading(true);
        ordonnanceService.getAll()
            .then(res => {
                const data = Array.isArray(res.data) ? res.data : (res.data?.content || res.data || []);
                if (mounted) setOrdonnances(Array.isArray(data) ? data : [data]);
            })
            .catch(err => {
                console.error('Erreur chargement ordonnances', err);
                setError('Impossible de charger les ordonnances');
            })
            .finally(() => mounted && setLoading(false));
        return () => { mounted = false; };
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Supprimer cette ordonnance ?')) return;
        try {
            await ordonnanceService.deleteOrdonnance(id);
            setOrdonnances(prev => prev.filter(o => (o.idOrdonnance || o.id) !== id));
        } catch (err) {
            console.error('Erreur suppression ordonnance', err);
            alert('Erreur lors de la suppression. Voir console.');
        }
    };

    const handlePrint = async (id, filename = 'ordonnance.pdf') => {
        try {
            const resp = await ordonnanceService.getPdf(id);
            const blob = new Blob([resp.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error('Erreur génération PDF', err);
            alert('Impossible de générer le PDF.');
        }
    };

    if (loading) return <div className="loading">Chargement des ordonnances...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="card">
            <div className="card-header">
                <h2 className="card-title">Ordonnances</h2>
                <Link to="/ordonnances/nouveau" className="btn btn-primary">+ Nouvelle ordonnance</Link>
            </div>

            <div className="card-body">
                {ordonnances.length === 0 ? (
                    <div className="no-data">Aucune ordonnance trouvée.</div>
                ) : (
                    <div className="table-container">
                        <table className="table">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Consultation</th>
                                <th>Patient</th>
                                <th>Type</th>
                                <th>Date</th>
                                <th>ACTIONS</th>
                            </tr>
                            </thead>
                            <tbody>
                            {ordonnances.map((o, idx) => {
                                const id = o.idOrdonnance || o.id || idx;
                                const consultationId = o.consultationId || '-';
                                const patient = o.patientId || '-';
                                const type = o.type || '-';
                                const date = o.dateOrdonnance || o.createdAt || '-';
                                return (
                                    <tr key={id}>
                                        <td>{id}</td>
                                        <td>{consultationId}</td>
                                        <td>{patient}</td>
                                        <td>{type}</td>
                                        <td>{date}</td>
                                        <td>
                                            <Link className="btn btn-sm btn-info" to={`/ordonnances/${id}/edit`}>Éditer</Link>
                                            <button style={{marginLeft:8}} className="btn btn-sm btn-secondary" onClick={() => handlePrint(id)}>PDF</button>
                                            <button style={{marginLeft:8}} className="btn btn-sm btn-danger" onClick={() => handleDelete(id)}>Supprimer</button>
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrdonnanceList;