import React, { useState, useEffect, useRef } from 'react';
import medicamentService from '../../services/medicamentService';
import './MedicamentAutocomplete.css';

const MedicamentAutocomplete = ({ onSelect, selectedMedicaments = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const searchMedicaments = async () => {
      if (searchTerm.length < 2) {
        setSuggestions([]);
        return;
      }

      try {
        setLoading(true);
        const results = await medicamentService.search(searchTerm);
        // Exclure les médicaments déjà sélectionnés
        const filtered = results.filter(
          med => !selectedMedicaments.find(selected => selected.id === med.id)
        );
        setSuggestions(filtered);
        setShowSuggestions(true);
      } catch (error) {
        console.error('Erreur recherche:', error);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(searchMedicaments, 300);
    return () => clearTimeout(timeoutId);
  }, [searchTerm, selectedMedicaments]);

  const handleSelect = (medicament) => {
    onSelect(medicament);
    setSearchTerm('');
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className="autocomplete-wrapper" ref={wrapperRef}>
      <div className="autocomplete-input-container">
        <span className="autocomplete-icon">💊</span>
        <input
          type="text"
          className="autocomplete-input"
          placeholder="Rechercher un médicament..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
        />
        {loading && <span className="autocomplete-loading">⏳</span>}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="autocomplete-suggestions">
          {suggestions.map((med) => (
            <div
              key={med.id}
              className="suggestion-item"
              onClick={() => handleSelect(med)}
            >
              <div className="suggestion-main">
                <span className="suggestion-name">{med.nom}</span>
                {med.dosage && (
                  <span className="suggestion-dosage">{med.dosage}</span>
                )}
              </div>
              <span className="suggestion-forme">{med.forme}</span>
            </div>
          ))}
        </div>
      )}

      {showSuggestions && searchTerm.length >= 2 && suggestions.length === 0 && !loading && (
        <div className="autocomplete-suggestions">
          <div className="suggestion-empty">Aucun médicament trouvé</div>
        </div>
      )}
    </div>
  );
};

export default MedicamentAutocomplete;