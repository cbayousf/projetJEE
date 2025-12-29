import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PatientList from '../components/patients/PatientList';
import PatientForm from '../components/patients/PatientForm';

const Patients = () => {
    const navigate = useNavigate();
    const [formOpen, setFormOpen] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);

    const handleView = (patient) => {
        navigate(`/patients/${patient.id}`);
    };

    const handleEdit = (patient) => {
        setSelectedPatient(patient);
        setFormOpen(true);
    };

    const handleAdd = () => {
        setSelectedPatient(null);
        setFormOpen(true);
    };

    const handleFormClose = () => {
        setFormOpen(false);
        setSelectedPatient(null);
    };

    const handleFormSuccess = () => {
        setRefreshKey((prev) => prev + 1);
    };

    return (
        <>
            <PatientList
                key={refreshKey}
                onView={handleView}
                onEdit={handleEdit}
                onAdd={handleAdd}
            />
            <PatientForm
                open={formOpen}
                onClose={handleFormClose}
                patient={selectedPatient}
                onSuccess={handleFormSuccess}
            />
        </>
    );
};

export default Patients;