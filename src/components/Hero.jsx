import React from 'react';
import { Heart, Search, ShieldCheck, Sparkles, Award } from 'lucide-react';

export default function Hero({ onExploreClick, onDonationClick }) {
  return (
    <section className="hero-section" aria-labelledby="hero-heading">
      <div className="container hero-grid">
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles size={16} />
            <span>Mais de 400 pets já ganharam um lar com a gente!</span>
          </div>

          <h1 id="hero-heading" className="hero-title">
            Encontre um amigo leal e <span className="highlight">mude uma história</span> para sempre.
          </h1>

          <p className="hero-description">
            A <strong>ONG Adota Pet</strong> resgata, reabilita e cuida com dedicação de animais abandonados. Todos os nossos cães e gatos são doados castrados, vacinados e cheios de gratidão.
          </p>

          <div className="hero-actions">
            <a href="#catalogo" className="btn btn-primary" onClick={onExploreClick}>
              <Search size={18} /> Adotar um Amigo
            </a>
            <button type="button" className="btn btn-outline" onClick={onDonationClick}>
              <Heart size={18} /> Apoiar o Resgate
            </button>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">520+</span>
              <span className="stat-label">Pets Resgatados</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">480+</span>
              <span className="stat-label">Finais Felizes</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">Castrados & Vacinados</span>
            </div>
          </div>
        </div>

        <div className="hero-media-wrapper">
          <figure className="hero-image-card">
            <img 
              src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=900&q=80" 
              alt="Dois cães resgatados felizes e bem cuidados brincando em um campo verde" 
              width="600"
              height="440"
              loading="eager"
            />
            <div className="hero-floating-card">
              <div className="floating-icon">
                <ShieldCheck size={22} />
              </div>
              <div className="floating-text">
                <h4>Adoção 100% Responsável</h4>
                <p>Acompanhamento e suporte da ONG</p>
              </div>
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}
