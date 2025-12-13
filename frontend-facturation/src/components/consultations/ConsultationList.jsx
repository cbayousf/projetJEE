import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { consultationService } from '../../services/consultationService';

const ConsultationList = () => {
    const [consultations, setConsultations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        let mounted = true;
        setLoading(true);
        consultationService.getAll()
            .then(res => {
                console.log('GET /consultations response:', res);
                const data = Array.isArray(res.data)
                    ? res.data
                    : (res.data && (res.data.content || res.data.consultations || res.data)) || [];
                setConsultations(Array.isArray(data) ? data : [data]);
            })
            .catch(err => {
                console.error('Erreur chargement consultations', err);
                setError('Impossible de charger les consultations');
            })
            .finally(() => mounted && setLoading(false));
        return () => { mounted = false; };
    }, []);

    const handleDelete = async (item) => {
        const id = item.id || item.idConsultation;
        if (!id) return alert('Impossible de supprimer : id manquant');
        if (!window.confirm(`Supprimer la consultation ${id} ?`)) return;

        try {
            await consultationService.deleteConsultation(id);
            // retirer de l'état local
            setConsultations(prev => prev.filter(c => (c.id || c.idConsultation) !== id));
        } catch (err) {
            console.error('Erreur suppression', err);
            alert('Erreur lors de la suppression. Consulte la console.');
        }
    };

    const handleEdit = (item) => {
        const id = item.id || item.idConsultation;
        if (!id) return alert('Impossible d\'éditer : id manquant');
        navigate(`/consultations/${id}/edit`);
    };

    if (loading) return <div className="loading">Chargement des consultations...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="card">
            <div className="card-header">
                <h2 className="card-title">Consultations</h2>
                <Link to="/consultations/nouveau" className="btn btn-primary">+ Nouvelle consultation</Link>
            </div>

            <div className="card-body">
                {consultations.length === 0 ? (
                    <>
                        <div className="no-data">Aucune consultation trouvée.</div>
                        <pre style={{ whiteSpace: 'pre-wrap', marginTop: 20 }}>{JSON.stringify(consultations, null, 2)}</pre>
                    </>
                ) : (
                    <div className="table-container">
                        <table className="table">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>PATIENT</th>
                                <th>MÉDECIN</th>
                                <th>DATE</th>
                                <th>FEE</th>
                                <th>ACTIONS</th>
                            </tr>
                            </thead>
                            <tbody>
                            {consultations.map((c, idx) => {
                                const id = c.id || c.idConsultation || idx;
                                const patient = c.patientId || c.patient?.fullName || c.patient || '-';
                                const medecin = c.medecinId || c.practitionerId || c.practitioner?.fullName || '-';
                                const date = c.dateConsultation || c.createdAt || c.created_at || '-';
                                const fee = c.fee ?? '-';
                                return (
                                    <tr key={id}>
                                        <td>{id}</td>
                                        <td>{patient}</td>
                                        <td>{medecin}</td>
                                        <td>{date}</td>
                                        <td>{fee}</td>
                                        <td>
                                            <button className="btn btn-sm btn-info" onClick={() => handleEdit(c)}>Éditer</button>
                                            <button style={{marginLeft:8}} className="btn btn-sm btn-danger" onClick={() => handleDelete(c)}>Supprimer</button>
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

export default ConsultationList;

// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { consultationService } from '../../services/consultationService';
//
// const ConsultationList = () => {
//     const [consultations, setConsultations] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//
//     useEffect(() => {
//         let mounted = true;
//         setLoading(true);
//         consultationService.getAll()
//             .then(res => {
//                 // DEBUG: afficher la réponse complète dans la console
//                 console.log('GET /consultations response:', res);
//
//                 if (!mounted) return;
//
//                 // Adapter selon la structure renvoyée par ton backend :
//                 // 1) si res.data est un tableau -> on l'utilise
//                 // 2) si res.data.content existe (pageable) -> on l'utilise
//                 // 3) sinon on essaye res.data.consultations ou res.data
//                 const data = Array.isArray(res.data)
//                     ? res.data
//                     : (res.data && (res.data.content || res.data.consultations || res.data)) || [];
//
//                 // Si la réponse est un objet unique, transforme en tableau (sécurisé)
//                 setConsultations(Array.isArray(data) ? data : [data]);
//             })
//             .catch(err => {
//                 console.error('Erreur chargement consultations', err);
//                 setError('Impossible de charger les consultations. Consulte la console pour plus de détails.');
//             })
//             .finally(() => mounted && setLoading(false));
//
//         return () => { mounted = false; };
//     }, []);
//
//     if (loading) return <div className="loading">Chargement des consultations...</div>;
//     if (error) return <div className="error">{error}</div>;
//
//     return (
//         <div className="card">
//             <div className="card-header">
//                 <h2 className="card-title">Consultations</h2>
//                 <Link to="/consultations/nouveau" className="btn btn-primary">+ Nouvelle consultation</Link>
//             </div>
//
//             <div className="card-body">
//                 {consultations.length === 0 ? (
//                     <>
//                         <div className="no-data">Aucune consultation trouvée.</div>
//                         {/* Affiche la réponse brute pour debug */}
//                         <pre style={{ whiteSpace: 'pre-wrap', marginTop: 20 }}>
//               {JSON.stringify(consultations, null, 2)}
//             </pre>
//                     </>
//                 ) : (
//                     <div className="table-container">
//                         <table className="table">
//                             <thead>
//                             <tr>
//                                 <th>ID</th>
//                                 <th>Patient</th>
//                                 <th>Médecin</th>
//                                 <th>Date</th>
//                                 <th>Fee</th>
//                             </tr>
//                             </thead>
//                             <tbody>
//                             {consultations.map((c, idx) => {
//                                 // Plusieurs noms possibles selon ton backend, on essaye d'être tolérant
//                                 const id = c.id || c.idConsultation || c.consultationId || idx;
//                                 const patient = c.patientName || c.patient?.fullName || c.patientId || c.patient?.id || c.patient;
//                                 const medecin = c.practitionerName || c.practitioner?.fullName || c.medecinId || c.practitionerId || c.medecin;
//                                 const date = c.start_time || c.startTime || c.created_at || c.createdAt || c.date || '-';
//                                 const fee = c.fee ?? c.total ?? '-';
//
//                                 return (
//                                     <tr key={id}>
//                                         <td>{id}</td>
//                                         <td>{patient}</td>
//                                         <td>{medecin}</td>
//                                         <td>{date}</td>
//                                         <td>{fee}</td>
//                                     </tr>
//                                 );
//                             })}
//                             </tbody>
//                         </table>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };
//
// export default ConsultationList;
//
//
// // import React from 'react';
// // import { Link } from 'react-router-dom';
// //
// // const ConsultationList = () => {
// //     // Pour le test on affiche un message et un lien vers le formulaire.
// //     // Plus tard ici tu feras l'appel à consultationService.getAll() etc.
// //     return (
// //         <div className="card">
// //             <div className="card-header">
// //                 <h2 className="card-title">Consultations</h2>
// //                 <Link to="/consultations/nouveau" className="btn btn-primary">
// //                     + Nouvelle consultation
// //                 </Link>
// //             </div>
// //
// //             <div className="card-body">
// //                 <p className="no-data">Aucune consultation chargée (composant de test).</p>
// //                 {/* Remplace le contenu ci-dessus par ta table / mapping réel */}
// //             </div>
// //         </div>
// //     );
// // };
// //
// // export default ConsultationList;