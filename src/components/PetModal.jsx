import React, { useEffect } from 'react';
import { X, Check, MapPin, Calendar, Heart, Shield, Sparkles, AlertCircle } from 'lucide-react';

export default function PetModal({ pet, onClose, onAdopt, isFavorite, onToggleFavorite }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  if (!pet) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div 
        className="modal-card" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`modal-title-${pet.id}`}
      >
        <button 
          type="button" 
          className="modal-close-btn" 
          onClick={onClose}
          aria-label="Fechar janela de detalhes"
        >
          <X size={20} />
        </button>

        <img 
          src={pet.imageUrl} 
          alt={pet.name} 
          className="modal-pet-image" 
        />

        <div className="modal-content">
          <div className="modal-pet-header">
            <div>
              <h2 id={`modal-title-${pet.id}`} className="modal-pet-name">
                {pet.name}
              </h2>
              <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <MapPin size={15} /> {pet.breed} • {pet.location}
              </p>
            </div>
            <button
              type="button"
              className={`favorite-btn ${isFavorite ? 'favorited' : ''}`}
              style={{ position: 'static' }}
              onClick={() => onToggleFavorite(pet.id)}
              aria-label="Salvar nos favoritos"
            >
              <Heart size={20} />
            </button>
          </div>

          <div className="modal-grid-specs">
            <div className="spec-item">
              <span className="spec-title">Porte</span>
              <span className="spec-val">{pet.size}</span>
            </div>
            <div className="spec-item">
              <span className="spec-title">Idade</span>
              <span className="spec-val">{pet.age}</span>
            </div>
            <div className="spec-item">
              <span className="spec-title">Peso</span>
              <span className="spec-val">{pet.weight}</span>
            </div>
            <div className="spec-item">
              <span className="spec-title">Pelagem</span>
              <span className="spec-val">{pet.color}</span>
            </div>
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <h4 style={{ fontSize: '0.95rem', marginBottom: '0.5rem', fontWeight: 700 }}>
              Prontuário e Saúde
            </h4>
            <div className="modal-health-checks">
              {pet.castrated && (
                <span className="health-badge"><Check size={14} /> Castrado(a)</span>
              )}
              {pet.vaccinated && (
                <span className="health-badge"><Check size={14} /> Vacinas em dia</span>
              )}
              {pet.dewormed && (
                <span className="health-badge"><Check size={14} /> Vermifugado(a)</span>
              )}
              <span className="health-badge"><Check size={14} /> Microchipado(a)</span>
            </div>
            {pet.specialNeeds && (
              <div style={{ padding: '0.75rem', background: '#FEF3C7', color: '#92400E', borderRadius: 'var(--radius-sm)', fontSize: '0.875rem', display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                <AlertCircle size={18} style={{ flexShrink: 0 }} />
                <span><strong>Atenção especial:</strong> {pet.specialNeedsDescription}</span>
              </div>
            )}
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <h4 style={{ fontSize: '0.95rem', marginBottom: '0.5rem', fontWeight: 700 }}>
              Personalidade & Convivência
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {pet.personality.map((tag, i) => (
                <span key={i} className="attribute-tag" style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)', fontWeight: 600 }}>
                  ✨ {tag}
                </span>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ fontSize: '0.95rem', marginBottom: '0.4rem', fontWeight: 700 }}>
              História de Resgate
            </h4>
            <p style={{ color: 'var(--color-dark-soft)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              {pet.description}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
            <button 
              type="button" 
              className="btn btn-outline" 
              onClick={onClose}
            >
              Voltar ao Catálogo
            </button>
            <button 
              type="button" 
              className="btn btn-primary"
              onClick={() => {
                onClose();
                onAdopt(pet);
              }}
            >
              Iniciar Adoção de {pet.name}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
