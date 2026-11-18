import React from 'react';
import { Search, RotateCcw, Filter } from 'lucide-react';

export default function PetFilters({ filters, onFilterChange, onResetFilters }) {
  const handleChange = (field, value) => {
    onFilterChange({ ...filters, [field]: value });
  };

  return (
    <div className="filters-wrapper">
      <form role="search" aria-label="Buscar e filtrar animais para adoção" onSubmit={(e) => e.preventDefault()}>
        <div className="search-bar-row">
          <label htmlFor="search-input" className="visually-hidden" style={{ display: 'none' }}>
            Buscar por nome, raça ou característica
          </label>
          <Search className="search-input-icon" size={20} aria-hidden="true" />
          <input
            id="search-input"
            type="search"
            className="search-input"
            placeholder="Buscar por nome, raça ou temperamento (ex: Pipoca, Siamês, dócil)..."
            value={filters.search}
            onChange={(e) => handleChange('search', e.target.value)}
          />
        </div>

        <div className="filter-controls-grid">
          <div className="filter-group">
            <label htmlFor="filter-species" className="filter-label">Espécie</label>
            <select
              id="filter-species"
              className="filter-select"
              value={filters.species}
              onChange={(e) => handleChange('species', e.target.value)}
            >
              <option value="all">Todas as espécies</option>
              <option value="dog">🐶 Cachorros</option>
              <option value="cat">🐱 Gatos</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="filter-size" className="filter-label">Porte</label>
            <select
              id="filter-size"
              className="filter-select"
              value={filters.size}
              onChange={(e) => handleChange('size', e.target.value)}
            >
              <option value="all">Todos os portes</option>
              <option value="small">Porte Pequeno</option>
              <option value="medium">Porte Médio</option>
              <option value="large">Porte Grande</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="filter-gender" className="filter-label">Sexo</label>
            <select
              id="filter-gender"
              className="filter-select"
              value={filters.gender}
              onChange={(e) => handleChange('gender', e.target.value)}
            >
              <option value="all">Todos</option>
              <option value="Macho">Macho</option>
              <option value="Fêmea">Fêmea</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="filter-age" className="filter-label">Faixa Etária</label>
            <select
              id="filter-age"
              className="filter-select"
              value={filters.ageGroup}
              onChange={(e) => handleChange('ageGroup', e.target.value)}
            >
              <option value="all">Todas as idades</option>
              <option value="puppy">Filhotes (&lt; 1 ano)</option>
              <option value="adult">Adultos (1 a 7 anos)</option>
              <option value="senior">Idosos (7+ anos)</option>
            </select>
          </div>

          <button
            type="button"
            className="filter-reset-btn"
            onClick={onResetFilters}
            title="Limpar todos os filtros"
          >
            <RotateCcw size={16} /> Limpar
          </button>
        </div>
      </form>
    </div>
  );
}
