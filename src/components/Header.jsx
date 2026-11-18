import React, { useState, useEffect } from 'react';
import { Heart, Menu, X, PawPrint, PhoneCall, PlusCircle, FileSpreadsheet } from 'lucide-react';

export default function Header({ onOpenDonation, onOpenRegister }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <a href="#catalogo" className="skip-link">Pular para o catálogo de animais</a>
      <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container header-container">
          <a href="#" className="brand-logo" aria-label="ONG Adota Pet - Início">
            <div className="brand-icon-wrapper" aria-hidden="true">
              <PawPrint size={24} />
            </div>
            <span>Adota<span>Pet</span></span>
          </a>

          {/* Desktop Navigation */}
          <nav className="main-nav" aria-label="Menu principal">
            <ul className="nav-links-list">
              <li><a href="#catalogo" className="nav-link">Quero Adotar</a></li>
              <li><a href="#como-funciona" className="nav-link">Como Funciona</a></li>
              <li><a href="#historias" className="nav-link">Finais Felizes</a></li>
              <li><a href="#doacoes" className="nav-link">Como Ajudar</a></li>
              <li><a href="#duvidas" className="nav-link">Dúvidas</a></li>
              <li><a href="#contato" className="nav-link">Contato</a></li>
            </ul>
          </nav>

          {/* Desktop Actions */}
          <div className="header-actions">
            <button 
              type="button"
              className="btn btn-outline btn-sm"
              onClick={onOpenRegister}
              title="Cadastrar animal ou baixar planilha"
            >
              <PlusCircle size={16} /> Cadastrar Pet
            </button>
            <button 
              type="button"
              className="btn btn-primary btn-sm"
              onClick={onOpenDonation}
            >
              <Heart size={16} /> Apoiar
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button 
            type="button"
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <div 
        className={`mobile-drawer-overlay ${mobileMenuOpen ? 'open' : ''}`}
        onClick={closeMenu}
        aria-hidden={!mobileMenuOpen}
      />
      <aside 
        className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}
        aria-label="Menu móvel"
        aria-hidden={!mobileMenuOpen}
      >
        <div className="drawer-header">
          <a href="#" className="brand-logo" onClick={closeMenu}>
            <div className="brand-icon-wrapper">
              <PawPrint size={20} />
            </div>
            <span>Adota<span>Pet</span></span>
          </a>
          <button 
            type="button" 
            className="modal-close-btn" 
            onClick={closeMenu}
            aria-label="Fechar menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav aria-label="Navegação móvel">
          <ul className="drawer-nav-list">
            <li>
              <a href="#catalogo" className="drawer-nav-link" onClick={closeMenu}>
                <PawPrint size={18} /> Quero Adotar
              </a>
            </li>
            <li>
              <a href="#como-funciona" className="drawer-nav-link" onClick={closeMenu}>
                Como Funciona
              </a>
            </li>
            <li>
              <a href="#historias" className="drawer-nav-link" onClick={closeMenu}>
                Histórias Reais
              </a>
            </li>
            <li>
              <a href="#doacoes" className="drawer-nav-link" onClick={closeMenu}>
                <Heart size={18} /> Doações & Voluntariado
              </a>
            </li>
            <li>
              <a href="#duvidas" className="drawer-nav-link" onClick={closeMenu}>
                Dúvidas Frequentes
              </a>
            </li>
            <li>
              <a href="#contato" className="drawer-nav-link" onClick={closeMenu}>
                <PhoneCall size={18} /> Contato
              </a>
            </li>
          </ul>
        </nav>

        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={() => {
              closeMenu();
              onOpenRegister();
            }}
          >
            <PlusCircle size={18} /> Cadastrar Novo Pet
          </button>
          <a 
            href="/planilha-cadastro-pets.xlsx" 
            download="planilha-cadastro-pets.xlsx"
            className="btn btn-outline"
            onClick={closeMenu}
          >
            <FileSpreadsheet size={18} /> Baixar Planilha Excel
          </a>
          <button 
            type="button" 
            className="btn btn-primary"
            onClick={() => {
              closeMenu();
              onOpenDonation();
            }}
          >
            <Heart size={18} /> Fazer Doação PIX
          </button>
        </div>
      </aside>
    </>
  );
}
