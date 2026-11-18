import React from 'react';
import { Heart, MapPin, AlertCircle, Info, Sparkles } from 'lucide-react';

export default function PetCard({ pet, isFavorite, onToggleFavorite, onViewDetails, onAdopt }) {
  return (
    <article className="pet-card" aria-labelledby={`pet-name-${pet.id}`}>
      <figure className="pet-card-figure">
        <img 
          src={pet.imageUrl} 
          alt={`${pet.speciesLabel} ${pet.name}, ${pet.breed}, cor ${pet.color}`} 
          className="pet-card-image"
          loading="lazy"
          width="400"
          height="240"
        />

        {pet.isUrgent && (
          <span className="badge-urgent">
            <AlertCircle size={14} /> Adoção Urgente
          </span>
        )}

        <button
          type="button"
          className={`favorite-btn ${isFavorite ? 'favorited' : ''}`}
          onClick={() => onToggleFavorite(pet.id)}
          aria-label={isFavorite ? `Remover ${pet.name} dos favoritos` : `Salvar ${pet.name} nos favoritos`}
          title={isFavorite ? "Remover dos favoritos" : "Salvar nos favoritos"}
        >
          <Heart size={20} />
        </button>
      </figure>

      <div className="pet-card-body">
        <div className="pet-header-meta">
          <h3 id={`pet-name-${pet.id}`} className="pet-name">{pet.name}</h3>
          <span className="pet-species-badge">{pet.speciesLabel}</span>
        </div>

        <div className="pet-breed-location">
          <MapPin size={15} aria-hidden="true" />
          <span>{pet.breed} • {pet.location}</span>
        </div>

        <div className="pet-attributes-list">
          <span className="attribute-tag">{pet.gender}</span>
          <span className="attribute-tag">{pet.age}</span>
          <span className="attribute-tag">Porte {pet.size}</span>
          {pet.specialNeeds && (
            <span className="attribute-tag highlight">Cuidado Especial</span>
          )}
        </div>

        <p className="pet-description-snippet">
          {pet.description}
        </p>

        <div className="pet-card-footer">
          <button 
            type="button" 
            className="btn btn-outline btn-sm"
            onClick={() => onViewDetails(pet)}
          >
            <Info size={16} /> Detalhes
          </button>
          <button 
            type="button" 
            className="btn btn-primary btn-sm"
            onClick={() => onAdopt(pet)}
          >
            Quero Adotar
          </button>
        </div>
      </div>
    </article>
  );
}
