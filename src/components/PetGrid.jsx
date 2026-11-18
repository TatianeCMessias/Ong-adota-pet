import React, { useState, useMemo } from 'react';
import PetFilters from './PetFilters';
import PetCard from './PetCard';
import { PawPrint, Frown, PlusCircle, FileSpreadsheet } from 'lucide-react';

export default function PetGrid({ pets, favorites, onToggleFavorite, onViewDetails, onAdopt, onOpenRegister }) {
  const [filters, setFilters] = useState({
    search: '',
    species: 'all',
    size: 'all',
    gender: 'all',
    ageGroup: 'all'
  });

  const handleResetFilters = () => {
    setFilters({
      search: '',
      species: 'all',
      size: 'all',
      gender: 'all',
      ageGroup: 'all'
    });
  };

  const filteredPets = useMemo(() => {
    return pets.filter((pet) => {
      // Search text match
      if (filters.search.trim()) {
        const query = filters.search.toLowerCase();
        const matchesName = pet.name.toLowerCase().includes(query);
        const matchesBreed = pet.breed.toLowerCase().includes(query);
        const matchesDesc = pet.description.toLowerCase().includes(query);
        const matchesPersonality = pet.personality.some(p => p.toLowerCase().includes(query));
        if (!matchesName && !matchesBreed && !matchesDesc && !matchesPersonality) {
          return false;
        }
      }

      // Species
      if (filters.species !== 'all' && pet.species !== filters.species) {
        return false;
      }

      // Size
      if (filters.size !== 'all' && pet.sizeCode !== filters.size) {
        return false;
      }

      // Gender
      if (filters.gender !== 'all' && pet.gender !== filters.gender) {
        return false;
      }

      // Age group
      if (filters.ageGroup !== 'all') {
        if (filters.ageGroup === 'puppy' && pet.ageMonths >= 12) return false;
        if (filters.ageGroup === 'adult' && (pet.ageMonths < 12 || pet.ageMonths > 84)) return false;
        if (filters.ageGroup === 'senior' && pet.ageMonths <= 84) return false;
      }

      return true;
    });
  }, [pets, filters]);

  return (
    <section id="catalogo" className="catalog-section" aria-labelledby="catalog-title">
      <div className="container">
        <header className="section-header">
          <span className="section-tag">
            <PawPrint size={14} /> Nossos Acolhidos
          </span>
          <h2 id="catalog-title" className="section-title">
            Conheça os pets que estão prontos para adoção
          </h2>
          <p className="section-description">
            Eles já foram vacinados, vermifugados, castrados e estão cheios de esperança para encontrar uma família amorosa e responsável.
          </p>
          <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button 
              type="button" 
              className="btn btn-secondary btn-sm"
              onClick={onOpenRegister}
            >
              <PlusCircle size={16} /> Cadastrar Novo Pet
            </button>
            <a 
              href="/planilha-cadastro-pets.xlsx" 
              download="planilha-cadastro-pets.xlsx"
              className="btn btn-outline btn-sm"
              title="Baixar planilha de pets em Excel"
            >
              <FileSpreadsheet size={16} /> Baixar Planilha Excel
            </a>
          </div>
        </header>

        <PetFilters 
          filters={filters} 
          onFilterChange={setFilters} 
          onResetFilters={handleResetFilters} 
        />

        <div className="catalog-status-bar" role="status" aria-live="polite">
          <span>
            Exibindo <strong>{filteredPets.length}</strong> {filteredPets.length === 1 ? 'pet disponível' : 'pets disponíveis'}
          </span>
          {favorites.length > 0 && (
            <span>
              ❤️ <strong>{favorites.length}</strong> {favorites.length === 1 ? 'pet salvo nos seus favoritos' : 'pets salvos nos seus favoritos'}
            </span>
          )}
        </div>

        {filteredPets.length > 0 ? (
          <div className="pets-grid">
            {filteredPets.map((pet) => (
              <PetCard
                key={pet.id}
                pet={pet}
                isFavorite={favorites.includes(pet.id)}
                onToggleFavorite={onToggleFavorite}
                onViewDetails={onViewDetails}
                onAdopt={onAdopt}
              />
            ))}
          </div>
        ) : (
          <div className="catalog-empty-state">
            <Frown className="empty-icon" aria-hidden="true" />
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--color-dark)' }}>
              Nenhum pet encontrado com esses filtros
            </h3>
            <p style={{ color: 'var(--color-muted)', marginBottom: '1.5rem' }}>
              Tente redefinir os filtros ou cadastrar um novo pet.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
              <button 
                type="button" 
                className="btn btn-outline"
                onClick={handleResetFilters}
              >
                Limpar Filtros
              </button>
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={onOpenRegister}
              >
                <PlusCircle size={16} /> Cadastrar Pet
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
