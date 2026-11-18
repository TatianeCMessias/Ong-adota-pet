import React from 'react';
import { TESTIMONIALS_DATA } from '../data/pets';
import { Heart, Sparkles, Quote } from 'lucide-react';

export default function StoriesSection() {
  return (
    <section id="historias" className="stories-section" aria-labelledby="stories-title">
      <div className="container">
        <header className="section-header">
          <span className="section-tag">
            <Heart size={14} /> Finais Felizes
          </span>
          <h2 id="stories-title" className="section-title">
            Histórias reais que aquecem o coração
          </h2>
          <p className="section-description">
            Veja o relato de quem abriu as portas e o coração para acolher um resgatado da ONG Adota Pet.
          </p>
        </header>

        <div className="testimonials-grid">
          {TESTIMONIALS_DATA.map((item) => (
            <article key={item.id} className="testimonial-card">
              <div className="testimonial-media">
                <img 
                  src={item.petPhoto} 
                  alt={`${item.petName} em seu novo lar feliz`} 
                  loading="lazy"
                  width="400"
                  height="200"
                />
              </div>

              <div className="testimonial-quote">
                <Quote size={24} style={{ color: 'var(--color-primary)', opacity: 0.5, marginBottom: '0.5rem' }} />
                <blockquote className="quote-text">
                  "{item.story}"
                </blockquote>

                <footer className="adopter-info">
                  <img 
                    src={item.avatarUrl} 
                    alt={item.adopterName} 
                    className="adopter-avatar"
                    loading="lazy"
                    width="44"
                    height="44"
                  />
                  <div className="adopter-details">
                    <h4>{item.adopterName}</h4>
                    <p>{item.petName} ({item.petSpecies}) • {item.date}</p>
                  </div>
                </footer>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
