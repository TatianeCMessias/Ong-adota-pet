import React, { useState } from 'react';
import { Heart, Copy, Check, QrCode, Sparkles, Gift, Users } from 'lucide-react';

export default function DonationSection({ onNotify }) {
  const [copied, setCopied] = useState(false);
  const pixKey = 'contato@ongadotapet.org.br';

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixKey);
    setCopied(true);
    if (onNotify) onNotify('Chave PIX copiada com sucesso! Obrigado pelo carinho.');
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section id="doacoes" className="donation-section" aria-labelledby="donation-title">
      <div className="container">
        <div className="donation-grid">
          <div className="donation-content">
            <span className="section-tag" style={{ background: 'rgba(232, 74, 127, 0.25)', color: '#F472B6', borderColor: 'rgba(232, 74, 127, 0.4)' }}>
              <Heart size={14} /> Ajude a Salvar Vidas
            </span>
            <h2 id="donation-title">
              Sua ajuda mantém nosso abrigo funcionando e salva dezenas de pets
            </h2>
            <p>
              A ONG Adota Pet não recebe verba governamental e sobrevive exclusivamente de doações de pessoas apaixonadas por animais. Qualquer valor faz a diferença na alimentação, internações e castrações.
            </p>

            <div className="donation-impact-list">
              <div className="impact-item">
                <Sparkles size={20} className="impact-icon" />
                <span><strong>R$ 25,00</strong> financia vermífugo e vacinas para um filhote</span>
              </div>
              <div className="impact-item">
                <Gift size={20} className="impact-icon" />
                <span><strong>R$ 50,00</strong> garante ração premium para 1 pet por 15 dias</span>
              </div>
              <div className="impact-item">
                <Users size={20} className="impact-icon" />
                <span><strong>R$ 100,00</strong> custeia a castração completa de um resgatado</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={handleCopyPix}
              >
                <Heart size={18} /> Fazer Doação via PIX
              </button>
              <a 
                href="#contato" 
                className="btn btn-pink"
              >
                <Users size={18} /> Quero ser Voluntário(a)
              </a>
            </div>
          </div>

          <div className="pix-box-card">
            <span className="pix-badge">PIX Oficial da ONG</span>
            
            {/* QR Code visual simulation */}
            <div className="pix-qr-frame">
              <img 
                src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=contato@ongadotapet.org.br" 
                alt="QR Code PIX para doações da ONG Adota Pet" 
                width="140"
                height="140"
                style={{ width: '100%', height: '100%' }}
              />
            </div>

            <p style={{ fontSize: '0.85rem', color: '#94A3B8', marginBottom: '0.75rem' }}>
              Abra o app do seu banco e aponte a câmera para o QR Code acima ou use a chave PIX:
            </p>

            <div className="pix-key-wrapper">
              <span className="pix-key-text">{pixKey}</span>
              <button 
                type="button" 
                className="btn btn-sm" 
                style={{ background: 'var(--color-primary)', color: 'white', padding: '0.35rem 0.65rem' }}
                onClick={handleCopyPix}
                title="Copiar Chave PIX"
                aria-label="Copiar Chave PIX"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>

            <p style={{ fontSize: '0.8rem', color: '#CBD5E1' }}>
              Razão Social: <strong>Associação Protetora Adota Pet</strong><br />
              CNPJ: <strong>45.982.103/0001-89</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
