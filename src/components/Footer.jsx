import React, { useState } from 'react';
import { PawPrint, Mail, Phone, MapPin, Heart, Send } from 'lucide-react';

export default function Footer({ onNotify }) {
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes('@')) return;
    if (onNotify) {
      onNotify('Obrigado por se inscrever na nossa newsletter pet!');
    }
    setNewsletterEmail('');
  };

  return (
    <footer id="contato" className="site-footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          {/* Coluna 1: Sobre */}
          <div className="footer-col">
            <div className="footer-logo">
              <div className="brand-icon-wrapper" style={{ width: 36, height: 36 }}>
                <PawPrint size={20} />
              </div>
              <span>ONG Adota Pet</span>
            </div>
            <p className="footer-about-text">
              Uma organização sem fins lucrativos dedicada a salvar animais em situação de vulnerabilidade, proporcionando tratamento médico, amor e encaminhamento para famílias responsáveis desde 2018.
            </p>
            <div className="footer-social-links" aria-label="Redes sociais da ONG">
              {/* Instagram */}
              <a href="#" className="social-link" aria-label="Instagram da ONG" title="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </a>
              {/* Facebook */}
              <a href="#" className="social-link" aria-label="Facebook da ONG" title="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              {/* YouTube */}
              <a href="#" className="social-link" aria-label="YouTube da ONG" title="YouTube">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path>
                  <polygon points="10 15 15 12 10 9 10 15"></polygon>
                </svg>
              </a>
            </div>
          </div>

          {/* Coluna 2: Links Rápidos */}
          <div className="footer-col">
            <h3>Navegação Rápida</h3>
            <ul className="footer-nav-list">
              <li><a href="#catalogo">Animais para Adoção</a></li>
              <li><a href="#como-funciona">Processo Passo a Passo</a></li>
              <li><a href="#historias">Histórias de Sucesso</a></li>
              <li><a href="#doacoes">Como Doar (PIX)</a></li>
              <li><a href="#duvidas">Perguntas Frequentes</a></li>
            </ul>
          </div>

          {/* Coluna 3: Contato & Endereço */}
          <div className="footer-col">
            <h3>Fale Conosco</h3>
            <address className="footer-address">
              <div className="contact-item">
                <MapPin size={18} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                <span>Av. Esperança, 1200 - São Paulo, SP</span>
              </div>
              <div className="contact-item">
                <Phone size={18} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                <span>(11) 98765-4321 (WhatsApp)</span>
              </div>
              <div className="contact-item">
                <Mail size={18} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                <span>adocoes@ongadotapet.org.br</span>
              </div>
            </address>
            <p style={{ marginTop: '0.85rem', fontSize: '0.8rem', color: '#94A3B8' }}>
              Visitas presenciais mediante agendamento prévio aos sábados, das 10h às 16h.
            </p>
          </div>

          {/* Coluna 4: Newsletter */}
          <div className="footer-col">
            <h3>Receba Novidades</h3>
            <p style={{ fontSize: '0.85rem', marginBottom: '1rem', color: '#94A3B8' }}>
              Cadastre-se para receber fotos dos novos resgatados e avisos sobre nossas feirinhas de adoção.
            </p>
            <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                className="newsletter-input"
                placeholder="Seu melhor e-mail..."
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn btn-primary btn-sm">
                <Send size={15} /> Quero Acompanhar
              </button>
            </form>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <p>© {new Date().getFullYear()} ONG Adota Pet • CNPJ 45.982.103/0001-89 • Todos os direitos reservados.</p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            Feito com <Heart size={15} style={{ color: 'var(--color-danger)', fill: 'var(--color-danger)' }} /> em prol dos animais resgatados.
          </p>
        </div>
      </div>
    </footer>
  );
}
